import React from 'react';
import { ArrowRight, Brain, Code2, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black">
          <div 
            className="absolute inset-0 opacity-10"
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

      {/* Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-white transform rotate-45" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-white" />
        <div className="absolute bottom-40 left-20 w-20 h-1 bg-white" />
        <div className="absolute bottom-20 right-10 w-1 h-20 bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 border border-white text-white text-sm font-bold tracking-wider">
                <Zap className="w-4 h-4 mr-2" />
                TECH INNOVATION LAB
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
              I2FLABS
              <br />
              VIETNAM
            </h1>

            <div className="w-20 h-1 bg-white mb-6" />

            <p className="text-xl md:text-2xl font-bold mb-8 tracking-wide">
              EXPLORING THE FUTURE OF
              <br />
              <span className="text-gray-300">TECHNOLOGY & AI</span>
            </p>

            <p className="text-gray-400 mb-12 max-w-lg leading-relaxed">
              A dynamic team of developers and researchers pushing the boundaries 
              of artificial intelligence and cutting-edge technology solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-black font-bold tracking-wider hover:bg-gray-200 transition-all duration-300 flex items-center justify-center group">
                VIEW PROJECTS
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-white text-white font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                LEARN MORE
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-3 gap-4 h-96">
              <div className="bg-white col-span-1 row-span-2" />
              <div className="border-2 border-white col-span-2 row-span-1 flex items-center justify-center">
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="border-2 border-white col-span-1 row-span-1 flex items-center justify-center">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white col-span-1 row-span-1" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;