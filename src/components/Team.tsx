import React from 'react';
import { Github, Linkedin, Twitter, Mail, Facebook } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "HAI NGUYEN",
      role: "FOUNDER & AI RESEARCHER",
      bio: "Software engineer and AI researcher with a passion for developing innovative solutions that leverage cutting-edge technologies to solve real-world problems.",
      image: "https://res.cloudinary.com/piperflow-cloud/image/upload/v1758967770/z7056244841540_0fbed9b64e6ee849431a5a7788bf2339_kojwpu.jpg",
      social: {
        github: "https://github.com/hainguyen011",
        facebook: "https://www.facebook.com/Haiii191",
        linkedin: "#",
        twitter: "#",
        email: "hainguyen0112358@gmail.com"
      },
      specialties: ["JS", "PYTHON", "MCP", "LLMs", "RAG", "LUA"]
    },
    {
      name: "CHAU QUOC ALIN",
      role: "CO-FOUNDER & SOFTWARE ENGINEER",
      bio: "Backend & AI Engineer skilled in Python, Node.js, JavaScript, and React.js, building stable systems and innovative AI solutions with creativity and determination.",
      image: "https://res.cloudinary.com/piperflow-cloud/image/upload/v1758989702/z7057383029458_90f9d1aba63c10c29f47a18a6ecd032a_xxfmqn.jpg",
      social: {
        github: "https://github.com/alinsbtc",
        facebook: "https://www.facebook.com/chau.quocalin",
        linkedin: "#",
        twitter: "#",
        email: "chauquocalin1@gmail.com"
      },
      specialties: ["JS", "C#", "PYTHON", "NODE", "REACT", "MCP"]
    },
  ];

  return (
    <section id="team" className="py-20 bg-black border-t border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-8 leading-none">
            OUR
            <br />
            TEAM
          </h2>
          <div className="w-20 h-1 bg-white mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl">
            A diverse group of talented individuals united by passion for innovation and cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="border border-white bg-black hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      objectPosition: "10% 28%",
                      padding: "20px"
                    }}
                  />

                  {/* Social Links */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.social.github}
                      className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.facebook}
                      className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border border-white"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 tracking-wider">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-600 font-bold mb-3 text-sm tracking-wider">
                    {member.role}
                  </p>
                  <p className="text-gray-400 group-hover:text-gray-600 mb-4 leading-relaxed text-sm">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 border border-gray-400 group-hover:border-gray-600 text-gray-400 group-hover:text-gray-600 text-xs font-bold tracking-wider"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="border border-white p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 tracking-wider">JOIN OUR TEAM</h3>
            <div className="w-20 h-1 bg-white mx-auto mb-6" />
            <p className="text-gray-300 mb-6">
              We're always looking for talented individuals who share our passion for innovation and technology.
              If you're interested in pushing the boundaries of what's possible, we'd love to hear from you.
            </p>
            <button className="px-8 py-3 bg-white text-black font-bold tracking-wider hover:bg-gray-200 transition-all duration-300">
              VIEW OPEN POSITIONS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
