import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import packageData from "../../package.json";
import type { PredictionReqParams } from "@/app/lib/definitions";
import { redirect } from 'next/navigation';


console.log("WEBHOOK_HOST", process.env.VERCEL_URL);

const WEBHOOK_HOST = process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : process.env.NGROK_HOST;

export async function createPrediction({ params }: { params: PredictionReqParams }) {
    const input = params;

    // Destructure to extract replicate_api_token and keep the rest of the properties in input
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


export async function getPrediction(req: NextRequest, { params }: { params: { id: string } }) {
    const authHeader = req.headers.get("authorization");
    let replicate_api_token = "";
    if (authHeader) {
        replicate_api_token = authHeader.split(" ")[1]; // Assuming a "Bearer" token
        // Rest of your code
    } else {
        redirect('/');
    }
    const replicate = new Replicate({
        auth: replicate_api_token,
        userAgent: `${packageData.name}/${packageData.version}`,
    });
    const predictionId = params.id;

    const prediction = await replicate.predictions.get(predictionId);

    if (prediction?.error) {
        return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }

    return NextResponse.json(prediction);
}