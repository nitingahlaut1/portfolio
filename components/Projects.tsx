"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, GitBranch, Sparkles, Globe, Lock } from "lucide-react";

function TiltCard({
  children,
  className,
  style,
  delay,
  inView,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay: number;
  inView: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const shineOpacity = useTransform(y, [-100, 100], [0.15, 0.4]);
  const shineGradientX = useTransform(x, [-100, 100], ["100%", "0%"]);
  const shineGradientY = useTransform(y, [-100, 100], ["100%", "0%"]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set((mouseX / (width / 2)) * 100);
    y.set((mouseY / (height / 2)) * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
        ...style,
      }}
      className={className}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${shineGradientX} ${shineGradientY}, rgba(54, 191, 250, 0.15) 0%, transparent 80%)`,
          opacity: shineOpacity,
        }}
      />
      <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}

const projects = [
  {
    name: "NxResumes",
    subtitle: "AI-Powered Resume Builder",
    description: "AI-powered resume builder with customizable templates, ATS score analysis, LangChain integration, Grok AI model support, and intelligent job-description-based keyword optimization to improve resume effectiveness.",
    tech: ["Next.js", "Redux", "Tailwind CSS", "LangChain", "Grok AI", "Vercel"],
    live: "https://resumebuilderng.vercel.app/",
    github: null,
    featured: true,
    emoji: "📄",
    color: "#0ca5e9",
    gradient: "from-sky-500 to-violet-600",
  },
  {
    name: "LIVLONG",
    subtitle: "Enterprise Business Portal",
    description: "Vendor, operations, and e-commerce portal developed from scratch for business workflow and operational management with end-to-end implementation.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    live: null,
    github: null,
    featured: false,
    emoji: "🏢",
    color: "#10b981",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "ATS",
    subtitle: "Applicant Tracking System",
    description: "Applicant tracking system designed to streamline recruitment workflows, interview scheduling, candidate management, feedback tracking, and secure authentication.",
    tech: ["Next.js", "Nest.js", "PostgreSQL", "Microsoft Services"],
    live: null,
    github: null,
    featured: false,
    emoji: "👥",
    color: "#8b5cf6",
    gradient: "from-violet-500 to-pink-600",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Floating animated blobs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 rounded-full blur-3xl opacity-[0.06] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)", animationDelay: "1s" }} />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-[0.05] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand), transparent)", animationDelay: "4s" }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono-custom font-medium mb-3" style={{ color: "var(--brand)" }}>// projects</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Featured <span className="text-gradient">Work</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Production applications built with modern tech stacks, serving real users.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <TiltCard
              key={project.name}
              delay={0.1 + i * 0.15}
              inView={inView}
              className="group relative glass-card rounded-2xl overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-brand/5 hover:border-brand/30"
              style={{ borderColor: "var(--card-border)" }}
            >
              {/* Banner */}
              <div className={`relative h-44 flex items-center justify-center bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <span className="text-7xl drop-shadow-lg">{project.emoji}</span>
                {project.featured && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ background: "rgba(0,0,0,0.3)" }}>
                    <Sparkles size={10} />
                    Featured
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex-1 p-6 flex flex-col">
                <h3 className="font-display text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  {project.name}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: project.color }}>
                  {project.subtitle}
                </p>
                <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md border"
                      style={{
                        background: "var(--bg-tertiary)",
                        borderColor: "var(--border)",
                        color: "var(--text-muted)"
                      }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.live ? (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white"
                      style={{ background: `linear-gradient(135deg, ${project.color}, var(--accent))` }}
                    >
                      <Globe size={14} />
                      Live Demo
                    </motion.a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium border cursor-not-allowed"
                      style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
                      <Lock size={14} />
                      Private
                    </div>
                  )}
                  {project.github ? (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border"
                      style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--bg-tertiary)" }}
                    >
                      <GitBranch size={14} />
                    </motion.a>
                  ) : null}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center justify-center px-3 py-2.5 rounded-xl border"
                      style={{ borderColor: "var(--border)", color: "var(--text-secondary)", background: "var(--bg-tertiary)" }}
                    >
                      <ExternalLink size={14} />
                    </motion.a>
                  )}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
