"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import NgLogo from "./NgLogo";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { threshold: 0.3 }
    );
    links.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "py-3 glass-card border-b"
            : "py-5 bg-transparent"
          }`}
        style={{ borderColor: scrolled ? "var(--border)" : "transparent" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2.5 group"
          >
            <NgLogo size={32} />
            {/* <span className="font-display font-bold text-lg" style={{ color: scrolled ? "var(--text-primary)" : "#f0f9ff" }}>
              NG<span className="text-gradient">.</span>
            </span> */}
          </motion.a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${active === href
                    ? "text-brand-400"
                    : "hover:opacity-80"
                  }`}
                style={{ color: active === href ? "var(--brand)" : (scrolled ? "var(--text-secondary)" : "#94a3b8") }}
              >
                {label}
                {active === href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(12, 165, 233, 0.1)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
              style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }}
            >
              Hire Me
            </motion.a>
            <button
              className="md:hidden p-2 rounded-lg"
              style={{
                background: scrolled ? "var(--bg-tertiary)" : "rgba(255,255,255,0.08)",
                color: scrolled ? "var(--text-secondary)" : "#94a3b8"
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 pt-20 px-6 pb-6 glass-card md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map(({ href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-lg font-medium transition-colors"
                  style={{
                    color: "var(--text-primary)",
                    background: active === href ? "rgba(12, 165, 233, 0.1)" : "transparent",
                  }}
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-4 py-3 rounded-xl text-center font-semibold text-white"
                style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }}
              >
                Hire Me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
