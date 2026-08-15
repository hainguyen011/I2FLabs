import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Network, Sparkles, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../lib/SoundManager';

export default function ResearchVision() {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: Network,
      tag: '01 // ARCHITECTURE',
      titleKey: 'research.pillars.0.title',
      descKey: 'research.pillars.0.description',
      defaultTitle: 'Multi-Agent Swarm Orchestration',
      defaultDesc: 'Autonomous cooperative agent swarms communicating via high-speed asynchronous protocols and verified memory state channels.',
    },
    {
      icon: Sparkles,
      tag: '02 // COGNITION',
      titleKey: 'research.pillars.1.title',
      descKey: 'research.pillars.1.description',
      defaultTitle: 'Neuro-Symbolic Reasoning',
      defaultDesc: 'Combining generative intelligence with formal verification, logic graph verification, and deterministic execution pipelines.',
    },
    {
      icon: Layers,
      tag: '03 // INFRASTRUCTURE',
      titleKey: 'research.pillars.2.title',
      descKey: 'research.pillars.2.description',
      defaultTitle: 'Decentralized Kernel Systems',
      defaultDesc: 'Sub-millisecond latency distributed storage, edge intelligence execution, and peer-to-peer verifiable knowledge synchronizers.',
    },
    {
      icon: ShieldCheck,
      tag: '04 // GUARDRAILS',
      titleKey: 'research.pillars.3.title',
      descKey: 'research.pillars.3.description',
      defaultTitle: 'Proactive Safety & Integrity',
      defaultDesc: 'Continuous runtime memory boundary audits, zero-trust MCP sandboxing, and autonomous defensive consensus engines.',
    },
  ];

  return (
    <section className="w-full bg-studio-light py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-300 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-500">
              [ 02 // RESEARCH PILLARS ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#121316] mt-2">
              Theoretical Rigor <br />
              Meets Production Systems.
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md font-normal leading-relaxed">
            Our fundamental research directly powers our next-generation open-source operating systems, developer engines, and AI frameworks.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              onMouseEnter={() => soundManager.playTypeTick()}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-black/5 hover:border-black/20 transition-all duration-300 shadow-sm flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-semibold tracking-wider text-neutral-400">
                    {pillar.tag}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 group-hover:bg-[#121316] group-hover:text-white transition-colors">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 mb-3">
                  {t(pillar.titleKey, { defaultValue: pillar.defaultTitle })}
                </h3>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                  {t(pillar.descKey, { defaultValue: pillar.defaultDesc })}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors">
                <span>EXPLORE TECHNICAL BRIEF</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
