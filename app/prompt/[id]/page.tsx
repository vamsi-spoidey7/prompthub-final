import { getUser } from "@/actions/user/getUser";
import PromptDetailsPage from "./_page";

type Props = {};
const page = async ({ params }: { params: any }) => {
    const data = await getUser();
    return (
        <div>
            <PromptDetailsPage
                user={data?.user}
                isSellerExist={data?.shop ? true : false}
                promptId={params.id}
            />
        </div>
    );
};
export default page;
