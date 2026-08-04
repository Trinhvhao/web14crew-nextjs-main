import type { Metadata } from "next";
import LanguageProvider from "@/i18n/LanguageProvider";
import LenisProvider from "@/components/providers/LenisProvider";
import LensTransition from "@/components/LensTransition";
import FloatingContact from "@/components/FloatingContact";
import ScrollProgress from "@/components/ScrollProgress";
import "./globals.css";

export const metadata: Metadata = {
  title: "Media 14Crew",
  description: "Production house portfolio for TVC, corporate films, branded content, and live events.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <LenisProvider>
            <ScrollProgress />
            <LensTransition>{children}</LensTransition>
            <FloatingContact />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}