export const AVATARS = ['🦊', '🐱', '🐼', '🐶', '🐸', '🐰', '🐯', '🦁', '🦄', '🐲'];
export const AI_AVATAR = '🤖';
export const MAX_PLAYERS = 5;

export const GITHUB_PROFILE = 'https://github.com/Shubham18024/integers-snakes-ladders';
export const TIMER_OPTIONS = [15, 30, 45, 60, 90];

export const THEMES = {
  jungle: {
    name: 'Jungle',
    bg: 'from-slate-900 via-green-950 to-slate-900',
    boardColors: { pos: 'from-orange-500/20 to-green-600/20', neg: 'from-cyan-600/20 to-blue-700/20' },
    obstacle: '🐍',
    boost: '🪜',
    obstacleName: 'Snake',
    boostName: 'Ladder',
  },
  space: {
    name: 'Cosmic',
    bg: 'from-indigo-950 via-purple-950 to-black',
    boardColors: { pos: 'from-pink-500/20 to-purple-600/20', neg: 'from-blue-600/20 to-indigo-700/20' },
    obstacle: '☄️',
    boost: '🚀',
    obstacleName: 'Black Hole',
    boostName: 'Rocket',
  },
  ocean: {
    name: 'Deep Sea',
    bg: 'from-cyan-950 via-blue-900 to-indigo-950',
    boardColors: { pos: 'from-teal-500/20 to-emerald-600/20', neg: 'from-blue-800/20 to-indigo-900/20' },
    obstacle: '🌪️',
    boost: '🫧',
    obstacleName: 'Whirlpool',
    boostName: 'Geyser',
  },
  desert: {
    name: 'Desert',
    bg: 'from-orange-950 via-amber-900 to-yellow-950',
    boardColors: { pos: 'from-yellow-500/20 to-orange-600/20', neg: 'from-red-600/20 to-rose-800/20' },
    obstacle: '🦂',
    boost: '🐪',
    obstacleName: 'Scorpion',
    boostName: 'Camel',
  },
  cyberpunk: {
    name: 'Cyberpunk',
    bg: 'from-gray-900 via-fuchsia-950 to-black',
    boardColors: { pos: 'from-fuchsia-500/20 to-pink-600/20', neg: 'from-cyan-400/20 to-blue-600/20' },
    obstacle: '👾',
    boost: '⚡',
    obstacleName: 'Glitch',
    boostName: 'Hyperjump',
  },
  arctic: {
    name: 'Arctic',
    bg: 'from-sky-900 via-blue-950 to-slate-900',
    boardColors: { pos: 'from-sky-300/20 to-blue-500/20', neg: 'from-slate-400/20 to-gray-600/20' },
    obstacle: '🧊',
    boost: '🛷',
    obstacleName: 'Crevasse',
    boostName: 'Sled',
  },
  volcano: {
    name: 'Volcano',
    bg: 'from-red-950 via-orange-950 to-black',
    boardColors: { pos: 'from-orange-500/30 to-red-600/30', neg: 'from-stone-600/30 to-stone-800/30' },
    obstacle: '🌋',
    boost: '🦅',
    obstacleName: 'Eruption',
    boostName: 'Eagle',
  },
  candy: {
    name: 'Candy Land',
    bg: 'from-fuchsia-200 via-pink-200 to-violet-300',
    boardColors: { pos: 'from-rose-400/35 to-fuchsia-500/35', neg: 'from-sky-300/35 to-indigo-400/35' },
    obstacle: '🍬',
    boost: '🍭',
    obstacleName: 'Sticky Taffy',
    boostName: 'Sugar Rush',
  },
  jurassic: {
    name: 'Jurassic',
    bg: 'from-lime-950 via-emerald-950 to-stone-950',
    boardColors: { pos: 'from-lime-400/25 to-emerald-600/25', neg: 'from-amber-700/25 to-stone-800/25' },
    obstacle: '🦖',
    boost: '🦕',
    obstacleName: 'Raptor',
    boostName: 'Herb Sprint',
  },
  sky: {
    name: 'Sky Kingdom',
    bg: 'from-sky-300 via-blue-400 to-indigo-500',
    boardColors: { pos: 'from-amber-300/35 to-orange-400/35', neg: 'from-cyan-200/35 to-blue-300/35' },
    obstacle: '🌩️',
    boost: '☁️',
    obstacleName: 'Storm',
    boostName: 'Cloud Lift',
  },
  neon: {
    name: 'Neon City',
    bg: 'from-slate-950 via-violet-950 to-black',
    boardColors: { pos: 'from-fuchsia-500/30 to-rose-500/30', neg: 'from-cyan-400/30 to-blue-500/30' },
    obstacle: '🕳️',
    boost: '💡',
    obstacleName: 'Dark Alley',
    boostName: 'Neon Boost',
  },
};

export const LADDERS = [
  { start: 5, end: 22 },
  { start: 18, end: 38 },
  { start: 28, end: 47 },
  { start: -5, end: -22 },
  { start: -18, end: -38 },
  { start: -28, end: -47 },
];

export const SNAKES = [
  { start: 45, end: 25 },
  { start: 32, end: 12 },
  { start: 15, end: -5 },
  { start: -45, end: -25 },
  { start: -32, end: -12 },
  { start: -15, end: 5 },
];

export const CELLS = Array.from({ length: 101 }, (_, i) => i - 50).sort((a, b) => a - b);

export function createDefaultPlayers(count = 2) {
  return Array.from({ length: Math.max(2, Math.min(MAX_PLAYERS, count)) }, (_, i) => ({
    name: `Player ${i + 1}`,
    avatar: AVATARS[i] || '🙂',
    pos: 0,
    hints: 3,
    stats: { snakes: 0, ladders: 0, turns: 0, ops: new Set(), totalHintsUsed: 0 },
  }));
}
