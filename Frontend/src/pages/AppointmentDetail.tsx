import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getAppointmentById, cancelOpd } from "@/api/opd.api";

import {
  Calendar,
  Clock,
  Building2,
  User,
  Printer,
  ArrowLeft,
  MapPin,
  AlertTriangle,
  Video,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  Copy,
  Check,
  CreditCard,
  Receipt,
  FileText,
  Activity,
  AlertCircle,
  XCircle,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const AppointmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchDetails = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await getAppointmentById(id);
      setAppointment(res.data.appointment);
    } catch (err) {
      console.error("Fetch Error:", err);
      toast.error("Unable to load appointment dossier.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const isOnline =
    appointment?.bookingType === "online" ||
    appointment?.appointmentType === "online";
  const status = appointment?.status?.toLowerCase();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Dossier Reference ID copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCancelAppointment = async () => {
    if (!id) return;
    try {
      setCancelLoading(true);
      await cancelOpd(id, cancelReason || "Patient requested cancellation");
      toast.success("Appointment successfully cancelled.");
      setShowCancelModal(false);
      fetchDetails();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to cancel appointment.");
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="h-6 w-32 bg-slate-200 animate-pulse rounded"></div>
          <div className="h-64 bg-slate-200 animate-pulse rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-40 bg-slate-200 animate-pulse rounded-lg"></div>
            <div className="h-40 bg-slate-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!appointment) {
    return (
      <DashboardLayout>
        <div className="max-w-md mx-auto text-center py-16 space-y-4 bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
          <AlertCircle className="h-10 w-10 text-slate-400 mx-auto" />
          <h2 className="text-base font-bold text-slate-800">Appointment Record Not Located</h2>
          <p className="text-xs text-slate-500">
            The requested appointment record does not exist or access has been restricted.
          </p>
          <Button asChild size="sm" className="bg-sky-700 hover:bg-sky-800 text-white text-xs">
            <Link to="/appointments">Return to Appointments</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <button
            onClick={() => navigate("/appointments")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Appointments Registry</span>
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-8 px-3 gap-1.5"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print OPD Slip</span>
            </Button>

            {status !== "cancelled" && status !== "completed" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCancelModal(true)}
                className="border-rose-200 text-rose-600 hover:bg-rose-50 text-xs h-8 px-3"
              >
                Cancel Appointment
              </Button>
            )}
          </div>
        </div>

        {/* ================= PRIMARY CLINICAL DOSSIER CARD ================= */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="p-5 border-b border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Official Clinical Appointment Dossier
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                  isOnline 
                    ? "bg-purple-50 text-purple-700 border-purple-200" 
                    : "bg-sky-50 text-sky-700 border-sky-200"
                }`}>
                  {isOnline ? "Virtual Tele-Consultation" : "Hospital OPD Visit"}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs font-mono text-slate-500">Ref: #{appointment._id}</p>
                <button
                  onClick={() => copyToClipboard(appointment._id)}
                  className="text-slate-400 hover:text-slate-600"
                  title="Copy reference"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${
                status === "confirmed" || status === "booked"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : status === "completed"
                  ? "bg-slate-100 text-slate-700 border-slate-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  status === "confirmed" || status === "booked"
                    ? "bg-emerald-500"
                    : status === "completed"
                    ? "bg-slate-500"
                    : "bg-rose-500"
                }`}></span>
                Status: {status?.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Dossier Body */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Doctor & Department Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Attending Physician
                  </p>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {appointment.doctor?.doctorName || "Consultant Specialist"}
                  </h3>
                  <p className="text-xs text-sky-700 font-medium">
                    {appointment.doctor?.department || "General Medicine"}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {appointment.doctor?.qualification || "MBBS, MD - Verified Specialist"}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Healthcare Facility
                </p>
                <div className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Building2 className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      {appointment.hospital?.hospitalName || "MedCare Multispecialty Hospital"}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      {appointment.hospital?.address || "Main Clinical Complex, OPD Wing A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Appointment Timing & Token Badge */}
            <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Scheduled Consultation Slot
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mt-1">
                  <Calendar className="h-4 w-4 text-sky-700" />
                  <span>
                    {appointment.schedule?.date
                      ? new Date(appointment.schedule.date).toLocaleDateString("en-GB", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Date Confirmed"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 mt-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{appointment.schedule?.timeSlot || "Assigned Shift Window"}</span>
                </div>
              </div>

              {/* Digital Token Block */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase">
                    Assigned OPD Token
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Live Telemetry
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono mt-1">
                  #{appointment.tokenNumber || "102"}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Present this digital token number at the reception desk upon arrival.
                </p>
              </div>
            </div>
          </div>

          {/* Virtual Tele-Consultation Call-to-Action Bar */}
          {isOnline && (status === "confirmed" || status === "booked") && (
            <div className="p-5 bg-sky-50 border-t border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-700 text-white flex items-center justify-center flex-shrink-0">
                  <Video className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Virtual Consultation Suite Ready</h4>
                  <p className="text-xs text-slate-600">
                    Encrypted LiveKit WebRTC room is configured for your scheduled slot.
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-5 rounded-md shadow-sm"
              >
                <Link to={`/room/${appointment._id}`} className="flex items-center gap-1.5">
                  <Video className="h-4 w-4" />
                  <span>Enter Telehealth Room</span>
                </Link>
              </Button>
            </div>
          )}

          {/* Live Queue Link for In-Person OPD */}
          {!isOnline && (status === "confirmed" || status === "booked") && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Activity className="h-4 w-4 text-emerald-600" />
                <span>Track live corridor queue position to avoid waiting in crowded rooms:</span>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-white text-xs h-8 px-3"
              >
                <Link to="/live-queue/QUEUE_1" className="flex items-center gap-1">
                  <span>Track Live Queue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* ================= CLINICAL INSTRUCTIONS & PREPARATION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-sky-700" />
              Pre-Consultation Checklist
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-700 mt-0.5 flex-shrink-0" />
                <span>Keep your previous prescription slips and diagnostic reports ready.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-700 mt-0.5 flex-shrink-0" />
                <span>Arrive 15 minutes prior to your time window for registration verification.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-700 mt-0.5 flex-shrink-0" />
                <span>Present government ID / ABHA card at the hospital counter.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Receipt className="h-4 w-4 text-sky-700" />
              Billing & ABDM Coverage
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Clinical Consultation Fee</span>
                <span className="font-semibold text-slate-900">₹{appointment.doctor?.consultationFee || 500}</span>
              </div>
              <div className="flex justify-between">
                <span>Digital Portal Processing Fee</span>
                <span className="text-emerald-700 font-semibold">FREE (ABDM Subsidized)</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
                <span>Total Amount</span>
                <span>₹{appointment.doctor?.consultationFee || 500}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-md w-full shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Confirm Appointment Cancellation</h3>
                  <p className="text-xs text-slate-500">This action will release your allocated token slot.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Reason for Cancellation
                </label>
                <textarea
                  rows={3}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="e.g. Conflict with work schedule, symptom resolved..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCancelModal(false)}
                  disabled={cancelLoading}
                  className="text-xs h-8"
                >
                  Keep Appointment
                </Button>
                <Button
                  size="sm"
                  onClick={handleCancelAppointment}
                  disabled={cancelLoading}
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs h-8"
                >
                  {cancelLoading ? "Cancelling..." : "Confirm Cancellation"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AppointmentDetail;
