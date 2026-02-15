import AITriage from "../../models/AITriage.js";
import AIChat from "../../models/AIChat.js";
import Appointment from "../../models/Appointment.js";
import { searchSimilarMessages } from "../vectordb/vector.search.js";

export const buildUserContext = async (userId, latestMessage) => {
  try {
    // 1️⃣ Last triage
    const lastTriage = await AITriage.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    // 2️⃣ Last 5 chats
    const lastChats = await AIChat.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // 3️⃣ Appointments
    const appointments = await Appointment.find({
      "patient.userId": userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // 4️⃣ Semantic recall (FIXED)
    const semanticMemory = await searchSimilarMessages(
      userId,
      latestMessage
    );

    return {
      lastTriage,
      lastChats,
      appointments,
      semanticMemory,
    };

  } catch (error) {
    console.error("Context Builder Error:", error);
    return {};
  }
};
