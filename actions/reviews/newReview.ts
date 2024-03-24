"use server";
import prisma from "@/lib/prismaDb";

interface Props {
    rating: number;
    comment: string;
    promptId: string;
    userId: string;
}

export const newReview = async ({
    rating,
    comment,
    promptId,
    userId,
}: Props) => {
    try {
        const review = await prisma.reviews.create({
            data: {
                rating,
                comment,
                promptId,
                userId,
            },
        });

        const prompt = await prisma.prompts.findUnique({
            where: {
                id: promptId,
            },
            include: {
                reviews: true,
            },
        });

        if (prompt) {
            const reviews: any = prompt.reviews;

            let avg = 0;

            reviews &&
                reviews.forEach((rev: any) => {
                    avg += rev.rating;
                });

            // update the prompt with new rating
            await prisma.prompts.update({
                where: {
                    id: promptId,
                },
                data: {
                    rating: parseFloat((avg / reviews.length).toFixed(2)),
                },
            });
        }

        const shop = await prisma.shops.findUnique({
            where: {
                userId: prompt?.sellerId,
            },
            include: {
                prompts: true,
            },
        });

        if (shop) {
            const prompts: any = shop.prompts;

            let totalRating = 0;
            let promptWithRatingCount = 0;
            prompts &&
                prompts.forEach((promp: any) => {
                    totalRating += promp.rating;
                    if (promp.rating !== 0) promptWithRatingCount++;
                });

            await prisma.shops.update({
                where: {
                    userId: prompt?.sellerId,
                },
                data: {
                    ratings: parseFloat(
                        (totalRating / promptWithRatingCount).toFixed(2)
                    ),
                },
            });
        }

        return review;
    } catch (error) {
        console.log(error);
    }
};
