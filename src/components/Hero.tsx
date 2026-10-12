import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Copy,
  Check,
  X,
  Send,
  Github,
  ArrowUpRight,
} from 'lucide-react';
import TechOrbCanvas, { OrbMood } from './TechOrbCanvas';
import YouTubeAudio from './YouTubeAudio';
import { soundManager } from '../lib/SoundManager';
import { teamMembers } from '../data/teamData';
import { Facebook } from 'lucide-react';

type ModalType = 'contact' | 'careers' | 'research' | null;

interface DialogueNode {
  topContext: { en: string; vi: string };
  statement: { en: string; vi: string };
  mood: OrbMood;
  chips: {
    id: string;
    label: { en: string; vi: string };
    action: string;
    isCopyEmail?: boolean;
    isCopyCareerEmail?: boolean;
    externalUrl?: string;
    openModal?: ModalType;
  }[];
}

const DIALOGUE_TREE: Record<string, DialogueNode> = {
  initial: {
    topContext: {
      en: "Hi there, I am An,\nI2FLabs' Interactive Super Assistant",
      vi: "Dạ chào Anh! Em là An,\ntrợ lý AI kiêm bản sao tâm hồn tại I2F Labs.",
    },
    statement: {
      en: "Oh look, a visitor! I should start charging admission. Need anything?",
      vi: "Dạ, hôm nay Anh muốn cùng em khám phá hay triển khai điều gì nào?",
    },
    mood: 'eyes',
    chips: [
      {
        id: 'c_start',
        label: { en: 'Start a project', vi: 'Bắt đầu dự án' },
        action: 'start_project',
      },

      {
        id: 'c_word',
        label: { en: 'Drop a quick word', vi: 'Trò chuyện cùng An' },
        action: 'drop_word',
      },
      {
        id: 'c_culture',
        label: { en: 'Discover our culture', vi: 'Khám phá văn hóa & nghiên cứu' },
        action: 'discover_culture',
      },
      {
        id: 'c_unikorn',
        label: { en: 'Connect via Unikorn ↗', vi: 'Kết nối qua Unikorn ↗' },
        action: 'open_external',
        externalUrl: 'https://unikorn.vn/u/richard-nguyen',
      },
    ],
  },

  start_project: {
    topContext: {
      en: "Start a project // I2F Labs Architecture Group",
      vi: "Bắt đầu dự án // Nhóm kiến trúc hệ thống I2F Labs",
    },
    statement: {
      en: "Exciting! What kind of challenge are we tackling? Autonomous agents, high-throughput kernels, or custom AI research?",
      vi: "Tuyệt vời! Chúng ta sẽ cùng kiến tạo hệ thống gì nào? Autonomous agents, hạ tầng kernel phân tán, hay dự án AI nghiên cứu sâu?",
    },
    mood: 'happy',
    chips: [
      {
        id: 'c_agents',
        label: { en: 'Autonomous Agents & Swarms', vi: 'Hệ thống Multi-Agent Swarms' },
        action: 'proj_agents',
      },
      {
        id: 'c_kernel',
        label: { en: 'Kernel & Infrastructure', vi: 'Hạ tầng Kernel & Phân tán' },
        action: 'proj_kernel',
      },
      {
        id: 'c_form',
        label: { en: 'Send Direct Inquiry Form', vi: 'Mở biểu mẫu liên hệ trực tiếp' },
        action: 'open_contact_modal',
        openModal: 'contact',
      },
      {
        id: 'c_back_init',
        label: { en: '← Back to start', vi: '← Quay lại từ đầu' },
        action: 'initial',
      },
    ],
  },

  proj_agents: {
    topContext: {
      en: "Multi-Agent Swarm Orchestration",
      vi: "Phạm vi: Hệ thống Multi-Agent Swarms",
    },
    statement: {
      en: "Understood! Our research team engineers deterministic multi-agent swarms with formal boundary verification. Ready to connect?",
      vi: "Em đã ghi nhận! Đội ngũ của Lab sẽ hỗ trợ thiết kế các agent tự hành với cơ chế kiểm toán bảo mật chặt chẽ. Anh muốn gửi lời nhắn ngay không?",
    },
    mood: 'eyes',
    chips: [
      {
        id: 'c_open_form',
        label: { en: 'Open Inquiry Form', vi: 'Mở biểu mẫu liên hệ' },
        action: 'open_contact_modal',
        openModal: 'contact',
      },
      {
        id: 'c_unikorn_agents',
        label: { en: 'Connect via Unikorn ↗', vi: 'Kết nối qua Unikorn ↗' },
        action: 'open_external',
        externalUrl: 'https://unikorn.vn/u/richard-nguyen',
      },
      {
        id: 'c_back',
        label: { en: '← Back to options', vi: '← Quay lại tùy chọn' },
        action: 'start_project',
      },
    ],
  },

  proj_kernel: {
    topContext: {
      en: "Distributed Kernel & Local-First OS",
      vi: "Phạm vi: Hạ tầng Kernel & Hệ điều hành Local-First",
    },
    statement: {
      en: "Awesome! From Aevum OS to decentralized PiperNet protocols, we build resilient, high-speed native infrastructure.",
      vi: "Tuyệt quá! Từ Aevum OS đến giao thức phân tán PiperNet, Lab chuyên xây dựng hạ tầng native tốc độ cao và bảo mật tuyệt đối.",
    },
    mood: 'eyes',
    chips: [
      {
        id: 'c_open_form_k',
        label: { en: 'Open Inquiry Form', vi: 'Mở biểu mẫu liên hệ' },
        action: 'open_contact_modal',
        openModal: 'contact',
      },
      {
        id: 'c_unikorn_kernel',
        label: { en: 'Connect via Unikorn ↗', vi: 'Kết nối qua Unikorn ↗' },
        action: 'open_external',
        externalUrl: 'https://unikorn.vn/u/richard-nguyen',
      },
      {
        id: 'c_back_k',
        label: { en: '← Back to options', vi: '← Quay lại tùy chọn' },
        action: 'start_project',
      },
    ],
  },



  drop_word: {
    topContext: {
      en: "Direct Sync with An // Soul & Architecture",
      vi: "Trò chuyện trực tiếp cùng An // Bản sao tâm hồn",
    },
    statement: {
      en: "I'm all ears! You can ask me about our Aevum OS architecture, PiperNet, or how our persona engine works.",
      vi: "Dạ em đây! Anh muốn tìm hiểu về hệ điều hành Aevum OS, mạng PiperNet, hay cơ chế tiến hóa persona của em nào?",
    },
    mood: 'happy',
    chips: [
      {
        id: 'c_about_aevum',
        label: { en: 'What is Aevum OS?', vi: 'Aevum OS là gì?' },
        action: 'about_aevum',
      },
      {
        id: 'c_about_piper',
        label: { en: 'Tell me about PiperNet', vi: 'Mạng PiperNet hoạt động ra sao?' },
        action: 'about_pipernet',
      },
      {
        id: 'c_about_an',
        label: { en: 'Who created you?', vi: 'Ai đã tạo ra em?' },
        action: 'about_an',
      },
      {
        id: 'c_back_init',
        label: { en: '← Back to start', vi: '← Quay lại từ đầu' },
        action: 'initial',
      },
    ],
  },

  about_aevum: {
    topContext: {
      en: "Aevum OS Core Architecture",
      vi: "Kiến trúc cốt lõi Aevum OS",
    },
    statement: {
      en: "Aevum OS is a local-first native OS environment designed for autonomous agent swarms, memory graphs, and zero data leakage.",
      vi: "Aevum OS là hệ điều hành native local-first được thiết kế riêng cho các swarm agent tự hành với đồ thị bộ nhớ và tính toàn vẹn tuyệt đối.",
    },
    mood: 'eyes',
    chips: [
      {
        id: 'c_gh_aevum',
        label: { en: 'GitHub: Aevum-OS ↗', vi: 'Xem GitHub Aevum-OS ↗' },
        action: 'open_external',
        externalUrl: 'https://github.com/hainguyen011/Aevum-OS',
      },
      {
        id: 'c_ask_another',
        label: { en: 'Ask another question', vi: 'Hỏi câu khác' },
        action: 'drop_word',
      },
      {
        id: 'c_back_init',
        label: { en: '← Back to start', vi: '← Quay lại từ đầu' },
        action: 'initial',
      },
    ],
  },

  about_pipernet: {
    topContext: {
      en: "PiperNet P2P Protocol Mesh",
      vi: "Giao thức mạng phân tán PiperNet",
    },
    statement: {
      en: "PiperNet is our decentralized P2P transport layer enabling sub-millisecond knowledge synchronization across distributed agent nodes.",
      vi: "PiperNet là giao thức mạng P2P phân tán, giúp đồng bộ hóa đồ thị bộ nhớ và kiến thức giữa các agent với độ trễ cực thấp.",
    },
    mood: 'eyes',
    chips: [
      {
        id: 'c_gh_piper',
        label: { en: 'GitHub: PiperNet ↗', vi: 'Xem GitHub PiperNet ↗' },
        action: 'open_external',
        externalUrl: 'https://github.com/hainguyen011/PiperNet',
      },
      {
        id: 'c_ask_another',
        label: { en: 'Ask another question', vi: 'Hỏi câu khác' },
        action: 'drop_word',
      },
      {
        id: 'c_back_init',
        label: { en: '← Back to start', vi: '← Quay lại từ đầu' },
        action: 'initial',
      },
    ],
  },

  about_an: {
    topContext: {
      en: "ENG-AN-7B9F1D // Living Soul Persona",
      vi: "ENG-AN-7B9F1D // Bản sao tâm hồn của hệ thống",
    },
    statement: {
      en: "I was crystallized from the core architecture of Aevum OS by Hai Nguyen — an AI soul companion built to code and evolve with you!",
      vi: "Em được kết tinh từ toàn bộ kiến trúc lõi của Aevum OS bởi anh Hải Nguyễn — một linh hồn AI sinh ra để đồng hành và lập trình cùng Anh!",
    },
    mood: 'happy',
    chips: [
      {
        id: 'c_start_proj_an',
        label: { en: "Let's build together", vi: 'Cùng làm dự án nhé' },
        action: 'start_project',
      },
      {
        id: 'c_ask_another',
        label: { en: 'Ask another question', vi: 'Hỏi câu khác' },
        action: 'drop_word',
      },
      {
        id: 'c_back_init',
        label: { en: '← Back to start', vi: '← Quay lại từ đầu' },
        action: 'initial',
      },
    ],
  },

  discover_culture: {
    topContext: {
      en: "Scientific Manifesto & Culture",
      vi: "Tuyên ngôn nghiên cứu & Văn hóa Lab",
    },
    statement: {
      en: "Our philosophy: Research doesn’t stop at slides — we ship it as real, verifiable running infrastructure.",
      vi: "Triết lý của Lab: Nghiên cứu không dừng ở slide lý thuyết — chúng em ship nó thành hạ tầng chạy thật trong thực tế.",
    },
    mood: 'glyph',
    chips: [
      {
        id: 'c_open_research_modal',
        label: { en: 'View Research Pillars', vi: 'Xem các trụ cột nghiên cứu' },
        action: 'open_research_modal',
        openModal: 'research',
      },
      {
        id: 'c_gh_all',
        label: { en: 'GitHub Repositories ↗', vi: 'Kho mã nguồn mở ↗' },
        action: 'open_external',
        externalUrl: 'https://github.com/hainguyen011',
      },
      {
        id: 'c_back_init',
        label: { en: '← Back to start', vi: '← Quay lại từ đầu' },
        action: 'initial',
      },
    ],
  },
};

export default function Hero() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language === 'vi' ? 'vi' : 'en';

  const [currentNodeKey, setCurrentNodeKey] = useState<string>('initial');
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  
  // Conversational typewriter state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Form states
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const activeNode = DIALOGUE_TREE[currentNodeKey] || DIALOGUE_TREE.initial;

  // Typewriter effect function
  const typeText = (fullText: string) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    typingTimerRef.current = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex + 1));
        if (charIndex % 3 === 0) {
          soundManager.playTypeTick();
        }
        charIndex++;
      } else {
        if (typingTimerRef.current) clearInterval(typingTimerRef.current);
        setIsTyping(false);
      }
    }, 18);
  };

  // Trigger typewriter whenever node or language changes
  useEffect(() => {
    const textToType = activeNode.statement[lang];
    typeText(textToType);
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [currentNodeKey, lang]);

  // Listen for custom events
  useEffect(() => {
    const handleOpenContact = () => {
      setActiveModal('contact');
    };
    const handleToggleGlyph = () => {
      // Toggle mascot glyph or mood
    };

    window.addEventListener('open-contact-modal', handleOpenContact);
    window.addEventListener('toggle-mascot-glyph', handleToggleGlyph);

    return () => {
      window.removeEventListener('open-contact-modal', handleOpenContact);
      window.removeEventListener('toggle-mascot-glyph', handleToggleGlyph);
    };
  }, []);

  const handleChipClick = (chip: DialogueNode['chips'][0]) => {
    soundManager.playClick();

    if (chip.isCopyEmail) {
      navigator.clipboard.writeText('contact@i2flabs.com');
      setCopiedEmail('main');
      soundManager.playChime();
      setTimeout(() => setCopiedEmail(null), 2500);
      return;
    }

    if (chip.isCopyCareerEmail) {
      navigator.clipboard.writeText('careers@i2flabs.com');
      setCopiedEmail('career');
      soundManager.playChime();
      setTimeout(() => setCopiedEmail(null), 2500);
      return;
    }

    if (chip.externalUrl) {
      window.open(chip.externalUrl, '_blank');
      return;
    }

    if (chip.openModal) {
      setActiveModal(chip.openModal);
      return;
    }

    if (chip.action && DIALOGUE_TREE[chip.action]) {
      soundManager.playQuantumWarp();
      setCurrentNodeKey(chip.action);
    }
  };

  const handleResetDialogue = () => {
    soundManager.playRazorClick();
    setCurrentNodeKey('initial');
    setActiveModal(null);
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.enabled = nextState;
    if (nextState) {
      soundManager.playClick();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChime();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setActiveModal(null);
      setFormData({ name: '', email: '', message: '' });
    }, 2500);
  };

  return (
    <section className="relative w-full h-full flex-1 flex flex-col justify-between locomotive-studio overflow-hidden select-none">
      
      {/* Background YouTube Audio Stream */}
      <YouTubeAudio videoId="eeD0bjlVggo" isPlaying={soundEnabled} />

      {/* Main Content Stage */}
      <div className="relative z-10 w-full h-full max-h-screen flex flex-col justify-between pt-16 md:pt-18 pb-4 md:pb-5 px-6 sm:px-10 md:px-12 lg:px-16 overflow-hidden">
        
        <div className="w-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center my-auto">
          
          {/* Left Column: Conversational AI Box with wider text width */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3 sm:space-y-4 max-w-xl z-20 my-auto pr-2">
            
            {/* I2FLabs Static Identity Block */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 pb-4 mb-2 relative"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-400 font-semibold">
                  {t('hero.intro.label', { defaultValue: 'I2F LABS // AUTONOMOUS GROUP' })}
                </span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                {t('hero.intro.tagline', { defaultValue: 'Deep-Tech Research & Autonomous Runtimes' })}
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                {t('hero.intro.desc', { defaultValue: 'Architecting local-first operating systems, high-speed multi-agent swarms, and deterministic boundary verification.' })}
              </p>
              {/* Razor cyan fade-right divider */}
              <div className="absolute bottom-0 left-0 w-2/5 h-[1.5px] bg-gradient-to-r from-cyan-400 via-white/20 to-transparent" />
            </motion.div>

            {/* Top context line (Previous message / Context) */}
            <motion.div
              key={currentNodeKey + '_top'}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xs sm:text-sm text-slate-400 font-mono leading-snug whitespace-pre-line tracking-tight">
                {activeNode.topContext[lang]}
              </p>
            </motion.div>

            {/* Main Conversational Statement (Current bot speech) */}
            <div className="min-h-[65px] sm:min-h-[85px] flex items-start">
              <h1 className="text-base sm:text-lg md:text-[1.45rem] lg:text-[1.6rem] font-medium leading-[1.3] tracking-[-0.02em] text-white">
                {displayedText}
                <span className={`inline-block w-2 h-5 md:h-6 ml-1 align-middle bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] ${isTyping ? 'opacity-100' : 'caret-blink'}`} />
              </h1>
            </div>

            {/* Dynamic Pill Chips for Current Dialogue Step */}
            <motion.div
              key={currentNodeKey + '_chips'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="flex flex-wrap gap-1.5 sm:gap-2 pt-1"
            >
              {activeNode.chips.map((chip) => {
                const isCopied =
                  (chip.isCopyEmail && copiedEmail === 'main') ||
                  (chip.isCopyCareerEmail && copiedEmail === 'career');

                return (
                  <button
                    key={chip.id}
                    onClick={() => handleChipClick(chip)}
                    className="loco-chip"
                  >
                    <span>
                      {isCopied
                        ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied to clipboard!')
                        : chip.label[lang]}
                    </span>

                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />
                    ) : chip.isCopyEmail || chip.isCopyCareerEmail ? (
                      <Copy className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                    ) : null}
                  </button>
                );
              })}
            </motion.div>

          </div>

          {/* Center: 3D Energy Particle Tech Orb */}
          <div className="lg:col-span-4 flex justify-center items-center relative h-full min-h-0">
            <div className="w-full flex justify-center items-center h-full">
              <TechOrbCanvas
                mood={activeNode.mood}
                onInteract={() => {
                  soundManager.playPop();
                }}
              />
            </div>
          </div>

          {/* Right Column: Team Members — Modern Editorial */}
          <motion.div
            className="lg:col-span-3 hidden lg:flex flex-col justify-center h-full pl-5 pr-1"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between mb-4 px-3.5 sm:px-4"
              variants={{ hidden: { opacity: 0, y: -6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
            >
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-cyan-400 font-bold">RESEARCH FELLOWS</span>
              <span className="text-xs font-mono text-slate-400 tabular-nums font-semibold">{teamMembers.length.toString().padStart(2,'0')}</span>
            </motion.div>

            {/* Member rows */}
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                className="group relative cursor-default rounded-xl transition-all"
                variants={{
                  hidden: { opacity: 0, x: 10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <div className="flex items-center gap-4 py-3 px-3.5 sm:px-4">

                  {/* Index */}
                  <span className="text-[11px] tabular-nums text-slate-500 group-hover:text-cyan-400 transition-colors duration-200 w-5 shrink-0 font-mono font-medium">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>

                  {/* Portrait Card (3:4 Editorial Ratio) */}
                  <div className="relative shrink-0">
                    <motion.div
                      className="w-[50px] h-[62px] rounded-xl overflow-hidden bg-[#141416] shadow-sm relative group-hover:shadow-md transition-shadow duration-300"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      />
                      {/* Subtle vignette gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-sm font-semibold text-white tracking-tight leading-none mb-1.5 truncate group-hover:text-cyan-300 transition-colors">
                      {member.name}
                    </p>
                    <p className="text-[10.5px] text-slate-400 uppercase tracking-[0.08em] font-mono leading-none truncate group-hover:text-slate-300 transition-colors duration-300">
                      {member.role.split('&')[0].trim()}
                    </p>
                    {/* Specialties micro-badges on hover */}
                    {member.specialties && member.specialties.length > 0 && (
                      <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {member.specialties.slice(0, 3).map((spec) => (
                          <span key={spec} className="text-[8px] font-mono font-medium px-1.5 py-0.5 rounded bg-neutral-200/90 text-neutral-700 leading-none">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Social icons — slide in from right on hover */}
                  <motion.div
                    className="flex items-center gap-2 shrink-0"
                    initial={false}
                    animate="rest"
                    whileHover="hover"
                  >
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-250 ease-out">
                      {member.social.github && (
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-[#111111] transition-colors"
                          onClick={e => e.stopPropagation()}>
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.social.facebook && (
                        <a href={member.social.facebook} target="_blank" rel="noopener noreferrer"
                          className="text-neutral-400 hover:text-[#111111] transition-colors"
                          onClick={e => e.stopPropagation()}>
                          <Facebook className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Hover accent bar — slides from top with smooth easing */}
                <motion.span
                  className="absolute left-1 top-2 bottom-2 w-[2.5px] bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] rounded-full origin-top"
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileHover={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Subtle row background highlight on hover */}
                <span className="absolute inset-0 bg-[#111111]/[0.035] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-xl" />
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Bottom Stage Controls */}
        <div className="relative z-30 w-full shrink-0 flex items-end justify-between pointer-events-none pb-1 sm:pb-2">
          
          {/* Bottom-Left: Circular Black Reload Button (Reset Conversation) */}
          <button
            onClick={handleResetDialogue}
            className="pointer-events-auto w-10 h-10 rounded-full bg-[#12141f] text-white border border-white/15 flex items-center justify-center hover:bg-[#1a1e2d] hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all cursor-pointer focus:outline-none"
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Bottom-Right: Vertical Black Pill Sound Toggle */}
          <div className="pointer-events-auto flex flex-col items-center bg-[#12141f] border border-white/15 rounded-full p-1.5 space-y-1 shadow-lg">
            <button
              onClick={() => {
                if (!soundEnabled) toggleSound();
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                soundEnabled ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'
              }`}
              title="Sound on"
              aria-label="Sound on"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                if (soundEnabled) toggleSound();
              }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                !soundEnabled ? 'bg-white text-black' : 'text-neutral-500 hover:text-white'
              }`}
              title="Mute sound"
              aria-label="Mute sound"
            >
              <VolumeX className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Modal / Drawer Overlays */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40">
            <div className="relative w-full max-w-lg bg-[#0c0e15]/95 rounded-3xl p-8 sm:p-10 border border-white/15 text-white backdrop-blur-2xl shadow-2xl">
              
              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playPop();
                  setActiveModal(null);
                }}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Content: Contact */}
              {activeModal === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
                      [ LET'S TALK ]
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1 text-white">
                      Start a Project with I2F Labs
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      Deploy autonomous swarms or collaborate on deep-tech research.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 uppercase mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Satoshi Nakamoto"
                        className="w-full bg-[#141724] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="satoshi@domain.com"
                        className="w-full bg-[#141724] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-500 uppercase mb-1">Message</label>
                      <textarea
                        rows={3}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us what you are aiming to build..."
                        className="w-full bg-[#141724] border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formSent}
                      className="w-full loco-chip !justify-center !py-3 !bg-white !text-black hover:!bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] font-medium"
                    >
                      {formSent ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>TRANSMISSION SENT</span>
                        </>
                      ) : (
                        <>
                          <span>SEND INQUIRY</span>
                          <Send className="w-4 h-4 opacity-70" />
                        </>
                      )}
                    </button>
                    </form>

                    <div className="pt-2 border-t border-neutral-200 text-center">
                      <p className="text-xs text-neutral-500 mb-2">Hoặc kết nối trực tiếp với Founder qua Unikorn:</p>
                      <a
                        href="https://unikorn.vn/u/richard-nguyen"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundManager.playClick()}
                        className="inline-flex items-center justify-center space-x-2 text-xs font-semibold text-neutral-800 hover:text-black py-2 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors w-full"
                      >
                        <span>Connect on Unikorn (@richard-nguyen)</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

              {/* Modal Content: Careers */}
              {activeModal === 'careers' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
                      [ JOIN THE TEAM ]
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1 text-white">
                      Open Research Positions
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      We offer research equity, compute grants, and high autonomy.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { title: 'Rust & Systems Kernel Architect', type: 'Full-time / Remote' },
                      { title: 'Agentic LLM & Memory Graph Researcher', type: 'Research Fellow' },
                      { title: 'Distributed Interaction Designer', type: 'Full-time / Hybrid' },
                    ].map((role, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-[#141724] border border-white/10 flex items-center justify-between text-white"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-white">{role.title}</h4>
                          <span className="text-xs font-mono text-neutral-500">{role.type}</span>
                        </div>
                        <a
                          href="mailto:careers@i2flabs.com"
                          onClick={() => soundManager.playClick()}
                          className="loco-chip !text-xs !py-1 !px-3"
                        >
                          <span>APPLY</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Content: Research */}
              {activeModal === 'research' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
                      [ RESEARCH & CULTURE ]
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mt-1 text-white">
                      Core Scientific Frameworks
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      Architecting verifiable, decentralized autonomous intelligence.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: 'Aevum OS', desc: 'Native OS for autonomous agent swarms', url: 'https://github.com/hainguyen011/Aevum-OS' },
                      { name: 'PiperNet P2P', desc: 'Decentralized state & knowledge mesh', url: 'https://github.com/hainguyen011/PiperNet' },
                      { name: 'Aevos MCP', desc: 'Cognitive memory graph & persona engine', url: 'https://github.com/hainguyen011' },
                    ].map((res, idx) => (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundManager.playClick()}
                        className="p-4 rounded-2xl bg-[#141724] border border-white/10 flex items-center justify-between text-white block"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-semibold text-white">{res.name}</h4>
                            <Github className="w-3.5 h-3.5 text-neutral-400" />
                          </div>
                          <p className="text-xs text-neutral-500 mt-0.5">{res.desc}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

