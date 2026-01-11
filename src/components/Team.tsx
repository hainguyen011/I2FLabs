import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Facebook } from 'lucide-react';
import { teamMembers } from '../data/teamData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

const Team = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="team" className="py-20 bg-black border-t border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={ref}
          className="mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-8 leading-none"
            variants={fadeInUp}
          >
            OUR
            <br />
            TEAM
          </motion.h2>
          <motion.div className="w-20 h-1 bg-white mb-8" variants={fadeInUp} />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl"
            variants={fadeInUp}
          >
            A diverse group of talented individuals united by passion for innovation and cutting-edge technology.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index} 
              className="group"
              variants={staggerItem}
              custom={index}
            >
              <motion.div 
                className="border border-white bg-black hover:bg-white hover:text-black transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Social Links */}
                  <motion.div 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.social.github && (
                      <motion.a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                        whileHover={{ rotate: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                    )}
                    {member.social.facebook && (
                      <motion.a
                        href={member.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                        whileHover={{ rotate: -5 }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Facebook className="w-4 h-4" />
                      </motion.a>
                    )}
                    {member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                        whileHover={{ rotate: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Linkedin className="w-4 h-4" />
                      </motion.a>
                    )}
                    {member.social.twitter && (
                      <motion.a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                        whileHover={{ rotate: -5 }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Twitter className="w-4 h-4" />
                      </motion.a>
                    )}
                    {member.social.email && (
                      <motion.a
                        href={`mailto:${member.social.email}`}
                        className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                        whileHover={{ rotate: 5 }}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Mail className="w-4 h-4" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold mb-2 tracking-wider">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-600 font-bold mb-3 text-sm tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-gray-400 group-hover:text-gray-600 mb-6 leading-relaxed text-sm flex-grow">
                    {member.bio}
                  </p>

                  <motion.div 
                    className="flex flex-wrap gap-2 mt-auto"
                    variants={staggerContainer}
                    initial="hidden"
                    whileHover="visible"
                  >
                    {member.specialties.map((specialty, idx) => (
                      <motion.span
                        key={idx}
                        className="px-2 py-1 border border-gray-400 group-hover:border-gray-600 text-gray-400 group-hover:text-gray-600 text-xs font-bold tracking-wider"
                        variants={staggerItem}
                        whileHover={{ borderColor: '#ffffff' }}
                      >
                        {specialty}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <div className="border border-white p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 tracking-wider">JOIN OUR TEAM</h3>
            <div className="w-20 h-1 bg-white mx-auto mb-6" />
            <p className="text-gray-300 mb-6">
              We're always looking for talented individuals who share our passion for innovation and technology.
              If you're interested in pushing the boundaries of what's possible, we'd love to hear from you.
            </p>
            <motion.button 
              className="px-8 py-3 bg-white text-black font-bold tracking-wider transition-all duration-300"
              whileTap={{ scale: 0.95 }}
            >
              VIEW OPEN POSITIONS
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
