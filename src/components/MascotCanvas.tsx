import { useEffect, useRef, useState } from 'react';
import { soundManager } from '../lib/SoundManager';

export type MascotMood = 'eyes' | 'glyph' | 'happy' | 'wink';

interface MascotCanvasProps {
  mood?: MascotMood;
  onInteract?: () => void;
}

export default function MascotCanvas({ mood = 'eyes', onInteract }: MascotCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Handle mouse move to track eyes smoothly
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.4;

      const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

      mousePos.current.targetX = normX;
      mousePos.current.targetY = normY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Natural Blink loop
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        timeoutId = setTimeout(triggerBlink, 2800 + Math.random() * 3500);
      }, 140);
    };

    timeoutId = setTimeout(triggerBlink, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Render loop on canvas for CRT Phosphor Glow / Glowing Sun Orbs / Glyph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.025;

      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.08;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.08;

      const { x, y } = mousePos.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // CRT Screen Background (Deep Charcoal/Black with subtle starry noise)
      const screenGrad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w * 0.6);
      screenGrad.addColorStop(0, '#1c1e23');
      screenGrad.addColorStop(0.65, '#0f1115');
      screenGrad.addColorStop(1, '#050608');
      ctx.fillStyle = screenGrad;
      ctx.fillRect(0, 0, w, h);

      // CRT Horizontal scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
      for (let i = 0; i < h; i += 3) {
        ctx.fillRect(0, i, w, 1);
      }

      // Phosphor speckles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let s = 0; s < 16; s++) {
        const sx = ((Math.sin(s * 73 + time * 0.05) + 1) / 2) * w;
        const sy = ((Math.cos(s * 41 + time * 0.05) + 1) / 2) * h;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      if (mood === 'glyph') {
        // Draw the iconic chalk-style arch glyph with cross marks
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        // Arch
        ctx.beginPath();
        ctx.arc(w / 2, h / 2 + 10, 48, 1.15 * Math.PI, 1.85 * Math.PI);
        ctx.stroke();

        // Left Cross
        ctx.beginPath();
        ctx.moveTo(w / 2 - 50, h / 2 - 18);
        ctx.lineTo(w / 2 - 25, h / 2 + 8);
        ctx.moveTo(w / 2 - 25, h / 2 - 18);
        ctx.lineTo(w / 2 - 50, h / 2 + 8);
        ctx.stroke();

        // Right Cross
        ctx.beginPath();
        ctx.moveTo(w / 2 + 25, h / 2 - 18);
        ctx.lineTo(w / 2 + 50, h / 2 + 8);
        ctx.moveTo(w / 2 + 50, h / 2 - 18);
        ctx.lineTo(w / 2 + 25, h / 2 + 8);
        ctx.stroke();

        ctx.restore();
      } else {
        // Draw Glowing White Sun/Orb Eyes (Locomotive Signature Look)
        const eyeSpacing = w * 0.21;
        const eyeRadius = w * 0.12;
        const eyeXOffset = x * (w * 0.12);
        const eyeYOffset = y * (h * 0.09);

        const leftEyeX = w / 2 - eyeSpacing + eyeXOffset;
        const rightEyeX = w / 2 + eyeSpacing + eyeXOffset;
        const eyeY = h / 2 + eyeYOffset + Math.sin(time * 1.5) * 1.5;

        const drawGlowingOrb = (cx: number, cy: number, isWink = false) => {
          ctx.save();

          if (isBlinking || isWink) {
            // Eyelid line blink
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.arc(cx, cy + 4, eyeRadius * 0.8, 0.2 * Math.PI, 0.8 * Math.PI);
            ctx.stroke();
          } else if (mood === 'happy') {
            // Happy upward smile curve
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.arc(cx, cy + 8, eyeRadius * 0.85, 1.2 * Math.PI, 1.8 * Math.PI);
            ctx.stroke();
          } else {
            // Outer Halo Glow (Warm/White/Soft Cyan)
            const haloGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, eyeRadius * 2.2);
            haloGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
            haloGrad.addColorStop(0.4, 'rgba(255, 245, 235, 0.85)');
            haloGrad.addColorStop(0.7, 'rgba(230, 240, 255, 0.35)');
            haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = haloGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, eyeRadius * 2.2, 0, Math.PI * 2);
            ctx.fill();

            // Intense Glowing Core
            const coreGrad = ctx.createRadialGradient(cx - eyeRadius * 0.15, cy - eyeRadius * 0.15, 1, cx, cy, eyeRadius);
            coreGrad.addColorStop(0, '#ffffff');
            coreGrad.addColorStop(0.75, '#fcfcfc');
            coreGrad.addColorStop(0.92, '#f0f5ff');
            coreGrad.addColorStop(1, '#d8e5ff');

            ctx.fillStyle = coreGrad;
            ctx.beginPath();
            ctx.arc(cx, cy, eyeRadius, 0, Math.PI * 2);
            ctx.fill();

            // Specular reflection
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(cx - eyeRadius * 0.35, cy - eyeRadius * 0.35, eyeRadius * 0.22, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        };

        drawGlowingOrb(leftEyeX, eyeY);
        drawGlowingOrb(rightEyeX, eyeY, mood === 'wink');
      }

      // CRT Glass curved reflection
      const glassGrad = ctx.createLinearGradient(0, 0, w, h);
      glassGrad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      glassGrad.addColorStop(0.3, 'rgba(255, 255, 255, 0.02)');
      glassGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
      glassGrad.addColorStop(1, 'rgba(0, 0, 0, 0.35)');
      ctx.fillStyle = glassGrad;
      ctx.fillRect(0, 0, w, h);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [mood, isBlinking]);

  const handleClick = () => {
    soundManager.playPop();
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 200);
    onInteract?.();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-[280px] sm:w-[340px] md:w-[400px] lg:w-[450px] max-h-[min(54vh,460px)] flex flex-col items-center justify-end cursor-pointer select-none"
    >
      {/* Studio Floor Soft Contact Shadow */}
      <div className="absolute bottom-0 w-4/5 h-12 bg-black/20 blur-2xl rounded-full" />

      {/* CRT Head Unit */}
      <div className="relative z-20 w-[210px] sm:w-[250px] md:w-[290px] flex flex-col items-center">
        
        {/* Antenna wire & top connector */}
        <div className="absolute -top-5 flex items-end justify-center space-x-3 z-0">
          <div className="w-1 h-6 bg-neutral-800 rounded-t-full rotate-[-12deg]" />
          <div className="w-1.5 h-8 bg-neutral-700 rounded-t-full rotate-[15deg]" />
        </div>

        {/* Outer Monitor Chassis (Vintage Beveled Grey Plastic with Studio Highlights) */}
        <div className="relative w-full aspect-[1.12/1] bg-gradient-to-b from-[#696c73] via-[#3a3d42] to-[#212327] rounded-[32px] p-3.5 sm:p-4 border border-[#7a7e86]/40">
          
          {/* Inner Bezel Border */}
          <div className="relative w-full h-full bg-[#111215] rounded-[22px] p-2 flex flex-col justify-between overflow-hidden">
            
            {/* Curved CRT Screen Glass Container */}
            <div className="relative w-full flex-1 rounded-[16px] overflow-hidden border border-white/5">
              <canvas
                ref={canvasRef}
                width={360}
                height={290}
                className="w-full h-full block object-cover"
              />
            </div>

            {/* Bottom Bezel Controls: 5 Blue/Cyan LED lights */}
            <div className="h-4 flex items-center justify-end px-2.5 space-x-1.5">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              <span className="w-1 h-1 rounded-full bg-cyan-400/80" />
              <span className="w-1 h-1 rounded-full bg-cyan-400/50" />
              <span className="w-1 h-1 rounded-full bg-neutral-600" />
            </div>

          </div>

          {/* Side Headphone/Ear Cushion Pads */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3.5 h-20 bg-[#26282d] rounded-l-xl border-l border-neutral-500" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3.5 h-20 bg-[#26282d] rounded-r-xl border-r border-neutral-500" />

          {/* Hanging Wire Cables (Left & Right clusters) */}
          <svg className="absolute -bottom-12 -left-4 w-16 h-20 pointer-events-none stroke-[#151618]" fill="none" strokeWidth="2.8" strokeLinecap="round">
            <path d="M 12 0 C 4 20, 2 45, 14 65" />
            <path d="M 22 0 C 10 25, 8 50, 18 75" strokeWidth="2" stroke="#25272a" />
          </svg>
          <svg className="absolute -bottom-12 -right-4 w-16 h-20 pointer-events-none stroke-[#151618]" fill="none" strokeWidth="3" strokeLinecap="round">
            <path d="M 6 0 C 18 25, 20 45, 4 68" />
            <path d="M 0 0 C 12 28, 14 55, 2 80" strokeWidth="2" stroke="#25272a" />
          </svg>
        </div>

      </div>

      {/* Turtleneck Mannequin Bust (Anchored gracefully to bottom) */}
      <div className="relative -mt-3 z-10 w-full flex flex-col items-center">
        
        {/* Neck Swivel Joint */}
        <div className="w-14 h-6 bg-gradient-to-b from-neutral-800 to-neutral-700 rounded-md" />
        
        {/* Turtleneck Ribbed High Collar */}
        <div className="w-24 sm:w-28 h-10 bg-gradient-to-b from-[#e3e4e7] via-[#cfd1d5] to-[#b6b8be] rounded-t-xl border-t border-white/80" />

        {/* Turtleneck Sweater Bust / Shoulders */}
        <div className="w-[280px] sm:w-[340px] md:w-[400px] lg:w-[450px] h-32 sm:h-36 md:h-40 bg-gradient-to-b from-[#dedfe3] via-[#c8cad0] to-[#a2a5ad] rounded-t-[55px] border-t border-white/90 overflow-hidden relative">
          {/* Subtle fabric lighting gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-gradient-to-b from-white/35 to-transparent blur-md pointer-events-none" />
        </div>

      </div>

    </div>
  );
}
