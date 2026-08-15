import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

type ProcessStep = { id: string; title: string; body: string };

const ProcessPipeline = () => {
  const { t } = useTranslation();
  const steps = t('process.steps', { returnObjects: true }) as ProcessStep[];

  return (
    <section
      id="process"
      className="relative z-10 border-t border-white/10 bg-gradient-to-b from-black via-zinc-950/40 to-black py-24 md:py-32"
      aria-labelledby="process-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-4 text-center font-mono text-[10px] font-black uppercase tracking-[0.42em] text-cyan-400/70 md:text-[11px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          {t('process.badge')}
        </motion.p>

        <motion.h2
          id="process-heading"
          className="mb-6 text-center text-3xl font-black uppercase tracking-tighter text-white/45 md:mb-8 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {t('process.titleLine1')}{' '}
          <span className="text-white">{t('process.titleLine2')}</span>
        </motion.h2>

        <motion.p
          className="mx-auto mb-14 max-w-2xl text-center text-sm leading-relaxed text-gray-500 md:mb-16 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {t('process.intro')}
        </motion.p>

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
            >
              <div className="flex h-full flex-col rounded-2xl border border-white/10 p-6 transition-all duration-500 hover:border-cyan-500/25 hover:from-white/[0.06] md:p-7">
                <span className="mb-4 inline-flex w-fit rounded border  bg-black/40 px-2 py-0.5 font-mono text-[10px] font-bold ">
                  PHASE_{step.id}
                </span>
                <h3 className="mb-3 font-mono text-sm font-bold uppercase tracking-wide text-white">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">{step.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessPipeline;
