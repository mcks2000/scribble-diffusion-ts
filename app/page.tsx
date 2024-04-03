"use client"

import { useState, useEffect } from "react";
import naughtyWords from "naughty-words";
import seeds from "@/lib/seeds";
import pkg from "../package.json";
import Canvas from "@/components/ui/canvas";
import Welcome from "@/components/ui/welcome";
import PromptForm from "@/components/ui/prompt-form";
import Predictions from "@/components/prediction/predictions";
import CustomError from "@/components/ui/error";
import uploadFile from "@/lib/upload";
import type { PredictionReqParams, PredictionsEntry } from "@/types/predictions";
import { createPredictions, getPredictions } from "@/lib/client_actions";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


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


    const response = await createPredictions(prompt, fileUrl);
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
      await sleep(15 * 1000);
      const response = await getPredictions(prediction.id);
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


    setIsProcessing(false);
    console.log("prediction4", prediction);
  };


  // useEffect后面的空数组 [] 表示这个副作用只会在组件初始渲染时执行一次，之后组件重新渲染时都不会执行。
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
            scribbleExists={scribbleExists}
          />

          <CustomError error={error} />
        </div>
      )}

      <Predictions
        predictions={predictions}
        isProcessing={isProcessing}
        submissionCount={submissionCount}
      />
    </main>
  );
}
