import Header from "@/components/Header";
import Hero from "@/components/Route/Hero";
import About from "@/components/Route/About";
import Image from "next/image";

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
            </div>
        </div>
    );
};
export default Page;
