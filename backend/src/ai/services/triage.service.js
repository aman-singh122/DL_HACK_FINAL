import { GoogleGenAI } from "@google/genai";
import buildTriagePrompt from "../prompts/triage.prompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const runTriageAI = async ({ symptoms, age, gender }) => {
  try {
    const prompt = buildTriagePrompt({ symptoms, age, gender });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const rawOutput = response.text;

    console.log("RAW GEMINI:", rawOutput);

    const cleaned = rawOutput.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(cleaned);

    return parsed;

  } catch (error) {
    console.error("Triage AI Error:", error);
    throw new Error("AI processing failed");
  }
};

export default runTriageAI;
