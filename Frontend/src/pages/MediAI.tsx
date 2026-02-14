import { useState } from "react";
import { runTriageAI } from "@/api/ai.api";

const MediAI = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await runTriageAI({
        symptoms,
        age: Number(age),
        gender,
      });

      setResult(res.data.data);
    } catch (error) {
      console.error(error);
      alert("AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-6">MediAI Health Analysis</h1>

        <textarea
          placeholder="Enter your symptoms..."
          className="w-full border p-3 rounded-lg mb-4"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full border p-3 rounded-lg mb-4"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />

        <select
          className="w-full border p-3 rounded-lg mb-4"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold"
        >
          {loading ? "Analyzing..." : "Analyze Symptoms"}
        </button>

        {result && (
          <div className="mt-6 p-5 rounded-lg border">
            {result.urgency_level === "high" && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4 font-semibold">
                ⚠ High Urgency — Seek Immediate Medical Attention
              </div>
            )}

            <p><strong>Category:</strong> {result.condition_category}</p>
            <p><strong>Urgency:</strong> {result.urgency_level}</p>
            <p><strong>Consultation:</strong> {result.recommended_consultation_type}</p>
            <p><strong>Risk Score:</strong> {result.risk_score}/10</p>

            <p className="mt-3 text-gray-600">
              {result.explanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediAI;
