import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { useTranslations } from "@/i18n/useTranslations";

const contactRows = [15, 22, 30];

export default function ContactSection() {
  const { t } = useTranslations();
  return (
    <section data-scroll-id="contact" className="relative flex flex-col pt-12 pb-8 px-4 md:px-8 z-10 w-full bg-[#791220] text-[#f4efe6] h-screen font-sans overflow-hidden shrink-0">
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80&w=2000&h=1500"
          alt="Background texture"
          fill
          sizes="100vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiLz4="
          className="object-cover filter blur-[2px] contrast-125"
        />
      </div>

      <div className="absolute top-8 right-12 text-[#f4efe6] text-3xl font-display font-medium z-10">07</div>
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-8 lg:px-12 flex flex-col h-full z-10 relative">
        <FadeIn direction="down" delay={0.2}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[9rem] font-display font-normal uppercase tracking-tighter leading-[0.8] transform scale-y-[1.3] scale-x-[0.95] origin-left mt-8 md:mt-12 text-[#f4efe6] mb-8 md:mb-24">{t("contact.sayHello")}</h2>
        </FadeIn>

          <FadeIn direction="left" delay={0.4} className="flex flex-col gap-8 md:gap-12 w-full max-w-lg mt-8 md:mt-12" aria-hidden="true">
          {contactRows.map((count) => (
            <div key={count} className="flex">
              {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="w-[18px] h-[10px] bg-[#f4efe6] mr-[2px]" />
              ))}
            </div>
          ))}
        </FadeIn>

        <FadeIn direction="up" delay={0.6} className="mt-auto flex justify-center items-end w-full pb-8">
          <div className="flex flex-col items-center text-center font-bold tracking-widest text-[1rem]">
            <span className="mb-1">{t("contact.email")}</span>
            <span>{t("contact.phone")}</span>
          </div>
          <div className="absolute bottom-8 right-12 font-bold tracking-widest text-[1rem]">{t("contact.website")}</div>
        </FadeIn>
      </div>
    </section>
  );
}
