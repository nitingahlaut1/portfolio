"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Send, MapPin, Phone, CheckCircle } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please check your internet connection.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      {/* Background orbs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-[0.06] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--brand), transparent)", animationDelay: "1s" }} />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-[0.08] animate-float pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--accent), transparent)", animationDelay: "4s" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono-custom font-medium mb-3" style={{ color: "var(--brand)" }}>// contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Let&apos;s Work <span className="text-gradient">Together</span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Have a project in mind? Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 border" style={{ borderColor: "var(--card-border)" }}>
              <h3 className="font-display text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
                Get in Touch
              </h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "nitingahlaut81@gmail.com", href: "mailto:nitingahlaut81@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 9917214470", href: "tel:+919917214470" },
                  { icon: MapPin, label: "Location", value: "Noida, Uttar Pradesh, India", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: "var(--bg-tertiary)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(12, 165, 233, 0.1)", color: "var(--brand)" }}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium hover:opacity-80 transition-opacity"
                          style={{ color: "var(--text-primary)" }}>{value}</a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border" style={{ borderColor: "var(--card-border)" }}>
              <h3 className="font-display font-bold mb-4" style={{ color: "var(--text-primary)" }}>Social Links</h3>
              <div className="flex gap-3">
                {[
                  { href: "https://github.com/nitingahlaut1", icon: Github, label: "GitHub", bg: "#161b22" },
                  { href: "https://www.linkedin.com/in/nitingahlaut", icon: Linkedin, label: "LinkedIn", bg: "#0077b5" },
                  { href: "mailto:nitingahlaut81@gmail.com", icon: Mail, label: "Email", bg: "#ea4335" },
                ].map(({ href, icon: Icon, label, bg }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex flex-col items-center gap-2 py-4 rounded-xl text-white text-xs font-medium"
                    style={{ background: bg }}
                    aria-label={label}
                  >
                    <Icon size={20} />
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="glass-card rounded-2xl p-6 border h-full" style={{ borderColor: "var(--card-border)" }}>
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: "rgba(16, 185, 129, 0.1)" }}>
                    <CheckCircle size={32} style={{ color: "#10b981" }} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display text-xl font-bold mb-5" style={{ color: "var(--text-primary)" }}>
                    Send a Message
                  </h3>
                  {[
                    { key: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                        {label}
                      </label>
                      <input
                        type={type}
                        required
                        placeholder={placeholder}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
                        style={{
                          background: "var(--bg-tertiary)",
                          borderColor: "var(--border)",
                          color: "var(--text-primary)",
                          "--tw-ring-color": "rgba(12, 165, 233, 0.3)",
                        } as React.CSSProperties}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
                      style={{
                        background: "var(--bg-tertiary)",
                        borderColor: "var(--border)",
                        color: "var(--text-primary)",
                      }}
                    />
                  </div>
                  {error && (
                    <div className="text-red-400 text-xs font-mono-custom p-3 rounded-xl border border-red-500/20 bg-red-950/20">
                      Error: {error}
                    </div>
                  )}
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={!sending ? { scale: 1.02 } : {}}
                    whileTap={!sending ? { scale: 0.98 } : {}}
                    className="w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-opacity disabled:opacity-70"
                    style={{ background: "linear-gradient(135deg, var(--brand), var(--accent))" }}
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
