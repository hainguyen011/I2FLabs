import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const CHAPTER_IDS = ['01', '02', '03', '04'] as const;

export type StoryChapter = {
  id: string;
  title: string;
  headline: string;
  lead: string;
  sub: string;
};

function FilmCorners() {
  return (
    <>
      <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-white/[0.12] md:left-10 md:top-10" />
      <div className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r border-t border-white/[0.12] md:right-10 md:top-10" />
      <div className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b border-l border-white/[0.12] md:bottom-10 md:left-10" />
      <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-white/[0.12] md:bottom-10 md:right-10" />
    </>
  );
}

function StoryPanel({ chapter }: { chapter: StoryChapter }) {
  return (
    <div
      className="story-panel relative flex min-h-[72vh] w-full shrink-0 flex-col justify-center overflow-hidden py-16 md:h-full md:min-h-0 md:w-screen md:py-0 px-6 sm:px-10 md:px-16 lg:px-24"
      aria-label={`Chapter ${chapter.id}`}
    >
      <FilmCorners />

      <div
        className="story-chapter-watermark pointer-events-none absolute -right-4 top-1/2 z-0 -translate-y-1/2 select-none font-black tabular-nums text-[min(42vw,22rem)] leading-none text-white/[0.045] md:-right-8 md:text-[min(38vw,20rem)]"
        aria-hidden
      >
        {chapter.id}
      </div>

      <div className="pointer-events-none absolute left-6 top-1/2 z-0 hidden h-40 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:left-10 md:block" />

      <div className="story-panel-inner relative z-10 mx-auto max-w-3xl will-change-[opacity,transform,filter]">
        <p className="mb-4 font-mono text-[10px] font-black uppercase tracking-[0.45em] text-white/35">
          STORY // CHAPTER_{chapter.id} — {chapter.title}
        </p>
        <h2 className="mb-8 text-4xl font-black leading-[1.05] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {chapter.headline}
        </h2>
        <p className="mb-4 text-base font-medium leading-relaxed text-gray-400 md:text-lg">
          {chapter.lead}
        </p>
        <p className="text-sm leading-relaxed text-white/45 md:text-base">{chapter.sub}</p>
      </div>
    </div>
  );
}

/** Tiêu điểm “đang kể chương nào” — mượt, đối xứng qua từng chapter */
function storyFocus(progress: number, chapterIndex: number, total: number): number {
  const t = total > 1 ? total - 1 : 1;
  const local = progress * t - chapterIndex;
  return Math.min(1, Math.exp(-local * local * 1.12));
}

const LabsStory = () => {
  const { t, i18n } = useTranslation();
  const chapters = useMemo(
    () =>
      CHAPTER_IDS.map((id) => ({
        id,
        title: t(`story.chapters.${id}.title`),
        headline: t(`story.chapters.${id}.headline`),
        lead: t(`story.chapters.${id}.lead`),
        sub: t(`story.chapters.${id}.sub`),
      })),
    [t, i18n.language],
  );

  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const chapterReadoutRef = useRef<HTMLSpanElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.story-panel'));
        const scrollDist = () => Math.max(rail.scrollWidth - window.innerWidth, 1);
        const n = panels.length;

        const applyStoryFocus = (p: number) => {
          panels.forEach((panel, i) => {
            const focus = storyFocus(p, i, n);
            const inner = panel.querySelector<HTMLElement>('.story-panel-inner');
            const mark = panel.querySelector<HTMLElement>('.story-chapter-watermark');
            if (inner) {
              gsap.set(inner, {
                opacity: 0.22 + 0.78 * focus,
                y: (1 - focus) * 22,
                filter: `blur(${(1 - focus) * 5}px)`,
              });
            }
            if (mark) {
              gsap.set(mark, {
                x: (1 - focus) * 48 - focus * 28,
                opacity: 0.028 + 0.055 * focus,
              });
            }
          });
        };

        const hTween = gsap.to(rail, {
          x: () => -scrollDist(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollDist()}`,
            scrub: 0.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              applyStoryFocus(p);

              if (progressFillRef.current) {
                progressFillRef.current.style.transform = `scaleX(${p})`;
                progressFillRef.current.style.transformOrigin = 'left center';
              }
              const idx = Math.min(CHAPTER_IDS.length - 1, Math.floor(p * CHAPTER_IDS.length + 0.0001));
              if (chapterReadoutRef.current) {
                chapterReadoutRef.current.textContent = `${i18n.t('story.chapterReadout')}${CHAPTER_IDS[idx]}`;
              }
              if (dotsRef.current) {
                dotsRef.current.querySelectorAll<HTMLSpanElement>('[data-chapter-dot]').forEach((dot, i) => {
                  dot.classList.toggle('bg-white', i === idx);
                  dot.classList.toggle('bg-white/20', i !== idx);
                  dot.classList.toggle('scale-125', i === idx);
                  dot.classList.toggle('scale-100', i !== idx);
                });
              }
            },
          },
        });

        applyStoryFocus(0);

        return () => {
          hTween.scrollTrigger?.kill();
        };
      });

      mm.add('(max-width: 767px)', () => {
        const panels = gsap.utils.toArray<HTMLElement>(section.querySelectorAll('.story-panel'));
        const tls: gsap.core.Timeline[] = [];
        panels.forEach((el) => {
          const inner = el.querySelector('.story-panel-inner');
          const mark = el.querySelector('.story-chapter-watermark');
          const tl = gsap
            .timeline({
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 35%',
                scrub: 0.45,
              },
            })
            .fromTo(
              inner,
              { opacity: 0.32, y: 20, filter: 'blur(5px)' },
              { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none' },
              0,
            )
            .fromTo(
              mark,
              { x: 20, opacity: 0.07 },
              { x: -8, opacity: 0.035, ease: 'none' },
              0,
            );
          tls.push(tl);
        });
        return () => tls.forEach((tl) => tl.kill());
      });
    }, section);

    return () => ctx.revert();
  }, [i18n.language]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-black text-white"
      aria-labelledby="labs-story-heading"
    >
      <h2 id="labs-story-heading" className="sr-only">
        {t('story.sectionHeading')}
      </h2>

      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden opacity-90 md:block"
        style={{
          background:
            'radial-gradient(ellipse 78% 72% at 50% 46%, transparent 0%, rgba(0,0,0,0.52) 100%)',
        }}
      />
      <div className="noise pointer-events-none absolute inset-0 z-[1] hidden opacity-[0.04] mix-blend-overlay md:block" />

      <div className="relative z-[2] md:h-screen md:overflow-hidden">
        <div ref={railRef} className="flex w-full flex-col md:h-full md:w-max md:flex-row">
          {chapters.map((c) => (
            <StoryPanel key={c.id} chapter={c} />
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-20 left-0 right-0 z-30 hidden flex-col items-center gap-3 md:flex"
        aria-hidden
      >
        <div className="flex items-center gap-4 font-mono text-[10px] font-black uppercase tracking-[0.35em] text-white/35">
          <span>{t('story.narrative')}</span>
          <span ref={chapterReadoutRef} className="min-w-[3.5rem] text-white/70">
            {`${t('story.chapterReadout')}${CHAPTER_IDS[0]}`}
          </span>
          <span className="text-white/25">/</span>
          <span>{String(CHAPTER_IDS.length).padStart(2, '0')}</span>
        </div>
        <div className="h-px w-[min(90vw,28rem)] overflow-hidden bg-white/10">
          <div
            ref={progressFillRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-white/20 via-white/75 to-white/35"
          />
        </div>
        <div ref={dotsRef} className="flex gap-2.5">
          {chapters.map((c, i) => (
            <span
              key={c.id}
              data-chapter-dot
              className={`h-1.5 w-1.5 rounded-full transition-transform duration-300 ${i === 0 ? 'scale-125 bg-white' : 'scale-100 bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-[2] border-t border-white/5 py-6 text-center font-mono text-[9px] uppercase tracking-[0.35em] text-white/20">
        {t('story.railMeta')}
      </div>
    </section>
  );
};

export default LabsStory;
