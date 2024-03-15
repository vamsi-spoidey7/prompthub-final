import { newOrder } from "@/actions/orders/createOrder";
import { getUser } from "@/actions/user/getUser";
import { styles } from "@/utils/styles";
import {
    LinkAuthenticationElement,
    PaymentElement,
    useElements,
    useStripe,
    AddressElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CheckoutForm = ({
    setOpen,
    open,
    promptData,
}: {
    setOpen: (open: boolean) => void;
    open: boolean;
    promptData: any;
}) => {
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const userData = await getUser();
        if (!stripe || !elements) {
            return;
        }
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });
        if (error) {
            const errorMessage =
                error.message || "An error occurred during payment.";
            toast.error(errorMessage);
            setLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            await newOrder({
                userId: userData?.user?.id!,
                promptId: promptData.id,
                sellerId: promptData.sellerId,
                payment_id: paymentIntent.id,
                payment_method: paymentIntent.id!,
            }).then((res) => {
                toast.success("Order Placed Successfully!");
                setOpen(!open);
                setTimeout(() => {
                    router.push("/my-orders");
                }, 1000);
            });
            setLoading(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            {/* <AddressElement options={{ mode: "shipping" }} /> */}
            <button
                id="submit"
                className={`${styles.button} !bg-[crimson] mt-4 !p-2 !w-full`}
            >
                <span>
                    {loading ? (
                        <Spinner label="Processing..." color="warning" />
                    ) : (
                        `Pay Now $${promptData?.price}`
                    )}
                </span>
            </button>
        </form>
    );
};

export default CheckoutForm;
