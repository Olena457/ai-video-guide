"use client";

import { useState, useEffect } from "react";
import { TextLoader } from "generative-loaders";

const steps = [
  "Uploading video...",
  "Extracting frames...",
  "Analyzing screenshots...",
  "Generating instructions...",
];

export function LoadingProcess() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1 < steps.length ? prev + 1 : prev));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <TextLoader text={steps[step]} variant="typewriter" speed={50} />;
}
