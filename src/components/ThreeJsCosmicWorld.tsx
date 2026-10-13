import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJsCosmicWorldProps {
  mode?: 'prologue' | 'epochs';
  prologueProgress?: number;
  epochProgress?: number;
  totalEpochs?: number;
  storyProgress?: number;
  onInteract?: () => void;
}

export default function ThreeJsCosmicWorld({
  mode,
  prologueProgress = 0,
  epochProgress = 0,
  totalEpochs = 10,
  storyProgress,
  onInteract,
}: ThreeJsCosmicWorldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Tiến trình thống nhất: S chạy từ 0.0 (Genesis) -> 1.00 (Blast) -> 1.65 (Epoch 1) -> 8.05 (Epoch 9) -> 8.85 (Epoch 10 Earth)
  const calcTarget = () => {
    if (storyProgress !== undefined) return storyProgress;
    if (mode === 'prologue') return prologueProgress * 1.05;
    const maxEpochIdx = Math.max(1, totalEpochs - 1); // 9
    return 1.65 + (epochProgress / maxEpochIdx) * 7.20;
  };

  const targetProgressRef = useRef(calcTarget());
  const currentProgressRef = useRef(calcTarget());
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    targetProgressRef.current = calcTarget();
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Perspective Camera with dynamic FOV
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 1000);

    // 3. WebGLRenderer with high-performance settings
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init error:', e);
    }

    // ------------------------------------------------------------------------
    // 4. CAMERA WAYPOINT TRAJECTORY (13 WAYPOINTS TƯƠNG ỨNG 10 THỜI KỲ & KHỞI NGUYÊN)
    // ------------------------------------------------------------------------
    const waypoints = [
      // 0. Genesis Start (S = 0.0): nhìn thẳng điểm ảnh 2D ở tâm
      { pos: new THREE.Vector3(0.0, 0.0, 4.5), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 44 },
      // 1. Genesis Accrete (S = 0.65): tiến lại gần khi nén voxel 3D
      { pos: new THREE.Vector3(0.0, 0.0, 3.4), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 40 },
      // 2. Genesis Blast (S = 1.00): lùi xa khi nổ và giăng dây liên kết
      { pos: new THREE.Vector3(0.0, 0.05, 5.0), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 50 },
      // 3. Epoch 1 (S = 1.65): Punch Card Thẻ đục lỗ
      { pos: new THREE.Vector3(0.0, 0.2, 3.8), look: new THREE.Vector3(0.0, 0.05, 0.0), fov: 42 },
      // 4. Epoch 2 (S = 2.45): Blade Tower Khung phiến nguyên khối
      { pos: new THREE.Vector3(0.0, -1.2, 4.4), look: new THREE.Vector3(0.0, 0.35, 0.0), fov: 48 },
      // 5. Epoch 3 (S = 3.25): P2P Mesh Network
      { pos: new THREE.Vector3(0.0, 0.1, 4.5), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 46 },
      // 6. Epoch 4 (S = 4.05): Deep Neural Layers
      { pos: new THREE.Vector3(1.6, 1.4, 4.2), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 44 },
      // 7. Epoch 5 (S = 4.85): Generative AI & LLMs (Transformers & Attention)
      { pos: new THREE.Vector3(-1.8, 1.2, 4.5), look: new THREE.Vector3(0.0, 0.1, 0.0), fov: 45 },
      // 8. Epoch 6 (S = 5.65): Autonomous AI Agent Core
      { pos: new THREE.Vector3(0.0, 0.8, 4.2), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 43 },
      // 9. Epoch 7 (S = 6.45): Multi-Agent Swarm Intelligence
      { pos: new THREE.Vector3(2.0, -0.6, 4.8), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 47 },
      // 10. Epoch 8 (S = 7.25): Autonomous OS & AevumOS Microkernel
      { pos: new THREE.Vector3(-1.4, -0.7, 4.4), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 45 },
      // 11. Epoch 9 (S = 8.05): Internet of Agents & AGI (Cosmic Voxel Nebula)
      { pos: new THREE.Vector3(0.0, 0.45, 5.8), look: new THREE.Vector3(0.0, 0.0, 0.0), fov: 46 },
      // 12. Epoch 10 (S = 8.85): I2FLabs Vietnam (Vòm Trái Đất số khổng lồ nhô lên từ nửa dưới màn hình)
      { pos: new THREE.Vector3(0.0, 0.45, 5.2), look: new THREE.Vector3(0.0, -0.35, 0.0), fov: 46 },
    ];

    // ------------------------------------------------------------------------
    // 5. GEOMETRIES (N = 2800 POINTS CHO ĐỘ CHI TIẾT SẮC NÉT)
    // ------------------------------------------------------------------------
    const N = 2800;

    // 5.0.1 Hạt ở rìa không gian sâu (Outer Cosmos Boundary)
    const outerCoords: number[] = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(Math.random() * 2 - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 9.0 + Math.random() * 14.0;
      outerCoords.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
    }

    // 5.0.2 Nén lại thành MỘT VOXEL 3D LẬP PHƯƠNG SÁNG CHÓI (Single Bright Miniature Voxel Cube)
    const singularityCoords: number[] = [];
    const voxelHalf = 0.038;
    for (let i = 0; i < N; i++) {
      const face = i % 6;
      const u = (((Math.floor(i / 6)) % 22) / 21 - 0.5) * 2 * voxelHalf;
      const v = (((Math.floor(i / 132)) % 22) / 21 - 0.5) * 2 * voxelHalf;
      let vx = 0, vy = 0, vz = 0;
      if (face === 0) { vx = voxelHalf; vy = u; vz = v; }
      else if (face === 1) { vx = -voxelHalf; vy = u; vz = v; }
      else if (face === 2) { vx = u; vy = voxelHalf; vz = v; }
      else if (face === 3) { vx = u; vy = -voxelHalf; vz = v; }
      else if (face === 4) { vx = u; vy = v; vz = voxelHalf; }
      else { vx = u; vy = v; vz = -voxelHalf; }
      singularityCoords.push(vx, vy, vz);
    }

    // 5.0.3 Hạt bắn ra lơ lửng xung quanh (Exploded Nebula Floating Cloud)
    const explodedCoords: number[] = [];
    const floatPhases: number[] = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(Math.random() * 2 - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.0 + Math.pow(Math.random(), 1.3) * 4.2;
      explodedCoords.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.88,
        r * Math.cos(phi)
      );
      floatPhases.push(
        0.8 + Math.random() * 1.5,
        Math.random() * Math.PI * 2
      );
    }

    // MODEL 1: THẺ ĐỤC LỖ 3D (Punch Card - Thời kỳ 1)
    const punchCoords: number[] = [];
    const cardW = 2.6;
    const cardH = 1.7;
    for (let i = 0; i < N; i++) {
      if (i < 1700) {
        const col = i % 40;
        const row = Math.floor(i / 40) % 42;
        let x = (col / 39 - 0.5) * cardW;
        let y = (row / 41 - 0.5) * cardH;

        if (x > cardW * 0.35 && y > cardH * 0.3) {
          x -= 0.3;
          y -= 0.3;
        }

        const isHole =
          (col % 4 === 1 && (row % 6 === 2 || row % 6 === 4)) ||
          (col % 7 === 3 && row % 5 === 1);
        const z = isHole ? -0.25 : ((i % 4) / 3 - 0.5) * 0.08;
        punchCoords.push(x, y, z);
      } else if (i < 2300) {
        const t = (i - 1700) / 600;
        const perimeter = t * 4;
        let x = 0, y = 0;
        if (perimeter < 1) {
          x = -cardW * 0.5 + perimeter * cardW;
          y = -cardH * 0.5;
        } else if (perimeter < 2) {
          x = cardW * 0.5;
          y = -cardH * 0.5 + (perimeter - 1) * cardH;
        } else if (perimeter < 3) {
          x = cardW * 0.5 - (perimeter - 2) * cardW;
          y = cardH * 0.5;
        } else {
          x = -cardW * 0.5;
          y = cardH * 0.5 - (perimeter - 3) * cardH;
        }
        punchCoords.push(x, y, 0);
      } else {
        punchCoords.push(
          (Math.random() - 0.5) * (cardW + 0.6),
          (Math.random() - 0.5) * (cardH + 0.6),
          (Math.random() - 0.5) * 0.3
        );
      }
    }

    // MODEL 2: KHUNG PHIẾN NGUYÊN KHỐI (Monolithic Blade Tower - Thời kỳ 2)
    const serverCoords: number[] = [];
    const rackW = 1.6;
    const rackH = 2.8;
    const rackD = 1.0;
    const numBlades = 8;
    for (let i = 0; i < N; i++) {
      if (i < 1300) {
        const bladeIdx = i % numBlades;
        const pInBlade = Math.floor(i / numBlades);
        const yBlade = ((bladeIdx / (numBlades - 1)) - 0.5) * (rackH * 0.85);
        const col = pInBlade % 16;
        const row = Math.floor(pInBlade / 16);
        const x = (col / 15 - 0.5) * (rackW * 0.88);
        const z = (row / 10 - 0.5) * (rackD * 0.88);
        const y = yBlade + ((pInBlade % 3) / 2 - 0.5) * 0.05;
        serverCoords.push(x, y, z);
      } else if (i < 2200) {
        const edgeIdx = i % 12;
        const t = ((i - 1300) % 75) / 74;
        let x = 0, y = 0, z = 0;
        const hw = rackW * 0.5, hh = rackH * 0.5, hd = rackD * 0.5;
        if (edgeIdx === 0) { x = -hw; y = -hh + t * rackH; z = -hd; }
        else if (edgeIdx === 1) { x = hw; y = -hh + t * rackH; z = -hd; }
        else if (edgeIdx === 2) { x = -hw; y = -hh + t * rackH; z = hd; }
        else if (edgeIdx === 3) { x = hw; y = -hh + t * rackH; z = hd; }
        else if (edgeIdx === 4) { x = -hw + t * rackW; y = -hh; z = -hd; }
        else if (edgeIdx === 5) { x = -hw + t * rackW; y = hh; z = -hd; }
        else if (edgeIdx === 6) { x = -hw + t * rackW; y = -hh; z = hd; }
        else if (edgeIdx === 7) { x = -hw + t * rackW; y = hh; z = hd; }
        else if (edgeIdx === 8) { x = -hw; y = -hh; z = -hd + t * rackD; }
        else if (edgeIdx === 9) { x = hw; y = -hh; z = -hd + t * rackD; }
        else if (edgeIdx === 10) { x = -hw; y = hh; z = -hd + t * rackD; }
        else { x = hw; y = hh; z = -hd + t * rackD; }
        serverCoords.push(x, y, z);
      } else {
        const yLed = ((i % 16) / 15 - 0.5) * rackH * 0.8;
        const xLed = -rackW * 0.5 + 0.06;
        const zLed = rackD * 0.5;
        serverCoords.push(xLed, yLed, zLed);
      }
    }

    // MODEL 3: DECENTRALIZED P2P MESH (Mạng phân tán - Thời kỳ 3)
    const meshCoords: number[] = [];
    const numClusters = 7;
    const clusterCenters = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-1.8, 0.9, -0.6),
      new THREE.Vector3(1.8, 0.7, 0.8),
      new THREE.Vector3(-1.2, -1.1, 1.0),
      new THREE.Vector3(1.3, -1.0, -0.9),
      new THREE.Vector3(0.2, 1.7, 0.4),
      new THREE.Vector3(-0.3, -1.8, -0.5),
    ];
    for (let i = 0; i < N; i++) {
      if (i < 2050) {
        const cIdx = i % numClusters;
        const center = clusterCenters[cIdx];
        const phi = Math.acos(Math.random() * 2 - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.6) * 0.65;
        meshCoords.push(
          center.x + r * Math.sin(phi) * Math.cos(theta),
          center.y + r * Math.sin(phi) * Math.sin(theta),
          center.z + r * Math.cos(phi)
        );
      } else {
        const pair = i % 6;
        const c1 = clusterCenters[pair];
        const c2 = clusterCenters[(pair + 1) % numClusters];
        const t = Math.random();
        meshCoords.push(
          c1.x * (1 - t) + c2.x * t + (Math.random() - 0.5) * 0.08,
          c1.y * (1 - t) + c2.y * t + (Math.random() - 0.5) * 0.08,
          c1.z * (1 - t) + c2.z * t + (Math.random() - 0.5) * 0.08
        );
      }
    }

    // MODEL 4: DEEP NEURAL LAYERS (Mạng nơ-ron và học sâu - Thời kỳ 4)
    const neuralCoords: number[] = [];
    const numLayers = 5;
    const layerZ = [-1.5, -0.75, 0.0, 0.75, 1.5];
    const nodesPerLayer = [14, 20, 24, 20, 10];
    for (let i = 0; i < N; i++) {
      if (i < 1350) {
        const lIdx = i % numLayers;
        const count = nodesPerLayer[lIdx];
        const nodeIdx = Math.floor(i / numLayers) % count;
        const theta = (nodeIdx / count) * Math.PI * 2;
        const r = 0.5 + (nodeIdx % 3) * 0.35;
        const x = Math.cos(theta) * r;
        const y = Math.sin(theta) * r;
        const z = layerZ[lIdx] + ((i % 5) / 4 - 0.5) * 0.06;
        neuralCoords.push(x, y, z);
      } else {
        const lFrom = (i % (numLayers - 1));
        const lTo = lFrom + 1;
        const t = Math.random();
        const z = layerZ[lFrom] * (1 - t) + layerZ[lTo] * t;
        const r = 0.45 + Math.sin(t * Math.PI) * 0.4;
        const angle = (i / 1400) * Math.PI * 16;
        neuralCoords.push(Math.cos(angle) * r, Math.sin(angle) * r, z);
      }
    }

    // MODEL 5: GENERATIVE AI & LLMs (Transformer Self-Attention & Latent Manifold - Thời kỳ 5)
    const genAiCoords: number[] = [];
    for (let i = 0; i < N; i++) {
      if (i < 1100) {
        const gridW = 32;
        const col = i % gridW;
        const row = Math.floor(i / gridW);
        const x = (col / (gridW - 1) - 0.5) * 2.4;
        const z = (row / (gridW - 1) - 0.5) * 2.4;
        const distCenter = Math.sqrt(x * x + z * z);
        const y = -0.7 + Math.exp(-distCenter * distCenter * 2.2) * 0.55 + ((i % 4) / 3 - 0.5) * 0.04;
        genAiCoords.push(x, y, z);
      } else if (i < 2100) {
        const tArc = (i - 1100) / 1000;
        const theta = tArc * Math.PI * 12.0;
        const r = 0.35 + tArc * 1.25;
        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;
        const y = -0.6 + Math.sin(tArc * Math.PI) * 1.8;
        genAiCoords.push(x, y, z);
      } else {
        const phi = Math.acos(Math.random() * 2 - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = 0.2 + Math.pow(Math.random(), 0.5) * 0.85;
        genAiCoords.push(
          r * Math.sin(phi) * Math.cos(theta),
          1.1 + r * Math.sin(phi) * Math.sin(theta) * 0.7,
          r * Math.cos(phi)
        );
      }
    }

    // MODEL 6: KỶ NGUYÊN TÁC NHÂN AI (Autonomous AI Agent Core - Thời kỳ 6)
    const agentCoords: number[] = [];
    for (let i = 0; i < N; i++) {
      if (i < 1400) {
        const phi = Math.acos(Math.random() * 2 - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.5) * 0.72;
        agentCoords.push(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.95 + 0.15,
          r * Math.cos(phi)
        );
      } else if (i < 2000) {
        const tLoop = ((i - 1400) / 600) * Math.PI * 2;
        const rOrbit = 1.45;
        const ox = Math.cos(tLoop) * rOrbit;
        const oy = Math.sin(tLoop) * rOrbit * 0.45 + 0.15;
        const oz = Math.sin(tLoop) * rOrbit * 0.88;
        agentCoords.push(ox, oy, oz);
      } else {
        const satIdx = Math.floor((i - 2000) / 200) % 4;
        const satAngles = [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5];
        const angle = satAngles[satIdx];
        const satX = Math.cos(angle) * 1.7;
        const satY = Math.sin(angle) * 0.7 + 0.15;
        const satZ = Math.sin(angle) * 1.4;
        const pInSat = (i - 2000) % 200;
        const subX = ((pInSat % 6) / 5 - 0.5) * 0.28;
        const subY = ((Math.floor(pInSat / 6) % 6) / 5 - 0.5) * 0.28;
        const subZ = ((Math.floor(pInSat / 36) % 6) / 5 - 0.5) * 0.28;
        agentCoords.push(satX + subX, satY + subY, satZ + subZ);
      }
    }

    // MODEL 7: MẠNG LƯỚI ĐA TÁC NHÂN (Multi-Agent Swarm Intelligence - Thời kỳ 7)
    const multiAgentCoords: number[] = [];
    const agentPods = [
      new THREE.Vector3(-1.6, 0.85, -0.4),  // Planner Agent
      new THREE.Vector3(1.6, 0.75, 0.5),   // Coder / Tool Agent
      new THREE.Vector3(-1.1, -1.0, 0.7),  // Critic / Verifier Agent
      new THREE.Vector3(1.3, -0.9, -0.7),  // Runtime / Executor Agent
    ];
    for (let i = 0; i < N; i++) {
      if (i < 1800) {
        const pIdx = i % 4;
        const center = agentPods[pIdx];
        const phi = Math.acos(Math.random() * 2 - 1);
        const theta = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.55) * 0.52;
        multiAgentCoords.push(
          center.x + r * Math.sin(phi) * Math.cos(theta),
          center.y + r * Math.sin(phi) * Math.sin(theta),
          center.z + r * Math.cos(phi)
        );
      } else {
        const pair = i % 4;
        const p1 = agentPods[pair];
        const p2 = agentPods[(pair + 1) % 4];
        const t = Math.random();
        multiAgentCoords.push(
          p1.x * (1 - t) + p2.x * t + (Math.random() - 0.5) * 0.09,
          p1.y * (1 - t) + p2.y * t + (Math.random() - 0.5) * 0.09,
          p1.z * (1 - t) + p2.z * t + (Math.random() - 0.5) * 0.09
        );
      }
    }

    // MODEL 8: HỆ ĐIỀU HÀNH & TÁC NHÂN TỰ CHỦ (Autonomous OS & AevumOS Microkernel - Thời kỳ 8)
    const autonomousOsCoords: number[] = [];
    for (let i = 0; i < N; i++) {
      if (i < 1100) {
        const tH = (i / 1100 - 0.5) * 1.4;
        const angle = i * 0.22;
        const r = 0.38 + ((i % 5) / 4) * 0.22;
        autonomousOsCoords.push(Math.cos(angle) * r, tH, Math.sin(angle) * r);
      } else if (i < 2000) {
        const tRing = ((i - 1100) / 900) * Math.PI * 2;
        const rRing = 1.85 + ((i % 4) / 3 - 0.5) * 0.12;
        const yRing = ((i % 7) / 6 - 0.5) * 0.15;
        autonomousOsCoords.push(Math.cos(tRing) * rRing, yRing, Math.sin(tRing) * rRing);
      } else {
        const spokeIdx = i % 6;
        const spokeAngle = spokeIdx * (Math.PI / 3);
        const tSpoke = ((i - 2000) % 133) / 132;
        const r = 0.55 + tSpoke * 1.25;
        autonomousOsCoords.push(
          Math.cos(spokeAngle) * r,
          ((i % 3) - 1) * 0.06,
          Math.sin(spokeAngle) * r
        );
      }
    }

    // MODEL 9: INTERNET OF AGENTS & AGI (Mạng lưới tác nhân toàn cầu - Thời kỳ 9)
    const ioaAgiCoords: number[] = [];
    for (let i = 0; i < N; i++) {
      const armIdx = i % 4;
      const armOffset = armIdx * (Math.PI / 2);
      const tArm = i / N;
      const spiralTheta = tArm * Math.PI * 6.5 + armOffset;
      const spiralR = 0.5 + Math.pow(tArm, 0.72) * 5.4;

      const jitterZ = ((i % 13) / 12 - 0.5) * (1.2 + spiralR * 0.45);
      const jitterRadial = Math.sin(i * 1.83) * 0.42;

      const x = Math.cos(spiralTheta) * (spiralR + jitterRadial);
      const y = Math.sin(spiralTheta) * (spiralR + jitterRadial) * 0.72;
      const z = jitterZ;

      ioaAgiCoords.push(x, y, z);
    }

    // MODEL 10: VÒM TRÁI ĐẤT SỐ KHỔNG LỒ TỪ NỬA DƯỚI (Planetary Horizon Voxel Earth)
    // Chiếm hơn nửa màn hình từ dưới lên, TUYỆT ĐỐI KHÔNG CÓ VÒNG TRÒN / VÀNH ĐAI NÀO Ở NGOÀI
    const earthCoords: number[] = [];
    const earthRadius = 3.90;
    const earthCenterY = -2.85;
    const earthCenterZ = -0.30;

    for (let i = 0; i < N; i++) {
      // Phân bố đều toàn bộ 2800 hạt trên mặt vòm Trái Đất tự nhiên (Fibonacci dome)
      const tPhi = Math.pow(i / N, 0.58);
      const phi = tPhi * Math.PI * 0.56; // Vòm Trái Đất từ đỉnh xuống
      const theta = i * 2.39996323; // Golden angle

      // Cấu trúc địa hình lục địa và độ nổi voxel vi tế
      const continentNoise =
        Math.sin(phi * 5.5 + Math.cos(theta * 3.5) * 1.5) *
        Math.cos(theta * 4.5 + phi * 3.0);
      const r = earthRadius * (1.0 + (continentNoise > 0.08 ? 0.026 : -0.012) + ((i % 5) - 2) * 0.003);

      const ox = r * Math.sin(phi) * Math.sin(theta);
      const oy = r * Math.cos(phi);
      const oz = r * Math.sin(phi) * Math.cos(theta);

      earthCoords.push(ox, earthCenterY + oy, earthCenterZ + oz);
    }

    // ------------------------------------------------------------------------
    // 6. THREE.JS PARTICLES & MESHES
    // ------------------------------------------------------------------------
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);

    for (let i = 0; i < N * 3; i++) {
      positions[i] = outerCoords[i];
      colors[i] = 1.0;
    }

    const cloudGeometry = new THREE.BufferGeometry();
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    cloudGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.024,
      transparent: true,
      opacity: 0.0,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    const pointCloud = new THREE.Points(cloudGeometry, pointsMaterial);
    scene.add(pointCloud);

    // 6.0 ĐIỂM ẢNH BAN ĐẦU: MỘT PIXEL HÌNH VUÔNG 2D PHẲNG PHIU (LUÔN VUÔNG GÓC CAMERA)
    const pixelPlaneGeo = new THREE.PlaneGeometry(0.040, 0.040);
    const pixelPlaneMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1.0,
      side: THREE.DoubleSide,
    });
    const centralPixelPlane = new THREE.Mesh(pixelPlaneGeo, pixelPlaneMat);
    scene.add(centralPixelPlane);

    // 6.1 SAU KHI NÉN LẠI: MỚI THÀNH KHỐI VOXEL 3D LẬP PHƯƠNG SẮC NÉT
    const voxelBoxGeo = new THREE.BoxGeometry(0.076, 0.076, 0.076);
    const voxelBoxMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.96,
    });
    const centralVoxelMesh = new THREE.Mesh(voxelBoxGeo, voxelBoxMat);

    const voxelEdgeGeo = new THREE.EdgesGeometry(voxelBoxGeo);
    const voxelEdgeMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1.0,
    });
    const centralVoxelWire = new THREE.LineSegments(voxelEdgeGeo, voxelEdgeMat);
    centralVoxelMesh.add(centralVoxelWire);
    centralVoxelMesh.visible = false;
    scene.add(centralVoxelMesh);

    // Dynamic Wireframe Line Segments
    const wireIndices: number[] = [];
    for (let i = 0; i < N - 1; i += 2) {
      wireIndices.push(i, i + 1);
    }
    for (let i = 0; i < N - 6; i += 6) {
      wireIndices.push(i, i + 3);
    }
    cloudGeometry.setIndex(wireIndices);

    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.0,
    });
    const wireMesh = new THREE.LineSegments(cloudGeometry, wireMaterial);
    scene.add(wireMesh);

    // Deep Cosmic Dust Stars
    const starCount = 450;
    const starCoords: number[] = [];
    for (let i = 0; i < starCount; i++) {
      starCoords.push(
        (Math.random() - 0.5) * 26,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 22 - 3
      );
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starCoords, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      opacity: 0.22,
    });
    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // Mouse Parallax Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (renderer) renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Quintic Smoothstep Interpolator
    const smoothQuintic = (min: number, max: number, value: number) => {
      const t = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return t * t * t * (t * (t * 6 - 15) + 10);
    };

    let animationFrameId: number;
    let clock = 0;

    const currentCamPos = new THREE.Vector3().copy(waypoints[0].pos);
    const currentLookAt = new THREE.Vector3().copy(waypoints[0].look);

    // ------------------------------------------------------------------------
    // UNIFIED 120HZ RENDER LOOP
    // ------------------------------------------------------------------------
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.014;

      // Mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const posAttr = cloudGeometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      const colAttr = cloudGeometry.attributes.color as THREE.BufferAttribute;
      const colArr = colAttr.array as Float32Array;

      // Zenith Audio Reactive Beat Synthesis (124 BPM)
      const bpm = 124.0;
      const bps = bpm / 60.0;
      const beatTime = clock * bps;

      const kickPhase = (beatTime * Math.PI * 2) % (Math.PI * 2);
      const kickPulse = Math.pow(Math.max(0, Math.cos(kickPhase)), 18);

      const snarePhase = ((beatTime + 0.5) * Math.PI * 2) % (Math.PI * 2);
      const snarePulse = Math.pow(Math.max(0, Math.cos(snarePhase)), 12) * 0.75;

      const hihatPhase = (beatTime * 4.0 * Math.PI * 2) % (Math.PI * 2);
      const hihatShimmer = Math.pow(Math.max(0, Math.sin(hihatPhase)), 6);

      // Lerp Smoothly along continuous timeline S (0.0 to 8.85)
      currentProgressRef.current +=
        (targetProgressRef.current - currentProgressRef.current) * 0.065;
      const S = Math.max(0.0, Math.min(8.85, currentProgressRef.current));

      // ----------------------------------------------------------------------
      // CAMERA WAYPOINT FLIGHT PATH INTERPOLATION (13 MỐC CHUẨN XÁC LIỀN MẠCH)
      // ----------------------------------------------------------------------
      const waypointTimes = [
        0.0,   // 0. Genesis Start
        0.65,  // 1. Genesis Accrete
        1.05,  // 2. Genesis Blast
        1.65,  // 3. Epoch 1 Punch Card
        2.45,  // 4. Epoch 2 Blade Tower
        3.25,  // 5. Epoch 3 P2P Mesh
        4.05,  // 6. Epoch 4 Neural Network
        4.85,  // 7. Epoch 5 GenAI & LLM
        5.65,  // 8. Epoch 6 AI Agent
        6.45,  // 9. Epoch 7 Multi-Agent Swarm
        7.25,  // 10. Epoch 8 Autonomous OS
        8.05,  // 11. Epoch 9 Internet of Agents / AGI
        8.85,  // 12. Epoch 10 I2FLabs Vietnam (Voxel Earth)
      ];

      let segIdx = 0;
      for (let w = 0; w < waypointTimes.length - 1; w++) {
        if (S >= waypointTimes[w]) {
          segIdx = w;
        }
      }
      segIdx = Math.min(waypoints.length - 2, segIdx);
      const tStart = waypointTimes[segIdx];
      const tEnd = waypointTimes[segIdx + 1];
      const segT = smoothQuintic(tStart, tEnd, S);

      const wpStart = waypoints[segIdx];
      const wpEnd = waypoints[segIdx + 1];

      currentCamPos.lerpVectors(wpStart.pos, wpEnd.pos, segT);
      currentLookAt.lerpVectors(wpStart.look, wpEnd.look, segT);

      const targetFov = wpStart.fov * (1 - segT) + wpEnd.fov * segT;
      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }

      // Camera vibration on singularity compression
      let shake = 0;
      if (S >= 0.65 && S <= 0.88) {
        shake = Math.sin(((S - 0.65) / 0.23) * Math.PI) * 0.024;
      }

      camera.position.set(
        currentCamPos.x + mouseRef.current.x * 0.35 + (Math.random() - 0.5) * shake,
        currentCamPos.y - mouseRef.current.y * 0.35 + (Math.random() - 0.5) * shake,
        currentCamPos.z + (Math.random() - 0.5) * shake
      );
      camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);

      // ----------------------------------------------------------------------
      // 1. ĐIỂM ẢNH BAN ĐẦU: 1 PIXEL HÌNH VUÔNG 2D PHẲNG -> NÉN MỚI THÀNH VOXEL 3D
      // ----------------------------------------------------------------------
      if (S < 0.55) {
        centralPixelPlane.visible = true;
        centralVoxelMesh.visible = false;
        centralPixelPlane.quaternion.copy(camera.quaternion);
        const pScale = S < 0.08 ? 1.0 : 1.0 + (S - 0.08) * 0.5;
        centralPixelPlane.scale.set(pScale, pScale, pScale);
        pixelPlaneMat.opacity = Math.max(0, 1 - Math.max(0, (S - 0.48) / 0.07));
      } else if (S < 0.85) {
        centralPixelPlane.visible = false;
        centralVoxelMesh.visible = true;
        centralVoxelMesh.rotation.x = clock * 0.75;
        centralVoxelMesh.rotation.y = clock * 0.95;
        const vScale = 0.65 + ((S - 0.55) / 0.30) * 0.45;
        centralVoxelMesh.scale.set(vScale, vScale, vScale);
        voxelBoxMat.opacity = Math.min(1.0, 0.85 + ((S - 0.55) / 0.30) * 0.15);
      } else {
        centralPixelPlane.visible = false;
        centralVoxelMesh.visible = false;
      }

      // ----------------------------------------------------------------------
      // 2. PARTICLE DENSITY & MATERIAL OPACITY / SIZE
      // ----------------------------------------------------------------------
      if (S < 0.06) {
        pointsMaterial.opacity = 0.0;
        pointsMaterial.size = 0.028;
        wireMaterial.opacity = 0.0;
      } else if (S < 0.35) {
        pointsMaterial.opacity = ((S - 0.06) / 0.29) * 0.9;
        pointsMaterial.size = 0.030;
        wireMaterial.opacity = 0.0;
      } else if (S < 0.65) {
        pointsMaterial.opacity = 0.9;
        pointsMaterial.size = 0.032;
        wireMaterial.opacity = 0.0;
      } else if (S < 0.85) {
        const comp = (S - 0.65) / 0.20;
        pointsMaterial.opacity = 1.0;
        pointsMaterial.size = 0.032 + comp * 0.022;
        wireMaterial.opacity = 0.0;
      } else if (S < 1.05) {
        pointsMaterial.opacity = 0.92;
        pointsMaterial.size = 0.034;
        const tBlast = (S - 0.85) / 0.20;
        wireMaterial.opacity = tBlast * 0.12;
      } else if (S < 1.65) {
        pointsMaterial.opacity = 0.92;
        pointsMaterial.size = 0.032;
        const tM = smoothQuintic(1.05, 1.65, S);
        wireMaterial.opacity = 0.12 * (1 - tM) + 0.10 * tM;
      } else {
        // Epochs 1 -> 10: Giảm nhẹ độ sáng để text luôn sắc nét
        const isClimax = S >= 7.25;
        const tClimax = isClimax ? smoothQuintic(7.25, 8.85, S) : 0;
        const isEarth = S >= 8.05;
        const tEarth = isEarth ? smoothQuintic(8.05, 8.85, S) : 0;

        pointsMaterial.opacity = 0.70 + tEarth * 0.15;
        pointsMaterial.size = isClimax
          ? 0.024 + (kickPulse * 0.014 + hihatShimmer * 0.006) * tClimax + tEarth * 0.004
          : 0.024;

        if (isEarth) {
          // Slide 10: Tắt hoàn toàn dây wireframe để Trái Đất là hạt Voxel số thuần túy, tuyệt đối không có vòng tròn
          wireMaterial.opacity = 0.045 * (1.0 - tEarth);
        } else {
          wireMaterial.color.setRGB(1.0, 1.0, 1.0);
          wireMaterial.opacity = isClimax ? 0.05 * (1 - tClimax * 0.6) + kickPulse * 0.03 : 0.045;
        }
      }

      // ----------------------------------------------------------------------
      // 3. CONTINUOUS PARTICLE MORPHING ALONG THE UNIFIED 10-EPOCH TIMELINE S
      // ----------------------------------------------------------------------
      const isClimax = S >= 7.25;
      const tClimax = isClimax ? smoothQuintic(7.25, 8.85, S) : 0;

      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        let bx = 0, by = 0, bz = 0;

        if (S < 0.65) {
          const t = smoothQuintic(0.0, 0.65, S);
          bx = outerCoords[i3] * (1 - t) + singularityCoords[i3] * t;
          by = outerCoords[i3 + 1] * (1 - t) + singularityCoords[i3 + 1] * t;
          bz = outerCoords[i3 + 2] * (1 - t) + singularityCoords[i3 + 2] * t;

          const spiral = t * 3.5 * (1 + (i % 5) * 0.15);
          const cosS = Math.cos(spiral), sinS = Math.sin(spiral);
          const rx = bx * cosS - by * sinS;
          const ry = bx * sinS + by * cosS;
          bx = rx; by = ry;
        } else if (S < 0.85) {
          const sx = singularityCoords[i3];
          const sy = singularityCoords[i3 + 1];
          const sz = singularityCoords[i3 + 2];

          const rotA = clock * 0.75;
          const rotB = clock * 0.95;
          const cosB = Math.cos(rotB), sinB = Math.sin(rotB);
          const cosA = Math.cos(rotA), sinA = Math.sin(rotA);
          const x1 = sx * cosB - sz * sinB;
          const z1 = sx * sinB + sz * cosB;
          const y1 = sy * cosA - z1 * sinA;
          const z2 = sy * sinA + z1 * cosA;
          bx = x1; by = y1; bz = z2;
        } else if (S < 1.05) {
          const tExp = smoothQuintic(0.85, 1.05, S);
          const blast = Math.sin(tExp * Math.PI) * 1.5;
          const ex = explodedCoords[i3];
          const ey = explodedCoords[i3 + 1];
          const ez = explodedCoords[i3 + 2];
          const mag = Math.sqrt(ex * ex + ey * ey + ez * ez) || 1;

          bx = ex * tExp + (ex / mag) * blast;
          by = ey * tExp + (ey / mag) * blast;
          bz = ez * tExp + (ez / mag) * blast;

          const freq = floatPhases[i * 2];
          const phase = floatPhases[i * 2 + 1];
          const floatAmp = 0.12 * tExp;
          bx += Math.sin(clock * freq + phase) * floatAmp;
          by += Math.cos(clock * freq * 0.9 + phase) * floatAmp;
          bz += Math.sin(clock * freq * 1.2 + phase) * (floatAmp * 0.8);
        } else if (S < 1.65) {
          const tMerge = smoothQuintic(1.05, 1.65, S);
          const ex = explodedCoords[i3];
          const ey = explodedCoords[i3 + 1];
          const ez = explodedCoords[i3 + 2];

          const freq = floatPhases[i * 2];
          const phase = floatPhases[i * 2 + 1];
          const floatAmp = 0.12 * (1 - tMerge);
          const floatX = ex + Math.sin(clock * freq + phase) * floatAmp;
          const floatY = ey + Math.cos(clock * freq * 0.9 + phase) * floatAmp;
          const floatZ = ez + Math.sin(clock * freq * 1.2 + phase) * (floatAmp * 0.8);

          const px = punchCoords[i3];
          const py = punchCoords[i3 + 1];
          const pz = punchCoords[i3 + 2];

          bx = floatX * (1 - tMerge) + px * tMerge;
          by = floatY * (1 - tMerge) + py * tMerge;
          bz = floatZ * (1 - tMerge) + pz * tMerge;
        } else if (S < 2.45) {
          const t = smoothQuintic(1.80, 2.45, S);
          bx = punchCoords[i3] * (1 - t) + serverCoords[i3] * t;
          by = punchCoords[i3 + 1] * (1 - t) + serverCoords[i3 + 1] * t;
          bz = punchCoords[i3 + 2] * (1 - t) + serverCoords[i3 + 2] * t;
        } else if (S < 3.25) {
          const t = smoothQuintic(2.60, 3.25, S);
          bx = serverCoords[i3] * (1 - t) + meshCoords[i3] * t;
          by = serverCoords[i3 + 1] * (1 - t) + meshCoords[i3 + 1] * t;
          bz = serverCoords[i3 + 2] * (1 - t) + meshCoords[i3 + 2] * t;
        } else if (S < 4.05) {
          const t = smoothQuintic(3.40, 4.05, S);
          bx = meshCoords[i3] * (1 - t) + neuralCoords[i3] * t;
          by = meshCoords[i3 + 1] * (1 - t) + neuralCoords[i3 + 1] * t;
          bz = meshCoords[i3 + 2] * (1 - t) + neuralCoords[i3 + 2] * t;
        } else if (S < 4.85) {
          const t = smoothQuintic(4.20, 4.85, S);
          bx = neuralCoords[i3] * (1 - t) + genAiCoords[i3] * t;
          by = neuralCoords[i3 + 1] * (1 - t) + genAiCoords[i3 + 1] * t;
          bz = neuralCoords[i3 + 2] * (1 - t) + genAiCoords[i3 + 2] * t;
        } else if (S < 5.65) {
          const t = smoothQuintic(5.00, 5.65, S);
          bx = genAiCoords[i3] * (1 - t) + agentCoords[i3] * t;
          by = genAiCoords[i3 + 1] * (1 - t) + agentCoords[i3 + 1] * t;
          bz = genAiCoords[i3 + 2] * (1 - t) + agentCoords[i3 + 2] * t;
        } else if (S < 6.45) {
          const t = smoothQuintic(5.80, 6.45, S);
          bx = agentCoords[i3] * (1 - t) + multiAgentCoords[i3] * t;
          by = agentCoords[i3 + 1] * (1 - t) + multiAgentCoords[i3 + 1] * t;
          bz = agentCoords[i3 + 2] * (1 - t) + multiAgentCoords[i3 + 2] * t;
        } else if (S < 7.25) {
          const t = smoothQuintic(6.60, 7.25, S);
          bx = multiAgentCoords[i3] * (1 - t) + autonomousOsCoords[i3] * t;
          by = multiAgentCoords[i3 + 1] * (1 - t) + autonomousOsCoords[i3 + 1] * t;
          bz = multiAgentCoords[i3 + 2] * (1 - t) + autonomousOsCoords[i3 + 2] * t;
        } else if (S < 8.05) {
          const t = smoothQuintic(7.40, 8.05, S);
          bx = autonomousOsCoords[i3] * (1 - t) + ioaAgiCoords[i3] * t;
          by = autonomousOsCoords[i3 + 1] * (1 - t) + ioaAgiCoords[i3 + 1] * t;
          bz = autonomousOsCoords[i3 + 2] * (1 - t) + ioaAgiCoords[i3 + 2] * t;
        } else {
          // Epoch 9 (Cosmic Nebula) -> Epoch 10 (I2FLabs Vietnam - Voxel Earth)
          // Xoay vòng và hợp thành hình quả địa cầu Trái Đất số
          const t = smoothQuintic(8.05, 8.85, S);
          bx = ioaAgiCoords[i3] * (1 - t) + earthCoords[i3] * t;
          by = ioaAgiCoords[i3 + 1] * (1 - t) + earthCoords[i3 + 1] * t;
          bz = ioaAgiCoords[i3 + 2] * (1 - t) + earthCoords[i3 + 2] * t;
        }

        // 1. Nâng thực thể 3D lên nửa trên ở Epoch 1-9 (ở Slide 10 Trái Đất to nhô lên từ dưới)
        const tEarth = S >= 8.05 ? smoothQuintic(8.05, 8.85, S) : 0.0;
        if (S >= 1.05 && S < 8.05) {
          const tElevate = smoothQuintic(1.05, 1.65, S);
          by += 0.46 * tElevate;
        } else if (S >= 8.05) {
          by += 0.46 * (1.0 - tEarth);
        }

        // 2. Living quantum waves on all particles (tan dần êm ái khi tụ thành Trái Đất)
        if (S >= 1.65) {
          const waveFade = S >= 8.05 ? (1.0 - tEarth) : 1.0;
          if (waveFade > 0.001) {
            const waveSpatial = clock * 1.8 + bx * 2.8 + by * 3.2;
            const waveAmp = 0.024 * waveFade;
            bx += Math.sin(waveSpatial) * waveAmp;
            by += Math.cos(waveSpatial * 1.2) * waveAmp;
            bz += Math.sin(clock * 1.4 + (i % 28) * 0.22) * (waveAmp * 1.1);
          }
        }

        // 3. Climax Audio Kick Expansion (chuyển tiếp êm dịu, không giật)
        if (isClimax) {
          const kickFade = S >= 8.05 ? (1.0 - tEarth) : 1.0;
          if (kickFade > 0.001) {
            const rDist = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
            const kickExpansion = (kickPulse * 0.28 + snarePulse * 0.10) * tClimax * kickFade;
            bx += (bx / rDist) * kickExpansion;
            by += (by / rDist) * kickExpansion;
            bz += (bz / rDist) * kickExpansion;
          }
        }

        // 4. XOAY TRỤC ĐỒNG BỘ 100% KHÔNG BAO GIỜ BỊ GIẬT:
        // Slide 9 xoay với tốc độ 0.09, chuyển mượt sang 0.12 của Trái Đất ở Slide 10
        if (isClimax) {
          const spinRate = S >= 8.05
            ? (0.09 * (1.0 - tEarth) + 0.12 * tEarth)
            : 0.09 * tClimax;
          const spinAngle = clock * spinRate;
          const cosS = Math.cos(spinAngle), sinS = Math.sin(spinAngle);
          const rx = bx * cosS - bz * sinS;
          const rz = bx * sinS + bz * cosS;
          bx = rx;
          bz = rz;
        }

        // Zenith Audio Reactivity at Climax
        const spatialFreq = bx * 2.2 + by * 2.8 + bz * 1.5;
        const voxelPhase = i * 0.618033 + spatialFreq;
        const microTwinkle = Math.pow(Math.sin(clock * 5.8 + voxelPhase), 8);

        let voxelLuma = 0.70;
        if (isClimax && S < 8.05) {
          const beatBrightness = kickPulse * 0.65 + snarePulse * 0.3 + hihatShimmer * 0.25;
          voxelLuma = (0.28 + beatBrightness * 0.60 + microTwinkle * 0.45) * tClimax + 0.70 * (1 - tClimax);
        } else {
          voxelLuma = 0.65 + microTwinkle * 0.18;
        }

        // --------------------------------------------------------------------
        // SLIDE 10: CHỈ CÁC PIXEL Ở VIỀN TRÊN MỚI CÓ MÀU XANH & ĐẬP THEO NHẠC
        // CÁC PIXEL CÒN LẠI LÀ MÀU TRẮNG VÀ KHÔNG ĐẬP THEO NHẠC
        // --------------------------------------------------------------------
        if (S >= 8.05) {
          const tEarth = smoothQuintic(8.05, 8.85, S);
          // Chỉ một vài pixel ở viền phía trên của Trái Đất (khoảng 35 hạt rải rác ở chỏm đỉnh chân trời)
          const isBlueEdge = i < 140 && (i % 4 === 0);

          if (isBlueEdge) {
            // Chỉ một vài pixel viền trên: MÀU XANH ELECTRIC (chuẩn ảnh mẫu) & ĐẬP THEO NHẠC
            const beatPulse = kickPulse * 0.08 + snarePulse * 0.03;
            by += beatPulse * tEarth; // Nảy nhẹ theo nhịp kick

            const beatBright = kickPulse * 0.85 + snarePulse * 0.35 + hihatShimmer * 0.20;
            const electricGlow = 0.65 + beatBright * 0.70 + microTwinkle * 0.15;

            // Màu xanh Electric Ocean Blue sâu thẳm theo ảnh mẫu, bừng sáng khi có beat
            const rElec = 0.05 + beatBright * 0.08;
            const gElec = Math.min(1.0, (0.42 + beatBright * 0.32) * electricGlow);
            const bElec = Math.min(1.0, (0.70 + beatBright * 0.28) * electricGlow);

            colArr[i3] = (1.0 - tEarth) * 0.85 + tEarth * rElec;
            colArr[i3 + 1] = (1.0 - tEarth) * 0.85 + tEarth * gElec;
            colArr[i3 + 2] = (1.0 - tEarth) * 0.85 + tEarth * bElec;
          } else {
            // Toàn bộ thân Trái Đất: MÀU TRẮNG BẠC SANG TRỌNG & HOÀN TOÀN KHÔNG ĐẬP THEO NHẠC
            const whiteLuma = 0.85 + microTwinkle * 0.06;
            colArr[i3] = whiteLuma;
            colArr[i3 + 1] = whiteLuma;
            colArr[i3 + 2] = whiteLuma;
          }
        } else {
          colArr[i3] = Math.min(1.0, voxelLuma * 0.95);
          colArr[i3 + 1] = Math.min(1.0, voxelLuma * 0.92 + (isClimax ? kickPulse * 0.08 : 0));
          colArr[i3 + 2] = Math.min(1.0, voxelLuma * 0.98 + (isClimax ? kickPulse * 0.22 : 0));
        }

        arr[i3] = bx;
        arr[i3 + 1] = by;
        arr[i3 + 2] = bz;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      starfield.rotation.y = clock * 0.03;

      if (renderer) {
        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={() => onInteract?.()}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing select-none"
    />
  );
}
