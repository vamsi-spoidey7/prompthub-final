"use server";

import prisma from "@/lib/prismaDb";

interface DayData {
    day: string;
    count: number;
}

export async function generateLast30DaysOrderData(
    date: Date,
    sellerId: string
): Promise<{
    last30Days: DayData[];
}> {
    const last30Days: DayData[] = [];
    const currentDate = date;

    for (let i = 29; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);

        const dayFormatted = date.toLocaleDateString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const allOrders = await prisma.orders.findMany({
            where: {
                prompt: {
                    sellerId: sellerId, // Use sellerId directly
                },
            },
            include: {
                prompt: true,
            },
        });

        const orders = allOrders.filter((order) => {
            const createdAt = new Date(order.createdAt);
            return createdAt >= startDate && createdAt < endDate;
        });

        const count = orders.length;

        last30Days.push({ day: dayFormatted, count });
    }
    // console.log(last30Days);
    return { last30Days };
}
