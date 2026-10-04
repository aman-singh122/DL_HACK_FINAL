import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MapPin,
  Star,
  User,
  Calendar,
  Video,
  Filter,
  CheckCircle2,
  Stethoscope,
  Building2,
  Clock
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getOnlineDoctors } from "@/api/doctor.api";

const specialtiesList = [
  "All",
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Dermatology",
  "Pediatrics",
  "General Medicine",
  "ENT",
  "Ophthalmology",
];

const fallbackDoctors = [
  {
    _id: "doc-1",
    name: "Dr. Priya Sharma",
    specialization: "Cardiology",
    hospitalName: "Apollo Multispecialty Hospital, Delhi",
    experienceYears: 15,
    rating: 4.9,
    reviews: 423,
    consultationFee: 800,
    available: true,
    qualification: "MBBS, MD, DM (Cardiology)",
    nextSlot: "Today, 4:00 PM",
  },
  {
    _id: "doc-2",
    name: "Dr. Rajesh Kumar",
    specialization: "Orthopedics",
    hospitalName: "Fortis Healthcare, Mumbai",
    experienceYears: 12,
    rating: 4.7,
    reviews: 315,
    consultationFee: 600,
    available: true,
    qualification: "MBBS, MS (Orthopedics)",
    nextSlot: "Tomorrow, 10:00 AM",
  },
  {
    _id: "doc-3",
    name: "Dr. Anita Desai",
    specialization: "Dermatology",
    hospitalName: "Max Super Specialty Hospital, Bangalore",
    experienceYears: 10,
    rating: 4.8,
    reviews: 289,
    consultationFee: 700,
    available: true,
    qualification: "MBBS, MD (Dermatology)",
    nextSlot: "Today, 6:00 PM",
  },
  {
    _id: "doc-4",
    name: "Dr. Vikram Singh",
    specialization: "Neurology",
    hospitalName: "Medanta - The Medicity, Gurugram",
    experienceYears: 18,
    rating: 4.9,
    reviews: 512,
    consultationFee: 1000,
    available: true,
    qualification: "MBBS, MD, DM (Neurology)",
    nextSlot: "Today, 5:00 PM",
  },
  {
    _id: "doc-5",
    name: "Dr. Meena Patel",
    specialization: "Pediatrics",
    hospitalName: "AIIMS New Delhi",
    experienceYears: 14,
    rating: 4.8,
    reviews: 378,
    consultationFee: 500,
    available: true,
    qualification: "MBBS, MD (Pediatrics)",
    nextSlot: "Tomorrow, 11:30 AM",
  },
  {
    _id: "doc-6",
    name: "Dr. Suresh Reddy",
    specialization: "General Medicine",
    hospitalName: "Apollo Hospitals, Chennai",
    experienceYears: 20,
    rating: 4.6,
    reviews: 645,
    consultationFee: 400,
    available: true,
    qualification: "MBBS, MD (Internal Medicine)",
    nextSlot: "Today, 3:00 PM",
  },
];

const Doctors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("All");
  const [doctors, setDoctors] = useState<any[]>(fallbackDoctors);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        setLoading(true);
        const res = await getOnlineDoctors();
        if (res.data?.doctors && res.data.doctors.length > 0) {
          // Merge API doctors with formatted fields
          const formatted = res.data.doctors.map((d: any) => ({
            ...d,
            specialization: d.specialization || d.departments?.[0] || "General Medicine",
            hospitalName: d.clinic?.name || d.clinic?.city || "Hospital Medical Center",
            consultationFee: d.onlineConsultation?.fee || d.consultationFee || 500,
          }));
          setDoctors(formatted);
        }
      } catch (err) {
        // keep fallback doctors
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialists();
  }, []);

  const filteredDoctors = doctors.filter((doc) => {
    const nameMatch = (doc.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const specMatch = (doc.specialization || "").toLowerCase().includes(searchQuery.toLowerCase());
    const hospMatch = (doc.hospitalName || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSearch = nameMatch || specMatch || hospMatch;
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      (doc.specialization || "").toLowerCase().includes(selectedSpecialty.toLowerCase());

    return matchesSearch && matchesSpecialty;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Clinical Specialist Directory
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified clinical practitioners and medical consultants across India.
            </p>
          </div>
          <Button asChild size="sm" className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-9 px-4">
            <Link to="/consult">
              <Video className="h-3.5 w-3.5 mr-1.5" />
              Direct Tele-Consult
            </Link>
          </Button>
        </div>

        {/* Search & Specialty Chips */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search specialists by doctor name, specialty, or affiliated medical center..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-xs border-slate-200 focus-visible:ring-sky-600 rounded-md bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Specialty Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 clinical-scrollbar">
            {specialtiesList.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors whitespace-nowrap ${
                  selectedSpecialty === spec
                    ? "bg-sky-700 text-white shadow-sm font-semibold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
            <Stethoscope className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">No Specialists Match Filter</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No clinical specialists found matching your search term or specialty filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoctors.map((doc) => {
              const cleanName = (doc.name || "").replace(/^(Dr\.?\s*)+/i, "");
              return (
                <div
                  key={doc._id}
                  className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-lg bg-sky-50 border border-sky-100 text-sky-800 font-bold text-base flex items-center justify-center flex-shrink-0">
                        {cleanName.charAt(0) || "D"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-900 leading-snug truncate">
                            Dr. {cleanName}
                          </h3>
                          <CheckCircle2 className="h-4 w-4 text-sky-600 flex-shrink-0" />
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {doc.qualification || "Consultant Specialist"}
                        </p>
                        <span className="inline-block mt-1.5 text-[10px] font-semibold text-sky-800 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded">
                          {doc.specialization}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 truncate">
                        <Building2 className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{doc.hospitalName || "Hospital Complex"}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-500">
                          {doc.experienceYears ? `${doc.experienceYears} Years Exp.` : "Senior Specialist"}
                        </span>
                        <div className="flex items-center gap-1 text-slate-700 font-semibold">
                          <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                          <span>{doc.rating || "4.8"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-medium">Consultation Fee</p>
                      <p className="text-base font-bold text-slate-900">₹{doc.consultationFee}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-8 px-3.5 shadow-sm"
                        onClick={() => navigate(`/consult/book/${doc._id}`)}
                      >
                        Book
                      </Button>
                    </div>
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

export default Doctors;
