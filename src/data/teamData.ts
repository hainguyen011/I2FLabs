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
    role: "FOUNDER & AI RESEARCHER",
    bio: "Software engineer and AI researcher with a passion for developing innovative solutions that leverage cutting-edge technologies to solve real-world problems.",
    image: "https://res.cloudinary.com/piperflow-cloud/image/upload/v1758967770/z7056244841540_0fbed9b64e6ee849431a5a7788bf2339_kojwpu.jpg",
    social: {
      github: "https://github.com/hainguyen011",
      facebook: "https://www.facebook.com/Haiii191",
      email: "hainguyen0112358@gmail.com"
      // removed empty/hash links
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
      email: "chauquocalin1@gmail.com"
       // removed empty/hash links
    },
    specialties: ["JS", "C#", "PYTHON", "NODE", "REACT", "MCP"]
  },
];
