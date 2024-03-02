"use client";

import Link from "next/link";
import { useState } from "react";
import Navigation from "./Navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import PromptHub from "./PromptHub";

type Props = {
    activeItem: number;
};
const Header = ({ activeItem }: Props) => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }

    const handleClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === "screen") {
            setOpen(!open);
        }
    };

    return (
        <div
            className={`w-full md:px-2 p-4 min-h-[60px] border-b border-b-[#ffffff32] transition-opacity ${
                active && "fixed top-0 left-0 bg-[#000] z-[9999]"
            }`}
        >
            {/* For tablet screen */}
            <div className="hidden max-w-screen-xl px-4 mx-auto md:flex items-center justify-between">
                <div>
                    <PromptHub />
                </div>
                <div className="flex mx-3">
                    <Navigation activeItem={activeItem} />
                </div>
                <div className="flex items-center">
                    <AiOutlineSearch className="text-[25px] md:mr-3 lg:mr-5 cursor-pointer" />
                    <Link href={"/signin"}>
                        <CgProfile className="text-[25px] cursor-pointer" />
                    </Link>
                </div>
            </div>

            {/* For mobile screen */}
            <div className="w-full md:hidden flex items-center justify-between">
                <div className="text-2xl">
                    <PromptHub />
                </div>
                <div>
                    <FaBars
                        className="text-2xl cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                {open && (
                    <div
                        className="fixed md:hidden w-full h-screen top-0 left-0 z-[9999] backdrop-blur-sm"
                        onClick={handleClose}
                        id="screen"
                    >
                        <div className="fixed bg-black h-screen top-0 right-0 w-[60%] z-[9999]">
                            <div className="flex items-center justify-between px-4 text-3xl text-center my-5">
                                <PromptHub />
                                <FaRegCircleXmark
                                    className="cursor-pointer"
                                    onClick={() => setOpen(!open)}
                                />
                            </div>
                            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                            <div className="px-5">
                                <div className="flex flex-col text-center text-lg">
                                    <Navigation activeItem={activeItem} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default Header;
