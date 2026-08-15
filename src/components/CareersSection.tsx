import { ArrowUpRight, MapPin, Briefcase } from 'lucide-react';
import { soundManager } from '../lib/SoundManager';

const ROLES = [
  {
    title: 'Core Systems & Rust Kernel Engineer',
    type: 'Full-time / Remote & Hybrid',
    location: 'Hanoi / Remote (Global)',
    tags: ['Rust', 'Wasm', 'P2P', 'Low-Latency'],
  },
  {
    title: 'Agentic AI & LLM Reasoning Researcher',
    type: 'Full-time / Research Fellowship',
    location: 'Hanoi / Remote (Global)',
    tags: ['PyTorch', 'MCP', 'Evaluation', 'Swarm'],
  },
  {
    title: 'Distributed Frontend & Interaction Designer',
    type: 'Full-time / Remote',
    location: 'Remote',
    tags: ['React', 'WebGL', 'Three.js', 'Framer Motion'],
  },
];

export default function CareersSection() {
  return (
    <section id="careers" className="w-full bg-[#e5e6ea] py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-300 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-500">
              [ 07 // CAREERS & FELLOWSHIPS ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#121316] mt-2">
              Build the Frontier. <br />
              Join the Laboratory.
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md font-normal leading-relaxed">
            We offer generous equity, research grants, deep compute access, and the freedom to work on high-impact fundamental technologies.
          </p>
        </div>

        {/* Roles List */}
        <div className="divide-y divide-neutral-300">
          {ROLES.map((role, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundManager.playTypeTick()}
              className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:px-4 transition-all duration-300"
            >
              <div>
                <h3 className="text-2xl font-normal tracking-tight text-[#121316] group-hover:text-neutral-900 group-hover:translate-x-1 transition-all">
                  {role.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-mono text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    {role.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {role.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2">
                  {role.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/70 border border-neutral-300 text-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  onClick={() => soundManager.playClick()}
                  className="loco-pill !bg-[#121316] !text-white !border-black hover:!bg-black"
                >
                  <span>APPLY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
