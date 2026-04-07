import { useEffect, useRef, useState } from 'react';
import { AI_AVATAR, LADDERS, MAX_PLAYERS, SNAKES, THEMES, createDefaultPlayers, TIMER_OPTIONS } from '../constants/gameConfig';
import { initAudio, playBloop, playCamera, playClick, playClimb, playDiceResult, playHiss, playPop, playStart, playTick, playWin } from '../utils/sfx';

const nextTurn = (turn, totalPlayers) => (turn + 1) % totalPlayers;

export function useIntegersGame() {
  const [gameState, setGameState] = useState('setup');
  const [showRules, setShowRules] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [isVsAI, setIsVsAI] = useState(false);
  const [playerCount, setPlayerCount] = useState(2);
  const [difficulty, setDifficulty] = useState('easy');
  const [timerSeconds, setTimerSeconds] = useState(TIMER_OPTIONS[1]);
  const [activeTheme, setActiveTheme] = useState('jungle');

  const [players, setPlayers] = useState(() => createDefaultPlayers(2));
  const [turn, setTurn] = useState(0);
  const [visualDice, setVisualDice] = useState(null);
  const [dice, setDice] = useState(null);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [userAnswers, setUserAnswers] = useState({ 1: '', 2: '', 3: '' });
  const [hintsUsed, setHintsUsed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [log, setLog] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [boardEvent, setBoardEvent] = useState(null);
  const [emotes, setEmotes] = useState([]);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
  }, [log]);

  const addToLog = (message, type = 'normal') => {
    setLog((prev) => [...prev, { text: message, type, id: Date.now() + Math.random() }]);
  };

  const updatePlayerCount = (count) => {
    const nextCount = Math.max(2, Math.min(MAX_PLAYERS, count));
    setPlayerCount(nextCount);
    setPlayers((prev) => {
      const base = createDefaultPlayers(nextCount);
      return base.map((p, i) => ({ ...p, name: prev[i]?.name || p.name, avatar: prev[i]?.avatar || p.avatar }));
    });
  };

  const startGame = () => {
    initAudio();
    playStart();
    const total = isVsAI ? 2 : playerCount;
    const finalPlayers = createDefaultPlayers(total).map((p, i) => ({
      ...p,
      name: players[i]?.name || p.name,
      avatar: players[i]?.avatar || p.avatar,
    }));

    if (isVsAI) {
      finalPlayers[1] = {
        name: 'Computer AI',
        avatar: AI_AVATAR,
        pos: 0,
        hints: 3,
        stats: { snakes: 0, ladders: 0, turns: 0, ops: new Set(), totalHintsUsed: 0 },
      };
    }

    setPlayers(finalPlayers);
    setGameState('playing');
    setTurn(0);
    setDice(null);
    setVisualDice(null);
    setAvailableMoves([]);
    setAnimating(false);
    setTimeLeft(0);
    setUserAnswers({ 1: '', 2: '', 3: '' });
    setHintsUsed(false);
    setTimerActive(false);
    setShowQuitConfirm(false);
    setCameraFlash(false);
    setLog([]);
    setBoardEvent(null);
    setConfettiPieces([]);

    const label = difficulty === 'timer' ? `TIMER (${timerSeconds}s)` : difficulty.toUpperCase();
    addToLog(`Game started in ${label} mode!`, 'system');
  };

  const triggerEmote = (playerIdx, forceEmoji = null) => {
    playBloop();
    const funnyEmojis = ['😂', '😎', '😜', '🔥', '✨', '🎉', '🤯', '👀', '👻', '🤪', '🤩'];
    const emoji = forceEmoji || funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)];
    const newEmote = {
      id: Date.now() + Math.random(),
      emoji,
      playerIdx,
      left: `${Math.random() * 70 + 15}vw`,
      top: `${Math.random() * 50 + 25}vh`,
    };
    setEmotes((prev) => [...prev, newEmote]);
    setTimeout(() => setEmotes((prev) => prev.filter((e) => e.id !== newEmote.id)), 3000);
  };

  const flashCamera = () => {
    playCamera();
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 800);
  };

  const createConfetti = () => {
    const colors = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#c084fc'];
    const pieces = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 3}s`,
    }));
    setConfettiPieces(pieces);
  };

  useEffect(() => {
    let interval;
    if (timerActive && !(isVsAI && players.length === 2 && turn === 1)) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 6) playTick();
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isVsAI, turn, players.length]);

  const checkWin = (pos) => {
    if (pos === 50 || pos === -50) {
      setGameState('won');
      playWin();
      createConfetti();
      addToLog(`🎉 HURRAY! ${players[turn].name} WINS! 🎉`, 'win');
    } else {
      setTurn((prev) => nextTurn(prev, players.length));
      setAnimating(false);
    }
  };

  const updatePosition = (playerIdx, pos, callback) => {
    setPlayers((prev) => {
      const next = [...prev];
      next[playerIdx].pos = pos;
      return next;
    });

    setTimeout(() => {
      setPlayers((currentPlayers) => {
        const currentPos = currentPlayers[playerIdx].pos;
        const clashCount = currentPlayers.filter((p) => p.pos === currentPos && currentPos !== 0).length;
        if (clashCount > 1) {
          triggerEmote(playerIdx, '🥊');
          setBoardEvent({ type: 'clash', text: 'BONK! 🥊' });
          playPop();
          setTimeout(() => setBoardEvent(null), 1000);
        }
        return currentPlayers;
      });
      callback();
    }, 600);
  };

  const executeMove = (move) => {
    setTimerActive(false);
    setAvailableMoves([]);
    setDice(null);
    setVisualDice(null);
    setAnimating(true);

    setPlayers((prev) => {
      const next = [...prev];
      next[turn].stats.ops.add(move.type);
      next[turn].stats.turns += 1;
      return next;
    });

    addToLog(`${players[turn].name} chose: ${move.equation}`, 'action');

    const currentPos = players[turn].pos;
    let newPos = currentPos + move.result;

    if (newPos > 50 || newPos < -50) {
      const needed = newPos > 50 ? 50 - currentPos : -50 - currentPos;
      addToLog(`Overshot! ${players[turn].name} needs exactly ${needed > 0 ? `+${needed}` : needed} to win. Staying at ${currentPos}.`, 'system');
      updatePosition(turn, currentPos, () => checkWin(currentPos));
      return;
    }

    updatePosition(turn, newPos, () => {
      const ladder = LADDERS.find((l) => l.start === newPos);
      const snake = SNAKES.find((s) => s.start === newPos);
      const tInfo = THEMES[activeTheme];

      if (ladder) {
        setBoardEvent({ type: 'ladder', text: `${tInfo.boostName}!` });
        playClimb(activeTheme);
        if (isVsAI && turn === 1) setTimeout(() => triggerEmote(1, '😎'), 500);

        setPlayers((p) => {
          const np = [...p];
          np[turn].stats.ladders += 1;
          return np;
        });

        setTimeout(() => {
          addToLog(`${players[turn].name} used a ${tInfo.boostName} to ${ladder.end}!`, 'ladder');
          updatePosition(turn, ladder.end, () => checkWin(ladder.end));
          setBoardEvent(null);
        }, 1000);
      } else if (snake) {
        setBoardEvent({ type: 'snake', text: `Ouch! ${tInfo.obstacleName}!` });
        playHiss(activeTheme);
        if (isVsAI && turn === 1) setTimeout(() => triggerEmote(1, '🤬'), 500);
        if (isVsAI && turn === 0) setTimeout(() => triggerEmote(1, '😂'), 500);

        setPlayers((p) => {
          const np = [...p];
          np[turn].stats.snakes += 1;
          return np;
        });

        setTimeout(() => {
          addToLog(`Oh no! ${players[turn].name} pulled to ${snake.end}.`, 'snake');
          updatePosition(turn, snake.end, () => checkWin(snake.end));
          setBoardEvent(null);
        }, 1200);
      } else {
        checkWin(newPos);
      }
    });
  };

  useEffect(() => {
    if (timerActive && timeLeft <= 0 && !(isVsAI && players.length === 2 && turn === 1)) {
      setTimerActive(false);
      if (difficulty === 'easy' && availableMoves.length > 0) {
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        addToLog(`⏱️ Time's up! A random move was chosen for ${players[turn].name}.`, 'system');
        executeMove(randomMove);
      } else if (difficulty === 'hard' || difficulty === 'timer') {
        addToLog(`⏱️ Time's up! ${players[turn].name} ran out of time and lost their turn.`, 'snake');
        playHiss(activeTheme);
        setAvailableMoves([]);
        setDice(null);
        setVisualDice(null);
        setUserAnswers({ 1: '', 2: '', 3: '' });
        setTurn((prev) => nextTurn(prev, players.length));
      }
    }
  }, [timeLeft, timerActive, difficulty, availableMoves, turn, players, isVsAI, activeTheme]);

  useEffect(() => {
    if (gameState === 'playing' && isVsAI && players.length === 2 && turn === 1) {
      if (!animating && !dice && availableMoves.length === 0) {
        const rollTimer = setTimeout(() => handleRoll(), 1500);
        return () => clearTimeout(rollTimer);
      }
      if (availableMoves.length > 0 && !animating) {
        if (Math.random() > 0.6) setTimeout(() => triggerEmote(1, '🤔'), 500);
        const moveTimer = setTimeout(() => {
          let bestMove = availableMoves[0];
          let maxScore = -Infinity;
          for (const move of availableMoves) {
            const newPos = players[1].pos + move.result;
            let score = 0;
            if (newPos > 50 || newPos < -50) score = Math.abs(players[1].pos) - 10;
            else {
              score = Math.abs(newPos);
              if (newPos === 50 || newPos === -50) score += 1000;
              if (LADDERS.find((l) => l.start === newPos)) score += 50;
              if (SNAKES.find((s) => s.start === newPos)) score -= 100;
            }
            if (score > maxScore) {
              maxScore = score;
              bestMove = move;
            }
          }
          executeMove(bestMove);
        }, 2000);
        return () => clearTimeout(moveTimer);
      }
    }
  }, [turn, gameState, isVsAI, animating, dice, availableMoves, players]);

  const handleRoll = () => {
    if (animating || dice || availableMoves.length > 0) return;
    setAnimating(true);
    setDice(null);
    setAvailableMoves([]);
    setUserAnswers({ 1: '', 2: '', 3: '' });
    setHintsUsed(false);

    let rolls = 0;
    const maxRolls = 15;
    const rollInterval = setInterval(() => {
      setVisualDice({ positive: Math.floor(Math.random() * 6) + 1, negative: -(Math.floor(Math.random() * 6) + 1) });
      playTick();
      rolls += 1;
      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        playDiceResult();
        const dPositive = Math.floor(Math.random() * 6) + 1;
        const dNegative = -(Math.floor(Math.random() * 6) + 1);
        setVisualDice({ positive: dPositive, negative: dNegative });
        setDice({ positive: dPositive, negative: dNegative });
        addToLog(`${players[turn].name} rolled +${dPositive} and ${dNegative}`);

        const m1 = dPositive + dNegative;
        const m2 = dPositive - dNegative;
        const m3 = dNegative - dPositive;
        setAvailableMoves([
          { id: 1, label: 'Add', expression: `(+${dPositive}) + (${dNegative})`, equation: `(+${dPositive}) + (${dNegative}) = ${m1 > 0 ? `+${m1}` : m1}`, result: m1, type: 'Add' },
          { id: 2, label: 'Subtract 1', expression: `(+${dPositive}) - (${dNegative})`, equation: `(+${dPositive}) - (${dNegative}) = ${m2 > 0 ? `+${m2}` : m2}`, result: m2, type: 'Sub1' },
          { id: 3, label: 'Subtract 2', expression: `(${dNegative}) - (+${dPositive})`, equation: `(${dNegative}) - (+${dPositive}) = ${m3 > 0 ? `+${m3}` : m3}`, result: m3, type: 'Sub2' },
        ]);
        setAnimating(false);
        setTimeLeft(difficulty === 'easy' ? 15 : difficulty === 'hard' ? 30 : timerSeconds);
        setTimerActive(true);
      }
    }, 100);
  };

  const getBadges = (player) => {
    const badges = [];
    if ((difficulty === 'hard' || difficulty === 'timer') && player.stats.totalHintsUsed === 0) badges.push({ icon: '🧠', name: 'Brainiac' });
    if (player.stats.turns <= 10) badges.push({ icon: '⚡', name: 'Speed Runner' });
    if (player.stats.turns >= 20) badges.push({ icon: '🐢', name: 'Marathoner' });
    if (player.stats.snakes >= 2) badges.push({ icon: '🛡️', name: 'Survivor' });
    if (player.stats.ops.size >= 3) badges.push({ icon: '📐', name: 'Math Wizard' });
    if (player.stats.ladders >= 2) badges.push({ icon: '🚀', name: 'Explorer' });
    if (difficulty === 'hard' || difficulty === 'timer') badges.push({ icon: '🔥', name: 'Hardcore' });
    if (badges.length === 0) badges.push({ icon: '⭐', name: 'Good Job!' });
    return badges;
  };

  const useHint = () => {
    setPlayers((prev) => {
      const current = prev[turn];
      if (!current || current.hints <= 0) return prev;
      playPop();
      const next = [...prev];
      const nextHints = Math.max(0, current.hints - 1);
      next[turn] = {
        ...current,
        hints: nextHints,
        stats: { ...current.stats, totalHintsUsed: current.stats.totalHintsUsed + 1 },
      };
      setHintsUsed(true);
      addToLog(`${current.name} used a hint!`, 'system');
      return next;
    });
  };

  const t = THEMES[activeTheme];
  const isComputerTurn = isVsAI && players.length === 2 && turn === 1;

  return {
    gameState,
    setGameState,
    showRules,
    setShowRules,
    showQuitConfirm,
    setShowQuitConfirm,
    cameraFlash,
    flashCamera,
    isVsAI,
    setIsVsAI,
    playerCount,
    setPlayerCount: updatePlayerCount,
    difficulty,
    setDifficulty,
    timerSeconds,
    setTimerSeconds,
    activeTheme,
    setActiveTheme,
    players,
    setPlayers,
    turn,
    visualDice,
    dice,
    availableMoves,
    userAnswers,
    setUserAnswers,
    hintsUsed,
    timeLeft,
    timerActive,
    log,
    animating,
    boardEvent,
    emotes,
    confettiPieces,
    logContainerRef,
    addToLog,
    startGame,
    triggerEmote,
    handleRoll,
    executeMove,
    getBadges,
    useHint,
    t,
    isComputerTurn,
    playClick,
  };
}
