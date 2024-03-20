"use client";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { User } from "@clerk/nextjs/server";
import { Card, CardBody, Divider, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";

type Props = {};
const PolicyPage = ({
    user,
    isSellerExist,
}: {
    user: User | undefined;
    isSellerExist: boolean;
}) => {
    const [selected, setSelected] = useState<string>("privacy");
    const handleSelectionChange: (key: React.Key) => void = (key) => {
        setSelected(key as string);
    };
    return (
        <>
            <Header activeItem={2} user={user} isSellerExist={isSellerExist} />

            <div className="m-4 flex flex-col">
                <Tabs
                    aria-label="Policy Options"
                    className="mx-auto my-4"
                    size="lg"
                    variant="bordered"
                    color="success"
                    selectedKey={selected}
                    onSelectionChange={handleSelectionChange}
                >
                    <Tab
                        key="privacy"
                        title={
                            <span
                                className={`text-xl font-Montserrat font-bold ${
                                    selected === "privacy"
                                        ? "text-black"
                                        : "text-gray-500"
                                }`}
                            >
                                Privacy Policy
                            </span>
                        }
                    >
                        <PrivacyPolicy />
                    </Tab>
                    <Tab
                        key="seller"
                        title={
                            <span
                                className={`text-xl font-Montserrat font-bold ${
                                    selected === "seller"
                                        ? "text-black"
                                        : "text-gray-500"
                                }`}
                            >
                                Seller Policy
                            </span>
                        }
                    >
                        <SellerPolicy />
                    </Tab>
                    <Tab
                        key="buyer"
                        title={
                            <span
                                className={`text-xl font-Montserrat font-bold ${
                                    selected === "buyer"
                                        ? "text-black"
                                        : "text-gray-500"
                                }`}
                            >
                                Buyer Policy
                            </span>
                        }
                    >
                        <BuyerPolicy />
                    </Tab>
                </Tabs>
            </div>

            <Divider className="bg-[#ffffff14] mt-5" />
            <Footer />
        </>
    );
};

// Privacy Policy component
const PrivacyPolicy = () => {
    return (
        <Card>
            <CardBody>
                <div className="privacy-policy bg-gray-900 text-white p-8 rounded-lg">
                    <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
                    <p className="mb-4">
                        At PromptHub, we prioritize the privacy of our users and
                        are committed to protecting your personal information.
                        Our Privacy Policy outlines how we collect, use, and
                        safeguard the information you provide to us. By
                        accessing or using PromptHub, you agree to the terms
                        outlined in this Privacy Policy.
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Information Collection and Use:
                    </h3>
                    <ul className="list-disc pl-8 mb-4">
                        <li>
                            We collect personal information such as your name,
                            email address, and payment details when you register
                            an account or make a purchase on PromptHub.
                        </li>
                        <li>
                            Your information is used to process transactions,
                            provide customer support, and improve our services.
                            We may also use your email address to send you
                            updates and promotional offers.
                        </li>
                        <li>
                            We may collect non-personal information such as your
                            IP address, browser type, and device information for
                            analytics and security purposes.
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold mb-2">Cookies:</h3>
                    <p className="mb-4">
                        PromptHub uses cookies to enhance your browsing
                        experience and provide personalized content. Cookies are
                        small text files stored on your device that help us
                        analyze website traffic and customize your preferences.
                        You can manage your cookie preferences through your
                        browser settings. However, disabling cookies may affect
                        certain features and functionality of PromptHub.
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Information Sharing:
                    </h3>
                    <ul className="list-disc pl-8 mb-4">
                        <li>
                            We do not sell, trade, or rent your personal
                            information to third parties without your consent.
                        </li>
                        <li>
                            We may share your information with trusted
                            third-party service providers who assist us in
                            operating our website, conducting business, or
                            servicing you, as long as those parties agree to
                            keep this information confidential.
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold mb-2">Security:</h3>
                    <p className="mb-4">
                        PromptHub implements security measures to protect your
                        personal information from unauthorized access,
                        alteration, disclosure, or destruction. However, no
                        method of transmission over the internet or electronic
                        storage is 100% secure, and we cannot guarantee absolute
                        security.
                    </p>

                    <h3 className="text-xl font-bold mb-2">Data Retention:</h3>
                    <p className="mb-4">
                        We retain your personal information for as long as
                        necessary to fulfill the purposes outlined in this
                        Privacy Policy unless a longer retention period is
                        required or permitted by law.
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Changes to Privacy Policy:
                    </h3>
                    <p className="mb-4">
                        PromptHub reserves the right to update or modify this
                        Privacy Policy at any time. We will notify users of any
                        changes by posting the revised policy on our website.
                    </p>

                    <h3 className="text-xl font-bold mb-2">Contact Us:</h3>
                    <p className="mb-4">
                        If you have any questions, concerns, or feedback
                        regarding PromptHub or our Privacy Policy, please
                        don&apos;t hesitate to contact us at{" "}
                        <a
                            href="mailto:contact@example.com"
                            className="underline"
                        >
                            contact@example.com
                        </a>
                        .
                    </p>

                    <p>
                        By using PromptHub, you acknowledge that you have read,
                        understood, and agree to abide by the terms of this
                        Privacy Policy. If you do not agree with any part of
                        this policy, please refrain from using PromptHub.
                    </p>
                </div>
            </CardBody>
        </Card>
    );
};

// Seller Policy component
const SellerPolicy = () => {
    return (
        <Card>
            <CardBody>
                <div className="seller-policy bg-gray-900 text-white p-8 rounded-lg">
                    <h2 className="text-3xl font-bold mb-4">Sellers Policy</h2>
                    <p className="mb-4">
                        Welcome to PromptHub! These terms and conditions govern
                        your use of our platform as a seller. By accessing or
                        using PromptHub as a seller, you agree to comply with
                        these terms and conditions. Please read them carefully
                        before proceeding.
                    </p>

                    <h3 className="text-xl font-bold mb-2">Commission:</h3>
                    <p className="mb-4">
                        For every withdrawal request made by a seller, PromptHub
                        will deduct a commission of 5% from the total withdrawal
                        amount before processing.
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Minimum Withdrawal Amount:
                    </h3>
                    <p className="mb-4">
                        Sellers cannot request a withdrawal until their earnings
                        reach a minimum threshold of ₹1000 (Indian Rupees).
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Withdrawal Process:
                    </h3>
                    <ul className="list-disc pl-8 mb-4">
                        <li>
                            Once a seller&apos;s earnings reach or exceed the
                            minimum withdrawal amount, they may submit a
                            withdrawal request.
                        </li>
                        <li>
                            Withdrawal requests are processed within a few
                            weeks.
                        </li>
                        <li>
                            Withdrawals to seller accounts by admins may take
                            additional time. Sellers are requested to wait
                            patiently for the processing of such withdrawals.
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold mb-2">
                        Changes to Terms:
                    </h3>
                    <p className="mb-4">
                        PromptHub reserves the right to modify or update these
                        terms and conditions at any time without prior notice.
                        It is the responsibility of sellers to review these
                        terms periodically for changes.
                    </p>

                    <h3 className="text-xl font-bold mb-2">Termination:</h3>
                    <p className="mb-4">
                        PromptHub reserves the right to suspend or terminate the
                        accounts of sellers who violate these terms and
                        conditions or engage in fraudulent or abusive behavior
                        on the platform.
                    </p>

                    <h3 className="text-xl font-bold mb-2">Governing Law:</h3>
                    <p className="mb-4">
                        These terms and conditions shall be governed by and
                        construed in accordance with the laws of [Jurisdiction],
                        without regard to its conflict of law principles.
                    </p>

                    <p>
                        By using PromptHub as a seller, you acknowledge that you
                        have read, understood, and agree to abide by these terms
                        and conditions. If you do not agree with any part of
                        these terms, please refrain from using PromptHub as a
                        seller. If you have any questions or concerns, please
                        contact us at{" "}
                        <a
                            href="mailto:support@prompthub.com"
                            className="underline"
                        >
                            support@prompthub.com
                        </a>
                        .
                    </p>
                </div>
            </CardBody>
        </Card>
    );
};

// Buyer Policy component
const BuyerPolicy = () => {
    return (
        <Card>
            <CardBody>
                <div className="buyer-policy bg-gray-900 text-white p-8 rounded-lg">
                    <h2 className="text-3xl font-bold mb-4">Buyers Policy</h2>
                    <p className="mb-4">
                        Welcome to PromptHub! As a buyer on our platform, you
                        have access to a variety of prompts created by talented
                        sellers. Please read the following policies regarding
                        your role as a buyer:
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Prompt Downloads:
                    </h3>
                    <ul className="list-disc pl-8 mb-4">
                        <li>
                            Buyers are allowed to download prompt files
                            purchased from PromptHub for personal or commercial
                            use, depending on the terms specified by the seller.
                        </li>
                    </ul>

                    <h3 className="text-xl font-bold mb-2">
                        Ratings and Feedback:
                    </h3>
                    <p className="mb-4">
                        Buyers have the option to rate and provide feedback on
                        prompts they have purchased. Your feedback helps other
                        buyers make informed decisions and provides valuable
                        insights to sellers.
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Dispute Resolution:
                    </h3>
                    <p className="mb-4">
                        In case of any issues or disputes with purchased
                        prompts, buyers are encouraged to contact
                        PromptHub&apos;s support team for assistance. We will
                        work to resolve the issue promptly and fairly.
                    </p>

                    <h3 className="text-xl font-bold mb-2">
                        Abuse of Ratings and Feedback:
                    </h3>
                    <p className="mb-4">
                        Buyers are prohibited from providing false or misleading
                        ratings and feedback. PromptHub reserves the right to
                        take action against buyers who engage in abusive
                        behavior.
                    </p>

                    <p>
                        By using PromptHub as a buyer, you acknowledge that you
                        have read, understood, and agree to abide by these
                        policies. If you have any questions or concerns, please
                        don&apos;t hesitate to contact us at{" "}
                        <a
                            href="mailto:support@prompthub.com"
                            className="underline"
                        >
                            support@prompthub.com
                        </a>
                        .
                    </p>
                </div>
            </CardBody>
        </Card>
    );
};

export default PolicyPage;
