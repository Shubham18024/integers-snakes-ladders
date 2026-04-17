let audioCtx = null;
let masterGain = null;
let lastTickAt = 0;
let activeVoices = 0;
const MAX_VOICES = 18;

function getAudioGraph() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.8;
    masterGain.connect(audioCtx.destination);
  }
  return { ctx: audioCtx, gain: masterGain };
}

function playTone(freq, type, duration, vol = 0.1) {
  try {
    const { ctx, gain: master } = getAudioGraph();
    if (ctx.state === 'suspended') ctx.resume();
    if (activeVoices >= MAX_VOICES) return;
    activeVoices += 1;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + duration);
    osc.onended = () => {
      activeVoices = Math.max(0, activeVoices - 1);
    };
  } catch {
    /* ignore */
  }
}

export const playTick = () => {
  const now = performance.now();
  if (now - lastTickAt < 60) return;
  lastTickAt = now;
  playTone(800, 'square', 0.05, 0.02);
};
export const playPop = () => playTone(1200, 'sine', 0.1, 0.1);
export const playBloop = () => {
  playTone(400, 'sine', 0.1, 0.1);
  setTimeout(() => playTone(800, 'sine', 0.2, 0.1), 100);
};
export const playClick = () => playTone(1000, 'sine', 0.05, 0.05);
export const playCamera = () => {
  playTone(1500, 'square', 0.1, 0.1);
  setTimeout(() => playTone(800, 'sawtooth', 0.2, 0.1), 50);
};
export const playStart = () => {
  playTone(400, 'sine', 0.1, 0.1);
  setTimeout(() => playTone(600, 'sine', 0.2, 0.1), 100);
};
export const playDiceResult = () => {
  playTone(800, 'triangle', 0.1, 0.1);
  setTimeout(() => playTone(1200, 'triangle', 0.2, 0.1), 100);
};

export function playHiss(themeId) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = themeId === 'candy' ? 600 : themeId === 'jurassic' ? 450 : 800;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
    const low = themeId === 'jurassic' ? 80 : themeId === 'candy' ? 140 : 100;
    playTone(low, 'sawtooth', 1.0, 0.4);
  } catch {
    /* ignore */
  }
}

export function playClimb(themeId) {
  let time = 0;
  const scale =
    themeId === 'candy'
      ? [520, 640, 760, 880, 980, 1100]
      : themeId === 'jurassic'
        ? [220, 260, 300, 340, 380, 420]
        : [300, 400, 500, 600, 700, 800];
  scale.forEach((freq) => {
    setTimeout(() => playTone(freq, 'sine', 0.15, 0.1), time);
    time += 100;
  });
}

export const playWin = () => {
  [400, 500, 600, 800, 600, 800, 1000].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 'triangle', 0.4, 0.2), i * 150);
  });
};

export const playBirdChirp = () => {
  const chirp = () => {
    try {
      const { ctx, gain: master } = getAudioGraph();
      if (ctx.state === 'suspended') ctx.resume();
      if (activeVoices >= MAX_VOICES) return;
      activeVoices += 1;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.1);
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.connect(g);
      g.connect(master);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
      osc.onended = () => {
        activeVoices = Math.max(0, activeVoices - 1);
      };
    } catch {
      /* ignore */
    }
  };
  chirp();
  setTimeout(chirp, 150);
};

export function initAudio() {
  try {
    const { ctx } = getAudioGraph();
    ctx.resume();
  } catch {
    /* ignore */
  }
}
