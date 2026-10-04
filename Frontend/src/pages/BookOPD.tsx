import { useEffect, useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { bookOpd } from "@/api/opd.api";
import { getAllHospitals } from "@/api/hospital.api";
import { getDoctorsByHospital } from "@/api/doctor.api";
import { useAuth } from "@/context/AuthContext";
import { socket } from "@/socket";
import { format, addDays, isSameDay } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

import {
  Building2,
  Stethoscope,
  User,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  CalendarCheck,
  Calendar as CalendarIcon,
  Receipt,
  ShieldCheck,
  Printer,
  AlertCircle,
  Activity,
  Check,
  Search,
  Sparkles,
  Phone
} from "lucide-react";
import { toast } from "sonner";

interface Hospital {
  _id: string;
  name: string;
  type: "govt" | "private";
  address?: { city?: string };
  departments: string[];
}

interface Doctor {
  _id: string;
  name: string;
  qualification: string;
  departments: string[];
  opdSchedule?: { shift: "morning" | "evening" };
  consultationFee: number;
  crowdLevel?: "low" | "medium" | "high";
  currentWaitTime?: number;
}

const steps = [
  { number: 1, title: "Select Hospital", icon: Building2 },
  { number: 2, title: "Clinical Specialty", icon: Stethoscope },
  { number: 3, title: "Attending Specialist", icon: User },
  { number: 4, title: "Date & Shift Slot", icon: Clock },
  { number: 5, title: "Clinical Review", icon: CheckCircle2 },
];

const BookOPD = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLimitError, setBookingLimitError] = useState(false);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hospitalSearch, setHospitalSearch] = useState("");

  useEffect(() => {
    socket.on(
      "crowdUpdate",
      (data: { doctorId: string; crowdLevel: string; waitTime: number }) => {
        setDoctors((prev) =>
          prev.map((doc) =>
            doc._id === data.doctorId
              ? {
                  ...doc,
                  crowdLevel: data.crowdLevel as any,
                  currentWaitTime: data.waitTime,
                }
              : doc
          )
        );
      }
    );
    return () => {
      socket.off("crowdUpdate");
    };
  }, []);

  useEffect(() => {
    getAllHospitals().then((res) => setHospitals(res.data.hospitals || []));
  }, []);

  useEffect(() => {
    if (selectedHospital) {
      const h = hospitals.find((h) => h._id === selectedHospital);
      setDepartments(h?.departments || []);
      setSelectedDepartment(null);
      setSelectedDoctor(null);
    }
  }, [selectedHospital, hospitals]);

  useEffect(() => {
    if (selectedHospital && selectedDepartment) {
      getDoctorsByHospital(selectedHospital).then((res) => {
        const filtered = (res.data.doctors || []).filter((d: Doctor) =>
          d.departments.includes(selectedDepartment)
        );
        setDoctors(filtered);
      });
    }
  }, [selectedHospital, selectedDepartment]);

  const dateStrip = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));
  }, []);

  const timeSlots = useMemo(
    () => ({
      morning: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"],
      afternoon: ["12:00", "13:00", "14:00", "15:00", "16:00"],
      evening: ["17:00", "17:30", "18:00", "18:30", "19:00"],
    }),
    []
  );

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const handleBack = () => {
    setBookingLimitError(false);
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const getCrowdBadge = (level?: string) => {
    switch (level) {
      case "low":
        return <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Low Wait</span>;
      case "medium":
        return <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Moderate Wait</span>;
      case "high":
        return <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">High Wait</span>;
      default:
        return <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Normal</span>;
    }
  };

  const handleConfirm = async () => {
    setLoading(true);
    setBookingLimitError(false);

    const doctor = doctors.find((d) => d._id === selectedDoctor);
    const hospital = hospitals.find((h) => h._id === selectedHospital);

    if (!doctor || !hospital || !selectedDepartment || !selectedSlot) {
      toast.error("Please complete all steps before confirming appointment.");
      setLoading(false);
      return;
    }

    try {
const consultationFee = doctor.consultationFee || 0;
const registrationFee = 0;

const payload = {
  hospitalId: hospital._id,
  doctorId: doctor._id,
  department: selectedDepartment,

  schedule: {
    date: selectedDate.toISOString(),
    timeSlot: selectedSlot,
    shift:
      selectedSlot >= "17:00"
        ? "evening"
        : "morning",
  },

  patient: {
    name: user?.name || "Patient",
    age: 25,
    gender: "male" as const,
    phone: user?.phone || "+91 9876543210",
  },

  fees: {
    registrationFee,
    consultationFee,
    totalAmount: registrationFee + consultationFee,
  },

  source: "web" as const,
};

      const res = await bookOpd(payload);
      setAppointmentData(res.data.appointment);
      setBookingSuccess(true);
      toast.success("OPD appointment confirmed successfully!");
    } catch (err: any) {
      console.error(err);
    const errorMessage = err.response?.data?.message || "";

if (errorMessage.toLowerCase().includes("only 2 opd")) {
  setBookingLimitError(true);
} else {
  toast.error(errorMessage || "Booking failed. Please try again.");
}
    } finally {
      setLoading(false);
    }
  };

  const filteredHospitals = hospitals.filter((h) =>
    h.name.toLowerCase().includes(hospitalSearch.toLowerCase()) ||
    (h.address?.city || "").toLowerCase().includes(hospitalSearch.toLowerCase())
  );

  const selectedHospitalObj = hospitals.find((h) => h._id === selectedHospital);
  const selectedDoctorObj = doctors.find((d) => d._id === selectedDoctor);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Wizard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Hospital Outpatient (OPD) Scheduling
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure digital token pass with instant hospital queue synchronization.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-sky-700" />
            <span>ABDM Registered Facility</span>
          </div>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 shadow-sm">
          <div className="flex items-center justify-between relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex-1 flex flex-col items-center relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCompleted
                        ? "bg-sky-700 text-white"
                        : isCurrent
                        ? "bg-white border-2 border-sky-700 text-sky-700 shadow-sm"
                        : "bg-slate-100 border border-slate-200 text-slate-400"
                    }`}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : step.number}
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 font-medium text-center hidden sm:block ${
                      isCurrent ? "text-slate-900 font-bold" : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= STEP CONTENT ================= */}

        {/* STEP 1: SELECT HOSPITAL */}
        {currentStep === 1 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Step 1: Choose Medical Center</h3>
                <p className="text-xs text-slate-500">Select the hospital where you wish to schedule your clinical consultation.</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search hospital or city..."
                  value={hospitalSearch}
                  onChange={(e) => setHospitalSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {filteredHospitals.map((hosp) => (
                <div
                  key={hosp._id}
                  onClick={() => setSelectedHospital(hosp._id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedHospital === hosp._id
                      ? "border-sky-600 bg-sky-50/50 shadow-sm ring-1 ring-sky-600"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">{hosp.name}</h4>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span>{hosp.address?.city || "Central Region"}</span>
                          <span>•</span>
                          <span className="capitalize">{hosp.type} Hospital</span>
                        </div>
                      </div>
                    </div>
                    {selectedHospital === hosp._id && (
                      <div className="w-5 h-5 rounded-full bg-sky-700 text-white flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3 pt-2 border-t border-slate-100">
                    {hosp.departments.slice(0, 3).map((dept, i) => (
                      <span key={i} className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {dept}
                      </span>
                    ))}
                    {hosp.departments.length > 3 && (
                      <span className="text-[10px] text-slate-400">+{hosp.departments.length - 3} more</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                onClick={handleNext}
                disabled={!selectedHospital}
                className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-6 rounded-md shadow-sm"
              >
                <span>Continue to Specialties</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT SPECIALTY */}
        {currentStep === 2 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Step 2: Clinical Department / Specialty</h3>
              <p className="text-xs text-slate-500">
                Selected Facility: <strong className="text-slate-800">{selectedHospitalObj?.name}</strong>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {departments.map((dept) => (
                <div
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`p-3.5 rounded-lg border text-center cursor-pointer transition-all ${
                    selectedDepartment === dept
                      ? "border-sky-600 bg-sky-50 text-sky-800 font-bold shadow-sm ring-1 ring-sky-600"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-md bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <span className="text-xs block leading-tight">{dept}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleBack} className="text-xs h-9">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedDepartment}
                className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-6 rounded-md shadow-sm"
              >
                <span>Select Specialist</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT DOCTOR */}
        {currentStep === 3 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Step 3: Attending Specialist</h3>
              <p className="text-xs text-slate-500">
                Department: <strong className="text-slate-800">{selectedDepartment}</strong> at {selectedHospitalObj?.name}
              </p>
            </div>

            {doctors.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
                <User className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                No specialists actively scheduled in this department today. Please try another department or hospital.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {doctors.map((doc) => (
                  <div
                    key={doc._id}
                    onClick={() => setSelectedDoctor(doc._id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedDoctor === doc._id
                        ? "border-sky-600 bg-sky-50/50 shadow-sm ring-1 ring-sky-600"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {doc.name.replace(/^(Dr\.?\s*)+/i, "").charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">Dr. {doc.name.replace(/^(Dr\.?\s*)+/i, "")}</h4>
                          <p className="text-xs text-slate-500">{doc.qualification || "Consultant Physician"}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {getCrowdBadge(doc.crowdLevel)}
                            <span className="text-xs font-semibold text-slate-800">₹{doc.consultationFee} Fee</span>
                          </div>
                        </div>
                      </div>
                      {selectedDoctor === doc._id && (
                        <div className="w-5 h-5 rounded-full bg-sky-700 text-white flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleBack} className="text-xs h-9">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedDoctor}
                className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-6 rounded-md shadow-sm"
              >
                <span>Choose Date & Shift</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: DATE & TIME SLOT */}
        {currentStep === 4 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Step 4: Select Consultation Date & Time Slot</h3>
              <p className="text-xs text-slate-500">Pick an outpatient consultation window with Dr. {selectedDoctorObj?.name.replace(/^(Dr\.?\s*)+/i, "")}.</p>
            </div>

            {/* Date Carousel Strip */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Available Dates</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 clinical-scrollbar">
                {dateStrip.map((date, idx) => {
                  const isSelected = isSameDay(date, selectedDate);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 w-20 py-2.5 px-2 rounded-lg border text-center transition-all ${
                        isSelected
                          ? "border-sky-600 bg-sky-700 text-white font-bold shadow-sm"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="block text-[10px] uppercase font-semibold">
                        {format(date, "EEE")}
                      </span>
                      <span className="block text-base font-bold my-0.5">
                        {format(date, "dd")}
                      </span>
                      <span className="block text-[9px]">
                        {format(date, "MMM")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Shift Slots */}
            <div className="space-y-4 pt-2">
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-sky-700" />
                  Morning Outpatient Shift (09:00 - 12:00)
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.morning.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-xs font-mono font-medium rounded border transition-colors ${
                        selectedSlot === slot
                          ? "bg-sky-700 text-white border-sky-700 shadow-sm font-bold"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-600" />
                  Evening Outpatient Shift (17:00 - 19:30)
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.evening.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 text-xs font-mono font-medium rounded border transition-colors ${
                        selectedSlot === slot
                          ? "bg-sky-700 text-white border-sky-700 shadow-sm font-bold"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleBack} className="text-xs h-9">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedSlot}
                className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-6 rounded-md shadow-sm"
              >
                <span>Review Appointment</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & CONFIRM */}
        {currentStep === 5 && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Step 5: Review Clinical Outpatient Booking</h3>
              <p className="text-xs text-slate-500">Please review all parameters before generating your official digital OPD token.</p>
            </div>

            {bookingLimitError && (
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Daily Booking Quota Reached for Selected Date</p>
                  <p className="mt-0.5 text-amber-700">
                    This hospital has reached its safe clinical token quota for this date. Please select an alternate date or time shift.
                  </p>
                </div>
              </div>
            )}

            <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Hospital Facility</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedHospitalObj?.name}</p>
                  <p className="text-slate-500">{selectedHospitalObj?.address?.city || "Hospital Complex"}</p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Clinical Specialty</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{selectedDepartment}</p>
                  <p className="text-slate-500">Outpatient Unit</p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Assigned Physician</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">Dr. {selectedDoctorObj?.name.replace(/^(Dr\.?\s*)+/i, "")}</p>
                  <p className="text-slate-500">{selectedDoctorObj?.qualification}</p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Date & Time Slot</p>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">{format(selectedDate, "dd MMMM yyyy")}</p>
                  <p className="font-mono text-slate-600 font-semibold">{selectedSlot} Shift Window</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <p className="text-slate-500">Patient Full Name</p>
                  <p className="font-bold text-slate-800">{user?.name || "Patient"}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500">Consultation Fee</p>
                  <p className="font-bold text-slate-900 text-sm">₹{selectedDoctorObj?.consultationFee || 500}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleBack} className="text-xs h-9">
                <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={loading}
                className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-6 rounded-md shadow-sm"
              >
                {loading ? "Generating Digital Token..." : "Confirm & Issue OPD Pass"}
              </Button>
            </div>
          </div>
        )}

        {/* ================= SUCCESS MODAL ================= */}
        {bookingSuccess && appointmentData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white border border-slate-200 rounded-lg max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">OPD Appointment Confirmed</h3>
                <p className="text-xs text-slate-500">
                  Your digital token has been registered in the hospital's central clinical queue.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-mono font-bold text-slate-500">OPD PASS</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active Token
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Allocated Token</p>
                    <p className="text-3xl font-extrabold text-slate-900 font-mono">
                      #{appointmentData.tokenNumber || "102"}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <p className="text-slate-500">Consultation Date</p>
                    <p className="font-bold text-slate-900">{format(selectedDate, "dd MMM yyyy")}</p>
                    <p className="font-mono text-slate-600">{selectedSlot}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-700">
                  <p className="font-semibold">{selectedHospitalObj?.name}</p>
                  <p className="text-slate-500 text-[11px]">Dr. {selectedDoctorObj?.name.replace(/^(Dr\.?\s*)+/i, "")} ({selectedDepartment})</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => window.print()}
                  className="text-xs h-9 border-slate-300"
                >
                  <Printer className="h-3.5 w-3.5 mr-1" />
                  Print OPD Slip
                </Button>
                <Button
                  onClick={() => navigate(`/appointments/${appointmentData._id}`)}
                  className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9"
                >
                  View Full Dossier
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BookOPD;