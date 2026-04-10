import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createXai } from "@ai-sdk/xai";

export const createModel = (model) => {
  const apiKey = import.meta.env.VITE_API_KEY;

  switch (model) {
    case "xai":
      return createXai({ apiKey });
    case "gemini":
      return createGoogleGenerativeAI({ apiKey });
    default:
      throw new Error("Model not found");
  }
};

export const getModel = (model) => {
  switch (model) {
    case "xai":
      return "grok-4.20-0309-reasoning";
    case "gemini":
      return "gemini-2.5-flash";
    default:
      return;
  }
};
