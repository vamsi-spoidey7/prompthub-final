import { styles } from "@/utils/styles";
import PromptDetailsCard from "./PromptDetailsCard";
import SellersBanner from "@/components/Shop/SellersBanner";
import { prompt } from "@/@types/promptTypes";
import { useEffect, useState } from "react";
import PromptInformation from "./PromptInformation";

type Props = {};

const PromptDetails = ({ promptData }: { promptData: prompt | undefined }) => {
    const [prompts, setPrompts] = useState<prompt[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPromptData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/get-related-prompts?promptCategory=${promptData?.category}`
                );
                const data = await response.json();
                setPrompts(data);
            } catch (error) {
                console.error("Failed to fetch prompts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromptData();
    }, [promptData]);

    return (
        <div>
            <PromptDetailsCard promptData={promptData} />
            <br />
            <br />
            <PromptInformation promptData={promptData} />
            <br />
            <h1 className={`${styles.heading} px-2 pb-2`}>Related Prompts</h1>
            <div className="flex flex-wrap">{/* Prompt Card  */}</div>
            <br />
            <br />
            <SellersBanner />
            <br />
        </div>
    );
};
export default PromptDetails;
