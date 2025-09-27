import React, { useState } from 'react';
import { Filter, ExternalLink, Github, Brain, Code, Search } from 'lucide-react';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

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
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none">
            OUR
            <br />
            PROJECTS
          </h2>
          <div className="w-20 h-1 bg-white mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl">
            Explore our latest innovations in AI, software development, and cutting-edge research projects.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 font-bold tracking-wider transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-white text-black'
                  : 'border border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              {filter.icon}
              <span>{filter.name}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8  flex-center">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group">
              <div className="border border-white bg-black hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demo}
                      className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 tracking-wider">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-600 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 border border-gray-400 group-hover:border-gray-600 text-gray-400 group-hover:text-gray-600 text-xs font-bold tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 border border-white text-white font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300">
            VIEW MORE PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;