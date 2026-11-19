import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Orbit, Compass } from 'lucide-react';
import { getPlanetTexture, getSaturnRingTexture } from '../utils/textureGenerator';
import { spaceAudio } from '../utils/audio';

interface HeroSaturnProps {
  onStartExploring: () => void;
  onExploreSolarSystem: () => void;
}

export const HeroSaturn: React.FC<HeroSaturnProps> = ({
  onStartExploring,
  onExploreSolarSystem
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [rotationSpeed, setRotationSpeed] = useState(1);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03050a, 0.015);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Deep Starfield Background
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = window.innerWidth < 768 ? 1800 : 3500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 80;
      starPositions[i + 1] = (Math.random() - 0.5) * 80;
      starPositions[i + 2] = -5 - Math.random() * 50;

      const r = Math.random();
      if (r > 0.8) {
        starColors[i] = 0.6; starColors[i + 1] = 0.8; starColors[i + 2] = 1.0;
      } else if (r > 0.6) {
        starColors[i] = 1.0; starColors[i + 1] = 0.85; starColors[i + 2] = 0.6;
      } else {
        starColors[i] = 0.95; starColors[i + 1] = 0.95; starColors[i + 2] = 1.0;
      }
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 0.09 : 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const starPoints = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starPoints);

    // Saturn Pivot with Axial Tilt (-26.7 deg)
    const saturnSystem = new THREE.Group();
    saturnSystem.rotation.z = THREE.MathUtils.degToRad(-26.7);
    saturnSystem.rotation.x = THREE.MathUtils.degToRad(18);
    scene.add(saturnSystem);

    // Saturn Globe Sphere
    const globeRadius = 1.5;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const saturnTex = getPlanetTexture('saturn');

    const sphereMat = new THREE.MeshStandardMaterial({
      map: saturnTex,
      roughness: 0.8,
      metalness: 0.05,
    });
    const saturnGlobe = new THREE.Mesh(sphereGeo, sphereMat);
    saturnGlobe.castShadow = true;
    saturnGlobe.receiveShadow = true;
    saturnSystem.add(saturnGlobe);

    // Atmosphere Fresnel Glow Ring
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.02, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.98, 0.92, 0.65, 1.0) * intensity * 0.45;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const saturnAtmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    saturnSystem.add(saturnAtmosphere);

    // Saturn Rings
    const innerRadius = 1.95;
    const outerRadius = 3.85;
    const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 128);

    const pos = ringGeo.attributes.position;
    const uvs = ringGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const u = (dist - innerRadius) / (outerRadius - innerRadius);
      uvs.setXY(i, u, 0.5);
    }
    ringGeo.computeVertexNormals();

    const ringTex = getSaturnRingTexture();
    const ringMat = new THREE.MeshStandardMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.96,
      roughness: 0.6,
    });

    const saturnRings = new THREE.Mesh(ringGeo, ringMat);
    saturnRings.rotation.x = Math.PI / 2;
    saturnSystem.add(saturnRings);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xfffdf0, 3.2);
    sunLight.position.set(-6, 3.5, 5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x0c1322, 0.7);
    scene.add(ambientLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    rimLight.position.set(5, -2, -4);
    scene.add(rimLight);

    // Position adjustments for mobile vs desktop
    const updatePositions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        // Small mobile: position Saturn higher up in the background and scale down slightly
        saturnSystem.position.set(0, 1.35, -1.0);
        saturnSystem.scale.set(0.78, 0.78, 0.78);
        camera.position.set(0, 0.8, 6.2);
      } else if (w < 1024) {
        // Tablet: center top
        saturnSystem.position.set(0.6, 0.8, -0.5);
        saturnSystem.scale.set(0.9, 0.9, 0.9);
        camera.position.set(0, 1.0, 6.0);
      } else {
        // Desktop: offset to right
        saturnSystem.position.set(1.15, -0.15, 0);
        saturnSystem.scale.set(1, 1, 1);
        camera.position.set(0, 1.2, 5.8);
      }
    };
    updatePositions();

    // Mouse & Touch Parallax / Interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      // Don't drag if tapping interactive buttons
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;

      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevX;
        const deltaY = clientY - prevY;
        saturnSystem.rotation.y += deltaX * 0.005;
        saturnSystem.rotation.x += deltaY * 0.005;
        prevX = clientX;
        prevY = clientY;
      } else {
        const mouseX = (clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (clientY / window.innerHeight - 0.5) * 2;
        targetRotationY = mouseX * 0.15;
        targetRotationX = mouseY * 0.1;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updatePositions();
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      saturnGlobe.rotation.y += delta * 0.12 * rotationSpeed;
      saturnRings.rotation.z += delta * 0.04 * rotationSpeed;

      if (!isDragging) {
        camera.position.x += (targetRotationY - camera.position.x) * 0.04;
        starPoints.rotation.y += delta * 0.008;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      container.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      ringGeo.dispose();
      starsGeometry.dispose();
    };
  }, [rotationSpeed]);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#03050a] pt-20 pb-16 sm:py-20">
      {/* 3D Saturn Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing pointer-events-auto"
        title="Touch or click and drag to rotate Saturn in 3D"
      />

      {/* Atmospheric Vignette Gradients */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-30 sm:opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#03050a] via-transparent to-[#03050a]/70 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-full h-32 sm:h-48 bg-gradient-to-t from-[#03050a] to-transparent pointer-events-none" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full flex flex-col justify-end sm:justify-center min-h-[calc(100vh-6rem)] pointer-events-none">
        <div className="max-w-2xl flex flex-col items-start pt-28 sm:pt-0">
          {/* Scientific Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full glass-panel border border-sky-400/30 text-sky-300 text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] sm:tracking-[0.2em] mb-4 sm:mb-6 backdrop-blur-md shadow-lg shadow-sky-950/40 pointer-events-auto">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-400 animate-ping flex-shrink-0" />
            <span>SOLAR SYSTEM ARCHIVE • 2026</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-7xl tracking-tight text-white leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-6 uppercase">
            The Universe is <br />
            <span className="bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent text-glow">
              Yours to Explore.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-sans leading-relaxed mb-6 sm:mb-10 max-w-xl">
            Discover extraordinary worlds, explore distant planets, and uncover the mysteries of our solar system with scientific precision and cinematic immersion.
          </p>

          {/* Responsive Touch-Friendly CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto pointer-events-auto">
            <button
              onClick={() => {
                spaceAudio.playInterfaceBeep(880);
                onStartExploring();
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-display font-bold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 transform sm:hover:scale-[1.03] shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Start Exploring</span>
            </button>

            <button
              onClick={() => {
                spaceAudio.playInterfaceBeep(520);
                onExploreSolarSystem();
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full glass-panel hover:bg-white/10 active:bg-white/15 text-white font-display font-medium text-xs sm:text-sm tracking-widest uppercase border border-white/20 hover:border-sky-400/50 transition-all duration-300 flex items-center justify-center gap-2.5 min-h-[48px]"
            >
              <Orbit className="w-4 h-4 text-sky-400" />
              <span>Solar System 3D</span>
            </button>
          </div>

          {/* Interactive 3D Planet Hint & Telemetry Pill */}
          <div className="mt-6 sm:mt-10 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono text-slate-400 pointer-events-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.03] border border-white/10">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse flex-shrink-0" />
              <span>3D SATURN (DRAG TO ROTATE)</span>
            </div>
            <button
              onClick={() => setRotationSpeed((s) => (s === 1 ? 2.5 : 1))}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/[0.03] hover:bg-white/10 border border-white/10 tracking-wider transition-colors min-h-[28px]"
            >
              SPEED: {rotationSpeed}X
            </button>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator (Desktop only for clean mobile viewport) */}
      <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2 pointer-events-auto">
        <span className="text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
          Scroll to Discover
        </span>
        <button
          onClick={onStartExploring}
          className="w-8 h-12 rounded-full border border-white/20 flex items-start justify-center p-2 hover:border-sky-400/60 transition-colors group"
          aria-label="Scroll down to planet exploration"
        >
          <div className="w-1.5 h-3 rounded-full bg-sky-400 animate-bounce group-hover:bg-sky-300" />
        </button>
      </div>
    </section>
  );
};
