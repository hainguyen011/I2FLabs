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
    title: { en: 'Trí tuệ tạo sinh & Mô hình ngôn ngữ lớn', vi: 'Trí tuệ tạo sinh & Mô hình ngôn ngữ lớn' },
    subtitle: {
      en: 'Kiến trúc Transformer, cơ chế tự chú ý và không gian tiềm ẩn đa chiều',
      vi: 'Kiến trúc Transformer, cơ chế tự chú ý và không gian tiềm ẩn đa chiều',
    },
    story: {
      en: 'Đột phá từ kiến trúc Transformer mở ra kỷ nguyên Generative AI và các mô hình ngôn ngữ lớn (LLMs). Bằng cơ chế chú ý tự thân (Self-Attention) xử lý ngữ cảnh sâu rộng, máy tính không chỉ phân tích mà còn có thể sáng tạo ngôn ngữ, mã nguồn và tri thức tổng hợp, đưa trí tuệ máy móc tiệm cận khả năng tư duy trừu tượng của con người.',
      vi: 'Đột phá từ kiến trúc Transformer mở ra kỷ nguyên Generative AI và các mô hình ngôn ngữ lớn (LLMs). Bằng cơ chế chú ý tự thân (Self-Attention) xử lý ngữ cảnh sâu rộng, máy tính không chỉ phân tích mà còn có thể sáng tạo ngôn ngữ, mã nguồn và tri thức tổng hợp, đưa trí tuệ máy móc tiệm cận khả năng tư duy trừu tượng của con người.',
    },
    badge: 'TRANSFORMER & LLM MANIFOLD',
    meta: ['Transformer Architecture', 'Self-Attention Matrix', 'High-Dimensional Embeddings'],
  },
  {
    id: 'epoch_06',
    stepNumber: '06',
    era: { en: 'Thời kỳ 6', vi: 'Thời kỳ 6' },
    title: { en: 'Kỷ nguyên tác nhân AI', vi: 'Kỷ nguyên tác nhân AI' },
    subtitle: {
      en: 'Vòng lặp tư duy ReAct, khả năng lập kế hoạch và sử dụng công cụ ngoài',
      vi: 'Vòng lặp tư duy ReAct, khả năng lập kế hoạch và sử dụng công cụ ngoài',
    },
    story: {
      en: 'AI vượt ra khỏi giới hạn của những chatbot trả lời thụ động để trở thành Tác nhân tự hành (Autonomous Agent). Với vòng lặp tư duy khép kín (Perceive - Reason - Act), khả năng tự chia nhỏ nhiệm vụ, lưu giữ trí nhớ dài hạn và kích hoạt các công cụ ngoại vi, tác nhân AI có thể độc lập giải quyết những bài toán kỹ thuật phức tạp trong thế giới thực.',
      vi: 'AI vượt ra khỏi giới hạn của những chatbot trả lời thụ động để trở thành Tác nhân tự hành (Autonomous Agent). Với vòng lặp tư duy khép kín (Perceive - Reason - Act), khả năng tự chia nhỏ nhiệm vụ, lưu giữ trí nhớ dài hạn và kích hoạt các công cụ ngoại vi, tác nhân AI có thể độc lập giải quyết những bài toán kỹ thuật phức tạp trong thế giới thực.',
    },
    badge: 'AUTONOMOUS AGENT CORE',
    meta: ['ReAct Reasoning Loop', 'Dynamic Tool Calling', 'Persistent Agent Memory'],
  },
  {
    id: 'epoch_07',
    stepNumber: '07',
    era: { en: 'Thời kỳ 7', vi: 'Thời kỳ 7' },
    title: { en: 'Hệ thống đa tác nhân phối hợp', vi: 'Hệ thống đa tác nhân phối hợp' },
    subtitle: {
      en: 'Cộng tác bầy đàn, giao thức đàm phán phân tán và hiệp đồng chuyên môn',
      vi: 'Cộng tác bầy đàn, giao thức đàm phán phân tán và hiệp đồng chuyên môn',
    },
    story: {
      en: 'Sức mạnh thực sự bùng nổ khi các tác nhân không làm việc đơn độc mà phối hợp thành một tập thể (Multi-Agent System). Mỗi agent đảm nhiệm một chuyên môn riêng biệt — từ lập kế hoạch, viết mã, kiểm thử đến phản biện — đàm phán và giao tiếp thời gian thực để tạo nên trí tuệ bầy đàn vượt trội hơn bất kỳ tác nhân đơn lẻ nào.',
      vi: 'Sức mạnh thực sự bùng nổ khi các tác nhân không làm việc đơn độc mà phối hợp thành một tập thể (Multi-Agent System). Mỗi agent đảm nhiệm một chuyên môn riêng biệt — từ lập kế hoạch, viết mã, kiểm thử đến phản biện — đàm phán và giao tiếp thời gian thực để tạo nên trí tuệ bầy đàn vượt trội hơn bất kỳ tác nhân đơn lẻ nào.',
    },
    badge: 'MULTI-AGENT SWARM',
    meta: ['Swarm Intelligence', 'Agent-to-Agent IPC', 'Consensus Coordination'],
  },
  {
    id: 'epoch_08',
    stepNumber: '08',
    era: { en: 'Thời kỳ 8', vi: 'Thời kỳ 8' },
    title: { en: 'Hệ điều hành & Tác nhân tự chủ', vi: 'Hệ điều hành & Tác nhân tự chủ' },
    subtitle: {
      en: 'Kiến trúc Local-first, Aevum OS và nhân điều phối tác nhân trên phần cứng cục bộ',
      vi: 'Kiến trúc Local-first, Aevum OS và nhân điều phối tác nhân trên phần cứng cục bộ',
    },
    story: {
      en: 'Để các tác nhân phát huy tối đa quyền tự chủ mà vẫn bảo vệ an toàn dữ liệu, một nền tảng hệ điều hành hoàn toàn mới là điều tất yếu. I2FLabs phát triển Aevum OS — hệ điều hành định hướng Agentic Runtime với nhân Microkernel bảo mật, cho phép tác nhân AI chạy trực tiếp trên phần cứng cá nhân mà không phụ thuộc vào máy chủ đám mây tập trung.',
      vi: 'Để các tác nhân phát huy tối đa quyền tự chủ mà vẫn bảo vệ an toàn dữ liệu, một nền tảng hệ điều hành hoàn toàn mới là điều tất yếu. I2FLabs phát triển Aevum OS — hệ điều hành định hướng Agentic Runtime với nhân Microkernel bảo mật, cho phép tác nhân AI chạy trực tiếp trên phần cứng cá nhân mà không phụ thuộc vào máy chủ đám mây tập trung.',
    },
    badge: 'AEVUM OS MICROKERNEL',
    meta: ['AevumOS Microkernel', 'Local-first Architecture', 'Data Sovereignty'],
  },
  {
    id: 'epoch_09',
    stepNumber: '09',
    era: { en: 'Thời kỳ 9', vi: 'Thời kỳ 9' },
    title: { en: 'Internet of Agents & AGI', vi: 'Internet of Agents & AGI' },
    subtitle: {
      en: 'Mạng lưới tác nhân toàn cầu PiperNet và điểm hội tụ của trí tuệ nhân tạo tổng quát',
      vi: 'Mạng lưới tác nhân toàn cầu PiperNet và điểm hội tụ của trí tuệ nhân tạo tổng quát',
    },
    story: {
      en: 'Đỉnh cao của cuộc cách mạng điện toán: Internet of Agents (IoA) kết nối hàng triệu tác nhân tự chủ trên toàn thế giới thông qua hạ tầng mạng phi tập trung PiperNet. Không còn ranh giới giữa phần mềm cục bộ và mạng lưới toàn cầu, toàn bộ hệ sinh thái hòa làm một thể trí tuệ nhân tạo tổng quát (AGI) mở, tự do và trường tồn.',
      vi: 'Đỉnh cao của cuộc cách mạng điện toán: Internet of Agents (IoA) kết nối hàng triệu tác nhân tự chủ trên toàn thế giới thông qua hạ tầng mạng phi tập trung PiperNet. Không còn ranh giới giữa phần mềm cục bộ và mạng lưới toàn cầu, toàn bộ hệ sinh thái hòa làm một thể trí tuệ nhân tạo tổng quát (AGI) mở, tự do và trường tồn.',
    },
    badge: 'INTERNET OF AGENTS & AGI',
    meta: ['Internet of Agents (IoA)', 'PiperNet Protocol', 'Decentralized Open AGI'],
  },
  {
    id: 'epoch_10',
    stepNumber: '10',
    era: { en: 'Điểm hội tụ', vi: 'Điểm hội tụ' },
    title: { en: 'I2FLabs Vietnam', vi: 'I2FLabs Vietnam' },
    subtitle: {
      en: 'Quả địa cầu số bao bọc trong vầng hào quang electron khí quyển rực rỡ',
      vi: 'Quả địa cầu số bao bọc trong vầng hào quang electron khí quyển rực rỡ',
    },
    story: {
      en: 'Từ điểm ảnh nguyên bản đầu tiên, qua mọi thời kỳ thăng trầm của điện toán, mạng nơ-ron và tác nhân thông minh, các hạt ánh sáng hội tụ trở lại thành Trái Đất số bao bọc trong vầng hào quang electron xanh biếc. Tại I2FLabs Việt Nam, chúng tôi xây dựng hạ tầng Aevum OS và PiperNet để kết nối mọi con người và tác nhân trên hành tinh này trong một mạng lưới tự do, minh bạch và an toàn.',
      vi: 'Từ điểm ảnh nguyên bản đầu tiên, qua mọi thời kỳ thăng trầm của điện toán, mạng nơ-ron và tác nhân thông minh, các hạt ánh sáng hội tụ trở lại thành Trái Đất số bao bọc trong vầng hào quang electron xanh biếc. Tại I2FLabs Việt Nam, chúng tôi xây dựng hạ tầng Aevum OS và PiperNet để kết nối mọi con người và tác nhân trên hành tinh này trong một mạng lưới tự do, minh bạch và an toàn.',
    },
    badge: 'PLANETARY VOXEL EARTH',
    meta: ['Global Agent Mesh', 'Atmospheric Electron Glow', 'I2FLabs Vietnam', 'Aevum OS Fabric'],
  },
];

interface HorizontalStoryProps {
  isLoading?: boolean;
}

export default function HorizontalStory({ isLoading = false }: HorizontalStoryProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'vi' ? 'vi' : 'en';

  // State: 'prologue' (Trình chiếu mở màn sau Loading) | 'epochs' (Các kỉ nguyên bắt đầu)
  const [mode, setMode] = useState<'prologue' | 'epochs'>('prologue');

  // --- PROLOGUE STATE: Tụ lại -> Nén đặc -> Quá giới hạn -> Nổ lơ lửng (0.0 to 1.0) ---
  const [prologueProgress, setPrologueProgress] = useState(0.0);
  const prologuePos = useRef(0.0);
  const prologueVel = useRef(0.0);

  // --- EPOCHS CONTINUOUS PROGRESS: 0.00 to 8.00 (9 THỜI KỲ MÁY TÍNH & AI) ---
  const [spatialProgress, setSpatialProgress] = useState(0.0);
  const progressPos = useRef(0.0);
  const targetEpochPos = useRef(0.0);

  // Audio & Shockwave states
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const explodedRef = useRef(false);
  const prevEpochIndex = useRef(0);

  const [soundEnabled, setSoundEnabled] = useState(soundManager.enabled);
  const [modalOpen, setModalOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const touchStartY = useRef(0);

  const maxEpochIndex = COMPUTING_EPOCHS.length - 1; // 8

  // Chuyển tiếp: -> animation Kỉ nguyên bắt đầu!
  const startEpochsJourney = useCallback(() => {
    soundManager.playRazorClick();
    setMode('epochs');
    progressPos.current = 0.0;
    targetEpochPos.current = 0.0;
    setSpatialProgress(0.0);
  }, []);

  // --------------------------------------------------------------------------
  // CONTINUOUS 120FPS FLUID MOMENTUM & SMOOTH LERP PHYSICS LOOP
  // --------------------------------------------------------------------------
  useEffect(() => {
    let animId: number;

    const updatePhysics = () => {
      animId = requestAnimationFrame(updatePhysics);

      if (mode === 'prologue') {
        // --- PROLOGUE PHYSICS: Cuộn chậm, đằm và lâu hơn để trải nghiệm UX trọn vẹn ---
        prologuePos.current += prologueVel.current;
        prologuePos.current = Math.max(0.0, Math.min(1.08, prologuePos.current));
        prologueVel.current *= 0.89;

        const p = Math.min(1.0, prologuePos.current);
        setPrologueProgress(p);

        // 1. Quá giới hạn (>= 0.86) -> VỤ NỔ IM LẶNG (KHÔNG PHÁT RA TIẾNG NỔ LỚN)
        if (p >= 0.86 && !explodedRef.current) {
          explodedRef.current = true;
          setShockwaveActive(true);
          setTimeout(() => setShockwaveActive(false), 800);
        } else if (p < 0.72) {
          explodedRef.current = false;
        }

        // 2. Tự động tiếp tục câu chuyện khi người dùng tiếp tục cuộn sau khi nổ
        if (prologuePos.current >= 1.05 && prologueVel.current > 0.0004) {
          startEpochsJourney();
        }
      } else {
        // --- EPOCHS CONTINUOUS SCRUBBING PHYSICS (SMOOTHER CRITICALLY DAMPED LERP) ---
        const diff = targetEpochPos.current - progressPos.current;
        if (Math.abs(diff) < 0.0005) {
          progressPos.current = targetEpochPos.current;
        } else {
          // Lerp 0.052 giúp chuyển động hạt và camera cực kỳ êm ái, điện ảnh
          progressPos.current += diff * 0.052;
        }

        setSpatialProgress(progressPos.current);

        const activeIdx = Math.round(progressPos.current);
        if (activeIdx !== prevEpochIndex.current) {
          prevEpochIndex.current = activeIdx;
          soundManager.playRazorClick();
        }
      }
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [mode, startEpochsJourney]);

  // --------------------------------------------------------------------------
  // CONTINUOUS MOUSE WHEEL, TOUCH & KEYBOARD LISTENERS
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isLoading) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;

      if (mode === 'prologue') {
        const curP = prologuePos.current;
        let accel = 1.0;
        if (curP >= 0.38 && curP < 0.86) {
          accel = 1.0 + Math.pow((curP - 0.38) / 0.48, 2.0) * 2.2;
        } else if (curP >= 0.86) {
          accel = 1.15;
        }
        prologueVel.current += delta * 0.000048 * accel;
      } else {
        targetEpochPos.current = Math.max(0.0, Math.min(maxEpochIndex, targetEpochPos.current + delta * 0.00022));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isLoading) return;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isLoading) return;
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY.current - currentY;
      touchStartY.current = currentY;

      if (mode === 'prologue') {
        const curP = prologuePos.current;
        let accel = 1.0;
        if (curP >= 0.38 && curP < 0.86) {
          accel = 1.0 + Math.pow((curP - 0.38) / 0.48, 2.0) * 2.2;
        } else if (curP >= 0.86) {
          accel = 1.15;
        }
        prologueVel.current += deltaY * 0.00024 * accel;
      } else {
        targetEpochPos.current = Math.max(0.0, Math.min(maxEpochIndex, targetEpochPos.current + deltaY * 0.001));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;
      if (mode === 'prologue') {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown') {
          prologueVel.current += 0.035;
        } else if (e.key === 'Enter' || e.key === ' ') {
          prologueVel.current += 0.09;
        }
      } else {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown') {
          e.preventDefault();
          navigateToEpoch(Math.min(maxEpochIndex, Math.floor(progressPos.current + 1)));
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
          e.preventDefault();
          navigateToEpoch(Math.max(0.0, Math.ceil(progressPos.current - 1)));
        } else if (e.key === 'Home') {
          e.preventDefault();
          navigateToEpoch(0.0);
        } else if (e.key === 'End') {
          e.preventDefault();
          navigateToEpoch(maxEpochIndex);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, maxEpochIndex, isLoading]);

  const navigateToEpoch = useCallback((targetIndex: number) => {
    const clamped = Math.max(0.0, Math.min(maxEpochIndex, targetIndex));
    targetEpochPos.current = clamped;
    soundManager.playRazorClick();
  }, [maxEpochIndex]);

  const resetToPrologue = () => {
    soundManager.playRazorClick();
    setMode('prologue');
    prologuePos.current = 0.0;
    targetEpochPos.current = 0.0;
    setPrologueProgress(0.0);
    explodedRef.current = false;
  };

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

  const currentEpochIndex = Math.min(maxEpochIndex, Math.max(0, Math.round(spatialProgress)));
  const currentEpoch = COMPUTING_EPOCHS[currentEpochIndex];

  return (
    <section className="relative w-screen h-screen bg-black text-white overflow-hidden select-none flex flex-col justify-between font-sans">
      
      {/* Background Ambient Audio Engine - Phát ngay khi xuất hiện chấm pixel đầu tiên sau loading */}
      <YouTubeAudio videoId="eeD0bjlVggo" isPlaying={!isLoading && soundEnabled} />

      {/* 1. Global Fullscreen 3D Three.js Particles & Wireframe World */}
      <ThreeJsCosmicWorld
        mode={mode}
        prologueProgress={prologueProgress}
        epochProgress={spatialProgress}
        totalEpochs={COMPUTING_EPOCHS.length}
        onInteract={() => {
          soundManager.playRazorClick();
          soundManager.playBioPulse();
        }}
      />

      {/* ==================================================================== */}
      {/* 2. PROLOGUE OVERLAY (TRÌNH CHIẾU Ở ĐẦU SAU MÀN HÌNH LOADING)        */}
      {/* ==================================================================== */}
      {mode === 'prologue' && (
        <div className="fixed inset-0 pointer-events-none z-20 flex flex-col items-center justify-center">
          
          {/* MỘT PIXEL HÌNH VUÔNG NHỎ 2D PHẲNG Ở CHÍNH GIỮA MÀN HÌNH (sau khi nén lại mới thành voxel 3D) */}
          {prologueProgress < 0.65 && (
            <div
              className="relative flex items-center justify-center pointer-events-none"
              style={{
                opacity: Math.max(0, 1 - Math.max(0, (prologueProgress - 0.52) / 0.12)),
              }}
            >
              <div className="w-[5px] h-[5px] bg-white rounded-none shadow-[0_0_8px_#ffffff]" />
            </div>
          )}

          {/* DÒNG TEXT KỂ CHUYỆN SÂU LẮNG Ở PHÍA DƯỚI */}
          <div className="absolute bottom-12 sm:bottom-16 flex flex-col items-center gap-3 text-center pointer-events-auto px-6 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={
                  prologueProgress < 0.18
                    ? 'void'
                    : prologueProgress < 0.60
                    ? 'awakening'
                    : prologueProgress < 0.85
                    ? 'compression'
                    : prologueProgress < 0.96
                    ? 'explosion'
                    : 'crystallization'
                }
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                className="text-xs sm:text-sm md:text-base text-slate-200 font-light leading-relaxed tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
              >
                {prologueProgress < 0.18 &&
                  'Ban đầu là hư vô đen tuyền. Một điểm ảnh nguyên bản duy nhất chứa đựng mầm sống của toàn bộ vũ trụ số.'}
                {prologueProgress >= 0.18 &&
                  prologueProgress < 0.60 &&
                  'Cuộn chuột để đánh thức các pixel từ vô tận, bị lực hút lượng tử kéo dần về tâm điểm khởi nguyên...'}
                {prologueProgress >= 0.60 &&
                  prologueProgress < 0.85 &&
                  'Không gian co thắt dữ dội, gia tốc dồn dập nén đặc các pixel thành một voxel năng lượng siêu sáng...'}
                {prologueProgress >= 0.85 &&
                  prologueProgress < 0.96 &&
                  'Vụ nổ khai sinh bung tỏa. Hàng ngàn voxel bắn ra không gian và bắt đầu liên kết thành mạng lưới ánh sáng...'}
                {prologueProgress >= 0.96 &&
                  'Tiếp tục cuộn chuột để các voxel chuyển dần hợp nhất thành thực thể điện toán đầu tiên: Thẻ đục lỗ.'}
              </motion.p>
            </AnimatePresence>

            {/* Chỉ dẫn cuộn tinh tế */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono tracking-widest uppercase pt-1 animate-pulse">
              <span>Cuộn chuột để tiếp tục câu chuyện</span>
              <span>↓</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUPERNOVA SHOCKWAVE FLASH RING */}
      {shockwaveActive && (
        <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
          <div className="w-[140px] h-[140px] rounded-full border-2 border-white animate-ping opacity-90 scale-150" />
          <div className="w-[340px] h-[340px] rounded-full border border-cyan-400/60 animate-ping opacity-70" />
          <div className="absolute inset-0 bg-white/15 animate-pulse pointer-events-none" />
        </div>
      )}

      {/* ==================================================================== */}
      {/* 4. EPOCHS MODE: HEADER (XUẤT HIỆN KHI KỈ NGUYÊN BẮT ĐẦU)             */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {mode === 'epochs' && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 w-full px-8 sm:px-14 pt-7 pb-4 flex items-center justify-between pointer-events-auto bg-transparent"
          >
            {/* Brand Logo */}
            <div className="flex items-center gap-4">
              <img
                src="/I2FLabs-logo-transparent.png"
                alt="I2FLabs Vietnam"
                className="h-10 sm:h-12 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => navigateToEpoch(0.0)}
              />
              <div className="hidden sm:flex flex-col pl-2">
                <span
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  className="text-[11px] tracking-wider uppercase text-white font-medium leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                >
                  Nghiên cứu và phát triển hệ thống tự hành
                </span>
                <span
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  className="text-[9.5px] tracking-wider text-slate-300 uppercase leading-tight mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                >
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

            {/* Action Button */}
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
          </motion.header>
        )}
      </AnimatePresence>

      {/* 5. CINEMATIC CONTINUOUS STORYTELLING SUBTITLES (EPOCHS MODE) */}
      {mode === 'epochs' && (
        <>
          {/* Lớp gradient tối mềm mại phủ suốt từ đáy màn hình lên trên, loại bỏ hoàn toàn hiện tượng hở khúc dưới */}
          <div className="fixed inset-x-0 bottom-0 h-[380px] sm:h-[440px] bg-gradient-to-t from-black via-black/85 via-45% to-transparent pointer-events-none z-10" />

          <div className="relative z-20 w-full flex-1 pointer-events-none flex flex-col justify-end items-center pb-2 sm:pb-4 px-6 sm:px-12">
            <div className="w-full max-w-3xl relative flex items-center justify-center min-h-[140px] pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEpoch.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="w-full flex flex-col items-center justify-center text-center space-y-2.5 select-text relative z-10"
              >
                {/* Meta Badge & Step */}
                <div className="flex items-center gap-2 flex-wrap justify-center drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
                  <span
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    className="text-xs font-bold tracking-widest text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                  >
                    {currentEpoch.stepNumber}
                  </span>
                  <span className="text-white/40">/</span>
                  <span
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    className="text-[11px] uppercase tracking-wider text-slate-200 font-semibold"
                  >
                    {currentEpoch.badge}
                  </span>
                  <div className="hidden sm:flex items-center gap-1.5 pl-1.5">
                    {currentEpoch.meta.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        className="text-[9.5px] text-white/75 tracking-tight font-medium"
                      >
                        #{m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Main Chapter Title */}
                <h2
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,1)] [text-shadow:_0_2px_20px_rgba(0,0,0,0.95)]"
                >
                  {currentEpoch.title[lang]}
                </h2>

                {/* Narrative Paragraph */}
                <p
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                  className="text-xs sm:text-sm md:text-[14.5px] text-slate-100 leading-relaxed max-w-2xl font-normal drop-shadow-[0_3px_16px_rgba(0,0,0,1)] [text-shadow:_0_1px_14px_rgba(0,0,0,0.95)] whitespace-pre-line px-2"
                >
                  {currentEpoch.story[lang]}
                </p>

                {/* Final Chapter 09: Grand Finale Action Links */}
                {currentEpochIndex === maxEpochIndex && (
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        </>
      )}

      {/* 6. CONTINUOUS STORY STREAM FOOTER (EPOCHS MODE) */}
      <AnimatePresence>
        {mode === 'epochs' && (
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30 w-full px-8 sm:px-14 py-5 flex items-center justify-between pointer-events-auto bg-transparent"
          >
            {/* Reset button: Quay về lại Trình chiếu Khởi nguyên */}
            <div className="flex items-center gap-3 z-10">
              <button
                onClick={resetToPrologue}
                className="bg-transparent text-white hover:text-slate-300 transition-colors cursor-pointer p-0 flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                title="Quay lại trình chiếu khởi nguyên"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <span
                style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                className="text-xs text-white/80 hidden md:inline-block drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              >
                Không gian 3D - 10 thời kỳ máy tính & AI
              </span>
            </div>

            {/* Continuous Progress Track: CĂN CHÍNH GIỮA 100% CỦA BOTTOM MÀN HÌNH */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[80%] max-w-sm sm:max-w-md flex flex-col items-center gap-1.5 pointer-events-auto">
              <div className="w-full flex justify-between text-[11px] font-sans text-white/80">
                {COMPUTING_EPOCHS.map((ep, i) => (
                  <button
                    key={ep.id}
                    onClick={() => navigateToEpoch(i)}
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    className={`cursor-pointer transition-colors bg-transparent px-1.5 py-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] ${
                      currentEpochIndex === i
                        ? 'text-white font-bold scale-110'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {i < 9 ? `0${i + 1}` : `${i + 1}`}
                  </button>
                ))}
              </div>

              {/* Smooth Progress Line */}
              <div className="w-full h-[1.5px] bg-white/20 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-white transition-all duration-75 ease-out shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  style={{ width: `${Math.max(2.5, (spatialProgress / maxEpochIndex) * 100)}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 z-10 ml-auto">
              <button
                onClick={() => navigateToEpoch(Math.max(0.0, spatialProgress - 1.0))}
                disabled={spatialProgress <= 0.05}
                className="bg-transparent disabled:opacity-20 flex items-center justify-center text-white hover:text-slate-300 cursor-pointer p-0 transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateToEpoch(Math.min(maxEpochIndex, spatialProgress + 1.0))}
                disabled={spatialProgress >= maxEpochIndex - 0.05}
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
          </motion.footer>
        )}
      </AnimatePresence>

      {/* Pure Transparent Contact Modal */}
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
                  <h3
                    style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                    className="text-xl sm:text-2xl font-bold text-white"
                  >
                    Gửi lời nhắn tới I2FLabs
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Nếu bạn quan tâm đến Aevum OS, PiperNet hay có ý tưởng hợp tác kỹ thuật, hãy để lại lời nhắn cho nhóm.
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                  <div>
                    <label
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      className="block text-xs text-slate-300 mb-1"
                    >
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
                    <label
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      className="block text-xs text-slate-300 mb-1"
                    >
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
                    <label
                      style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                      className="block text-xs text-slate-300 mb-1"
                    >
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
