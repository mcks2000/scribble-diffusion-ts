
import Prediction from "@/app/ui/prediction/prediction";
import Head from "next/head";
import pkg from "../../../package.json";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


const HOST = process.env.VERCEL_URL
    ? process.env.VERCEL_URL
    : "http://localhost:3000";


export default async function Page({ params, baseUrl }: { params: { id: string }, baseUrl: string }) {
    await sleep(10000);
    console.log("params", `${HOST}/api/predictions/${params.id}`);

    const response = await fetch(`${HOST}/api/predictions/${params.id}`);

    const prediction = await response.json();
    console.log("prediction-[id]-Page", prediction);


    return (
        <div>
            <Head>
                <title>
                    {prediction && `${prediction.input.prompt} - `}
                    {pkg.appName}
                </title>
                <meta name="description" content={prediction.input.prompt} />
                <meta property="og:title" content={pkg.appName} />
                <meta property="og:description" content={prediction.input.prompt} />
                <meta
                    property="og:image"
                    content={`${baseUrl}/api/og?id=${prediction.id}`}
                />
            </Head>
            <main className="container max-w-[1024px] mx-auto p-5">
                <Prediction prediction={prediction} showLinkToNewScribble={true} />
            </main>
        </div>
    );
}

