import { useId } from 'react';
import { motion } from 'framer-motion';
import { soundManager } from '../lib/SoundManager';

function MiniBars({ values, uid }: { values: number[]; uid: string }) {
  const max = Math.max(...values, 1);
  const n = values.length;
  const slot = 100 / n;
  const barW = slot * 0.55;

  return (
    <svg viewBox="0 0 100 38" className="h-14 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {values.map((v, i) => {
        const h = (v / max) * 28;
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
            rx="1"
            fill={last ? `url(#${uid}-bar)` : '#d1d5db'}
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
    <svg viewBox="0 0 100 36" className="h-14 w-full" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id={`${uid}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={fillPoints} fill={`url(#${uid}-area)`} stroke="none" />
      <polyline
        points={points}
        fill="none"
        stroke="#06b6d4"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function MetricsShowcase() {
  const uid = useId();

  const metrics = [
    {
      label: 'SWARM WORKFLOWS',
      value: '1.2M+',
      caption: 'Agent tasks dispatched across nodes',
      chart: 'bars',
      data: [14, 28, 45, 60, 85, 110, 142],
    },
    {
      label: 'LATENCY BENCHMARK',
      value: '4.8ms',
      caption: 'Mean P2P state propagation latency',
      chart: 'line',
      data: [22, 18, 14, 11, 8, 6, 4.8],
    },
    {
      label: 'SECURITY AUDIT PASS',
      value: '99.98%',
      caption: 'Formal verification accuracy across MCP',
      chart: 'line',
      data: [98.2, 98.7, 99.1, 99.4, 99.7, 99.9, 99.98],
    },
    {
      label: 'ACTIVE DEVELOPERS',
      value: '4,500+',
      caption: 'Engineers building on Aevum & PiperNet',
      chart: 'bars',
      data: [300, 850, 1400, 2200, 3100, 3900, 4500],
    },
  ];

  return (
    <section className="w-full bg-[#e5e6ea] py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-300 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-500">
              [ 05 // SYSTEM TELEMETRY & METRICS ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#121316] mt-2">
              Performance by Design. <br />
              Verified in Real-Time.
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md font-normal leading-relaxed">
            Real telemetry data aggregating throughput, consensus stability, and security guarantees across the ecosystem.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              onMouseEnter={() => soundManager.playTypeTick()}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-black/5 hover:border-black/20 shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                  {m.label}
                </span>
                <div className="text-3xl sm:text-4xl font-normal tracking-tight text-[#121316] mt-3 mb-1">
                  {m.value}
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {m.caption}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100">
                {m.chart === 'bars' ? (
                  <MiniBars values={m.data} uid={`${uid}-${idx}`} />
                ) : (
                  <MiniLine values={m.data} uid={`${uid}-${idx}`} />
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
