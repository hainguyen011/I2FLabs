import { motion } from 'framer-motion';
import { soundManager } from '../lib/SoundManager';

const CARD_DATA = [
  {
    tag: 'AGENTS',
    ascii: `[█▓▒░]\n::.RAG`,
    title: 'Autonomous Swarms',
    desc: 'Heterogeneous agent collectives executing complex multi-turn workflows seamlessly.',
  },
  {
    tag: 'KERNEL',
    ascii: `(•_•)\n<|>\n/ \\`,
    title: 'Aevum OS Core',
    desc: 'Local-first native operating system environment designed for next-generation intelligence.',
  },
  {
    tag: 'GRAPH',
    ascii: ` [O]\n-|-\n / \\`,
    title: 'Knowledge Fabrics',
    desc: 'Persistent cross-session associative memory graphs with formal semantic consistency.',
  },
  {
    tag: 'MESH',
    ascii: ` /\\\n/  \\\n\\  /\n \\/`,
    title: 'PiperNet P2P Protocol',
    desc: 'Zero-trust distributed node communication and decentralized intelligence distribution.',
  },
  {
    tag: 'SYNERGY',
    ascii: `\\|/\n-O-\n/|\\`,
    title: 'Soul & Persona Engine',
    desc: 'Dynamic emotional resonance and evolutionary leveling mechanics for personalized AI personas.',
  },
];

export default function BentoGrid() {
  return (
    <section className="w-full bg-[#121316] text-[#f5f5f7] py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-neutral-800 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-cyan-400">
              [ 03 // TECHNICAL ARCHITECTURE ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-white mt-2">
              Modular Engineering. <br />
              Uncompromising Craft.
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md font-normal leading-relaxed">
            Every layer of our stack is engineered from the ground up to ensure determinism, zero data leakage, and blistering speed.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARD_DATA.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              onMouseEnter={() => soundManager.playTypeTick()}
              className="bg-neutral-900/80 rounded-3xl p-8 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-neutral-500 uppercase">
                    {card.tag}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-500/80 group-hover:shadow-[0_0_8px_#06b6d4] transition-shadow" />
                </div>

                <div className="mb-6 font-mono text-cyan-400/70 group-hover:text-cyan-300 transition-colors whitespace-pre text-xs h-12 flex items-center">
                  {card.ascii}
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-white mb-2">
                  {card.title}
                </h3>

                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>

              <div className="mt-8 flex gap-1 justify-end opacity-30 group-hover:opacity-60 transition-opacity">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-3 ${i <= idx ? 'bg-cyan-400' : 'bg-neutral-700'}`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
