import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateEmbedding = async (text) => {
  try {
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: [
        {
          parts: [{ text }],
        },
      ],
    });

    const vector = response.embeddings?.[0]?.values || null;

    console.log("Embedding length:", vector?.length);

    return vector;

  } catch (error) {
    console.error("Embedding Error:", error);
    return null;
  }
};
