import React, { useState } from 'react';
import { Radio, Clock, Calendar, ArrowRight, X } from 'lucide-react';
import { COSMIC_DISCOVERIES, SPACE_MILESTONES } from '../data/discoveries';
import { DiscoveryStory } from '../types/planet';
import { spaceAudio } from '../utils/audio';

export const CosmicDiscoveries: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<DiscoveryStory | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Astrophysics Breakthrough', 'Planetary Phenomenon', 'Deep Space Mission', 'Exoplanet Discovery'];

  const filteredStories = activeCategory === 'All'
    ? COSMIC_DISCOVERIES
    : COSMIC_DISCOVERIES.filter(s => s.category === activeCategory);

  const openStory = (story: DiscoveryStory) => {
    setSelectedStory(story);
    spaceAudio.playInterfaceBeep(780);
  };

  return (
    <section id="discoveries" className="relative w-full py-16 sm:py-28 bg-[#03050a] border-t border-white/5 overflow-hidden">
      {/* Background Nebular Glow */}
      <div className="absolute top-1/3 left-1/4 w-64 sm:w-[500px] h-64 sm:h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-[500px] h-64 sm:h-[500px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-2 sm:mb-3">
              <Radio className="w-3.5 h-3.5" />
              <span>Astrophysical Journal & Archive</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase leading-tight">
              Cosmic Discoveries & <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-sky-400 bg-clip-text text-transparent">
                Frontier Missions
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-sans text-slate-300 max-w-md">
            Peer into the deepest frontiers of observational astronomy, robotic exploration, and the search for prebiotic ocean worlds.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-8 sm:mb-12 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                spaceAudio.playInterfaceBeep(600);
              }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-mono tracking-wider transition-all whitespace-nowrap min-h-[36px] ${
                activeCategory === cat
                  ? 'bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/20'
                  : 'glass-panel text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Editorial Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 mb-12 sm:mb-20">
          {filteredStories.map((story) => (
            <article
              key={story.id}
              onClick={() => openStory(story)}
              className="group cursor-pointer rounded-3xl glass-panel border border-white/5 hover:border-purple-500/40 hover:bg-white/[0.04] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 transform sm:hover:-translate-y-1.5 shadow-xl relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: story.accentColor }}
              />

              <div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-400 mb-3 sm:mb-4">
                  <span
                    className="px-2.5 py-0.5 rounded-full uppercase font-bold text-[9px] sm:text-[10px]"
                    style={{
                      color: story.accentColor,
                      backgroundColor: `${story.accentColor}18`,
                    }}
                  >
                    {story.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {story.readTime}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-sky-300 transition-colors mb-2.5 sm:mb-3 leading-snug">
                  {story.title}
                </h3>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">
                  {story.subtitle}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 pt-3 sm:pt-4 border-t border-white/5 mb-4 sm:mb-6 text-[10px] sm:text-xs font-mono">
                  {story.keyStats.slice(0, 2).map((stat, i) => (
                    <div key={i} className="p-2 rounded-lg bg-white/[0.02]">
                      <span className="text-[9px] sm:text-[10px] text-slate-400 block truncate">{stat.label}</span>
                      <span className="text-white font-semibold truncate block">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-400 group-hover:text-sky-300 min-h-[32px]">
                  <span>READ FULL REPORT</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Space Exploration Milestones Timeline */}
        <div className="rounded-3xl glass-panel-glow border border-purple-500/20 p-5 sm:p-12">
          <div className="flex items-center gap-2.5 mb-2 text-[10px] sm:text-xs font-mono text-purple-400 uppercase tracking-widest">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>CHRONOLOGY OF DEEP SPACE MISSIONS</span>
          </div>
          <h3 className="font-display font-black text-xl sm:text-4xl text-white uppercase mb-6 sm:mb-8">
            The Long March to the Stars
          </h3>

          <div className="relative border-l border-white/10 ml-3 sm:ml-6 pl-5 sm:pl-8 space-y-6 sm:space-y-8">
            {SPACE_MILESTONES.map((m, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[27px] sm:-left-[39px] top-1 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#03050a] border-2 border-purple-400 group-hover:bg-purple-400 group-hover:scale-125 transition-all" />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <span className="font-mono text-xs font-bold text-purple-400 tracking-wider">
                    {m.year}
                  </span>
                  <span className="font-display font-bold text-base sm:text-lg text-white">
                    {m.event}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5 sm:mt-1 max-w-2xl leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reader Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-3xl rounded-3xl glass-panel-glow border border-purple-500/30 p-5 sm:p-12 shadow-2xl relative my-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close story"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono mb-3 sm:mb-4" style={{ color: selectedStory.accentColor }}>
              <span className="uppercase font-bold tracking-widest">{selectedStory.category}</span>
              <span>•</span>
              <span>{selectedStory.date}</span>
            </div>

            <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase mb-3 sm:mb-4 leading-snug">
              {selectedStory.title}
            </h2>

            <p className="text-sm sm:text-base lg:text-lg font-sans text-sky-200/90 leading-relaxed mb-6 sm:mb-8">
              {selectedStory.subtitle}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 sm:mb-8">
              {selectedStory.keyStats.map((stat, i) => (
                <div key={i}>
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-400 block uppercase truncate">{stat.label}</span>
                  <span className="font-display font-bold text-xs sm:text-sm text-white truncate block">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 sm:space-y-4 text-slate-300 text-xs sm:text-base leading-relaxed font-sans mb-6 sm:mb-8">
              {selectedStory.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <button
              onClick={() => setSelectedStory(null)}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-slate-950 font-display font-bold text-xs uppercase tracking-widest hover:bg-sky-400 transition-colors min-h-[44px]"
            >
              Close Scientific Brief
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
