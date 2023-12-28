import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import NextUiProvider from "./(Providers)/NextUiProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "PromptHub",
    description: "An AI Prompts selling marketplace",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${montserrat.variable}`}>
                <NextUiProvider>{children}</NextUiProvider>
            </body>
        </html>
    );
}
