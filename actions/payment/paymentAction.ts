"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// send stripe publishable key
export const stripePublishableKey = () => {
    const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    return publishableKey;
};

// send stripe payment intent
export const stripePaymentIntent = async ({ amount }: { amount: Number }) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Buying the prompt",
            shipping: {
                name: "Random singh",
                address: {
                    line1: "510 Townsend St",
                    postal_code: "98140",
                    city: "San Francisco",
                    state: "CA",
                    country: "US",
                },
            },
            metadata: {
                company: "PromptHub",
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });
        const serializedPayment = paymentIntent
            ? JSON.parse(JSON.stringify(paymentIntent))
            : null;
        return serializedPayment;
    } catch (error) {
        console.log(error);
    }
};
