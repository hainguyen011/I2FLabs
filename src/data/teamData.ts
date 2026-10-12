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
    role: "FOUNDER & AI ARCHITECT",
    bio: "Pioneering deterministic agentic kernels, distributed memory graphs, and high-performance neural runtimes.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/v1758967770/z7056244841540_0fbed9b64e6ee849431a5a7788bf2339_kojwpu.jpg",
    social: {
      github: "https://github.com/hainguyen011",
      facebook: "https://www.facebook.com/Haiii191",
      email: "hainguyen0112358@gmail.com",
    },
    specialties: ["AGENT_OS", "MCP", "RAG", "LLM_KERNELS", "PYTHON"],
  },
  {
    name: "CHAU QUOC ALIN",
    role: "CO-FOUNDER & DISTRIBUTED SYSTEMS",
    bio: "Engineering high-throughput asynchronous backends, fault-tolerant consensus meshes, and local-first runtimes.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/v1758989702/z7057383029458_90f9d1aba63c10c29f47a18a6ecd032a_xxfmqn.jpg",
    social: {
      github: "https://github.com/alinsbtc",
      facebook: "https://www.facebook.com/chau.quocalin",
      email: "chauquocalin1@gmail.com",
    },
    specialties: ["DISTRIBUTED_SYS", "PYTHON", "NODE", "REACT", "MCP"],
  },
  {
    name: "ANH TUAN",
    role: "SYSTEM ARCHITECT & RUNTIME",
    bio: "Architecting resilient native execution environments, memory virtualization, and low-latency agent coordination.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775354481/ba388676-ab37-403e-b8f8-bc6ed1bacf52_vcl1qm.jpg",
    social: {
      github: "https://github.com/Lemon2591",
      facebook: "https://www.facebook.com/lemon.25.9.1",
      email: "anhqt.dev@gmail.com"
    },
    specialties: ["KERNEL_ARCH", "C#", "PYTHON", "SYSTEMS", "MCP"],
  },
  {
    name: "HAO PHAM",
    role: "BACKEND & AGENT PIPELINES",
    bio: "Designing real-time data pipelines, formal telemetry streaming, and automated evaluation harnesses.",
    image:
      "https://res.cloudinary.com/piperflow-cloud/image/upload/q_auto/f_auto/v1775360056/4a2d4ff9-8c52-4abb-a8cf-e7b4a69aa637_rbarfn.jpg",
    social: {
      github: "https://github.com/haofphm",
      facebook: "https://www.facebook.com/PFDaiHao",
      email: "phamdaihao.dev@gmail.com",
    },
    specialties: ["BACKEND_INFRA", "PIPELINES", "INTEGRATION", "NODE"],
  },
  {
    name: "AEVUM OMEGA CORE",
    role: "AUTONOMOUS SYSTEM KERNEL",
    bio: "Deterministic neuromorphic substrate driving decentralized swarm orchestration and formal boundary verification.",
    image:
      "/I2FLabs-logo-new.png",
    social: {
      github: "https://github.com/hainguyen011/Aevum-OS",
      facebook: "",
      email: "",
    },
    specialties: ["RUST", "WASM", "P2P_MESH", "LOCAL_FIRST", "120HZ_OMEGA"],
  },
];
