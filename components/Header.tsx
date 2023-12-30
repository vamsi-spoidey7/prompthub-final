"use client";

import Link from "next/link";
import { useState } from "react";
import Navigation from "./Navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

type Props = {
    activeItem: number;
};
const Header = ({ activeItem }: Props) => {
    const [active, setActive] = useState(false);

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setActive(true);
            } else {
                setActive(false);
            }
        });
    }

    return (
        <div
            className={`w-full sm:px-2 p-4 min-h-[60px] border-b border-b-[#ffffff32] transition-opacity ${
                active && "fixed top-0 left-0 bg-[#000] z-[9999]"
            }`}
        >
            <div className="hidden md:w-[90%] mx-auto sm:flex items-center justify-between">
                <div>
                    <Link href={"/"}>
                        <h1 className="font-Inter sm:text-xl md:text-2xl lg:text-3xl cursor-pointer">
                            <span className="text-[#64ff4c]">Prompt</span>Hub
                        </h1>
                    </Link>
                </div>
                <div>
                    <Navigation activeItem={activeItem} />
                </div>
                <div className="flex items-center">
                    <AiOutlineSearch className="text-[25px] sm:mr-3 md:mr-5 cursor-pointer" />
                    <Link href={"/signin"}>
                        <CgProfile className="text-[25px] cursor-pointer" />
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Header;
