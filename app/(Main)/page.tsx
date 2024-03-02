import Header from "@/components/Layout/Header";
import Hero from "@/components/Route/Hero";
import About from "@/components/Route/About";
import PromptCard from "@/components/Prompts/PromptCard";
import Image from "next/image";
import { styles } from "@/utils/styles";
import BestSellers from "@/components/Shop/BestSellers";
import Future from "@/components/Route/Future";
import Partners from "@/components/Route/Partners";
import SellersBanner from "@/components/Shop/SellersBanner";
import { Divider } from "@nextui-org/react";
import Footer from "@/components/Layout/Footer";

type Props = {};
const Page = (props: Props) => {
    return (
        <div>
            <div className="banner">
                <Header activeItem={0} />
                <Hero />
            </div>
            <Image
                src={
                    "https://pixner.net/aikeu/assets/images/footer/shape-two.png"
                }
                alt="star"
                width={120}
                height={120}
                className="absolute right-0"
            />
            <br />
            <div className="w-[95%] md:w-[90%] xl:w-[80%] 2xl:w-[75%] m-auto">
                <About />
                <div>
                    <h1 className={`${styles.heading} p-2 font-Montserrat`}>
                        Latest Prompts
                    </h1>
                    <div className="flex flex-wrap">
                        <PromptCard />
                        <PromptCard />
                        <PromptCard />
                        <PromptCard />
                        <PromptCard />
                        <PromptCard />
                    </div>
                    <br />
                    <BestSellers />
                    <Future />
                    <Partners />
                    <SellersBanner />
                    <br />
                    <br />
                    <Divider className="bg-[#ffffff23]" />
                    <Footer />
                </div>
            </div>
        </div>
    );
};
export default Page;
