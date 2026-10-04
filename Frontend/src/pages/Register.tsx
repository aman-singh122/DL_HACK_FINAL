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
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  LockKeyhole
} from "lucide-react";

import { registerUser, loginUser } from "@/api/auth.api";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { refetchUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please verify.");
      setIsLoading(false);
      return;
    }

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      await refetchUser();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please check details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans text-slate-800">
      {/* Left Feature Showcase (Desktop) */}
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
            <span>Digital Patient Onboarding</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-snug">
            Create Your Centralized Clinical Health Profile
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Register once to access digital OPD appointment scheduling across hundreds of hospitals, live queue tracking, and secure lifetime electronic health records.
          </p>

          <div className="space-y-3.5 pt-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-slate-300">Instant digital OPD token confirmation with SMS alerts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-slate-300">Secure WebRTC tele-consultations with certified doctors</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-sky-950 border border-sky-800 text-sky-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-slate-300">Encrypted cloud repository for all diagnostic reports</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>ABDM & HIPAA Privacy Guard</span>
          <span>Helpline: 1800-11-4477</span>
        </div>
      </div>

      {/* Right Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6 my-auto">
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
              Register Patient Profile
            </h1>
            <p className="text-xs text-slate-500">
              Provide your details to initiate your digital health profile.
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
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-9 h-10 text-xs border-slate-200 focus-visible:ring-sky-600 rounded-md bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-9 h-10 text-xs border-slate-200 focus-visible:ring-sky-600 rounded-md bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Min 6 chars"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-9 pr-8 h-10 text-xs border-slate-200 focus-visible:ring-sky-600 rounded-md bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-9 h-10 text-xs border-slate-200 focus-visible:ring-sky-600 rounded-md bg-white"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-sky-700 hover:bg-sky-800 text-white font-semibold text-xs rounded-md shadow-sm transition-all mt-3"
            >
              {isLoading ? "Creating Patient Profile..." : "Register Clinical Account"}
            </Button>
          </form>

          {/* Login prompt */}
          <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 text-center text-xs">
            <p className="text-slate-600">
              Already have a patient profile?{" "}
              <Link to="/login" className="font-semibold text-sky-700 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;