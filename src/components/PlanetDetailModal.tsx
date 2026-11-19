import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  X, ChevronLeft, ChevronRight, Globe, Wind, Mountain, 
  Orbit, Sparkles, Rocket, Layers, Info
} from 'lucide-react';
import { PlanetData, PlanetId } from '../types/planet';
import { PLANETS } from '../data/planets';
import { getPlanetTexture, getSaturnRingTexture } from '../utils/textureGenerator';
import { spaceAudio } from '../utils/audio';

interface PlanetDetailModalProps {
  planetId: PlanetId | null;
  onClose: () => void;
  onSelectPlanet: (id: PlanetId) => void;
}

export const PlanetDetailModal: React.FC<PlanetDetailModalProps> = ({
  planetId,
  onClose,
  onSelectPlanet,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'atmosphere' | 'surface' | 'moons' | 'missions'>('overview');
  const canvasRef = useRef<HTMLDivElement>(null);

  const planet: PlanetData | undefined = PLANETS.find((p) => p.id === planetId);

  // Switch to previous or next planet
  const currentIndex = PLANETS.findIndex((p) => p.id === planetId);
  const handlePrevPlanet = () => {
    const prev = currentIndex > 0 ? PLANETS[currentIndex - 1] : PLANETS[PLANETS.length - 1];
    onSelectPlanet(prev.id);
    spaceAudio.playInterfaceBeep(520);
  };
  const handleNextPlanet = () => {
    const next = currentIndex < PLANETS.length - 1 ? PLANETS[currentIndex + 1] : PLANETS[0];
    onSelectPlanet(next.id);
    spaceAudio.playInterfaceBeep(620);
  };

  // Keyboard navigation & Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrevPlanet();
      if (e.key === 'ArrowRight') handleNextPlanet();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Lock body scroll while modal is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 3D Three.js Planet Viewer inside the detail experience
  useEffect(() => {
    if (!planet || !canvasRef.current) return;
    const container = canvasRef.current;
    container.innerHTML = '';

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const pivot = new THREE.Group();
    pivot.rotation.z = THREE.MathUtils.degToRad(-planet.axialTiltDeg);
    scene.add(pivot);

    const sphereRadius = 1.45;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, 64, 64);
    const texture = getPlanetTexture(planet.id);
    const sphereMat = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.75,
      metalness: 0.1,
    });
    const globe = new THREE.Mesh(sphereGeo, sphereMat);
    pivot.add(globe);

    let saturnRingMesh: THREE.Mesh | null = null;
    if (planet.id === 'saturn') {
      const inner = 1.85;
      const outer = 3.6;
      const ringGeo = new THREE.RingGeometry(inner, outer, 128);
      const pos = ringGeo.attributes.position;
      const uvs = ringGeo.attributes.uv;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dist = Math.sqrt(x * x + y * y);
        const u = (dist - inner) / (outer - inner);
        uvs.setXY(i, u, 0.5);
      }
      ringGeo.computeVertexNormals();

      const ringMat = new THREE.MeshStandardMaterial({
        map: getSaturnRingTexture(),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95,
        roughness: 0.6,
      });
      saturnRingMesh = new THREE.Mesh(ringGeo, ringMat);
      saturnRingMesh.rotation.x = Math.PI / 2;
      pivot.add(saturnRingMesh);
    }

    const glowGeo = new THREE.SphereGeometry(sphereRadius * 1.025, 64, 64);
    const glowMat = new THREE.ShaderMaterial({
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
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.5, 0.8, 1.0, 1.0) * intensity * 0.5;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(glowGeo, glowMat);
    pivot.add(atmosphere);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.2);
    sunLight.position.set(-6, 3, 5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x111827, 0.85);
    scene.add(ambientLight);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      prevX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      prevY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevX;
      const dy = clientY - prevY;

      pivot.rotation.y += dx * 0.007;
      pivot.rotation.x += dy * 0.007;

      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Responsive Canvas Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        globe.rotation.y += 0.003;
        if (saturnRingMesh) saturnRingMesh.rotation.z += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onPointerDown);
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
      glowGeo.dispose();
    };
  }, [planet?.id]);

  if (!planet) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl flex flex-col justify-start animate-in fade-in duration-300">
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3.5 glass-panel border-b border-white/10 bg-[#03050a]/90 backdrop-blur-xl">
        {/* Planet Switcher Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            onClick={handlePrevPlanet}
            className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors min-w-[38px] min-h-[38px]"
            title="Previous Planet (Left Arrow)"
            aria-label="Previous Planet"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline ml-1">PREV</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-300 text-[10px] sm:text-xs font-mono">
            <span>SEC {planet.romanNumeral}</span>
            <span>•</span>
            <span className="font-bold truncate max-w-[80px] sm:max-w-none">{planet.name.toUpperCase()}</span>
          </div>

          <button
            onClick={handleNextPlanet}
            className="flex items-center justify-center p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors min-w-[38px] min-h-[38px]"
            title="Next Planet (Right Arrow)"
            aria-label="Next Planet"
          >
            <span className="hidden sm:inline mr-1">NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/20 text-slate-400 hover:text-white transition-colors border border-white/10 min-w-[40px] min-h-[40px] flex items-center justify-center"
          aria-label="Close Planet Explorer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 w-full pb-16">
        {/* Header Hero Banner with Typography */}
        <div className="relative mb-6 sm:mb-12">
          <div className="absolute -top-8 -left-2 font-display font-black text-6xl sm:text-[12rem] text-white/[0.03] select-none pointer-events-none">
            {planet.order.toString().padStart(2, '0')}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-sky-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1.5 sm:mb-2">
              <span>SOLAR SYSTEM REGISTRY</span>
              <span>//</span>
              <span className="truncate">{planet.type}</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-tight">
              {planet.name}
            </h1>
            <p className="font-mono text-xs sm:text-lg text-sky-300/80 mt-1 max-w-3xl">
              {planet.tagline}
            </p>
          </div>
        </div>

        {/* 3D Canvas Showcase & Fast Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mb-8 sm:mb-12">
          {/* 3D Interactive Planet Canvas */}
          <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-[460px] w-full rounded-3xl glass-panel-glow border border-sky-500/20 overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: planet.colors.primary }}
            />
            <div
              ref={canvasRef}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              title="Touch and drag to rotate planet"
            />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 bg-[#03050a]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 pointer-events-none">
              <span>TILT: {planet.axialTiltDeg}°</span>
              <span className="text-sky-300">INTERACTIVE 3D</span>
            </div>
          </div>

          {/* Essential Orbital & Physical Telemetry HUD */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-4">
            <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-white/5">
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block mb-0.5 sm:mb-1">
                Surface Gravity
              </span>
              <div className="font-display text-lg sm:text-2xl font-bold text-white">
                {planet.gravityMss} m/s²
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-sky-400">
                {planet.gravityVsEarth}x of Earth
              </span>
            </div>

            <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-white/5">
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block mb-0.5 sm:mb-1">
                Rotational Period
              </span>
              <div className="font-display text-lg sm:text-2xl font-bold text-white truncate">
                {planet.dayLengthStr}
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400">
                {planet.dayLengthHours}h Earth
              </span>
            </div>

            <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-white/5">
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block mb-0.5 sm:mb-1">
                Orbital Year
              </span>
              <div className="font-display text-lg sm:text-2xl font-bold text-white truncate">
                {planet.yearLengthStr}
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400">
                {planet.yearLengthDays} Days
              </span>
            </div>

            <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-white/5">
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block mb-0.5 sm:mb-1">
                Sun Distance
              </span>
              <div className="font-display text-lg sm:text-2xl font-bold text-white">
                {planet.distanceFromSunAU} AU
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 truncate">
                {planet.distanceStr.split(' ')[0]}
              </span>
            </div>

            <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-white/5">
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block mb-0.5 sm:mb-1">
                Diameter
              </span>
              <div className="font-display text-lg sm:text-2xl font-bold text-white truncate">
                {planet.diameterStr}
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400">
                {(planet.diameterKm / 12742).toFixed(2)}x Earth
              </span>
            </div>

            <div className="glass-panel p-3.5 sm:p-5 rounded-2xl border border-white/5">
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block mb-0.5 sm:mb-1">
                Mean Temp
              </span>
              <div className="font-display text-lg sm:text-2xl font-bold text-white">
                {planet.avgTempC}°C
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 truncate">
                {planet.minTempC}° to {planet.maxTempC}°C
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Tab Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2 border-b border-white/10 pb-3 mb-6 sm:mb-8 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => {
              setActiveTab('overview');
              spaceAudio.playInterfaceBeep(600);
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap min-h-[38px] ${
              activeTab === 'overview'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('atmosphere');
              spaceAudio.playInterfaceBeep(640);
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap min-h-[38px] ${
              activeTab === 'atmosphere'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Wind className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Atmosphere</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('surface');
              spaceAudio.playInterfaceBeep(680);
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap min-h-[38px] ${
              activeTab === 'surface'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mountain className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Surface</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('moons');
              spaceAudio.playInterfaceBeep(720);
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap min-h-[38px] ${
              activeTab === 'moons'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Moons ({planet.moonsCount})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('missions');
              spaceAudio.playInterfaceBeep(760);
            }}
            className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap min-h-[38px] ${
              activeTab === 'missions'
                ? 'bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Rocket className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Missions</span>
          </button>
        </div>

        {/* Tab 1: Scientific Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div className="lg:col-span-7 glass-panel p-5 sm:p-8 rounded-3xl border border-white/5">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3 sm:mb-4 uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 flex-shrink-0" />
                Planetary Synopsis
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-sans mb-4 sm:mb-6">
                {planet.overview}
              </p>
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-mono text-[10px] sm:text-xs text-sky-400 uppercase tracking-widest block mb-1">
                  Planetary Astrobiology Note
                </span>
                {planet.scientificDescription}
              </div>
            </div>

            <div className="lg:col-span-5 glass-panel p-5 sm:p-8 rounded-3xl border border-white/5">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3 sm:mb-4 uppercase tracking-wide flex items-center gap-2">
                <Orbit className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                Fascinating Phenomena
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {planet.interestingFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[10px] sm:text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Atmospheric Composition */}
        {activeTab === 'atmosphere' && (
          <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-white/5">
            <div className="max-w-2xl mb-6 sm:mb-8">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wide mb-1 sm:mb-2 flex items-center gap-2">
                <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400" />
                Atmospheric Constituents
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm">
                Volumetric gas distribution measured by spectrometer probes and ground-based interferometry.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              {planet.atmosphericComposition.map((gas, idx) => (
                <div key={idx} className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm font-mono">
                    <span className="text-white font-medium">{gas.gas}</span>
                    <span className="text-sky-300 font-bold">{gas.percentage}%</span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.max(gas.percentage, 2)}%`,
                        backgroundColor: gas.color,
                        boxShadow: `0 0 10px ${gas.color}66`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Surface & Geology */}
        {activeTab === 'surface' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-white/5">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-wide mb-3 sm:mb-4 flex items-center gap-2">
                <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" />
                Geological Structure
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm mb-4 sm:mb-6">
                {planet.surfaceCharacteristics.geology}
              </p>
              {planet.surfaceCharacteristics.elevationRecord && (
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    Elevation Record / Prominent Feature
                  </span>
                  <span className="text-xs sm:text-sm font-display font-semibold text-white">
                    {planet.surfaceCharacteristics.elevationRecord}
                  </span>
                </div>
              )}
            </div>

            <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-white/5">
              <h3 className="font-display font-bold text-lg sm:text-xl text-white uppercase tracking-wide mb-3 sm:mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
                Notable Geographic Regions
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {planet.surfaceCharacteristics.notableFeatures.map((feat, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-slate-200"
                  >
                    {feat}
                  </span>
                ))}
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] sm:text-xs font-mono text-sky-400 uppercase tracking-widest block mb-1">
                  Magnetosphere & Dynamo
                </span>
                <span className="text-xs sm:text-sm text-slate-300">
                  {planet.surfaceCharacteristics.magneticField}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Major Moons */}
        {activeTab === 'moons' && (
          <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-white/5">
            <div className="mb-4 sm:mb-6">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wide mb-1">
                Satellites of {planet.name}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-mono">
                Total confirmed moons: {planet.moonsCount}
              </p>
            </div>

            {planet.majorMoons.length === 0 ? (
              <div className="py-8 sm:py-12 text-center text-slate-400 font-mono text-xs sm:text-sm border border-dashed border-white/10 rounded-2xl p-4">
                {planet.name} has no natural satellites due to its proximity to the Sun and orbital dynamics.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                {planet.majorMoons.map((moon, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="font-display font-bold text-base sm:text-lg text-white">
                        {moon.name}
                      </span>
                      <span className="text-[10px] sm:text-xs font-mono text-sky-400">
                        Ø {moon.diameterKm} km
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2.5 sm:mb-3">
                      {moon.description}
                    </p>
                    <div className="text-[10px] sm:text-[11px] font-mono text-amber-300/90 pt-2 border-t border-white/5">
                      ★ {moon.highlight}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Exploration Missions */}
        {activeTab === 'missions' && (
          <div className="glass-panel p-5 sm:p-8 rounded-3xl border border-white/5">
            <div className="mb-4 sm:mb-6">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wide mb-1 flex items-center gap-2">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-sky-400 flex-shrink-0" />
                Exploration Missions
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm font-mono">
                Robotic probes and orbiters sent to survey {planet.name}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {planet.missions.map((mission, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-1">
                      <span className="font-display font-bold text-sm sm:text-base text-white">
                        {mission.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-500/20 text-[9px] sm:text-[10px] font-mono uppercase">
                        {mission.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 max-w-2xl">
                      {mission.achievement}
                    </p>
                  </div>

                  <div className="flex md:flex-col items-start md:items-end text-[10px] sm:text-xs font-mono text-slate-400 flex-shrink-0 gap-1 md:gap-0">
                    <span className="text-white font-medium">{mission.agency}</span>
                    <span>({mission.year})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
