import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismaDb";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const sellers = await prisma.shops.findMany({
            take: 4,
            orderBy: [
                { totalSales: "desc" }, // Sort by total sales in descending order
                { ratings: "desc" }, // Sort by ratings in descending order
            ],
        });

        return NextResponse.json(sellers);
    } catch (error) {
        console.log("load user error", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
