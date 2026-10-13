// Web Audio API Sound Manager for Bio-Kinetic Micro-Interactions (I2FLabs Deep-Tech Audio Engine)
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 1. Sharp Razor Blade Click (Modeled after the dynamic slash of the new I2F logo)
  public playRazorClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.045);

      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.045);
    } catch {}
  }

  // 2. Sub-bass Bio-Pulse (Organic 48Hz Heartbeat of AI Core An)
  public playBioPulse() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(68, t);
      osc.frequency.exponentialRampToValueAtTime(38, t + 0.16);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.16);
    } catch {}
  }

  // 3. Quantum Tachyon Warp (Fired during dialogue tree state transitions)
  public playQuantumWarp() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(1320, t + 0.09);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.09);
    } catch {}
  }

  public playClick(_pitch = 1) {
    this.playRazorClick();
  }

  public playPop() {
    this.playBioPulse();
  }

  public playTypeTick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400 + Math.random() * 500, t);

      gain.gain.setValueAtTime(0.025, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.018);
    } catch {}
  }

  public playChime() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const notes = [528.0, 660.0, 792.0, 1056.0]; // Golden 528Hz Solfeggio Scale
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const start = this.ctx.currentTime + idx * 0.055;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.09, start + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.38);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.38);
      });
    } catch {}
  }
  // 4. Singularity Accretion Hum (Resonant pitch rises as compression increases)
  public playAccretionHum(pitchFactor: number = 0.5) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const baseFreq = 75 + pitchFactor * 340;
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, t + 0.08);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch {}
  }

  // 5. Cosmic Big Bang Supernova Blast
  public playBigBang() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      // Low rumble sub-bass shockwave
      const oscLow = this.ctx.createOscillator();
      const gainLow = this.ctx.createGain();
      oscLow.type = 'sawtooth';
      oscLow.frequency.setValueAtTime(160, t);
      oscLow.frequency.exponentialRampToValueAtTime(24, t + 0.7);
      gainLow.gain.setValueAtTime(0.3, t);
      gainLow.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
      oscLow.connect(gainLow);
      gainLow.connect(this.ctx.destination);
      oscLow.start(t);
      oscLow.stop(t + 0.7);

      // High quantum shimmer
      const oscHigh = this.ctx.createOscillator();
      const gainHigh = this.ctx.createGain();
      oscHigh.type = 'triangle';
      oscHigh.frequency.setValueAtTime(1050, t);
      oscHigh.frequency.exponentialRampToValueAtTime(180, t + 0.45);
      gainHigh.gain.setValueAtTime(0.18, t);
      gainHigh.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      oscHigh.connect(gainHigh);
      gainHigh.connect(this.ctx.destination);
      oscHigh.start(t);
      oscHigh.stop(t + 0.45);
    } catch {}
  }
}

export const soundManager = new SoundManager();
