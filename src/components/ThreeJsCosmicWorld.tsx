import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeJsCosmicWorldProps {
  progress: number; // 0.0 to 1.0 (Continuous fluid scroll progress across 6 epochs)
  onInteract?: () => void;
}

export default function ThreeJsCosmicWorld({ progress, onInteract }: ThreeJsCosmicWorldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetProgressRef = useRef(progress);
  const currentProgressRef = useRef(progress);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    targetProgressRef.current = progress;
  }, [progress]);

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
    // 4. COSMIC ODYSSEY CAMERA FLIGHT PATH: BAY XUYÊN KHÔNG GIAN VŨ TRỤ
    // Đi sâu vào (Dolly in), Zoom ra (Pull back), Lướt ngang (Pan), Xoay toàn bộ (360° Roll)
    // ------------------------------------------------------------------------
    const cameraWaypoints = [
      // Epoch 1 (Punch Card): Macro Close-up cận cảnh
      {
        pos: new THREE.Vector3(0.0, 0.2, 3.8),
        look: new THREE.Vector3(0.0, 0.05, 0.0),
        fov: 42,
      },
      // Transition 1->2: Zoom xa ra vũ trụ bao la & xoay nghiêng
      {
        pos: new THREE.Vector3(-2.6, 1.8, 6.8),
        look: new THREE.Vector3(0.0, 0.1, 0.0),
        fov: 52,
      },
      // Epoch 2 (Monolith Tower): Góc thấp ngước nhìn lên sừng sững
      {
        pos: new THREE.Vector3(0.0, -1.2, 4.4),
        look: new THREE.Vector3(0.0, 0.35, 0.0),
        fov: 48,
      },
      // Transition 2->3: Lướt ngang và bay vọt lên cao nhìn toàn cảnh
      {
        pos: new THREE.Vector3(3.2, 2.2, 7.2),
        look: new THREE.Vector3(0.0, 0.0, 0.0),
        fov: 54,
      },
      // Epoch 3 (P2P Mesh Network): Bay xuyên tâm giữa các cụm nút mạng
      {
        pos: new THREE.Vector3(0.0, 0.1, 4.5),
        look: new THREE.Vector3(0.0, 0.0, 0.0),
        fov: 46,
      },
      // Transition 3->4: Xoay tròn 360 độ quanh tâm (Barrel Roll Orbit)
      {
        pos: new THREE.Vector3(-3.0, 1.5, 6.2),
        look: new THREE.Vector3(0.0, 0.0, 0.0),
        fov: 50,
      },
      // Epoch 4 (Deep Neural Layers): Đi dọc theo trục Z các tầng synapse
      {
        pos: new THREE.Vector3(1.6, 1.4, 4.2),
        look: new THREE.Vector3(0.0, 0.0, 0.0),
        fov: 44,
      },
      // Transition 4->5: Nghiêng vát góc dao cạo -18° và lùi xa
      {
        pos: new THREE.Vector3(-2.4, -1.2, 6.6),
        look: new THREE.Vector3(0.0, 0.0, 0.0),
        fov: 52,
      },
      // Epoch 5 (Agentic Microkernel): Xoay vòng quanh lõi tự hành và 4 vệ tinh
      {
        pos: new THREE.Vector3(1.8, 0.8, 4.8),
        look: new THREE.Vector3(0.0, 0.0, 0.0),
        fov: 45,
      },
      // Transition 5->6: Hút hạt lượng tử hội tụ về tâm điểm (Gravitational Pull)
      {
        pos: new THREE.Vector3(0.0, 0.0, 7.5),
        look: new THREE.Vector3(0.0, 0.2, 0.0),
        fov: 48,
      },
      // Epoch 6 (I2F 3D Monolith Logo): Dolly tiến thẳng chính diện khối chữ 3D I2F
      {
        pos: new THREE.Vector3(0.0, 0.1, 4.5),
        look: new THREE.Vector3(0.0, 0.1, 0.0),
        fov: 38,
      },
    ];

    // ------------------------------------------------------------------------
    // 5. POINT CLOUD GEOMETRIES (N = 2600 POINTS) - TÂM ĐIỂM VŨ TRỤ (CENTERED)
    // ------------------------------------------------------------------------
    const N = 2600;

    // MODEL 1: THẺ ĐỤC LỖ 3D (Punch Card)
    const punchCoords: number[] = [];
    const cardW = 2.6;
    const cardH = 1.7;
    for (let i = 0; i < N; i++) {
      if (i < 1600) {
        const col = i % 40;
        const row = Math.floor(i / 40) % 40;
        let x = ((col / 39) - 0.5) * cardW;
        let y = ((row / 39) - 0.5) * cardH;

        if (x > cardW * 0.35 && y > cardH * 0.3) {
          x -= 0.3;
          y -= 0.3;
        }

        const isHole = (col % 4 === 1 && (row % 6 === 2 || row % 6 === 4)) || (col % 7 === 3 && row % 5 === 1);
        const z = isHole ? -0.25 : ((i % 4) / 3 - 0.5) * 0.08;
        punchCoords.push(x, y, z);
      } else if (i < 2150) {
        const t = (i - 1600) / 550;
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
        const z = ((i % 6) / 5 - 0.5) * 0.22;
        punchCoords.push(x, y, z);
      } else {
        const bIdx = i - 2150;
        const lane = bIdx % 5;
        const t = (bIdx / 450);
        const x = -cardW * 0.6 + t * cardW * 1.2;
        const y = -cardH * 0.4 + lane * (cardH * 0.2);
        const z = 0.25 + Math.sin(t * Math.PI * 6) * 0.12;
        punchCoords.push(x, y, z);
      }
    }

    // MODEL 2: THÁP MÁY CHỦ NGUYÊN KHỐI 3D (Blade Server Tower) - 100% CUBIC MONOLITH!
    const serverCoords: number[] = [];
    const towerW = 1.45;
    const towerH = 2.9;
    const towerD = 1.1;
    for (let i = 0; i < N; i++) {
      if (i < 1400) {
        const trayIdx = Math.floor(i / 175);
        const trayY = -towerH * 0.5 + (trayIdx + 0.5) * (towerH / 8);
        const pInTray = i % 175;
        const perim = (pInTray / 175) * 4;
        let x = 0, z = 0;
        if (perim < 1) {
          x = -towerW * 0.5 + perim * towerW;
          z = towerD * 0.5;
        } else if (perim < 2) {
          x = towerW * 0.5;
          z = towerD * 0.5 - (perim - 1) * towerD;
        } else if (perim < 3) {
          x = towerW * 0.5 - (perim - 2) * towerW;
          z = -towerD * 0.5;
        } else {
          x = -towerW * 0.5;
          z = -towerD * 0.5 + (perim - 3) * towerD;
        }
        const yJitter = ((pInTray % 5) / 4 - 0.5) * 0.12;
        serverCoords.push(x, trayY + yJitter, z);
      } else if (i < 2000) {
        const pIdx = i - 1400;
        const colCorner = Math.floor(pIdx / 150) % 4;
        const tH = (pIdx % 150) / 150;
        const y = -towerH * 0.5 + tH * towerH;
        let x = towerW * 0.5, z = towerD * 0.5;
        if (colCorner === 1) { x = -towerW * 0.5; z = towerD * 0.5; }
        else if (colCorner === 2) { x = -towerW * 0.5; z = -towerD * 0.5; }
        else if (colCorner === 3) { x = towerW * 0.5; z = -towerD * 0.5; }
        serverCoords.push(x, y, z);
      } else {
        const fIdx = i - 2000;
        const row = Math.floor(fIdx / 30);
        const col = fIdx % 30;
        const x = -towerW * 0.44 + (col / 29) * (towerW * 0.88);
        const y = -towerH * 0.46 + (row / 19) * (towerH * 0.92);
        const z = towerD * 0.52 + ((fIdx % 3) / 2) * 0.04;
        serverCoords.push(x, y, z);
      }
    }

    // MODEL 3: MẠNG PHÂN TÁN 3D (Decentralized P2P Mesh Topology Graph)
    const meshCoords: number[] = [];
    const clusterCenters = [
      new THREE.Vector3(-1.1, 0.85, 0.25),
      new THREE.Vector3(0.95, 0.95, -0.35),
      new THREE.Vector3(-0.4, 0.2, -0.7),
      new THREE.Vector3(1.05, -0.3, 0.45),
      new THREE.Vector3(-0.95, -0.85, 0.35),
      new THREE.Vector3(0.2, -0.95, -0.45),
      new THREE.Vector3(1.25, 0.4, -0.25),
      new THREE.Vector3(-1.25, -0.2, -0.35),
      new THREE.Vector3(0.0, 1.15, 0.4),
      new THREE.Vector3(0.6, -1.05, 0.3),
    ];
    const clusterLinks = [
      [0, 1], [0, 2], [0, 7], [0, 8],
      [1, 3], [1, 6], [1, 8],
      [2, 3], [2, 4], [2, 7],
      [3, 5], [3, 6], [3, 9],
      [4, 5], [4, 7], [4, 9],
      [5, 9], [6, 9], [7, 8],
    ];
    for (let i = 0; i < N; i++) {
      if (i < 1300) {
        const cIdx = Math.floor(i / 130) % 10;
        const center = clusterCenters[cIdx];
        const pInCluster = i % 130;
        const subX = ((pInCluster % 5) / 4 - 0.5) * 0.24;
        const subY = ((Math.floor(pInCluster / 5) % 5) / 4 - 0.5) * 0.24;
        const subZ = ((Math.floor(pInCluster / 25) % 5) / 4 - 0.5) * 0.24;
        meshCoords.push(center.x + subX, center.y + subY, center.z + subZ);
      } else {
        const lIdx = (i - 1300) % clusterLinks.length;
        const link = clusterLinks[lIdx];
        const nA = clusterCenters[link[0]];
        const nB = clusterCenters[link[1]];
        const subT = ((i * 17) % 100) / 100;
        const x = nA.x * (1 - subT) + nB.x * subT;
        const y = nA.y * (1 - subT) + nB.y * subT;
        const z = nA.z * (1 - subT) + nB.z * subT;
        const wireJitter = ((i % 4) / 3 - 0.5) * 0.03;
        meshCoords.push(x + wireJitter, y + wireJitter, z + wireJitter);
      }
    }

    // MODEL 4: KIẾN TRÚC MẠNG NƠ-RON HỌC SÂU ĐA TẦNG (Deep Neural Layers)
    const neuralCoords: number[] = [];
    for (let i = 0; i < N; i++) {
      if (i < 1200) {
        const layerIdx = Math.floor(i / 300);
        const zLayer = -0.9 + layerIdx * 0.6;
        const nIdx = i % 300;
        const row = Math.floor(nIdx / 15);
        const col = nIdx % 15;
        const x = ((col / 14) - 0.5) * 1.6;
        const y = ((row / 19) - 0.5) * 2.3;
        const subR = ((nIdx % 5) / 4) * 0.06;
        neuralCoords.push(x + subR, y + subR, zLayer);
      } else {
        const sIdx = i - 1200;
        const fromLayer = sIdx % 3;
        const zFrom = -0.9 + fromLayer * 0.6;
        const zTo = zFrom + 0.6;

        const t = ((sIdx * 13) % 100) / 100;
        const x1 = Math.sin(sIdx * 0.4) * 0.7;
        const y1 = Math.cos(sIdx * 0.3) * 1.0;
        const x2 = Math.sin(sIdx * 0.7) * 0.7;
        const y2 = Math.cos(sIdx * 0.5) * 1.0;

        const x = x1 * (1 - t) + x2 * t;
        const y = y1 * (1 - t) + y2 * t;
        const z = zFrom * (1 - t) + zTo * t;
        neuralCoords.push(x, y, z);
      }
    }

    // MODEL 5: HỆ ĐIỀU HÀNH TÁC NHÂN TỰ HÀNH (Agentic Microkernel & Swarm)
    const agentCoords: number[] = [];
    for (let i = 0; i < N; i++) {
      if (i < 1300) {
        const pInCore = i;
        const cx = ((pInCore % 10) / 9 - 0.5) * 1.2;
        const cy = ((Math.floor(pInCore / 10) % 10) / 9 - 0.5) * 1.2;
        const cz = ((Math.floor(pInCore / 100) % 13) / 12 - 0.5) * 1.2;
        agentCoords.push(cx, cy, cz);
      } else if (i < 2000) {
        const t = ((i - 1300) / 700) * Math.PI * 2;
        const oRad = 2.1;
        const ox = Math.cos(t) * oRad;
        const oz = Math.sin(t) * oRad;
        const cos18 = Math.cos(-0.314);
        const sin18 = Math.sin(-0.314);
        const x = ox * cos18;
        const y = ox * sin18;
        agentCoords.push(x, y, oz);
      } else {
        const dIdx = Math.floor((i - 2000) / 150) % 4;
        const angle = dIdx * (Math.PI / 2);
        const satX = Math.cos(angle) * 1.6;
        const satY = Math.sin(angle) * 1.0;
        const satZ = Math.sin(angle) * 1.3;
        const pInSat = (i - 2000) % 150;
        const subX = ((pInSat % 5) / 4 - 0.5) * 0.24;
        const subY = ((Math.floor(pInSat / 5) % 5) / 4 - 0.5) * 0.24;
        const subZ = ((Math.floor(pInSat / 25) % 6) / 5 - 0.5) * 0.24;
        agentCoords.push(satX + subX, satY + subY, satZ + subZ);
      }
    }

    // MODEL 6: GRAND CLIMAX - 3D VOLUMETRIC "I2F" MONOLITH LOGO
    const logoCoords: number[] = [];
    const logoOffsetY = 0.1; // Căn giữa chuẩn xác trên sân khấu điện ảnh
    for (let i = 0; i < N; i++) {
      const zThick = ((i % 16) / 15 - 0.5) * 0.52;

      if (i < 650) {
        // --- CHỮ 'I' ---
        const t = i / 650;
        const y = -1.1 + t * 2.2 + logoOffsetY;
        const colW = ((i % 6) / 5 - 0.5) * 0.4;
        const x = -1.8 + colW;
        logoCoords.push(x, y, zThick);
      } else if (i < 1600) {
        // --- SỐ '2' ---
        const t2 = (i - 650) / 950;
        let x = 0, y = 0;
        if (t2 < 0.36) {
          const arc = (t2 / 0.36) * Math.PI;
          x = -0.42 + Math.cos(arc) * 0.58;
          y = 0.55 + Math.sin(arc) * 0.58 + logoOffsetY;
        } else if (t2 < 0.74) {
          const dt = (t2 - 0.36) / 0.38;
          x = 0.16 - dt * 1.15;
          y = 0.55 - dt * 1.65 + logoOffsetY;
        } else {
          const bt = (t2 - 0.74) / 0.26;
          x = -0.99 + bt * 1.24;
          y = -1.1 + logoOffsetY;
        }
        const strokeW = ((i % 5) / 4 - 0.5) * 0.24;
        x += strokeW;
        y += ((i % 4) / 3 - 0.5) * 0.15;
        logoCoords.push(x, y, zThick);
      } else {
        // --- CHỮ 'F' (Với nhát chém dao cạo -18° đặc trưng) ---
        const tF = (i - 1600) / 1000;
        let x = 0, y = 0;
        if (tF < 0.42) {
          const st = tF / 0.42;
          y = -1.1 + st * 2.2 + logoOffsetY;
          x = 0.65 + ((i % 5) / 4 - 0.5) * 0.36;
        } else if (tF < 0.76) {
          const tt = (tF - 0.42) / 0.34;
          x = 0.55 + tt * 1.75;
          y = 1.1 + tt * 0.2 + logoOffsetY;
        } else {
          const mt = (tF - 0.76) / 0.24;
          x = 0.65 + mt * 0.96;
          y = 0.05 + logoOffsetY;
        }
        x += ((i % 4) / 3 - 0.5) * 0.18;
        y += ((i % 3) / 2 - 0.5) * 0.14;
        logoCoords.push(x, y, zThick);
      }
    }

    // ------------------------------------------------------------------------
    // 6. THREE.JS PARTICLES & WIREFRAME MESH
    // ------------------------------------------------------------------------
    const positions = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) {
      positions[i] = punchCoords[i];
    }

    const cloudGeometry = new THREE.BufferGeometry();
    cloudGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material: Pure White, Sharp, Subtle glow
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.03,
      transparent: true,
      opacity: 0.75,
    });
    const pointCloud = new THREE.Points(cloudGeometry, pointsMaterial);
    scene.add(pointCloud);

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
      opacity: 0.1,
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

    const currentCamPos = new THREE.Vector3();
    const currentLookAt = new THREE.Vector3();

    // ------------------------------------------------------------------------
    // 7. MAIN RENDER LOOP: VŨ TRỤ BÙNG NỔ, KẾT TINH VÀ BAY LƯỢN
    // ------------------------------------------------------------------------
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.014;

      // Smooth horizontal progress damping across 6 epochs
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.085;
      const p = Math.max(0, Math.min(1, currentProgressRef.current));

      // Mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // ----------------------------------------------------------------------
      // CAMERA FLIGHT TRAJECTORY (10 SEGMENTS OF 0.1 EACH)
      // ----------------------------------------------------------------------
      const numSegments = cameraWaypoints.length - 1; // 10 segments
      const camP = p * numSegments;
      const segIdx = Math.min(numSegments - 1, Math.floor(camP));
      const segT = smoothQuintic(0.0, 1.0, camP - segIdx);

      const wpStart = cameraWaypoints[segIdx];
      const wpEnd = cameraWaypoints[segIdx + 1];

      currentCamPos.lerpVectors(wpStart.pos, wpEnd.pos, segT);
      currentLookAt.lerpVectors(wpStart.look, wpEnd.look, segT);

      const targetFov = wpStart.fov * (1 - segT) + wpEnd.fov * segT;
      if (Math.abs(camera.fov - targetFov) > 0.05) {
        camera.fov = targetFov;
        camera.updateProjectionMatrix();
      }

      // Parallax camera tilt
      camera.position.set(
        currentCamPos.x + mouseRef.current.x * 0.35,
        currentCamPos.y - mouseRef.current.y * 0.35,
        currentCamPos.z
      );
      camera.lookAt(currentLookAt.x, currentLookAt.y, currentLookAt.z);

      // ----------------------------------------------------------------------
      // PARTICLE MORPHING: BÙNG RA (DISPERSION) & KẾT TINH (CRYSTALLIZATION)
      // ----------------------------------------------------------------------
      const posAttr = cloudGeometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      // Tính toán độ bùng nổ vũ trụ (Explosion amount)
      // Khi ở đúng điểm slide (0.0, 0.2, 0.4, 0.6, 0.8, 1.0): Hạt kết tinh chặt chẽ (explode = 0)
      // Khi đang cuộn ở giữa 2 slide: Hạt bùng nổ tán loạn ra vũ trụ (explode đạt đỉnh 1.0)
      const epochProgress = p * 5.0; // 0.0 đến 5.0
      const localEpochT = epochProgress % 1.0;
      const explodeFactor = Math.sin(localEpochT * Math.PI); // Đạt 1.0 khi ở giữa 2 thời kỳ!

      const isClimax = p >= 0.8;
      const climaxLevitate = isClimax ? Math.sin(clock * 1.5) * 0.04 : 0;
      const climaxTiltY = isClimax ? Math.sin(clock * 0.8) * 0.06 : 0;

      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        let bx = 0, by = 0, bz = 0;

        if (p < 0.2) {
          // Slide 1 (Punch Card) -> Slide 2 (Blade Tower)
          const t = smoothQuintic(0.0, 0.2, p);
          bx = punchCoords[i3] * (1 - t) + serverCoords[i3] * t;
          by = punchCoords[i3 + 1] * (1 - t) + serverCoords[i3 + 1] * t;
          bz = punchCoords[i3 + 2] * (1 - t) + serverCoords[i3 + 2] * t;
        } else if (p < 0.4) {
          // Slide 2 (Blade Tower) -> Slide 3 (P2P Mesh)
          const t = smoothQuintic(0.2, 0.4, p);
          bx = serverCoords[i3] * (1 - t) + meshCoords[i3] * t;
          by = serverCoords[i3 + 1] * (1 - t) + meshCoords[i3 + 1] * t;
          bz = serverCoords[i3 + 2] * (1 - t) + meshCoords[i3 + 2] * t;
        } else if (p < 0.6) {
          // Slide 3 (P2P Mesh) -> Slide 4 (Neural Layers)
          const t = smoothQuintic(0.4, 0.6, p);
          bx = meshCoords[i3] * (1 - t) + neuralCoords[i3] * t;
          by = meshCoords[i3 + 1] * (1 - t) + neuralCoords[i3 + 1] * t;
          bz = meshCoords[i3 + 2] * (1 - t) + neuralCoords[i3 + 2] * t;
        } else if (p < 0.8) {
          // Slide 4 (Neural Layers) -> Slide 5 (Agentic Kernel)
          const t = smoothQuintic(0.6, 0.8, p);
          bx = neuralCoords[i3] * (1 - t) + agentCoords[i3] * t;
          by = neuralCoords[i3 + 1] * (1 - t) + agentCoords[i3 + 1] * t;
          bz = neuralCoords[i3 + 2] * (1 - t) + agentCoords[i3 + 2] * t;
        } else {
          // Slide 5 (Agentic Kernel) -> Slide 6 (3D I2F LOGO MONOLITH!)
          const t = smoothQuintic(0.8, 1.0, p);
          bx = agentCoords[i3] * (1 - t) + logoCoords[i3] * t;
          by = agentCoords[i3 + 1] * (1 - t) + logoCoords[i3 + 1] * t;
          bz = agentCoords[i3 + 2] * (1 - t) + logoCoords[i3 + 2] * t;
        }

        // ====================================================================
        // HIỆU ỨNG 1: BÙNG RA (COSMIC DISPERSION EXPLOSION) & KẾT TINH (CRYSTALLIZATION)
        // Khi cuộn giữa 2 slide, các hạt bùng nổ bung ra đa chiều vào vũ trụ!
        // ====================================================================
        if (explodeFactor > 0.01) {
          // Hướng bùng nổ lượng tử của từng nốt hạt
          const expDirX = Math.sin(i * 1.37 + clock * 0.8);
          const expDirY = Math.cos(i * 2.19 + clock * 0.8);
          const expDirZ = Math.sin(i * 3.41 + clock * 0.8);

          const explosionRadius = explodeFactor * 1.65;
          bx += expDirX * explosionRadius;
          by += expDirY * explosionRadius;
          bz += expDirZ * (explosionRadius * 1.25);
        }

        // ====================================================================
        // HIỆU ỨNG 2: DAO ĐỘNG SÓNG LƯỢNG TỬ LIÊN TỤC (Living Particle Waves)
        // ====================================================================
        const waveSpatial = clock * 1.8 + (bx * 2.8) + (by * 3.2);
        const waveAmp = 0.032;
        bx += Math.sin(waveSpatial) * waveAmp;
        by += Math.cos(waveSpatial * 1.2) * waveAmp;
        bz += Math.sin(clock * 1.4 + (i % 28) * 0.22) * (waveAmp * 1.1);

        // Hiệu ứng bồng bềnh và nghiêng xoay của chữ I2F 3D ở Slide 6
        if (isClimax) {
          const tClimax = smoothQuintic(0.8, 1.0, p);
          by += climaxLevitate * tClimax;
          const cosR = Math.cos(climaxTiltY * tClimax);
          const sinR = Math.sin(climaxTiltY * tClimax);
          const rx = bx * cosR - bz * sinR;
          const rz = bx * sinR + bz * cosR;
          bx = rx;
          bz = rz;
        }

        arr[i3] = bx;
        arr[i3 + 1] = by;
        arr[i3 + 2] = bz;
      }

      posAttr.needsUpdate = true;

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
      onClick={onInteract}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
    />
  );
}
