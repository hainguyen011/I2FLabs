import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { soundManager } from '../lib/SoundManager';

const FAQS = [
  {
    q: 'What is the core mission of I2F Labs?',
    a: 'I2F Labs is a deep-tech research laboratory dedicated to advancing autonomous multi-agent operating systems (Aevum OS), decentralized knowledge synchronization (PiperNet), and neuro-symbolic reasoning with absolute safety and transparency.',
  },
  {
    q: 'How does the Persona & Soul System work?',
    a: 'Our cognitive persona engine embeds multi-tier memory graphs, emotional resonance vectors, and evolutionary leveling systems into agent instances, allowing assistants like An to maintain continuity, personality, and deep contextual mastery.',
  },
  {
    q: 'Are your frameworks open source and available for commercial use?',
    a: 'Yes. Core frameworks, MCP connectors, and protocols are released under permissive open-source licenses to foster open innovation in the global and Vietnamese AI developer ecosystems.',
  },
  {
    q: 'How can organizations collaborate or partner with I2F Labs?',
    a: 'We partner with leading academic labs, research organizations, and enterprises seeking to deploy resilient autonomous agents on private infrastructure. Reach out directly via our contact channels below.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    soundManager.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-studio-light py-28 px-6 sm:px-12 md:px-16 lg:px-24 border-b border-neutral-300 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-300 pb-8">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-neutral-500">
              [ 08 // FREQUENTLY ASKED QUESTIONS ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.04em] text-[#121316] mt-2">
              Clarity on Vision, <br />
              Research & Technology.
            </h2>
          </div>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-neutral-300">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left py-2 group"
                >
                  <span className="text-xl sm:text-2xl font-normal tracking-tight text-[#121316] group-hover:text-black">
                    {faq.q}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-neutral-700 group-hover:bg-[#121316] group-hover:text-white transition-colors shrink-0 ml-4">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-base text-neutral-600 leading-relaxed pt-4 pb-2 max-w-3xl font-normal">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
