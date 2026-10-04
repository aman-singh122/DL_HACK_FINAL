import { useEffect, useState } from "react";
import DoctorCard from "@/components/doctor/DoctorCard";
import { getOnlineDoctors } from "@/api/doctor.api";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Video, ShieldCheck, Stethoscope, Clock, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Consultation = () => {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await getOnlineDoctors(city);
      setDoctors(res.data?.doctors || []);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Telehealth Clinic Header */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                Virtual Clinical Care
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500">Encrypted WebRTC Video Rooms</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Specialist Tele-Consultation Clinic
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
              Consult with board-certified clinical specialists remotely from your home, review previous lab reports in-session, and receive instant digital prescriptions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 text-xs">
            <div className="px-3 py-2 rounded-lg bg-sky-50 border border-sky-200/80 text-sky-800 flex items-center gap-2 font-medium">
              <ShieldCheck className="h-4 w-4 text-sky-700" />
              <span>HIPAA Compliant Video</span>
            </div>
          </div>
        </div>

        {/* Search & Location Filter */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Filter specialists by city or region (e.g. Delhi, Mumbai, Bangalore)..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchDoctors()}
              className="pl-9 h-10 text-xs border-slate-200 focus-visible:ring-sky-600 rounded-md bg-slate-50 focus:bg-white"
            />
          </div>
          <Button
            onClick={fetchDoctors}
            className="h-10 px-6 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs rounded-md shadow-sm"
          >
            <Search className="w-3.5 h-3.5 mr-1.5" />
            Search Doctors
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              {loading ? "Searching clinical specialists..." : `${doctors.length} Verified Specialist${doctors.length === 1 ? "" : "s"} Available`}
            </h2>
            <span className="text-xs text-slate-400">All specialists credentialed & verified</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-5 border border-slate-200 rounded-lg bg-white space-y-3">
                  <div className="flex gap-3">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-1.5 flex-1">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full rounded" />
                </div>
              ))}
            </div>
          ) : doctors.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
              <Stethoscope className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-900">No Tele-Consultation Specialists Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No active specialists found for the selected city. Please try clearing the city filter.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCity("");
                  getOnlineDoctors().then((res) => setDoctors(res.data?.doctors || []));
                }}
                className="text-xs mt-3 border-slate-300"
              >
                Clear Location Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Consultation;