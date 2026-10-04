import { useState, useEffect } from "react";
import { runTriageAI, getTriageHistory } from "@/api/ai.api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  User,
  ShieldCheck,
  Stethoscope,
  Building2,
  CalendarPlus,
  Video,
  Info,
  History,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  riskScore?: number;
  urgencyLevel?: string;
  category?: string;
  department?: string;
}

const MediAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [age, setAge] = useState<number | "">(28);
  const [gender, setGender] = useState("male");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);

  /* ================= FETCH HISTORY ================= */
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getTriageHistory();
        setHistory(res.data?.data || []);
      } catch (error) {
        console.error("Failed to load triage history", error);
      }
    };
    fetchHistory();
  }, []);

  /* ================= SEND MESSAGE ================= */
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setLoading(true);

    try {
      const res = await runTriageAI({
        symptoms: currentInput,
        age: Number(age) || 0,
        gender,
      });

      const aiData = res.data?.data?.result || res.data?.data || {};
      setResult(aiData);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiData.explanation || "Clinical evaluation complete. Please review the triage findings below.",
        timestamp: new Date(),
        riskScore: aiData.risk_score,
        urgencyLevel: aiData.urgency_level,
        category: aiData.condition_category,
        department: aiData.recommended_department,
      };

      setMessages((prev) => [...prev, aiMessage]);

      const historyRes = await getTriageHistory();
      setHistory(historyRes.data?.data || []);
    } catch (error: any) {
      console.error(error);
      toast.error("Clinical AI analysis failed. Please verify network connectivity.");
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (level?: string, score?: number) => {
    const norm = (level || "").toLowerCase();
    if (norm === "high" || norm === "emergency" || (score && score >= 7)) {
      return {
        label: "High Clinical Urgency (Level 1-2)",
        color: "bg-rose-50 text-rose-700 border-rose-200",
        indicator: "bg-rose-500",
      };
    }
    if (norm === "moderate" || norm === "urgent" || (score && score >= 4)) {
      return {
        label: "Moderate Priority (Level 3)",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        indicator: "bg-amber-500",
      };
    }
    return {
      label: "Routine / Low Urgency (Level 4-5)",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      indicator: "bg-emerald-500",
    };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Clinical Triage Protocol Banner */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 leading-snug">
                  Clinical AI Decision Support & Symptom Triage
                </h1>
                <span className="text-[10px] font-semibold text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                  Clinical Protocol v3.4
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Evaluates symptom severity, provides medical risk stratification, and recommends relevant outpatient specialties.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Confidential Medical Triage</span>
          </div>
        </div>

        {/* ================= MAIN INTERFACE GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Clinical Feed (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden h-[680px]">
            {/* Patient Demographics Strip */}
            <div className="p-3 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Patient Parameters:
                </span>

                <div className="flex items-center gap-2">
                  <label className="text-slate-600">Age:</label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    value={age}
                    onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                    className="w-16 h-7 text-xs px-2 rounded border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 font-mono text-slate-800"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-slate-600">Gender:</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="h-7 text-xs px-2 rounded border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 text-slate-800"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/40 clinical-scrollbar">
              {messages.length === 0 && (
                <div className="text-center py-16 px-4 space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center mx-auto">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Clinical Symptom Evaluation Ready
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                    Describe your symptoms, onset time, and any associated discomfort. The clinical triage model will calculate risk urgency and suggest appropriate medical care.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
                    {[
                      "Severe migraine with nausea since 2 hours",
                      "Persistent dry cough and mild fever for 3 days",
                      "Acute lower back pain after lifting weights",
                    ].map((sample, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => setInputValue(sample)}
                        className="text-[11px] px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700 transition-colors shadow-2xs"
                      >
                        "{sample}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg) => {
                const isUser = msg.role === "user";
                const urgency = msg.urgencyLevel ? getUrgencyBadge(msg.urgencyLevel, msg.riskScore) : null;

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex items-start gap-2.5 max-w-[85%]">
                      {!isUser && (
                        <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm">
                          <Stethoscope className="h-4 w-4" />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <div
                          className={`p-4 rounded-lg text-xs leading-relaxed ${
                            isUser
                              ? "bg-sky-700 text-white shadow-sm"
                              : "bg-white border border-slate-200 text-slate-800 shadow-sm"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>

                          {/* Structured Clinical Triage Card */}
                          {!isUser && urgency && (
                            <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border inline-flex items-center gap-1.5 ${urgency.color}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${urgency.indicator}`}></span>
                                  {urgency.label}
                                </span>
                                {msg.riskScore !== undefined && (
                                  <span className="text-[11px] font-mono font-bold text-slate-700">
                                    Risk Score: {msg.riskScore}/10
                                  </span>
                                )}
                              </div>

                              {msg.category && (
                                <p className="text-[11px] text-slate-600">
                                  <strong>Category:</strong> {msg.category}
                                </p>
                              )}

                              {msg.department && (
                                <div className="p-2 rounded bg-sky-50 border border-sky-100 flex items-center justify-between text-[11px] text-sky-900 mt-2">
                                  <span>Recommended: <strong>{msg.department}</strong></span>
                                  <Link
                                    to="/book-opd"
                                    className="font-semibold text-sky-700 hover:underline flex items-center gap-1"
                                  >
                                    Book OPD →
                                  </Link>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <p className={`text-[10px] text-slate-400 ${isUser ? "text-right" : "text-left"} px-1`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>

                      {isUser && (
                        <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2.5 max-w-[85%]">
                    <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center flex-shrink-0">
                      <Stethoscope className="h-4 w-4" />
                    </div>
                    <div className="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-500 flex items-center gap-2 shadow-sm">
                      <div className="w-3.5 h-3.5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>Evaluating clinical triage model against ICD-10 protocols...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Describe patient symptoms (e.g. sharp headache, chest tightness, fever, duration)..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !loading && handleSendMessage()}
                  disabled={loading}
                  className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-600 text-slate-900 placeholder:text-slate-400 bg-slate-50 focus:bg-white"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={loading || !inputValue.trim()}
                  className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-4 rounded-md shadow-sm"
                >
                  <Send className="h-3.5 w-3.5 mr-1" />
                  <span>Evaluate</span>
                </Button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Clinical decision support only. In case of acute emergency, dial 102/108 immediately.
              </p>
            </div>
          </div>

          {/* Side Panel: Assessment Summary & Triage History (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Active Triage Findings */}
            {result ? (
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Triage Analysis Summary
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Just Now</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-md bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Classification</span>
                    <p className="font-bold text-slate-900 text-sm">{result.condition_category || "General Clinical"}</p>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-md bg-slate-50 border border-slate-100">
                    <span className="text-slate-600">Calculated Risk Score</span>
                    <span className="font-bold font-mono text-slate-900 text-sm">
                      {result.risk_score || "4"}/10
                    </span>
                  </div>

                  {result.recommended_department && (
                    <div className="p-3 rounded-md bg-sky-50 border border-sky-100 space-y-2">
                      <span className="text-[10px] text-sky-800 uppercase font-semibold">Recommended Specialty</span>
                      <p className="font-bold text-sky-950 text-sm">{result.recommended_department}</p>
                      <Button asChild size="sm" className="w-full bg-sky-700 hover:bg-sky-800 text-white text-xs h-8">
                        <Link to="/book-opd">Book Department Appointment</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-2 text-center">
                <Info className="h-6 w-6 text-slate-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-900">Awaiting Clinical Input</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Enter your current symptoms in the dialogue panel to generate structured risk scores and department recommendations.
                </p>
              </div>
            )}

            {/* Historical Triage Log */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <History className="h-3.5 w-3.5 text-slate-500" />
                  <span>Previous Triage Logs</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{history.length}</span>
              </div>

              {history.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No past evaluations recorded.</p>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto clinical-scrollbar">
                  {history.slice(0, 5).map((item, idx) => (
                    <div
                      key={item._id || idx}
                      className="p-2.5 rounded-md border border-slate-100 bg-slate-50 hover:bg-slate-100/60 transition-colors text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 truncate max-w-[140px]">
                          {item.symptoms || "Clinical Query"}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "Logged"}
                        </span>
                      </div>
                      {item.result?.condition_category && (
                        <p className="text-[10px] text-slate-500 mt-1 truncate">
                          {item.result.condition_category}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency Hospital Helpline */}
            <div className="p-4 rounded-lg bg-slate-900 text-white space-y-2 border border-slate-800">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Critical Care Help</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                National Ambulance & Trauma Hotline available 24 hours.
              </p>
              <div className="pt-1 font-mono text-sm font-bold text-sky-400">
                102 (Ambulance) • 108 (Disaster)
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MediAI;