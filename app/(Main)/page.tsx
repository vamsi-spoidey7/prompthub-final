import Header from "@/components/Header";
import Hero from "@/components/Route/Hero";

type Props = {};
const Page = (props: Props) => {
    return (
        <div>
            <div className="banner">
                <Header activeItem={0} />
                <Hero />
            </div>
        </div>
    );
};
export default Page;
