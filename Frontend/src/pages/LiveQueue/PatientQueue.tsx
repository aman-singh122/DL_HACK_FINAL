import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Activity,
  Clock,
  Users,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Bell,
  User,
  ShieldCheck,
  Building2,
  Calendar,
  ArrowRight,
  Phone,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface QueueItem {
  tokenNumber: number;
  status: "waiting" | "serving" | "completed";
  urgency: "normal" | "moderate" | "critical";
  patientName: string;
  department: string;
  checkInTime: string;
  estimatedDuration: number;
}

interface DepartmentStats {
  name: string;
  waiting: number;
  serving: number;
  avgWait: number;
}

export default function PatientQueue() {
  const { queueId } = useParams();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [myToken, setMyToken] = useState<number | null>(102);
  const [departments, setDepartments] = useState<DepartmentStats[]>([
    { name: "General Medicine", waiting: 8, serving: 2, avgWait: 15 },
    { name: "Cardiology", waiting: 5, serving: 1, avgWait: 25 },
    { name: "Orthopedics", waiting: 3, serving: 1, avgWait: 20 },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your turn is approaching (2 patients ahead).", time: "2 min ago", read: false },
    { id: 2, message: "OPD Room 4 consultation speed is running on schedule.", time: "15 min ago", read: true },
  ]);

  useEffect(() => {
    setQueue([
      { tokenNumber: 100, status: "completed", urgency: "normal", patientName: "J. D.", department: "General Medicine", checkInTime: "09:00 AM", estimatedDuration: 15 },
      { tokenNumber: 101, status: "completed", urgency: "moderate", patientName: "S. K.", department: "General Medicine", checkInTime: "09:15 AM", estimatedDuration: 20 },
      { tokenNumber: 102, status: "serving", urgency: "critical", patientName: "You (Token #102)", department: "General Medicine", checkInTime: "09:30 AM", estimatedDuration: 25 },
      { tokenNumber: 103, status: "waiting", urgency: "moderate", patientName: "R. B.", department: "General Medicine", checkInTime: "09:45 AM", estimatedDuration: 30 },
      { tokenNumber: 104, status: "waiting", urgency: "normal", patientName: "A. J.", department: "General Medicine", checkInTime: "10:00 AM", estimatedDuration: 20 },
      { tokenNumber: 105, status: "waiting", urgency: "normal", patientName: "M. C.", department: "General Medicine", checkInTime: "10:15 AM", estimatedDuration: 15 },
      { tokenNumber: 106, status: "waiting", urgency: "normal", patientName: "S. W.", department: "General Medicine", checkInTime: "10:30 AM", estimatedDuration: 10 },
    ]);
  }, []);

  const myIndex = queue.findIndex((q) => q.tokenNumber === myToken);
  const servingIndex = queue.findIndex((q) => q.status === "serving");
  const servingItem = queue[servingIndex];
  const patientsBeforeMe = myIndex > servingIndex ? myIndex - servingIndex : 0;
  const estimatedWaitTime = patientsBeforeMe * 8;

  const waitingCount = queue.filter((q) => q.status === "waiting").length;
  const servingCount = queue.filter((q) => q.status === "serving").length;
  const completedCount = queue.filter((q) => q.status === "completed").length;

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Priority Level 1</span>;
      case "moderate":
        return <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Level 2</span>;
      default:
        return <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Routine</span>;
    }
  };

  const getStatusPill = (status: string) => {
    switch (status) {
      case "serving":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Inside Consultation
          </span>
        );
      case "waiting":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Clock className="w-3 h-3 text-amber-500" />
            In Corridor Queue
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            <CheckCircle className="w-3 h-3 text-slate-400" />
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Telemetry Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Hospital OPD Telemetry
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Room 4 • OPD Wing B</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Real-Time Outpatient Corridor Queue
            </h1>
            <p className="text-xs text-slate-500">
              Live token stream updated via hospital HIS WebSocket server.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Telemetry Connected
            </span>
          </div>
        </div>

        {/* ================= TOKEN SPOTLIGHT CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Currently Serving */}
          <div className="bg-slate-900 text-white rounded-lg p-5 shadow-sm border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Currently Inside Consultation Room
              </span>
              <div className="text-4xl font-extrabold text-white font-mono mt-2">
                Token #{servingItem ? servingItem.tokenNumber : "102"}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                General Medicine • Room 4 (Dr. Arvind Saxena)
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Avg Consult Duration</span>
              <span className="font-mono text-slate-200 font-bold">12-15 Mins</span>
            </div>
          </div>

          {/* Card 2: My Token Position */}
          <div className="bg-white border-2 border-sky-600 rounded-lg p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-sky-800 uppercase tracking-wider">
                  Your Digital OPD Token
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Confirmed
                </span>
              </div>
              <div className="text-4xl font-extrabold text-sky-700 font-mono mt-2">
                Token #{myToken}
              </div>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                {myIndex === servingIndex ? "It is your turn! Please enter Room 4." : `${patientsBeforeMe} patient(s) ahead of you`}
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Est. Wait Time</span>
              <span className="font-mono text-slate-900 font-bold">
                {myIndex === servingIndex ? "0 Min (Now)" : `~${estimatedWaitTime} Minutes`}
              </span>
            </div>
          </div>

          {/* Card 3: Queue Summary Stats */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Corridor Queue Metrics
              </span>
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div className="p-2 rounded bg-slate-50 border border-slate-100">
                  <p className="text-xl font-bold text-slate-900 font-mono">{waitingCount}</p>
                  <p className="text-[10px] text-slate-500">Waiting</p>
                </div>
                <div className="p-2 rounded bg-emerald-50 border border-emerald-100">
                  <p className="text-xl font-bold text-emerald-700 font-mono">{servingCount}</p>
                  <p className="text-[10px] text-emerald-600">Serving</p>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-100">
                  <p className="text-xl font-bold text-slate-400 font-mono">{completedCount}</p>
                  <p className="text-[10px] text-slate-400">Done</p>
                </div>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Shift Progress</span>
              <span className="font-mono text-slate-900 font-bold">64% Checked In</span>
            </div>
          </div>
        </div>

        {/* ================= QUEUE TABLE & SIDE PANEL ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Queue Sequence Table (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-sky-700" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Live Token Sequence
                </h3>
              </div>
              <span className="text-[11px] text-slate-400">Anonymized for patient privacy</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Token</th>
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Check-In</th>
                    <th className="py-3 px-4">Triage Priority</th>
                    <th className="py-3 px-4 text-right">Queue Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {queue.map((item) => {
                    const isMe = item.tokenNumber === myToken;
                    return (
                      <tr
                        key={item.tokenNumber}
                        className={`transition-colors ${
                          isMe
                            ? "bg-sky-50/70 font-semibold"
                            : item.status === "serving"
                            ? "bg-emerald-50/40"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          #{item.tokenNumber}
                          {isMe && <span className="ml-1 text-[10px] text-sky-700">(You)</span>}
                        </td>
                        <td className="py-3 px-4 text-slate-800">{item.patientName}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{item.checkInTime}</td>
                        <td className="py-3 px-4">{getUrgencyBadge(item.urgency)}</td>
                        <td className="py-3 px-4 text-right">{getStatusPill(item.status)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Department Telemetry & Hospital Desk (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Department Breakdown */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Department Corridors
                </span>
                <span className="text-[10px] font-mono text-slate-400">Live</span>
              </div>

              <div className="space-y-2">
                {departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="p-3 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{dept.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{dept.waiting} waiting in queue</p>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-xs font-bold text-slate-900">~{dept.avgWait}m</span>
                      <span className="block text-[10px] text-slate-400">Avg Wait</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Alerts Notification Panel */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <Bell className="h-3.5 w-3.5 text-sky-700" />
                  <span>OPD Announcements</span>
                </div>
              </div>

              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-md bg-sky-50/50 border border-sky-100 text-xs space-y-1">
                    <p className="font-semibold text-slate-800 leading-snug">{n.message}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reception Helpline */}
            <div className="p-4 rounded-lg bg-slate-900 text-white space-y-2 border border-slate-800">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-sky-400" />
                <span className="text-xs font-bold uppercase tracking-wider">OPD Reception Help</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                If you have missed your token call, please report to Reception Counter Desk 2 immediately.
              </p>
              <p className="font-mono text-xs text-sky-400 font-bold">Extension: #402</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}