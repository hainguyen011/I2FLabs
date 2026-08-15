import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { soundManager } from '../lib/SoundManager';

export type OrbMood = 'eyes' | 'glyph' | 'happy' | 'wink' | 'neutral';

interface TechOrbCanvasProps {
  mood?: OrbMood;
  isAudioPlaying?: boolean;
  onInteract?: () => void;
}

export default function TechOrbCanvas({
  mood: _mood = 'neutral',
  isAudioPlaying = false,
  onInteract,
}: TechOrbCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isAudioPlayingRef = useRef(isAudioPlaying);

  useEffect(() => {
    isAudioPlayingRef.current = isAudioPlaying;
  }, [isAudioPlaying]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 460;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.z = 8.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D objects
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // 1. Generate Main Fibonacci Sphere Particles (Micro-dots)
    const particleCount = 3800;
    const sphereRadius = 2.0;
    const basePositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      basePositions[i * 3] = x * sphereRadius;
      basePositions[i * 3 + 1] = y * sphereRadius;
      basePositions[i * 3 + 2] = z * sphereRadius;

      currentPositions[i * 3] = basePositions[i * 3];
      currentPositions[i * 3 + 1] = basePositions[i * 3 + 1];
      currentPositions[i * 3 + 2] = basePositions[i * 3 + 2];

      // Palette: Elegant Charcoal / Deep minimal dots
      const isCore = Math.random() > 0.6;
      if (isCore) {
        colors[i * 3] = 0.10 + Math.random() * 0.08;
        colors[i * 3 + 1] = 0.10 + Math.random() * 0.08;
        colors[i * 3 + 2] = 0.12 + Math.random() * 0.08;
      } else {
        colors[i * 3] = 0.03 + Math.random() * 0.04;
        colors[i * 3 + 1] = 0.03 + Math.random() * 0.04;
        colors[i * 3 + 2] = 0.05 + Math.random() * 0.04;
      }

      scales[i] = 0.8 + Math.random() * 1.2;
    }

    const sphereGeometry = new THREE.BufferGeometry();
    sphereGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    sphereGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    sphereGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Particle Texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.35, 'rgba(240, 245, 255, 0.9)');
        grad.addColorStop(0.7, 'rgba(20, 20, 25, 0.3)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.048,
      map: createCircleTexture(),
      transparent: true,
      vertexColors: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(sphereGeometry, particleMaterial);
    orbGroup.add(particlePoints);

    // 2. Outer Orbital Ring 1 (Fine micro-dots)
    const ring1Count = 260;
    const ring1Positions = new Float32Array(ring1Count * 3);
    const ring1Radius = sphereRadius * 1.35;
    for (let i = 0; i < ring1Count; i++) {
      const angle = (i / ring1Count) * Math.PI * 2;
      ring1Positions[i * 3] = Math.cos(angle) * ring1Radius;
      ring1Positions[i * 3 + 1] = Math.sin(angle) * ring1Radius;
      ring1Positions[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }
    const ring1Geometry = new THREE.BufferGeometry();
    ring1Geometry.setAttribute('position', new THREE.BufferAttribute(ring1Positions, 3));
    const ring1Material = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x111111,
      transparent: true,
      opacity: 0.7,
      map: createCircleTexture(),
      depthWrite: false,
    });
    const ring1 = new THREE.Points(ring1Geometry, ring1Material);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    orbGroup.add(ring1);

    // 3. Outer Orbital Ring 2 (Fine micro-dots)
    const ring2Count = 220;
    const ring2Positions = new Float32Array(ring2Count * 3);
    const ring2Radius = sphereRadius * 1.22;
    for (let i = 0; i < ring2Count; i++) {
      const angle = (i / ring2Count) * Math.PI * 2;
      ring2Positions[i * 3] = Math.cos(angle) * ring2Radius;
      ring2Positions[i * 3 + 1] = Math.sin(angle) * ring2Radius;
      ring2Positions[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
    }
    const ring2Geometry = new THREE.BufferGeometry();
    ring2Geometry.setAttribute('position', new THREE.BufferAttribute(ring2Positions, 3));
    const ring2Material = new THREE.PointsMaterial({
      size: 0.030,
      color: 0x222222,
      transparent: true,
      opacity: 0.6,
      map: createCircleTexture(),
      depthWrite: false,
    });
    const ring2 = new THREE.Points(ring2Geometry, ring2Material);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    orbGroup.add(ring2);

    // Mouse Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 460;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Audio Reactivity state
    let smoothedAudioIntensity = 0;

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth audio transition
      const targetAudio = isAudioPlayingRef.current ? 1.0 : 0.0;
      smoothedAudioIntensity += (targetAudio - smoothedAudioIntensity) * 0.06;

      // Audio Frequency Synthesizer & Rhythmic Beat Physics (124 BPM rhythm)
      const beatPhase = (elapsedTime * 2.06) % 1.0;
      const bassKick = Math.pow(Math.sin(beatPhase * Math.PI), 8) * smoothedAudioIntensity;
      const snareSnap = Math.pow(Math.sin(((beatPhase + 0.5) % 1.0) * Math.PI), 12) * smoothedAudioIntensity;
      const highFreqShimmer = (Math.sin(elapsedTime * 14.0) * 0.5 + 0.5) * smoothedAudioIntensity;

      const totalAudioEnergy = bassKick * 0.6 + snareSnap * 0.3 + highFreqShimmer * 0.2;

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const { x, y } = mouseRef.current;

      // Dynamic Group rotation accelerated by audio energy
      const rotSpeed = 0.18 + smoothedAudioIntensity * 0.15;
      orbGroup.rotation.y = elapsedTime * rotSpeed + x * 0.6;
      orbGroup.rotation.x = elapsedTime * 0.08 - y * 0.4;
      orbGroup.rotation.z = Math.sin(elapsedTime * 0.1) * 0.1;

      // Scale bounce on bass hits
      const currentScale = 1.0 + bassKick * 0.15 + snareSnap * 0.06;
      orbGroup.scale.set(currentScale, currentScale, currentScale);

      // Rings spin with audio bounce
      ring1.rotation.z = -elapsedTime * (0.25 + totalAudioEnergy * 0.5);
      ring2.rotation.z = elapsedTime * (0.2 + totalAudioEnergy * 0.4);

      // Fluid Wave Ripple on Sphere Particles with Audio Resonance
      const posAttr = sphereGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      const waveSpeed = 2.2 + smoothedAudioIntensity * 2.8;
      const waveAmplitude = 0.08 + smoothedAudioIntensity * (0.07 + bassKick * 0.14);

      for (let i = 0; i < particleCount; i++) {
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];

        // 3D Noise wave modulated by audio resonance
        const wave =
          Math.sin(bx * (1.5 + bassKick * 0.8) + elapsedTime * waveSpeed) * waveAmplitude +
          Math.cos(by * (1.8 + snareSnap * 0.6) + elapsedTime * (waveSpeed * 0.85)) * waveAmplitude +
          Math.sin(bz * 1.2 + elapsedTime * (waveSpeed * 0.7)) * (waveAmplitude * 0.9);

        const pulseFactor = 1 + wave;

        posArray[i * 3] = bx * pulseFactor;
        posArray[i * 3 + 1] = by * pulseFactor;
        posArray[i * 3 + 2] = bz * pulseFactor;
      }
      posAttr.needsUpdate = true;

      // Subtle particle point size pulsation on beats
      particleMaterial.size = 0.048 + bassKick * 0.02 + highFreqShimmer * 0.008;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeometry.dispose();
      ring1Geometry.dispose();
      ring2Geometry.dispose();
      particleMaterial.dispose();
      ring1Material.dispose();
      ring2Material.dispose();
    };
  }, []);

  const handleClick = () => {
    soundManager.playPop();
    onInteract?.();
  };

  return (
    <div
      ref={mountRef}
      onClick={handleClick}
      className="relative w-[360px] sm:w-[440px] md:w-[520px] lg:w-[580px] aspect-square max-h-[min(62vh,540px)] flex items-center justify-center cursor-pointer select-none"
    >
      {/* Studio Floor Soft Contact Shadow */}
      <div className="absolute -bottom-4 w-3/5 h-12 bg-black/15 blur-2xl rounded-full pointer-events-none" />
    </div>
  );
}
