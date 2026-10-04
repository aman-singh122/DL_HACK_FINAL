import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Search, 
  Filter, 
  UploadCloud, 
  FileText, 
  User, 
  CheckCircle, 
  XCircle, 
  Printer, 
  RefreshCw,
  AlertCircle,
  Building2,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getHospitalAppointments } from "../api/hospital.api";

type Appointment = {
  _id: string;
  patient: { name: string; _id: string; age?: number; gender?: string; phone?: string };
  doctor: { doctorName: string; _id: string; department?: string };
  schedule: { date: string; timeSlot: string };
  status: "scheduled" | "completed" | "cancelled" | "pending" | "no-show";
  tokenNumber?: number;
};

const HospitalAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await getHospitalAppointments();
      setAppointments(res.data?.appointments || []);
    } catch (err) {
      console.error("Failed to load appointments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appt) => {
      const pName = (appt.patient?.name || "").toLowerCase();
      const dName = (appt.doctor?.doctorName || "").toLowerCase();
      const idMatch = (appt._id || "").toLowerCase();
      const matchesSearch =
        pName.includes(searchTerm.toLowerCase()) ||
        dName.includes(searchTerm.toLowerCase()) ||
        idMatch.includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || appt.status?.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [appointments, searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "scheduled":
      case "confirmed":
      case "booked":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Scheduled
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded border bg-slate-100 text-slate-700 border-slate-200">
            <CheckCircle className="h-3 w-3 text-slate-400" />
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
            Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-12 w-full" />
        <div className="space-y-2 pt-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Hospital Outpatient Registry & Scheduling
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage daily outpatient tokens, update consultation status, and upload diagnostic reports.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchAppointments}
          className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-9 px-3 gap-1.5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sync Hospital HIS</span>
        </Button>
      </div>

      {/* Toolbar & Filter Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: `All Consultations (${appointments.length})` },
            { id: "scheduled", label: "Scheduled" },
            { id: "completed", label: "Completed" },
            { id: "cancelled", label: "Cancelled" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                statusFilter === tab.id
                  ? "bg-sky-700 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search patient, doctor, token..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Appointments Clinical Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Patient UHID & Name</th>
                <th className="py-3 px-4">Attending Doctor</th>
                <th className="py-3 px-4">Consultation Shift</th>
                <th className="py-3 px-4">Token #</th>
                <th className="py-3 px-4">Clinical Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                    No clinical appointments match your current search or status filter.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Patient */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-900">{appt.patient?.name || "Patient"}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        UHID: {appt.patient?._id?.slice(-8).toUpperCase() || appt._id.slice(-6).toUpperCase()}
                      </p>
                    </td>

                    {/* Doctor */}
                    <td className="py-3.5 px-4">
                      <p className="font-medium text-slate-800">{appt.doctor?.doctorName || "Consultant"}</p>
                      <p className="text-[10px] text-slate-500">{appt.doctor?.department || "General OPD"}</p>
                    </td>

                    {/* Schedule */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span>
                          {appt.schedule?.date
                            ? new Date(appt.schedule.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                              })
                            : "Today"}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                        {appt.schedule?.timeSlot || "Standard Shift"}
                      </p>
                    </td>

                    {/* Token */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      #{appt.tokenNumber || "102"}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(appt.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          asChild
                          size="sm"
                          className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-7 px-3"
                        >
                          <Link to={`/hospital/upload-report/${appt._id}`}>
                            <UploadCloud className="h-3.5 w-3.5 mr-1" />
                            Upload Report
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HospitalAppointments;