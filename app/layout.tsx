import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
 
export const metadata: Metadata = {
  title: "Nitin Gahlaut — Full Stack Developer",
  description: "Full Stack Developer specializing in scalable web applications and AI-powered solutions. Based in Noida, Uttar Pradesh.",
  keywords: ["Full Stack Developer", "React", "Next.js", "TypeScript", "Node.js", "Nitin Gahlaut"],
  authors: [{ name: "Nitin Gahlaut" }],
  openGraph: {
    title: "Nitin Gahlaut — Full Stack Developer",
    description: "Full Stack Developer specializing in scalable web applications and AI-powered solutions.",
    type: "website",
  },
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
