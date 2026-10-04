import React from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "../context/LanguageContext";
import {
  CalendarPlus,
  Building2,
  Stethoscope,
  FileText,
  ShieldCheck,
  Activity,
  ArrowRight,
  Sparkles,
  Users,
  Video,
  Clock,
  CheckCircle2,
  Award,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

type Service = {
  title: {
    en: string;
    hi: string;
  };
  desc: {
    en: string;
    hi: string;
  };
  icon: any;
  features: string[];
  link: string;
};

const services: Service[] = [
  {
    title: {
      en: "Outpatient (OPD) Digital Scheduling",
      hi: "ओपीडी डिजिटल शेड्यूलिंग",
    },
    desc: {
      en: "Direct appointment booking across 40+ departments with hospital slot synchronization and instant token generation.",
      hi: "40+ विभागों में अस्पताल के लाइव स्लॉट के साथ सीधा अपॉइंटमेंट और तुरंत डिजिटल टोकन।",
    },
    icon: CalendarPlus,
    features: [
      "Select specific doctor or department",
      "Morning and evening outpatient shifts",
      "Instant SMS confirmation with digital token",
      "Cancellation and slot rescheduling options",
    ],
    link: "/book-opd",
  },
  {
    title: {
      en: "Live Queue & Token Monitoring",
      hi: "लाइव कतार और टोकन ट्रैकिंग",
    },
    desc: {
      en: "Real-time corridor queue telemetry. See current token being served and arrive precisely when your turn arrives.",
      hi: "रीयल-टाइम कतार ट्रैकिंग। वर्तमान में देखे जा रहे टोकन को लाइव देखें और सही समय पर पहुंचें।",
    },
    icon: Activity,
    features: [
      "WebSocket-driven real-time token counter",
      "Estimated wait time calculations",
      "Queue acceleration & delay notifications",
      "Reduces hospital waiting room congestion",
    ],
    link: "/live-queue/QUEUE_1",
  },
  {
    title: {
      en: "Telehealth & Remote Virtual Care",
      hi: "टेलीहेल्थ और रिमोट परामर्श",
    },
    desc: {
      en: "HIPAA-compliant, encrypted WebRTC tele-consultations with certified clinical specialists from your device.",
      hi: "प्रमाणित विशेषज्ञ डॉक्टरों के साथ सुरक्षित वीडियो परामर्श और तुरंत डिजिटल पर्ची।",
    },
    icon: Video,
    features: [
      "End-to-end encrypted audio-video streaming",
      "In-call diagnostic report sharing",
      "Digitally verified prescription generation",
      "Seamless follow-up booking workflow",
    ],
    link: "/consult",
  },
  {
    title: {
      en: "Electronic Health Records (EHR)",
      hi: "इलेक्ट्रॉनिक हेल्थ रिकॉर्ड (EHR)",
    },
    desc: {
      en: "Unified lifelong clinical record repository compatible with ABDM standards. Access lab reports, scans, and summaries.",
      hi: "एबीडीएम मानकों के अनुकूल आजीवन मेडिकल रिकॉर्ड। जांच रिपोर्ट, स्कैन और पर्चियां सुरक्षित रखें।",
    },
    icon: FileText,
    features: [
      "ABDM ABHA health ID integration",
      "Centralized diagnostic and lab test archive",
      "Secure PDF report viewing & download",
      "Authorized provider sharing controls",
    ],
    link: "/records",
  },
  {
    title: {
      en: "Accredited Hospital Network",
      hi: "सत्यापित अस्पताल नेटवर्क",
    },
    desc: {
      en: "Comprehensive directory of verified NABH/JCI accredited public and private healthcare institutions.",
      hi: "सत्यापित सरकारी और निजी अस्पतालों, विभागों और सुविधाओं की विस्तृत निर्देशिका।",
    },
    icon: Building2,
    features: [
      "Location and specialty based filtering",
      "Real-time OPD crowd status indicators",
      "Bed occupancy and emergency contact info",
      "Direct OPD appointment booking links",
    ],
    link: "/hospitals",
  },
  {
    title: {
      en: "Clinical AI Symptom Triage",
      hi: "क्लिनिकल एआई लक्षण ट्राइएज",
    },
    desc: {
      en: "Clinical decision support system evaluating symptoms, age, and vitals to provide urgency scoring and referral advice.",
      hi: "लक्षणों, आयु और स्थिति का विश्लेषण कर आपातकालीन स्तर और सही विभाग की सिफारिश।",
    },
    icon: Sparkles,
    features: [
      "Clinical urgency score (Level 1-5)",
      "Suspected medical condition categorization",
      "Specialty department recommendation",
      "Complete historical triage archive",
    ],
    link: "/medichat",
  },
];

const Services = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Navbar />

      {/* Header */}
      <section className="bg-white border-b border-slate-200/80 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold mb-4">
              <ShieldCheck className="h-4 w-4 text-sky-700" />
              <span>National Healthcare Infrastructure Standards</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              {language === "en"
                ? "Clinical Services & Healthcare Capabilities"
                : "चिकित्सा सेवाएं एवं स्वास्थ्य सुविधाएं"}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {language === "en"
                ? "MedoSphere delivers end-to-end digital infrastructure connecting patients, clinical practitioners, and hospital systems with unmatched security and efficiency."
                : "मेडोस्फीयर मरीजों, डॉक्टरों और अस्पतालों को जोड़ने के लिए सुरक्षित और सुगम डिजिटल स्वास्थ्य सेवाएं प्रदान करता है।"}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center mb-4">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {service.title[language]}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {service.desc[language]}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 mb-6">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="h-3.5 w-3.5 text-sky-700 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    size="sm"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs rounded-md shadow-sm"
                  >
                    <Link to={service.link} className="flex items-center justify-center gap-1.5">
                      <span>{language === "en" ? "Launch Module" : "सेवा खोलें"}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABDM & Security Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
              <ShieldCheck className="h-6 w-6 text-sky-700 mb-3" />
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">Ayushman Bharat Integrated</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your 14-digit ABHA address to sync health histories across empanelled healthcare providers nationwide.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
              <Award className="h-6 w-6 text-emerald-600 mb-3" />
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">NABH & HIPAA Compliant</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Data workflows comply with patient privacy regulations, clinical encryption standards, and digital audit logging.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-slate-50 border border-slate-200">
              <Phone className="h-6 w-6 text-sky-700 mb-3" />
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">24/7 Clinical Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Technical and clinical helpline available round-the-clock for appointment rescheduling, triage, and patient queries.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;