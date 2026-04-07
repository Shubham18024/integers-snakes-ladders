import { useMemo } from 'react';
import {
  AlertTriangle,
  Brain,
  Info,
  Lightbulb,
  Medal,
  RefreshCcw,
  Star,
  Trophy,
  X,
} from 'lucide-react';
import Board from './components/Board';
import Footer from './components/Footer';
import SetupScreen from './components/SetupScreen';
import ThemeDecorations from './components/ThemeDecorations';
import { useIntegersGame } from './hooks/useIntegersGame';
import { playPop } from './utils/sfx';

export default function App() {
  const g = useIntegersGame();
  const winnerText = useMemo(() => `${g.players[g.turn]?.name || 'A player'} won Integers: Snakes & Ladders! Come play with me!`, [g.players, g.turn]);
  const shareUrl = import.meta.env.VITE_PUBLIC_APP_URL || 'https://anchorapp.me/integers-snakes-ladders/';

  const shareGame = async () => {
    playPop();
    g.triggerEmote(g.turn, '🎉');
    g.triggerEmote(g.turn, '🥳');
    g.triggerEmote(g.turn, '✨');
    g.addToLog('🎉 Awesome! Share this game with everyone!', 'win');
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Integers: Snakes & Ladders', text: winnerText, url: shareUrl });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(`${winnerText}\n${shareUrl}`);
      g.flashCamera();
      g.addToLog('📢 Share text copied! Paste and send it to friends.', 'win');
    } catch {
      g.addToLog(`📢 Share this game: ${shareUrl}`, 'system');
    }
  };

  if (g.gameState === 'setup') {
    return (
      <SetupScreen
        activeTheme={g.activeTheme}
        setActiveTheme={g.setActiveTheme}
        isVsAI={g.isVsAI}
        setIsVsAI={g.setIsVsAI}
        playerCount={g.playerCount}
        setPlayerCount={g.setPlayerCount}
        difficulty={g.difficulty}
        setDifficulty={g.setDifficulty}
        timerSeconds={g.timerSeconds}
        setTimerSeconds={g.setTimerSeconds}
        players={g.players}
        setPlayers={g.setPlayers}
        startGame={g.startGame}
      />
    );
  }

  return (
    <div className={`flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br ${g.t.bg} font-sans text-slate-100 transition-colors duration-1000`}>
      <div className={`fixed inset-0 z-[100] bg-white transition-opacity duration-500 ${g.cameraFlash ? 'opacity-100' : 'pointer-events-none opacity-0'}`} />

      {g.emotes.map((e) => (
        <div key={e.id} className="emote-anim" style={{ left: e.left, top: e.top }}>
          {e.emoji}
        </div>
      ))}

      <ThemeDecorations activeTheme={g.activeTheme} />

      {g.confettiPieces.map((c) => (
        <div
          key={c.id}
          className="confetti h-3 w-3 md:h-4 md:w-4"
          style={{ left: c.left, backgroundColor: c.color, animationDelay: c.delay, animationDuration: c.duration }}
        />
      ))}

      {g.showRules && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="animate-in zoom-in w-full max-w-lg rounded-3xl border border-white/20 bg-slate-900/95 p-6 text-white duration-300 sm:p-8">
            <div className="mb-4 flex justify-between border-b border-white/10 pb-4">
              <h2 className="flex items-center gap-3 text-2xl font-black text-indigo-400 sm:text-3xl">How to play</h2>
              <button type="button" onClick={() => g.setShowRules(false)} className="rounded-full p-2 hover:bg-white/10">
                <X />
              </button>
            </div>
            <ul className="space-y-4 text-base text-slate-200 sm:text-lg">
              <li className="flex gap-2">
                <span>🎯</span>
                <span>
                  <strong>Start at 0.</strong> Land exactly on <strong className="text-orange-400">+50</strong> or{' '}
                  <strong className="text-cyan-400">-50</strong>.
                </span>
              </li>
              <li className="flex gap-2">
                <span>🎲</span>
                <span>
                  <strong>Roll and combine:</strong> you roll + and − dice, then pick the right add/subtract move.
                </span>
              </li>
              <li className="flex gap-2">
                <span>✨</span>
                <span>
                  <span className="text-green-400">Boosts ({g.t.boost})</span> help you.{' '}
                  <span className="text-red-400">Obstacles ({g.t.obstacle})</span> pull you back toward 0.
                </span>
              </li>
              {g.difficulty === 'easy' && (
                <li className="flex gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/20 p-3">
                  <span>⏱️</span>
                  <span>
                    <strong>Quick:</strong> 15 seconds to pick. If time runs out, a random move is chosen.
                  </span>
                </li>
              )}
              {g.difficulty === 'hard' && (
                <li className="flex gap-2 rounded-xl border border-pink-500/30 bg-pink-500/20 p-3">
                  <span>⏱️</span>
                  <span>
                    <strong>Hard:</strong> 30 seconds to type all three answers. Green means correct. Time out loses the turn.
                  </span>
                </li>
              )}
              {g.difficulty === 'timer' && (
                <li className="flex gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/20 p-3">
                  <span>⏱️</span>
                  <span>
                    <strong>Timer mode:</strong> solve all three. You get {g.timerSeconds}s per turn. Time out loses the turn.
                  </span>
                </li>
              )}
              <li className="flex gap-2">
                <span>💡</span>
                <span>
                  <strong>Tip:</strong> tap your avatar in the top bar to throw emotes.
                </span>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => g.setShowRules(false)}
              className="mt-8 w-full rounded-xl bg-indigo-600 py-4 text-xl font-bold hover:bg-indigo-500 active:scale-95"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {g.showQuitConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="animate-in zoom-in w-full max-w-sm rounded-3xl border border-white/20 bg-slate-900/95 p-8 text-center text-white shadow-2xl duration-300">
            <AlertTriangle size={48} className="mx-auto mb-4 animate-pulse text-yellow-400" />
            <h2 className="mb-2 text-2xl font-black">Quit game?</h2>
            <p className="mb-8 text-sm text-slate-300">You will return to setup and lose this match.</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  g.playClick();
                  g.setShowQuitConfirm(false);
                }}
                className="flex-1 rounded-xl bg-slate-700 py-3 font-bold hover:bg-slate-600 active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  g.playClick();
                  g.setShowQuitConfirm(false);
                  g.setGameState('setup');
                }}
                className="flex-1 rounded-xl bg-red-600 py-3 font-bold hover:bg-red-500 active:scale-95"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 border-b border-white/10 bg-black/20 shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 p-3 sm:p-4">
          <h1 className="bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-xl font-black tracking-wide text-transparent sm:text-2xl">
            {g.t.name} Math
          </h1>

          <div className="flex items-center gap-2 text-xs font-bold sm:gap-4 sm:text-sm">
            {g.players.map((player, pIdx) => {
              const active = g.turn === pIdx;
              const ring = active ? 'border-indigo-400/70 bg-indigo-500/20 text-indigo-200 shadow-[0_0_15px_currentColor]' : 'bg-black/20 text-slate-400';
              return (
                <div key={pIdx} className="relative">
                  <button
                    type="button"
                    onClick={() => g.triggerEmote(pIdx)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-all hover:scale-105 active:scale-95 sm:gap-2 sm:px-4 ${ring} border`}
                  >
                    <span className="text-sm sm:text-lg">{player.avatar}</span>
                    <span className="hidden sm:inline">{player.name}:</span> {player.pos}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                g.playClick();
                g.setShowRules(true);
              }}
              className="rounded-xl bg-white/5 p-2 transition-colors hover:bg-white/10 sm:p-2.5"
            >
              <Info size={20} />
            </button>
            <button
              type="button"
              onClick={() => {
                g.playClick();
                g.setShowQuitConfirm(true);
              }}
              className="rounded-xl bg-white/5 p-2 text-pink-300 transition-colors hover:bg-white/10 sm:p-2.5"
            >
              <RefreshCcw size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-2 flex w-full max-w-7xl flex-1 flex-col items-center gap-4 p-2 sm:mt-4 sm:gap-8 sm:p-4 lg:flex-row lg:items-start">
        <Board
          activeTheme={g.activeTheme}
          theme={g.t}
          boardEvent={g.boardEvent}
          animating={g.animating}
          turn={g.turn}
          players={g.players}
        />

        <div className="mx-auto flex w-full shrink-0 flex-col gap-4 sm:gap-6 lg:w-[400px] xl:w-[450px]">
          {g.gameState === 'won' && (
            <div className="animate-in zoom-in rounded-3xl border border-white/20 bg-gradient-to-br from-indigo-600 to-pink-600 p-8 text-center text-white shadow-2xl backdrop-blur-xl duration-700">
              <Trophy className="mx-auto mb-4 animate-bounce text-yellow-300" size={64} />
              <h2 className="mb-2 text-5xl font-black drop-shadow-lg">Winner</h2>
              <h3 className="mb-6 text-2xl font-bold text-yellow-200">
                {g.players[g.turn].name} won the {g.t.name} board
              </h3>

              <div className="mb-6 rounded-2xl bg-black/20 p-4 text-left">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase text-slate-300">
                  <Medal size={16} />
                  Badges
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {g.getBadges(g.players[g.turn]).map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-white/10 p-2 text-sm font-bold shadow-sm">
                      <span className="text-xl">{badge.icon}</span> {badge.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    g.playClick();
                    g.setShowQuitConfirm(true);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-4 text-lg font-black text-indigo-900 shadow-xl transition-transform hover:scale-105"
                >
                  <RefreshCcw size={20} />
                  Play again
                </button>
                <button type="button" onClick={shareGame} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-pink-400 bg-pink-500 py-4 text-lg font-black text-white shadow-xl transition-transform hover:scale-105">
                  📢 Share this game
                </button>
              </div>
              <p className="mt-4 text-xs text-white/80">Tell friends to play and learn integers together.</p>
            </div>
          )}

          {g.gameState === 'playing' && (
            <div className="relative flex min-h-[350px] flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl transition-all duration-500 sm:p-6">
              <div className={`absolute left-0 top-0 h-1.5 w-full ${g.turn === 0 ? 'bg-green-500 shadow-[0_0_30px_#22c55e]' : 'bg-yellow-400 shadow-[0_0_30px_#facc15]'}`} />

              <h2 className="mb-4 flex items-center justify-between text-xl font-bold sm:mb-6 sm:text-2xl">
                <span className="flex items-center gap-3">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                    {g.timerActive && !(g.isVsAI && g.turn === 1) && (() => {
                      const maxTime = g.difficulty === 'easy' ? 15 : g.difficulty === 'hard' ? 30 : g.timerSeconds;
                      const progress = (g.timeLeft / maxTime) * 100;
                      const r = 26;
                      const c = 2 * Math.PI * r;
                      const offset = c - (progress / 100) * c;
                      const isWarning = g.timeLeft <= 5;
                      return (
                        <svg className="pointer-events-none absolute inset-0 h-full w-full -rotate-90 scale-125 sm:scale-110">
                          <circle cx="50%" cy="50%" r={r} stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="none" />
                          <circle
                            cx="50%"
                            cy="50%"
                            r={r}
                            stroke={isWarning ? '#ef4444' : '#22c55e'}
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={c}
                            strokeDashoffset={offset}
                            className={`transition-all duration-1000 linear ${isWarning ? 'animate-pulse drop-shadow-[0_0_8px_#ef4444]' : ''}`}
                          />
                        </svg>
                      );
                    })()}
                    <span className="relative z-10 text-3xl drop-shadow-md sm:text-4xl">{g.players[g.turn].avatar}</span>
                  </span>
                  <span className="text-white">{g.players[g.turn].name}&apos;s turn</span>
                </span>
                {g.difficulty === 'hard' && (
                  <span className="flex items-center gap-1 rounded-full border border-red-500/50 bg-red-500/20 px-3 py-1 text-xs text-red-300">
                    <Brain size={14} />
                    Hard
                  </span>
                )}
                {g.difficulty === 'timer' && (
                  <span className="rounded-full border border-cyan-500/50 bg-cyan-500/20 px-3 py-1 text-xs text-cyan-200">
                    Timer {g.timerSeconds}s
                  </span>
                )}
              </h2>

              {!g.visualDice && !g.dice && !g.availableMoves.length && (
                <button
                  type="button"
                  disabled={g.isComputerTurn}
                  onClick={g.handleRoll}
                  className={`flex w-full items-center justify-center gap-3 rounded-2xl border py-6 text-2xl font-black tracking-wide shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all ${
                    g.isComputerTurn
                      ? 'border-white/10 bg-slate-700 opacity-50'
                      : 'border-indigo-400 bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-95'
                  } text-white`}
                >
                  <RefreshCcw size={28} className={g.isComputerTurn ? 'animate-spin' : ''} />
                  {g.isComputerTurn ? 'AI rolling…' : 'ROLL DICE'}
                </button>
              )}

              {(g.visualDice || g.dice) && (
                <div className="mb-4 flex justify-center gap-8 rounded-3xl border border-white/10 bg-black/30 p-4 sm:mb-6 sm:p-6">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-500 to-red-600 text-3xl font-black text-white shadow-lg sm:h-20 sm:w-20 sm:text-4xl ${g.visualDice && !g.dice ? 'dice-rolling' : ''}`}
                    >
                      +{(g.dice || g.visualDice).positive}
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-cyan-300 bg-gradient-to-br from-cyan-500 to-blue-700 text-3xl font-black text-white shadow-lg sm:h-20 sm:w-20 sm:text-4xl ${g.visualDice && !g.dice ? 'dice-rolling' : ''}`}
                      style={{ animationDirection: 'reverse' }}
                    >
                      {(g.dice || g.visualDice).negative}
                    </div>
                  </div>
                </div>
              )}

              {g.availableMoves.length > 0 && (() => {
                const allCorrect = g.availableMoves.every(
                  (m) => g.userAnswers[m.id] !== '' && parseInt(g.userAnswers[m.id], 10) === m.result
                );
                const isRevealed = (g.difficulty === 'easy') || g.hintsUsed || g.isComputerTurn || allCorrect;

                return (
                  <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3">
                    {(g.difficulty === 'hard' || g.difficulty === 'timer') && !isRevealed && !g.isComputerTurn ? (
                      <div className="mb-2 flex flex-col items-start justify-between gap-2 px-1 sm:flex-row sm:items-center">
                        <span className="text-xs font-bold uppercase tracking-wide text-pink-300 sm:text-sm">Solve all three</span>
                        <button
                          type="button"
                          onClick={g.useHint}
                          disabled={g.players[g.turn].hints <= 0}
                          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                            g.players[g.turn].hints > 0
                              ? 'border border-yellow-500/50 bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/40'
                              : 'cursor-not-allowed bg-slate-800 text-slate-500 opacity-50'
                          }`}
                        >
                          <Lightbulb size={12} />
                          Hint ({g.players[g.turn].hints} left)
                        </button>
                      </div>
                    ) : (
                      <p className="mb-2 flex justify-between text-sm font-bold uppercase text-slate-300">
                        Pick a move
                        {g.isComputerTurn && (
                          <span className="animate-pulse text-xs font-normal normal-case text-indigo-400">AI thinking…</span>
                        )}
                      </p>
                    )}

                    {g.availableMoves.map((move) => {
                      const isCorrect =
                        g.userAnswers[move.id] !== '' && parseInt(g.userAnswers[move.id], 10) === move.result;
                      const isWrong =
                        g.userAnswers[move.id] !== '' && parseInt(g.userAnswers[move.id], 10) !== move.result;

                      return (
                        <div key={move.id} className="relative">
                          <button
                            type="button"
                            disabled={!isRevealed || g.animating || g.isComputerTurn}
                            onClick={() => {
                              g.playClick();
                              g.executeMove(move);
                            }}
                            className={`flex w-full items-center justify-between rounded-xl border-2 p-3 text-left transition-all sm:p-4 ${
                              !isRevealed || g.isComputerTurn
                                ? 'cursor-default border-slate-700 bg-slate-800/50 opacity-80'
                                : 'cursor-pointer border-indigo-500/40 bg-indigo-900/40 shadow-lg hover:scale-[1.02] hover:bg-indigo-600/50 active:scale-95'
                            }`}
                          >
                            <div className="flex-1 pr-2">
                              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-indigo-300">{move.label}</div>
                              <div className="font-mono text-sm font-bold text-white sm:text-lg">
                                {isRevealed ? move.equation : move.expression}
                              </div>
                            </div>

                            <div className="flex shrink-0 items-center justify-end text-right">
                              {isRevealed ? (
                                <div>
                                  <span className="block text-[10px] font-bold text-indigo-300">Result</span>
                                  <span
                                    className={`text-xl font-black sm:text-2xl ${move.result > 0 ? 'text-orange-400' : 'text-cyan-400'}`}
                                  >
                                    {move.result > 0 ? `+${move.result}` : move.result}
                                  </span>
                                </div>
                              ) : (
                                <input
                                  type="number"
                                  value={g.userAnswers[move.id]}
                                  onChange={(e) => g.setUserAnswers((prev) => ({ ...prev, [move.id]: e.target.value }))}
                                  onClick={(e) => e.stopPropagation()}
                                  className={`w-14 rounded-lg border-2 bg-slate-900/80 p-2 text-center font-mono font-bold outline-none transition-colors sm:w-20 ${
                                    isWrong
                                      ? 'border-red-500 text-red-300 focus:border-red-400'
                                      : isCorrect
                                        ? 'border-green-500 text-green-300'
                                        : 'border-slate-500 text-white focus:border-indigo-400'
                                  }`}
                                  placeholder="?"
                                />
                              )}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          )}

          <div className="flex max-h-[200px] min-h-[150px] flex-1 flex-col rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2xl sm:p-5">
            <h3 className="mb-2 text-xs font-bold uppercase text-slate-400">Live log</h3>
            <div ref={g.logContainerRef} className="scrollbar-thin scrollbar-thumb-white/20 flex-1 space-y-2 overflow-y-auto pr-2">
              {g.log.map((entry) => (
                <div
                  key={entry.id}
                  className={`rounded-lg border-l-2 p-2 text-xs shadow-sm backdrop-blur-sm ${
                    entry.type === 'system'
                      ? 'border-slate-500 bg-white/5 text-slate-300'
                      : entry.type === 'action'
                        ? 'border-indigo-400 bg-indigo-500/20 text-indigo-100'
                        : entry.type === 'ladder'
                          ? 'border-yellow-400 bg-yellow-500/30 text-yellow-100'
                          : entry.type === 'snake'
                            ? 'border-red-400 bg-red-500/30 text-red-100'
                            : entry.type === 'win'
                              ? 'border-pink-400 bg-pink-500/30 text-base font-bold text-white'
                              : 'border-white/20 bg-white/5 text-slate-200'
                  }`}
                >
                  {entry.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
