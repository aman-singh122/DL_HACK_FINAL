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
  ShieldCheck,
  Activity,
  Phone,
  Video,
  Search,
  CheckCircle2,
  Clock,
  ChevronDown,
  ArrowRight,
  ChevronRight,
  Star,
  Users,
  Award,
  Sparkles,
  Lock,
  Hospital,
  AlertCircle,
  HelpCircle
} from "lucide-react";

const Index = () => {
  const { language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchSpecialty, setSearchSpecialty] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const faqs = [
    {
      question:
        language === "en"
          ? "How do I book an OPD appointment at a hospital?"
          : "अस्पताल में ओपीडी अपॉइंटमेंट कैसे बुक करें?",
      answer:
        language === "en"
          ? "Choose your hospital from our verified directory, select the appropriate clinical department and doctor, pick an available morning or evening time slot, and confirm. Your digital token will be generated instantly."
          : "हमारी सत्यापित निर्देशिका से अपना अस्पताल चुनें, उपयुक्त विभाग और चिकित्सक चुनें, उपलब्ध समय स्लॉट चुनें और पुष्टि करें। आपका डिजिटल टोकन तुरंत तैयार हो जाएगा।",
    },
    {
      question:
        language === "en"
          ? "Is my clinical and health record data private and secure?"
          : "क्या मेरा मेडिकल डेटा सुरक्षित और गोपनीय है?",
      answer:
        language === "en"
          ? "Yes. MedoSphere adheres to ABDM standards and HIPAA protocols. All medical records, diagnostic reports, and consultation recordings are encrypted with military-grade AES-256 encryption."
          : "हाँ। मेडोस्फीयर एबीडीएम मानकों और एचआईपीएए प्रोटोकॉल का अनुपालन करता है। सभी मेडिकल रिकॉर्ड और रिपोर्ट एईएस-256 एन्क्रिप्शन से सुरक्षित हैं।",
    },
    {
      question:
        language === "en"
          ? "How does the live OPD queue tracker work?"
          : "लाइव ओपीडी कतार ट्रैकर कैसे काम करता है?",
      answer:
        language === "en"
          ? "Once your token is booked, you receive a live queue link. The tracker updates in real-time via WebSocket whenever the doctor completes a consultation, estimating your exact wait time so you do not wait in crowded hospital corridors."
          : "टोकन बुक होने के बाद आपको लाइव कतार लिंक प्राप्त होता है। जैसे ही डॉक्टर परामर्श पूरा करते हैं, यह रीयल-टाइम में अपडेट होता है जिससे आपको भीड़भाड़ में इंतजार नहीं करना पड़ता।",
    },
    {
      question:
        language === "en"
          ? "Can I do a video consultation with specialist doctors?"
          : "क्या मैं विशेषज्ञ डॉक्टरों के साथ वीडियो परामर्श कर सकता हूँ?",
      answer:
        language === "en"
          ? "Yes. MedoSphere provides secure WebRTC telehealth rooms. You can consult certified specialists remotely, share reports in-call, and receive digitally signed prescriptions."
          : "हाँ। मेडोस्फीयर सुरक्षित टेलीहेल्थ रूम प्रदान करता है जहाँ आप दूरस्थ रूप से विशेषज्ञों से परामर्श कर सकते हैं और डिजिटल नुस्खे प्राप्त कर सकते हैं।",
    },
    {
      question:
        language === "en"
          ? "Is MedoSphere integrated with Ayushman Bharat (ABHA)?"
          : "क्या मेडोस्फीयर आयुष्मान भारत (ABHA) से जुड़ा हुआ है?",
      answer:
        language === "en"
          ? "Yes. MedoSphere allows patients to link their 14-digit ABHA ID to seamlessly sync health records across participating empanelled public and private healthcare facilities nationwide."
          : "हाँ। मेडोस्फीयर मरीजों को अपने 14-अंकीय आभा आईडी को लिंक करने की सुविधा देता है जिससे देश भर के अस्पतालों में रिकॉर्ड सिंक होते हैं।",
    },
  ];

  const clinicalServices = [
    {
      title: language === "en" ? "Outpatient (OPD) Booking" : "ओपीडी अपॉइंटमेंट बुकिंग",
      description:
        language === "en"
          ? "Schedule appointments across 40+ clinical specialties at leading government and private medical centers."
          : "प्रमुख सरकारी और निजी मेडिकल सेंटरों में 40+ विशेषज्ञताओं में अपॉइंटमेंट शेड्यूल करें।",
      icon: CalendarPlus,
      link: "/book-opd",
      badge: language === "en" ? "Real-time Slots" : "लाइव स्लॉट",
    },
    {
      title: language === "en" ? "Telehealth Video Consult" : "वीडियो टेली-परामर्श",
      description:
        language === "en"
          ? "Encrypted HD video consultations with top clinical specialists from home, with instant e-prescriptions."
          : "शीर्ष विशेषज्ञ डॉक्टरों के साथ घर बैठे सुरक्षित वीडियो परामर्श और तुरंत डिजिटल पर्ची।",
      icon: Video,
      link: "/consult",
      badge: language === "en" ? "Encrypted Room" : "सुरक्षित रूम",
    },
    {
      title: language === "en" ? "Live OPD Queue Management" : "लाइव ओपीडी कतार ट्रैकिंग",
      description:
        language === "en"
          ? "Track your token progression live. Arrive at the hospital right on time without crowded waiting rooms."
          : "अपने टोकन की स्थिति लाइव ट्रैक करें और बिना लंबी लाइनों में खड़े सही समय पर पहुंचें।",
      icon: Activity,
      link: "/live-queue/QUEUE_1",
      badge: language === "en" ? "Live Tracking" : "लाइव ट्रैकिंग",
    },
    {
      title: language === "en" ? "Electronic Health Records (EHR)" : "इलेक्ट्रॉनिक हेल्थ रिकॉर्ड (EHR)",
      description:
        language === "en"
          ? "Centralized repository for your diagnostic test results, radiological scans, prescriptions, and summaries."
          : "आपकी जांच रिपोर्ट, एक्स-रे, पर्चियां और डिस्चार्ज सारांश का सुरक्षित डिजिटल संग्रह।",
      icon: FileText,
      link: "/records",
      badge: language === "en" ? "ABDM Compatible" : "एबीडीएम अनुकूल",
    },
    {
      title: language === "en" ? "Verified Hospital Network" : "सत्यापित अस्पताल नेटवर्क",
      description:
        language === "en"
          ? "Search NABH/JCI accredited multi-specialty hospitals, emergency wards, and bed occupancy levels."
          : "सत्यापित सरकारी और मल्टी-स्पेशियलिटी अस्पतालों, इमरजेंसी और बेड की उपलब्धता खोजें।",
      icon: Building2,
      link: "/hospitals",
      badge: language === "en" ? "250+ Centers" : "250+ केंद्र",
    },
    {
      title: language === "en" ? "Clinical AI Symptom Triage" : "क्लिनिकल एआई लक्षण ट्राइएज",
      description:
        language === "en"
          ? "Interactive clinical decision support to evaluate symptoms, calculate risk scores, and guide care."
          : "लक्षणों का मूल्यांकन करने, जोखिम स्कोर जानने और सही विभाग के चयन हेतु क्लिनिकल सहायता।",
      icon: Sparkles,
      link: "/medichat",
      badge: language === "en" ? "Clinical Guidance" : "क्लिनिकल गाइडेंस",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: language === "en" ? "Find Care Provider" : "अस्पताल या डॉक्टर चुनें",
      description:
        language === "en"
          ? "Select from verified hospitals and clinical practitioners filtered by specialty, location, and rating."
          : "विशेषज्ञता, शहर और रेटिंग के आधार पर सत्यापित अस्पतालों और डॉक्टरों को खोजें।",
      icon: Search,
    },
    {
      step: "02",
      title: language === "en" ? "Select Slot & Confirm" : "स्लॉट चुनें और पुष्टि करें",
      description:
        language === "en"
          ? "Choose your preferred clinical consultation shift and time slot with transparent fee details."
          : "अपनी सुविधानुसार समय स्लॉट चुनें और पारदर्शी फीस विवरण के साथ बुकिंग करें।",
      icon: CalendarPlus,
    },
    {
      step: "03",
      title: language === "en" ? "Digital OPD Pass Issued" : "डिजिटल टोकन पास प्राप्त करें",
      description:
        language === "en"
          ? "Receive a verified digital token with QR verification sent to your SMS and patient dashboard."
          : "एसएमएस और डैशबोर्ड पर क्यूआर कोड सहित डिजिटल ओपीडी टोकन तुरंत प्राप्त करें।",
      icon: Award,
    },
    {
      step: "04",
      title: language === "en" ? "Consult Without Waiting" : "समय पर परामर्श लें",
      description:
        language === "en"
          ? "Track real-time queue status, meet your physician on schedule, and access prescriptions digitally."
          : "लाइव कतार स्थिति ट्रैक करें, समय पर परामर्श लें और डिजिटल रिपोर्ट प्राप्त करें।",
      icon: Stethoscope,
    },
  ];

  const testimonials = [
    {
      name: "Dr. Arvind Saxena",
      role: "Chief Medical Officer, AIIMS New Delhi",
      content:
        language === "en"
          ? "MedoSphere has modernized patient flow in our OPDs. The digital token allocation significantly curtailed waiting area congestion and enhanced patient satisfaction."
          : "मेडोस्फीयर ने हमारे ओपीडी में मरीजों के प्रवाह को सुव्यवस्थित किया है। कतार में भारी कमी आई है और देखभाल गुणवत्ता बेहतर हुई है।",
      rating: 5,
    },
    {
      name: "Pooja Malhotra",
      role: "Verified Patient, Mumbai",
      content:
        language === "en"
          ? "Booking my father's cardiology appointment and viewing his ECG reports took under two minutes. The live queue notifications eliminated hours of anxiety in hospital corridors."
          : "पिताजी का कार्डियोलॉजी अपॉइंटमेंट बुक करना और उनकी रिपोर्ट देखना बेहद आसान रहा। लाइव कतार से बहुत समय बचा।",
      rating: 5,
    },
    {
      name: "Dr. Neha Kulkarni",
      role: "Consultant Pediatrician, Apollo Hospitals",
      content:
        language === "en"
          ? "The tele-consultation platform is robust and secure. Reviewing previous lab reports directly inside the consultation workflow saves critical time during clinical evaluation."
          : "टेली-परामर्श अनुभव अत्यंत विश्वसनीय है। परामर्श के दौरान मरीज के पिछले रिकॉर्ड देखना बहुत आसान है।",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-white border-b border-slate-200/80 pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        {/* Subtle medical grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#0284c7 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold mb-6">
              <ShieldCheck className="h-4 w-4 text-sky-700" />
              <span>
                {language === "en"
                  ? "National Digital Health Mission (ABDM) Integrated Portal"
                  : "राष्ट्रीय डिजिटल स्वास्थ्य मिशन (ABDM) एकीकृत पोर्टल"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
              {language === "en" ? (
                <>
                  Healthcare Software for <br className="hidden sm:inline" />
                  <span className="text-sky-700">Patients, Clinics & Hospitals</span>
                </>
              ) : (
                <>
                  मरीजों, क्लीनिकों और अस्पतालों के लिए <br className="hidden sm:inline" />
                  <span className="text-sky-700">आधुनिक स्वास्थ्य मंच</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {language === "en"
                ? "Unified clinical platform for outpatient scheduling, real-time live OPD queue tracking, encrypted telehealth, and centralized electronic medical records."
                : "ओपीडी शेड्यूलिंग, रीयल-टाइम लाइव कतार ट्रैकिंग, सुरक्षित वीडियो परामर्श और इलेक्ट्रॉनिक मेडिकल रिकॉर्ड के लिए एकीकृत क्लिनिकल सिस्टम।"}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto h-12 px-7 bg-sky-700 hover:bg-sky-800 text-white font-semibold shadow-sm rounded-md"
              >
                <Link to="/book-opd" className="flex items-center gap-2">
                  <CalendarPlus className="h-4 w-4" />
                  <span>{language === "en" ? "Book OPD Appointment" : "ओपीडी अपॉइंटमेंट बुक करें"}</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-7 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-md"
              >
                <Link to="/consult" className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-sky-700" />
                  <span>{language === "en" ? "Consult Online Doctor" : "ऑनलाइन डॉक्टर से मिलें"}</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto h-12 px-5 text-slate-600 hover:text-slate-900 rounded-md"
              >
                <Link to="/hospitals">
                  {language === "en" ? "Browse Hospitals" : "अस्पताल देखें"}
                </Link>
              </Button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80 text-left">
              <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">250+</p>
                <p className="text-xs text-slate-500 font-medium">Verified Hospitals</p>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">4,800+</p>
                <p className="text-xs text-slate-500 font-medium">Clinical Specialists</p>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">1.2M+</p>
                <p className="text-xs text-slate-500 font-medium">OPD Tokens Issued</p>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200/60">
                <p className="text-xl sm:text-2xl font-bold text-slate-900">99.8%</p>
                <p className="text-xs text-slate-500 font-medium">System Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CLINICAL SERVICES ================= */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-sky-700 tracking-wider uppercase mb-2">
              Comprehensive Health Infrastructure
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === "en"
                ? "Integrated Clinical Care Modules"
                : "एकीकृत क्लिनिकल सेवाएं"}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              {language === "en"
                ? "Designed to streamline hospital operations and empower patients with accessible, digital-first medical care."
                : "अस्पताल प्रक्रियाओं को आसान बनाने और मरीजों को त्वरित स्वास्थ्य सुविधाएं प्रदान करने के लिए निर्मित।"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {service.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 mt-auto pt-2 border-t border-slate-100"
                  >
                    <span>{language === "en" ? "Access Service" : "सेवा खोलें"}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CLINICAL WORKFLOW ================= */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-sky-700 tracking-wider uppercase mb-2">
              Patient Journey
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {language === "en"
                ? "How Outpatient Care Works"
                : "ओपीडी परामर्श की सरल प्रक्रिया"}
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              {language === "en"
                ? "Transparent, zero-paperwork workflow from doctor discovery to prescription receipt."
                : "डॉक्टर चयन से लेकर डिजिटल पर्ची तक पूरी तरह पारदर्शी और आसान प्रक्रिया।"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-lg bg-slate-50 border border-slate-200 relative flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold text-sky-700 font-mono">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TELEHEALTH & URGENT CARE BANNER ================= */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="bg-slate-800/80 rounded-xl border border-slate-700 p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-sky-950 text-sky-400 text-xs font-semibold mb-3 border border-sky-800">
                <Activity className="h-3.5 w-3.5" />
                <span>24/7 Clinical Emergency & Triage Support</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Need Immediate Medical Assessment?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect with our Clinical AI Triage assistant to evaluate urgency levels, or start an immediate tele-consultation with on-call physicians.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                asChild
                className="bg-sky-600 hover:bg-sky-500 text-white font-semibold h-11 px-6 rounded-md shadow-sm"
              >
                <Link to="/medichat">
                  Launch Symptom Triage
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-slate-800 hover:bg-slate-700 border-slate-600 text-white font-semibold h-11 px-6 rounded-md"
              >
                <Link to="/consult">
                  Virtual Clinic
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold text-sky-700 tracking-wider uppercase mb-2">
              Clinical Endorsements
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Doctors & Patients Nationwide
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((test, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-3">
                    {[...Array(test.rating)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed mb-6">
                    "{test.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{test.name}</h5>
                    <p className="text-[11px] text-slate-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQS ================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-sky-700 tracking-wider uppercase mb-2">
              Frequently Asked Questions
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Know
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/50"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 hover:bg-slate-100/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform ${
                      openFaq === i ? "rotate-180 text-sky-700" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-200/40 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLINICAL FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1: Brand & Compliance */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Activity className="h-5 w-5 text-sky-400" />
                <span>MedoSphere</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                National Healthcare Access, OPD Queue Automation & Telehealth Infrastructure.
              </p>
              <div className="pt-2 text-[10px] text-slate-400 space-y-1">
                <p>• ISO 27001 & HIPAA Certified</p>
                <p>• ABDM Level M3 Compliant</p>
                <p>• Encrypted Patient Health Data</p>
              </div>
            </div>

            {/* Col 2: Clinical Services */}
            <div>
              <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
                Patient Services
              </p>
              <ul className="space-y-2 text-[11px]">
                <li><Link to="/book-opd" className="hover:text-white transition-colors">Book Hospital OPD</Link></li>
                <li><Link to="/consult" className="hover:text-white transition-colors">Video Tele-Consultation</Link></li>
                <li><Link to="/live-queue/QUEUE_1" className="hover:text-white transition-colors">Live OPD Queue Tracker</Link></li>
                <li><Link to="/records" className="hover:text-white transition-colors">Electronic Health Records</Link></li>
                <li><Link to="/medichat" className="hover:text-white transition-colors">Clinical AI Triage</Link></li>
              </ul>
            </div>

            {/* Col 3: Network & Providers */}
            <div>
              <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
                Care Providers
              </p>
              <ul className="space-y-2 text-[11px]">
                <li><Link to="/hospitals" className="hover:text-white transition-colors">Hospital Network</Link></li>
                <li><Link to="/doctors" className="hover:text-white transition-colors">Specialist Directory</Link></li>
                <li><Link to="/hospital" className="hover:text-white transition-colors">Hospital Admin Portal</Link></li>
                <li><Link to="/service" className="hover:text-white transition-colors">Service Standards</Link></li>
              </ul>
            </div>

            {/* Col 4: Emergency & Support */}
            <div>
              <p className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
                Clinical Helpline
              </p>
              <p className="text-[11px] leading-relaxed text-slate-400 mb-3">
                For medical emergencies, please dial emergency services immediately.
              </p>
              <div className="p-3 rounded bg-slate-800 border border-slate-700 space-y-1">
                <p className="text-slate-200 font-semibold text-xs">National Health Helpline</p>
                <p className="text-sky-400 font-mono text-sm font-bold">1800-11-4477</p>
                <p className="text-[10px] text-slate-400">Toll-free • Available 24 Hours</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} MedoSphere Health Systems Inc. All clinical rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hover:text-white cursor-pointer">Patient Rights</span>
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms of Healthcare Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;