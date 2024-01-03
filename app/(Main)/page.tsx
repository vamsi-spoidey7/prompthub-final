import Header from "@/components/Header";
import Hero from "@/components/Route/Hero";
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
        </div>
    );
};
export default Page;
