import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { partnerLogos } from "../data/partnersData";

/** Logo lớn, mặc định mờ (opacity + blur nhẹ), hover rõ nét — không marquee. */
function PartnerLogoImg({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-[6.5rem] w-auto max-w-[min(42vw,16rem)] border-0 bg-transparent object-contain opacity-[0.42] shadow-none ring-0 outline-none transition duration-500 ease-out [filter:blur(0px)_brightness(0)_invert(1)] hover:opacity-[0.96] hover:[filter:blur(0)_brightness(0)_invert(1)] sm:h-[7.5rem] sm:max-w-[18rem] md:h-[8.75rem] md:max-w-[20rem] lg:h-40 lg:max-w-[22rem]"
      loading="lazy"
      decoding="async"
    />
  );
}

const PartnerLogos = () => {
  const { t } = useTranslation();

  return (
    <section
      id="partners"
      className="relative z-10 bg-transparent py-16 md:py-24"
      aria-labelledby="partners-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-4 text-center font-mono text-[10px] font-black uppercase tracking-[0.42em] text-cyan-400/70 md:text-[11px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("partners.badge")}
        </motion.p>

        <motion.h2
          id="partners-heading"
          className="mb-6 text-center text-3xl font-black uppercase tracking-tighter text-white/45 md:mb-8 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("partners.titleLine1")}{" "}
          <span className="text-white">{t("partners.titleLine2")}</span>
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-gray-500 md:mb-14 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("partners.intro")}
        </motion.p>

        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-12 px-2 sm:gap-x-12 sm:gap-y-14 md:gap-x-16 lg:gap-x-20">
          {partnerLogos.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-center border-0 bg-transparent p-0 shadow-none ring-0"
            >
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center border-0 bg-transparent p-0 shadow-none ring-0">
                <PartnerLogoImg src={p.src} alt={p.alt} />
              </a>
            </div>
          ))}
        </div>

        <motion.p
          className="mx-auto mt-10 max-w-3xl text-center font-mono text-[10px] uppercase tracking-[0.34em] text-white/50 pl-[0.17em] md:mt-12 md:text-[11px] md:tracking-[0.38em]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {t("partners.sub")}
        </motion.p>
      </div>
    </section>
  );
};

export default PartnerLogos;
