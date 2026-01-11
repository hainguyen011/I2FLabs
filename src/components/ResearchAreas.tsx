import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Search, Users, Eye, Settings } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { researchAreas } from '../data/researchData';

const iconMap: Record<string, React.ReactNode> = {
  '💬': <MessageSquare className="w-8 h-8" />,
  '🤖': <Brain className="w-8 h-8" />,
  '🔍': <Search className="w-8 h-8" />,
  '🤝': <Users className="w-8 h-8" />,
  '👁️': <Eye className="w-8 h-8" />,
  '⚙️': <Settings className="w-8 h-8" />,
};

const ResearchAreas = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="research" className="py-20 bg-black border-t border-white">
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
            RESEARCH
            <br />
            AREAS
          </motion.h2>
          <motion.div className="w-20 h-1 bg-white mb-8" variants={fadeInUp} />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl"
            variants={fadeInUp}
          >
            Exploring cutting-edge AI technologies and methodologies to push the boundaries of what's possible.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {researchAreas.map((area, index) => (
            <motion.div 
              key={area.id} 
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
                  {iconMap[area.icon]}
                </motion.div>
                
                <h3 className="text-xl font-bold mb-3 tracking-wider">
                  {area.title}
                </h3>
                
                <p className="text-gray-400 group-hover:text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                  {area.description}
                </p>

                <div className="space-y-3">
                  <div className="text-xs font-bold tracking-wider text-gray-500 group-hover:text-gray-700">
                    APPLICATIONS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {area.applications.map((app, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 border border-gray-400 group-hover:border-gray-600 text-gray-400 group-hover:text-gray-600 text-xs font-bold tracking-wider"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchAreas;
