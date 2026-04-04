import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const sections = t('footer.columns', { returnObjects: true }) as {
    title: string;
    links: string[];
  }[];

  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-24">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold tracking-tighter mb-6">I2FLABS</h3>
            <div className="flex gap-4">
               <motion.a 
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
               >
                  <Github className="w-5 h-5" />
               </motion.a>
               <motion.a 
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
               >
                  <Twitter className="w-5 h-5" />
               </motion.a>
               <motion.a 
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
               >
                  <Linkedin className="w-5 h-5" />
               </motion.a>
               <motion.a 
                href="#"
                className="text-gray-500 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
               >
                  <Mail className="w-5 h-5" />
               </motion.a>
            </div>
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8">
          <p className="text-xs text-gray-600 mb-4 md:mb-0">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">{t('footer.status')}</span>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
            <h1 className="text-[15vw] font-black tracking-tighter text-white/[0.02] leading-none select-none">
                I2FLABS
            </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
