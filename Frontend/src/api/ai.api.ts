import API from "@/lib/axios";

/* ============================
   AI TRIAGE
   ============================ */
export const runTriageAI = (data: {
  symptoms: string;
  age: number;
  gender: string;
}) => {
  return API.post("/ai/triage", data);
};
