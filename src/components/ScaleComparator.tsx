import React, { useState } from 'react';
import { Scale, ArrowRightLeft, Weight } from 'lucide-react';
import { PLANETS } from '../data/planets';
import { PlanetData, PlanetId } from '../types/planet';
import { spaceAudio } from '../utils/audio';

export const ScaleComparator: React.FC = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<PlanetId>('mars');
  const [userWeightKg, setUserWeightKg] = useState<number>(70);

  const planet: PlanetData = PLANETS.find((p) => p.id === selectedPlanetId) || PLANETS[3];
  const earth: PlanetData = PLANETS.find((p) => p.id === 'earth')!;

  const planetWeight = (userWeightKg * planet.gravityVsEarth).toFixed(1);
  const scaleRatio = (planet.diameterKm / earth.diameterKm).toFixed(2);

  return (
    <section id="scale" className="relative w-full py-16 sm:py-28 bg-[#03050a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2 sm:mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>Planetary Comparison Engine</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-tight">
            Comparative Physics <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Earth vs. The Cosmos
            </span>
          </h2>
          <p className="text-slate-300 text-xs sm:text-base font-sans mt-3 sm:mt-4">
            Benchmark any celestial body against Earth's gravitational, atmospheric, and dimensional metrics.
          </p>
        </div>

        {/* Planet Selector Switcher */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {PLANETS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedPlanetId(p.id);
                spaceAudio.playInterfaceBeep(620);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-mono tracking-wider transition-all flex items-center gap-2 whitespace-nowrap min-h-[36px] ${
                selectedPlanetId === p.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'glass-panel text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: p.colors.primary }}
              />
              <span>{p.name.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Comparison Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Visual Planetary Size Comparison Circles */}
          <div className="lg:col-span-5 glass-panel-glow rounded-3xl border border-emerald-500/20 p-5 sm:p-8 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[380px] relative overflow-hidden">
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase tracking-widest mb-4 sm:mb-6 text-center">
              RELATIVE SIZE (EARTH = 1.0)
            </span>

            <div className="flex items-end justify-center gap-4 sm:gap-8 relative z-10 w-full">
              {/* Earth Circle */}
              <div className="flex flex-col items-center">
                <div
                  className="rounded-full shadow-2xl transition-all duration-500 w-16 h-16 sm:w-22 sm:h-22"
                  style={{
                    background: 'radial-gradient(circle at 35% 30%, #38bdf8 0%, #0369a1 70%, #082f49 100%)',
                    boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)'
                  }}
                />
                <span className="font-display font-bold text-xs sm:text-sm text-white mt-2 sm:mt-3">EARTH</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">12,742 km</span>
              </div>

              {/* Arrow */}
              <div className="text-slate-500 pb-5 sm:pb-8 flex-shrink-0">
                <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Target Planet Circle */}
              <div className="flex flex-col items-center">
                <div
                  className="rounded-full shadow-2xl transition-all duration-700 max-w-[140px] max-h-[140px]"
                  style={{
                    width: `${Math.min(130, Math.max(28, 64 * (planet.diameterKm / 12742)))}px`,
                    height: `${Math.min(130, Math.max(28, 64 * (planet.diameterKm / 12742)))}px`,
                    background: `radial-gradient(circle at 35% 30%, ${planet.colors.primary} 0%, ${planet.colors.secondary} 70%, #03050a 100%)`,
                    boxShadow: `0 0 25px ${planet.colors.glow}`
                  }}
                />
                <span className="font-display font-bold text-xs sm:text-sm text-white mt-2 sm:mt-3 uppercase">{planet.name}</span>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">{planet.diameterStr}</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 text-[10px] sm:text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-500/30 text-center">
              {planet.name} is {scaleRatio}x diameter of Earth
            </div>
          </div>

          {/* Right Column: Interactive Gravity & Weight Calculator */}
          <div className="lg:col-span-7 glass-panel rounded-3xl border border-white/5 p-5 sm:p-8 lg:p-10">
            <h3 className="font-display font-bold text-lg sm:text-2xl text-white uppercase tracking-wide mb-4 sm:mb-6 flex items-center gap-2">
              <Weight className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0" />
              Gravitational Mass Calculator
            </h3>

            {/* Slider */}
            <div className="mb-6 sm:mb-8">
              <div className="flex justify-between items-center text-xs sm:text-sm font-mono mb-2">
                <span className="text-slate-300">Your Mass on Earth:</span>
                <span className="font-display font-bold text-lg sm:text-xl text-white">{userWeightKg} kg</span>
              </div>
              <input
                type="range"
                min="30"
                max="150"
                value={userWeightKg}
                onChange={(e) => setUserWeightKg(Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400 touch-pan-x"
              />
            </div>

            {/* Result Card */}
            <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400 uppercase tracking-widest block mb-0.5 sm:mb-1">
                  Effective Weight on {planet.name}
                </span>
                <div className="font-display font-black text-3xl sm:text-4xl text-emerald-300">
                  {planetWeight} <span className="text-base sm:text-xl text-emerald-400 font-mono">kg</span>
                </div>
              </div>
              <div className="text-[11px] sm:text-xs font-mono text-slate-300 sm:text-right max-w-xs">
                Surface gravity is <span className="text-white font-bold">{planet.gravityMss} m/s²</span> ({planet.gravityVsEarth}x of Earth's 9.81 m/s²).
              </div>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="p-2.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block mb-0.5 sm:mb-1">Day</span>
                <div className="font-display text-xs sm:text-sm font-bold text-white truncate">{planet.dayLengthStr}</div>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">Earth: 24h</span>
              </div>

              <div className="p-2.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block mb-0.5 sm:mb-1">Year</span>
                <div className="font-display text-xs sm:text-sm font-bold text-white truncate">{planet.yearLengthStr}</div>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">Earth: 365d</span>
              </div>

              <div className="p-2.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 uppercase block mb-0.5 sm:mb-1">Temp</span>
                <div className="font-display text-xs sm:text-sm font-bold text-white truncate">{planet.avgTempC}°C</div>
                <span className="text-[9px] sm:text-[10px] font-mono text-slate-400">Earth: 15°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
