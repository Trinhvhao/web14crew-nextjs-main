"use client";

import { useTranslations } from "@/i18n/useTranslations";
import type { Lang } from "@/i18n/translations";

const languages: Record<Lang, { label: string; shortLabel: string }> = {
  vi: { label: "Tiếng Việt", shortLabel: "VI" },
  en: { label: "English", shortLabel: "EN" },
};

function VietnamFlag() {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" focusable="false" className="h-full w-full">
      <rect width="30" height="20" fill="#DA251D" />
      <path
        d="m15 4 1.347 4.146h4.36l-3.527 2.562 1.347 4.146L15 12.292l-3.527 2.562 1.347-4.146-3.527-2.562h4.36z"
        fill="#FF0"
      />
    </svg>
  );
}

function UnitedKingdomFlag() {
  return (
    <svg viewBox="0 0 60 40" aria-hidden="true" focusable="false" className="h-full w-full">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#FFF" strokeWidth="9" />
      <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="5" />
      <path d="M30 0v40M0 20h60" stroke="#FFF" strokeWidth="13" />
      <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
    </svg>
  );
}

const flags: Record<Lang, () => React.ReactNode> = {
  vi: VietnamFlag,
  en: UnitedKingdomFlag,
};

export default function LanguageToggle() {
  const { lang, setLang } = useTranslations();
  const options: Lang[] = ["vi", "en"];

  return (
    <div
      role="group"
      aria-label={lang === "vi" ? "Chọn ngôn ngữ" : "Choose language"}
      className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/30 p-0.5 backdrop-blur-sm"
    >
      {options.map((code) => {
        const isActive = lang === code;
        const Flag = flags[code];

        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            aria-label={languages[code].label}
            title={languages[code].label}
            className={`flex h-9 w-9 md:h-8 md:w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
              isActive
                ? "bg-brand-yellow shadow-sm"
                : "hover:bg-white/10"
            }`}
          >
            <span className="flex h-[14px] w-[20px] overflow-hidden rounded-[3px] border border-white/25 shadow-sm">
              <Flag />
            </span>
            <span className="sr-only">{languages[code].shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
