import { useState, useEffect } from "react";
import { runTriageAI, getTriageHistory } from "@/api/ai.api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  riskScore?: number;
}

const MediAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  /* ================= FETCH HISTORY ================= */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getTriageHistory();
        setHistory(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHistory();
  }, []);

  /* ================= SEND MESSAGE (Backend Connected) ================= */
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    try {
      const res = await runTriageAI({
        symptoms: userMessage.content,
        age: Number(age) || 0,
        gender,
      });

      const aiData = res.data.data.result || res.data.data;
      setResult(aiData);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiData.explanation,
        timestamp: new Date(),
        riskScore: aiData.risk_score,
      };

      setMessages((prev) => [...prev, aiMessage]);

      const historyRes = await getTriageHistory();
      setHistory(historyRes.data.data);

    } catch (error) {
      console.error(error);
      alert("AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* ================= HEADER ================= */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">MedoSphere</h1>
          <p className="text-xs text-gray-500">AI Healthcare Assistant</p>
        </div>

        <div className="flex gap-3">
          <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">Online</span>
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">Secure</span>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-12 gap-6 p-6">

        {/* ================= LEFT PANEL ================= */}
        <div className="col-span-3 bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold mb-4">Consultations</h2>
          <div className="text-center text-gray-400 mt-10">
            No consultations yet
          </div>
        </div>

        {/* ================= CENTER CHAT ================= */}
        <div className="col-span-6 bg-white rounded-2xl shadow flex flex-col h-[75vh]">

          <div className="p-4 border-b font-semibold">
            Dr. AI Assistant
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-xs ${
                    msg.role === "user"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p>{msg.content}</p>

                  {msg.riskScore !== undefined && (
                    <p className="text-xs mt-2 font-semibold">
                      Risk: {msg.riskScore}/10
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Describe your symptoms..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 border rounded-lg px-3 py-2"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="col-span-3 space-y-6">

          {/* Latest Result */}
          {result && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="font-semibold mb-4">Latest Assessment</h3>

              {result.urgency_level === "high" && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-semibold">
                  ⚠ High Urgency — Seek Immediate Medical Attention
                </div>
              )}

              <p><strong>Category:</strong> {result.condition_category}</p>
              <p><strong>Risk:</strong> {result.risk_score}/10</p>
              <p><strong>Consultation:</strong> {result.recommended_consultation_type}</p>
            </div>
          )}

          {/* Medical History */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Medical History</h3>

            {history.slice(0,3).map((item, index) => (
              <div key={index} className="mb-3 border p-3 rounded-lg text-sm">
                <p className="text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p><strong>Symptoms:</strong> {item.symptoms}</p>
                <p>
                  <strong>Risk:</strong> {item.result?.risk_score}/10
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <button
              onClick={() => (window.location.href = "/consult")}
              className="w-full bg-green-600 text-white py-2 rounded-lg mb-3"
            >
              Book Appointment
            </button>
            <button
              onClick={() => (window.location.href = "/hospitals")}
              className="w-full bg-red-600 text-white py-2 rounded-lg"
            >
              Find Hospitals
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MediAI;
