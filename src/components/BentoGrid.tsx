import { useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const CARD_SHELL = [
  {
    ascii: `
[█▓▒░]
::.RAG
      `,
    bg: 'bg-white/[0.03]',
  },
  {
    ascii: `
(•_•)
<|>
/ \\
      `,
    bg: 'bg-gradient-to-br from-white/[0.05] to-transparent',
  },
  {
    ascii: `
 [O] 
-|-
 / \\
      `,
    bg: 'bg-white/[0.03]',
  },
  {
    ascii: `
 /\\ 
/  \\
\\  /
 \\/
      `,
    bg: 'bg-white/[0.03]',
  },
  {
    ascii: `
\\|/
-O-
/|\\
      `,
    bg: 'bg-gradient-to-t from-white/[0.05] to-transparent border-white/20',
  },
] as const;

const BentoGrid = () => {
  const { t, i18n } = useTranslation();
  const cards = useMemo(() => {
    const translated = t('bento.cards', { returnObjects: true }) as { title: string; description: string }[];
    return translated.map((c, i) => ({
      ...c,
      ascii: CARD_SHELL[i]?.ascii ?? '',
      bg: CARD_SHELL[i]?.bg ?? 'bg-white/[0.03]',
    }));
  }, [t, i18n.language]);

  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth > 768) {
      const ctx = gsap.context(() => {
        // Calculate the total width to move
        const scrollWidth = scrollWrapperRef.current?.scrollWidth || 0;
        const windowWidth = window.innerWidth;
        const moveAmount = scrollWidth - windowWidth + 100; // padding

        gsap.to(scrollWrapperRef.current, {
          x: -moveAmount,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollWidth}`, // Scroll distance equals content width
            scrub: 1,
            pin: true,
          }
        });
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black relative z-10 w-full overflow-hidden h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-16 shrink-0">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white/40 border-l-4 border-white/20 pl-6 uppercase">
          {t('bento.headingLine1')} <br/><span className="text-white">{t('bento.headingLine2')}</span>
        </h2>
      </div>

      <div className="pl-4 sm:pl-6 lg:pl-[10%] w-full">
        {/* Horizontal Scrolling Wrapper */}
        <div ref={scrollWrapperRef} className="flex gap-8 w-max pr-[20vw]">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bg} w-[300px] md:w-[450px] shrink-0 rounded-3xl border border-white/5 p-8 md:p-12 flex flex-col hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 group relative overflow-hidden`}
            >
              {/* Internal Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="mb-8 font-mono text-white/30 group-hover:text-white transition-colors whitespace-pre text-sm h-16 flex items-center">
                {card.ascii}
              </div>
              
              <h3 className="text-xl font-bold mb-4 tracking-tight transition-colors font-mono text-white/80 group-hover:text-white mt-auto">
                {card.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {card.description}
              </p>
              
              <div className="mt-12 flex gap-1 justify-end opacity-20 group-hover:opacity-40 transition-opacity">
                {[...Array(5)].map((_, i) => (
                   <div key={i} className={`w-1.5 h-1.5 ${i < index + 1 ? 'bg-white' : 'bg-white/20'} rounded-none z-10 block`}></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default BentoGrid;
