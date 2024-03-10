import { prompt } from "./promptTypes";

export type Orders = {
    id: string;
    userId: string;
    promptId: string;
    prompt: prompt;
    payment_method: string;
    payment_id: string;
    createdAt: Date;
    updatedAt: Date;
};
