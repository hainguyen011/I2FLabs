import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Rocket, Building2, Users, Landmark, Lightbulb, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { vietnamAIEcosystem, ecosystemStats } from '../data/ecosystemData';

const iconMap: Record<string, React.ReactNode> = {
  '🎓': <GraduationCap className="w-8 h-8" />,
  '🚀': <Rocket className="w-8 h-8" />,
  '🏢': <Building2 className="w-8 h-8" />,
  '👥': <Users className="w-8 h-8" />,
  '🏛️': <Landmark className="w-8 h-8" />,
  '💡': <Lightbulb className="w-8 h-8" />,
};

const AIEcosystemVN = () => {
  const { ref, isInView } = useScrollAnimation();
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation();

  return (
    <section id="ecosystem" className="py-20 bg-black border-t border-white">
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
            AI ECOSYSTEM
            <br />
            VIETNAM
          </motion.h2>
          <motion.div className="w-20 h-1 bg-white mb-8" variants={fadeInUp} />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl"
            variants={fadeInUp}
          >
            Mapping the vibrant AI technology landscape in Vietnam - from research institutions to startups, 
            corporations to communities driving innovation.
          </motion.p>
        </motion.div>

        {/* Ecosystem Stats */}
        <motion.div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div 
            className="border border-white p-6 text-center"
            variants={fadeInUp}
            whileHover={{ borderColor: '#ffffff' }}
          >
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 mr-2" />
              <div className="text-3xl font-black">{ecosystemStats.aiCompanies}</div>
            </div>
            <div className="text-sm text-gray-400 font-bold tracking-wider">AI COMPANIES</div>
          </motion.div>
          <motion.div 
            className="border border-white p-6 text-center"
            variants={fadeInUp}
            whileHover={{ borderColor: '#ffffff' }}
          >
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 mr-2" />
              <div className="text-3xl font-black">{ecosystemStats.researchers}</div>
            </div>
            <div className="text-sm text-gray-400 font-bold tracking-wider">RESEARCHERS</div>
          </motion.div>
          <motion.div 
            className="border border-white p-6 text-center"
            variants={fadeInUp}
            whileHover={{ borderColor: '#ffffff' }}
          >
            <div className="flex items-center justify-center mb-2">
              <Rocket className="w-6 h-6 mr-2" />
              <div className="text-3xl font-black">{ecosystemStats.aiProjects}</div>
            </div>
            <div className="text-sm text-gray-400 font-bold tracking-wider">AI PROJECTS</div>
          </motion.div>
          <motion.div 
            className="border border-white p-6 text-center"
            variants={fadeInUp}
            whileHover={{ borderColor: '#ffffff' }}
          >
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 mr-2" />
              <div className="text-3xl font-black">{ecosystemStats.investment}</div>
            </div>
            <div className="text-sm text-gray-400 font-bold tracking-wider">INVESTMENT</div>
          </motion.div>
        </motion.div>

        {/* Ecosystem Categories */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {vietnamAIEcosystem.map((category, index) => (
            <motion.div 
              key={category.title} 
              className="group"
              variants={staggerItem}
              custom={index}
            >
              <div className="border border-white bg-black hover:bg-white hover:text-black transition-all duration-300 h-full flex flex-col p-6">
                <motion.div 
                  className="mb-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {iconMap[category.icon]}
                </motion.div>
                
                <h3 className="text-lg font-bold mb-2 tracking-wider">
                  {category.title}
                </h3>
                
                <p className="text-gray-400 group-hover:text-gray-600 mb-4 leading-relaxed text-xs">
                  {category.description}
                </p>

                <div className="space-y-2 flex-grow">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-400 group-hover:text-gray-600 flex items-start"
                    >
                      <span className="mr-2 text-white group-hover:text-black">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 border border-white p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 tracking-wider text-center">JOIN THE ECOSYSTEM</h3>
          <div className="w-20 h-1 bg-white mx-auto mb-6" />
          <p className="text-gray-300 leading-relaxed text-center mb-6">
            Vietnam's AI ecosystem is rapidly growing with increasing investment, talent, and innovation. 
            Be part of this exciting journey as we build the future of AI in Southeast Asia.
          </p>
          <div className="flex justify-center">
            <motion.button 
              className="px-8 py-3 bg-white text-black font-bold tracking-wider transition-all duration-300 hover:bg-gray-200"
              whileTap={{ scale: 0.98 }}
            >
              EXPLORE OPPORTUNITIES
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIEcosystemVN;
