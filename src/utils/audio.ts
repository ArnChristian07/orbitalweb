// Web Audio API Ambient Cosmic Soundscape Generator

class SpaceAudioSystem {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, now + 3);
    this.masterGain.connect(this.ctx.destination);

    // Filter for deep space warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);
    filter.Q.setValueAtTime(3.5, now);
    filter.connect(this.masterGain);

    // Deep drone osc 1 (55Hz - A1 note)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(55, now);

    // Deep drone osc 2 (110Hz detuned for celestial chorus)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(110.3, now);

    // Slow LFO modulation for cosmic pulsation
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.08, now); // ~12s cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(40, now);
    this.lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);
    this.lfo.start(now);

    this.isPlaying = true;
  }

  private stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);
    setTimeout(() => {
      try {
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.lfo?.stop();
        this.droneOsc1?.disconnect();
        this.droneOsc2?.disconnect();
        this.lfo?.disconnect();
      } catch {
        // Safe catch for node cleanup
      }
      this.isPlaying = false;
    }, 1600);
  }

  // Play delicate sci-fi interface blip
  public playInterfaceBeep(frequency = 880, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, now + 0.08);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // Audio might not be resumed yet
    }
  }
}

export const spaceAudio = new SpaceAudioSystem();
