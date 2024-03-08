import { styles } from "@/utils/styles";
import PromptDetailsCard from "./PromptDetailsCard";
import SellersBanner from "@/components/Shop/SellersBanner";
import { prompt } from "@/@types/promptTypes";
import { useEffect, useState } from "react";
import PromptInformation from "./PromptInformation";
import PromptCard from "../PromptCard";
import PromptCardLoader from "@/utils/PromptCardLoader";

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
                const relatedPrompts = data.filter(
                    (prompt: prompt) => prompt.id !== promptData?.id
                );
                setPrompts(relatedPrompts);
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
            <div className="flex flex-wrap">
                {loading ? (
                    [...new Array(4)].map((i) => (
                        <>
                            <PromptCardLoader />
                        </>
                    ))
                ) : (
                    <>
                        {prompts &&
                            prompts.map((item: any) => (
                                <PromptCard prompt={item} key={item.id} />
                            ))}
                    </>
                )}
            </div>
            {prompts?.length === 0 && (
                <p className={`${styles.label} text-center block my-5`}>
                    No prompt found with this category!
                </p>
            )}
            <br />
            <br />
            <SellersBanner />
            <br />
        </div>
    );
};
export default PromptDetails;
