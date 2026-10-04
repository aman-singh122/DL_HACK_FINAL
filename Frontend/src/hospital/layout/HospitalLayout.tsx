import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import HospitalNavbar from "../components/HospitalNavbar";
import HospitalSidebar from "../components/HospitalSidebar";
import { getMyHospital } from "../api/hospital.api";

type Hospital = {
  _id: string;
  name: string;
  logo?: string;
};

const HospitalLayout = () => {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const res = await getMyHospital();
        setHospital(res.data.hospital);
      } catch (error) {
        console.error("Failed to fetch hospital profile", error);
        setHospital(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHospital();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-sky-700" />
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Initializing Hospital Clinical Console...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0 h-full">
        <HospitalSidebar />
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative h-full w-64 bg-slate-900 shadow-2xl animate-in slide-in-from-left duration-200">
            <HospitalSidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <HospitalNavbar
          hospital={hospital}
          onSidebarToggle={() => setIsMobileMenuOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 clinical-scrollbar">
          <div className="mx-auto max-w-7xl animate-in fade-in duration-200">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalLayout;
