
import { NextResponse } from "next/server";
import Replicate from "replicate";
import packageData from "../../../package.json";


const WEBHOOK_HOST = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NGROK_HOST;
export async function POST(request: Request) {
    const input = await request.json();
    const inpu1t = input.prompt11;

    const { replicate_api_token, ...restInput } = input;

    const replicate = new Replicate({
        auth: replicate_api_token,
        userAgent: `${packageData.name}/${packageData.version}`,
    });


    // https://replicate.com/jagilley/controlnet-scribble/versions
    const prediction = await replicate.predictions.create({
        version:
            "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
        input,
        webhook: `${WEBHOOK_HOST}/api/replicate-webhook`,
        webhook_events_filter: ["start", "completed"],
    });

    if (prediction?.error) {
        return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction, { status: 201 });
}

export const config = {
    runtime: "edge",
    api: {
        bodyParser: {
            sizeLimit: "10mb",
        },
    },
};
