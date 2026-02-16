import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

import {
  CalendarPlus,
  Building2,
  Stethoscope,
  FileText,
  Shield,
  Heart,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Award,
  Activity,
  Phone,
  MessageCircle,
  Smartphone,
  BadgeCheck,
  TrendingUp,
  Zap,
  Globe,
  Lock,
  CloudUpload,
  Wifi,
  Bell,
  Video,
  MapPin,
  Search,
  Headphones,
  ShieldCheck,
  Database,
  Sparkles,
  Target,
  Fingerprint,
  Ambulance,
  Pill,
  Microscope,
  HeartPulse,
  Brain,
  Eye,
  Bone,
  Thermometer,
  Syringe,
  Clipboard,
  FileCheck,
  UserCheck,
  Calendar,
  PlayCircle,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Index = () => {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // FAQ Data
  const faqs = [
    {
      question: language === "en" ? "How do I book an OPD appointment?" : "मैं ओपीडी अपॉइंटमेंट कैसे बुक करूं?",
      answer: language === "en" 
        ? "Simply select your preferred hospital, choose a doctor, pick a date and time slot, and confirm your booking. The entire process takes less than 90 seconds."
        : "बस अपना पसंदीदा अस्पताल चुनें, एक डॉक्टर चुनें, तारीख और समय स्लॉट चुनें, और अपनी बुकिंग की पुष्टि करें। पूरी प्रक्रिया में 90 सेकंड से कम समय लगता है।"
    },
    {
      question: language === "en" ? "Is my medical data secure?" : "क्या मेरा मेडिकल डेटा सुरक्षित है?",
      answer: language === "en"
        ? "Yes, we use military-grade AES-256 encryption and are fully HIPAA compliant. Your data is stored on secure cloud servers with multiple backup systems."
        : "हां, हम सैन्य-स्तरीय AES-256 एन्क्रिप्शन का उपयोग करते हैं और पूरी तरह से HIPAA अनुपालन करते हैं। आपका डेटा सुरक्षित क्लाउड सर्वर पर कई बैकअप सिस्टम के साथ संग्रहीत है।"
    },
    {
      question: language === "en" ? "Can I access my medical records anytime?" : "क्या मैं किसी भी समय अपने मेडिकल रिकॉर्ड तक पहुंच सकता हूं?",
      answer: language === "en"
        ? "Absolutely! Your medical records are available 24/7 from any device. You can view, download, and share them with healthcare providers instantly."
        : "बिल्कुल! आपके मेडिकल रिकॉर्ड किसी भी डिवाइस से 24/7 उपलब्ध हैं। आप उन्हें तुरंत देख सकते हैं, डाउनलोड कर सकते हैं और स्वास्थ्य सेवा प्रदाताओं के साथ साझा कर सकते हैं।"
    },
    {
      question: language === "en" ? "What is Ayushman Bharat?" : "आयुष्मान भारत क्या है?",
      answer: language === "en"
        ? "Ayushman Bharat PM-JAY is the world's largest health insurance scheme providing coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization."
        : "आयुष्मान भारत पीएम-जेएवाई दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना है जो माध्यमिक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख की कवरेज प्रदान करती है।"
    },
    {
      question: language === "en" ? "How does online consultation work?" : "ऑनलाइन परामर्श कैसे काम करता है?",
      answer: language === "en"
        ? "Book a video consultation with a specialist doctor, join the call at your scheduled time, discuss your health concerns, get prescriptions digitally, and access the consultation recording anytime."
        : "एक विशेषज्ञ डॉक्टर के साथ वीडियो परामर्श बुक करें, अपने निर्धारित समय पर कॉल में शामिल हों, अपनी स्वास्थ्य चिंताओं पर चर्चा करें, डिजिटल रूप से नुस्खे प्राप्त करें, और किसी भी समय परामर्श रिकॉर्डिंग तक पहुंचें।"
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: language === "en" 
        ? "Booked my father's appointment in just 60 seconds! The process was so smooth and the hospital staff was already prepared when we arrived."
        : "अपने पिता की अपॉइंटमेंट केवल 60 सेकंड में बुक की! प्रक्रिया बहुत आसान थी और जब हम पहुंचे तो अस्पताल का स्टाफ पहले से तैयार था।",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80"
    },
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: language === "en"
        ? "The online consultation feature is a lifesaver! I consulted with a specialist from home without taking a day off from work."
        : "ऑनलाइन परामर्श सुविधा जीवन रक्षक है! मैंने काम से छुट्टी लिए बिना घर से ही एक विशेषज्ञ से परामर्श किया।",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
    },
    {
      name: "Dr. Amit Patel",
      location: "Ahmedabad",
      rating: 5,
      text: language === "en"
        ? "As a doctor, I appreciate how this platform has streamlined patient management. Real-time queue updates help us serve patients better."
        : "एक डॉक्टर के रूप में, मैं सराहना करता हूं कि इस प्लेटफॉर्म ने रोगी प्रबंधन को कैसे सुव्यवस्थित किया है। रीयल-टाइम कतार अपडेट हमें रोगियों को बेहतर सेवा देने में मदद करते हैं।",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&q=80"
    },
  ];

  // Process Steps
  const processSteps = [
    {
      step: "1",
      title: language === "en" ? "Search & Select" : "खोजें और चुनें",
      description: language === "en"
        ? "Browse through verified hospitals and doctors based on specialty, location, ratings, and availability."
        : "विशेषज्ञता, स्थान, रेटिंग और उपलब्धता के आधार पर सत्यापित अस्पतालों और डॉक्टरों को ब्राउज़ करें।",
      icon: Search,
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: "2",
      title: language === "en" ? "Book Appointment" : "अपॉइंटमेंट बुक करें",
      description: language === "en"
        ? "Choose your preferred date and time slot, provide basic details, and confirm your booking instantly."
        : "अपनी पसंदीदा तारीख और समय स्लॉट चुनें, बुनियादी विवरण प्रदान करें, और तुरंत अपनी बुकिंग की पुष्टि करें।",
      icon: Calendar,
      color: "from-emerald-500 to-teal-500",
    },
    {
      step: "3",
      title: language === "en" ? "Get Digital Token" : "डिजिटल टोकन प्राप्त करें",
      description: language === "en"
        ? "Receive your unique digital token via SMS and app. Track your queue position in real-time."
        : "एसएमएस और ऐप के माध्यम से अपना अनूठा डिजिटल टोकन प्राप्त करें। रीयल-टाइम में अपनी कतार स्थिति को ट्रैक करें।",
      icon: Smartphone,
      color: "from-purple-500 to-fuchsia-500",
    },
    {
      step: "4",
      title: language === "en" ? "Visit & Consult" : "भेंट और परामर्श",
      description: language === "en"
        ? "Arrive at the hospital on time, show your digital token, and consult with your doctor without hassle."
        : "समय पर अस्पताल पहुंचें, अपना डिजिटल टोकन दिखाएं, और बिना किसी परेशानी के अपने डॉक्टर से परामर्श करें।",
      icon: Stethoscope,
      color: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ========== HERO SECTION - ENHANCED ========== */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        
        <div className="container relative mx-auto px-6 max-w-7xl">
          {/* Government Badge - Premium */}
          <div className="flex justify-center mb-10 animate-fadeIn">
            <div className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/95 backdrop-blur-xl border-2 border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 animate-ping" />
                </div>
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-base font-bold text-gray-700">
                  {language === "en"
                    ? "Government of India Initiative • National Health Mission"
                    : "भारत सरकार की पहल • राष्ट्रीय स्वास्थ्य मिशन"}
                </span>
                <BadgeCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Main Heading - Enhanced Typography */}
          <div className="text-center max-w-5xl mx-auto mb-14">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              <span className="block mb-4">
                {language === "en" ? "National Digital Health" : "राष्ट्रीय डिजिटल स्वास्थ्य"}
              </span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  {language === "en" ? "Services Portal" : "सेवा पोर्टल"}
                </span>
                <span className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 blur-2xl" />
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
              {language === "en"
                ? "Access quality healthcare services across India. Book OPD appointments, view medical records, and connect with government hospitals seamlessly."
                : "पूरे भारत में गुणवत्तापूर्ण स्वास्थ्य सेवाओं तक पहुँच प्राप्त करें। ओपीडी अपॉइंटमेंट बुक करें, मेडिकल रिकॉर्ड देखें और सरकारी अस्पतालों से सहज रूप से जुड़ें।"}
            </p>

            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
              <Link to="/book-opd" className="group relative w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500" />
                <Button className="relative h-16 px-12 text-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold shadow-2xl w-full sm:w-auto rounded-2xl">
                  <CalendarPlus className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
                  {language === "en" ? "Book OPD Appointment" : "ओपीडी अपॉइंटमेंट बुक करें"}
                  <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>

              <Link to="/hospitals" className="group w-full sm:w-auto">
                <Button variant="outline" className="h-16 px-12 text-lg border-3 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-bold shadow-lg w-full rounded-2xl">
                  <Building2 className="h-6 w-6 mr-3" />
                  {language === "en" ? "Find Hospitals" : "अस्पताल खोजें"}
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">{language === "en" ? "100% Secure" : "100% सुरक्षित"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">{language === "en" ? "1M+ Users" : "10 लाख+ उपयोगकर्ता"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">{language === "en" ? "24/7 Support" : "24/7 सहायता"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold">{language === "en" ? "ISO Certified" : "ISO प्रमाणित"}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Cards - 3 Column Enhanced */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: CalendarPlus,
                title: language === "en" ? "Book OPD" : "ओपीडी बुक करें",
                description: language === "en" ? "Schedule appointments in 90 seconds" : "90 सेकंड में अपॉइंटमेंट बुक करें",
                gradient: "from-blue-500 to-cyan-500",
                path: "/book-opd",
                features: [
                  language === "en" ? "Real-time availability" : "रीयल-टाइम उपलब्धता",
                  language === "en" ? "Digital token" : "डिजिटल टोकन",
                  language === "en" ? "Queue tracking" : "कतार ट्रैकिंग"
                ]
              },
              {
                icon: FileText,
                title: language === "en" ? "Medical Records" : "मेडिकल रिकॉर्ड",
                description: language === "en" ? "Access your health history anytime" : "किसी भी समय अपना स्वास्थ्य इतिहास देखें",
                gradient: "from-emerald-500 to-teal-500",
                path: "/records",
                features: [
                  language === "en" ? "Lifetime storage" : "आजीवन स्टोरेज",
                  language === "en" ? "Easy sharing" : "आसान साझाकरण",
                  language === "en" ? "Cloud backup" : "क्लाउड बैकअप"
                ]
              },
              {
                icon: Stethoscope,
                title: language === "en" ? "Find Doctors" : "डॉक्टर खोजें",
                description: language === "en" ? "Connect with verified specialists" : "सत्यापित विशेषज्ञों से जुड़ें",
                gradient: "from-purple-500 to-fuchsia-500",
                path: "/doctors",
                features: [
                  language === "en" ? "10K+ doctors" : "10हजार+ डॉक्टर",
                  language === "en" ? "Ratings & reviews" : "रेटिंग और समीक्षा",
                  language === "en" ? "Video consult" : "वीडियो परामर्श"
                ]
              },
            ].map((action, idx) => (
              <Link key={idx} to={action.path} className="group">
                <div className="relative h-full bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-5 rounded-3xl blur-2xl group-hover:opacity-10 transition-opacity" style={{
                    backgroundImage: `linear-gradient(to bottom right, ${action.gradient.split(' ')[1]}, ${action.gradient.split(' ')[3]})`
                  }} />
                  
                  <div className={`relative h-20 w-20 rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-10 w-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 text-center mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all" style={{
                    backgroundImage: `linear-gradient(to right, ${action.gradient.split(' ')[1]}, ${action.gradient.split(' ')[3]})`
                  }}>
                    {action.title}
                  </h3>

                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {action.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {action.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center text-sm font-bold text-blue-600 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r" style={{
                    backgroundImage: `linear-gradient(to right, ${action.gradient.split(' ')[1]}, ${action.gradient.split(' ')[3]})`
                  }}>
                    <span>{language === "en" ? "Get Started" : "शुरू करें"}</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION - ENHANCED ========== */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500+", label: language === "en" ? "Govt. Hospitals" : "सरकारी अस्पताल", icon: Building2, trend: "+23%", color: "blue" },
              { value: "10K+", label: language === "en" ? "Verified Doctors" : "सत्यापित डॉक्टर", icon: UserCheck, trend: "4.9/5", color: "emerald" },
              { value: "1M+", label: language === "en" ? "Patients Served" : "सेवा प्राप्त मरीज", icon: Users, trend: "+45%", color: "purple" },
              { value: "99.9%", label: language === "en" ? "Uptime" : "अपटाइम", icon: TrendingUp, trend: "24/7", color: "amber" },
            ].map((stat, idx) => (
              <div key={idx} className="group bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-14 w-14 rounded-xl bg-${stat.color}-50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`h-7 w-7 text-${stat.color}-600`} />
                  </div>
                  <span className={`text-sm font-bold text-${stat.color}-600 bg-${stat.color}-50 px-3 py-1 rounded-full`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-4xl font-black text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600 font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ========== HEALTHCARE SHOWCASE WITH IMAGES - ENHANCED ========== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6">
              <Sparkles className="h-5 w-5" />
              {language === "en" ? "World-Class Healthcare" : "विश्वस्तरीय स्वास्थ्य सेवा"}
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === "en" ? "Experience Excellence in " : "उत्कृष्टता का अनुभव "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {language === "en" ? "Healthcare" : "स्वास्थ्य सेवा में"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "State-of-the-art medical facilities, expert doctors, and cutting-edge technology to serve you better"
                : "अत्याधुनिक चिकित्सा सुविधाएं, विशेषज्ञ डॉक्टर और आपकी बेहतर सेवा के लिए अत्याधुनिक तकनीक"}
            </p>
          </div>

          {/* Main Feature Images - 2 Large */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="group relative rounded-3xl overflow-hidden shadow-2xl h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=80"
                alt="Doctor Consultation"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold mb-4">
                  <Star className="h-4 w-4 text-yellow-400" />
                  {language === "en" ? "Top Rated" : "शीर्ष रेटेड"}
                </div>
                <h3 className="text-3xl font-black text-white mb-3">
                  {language === "en" ? "Expert Consultations" : "विशेषज्ञ परामर्श"}
                </h3>
                <p className="text-white/90 text-lg mb-4">
                  {language === "en" 
                    ? "Connect with India's top doctors across 50+ specialties" 
                    : "50+ विशेषज्ञताओं में भारत के शीर्ष डॉक्टरों से जुड़ें"}
                </p>
                <div className="flex items-center gap-6 text-white/80 text-sm">
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    10,000+ Doctors
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    24/7 Available
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden shadow-2xl h-[450px]">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80"
                alt="Modern Hospital"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold mb-4">
                  <Shield className="h-4 w-4 text-green-400" />
                  {language === "en" ? "Verified" : "सत्यापित"}
                </div>
                <h3 className="text-3xl font-black text-white mb-3">
                  {language === "en" ? "Modern Facilities" : "आधुनिक सुविधाएं"}
                </h3>
                <p className="text-white/90 text-lg mb-4">
                  {language === "en" 
                    ? "State-of-the-art infrastructure with latest medical equipment" 
                    : "नवीनतम चिकित्सा उपकरणों के साथ अत्याधुनिक अवसंरचना"}
                </p>
                <div className="flex items-center gap-6 text-white/80 text-sm">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    500+ Hospitals
                  </span>
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Quality Care
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Grid - 4 Columns */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80",
                title: language === "en" ? "Advanced Technology" : "उन्नत प्रौद्योगिकी",
                description: language === "en" ? "Latest medical equipment" : "नवीनतम चिकित्सा उपकरण",
                icon: Microscope,
                gradient: "from-blue-600 to-cyan-500"
              },
              {
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&q=80",
                title: language === "en" ? "Expert Team" : "विशेषज्ञ टीम",
                description: language === "en" ? "Qualified professionals" : "योग्य पेशेवर",
                icon: Users,
                gradient: "from-emerald-600 to-teal-500"
              },
              {
                image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=500&q=80",
                title: language === "en" ? "Patient Care" : "रोगी देखभाल",
                description: language === "en" ? "Compassionate service" : "सहानुभूतिपूर्ण सेवा",
                icon: Heart,
                gradient: "from-purple-600 to-fuchsia-500"
              },
              {
                image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80",
                title: language === "en" ? "Emergency Care" : "आपातकालीन देखभाल",
                description: language === "en" ? "24/7 availability" : "24/7 उपलब्धता",
                icon: Ambulance,
                gradient: "from-red-600 to-orange-500"
              },
            ].map((feature, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-64">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-80`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-black mb-2">{feature.title}</h4>
                    <p className="text-sm text-white/90">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS - DETAILED PROCESS ========== */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-50 text-purple-700 text-sm font-bold mb-6">
              <PlayCircle className="h-5 w-5" />
              {language === "en" ? "Simple 4-Step Process" : "सरल 4-चरण प्रक्रिया"}
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === "en" ? "How It " : "यह कैसे "}
              <span className="bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                {language === "en" ? "Works" : "काम करता है"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Get healthcare access in just 4 simple steps - fast, secure, and hassle-free"
                : "केवल 4 सरल चरणों में स्वास्थ्य सेवा पहुंच प्राप्त करें - तेज़, सुरक्षित और परेशानी मुक्त"}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-24 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-blue-500 via-emerald-500 via-purple-500 to-amber-500 opacity-20" />

            {processSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                  {/* Step Number Badge */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-2xl`}>
                      <span className="text-2xl font-black">{step.step}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`mt-12 mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center mx-auto`}>
                    <step.icon className="h-10 w-10 text-gray-700" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-black text-gray-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed text-sm">
                    {step.description}
                  </p>

                  {/* Arrow for next step */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-24 -right-8 text-gray-300">
                      <ChevronRight className="h-8 w-8" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ========== FEATURES - DETAILED GRID ========== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold mb-6">
              <Zap className="h-5 w-5" />
              {language === "en" ? "Powerful Features" : "शक्तिशाली सुविधाएँ"}
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === "en" ? "Why Choose " : "क्यों चुनें "}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                {language === "en" ? "Medosphere" : "मेडोस्फियर"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Experience healthcare like never before with our cutting-edge features and user-friendly platform"
                : "हमारी अत्याधुनिक सुविधाओं और उपयोगकर्ता-अनुकूल प्लेटफ़ॉर्म के साथ पहले जैसी स्वास्थ्य सेवा का अनुभव करें"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: language === "en" ? "90-Second Booking" : "90 सेकंड में बुकिंग",
                description: language === "en" 
                  ? "Book appointments in under 90 seconds with our lightning-fast booking system. No more waiting in long queues or phone calls."
                  : "हमारे बिजली की तेज़ी से बुकिंग सिस्टम के साथ 90 सेकंड से कम में अपॉइंटमेंट बुक करें। अब लंबी कतारों या फोन कॉल में इंतजार नहीं।",
                color: "text-blue-600",
                bg: "bg-blue-50",
                stat: "98% Success Rate"
              },
              {
                icon: ShieldCheck,
                title: language === "en" ? "Military-Grade Security" : "सैन्य-स्तरीय सुरक्षा",
                description: language === "en"
                  ? "Your medical data is protected with AES-256 encryption and HIPAA compliance. We never compromise on security."
                  : "आपका मेडिकल डेटा AES-256 एन्क्रिप्शन और HIPAA अनुपालन के साथ सुरक्षित है। हम कभी भी सुरक्षा पर समझौता नहीं करते।",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
                stat: "AES-256"
              },
              {
                icon: Activity,
                title: language === "en" ? "Live Queue Updates" : "लाइव कतार अपडेट",
                description: language === "en"
                  ? "Track your position in real-time with live queue updates. Know exactly when to reach the hospital without wasting time."
                  : "लाइव कतार अपडेट के साथ रीयल-टाइम में अपनी स्थिति ट्रैक करें। समय बर्बाद किए बिना जानें कि अस्पताल कब पहुंचना है।",
                color: "text-purple-600",
                bg: "bg-purple-50",
                stat: "Real-time"
              },
              {
                icon: CloudUpload,
                title: language === "en" ? "Cloud Storage" : "क्लाउड स्टोरेज",
                description: language === "en"
                  ? "Lifetime storage for all your medical records. Access from anywhere, anytime on any device with automatic cloud sync."
                  : "आपके सभी मेडिकल रिकॉर्ड के लिए आजीवन स्टोरेज। स्वचालित क्लाउड सिंक के साथ किसी भी डिवाइस पर कहीं से भी, कभी भी पहुंचें।",
                color: "text-cyan-600",
                bg: "bg-cyan-50",
                stat: "Unlimited"
              },
              {
                icon: Video,
                title: language === "en" ? "Video Consultation" : "वीडियो परामर्श",
                description: language === "en"
                  ? "Consult with doctors via HD video calls from the comfort of your home. Get prescriptions digitally delivered instantly."
                  : "अपने घर की आराम से एचडी वीडियो कॉल के माध्यम से डॉक्टरों से परामर्श करें। डिजिटल रूप से तुरंत नुस्खे प्राप्त करें।",
                color: "text-pink-600",
                bg: "bg-pink-50",
                stat: "HD Quality"
              },
              {
                icon: Headphones,
                title: language === "en" ? "24/7 Support" : "24/7 सहायता",
                description: language === "en"
                  ? "Our dedicated support team is available round the clock to assist you with any queries or emergencies."
                  : "हमारी समर्पित सहायता टीम किसी भी प्रश्न या आपातकाल में आपकी सहायता के लिए चौबीसों घंटे उपलब्ध है।",
                color: "text-amber-600",
                bg: "bg-amber-50",
                stat: "Always On"
              },
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-start justify-between mb-6">
                  <div className={`h-16 w-16 rounded-2xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <span className={`text-xs font-black ${feature.color} ${feature.bg} px-4 py-2 rounded-full`}>
                    {feature.stat}
                  </span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GOVERNMENT SERVICES - ENHANCED ========== */}
      <section className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 text-blue-700 text-sm font-bold mb-6">
              <Shield className="h-5 w-5" />
              {language === "en" ? "Government Healthcare Programs" : "सरकारी स्वास्थ्य योजनाएं"}
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === "en" ? "Empowering " : "सशक्त बनाना "}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {language === "en" ? "50+ Crore Indians" : "50+ करोड़ भारतीयों को"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Access world-class healthcare through government initiatives designed for every Indian citizen"
                : "हर भारतीय नागरिक के लिए डिज़ाइन की गई सरकारी पहलों के माध्यम से विश्वस्तरीय स्वास्थ्य सेवाओं तक पहुंचें"}
            </p>
          </div>

          {/* Ayushman Bharat Highlight - Large Card */}
          <div className="relative rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500" />
            <div className="relative bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">
                      {language === "en" ? "Ayushman Bharat PM-JAY" : "आयुष्मान भारत पीएम-जेएवाई"}
                    </h3>
                  </div>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    {language === "en"
                      ? "The world's largest government-funded healthcare program providing health coverage of ₹5 lakh per family per year for secondary and tertiary care hospitalization to over 50 crore beneficiaries."
                      : "दुनिया की सबसे बड़ी सरकारी वित्त पोषित स्वास्थ्य योजना जो 50 करोड़ से अधिक लाभार्थियों को माध्यमिक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवरेज प्रदान करती है।"}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                      <div className="text-3xl font-black text-white mb-1">50 Cr+</div>
                      <div className="text-sm text-gray-300">{language === "en" ? "Beneficiaries" : "लाभार्थी"}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                      <div className="text-3xl font-black text-white mb-1">27K+</div>
                      <div className="text-sm text-gray-300">{language === "en" ? "Hospitals" : "अस्पताल"}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                      <div className="text-3xl font-black text-white mb-1">₹5L</div>
                      <div className="text-sm text-gray-300">{language === "en" ? "Coverage" : "कवरेज"}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { text: language === "en" ? "Cashless treatment across India" : "पूरे भारत में कैशलेस उपचार", icon: CheckCircle2 },
                    { text: language === "en" ? "No cap on family size or age" : "परिवार के आकार या आयु पर कोई सीमा नहीं", icon: CheckCircle2 },
                    { text: language === "en" ? "Pre-existing diseases covered" : "पहले से मौजूद बीमारियां शामिल", icon: CheckCircle2 },
                    { text: language === "en" ? "Transportation allowance included" : "परिवहन भत्ता शामिल", icon: CheckCircle2 },
                    { text: language === "en" ? "1,393 medical procedures covered" : "1,393 चिकित्सा प्रक्रियाएं शामिल", icon: CheckCircle2 },
                    { text: language === "en" ? "Digital health records integration" : "डिजिटल स्वास्थ्य रिकॉर्ड एकीकरण", icon: CheckCircle2 },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-gray-300 bg-white/5 backdrop-blur-sm p-4 rounded-xl">
                      <benefit.icon className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                      <span className="text-lg font-semibold">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Other Government Programs */}
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: language === "en" ? "PM-JAY" : "पीएम-जेएवाई",
                description: language === "en" ? "Comprehensive health coverage" : "व्यापक स्वास्थ्य कवरेज",
                stats: language === "en" ? "Free treatments" : "मुफ्त उपचार",
                color: "blue"
              },
              {
                icon: Fingerprint,
                title: language === "en" ? "ABHA Health ID" : "आभा स्वास्थ्य आईडी",
                description: language === "en" ? "Digital health identity" : "डिजिटल स्वास्थ्य पहचान",
                stats: language === "en" ? "Unique ID" : "अनूठा आईडी",
                color: "purple"
              },
              {
                icon: Globe,
                title: language === "en" ? "National Coverage" : "राष्ट्रीय कवरेज",
                description: language === "en" ? "All states & UTs" : "सभी राज्य और केंद्र शासित प्रदेश",
                stats: language === "en" ? "Pan-India" : "पैन-इंडिया",
                color: "emerald"
              },
              {
                icon: Database,
                title: language === "en" ? "Digital Records" : "डिजिटल रिकॉर्ड",
                description: language === "en" ? "Unified health records" : "एकीकृत स्वास्थ्य रिकॉर्ड",
                stats: language === "en" ? "Secure storage" : "सुरक्षित स्टोरेज",
                color: "amber"
              },
            ].map((program, idx) => (
              <div key={idx} className="bg-white rounded-3xl border-2 border-gray-100 p-8 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
                <div className={`h-16 w-16 rounded-2xl bg-${program.color}-50 flex items-center justify-center mx-auto mb-6`}>
                  <program.icon className={`h-8 w-8 text-${program.color}-600`} />
                </div>
                <h3 className="font-black text-lg text-gray-900 mb-2">
                  {program.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                <span className={`text-xs font-bold text-${program.color}-600 bg-${program.color}-50 px-4 py-2 rounded-full`}>
                  {program.stats}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* ========== TESTIMONIALS - SOCIAL PROOF ========== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-50 text-amber-700 text-sm font-bold mb-6">
              <Star className="h-5 w-5 fill-current" />
              {language === "en" ? "Trusted by Millions" : "लाखों लोगों द्वारा विश्वसनीय"}
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === "en" ? "What Our " : "हमारे "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                {language === "en" ? "Users Say" : "उपयोगकर्ता क्या कहते हैं"}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === "en"
                ? "Join 1 million+ satisfied users who trust Medosphere for their healthcare needs"
                : "10 लाख+ संतुष्ट उपयोगकर्ताओं से जुड़ें जो अपनी स्वास्थ्य सेवा की जरूरतों के लिए मेडोस्फियर पर भरोसा करते हैं"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-100 p-8 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="font-black text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rating Summary */}
          <div className="mt-12 grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: language === "en" ? "Overall Rating" : "कुल रेटिंग", value: "4.9/5", icon: Star },
              { label: language === "en" ? "Total Reviews" : "कुल समीक्षाएं", value: "50K+", icon: MessageCircle },
              { label: language === "en" ? "Happy Users" : "खुश उपयोगकर्ता", value: "1M+", icon: Users },
              { label: language === "en" ? "Success Rate" : "सफलता दर", value: "98%", icon: CheckCircle2 },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-2xl border-2 border-gray-100">
                <stat.icon className="h-8 w-8 text-amber-500 mx-auto mb-3" />
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION - ACCORDION ========== */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-50 text-cyan-700 text-sm font-bold mb-6">
              <Info className="h-5 w-5" />
              {language === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              {language === "en" ? "Got " : ""}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">
                {language === "en" ? "Questions?" : "प्रश्न हैं?"}
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              {language === "en"
                ? "Find answers to common questions about our services"
                : "हमारी सेवाओं के बारे में सामान्य प्रश्नों के उत्तर खोजें"}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFaq === idx ? (
                      <ChevronUp className="h-6 w-6 text-blue-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              {language === "en" ? "Still have questions?" : "अभी भी प्रश्न हैं?"}
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold h-12 px-8 rounded-xl">
              <MessageCircle className="h-5 w-5 mr-2" />
              {language === "en" ? "Contact Support" : "सहायता से संपर्क करें"}
            </Button>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA - CONVERSION FOCUSED ========== */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0wIDQwIDQwIDAgTTQwIDQwIDAgMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]" />
        
        <div className="container relative mx-auto px-6 max-w-5xl text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-bold mb-8">
            <Star className="h-5 w-5 text-yellow-300" />
            {language === "en" ? "Hackathon Winner 2024 • Most Innovative Healthcare Solution" : "हैकाथॉन विजेता 2024 • सबसे नवाचारी स्वास्थ्य समाधान"}
            <Award className="h-5 w-5 text-yellow-300" />
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            {language === "en" ? "Ready to Transform Your " : "अपनी स्वास्थ्य यात्रा को "}
            <br />
            <span className="text-yellow-300">
              {language === "en" ? "Healthcare Experience?" : "बदलने के लिए तैयार हैं?"}
            </span>
          </h2>

          <p className="text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            {language === "en"
              ? "Join 1 million+ Indians who trust Medosphere for fast, secure, and reliable healthcare services"
              : "तेज़, सुरक्षित और विश्वसनीय स्वास्थ्य सेवाओं के लिए मेडोस्फियर पर भरोसा करने वाले 10 लाख+ भारतीयों से जुड़ें"}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Link to="/register" className="group relative w-full sm:w-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur opacity-70 group-hover:opacity-100 transition" />
              <Button className="relative h-16 px-12 text-lg bg-white text-blue-600 hover:bg-gray-50 font-black shadow-2xl w-full sm:w-auto rounded-2xl">
                <Zap className="h-6 w-6 mr-3" />
                {language === "en" ? "Start Free Today" : "आज मुफ्त शुरू करें"}
                <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>

            <Link to="/book-opd" className="w-full sm:w-auto">
              <Button variant="outline" className="h-16 px-12 text-lg border-3 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-black backdrop-blur-md w-full rounded-2xl">
                <CalendarPlus className="h-6 w-6 mr-3" />
                {language === "en" ? "Book Appointment" : "अपॉइंटमेंट बुक करें"}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { emoji: "🚀", value: "90s", label: language === "en" ? "Avg. Booking" : "औसत बुकिंग" },
              { emoji: "⭐", value: "4.9/5", label: language === "en" ? "User Rating" : "उपयोगकर्ता रेटिंग" },
              { emoji: "🔒", value: "100%", label: language === "en" ? "Secure" : "सुरक्षित" },
              { emoji: "⏰", value: "24/7", label: language === "en" ? "Support" : "सहायता" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                <div className="text-4xl mb-3">{stat.emoji}</div>
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER - COMPREHENSIVE ========== */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                  <Heart className="h-6 w-6" />
                </div>
                <span className="text-2xl font-black">
                  Medo<span className="text-cyan-400">sphere</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                {language === "en"
                  ? "National Digital Health Portal under the Government of India. Transforming healthcare access for 1.4 billion Indians through technology."
                  : "भारत सरकार के अंतर्गत राष्ट्रीय डिजिटल स्वास्थ्य पोर्टल। तकनीक के माध्यम से 140 करोड़ भारतीयों के लिए स्वास्थ्य सेवा की पहुंच को बदलना।"}
              </p>
              <div className="flex items-center gap-4">
                <Shield className="h-5 w-5 text-emerald-400" />
                <span className="text-sm text-gray-400 font-semibold">
                  {language === "en" ? "ISO 27001 Certified • HIPAA Compliant" : "ISO 27001 प्रमाणित • HIPAA अनुपालन"}
                </span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black text-lg mb-6">{language === "en" ? "Services" : "सेवाएँ"}</h4>
              <ul className="space-y-3">
                {[
                  { label: language === "en" ? "Book OPD" : "ओपीडी बुक करें", path: "/book-opd" },
                  { label: language === "en" ? "Find Hospitals" : "अस्पताल खोजें", path: "/hospitals" },
                  { label: language === "en" ? "Online Consultation" : "ऑनलाइन परामर्श", path: "/consult" },
                  { label: language === "en" ? "Medical Records" : "मेडिकल रिकॉर्ड", path: "/records" },
                  { label: language === "en" ? "Emergency Services" : "आपातकालीन सेवाएं", path: "/emergency" },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.path} className="text-gray-400 hover:text-white transition-colors font-medium">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Government */}
            <div>
              <h4 className="font-black text-lg mb-6">{language === "en" ? "Government" : "सरकारी"}</h4>
              <ul className="space-y-3 text-gray-400">
                <li>{language === "en" ? "Ministry of Health" : "स्वास्थ्य मंत्रालय"}</li>
                <li>{language === "en" ? "National Health Mission" : "राष्ट्रीय स्वास्थ्य मिशन"}</li>
                <li>{language === "en" ? "Ayushman Bharat" : "आयुष्मान भारत"}</li>
                <li>{language === "en" ? "PM-JAY" : "पीएम-जेएवाई"}</li>
                <li>{language === "en" ? "ABHA Health ID" : "आभा स्वास्थ्य आईडी"}</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-black text-lg mb-6">{language === "en" ? "Contact" : "संपर्क"}</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{language === "en" ? "Helpline" : "हेल्पलाइन"}</div>
                    <div className="font-bold">104</div>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{language === "en" ? "Support" : "सहायता"}</div>
                    <div className="font-bold">24/7</div>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <div className="h-10 w-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{language === "en" ? "App" : "ऐप"}</div>
                    <div className="font-bold">{language === "en" ? "Download" : "डाउनलोड करें"}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-gray-400 text-center md:text-left">
              {language === "en"
                ? "© 2024 Ministry of Health & Family Welfare, Government of India. All rights reserved."
                : "© 2024 स्वास्थ्य और परिवार कल्याण मंत्रालय, भारत सरकार। सर्वाधिकार सुरक्षित।"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["ISO 27001", "HIPAA", "GDPR", "NDHM"].map((cert, idx) => (
                <span key={idx} className="text-xs bg-gray-800 px-4 py-2 rounded-full font-bold">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;