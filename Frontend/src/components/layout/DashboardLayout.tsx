import { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { 
  Menu, 
  Bell, 
  Search, 
  ShieldCheck, 
  ChevronRight, 
  Check, 
  Clock, 
  User, 
  LogOut,
  Calendar
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const { notifications, markAllAsRead } = useNotifications();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Derive page title from path
  const getPageTitle = (path: string) => {
    if (path.includes("/book-opd")) return "Outpatient (OPD) Scheduling";
    if (path.includes("/consult")) return "Tele-Consultation Clinic";
    if (path.includes("/appointments/")) return "Appointment Dossier";
    if (path.includes("/appointments")) return "My Clinical Appointments";
    if (path.includes("/live-queue")) return "Real-Time OPD Queue";
    if (path.includes("/records")) return "Electronic Health Records (EHR)";
    if (path.includes("/doctors")) return "Clinical Specialist Directory";
    if (path.includes("/hospitals")) return "Verified Hospital Network";
    if (path.includes("/medichat")) return "Clinical AI Triage Assistant";
    return "Patient Clinical Dashboard";
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar (Persistent) */}
      <div className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0 z-30">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar (Drawer Overlay) */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 h-full z-10 animate-in slide-in-from-left duration-200">
            <DashboardSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Clinical Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between shadow-sm">
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>Patient Portal</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-slate-600 font-medium">{getPageTitle(location.pathname)}</span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {getPageTitle(location.pathname)}
              </h1>
            </div>
          </div>

          {/* Right: Quick Actions, Notifications, Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* National Compliance Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-medium text-slate-600">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-700" />
              <span>ABDM Network Active</span>
            </div>

            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-700 text-[10px] font-bold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white shadow-xl z-50 overflow-hidden"
                  onMouseLeave={() => setNotificationsOpen(false)}
                >
                  <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Clinical Alerts & Updates
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
                      </p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => markAllAsRead()}
                        className="text-xs font-semibold text-sky-700 hover:text-sky-800"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 clinical-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-slate-500 text-xs">
                        <Bell className="h-6 w-6 text-slate-300 mx-auto mb-2" />
                        No notifications recorded yet.
                      </div>
                    ) : (
                      notifications.map((item, idx) => (
                        <div
                          key={item._id || idx}
                          className={`p-3.5 text-xs transition-colors hover:bg-slate-50 ${
                            !item.isRead ? "bg-sky-50/40" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-semibold text-slate-900 leading-snug">{item.title}</p>
                            {!item.isRead && (
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 flex-shrink-0 mt-1"></span>
                            )}
                          </div>
                          <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">{item.message}</p>
                          {item.createdAt && (
                            <p className="text-slate-400 text-[10px] mt-1.5 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-sm"
              >
                <div className="h-7 w-7 rounded-full bg-sky-100 border border-sky-300 text-sky-800 font-bold text-xs flex items-center justify-center">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "P"}
                </div>
                <div className="text-left text-xs hidden sm:block">
                  <p className="font-semibold text-slate-800 leading-none truncate max-w-[100px]">
                    {user?.name || "Patient"}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">UHID: {user?._id?.slice(-6).toUpperCase() || "PATIENT"}</p>
                </div>
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-50 text-xs"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-semibold text-slate-900 truncate">{user?.name || "Patient"}</p>
                    <p className="text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <Link
                    to="/appointments"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Calendar className="h-4 w-4 text-slate-500" />
                    My Appointments
                  </Link>
                  <Link
                    to="/records"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4 text-slate-500" />
                    Medical Records
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
