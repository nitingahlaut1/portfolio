"use client";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import NgLogo from "./NgLogo";
import { Github, Linkedin } from "./BrandIcons";

export default function Footer() {
  return (
    <footer className="py-10 border-t" style={{ background: "var(--bg-primary)", borderColor: "var(--border)" }}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 group">
          <NgLogo size={28} />
          <span className="font-display font-bold ml-2" style={{ color: "var(--text-primary)" }}>
            Nitin Gahlaut
          </span>
        </div>

        <div className="flex gap-3">
          {[
            { href: "https://github.com/nitingahlaut1", icon: Github },
            { href: "https://www.linkedin.com/in/nitingahlaut", icon: Linkedin },
            { href: "mailto:nitingahlaut81@gmail.com", icon: Mail },
          ].map(({ href, icon: Icon }, i) => (
            <motion.a
              key={i}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all"
              style={{ background: "var(--bg-tertiary)", borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <Icon size={15} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
