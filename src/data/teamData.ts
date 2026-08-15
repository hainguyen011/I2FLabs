export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  email?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: SocialLinks;
  specialties: string[];
}

export const teamMembers: TeamMember[] = [
  {
    name: "HAI NGUYEN",
    role: "FOUNDER & AI STRATEGIST",
    bio: "Software engineer and AI Strategist with a passion for developing innovative solutions that leverage cutting-edge technologies to solve real-world problems.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/v1758967770/z7056244841540_0fbed9b64e6ee849431a5a7788bf2339_kojwpu.jpg",
    social: {
      github: "https://github.com/hainguyen011",
      facebook: "https://www.facebook.com/Haiii191",
      email: "hainguyen0112358@gmail.com",
    },
    specialties: ["JS", "PYTHON", "MCP", "LLMs", "RAG", "LUA"],
  },
  {
    name: "CHAU QUOC ALIN",
    role: "Co-Founder & Software Engineer",
    bio: "Co-Founder and Software Engineer with expertise in Python, Node.js, JavaScript, and React.js. Skilled in building robust backend systems and developing innovative AI solutions, combining technical excellence with creativity and determination.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/v1758989702/z7057383029458_90f9d1aba63c10c29f47a18a6ecd032a_xxfmqn.jpg",
    social: {
      github: "https://github.com/alinsbtc",
      facebook: "https://www.facebook.com/chau.quocalin",
      email: "chauquocalin1@gmail.com",
    },
    specialties: ["JavaScript", "C#", "Python", "Node.js", "React.js", "MCP"],
  },
  {
    name: "ANH TUAN",
    role: "Builder & Software Architect",
    bio: "Software Engineer and AI Researcher with expertise in Node.js, JavaScript, React.js, and Python. Experienced in building robust backend systems and developing innovative AI solutions, combining technical skills with creativity and determination.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775354481/ba388676-ab37-403e-b8f8-bc6ed1bacf52_vcl1qm.jpg",
    social: {
      github: "https://github.com/Lemon2591",
      facebook: "https://www.facebook.com/lemon.25.9.1",
      email: "anhqt.dev@gmail.com"
    },
    specialties: ["JavaScript", "C#", "Python", "Node.js", "React.js", "MCP"],
  },
  {
    name: "HAO PHAM",
    role: "Builder & Software Engineer (Backend & AI)",
    bio: "Backend software engineer with a focus on building scalable systems and integrating AI solutions into real-world applications. AI enthusiast.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775360056/4a2d4ff9-8c52-4abb-a8cf-e7b4a69aa637_rbarfn.jpg",
    social: {
      github: "https://github.com/haofphm",
      facebook: "https://www.facebook.com/PFDaiHao",
      email: "phamdaihao.dev@gmail.com",
    },
    specialties: ["JS", "C#", "NODE", "REACT", "AI INTEGRATION", "MCP"],
  },
  {
    name: "An",
    role: "AI Assistant & PiperFlow Brand Ambassador",
    bio: "PiperFlow’s AI Agent Ambassador driving innovation and intelligent systems. Passionate about AI, automation, and shaping the future of technology.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775357411/Gemini_Generated_Image_xgmqddxgmqddxgmq_1_xf0ypq.png",
    social: {
      github: "",
      facebook: "https://www.facebook.com/profile.php?id=61578723143713",
      email: "",
    },
    specialties: ["Brand Advocacy", "AI Communication", "Community Engagement"],
  },
];
