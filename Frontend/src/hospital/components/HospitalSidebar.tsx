import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  CalendarClock, 
  Users, 
  Stethoscope, 
  FileText, 
  LogOut,
  Activity,
  ShieldCheck,
  Building2,
  ChevronRight
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type MenuItem = {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

const sidebarGroups: MenuGroup[] = [
  {
    title: "Clinical Operations",
    items: [
      { label: "Dashboard", path: "/hospital/dashboard", icon: LayoutDashboard },
      { label: "OPD Appointments", path: "/hospital/appointments", icon: CalendarClock },
    ],
  },
  {
    title: "Patient & Care Registry",
    items: [
      { label: "Patient Directory", path: "/hospital/patients", icon: Users },
      { label: "Medical Staff", path: "/hospital/doctors", icon: Stethoscope },
      { label: "Medical Records (EHR)", path: "/hospital/records", icon: FileText },
    ],
  },
];

const HospitalSidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="flex flex-col w-64 h-full bg-slate-900 border-r border-slate-800 text-slate-300 font-sans select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-sky-600 text-white shadow-sm flex-shrink-0">
          <Activity className="h-5 w-5" />
        </div>
        <div className="overflow-hidden">
          <h2 className="text-sm font-bold text-white tracking-tight truncate">MedoSphere HMS</h2>
          <span className="text-[10px] font-medium text-sky-400 uppercase tracking-wider block">Enterprise Console</span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-6 clinical-scrollbar">
        {sidebarGroups.map((group) => (
          <div key={group.title}>
            <h3 className="px-3 mb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {group.title}
            </h3>
            
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    group relative flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all
                    ${
                      isActive
                        ? "bg-sky-700 text-white font-semibold shadow-sm"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3 truncate">
                        <item.icon className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      
                      {item.badge && (
                        <span className={`px-2 py-0.5 text-[10px] rounded ${isActive ? 'bg-sky-800 text-white' : 'bg-slate-800 text-slate-300'}`}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className={`h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-white' : 'text-slate-500'}`} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer / System Compliance */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2">
        <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[11px] font-semibold text-white">System Operational</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Connected to National Health Health Stack & Local HIS Gateway.
          </p>
        </div>

        <button 
          onClick={() => logout()}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>
    </aside>
  );
};

export default HospitalSidebar;