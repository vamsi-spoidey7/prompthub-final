import { styles } from "@/utils/styles";
import Link from "next/link";
import React from "react";
import PromptHub from "./PromptHub";

type Props = {};

const Footer = (props: Props) => {
    return (
        <div className="mt-8">
            <div className="w-full mb-5 flex justify-between items-center">
                <div>
                    <PromptHub />
                </div>
                <div>
                    <ul className="flex items-center">
                        <li>
                            <Link
                                href="/"
                                className={`${styles.label} hover:text-[#64ff4b] duration-200 transition px-2 md:px-4`}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/marketplace"
                                className={`${styles.label} hover:text-[#64ff4b] duration-200 transition px-2 md:px-4`}
                            >
                                MarketPlace
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact-us"
                                className={`${styles.label} hover:text-[#64ff4b] duration-200 transition px-2 md:px-4`}
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <p className={`${styles.paragraph} text-center`}>
                Copyright © 2024 PromptHub . All Rights Reserved
            </p>
            <br />
            <br />
        </div>
    );
};

export default Footer;
