import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);
import techNoirPhoto from '../assets/tech_noir_lab.png';

const ResearchVision = () => {
    const { t } = useTranslation();
    const pillars = t('research.pillars', { returnObjects: true }) as {
      label: string;
      value: string;
    }[];
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.innerWidth > 768) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    }
                });

                tl.fromTo(imgRef.current, 
                    { scale: 1.2, y: 100 }, 
                    { scale: 1, y: -100, ease: "none" }
                );

                tl.fromTo(contentRef.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, ease: "power2.out" },
                    0.2
                );
            });
            return () => ctx.revert();
        }
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-32"
        >
            {/* Background Image with "Swallowed" effect */}
            <div 
                ref={imgRef}
                className="absolute inset-0 z-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `url(${techNoirPhoto})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div ref={contentRef} className="flex flex-col items-center">
                    <div className="mb-6 px-4 py-1 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-md">
                        <span className="text-[10px] font-black tracking-[0.5em] uppercase text-white/40">
                            {t('research.badge')}
                        </span>
                    </div>
                    
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-10 leading-[0.9]">
                        {t('research.titleLine1')} <br/> {t('research.titleLine2')}
                    </h2>

                    <p className="text-gray-500 max-w-xl text-lg md:text-xl leading-relaxed mb-12 font-medium">
                        {t('research.body')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full max-w-5xl">
                        {pillars.map((item, i) => (
                            <div key={i} className="border-l border-white/10 pl-6 group">
                                <p className="text-[10px] font-black tracking-widest text-white/30 mb-2 group-hover:text-white transition-colors">
                                    {item.label}
                                </p>
                                <p className="text-sm text-gray-500 font-mono">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 opacity-10 font-mono text-[8px] tracking-[1em] uppercase animate-pulse">
                        {t('research.footer')}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResearchVision;
