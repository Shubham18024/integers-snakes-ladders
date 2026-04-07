import { useState } from 'react';
import { Brain, Monitor, Star, User, Users } from 'lucide-react';
import { AVATARS, GITHUB_PROFILE, THEMES, TIMER_OPTIONS } from '../constants/gameConfig';
import { playClick } from '../utils/sfx';
import Footer from './Footer';

export default function SetupScreen({
  activeTheme,
  setActiveTheme,
  isVsAI,
  setIsVsAI,
  playerCount,
  setPlayerCount,
  difficulty,
  setDifficulty,
  timerSeconds,
  setTimerSeconds,
  players,
  setPlayers,
  startGame,
}) {
  const t = THEMES[activeTheme];
  const [tab, setTab] = useState('play');

  return (
    <div className={`flex min-h-screen flex-col bg-gradient-to-br ${t.bg} transition-colors duration-1000`}>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 bg-gradient-to-r from-pink-400 via-yellow-400 to-indigo-400 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">Integers</h1>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-200 sm:text-base">Play • Learn • Share</p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-black/25 p-2">
            <button
              type="button"
              onClick={() => setTab('play')}
              className={`rounded-xl px-4 py-2 text-sm font-bold ${tab === 'play' ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-white/10'}`}
            >
              Play Game
            </button>
            <button
              type="button"
              onClick={() => setTab('learn')}
              className={`rounded-xl px-4 py-2 text-sm font-bold ${tab === 'learn' ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-white/10'}`}
            >
              Learn Integers
            </button>
          </div>

          {tab === 'learn' ? (
            <div className="rounded-2xl border border-white/15 bg-black/25 p-5 text-sm leading-7 text-slate-100 sm:text-base">
              <h2 className="mb-3 text-2xl font-black text-yellow-300">🌟 Integers Made Fun!</h2>
              <h3 className="mt-2 font-black text-cyan-200">🔢 Types of Numbers</h3>
              <p><strong>Natural Numbers</strong> → 1, 2, 3, 4...</p>
              <p><strong>Whole Numbers</strong> → 0, 1, 2, 3...</p>
              <p><strong>Integers</strong> → ... -3, -2, -1, 0, +1, +2, +3 ...</p>
              <h3 className="mt-4 font-black text-cyan-200">📏 Number Line (Very Important!)</h3>
              <p>👉 Think of this like a road:</p>
              <div className="relative mt-3 overflow-hidden rounded-xl border border-cyan-300/40 bg-slate-900/70 p-4">
                <div className="h-1 w-full rounded bg-cyan-300/70" />
                <div className="mt-3 flex justify-between text-xs font-bold sm:text-sm">
                  <span>-5</span><span>-4</span><span>-3</span><span>-2</span><span>-1</span><span>0</span><span>+1</span><span>+2</span><span>+3</span><span>+4</span><span>+5</span>
                </div>
                <div className="numberline-dot">🚗</div>
              </div>
              <p className="mt-2">Move right ➡️ → numbers get bigger</p>
              <p>Move left ⬅️ → numbers get smaller</p>
              <h3 className="mt-4 font-black text-cyan-200">➕➖ Easy Rules</h3>
              <p>Add a positive → move right ➡️</p>
              <p>Add a negative → move left ⬅️</p>
              <p>Subtract a positive → move left ⬅️</p>
              <p>Subtract a negative → move right ➡️ (double negative = plus!)</p>
              <h3 className="mt-4 font-black text-yellow-300">🎮 Ready to Play?</h3>
              <p>👉 Now go to Play Game 🎲 and practice moving on the number line with dice!</p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-center text-sm font-semibold text-yellow-100">🎉 Many kids have already played this game, now it&apos;s your turn!</p>
              <a className="star-cta mb-6 block w-full rounded-2xl bg-yellow-300/95 px-4 py-3 text-center text-sm font-black text-slate-900 hover:bg-yellow-200" href={GITHUB_PROFILE} target="_blank" rel="noreferrer">⭐ Star this project on GitHub</a>

              <div className="mb-5 rounded-2xl border border-white/10 bg-black/25 p-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-300">Game Mode</p>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => { playClick(); setIsVsAI(false); }} className={`rounded-xl py-2 text-sm font-bold ${!isVsAI ? 'bg-indigo-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}>
                    <Users className="mr-1 inline" size={16} /> Multiplayer
                  </button>
                  <button type="button" onClick={() => { playClick(); setIsVsAI(true); }} className={`rounded-xl py-2 text-sm font-bold ${isVsAI ? 'bg-indigo-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}>
                    <Monitor className="mr-1 inline" size={16} /> Vs AI
                  </button>
                </div>
                {!isVsAI && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-300">Players (2 to 5)</p>
                    <div className="flex flex-wrap gap-2">
                      {[2, 3, 4, 5].map((n) => (
                        <button key={n} type="button" onClick={() => { playClick(); setPlayerCount(n); }} className={`rounded-lg px-3 py-1.5 text-xs font-bold ${playerCount === n ? 'bg-indigo-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}>{n}</button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-5 rounded-2xl border border-white/10 bg-black/25 p-3">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-300">Difficulty</p>
                <div className="grid grid-cols-3 gap-2">
                  <button type="button" onClick={() => { playClick(); setDifficulty('easy'); }} className={`rounded-xl py-2 text-sm font-bold ${difficulty === 'easy' ? 'bg-green-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}><Star className="mr-1 inline" size={16} />Easy</button>
                  <button type="button" onClick={() => { playClick(); setDifficulty('hard'); }} className={`rounded-xl py-2 text-sm font-bold ${difficulty === 'hard' ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}><Brain className="mr-1 inline" size={16} />Hard</button>
                  <button type="button" onClick={() => { playClick(); setDifficulty('timer'); }} className={`rounded-xl py-2 text-sm font-bold ${difficulty === 'timer' ? 'bg-cyan-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}>⏱️ Timer</button>
                </div>
                {difficulty === 'timer' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TIMER_OPTIONS.map((seconds) => (
                      <button key={seconds} type="button" onClick={() => { playClick(); setTimerSeconds(seconds); }} className={`rounded-lg px-3 py-1.5 text-xs font-bold ${timerSeconds === seconds ? 'bg-cyan-500 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}>{seconds}s</button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-300">Choose Theme</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(THEMES).map(([key, theme]) => (
                    <button key={key} type="button" onClick={() => { playClick(); setActiveTheme(key); }} className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold ${activeTheme === key ? 'border-indigo-400 bg-indigo-500/50' : 'border-white/15 bg-white/10 hover:bg-white/20'}`}>
                      {theme.obstacle} {theme.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {players.slice(0, isVsAI ? 1 : playerCount).map((player, pIdx) => (
                  <div key={pIdx} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-bold text-yellow-300"><User size={16} /> Player {pIdx + 1}</h3>
                    <input type="text" value={player.name} onChange={(e) => { const next = [...players]; next[pIdx] = { ...next[pIdx], name: e.target.value }; setPlayers(next); }} className="mb-3 w-full rounded-lg border border-white/20 bg-white/5 p-2 text-sm text-white" />
                    <div className="flex flex-wrap gap-1">
                      {AVATARS.map((emoji) => (
                        <button key={emoji} type="button" onClick={() => { playClick(); const next = [...players]; next[pIdx] = { ...next[pIdx], avatar: emoji }; setPlayers(next); }} className={`rounded-lg p-1.5 text-lg ${players[pIdx]?.avatar === emoji ? 'bg-indigo-500/40' : 'bg-white/5 hover:bg-white/20'}`}>
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button type="button" onClick={startGame} className="mt-6 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 text-lg font-black tracking-wider text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:from-indigo-400 hover:to-purple-500">
                START EXPLORING
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
