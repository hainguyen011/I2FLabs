import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="fixed top-8 left-8 z-50 flex items-center space-x-4 pointer-events-auto"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div 
        className="flex items-center space-x-3 cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center overflow-hidden bg-white/5 backdrop-blur-xl rounded-lg border border-white/10 p-1 group-hover:border-cyan-500/50 transition-colors duration-500">
          <img className='w-full h-full' style={{objectFit: "contain", transform: "scale(1.2)"}} src='https://res.cloudinary.com/piperflow-cloud/image/upload/v1768104551/logo-removebg-preview_avp5dg.png' alt='logo'/>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-white">
            {t('nav.brand')}
          </span>
          <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">
            {t('nav.country')}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Navigation;