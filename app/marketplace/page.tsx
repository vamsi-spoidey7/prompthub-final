import MarketPlaceRouter from "./_page";
import { getUser } from "@/actions/user/getUser";

export const dynamic = "force-dynamic";

const Page = async () => {
    const data = await getUser();

    return (
        <div>
            <MarketPlaceRouter
                user={data?.user}
                isSellerExist={data?.shop ? true : false}
            />
        </div>
    );
};

export default Page;
