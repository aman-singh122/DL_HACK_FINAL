import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  Bell, 
  Search, 
  LogOut, 
  Building2, 
  Menu, 
  ChevronDown,
  User,
  ShieldCheck,
  Activity
} from "lucide-react";

type HospitalNavbarProps = {
  hospital: {
    name?: string;
    logo?: string;
  } | null;
  onSidebarToggle?: () => void;
};

const HospitalNavbar = ({ hospital, onSidebarToggle }: HospitalNavbarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Toggle & Brand Details */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onSidebarToggle}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md md:hidden"
            aria-label="Toggle hospital menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-700 text-white shadow-sm">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                {hospital?.name || "MedoSphere Medical Center"}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                  Hospital Admin Console • ABDM Active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patient UHID, doctor, or token..."
              className="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs outline-none focus:border-sky-600 focus:bg-white focus:ring-1 focus:ring-sky-600 transition-all text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right: Actions & Administrator Profile */}
        <div className="flex items-center gap-3">
          {/* Notification Button */}
          <button 
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            title="System Alerts"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-sky-600"></span>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1 pl-2.5 pr-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-all bg-white shadow-sm"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-slate-800 leading-none">
                  {user?.name || "Hospital Administrator"}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Admin Level 1</p>
              </div>
              <div className="h-7 w-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div 
                className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl z-50 text-xs"
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-900 truncate">{user?.name || "Administrator"}</p>
                  <p className="text-slate-400 truncate">{user?.email || "admin@hospital.org"}</p>
                </div>
                
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logout();
                  }}
                  className="flex w-full items-center gap-2 px-3.5 py-2 text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out Console
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HospitalNavbar;