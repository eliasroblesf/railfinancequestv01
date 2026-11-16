class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = true;

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private tone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.08, delay = 0) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playClick() {
    this.tone(440, 0.06, 'triangle', 0.05);
  }

  public playCorrect() {
    this.tone(523.25, 0.14, 'sine', 0.09, 0);
    this.tone(659.25, 0.18, 'sine', 0.09, 0.08);
  }

  public playIncorrect() {
    this.tone(240, 0.16, 'triangle', 0.08, 0);
    this.tone(195, 0.22, 'triangle', 0.08, 0.1);
  }

  public playLevelComplete() {
    this.tone(523.25, 0.15, 'sine', 0.09, 0);
    this.tone(659.25, 0.15, 'sine', 0.09, 0.1);
    this.tone(783.99, 0.18, 'sine', 0.1, 0.2);
    this.tone(1046.5, 0.32, 'sine', 0.1, 0.32);
  }
}

export const soundEngine = new SoundEngine();
