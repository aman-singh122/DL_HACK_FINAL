const buildTriagePrompt = ({ symptoms, age, gender }) => {
  return `
You are a medical triage AI assistant.

Based on the patient details below, analyze and respond ONLY in valid JSON format.

Patient Details:
- Age: ${age}
- Gender: ${gender}
- Symptoms: ${symptoms}

Return JSON with the following structure:

{
  "condition_category": "string",
  "urgency_level": "low | medium | high",
  "recommended_consultation_type": "online | hospital_visit",
  "possible_conditions": ["condition1", "condition2"],
  "risk_score": number (1-10),
  "explanation": "short medical reasoning"
}

Do NOT include markdown.
Do NOT include extra text.
Return ONLY valid JSON.
`;
};

export default buildTriagePrompt;
