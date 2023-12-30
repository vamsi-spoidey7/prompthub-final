import Link from "next/link";

type Props = {};
const PromptHub = (props: Props) => {
    return (
        <>
            <Link href={"/"}>
                <h1 className="font-Inter sm:text-xl md:text-2xl lg:text-3xl cursor-pointer">
                    <span className="text-[#64ff4c]">Prompt</span>Hub
                </h1>
            </Link>
        </>
    );
};
export default PromptHub;
