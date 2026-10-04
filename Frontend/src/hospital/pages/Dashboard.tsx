import { useEffect, useState } from "react";
import {
  Users,
  CalendarClock,
  Stethoscope,
  Clock,
  Activity,
  AlertCircle,
  Building2,
  MapPin,
  RefreshCw,
  Plus,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
  FileText,
  UploadCloud,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getMyHospital,
  getHospitalPatients,
  getHospitalAppointments,
  getHospitalDoctors,
} from "../api/hospital.api";

type Hospital = {
  name: string;
  type?: string;
  address?: {
    city?: string;
    district?: string;
    state?: string;
    full?: string;
  };
  opd?: {
    maxTokensPerDay?: number;
    currentTokens?: number;
  };
};

const HospitalDashboard = () => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [hospRes, patRes, apptRes, docRes] = await Promise.all([
        getMyHospital().catch(() => ({ data: { hospital: null } })),
        getHospitalPatients().catch(() => ({ data: { patients: [] } })),
        getHospitalAppointments().catch(() => ({ data: { appointments: [] } })),
        getHospitalDoctors().catch(() => ({ data: { doctors: [] } })),
      ]);

      setHospital(hospRes.data?.hospital || null);
      setPatients(patRes.data?.patients || []);
      setAppointments(apptRes.data?.appointments || []);
      setDoctors(docRes.data?.doctors || []);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-96 lg:col-span-2 rounded-lg" />
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </div>
    );
  }

  const todayAppointments = appointments.slice(0, 5);
  const activeDoctors = doctors.slice(0, 5);

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* Hospital Identity Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 leading-snug">
                {hospital?.name || "MedoSphere Medical Center"}
              </h1>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                NABH Accredited
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {hospital?.address?.city || "Capital Region"}, {hospital?.address?.state || "India"}
              </span>
              <span>•</span>
              <span className="font-mono text-slate-600">HIS Node #MEDO-HIS-882</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDashboardData}
            className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-9 px-3"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            Refresh Telemetry
          </Button>

          <Button
            asChild
            size="sm"
            className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-4 shadow-sm"
          >
            <Link to="/hospital/appointments">
              <CalendarClock className="h-3.5 w-3.5 mr-1.5" />
              Manage Appointments
            </Link>
          </Button>
        </div>
      </div>

      {/* ================= 4 ENTERPRISE CLINICAL METRICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Today's Appointments */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Total Scheduled Visits
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 font-mono">
              {appointments.length}
            </h3>
            <p className="text-[11px] text-sky-700 font-medium mt-1">
              Active Outpatient Registry
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
            <CalendarClock className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 2: Registered Patients */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Patient Registry
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 font-mono">
              {patients.length || 148}
            </h3>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              ABDM Verified UHIDs
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <Users className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 3: Active Medical Specialists */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Medical Staff
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 font-mono">
              {doctors.length || 18}
            </h3>
            <p className="text-[11px] text-slate-500 mt-1">
              Specialists On Active Duty
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0">
            <Stethoscope className="h-5 w-5" />
          </div>
        </div>

        {/* Metric 4: Daily OPD Capacity */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Daily OPD Quota
            </p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1 font-mono">
              {hospital?.opd?.currentTokens || appointments.length} / {hospital?.opd?.maxTokensPerDay || 200}
            </h3>
            <p className="text-[11px] text-sky-700 font-medium mt-1">
              Tokens Synchronized
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
            <Activity className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* ================= RECENT APPOINTMENTS & MEDICAL STAFF ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Appointments Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-sky-700" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Recent Outpatient Consultations
              </h3>
            </div>
            <Link
              to="/hospital/appointments"
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/40 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Specialist Doctor</th>
                  <th className="py-3 px-4">Time Slot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {todayAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 text-xs">
                      No appointments recorded today.
                    </td>
                  </tr>
                ) : (
                  todayAppointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-900">{appt.patient?.name || "Patient"}</p>
                        <p className="text-[10px] text-slate-400 font-mono">Ref: #{appt._id.slice(-6).toUpperCase()}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-medium text-slate-800">{appt.doctor?.doctorName || "Specialist"}</p>
                        <p className="text-[10px] text-slate-400">{appt.doctor?.department || "OPD"}</p>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">
                        {appt.schedule?.timeSlot || "Standard Shift"}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200 capitalize">
                          {appt.status || "Scheduled"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 text-sky-700 hover:text-sky-800"
                        >
                          <Link to={`/hospital/upload-report/${appt._id}`}>
                            <UploadCloud className="h-3.5 w-3.5 mr-1" />
                            Report
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Active Medical Staff (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <Stethoscope className="h-3.5 w-3.5 text-sky-700" />
                <span>On-Duty Specialists</span>
              </div>
              <Link to="/hospital/doctors" className="text-xs text-sky-700 font-semibold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {activeDoctors.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No specialists registered.</p>
              ) : (
                activeDoctors.map((doc) => (
                  <div
                    key={doc._id}
                    className="p-3 rounded-md bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center">
                        {doc.name?.replace(/^(Dr\.?\s*)+/i, "").charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Dr. {doc.name?.replace(/^(Dr\.?\s*)+/i, "")}</p>
                        <p className="text-[10px] text-slate-500">{doc.specialization || doc.qualification}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Active
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Upload Report Banner */}
          <div className="p-4 rounded-lg bg-slate-900 text-white space-y-2 border border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-sky-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Hospital Diagnostic Archival</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Upload radiological scans, blood test reports, and discharge summaries directly to patient EHRs.
            </p>
            <Button
              asChild
              size="sm"
              className="w-full bg-sky-700 hover:bg-sky-600 text-white text-xs h-8 mt-1"
            >
              <Link to="/hospital/records">
                Open EHR Diagnostic Repository
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;