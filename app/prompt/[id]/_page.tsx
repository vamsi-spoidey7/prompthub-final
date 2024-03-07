"use client";
import { User } from "@clerk/nextjs/server";
import Header from "@/components/Layout/Header";
import ShopBanner from "@/components/Shop/ShopBanner";
import { useEffect, useState } from "react";

type Props = {};
const PromptDetailsPage = ({
    user,
    isSellerExist,
}: {
    user: User | undefined;
    isSellerExist: boolean;
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
        }
    }, [isMounted]);

    if (!isMounted) {
        return null;
    }
    return (
        <div>
            <div className="shop-banner">
                <Header
                    activeItem={2}
                    user={user}
                    isSellerExist={isSellerExist}
                />
                <ShopBanner title={"MCU Store"} />
            </div>
        </div>
    );
};
export default PromptDetailsPage;
