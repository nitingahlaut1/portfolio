"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "Meetri Infotech",
    role: "Full Stack Developer",
    period: "August 2023 – Present",
    type: "Full-time",
    color: "#0ca5e9",
    points: [
      "Engineered vendor, operations, and e-commerce portals with end-to-end frontend and backend implementation.",
      "Developed an Applicant Tracking System (ATS) to streamline recruitment workflows, interview scheduling, feedback tracking, and candidate management.",
    ],
    tech: ["Next.js", "Nest.js", "PostgreSQL", "Docker", "Azure"],
  },
  {
    company: "Virtusa",
    role: "Full Stack Developer Intern",
    period: "May 2023 – August 2023",
    type: "Internship",
    color: "#8b5cf6",
    points: [
      "Led a team of 10 members in developing an e-commerce application from concept to deployment.",
      "Worked on frontend, backend, cart workflows, and product management systems.",
    ],
    tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Floating animated blobs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full blur-3xl opacity-[0.06] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand), transparent)", animationDelay: "2s" }} />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full blur-3xl opacity-[0.05] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)", animationDelay: "5s" }} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono-custom font-medium mb-3" style={{ color: "var(--brand)" }}>// experience</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Work <span className="text-gradient">Journey</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
            style={{ background: "linear-gradient(to bottom, var(--brand), var(--accent), transparent)" }} />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.7 }}
                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
                  style={{ background: exp.color, borderColor: "var(--bg-primary)", boxShadow: `0 0 12px ${exp.color}60` }} />

                {/* Spacer for alternating */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="ml-16 md:ml-0 md:w-1/2 glass-card rounded-2xl p-6 border"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} style={{ color: exp.color }} />
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{ background: `${exp.color}20`, color: exp.color }}>
                          {exp.type}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                        {exp.company}
                      </h3>
                      <p className="font-semibold" style={{ color: exp.color }}>{exp.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    <Calendar size={13} style={{ color: "var(--text-muted)" }} />
                    <span className="text-xs" style={{ color: "var(--text-muted)" }}>{exp.period}</span>
                  </div>

                  <ul className="space-y-3 mb-5">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-2">
                        <ChevronRight size={14} className="mt-1 flex-shrink-0" style={{ color: exp.color }} />
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{point}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-medium border"
                        style={{
                          background: "var(--bg-tertiary)",
                          borderColor: "var(--border)",
                          color: "var(--text-secondary)"
                        }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
