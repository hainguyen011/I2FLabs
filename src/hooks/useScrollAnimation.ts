import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface UseScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, triggerOnce = true } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
  });

  return { ref, isInView };
};

// Counter animation hook
export const useCounter = (end: number, duration: number = 2000, isInView: boolean = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return count;
};
