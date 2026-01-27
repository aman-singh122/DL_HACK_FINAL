import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  CalendarPlus,
  Video,
  FileText,
  MessageCircle,
  LogOut,
  Heart,
  User,
  Clock,
  Building2,
  Stethoscope,
  ChevronRight,
  Sparkles,
  Activity,
  Bell,
} from "lucide-react";
import { useState, useEffect } from "react";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [liveQueueAlert, setLiveQueueAlert] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeGlow, setActiveGlow] = useState("");

  // Simulate live queue notification
  useEffect(() => {
    const timer = setTimeout(() => {
      if (location.pathname !== "/live-queue/QUEUE_1") {
        setLiveQueueAlert(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      color: "from-blue-500 to-blue-600",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      notification: 2,
    },
    {
      name: "Book OPD",
      path: "/book-opd",
      icon: CalendarPlus,
      color: "from-emerald-500 to-emerald-600",
      gradient: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    },
    {
      name: "Consult Online",
      path: "/consult",
      icon: Video,
      color: "from-purple-500 to-purple-600",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
      badge: "NEW",
    },
    {
      name: "My Appointments",
      path: "/appointments",
      icon: Clock,
      color: "from-amber-500 to-amber-600",
      gradient: "bg-gradient-to-r from-amber-500 to-amber-600",
      notification: 3,
    },
    {
      name: "Live Queue",
      path: "/live-queue/QUEUE_1",
      icon: Activity,
      color: "from-red-500 to-red-600",
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
      alert: liveQueueAlert,
    },
    {
      name: "Hospitals",
      path: "/hospitals",
      icon: Building2,
      color: "from-cyan-500 to-cyan-600",
      gradient: "bg-gradient-to-r from-cyan-500 to-cyan-600",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: Stethoscope,
      color: "from-green-500 to-green-600",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      name: "Medical Records",
      path: "/records",
      icon: FileText,
      color: "from-indigo-500 to-indigo-600",
      gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    },
    {
      name: "MediChat",
      path: "/medichat",
      icon: MessageCircle,
      color: "from-pink-500 to-pink-600",
      gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
      notification: 5,
    },
  ];

  const isActive = (path: string) => 
    location.pathname === path || location.pathname.startsWith(path + "/");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleItemClick = (path: string, color: string) => {
    setActiveGlow(color);
    if (path.includes("live-queue")) setLiveQueueAlert(false);
    setTimeout(() => setActiveGlow(""), 500);
  };

  return (
    <>
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`fixed top-6 z-50 transition-all duration-300 ${
          collapsed ? "left-4" : "left-60"
        }`}
      >
        <div className="h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl">
          <ChevronRight className={`h-4 w-4 transition-transform ${collapsed ? "" : "rotate-180"}`} />
        </div>
      </button>

      <aside className={`fixed left-0 top-0 z-40 h-screen flex flex-col bg-white border-r border-gray-200 shadow-2xl transition-all duration-500 ease-out ${collapsed ? "w-20" : "w-64"}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <Link to="/dashboard" className="group relative">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Heart className="h-6 w-6 text-white" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
            </div>
            {!collapsed && (
              <div className="absolute left-14 top-2 whitespace-nowrap">
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent">
                  MedoSphere
                </h1>
                <p className="text-[10px] text-gray-500">Premium Healthcare</p>
              </div>
            )}
          </Link>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-gray-100">
          <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3 p-3"} rounded-xl bg-gray-50`}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md relative">
              <User className="text-white h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="font-semibold text-sm truncate">{user?.name || "Patient User"}</p>
                <p className="text-xs text-gray-500">Patient Account</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xs text-emerald-600 font-medium">85%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const showNotification = item.notification || item.alert;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleItemClick(item.path, item.gradient)}
                className={`group relative flex items-center ${
                  collapsed ? "justify-center px-3" : "px-4 gap-3"
                } py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${
                  active 
                    ? "text-white shadow-xl scale-[1.02]" 
                    : "text-gray-700 hover:bg-gray-50 hover:shadow-lg"
                }`}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Active Glow Effect */}
                {active && (
                  <>
                    <div className={`absolute inset-0 ${item.gradient} rounded-xl opacity-100`} />
                    <div className={`absolute inset-0 ${item.gradient} opacity-30 blur-xl rounded-xl -z-10 animate-pulse`} />
                  </>
                )}

                {/* Hover Gradient Overlay */}
                {hoveredItem === item.name && !active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white rounded-xl opacity-50" />
                )}

                {/* Icon Container */}
                <div className={`relative z-10 p-2 rounded-lg transition-all ${
                  active ? "bg-white/20" : "bg-gray-100 group-hover:bg-white"
                }`}>
                  <Icon className={`h-4 w-4 ${active ? "text-white" : "text-gray-600"}`} />
                  
                  {/* Notifications */}
                  {showNotification && (
                    <div className={`absolute -top-1 -right-1 h-4 w-4 rounded-full flex items-center justify-center ${
                      item.alert ? "bg-red-500 animate-ping" : "bg-blue-500"
                    }`}>
                      {item.alert ? (
                        <Bell className="h-2 w-2 text-white" />
                      ) : (
                        <span className="text-[10px] text-white">{item.notification}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Text & Badge */}
                {!collapsed && (
                  <>
                    <span className="relative z-10 flex-1 truncate">{item.name}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`h-4 w-4 transition-transform ${
                      active ? "text-white translate-x-1" : "text-gray-400 group-hover:translate-x-1"
                    }`} />
                  </>
                )}

                {/* Collapsed Tooltip */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.name}
                    {showNotification && <span className="ml-1">•</span>}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout & Footer */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              collapsed ? "justify-center px-3" : "px-4 gap-3"
            } py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all hover:scale-[1.02] group`}
          >
            <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform" />
            {!collapsed && <span>Logout</span>}
          </button>

          {!collapsed && (
            <div className="mt-4 text-center space-y-1">
              <p className="text-xs text-gray-500">Secure • Encrypted • HIPAA</p>
              <p className="text-[10px] text-gray-400">v2.1.4 • Active Now</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse delay-100"></div>
                <div className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Glow Animation Container */}
      <div className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 ${
        activeGlow ? "opacity-100" : "opacity-0"
      }`}>
        <div className={`absolute top-0 left-64 w-32 h-32 ${activeGlow} opacity-20 blur-3xl`} />
      </div>
    </>
  );
};

export default DashboardSidebar;