import type { RefObject } from 'react';

type Props = {
  wrapRef: RefObject<HTMLDivElement>;
  badgeRef: RefObject<HTMLParagraphElement>;
  textRef: RefObject<HTMLParagraphElement>;
  ruleRef: RefObject<HTMLSpanElement>;
  badge: string;
};

/**
 * Câu định vị — animation decode + shimmer do GSAP masterTL (scroll scrub) điều khiển qua refs.
 */
const HeroPositioningLine = ({ wrapRef, badgeRef, textRef, ruleRef, badge }: Props) => {
  return (
    <div ref={wrapRef} className="mt-8 w-full max-w-3xl px-1">
      <p
        ref={badgeRef}
        className="mb-3 text-center font-mono text-[9px] font-black uppercase text-cyan-500/55 md:text-[10px]"
        style={{ letterSpacing: '0.48em' }}
      >
        <span className="text-white/25">[</span>
        {badge}
        <span className="text-white/25">]</span>
      </p>

      <p
        ref={textRef}
        className="min-h-[2.75rem] text-center text-sm font-semibold leading-snug tracking-tight text-white/45 md:min-h-[3.25rem] md:text-base md:leading-snug"
        style={{ textWrap: 'balance' }}
        aria-live="polite"
      >
        {'\u00a0'}
      </p>

      <span
        ref={ruleRef}
        className="mx-auto mt-3 block h-px max-w-[min(12rem,50vw)] origin-center scale-x-0 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0"
        aria-hidden
      />
    </div>
  );
};

export default HeroPositioningLine;
