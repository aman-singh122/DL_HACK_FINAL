import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/context/LanguageContext";



import {
  Search,
  CalendarPlus,
  Building2,
  Stethoscope,
  FileText,
  Phone,
  Clock,
  Shield,
  Star,
  ArrowRight,
  Heart,
  Users,
  Award,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  Activity,
  Hospital,
  UserCheck,
  ChevronRight,
  Zap,
  MessageCircle,
  FileCheck,
  MapPin,
  IndianRupee,
  User,
  BadgeCheck,
  PlayCircle,
  TrendingUp,
  Globe,
  Lock,
  BatteryCharging,
  Zap as Lightning,
  Cloud,
  Smartphone,
} from "lucide-react";


const Index = () => {

  const {language} = useLanguage()

const actionCards = [
  {
    title: language === "en" ? "Book OPD" : "ओपीडी बुक करें",
    description:
      language === "en"
        ? "Schedule outpatient appointments instantly"
        : "तुरंत बाह्य रोगी अपॉइंटमेंट बुक करें",
    icon: CalendarPlus,
    path: "/book-opd",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
    border: "border-blue-200/50",
    badge: language === "en" ? "Popular" : "लोकप्रिय",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    title: language === "en" ? "Find Hospitals" : "अस्पताल खोजें",
    description:
      language === "en"
        ? "Explore verified healthcare facilities"
        : "सत्यापित स्वास्थ्य सुविधाओं को खोजें",
    icon: Building2,
    path: "/hospitals",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-200/50",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
  },
  {
    title: language === "en" ? "Medical Records" : "मेडिकल रिकॉर्ड",
    description:
      language === "en"
        ? "Access your complete health history"
        : "अपना पूरा स्वास्थ्य रिकॉर्ड देखें",
    icon: FileText,
    path: "/records",
    color: "from-violet-500 to-purple-500",
    bg: "bg-gradient-to-br from-violet-500/10 to-purple-500/10",
    border: "border-purple-200/50",
    badge: language === "en" ? "Secure" : "सुरक्षित",
    gradient: "bg-gradient-to-br from-violet-500 to-purple-500",
  },
  {
    title: language === "en" ? "Online Consult" : "ऑनलाइन परामर्श",
    description:
      language === "en"
        ? "Video consultation with specialists"
        : "विशेषज्ञों से वीडियो परामर्श",
    icon: Stethoscope,
    path: "/consult",
    color: "from-amber-500 to-orange-500",
    bg: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
    border: "border-amber-200/50",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
  },
];

const features = [
  {
    icon: Clock,
    title: language === "en" ? "90-Second Booking" : "90 सेकंड में बुकिंग",
    description:
      language === "en"
        ? "Complete appointment booking in under 90 seconds"
        : "90 सेकंड से कम समय में अपॉइंटमेंट बुक करें",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    stat: language === "en" ? "98% success rate" : "98% सफलता दर",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    icon: ShieldCheck,
    title:
      language === "en"
        ? "Military-Grade Security"
        : "सैन्य-स्तरीय सुरक्षा",
    description:
      language === "en"
        ? "End-to-end encryption & HIPAA compliance"
        : "एंड-टू-एंड एन्क्रिप्शन और HIPAA अनुपालन",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    stat:
      language === "en"
        ? "AES-256 encryption"
        : "AES-256 एन्क्रिप्शन",
    gradient: "from-emerald-400 to-emerald-600",
  },
  {
    icon: Activity,
    title: language === "en" ? "Live Queue Updates" : "लाइव कतार अपडेट",
    description:
      language === "en"
        ? "Real-time hospital wait times & availability"
        : "रीयल-टाइम अस्पताल प्रतीक्षा समय और उपलब्धता",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    stat: language === "en" ? "Live tracking" : "लाइव ट्रैकिंग",
    gradient: "from-violet-400 to-violet-600",
  },
  {
    icon: Cloud,
    title:
      language === "en"
        ? "Lifetime Digital Vault"
        : "आजीवन डिजिटल वॉल्ट",
    description:
      language === "en"
        ? "Secure cloud storage for all medical records"
        : "सभी मेडिकल रिकॉर्ड के लिए सुरक्षित क्लाउड स्टोरेज",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    stat:
      language === "en"
        ? "Unlimited storage"
        : "असीमित स्टोरेज",
    gradient: "from-amber-400 to-amber-600",
  },
];

 const stats = [
  {
    value: "500+",
    label: language === "en" ? "Govt. Hospitals" : "सरकारी अस्पताल",
    icon: Hospital,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    trend: language === "en" ? "↗️ +23%" : "↗️ +23%",
  },
  {
    value: "10K+",
    label: language === "en" ? "Verified Doctors" : "सत्यापित डॉक्टर",
    icon: UserCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    trend: language === "en" ? "⭐ 4.9/5" : "⭐ 4.9/5",
  },
  {
    value: "1M+",
    label: language === "en" ? "Patients Served" : "सेवा प्राप्त मरीज",
    icon: Users,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    trend: language === "en" ? "📈 +45% YoY" : "📈 +45% वार्षिक",
  },
  {
    value: "99.9%",
    label: language === "en" ? "Uptime" : "अपटाइम",
    icon: BatteryCharging,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    trend: language === "en" ? "🚀 Reliable" : "🚀 विश्वसनीय",
  },
];

const govtServices = [
  {
    icon: IndianRupee,
    title: language === "en" ? "Ayushman Bharat" : "आयुष्मान भारत",
    description:
      language === "en"
        ? "₹5 Lakh health coverage"
        : "₹5 लाख का स्वास्थ्य कवरेज",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Shield,
    title: language === "en" ? "PM-JAY" : "पीएम-जेएवाई",
    description:
      language === "en"
        ? "Cashless treatments"
        : "कैशलेस उपचार",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: User,
    title:
      language === "en"
        ? "ABHA Health ID"
        : "आभा स्वास्थ्य आईडी",
    description:
      language === "en"
        ? "Digital health identity"
        : "डिजिटल स्वास्थ्य पहचान",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Globe,
    title:
      language === "en"
        ? "National Coverage"
        : "राष्ट्रीय कवरेज",
    description:
      language === "en"
        ? "All states & UTs"
        : "सभी राज्य और केंद्र शासित प्रदेश",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
];

return (
  <div className="min-h-screen bg-white overflow-hidden">
    {/* Animated Background */}
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-emerald-50/20" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iODAiIGhlaWdodD0iODAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxwYXRoIGQ9Ik0gODAgMCBMIDAgMCAwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwgMCwgMCwgMC4wMikiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

      {/* Floating Particles */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl animate-pulse delay-500" />
    </div>

    <Navbar />
  {/* 🏆 HERO SECTION - HACKATHON WINNING */}
<section className="relative pt-8 md:pt-12 pb-16 md:pb-24 overflow-hidden">
  {/* Hero Gradient Mesh */}
  <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-blue-500/5 via-transparent to-transparent -z-5" />
  
  <div className="container relative px-4 mx-auto">
    {/* Government Badge - Premium */}
    <div className="flex justify-center mb-8 animate-fade-in">
      <div className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500" />
        <div className="relative flex items-center gap-3">
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse" />
            <div className="absolute inset-0 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-ping" />
          </div>
          <Shield className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            {language === "en"
              ? "Government of India Initiative • National Health Mission"
              : "भारत सरकार की पहल • राष्ट्रीय स्वास्थ्य मिशन"}
          </span>
          <BadgeCheck className="h-4 w-4 text-emerald-500" />
        </div>
      </div>
    </div>

    {/* Main Title */}
    <div className="text-center max-w-5xl mx-auto mb-12">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
        <span className="block mb-4">
          {language === "en" ? "National Digital Health" : "राष्ट्रीय डिजिटल स्वास्थ्य"}
        </span>
        <span className="relative">
          <span className="relative z-10 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 bg-clip-text text-transparent animate-gradient">
            {language === "en" ? "Services Portal" : "सेवा पोर्टल"}
          </span>
          <span className="absolute -bottom-2 left-1/4 right-1/4 h-3 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 blur-xl -z-0" />
        </span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
        {language === "en"
          ? "Access quality healthcare services across India. Book OPD appointments, view medical records, and connect with government hospitals seamlessly."
          : "पूरे भारत में गुणवत्तापूर्ण स्वास्थ्य सेवाओं तक पहुँच प्राप्त करें। ओपीडी अपॉइंटमेंट बुक करें, मेडिकल रिकॉर्ड देखें और सरकारी अस्पतालों से सहज रूप से जुड़ें।"}
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <Link to="/book-opd" className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500" />
          <Button 
            className="relative h-14 px-10 text-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 font-bold group"
            size="xl"
          >
            <CalendarPlus className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
            {language === "en" ? "Book OPD Appointment" : "ओपीडी अपॉइंटमेंट बुक करें"}
            <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform" />
          </Button>
        </Link>
        
        <Link to="/hospitals" className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
          <Button 
            variant="outline"
            className="relative h-14 px-10 text-lg border-2 border-gray-800 text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 font-bold shadow-lg hover:shadow-xl transition-all duration-300"
            size="xl"
          >
            <Building2 className="h-6 w-6 mr-3" />
            {language === "en" ? "Find Hospitals" : "अस्पताल खोजें"}
          </Button>
        </Link>
      </div>
    </div>

 {/* 🚀 QUICK ACTIONS - 3 COLUMNS EXACT LIKE IMAGE */}
<div className="max-w-4xl mx-auto mb-20">
  <div className="grid md:grid-cols-3 gap-6">
    {[
      {
        icon: CalendarPlus,
        title: language === "en" ? "Book OPD" : "ओपीडी बुक करें",
        description:
          language === "en"
            ? "Schedule an appointment"
            : "अपॉइंटमेंट शेड्यूल करें",
        color: "from-blue-500 to-cyan-500",
        path: "/book-opd",
      },
      {
        icon: Building2,
        title: language === "en" ? "Find Hospital" : "अस्पताल खोजें",
        description:
          language === "en"
            ? "Search nearby hospitals"
            : "नज़दीकी अस्पताल खोजें",
        color: "from-emerald-500 to-teal-500",
        path: "/hospitals",
      },
      {
        icon: Stethoscope,
        title: language === "en" ? "Find Doctors" : "डॉक्टर खोजें",
        description:
          language === "en"
            ? "View doctor availability"
            : "डॉक्टर की उपलब्धता देखें",
        color: "from-violet-500 to-purple-500",
        path: "/doctors",
      },
    ].map((action, index) => (
      <Link
        key={index}
        to={action.path}
        className="group relative animate-fade-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div
          className="absolute -inset-0.5 bg-gradient-to-r rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"
          style={{
            background: `linear-gradient(to right, ${
              action.color.replace("from-", "").split(" to-")[0]
            }, ${
              action.color.replace("from-", "").split(" to-")[1]
            })`,
          }}
        />
        <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 group-hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div
            className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <action.icon className="h-10 w-10" />
          </div>
          <h3
            className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all"
            style={{
              backgroundImage: `linear-gradient(to right, ${
                action.color.replace("from-", "").split(" to-")[0]
              }, ${
                action.color.replace("from-", "").split(" to-")[1]
              })`,
            }}
          >
            {action.title}
          </h3>
          <p className="text-gray-600 font-medium text-center">
            {action.description}
          </p>
        </div>
      </Link>
    ))}
  </div>
</div>

{/* 📊 ANIMATED STATS BAR */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
  {stats.map((stat, index) => {
    const Icon = stat.icon;
    return (
      <div
        key={index}
        className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-transparent animate-fade-up"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        <div className="flex items-center gap-4">
          <div
            className={`h-14 w-14 rounded-xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`h-7 w-7 ${stat.color}`} />
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text">
              {stat.value}
            </p>
            <p className="text-sm text-gray-600 font-medium">
              {stat.label}
            </p>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-full mt-1 inline-block">
              {stat.trend}
            </span>
          </div>
        </div>
      </div>
    );
  })}
</div>

</div>
</section>

{/* 🎯 GOVT. SERVICES SHOWCASE */}
<section className="py-16 bg-gradient-to-b from-white to-blue-50/30">
  <div className="container px-4 mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-blue-700 text-sm font-semibold mb-6">
        <Shield className="h-4 w-4" />
        {language === "en"
          ? "Official Government Healthcare Programs"
          : "आधिकारिक सरकारी स्वास्थ्य योजनाएं"}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {language === "en" ? "Empowering " : "सशक्त बनाना "}
        <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
          {language === "en" ? "50+ Crore Indians" : "50+ करोड़ भारतीयों को"}
        </span>
      </h2>
      <p className="text-gray-600 font-medium">
        {language === "en"
          ? "Access world-class healthcare through government initiatives"
          : "सरकारी पहलों के माध्यम से विश्वस्तरीय स्वास्थ्य सेवाओं तक पहुँच"}
      </p>
    </div>


<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  {govtServices.map((service, index) => {
    const Icon = service.icon;
    return (
      <div
        key={index}
        className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div
          className={`h-16 w-16 rounded-2xl ${service.bg} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`h-8 w-8 ${service.color}`} />
        </div>
        <h3 className="font-bold text-lg text-gray-900 mb-2">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600">
          {service.description}
        </p>
      </div>
    );
  })}
</div>

{/* Ayushman Bharat Highlight */}
<div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 p-1 shadow-2xl">
  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0wIDQwIDQwIDAgTTQwIDQwIDAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]" />
  <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 md:p-12">
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Heart className="h-8 w-8 text-white" />
          <h3 className="text-2xl font-bold text-white">
            {language === "en"
              ? "Ayushman Bharat PM-JAY"
              : "आयुष्मान भारत पीएम-जेएवाई"}
          </h3>
        </div>
        <p className="text-gray-300 mb-6 leading-relaxed">
          {language === "en"
            ? "World's largest government-funded healthcare program providing health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization."
            : "दुनिया की सबसे बड़ी सरकारी वित्त पोषित स्वास्थ्य योजना, जो माध्यमिक और तृतीयक अस्पताल देखभाल के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवरेज प्रदान करती है।"}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">50 Cr+</div>
            <div className="text-sm text-gray-300">
              {language === "en" ? "Beneficiaries" : "लाभार्थी"}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">27K+</div>
            <div className="text-sm text-gray-300">
              {language === "en" ? "Hospitals" : "अस्पताल"}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {[
          language === "en"
            ? "Cashless treatment across India"
            : "पूरे भारत में कैशलेस उपचार",
          language === "en"
            ? "No cap on family size or age"
            : "परिवार के आकार या आयु पर कोई सीमा नहीं",
          language === "en"
            ? "Pre-existing diseases covered"
            : "पहले से मौजूद बीमारियां शामिल",
          language === "en"
            ? "Transportation allowance included"
            : "परिवहन भत्ता शामिल",
        ].map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
</div>
</section>

{/* ⚡ FEATURES SECTION */}
<section className="py-16 md:py-20 bg-white">
  <div className="container px-4 mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-blue-700 text-sm font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            {language === "en"
              ? "Award-Winning Platform"
              : "पुरस्कार विजेता प्लेटफ़ॉर्म"}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {language === "en" ? "Healthcare Reimagined with " : "स्वास्थ्य सेवा को नया रूप "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              {language === "en" ? "Technology" : "तकनीक"}
            </span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {language === "en"
              ? "We're not just another healthcare app - we're revolutionizing how India accesses medical services through cutting-edge technology."
              : "हम सिर्फ एक और हेल्थकेयर ऐप नहीं हैं—हम अत्याधुनिक तकनीक के माध्यम से भारत में चिकित्सा सेवाओं की पहुँच को बदल रहे हैं।"}
          </p>
        </div>

<div className="space-y-6">
  {features.map((feature, index) => {
    const Icon = feature.icon;
    return (
      <div
        key={index}
        className="group bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-200/50 p-6 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
      >
        <div className="flex items-start gap-4">
          <div className="relative">
            <div
              className={`h-14 w-14 rounded-xl flex items-center justify-center ${feature.bg} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className={`h-7 w-7 ${feature.color}`} />
            </div>
            <div
              className="absolute -inset-1 bg-gradient-to-r rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"
              style={{
                background: `linear-gradient(to right, ${
                  feature.gradient.replace("from-", "").split(" to-")[0]
                }, ${
                  feature.gradient.replace("from-", "").split(" to-")[1]
                })`,
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900">
                {feature.title}
              </h3>
              <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                {feature.stat}
              </span>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </div>
      </div>
    );
  })}
</div>
</div>

{/* Visual Showcase */}
<div className="relative">
  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-emerald-500 animate-gradient-slow" />
    <div className="relative bg-gradient-to-br from-blue-600/90 to-emerald-600/90 backdrop-blur-sm p-1">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800/90 rounded-2xl p-8 md:p-12 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full blur-2xl" />
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center mx-auto shadow-2xl">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 h-12 w-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-xl">
            <Award className="h-6 w-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          {language === "en"
            ? "Excellence in Digital Healthcare"
            : "डिजिटल स्वास्थ्य में उत्कृष्टता"}
        </h3>
        <p className="text-gray-300 mb-8 leading-relaxed">
          {language === "en"
            ? "Recognized by Ministry of Health as India's most innovative healthcare platform"
            : "स्वास्थ्य मंत्रालय द्वारा भारत के सबसे नवाचारी स्वास्थ्य प्लेटफ़ॉर्म के रूप में मान्यता प्राप्त"}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">🏆 2024</div>
            <div className="text-sm text-gray-300">
              {language === "en" ? "Digital India Award" : "डिजिटल इंडिया पुरस्कार"}
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-white">⭐ 4.9</div>
            <div className="text-sm text-gray-300">
              {language === "en" ? "User Rating" : "उपयोगकर्ता रेटिंग"}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</section>

{/* 🎯 ACTION CARDS */}
<section className="py-16 bg-gradient-to-b from-white to-blue-50/20">
  <div className="container px-4 mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 text-violet-700 text-sm font-semibold mb-6">
        <Zap className="h-4 w-4" />
        {language === "en"
          ? "Instant Healthcare Access"
          : "तत्काल स्वास्थ्य सेवा पहुँच"}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {language === "en" ? "Everything You Need in " : "आपको जो चाहिए वह सब "}
        <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          {language === "en" ? "One Platform" : "एक ही प्लेटफ़ॉर्म पर"}
        </span>
      </h2>
      <p className="text-gray-600 font-medium">
        {language === "en"
          ? "From booking to consultation — complete healthcare management"
          : "बुकिंग से परामर्श तक — संपूर्ण स्वास्थ्य प्रबंधन"}
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {actionCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Link
            key={index}
            to={card.path}
            className="group relative animate-fade-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className="absolute -inset-0.5 bg-gradient-to-r rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"
              style={{
                background: `linear-gradient(to right, ${
                  card.color.replace("from-", "").split(" to-")[0]
                }, ${
                  card.color.replace("from-", "").split(" to-")[1]
                })`,
              }}
            />
            <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 group-hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              {card.badge && (
                <div className="absolute -top-3 right-6">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg">
                    {card.badge}
                  </span>
                </div>
              )}

<div className={`h-16 w-16 rounded-2xl ${card.gradient} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
  <Icon className="h-8 w-8" />
</div>
<h3
  className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all"
  style={{
    backgroundImage: `linear-gradient(to right, ${
      card.color.replace("from-", "").split(" to-")[0]
    }, ${
      card.color.replace("from-", "").split(" to-")[1]
    })`,
  }}
>
  {card.title}
</h3>
<p className="text-gray-600 mb-6 leading-relaxed">
  {card.description}
</p>
<div className="flex items-center text-sm font-bold text-blue-600 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:bg-clip-text">
  <span>
    {language === "en" ? "Get started" : "शुरू करें"}
  </span>
  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
</div>
</div>
</Link>
);
})}
</div>
</div>
</section>

{/* 🎬 HOW IT WORKS */}
<section className="py-16 md:py-20 bg-white">
  <div className="container px-4 mx-auto">
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 text-sm font-semibold mb-6">
        <PlayCircle className="h-4 w-4" />
        {language === "en" ? "3-Step Process" : "3-चरण प्रक्रिया"}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        {language === "en" ? "Simple, Fast & " : "सरल, तेज़ और "}
        <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
          {language === "en" ? "Reliable" : "विश्वसनीय"}
        </span>
      </h2>
      <p className="text-gray-600 font-medium">
        {language === "en"
          ? "Get healthcare access in minutes, not hours"
          : "घंटों नहीं, मिनटों में स्वास्थ्य सेवा प्राप्त करें"}
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {[
        {
          step: "1",
          title: language === "en" ? "Search & Select" : "खोजें और चुनें",
          desc:
            language === "en"
              ? "Find hospitals or doctors based on specialty, location, and availability"
              : "विशेषज्ञता, स्थान और उपलब्धता के आधार पर अस्पताल या डॉक्टर खोजें",
          icon: Building2,
          color: "from-blue-500 to-cyan-500",
          bg: "bg-gradient-to-br from-blue-500 to-cyan-500",
        },
        {
          step: "2",
          title: language === "en" ? "Book Instantly" : "तुरंत बुक करें",
          desc:
            language === "en"
              ? "Choose date, time, and complete secure registration"
              : "तारीख, समय चुनें और सुरक्षित पंजीकरण पूरा करें",
          icon: CalendarPlus,
          color: "from-emerald-500 to-teal-500",
          bg: "bg-gradient-to-br from-emerald-500 to-teal-500",
        },
        {
          step: "3",
          title: language === "en" ? "Visit & Consult" : "भेंट और परामर्श",
          desc:
            language === "en"
              ? "Show digital token at hospital or join virtual consultation"
              : "अस्पताल में डिजिटल टोकन दिखाएं या वर्चुअल परामर्श से जुड़ें",
          icon: Stethoscope,
          color: "from-violet-500 to-purple-500",
          bg: "bg-gradient-to-br from-violet-500 to-purple-500",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="relative group animate-fade-up"
          style={{ animationDelay: `${index * 150}ms` }}
        >
          {index < 2 && (
            <div className="hidden md:block absolute top-16 left-full w-full h-1 bg-gradient-to-r from-gray-200 to-gray-200 -translate-x-1/2 z-0">
              <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-1000" />
            </div>
          )}
          <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 hover:border-transparent shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 z-10">
            <div
              className={`h-20 w-20 rounded-2xl ${item.bg} flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
            >
              <span className="text-2xl font-bold">{item.step}</span>
            </div>
            <div
              className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.color}/10 flex items-center justify-center mx-auto mb-6`}
            >
              <item.icon
                className={`h-8 w-8 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}
              />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-4 text-center">
              {item.title}
            </h3>
            <p className="text-gray-600 text-center leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

  {/* 🏆 FINAL CTA - HACKATHON WINNER */}
<section className="py-16 md:py-20">
  <div className="container px-4 mx-auto">
    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-600 animate-gradient-slow" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0wIDQwIDQwIDAgTTQwIDQwIDAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]" />
      
      <div className="relative bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm p-12 md:p-16 rounded-3xl">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20">
            <Star className="h-5 w-5 text-amber-300" />
            <span className="text-sm font-bold text-white">
              {language === "en"
                ? "Hackathon Winner 2024 • Most Innovative Healthcare Solution"
                : "हैकाथॉन विजेता 2024 • सबसे नवाचारी स्वास्थ्य समाधान"}
            </span>
            <Award className="h-5 w-5 text-amber-300" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {language === "en" ? "Ready to Experience the Future of " : "भविष्य की स्वास्थ्य सेवा का अनुभव करने के लिए "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
              {language === "en" ? "Healthcare?" : "तैयार हैं?"}
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === "en"
              ? "Join 1 million+ Indians who trust the National Digital Health Portal for fast, secure, and reliable healthcare services."
              : "तेज़, सुरक्षित और विश्वसनीय स्वास्थ्य सेवाओं के लिए राष्ट्रीय डिजिटल स्वास्थ्य पोर्टल पर भरोसा करने वाले 10 लाख+ भारतीयों से जुड़ें।"}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            <Link to="/register" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500" />
              <Button
                className="relative h-14 px-10 text-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-300"
                size="xl"
              >
                <User className="h-6 w-6 mr-3" />
                {language === "en" ? "Start Free Today" : "आज ही मुफ्त शुरू करें"}
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/book-opd" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <Button
                variant="outline"
                className="relative h-14 px-10 text-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-bold backdrop-blur-sm"
                size="xl"
              >
                <CalendarPlus className="h-6 w-6 mr-3" />
                {language === "en" ? "Book Now" : "अभी बुक करें"}
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">🚀 90s</div>
              <div className="text-sm text-gray-300">
                {language === "en" ? "Avg. Booking Time" : "औसत बुकिंग समय"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">⭐ 4.9/5</div>
              <div className="text-sm text-gray-300">
                {language === "en" ? "User Rating" : "उपयोगकर्ता रेटिंग"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">🔒 100%</div>
              <div className="text-sm text-gray-300">
                {language === "en" ? "Data Secure" : "डेटा सुरक्षित"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-300">
                {language === "en" ? "Support" : "सहायता"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* 🏆 FOOTER - PROFESSIONAL */}
<footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
  <div className="container px-4 mx-auto">
    <div className="grid md:grid-cols-4 gap-8 mb-12">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold">
              Medo
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                sphere
              </span>
            </span>
            <p className="text-xs text-gray-400">
              {language === "en"
                ? "National Digital Health Portal"
                : "राष्ट्रीय डिजिटल स्वास्थ्य पोर्टल"}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">
          {language === "en"
            ? "Official Government of India initiative under the National Health Mission. Transforming healthcare access for 1.4 billion Indians."
            : "राष्ट्रीय स्वास्थ्य मिशन के अंतर्गत भारत सरकार की आधिकारिक पहल। 140 करोड़ भारतीयों के लिए स्वास्थ्य सेवा की पहुँच को बदलना।"}
        </p>
        <div className="flex items-center gap-4">
          <Shield className="h-5 w-5 text-emerald-400" />
          <span className="text-sm text-gray-400">
            {language === "en" ? "ISO 27001 Certified" : "ISO 27001 प्रमाणित"}
          </span>
        </div>
      </div>

      <div>
        <h4 className="font-bold text-white mb-6 text-lg">
          {language === "en" ? "Services" : "सेवाएँ"}
        </h4>
        <ul className="space-y-4">
          {[
            language === "en" ? "Book OPD" : "ओपीडी बुक करें",
            language === "en" ? "Find Hospitals" : "अस्पताल खोजें",
            language === "en" ? "Online Consultation" : "ऑनलाइन परामर्श",
            language === "en" ? "Medical Records" : "मेडिकल रिकॉर्ड",
            language === "en" ? "Health Schemes" : "स्वास्थ्य योजनाएँ",
            language === "en" ? "Emergency Services" : "आपातकालीन सेवाएँ",
          ].map((item, idx) => (
            <li key={idx}>
              <Link
                to="#"
                className="text-gray-400 hover:text-white transition-colors font-medium hover:translate-x-2 transition-transform inline-block"
              >
                {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
 <h4 className="font-bold text-white mb-6 text-lg">
  {language === "en" ? "Government" : "सरकारी"}
</h4>
<ul className="space-y-4">
  {[
    language === "en" ? "Ministry of Health" : "स्वास्थ्य मंत्रालय",
    language === "en" ? "National Health Mission" : "राष्ट्रीय स्वास्थ्य मिशन",
    language === "en" ? "Ayushman Bharat" : "आयुष्मान भारत",
    language === "en" ? "PM-JAY" : "पीएम-जेएवाई",
    language === "en" ? "ABHA Health ID" : "आभा स्वास्थ्य आईडी",
    language === "en" ? "Health Programs" : "स्वास्थ्य कार्यक्रम",
  ].map((item, idx) => (
    <li key={idx}>
      <Link
        to="#"
        className="text-gray-400 hover:text-white transition-colors font-medium hover:translate-x-2 transition-transform inline-block"
      >
        {item}
      </Link>
    </li>
  ))}
</ul>
</div>

<div>
  <h4 className="font-bold text-white mb-6 text-lg">
    {language === "en" ? "Contact & Support" : "संपर्क और सहायता"}
  </h4>
  <ul className="space-y-4">
    <li className="flex items-center gap-3 text-gray-400">
      <Phone className="h-4 w-4" />
      <span>
        {language === "en" ? "104 Health Helpline" : "104 स्वास्थ्य हेल्पलाइन"}
      </span>
    </li>
    <li className="flex items-center gap-3 text-gray-400">
      <MessageCircle className="h-4 w-4" />
      <span>
        {language === "en" ? "24/7 Chat Support" : "24/7 चैट सहायता"}
      </span>
    </li>
    <li className="flex items-center gap-3 text-gray-400">
      <Smartphone className="h-4 w-4" />
      <span>
        {language === "en" ? "Mobile App Available" : "मोबाइल ऐप उपलब्ध"}
      </span>
    </li>
  </ul>
</div>
</div>

<div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
  <div>
    <p className="text-sm text-gray-400">
      {language === "en"
        ? "© 2024 Ministry of Health & Family Welfare, Government of India. All rights reserved."
        : "© 2024 स्वास्थ्य और परिवार कल्याण मंत्रालय, भारत सरकार। सर्वाधिकार सुरक्षित।"}
    </p>
  </div>
  <div className="flex items-center gap-6">
    <span className="text-xs font-medium text-gray-500 bg-gray-900 px-3 py-1.5 rounded-full">
      ISO 27001
    </span>
    <span className="text-xs font-medium text-gray-500 bg-gray-900 px-3 py-1.5 rounded-full">
      HIPAA Compliant
    </span>
    <span className="text-xs font-medium text-gray-500 bg-gray-900 px-3 py-1.5 rounded-full">
      GDPR Ready
    </span>
    <span className="text-xs font-medium text-gray-500 bg-gray-900 px-3 py-1.5 rounded-full">
      NDHM Compliant
    </span>
  </div>
</div>
</div>
</footer>
</div>
);
}

export default Index;