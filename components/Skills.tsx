"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layers, Database, Wrench } from "lucide-react";

const categories = [
  {
    title: "Programming Languages",
    icon: Code2,
    color: "#0ca5e9",
    skills: ["JavaScript", "TypeScript", "C++"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Layers,
    color: "#8b5cf6",
    skills: ["React.js", "Next.js", "Node.js", "Nest.js", "Express.js", "Redux", "Prisma", "Sequelize", "REST APIs"],
  },
  {
    title: "Databases",
    icon: Database,
    color: "#10b981",
    skills: ["PostgreSQL", "MongoDB"],
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    color: "#f59e0b",
    skills: ["Git", "GitHub", "Docker", "CI/CD", "Azure", "Postman", "TanStack Query"],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      {/* Floating animated blobs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.05] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand), transparent)", animationDelay: "1s" }} />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.07] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)", animationDelay: "3s" }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono-custom font-medium mb-3" style={{ color: "var(--brand)" }}>// skills</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 border"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${cat.color}15` }}>
                  <cat.icon size={20} style={{ color: cat.color }} />
                </div>
                <h3 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 + j * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border cursor-default transition-all"
                    style={{
                      background: `${cat.color}10`,
                      borderColor: `${cat.color}30`,
                      color: cat.color,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
