"use server";
import nodemailer from "nodemailer";

export const sendMail = async (
    from: string,
    to: string,
    subject: string,
    html: string
) => {
    try {
        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error occurred while sending email:", error);
    }
};
