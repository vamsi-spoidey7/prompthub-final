import { getUser } from "@/actions/user/getUser";
import PromptDetailsPage from "./_page";

type Props = {};
const page = async (props: Props) => {
    const data = await getUser();
    return (
        <div>
            <PromptDetailsPage
                user={data?.user}
                isSellerExist={data?.shop ? true : false}
            />
        </div>
    );
};
export default page;
