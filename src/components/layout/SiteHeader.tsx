"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { FaFacebookF, FaVimeoV, FaYoutube } from "react-icons/fa";
import FadeIn from "@/components/FadeIn";
import LanguageToggle from "@/components/LanguageToggle";
import { useTranslations } from "@/i18n/useTranslations";

const socialItems = [
  { href: "#", label: "Vimeo", className: "bg-[#1ab7ea]", icon: FaVimeoV },
  { href: "#", label: "Facebook", className: "bg-[#1877f2]", icon: FaFacebookF },
  { href: "#", label: "YouTube", className: "bg-[#ff0000]", icon: FaYoutube },
];

export default function SiteHeader() {
  const { t } = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { href: "/#hero", label: t("header.home") },
    { href: "/#showreel", label: t("header.showreel") },
    { href: "/#contact", label: t("header.contact") },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[100] noise-bg border-b border-white/10 text-[#fef5e4] shadow-md">
      <FadeIn delay={0.1} direction="down" className="max-w-[1440px] mx-auto px-4 md:px-8 py-2 flex justify-between items-center w-full gap-4">
        <div className="w-auto md:w-1/4">
          <Link href="/" className="inline-block hover:text-brand-yellow transition-colors">
            <h1 className="font-display font-bold text-base md:text-xl leading-tight uppercase tracking-wide">
              Media 14Crew<br />Logo
            </h1>
          </Link>
        </div>

        <nav className="hidden md:flex w-2/4 justify-center" aria-label="Primary navigation">
          <div className="relative flex items-center justify-between w-[400px] pb-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="font-bold text-sm uppercase tracking-wider hover:text-brand-yellow transition-colors relative z-10">
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="w-auto md:w-1/4 flex justify-end items-center gap-2 md:gap-3">
          <div className="hidden md:flex gap-2">
            {socialItems.map(({ href, label, className, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} className={`w-8 h-8 rounded flex items-center justify-center text-[#fef5e4] hover:opacity-90 transition-opacity ${className}`}>
                <Icon size={16} />
              </a>
            ))}
          </div>
          <span aria-hidden="true" className="hidden md:block h-5 w-px bg-white/20" />
          <LanguageToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-[#fef5e4] hover:text-brand-yellow transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </FadeIn>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[52px] z-[99] bg-black/95 flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display font-bold text-2xl uppercase tracking-wider text-[#fef5e4] hover:text-brand-yellow transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            {socialItems.map(({ href, label, className, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} className={`w-10 h-10 rounded flex items-center justify-center text-[#fef5e4] hover:opacity-80 transition-opacity ${className}`}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
