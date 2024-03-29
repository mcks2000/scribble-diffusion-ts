import { z } from 'zod';
import { redirect } from 'next/navigation';
import { PredictionReqParams } from "@/types/predictions";

const FormSchema = z.object({
    apiKey: z.string().min(40, 'Must be 40 characters long.').max(40, 'Must be 40 characters long.'),
})



export type State = {
    errors?: {
        apiKey?: string[];
    },
    message?: string | null;
};


export async function setReplicateKey(prevState: State, formData: FormData) {
    const body = Object.fromEntries(formData.entries());

    const replicateFields = FormSchema.safeParse({
        apiKey: body.apiKey,
    });

    if (!replicateFields.success) {
        return {
            errors: replicateFields.error.flatten().fieldErrors,
            message: 'Parameter error. Failed to Set API Key.',
        };
    }

    const { apiKey } = replicateFields.data;
    try {
        localStorage.setItem("replicate_api_token", apiKey);
    } catch (error) {
        return {
            success: false,
            error: error,
            message: 'Failed to Set API Key. Try Again.',
        }
    }

    redirect('/');
}

// create predictions by json data 
export async function createPredictions(prompt: string, fileUrl: string) {
    const jsonData = {
        prompt,
        image: fileUrl,
        structure: "scribble",
        replicate_api_token: localStorage.getItem("replicate_api_token"),
    };
    const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
    });

    return response;
}

// get predictions by id
export async function getPredictions(id: string) {
    const response = await fetch(`/api/predictions/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem(
                "replicate_api_token"
            )}`,
        },
    });
    return response;
}