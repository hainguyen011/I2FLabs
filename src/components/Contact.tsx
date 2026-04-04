import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const contactRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 768) {
      const ctx = gsap.context(() => {
        gsap.fromTo(contactRef.current,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );
      });
      return () => ctx.revert();
    }
  }, []);

  const terminalBg = `
  root@i2f:~# ./connect --secure
  [===================>] 100%
  AWAITING HANDSHAKE...
  _
  `;

  return (
    <section id="contact" ref={contactRef} className="py-32 bg-black border-t border-white/5 relative z-30 overflow-hidden">
      {/* Mystic ASCII Centered Background */}
      <div className="absolute bottom-0 left-0 p-8 opacity-[0.03] select-none pointer-events-none">
        <pre className="font-mono text-xl md:text-3xl leading-none text-white whitespace-pre">
          {terminalBg}
        </pre>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 text-white/50">
            Establish <span className="text-white">Connection</span>.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            Ready to collaborate on your next project? We'd love to hear from you and discuss how we can help bring your ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-8 md:p-12 rounded-3xl">
            <h3 className="text-xl font-bold mb-8 tracking-tighter">{t('contact.formTitle')}</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-500 mb-2 tracking-widest uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-mono text-sm"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-500 mb-2 tracking-widest uppercase">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-mono text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-gray-500 mb-2 tracking-widest uppercase">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors font-mono text-sm"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-500 mb-2 tracking-widest uppercase">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors resize-none font-mono text-sm"
                  placeholder={t('contact.messagePh')}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-white text-black font-bold text-sm tracking-tight hover:bg-gray-200 transition-all duration-300 rounded-xl flex items-center justify-center group"
              >
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                {t('contact.submit')}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="border border-white/5 bg-gradient-to-tr from-white/[0.02] to-transparent p-8 md:p-12 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 tracking-tighter">Contact Info</h3>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">Email</p>
                    <p className="text-gray-300 font-mono text-sm">hainguyen0112358@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center text-gray-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold tracking-widest uppercase mb-1">{t('contact.location')}</p>
                    <p className="text-gray-300 font-mono text-sm">Ho Chi Minh City, VN</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="border border-white/5 bg-gradient-to-tr from-white/[0.02] to-transparent p-8 md:p-12 rounded-3xl">
              <h3 className="text-xl font-bold mb-8 tracking-tighter">{t('contact.followTitle')}</h3>
              
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/[0.02] transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
              
              <p className="text-gray-500 mt-6 text-sm">
                {t('contact.followBody')}
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Contact;