import { useEffect, useRef } from 'react';
import { soundManager } from '../lib/SoundManager';
import { hardwareGovernor } from '../engine/omega';

export type OrbMood = 'eyes' | 'happy' | 'glyph' | 'analytical' | 'creative' | 'technical' | 'visionary' | 'matrix' | 'swarm' | 'kernel' | 'quantum' | (string & {});
export type OrbTopology = OrbMood;

interface TechOrbCanvasProps {
  topology?: OrbTopology;
  mood?: OrbMood;
  isAudioPlaying?: boolean;
  onInteract?: () => void;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  speed: number;
  color: string;
}

export default function TechOrbCanvas({
  topology: _topology = 'matrix',
  mood: _mood,
  isAudioPlaying = false,
  onInteract,
}: TechOrbCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const audioIntensityRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number = 0;
    let width = 0;
    let height = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = container.clientWidth || 460;
      height = container.clientHeight || 460;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate 3D Holographic Particles on a Fibonacci Hyper-Sphere & Slanted Accents
    const particleCount = hardwareGovernor.currentTier === 'ECO' ? 140 : 260;
    const sphereRadius = Math.min(width, height) * 0.28;
    const particles: Particle3D[] = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * sphereRadius;
      const py = y * sphereRadius;
      const z = Math.sin(theta) * radiusAtY * sphereRadius;

      // Color scheme: Pure Cyan #00F0FF, Pure White, Silver Slate
      const isCore = Math.random() > 0.75;
      const isSilver = Math.random() > 0.5;
      const color = isCore ? '#00f0ff' : isSilver ? '#ffffff' : '#64748b';

      particles.push({
        x,
        y: py,
        z,
        baseX: x,
        baseY: py,
        baseZ: z,
        size: isCore ? 2.2 : 1.4,
        speed: 0.008 + Math.random() * 0.006,
        color,
      });
    }

    // Outer Slanted Razor Orbital Ring (-18 degrees matching I2F logo slash)
    const ringCount = 70;
    const ringRadius = sphereRadius * 1.38;
    const ringParticles: { angle: number; radius: number; speed: number; yOffset: number }[] = [];

    for (let i = 0; i < ringCount; i++) {
      ringParticles.push({
        angle: (i / ringCount) * Math.PI * 2,
        radius: ringRadius + (Math.random() - 0.5) * 12,
        speed: 0.012 + Math.random() * 0.006,
        yOffset: (Math.random() - 0.5) * 8,
      });
    }

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - cx) / (window.innerWidth / 2);
      mouseRef.current.targetY = (e.clientY - cy) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Visibility Lifecycle Governor
    let isTabVisible = !document.hidden;
    const handleVisibility = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animId) {
        lastTime = performance.now();
        render(performance.now());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let angleX = 0;
    let angleY = 0;
    let lastTime = performance.now();

    // 120Hz/60Hz Projection Render Loop
    const render = (time: number) => {
      if (!isTabVisible) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(render);

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Audio intensity interpolation
      const targetAudio = isAudioPlaying ? 1.0 : 0.0;
      audioIntensityRef.current += (targetAudio - audioIntensityRef.current) * 0.08;
      const audioPulse = audioIntensityRef.current * (Math.sin(time * 0.008) * 0.15 + 0.15);

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      angleY += (0.24 + audioIntensityRef.current * 0.2) * dt + mouseRef.current.x * 0.04;
      angleX = Math.sin(time * 0.0008) * 0.18 - mouseRef.current.y * 0.35;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 380;

      // Draw Depth Focal Grid Rays
      ctx.save();
      ctx.translate(centerX, centerY);

      // Rotate and Project Particles
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // Slanted Razor Axis Transformation (-18 deg)
      const slantAngle = -0.314; // -18 degrees in radians
      const cosSlant = Math.cos(slantAngle);
      const sinSlant = Math.sin(slantAngle);

      interface ProjectedPoint {
        px: number;
        py: number;
        scale: number;
        alpha: number;
        color: string;
        size: number;
        pz: number;
      }

      const projected: ProjectedPoint[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wave deformation
        const wave = Math.sin(time * 0.003 + p.baseY * 0.05) * 6;
        const radiusScale = 1.0 + audioPulse + wave * 0.015;

        const curX = p.baseX * radiusScale;
        const curY = p.baseY * radiusScale;
        const curZ = p.baseZ * radiusScale;

        // 3D Rotation (Y axis then X axis)
        const x1 = curX * cosY - curZ * sinY;
        const z1 = curZ * cosY + curX * sinY;
        const y2 = curY * cosX - z1 * sinX;
        const z2 = z1 * cosX + curY * sinX;

        // Slant tilt
        const x3 = x1 * cosSlant - y2 * sinSlant;
        const y3 = x1 * sinSlant + y2 * cosSlant;

        const dist = fov / (fov + z2);
        const px = x3 * dist;
        const py = y3 * dist;
        const alpha = Math.max(0.12, Math.min(1.0, (z2 + sphereRadius) / (sphereRadius * 2)));

        projected.push({
          px,
          py,
          scale: dist,
          alpha,
          color: p.color,
          size: p.size * dist,
          pz: z2,
        });
      }

      // Sort by depth for correct compositing
      projected.sort((a, b) => a.pz - b.pz);

      // Draw Synaptic Neural Connections between closest projected points
      ctx.lineWidth = 0.65;
      const maxConnectDist = sphereRadius * 0.32;

      for (let i = 0; i < projected.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 8, projected.length); j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDist * maxConnectDist) {
            const lineAlpha = (1 - Math.sqrt(distSq) / maxConnectDist) * 0.18 * projected[i].alpha;
            ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw Particles
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = pt.alpha;
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Slanted Kinetic Razor Orbital Ring
      ctx.lineWidth = 1.0;
      for (let i = 0; i < ringParticles.length; i++) {
        const rp = ringParticles[i];
        rp.angle += rp.speed;

        const rx = Math.cos(rp.angle) * rp.radius;
        const rz = Math.sin(rp.angle) * rp.radius;
        const ry = rp.yOffset;

        // Apply 3D rotation & -18 deg slant
        const x1 = rx * cosY - rz * sinY;
        const z1 = rz * cosY + rx * sinY;
        const y2 = ry * cosX - z1 * sinX;
        const z2 = z1 * cosX + ry * sinX;

        const x3 = x1 * cosSlant - y2 * sinSlant;
        const y3 = x1 * sinSlant + y2 * cosSlant;

        const dist = fov / (fov + z2);
        const px = x3 * dist;
        const py = y3 * dist;
        const alpha = Math.max(0.1, Math.min(0.85, (z2 + ringRadius) / (ringRadius * 2)));

        ctx.fillStyle = i % 4 === 0 ? '#00f0ff' : '#ffffff';
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(px, py, 1.2 * dist, 0, Math.PI * 2);
        ctx.fill();
      }

      // Central Tachyon Quantum Core Pulse Glow
      ctx.globalAlpha = 0.25 + audioPulse * 0.3;
      const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, sphereRadius * 0.45);
      coreGrad.addColorStop(0, 'rgba(0, 240, 255, 0.4)');
      coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, sphereRadius * 0.45, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    render(performance.now());

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isAudioPlaying]);

  const handleClick = () => {
    soundManager.playRazorClick();
    onInteract?.();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="relative w-[340px] sm:w-[420px] md:w-[480px] lg:w-[540px] aspect-square max-h-[min(58vh,500px)] flex items-center justify-center cursor-pointer select-none group"
      title="I2FLabs Autonomous Cognitive Core // Neural Wavefront Simulator"
    >
      {/* 4 Precision Telemetry HUD Marks (Pure Tech, Zero Emotion) */}
      <div className="absolute top-2 left-2 text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase pointer-events-none flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span className="text-white font-semibold">TENSOR CORE:</span>
        <span className="text-cyan-400 font-bold">120 FPS</span>
      </div>

      <div className="absolute top-2 right-2 text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-white font-semibold">TOPOLOGY:</span>
        <span className="text-slate-300 ml-1">RIEMANNIAN 3-MANIFOLD</span>
      </div>

      <div className="absolute bottom-2 left-2 text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-white font-semibold">ENTROPY:</span>
        <span className="text-cyan-400 ml-1 font-bold">0.0019 ΔS</span>
      </div>

      <div className="absolute bottom-2 right-2 text-[9px] font-mono tracking-[0.25em] text-slate-400 uppercase pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-white font-semibold">LATENCY:</span>
        <span className="text-cyan-400 ml-1 font-bold">0.0MS</span>
      </div>

      {/* High-Performance Native 2D Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Soft Contact Ambient Floor Glow */}
      <div className="absolute -bottom-4 w-3/5 h-12 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
    </div>
  );
}
