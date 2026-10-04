import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useMyAppointments } from "@/hooks/useMyAppointments";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  CalendarPlus,
  Video,
  FileText,
  MessageSquare,
  Clock,
  Stethoscope,
  Building2,
  ChevronRight,
  ShieldCheck,
  Activity,
  AlertCircle,
  Calendar,
  User,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Search,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { appointments, loading: appointmentsLoading } = useMyAppointments();
  const navigate = useNavigate();

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "booked" || a.status === "confirmed"
  );
  const nextAppointment = upcomingAppointments[0];

  const quickActions = [
    {
      title: "Book OPD Appointment",
      description: "Schedule in-person hospital visits",
      icon: CalendarPlus,
      path: "/book-opd",
      badge: "In-Person",
    },
    {
      title: "Tele-Consultation",
      description: "Video consultation with specialists",
      icon: Video,
      path: "/consult",
      badge: "Virtual",
    },
    {
      title: "Medical Records (EHR)",
      description: "Access lab reports & prescriptions",
      icon: FileText,
      path: "/records",
      badge: "ABDM",
    },
    {
      title: "Clinical AI Triage",
      description: "Evidence-based symptom evaluation",
      icon: MessageSquare,
      path: "/medichat",
      badge: "Assist",
    },
  ];

  if (authLoading || appointmentsLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-28 w-full rounded-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-80 lg:col-span-2 rounded-lg" />
            <Skeleton className="h-80 rounded-lg" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="min-h-[400px] flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 bg-white border border-slate-200 rounded-lg shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center mx-auto">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Clinical Authentication Required</h2>
            <p className="text-xs text-slate-600">
              Please sign in to access your confidential medical dashboard, appointments, and diagnostic records.
            </p>
            <Button asChild className="bg-sky-700 hover:bg-sky-800 text-white text-xs">
              <Link to="/login">Sign In to Continue</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ================= PATIENT WELCOME & CLINICAL BANNER ================= */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Patient Medical Portal
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">
                {new Date().toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Welcome, {user.name || "Patient"}
            </h2>
            <p className="text-xs text-slate-500">
              UHID: <span className="font-mono text-slate-700 font-semibold">{user._id?.slice(-8).toUpperCase() || "MEDO-001"}</span> • ABHA Linked • All Systems Operational
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              asChild
              className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-4 rounded-md shadow-sm"
            >
              <Link to="/book-opd" className="flex items-center gap-1.5">
                <CalendarPlus className="h-4 w-4" />
                <span>Book OPD Slot</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-9 px-4 rounded-md"
            >
              <Link to="/consult" className="flex items-center gap-1.5">
                <Video className="h-4 w-4 text-sky-700" />
                <span>Tele-Consult</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* ================= 4 KEY CLINICAL METRICS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Active Appointments */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Active Appointments</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {upcomingAppointments.length}
              </h3>
              <p className="text-[11px] text-sky-700 font-medium mt-1">
                {upcomingAppointments.length > 0 ? "Upcoming care scheduled" : "No pending visits"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
          </div>

          {/* Card 2: Live Queue Tracker */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Live OPD Queue</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Active
              </h3>
              <Link to="/live-queue/QUEUE_1" className="text-[11px] text-emerald-600 hover:underline font-medium mt-1 block">
                Track live corridor tokens →
              </Link>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <Activity className="h-5 w-5" />
            </div>
          </div>

          {/* Card 3: Diagnostic Records */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Health Records (EHR)</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                Centralized
              </h3>
              <Link to="/records" className="text-[11px] text-sky-700 hover:underline font-medium mt-1 block">
                Prescriptions & Lab tests →
              </Link>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5" />
            </div>
          </div>

          {/* Card 4: Clinical AI Status */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Clinical Triage</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                24/7 Ready
              </h3>
              <Link to="/medichat" className="text-[11px] text-sky-700 hover:underline font-medium mt-1 block">
                Evaluate symptoms →
              </Link>
            </div>
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* ================= QUICK CLINICAL ACTIONS ================= */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Care Access & Services
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link
                  key={i}
                  to={action.path}
                  className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {action.badge}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {action.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-sky-700 font-medium">
                    <span>Open Module</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ================= TWO-COLUMN CLINICAL PANELS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Upcoming Appointments (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-sky-700" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Upcoming Appointments Schedule
                  </h3>
                </div>
                <Link
                  to="/appointments"
                  className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
                >
                  <span>View All Records</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="p-5">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-700">No Upcoming Appointments</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      You do not have any pending outpatient or virtual appointments scheduled at this time.
                    </p>
                    <Button asChild size="sm" className="bg-sky-700 hover:bg-sky-800 text-white text-xs mt-2">
                      <Link to="/book-opd">Book OPD Visit</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {upcomingAppointments.slice(0, 3).map((appt) => {
                      const isVirtual = appt.bookingType === "online" || appt.appointmentType === "online";
                      return (
                        <div
                          key={appt._id}
                          className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                              {isVirtual ? <Video className="h-5 w-5" /> : <Stethoscope className="h-5 w-5" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-900">
                                  {appt.doctor?.doctorName || "Specialist Physician"}
                                </h4>
                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                                  isVirtual 
                                    ? "bg-purple-50 text-purple-700 border-purple-200" 
                                    : "bg-sky-50 text-sky-700 border-sky-200"
                                }`}>
                                  {isVirtual ? "Virtual Tele-Consult" : "In-Person OPD"}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {appt.hospital?.hospitalName || "Hospital Medical Center"}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                  {appt.schedule?.date ? new Date(appt.schedule.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Scheduled"}
                                </span>
                                <span className="flex items-center gap-1 font-mono">
                                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                                  {appt.schedule?.timeSlot || "Standard Shift"}
                                </span>
                                {appt.tokenNumber && (
                                  <span className="font-semibold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                                    Token #{appt.tokenNumber}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {isVirtual && (
                              <Button
                                asChild
                                size="sm"
                                className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-8 px-3"
                              >
                                <Link to={`/room/${appt._id}`}>Join Video</Link>
                              </Button>
                            )}
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="border-slate-300 text-slate-700 text-xs h-8 px-3"
                            >
                              <Link to={`/appointments/${appt._id}`}>Dossier</Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Clinical Status & Guidelines (1 Col) */}
          <div className="space-y-4">
            {/* National Health Card Box */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Health System ID
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <CheckCircle2 className="h-3 w-3" /> Active
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-md border border-slate-200 font-mono text-xs text-slate-800">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Ayushman Bharat (ABHA)</p>
                <p className="font-bold text-sm text-slate-900 mt-0.5">
                  91-4421-8890-3312
                </p>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Your medical history and prescriptions are securely linked to this identifier across empanelled healthcare facilities.
              </p>
            </div>

            {/* Clinical Assistance Box */}
            <div className="bg-slate-900 text-white rounded-lg p-5 space-y-3 shadow-sm border border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-sky-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Emergency Protocols
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you experience severe chest pain, breathing difficulty, or trauma, contact emergency services immediately.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Emergency Dispatch</span>
                <span className="font-mono text-sky-400 font-bold">102 / 108</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
