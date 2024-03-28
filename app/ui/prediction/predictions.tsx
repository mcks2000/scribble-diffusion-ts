import { Fragment, useEffect, useRef, useState } from "react";
import Loader from "@/app/components/loader";
import type { PredictionsEntry } from "@/app/lib/definitions";
import Prediction from "@/app/ui/prediction/prediction";

export default function Predictions({ predictions, isProcessing, submissionCount }: {
  predictions: PredictionsEntry[],
  isProcessing: boolean,
  submissionCount: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submissionCount > 0) {
      const scroll = scrollRef.current;
      if (scroll) {
        scroll.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [predictions, submissionCount]);

  if (submissionCount === 0) return;

  return (
    <section className="w-full my-10" >
      <h2 className="text-center text-3xl font-bold m-6" > Results </h2>

      {
        submissionCount > Object.keys(predictions).length && (
          <div className="pb-10 mx-auto w-full text-center" >
            <div className="pt-10" ref={scrollRef} />
            <Loader />
          </div>
        )
      }

      {
        Object.values(predictions)
          .slice()
          .reverse()
          .map((prediction, index) => (
            <Fragment key={prediction.id} >
              {index === 0 &&
                submissionCount === Object.keys(predictions).length && (
                  <div ref={scrollRef} />
                )
              }
              <Prediction prediction={prediction} />
            </Fragment>
          ))
      }
    </section>
  );
}
