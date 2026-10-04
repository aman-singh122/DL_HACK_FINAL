import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Activity, 
  Languages, 
  User, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
  ChevronDown 
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();

  const navLinks = [
    {
      name: { en: "Hospitals", hi: "अस्पताल" },
      path: "/hospitals",
    },
    {
      name: { en: "Doctors", hi: "चिकित्सक" },
      path: "/doctors",
    },
    {
      name: { en: "Clinical Services", hi: "चिकित्सा सेवाएं" },
      path: "/service",
    },
    {
      name: { en: "OPD Booking", hi: "ओपीडी बुकिंग" },
      path: "/book-opd",
    },
    {
      name: { en: "AI Health Assistant", hi: "एआई स्वास्थ्य सहायक" },
      path: "/medichat",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/90 bg-white/95 backdrop-blur-md transition-all shadow-sm">
      {/* Top National Health Notice Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium text-slate-200">
              {language === "en" 
                ? "National Healthcare Management & Digital OPD Portal" 
                : "राष्ट्रीय स्वास्थ्य सेवा प्रबंधन एवं डिजिटल ओपीडी पोर्टल"}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">ABDM & HIPAA Compliant Network</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="text-slate-400">24/7 Clinical Helpline: <strong className="text-slate-200">1800-11-4477</strong></span>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-700 text-white shadow-sm transition-transform group-hover:bg-sky-800">
            <Activity className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-slate-900 tracking-tight leading-none">
              Medo<span className="text-sky-700">Sphere</span>
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
              Clinical Health Network
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive(link.path)
                  ? "text-sky-700 bg-sky-50 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              }`}
            >
              {link.name[language]}
            </Link>
          ))}
        </nav>

        {/* Right Section (Language + Auth) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
            title="Toggle Language"
          >
            <Languages className="h-3.5 w-3.5 text-slate-500" />
            <span>{language === "en" ? "हिन्दी" : "English"}</span>
          </button>

          {/* User state */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 transition-all shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold text-xs flex items-center justify-center border border-sky-200">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="text-left text-xs max-w-[120px] truncate hidden sm:block">
                  <span className="font-semibold block truncate">{user.name || "Patient"}</span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg z-50 text-sm"
                  onMouseLeave={() => setUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-slate-500" />
                    <span>Patient Portal</span>
                  </Link>
                  <Link
                    to="/appointments"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4 text-slate-500" />
                    <span>My Appointments</span>
                  </Link>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-md transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-slate-700 hover:text-slate-900 hover:bg-slate-100 font-medium"
              >
                <Link to="/login">
                  {language === "en" ? "Sign In" : "लॉगिन"}
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-sky-700 hover:bg-sky-800 text-white font-medium shadow-sm px-4"
              >
                <Link to="/register">
                  {language === "en" ? "Register Patient" : "रजिस्टर"}
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <nav className="container mx-auto py-3 px-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? "text-sky-700 bg-sky-50 font-semibold"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name[language]}
              </Link>
            ))}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-md border border-slate-200 bg-slate-50 text-slate-700"
              >
                <span className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-slate-500" />
                  Language / भाषा
                </span>
                <span>{language === "en" ? "हिन्दी में बदलें" : "Switch to English"}</span>
              </button>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
                  >
                    <LayoutDashboard className="h-4 w-4 text-sky-700" />
                    Patient Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-md text-left"
                  >
                    <LogOut className="h-4 w-4 text-rose-500" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full text-slate-700 border-slate-300"
                  >
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-sky-700 hover:bg-sky-800 text-white"
                  >
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      Register
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;