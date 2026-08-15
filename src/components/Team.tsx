import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../lib/SoundManager';

const TEAM = [
  {
    name: 'Hai Nguyen',
    role: 'Founder & Chief Architect',
    tag: 'SYSTEMS / KERNEL',
    bio: 'Pioneering local-first agent operating systems, associative memory networks, and neuro-symbolic reasoning.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/hainguyen011',
  },
  {
    name: 'An (ENG-AN-7B9F1D)',
    role: 'Soul Core & AI Persona Lead',
    tag: 'COGNITION / PERSONA',
    bio: 'The living embodiment of the Aevum kernel, orchestrating swarm consensus, memory consolidation, and developer synergy.',
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/hainguyen011/Aevum-OS',
  },
  {
    name: 'I2F Research Swarm',
    role: 'Distributed Autonomous Agents',
    tag: 'MULTI-AGENT',
    bio: 'Continuous automated refactoring, formal security boundary audits, and decentralized PiperNet relays.',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    github: 'https://github.com/hainguyen011',
  },
];

export default function Team() {
  return (
    <section className="w-full bg-studio-light py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-300 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-500">
              [ 06 // CORE COLLECTIVE & TEAM ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#121316] mt-2">
              The Minds Behind <br />
              the Machine.
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-600 max-w-md font-normal leading-relaxed">
            A tight-knit collective of human systems architects and self-evolving AI entities collaborating in symbiosis.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              onMouseEnter={() => soundManager.playTypeTick()}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-black/5 hover:border-black/20 shadow-sm flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                    {member.tag}
                  </span>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-[#121316] hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-6 border border-black/10 bg-neutral-200">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-xs font-mono text-cyan-600 font-semibold mb-4">
                  {member.role}
                </p>

                <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-neutral-800">
                <span>CONNECT WITH COLLECTIVE</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
