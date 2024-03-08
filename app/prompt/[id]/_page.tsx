"use client";
import { User } from "@clerk/nextjs/server";
import Header from "@/components/Layout/Header";
import ShopBanner from "@/components/Shop/ShopBanner";
import { useCallback, useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import Footer from "@/components/Layout/Footer";
import PromptDetails from "@/components/Prompts/PromptDetails/PromptDetails";
import { prompt } from "@/@types/promptTypes";
import Loader from "@/utils/Loader";

type Props = {};
const PromptDetailsPage = ({
    user,
    isSellerExist,
    promptId,
}: {
    user: User | undefined;
    isSellerExist: boolean;
    promptId: string;
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [prompt, setPrompt] = useState<prompt>();
    const [loading, setLoading] = useState(true);

    const fetchPromptData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/get-prompt/${promptId}`);
            const data = await response.json();
            setPrompt(data);
        } catch (error) {
            console.error("Failed to fetch prompts:", error);
        } finally {
            setLoading(false);
        }
    }, [promptId, setPrompt, setLoading]);

    useEffect(() => {
        fetchPromptData();
    }, [fetchPromptData]);

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
        }
    }, [isMounted]);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {loading && !prompt ? (
                <Loader />
            ) : (
                <div>
                    <div className="shop-banner">
                        <Header
                            activeItem={2}
                            user={user}
                            isSellerExist={isSellerExist}
                        />
                        <ShopBanner title={prompt?.name!} />
                    </div>
                    <div>
                        <div className="w-[95%] md:w-[80%] xl:w-[85%] 2xl:w-[80%] m-auto">
                            <PromptDetails promptData={prompt} />
                            <Divider className="bg-[#ffffff14] mt-5" />
                            <Footer />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default PromptDetailsPage;
