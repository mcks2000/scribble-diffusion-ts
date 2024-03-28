import { z } from 'zod';
import { redirect } from 'next/navigation';

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
    // console.log("fromEntries", body);
    // console.log("prevState", prevState);

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