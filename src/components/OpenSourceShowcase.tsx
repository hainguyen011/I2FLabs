import { Github, Star, GitFork, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../lib/SoundManager';

const REPOS = [
  {
    id: 'aevum-os',
    name: 'Aevum OS',
    tag: 'SYSTEM / AGENTS',
    stars: '1.4k',
    forks: '210',
    url: 'https://github.com/hainguyen011/Aevum-OS',
    desc: 'Local-first native operating system environment designed for autonomous AI agents and soul personas.',
  },
  {
    id: 'pipernet',
    name: 'PiperNet Protocol',
    tag: 'P2P / NETWORKING',
    stars: '890',
    forks: '124',
    url: 'https://github.com/hainguyen011/PiperNet',
    desc: 'Decentralized peer-to-peer communication layer for distributed agent swarms and state synchronization.',
  },
  {
    id: 'aevos-mcp',
    name: 'Aevos MCP Server',
    tag: 'MCP / PROTOCOLS',
    stars: '650',
    forks: '95',
    url: 'https://github.com/hainguyen011/aevos-mcp',
    desc: 'Model Context Protocol adapter integrating persistent cognitive memory graphs and persona evolutionary engines.',
  },
  {
    id: 'agentic-guardrails',
    name: 'Agentic Guardrails Kernel',
    tag: 'SECURITY / AUDIT',
    stars: '420',
    forks: '68',
    url: 'https://github.com/hainguyen011',
    desc: 'Formal boundary audit engine enforcing non-repudiation and zero data leakage across multi-agent sessions.',
  },
];

export default function OpenSourceShowcase() {
  return (
    <section className="w-full bg-studio-light py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-300 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-500">
              [ 04 // OPEN SOURCE & REPOSITORIES ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#121316] mt-2">
              Built in Public. <br />
              Shared with the World.
            </h2>
          </div>
          <a
            href="https://github.com/hainguyen011"
            target="_blank"
            rel="noreferrer"
            onClick={() => soundManager.playClick()}
            className="loco-pill !bg-white hover:!bg-neutral-100"
          >
            <Github className="w-4 h-4" />
            <span>VISIT GITHUB LABS</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Repositories Editorial List */}
        <div className="divide-y divide-neutral-300">
          {REPOS.map((repo, idx) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => {
                soundManager.playTypeTick();
              }}
              className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:px-4 transition-all duration-300 cursor-pointer block"
            >
              <div className="flex items-start sm:items-center space-x-4 sm:space-x-6">
                <span className="text-sm font-mono text-neutral-400 group-hover:text-black transition-colors">
                  0{idx + 1}
                </span>
                <div>
                  <div className="flex items-center space-x-3">
                    <h3 className="text-2xl sm:text-3xl font-normal tracking-[-0.02em] text-[#121316] group-hover:text-neutral-900 group-hover:translate-x-1 transition-all">
                      {repo.name}
                    </h3>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-700">
                      {repo.tag}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 mt-2 max-w-xl font-normal leading-relaxed">
                    {repo.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6 shrink-0 text-sm font-mono text-neutral-500">
                <div className="flex items-center space-x-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                  <span>{repo.stars}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <GitFork className="w-4 h-4 text-neutral-400" />
                  <span>{repo.forks}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-neutral-700 group-hover:bg-[#121316] group-hover:text-white group-hover:border-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
