import { useEffect, useRef } from 'react';

interface CosmicMathCanvasProps {
  progress: number; // 0.0 to 1.0 (Scroll progress across the 5 epochs)
  onInteract?: () => void;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function CosmicMathCanvas({ progress, onInteract }: CosmicMathCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / height - 0.5) * 2;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Structural particles
    const N = 260;

    // 1. Primitive Square in R^2 (Epoch 1)
    const getSquarePoints = (): Point3D[] => {
      const pts: Point3D[] = [];
      const side = 150;
      const perSide = Math.floor(N / 4);
      for (let i = 0; i < N; i++) {
        const sideIndex = Math.floor(i / perSide) % 4;
        const t = (i % perSide) / perSide;
        let x = 0, y = 0;
        if (sideIndex === 0) { x = -side + 2 * side * t; y = -side; }
        else if (sideIndex === 1) { x = side; y = -side + 2 * side * t; }
        else if (sideIndex === 2) { x = side - 2 * side * t; y = side; }
        else { x = -side; y = side - 2 * side * t; }
        pts.push({ x, y, z: 0 });
      }
      return pts;
    };

    // 2. Wireframe Cube in R^3 (Epoch 2)
    const getCubePoints = (): Point3D[] => {
      const pts: Point3D[] = [];
      const size = 115;
      const perEdge = Math.floor(N / 12);
      const vertices = [
        [-size, -size, -size], [size, -size, -size], [size, size, -size], [-size, size, -size],
        [-size, -size,  size], [size, -size,  size], [size, size,  size], [-size, size,  size]
      ];
      const edges = [
        [0,1],[1,2],[2,3],[3,0],
        [4,5],[5,6],[6,7],[7,4],
        [0,4],[1,5],[2,6],[3,7]
      ];

      for (let i = 0; i < N; i++) {
        const edgeIdx = Math.floor(i / perEdge) % 12;
        const t = (i % perEdge) / perEdge;
        const [v1, v2] = edges[edgeIdx];
        pts.push({
          x: vertices[v1][0] + (vertices[v2][0] - vertices[v1][0]) * t,
          y: vertices[v1][1] + (vertices[v2][1] - vertices[v1][1]) * t,
          z: vertices[v1][2] + (vertices[v2][2] - vertices[v1][2]) * t,
        });
      }
      return pts;
    };

    // 3. Keplerian Polyhedra (Epoch 3)
    const getPolyhedraPoints = (): Point3D[] => {
      const pts: Point3D[] = [];
      const r = 135;
      const octVertices = [
        [r, 0, 0], [-r, 0, 0],
        [0, r, 0], [0, -r, 0],
        [0, 0, r], [0, 0, -r]
      ];
      const octEdges = [
        [0,2],[2,1],[1,3],[3,0],
        [4,0],[4,1],[4,2],[4,3],
        [5,0],[5,1],[5,2],[5,3]
      ];
      const perEdge = Math.floor(N / 12);
      for (let i = 0; i < N; i++) {
        const edgeIdx = Math.floor(i / perEdge) % 12;
        const t = (i % perEdge) / perEdge;
        const [v1, v2] = octEdges[edgeIdx];
        pts.push({
          x: octVertices[v1][0] + (octVertices[v2][0] - octVertices[v1][0]) * t,
          y: octVertices[v1][1] + (octVertices[v2][1] - octVertices[v1][1]) * t,
          z: octVertices[v1][2] + (octVertices[v2][2] - octVertices[v1][2]) * t,
        });
      }
      return pts;
    };

    // 4. Cognitive Torus (Epoch 4)
    const getTorusPoints = (tSec: number): Point3D[] => {
      const pts: Point3D[] = [];
      const R = 125;
      const r = 40;
      for (let i = 0; i < N; i++) {
        const u = (i / N) * Math.PI * 2 * 6 + tSec * 0.4;
        const v = (i / N) * Math.PI * 2 + tSec * 0.25;
        pts.push({
          x: (R + r * Math.cos(u)) * Math.cos(v),
          y: (R + r * Math.cos(u)) * Math.sin(v),
          z: r * Math.sin(u)
        });
      }
      return pts;
    };

    // 5. Emergent Intellect Fibonacci Sphere (Epoch 5)
    const getSpherePoints = (tSec: number): Point3D[] => {
      const pts: Point3D[] = [];
      const radius = 130;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i + tSec * 0.35;
        pts.push({
          x: Math.cos(theta) * rad * radius,
          y: y * radius,
          z: Math.sin(theta) * rad * radius
        });
      }
      return pts;
    };

    const squarePts = getSquarePoints();
    const cubePts = getCubePoints();
    const polyPts = getPolyhedraPoints();

    const smoothstep = (min: number, max: number, value: number) => {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    let time = 0;

    const render = () => {
      time += 0.015;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const p = Math.max(0, Math.min(1, progress));

      const torusPts = getTorusPoints(time);
      const spherePts = getSpherePoints(time);

      const currentPts: Point3D[] = [];

      for (let i = 0; i < N; i++) {
        let x = 0, y = 0, z = 0;
        if (p < 0.25) {
          const t = smoothstep(0.0, 0.25, p);
          x = squarePts[i].x * (1 - t) + cubePts[i].x * t;
          y = squarePts[i].y * (1 - t) + cubePts[i].y * t;
          z = squarePts[i].z * (1 - t) + cubePts[i].z * t;
        } else if (p < 0.5) {
          const t = smoothstep(0.25, 0.5, p);
          x = cubePts[i].x * (1 - t) + polyPts[i].x * t;
          y = cubePts[i].y * (1 - t) + polyPts[i].y * t;
          z = cubePts[i].z * (1 - t) + polyPts[i].z * t;
        } else if (p < 0.75) {
          const t = smoothstep(0.5, 0.75, p);
          x = polyPts[i].x * (1 - t) + torusPts[i].x * t;
          y = polyPts[i].y * (1 - t) + torusPts[i].y * t;
          z = polyPts[i].z * (1 - t) + torusPts[i].z * t;
        } else {
          const t = smoothstep(0.75, 1.0, p);
          x = torusPts[i].x * (1 - t) + spherePts[i].x * t;
          y = torusPts[i].y * (1 - t) + spherePts[i].y * t;
          z = torusPts[i].z * (1 - t) + spherePts[i].z * t;
        }
        currentPts.push({ x, y, z });
      }

      // Euler Angles: 2D planar in Epoch 1, morphs smoothly into full 3D Euler rotation
      const rotInfluence = smoothstep(0.05, 0.25, p);
      const rotX = (time * 0.35 + mouseRef.current.y * 0.75) * rotInfluence;
      const rotY = (time * 0.55 + mouseRef.current.x * 0.75) * rotInfluence;
      // Fixed I2FLabs razor tilt angle of -18 degrees (-0.314 rad)
      const rotZ = -0.314 * rotInfluence;

      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const fov = 420;
      const cameraDistance = 380;

      const projected = currentPts.map((pt) => {
        let x1 = pt.x * cosY + pt.z * sinY;
        let y1 = pt.y;
        let z1 = -pt.x * sinY + pt.z * cosY;

        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const scale = fov / (cameraDistance + z3);
        const screenX = centerX + x3 * scale;
        const screenY = centerY + y3 * scale;

        return { x: screenX, y: screenY, z: z3, scale };
      });

      // 1. Wireframes & Synaptic Edges (Pure White / Titanium Monochrome)
      if (p < 0.2) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const pt = projected[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();
        ctx.stroke();

        // 4 Minimalist corner calipers in titanium white
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        const s = 150 * (fov / cameraDistance);
        ctx.strokeRect(centerX - s - 10, centerY - s - 10, 20, 20);
        ctx.strokeRect(centerX + s - 10, centerY - s - 10, 20, 20);
        ctx.strokeRect(centerX - s - 10, centerY + s - 10, 20, 20);
        ctx.strokeRect(centerX + s - 10, centerY + s - 10, 20, 20);
      } else {
        const maxDist = p > 0.75 ? 36 : 52;
        for (let i = 0; i < N; i += 2) {
          for (let j = i + 1; j < N; j += 2) {
            const dx = projected[i].x - projected[j].x;
            const dy = projected[i].y - projected[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.28;
              ctx.strokeStyle = `rgba(240, 244, 248, ${alpha})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(projected[i].x, projected[i].y);
              ctx.lineTo(projected[j].x, projected[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // 2. Slanted Kinetic Orbital Ring for Epoch 5 (-18 deg)
      if (p > 0.7) {
        const ringAlpha = smoothstep(0.7, 0.95, p);
        const ringRadius = 180;
        const ringPoints = 64;
        ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha * 0.35})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        for (let i = 0; i <= ringPoints; i++) {
          const ang = (i / ringPoints) * Math.PI * 2 + time * 0.5;
          const rx = Math.cos(ang) * ringRadius;
          const ry = 0;
          const rz = Math.sin(ang) * ringRadius;

          let x1 = rx * cosY + rz * sinY;
          let y1 = ry;
          let z1 = -rx * sinY + rz * cosY;

          let x2 = x1;
          let y2 = y1 * cosX - z1 * sinX;
          let z2 = y1 * sinX + z1 * cosX;

          let x3 = x2 * cosZ - y2 * sinZ;
          let y3 = x2 * sinZ + y2 * cosZ;
          let z3 = z2;

          const scale = fov / (cameraDistance + z3);
          const px = centerX + x3 * scale;
          const py = centerY + y3 * scale;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // 3. Render Vertices with Pure White / Silver depth attenuation
      projected.sort((a, b) => b.z - a.z);
      for (const pt of projected) {
        const depthAlpha = Math.max(0.2, Math.min(1, (pt.z + 160) / 320));
        const size = Math.max(1, pt.scale * 1.8);

        ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Pure Subtle Central Void Glow (Monochrome White)
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 150);
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [progress]);

  return (
    <div
      onClick={onInteract}
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
