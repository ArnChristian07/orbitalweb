import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Play, Pause, Compass, ArrowUpRight, Orbit, X
} from 'lucide-react';
import { PLANETS } from '../data/planets';
import { PlanetId } from '../types/planet';
import { getPlanetTexture, getSaturnRingTexture, getSunTexture } from '../utils/textureGenerator';
import { spaceAudio } from '../utils/audio';

interface SolarSystemViewerProps {
  onSelectPlanetForDetail: (id: PlanetId) => void;
}

export const SolarSystemViewer: React.FC<SolarSystemViewerProps> = ({
  onSelectPlanetForDetail,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [selectedPlanetId, setSelectedPlanetId] = useState<PlanetId | null>('mars');
  const [showOrbits, setShowOrbits] = useState(true);

  const animControlsRef = useRef({
    isPlaying: true,
    speed: 1,
    showOrbits: true,
  });

  const selectedPlanet = PLANETS.find((p) => p.id === selectedPlanetId);

  useEffect(() => {
    animControlsRef.current.isPlaying = isPlaying;
    animControlsRef.current.speed = simSpeed;
    animControlsRef.current.showOrbits = showOrbits;
  }, [isPlaying, simSpeed, showOrbits]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03050a, 0.008);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Starfield
    const starCount = window.innerWidth < 768 ? 1600 : 3000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 400;
      starPos[i + 1] = (Math.random() - 0.5) * 400;
      starPos[i + 2] = (Math.random() - 0.5) * 400;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.25, transparent: true, opacity: 0.8 });
    scene.add(new THREE.Points(starGeo, starMat));

    // Sun
    const sunRadius = 3.6;
    const sunGeo = new THREE.SphereGeometry(sunRadius, 48, 48);
    const sunTex = getSunTexture();
    const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sunMesh);

    // Sun Corona Glow
    const coronaGeo = new THREE.SphereGeometry(sunRadius * 1.3, 32, 32);
    const coronaMat = new THREE.ShaderMaterial({
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
          float intensity = pow(0.7 - dot(vNormal, vec3(0,0,1)), 2.0);
          gl_FragColor = vec4(1.0, 0.65, 0.2, 1.0) * intensity * 0.9;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const sunCorona = new THREE.Mesh(coronaGeo, coronaMat);
    scene.add(sunCorona);

    const pointLight = new THREE.PointLight(0xfffdf4, 3.8, 400, 0.4);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x0c1322, 0.45);
    scene.add(ambientLight);

    // Planet Orbits setup
    const orbitScale = [6.5, 9.5, 13.5, 18.0, 25.0, 33.0, 41.0, 49.0];
    const sizeScale = [0.45, 0.8, 0.9, 0.6, 2.1, 1.8, 1.3, 1.25];
    const speedScale = [4.1, 1.6, 1.0, 0.53, 0.2, 0.12, 0.07, 0.04];

    interface PlanetOrbitObject {
      id: PlanetId;
      radius: number;
      speed: number;
      angle: number;
      mesh: THREE.Mesh;
    }

    const planetObjects: PlanetOrbitObject[] = [];
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    PLANETS.forEach((planet, idx) => {
      const dist = orbitScale[idx];
      const pRadius = sizeScale[idx];
      const speed = speedScale[idx] * 0.015;

      const segments = window.innerWidth < 768 ? 64 : 128;
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * dist, 0, Math.sin(theta) * dist));
      }
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(planet.colors.primary),
        transparent: true,
        opacity: 0.25,
      });
      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitGroup.add(orbitLine);

      const pivot = new THREE.Group();
      scene.add(pivot);

      const sphereGeo = new THREE.SphereGeometry(pRadius, 32, 32);
      const pTexture = getPlanetTexture(planet.id);
      const sphereMat = new THREE.MeshStandardMaterial({
        map: pTexture,
        roughness: 0.8,
      });
      const pMesh = new THREE.Mesh(sphereGeo, sphereMat);
      pMesh.userData = { planetId: planet.id };
      pivot.add(pMesh);

      if (planet.id === 'saturn') {
        const rInner = pRadius * 1.3;
        const rOuter = pRadius * 2.5;
        const rGeo = new THREE.RingGeometry(rInner, rOuter, 64);
        const pos = rGeo.attributes.position;
        const uvs = rGeo.attributes.uv;
        for (let j = 0; j < pos.count; j++) {
          const x = pos.getX(j);
          const y = pos.getY(j);
          const d = Math.sqrt(x * x + y * y);
          uvs.setXY(j, (d - rInner) / (rOuter - rInner), 0.5);
        }
        rGeo.computeVertexNormals();
        const rMat = new THREE.MeshStandardMaterial({
          map: getSaturnRingTexture(),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        });
        const saturnRing = new THREE.Mesh(rGeo, rMat);
        saturnRing.rotation.x = Math.PI / 2.3;
        pMesh.add(saturnRing);
      }

      const initialAngle = (idx * (Math.PI * 2)) / 8 + 0.3;
      pMesh.position.set(Math.cos(initialAngle) * dist, 0, Math.sin(initialAngle) * dist);

      planetObjects.push({
        id: planet.id,
        radius: dist,
        speed: speed,
        angle: initialAngle,
        mesh: pMesh,
      });
    });

    // Camera Spherical Controls
    const spherical = {
      radius: window.innerWidth < 768 ? 68 : 55,
      phi: Math.PI / 4,
      theta: Math.PI / 6,
    };

    const updateCamera = () => {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 0, 0);
    };
    updateCamera();

    let isMouseDown = false;
    let prevMouse = { x: 0, y: 0 };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      // Ignore if clicking UI elements
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a')) return;

      isMouseDown = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouse = { x: clientX, y: clientY };

      // Raycast click
      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(
        planetObjects.map((p) => p.mesh),
        false
      );
      if (intersects.length > 0) {
        const clickedPlanetId = intersects[0].object.userData.planetId as PlanetId;
        if (clickedPlanetId) {
          setSelectedPlanetId(clickedPlanetId);
          spaceAudio.playInterfaceBeep(720);
        }
      }
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevMouse.x;
      const dy = clientY - prevMouse.y;

      spherical.theta -= dx * 0.006;
      spherical.phi = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, spherical.phi - dy * 0.006));
      updateCamera();

      prevMouse = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isMouseDown = false;
    };

    const onWheel = (e: WheelEvent) => {
      spherical.radius = Math.max(16, Math.min(130, spherical.radius + e.deltaY * 0.04));
      updateCamera();
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    container.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: true });

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      sunMesh.rotation.y += 0.002;

      if (animControlsRef.current.isPlaying) {
        const spd = animControlsRef.current.speed;
        planetObjects.forEach((po) => {
          po.angle += po.speed * spd;
          po.mesh.position.x = Math.cos(po.angle) * po.radius;
          po.mesh.position.z = Math.sin(po.angle) * po.radius;
          po.mesh.rotation.y += 0.02;
        });
      }

      orbitGroup.visible = animControlsRef.current.showOrbits;
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
      container.removeEventListener('wheel', onWheel);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sunGeo.dispose();
      coronaGeo.dispose();
      starGeo.dispose();
    };
  }, []);

  return (
    <section id="solar-system" className="relative w-full py-16 sm:py-24 bg-[#03050a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2 sm:mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Heliospheric Orbit Simulator</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-tight">
              Interactive Solar System <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
                Orbital Visualization
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md">
            Touch or click any orbiting body to inspect flight telemetry. Drag to rotate perspective, pinch/scroll to zoom.
          </p>
        </div>

        {/* 3D Solar System Viewport Container */}
        <div className="relative w-full h-[480px] sm:h-[620px] rounded-3xl glass-panel-glow border border-sky-500/20 overflow-hidden shadow-2xl">
          {/* Three.js Canvas */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing"
            title="Drag to orbit view, click any planet"
          />

          {/* Floating Top Controls (Speed, Play/Pause, View Options) */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            {/* Play/Pause & Speed Group */}
            <div className="flex items-center gap-1 p-1 sm:p-1.5 rounded-2xl glass-panel border border-white/10 pointer-events-auto backdrop-blur-md">
              <button
                onClick={() => {
                  setIsPlaying(!isPlaying);
                  spaceAudio.playInterfaceBeep(isPlaying ? 400 : 700);
                }}
                className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center"
                title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
                aria-label={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />}
              </button>

              <div className="h-3 sm:h-4 w-px bg-white/10 mx-0.5" />

              {[0.5, 1, 5, 20].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    setSimSpeed(spd);
                    spaceAudio.playInterfaceBeep(500 + spd * 20);
                  }}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono transition-all min-h-[32px] ${
                    simSpeed === spd
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Orbit Lines Toggle */}
            <div className="flex items-center gap-1.5 p-1 sm:p-1.5 rounded-2xl glass-panel border border-white/10 pointer-events-auto backdrop-blur-md">
              <button
                onClick={() => setShowOrbits(!showOrbits)}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-mono transition-all flex items-center gap-1.5 min-h-[34px] ${
                  showOrbits ? 'bg-white/10 text-sky-300' : 'text-slate-500'
                }`}
              >
                <Orbit className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Orbits</span>
              </button>
            </div>
          </div>

          {/* Planet Selector Quick Dock at Bottom Left */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 p-1.5 rounded-2xl glass-panel border border-white/10 overflow-x-auto max-w-[calc(100%-1.5rem)] sm:max-w-md scrollbar-none pointer-events-auto">
            {PLANETS.map((planet) => (
              <button
                key={planet.id}
                onClick={() => {
                  setSelectedPlanetId(planet.id);
                  spaceAudio.playInterfaceBeep(650);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono transition-all flex-shrink-0 flex items-center gap-1.5 min-h-[36px] ${
                  selectedPlanetId === planet.id
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: planet.colors.primary }}
                />
                <span>{planet.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Planet HUD Card */}
          {selectedPlanet && (
            <div className="absolute bottom-16 sm:bottom-4 right-3 left-3 sm:left-auto sm:w-80 rounded-2xl glass-panel-glow border border-sky-500/30 p-4 sm:p-5 shadow-2xl animate-in fade-in duration-200 pointer-events-auto z-20">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedPlanet.colors.primary }}
                  />
                  <span className="font-display font-bold text-white text-sm sm:text-base">
                    {selectedPlanet.name.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] sm:text-[10px] font-mono text-sky-400 uppercase">
                    SECTOR {selectedPlanet.romanNumeral}
                  </span>
                  <button
                    onClick={() => setSelectedPlanetId(null)}
                    className="text-slate-400 hover:text-white sm:hidden p-1"
                    aria-label="Dismiss HUD"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-2 gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono mb-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-white/5">
                  <span className="text-[9px] text-slate-400 block truncate">TEMP</span>
                  <span className="text-white font-bold">{selectedPlanet.avgTempC}°C</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-white/5">
                  <span className="text-[9px] text-slate-400 block truncate">DIST</span>
                  <span className="text-white font-bold">{selectedPlanet.distanceFromSunAU} AU</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-white/5">
                  <span className="text-[9px] text-slate-400 block truncate">DIAMETER</span>
                  <span className="text-white font-bold truncate">{selectedPlanet.diameterKm} km</span>
                </div>
                <div className="p-1.5 sm:p-2 rounded-lg bg-white/5">
                  <span className="text-[9px] text-slate-400 block truncate">MOONS</span>
                  <span className="text-white font-bold">{selectedPlanet.moonsCount}</span>
                </div>
              </div>

              <button
                onClick={() => onSelectPlanetForDetail(selectedPlanet.id)}
                className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all min-h-[40px]"
              >
                <span>Launch Deep Telemetry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
