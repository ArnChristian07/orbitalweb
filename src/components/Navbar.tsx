import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Globe2, Compass, Radio, Search, Orbit, Scale } from 'lucide-react';
import { spaceAudio } from '../utils/audio';
import { PLANETS } from '../data/planets';
import { PlanetId } from '../types/planet';

interface NavbarProps {
  onSelectPlanet: (id: PlanetId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectPlanet }) => {
  const [audioActive, setAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  // Update live UTC space telemetry clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        now.toUTCString().slice(17, 25) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll position for dynamic glass blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu or search is open
  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, searchOpen]);

  const toggleSound = () => {
    const newState = spaceAudio.toggle();
    setAudioActive(newState);
    if (newState) {
      spaceAudio.playInterfaceBeep(640);
    }
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'py-2.5 sm:py-3 bg-[#03050a]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-sky-950/20'
            : 'py-4 sm:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo & Status Indicator */}
          <a
            href="#"
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none min-h-[44px]"
            aria-label="ORBITAL Home"
          >
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-sky-500/20 group-hover:bg-sky-500/40 transition-colors blur-sm" />
              <div className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-sky-400 flex items-center justify-center bg-space-950">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-300 animate-pulse" />
                <div className="absolute w-7 sm:w-8 h-2 border border-sky-400/60 rounded-full -rotate-45 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold tracking-[0.24em] sm:tracking-[0.28em] text-base sm:text-lg text-white group-hover:text-sky-300 transition-colors">
                ORBITAL
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5 sm:-mt-1">
                Deep Space Archive
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full px-5 py-1.5 glass-panel border border-white/10 shadow-inner">
            <button
              onClick={() => scrollTo('explore')}
              className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              Explore
            </button>
            <button
              onClick={() => scrollTo('solar-system')}
              className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              Solar System
            </button>
            <button
              onClick={() => scrollTo('discoveries')}
              className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              Discoveries
            </button>
            <button
              onClick={() => scrollTo('scale')}
              className="px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              Comparison
            </button>
          </nav>

          {/* Right Tools: Space Clock, Search & Audio Ambiance */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Mission Clock (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[11px] font-mono text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{utcTime}</span>
            </div>

            {/* Quick Planet Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center rounded-full glass-panel hover:bg-sky-500/10 hover:border-sky-500/30 text-slate-300 hover:text-sky-300 transition-all focus:outline-none"
              title="Search Planets"
              aria-label="Search Planets"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Cosmic Ambient Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`w-10 h-10 sm:w-auto sm:px-3 sm:py-2 rounded-full glass-panel transition-all flex items-center justify-center gap-1.5 focus:outline-none ${
                audioActive
                  ? 'border-sky-400/50 text-sky-300 bg-sky-950/40 shadow-lg shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:border-white/20'
              }`}
              title={audioActive ? 'Mute Deep Space Audio' : 'Enable Deep Space Ambient Audio'}
              aria-label="Toggle Cosmic Soundscape"
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <div className="hidden xl:flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-3 bg-sky-400 animate-pulse" />
                    <span className="w-0.5 h-2 bg-sky-400 animate-pulse delay-75" />
                    <span className="w-0.5 h-2.5 bg-sky-400 animate-pulse delay-150" />
                  </div>
                </>
              ) : (
                <VolumeX className="w-4 h-4 flex-shrink-0" />
              )}
            </button>

            {/* Mobile Menu Toggle Button with Minimum Touch Target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full glass-panel text-slate-300 hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Full-Screen Mobile Drawer with Smooth Reveal */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 bg-[#03050a]/95 backdrop-blur-2xl z-50 flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 border-t border-white/10">
            <div className="flex flex-col gap-3">
              {/* Telemetry Clock Bar */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300 mb-2">
                <span className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                  MISSION TIME
                </span>
                <span className="text-emerald-400 font-bold">{utcTime}</span>
              </div>

              {/* Navigation Links with Large Touch Targets */}
              <button
                onClick={() => scrollTo('explore')}
                className="flex items-center justify-between p-4 text-base font-display font-semibold text-white hover:text-sky-300 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Globe2 className="w-5 h-5 text-sky-400" />
                  <span>EXPLORE PLANETS</span>
                </div>
                <span className="text-xs font-mono text-slate-400">01</span>
              </button>

              <button
                onClick={() => scrollTo('solar-system')}
                className="flex items-center justify-between p-4 text-base font-display font-semibold text-white hover:text-amber-300 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Orbit className="w-5 h-5 text-amber-400" />
                  <span>SOLAR SYSTEM 3D</span>
                </div>
                <span className="text-xs font-mono text-slate-400">02</span>
              </button>

              <button
                onClick={() => scrollTo('discoveries')}
                className="flex items-center justify-between p-4 text-base font-display font-semibold text-white hover:text-purple-300 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Radio className="w-5 h-5 text-purple-400" />
                  <span>COSMIC DISCOVERIES</span>
                </div>
                <span className="text-xs font-mono text-slate-400">03</span>
              </button>

              <button
                onClick={() => scrollTo('scale')}
                className="flex items-center justify-between p-4 text-base font-display font-semibold text-white hover:text-emerald-300 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  <span>SCALE & GRAVITY</span>
                </div>
                <span className="text-xs font-mono text-slate-400">04</span>
              </button>
            </div>

            {/* Quick Planet Selector Grid inside Mobile Menu */}
            <div className="pt-6 border-t border-white/10">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-3">
                Quick Jump to Sector
              </span>
              <div className="grid grid-cols-4 gap-2">
                {PLANETS.map((planet) => (
                  <button
                    key={planet.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectPlanet(planet.id);
                      spaceAudio.playInterfaceBeep(700);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-sky-500/20 border border-white/5 text-center flex flex-col items-center gap-1 transition-all"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: planet.colors.primary }}
                    />
                    <span className="text-[11px] font-display font-bold text-white truncate w-full">
                      {planet.name.slice(0, 4)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Responsive Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg glass-panel-glow rounded-3xl border border-sky-500/30 p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5 text-sky-400">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-mono text-xs sm:text-sm tracking-wider uppercase text-slate-200">
                  Select Planetary Sector
                </span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              {PLANETS.map((planet) => (
                <button
                  key={planet.id}
                  onClick={() => {
                    onSelectPlanet(planet.id);
                    setSearchOpen(false);
                    spaceAudio.playInterfaceBeep(800);
                  }}
                  className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.03] hover:bg-sky-500/10 border border-white/5 hover:border-sky-500/40 text-center transition-all group min-h-[76px] justify-center"
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full mb-1.5 shadow-sm"
                    style={{ backgroundColor: planet.colors.primary }}
                  />
                  <span className="font-display text-xs sm:text-sm font-semibold text-white group-hover:text-sky-200">
                    {planet.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {planet.avgTempC}°C
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
