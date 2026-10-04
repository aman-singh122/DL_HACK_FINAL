import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Star, CheckCircle2, MapPin, Clock, Stethoscope, Video } from "lucide-react";

interface DoctorCardProps {
  doctor: any;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const navigate = useNavigate();

  // Clean name without accidental prefixes or plus signs
  const cleanName = doctor.name?.replace(/^(Dr\.?\s*)+/i, "").replace(/^\+\s*/, "");

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between">
      {/* Top Header: Avatar & Credentials */}
      <div>
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="h-14 w-14 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-800 font-bold text-lg">
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={cleanName}
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                cleanName?.charAt(0) || "D"
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-emerald-500 border-2 border-white rounded-full" title="Active Specialist"></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base text-slate-900 leading-snug truncate">
                Dr. {cleanName}
              </h3>
              <CheckCircle2 className="w-4 h-4 text-sky-600 flex-shrink-0" />
            </div>

            <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
              {doctor.qualification || "Consultant Specialist"}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              <span className="text-[10px] font-semibold text-sky-800 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded">
                {doctor.specialization || doctor.departments?.[0] || "General Medicine"}
              </span>
              {doctor.experienceYears && (
                <span className="text-[10px] text-slate-500 font-medium">
                  • {doctor.experienceYears} Yrs Exp.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Clinical Location & Ratings */}
        <div className="mt-4 grid grid-cols-2 gap-2 py-2.5 border-y border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 overflow-hidden text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{doctor.clinic?.city || doctor.hospital?.hospitalName || "Hospital Complex"}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-700 justify-end">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span className="font-bold">4.8</span>
            <span className="text-slate-400 text-[10px]">(120+ reviews)</span>
          </div>
        </div>
      </div>

      {/* Pricing & Booking CTA */}
      <div className="flex items-center justify-between mt-4 pt-1">
        <div>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Consultation Fee</p>
          <p className="text-lg font-bold text-slate-900">
            ₹{doctor.onlineConsultation?.fee || doctor.consultationFee || 500}
          </p>
        </div>

        <Button
          size="sm"
          className="rounded-md px-4 h-9 font-semibold text-xs bg-sky-700 hover:bg-sky-800 text-white shadow-sm"
          onClick={() => navigate(`/consult/book/${doctor._id}`)}
        >
          <Video className="w-3.5 h-3.5 mr-1.5" />
          Book Consult
        </Button>
      </div>
    </div>
  );
};

export default DoctorCard;