import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSaturn } from './components/HeroSaturn';
import { PlanetCarousel } from './components/PlanetCarousel';
import { PlanetDetailModal } from './components/PlanetDetailModal';
import { SolarSystemViewer } from './components/SolarSystemViewer';
import { CosmicDiscoveries } from './components/CosmicDiscoveries';
import { ScaleComparator } from './components/ScaleComparator';
import { Footer } from './components/Footer';
import { PlanetId } from './types/planet';
import { PLANETS } from './data/planets';
import { spaceAudio } from './utils/audio';

export function App() {
  const [selectedPlanetForDetail, setSelectedPlanetForDetail] = useState<PlanetId | null>(null);

  // Keyboard number shortcuts (1 = Mercury, 2 = Venus, ..., 8 = Neptune)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const num = parseInt(e.key);
      if (num >= 1 && num <= 8) {
        const targetPlanet = PLANETS[num - 1];
        if (targetPlanet) {
          setSelectedPlanetForDetail(targetPlanet.id);
          spaceAudio.playInterfaceBeep(500 + num * 50);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStartExploring = () => {
    const el = document.getElementById('explore');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreSolarSystem = () => {
    const el = document.getElementById('solar-system');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Floating Top Navigation */}
      <Navbar onSelectPlanet={(id) => setSelectedPlanetForDetail(id)} />

      {/* Main Experience Flow */}
      <main className="w-full overflow-hidden">
        {/* Section 2: Fullscreen Cinematic 3D Saturn Hero */}
        <HeroSaturn
          onStartExploring={handleStartExploring}
          onExploreSolarSystem={handleExploreSolarSystem}
        />

        {/* Section 3: Interactive Planet Exploration Carousel */}
        <PlanetCarousel
          onSelectPlanet={(id) => setSelectedPlanetForDetail(id)}
        />

        {/* Section 5: Interactive 3D Solar System Heliosphere Simulator */}
        <SolarSystemViewer
          onSelectPlanetForDetail={(id) => setSelectedPlanetForDetail(id)}
        />

        {/* Section 6: Cosmic Discoveries & Space Milestones Editorial */}
        <CosmicDiscoveries />

        {/* Bonus Interactivity: Planetary Physical Scale & Mass Comparator */}
        <ScaleComparator />
      </main>

      {/* Section 7 & Deep Telemetry Footer */}
      <Footer />

      {/* Section 4: Dedicated Planet Detail Experience Modal */}
      {selectedPlanetForDetail && (
        <PlanetDetailModal
          planetId={selectedPlanetForDetail}
          onClose={() => setSelectedPlanetForDetail(null)}
          onSelectPlanet={(id) => setSelectedPlanetForDetail(id)}
        />
      )}
    </div>
  );
}

export default App;
