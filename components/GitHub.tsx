"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GitBranch, Users, BookOpen } from "lucide-react";
import { Github } from "./BrandIcons";

interface GitHubData {
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
}

const monthOrigins: Record<string, string> = {
  All: "center",
  Jan: "4%",
  Feb: "12%",
  Mar: "20%",
  Apr: "29%",
  May: "38%",
  Jun: "47%",
  Jul: "56%",
  Aug: "65%",
  Sep: "74%",
  Oct: "83%",
  Nov: "91%",
  Dec: "98%",
};

export default function GitHub() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [ghData, setGhData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [monthsList, setMonthsList] = useState<{ key: string; label: string }[]>([]);

  useEffect(() => {
    const username = "nitingahlaut1";
    fetch(`https://api.github.com/users/${username}`)
      .then((r) => r.json())
      .then((user) => {
        setGhData(user);
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    // Generate dynamic months list with year labels for the last 12 months
    const list = [];
    const currentDate = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = d.toLocaleString("default", { month: "short" });
      const year = d.getFullYear();
      list.push({
        key: monthName,
        label: `${monthName} ${year}`,
      });
    }
    setMonthsList(list);
  }, []);

  const chartUrl = "https://ghchart.rshah.org/0ca5e9/nitingahlaut1";

  const getSelectedMonthLabel = () => {
    const found = monthsList.find((m) => m.key === selectedMonth);
    return found ? found.label : selectedMonth;
  };

  return (
    <section id="github" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      {/* Floating animated blobs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full blur-3xl opacity-[0.05] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand), transparent)", animationDelay: "2s" }} />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full blur-3xl opacity-[0.06] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)", animationDelay: "5s" }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono-custom font-medium mb-3" style={{ color: "var(--brand)" }}>// github</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Open Source <span className="text-gradient">Activity</span>
          </h2>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="glass-card rounded-2xl p-6 border mb-8 flex flex-col md:flex-row items-center gap-6"
          style={{ borderColor: "var(--card-border)" }}
        >
          {loading ? (
            <div className="w-20 h-20 rounded-full animate-pulse" style={{ background: "var(--bg-tertiary)" }} />
          ) : (
            <img
              src={ghData?.avatar_url || "https://avatars.githubusercontent.com/u/0"}
              alt="GitHub Avatar"
              className="w-20 h-20 rounded-full border-2"
              style={{ borderColor: "var(--brand)" }}
            />
          )}
          <div className="text-center md:text-left flex-1">
            <h3 className="font-display text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              {ghData?.name || "Nitin Gahlaut"}
            </h3>
            <p className="mb-3" style={{ color: "var(--text-secondary)" }}>
              {ghData?.bio || "Full Stack Developer"}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {[
                { icon: BookOpen, label: "Repos", value: ghData?.public_repos },
                { icon: Users, label: "Followers", value: ghData?.followers },
                { icon: GitBranch, label: "Following", value: ghData?.following },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon size={15} style={{ color: "var(--brand)" }} />
                  <span className="font-bold" style={{ color: "var(--text-primary)" }}>{value ?? "—"}</span>
                  <span className="text-sm" style={{ color: "var(--text-muted)" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
          <motion.a
            href="https://github.com/nitingahlaut1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white"
            style={{ background: "#161b22" }}
          >
            <Github size={16} />
            View Profile
          </motion.a>
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="glass-card rounded-2xl p-6 border mb-8 overflow-hidden"
          style={{ borderColor: "var(--card-border)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
                GitHub Contribution Graph
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {selectedMonth === "All"
                  ? "Showing all contributions for the last 12 months"
                  : `Zoomed in on ${getSelectedMonthLabel()}`}
              </p>
            </div>

            {/* Selectors */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Month Selector Dropdown */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-1.5 rounded-xl border text-xs font-semibold outline-none cursor-pointer"
                style={{
                  background: "var(--bg-tertiary)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="All">All Months</option>
                {monthsList.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chart Display */}
          <div className="overflow-hidden rounded-xl border flex items-center justify-center p-4 bg-black/5 dark:bg-white/5"
            style={{ borderColor: "var(--card-border)", height: "140px" }}
          >
            <div className="w-full max-w-[720px] overflow-hidden flex items-center justify-center">
              <img
                src={chartUrl}
                alt="GitHub Contributions"
                className="w-full transition-all duration-500 ease-out"
                style={{
                  transform: selectedMonth === "All" ? "scale(1)" : "scale(4.2)",
                  transformOrigin: selectedMonth === "All" ? "center" : `${monthOrigins[selectedMonth]} 50%`,
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  target.nextElementSibling?.classList.remove("hidden");
                }}
              />
              <div className="hidden text-center py-4" style={{ color: "var(--text-muted)" }}>
                <GitBranch size={24} className="mx-auto mb-1 opacity-30" />
                <p className="text-xs">Contributions graph unavailable</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
