import { getUser } from "@/actions/user/getUser";
import Header from "@/components/Layout/Header";
import ShopBanner from "@/components/Shop/ShopBanner";

type Props = {};
const page = async (props: Props) => {
    const data = await getUser();
    return (
        <div>
            <div className="shop-banner">
                <Header
                    activeItem={2}
                    user={data?.user}
                    isSellerExist={data?.shop ? true : false}
                />
                <ShopBanner />
            </div>
        </div>
    );
};
export default page;
