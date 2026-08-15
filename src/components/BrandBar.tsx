export default function BrandBar() {

  const items = [
    'AUTONOMOUS AGENTS',
    'DISTRIBUTED SYSTEMS',
    'NEURO-SYMBOLIC AI',
    'SECURE PROTOCOLS',
    'HUMAN-AI SYMBIOSIS',
    'OPEN SOURCE RESEARCH',
    'VIETNAM TECH ECOSYSTEM',
  ];

  return (
    <section className="w-full bg-[#121316] text-[#f5f5f7] py-4 border-y border-neutral-800 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex items-center space-x-10 text-xs sm:text-sm font-normal tracking-[0.2em] uppercase shrink-0">
          {items.concat(items).map((item, idx) => (
            <div key={idx} className="flex items-center space-x-10">
              <span className="opacity-80 hover:opacity-100 transition-opacity">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
