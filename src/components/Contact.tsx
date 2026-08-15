import { useState } from 'react';
import { ArrowUpRight, Send, Check, Mail, MapPin } from 'lucide-react';
import { soundManager } from '../lib/SoundManager';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '', projectType: 'Agentic AI' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChime();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '', projectType: 'Agentic AI' });
    }, 4000);
  };

  return (
    <section id="contact" className="w-full bg-[#121316] text-[#f5f5f7] py-28 px-6 sm:px-12 md:px-16 lg:px-24 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-16">
        
        {/* Giant Headline */}
        <div className="border-b border-neutral-800 pb-12">
          <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-cyan-400">
            [ 09 // CONTACT & INQUIRIES ]
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.05em] text-white mt-4 leading-[0.95]">
            Let’s craft the future <br />
            together.
          </h2>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed">
                Whether you’re interested in collaborating on research, deploying Aevum OS in enterprise environments, or joining our engineering fellows, we’d love to connect.
              </p>

              <div className="space-y-3 pt-4 text-sm font-mono text-neutral-400">
                <div className="flex items-center space-x-3">
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                  <a
                    href="https://unikorn.vn/u/richard-nguyen"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="hover:text-white transition-colors underline underline-offset-4"
                  >
                    unikorn.vn/u/richard-nguyen
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <a
                    href="https://unikorn.vn/u/richard-nguyen"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="hover:text-white transition-colors"
                  >
                    Direct Sync via Unikorn
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Hanoi, Vietnam // Global Decentralized Mesh</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                DIRECT PGP & SECURITY
              </span>
              <p className="text-xs text-neutral-400 font-mono">
                For vulnerability disclosures or cryptographically signed communication, please contact security@i2flabs.com.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-900/60 p-8 sm:p-10 rounded-3xl border border-neutral-800">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Satoshi Nakamoto"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="satoshi@domain.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Project Domain
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Agentic AI', 'Aevum OS', 'Research Grants', 'Partnership'].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => {
                        soundManager.playClick();
                        setForm({ ...form, projectType: type });
                      }}
                      className={`loco-pill-dark !text-xs !py-1.5 !px-3.5 ${
                        form.projectType === type ? '!bg-white !text-black !border-white font-semibold' : ''
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono tracking-wider text-neutral-400 uppercase mb-2">
                  Message / Architecture Inquiry
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about what you are building, research scope, or collaboration goals..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full loco-pill-dark !py-3.5 !bg-white !text-black hover:!bg-neutral-200 !border-white flex items-center justify-center space-x-2 font-medium"
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>TRANSMISSION SENT SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <span>SEND TRANSMISSION</span>
                    <Send className="w-4 h-4 opacity-70" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}