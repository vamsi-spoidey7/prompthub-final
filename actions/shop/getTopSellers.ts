"use server";
import prisma from "@/lib/prismaDb";

export const getTopSellers = async () => {
    try {
        const sellers = await prisma.shops.findMany({
            take: 4,
            orderBy: [
                { totalSales: "desc" }, // Sort by total sales in descending order
                { ratings: "desc" }, // Sort by ratings in descending order
            ],
        });

        return sellers;
    } catch (error) {
        console.log(error);
    }
};
