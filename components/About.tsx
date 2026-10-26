"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, Phone, User } from "lucide-react";

const stats = [
  { value: "2+", label: "Years Experience" },
  { value: "10+", label: "Projects Built" },
  { value: "9.71", label: "CGPA" },
  { value: "100%", label: "Dedication" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
console.log("About section in view:");
  return (
    <section id="about" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      {/* Floating animated blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full blur-3xl opacity-[0.08] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)", animationDelay: "1s" }} />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-[0.06] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand), transparent)", animationDelay: "4s" }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono-custom font-medium mb-3" style={{ color: "var(--brand)" }}>// about me</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            The Developer Behind{" "}
            <span className="text-gradient">The Code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }}>
                <User size={20} className="text-white" />
              </div>
              <h3 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                Professional Summary
              </h3>
            </div>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
              Results-driven full-stack developer with{" "}
              <strong style={{ color: "var(--text-primary)" }}>2+ years of experience</strong>{" "}
              building scalable web applications and leveraging AI tools to accelerate development
              with precision and efficiency.
            </p>
            <p className="text-lg leading-relaxed mb-10" style={{ color: "var(--text-secondary)" }}>
              I thrive at the intersection of engineering and creativity — from architecting
              production-grade backends with Node.js and Nest.js, to crafting fluid user
              experiences with Next.js and React. Currently building at{" "}
              <strong style={{ color: "var(--brand)" }}>Meetri Infotech</strong>.
            </p>

            <div className="space-y-3">
              {[
                { icon: MapPin, text: "Noida, Uttar Pradesh, India" },
                { icon: Mail, text: "nitingahlaut81@gmail.com", href: "mailto:nitingahlaut81@gmail.com" },
                { icon: Phone, text: "+91 9917214470", href: "tel:+919917214470" },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(12, 165, 233, 0.1)", color: "var(--brand)" }}>
                    <Icon size={15} />
                  </div>
                  {href ? (
                    <a href={href} className="text-sm hover:opacity-80 transition-opacity"
                      style={{ color: "var(--text-secondary)" }}>{text}</a>
                  ) : (
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6 text-center border"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <p className="font-display text-4xl font-black mb-2 text-gradient">{value}</p>
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>{label}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-4 glass-card rounded-2xl p-6 border"
              style={{ borderColor: "var(--card-border)" }}
            >
              <p className="text-sm font-mono-custom mb-2" style={{ color: "var(--brand)" }}>{">"} Current Focus</p>
              <ul className="space-y-1">
                {["Building AI-powered developer tools", "Microservices & scalable backends", "Open source contributions"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--brand)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
