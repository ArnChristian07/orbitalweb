import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Thermometer, Ruler, Moon, Compass, ArrowUpRight } from 'lucide-react';
import { PlanetData, PlanetId } from '../types/planet';
import { PLANETS } from '../data/planets';
import { spaceAudio } from '../utils/audio';

interface PlanetCarouselProps {
  onSelectPlanet: (id: PlanetId) => void;
}

export const PlanetCarousel: React.FC<PlanetCarouselProps> = ({ onSelectPlanet }) => {
  const [currentIndex, setCurrentIndex] = useState(2); // Earth as default start
  const [filter, setFilter] = useState<'all' | 'terrestrial' | 'giant'>('all');

  const filteredPlanets = PLANETS.filter((p) => {
    if (filter === 'terrestrial') return p.type === 'Terrestrial Planet';
    if (filter === 'giant') return p.type === 'Gas Giant' || p.type === 'Ice Giant';
    return true;
  });

  const activePlanet: PlanetData = filteredPlanets[currentIndex] || filteredPlanets[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredPlanets.length - 1));
    spaceAudio.playInterfaceBeep(580);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < filteredPlanets.length - 1 ? prev + 1 : 0));
    spaceAudio.playInterfaceBeep(680);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredPlanets.length]);

  return (
    <section id="explore" className="relative w-full py-16 sm:py-28 bg-[#03050a] overflow-hidden border-t border-white/5">
      {/* Decorative Accents */}
      <div className="absolute top-1/4 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sky-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2 sm:mb-3">
              <Compass className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Catalog of Planetary Bodies</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-tight">
              Planetary System <br />
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                Exploration Carousel
              </span>
            </h2>
          </div>

          {/* Classification Filters */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/5 p-1 rounded-xl border border-white/10 self-start md:self-end overflow-x-auto max-w-full">
            <button
              onClick={() => {
                setFilter('all');
                setCurrentIndex(0);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                filter === 'all'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL (8)
            </button>
            <button
              onClick={() => {
                setFilter('terrestrial');
                setCurrentIndex(0);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                filter === 'terrestrial'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ROCKY (4)
            </button>
            <button
              onClick={() => {
                setFilter('giant');
                setCurrentIndex(0);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-mono tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                filter === 'giant'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              GIANTS (4)
            </button>
          </div>
        </div>

        {/* Horizontal Planet Thumb Strip */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-6 sm:mb-8 scrollbar-none no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filteredPlanets.map((planet, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={planet.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  spaceAudio.playInterfaceBeep(500 + idx * 60);
                }}
                className={`flex-shrink-0 flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 text-left min-h-[48px] ${
                  isSelected
                    ? 'glass-panel-glow border-sky-400/80 bg-sky-950/40 translate-y-[-2px]'
                    : 'glass-panel border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full shadow-inner flex items-center justify-center text-[10px] font-mono font-bold flex-shrink-0"
                  style={{
                    backgroundColor: planet.colors.primary,
                    boxShadow: isSelected ? `0 0 14px ${planet.colors.glow}` : 'none'
                  }}
                >
                  <span className="text-slate-950">{planet.order}</span>
                </div>
                <div>
                  <div className="font-display text-xs sm:text-sm font-bold text-white tracking-wide">
                    {planet.name}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                    {planet.distanceFromSunAU} AU
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Primary Feature Showcase for Selected Planet */}
        {activePlanet && (
          <div className="relative rounded-3xl glass-panel-glow border border-sky-500/20 p-5 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
            {/* Ambient Background Gradient */}
            <div
              className="absolute -top-24 -right-24 w-64 sm:w-96 h-64 sm:h-96 rounded-full blur-[100px] sm:blur-[140px] opacity-25 pointer-events-none transition-all duration-700"
              style={{ backgroundColor: activePlanet.colors.primary }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
              {/* Left Column: Visual Planetary Graphic */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                <div className="relative w-44 h-44 sm:w-64 sm:h-64 flex items-center justify-center my-2 sm:my-0">
                  <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-spin-slow pointer-events-none" />
                  <div className="absolute -inset-4 sm:-inset-6 rounded-full border border-white/5 pointer-events-none" />

                  {/* Atmospheric Glow */}
                  <div
                    className="absolute inset-4 rounded-full blur-xl sm:blur-2xl opacity-40 transition-all duration-500"
                    style={{ backgroundColor: activePlanet.colors.primary }}
                  />

                  {/* Planet Disc Graphic */}
                  <div
                    className="relative w-36 h-36 sm:w-52 sm:h-52 rounded-full shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-700 group hover:scale-105"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${activePlanet.colors.primary} 0%, ${activePlanet.colors.secondary} 70%, #03050a 100%)`,
                      boxShadow: `0 0 40px -8px ${activePlanet.colors.glow}`,
                    }}
                  >
                    {activePlanet.id === 'saturn' && (
                      <div className="absolute w-56 sm:w-72 h-12 sm:h-16 rounded-[100%] border-2 sm:border-4 border-amber-200/60 -rotate-12 pointer-events-none shadow-lg" />
                    )}
                    {activePlanet.id === 'uranus' && (
                      <div className="absolute w-48 sm:w-64 h-6 sm:h-8 rounded-[100%] border-2 border-sky-300/40 rotate-80 pointer-events-none" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/10 pointer-events-none" />
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3">
                  <span className="font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
                    SECTOR {activePlanet.romanNumeral}
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-sky-950/50 text-sky-300 border border-sky-500/20">
                    {activePlanet.type}
                  </span>
                </div>
              </div>

              {/* Right Column: Telemetry & Overview */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="font-mono text-[10px] sm:text-xs text-sky-400 tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                      Object #{activePlanet.order} of 8
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-slate-400">
                      {activePlanet.orbitalVelocityKmS} KM/S
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-1.5 sm:mb-2">
                    {activePlanet.name}
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-sky-300/90 mb-4 sm:mb-6">
                    {activePlanet.tagline}
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 font-sans">
                    {activePlanet.scientificDescription}
                  </p>
                </div>

                {/* Key Scientific Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 py-4 sm:py-6 border-y border-white/10 mb-6 sm:mb-8">
                  <div className="flex flex-col p-2.5 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-slate-400 mb-0.5 sm:mb-1">
                      <Thermometer className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                      <span>AVG TEMP</span>
                    </div>
                    <span className="font-display font-bold text-base sm:text-xl text-white">
                      {activePlanet.avgTempC}°C
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 truncate">
                      {activePlanet.avgTempStr.split('(')[1]?.replace(')', '') || 'Stable'}
                    </span>
                  </div>

                  <div className="flex flex-col p-2.5 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-slate-400 mb-0.5 sm:mb-1">
                      <Compass className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>DISTANCE</span>
                    </div>
                    <span className="font-display font-bold text-base sm:text-xl text-white">
                      {activePlanet.distanceFromSunAU} AU
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                      {activePlanet.distanceStr.split(' ')[0]}
                    </span>
                  </div>

                  <div className="flex flex-col p-2.5 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-slate-400 mb-0.5 sm:mb-1">
                      <Ruler className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                      <span>DIAMETER</span>
                    </div>
                    <span className="font-display font-bold text-base sm:text-xl text-white truncate">
                      {activePlanet.diameterStr}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                      Equatorial
                    </span>
                  </div>

                  <div className="flex flex-col p-2.5 sm:p-0 rounded-xl bg-white/[0.02] sm:bg-transparent">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-slate-400 mb-0.5 sm:mb-1">
                      <Moon className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      <span>MOONS</span>
                    </div>
                    <span className="font-display font-bold text-base sm:text-xl text-white">
                      {activePlanet.moonsCount}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">
                      {activePlanet.moonsCount === 0 ? 'None' : `${activePlanet.majorMoons.length} major`}
                    </span>
                  </div>
                </div>

                {/* Actions & Carousel Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      spaceAudio.playInterfaceBeep(880);
                      onSelectPlanet(activePlanet.id);
                    }}
                    className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full bg-white hover:bg-sky-400 text-slate-950 font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl min-h-[46px]"
                  >
                    <span>Launch Dedicated Planet Experience</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center justify-center gap-2 self-center sm:self-auto">
                    <button
                      onClick={handlePrev}
                      className="p-3 rounded-full glass-panel hover:bg-white/10 active:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title="Previous Planet (Left Arrow)"
                      aria-label="Previous Planet"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-mono text-slate-400 px-3">
                      {currentIndex + 1} / {filteredPlanets.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="p-3 rounded-full glass-panel hover:bg-white/10 active:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                      title="Next Planet (Right Arrow)"
                      aria-label="Next Planet"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
