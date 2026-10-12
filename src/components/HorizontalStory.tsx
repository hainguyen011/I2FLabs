import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  X,
  Send,
  Check,
  Github,
} from 'lucide-react';
import ThreeJsCosmicWorld from './ThreeJsCosmicWorld';
import YouTubeAudio from './YouTubeAudio';
import { soundManager } from '../lib/SoundManager';

interface EpochInfo {
  id: string;
  stepNumber: string;
  era: { en: string; vi: string };
  title: { en: string; vi: string };
  subtitle: { en: string; vi: string };
  story: { en: string; vi: string };
  badge: string;
  meta: string[];
}

const COMPUTING_EPOCHS: EpochInfo[] = [
  {
    id: 'epoch_01',
    stepNumber: '01',
    era: { en: 'Thời kỳ 1', vi: 'Thời kỳ 1' },
    title: { en: 'Khởi nguyên từ logic nhị phân', vi: 'Khởi nguyên từ logic nhị phân' },
    subtitle: {
      en: 'Bìa đục lỗ, bóng bán dẫn và những bước đi đầu tiên của khoa học máy tính',
      vi: 'Bìa đục lỗ, bóng bán dẫn và những bước đi đầu tiên của khoa học máy tính',
    },
    story: {
      en: 'Lịch sử máy tính bắt đầu từ những phép tính nhị phân 0 và 1 trên thẻ đục lỗ và bóng bán dẫn cơ học. Mọi phần mềm phức tạp của nhân loại hôm nay đều khởi nguồn từ những cổng logic Boolean tối giản trên phiến silicon phẳng. Tại I2FLabs, chúng tôi luôn trân trọng vẻ đẹp nguyên bản của những dòng lệnh cơ sở này.',
      vi: 'Lịch sử máy tính bắt đầu từ những phép tính nhị phân 0 và 1 trên thẻ đục lỗ và bóng bán dẫn cơ học. Mọi phần mềm phức tạp của nhân loại hôm nay đều khởi nguồn từ những cổng logic Boolean tối giản trên phiến silicon phẳng. Tại I2FLabs, chúng tôi luôn trân trọng vẻ đẹp nguyên bản của những dòng lệnh cơ sở này.',
    },
    badge: 'HISTORICAL PUNCH CARD',
    meta: ['Boolean Algebra', 'Punch Matrix', 'Deterministic Logic'],
  },
  {
    id: 'epoch_02',
    stepNumber: '02',
    era: { en: 'Thời kỳ 2', vi: 'Thời kỳ 2' },
    title: { en: 'Kiến trúc máy tính nguyên khối', vi: 'Kiến trúc máy tính nguyên khối' },
    subtitle: {
      en: 'Sự trỗi dậy của máy chủ tập trung và các hệ điều hành kinh điển',
      vi: 'Sự trỗi dậy của máy chủ tập trung và các hệ điều hành kinh điển',
    },
    story: {
      en: 'Khi sức mạnh tính toán mở rộng, kiến trúc Von Neumann và các hệ máy chủ nguyên khối ra đời. Những cỗ máy tháp đồ sộ với các khay máy tính và hệ điều hành đầu tiên được thiết kế để quản lý tài nguyên tập trung, đặt nền móng cho cuộc cách mạng phần mềm toàn cầu.',
      vi: 'Khi sức mạnh tính toán mở rộng, kiến trúc Von Neumann và các hệ máy chủ nguyên khối ra đời. Những cỗ máy tháp đồ sộ với các khay máy tính và hệ điều hành đầu tiên được thiết kế để quản lý tài nguyên tập trung, đặt nền móng cho cuộc cách mạng phần mềm toàn cầu.',
    },
    badge: 'MONOLITHIC BLADE TOWER',
    meta: ['Von Neumann Architecture', 'Blade Chassis', 'Centralized Compute'],
  },
  {
    id: 'epoch_03',
    stepNumber: '03',
    era: { en: 'Thời kỳ 3', vi: 'Thời kỳ 3' },
    title: { en: 'Kỷ nguyên mạng phân tán', vi: 'Kỷ nguyên mạng phân tán' },
    subtitle: {
      en: 'Mạng lưới đa điểm, giao thức ngang hàng và sự kết nối không biên giới',
      vi: 'Mạng lưới đa điểm, giao thức ngang hàng và sự kết nối không biên giới',
    },
    story: {
      en: 'Máy tính không còn là những cỗ máy cô lập. Mạng lưới phân tán ngang hàng kết nối các nút độc lập trên khắp thế giới mà không cần máy chủ trung tâm duy nhất, mở ra kỷ nguyên chia sẻ dữ liệu tự do và khả năng chịu lỗi tối ưu. Đây là cội nguồn cảm hứng để chúng tôi phát triển PiperNet.',
      vi: 'Máy tính không còn là những cỗ máy cô lập. Mạng lưới phân tán ngang hàng kết nối các nút độc lập trên khắp thế giới mà không cần máy chủ trung tâm duy nhất, mở ra kỷ nguyên chia sẻ dữ liệu tự do và khả năng chịu lỗi tối ưu. Đây là cội nguồn cảm hứng để chúng tôi phát triển PiperNet.',
    },
    badge: 'DECENTRALIZED P2P MESH',
    meta: ['P2P Topology', 'Mesh Routing', 'Decentralized Nodes'],
  },
  {
    id: 'epoch_04',
    stepNumber: '04',
    era: { en: 'Thời kỳ 4', vi: 'Thời kỳ 4' },
    title: { en: 'Mạng nơ-ron và học sâu', vi: 'Mạng nơ-ron và học sâu' },
    subtitle: {
      en: 'Kiến trúc nơ-ron đa tầng, từ dòng lệnh tĩnh đến khả năng tự học',
      vi: 'Kiến trúc nơ-ron đa tầng, từ dòng lệnh tĩnh đến khả năng tự học',
    },
    story: {
      en: 'Sự kết hợp giữa dữ liệu lớn và thuật toán học sâu giúp máy tính bắt đầu có khả năng nhận thức, xử lý ngôn ngữ và suy luận. Lập trình chuyển mình từ những dòng lệnh quy tắc cố định sang việc huấn luyện các mạng nơ-ron nhân tạo đa tầng, mở đường cho trí tuệ nhân tạo hiện đại.',
      vi: 'Sự kết hợp giữa dữ liệu lớn và thuật toán học sâu giúp máy tính bắt đầu có khả năng nhận thức, xử lý ngôn ngữ và suy luận. Lập trình chuyển mình từ những dòng lệnh quy tắc cố định sang việc huấn luyện các mạng nơ-ron nhân tạo đa tầng, mở đường cho trí tuệ nhân tạo hiện đại.',
    },
    badge: 'DEEP NEURAL LAYERS',
    meta: ['Multi-layer Perceptron', 'Synaptic Weights', 'Deep Latent Space'],
  },
  {
    id: 'epoch_05',
    stepNumber: '05',
    era: { en: 'Thời kỳ 5', vi: 'Thời kỳ 5' },
    title: { en: 'Hệ điều hành tác nhân tự hành', vi: 'Hệ điều hành tác nhân tự hành' },
    subtitle: {
      en: 'I2FLabs và bước chuyển mình sang AI tự chủ trên thiết bị cá nhân',
      vi: 'I2FLabs và bước chuyển mình sang AI tự chủ trên thiết bị cá nhân',
    },
    story: {
      en: 'Chúng tôi tin rằng tương lai của AI không dừng lại ở những chatbot tập trung trên máy chủ từ xa, mà thuộc về các tác nhân tự hành chạy trực tiếp trên thiết bị cá nhân. I2FLabs phát triển Aevum OS và PiperNet để bảo vệ quyền tự chủ dữ liệu, hướng tới một kỷ nguyên nơi con người và AI cùng kiến tạo một cách minh bạch và an toàn.',
      vi: 'Chúng tôi tin rằng tương lai của AI không dừng lại ở những chatbot tập trung trên máy chủ từ xa, mà thuộc về các tác nhân tự hành chạy trực tiếp trên thiết bị cá nhân. I2FLabs phát triển Aevum OS và PiperNet để bảo vệ quyền tự chủ dữ liệu, hướng tới một kỷ nguyên nơi con người và AI cùng kiến tạo một cách minh bạch và an toàn.',
    },
    badge: 'AGENTIC MICROKERNEL',
    meta: ['Aevum OS Core', 'Agent Daemon Swarm', 'Data Sovereignty'],
  },
  {
    id: 'epoch_06',
    stepNumber: '06',
    era: { en: 'Điểm hội tụ', vi: 'Điểm hội tụ' },
    title: { en: 'I2FLabs Việt Nam', vi: 'I2FLabs Việt Nam' },
    subtitle: {
      en: 'Nơi công nghệ lõi và tương lai tự hành hội tụ thành hình',
      vi: 'Nơi công nghệ lõi và tương lai tự hành hội tụ thành hình',
    },
    story: {
      en: 'Từ những phép tính nhị phân nguyên thủy đến các hệ phân tán và trí tuệ nhân tạo tự hành, công nghệ máy tính luôn tiến về phía trước. Tại I2FLabs, chúng tôi là phòng thí nghiệm độc lập tập trung nghiên cứu và kiến tạo các hệ điều hành thế hệ mới (Aevum OS) cùng mạng lưới ngang hàng (PiperNet). Mọi nghiên cứu đều gắn liền với việc xây dựng những sản phẩm thực tế, mở và tôn trọng quyền tự chủ của người dùng.',
      vi: 'Từ những phép tính nhị phân nguyên thủy đến các hệ phân tán và trí tuệ nhân tạo tự hành, công nghệ máy tính luôn tiến về phía trước. Tại I2FLabs, chúng tôi là phòng thí nghiệm độc lập tập trung nghiên cứu và kiến tạo các hệ điều hành thế hệ mới (Aevum OS) cùng mạng lưới ngang hàng (PiperNet). Mọi nghiên cứu đều gắn liền với việc xây dựng những sản phẩm thực tế, mở và tôn trọng quyền tự chủ của người dùng.',
    },
    badge: 'AUTONOMOUS MONOLITH',
    meta: ['Independent R&D', 'Open-source Artifacts', 'Crafted in Vietnam'],
  },
];

export default function HorizontalStory() {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'vi' ? 'vi' : 'en';

  // Continuous Fluid Momentum Physics State (0.00 to 5.00 continuous sub-pixel progress)
  const [spatialProgress, setSpatialProgress] = useState(0);
  const progressPos = useRef(0);
  const progressVel = useRef(0);
  const lastWheelTime = useRef(0);
  const targetSnap = useRef<number | null>(null);

  const [currentEpochIndex, setCurrentEpochIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);
  const [modalOpen, setModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const [mouseTilt, setMouseTilt] = useState({ rotX: 0, rotY: 0 });

  // --------------------------------------------------------------------------
  // FLUID MOMENTUM INERTIA PHYSICS LOOP (60FPS CONTINUOUS SCRUBBING)
  // --------------------------------------------------------------------------
  useEffect(() => {
    let animId: number;
    let prevIndex = 0;

    const updatePhysics = () => {
      animId = requestAnimationFrame(updatePhysics);

      if (targetSnap.current !== null) {
        const diff = targetSnap.current - progressPos.current;
        if (Math.abs(diff) < 0.002) {
          progressPos.current = targetSnap.current;
          targetSnap.current = null;
          progressVel.current = 0;
        } else {
          progressPos.current += diff * 0.085;
        }
      } else {
        progressPos.current += progressVel.current;
        progressPos.current = Math.max(0, Math.min(5, progressPos.current));
        progressVel.current *= 0.88;

        const now = Date.now();
        if (Math.abs(progressVel.current) < 0.0006 && (now - lastWheelTime.current) > 900) {
          const nearest = Math.round(progressPos.current);
          const snapDist = nearest - progressPos.current;
          if (Math.abs(snapDist) > 0.001) {
            progressPos.current += snapDist * 0.022;
          }
        }
      }

      setSpatialProgress(progressPos.current);

      const activeIdx = Math.min(5, Math.max(0, Math.round(progressPos.current)));
      if (activeIdx !== prevIndex) {
        prevIndex = activeIdx;
        setCurrentEpochIndex(activeIdx);
        soundManager.playRazorClick();
      }
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, []);

  // --------------------------------------------------------------------------
  // CONTINUOUS MOUSE WHEEL & KEYBOARD LISTENER
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetSnap.current = null;
      lastWheelTime.current = Date.now();

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const sensitivity = 0.00045;
      progressVel.current += delta * sensitivity;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        navigateToEpoch(Math.min(5, Math.floor(progressPos.current + 1)));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        navigateToEpoch(Math.max(0, Math.ceil(progressPos.current - 1)));
      } else if (e.key === 'Home') {
        e.preventDefault();
        navigateToEpoch(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        navigateToEpoch(5);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Parallax mouse tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2;
      const normY = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseTilt({
        rotX: -normY * 4.0,
        rotY: normX * 5.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navigateToEpoch = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(5, index));
    targetSnap.current = clamped;
    soundManager.playQuantumWarp();
    soundManager.playBioPulse();
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundManager.enabled = next;
    if (next) soundManager.playRazorClick();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChime();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setModalOpen(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const currentEpoch = COMPUTING_EPOCHS[currentEpochIndex];
  const normalizedThreeJsProgress = Math.max(0, Math.min(1, spatialProgress / 5.0));

  return (
    <section className="relative w-screen h-screen bg-black text-white overflow-hidden select-none flex flex-col justify-between font-sans">
      
      {/* Background Audio Engine */}
      <YouTubeAudio videoId="eeD0bjlVggo" isPlaying={soundEnabled} />

      {/* 1. Global Fullscreen 3D Three.js Particles & Wireframe World (Zenith) */}
      <ThreeJsCosmicWorld
        progress={normalizedThreeJsProgress}
        onInteract={() => {
          soundManager.playRazorClick();
          soundManager.playBioPulse();
        }}
      />

      {/* 2. Pure Transparent Header (No Border, Transparent White UI) */}
      <header className="relative z-30 w-full px-8 sm:px-14 pt-7 pb-4 flex items-center justify-between pointer-events-auto bg-transparent">
        
        {/* Brand: Big White Transparent Logo */}
        <div className="flex items-center gap-4">
          <img
            src="/I2FLabs-logo-transparent.png"
            alt="I2FLabs Vietnam"
            className="h-10 sm:h-12 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigateToEpoch(0)}
          />
          <div className="hidden sm:flex flex-col pl-2">
            <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-[11px] tracking-wider uppercase text-white font-medium leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Nghiên cứu và phát triển hệ thống tự hành
            </span>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-[9.5px] tracking-wider text-slate-300 uppercase leading-tight mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Local-first Architecture
            </span>
          </div>
        </div>

        {/* Center Section Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-xs text-white font-medium">
            {currentEpoch.era[lang]}
          </span>
          <span className="text-white/40">-</span>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-xs text-white">
            {currentEpoch.title[lang]}
          </span>
        </div>

        {/* Action Button: Pure Transparent White Text, No Border */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playRazorClick();
              setModalOpen(true);
            }}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            className="bg-transparent text-white hover:text-slate-300 text-xs font-medium tracking-wide transition-all cursor-pointer p-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            Liên hệ hợp tác
          </button>
        </div>
      </header>

      {/* -------------------------------------------------------------------- */}
      {/* 3. CINEMATIC BOTTOM SUBTITLE STORYTELLING OVERLAY                    */}
      {/* Không che khuất vũ trụ 3D, như phụ đề phim tài liệu khoa học IMAX   */}
      {/* -------------------------------------------------------------------- */}
      <div className="relative z-20 w-full flex-1 pointer-events-none flex flex-col justify-end items-center pb-20 sm:pb-24 px-6 sm:px-12">
        <div className="w-full max-w-3xl relative flex items-center justify-center min-h-[160px] pointer-events-auto">
          {COMPUTING_EPOCHS.map((epoch, idx) => {
            // Delta from current scroll progress
            const delta = idx - spatialProgress;
            const absDelta = Math.abs(delta);
            const isVisible = absDelta < 1.15;

            if (!isVisible) return null;

            // Opacity and smooth subtle slide-up for subtitles
            const opacity = Math.max(0, 1 - absDelta * 1.35);
            const translateY = delta * 18; // Nhẹ nhàng trôi dọc theo từng phụ đề

            return (
              <div
                key={epoch.id}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-2 select-text"
              >
                {/* Meta Badge & Step */}
                <div className="flex items-center gap-2 flex-wrap justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-xs font-bold tracking-widest text-white">
                    {epoch.stepNumber}
                  </span>
                  <span className="text-white/40">/</span>
                  <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-[11px] uppercase tracking-wider text-slate-200 font-medium">
                    {epoch.badge}
                  </span>
                  <div className="hidden sm:flex items-center gap-1.5 pl-1.5">
                    {epoch.meta.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        className="text-[9.5px] text-white/60 tracking-tight"
                      >
                        #{m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Epoch Title */}
                <h2
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.98)]"
                >
                  {epoch.title[lang]}
                </h2>

                {/* Subtitle Narrative Paragraph */}
                <p
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  className="text-xs sm:text-sm md:text-[14.5px] text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] whitespace-pre-line px-2"
                >
                  {epoch.story[lang]}
                </p>

                {/* Final Chapter 06: Grand Finale Action Links */}
                {idx === 5 && (
                  <div className="flex flex-wrap items-center gap-6 pt-2.5 justify-center">
                    <button
                      onClick={() => setModalOpen(true)}
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      className="bg-transparent text-white hover:text-slate-300 font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer p-0 underline underline-offset-4 decoration-white/50 hover:decoration-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    >
                      Trò chuyện cùng chúng tôi
                    </button>
                    <a
                      href="https://github.com/hainguyen011"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      className="bg-transparent text-white hover:text-slate-300 font-semibold text-xs tracking-wider uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4 decoration-white/50 hover:decoration-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Xem mã nguồn mở</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Pure Transparent Bottom Navigation: 6 Slides Timeline (No Border, Transparent White UI) */}
      <footer className="relative z-30 w-full px-8 sm:px-14 py-5 flex items-center justify-between pointer-events-auto bg-transparent">
        
        {/* Reset button (No border, transparent icon) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateToEpoch(0)}
            className="bg-transparent text-white hover:text-slate-300 transition-colors cursor-pointer p-0 flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            title="Quay lại thời kỳ đầu"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-xs text-white/80 hidden sm:inline-block drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Không gian 3D - 6 thời kỳ máy tính
          </span>
        </div>

        {/* Minimal Progress Line for 6 Slides (Pure White, No Border) */}
        <div className="flex-1 max-w-md mx-6 flex flex-col items-center gap-1.5">
          <div className="w-full flex justify-between text-[11px] font-sans text-white/80">
            {COMPUTING_EPOCHS.map((ep, i) => (
              <button
                key={ep.id}
                onClick={() => navigateToEpoch(i)}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                className={`cursor-pointer transition-colors bg-transparent p-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
                  currentEpochIndex === i ? 'text-white font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                0{i + 1}
              </button>
            ))}
          </div>

          <div className="w-full h-[1.5px] bg-white/20 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-white"
              style={{ width: `${Math.max(4, (spatialProgress / 5.0) * 100)}%` }}
            />
          </div>
        </div>

        {/* Controls: Pure Transparent White Icons, No Border */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateToEpoch(Math.max(0, currentEpochIndex - 1))}
            disabled={currentEpochIndex === 0}
            className="bg-transparent disabled:opacity-20 flex items-center justify-center text-white hover:text-slate-300 cursor-pointer p-0 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateToEpoch(Math.min(5, currentEpochIndex + 1))}
            disabled={currentEpochIndex === 5}
            className="bg-transparent disabled:opacity-20 flex items-center justify-center text-white hover:text-slate-300 cursor-pointer p-0 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={toggleSound}
            className="bg-transparent flex items-center justify-center cursor-pointer text-white hover:text-slate-300 p-0 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            title="Âm thanh"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

      </footer>

      {/* Pure Transparent Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="relative w-full max-w-lg bg-black text-white p-6 sm:p-8"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 bg-transparent text-white hover:text-slate-300 cursor-pointer p-0 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="text-xl sm:text-2xl font-bold text-white">
                    Gửi lời nhắn tới I2FLabs
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Nếu bạn quan tâm đến Aevum OS, PiperNet hay có ý tưởng hợp tác kỹ thuật, hãy để lại lời nhắn cho nhóm.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                  <div>
                    <label style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="block text-xs text-slate-300 mb-1">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-white/5 text-white px-3 py-2 text-sm outline-none focus:bg-white/10 transition-colors placeholder:text-white/20"
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="block text-xs text-slate-300 mb-1">
                      Email liên hệ
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@domain.com"
                      className="w-full bg-white/5 text-white px-3 py-2 text-sm outline-none focus:bg-white/10 transition-colors placeholder:text-white/20"
                    />
                  </div>

                  <div>
                    <label style={{ fontFamily: 'Space Grotesk, sans-serif' }} className="block text-xs text-slate-300 mb-1">
                      Nội dung trao đổi
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Ý tưởng hoặc nhu cầu hợp tác kỹ thuật..."
                      className="w-full bg-white/5 text-white px-3 py-2 text-sm outline-none focus:bg-white/10 transition-colors placeholder:text-white/20 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formSent}
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      className="w-full bg-white text-black hover:bg-slate-200 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {formSent ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Đã gửi thành công</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Gửi thông điệp</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
