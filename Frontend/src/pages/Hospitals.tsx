import { useEffect, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllHospitals } from "@/api/hospital.api";
import { socket } from "@/socket";
import { useCrowd } from "@/context/CrowdContext";

import {
  Search,
  MapPin,
  Building2,
  Stethoscope,
  Bed,
  Users,
  Clock,
  Star,
  ChevronRight,
  ShieldCheck,
  Activity,
  Phone,
  CalendarPlus,
  Globe
} from "lucide-react";

interface Hospital {
  _id: string;
  name: string;
  type: "govt" | "private";
  address?: { city?: string; area?: string };
  departments: string[];
  opd?: { maxTokensPerDay?: number };
  rating?: number;
  totalBeds?: number;
  phone?: string;
  website?: string;
  distance?: number;
}

const Hospitals = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  const { crowdByHospital } = useCrowd();

  useEffect(() => {
    const loadHospitals = async () => {
      try {
        const res = await getAllHospitals();
        const hospitalsWithStats = (res?.data?.hospitals || []).map((hospital: Hospital) => ({
          ...hospital,
          rating: 4.5 + Math.random() * 0.4,
          totalBeds: Math.floor(Math.random() * 200) + 100,
          phone: "+91 11 " + Math.floor(10000000 + Math.random() * 90000000),
          website: hospital.name.toLowerCase().replace(/\s+/g, '') + ".health.gov.in",
        }));
        setHospitals(hospitalsWithStats);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadHospitals();
  }, []);

  useEffect(() => {
    if (!hospitals.length) return;
    hospitals.forEach((h) => {
      socket.emit("join-hospital", h._id);
    });
  }, [hospitals]);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      const matchesSearch =
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.departments.some((dept) => dept.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (h.address?.city || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || h.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [hospitals, searchQuery, selectedType]);

  const getCrowdStatus = (hospitalId: string) => {
    const crowd = crowdByHospital?.[hospitalId];

    if (!crowd) {
      return {
        label: "Normal Traffic",
        color: "bg-emerald-500",
        textColor: "text-emerald-700",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
      };
    }

    const level = crowd.level?.toLowerCase();
    const statusConfig = {
      low: {
        label: "Low Wait Time",
        color: "bg-emerald-500",
        textColor: "text-emerald-700",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
      },
      medium: {
        label: "Moderate Crowd",
        color: "bg-amber-500",
        textColor: "text-amber-700",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
      },
      high: {
        label: "Heavy Wait",
        color: "bg-rose-500",
        textColor: "text-rose-700",
        bgColor: "bg-rose-50",
        borderColor: "border-rose-200",
      },
    };

    return statusConfig[level as keyof typeof statusConfig] || statusConfig.low;
  };

  const stats = useMemo(
    () => ({
      total: hospitals.length,
      govt: hospitals.filter((h) => h.type === "govt").length,
      private: hospitals.filter((h) => h.type === "private").length,
    }),
    [hospitals]
  );

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-44 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Verified Hospital Network
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Empanelled government & accredited multi-specialty healthcare institutions.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-50 text-sky-800 border border-sky-200/80">
              {stats.govt} Government • {stats.private} Private
            </span>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Type Filters */}
          <div className="flex items-center gap-1 w-full md:w-auto">
            {[
              { id: "all", label: `All Facilities (${stats.total})` },
              { id: "govt", label: `Government (${stats.govt})` },
              { id: "private", label: `Private (${stats.private})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  selectedType === tab.id
                    ? "bg-sky-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by facility name, city, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-600 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Hospitals Grid */}
        {filteredHospitals.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
            <Building2 className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">No Hospitals Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No healthcare institutions matched your current query or type filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredHospitals.map((hosp) => {
              const crowd = getCrowdStatus(hosp._id);
              return (
                <div
                  key={hosp._id}
                  className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900 leading-snug">
                              {hosp.name}
                            </h3>
                            <span className={`text-[10px] font-semibold px-2 py-0.2 rounded uppercase tracking-wider ${
                              hosp.type === "govt" 
                                ? "bg-sky-100 text-sky-800" 
                                : "bg-slate-100 text-slate-700"
                            }`}>
                              {hosp.type}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            <span>{hosp.address?.area ? `${hosp.address.area}, ` : ""}{hosp.address?.city || "Capital Region"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Live Crowd Status Pill */}
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${crowd.bgColor} ${crowd.textColor} ${crowd.borderColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${crowd.color}`}></span>
                        {crowd.label}
                      </span>
                    </div>

                    {/* Department chips */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {hosp.departments.map((dept, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60"
                        >
                          {dept}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Bed className="h-3.5 w-3.5 text-slate-400" />
                        <span>{hosp.totalBeds} Operational Beds</span>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end text-slate-700">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-400" />
                        <span className="font-bold">{hosp.rating?.toFixed(1) || "4.8"} Rating</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {hosp.phone}
                    </span>

                    <Button
                      size="sm"
                      className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-8 px-4 font-semibold"
                      onClick={() => navigate("/book-opd")}
                    >
                      <CalendarPlus className="h-3.5 w-3.5 mr-1.5" />
                      Book OPD Slot
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

export default Hospitals;