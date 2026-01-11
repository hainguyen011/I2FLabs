import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Code2, Zap } from 'lucide-react';
import { fadeInUp, fadeInLeft, staggerContainer, staggerItem, float } from '../animations/variants';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black">
          <motion.div 
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `
                linear-gradient(white 1px, transparent 1px),
                linear-gradient(90deg, white 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-16 h-16 border-2 border-white transform rotate-45"
          variants={float}
          initial="initial"
          animate="animate"
        />
        <motion.div 
          className="absolute top-40 right-20 w-12 h-12 bg-white"
          variants={float}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.5 }}
        />
        <motion.div 
          className="absolute bottom-40 left-20 w-20 h-1 bg-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-1 h-20 bg-white"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-8" variants={staggerItem}>
              <motion.div 
                className="inline-flex items-center px-4 py-2 border border-white text-white text-sm font-bold tracking-wider"
                whileTap={{ scale: 0.98 }}
              >
                <Zap className="w-4 h-4 mr-2" />
                TECH INNOVATION LAB
              </motion.div>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-black mb-6 leading-none"
              variants={staggerItem}
            >
              I2FLABS
              <br />
              VIETNAM
            </motion.h1>

            <motion.div 
              className="w-20 h-1 bg-white mb-6"
              variants={staggerItem}
            />

            <motion.p 
              className="text-xl md:text-2xl font-bold mb-8 tracking-wide"
              variants={staggerItem}
            >
              EXPLORING THE FUTURE OF
              <br />
              <span className="text-gray-300">TECHNOLOGY & AI</span>
            </motion.p>

            <motion.p 
              className="text-gray-400 mb-12 max-w-lg leading-relaxed"
              variants={staggerItem}
            >
              A dynamic team of developers and researchers pushing the boundaries 
              of artificial intelligence and cutting-edge technology solutions.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={staggerItem}
            >
              <motion.button 
                className="px-8 py-4 bg-white text-black font-bold tracking-wider transition-all duration-300 flex items-center justify-center group"
                whileTap={{ scale: 0.98 }}
              >
                VIEW PROJECTS
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button 
                className="px-8 py-4 border border-white text-white font-bold tracking-wider transition-all duration-300"
                whileHover={{ backgroundColor: 'white', color: 'black' }}
                whileTap={{ scale: 0.98 }}
              >
                LEARN MORE
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-3 gap-4 h-96">
              <motion.div 
                className="bg-white col-span-1 row-span-2"
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="border-2 border-white col-span-2 row-span-1 flex items-center justify-center"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <Brain className="w-12 h-12 text-white" />
              </motion.div>
              <motion.div 
                className="border-2 border-white col-span-1 row-span-1 flex items-center justify-center"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <Code2 className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div 
                className="bg-white col-span-1 row-span-1"
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;