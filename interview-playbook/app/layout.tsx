import type { Metadata } from "next";
import { Geist, Geist_Mono, Google_Sans_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Google_Sans_Code({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Playbook",
  description:
    "A free, open-source collection of interview questions, answers, tips & study guides — all in one place.",
  keywords: [
    "Next.js",
    "React",
    "Interview",
    "Notes",
    "Books",
    "PDF",
    "Web Development",
    "Devops",
    "MERN Stack",
  ],
  verification: {
    google: "google58024bb4b178b29f.html"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${openSans.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
