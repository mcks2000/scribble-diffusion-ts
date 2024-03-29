'use client';

import { Fragment, useEffect, useRef } from "react";
import { Loader } from "@/components/loader";
import type { PredictionsEntry } from "@/types/predictions";
import Prediction from "@/components/prediction/prediction";

const Predictions = ({ predictions, isProcessing, submissionCount }: {
  predictions: PredictionsEntry[],
  isProcessing: boolean,
  submissionCount: number
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submissionCount > 0) {
      const scroll = scrollRef.current;
      if (scroll) {
        scroll.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [submissionCount]);


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
export default Predictions;



