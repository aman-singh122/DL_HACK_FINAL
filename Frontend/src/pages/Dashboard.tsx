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
      icon: "💧",
      category: "Hydration",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      text: "Take a 30-minute walk every day for better heart health",
      icon: "🚶",
      category: "Exercise",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      id: 3,
      text: "Get 7-8 hours of quality sleep each night",
      icon: "😴",
      category: "Sleep",
      bgColor: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      id: 4,
      text: "Practice 10 minutes of meditation daily for mental wellness",
      icon: "🧘",
      category: "Mental Health",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-600",
    },
  ];

  /* ---------------- HEALTH CONCERNS ---------------- */
  const healthConcerns = [
    { name: "Diabetes", icon: Syringe, color: "bg-blue-50 text-blue-700 border-blue-100" },
    { name: "Heart Care", icon: Heart, color: "bg-red-50 text-red-700 border-red-100" },
    { name: "Mental Health", icon: Brain, color: "bg-purple-50 text-purple-700 border-purple-100" },
    { name: "Eye Care", icon: Eye, color: "bg-amber-50 text-amber-700 border-amber-100" },
    { name: "Bone & Joint", icon: Bone, color: "bg-green-50 text-green-700 border-green-100" },
    { name: "Fever & Cold", icon: Thermometer, color: "bg-cyan-50 text-cyan-700 border-cyan-100" },
  ];

  /* ---------------- HEALTH ARTICLES ---------------- */
  const healthArticles = [
    {
      id: 1,
      title: "Losing up to 10% of weight can significantly reduce heart disease risk in diabetes",
      category: "Diabetes Care",
      readTime: "3 min read",
      imageColor: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      id: 2,
      title: "Meditation and mindfulness shown to lower blood pressure naturally",
      category: "Mental Wellness",
      readTime: "4 min read",
      imageColor: "bg-gradient-to-br from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "New study: Daily 30-minute walk reduces risk of chronic diseases by 40%",
      category: "Preventive Care",
      readTime: "2 min read",
      imageColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
  ];

  /* ---------------- LOADING ---------------- */
  if (authLoading || appointmentsLoading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="mb-8">
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Skeleton className="lg:col-span-2 h-96 rounded-xl" />
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ---------------- USER GUARD ---------------- */
  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">User not found</h2>
          <p className="text-gray-500">Please sign in to access your dashboard</p>
          <Button className="mt-6" asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* WELCOME CARD */}
            <div className="flex-1">
              <Card className="border-gray-200 shadow-md overflow-hidden bg-gradient-to-r from-white to-blue-50/30">
                <CardContent className="p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                          {user.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 border-4 border-white flex items-center justify-center shadow-lg">
                          <Shield className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                          Welcome back, <span className="text-blue-600">{user.name?.split(" ")[0]}!</span>
                        </h1>
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Dhanbad, India</span>
                          </div>
                          <div className="hidden sm:block h-1.5 w-1.5 rounded-full bg-gray-300" />
                          <span className="hidden sm:block text-sm text-gray-500">
                            Good{" "}
                            {new Date().getHours() < 12
                              ? "Morning"
                              : new Date().getHours() < 18
                              ? "Afternoon"
                              : "Evening"}
                            , ready for your health check?
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {/* NOTIFICATIONS */}
                      <div className="relative" ref={notificationRef}>
                        <button
                          onClick={() => setShowNotifications((prev) => !prev)}
                          className="relative p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 shadow-sm"
                        >
                          <Bell className="h-6 w-6 text-gray-700" />
                          {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center font-bold shadow-lg">
                              {unreadCount}
                            </span>
                          )}
                        </button>

                        {showNotifications && (
                          <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in slide-in-from-top-5 duration-200">
                            <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white font-semibold flex justify-between items-center">
                              <span className="text-gray-800">Notifications</span>
                              <Badge variant="outline" className="font-mono">
                                {notifications.length}
                              </Badge>
                            </div>

                            <div className="max-h-96 overflow-y-auto">
                              {notifications.length === 0 ? (
                                <div className="p-10 text-center text-gray-500 space-y-3">
                                  <Bell className="h-12 w-12 mx-auto text-gray-300" />
                                  <p className="font-medium text-gray-400">No notifications yet</p>
                                  <p className="text-sm text-gray-400">Updates will appear here</p>
                                </div>
                              ) : (
                                notifications.map((n, i) => (
                                  <div
                                    key={i}
                                    className={cn(
                                      "p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors duration-150",
                                      !n.isRead && "bg-blue-50 border-l-4 border-l-blue-500"
                                    )}
                                    onClick={() => setShowNotifications(false)}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className={cn(
                                        "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                                        !n.isRead ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                                      )}>
                                        <Bell className="h-5 w-5" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-900">
                                          {n.title}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                          {n.message}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-2">
                                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* BOOK APPOINTMENT BUTTON */}
                      <Button 
                        asChild 
                        size="lg" 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-white"
                      >
                        <Link to="/book-opd">
                          <CalendarPlus className="h-5 w-5 mr-2" />
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Actions</h2>
              <p className="text-gray-600">Access essential healthcare services instantly</p>
            </div>
            <Link to="/services" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.path}
                className="group"
              >
                <Card className={cn(
                  "border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full",
                  action.borderColor,
                  action.bgColor
                )}>
                  <CardContent className="p-6">
                    {action.new && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full">
                          NEW
                        </Badge>
                      </div>
                    )}
                    
                    <div className="space-y-5">
                      <div className={cn(
                        "h-14 w-14 rounded-xl flex items-center justify-center text-white shadow-md",
                        `bg-gradient-to-br ${action.gradient}`
                      )}>
                        <action.icon className="h-6 w-6" />
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {action.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center text-sm font-medium">
                        <span className={cn(
                          "group-hover:underline",
                          action.gradient.includes("blue") && "text-blue-600",
                          action.gradient.includes("purple") && "text-purple-600",
                          action.gradient.includes("emerald") && "text-emerald-600",
                          action.gradient.includes("amber") && "text-amber-600"
                        )}>
                          Get Started
                        </span>
                        <ChevronRight className={cn(
                          "h-4 w-4 ml-1 transition-transform group-hover:translate-x-1",
                          action.gradient.includes("blue") && "text-blue-600",
                          action.gradient.includes("purple") && "text-purple-600",
                          action.gradient.includes("emerald") && "text-emerald-600",
                          action.gradient.includes("amber") && "text-amber-600"
                        )} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ================= HEALTH ARTICLES ================= */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Insights</h2>
              <p className="text-gray-600">Latest research and health tips</p>
            </div>
            <Link to="/articles" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View all articles
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {healthArticles.map((article) => (
              <Card key={article.id} className="border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-0">
                  <div className={cn("h-40 rounded-t-lg", article.imageColor)} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        HealthCare Platform
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ================= MAIN GRID ================= */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* UPCOMING APPOINTMENTS */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-gray-900">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Upcoming Appointments</h3>
                      <p className="text-sm text-gray-500 font-normal">
                        {upcomingAppointments.length} scheduled appointments
                      </p>
                    </div>
                  </CardTitle>
                  <Link
                    to="/appointments"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    View all
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {upcomingAppointments.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                      <Calendar className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">No upcoming appointments</h4>
                      <p className="text-sm text-gray-500">Schedule your next appointment today</p>
                    </div>
                    <Button asChild className="mt-4 bg-blue-600 hover:bg-blue-700">
                      <Link to="/book-opd">Book Appointment</Link>
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
                          className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all duration-200 bg-white"
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "h-14 w-14 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm",
                              isOnline
                                ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                : "bg-gradient-to-br from-blue-500 to-indigo-600"
                            )}>
                              {isOnline ? (
                                <Video className="h-6 w-6" />
                              ) : (
                                <Stethoscope className="h-6 w-6" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <h4 className="font-semibold text-gray-900 truncate">
                                  {appt.doctor?.doctorName || "Doctor"}
                                </h4>
                                <div className="flex items-center gap-2">
                                  {isToday && (
                                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                      Today
                                    </Badge>
                                  )}
                                  <Badge className={cn(
                                    "capitalize",
                                    appt.status === "confirmed" && "bg-green-100 text-green-800 border-green-200",
                                    appt.status === "booked" && "bg-blue-100 text-blue-800 border-blue-200"
                                  )}>
                                    {appt.status}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600">
                                  {isOnline ? "Video Consultation" : appt.hospital?.hospitalName || "Hospital"}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {appointmentDate.toLocaleDateString('en-US', { 
                                      weekday: 'short', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {appt.schedule.timeSlot}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* HEALTH TIPS & CONCERNS */}
          <div className="space-y-6">
            {/* HEALTH TIPS */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="flex items-center gap-3 text-gray-900">
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Daily Health Tips</h3>
                    <p className="text-sm text-gray-500 font-normal">
                      Your wellness guide
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  {healthTips.map((tip) => (
                    <div
                      key={tip.id}
                      className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "h-12 w-12 rounded-lg flex items-center justify-center text-xl flex-shrink-0",
                          tip.bgColor
                        )}>
                          {tip.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs font-medium",
                                tip.iconColor,
                                "bg-white"
                              )}
                            >
                              {tip.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700 font-medium leading-relaxed">
                            {tip.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* HEALTH CONCERNS */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-white">
                <CardTitle className="flex items-center gap-3 text-gray-900">
                  <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Health Concerns</h3>
                    <p className="text-sm text-gray-500 font-normal">
                      Browse by category
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  {healthConcerns.map((concern) => (
                    <div
                      key={concern.name}
                      className={cn(
                        "p-4 rounded-xl border cursor-pointer hover:shadow-sm transition-shadow flex flex-col items-center justify-center text-center gap-2",
                        concern.color
                      )}
                    >
                      <concern.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{concern.name}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6" asChild>
                  <Link to="/health-concerns">
                    <Users className="h-4 w-4 mr-2" />
                    Explore All Concerns
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ================= FOOTER NOTE ================= */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="text-center text-gray-600">
            <p className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Your health journey matters.</span>
              Stay proactive with regular check-ups.
              <Sparkles className="h-5 w-5 text-blue-500" />
            </p>
            <p className="text-gray-400 text-sm">
              Consult your healthcare provider for personalized medical advice
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;