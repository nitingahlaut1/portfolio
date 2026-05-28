"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, Calendar } from "lucide-react";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Floating animated blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.05] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)", animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.06] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand), transparent)", animationDelay: "3s" }} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono-custom font-medium mb-3" style={{ color: "var(--brand)" }}>// education</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Academic <span className="text-gradient">Foundation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          whileHover={{ y: -4 }}
          className="relative glass-card rounded-2xl p-8 border overflow-hidden"
          style={{ borderColor: "var(--card-border)" }}
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: "radial-gradient(circle, var(--brand), transparent)", transform: "translate(50%, -50%)" }} />

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }}>
              <GraduationCap size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-4 mb-3">
                <div>
                  <h3 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    Uttaranchal Institute of Technology (UIT)
                  </h3>
                  <p className="text-lg font-medium" style={{ color: "var(--brand)" }}>
                    B.Tech in CSE with AI & ML
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                  <Award size={12} />
                  Graduated
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <Calendar size={14} style={{ color: "var(--text-muted)" }} />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>August 2019 – June 2023</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "CGPA", value: "9.71/10", highlight: true },
                  { label: "Specialization", value: "AI & ML" },
                  { label: "Degree", value: "B.Tech CSE" },
                ].map(({ label, value, highlight }) => (
                  <div key={label} className="rounded-xl p-4 border"
                    style={{
                      background: highlight ? "rgba(12, 165, 233, 0.08)" : "var(--bg-tertiary)",
                      borderColor: highlight ? "rgba(12, 165, 233, 0.3)" : "var(--border)"
                    }}>
                    <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="font-display font-bold text-lg" style={{ color: highlight ? "var(--brand)" : "var(--text-primary)" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
