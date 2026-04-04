import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export type MetricChartItem = {
  label: string;
  value: string;
  caption: string;
  chartType: 'bars' | 'line' | 'radial';
  chartData: number[];
};

function MiniBars({ values, uid }: { values: number[]; uid: string }) {
  const max = Math.max(...values, 1);
  const n = values.length;
  const slot = 100 / n;
  const barW = slot * 0.55;

  return (
    <svg viewBox="0 0 100 38" className="h-16 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      {[10, 20, 30].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.35" />
      ))}
      {values.map((v, i) => {
        const h = (v / max) * 26;
        const x = slot * i + (slot - barW) / 2;
        const y = 34 - h;
        const last = i === n - 1;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={h}
            rx="0.8"
            fill={last ? `url(#${uid}-bar)` : 'rgba(255,255,255,0.07)'}
            stroke={last ? 'rgba(34,211,238,0.35)' : 'rgba(255,255,255,0.12)'}
            strokeWidth="0.4"
          />
        );
      })}
    </svg>
  );
}

function MiniLine({ values, uid }: { values: number[]; uid: string }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values
    .map((v, i) => {
      const x = values.length === 1 ? 50 : (i / (values.length - 1)) * 100;
      const y = 32 - ((v - min) / range) * 24;
      return `${x},${y}`;
    })
    .join(' ');
  const fillPoints = `0,34 ${points} 100,34`;

  return (
    <svg viewBox="0 0 100 36" className="h-16 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="rgb(34 211 238)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[9, 18, 27].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.35" />
      ))}
      <polyline points={fillPoints} fill={`url(#${uid}-area)`} stroke="none" />
      <polyline
        points={points}
        fill="none"
        stroke="rgba(34,211,238,0.55)"
        strokeWidth="1.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniRadial({ percent, uid }: { percent: number; uid: string }) {
  const r = 16;
  const c = 20;
  const stroke = 2.2;
  const circ = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, percent));
  const offset = circ * (1 - clamped / 100);

  return (
    <svg viewBox="0 0 40 40" className="mx-auto h-20 w-20" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-rad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="rgb(147 197 253)" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke={`url(#${uid}-rad)`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${c} ${c})`}
      />
    </svg>
  );
}

function MetricChart({ item, index }: { item: MetricChartItem; index: number }) {
  const reactId = useId().replace(/:/g, '');
  const uid = `m-${index}-${reactId}`;

  if (item.chartType === 'line') {
    return <MiniLine values={item.chartData} uid={uid} />;
  }
  if (item.chartType === 'radial') {
    const p = item.chartData[0] ?? 0;
    return <MiniRadial percent={p} uid={uid} />;
  }
  return <MiniBars values={item.chartData} uid={uid} />;
}

const MetricsShowcase = () => {
  const { t } = useTranslation();
  const items = t('metrics.items', { returnObjects: true }) as MetricChartItem[];

  return (
    <section
      id="metrics"
      className="relative z-10 border-t border-white/10 bg-black py-24 md:py-32"
      aria-labelledby="metrics-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="mb-4 text-center font-mono text-[10px] font-black uppercase tracking-[0.42em] text-white/40 md:text-[11px]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          {t('metrics.badge')}
        </motion.p>

        <motion.h2
          id="metrics-heading"
          className="mb-6 text-center text-3xl font-black uppercase tracking-tighter text-white/40 md:mb-8 md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          {t('metrics.titleLine1')}{' '}
          <span className="text-white">{t('metrics.titleLine2')}</span>
        </motion.h2>

        <motion.p
          className="mx-auto mb-14 max-w-2xl text-center text-sm leading-relaxed text-gray-500 md:mb-16 md:text-base"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          {t('metrics.intro')}
        </motion.p>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item, index) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
            >
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-5 transition-all duration-500 hover:border-white/20 md:p-6">
                <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                  {item.label}
                </p>
                <p className="mb-1 text-3xl font-black tabular-nums tracking-tight text-white md:text-4xl">
                  {item.value}
                </p>
                <p className="mb-5 text-xs leading-relaxed text-gray-500 md:text-sm">{item.caption}</p>
                <div className="mt-auto border-t border-white/5 pt-4">
                  <MetricChart item={item} index={index} />
                </div>
              </article>
            </motion.li>
          ))}
        </ul>

        <p className="mt-10 text-center font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
          {t('metrics.disclaimer')}
        </p>
      </div>
    </section>
  );
};

export default MetricsShowcase;
