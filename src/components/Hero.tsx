import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import * as maptiler from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { staggerContainer } from '../animations/variants';
import { buildPool, decodeFrame } from '../lib/heroOneLinerDecode';
import AsciiLogo from './AsciiLogo';
import HeroPositioningLine from './HeroPositioningLine';

/**
 * Ranh giới cấp quốc gia (GADM 4.1) — file trong `public/vietnam-admin0.geojson`.
 * BẮT BUỘC dùng URL tuyệt đối: MapLibre resolve URL tương đối theo style MapTiler → GeoJSON không tải, fill không hiện.
 */
function vietnamGeoJsonAbsoluteUrl(): string {
  return `${window.location.origin}${import.meta.env.BASE_URL}vietnam-admin0.geojson`;
}

function applyVietnamMapHighlights(map: maptiler.Map) {
  const setPaint = (layerId: string, prop: string, value: unknown) => {
    if (!map.getLayer(layerId)) return;
    try {
      map.setPaintProperty(layerId, prop, value as never);
    } catch {
      /* layer paint schema có thể khác phiên bản style */
    }
  };

  // Viền quốc gia: trắng (đọc rõ trên nền tối)
  setPaint('Country border', 'line-color', [
    'interpolate',
    ['linear'],
    ['zoom'],
    4,
    'hsla(0, 0%, 100%, 0.92)',
    6,
    'hsla(0, 0%, 100%, 0.96)',
  ]);
  setPaint('Country border', 'line-width', [
    'interpolate',
    ['linear'],
    ['zoom'],
    1,
    1.25,
    3,
    2.4,
    7,
    3.4,
    12,
    5,
    22,
    10,
  ]);
  setPaint('Country border', 'line-opacity', 0.98);

  setPaint('Disputed border', 'line-color', 'hsla(0, 0%, 100%, 0.88)');
  setPaint('Disputed border', 'line-opacity', 0.9);

  // Biên giới nội địa (tỉnh): trắng hơi mờ hơn viền quốc gia
  setPaint('Other border', 'line-color', 'hsla(0, 0%, 100%, 0.72)');
  setPaint('Other border', 'line-opacity', 0.9);
  setPaint('Other border dash', 'line-color', 'hsla(0, 0%, 100%, 0.65)');
  setPaint('Other border dash', 'line-opacity', 0.88);

  const srcId = 'vietnam-highlight';
  const geoUrl = vietnamGeoJsonAbsoluteUrl();
  const existing = map.getSource(srcId) as maptiler.GeoJSONSource | undefined;
  if (existing?.setData) {
    existing.setData(geoUrl);
  } else if (!existing) {
    map.addSource(srcId, {
      type: 'geojson',
      data: geoUrl,
    });
  }

  if (map.getLayer('vietnam-area-outline')) {
    try {
      map.removeLayer('vietnam-area-outline');
    } catch {
      /* noop */
    }
  }

  /** Đỏ cờ VN — đủ opacity để thấy rõ trên nền tối (sau khi GeoJSON tải đúng) */
  const landFill = {
    'fill-color': '#DA251D' as const,
    'fill-opacity': 0.22,
  };

  if (!map.getLayer('vietnam-area-fill')) {
    map.addLayer(
      {
        id: 'vietnam-area-fill',
        type: 'fill',
        source: srcId,
        paint: landFill,
      },
      'Country border',
    );
  } else {
    setPaint('vietnam-area-fill', 'fill-color', landFill['fill-color']);
    setPaint('vietnam-area-fill', 'fill-opacity', landFill['fill-opacity']);
  }
}

const ONELINER_GRADIENT = [
  'hero-oneliner-shimmer',
  'bg-gradient-to-r',
  'from-white',
  'via-cyan-100',
  'to-white',
  'bg-clip-text',
  'text-transparent',
] as const;

const Hero = () => {
  const { t, i18n } = useTranslation();
  const heroRef = useRef(null);
  const logoWrapperRef = useRef(null);
  const textRef = useRef(null);
  const positioningWrapRef = useRef<HTMLDivElement>(null);
  const positioningBadgeRef = useRef<HTMLParagraphElement>(null);
  const positioningTextRef = useRef<HTMLParagraphElement>(null);
  const positioningRuleRef = useRef<HTMLSpanElement>(null);
  const oneLinerStrRef = useRef(t('hero.oneLiner'));
  const poolRef = useRef(buildPool(t('hero.oneLiner')));
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<maptiler.Map | null>(null);
  const markersRef = useRef<{ [key: string]: maptiler.Marker }>({});
  const API_KEY = "eWnyCV38E8yK4zziOU4C";
  const [showScrollHint, setShowScrollHint] = useState(true);

  useLayoutEffect(() => {
    oneLinerStrRef.current = t('hero.oneLiner');
    poolRef.current = buildPool(t('hero.oneLiner'));
  }, [t, i18n.language]);

  useEffect(() => {
    const hide = () => setShowScrollHint(false);
    const onScroll = () => {
      if (window.scrollY > 8) hide();
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 0.5 || Math.abs(e.deltaX) > 0.5) hide();
    };
    const onTouchMove = () => hide();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    maptiler.config.apiKey = API_KEY;

    // 1. Initialize Map
    mapInstance.current = new maptiler.Map({
      container: mapContainer.current,
      style: maptiler.MapStyle.DATAVIZ.DARK,
      center: [106.0, 16.5], // Shifted more to the West to visually center the S-shape
      zoom: 3.8,               // Zoomed out to see the whole country
      navigationControl: false,
      geolocateControl: false,
      attributionControl: false,
      dragPan: false,
      scrollZoom: false,
      doubleClickZoom: false,
      touchZoomRotate: false,
    });

    mapInstance.current.on('load', () => {
      if (!mapInstance.current) return;
      
      // Clear all default symbol/label layers
      const style = mapInstance.current.getStyle();
      style.layers?.forEach(layer => {
        if (layer.type === 'symbol' || layer.id.includes('label')) {
          mapInstance.current!.setLayoutProperty(layer.id, 'visibility', 'none');
        }
        if (layer.id.includes('water') || layer.id.includes('background')) {
          mapInstance.current!.setPaintProperty(layer.id, 'fill-opacity', 0);
          mapInstance.current!.setPaintProperty(layer.id, 'background-opacity', 0);
        }
      });

      applyVietnamMapHighlights(mapInstance.current);

      // Add 3 Tactical City Markers (Initially Hidden)
      const cities = [
        { name: 'hanoi', coords: [105.8544, 21.0285] as [number, number] },
        { name: 'danang', coords: [108.2062, 16.0544] as [number, number] },
        { name: 'hcm', coords: [106.6297, 10.8231] as [number, number] }
      ];

      cities.forEach(city => {
        const el = document.createElement('div');
        el.className = `tactical-marker-${city.name} opacity-0 scale-0`;
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <div class="absolute w-12 h-12 bg-cyan-500/20 rounded-full animate-ping"></div>
            <div class="w-3 h-3 bg-cyan-400 rounded-full border-2 border-white shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
            <span class="absolute top-6 text-[10px] font-black tracking-widest text-cyan-400 uppercase font-mono whitespace-nowrap">
              ${city.name === 'hcm' ? 'HO CHI MINH' : city.name.replace('danang', 'DA NANG').replace('hanoi', 'HA NOI ')}
            </span>
          </div>
        `;
        
        markersRef.current[city.name] = new maptiler.Marker({ element: el })
          .setLngLat(city.coords)
          .addTo(mapInstance.current!);
      });
    });

    const ctx = gsap.context(() => {
      // MASTER TIMELINE: Handles Pinning, Logo Dive, Map Zoom, and Subtitles/Markers
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1500%",
          scrub: 2,
          pin: true,
        }
      });

      // 1. Logo scales up and fades (Starts at 0) — origin giữa màn hình
      if (logoWrapperRef.current) {
        gsap.set(logoWrapperRef.current, { transformOrigin: '50% 50%' });
      }
      masterTL.to(logoWrapperRef.current, {
        scale: 200,
        opacity: 0,
        ease: "power2.in",
        duration: 50,
        transformOrigin: '50% 50%',
      }, 0);

      // 2a. Tagline: gradient “sáng dần” theo scroll (scrub cùng timeline)
      masterTL.fromTo(
        textRef.current,
        { backgroundPosition: '100% 50%' },
        {
          backgroundPosition: '0% 50%',
          ease: 'none',
          duration: 26,
        },
        0,
      );

      // 2b. Sau khi quét xong — đẩy + blur fade (để có khoảng scroll cho 2a)
      masterTL.to(
        textRef.current,
        {
          y: -150,
          opacity: 0,
          filter: 'blur(25px)',
          ease: 'power2.inOut',
          duration: 24,
        },
        28,
      );

      // 2c. Định vị một dòng — đồng bộ scroll scrub với tagline
      const reduceOne = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const posWrap = positioningWrapRef.current;
      const badgeEl = positioningBadgeRef.current;
      const oneEl = positioningTextRef.current;
      const ruleEl = positioningRuleRef.current;
      if (posWrap && badgeEl && oneEl && ruleEl) {
        const applyOneLinerGradient = () => {
          oneEl.classList.add(...ONELINER_GRADIENT);
          oneEl.classList.remove('text-white/45');
        };
        const clearOneLinerGradient = () => {
          oneEl.classList.remove(...ONELINER_GRADIENT);
          oneEl.classList.add('text-white/45');
        };
        if (reduceOne) {
          gsap.set(posWrap, { opacity: 1, y: 0 });
          gsap.set(badgeEl, { opacity: 1, letterSpacing: '0.48em' });
          oneEl.textContent = oneLinerStrRef.current;
          applyOneLinerGradient();
          gsap.set(ruleEl, { scaleX: 1, opacity: 1 });
        } else {
          gsap.set(posWrap, { opacity: 0, y: 18 });
          gsap.set(badgeEl, { opacity: 0, letterSpacing: '0.68em' });
          clearOneLinerGradient();
          oneEl.textContent = '\u00a0';
          gsap.set(ruleEl, { scaleX: 0, opacity: 0, transformOrigin: '50% 50%' });

          masterTL.fromTo(
            posWrap,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 12, ease: 'power2.out' },
            6,
          );
          masterTL.fromTo(
            badgeEl,
            { opacity: 0, letterSpacing: '0.68em' },
            { opacity: 1, letterSpacing: '0.48em', duration: 14, ease: 'power2.out' },
            6,
          );

          const decode = { p: 0 };
          masterTL.to(
            decode,
            {
              p: 1,
              duration: 22,
              ease: 'power2.out',
              onUpdate: () => {
                const el = positioningTextRef.current;
                if (!el) return;
                const { text, done } = decodeFrame(
                  oneLinerStrRef.current,
                  poolRef.current,
                  decode.p,
                );
                el.textContent = text || '\u00a0';
                if (done) {
                  el.classList.add(...ONELINER_GRADIENT);
                  el.classList.remove('text-white/45');
                } else {
                  el.classList.remove(...ONELINER_GRADIENT);
                  el.classList.add('text-white/45');
                }
              },
            },
            8,
          );

          masterTL.fromTo(
            ruleEl,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 18, ease: 'power2.out' },
            8,
          );
        }
      }

      // 3. Reveal and Zoom the Map
      masterTL.fromTo(mapContainer.current, 
        { opacity: 0, scale: 0.98 },
        { 
          opacity: 1, 
          scale: 1,
          ease: "power1.out",
          duration: 30,
          onUpdate: function() {
            const p = this.progress();
            if (mapInstance.current) {
              mapInstance.current.setZoom(3.8 + (1.2 * p));
            }
          }
        }, 20
      );

      // 4. Cinematic Subtitle Sequence + City Markers Sync
      masterTL
        // SUB 1 - HANOI
        .fromTo(".sub-1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 10, ease: "power2.out" }, 60)
        .fromTo(".tactical-marker-hanoi", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 5 }, 60)
        .to(".sub-1", { opacity: 0, y: -50, duration: 10, ease: "power2.in" }, 80)
        
        // SUB 2 - DA NANG
        .fromTo(".sub-2", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 10, ease: "power2.out" }, 95)
        .fromTo(".tactical-marker-danang", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 5 }, 95)
        .to(".sub-2", { opacity: 0, y: -50, duration: 10, ease: "power2.in" }, 115)
        
        // SUB 3 - HCM
        .fromTo(".sub-3", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 10, ease: "power2.out" }, 130)
        .fromTo(".tactical-marker-hcm", { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 5 }, 130)
        .to(".sub-3", { opacity: 0, y: -50, duration: 12, ease: "power2.in" }, 155)
        
        // Immediate transition after sub-3 fade-out
        .to({}, { duration: 5 }); 
    });

    return () => {
      ctx.revert();
      mapInstance.current?.remove();
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative h-screen overflow-hidden bg-black">
      
      {/* Strategic Map Background */}
      <div 
        ref={mapContainer} 
        className="absolute inset-0 z-0 grayscale brightness-[0.7] opacity-50 contrast-125 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
        }}
      />

      {/* Global Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 opacity-10 z-[1]" 
           style={{ backgroundImage: 'linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Cinematic Subtitles — full-bleed ngang + bù tracking để không lệch quang học */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-40 flex justify-center px-4 pt-20 sm:px-6 sm:pt-24 md:pt-28">
        <div className="relative mx-auto flex w-full max-w-4xl items-center justify-center min-h-[9.5rem] sm:min-h-[10rem] md:min-h-[11rem]">
          <div className="sub-1 absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-3 text-center backdrop-blur-[2px] opacity-0 sm:px-5">
            <span className="mb-2 w-full max-w-3xl text-center font-mono text-base font-black uppercase leading-tight tracking-[0.2em] text-[#DA251D] [text-wrap:balance] sm:text-lg md:text-[20px] pl-[0.2em]">
              {t('hero.sub1.label')}
            </span>
            <p className="max-w-3xl text-center text-sm font-medium leading-relaxed tracking-wide text-white/90 md:text-xl">
              {t('hero.sub1.body')}
            </p>
          </div>

          <div className="sub-2 absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-3 text-center backdrop-blur-[2px] opacity-0 sm:px-5">
            <span className="mb-2 w-full max-w-3xl text-center font-mono text-base font-black uppercase leading-tight tracking-[0.4em] text-[#DA251D] [text-wrap:balance] sm:text-lg md:text-[20px] pl-[0.4em]">
              {t('hero.sub2.label')}
            </span>
            <p className="max-w-3xl text-center text-sm font-medium leading-relaxed tracking-wide text-white/90 md:text-xl">
              {t('hero.sub2.body')}
            </p>
          </div>

          <div className="sub-3 absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-3 text-center backdrop-blur-[2px] opacity-0 sm:px-5">
            <span className="mb-2 w-full max-w-3xl text-center font-mono text-base font-black uppercase leading-tight tracking-[0.4em] text-[#DA251D] [text-wrap:balance] sm:text-lg md:text-[20px] pl-[0.4em]">
              {t('hero.sub3.label')}
            </span>
            <p className="max-w-3xl text-center text-sm font-medium leading-relaxed tracking-wide text-white/90 md:text-xl">
              {t('hero.sub3.body')}
            </p>
          </div>
        </div>
      </div>

      {/* Logo: tâm khối ASCII trùng tâm viewport (không bị tagline đẩy lệch) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 px-4 sm:px-6 lg:px-8"
      >
        <div
          ref={logoWrapperRef}
          className="pointer-events-auto mx-auto flex w-full max-w-5xl origin-center items-center justify-center p-2 sm:p-4 will-change-transform"
        >
          <AsciiLogo />
        </div>
      </div>

      {/* Tagline + định vị: neo dưới tâm màn hình, canh giữa ngang */}
      <div className="absolute left-1/2 top-1/2 z-10 w-full max-w-4xl -translate-x-1/2 translate-y-[clamp(5.75rem,20vmin,11.5rem)] px-4 text-center sm:translate-y-[clamp(6.5rem,22vmin,12.5rem)] md:translate-y-[clamp(7rem,24vmin,13rem)]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col items-center"
        >
          <p
            ref={textRef}
            className="mx-auto mb-0 max-w-3xl text-center text-lg font-medium leading-relaxed [text-wrap:balance] md:text-xl"
            style={{
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              backgroundImage:
                'linear-gradient(105deg, rgb(243 244 246) 0%, rgb(243 244 246) 38%, rgb(82 91 102) 38%, rgb(82 91 102) 100%)',
              backgroundSize: '260% 100%',
              backgroundPosition: '100% 50%',
              willChange: 'background-position',
            }}
          >
            {t('hero.tagline')}
          </p>

          <HeroPositioningLine
            wrapRef={positioningWrapRef}
            badgeRef={positioningBadgeRef}
            textRef={positioningTextRef}
            ruleRef={positioningRuleRef}
            badge={t('hero.oneLinerBadge')}
          />
        </motion.div>
      </div>

      {/* Mouse scroll hint — fades out once user scrolls */}
      <motion.div 
        initial={{ opacity: 0, y: -20, x: '-50%' }}
        animate={{
          opacity: showScrollHint ? 1 : 0,
          y: showScrollHint ? 0 : 12,
          x: '-50%',
        }}
        transition={
          showScrollHint
            ? { delay: 2, duration: 1, ease: [0.16, 1, 0.3, 1] }
            : { duration: 0.35, ease: 'easeOut' }
        }
        className="absolute bottom-12 left-1/2 z-50 flex w-max max-w-[calc(100vw-2rem)] flex-col items-center gap-2 pointer-events-none"
        aria-hidden={!showScrollHint}
      >
        <div className="flex w-[22px] shrink-0 justify-center">
          <div className="w-[22px] h-[36px] border-2 border-white/20 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
            <motion.div 
              animate={
                showScrollHint
                  ? { y: [0, 12, 0], opacity: [0, 1, 0] }
                  : { y: 0, opacity: 0 }
              }
              transition={
                showScrollHint
                  ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.2 }
              }
              className="w-1 h-2 bg-white rounded-full shadow-[0_0_5px_white]"
            />
          </div>
        </div>
        {/* pl matches tracking so optical center aligns with the mouse above */}
        <span className="text-center text-[10px] font-black uppercase font-mono tracking-[0.4em] text-white/30 pl-[0.4em]">
          {t('hero.scrollHint')}
        </span>
      </motion.div>

    </section>
  );
};

export default Hero;