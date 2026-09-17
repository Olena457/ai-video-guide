import { GuideResponse } from "../src/types/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const generateGuide = async (file: File): Promise<GuideResponse> => {
  const formData = new FormData();
  formData.append("video_file", file);

  const response = await fetch(`${API_BASE_URL}/api/generate-guide`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorDetail = "Error processing video";
    try {
      const errData = await response.json();
      errorDetail = errData.detail || errorDetail;
    } catch {
      errorDetail = `Server error ${response.status}`;
    }
    throw new Error(errorDetail);
  }

  return response.json();
};
