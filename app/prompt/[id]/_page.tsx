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
import { stripePaymentIntent } from "@/actions/payment/paymentAction";
import { loadStripe } from "@stripe/stripe-js";

type Props = {};
const PromptDetailsPage = ({
    user,
    isSellerExist,
    publishAbleKey,
    promptId,
}: {
    user: User | undefined;
    isSellerExist: boolean;
    publishAbleKey: string;
    promptId: string;
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [prompt, setPrompt] = useState<prompt>();
    const [loading, setLoading] = useState(true);
    const [stripePromise, setStripePromise] = useState<any>();
    const [clientSecret, setClientSecret] = useState("");

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

    useEffect(() => {
        if (prompt) {
            if (publishAbleKey) {
                const amount = Math.round(prompt.price * 100);
                newPaymentIntent({ amount });
                setStripePromise(loadStripe(publishAbleKey));
            }
        }
    }, [publishAbleKey, prompt]);

    const newPaymentIntent = async ({ amount }: { amount: Number }) => {
        const paymentIntent = await stripePaymentIntent({ amount });
        setClientSecret(paymentIntent?.client_secret);
    };

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
                            <PromptDetails
                                promptData={prompt}
                                stripePromise={stripePromise}
                                clientSecret={clientSecret}
                            />
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
