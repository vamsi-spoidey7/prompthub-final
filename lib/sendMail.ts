"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (to: string, subject: string, body: string) => {
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "vamsimadugula7@gmail.com",
            subject: subject,
            html: body,
        });
    } catch (error) {
        console.log(error);
    }
};
