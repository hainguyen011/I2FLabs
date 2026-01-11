import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Lightbulb, Zap, Users, Target } from 'lucide-react';
import { useScrollAnimation, useCounter } from '../hooks/useScrollAnimation';
import { fadeInUp, fadeInLeft, staggerContainer, staggerItem } from '../animations/variants';

const About = () => {
  const { ref: sectionRef, isInView: sectionInView } = useScrollAnimation();
  const { ref: statsRef, isInView: statsInView } = useScrollAnimation({ threshold: 0.3 });
  
  const projectCount = useCounter(10, 2000, statsInView);
  const yearsCount = useCounter(3, 2000, statsInView);

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI RESEARCH",
      description: "Exploring machine learning, neural networks, and artificial intelligence to solve complex problems."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "SOFTWARE DEV",
      description: "Building robust, scalable applications using modern technologies and best practices."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "GOAL-DRIVEN",
      description: "Focused on delivering impactful results that make a difference in the tech landscape."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "INNOVATION",
      description: "Constantly pushing boundaries and experimenting with emerging technologies."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "RAPID PROTO",
      description: "Quick iteration and testing of ideas to bring concepts to life efficiently."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "COLLABORATION",
      description: "Working together to combine diverse skills and perspectives for better solutions."
    },

  ];

  return (
    <section id="about" className="py-20 bg-black border-t border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20"
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInLeft}>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none">
              ABOUT
              <br />
              I2FLABS VIETNAM
            </h2>
            <div className="w-20 h-1 bg-white mb-8" />
          </motion.div>

          <motion.div className="space-y-6" variants={staggerItem}>
            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              variants={fadeInUp}
            >
              We are a passionate team of young developers and researchers based in Vietnam,
              dedicated to exploring the frontiers of technology and artificial intelligence.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-300 leading-relaxed"
              variants={fadeInUp}
            >
              At I2FLABS Vietnam, we believe in the power of curiosity and innovation. Our mission is to
              push the boundaries of what's possible with technology, conducting research and developing
              solutions that shape the future.
            </motion.p>
            <motion.div 
              ref={statsRef}
              className="grid grid-cols-2 gap-8 pt-8"
              variants={staggerContainer}
            >
              <motion.div 
                className="border border-white p-4"
                variants={fadeInUp}
                whileHover={{ borderColor: '#ffffff' }}
              >
                <div className="text-3xl font-black text-white mb-2">{projectCount}+</div>
                <div className="text-gray-300 font-bold tracking-wider">PROJECTS</div>
              </motion.div>
              <motion.div 
                className="border border-white p-4"
                variants={fadeInUp}
                whileHover={{ borderColor: '#ffffff' }}
              >
                <div className="text-3xl font-black text-white mb-2">{yearsCount}+</div>
                <div className="text-gray-300 font-bold tracking-wider">YEARS EXP</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="group"
              variants={staggerItem}
              custom={index}
            >
              <motion.div 
                className="border border-white p-6 hover:bg-white hover:text-black transition-all duration-300 h-full"
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="mb-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 tracking-wider">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;