import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Languages } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();

  const navLinks = [
    {
      name: { en: "Hospitals", hi: "अस्पताल" },
      path: "/hospitals",
    },
    {
      name: { en: "Departments", hi: "विभाग" },
      path: "/login",
    },
    {
      name: { en: "Services", hi: "सेवाएं" },
      path: "/service",
    },
    {
      name: { en: "Patient Corner", hi: "रोगी अनुभाग" },
      path: "/login",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-md group-hover:shadow-lg transition-shadow">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">
            Medo<span className="text-primary">sphere</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive(link.path)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.name[language]}
            </Link>
          ))}
        </nav>

        {/* Right Section (Theme + Language + Auth) */}
        <div className="hidden md:flex items-center gap-3">
          {/* 🌐 Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            {language === "en" ? "हिंदी" : "EN"}
          </Button>

          {/* 🌗 Theme Toggle */}
          <ThemeToggle />

          {/* Auth Buttons */}
          <Button variant="ghost" asChild>
            <Link to="/login">
              {language === "en" ? "Login" : "लॉगिन"}
            </Link>
          </Button>
          <Button variant="default" asChild>
            <Link to="/register">
              {language === "en" ? "Register" : "रजिस्टर"}
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <nav className="container py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name[language]}
              </Link>
            ))}

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-border space-y-3">

              {/* 🌐 Language Toggle (Mobile) */}
              <Button
                variant="outline"
                className="w-full flex items-center gap-2"
                onClick={toggleLanguage}
              >
                <Languages className="h-4 w-4" />
                {language === "en"
                  ? "Switch to Hindi"
                  : "अंग्रेज़ी में बदलें"}
              </Button>

              {/* 🌗 Theme Toggle (Mobile) */}
              <div className="flex justify-center">
                <ThemeToggle />
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  {language === "en" ? "Login" : "लॉगिन"}
                </Link>
              </Button>

              <Button variant="default" className="w-full" asChild>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  {language === "en" ? "Register" : "रजिस्टर"}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;