import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type FaqItem = { q: string; a: string };

const FAQSection = () => {
  const { t } = useTranslation();
  const items = t('faq.items', { returnObjects: true }) as FaqItem[];

  return (
    <section
      id="faq"
      className="relative z-10 border-t border-white/10 bg-black py-24 md:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-4 text-center font-mono text-[10px] font-black uppercase tracking-[0.42em] text-white/40 md:text-[11px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          {t('faq.badge')}
        </motion.p>

        <motion.h2
          id="faq-heading"
          className="mb-6 text-center text-2xl font-black uppercase leading-tight tracking-tighter text-white/40 md:mb-8 md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {t('faq.titleLine1')}{' '}
          <span className="text-white">{t('faq.titleLine2')}</span>
        </motion.h2>

        <motion.p
          className="mx-auto mb-12 max-w-xl text-center text-sm leading-relaxed text-gray-500 md:mb-14 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {t('faq.intro')}
        </motion.p>

        <motion.div
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {items.map((item, i) => (
            <details
              key={i}
              className="group border-b border-white/10 last:border-b-0 open:bg-white/[0.02]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 outline-none transition-colors hover:bg-white/[0.03] md:px-8 [&::-webkit-details-marker]:hidden">
                <span className="text-left font-mono text-xs font-bold leading-snug text-white/90 md:text-sm">
                  {item.q}
                </span>
                <ChevronDown
                  className="h-4 w-4 shrink-0 text-cyan-500/50 transition-transform duration-300 group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="border-t border-white/5 px-5 pb-5 pt-0 text-sm leading-relaxed text-gray-500 md:px-8 md:text-[15px]">
                <p className="pt-4">{item.a}</p>
              </div>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
