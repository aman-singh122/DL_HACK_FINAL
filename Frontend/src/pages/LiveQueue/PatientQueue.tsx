import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Activity, 
  Clock, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  Bell,
  User,
  Shield
} from "lucide-react";

/* ================= TYPES ================= */

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

/* ================= COMPONENT ================= */

export default function PatientQueue() {
  const { queueId } = useParams();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [myToken, setMyToken] = useState<number | null>(102);
  const [alertMsg, setAlertMsg] = useState("Dr. Smith is running 10 minutes ahead of schedule");
  const [departments, setDepartments] = useState<DepartmentStats[]>([
    { name: "General", waiting: 8, serving: 2, avgWait: 15 },
    { name: "Cardiology", waiting: 5, serving: 1, avgWait: 25 },
    { name: "Orthopedics", waiting: 3, serving: 1, avgWait: 20 },
  ]);
  const [timeFilter, setTimeFilter] = useState<"all" | "today" | "upcoming">("all");
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your turn is approaching", time: "2 min ago", read: false },
    { id: 2, message: "Queue moved faster than expected", time: "15 min ago", read: true },
  ]);

  /* ================= INIT ================= */

  useEffect(() => {
    setQueue([
      { tokenNumber: 100, status: "completed", urgency: "normal", patientName: "John Doe", department: "General", checkInTime: "09:00 AM", estimatedDuration: 15 },
      { tokenNumber: 101, status: "completed", urgency: "moderate", patientName: "Jane Smith", department: "Cardiology", checkInTime: "09:15 AM", estimatedDuration: 20 },
      { tokenNumber: 102, status: "serving", urgency: "critical", patientName: "You", department: "General", checkInTime: "09:30 AM", estimatedDuration: 25 },
      { tokenNumber: 103, status: "waiting", urgency: "critical", patientName: "Robert Brown", department: "General", checkInTime: "09:45 AM", estimatedDuration: 30 },
      { tokenNumber: 104, status: "waiting", urgency: "moderate", patientName: "Alice Johnson", department: "Orthopedics", checkInTime: "10:00 AM", estimatedDuration: 20 },
      { tokenNumber: 105, status: "waiting", urgency: "normal", patientName: "Michael Chen", department: "Cardiology", checkInTime: "10:15 AM", estimatedDuration: 15 },
      { tokenNumber: 106, status: "waiting", urgency: "normal", patientName: "Sarah Wilson", department: "General", checkInTime: "10:30 AM", estimatedDuration: 10 },
    ]);
  }, []);

  /* ================= HELPERS ================= */

  const urgencyConfig = {
    critical: { color: "bg-red-500", text: "text-red-600", icon: "🔴", label: "Critical" },
    moderate: { color: "bg-yellow-500", text: "text-yellow-600", icon: "🟡", label: "Moderate" },
    normal: { color: "bg-green-500", text: "text-green-600", icon: "🟢", label: "Normal" }
  };

  const statusConfig = {
    serving: { color: "bg-blue-100 border-blue-200 text-blue-800", icon: <Activity size={14} /> },
    completed: { color: "bg-gray-100 border-gray-200 text-gray-600", icon: <CheckCircle size={14} /> },
    waiting: { color: "bg-orange-50 border-orange-100 text-orange-700", icon: <Clock size={14} /> }
  };

  const myIndex = queue.findIndex((q) => q.tokenNumber === myToken);
  const servingIndex = queue.findIndex((q) => q.status === "serving");
  const patientsBeforeMe = myIndex > servingIndex ? myIndex - servingIndex : 0;
  const estimatedWaitTime = patientsBeforeMe * 7;
  const progressPercent = queue.length > 0 && myIndex !== -1 ? ((servingIndex + 1) / (myIndex + 1)) * 100 : 0;

  const waitingCount = queue.filter(q => q.status === "waiting").length;
  const servingCount = queue.filter(q => q.status === "serving").length;
  const completedCount = queue.filter(q => q.status === "completed").length;

  const upcomingPatients = queue.slice(servingIndex + 1, Math.min(servingIndex + 4, queue.length));

  /* ================= UI COMPONENTS ================= */

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
      <div className={`p-2 rounded-lg ${color} text-white`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  const DepartmentCard = ({ dept }: { dept: DepartmentStats }) => (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border p-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-800">{dept.name}</h4>
        <Shield size={18} className="text-blue-500" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{dept.waiting}</p>
          <p className="text-xs text-gray-500">Waiting</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{dept.serving}</p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-orange-600">{dept.avgWait}</p>
          <p className="text-xs text-gray-500">Avg Min</p>
        </div>
      </div>
    </div>
  );

  const NotificationBell = () => (
    <div className="relative">
      <Bell className="cursor-pointer text-gray-600" size={22} />
      {notifications.filter(n => !n.read).length > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
          {notifications.filter(n => !n.read).length}
        </span>
      )}
    </div>
  );

  /* ================= MAIN UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <TrendingUp size={24} />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Queue Tracker</h1>
            </div>
            <p className="text-gray-600">Real-time patient tracking across all departments</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <NotificationBell />
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border">
              <User size={18} className="text-gray-500" />
              <span className="font-medium">Patient Portal</span>
            </div>
          </div>
        </div>

        {/* ALERT BANNER */}
        {alertMsg && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="text-blue-600" size={20} />
            <p className="text-blue-800 font-medium">{alertMsg}</p>
            <button className="ml-auto text-sm text-blue-600 hover:text-blue-800 font-medium">
              Dismiss
            </button>
          </div>
        )}

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon={Users} label="Total Waiting" value={waitingCount} color="bg-blue-500" />
          <StatCard icon={Activity} label="Currently Serving" value={servingCount} color="bg-green-500" />
          <StatCard icon={CheckCircle} label="Completed Today" value={completedCount} color="bg-purple-500" />
          <StatCard icon={Clock} label="Avg Wait Time" value="18 min" color="bg-orange-500" />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN - MY STATUS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* MY TOKEN CARD */}
            {myToken && myIndex !== -1 && (
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Your Current Status</h2>
                    <p className="text-blue-200 text-sm">Token #{myToken} • {queue[myIndex]?.department}</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Clock size={24} />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-sm opacity-80">Position</p>
                    <p className="text-3xl font-bold">{patientsBeforeMe + 1}</p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-sm opacity-80">Est. Wait</p>
                    <p className="text-3xl font-bold">{estimatedWaitTime}<span className="text-lg">min</span></p>
                  </div>
                  <div className="text-center p-4 bg-white/10 rounded-xl">
                    <p className="text-sm opacity-80">Department</p>
                    <p className="text-xl font-bold">{queue[myIndex]?.department}</p>
                  </div>
                </div>

                {/* PROGRESS */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Queue Progress</span>
                    <span>{Math.round(progressPercent)}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-white/20 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-700 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* QUEUE VISUALIZATION */}
            <div className="bg-white rounded-2xl border p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Live Queue Visualization</h3>
                <div className="flex gap-2">
                  {["all", "today", "upcoming"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTimeFilter(filter as any)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                        timeFilter === filter
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUEUE LIST */}
              <div className="space-y-3">
                {queue.map((q) => {
                  const isMe = q.tokenNumber === myToken;
                  const isServing = q.status === "serving";
                  const urgency = urgencyConfig[q.urgency];
                  const status = statusConfig[q.status];

                  return (
                    <div
                      key={q.tokenNumber}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                        isMe
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : isServing
                          ? "border-green-500 bg-gradient-to-r from-green-50 to-white"
                          : "border-gray-100 bg-white hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          isMe ? "bg-blue-100" : "bg-gray-50"
                        }`}>
                          <span className={`text-lg font-bold ${urgency.text}`}>
                            #{q.tokenNumber}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-gray-900">
                              {q.patientName}
                              {isMe && (
                                <span className="ml-2 text-sm text-blue-600 font-medium">(You)</span>
                              )}
                            </p>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                              {status.icon}
                              {q.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{q.department}</span>
                            <span>•</span>
                            <span>Checked in: {q.checkInTime}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span className={`h-2 w-2 rounded-full ${urgency.color}`} />
                              {urgency.label}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{q.estimatedDuration} min</p>
                        <p className="text-sm text-gray-500">Est. duration</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - SIDEBAR */}
          <div className="space-y-6">
            
            {/* DEPARTMENTS */}
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Department Status</h3>
              <div className="space-y-4">
                {departments.map((dept) => (
                  <DepartmentCard key={dept.name} dept={dept} />
                ))}
              </div>
            </div>

            {/* UPCOMING PATIENTS */}
            <div className="bg-white rounded-2xl border p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Next in Line</h3>
              <div className="space-y-4">
                {upcomingPatients.map((patient, idx) => (
                  <div key={patient.tokenNumber} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div>
                      <p className="font-semibold">Token #{patient.tokenNumber}</p>
                      <p className="text-sm text-gray-500">{patient.patientName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">~{idx * 7 + 7} min</p>
                      <p className="text-xs text-gray-500">Est. wait</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NOTIFICATIONS */}
            <div className="bg-white rounded-2xl border p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Notifications</h3>
                <span className="text-sm text-blue-600 cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-3 rounded-lg border-l-4 ${
                      notif.read 
                        ? "border-l-gray-300 bg-gray-50" 
                        : "border-l-blue-500 bg-blue-50"
                    }`}
                  >
                    <p className="font-medium">{notif.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-white rounded-xl border hover:shadow-md transition text-center">
                  <span className="block font-medium">Reschedule</span>
                </button>
                <button className="p-3 bg-white rounded-xl border hover:shadow-md transition text-center">
                  <span className="block font-medium">Get Directions</span>
                </button>
                <button className="p-3 bg-white rounded-xl border hover:shadow-md transition text-center">
                  <span className="block font-medium">Share Status</span>
                </button>
                <button className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-center">
                  <span className="block font-medium">Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Queue updates every 30 seconds • Last updated: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          <p className="mt-2">Need assistance? Contact hospital reception at extension 1234</p>
        </div>
      </div>
    </div>
  );
}