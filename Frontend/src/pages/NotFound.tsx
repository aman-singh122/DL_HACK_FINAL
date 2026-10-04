import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Activity, 
  LayoutDashboard, 
  CalendarPlus, 
  Building2, 
  HelpCircle,
  FileQuestion,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-800">
      {/* Top Clinical Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-sm">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center">
            <Activity className="h-5 w-5" />
          </div>
          <span className="font-bold text-base text-slate-900">
            Medo<span className="text-sky-700">Sphere</span>
          </span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-xs font-semibold text-slate-600 gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Back</span>
        </Button>
      </header>

      {/* Main 404 Error Dossier */}
      <main className="container mx-auto px-4 py-16 max-w-2xl text-center my-auto">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <FileQuestion className="h-8 w-8" />
        </div>

        <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-widest px-2.5 py-1 rounded bg-sky-50 border border-sky-200/80">
          HTTP Error 404 • Resource Not Located
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-4 mb-3">
          Clinical Resource Not Found
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-8">
          The requested clinical appointment, record file, or portal URL does not exist or may have been archived. Please verify the link or navigate using the clinical directory below.
        </p>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <Button
            asChild
            className="bg-sky-700 hover:bg-sky-800 text-white text-xs h-10 rounded-md font-medium"
          >
            <Link to="/dashboard" className="flex items-center justify-center gap-1.5">
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Patient Dashboard</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-10 rounded-md font-medium"
          >
            <Link to="/book-opd" className="flex items-center justify-center gap-1.5">
              <CalendarPlus className="h-3.5 w-3.5" />
              <span>Book OPD Visit</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 text-xs h-10 rounded-md font-medium"
          >
            <Link to="/hospitals" className="flex items-center justify-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" />
              <span>Find Hospitals</span>
            </Link>
          </Button>
        </div>

        {/* Emergency Helpline Strip */}
        <div className="p-4 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 text-left flex items-start gap-3 shadow-sm">
          <Phone className="h-4 w-4 text-sky-700 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-slate-900">Need Clinical Assistance?</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              For patient support or urgent queries, contact MedoSphere 24/7 helpline at <strong className="text-slate-800 font-mono">1800-11-4477</strong>.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
        © {new Date().getFullYear()} MedoSphere Health Systems Inc. • All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;