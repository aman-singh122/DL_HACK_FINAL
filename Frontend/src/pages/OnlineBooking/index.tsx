import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import API from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  ShieldCheck, 
  ChevronLeft,
  CheckCircle2,
  Stethoscope,
  Building2,
  Receipt
} from "lucide-react";
import { toast } from "sonner";

const OnlineBooking = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "02:00 PM", "02:30 PM", "03:00 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
  ];

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await API.get(`/doctor/${doctorId}`);
        setDoctor(res.data.doctor);
      } catch (err) {
        toast.error("Unable to load doctor profile");
        navigate("/consult");
      }
    };
    fetchDoctor();
  }, [doctorId, navigate]);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select both consultation date and time slot.");
      return;
    }

    setIsSubmitting(true);
    try {
      await API.post("/appointments/online", {
        doctorId,
        appointmentDate: selectedDate.toISOString(),
        timeSlot: selectedSlot,
      });
      toast.success("Tele-consultation booked successfully!");
      navigate("/appointments");
    } catch (err) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!doctor) {
    return (
      <DashboardLayout>
        <div className="h-96 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-medium">Loading clinical specialist profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const cleanDoctorName = doctor.name?.replace(/^(Dr\.?\s*)+/i, "");

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Tele-Consultation Clinic</span>
        </button>

        {/* Header */}
        <div className="border-b border-slate-200 pb-3">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Schedule Video Consultation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your preferred consultation date and time slot for secure WebRTC telehealth care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Date & Slot Selectors (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Step 1: Calendar Date */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-sky-700" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    1. Select Consultation Date
                  </span>
                </div>
                {selectedDate && (
                  <span className="text-xs font-semibold text-sky-700 font-mono">
                    {selectedDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                )}
              </div>
              <div className="p-4 flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                  className="rounded-md border border-slate-100 p-2 pointer-events-auto"
                />
              </div>
            </div>

            {/* Step 2: Time Slots */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-700" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    2. Available Consultation Slots
                  </span>
                </div>
                {selectedSlot && (
                  <span className="text-xs font-semibold text-emerald-700 font-mono">
                    {selectedSlot} Selected
                  </span>
                )}
              </div>
              <div className="p-5 grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-md text-xs font-mono font-medium border transition-all ${
                      selectedSlot === slot
                        ? "bg-sky-700 text-white border-sky-700 font-bold shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Preview & Booking Summary (1 Col) */}
          <div className="space-y-4">
            {/* Doctor Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 text-sky-800 font-bold text-base flex items-center justify-center flex-shrink-0">
                  {cleanDoctorName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm text-slate-900 truncate">
                      Dr. {cleanDoctorName}
                    </h3>
                    <CheckCircle2 className="h-4 w-4 text-sky-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {doctor.qualification || "Consultant Specialist"}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200/80">
                    {doctor.specialization || "Telehealth Specialist"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-sky-700 flex-shrink-0" />
                  <span>Encrypted LiveKit HD Video Suite</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  <span>{doctor.clinic?.city || "National Telehealth Grid"}</span>
                </div>
              </div>
            </div>

            {/* Receipt / Fee Summary Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                <Receipt className="h-3.5 w-3.5 text-sky-700" />
                <span>Consultation Fee Breakdown</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Specialist Consultation</span>
                  <span className="font-semibold text-slate-900">₹{doctor.onlineConsultation?.fee || 500}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Secure Room</span>
                  <span className="text-emerald-700 font-semibold">Included</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Payable</span>
                  <span className="text-sky-700">₹{doctor.onlineConsultation?.fee || 500}</span>
                </div>
              </div>

              <Button
                onClick={handleConfirm}
                disabled={isSubmitting || !selectedDate || !selectedSlot}
                className="w-full bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs h-10 rounded-md shadow-sm mt-3"
              >
                {isSubmitting ? "Confirming Booking..." : "Confirm & Schedule Tele-Consult"}
              </Button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>ABDM-Compliant Video Healthcare</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OnlineBooking;
