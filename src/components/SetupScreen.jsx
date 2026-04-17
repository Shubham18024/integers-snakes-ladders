import { useState, useEffect } from 'react';
import { Brain, Monitor, Star, User, Users, X, Github, Heart, ChevronLeft, ChevronRight, LayoutGrid, List, Info, ArrowRight, Check } from 'lucide-react';
import { AVATARS, GITHUB_REPO, GITHUB_USER_PROFILE, THEMES, TIMER_OPTIONS } from '../constants/gameConfig';
import { playClick, playBirdChirp } from '../utils/sfx';
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
  const [showPopup, setShowPopup] = useState(false);
  const [isPopupExpanded, setIsPopupExpanded] = useState(false);
  const [showAllThemes, setShowAllThemes] = useState(false);
  const [showGuideBubble, setShowGuideBubble] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  useEffect(() => {
    // Bird popup timer
    const timer = setTimeout(() => {
      setShowPopup(true);
      playBirdChirp();
    }, 1500);

    // Guide popup timer (Trigger ONLY if they haven't seen it)
    const guideTimer = setTimeout(() => {
      try {
        if (!sessionStorage.getItem('hasSeenSetupGuide')) {
          setShowGuideBubble(true);
        }
      } catch (e) {
        // Fallback for secure iframes
        setShowGuideBubble(true);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(guideTimer);
    };
  }, []);

  const highlightClass = (step) => tutorialStep === step ? 'relative z-[110] ring-4 ring-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.6)] bg-slate-800 scale-[1.02] transition-all my-6' : 'relative';

  const GuideTooltip = ({ step, icon, title, text, pos = 'bottom' }) => {
    if (tutorialStep !== step) return null;
    return (
      <div className={`absolute left-1/2 -translate-x-1/2 z-[120] w-[90vw] max-w-[320px] rounded-2xl border-2 border-yellow-400/80 bg-slate-900 p-4 text-center text-white shadow-2xl animate-in fade-in duration-300 ${pos === 'bottom' ? 'top-full mt-4 slide-in-from-top-2' : 'bottom-full mb-4 slide-in-from-bottom-2'}`}>
         <div className={`absolute left-1/2 -translate-x-1/2 border-x-[10px] border-x-transparent ${pos === 'bottom' ? '-top-[10px] border-b-[10px] border-b-yellow-400' : '-bottom-[10px] border-t-[10px] border-t-yellow-400'}`}></div>
         <div className="mb-2 text-4xl drop-shadow-md">{icon}</div>
         <h3 className="mb-1 text-lg font-black text-yellow-300">{title}</h3>
         <p className="mb-4 text-sm font-medium leading-relaxed text-slate-200">{text}</p>
         
         <div className="flex items-center justify-between">
             <div className="flex gap-1.5 opacity-80">
               {[1,2,3,4,5,6].map(dot => (
                 <div key={dot} className={`h-1.5 rounded-full transition-all duration-300 ${tutorialStep === dot ? 'bg-yellow-400 w-5' : 'bg-slate-700 w-1.5'}`} />
               ))}
             </div>
             
             <button 
               onClick={(e) => {
                 e.stopPropagation();
                 playClick();
                 if (tutorialStep < 6) {
                   setTutorialStep(tutorialStep + 1);
                 } else {
                   setTutorialStep(0);
                   setShowGuideBubble(false);
                   try { sessionStorage.setItem('hasSeenSetupGuide', 'true'); } catch(e){}
                 }
               }}
               className="flex items-center gap-1.5 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-bold text-slate-900 shadow hover:bg-yellow-400 active:scale-95 transition-all"
             >
               {tutorialStep < 6 ? <>Next <ArrowRight size={16} /></> : <>Got It! <Check size={16} /></>}
             </button>
         </div>
      </div>
    );
  };

  return (
    <div className={`flex min-h-screen flex-col bg-gradient-to-br ${t.bg} transition-colors duration-1000`}>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="mb-2 bg-gradient-to-r from-pink-400 via-yellow-400 to-indigo-400 bg-clip-text text-4xl font-black text-transparent sm:text-5xl">Integers</h1>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-200 sm:text-base">Play • Learn • Share</p>
          </div>

          <div className={`mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-black/25 p-2 transition-all ${highlightClass(1)}`}>
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
            <GuideTooltip step={1} icon="🕹️" title="Start Here" text="Select Learn Integers for instructions or Play Game to start the adventure!" />
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
              <a className="star-cta mb-6 block w-full rounded-2xl bg-yellow-300/95 px-4 py-3 text-center text-sm font-black text-slate-900 hover:bg-yellow-200" href={GITHUB_REPO} target="_blank" rel="noreferrer">⭐ Star this project on GitHub</a>

              <div className={`mb-5 rounded-2xl border border-white/10 bg-black/25 p-3 transition-all ${highlightClass(2)}`}>
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
                <GuideTooltip step={2} icon="👥" title="Who is Playing?" text="Play locally with up to 5 friends, or battle our smart AI bot!" />
              </div>

              <div className={`mb-5 rounded-2xl border border-white/10 bg-black/25 p-3 transition-all ${highlightClass(3)}`}>
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
                <GuideTooltip step={3} icon="🧠" title="Pick Your Challenge" text="Play on Easy, Hard, or race against the clock in Timer Mode." />
              </div>

              <div className={`mb-5 transition-all rounded-xl ${highlightClass(4)}`}>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-300">Choose Theme</p>
                  <button 
                    type="button" 
                    onClick={() => { playClick(); setShowAllThemes(!showAllThemes); }}
                    className="flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-300 transition-colors hover:bg-indigo-500/20 active:scale-95"
                  >
                    {showAllThemes ? <List size={14} /> : <LayoutGrid size={14} />}
                    {showAllThemes ? 'Compact View' : 'See All'}
                  </button>
                </div>
                
                {showAllThemes ? (
                  <div className="flex flex-wrap gap-2 animate-in fade-in zoom-in-95 duration-300">
                    {Object.entries(THEMES).map(([key, theme]) => (
                      <button 
                        key={key} 
                        type="button" 
                        onClick={() => { playClick(); setActiveTheme(key); setShowAllThemes(false); }} 
                        className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition-all ${
                          activeTheme === key 
                          ? 'border-indigo-400 bg-indigo-500/60 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                          : 'border-white/10 bg-black/40 hover:bg-white/10 hover:border-white/20 active:scale-95'
                        }`}
                      >
                        {theme.obstacle} {theme.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-between rounded-xl border-2 border-indigo-500/20 bg-black/40 p-1 shadow-inner sm:p-2 animate-in fade-in zoom-in-95 duration-300">
                    <button type="button" onClick={() => { 
                      playClick(); 
                      const keys = Object.keys(THEMES);
                      const idx = keys.indexOf(activeTheme);
                      const nextIdx = idx === 0 ? keys.length - 1 : idx - 1;
                      setActiveTheme(keys[nextIdx]);
                    }} className="rounded-lg p-2 sm:p-3 hover:bg-white/10 text-indigo-300 active:scale-95 transition-all">
                      <ChevronLeft size={20} />
                    </button>
                    
                    <div className="flex flex-1 items-center justify-center gap-2 px-2 text-center text-lg sm:text-xl font-black text-indigo-50">
                       <span className="text-2xl drop-shadow-md">{t.obstacle}</span>
                       <span>{t.name}</span>
                    </div>

                    <button type="button" onClick={() => { 
                      playClick(); 
                      const keys = Object.keys(THEMES);
                      const idx = keys.indexOf(activeTheme);
                      const nextIdx = (idx + 1) % keys.length;
                      setActiveTheme(keys[nextIdx]);
                    }} className="rounded-lg p-2 sm:p-3 hover:bg-white/10 text-indigo-300 active:scale-95 transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
                <GuideTooltip step={4} icon="🌌" title="Explore the Worlds" text="Click 'See All' to explore 15 beautiful themes that completely change the board!" />
              </div>

              <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-all rounded-2xl p-1 ${highlightClass(5)}`}>
                {players.slice(0, isVsAI ? 1 : playerCount).map((player, pIdx) => (
                  <div key={pIdx} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-bold text-yellow-300"><User size={16} /> Player {pIdx + 1}</h3>
                    <input type="text" value={player.name} onChange={(e) => { const next = [...players]; next[pIdx] = { ...next[pIdx], name: e.target.value }; setPlayers(next); }} className={`mb-3 w-full rounded-lg border border-white/20 bg-white/5 p-2 text-sm text-white ${tutorialStep === 5 ? 'ring-2 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)] transition-all' : ''}`} />
                    <div className="flex flex-wrap gap-1">
                      {AVATARS.map((emoji, eIdx) => (
                        <button 
                         key={emoji} 
                         type="button" 
                         onClick={() => { playClick(); const next = [...players]; next[pIdx] = { ...next[pIdx], avatar: emoji }; setPlayers(next); }} 
                         className={`rounded-lg p-1.5 text-lg transition-all ${players[pIdx]?.avatar === emoji ? 'bg-indigo-500/40' : 'bg-white/5 hover:bg-white/20'} ${tutorialStep === 5 ? `animate-bounce shadow-lg ring-1 ring-yellow-400 bg-slate-800 delay-${eIdx*100}` : ''}`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <GuideTooltip step={5} icon="✨" title="Customize Character" text="Type your unique name and tap your favorite Emoji!" pos="top" />
              </div>

              <div className={`mt-6 transition-all ${highlightClass(6)}`}>
                <button type="button" onClick={startGame} className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-4 text-lg font-black tracking-wider text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:from-indigo-400 hover:to-purple-500">
                  START EXPLORING
                </button>
                <GuideTooltip step={6} icon="🚀" title="Off You Go!" text="Click this button right now to play!" pos="top" />
              </div>
            </>
          )}
        </div>
      </div>

      {showPopup && !isPopupExpanded && (
        <button 
          type="button"
          onClick={() => { playClick(); setIsPopupExpanded(true); }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] flex h-14 w-14 sm:h-16 sm:w-16 animate-bounce items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-[0_10px_30px_rgba(99,102,241,0.6)] hover:scale-105 active:scale-95 transition-transform animate-in zoom-in duration-500"
        >
          <span className="text-2xl sm:text-3xl">🐦</span>
          <span className="absolute top-0 right-0 flex h-4 w-4 sm:h-5 sm:w-5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex h-full w-full rounded-full bg-pink-500 border-2 border-indigo-600"></span>
          </span>
        </button>
      )}

      {showPopup && isPopupExpanded && (
        <div className={`fixed bottom-4 left-1/2 w-[92vw] max-w-[360px] -translate-x-1/2 sm:bottom-8 sm:left-auto sm:right-8 sm:w-80 sm:translate-x-0 z-[90] rounded-2xl sm:rounded-3xl border-2 border-indigo-400/80 bg-slate-900/95 p-3 sm:p-5 text-white shadow-[0_20px_50px_rgba(99,102,241,0.5)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-right-8 duration-500`}>
          <button 
            type="button" 
            onClick={() => { playClick(); setShowPopup(false); }}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full p-1 text-slate-400 shadow-sm transition-colors hover:bg-white/10 hover:text-white active:scale-95"
          >
            <X size={16} />
          </button>
          
          <div className="mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-indigo-400/50 sm:border-2 bg-indigo-500/20 shadow-lg backdrop-blur-md">
              <span className="text-sm sm:text-2xl">🐦</span>
            </div>
            <h3 className="text-base sm:text-xl font-black bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent flex items-center gap-1.5 sm:gap-2">
              Hi! 👋
            </h3>
          </div>
          
          <p className="mb-3 sm:mb-5 text-xs sm:text-sm font-medium leading-tight sm:leading-relaxed text-slate-200">
            Having a blast with integers? 🎮 <br className="hidden sm:block"/> Let's connect! Hit the links to <strong className="text-pink-300">Follow me on GitHub</strong> and drop a ⭐ on this repo!
          </p>

          <div className="flex flex-col gap-1.5 sm:gap-2">
            <a 
              href={GITHUB_USER_PROFILE}
              target="_blank" 
              rel="noreferrer"
              onClick={() => { playClick(); setShowPopup(false); }}
              className="flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-indigo-600 py-2 sm:py-2.5 text-xs sm:text-sm font-bold shadow hover:bg-indigo-500 active:scale-95"
            >
              <Heart size={14} className="text-pink-300" /> Follow Shubham!
            </a>
            <a 
              href={GITHUB_REPO}
              target="_blank" 
              rel="noreferrer"
              onClick={() => { playClick(); setShowPopup(false); }}
              className="flex w-full items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border border-yellow-500/50 bg-yellow-500/20 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-yellow-300 shadow hover:bg-yellow-500/30 active:scale-95"
            >
              <Star size={14} /> Star Project
            </a>
          </div>
        </div>
      )}

      {/* Guide Notification Bubble */}
      {showGuideBubble && tutorialStep === 0 && (
        <button 
          type="button"
          onClick={() => { playClick(); setTab('play'); setTutorialStep(1); }}
          className="fixed top-6 right-6 sm:top-8 sm:right-8 z-[90] flex h-12 w-12 sm:h-14 sm:w-14 animate-bounce items-center justify-center rounded-full bg-blue-500 shadow-[0_10px_25px_rgba(59,130,246,0.6)] hover:bg-blue-400 active:scale-95 transition-all animate-in zoom-in duration-500"
        >
          <Info size={24} className="text-white drop-shadow" />
          <span className="absolute top-0 right-0 flex h-3 w-3 sm:h-4 sm:w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex h-full w-full rounded-full bg-yellow-500 border-2 border-blue-500"></span>
          </span>
        </button>
      )}

      {/* No transparent dimmer overlay, prevents z-index click blocking */}

      <Footer />
    </div>
  );
}
