import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { THEME_BOOTSTRAP_SCRIPT } from "./theme";
import { UMAMI_CONFIG } from "./umami";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nicole Zhang",
  description: "Selected products, experiments, and software by Nicole Zhang.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_BOOTSTRAP_SCRIPT,
          }}
        />
        {children}
        {UMAMI_CONFIG && (
          <Script
            src={UMAMI_CONFIG.src}
            data-website-id={UMAMI_CONFIG.websiteId}
            data-domains={UMAMI_CONFIG.domains}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
