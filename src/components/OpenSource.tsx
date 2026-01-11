import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';
import { openSourceProjects } from '../data/openSourceData';

const OpenSource = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="opensource" className="py-20 bg-black border-t border-white">
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
            OPEN
            <br />
            SOURCE
          </motion.h2>
          <motion.div className="w-20 h-1 bg-white mb-8" variants={fadeInUp} />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl"
            variants={fadeInUp}
          >
            Contributing to the open source community and sharing our innovations with developers worldwide.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {openSourceProjects.map((repo, index) => (
            <motion.div 
              key={repo.name} 
              className="group"
              variants={staggerItem}
              custom={index}
            >
              <div className="border border-white bg-black hover:bg-white hover:text-black transition-all duration-300 h-full flex flex-col p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Github className="w-6 h-6" />
                    <h3 className="text-xl font-bold tracking-wider">
                      {repo.name}
                    </h3>
                  </div>
                  <motion.a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-white hover:bg-black hover:text-white group-hover:bg-black group-hover:text-white transition-colors"
                    whileHover={{ rotate: 5 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </div>

                <p className="text-gray-400 group-hover:text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                  {repo.description}
                </p>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400 group-hover:text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                    <span>{repo.language}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{repo.stars}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {repo.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 border border-gray-400 group-hover:border-gray-600 text-gray-400 group-hover:text-gray-600 text-xs font-bold tracking-wider"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="https://github.com/hainguyen011"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 border border-white text-white font-bold tracking-wider transition-all duration-300 hover:bg-white hover:text-black"
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-5 h-5" />
            <span>VIEW ALL ON GITHUB</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default OpenSource;
