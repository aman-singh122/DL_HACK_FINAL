import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useMyAppointments } from "@/hooks/useMyAppointments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Clock,
  Building2,
  User,
  Video,
  Stethoscope,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  XCircle,
  CalendarPlus,
  FileText,
  AlertCircle
} from "lucide-react";

const Appointments = () => {
  const { appointments, loading } = useMyAppointments();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAppointments = appointments.filter((appt) => {
    // Status tab filter
    const status = appt.status?.toLowerCase();
    if (activeTab === "upcoming" && status !== "confirmed" && status !== "booked") return false;
    if (activeTab === "past" && status !== "completed") return false;
    if (activeTab === "cancelled" && status !== "cancelled") return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const docName = (appt.doctor?.doctorName || "").toLowerCase();
      const hospName = (appt.hospital?.hospitalName || "").toLowerCase();
      const dept = (appt.doctor?.department || "").toLowerCase();
      return docName.includes(q) || hospName.includes(q) || dept.includes(q);
    }
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "booked":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Confirmed
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-200">
            <CheckCircle2 className="h-3 w-3 text-slate-500" />
            Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-rose-50 text-rose-700 border-rose-200">
            <XCircle className="h-3 w-3 text-rose-500" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 text-amber-500" />
            Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-full" />
          <div className="space-y-3 pt-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header & New Booking Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Clinical Appointments Registry
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and manage your in-person hospital visits and tele-consultations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-4 rounded-md shadow-sm">
              <Link to="/book-opd" className="flex items-center gap-1.5">
                <CalendarPlus className="h-4 w-4" />
                <span>New In-Person OPD</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-9 px-4 rounded-md">
              <Link to="/consult" className="flex items-center gap-1.5">
                <Video className="h-4 w-4 text-sky-700" />
                <span>New Video Consult</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All Visits", count: appointments.length },
              {
                id: "upcoming",
                label: "Upcoming",
                count: appointments.filter(
                  (a) => a.status === "confirmed" || a.status === "booked"
                ).length,
              },
              {
                id: "past",
                label: "Completed",
                count: appointments.filter((a) => a.status === "completed").length,
              },
              {
                id: "cancelled",
                label: "Cancelled",
                count: appointments.filter((a) => a.status === "cancelled").length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-sky-50 text-sky-700 border border-sky-200/80"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? "bg-sky-200/60 text-sky-800" : "bg-slate-100 text-slate-500"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter doctor or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No Appointments Match Criteria</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              There are no medical appointments found under the selected status filter or search query.
            </p>
            <Button asChild size="sm" className="bg-sky-700 hover:bg-sky-800 text-white text-xs">
              <Link to="/book-opd">Book OPD Visit</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAppointments.map((appt) => {
              const isVirtual = appt.bookingType === "online" || appt.appointmentType === "online";
              return (
                <div
                  key={appt._id}
                  className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {isVirtual ? <Video className="h-5 w-5" /> : <Stethoscope className="h-5 w-5" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">
                          {appt.doctor?.doctorName || "Consultant Specialist"}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                          isVirtual 
                            ? "bg-purple-50 text-purple-700 border-purple-200" 
                            : "bg-sky-50 text-sky-700 border-sky-200"
                        }`}>
                          {isVirtual ? "Virtual Tele-Consult" : "In-Person OPD"}
                        </span>
                        {getStatusBadge(appt.status)}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Building2 className="h-3.5 w-3.5 text-slate-400" />
                        <span>{appt.hospital?.hospitalName || "Medical Center"}</span>
                        {appt.doctor?.department && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-slate-700">{appt.doctor.department}</span>
                          </>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-600">
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {appt.schedule?.date
                            ? new Date(appt.schedule.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "Scheduled"}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-slate-700">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {appt.schedule?.timeSlot || "Standard Shift"}
                        </span>
                        {appt.tokenNumber && (
                          <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                            Token #{appt.tokenNumber}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-end">
                    {isVirtual && (appt.status === "confirmed" || appt.status === "booked") && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-8 px-3.5 shadow-sm"
                      >
                        <Link to={`/room/${appt._id}`} className="flex items-center gap-1">
                          <Video className="h-3.5 w-3.5" />
                          <span>Join Video</span>
                        </Link>
                      </Button>
                    )}

                    {!isVirtual && (appt.status === "confirmed" || appt.status === "booked") && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-8 px-3.5"
                      >
                        <Link to={`/live-queue/QUEUE_1`}>Live Queue</Link>
                      </Button>
                    )}

                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-8 px-3.5"
                    >
                      <Link to={`/appointments/${appt._id}`}>View Dossier</Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Appointments;