"use server";
import { User, currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prismaDb";

export async function getUser() {
    try {
        const user: User | null = await currentUser();

        if (!user) {
            return;
        }

        const shop = await prisma.shops.findUnique({
            where: {
                userId: user.id,
            },
        });

        const serializedUser = user ? JSON.parse(JSON.stringify(user)) : null;
        const serializedShop = shop ? JSON.parse(JSON.stringify(shop)) : null;

        return { user: serializedUser, shop: serializedShop };
    } catch (error) {
        console.log("load user error", error);
    }
}
