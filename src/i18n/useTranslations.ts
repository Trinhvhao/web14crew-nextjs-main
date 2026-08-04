"use client";

import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";
import { translations } from "./translations";

function getByPath(obj: unknown, path: string[]): unknown {
  let current: unknown = obj;
  for (const segment of path) {
    if (current && typeof current === "object" && segment in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }
  return current;
}

function t(key: string, lang: "vi" | "en"): string {
  const value = getByPath(translations[lang], key.split("."));
  return typeof value === "string" ? value : key;
}

export function useTranslations() {
  const ctx = useContext(LanguageContext);

  if (!ctx) {
    throw new Error("useTranslations must be used within LanguageProvider");
  }

  const safeLang = ctx.isHydrated ? ctx.lang : "vi";
  const safeT = (key: string) => t(key, safeLang);

  return {
    ...ctx,
    lang: safeLang,
    t: safeT,
  };
}
