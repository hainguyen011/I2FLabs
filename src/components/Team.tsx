import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter, Mail, Facebook } from 'lucide-react';
import gsap from 'gsap';
import { teamMembers } from '../data/teamData';
import { fadeInUp, staggerContainer } from '../animations/variants';

const Team = () => {
  const { t } = useTranslation();
  const teamRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.innerWidth > 768) {
      const ctx = gsap.context(() => {
        // Sticky/Overlap entry effect from the bottom
        gsap.fromTo(teamRef.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: teamRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1,
            }
          }
        );

        // Parallax speed differentials on cards
        cardsRef.current.forEach((card, index) => {
          gsap.fromTo(card,
            { y: 150 + (index % 3) * 50 },
            {
              y: 0,
              scrollTrigger: {
                trigger: teamRef.current,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              }
            }
          );
        });
      });
      return () => ctx.revert();
    }
  }, []);

  const mysticBg = `
10101100 11010010
01001011 00110101
11100100 01101110
10101010 11010101
10011001 01100110
  `;

  return (
    <section id="team" ref={teamRef} className="py-32 bg-black border-t border-white/5 relative z-20 overflow-hidden">
      {/* Mystic ASCII Centered Background */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] select-none pointer-events-none text-right">
        <pre className="font-mono text-2xl leading-none text-white">
          {mysticBg}
        </pre>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={headerRef}
          className="mb-24 flex w-full flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="max-w-5xl text-4xl font-extrabold tracking-tighter text-white/50 md:text-5xl mb-4"
            variants={fadeInUp}
          >
            {t('team.titleBefore')}<span className="text-white">{t('team.titleHighlight')}</span>{t('team.titleAfter')}
          </motion.h2>
          <motion.p 
            className="max-w-2xl text-lg text-gray-500 mx-auto"
            variants={fadeInUp}
          >
            {t('team.subtitle')}
          </motion.p>
        </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                ref={(el) => (cardsRef.current[index] = el)}
                className="group"
              >
                <div 
                  className="border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full flex flex-col relative group"
                >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[22rem] object-cover object-[center_18%] grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 md:h-[26rem] md:object-[center_20%]"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Social Links Backdrop */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div 
                    className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    {member.social.github && (
                      <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.facebook && (
                      <a href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.email && (
                      <a href={`mailto:${member.social.email}`} className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-white hover:text-black transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col z-10 relative">
                  <h3 className="text-xl font-bold mb-1 tracking-tight group-hover:text-white transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 font-medium mb-4 text-sm tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-grow">
                    {member.bio}
                  </p>

                  <motion.div 
                    className="flex flex-wrap gap-2 mt-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileHover="visible"
                  >
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full text-gray-500 text-xs font-medium tracking-wide group-hover:border-white/20 group-hover:text-gray-300 transition-all duration-300"
                      >
                        {specialty}
                      </span>
                    ))}
                  </motion.div>
                </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-32"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
          <div className="border border-white/5 bg-gradient-to-tr from-white/[0.02] to-transparent p-12 rounded-3xl max-w-4xl mx-auto flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2 tracking-tighter">We're expanding the lab</h3>
            <p className="text-gray-500 mb-8 max-w-md text-sm">
              If you're interested in pushing the boundaries of what's possible in AI automation, we'd love to hear from you.
            </p>
            <motion.button 
              className="px-6 py-2 border border-white/20 text-white font-medium text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300"
              whileTap={{ scale: 0.98 }}
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
