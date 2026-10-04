import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Activity,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  Building2,
  LockKeyhole
} from "lucide-react";

import { loginUser } from "@/api/auth.api";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await loginUser(formData);
      const token = res.data.token;
      if (!token) throw new Error("Authentication failed");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      await refetchUser();
      
      // If role is HOSPITAL or ADMIN, route to hospital dashboard
      const role = res.data.user?.role?.toUpperCase();
      if (role === "HOSPITAL" || role === "ADMIN") {
        navigate("/hospital/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid clinical credentials. Please verify your email and password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans text-slate-800">
      {/* Left Feature Section (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden border-r border-slate-800">
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 text-white group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 shadow-sm text-white">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">MedoSphere</span>
              <span className="text-[10px] text-sky-400 block font-medium uppercase tracking-wider">Clinical Health Network</span>
            </div>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-6 my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-sky-300">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            <span>Authorized Clinical Gateway</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
            Streamlining Healthcare Access for India
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Sign in to access your digital OPD appointments, real-time queue position, electronic medical records, and telemedicine consultations.
          </p>

          <div className="space-y-3.5 pt-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-slate-300">ABDM & Ayushman Bharat (ABHA) compliant records</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-slate-300">Zero wait-time OPD tokens with live status tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-slate-300">End-to-end encrypted medical data & lab results</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>HIPAA Security Standards</span>
          <span>Helpline: 1800-11-4477</span>
        </div>
      </div>

      {/* Right Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Portal Home</span>
          </Link>

          {/* Form Header */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 lg:hidden mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-700 text-white">
                <Activity className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-slate-900">MedoSphere</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Sign In to Patient Portal
            </h1>
            <p className="text-xs text-slate-500">
              Enter your clinical credentials to access your health records and appointments.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-9 h-10 text-xs border-slate-200 focus-visible:ring-sky-600 rounded-md bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-sky-700 hover:underline cursor-pointer">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your clinical password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-9 pr-9 h-10 text-xs border-slate-200 focus-visible:ring-sky-600 rounded-md bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs rounded-md shadow-sm transition-all mt-2"
            >
              {isLoading ? "Authenticating Session..." : "Sign In to Health Portal"}
            </Button>
          </form>

          {/* Registration Prompt */}
          <div className="p-4 rounded-lg bg-slate-100 border border-slate-200 text-center text-xs">
            <p className="text-slate-600">
              New patient or care recipient?{" "}
              <Link to="/register" className="font-semibold text-sky-700 hover:underline">
                Register Patient Account
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <Lock className="h-3 w-3" />
            <span>256-Bit SSL Secured Healthcare Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;