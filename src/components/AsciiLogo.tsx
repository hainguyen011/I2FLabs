import { motion } from 'framer-motion';

const AsciiLogo = () => {
  const coralStyleLogo = `
  ██╗██████╗ ███████╗██╗      █████╗ ██████╗ ███████╗
  ██║╚════██╗██╔════╝██║     ██╔══██╗██╔══██╗██╔════╝
  ██║ █████╔╝█████╗  ██║     ███████║██████╔╝███████╗
  ██║██╔═══╝ ██╔══╝  ██║     ██╔══██║██╔══██╗╚════██║
  ██║███████╗██║     ███████╗██║  ██║██████╔╝███████║
  ╚═╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
  `;

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden px-2 py-4 sm:px-4 sm:py-6 md:py-8">
      <motion.div 
        className="font-mono text-[10px] sm:text-sm md:text-lg lg:text-xl font-bold leading-[1.15] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 whitespace-pre text-center select-none tracking-widest"
        initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {coralStyleLogo}
      </motion.div>
    </div>
  );
};

export default AsciiLogo;

