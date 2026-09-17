"use client";

import { useState } from "react";
import { GuideResponse } from "../types/types";
import { generateGuide } from "../api"; 
export const useGuideGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guideData, setGuideData] = useState<GuideResponse | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setGuideData(null);

    try {
      const data = await generateGuide(file);
      setGuideData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An unknown error occurred");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetGuide = () => {
    setGuideData(null);
  };

  return {
    isLoading,
    error,
    guideData,
    handleFileUpload,
    resetGuide,
  };
};
