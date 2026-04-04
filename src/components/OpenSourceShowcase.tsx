import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { openSourceProjects } from '../data/openSourceData';

const OpenSourceShowcase = () => {
  const { t } = useTranslation();

  return (
    <section
      id="open-labs"
      className="relative z-10 border-t border-white/10 bg-black py-24 md:py-32"
      aria-labelledby="open-labs-heading"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-4 text-center font-mono text-[10px] font-black uppercase tracking-[0.42em] text-white/40 md:text-[11px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          {t('openLabs.badge')}
        </motion.p>

        <motion.h2
          id="open-labs-heading"
          className="mb-6 text-center text-3xl font-black uppercase tracking-tighter text-white/40 md:mb-8 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {t('openLabs.titleLine1')}{' '}
          <span className="text-white">{t('openLabs.titleLine2')}</span>
        </motion.h2>

        <motion.p
          className="mx-auto mb-14 max-w-2xl text-center text-sm leading-relaxed text-gray-500 md:mb-16 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          {t('openLabs.intro')}
        </motion.p>

        <ul className="grid gap-6 md:grid-cols-2">
          {openSourceProjects.map((repo, index) => (
            <motion.li
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 transition-all duration-500 hover:border-cyan-500/30 hover:from-white/[0.06] md:p-8">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h3 className="font-mono text-lg font-bold tracking-tight text-white md:text-xl">
                    {repo.name}
                  </h3>
                  <span className="shrink-0 rounded border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/45">
                    {repo.language}
                  </span>
                </div>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-500">
                  {repo.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {repo.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/35"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-5 font-mono text-[10px] uppercase tracking-wider text-white/30">
                  <span>
                    {t('openLabs.metaStars')}: {repo.stars} · {t('openLabs.metaForks')}: {repo.forks}
                  </span>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white/55 transition-colors hover:text-cyan-400/90"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                    {t('openLabs.viewRepo')}
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" aria-hidden />
                  </a>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OpenSourceShowcase;
