import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  onComplete?: () => void;
}

export default function Loading({ onComplete }: LoadingProps) {
  useEffect(() => {
    // Không phát nhạc hay âm thanh, tự động hoàn thành êm ái sau 2.0s
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center select-none overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Logo I2FLabs màu trắng nhỏ vừa phải, không box-shadow */}
      <motion.div
        className="flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: [0, 1, 1, 0.85],
          scale: [0.96, 1.0, 1.0, 0.98],
        }}
        transition={{
          duration: 2.0,
          times: [0, 0.35, 0.85, 1],
          ease: 'easeInOut',
        }}
      >
        <img
          src="/I2FLabs-logo-transparent.png"
          alt="I2FLabs"
          className="w-36 sm:w-44 md:w-52 h-auto object-contain select-none pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}
