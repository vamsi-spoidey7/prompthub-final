"use server";
import { User, clerkClient } from "@clerk/nextjs/server";

export async function getUserById(userId:string) {
    try {
        const user:User | null = await clerkClient.users.getUser(userId);

        if (!user) {
            return;
        }

        const serializedUser = user ? JSON.parse(JSON.stringify(user)) : null;

        return { user: serializedUser };
    } catch (error) {
        console.log("load user error", error);
    }
}