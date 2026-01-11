import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 100 : next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo with Pulse Animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-white rounded-full"
            style={{ width: 120, height: 120, left: -10, top: -10 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Logo Container */}
          <div className="w-24 h-24 flex items-center justify-center relative">
            <motion.div
              animate={{
                rotate: [0, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
             <img style={{width: '400px', height: '400px', objectFit: 'contain', overflow: 'hidden'}} src="https://res.cloudinary.com/piperflow-cloud/image/upload/v1768104551/logo-removebg-preview_avp5dg.png" alt="I2FLabs" />
            </motion.div>
          </div>
        </motion.div>

        {/* Lab Name */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-4xl font-black tracking-wider mb-2">I2FLABS</h1>
          <p className="text-sm tracking-widest text-gray-400">I2FLABS VIET NAM</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-gray-800 overflow-hidden"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 256 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="text-xs tracking-widest text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            INITIALIZING AI SYSTEMS
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.div>

        {/* Percentage */}
        <motion.div
          className="text-2xl font-bold tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
    </motion.div>
  );
};

export default Loading;
