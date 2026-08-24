"use client";

import { createContext, useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { translations, type Lang } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  isHydrated: boolean;
  setLang: (next: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const COOKIE_NAME = "web14crew.lang";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

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

// useSyncExternalStore: server snapshot luôn "vi", client snapshot đọc cookie thực tế.
// Đảm bảo server/client render cùng giá trị → không còn hydration mismatch.
const subscribeToCookie = (onStoreChange: () => void) => {
  if (typeof window === "undefined") return () => {};
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true });
  return () => observer.disconnect();
};

const getServerSnapshot = () => "vi" as Lang;
const getClientSnapshot = () => getCookie(COOKIE_NAME) === "vi" ? "vi" : getCookie(COOKIE_NAME) === "en" ? "en" : "vi";

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribeToCookie, getClientSnapshot, getServerSnapshot);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setCookie(COOKIE_NAME, next);
  }, []);

  const toggle = useCallback(() => {
    const next = lang === "vi" ? "en" : "vi";
    setCookie(COOKIE_NAME, next);
  }, [lang]);

  const t = useCallback(
    (key: string) => {
      const value = getByPath(translations[lang], key.split("."));
      return typeof value === "string" ? value : key;
    },
    [lang],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, isHydrated, setLang, toggle, t }),
    [lang, isHydrated, setLang, toggle, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

