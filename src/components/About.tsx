import React from 'react';
import { Brain, Code, Lightbulb, Zap, Users, Target } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI RESEARCH",
      description: "Exploring machine learning, neural networks, and artificial intelligence to solve complex problems."
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "SOFTWARE DEV",
      description: "Building robust, scalable applications using modern technologies and best practices."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "GOAL-DRIVEN",
      description: "Focused on delivering impactful results that make a difference in the tech landscape."
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "INNOVATION",
      description: "Constantly pushing boundaries and experimenting with emerging technologies."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "RAPID PROTO",
      description: "Quick iteration and testing of ideas to bring concepts to life efficiently."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "COLLABORATION",
      description: "Working together to combine diverse skills and perspectives for better solutions."
    },

  ];

  return (
    <section id="about" className="py-20 bg-black border-t border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none">
              ABOUT
              <br />
              I2FLABS VIETNAM
            </h2>
            <div className="w-20 h-1 bg-white mb-8" />
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              We are a passionate team of young developers and researchers based in Vietnam,
              dedicated to exploring the frontiers of technology and artificial intelligence.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              At I2FLABS Vietnam, we believe in the power of curiosity and innovation. Our mission is to
              push the boundaries of what's possible with technology, conducting research and developing
              solutions that shape the future.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="border border-white p-4">
                <div className="text-3xl font-black text-white mb-2">1+</div>
                <div className="text-gray-300 font-bold tracking-wider">PROJECTS</div>
              </div>
              <div className="border border-white p-4">
                <div className="text-3xl font-black text-white mb-2">3+</div>
                <div className="text-gray-300 font-bold tracking-wider">YEARS EXP</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="border border-white p-6 hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-wider">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;