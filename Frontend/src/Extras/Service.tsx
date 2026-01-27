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
  Cloud,
  IndianRupee,
  User,
  Globe,
  ArrowRight,
  Sparkles,
  Heart,
  Hospital,
  Users,
  LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ---------------- TYPES ---------------- */

type Service = {
  title: {
    en: string;
    hi: string;
  };
  desc: {
    en: string;
    hi: string;
  };
  icon: LucideIcon;
  color: string;
};

type Feature = {
  title: {
    en: string;
    hi: string;
  };
  desc: {
    en: string;
    hi: string;
  };
  icon: LucideIcon;
};

type GovtProgram = {
  title: {
    en: string;
    hi: string;
  };
  desc: {
    en: string;
    hi: string;
  };
  icon: LucideIcon;
};

/* ---------------- DATA ---------------- */

const services: Service[] = [
  {
    title: { en: "OPD Appointment Booking", hi: "OPD अपॉइंटमेंट बुकिंग" },
    desc: {
      en: "Book OPD appointments instantly at government hospitals with real-time slot availability.",
      hi: "सरकारी अस्पतालों में तुरंत OPD अपॉइंटमेंट बुक करें।",
    },
    icon: CalendarPlus,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: { en: "Hospital Discovery", hi: "अस्पताल खोजें" },
    desc: {
      en: "Find verified government & private hospitals across India.",
      hi: "भारत भर में सत्यापित सरकारी और निजी अस्पताल खोजें।",
    },
    icon: Building2,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: { en: "Doctor Consultation", hi: "डॉक्टर परामर्श" },
    desc: {
      en: "Consult doctors online or offline with digital queue management.",
      hi: "डिजिटल क्यू मैनेजमेंट के साथ डॉक्टर से परामर्श लें।",
    },
    icon: Stethoscope,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: { en: "Digital Medical Records", hi: "डिजिटल मेडिकल रिकॉर्ड" },
    desc: {
      en: "Secure lifetime access to prescriptions and reports.",
      hi: "प्रिस्क्रिप्शन और रिपोर्ट का सुरक्षित डिजिटल रिकॉर्ड।",
    },
    icon: FileText,
    color: "from-amber-500 to-orange-500",
  },
];

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: { en: "Secure & Private", hi: "सुरक्षित और निजी" },
    desc: {
      en: "Government-grade data security and encryption.",
      hi: "सरकारी स्तर की डेटा सुरक्षा और एन्क्रिप्शन।",
    },
  },
  {
    icon: Activity,
    title: { en: "Live Hospital Queue", hi: "लाइव अस्पताल क्यू" },
    desc: {
      en: "Real-time OPD queue updates.",
      hi: "रियल-टाइम OPD क्यू अपडेट।",
    },
  },
  {
    icon: Cloud,
    title: { en: "Cloud Medical Vault", hi: "क्लाउड मेडिकल वॉल्ट" },
    desc: {
      en: "Unlimited cloud storage for medical records.",
      hi: "मेडिकल रिकॉर्ड के लिए अनलिमिटेड क्लाउड स्टोरेज।",
    },
  },
];

const govtPrograms: GovtProgram[] = [
  {
    icon: IndianRupee,
    title: { en: "Ayushman Bharat", hi: "आयुष्मान भारत" },
    desc: {
      en: "₹5 Lakh free treatment coverage.",
      hi: "₹5 लाख तक का मुफ्त इलाज।",
    },
  },
  {
    icon: User,
    title: { en: "ABHA Health ID", hi: "ABHA हेल्थ ID" },
    desc: {
      en: "One digital identity for healthcare.",
      hi: "स्वास्थ्य सेवाओं के लिए एक डिजिटल पहचान।",
    },
  },
  {
    icon: Globe,
    title: { en: "Nationwide Access", hi: "राष्ट्रीय पहुंच" },
    desc: {
      en: "Available across all states & UTs.",
      hi: "सभी राज्यों और केंद्र शासित प्रदेशों में उपलब्ध।",
    },
  },
];

/* ---------------- COMPONENT ---------------- */

const Services: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-700 font-semibold mb-6">
            <Sparkles className="h-4 w-4" />
            {language === "en"
              ? "Government Healthcare Services"
              : "सरकारी स्वास्थ्य सेवाएं"}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {language === "en" ? "Our " : "हमारी "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              {language === "en" ? "Healthcare Services" : "स्वास्थ्य सेवाएं"}
            </span>
          </h1>

          <p className="text-lg text-gray-600 mb-10">
            {language === "en"
              ? "One platform for appointments, hospitals, doctors, and digital health records across India."
              : "भारत भर में अपॉइंटमेंट, अस्पताल, डॉक्टर और डिजिटल हेल्थ रिकॉर्ड के लिए एक प्लेटफॉर्म।"}
          </p>

          <Link to="/book-opd">
            <Button className="h-14 px-10 text-lg bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold shadow-xl">
              <CalendarPlus className="mr-3 h-6 w-6" />
              {language === "en" ? "Book OPD Now" : "OPD बुक करें"}
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border shadow-lg hover:shadow-2xl transition"
              >
                <div
                  className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}
                >
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  {service.title[language]}
                </h3>
                <p className="text-gray-600">{service.desc[language]}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              {language === "en"
                ? "Why Choose Our Platform?"
                : "हमारा प्लेटफॉर्म क्यों चुनें?"}
            </h2>

            <div className="space-y-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="flex gap-4 bg-white p-6 rounded-2xl border shadow-sm"
                  >
                    <Icon className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-bold">{f.title[language]}</h4>
                      <p className="text-gray-600 text-sm">
                        {f.desc[language]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-emerald-600 rounded-3xl p-10 text-white text-center">
            <Heart className="h-14 w-14 mx-auto mb-6 text-red-400" />
            <h3 className="text-2xl font-bold mb-4">
              {language === "en" ? "Trusted by Millions" : "लाखों का भरोसा"}
            </h3>
            <p className="text-white/90">
              {language === "en"
                ? "India's official digital healthcare access platform."
                : "भारत का आधिकारिक डिजिटल हेल्थ प्लेटफॉर्म।"}
            </p>
          </div>
        </div>
      </section>

      {/* GOVT PROGRAMS */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10">
            {language === "en"
              ? "Government Healthcare Programs"
              : "सरकारी स्वास्थ्य योजनाएं"}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {govtPrograms.map((g, i) => {
              const Icon = g.icon;
              return (
                <div key={i} className="bg-white p-8 rounded-3xl border shadow">
                  <Icon className="h-10 w-10 mx-auto mb-4 text-emerald-600" />
                  <h4 className="font-bold mb-2">{g.title[language]}</h4>
                  <p className="text-gray-600 text-sm">{g.desc[language]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          {language === "en"
            ? "Start Your Healthcare Journey Today"
            : "आज ही अपनी स्वास्थ्य यात्रा शुरू करें"}
        </h2>
        <Link to="/book-opd">
          <Button className="bg-white text-blue-700 font-bold px-10 py-4">
            {language === "en" ? "Get Started" : "शुरू करें"}
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Services;