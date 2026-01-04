import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Dumbbell } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Classes", path: "/classes" },
  { name: "Equipment", path: "/equipment" },
  { name: "Membership", path: "/membership" },
  { name: "Trainers", path: "/trainers" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg shadow-primary/5" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Dumbbell className={`text-primary transition-all duration-300 group-hover:rotate-12 ${scrolled ? "w-7 h-7" : "w-8 h-8"}`} />
            <span className={`font-display tracking-wider transition-all duration-300 ${scrolled ? "text-xl" : "text-2xl"}`}>FORGE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-sm font-medium transition-colors ${
                  location.pathname === link.path ? "text-primary" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Button variant="default" size={scrolled ? "default" : "lg"} asChild className="transition-all duration-300">
              <Link to="/membership">Join Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in bg-background/95 backdrop-blur-lg">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-medium py-2 ${
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Button variant="default" className="mt-4" asChild>
                <Link to="/membership">Join Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;