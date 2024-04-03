import { type NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";
import packageData from "../../../../package.json";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const authHeader = req.headers.get("authorization");
    let replicate_api_token = "";
    if (authHeader) {
        replicate_api_token = authHeader.split(" ")[1]; // Assuming a "Bearer" token
        // Rest of your code
    } else {
        // Handle the case when authHeader is null
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

export const config = {
    runtime: "edge",
};
