import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, Bot, Target, BarChart3, Eye } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { capabilities } from '../data/capabilitiesData';

const iconMap: Record<string, React.ReactNode> = {
  '💬': <MessageSquare className="w-8 h-8" />,
  '📚': <BookOpen className="w-8 h-8" />,
  '🤖': <Bot className="w-8 h-8" />,
  '🎯': <Target className="w-8 h-8" />,
  '📊': <BarChart3 className="w-8 h-8" />,
  '👁️': <Eye className="w-8 h-8" />,
};

const Capabilities = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="capabilities" className="py-20 bg-black border-t border-white">
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
            AI
            <br />
            CAPABILITIES
          </motion.h2>
          <motion.div className="w-20 h-1 bg-white mb-8" variants={fadeInUp} />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl"
            variants={fadeInUp}
          >
            Practical AI solutions we deliver to solve real-world business challenges and drive innovation.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {capabilities.map((capability, index) => (
            <motion.div 
              key={capability.id} 
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
                  {iconMap[capability.icon]}
                </motion.div>
                
                <h3 className="text-xl font-bold mb-3 tracking-wider">
                  {capability.title}
                </h3>
                
                <p className="text-gray-400 group-hover:text-gray-600 mb-4 leading-relaxed text-sm">
                  {capability.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="text-xs font-bold tracking-wider text-gray-500 group-hover:text-gray-700">
                    KEY FEATURES:
                  </div>
                  <ul className="space-y-1">
                    {capability.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-400 group-hover:text-gray-600 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 mt-auto">
                  <div className="text-xs font-bold tracking-wider text-gray-500 group-hover:text-gray-700">
                    USE CASES:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {capability.useCases.map((useCase, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 border border-gray-400 group-hover:border-gray-600 text-gray-400 group-hover:text-gray-600 text-xs font-bold tracking-wider"
                      >
                        {useCase}
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

export default Capabilities;
