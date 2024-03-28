"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import seeds from "@/app/lib/seeds";
import pkg from "../package.json";
import Canvas from "@/app/ui/canvas";
import Welcome from "@/app/ui/welcome";
import PromptForm from "@/app/ui/prompt-form";
import Predictions from "@/app/ui/prediction/predictions";
import Error from "@/app/ui/error";
import naughtyWords from "naughty-words";
import uploadFile from "@/app/lib/upload";
import type { PredictionsEntry } from "@/app/lib/definitions";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


const HOST = process.env.VERCEL_URL
  ? process.env.VERCEL_URL
  : "http://localhost:3000";



export default function Home() {
  const [error, setError] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [predictions, setPredictions] = useState<PredictionsEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scribbleExists, setScribbleExists] = useState(false);
  const [seed] = useState(seeds[Math.floor(Math.random() * seeds.length)]);
  const [initialPrompt] = useState(seed.prompt);
  const [scribble, setScribble] = useState<string | null>(null);
  const [welcomeOpen, setWelcomeOpen] = useState(false);


  async function handleSubmit(promptt: string) {
    // event.preventDefault();

    // track submissions so we can show a spinner while waiting for the next prediction to be created
    setSubmissionCount(submissionCount + 1);
    const prompt = promptt
      .split(/\s+/)
      .map((word) => (naughtyWords.en.includes(word) ? "something" : word))
      .join(" ");


    setError(null);
    setIsProcessing(true);
    if (!scribble) return;
    const fileUrl = await uploadFile(scribble);

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
    let prediction = await response.json();

    console.log("prediction1", prediction);

    setPredictions((predictions) => ({
      ...predictions,
      [prediction.id]: prediction,
    }));

    console.log("prediction2", prediction);

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(10000);
      const response = await fetch(`/api/predictions/${prediction.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "replicate_api_token"
          )}`,
        },
      });
      prediction = await response.json();
      console.log("prediction-get", prediction);
      setPredictions((predictions) => ({
        ...predictions,
        [prediction.id]: prediction,
      }));
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
    }
    console.log("prediction4", prediction);
    setIsProcessing(false);
  };


  useEffect(() => {
    const replicateApiToken = localStorage.getItem("replicate_api_token");

    if (replicateApiToken) {
      setWelcomeOpen(false);
    } else {
      setWelcomeOpen(true);
    }
  }, []);


  return (
    <main className="container max-w-[1024px] mx-auto p-5 ">
      {welcomeOpen ? (
        <Welcome setWelcomeOpen={setWelcomeOpen} />
      ) : (
        <div className="container max-w-[512px] mx-auto">
          <hgroup>
            <h1 className="text-center text-5xl font-bold m-4">
              {pkg.appName}
            </h1>
            <p className="text-center text-xl opacity-60 m-4">
              {pkg.appSubtitle}
            </p>
          </hgroup>

          <Canvas
            startingPaths={seed.paths}
            setScribble={setScribble}
            scribbleExists={scribbleExists}
            setScribbleExists={setScribbleExists}
          />

          <PromptForm
            initialPrompt={initialPrompt}
            onSubmit={handleSubmit}
            isProcessing={isProcessing}
            scribbleExists={scribbleExists}
          />

          <Error error={error} />
        </div>
      )}

      <Predictions
        predictions={predictions}
        isProcessing={isProcessing}
        submissionCount={submissionCount}
      />
    </main>
    // <Script src="https://js.bytescale.com/upload-js-full/v1" />
  );
}
