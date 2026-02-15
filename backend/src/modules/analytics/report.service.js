import Appointment from "../../models/Appointment.js";
import MedicalRecord from "../../models/MedicalRecord.js";
import AIChat from "../../models/AIChat.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateMonthlyReport = async (userId) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    // 1️⃣ Fetch appointments
    const appointments = await Appointment.find({
      patient: userId,
      createdAt: { $gte: startOfMonth },
    });

    // 2️⃣ Fetch medical records
    const records = await MedicalRecord.find({
      patient: userId,
      createdAt: { $gte: startOfMonth },
    });

    // 3️⃣ Fetch AI chat history
    const chats = await AIChat.find({
      user: userId,
      createdAt: { $gte: startOfMonth },
    });

    // 4️⃣ Prepare summary data
    const summaryData = `
User had ${appointments.length} appointments this month.
Uploaded ${records.length} medical records.
Had ${chats.length} AI interactions.

Appointments:
${appointments.map(a => `- ${a.appointmentType} on ${a.createdAt}`).join("\n")}

Medical Records:
${records.map(r => `- ${r.title || "Record"} on ${r.createdAt}`).join("\n")}
`;

    // 5️⃣ Call Gemini only once
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a medical AI assistant.
Generate a professional monthly health report summary based on:

${summaryData}
`,
    });

    return response.text;

  } catch (error) {
    console.error("Monthly Report Error:", error);
    throw new Error("Failed to generate report");
  }
};
