import { generateEmbedding } from "./embedding.service.js";
import { index } from "./vector.client.js";

export const searchSimilarMessages = async (userId, text) => {
  try {
    const embedding = await generateEmbedding(text);

    // 🚨 SAFE GUARD
    if (!embedding || !Array.isArray(embedding) || embedding.length === 0) {
      console.log("⚠️ Embedding not generated, skipping vector search");
      return [];
    }

    const results = await index.query({
      vector: embedding,
      topK: 3,
      includeMetadata: true,
      filter: {
        userId: userId,
      },
    });

    return results.matches || [];

  } catch (error) {
    console.error("Vector Search Error:", error);
    return []; // 🚨 NEVER crash context builder
  }
};
