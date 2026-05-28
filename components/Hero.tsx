"use client";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, Terminal, Sparkles } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { useState, useEffect } from "react";

const items = [
  { icon: "⚛️", title: "React & Next.js", subtitle: "Expert" },
  { icon: "🟢", title: "Node & Nest.js", subtitle: "Backend Architect" },
  { icon: "🐳", title: "Docker & AWS", subtitle: "Cloud & DevOps" },
  { icon: "🗄️", title: "Postgres & Mongo", subtitle: "Databases" },
  { icon: "⚡", title: "Sockets & Express", subtitle: "Real-time APIs" },
  { icon: "🤖", title: "AI Integration", subtitle: "LangChain & Grok" },
  { icon: "🚀", title: "2+ Years", subtitle: "Experience" },
];

export default function Hero() {
  const roles = [
    "Full Stack Developer",
    "AI Solutions Engineer",
    "Backend Architect",
    "Problem Solver"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    let timer: NodeJS.Timeout;

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));
        setTypingSpeed(100); // base typing speed

        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2500); // pause at the end
          return;
        }
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length - 1));
        setTypingSpeed(40); // fast erase speed

        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#060b14" }}>
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.15] transition-opacity duration-300"
        style={{ 
          backgroundImage: "url('/coding-bg.png')",
          maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
        }} 
      />
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float"
        style={{ background: "radial-gradient(circle, #36bffa, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 animate-float"
        style={{ background: "radial-gradient(circle, #a78bfa, transparent)", animationDelay: "3s" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 border"
              style={{ background: "rgba(54, 191, 250, 0.08)", borderColor: "rgba(54, 191, 250, 0.2)", color: "#36bffa" }}
            >
              <Sparkles size={14} />
              Available for opportunities
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              style={{ color: "#f0f9ff" }}
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient block">Nitin</span>
              <span style={{ color: "#f0f9ff" }}>Gahlaut</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <Terminal size={16} style={{ color: "#36bffa" }} />
              <p className="font-mono-custom text-sm font-medium" style={{ color: "#94a3b8" }}>
                <span style={{ color: "#36bffa" }}>const</span>{" "}
                <span style={{ color: "#a78bfa" }}>role</span>{" "}
                = <span style={{ color: "#22d3ee" }}>&quot;{currentText}</span>
                <span className="animate-pulse inline-block w-[2px] h-3.5 ml-[1px]" style={{ backgroundColor: "#22d3ee", verticalAlign: "middle" }} />
                <span style={{ color: "#22d3ee" }}>&quot;</span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.6 }}
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
              style={{ color: "#94a3b8" }}
            >
              Full Stack Developer specializing in{" "}
              <span style={{ color: "#f0f9ff", fontWeight: 500 }}>scalable web applications</span>{" "}
              and{" "}
              <span style={{ color: "#f0f9ff", fontWeight: 500 }}>AI-powered solutions</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.a href="#projects" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2 shadow-lg"
                style={{ background: "linear-gradient(135deg, #36bffa, #a78bfa)" }}>
                View Projects <ArrowDown size={16} />
              </motion.a>
              <motion.a href="/nitin-resume.pdf" download whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 border"
                style={{ background: "#0d1627", borderColor: "#1e293b", color: "#f0f9ff" }}>
                <Download size={16} /> Download Resume
              </motion.a>
              <motion.a href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-xl font-semibold flex items-center gap-2 border"
                style={{ borderColor: "rgba(54, 191, 250, 0.3)", color: "#36bffa", background: "rgba(54, 191, 250, 0.05)" }}>
                <Mail size={16} /> Contact Me
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-6"
            >
              <span className="text-sm" style={{ color: "#64748b" }}>Follow me</span>
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/nitingahlaut1", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/nitingahlaut", icon: Linkedin, label: "LinkedIn" },
                ].map(({ href, icon: Icon, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-lg flex items-center justify-center border"
                    style={{ background: "#0d1627", borderColor: "#1e293b", color: "#94a3b8" }}
                    aria-label={label}>
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Profile Image with float animation */}
              <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 animate-float z-10"
                style={{ borderColor: "rgba(54, 191, 250, 0.3)", boxShadow: "0 0 60px rgba(54, 191, 250, 0.2)" }}>
                <img
                  src="/profile.jpg"
                  alt="Nitin Gahlaut"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Orbiting Tech Badges */}
              <motion.div
                className="absolute inset-0 w-72 h-72 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                {items.map((item, i) => {
                  const angle = (i * 360) / items.length;
                  const radius = 230; // Orbit radius
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <motion.div
                        className="glass-card rounded-xl px-2.5 py-1.5 flex items-center gap-2 pointer-events-auto shadow-lg hover:scale-110 hover:border-brand/50 transition-all duration-300 cursor-pointer"
                        style={{ 
                          background: "rgba(13, 22, 39, 0.85)", 
                          borderColor: "rgba(30, 41, 59, 0.8)",
                        }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-base">{item.icon}</span>
                        <div>
                          <p className="text-[10px] font-bold whitespace-nowrap" style={{ color: "#f0f9ff" }}>{item.title}</p>
                          <p className="text-[9px] whitespace-nowrap" style={{ color: "#64748b" }}>{item.subtitle}</p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "#64748b" }}>scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} style={{ color: "#64748b" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
