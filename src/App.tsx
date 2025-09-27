import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Team from './components/Team';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-black text-white min-h-screen font-mono">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Team />
      <Contact />
    </div>
  );
}

export default App;