"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, X } from "lucide-react";
import { SiZalo } from "react-icons/si";
import { useTranslations } from "@/i18n/useTranslations";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslations();

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[2147483000] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4"
          >
            <a
              href="https://zalo.me/0777228660"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all group"
            >
              <div className="w-10 h-10 bg-[#0068ff] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <SiZalo size={20} />
              </div>
              <span className="text-[#0068ff] font-sans font-bold text-sm uppercase tracking-wider pr-2">{t("floating.chatZalo")}</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={isOpen ? t("floating.closeContact") : t("floating.openContact")}
        onClick={() => setIsOpen((current) => !current)}
        className="w-12 h-12 md:w-14 md:h-14 bg-[#791220] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(121,18,32,0.3)] hover:bg-[#9a1729] hover:scale-105 transition-all text-[#fef5e4] cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
