import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useState, useEffect, useRef } from "react";
import { useMyAppointments } from "@/hooks/useMyAppointments";

import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  CalendarPlus,
  Video,
  FileText,
  MessageCircle,
  Clock,
  Stethoscope,
  Bell,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  MapPin,
  Sparkles,
  Activity,
  Shield,
  Heart,
  Calendar,
  User,
  AlertCircle,
  Pill,
  Truck,
  Percent,
  Users,
  Syringe,
  Brain,
  Eye,
  Bone,
  Thermometer,
  Star,
  Award,
  Zap,
  Target,
  BarChart3,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Info,
  PlayCircle,
  BookOpen,
  Flame,
  Droplets,
  Moon,
  Sun,
  Search,
  Settings,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/* =====================================================
   DASHBOARD COMPONENT
===================================================== */
const Dashboard = () => {
  /* ---------------- AUTH ---------------- */
  const { user, loading: authLoading } = useAuth();

  /* ---------------- APPOINTMENTS ---------------- */
  const { appointments, loading: appointmentsLoading } = useMyAppointments();

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "booked" || a.status === "confirmed",
  );

  /* ---------------- NOTIFICATIONS ---------------- */
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  /* ---------------- NAVIGATION ---------------- */
  const navigate = useNavigate();

  /* ---------------- CLOSE NOTIFICATION ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- QUICK ACTIONS ---------------- */
  const quickActions = [
    {
      title: "Book Appointment",
      description: "Schedule an outpatient visit",
      icon: CalendarPlus,
      path: "/book-opd",
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
    },
    {
      title: "Video Consult",
      description: "Consult with a doctor virtually",
      icon: Video,
      path: "/consult",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Health Records",
      description: "View your medical history",
      icon: FileText,
      path: "/records",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Health Assistant",
      description: "AI-powered health support",
      icon: MessageCircle,
      path: "/medichat",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
      new: true,
    },
  ];

  /* ---------------- LOADING ---------------- */
  if (authLoading || appointmentsLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px]">
            <div className="mb-6">
              <Skeleton className="h-64 w-full rounded-3xl" />
            </div>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            </div>
            <div className="grid lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ---------------- USER GUARD ---------------- */
  if (!user) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center space-y-6 p-12 bg-white rounded-3xl shadow-xl max-w-lg">
            <div className="relative mx-auto w-20 h-20">
              <div className="h-20 w-20 rounded-2xl bg-teal-500 flex items-center justify-center shadow-lg">
                <Shield className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Authentication Required
              </h2>
              <p className="text-gray-600">
                Please sign in to access your personalized healthcare dashboard
              </p>
            </div>
            <Button
              size="lg"
              className="bg-teal-500 hover:bg-teal-600 text-white shadow-lg font-semibold px-10 h-12 rounded-xl"
              asChild
            >
              <Link to="/login">Sign In to Continue</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px]">
          {/* ================= HERO BANNER WITH IMAGE ================= */}
          <div className="mb-8">
            <div className="relative h-80 rounded-3xl overflow-hidden shadow-lg">
              {/* Background Image - Replace with your PNG */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-amber-900">
                {/* This is where PNG1 goes - the hero banner background image */}
                <div className="absolute inset-0">
                  <img
                    src="/hospital-banner.jpg"
                    alt="Hero Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />{" "}
                  {/* Optional dark overlay */}
                </div>
              </div>

              {/* Overlay Content */}
              <div className="relative h-full flex items-center">
                <div className="px-12 max-w-2xl">
                  <p className="text-teal-400 text-sm font-semibold mb-2 tracking-wider uppercase">
                    GOOD{" "}
                    {new Date().getHours() < 12
                      ? "MORNING"
                      : new Date().getHours() < 18
                        ? "AFTERNOON"
                        : "EVENING"}
                    , {user.name?.split(" ")[0]?.toUpperCase()}
                  </p>
                  <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                    Your Health, Our Priority
                  </h1>
                  <p className="text-white/80 text-lg mb-8 leading-relaxed">
                    Manage appointments, access records & get AI health
                    <br />
                    insights — all in one place.
                  </p>

                  <div className="flex gap-4">
                    <Button
                      asChild
                      className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 h-12 rounded-xl shadow-lg"
                    >
                      <Link to="/book-opd" className="flex items-center gap-2">
                        <CalendarPlus className="h-5 w-5" />
                        Book Appointment
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold px-6 h-12 rounded-xl"
                    >
                      <Link to="/consult" className="flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        Video Consult
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= STATS CARDS ================= */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {upcomingAppointments.length}
                  </p>
                  <p className="text-sm text-gray-500 font-medium">
                    Appointments
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">8.4</p>
                  <p className="text-sm text-gray-500 font-medium">
                    Health Score
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">4</p>
                  <p className="text-sm text-gray-500 font-medium">
                    AI Insights
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Flame className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">7 days</p>
                  <p className="text-sm text-gray-500 font-medium">
                    Active Streak
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <Link key={action.title} to={action.path} className="group">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all">
                    <div className="space-y-4">
                      <div className="relative">
                        {action.new && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-0.5 rounded-lg text-xs font-bold">
                            NEW
                          </Badge>
                        )}
                        <div
                          className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center",
                            action.iconBg,
                          )}
                        >
                          <action.icon
                            className={cn("h-7 w-7", action.iconColor)}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {action.description}
                        </p>
                      </div>

                      <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-teal-600 transition-colors">
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ================= MAIN CONTENT GRID ================= */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Appointments Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      Upcoming Appointments
                    </h3>
                    <Link
                      to="/appointments"
                      className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                    >
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto">
                        <Calendar className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-700">
                          No appointments scheduled
                        </h4>
                        <p className="text-sm text-gray-500">
                          Book your next appointment to get started
                        </p>
                      </div>
                      <Button
                        size="lg"
                        asChild
                        className="bg-teal-500 hover:bg-teal-600 shadow-lg font-semibold h-11 px-6 rounded-xl"
                      >
                        <Link to="/book-opd">
                          <CalendarPlus className="h-5 w-5 mr-2" />
                          Book Appointment
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAppointments.slice(0, 3).map((appt) => {
                        const isOnline = appt.appointmentType === "online";
                        const appointmentDate = new Date(appt.schedule.date);
                        const isToday =
                          appointmentDate.toDateString() ===
                          new Date().toDateString();

                        return (
                          <div
                            key={appt._id}
                            onClick={() =>
                              navigate(`/appointments/${appt._id}`)
                            }
                            className="p-5 border border-gray-200 rounded-xl hover:border-teal-300 hover:shadow-md cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className={cn(
                                  "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
                                  isOnline ? "bg-purple-50" : "bg-blue-50",
                                )}
                              >
                                {isOnline ? (
                                  <Video className="h-7 w-7 text-purple-600" />
                                ) : (
                                  <Stethoscope className="h-7 w-7 text-blue-600" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-bold text-base text-gray-900">
                                    Dr. {appt.doctor?.doctorName || "Doctor"}
                                  </h4>
                                  {isToday && (
                                    <Badge className="bg-amber-100 text-amber-800 font-semibold px-2 py-1 rounded-lg text-xs">
                                      Today
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-sm text-gray-600 font-medium mb-2">
                                  {isOnline
                                    ? "Video Consultation"
                                    : appt.hospital?.hospitalName || "Hospital"}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {appointmentDate.toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                      },
                                    )}
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5" />
                                    {appt.schedule.timeSlot}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Health Insights Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">
                  Health Insights
                </h3>
              </div>

              <div className="p-6 space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Droplets className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-blue-900 mb-1">
                        Hydration
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Stay hydrated - drink at least 8 glasses of water daily
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-emerald-900 mb-1">
                        Exercise
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Take a 30-minute walk every day for better heart health
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Moon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-purple-900 mb-1">
                        Sleep
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Get 7-8 hours of quality sleep each night
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-pink-50 rounded-xl border border-pink-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-pink-900 mb-1">
                        Mental Health
                      </p>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Practice 10 minutes of meditation daily
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= HEALTH CONCERNS ================= */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Health Concerns
              </h2>
              <Link
                to="/specialties"
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-6 gap-4">
              {[
                {
                  name: "Diabetes",
                  icon: Syringe,
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  name: "Heart Care",
                  icon: Heart,
                  color: "bg-red-50 text-red-600",
                },
                {
                  name: "Mental Health",
                  icon: Brain,
                  color: "bg-purple-50 text-purple-600",
                },
                {
                  name: "Eye Care",
                  icon: Eye,
                  color: "bg-amber-50 text-amber-600",
                },
                {
                  name: "Bone & Joint",
                  icon: Bone,
                  color: "bg-green-50 text-green-600",
                },
                {
                  name: "Fever & Cold",
                  icon: Thermometer,
                  color: "bg-cyan-50 text-cyan-600",
                },
              ].map((concern) => (
                <div
                  key={concern.name}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
                        concern.color,
                      )}
                    >
                      <concern.icon className="h-7 w-7" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {concern.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= HEALTH ARTICLES WITH IMAGES ================= */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Health Articles
              </h2>
              <Link
                to="/articles"
                className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                Read More
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Article 1 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="/doctor-portrait.jpg"
                    alt="Diabetes Care Article"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-blue-600 font-semibold px-3 py-1 rounded-lg text-xs">
                      Diabetes Care
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-snug group-hover:text-teal-600 transition-colors">
                    Weight loss can significantly reduce heart disease risk in
                    diabetes
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />3 min read
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>

              {/* Article 2 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="health-tech.jpg"
                    alt="Mental Wellness Article"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-purple-600 font-semibold px-3 py-1 rounded-lg text-xs">
                      Mental Wellness
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-snug group-hover:text-teal-600 transition-colors">
                    Meditation and mindfulness lower blood pressure naturally
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />4 min read
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>

              {/* Article 3 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-teal-600">
                  {/* This is where PNG4 goes - Article 3 image */}
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
                    [PNG4 - Article Image 3]
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-emerald-600 font-semibold px-3 py-1 rounded-lg text-xs">
                      Preventive Care
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base text-gray-900 mb-2 leading-snug group-hover:text-teal-600 transition-colors">
                    Daily 30-minute walk reduces risk of chronic diseases by 40%
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />2 min read
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= FOOTER MESSAGE ================= */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600 font-medium">
                Stay proactive with regular check-ups and healthy habits
              </p>
              <p className="text-xs text-gray-400">
                Always consult your healthcare provider for personalized medical
                advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
