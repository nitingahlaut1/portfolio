import React from "react";

export default function NgLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 flex-shrink-0"
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#36bffa" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Hexagon Shield */}
      <path
        d="M50 8 L86 28 L86 72 L50 92 L14 72 L14 28 Z"
        stroke="url(#logo-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "url(#logo-glow)" }}
      />

      {/* Inner Stylized 'N' */}
      <path
        d="M32 66 V34 L50 66 V34"
        stroke="url(#logo-grad)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Stylized 'G' */}
      <path
        d="M68 34 C63 31 56 34 56 50 C56 66 63 69 68 66 V50 H60"
        stroke="url(#logo-grad)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
