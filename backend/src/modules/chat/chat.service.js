import { GoogleGenAI } from "@google/genai";
import { saveMessage, getChatHistory } from "./chat.memory.js";
import { generateEmbedding } from "../../infrastructure/vectordb/embedding.service.js";
import { buildUserContext } from "../../infrastructure/context/context.service.js";
import { index } from "../../infrastructure/vectordb/vector.client.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Run AI Chat with:
 * - Redis short-term memory
 * - Mongo long-term memory
 * - Pinecone vector storage
 * - Context builder
 */
export const runChatAI = async ({ userId, message }) => {
  try {

    /* =====================================================
       1️⃣ Build Advanced User Context (Triage + Appointments + Semantic)
    ====================================================== */
    const context = await buildUserContext(userId, message);

    /* =====================================================
       2️⃣ Get Short-Term Redis Memory
    ====================================================== */
    const history = await getChatHistory(userId);

    /* =====================================================
       3️⃣ Build System Context Prompt
    ====================================================== */
    const systemContext = `
You are an AI medical assistant.

Here is relevant patient context:

Last Triage:
${context?.lastTriage ? JSON.stringify(context.lastTriage) : "None"}

Recent Appointments:
${context?.appointments?.length ? JSON.stringify(context.appointments) : "None"}

Semantic Memory (Important Past Conversations):
${context?.semanticMemory?.length ? JSON.stringify(context.semanticMemory) : "None"}

Guidelines:
- Use context only if relevant.
- Do NOT hallucinate.
- Be medically safe.
- Keep responses structured.
`;

    /* =====================================================
       4️⃣ Prepare Gemini Content Structure
    ====================================================== */
    const contents = [
      {
        role: "user",
        parts: [{ text: systemContext }],
      },

      ...history.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),

      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    /* =====================================================
       5️⃣ Generate AI Reply
    ====================================================== */
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
    });

    const reply = response.text;

    /* =====================================================
       6️⃣ Save Short-Term Memory (Redis)
    ====================================================== */
    await saveMessage(userId, "user", message);
    await saveMessage(userId, "assistant", reply);

    /* =====================================================
       7️⃣ Generate Embeddings (Long-Term Semantic Memory)
    ====================================================== */
    const userEmbedding = await generateEmbedding(message);
    const replyEmbedding = await generateEmbedding(reply);

    /* =====================================================
       8️⃣ Save to Pinecone (Safe Guards Included)
    ====================================================== */

if (userEmbedding?.length) {
  await index.upsert({
    vectors: [
      {
        id: `${userId}-${Date.now()}`,
        values: userEmbedding,
        metadata: {
          userId,
          role: "user",
          content: message,
        },
      },
    ],
  });
}

if (replyEmbedding?.length) {
  await index.upsert({
    vectors: [
      {
        id: `${userId}-${Date.now()}-assistant`,
        values: replyEmbedding,
        metadata: {
          userId,
          role: "assistant",
          content: reply,
        },
      },
    ],
  });
}





    /* =====================================================
       9️⃣ Return AI Reply
    ====================================================== */
    return reply;

  } catch (error) {
    console.error("Chat AI Error:", error);
    throw new Error("Chat AI failed");
  }
};
