import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Scale, Heart, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

interface Principle {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const principles: Principle[] = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Responsible AI Development',
    description: 'We develop AI systems with safety, reliability, and societal impact in mind, ensuring our technology benefits humanity.'
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Data Privacy & Security',
    description: 'Protecting user data with industry-leading security practices and strict compliance with privacy regulations.'
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: 'Transparency & Explainability',
    description: 'Building AI systems that are interpretable and transparent, enabling users to understand how decisions are made.'
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: 'Fairness & Bias Mitigation',
    description: 'Actively working to identify and eliminate biases in our AI models to ensure fair and equitable outcomes.'
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Human-Centered Design',
    description: 'Prioritizing human needs and values in our AI development process, keeping people at the center of innovation.'
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: 'Continuous Improvement',
    description: 'Regularly auditing and improving our AI systems to maintain high ethical standards and adapt to evolving best practices.'
  },
];

const AIEthics = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="ethics" className="py-20 bg-black border-t border-white">
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
            ETHICS
          </motion.h2>
          <motion.div className="w-20 h-1 bg-white mb-8" variants={fadeInUp} />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl"
            variants={fadeInUp}
          >
            Our commitment to developing AI responsibly, ethically, and with positive impact on society.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {principles.map((principle, index) => (
            <motion.div 
              key={principle.title} 
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
                  {principle.icon}
                </motion.div>
                
                <h3 className="text-lg font-bold mb-3 tracking-wider">
                  {principle.title}
                </h3>
                
                <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed text-sm">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 border border-white p-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4 tracking-wider text-center">OUR COMMITMENT</h3>
          <div className="w-20 h-1 bg-white mx-auto mb-6" />
          <p className="text-gray-300 leading-relaxed text-center">
            At I2FLabs, we believe that AI should augment human capabilities, not replace human judgment. 
            We are committed to developing AI systems that are safe, beneficial, and aligned with human values. 
            Our ethical framework guides every decision we make, from research to deployment.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIEthics;
