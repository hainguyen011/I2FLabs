import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const BrandBar = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);

  const mysticAscii = `
 
  `;

  useEffect(() => {
    if (window.innerWidth > 768) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=300%", // Extends the scrolling length manually to fit the sequence
            scrub: 1,
            pin: true,
          }
        });

        // Sequence: Text 1 fades in, then fades out
        tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
          .to(text1Ref.current, { opacity: 0, y: -50, duration: 1, delay: 0.5 });
        
        // Sequence: Text 2 fades in, then fades out
        tl.fromTo(text2Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
          .to(text2Ref.current, { opacity: 0, y: -50, duration: 1, delay: 0.5 });

        // Sequence: Text 3 fades in, glitched, and stays
        tl.fromTo(text3Ref.current, { opacity: 0, scale: 0.8, filter: "blur(20px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5 });
      });

      return () => ctx.revert();
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Mystic ASCII Centered Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <pre className="font-mono text-[4vw] leading-none text-white text-center">
          {mysticAscii}
        </pre>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute relative z-10 text-center w-full">
        {/* Absolute Positioning so they overlap each other perfectly in center */}
        <h2 ref={text1Ref} className="absolute left-0 right-0 text-5xl md:text-7xl font-black tracking-tighter text-white uppercase opacity-0" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          {t('brand.line1')}
        </h2>
        
        <h2 ref={text2Ref} className="absolute left-0 right-0 text-5xl md:text-7xl font-black tracking-tighter text-white uppercase opacity-0" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          {t('brand.line2')}
        </h2>

        <h2 ref={text3Ref} className="absolute left-0 right-0 text-5xl md:text-[6vw] font-black tracking-tighter uppercase opacity-0" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <span className="text-white/30 hidden md:inline">{t('brand.line3Prefix')}</span>
          <span className="text-white">{t('brand.line3Brand')}</span>
          <span className="text-white/30 hidden md:inline">{t('brand.line3Suffix')}</span>
        </h2>
      </div>
    </div>
  );
};

export default BrandBar;
