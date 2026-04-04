import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

type CareerRole = {
  title: string;
  type: string;
  location: string;
  summary: string;
  tags: string[];
};

const CareersSection = () => {
  const { t } = useTranslation();
  const roles = t('careers.roles', { returnObjects: true }) as CareerRole[];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="careers"
      className="relative z-10 border-t border-white/10 bg-gradient-to-b from-zinc-950/50 via-black to-black py-24 md:py-32"
      aria-labelledby="careers-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-4 text-center font-mono text-[10px] font-black uppercase tracking-[0.42em] text-cyan-400/65 md:text-[11px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          {t('careers.badge')}
        </motion.p>

        <motion.h2
          id="careers-heading"
          className="mb-6 text-center text-3xl font-black uppercase tracking-tighter text-white/45 md:mb-8 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {t('careers.titleLine1')}{' '}
          <span className="text-white">{t('careers.titleLine2')}</span>
        </motion.h2>

        <motion.p
          className="mx-auto mb-14 max-w-2xl text-center text-sm leading-relaxed text-gray-500 md:mb-16 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {t('careers.intro')}
        </motion.p>

        <ul className="mx-auto grid max-w-4xl gap-5">
          {roles.map((role, index) => (
            <motion.li
              key={role.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: index * 0.07 }}
            >
              <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all duration-500 hover:border-cyan-500/25 md:p-8">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-mono text-lg font-bold text-white md:text-xl">{role.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-white/40">
                    <span className="rounded border border-white/10 px-2 py-0.5">{role.type}</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" aria-hidden />
                      {role.location}
                    </span>
                  </div>
                </div>
                <p className="mb-5 text-sm leading-relaxed text-gray-500">{role.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/35"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-12 flex justify-center md:mt-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-100"
          >
            {t('careers.cta')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CareersSection;
