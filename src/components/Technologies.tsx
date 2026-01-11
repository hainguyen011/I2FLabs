import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cloud, Wrench, Layers, Cpu } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { techStack } from '../data/technologiesData';

const categoryIcons: Record<string, React.ReactNode> = {
  'Languages': <Code className="w-6 h-6" />,
  'AI/ML Frameworks': <Cpu className="w-6 h-6" />,
  'LLM APIs': <Cloud className="w-6 h-6" />,
  'Vector Databases': <Database className="w-6 h-6" />,
  'Web & Backend': <Layers className="w-6 h-6" />,
  'Tools & Platforms': <Wrench className="w-6 h-6" />,
};

const Technologies = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="technologies" className="py-20 bg-black border-t border-white">
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
            TECH
            <br />
            STACK
          </motion.h2>
          <motion.div className="w-20 h-1 bg-white mb-8" variants={fadeInUp} />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl"
            variants={fadeInUp}
          >
            Our arsenal of cutting-edge technologies and frameworks for building intelligent AI systems.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {techStack.map((category, index) => (
            <motion.div 
              key={category.title} 
              className="group"
              variants={staggerItem}
              custom={index}
            >
              <div className="border border-white bg-black hover:bg-white hover:text-black transition-all duration-300 h-full flex flex-col p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {categoryIcons[category.title]}
                  </motion.div>
                  <h3 className="text-lg font-bold tracking-wider">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      className="px-3 py-1 border border-gray-400 group-hover:border-gray-600 text-gray-400 group-hover:text-gray-600 text-xs font-bold tracking-wider"
                      whileHover={{ borderColor: '#ffffff' }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
