import React from 'react';
import { spaceAudio } from '../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-[#020307] border-t border-white/10 pt-12 sm:pt-16 pb-10 sm:pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-white/5">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-sky-400 flex items-center justify-center bg-space-950">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-300" />
              </div>
              <span className="font-display font-black tracking-[0.24em] text-lg sm:text-xl text-white">
                ORBITAL
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An immersive planetary exploration platform combining NASA scientific veracity with cinematic interactive storytelling. Dedicated to the curiosity of human civilization.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>TELEMETRY LINK: ONLINE (Ka-BAND)</span>
            </div>
          </div>

          {/* Planetary Sectors */}
          <div className="md:col-span-3 space-y-2 sm:space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              Planetary Sectors
            </h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#explore" className="hover:text-sky-300 transition-colors py-1 block">Sector I–IV: Terrestrial Worlds</a></li>
              <li><a href="#explore" className="hover:text-sky-300 transition-colors py-1 block">Sector V–VI: Jovian Gas Giants</a></li>
              <li><a href="#explore" className="hover:text-sky-300 transition-colors py-1 block">Sector VII–VIII: Outer Ice Giants</a></li>
              <li><a href="#solar-system" className="hover:text-sky-300 transition-colors py-1 block">Heliosphere Orbit Simulator</a></li>
              <li><a href="#scale" className="hover:text-sky-300 transition-colors py-1 block">Planetary Gravity Comparator</a></li>
            </ul>
          </div>

          {/* Observational Archives & Credits */}
          <div className="md:col-span-4 space-y-2 sm:space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
              Data & Astronomical Sources
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Orbital parameters and atmospheric volumetric metrics curated from NASA JPL Horizons ephemerides, ESA Planetary Science Archive, and IAU Minor Planet Center datasets.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300">NASA JPL</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300">ESA PSA</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300">IAU Horizons</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-slate-300">STScI / JWST</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-slate-400 gap-3 sm:gap-4 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} ORBITAL INTERACTIVE. EXPEDITIONS TO THE STARS.
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#explore" className="hover:text-white transition-colors py-1">Explore</a>
            <a href="#solar-system" className="hover:text-white transition-colors py-1">Orbits</a>
            <a href="#discoveries" className="hover:text-white transition-colors py-1">Discoveries</a>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                spaceAudio.playInterfaceBeep(900);
              }}
              className="text-sky-400 hover:text-sky-300 uppercase tracking-wider py-1 font-bold"
            >
              Zenith ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
