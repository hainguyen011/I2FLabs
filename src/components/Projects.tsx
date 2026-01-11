import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ExternalLink, Github, Brain, Code, Search } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { ref, isInView } = useScrollAnimation();

  const projects = [
    {
      id: 1,
      title: "PIPERFLOW PLATFORM",
      description: "PiperFlow is a Multi-Agent Platform designed to help businesses automate workflows, enhance decision-making, and improve user interaction.",
      category: "ai",
      tech: ["PYTHON","NODE", "LLMs", "RAG", "MCP", "AUTOMATION"],
      image: "https://imageio.forbes.com/specials-images/imageserve/679ba9e2635dd6b08cc629f3/Artificial-Intelligence/960x0.png?format=png&width=960",
      github: "#",
      demo: "#"
    },
  ];

  const filters = [
    { id: 'all', name: 'ALL', icon: <Filter className="w-4 h-4" /> },
    { id: 'ai', name: 'AI & ML', icon: <Brain className="w-4 h-4" /> },
    { id: 'software', name: 'SOFTWARE', icon: <Code className="w-4 h-4" /> },
    { id: 'research', name: 'RESEARCH', icon: <Search className="w-4 h-4" /> },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-black border-t border-white">
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
            OUR
            <br />
            PROJECTS
          </motion.h2>
          <motion.div className="w-20 h-1 bg-white mb-8" variants={fadeInUp} />
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl"
            variants={fadeInUp}
          >
            Explore our latest innovations in AI, software development, and cutting-edge research projects.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap gap-4 mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-bold tracking-wider transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-white text-black'
                  : 'border border-white text-white hover:bg-white hover:text-black'
              }`}
              variants={staggerItem}
              whileTap={{ scale: 0.98 }}
            >
              {filter.icon}
              <span>{filter.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 flex-center"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id} 
                className="group"
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="border border-white bg-black hover:bg-white hover:text-black transition-all duration-300 h-full flex flex-col"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-58 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className="absolute top-4 right-4 flex space-x-2"
                      initial={{ opacity: 0, x: 20 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.a
                        href={project.github}
                        className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                        whileHover={{ rotate: 5 }}
                      >
                        <Github className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                        whileHover={{ rotate: -5 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </motion.div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold mb-3 tracking-wider">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                      {project.description}
                    </p>

                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={staggerContainer}
                      initial="hidden"
                      whileHover="visible"
                    >
                      {project.tech.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-2 py-1 border border-gray-400 group-hover:border-gray-600 text-gray-400 group-hover:text-gray-600 text-xs font-bold tracking-wider"
                          variants={staggerItem}
                          custom={index}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            className="px-8 py-4 border border-white text-white font-bold tracking-wider transition-all duration-300"
            whileHover={{ backgroundColor: 'white', color: 'black' }}
            whileTap={{ scale: 0.98 }}
          >
            VIEW MORE PROJECTS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;