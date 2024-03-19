import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

const WithdrawTermsModal = ({ isOpen, onClose, onWithdraw }: any) => {
    const handleWithdraw = () => {
        onWithdraw();
        onClose(); // Close the modal after withdrawal
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            size="4xl"
            scrollBehavior="inside"
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 text-black bg-gray-200">
                    <h1 className="text-2xl font-bold">
                        Withdraw Terms and Conditions
                    </h1>
                </ModalHeader>
                <ModalBody className="text-black bg-gray-100">
                    <p className="text-xl font-bold">
                        By making a withdrawal, you agree to our terms and
                        conditions:
                    </p>
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <p className="text-xl font-semibold">
                            Terms and Conditions for Sellers
                        </p>
                        <p className="text-lg">
                            Welcome to PromptHub! These terms and conditions
                            govern your use of our platform as a seller. By
                            accessing or using PromptHub as a seller, you agree
                            to comply with these terms and conditions. Please
                            read them carefully before proceeding.
                        </p>
                        <hr className="my-4" />
                        <p className="text-xl font-semibold">Commission:</p>
                        <p className="text-lg">
                            For every withdrawal request made by a seller,
                            PromptHub will deduct a <b>commission of 5%</b> from
                            the total withdrawal amount before processing.
                        </p>
                        <hr className="my-4" />
                        <p className="text-xl font-semibold">
                            Minimum Withdrawal Amount:
                        </p>
                        <p className="text-lg">
                            Sellers cannot request a withdrawal until their
                            earnings reach a minimum threshold of{" "}
                            <b> ₹1000 (Indian Rupees).</b>
                        </p>
                        <hr className="my-4" />
                        <p className="text-xl font-semibold">
                            Withdrawal Process:
                        </p>
                        <ul className="list-disc ml-6 text-lg">
                            <li>
                                Once a seller&apos;s earnings reach or exceed
                                the minimum withdrawal amount, they may submit a
                                withdrawal request.
                            </li>
                            <li>
                                Withdrawal requests are processed within a few
                                weeks.
                            </li>
                            <li>
                                Withdrawals to seller accounts by admins may
                                take additional time. Sellers are requested to
                                wait patiently for the processing of such
                                withdrawals.
                            </li>
                        </ul>
                        <hr className="my-4" />
                        <p className="text-xl font-semibold">
                            Changes to Terms:
                        </p>
                        <p className="text-lg">
                            PromptHub reserves the right to modify or update
                            these terms and conditions at any time without prior
                            notice. It is the responsibility of sellers to
                            review these terms periodically for changes.
                        </p>
                        <hr className="my-4" />
                        <p className="text-xl font-semibold">Termination:</p>
                        <p className="text-lg">
                            PromptHub reserves the right to suspend or terminate
                            the accounts of sellers who violate these terms and
                            conditions or engage in fraudulent or abusive
                            behavior on the platform.
                        </p>
                        <hr className="my-4" />
                        <p className="text-xl font-semibold">Governing Law:</p>
                        <p className="text-lg">
                            These terms and conditions shall be governed by and
                            construed in accordance with the laws of
                            [Jurisdiction], without regard to its conflict of
                            law principles.
                        </p>
                        <hr className="my-4" />
                        <p className="text-xl font-semibold">Contact Us:</p>
                        <p className="text-lg">
                            If you have any questions or concerns, please
                            contact us at{" "}
                            <a
                                href="mailto:support@prompthub.com"
                                className="text-blue-700"
                            >
                                support@prompthub.com
                            </a>
                            .
                        </p>
                    </div>
                </ModalBody>
                <ModalFooter className="bg-gray-200">
                    <Button color="danger" variant="light" onPress={onClose}>
                        <span className="text-xl text-black">Close</span>
                    </Button>
                    <Button color="success" onPress={handleWithdraw}>
                        <span className="text-xl text-black">
                            Agree and Withdraw
                        </span>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default WithdrawTermsModal;
