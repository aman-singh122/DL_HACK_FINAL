import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  CalendarPlus,
  Video,
  FileText,
  MessageSquare,
  LogOut,
  Activity,
  User,
  Clock,
  Building2,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  collapsed?: boolean;
  onCloseMobile?: () => void;
}

const DashboardSidebar = ({ collapsed = false, onCloseMobile }: DashboardSidebarProps) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuGroups = [
    {
      group: "Clinical Care",
      items: [
        {
          name: "Overview",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Book OPD",
          path: "/book-opd",
          icon: CalendarPlus,
        },
        {
          name: "Tele-Consultation",
          path: "/consult",
          icon: Video,
          badge: "Virtual",
        },
        {
          name: "My Appointments",
          path: "/appointments",
          icon: Clock,
        },
        {
          name: "Live OPD Queue",
          path: "/live-queue/QUEUE_1",
          icon: Activity,
          badge: "Live",
        },
      ],
    },
    {
      group: "Health Network",
      items: [
        {
          name: "Hospitals Network",
          path: "/hospitals",
          icon: Building2,
        },
        {
          name: "Clinical Specialists",
          path: "/doctors",
          icon: Stethoscope,
        },
        {
          name: "Medical Records (EHR)",
          path: "/records",
          icon: FileText,
        },
      ],
    },
    {
      group: "Decision Support",
      items: [
        {
          name: "Clinical AI Triage",
          path: "/medichat",
          icon: MessageSquare,
          badge: "Assist",
        },
      ],
    },
  ];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <aside
      className={`h-full flex flex-col bg-slate-900 text-slate-300 border-r border-slate-800 select-none transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-800 bg-slate-950/40">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm flex-shrink-0">
            <Activity className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-base font-bold text-white tracking-tight leading-none truncate">
                Medo<span className="text-sky-400">Sphere</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase mt-1">
                Patient Clinical Portal
              </span>
            </div>
          )}
        </Link>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Patient Profile Card */}
      {!collapsed && (
        <div className="p-3.5 border-b border-slate-800/80 bg-slate-800/30">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <div className="h-9 w-9 rounded-full bg-sky-950 border border-sky-600 text-sky-300 flex items-center justify-center font-bold text-sm flex-shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-xs text-white truncate">
                  {user?.name || "Registered Patient"}
                </p>
                <ShieldCheck className="h-3.5 w-3.5 text-sky-400 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {user?.email || "patient@medosphere.org"}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  Verified Patient
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 clinical-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.group} className="space-y-1">
            {!collapsed && (
              <p className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => onCloseMobile && onCloseMobile()}
                  className={`group relative flex items-center ${
                    collapsed ? "justify-center px-2" : "px-3 gap-3"
                  } py-2.5 rounded-md text-xs font-medium transition-all ${
                    active
                      ? "bg-sky-600 text-white shadow-sm font-semibold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/80"
                  }`}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon
                    className={`h-4 w-4 flex-shrink-0 transition-colors ${
                      active ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />

                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            active
                              ? "bg-sky-700 text-white"
                              : "bg-slate-800 text-slate-300 border border-slate-700"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight
                        className={`h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                          active ? "opacity-100 text-white" : "text-slate-500"
                        }`}
                      />
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer & Logout */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={() => logout()}
          className={`w-full flex items-center ${
            collapsed ? "justify-center px-2" : "px-3 gap-2.5"
          } py-2 rounded-md text-xs font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors group`}
        >
          <LogOut className="h-4 w-4 text-slate-400 group-hover:text-rose-400 transition-colors" />
          {!collapsed && <span>Sign Out Session</span>}
        </button>

        {!collapsed && (
          <div className="mt-2.5 px-3 py-1.5 rounded bg-slate-900/80 border border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
            <span>HIPAA • ABDM Encrypted</span>
            <span className="text-slate-500 font-mono">v3.2</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;