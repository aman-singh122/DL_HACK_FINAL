import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { useState, useEffect, useRef } from "react";
import { useMyAppointments } from "@/hooks/useMyAppointments";
import { runTriageAI } from "@/api/ai.api";


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
  const {
    appointments,
    loading: appointmentsLoading,
  } = useMyAppointments();

  const upcomingAppointments = appointments.filter(
    (a) => a.status === "booked" || a.status === "confirmed"
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------------- QUICK ACTIONS ---------------- */
  const quickActions = [
    {
      title: "Book Appointment",
      description: "Schedule an outpatient visit",
      icon: CalendarPlus,
      path: "/book-opd",
      gradient: "from-blue-600 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-100",
    },
    {
      title: "Video Consult",
      description: "Consult with a doctor virtually",
      icon: Video,
      path: "/consult",
      gradient: "from-purple-600 to-pink-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-100",
    },
    {
      title: "Health Records",
      description: "View your medical history",
      icon: FileText,
      path: "/records",
      gradient: "from-emerald-600 to-teal-600",
      bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
      borderColor: "border-emerald-100",
    },
    {
      title: "Health Assistant",
      description: "AI-powered health support",
      icon: MessageCircle,
      path: "/medichat",
      gradient: "from-amber-600 to-orange-600",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      borderColor: "border-amber-100",
      new: true,
    },
  ];

  /* ---------------- HEALTH TIPS ---------------- */
  const healthTips = [
    {
      id: 1,
      text: "Stay hydrated - drink at least 8 glasses of water daily",
      icon: Droplets,
      category: "Hydration",
      bgGradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-700",
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      text: "Take a 30-minute walk every day for better heart health",
      icon: Activity,
      category: "Exercise",
      bgGradient: "from-emerald-500 to-green-500",
      textColor: "text-emerald-700",
      bgColor: "bg-emerald-50",
    },
    {
      id: 3,
      text: "Get 7-8 hours of quality sleep each night",
      icon: Moon,
      category: "Sleep",
      bgGradient: "from-violet-500 to-purple-500",
      textColor: "text-violet-700",
      bgColor: "bg-violet-50",
    },
    {
      id: 4,
      text: "Practice 10 minutes of meditation daily for mental wellness",
      icon: Brain,
      category: "Mental Health",
      bgGradient: "from-rose-500 to-pink-500",
      textColor: "text-rose-700",
      bgColor: "bg-rose-50",
    },
  ];

  //temporary test 

  

  /* ---------------- HEALTH CONCERNS ---------------- */
  const healthConcerns = [
    { name: "Diabetes", icon: Syringe, gradient: "from-blue-500 to-blue-600" },
    { name: "Heart Care", icon: Heart, gradient: "from-red-500 to-rose-600" },
    { name: "Mental Health", icon: Brain, gradient: "from-purple-500 to-purple-600" },
    { name: "Eye Care", icon: Eye, gradient: "from-amber-500 to-orange-600" },
    { name: "Bone & Joint", icon: Bone, gradient: "from-green-500 to-emerald-600" },
    { name: "Fever & Cold", icon: Thermometer, gradient: "from-cyan-500 to-blue-600" },
  ];

  /* ---------------- HEALTH ARTICLES ---------------- */
  const healthArticles = [
    {
      id: 1,
      title: "Losing up to 10% of weight can significantly reduce heart disease risk in diabetes",
      category: "Diabetes Care",
      readTime: "3 min read",
      imageGradient: "from-blue-600 via-indigo-600 to-purple-600",
      icon: Heart,
    },
    {
      id: 2,
      title: "Meditation and mindfulness shown to lower blood pressure naturally",
      category: "Mental Wellness",
      readTime: "4 min read",
      imageGradient: "from-purple-600 via-pink-600 to-rose-600",
      icon: Brain,
    },
    {
      id: 3,
      title: "New study: Daily 30-minute walk reduces risk of chronic diseases by 40%",
      category: "Preventive Care",
      readTime: "2 min read",
      imageGradient: "from-emerald-600 via-teal-600 to-cyan-600",
      icon: Activity,
    },
  ];

  /* ---------------- LOADING ---------------- */
  if (authLoading || appointmentsLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1800px]">
            <div className="mb-6">
              <Skeleton className="h-48 w-full rounded-3xl" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-52 rounded-3xl" />
              ))}
            </div>
            <div className="grid lg:grid-cols-12 gap-6">
              <Skeleton className="lg:col-span-8 h-[600px] rounded-3xl" />
              <Skeleton className="lg:col-span-4 h-[600px] rounded-3xl" />
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
          <div className="text-center space-y-8 p-12 bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/50 max-w-lg">
            <div className="relative mx-auto w-28 h-28">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <div className="relative h-28 w-28 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
                <Shield className="h-14 w-14 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Authentication Required
              </h2>
              <p className="text-gray-600 text-lg">
                Please sign in to access your personalized healthcare dashboard
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 font-bold px-10 h-14 rounded-2xl text-base"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-[1800px]">
          
          {/* ================= MODERN REDESIGNED HEADER ================= */}
          <div className="mb-8">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-black text-white">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 border-2 border-white flex items-center justify-center">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-2xl font-black text-gray-900">
                      {user.name?.split(" ")[0]}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="font-medium">Dhanbad, India</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications((prev) => !prev)}
                    className="relative p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <Bell className="h-5 w-5 text-gray-700" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-[450px] bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-5 border-b border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-black text-gray-900">Notifications</h3>
                          <Badge className="font-mono text-xs px-3 py-1 bg-blue-100 text-blue-700">
                            {notifications.length}
                          </Badge>
                        </div>
                      </div>

                      <div className="max-h-[500px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-16 text-center space-y-4">
                            <div className="h-16 w-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto">
                              <Bell className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="space-y-2">
                              <p className="font-bold text-gray-600">All caught up!</p>
                              <p className="text-sm text-gray-400">No new notifications</p>
                            </div>
                          </div>
                        ) : (
                          notifications.map((n, i) => (
                            <div
                              key={i}
                              className={cn(
                                "p-5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors",
                                !n.isRead && "bg-blue-50/50 border-l-4 border-l-blue-600"
                              )}
                              onClick={() => setShowNotifications(false)}
                            >
                              <div className="flex items-start gap-4">
                                <div className={cn(
                                  "h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0",
                                  !n.isRead 
                                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white" 
                                    : "bg-gray-100 text-gray-600"
                                )}>
                                  <Bell className="h-5 w-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-sm text-gray-900 mb-1">
                                    {n.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                    {n.message}
                                  </p>
                                  <span className="text-xs text-gray-400 font-medium">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Book Appointment Button */}
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 font-bold h-12 px-6 rounded-xl"
                >
                  <Link to="/book-opd" className="flex items-center gap-2">
                    <CalendarPlus className="h-5 w-5" />
                    <span>Book Appointment</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Welcome Message & Stats Grid */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Welcome Card */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-white border-2 border-gray-100 p-8 shadow-lg h-full">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">👋</span>
                        <h2 className="text-3xl font-black text-gray-900">
                          Welcome back!
                        </h2>
                      </div>
                      <p className="text-lg text-gray-600 font-medium">
                        {new Date().getHours() < 12
                          ? "Good morning"
                          : new Date().getHours() < 18
                          ? "Good afternoon"
                          : "Good evening"}! Here's your health overview for today.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <p className="text-3xl font-black text-gray-900 mb-1">{upcomingAppointments.length}</p>
                        <p className="text-xs font-semibold text-gray-600">Appointments</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <p className="text-3xl font-black text-gray-900 mb-1">8.4</p>
                        <p className="text-xs font-semibold text-gray-600">Health Score</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <p className="text-3xl font-black text-gray-900 mb-1">4</p>
                        <p className="text-xs font-semibold text-gray-600">AI Insights</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* MediAI Card */}
              <div className="lg:col-span-5">
                <Link to="/medichat">
                  <div className="h-full rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
                    
                    <div className="relative space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <Badge className="bg-gradient-to-r from-yellow-300 to-amber-400 text-purple-900 border-0 font-black px-3 py-1 rounded-xl">
                          AI POWERED
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="text-2xl font-black text-white">
                          MediAI Health Insights
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          Your personal AI companion analyzing patterns and delivering intelligent recommendations
                        </p>
                      </div>

                      <Button 
                        className="bg-white text-purple-600 hover:bg-purple-50 font-bold h-11 px-6 rounded-xl group-hover:shadow-lg transition-all"
                      >
                        Start Chat
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* ================= QUICK ACTIONS ================= */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Quick Actions</h2>
                <p className="text-gray-600 text-sm font-medium">Essential healthcare services at your fingertips</p>
              </div>
              <Link 
                to="/services" 
                className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 group"
              >
                <span>View all</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {quickActions.map((action, idx) => (
                <Link
                  key={action.title}
                  to={action.path}
                  className="group"
                >
                  <div className="relative h-full overflow-hidden rounded-3xl bg-white border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative p-6">
                      {action.new && (
                        <div className="absolute top-5 right-5">
                          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-xl font-black text-xs shadow-md">
                            NEW
                          </Badge>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <div className="relative">
                          <div className={cn(
                            "absolute inset-0 blur-xl opacity-20 rounded-3xl",
                            `bg-gradient-to-br ${action.gradient}`
                          )} />
                          <div className={cn(
                            "relative h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300",
                            `bg-gradient-to-br ${action.gradient}`
                          )}>
                            <action.icon className="h-8 w-8" />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-black text-lg text-gray-900 mb-2">
                            {action.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {action.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center text-sm font-bold pt-1">
                          <span className="text-blue-600">Get Started</span>
                          <ChevronRight className="h-4 w-4 ml-1 text-blue-600 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ================= HEALTH ANALYTICS ================= */}
          <section className="mb-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-green-400 text-green-900 border-0 font-bold px-2 py-1 rounded-lg text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12%
                    </Badge>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-bold mb-1">Health Score</p>
                    <p className="text-4xl font-black text-white">8.4</p>
                    <p className="text-white/60 text-xs font-medium mt-1">Excellent</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-blue-400 text-blue-900 border-0 font-bold px-2 py-1 rounded-lg text-xs">
                      Active
                    </Badge>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-bold mb-1">Appointments</p>
                    <p className="text-4xl font-black text-white">{upcomingAppointments.length}</p>
                    <p className="text-white/60 text-xs font-medium mt-1">Scheduled</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-fuchsia-600 p-6 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-purple-300 text-purple-900 border-0 font-bold px-2 py-1 rounded-lg text-xs">
                      AI
                    </Badge>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-bold mb-1">AI Insights</p>
                    <p className="text-4xl font-black text-white">4</p>
                    <p className="text-white/60 text-xs font-medium mt-1">For you</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Flame className="h-6 w-6 text-white" />
                    </div>
                    <Badge className="bg-green-400 text-green-900 border-0 font-bold px-2 py-1 rounded-lg text-xs">
                      Hot
                    </Badge>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs font-bold mb-1">Streak</p>
                    <p className="text-4xl font-black text-white">7</p>
                    <p className="text-white/60 text-xs font-medium mt-1">Days strong</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= MAIN CONTENT GRID ================= */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* APPOINTMENTS */}
              <div className="rounded-3xl bg-white border-2 border-gray-100 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-gray-900">Upcoming Appointments</h3>
                        <p className="text-xs text-gray-600 font-medium">
                          {upcomingAppointments.length} scheduled
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/appointments"
                      className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                    >
                      <span>View all</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="p-6">
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-16 space-y-5">
                      <div className="h-20 w-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto">
                        <Calendar className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-lg text-gray-700">No appointments</h4>
                        <p className="text-sm text-gray-500">Schedule your next checkup</p>
                      </div>
                      <Button 
                        size="lg" 
                        asChild 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg font-bold h-12 px-8 rounded-xl"
                      >
                        <Link to="/book-opd">
                          <CalendarPlus className="h-5 w-5 mr-2" />
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAppointments.slice(0, 3).map((appt) => {
                        const isOnline = appt.appointmentType === "online";
                        const appointmentDate = new Date(appt.schedule.date);
                        const isToday = appointmentDate.toDateString() === new Date().toDateString();

                        return (
                          <div
                            key={appt._id}
                            onClick={() => navigate(`/appointments/${appt._id}`)}
                            className="p-5 border-2 border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-lg cursor-pointer transition-all duration-300 group"
                          >
                            <div className="flex items-center gap-5">
                              <div className="relative">
                                <div className={cn(
                                  "absolute inset-0 blur-lg opacity-30 rounded-2xl",
                                  isOnline
                                    ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                    : "bg-gradient-to-br from-blue-500 to-indigo-600"
                                )} />
                                <div className={cn(
                                  "relative h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform",
                                  isOnline
                                    ? "bg-gradient-to-br from-purple-500 to-pink-600"
                                    : "bg-gradient-to-br from-blue-500 to-indigo-600"
                                )}>
                                  {isOnline ? <Video className="h-7 w-7" /> : <Stethoscope className="h-7 w-7" />}
                                </div>
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3 mb-2">
                                  <h4 className="font-black text-lg text-gray-900">
                                    Dr. {appt.doctor?.doctorName || "Doctor"}
                                  </h4>
                                  <div className="flex items-center gap-2">
                                    {isToday && (
                                      <Badge className="bg-yellow-100 text-yellow-800 font-bold px-2 py-1 rounded-lg text-xs">
                                        Today
                                      </Badge>
                                    )}
                                    <Badge className={cn(
                                      "capitalize font-bold px-2 py-1 rounded-lg text-xs",
                                      appt.status === "confirmed" && "bg-green-100 text-green-800",
                                      appt.status === "booked" && "bg-blue-100 text-blue-800"
                                    )}>
                                      {appt.status}
                                    </Badge>
                                  </div>
                                </div>
                              
                                <p className="text-sm text-gray-700 font-semibold mb-2">
                                  {isOnline ? "Video Consultation" : appt.hospital?.hospitalName || "Hospital"}
                                </p>
                                <div className="flex items-center gap-5 text-sm text-gray-600">
                                  <span className="flex items-center gap-2 font-medium">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    {appointmentDate.toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                  <span className="flex items-center gap-2 font-medium">
                                    <Clock className="h-4 w-4 text-indigo-500" />
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

              {/* HEALTH ARTICLES */}
              <div className="rounded-3xl bg-white border-2 border-gray-100 shadow-lg p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 mb-1">Health Insights</h2>
                    <p className="text-xs text-gray-600 font-medium">Latest research & tips</p>
                  </div>
                  <Link 
                    to="/articles" 
                    className="text-sm text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 group"
                  >
                    <span>See all</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
          
                <div className="space-y-4">
                  {healthArticles.map((article) => (
                    <div 
                      key={article.id} 
                      className="group cursor-pointer rounded-2xl border-2 border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-300 p-4"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className={cn(
                              "absolute inset-0 blur-lg opacity-20 rounded-xl",
                              `bg-gradient-to-br ${article.imageGradient}`
                            )} />
                            <div className={cn(
                              "relative h-16 w-16 rounded-xl flex items-center justify-center text-white shadow-md",
                              `bg-gradient-to-br ${article.imageGradient}`
                            )}>
                              <article.icon className="h-7 w-7" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-50 text-blue-700 border-0 font-bold px-2 py-1 rounded-lg text-xs">
                              {article.category}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </span>
                          </div>
                          
                          <h3 className="font-bold text-sm text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-blue-600 hover:text-blue-700 font-bold p-0 h-auto text-xs"
                          >
                            Read More
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* HEALTH TIPS */}
              <div className="rounded-3xl bg-white border-2 border-gray-100 shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900">Daily Wellness</h3>
                      <p className="text-xs text-gray-600 font-medium">Health tips</p>
                    </div>
                  </div>
                </div>
              
                <div className="p-5">
                  <div className="space-y-3">
                    {healthTips.map((tip) => (
                      <div
                        key={tip.id}
                        className="p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative flex-shrink-0">
                            <div className={cn(
                              "absolute inset-0 blur-md opacity-20 rounded-lg",
                              `bg-gradient-to-br ${tip.bgGradient}`
                            )} />
                            <div className={cn(
                              "relative h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform",
                              `bg-gradient-to-br ${tip.bgGradient}`
                            )}>
                              <tip.icon className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <Badge 
                              className={cn(
                                "text-xs font-bold mb-2 px-2 py-0.5 rounded-md",
                                tip.bgColor,
                                tip.textColor,
                                "border-0"
                              )}
                            >
                              {tip.category}
                            </Badge>
                            <p className="text-xs text-gray-700 font-medium leading-relaxed">
                              {tip.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* HEALTH CONCERNS */}
              <div className="rounded-3xl bg-white border-2 border-gray-100 shadow-lg overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-gray-900">Specialties</h3>
                      <p className="text-xs text-gray-600 font-medium">By concern</p>
                    </div>
                  </div>
                </div>
              
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-3">
                    {healthConcerns.map((concern) => (
                      <div
                        key={concern.name}
                        className="p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="relative">
                            <div className={cn(
                              "absolute inset-0 blur-md opacity-20 rounded-lg",
                              `bg-gradient-to-br ${concern.gradient}`
                            )} />
                            <div className={cn(
                              "relative h-10 w-10 rounded-lg flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform",
                              `bg-gradient-to-br ${concern.gradient}`
                            )}>
                              <concern.icon className="h-5 w-5" />
                            </div>
                          </div>
                          <span className="text-xs font-bold text-gray-900">{concern.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-5 border-2 hover:bg-gray-50 font-bold h-10 rounded-xl text-xs" 
                    asChild
                  >
                    <Link to="/health-concerns">
                      <Users className="h-4 w-4 mr-2" />
                      Explore All
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Your health journey matters</h3>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
                Stay proactive with regular check-ups. Our AI-powered platform supports your wellness goals.
              </p>
              <p className="text-gray-400 text-xs font-medium">
                Always consult your healthcare provider for personalized advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;