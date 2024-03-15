import prisma from "@/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const { query } = parse(req.url, true);
        const searchTerm =
            typeof query === "string"
                ? query
                : (query["query"] as string) || "";
        const prompts = await prisma.prompts.findMany({
            where: {
                name: {
                    contains: searchTerm,
                    mode: "insensitive",
                },
                status: "Live",
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({ prompts });
    } catch (error) {
        console.log("get prompts error", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
