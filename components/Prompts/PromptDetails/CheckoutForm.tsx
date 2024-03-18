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
// import { sendMail } from "@/lib/sendMail";
import { sendMail } from "@/lib/mailService";

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

    const receiverhtmlContent = (
        userName: string,
        promptName: string,
        shop: string
    ) => {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Order is Confirmed - PromptHub</title>
          <style>
            /* Basic styling for email content */
            body {
              font-family: sans-serif;
              margin: 0;
              padding: 0;
            }
            .container {
              padding: 20px;
            }
            .header {
              font-size: 20px;
              margin-bottom: 15px;
            }
            .content {
              line-height: 1.5;
            }
            .order-details {
              margin-top: 20px;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
            .order-details li {
              margin-bottom: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header">Hi ${userName},</h1>
            <p class="content">Thank you for your order on <b>PromptHub</b></p>
            <p class="content">We're happy to confirm that your order <b>${promptName}</b> from <b>${shop}</b> has been successfully placed. Your prompts are ready to be used.</p>
            <p class="content">To access your purchased prompts, you can visit your account on the MyOrders Page or click the link below:</p>
            <a href="${
                process.env.NEXT_PUBLIC_BASE_URL + "/my-orders"
            }" class="content">My Orders Page</a>
            <p class="content">If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:support@prompthub.com" class="content">support@prompthub.com</a></p>
            <p class="content">Thanks again for choosing PromptHub We hope you enjoy using your prompts.</p>
            <p class="content">Sincerely,</p>
            <p class="content">The PromptHub Team</p>
          </div>
        </body>
        </html>`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const userData = await getUser();
        if (!stripe || !elements) {
            setLoading(false); // Move setLoading(false) here
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
                // sendMail(
                //     userData?.user?.emailAddresses[0]?.emailAddress,
                //     "Your Order is Confirmed - PromptHub",
                //     receiverhtmlContent(
                //         userData?.user.firstName +
                //             " " +
                //             userData?.user.lastName,
                //         promptData.name,
                //         promptData.shop.name
                //     )
                // );
                sendMail(
                    "vamsimadugula7@gmail.com",
                    userData?.user?.emailAddresses[0]?.emailAddress,
                    "Your Order is Confirmed - PromptHub",
                    receiverhtmlContent(
                        userData?.user.firstName +
                            " " +
                            userData?.user.lastName,
                        promptData.name,
                        promptData.shop.name
                    )
                );
            });
        }
        setLoading(false);
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
                        `Pay Now ₹${promptData?.price}`
                    )}
                </span>
            </button>
        </form>
    );
};

export default CheckoutForm;
