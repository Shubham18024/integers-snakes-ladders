import { useMemo } from 'react';
import { CELLS, LADDERS, SNAKES } from '../constants/gameConfig';
import { getBoardPos } from '../utils/board';

function ladderMarkup(activeTheme, i, s, e) {
  if (activeTheme === 'space' || activeTheme === 'cyberpunk') {
    return (
      <line
        key={`l-${i}`}
        x1={s.x * 10 + 5}
        y1={s.y * 10 + 5}
        x2={e.x * 10 + 5}
        y2={e.y * 10 + 5}
        stroke="#a855f7"
        strokeWidth="2"
        strokeDasharray="2 4"
        opacity="0.9"
      />
    );
  }
  if (activeTheme === 'ocean') {
    return (
      <path
        key={`l-${i}`}
        d={`M ${s.x * 10 + 5} ${s.y * 10 + 5} Q ${s.x * 10 + 8} ${(s.y + e.y) * 5} ${e.x * 10 + 5} ${e.y * 10 + 5}`}
        stroke="#38bdf8"
        strokeWidth="2"
        fill="none"
        strokeDasharray="1 3"
        opacity="0.8"
      />
    );
  }
  if (activeTheme === 'arctic') {
    return (
      <line
        key={`l-${i}`}
        x1={s.x * 10 + 5}
        y1={s.y * 10 + 5}
        x2={e.x * 10 + 5}
        y2={e.y * 10 + 5}
        stroke="#bae6fd"
        strokeWidth="2"
        strokeDasharray="3 3"
        opacity="0.9"
      />
    );
  }
  if (activeTheme === 'candy') {
    return (
      <path
        key={`l-${i}`}
        d={`M ${s.x * 10 + 5} ${s.y * 10 + 5} Q ${(s.x + e.x) * 5 + 5} ${(s.y + e.y) * 5 + 5} ${e.x * 10 + 5} ${e.y * 10 + 5}`}
        stroke="#f472b6"
        strokeWidth="2.5"
        fill="none"
        strokeDasharray="3 2"
        opacity="0.85"
      />
    );
  }
  if (activeTheme === 'jurassic') {
    return (
      <g key={`l-${i}`}>
        <line x1={s.x * 10 + 4} y1={s.y * 10 + 4} x2={e.x * 10 + 4} y2={e.y * 10 + 4} stroke="#14532d" strokeWidth="1.2" />
        <line x1={s.x * 10 + 5} y1={s.y * 10 + 5} x2={e.x * 10 + 5} y2={e.y * 10 + 5} stroke="#84cc16" strokeWidth="2.5" strokeDasharray="2 3" />
      </g>
    );
  }
  return (
    <g key={`l-${i}`}>
      <line x1={s.x * 10 + 4} y1={s.y * 10 + 4} x2={e.x * 10 + 4} y2={e.y * 10 + 4} stroke="#78350f" strokeWidth="0.8" />
      <line x1={s.x * 10 + 6} y1={s.y * 10 + 6} x2={e.x * 10 + 6} y2={e.y * 10 + 6} stroke="#78350f" strokeWidth="0.8" />
      <line
        x1={s.x * 10 + 5}
        y1={s.y * 10 + 5}
        x2={e.x * 10 + 5}
        y2={e.y * 10 + 5}
        stroke="#d4a373"
        strokeWidth="2"
        strokeDasharray="1 2"
      />
    </g>
  );
}

function snakeMarkup(activeTheme, i, cx1, cy1, cx2, cy2, mx, my) {
  if (activeTheme === 'space') {
    return <path key={`s-${i}`} d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`} stroke="#ec4899" strokeWidth="1.5" fill="none" opacity="0.8" />;
  }
  if (activeTheme === 'cyberpunk') {
    return (
      <path
        key={`s-${i}`}
        d={`M ${cx1} ${cy1} L ${mx} ${my} L ${cx2} ${cy2}`}
        stroke="#0ff"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="2 1"
        opacity="0.9"
      />
    );
  }
  if (activeTheme === 'ocean') {
    return <path key={`s-${i}`} d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`} stroke="#1e3a8a" strokeWidth="3" fill="none" opacity="0.7" />;
  }
  if (activeTheme === 'desert') {
    return (
      <path key={`s-${i}`} d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`} stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    );
  }
  if (activeTheme === 'arctic') {
    return <path key={`s-${i}`} d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`} stroke="#334155" strokeWidth="3" fill="none" opacity="0.8" />;
  }
  if (activeTheme === 'volcano') {
    return (
      <path
        key={`s-${i}`}
        d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`}
        stroke="#dc2626"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 2"
      />
    );
  }
  if (activeTheme === 'candy') {
    return (
      <path key={`s-${i}`} d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`} stroke="#7c3aed" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85" />
    );
  }
  if (activeTheme === 'jurassic') {
    return (
      <path key={`s-${i}`} d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`} stroke="#78350f" strokeWidth="3.2" fill="none" strokeLinecap="round" opacity="0.85" />
    );
  }
  return (
    <g key={`s-${i}`}>
      <path d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`} stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d={`M ${cx1} ${cy1} Q ${mx} ${my} ${cx2} ${cy2}`} stroke="#14532d" strokeWidth="1" fill="none" strokeDasharray="1 2" />
    </g>
  );
}

export default function Board({ activeTheme, theme, boardEvent, animating, turn, players }) {
  const memoizedCells = useMemo(() => {
    return CELLS.map((num) => {
      const { x, y } = getBoardPos(num);
      let styleClass = 'bg-white/5 text-slate-500 border-white/5';
      if (num > 0) styleClass = `bg-gradient-to-br ${theme.boardColors.pos} text-orange-200 border-white/10`;
      if (num < 0) styleClass = `bg-gradient-to-br ${theme.boardColors.neg} text-blue-200 border-white/10`;
      if (num === 0)
        styleClass =
          'z-10 scale-110 border-white/50 bg-white/30 font-black text-white shadow-[0_0_30px_rgba(255,255,255,0.4)]';

      return (
        <div
          key={num}
          className={`absolute flex items-center justify-center rounded-xl border text-[10px] font-black transition-all duration-300 sm:text-xs md:text-sm ${styleClass}`}
          style={{
            width: `${100 / 11}%`,
            height: `${100 / 11}%`,
            left: `${x * (100 / 11)}%`,
            top: `${y * (100 / 11)}%`,
            transform: num === 0 ? 'scale(1.05)' : 'scale(0.92)',
          }}
        >
          {num}
        </div>
      );
    });
  }, [theme.boardColors]);

  const memoizedOverlays = useMemo(() => {
    return (
      <>
        <svg className="pointer-events-none absolute inset-0 z-10 h-full w-full drop-shadow-2xl" viewBox="0 0 110 110">
          <defs>
            <marker id="ladderArrow" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto" markerUnits="strokeWidth">
              <path d="M 0 0 L 5 2.5 L 0 5 z" fill="#facc15" />
            </marker>
          </defs>
          {LADDERS.map((l, i) => {
            const s = getBoardPos(l.start);
            const e = getBoardPos(l.end);
            return (
              <g key={`ladder-group-${i}`}>
                {ladderMarkup(activeTheme, i, s, e)}
                <line
                  x1={s.x * 10 + 5}
                  y1={s.y * 10 + 5}
                  x2={e.x * 10 + 5}
                  y2={e.y * 10 + 5}
                  stroke="#fde047"
                  strokeOpacity="0.85"
                  strokeWidth="0.8"
                  markerEnd="url(#ladderArrow)"
                />
                <circle cx={s.x * 10 + 5} cy={s.y * 10 + 5} r="1.3" fill="#22c55e" />
                <circle cx={e.x * 10 + 5} cy={e.y * 10 + 5} r="1.3" fill="#facc15" />
              </g>
            );
          })}
          {SNAKES.map((snake, i) => {
            const s = getBoardPos(snake.start);
            const e = getBoardPos(snake.end);
            const cx1 = s.x * 10 + 5;
            const cy1 = s.y * 10 + 5;
            const cx2 = e.x * 10 + 5;
            const cy2 = e.y * 10 + 5;
            const mx = (cx1 + cx2) / 2 - (cy2 - cy1) * 0.3;
            const my = (cy1 + cy2) / 2 + (cx2 - cx1) * 0.3;
            return (
              <g key={`snake-group-${i}`}>
                {snakeMarkup(activeTheme, i, cx1, cy1, cx2, cy2, mx, my)}
                <circle cx={cx1} cy={cy1} r="1.8" fill="#ef4444" />
                <circle cx={cx2} cy={cy2} r="1.1" fill="#38bdf8" />
              </g>
            );
          })}
        </svg>
        {LADDERS.map((l, i) => {
          const s = getBoardPos(l.start);
          const hasSnakeHere = SNAKES.some((snake) => snake.start === l.start || snake.end === l.start);
          return (
            <div
              key={`lb-${i}`}
              className="absolute z-10 animate-pulse text-[10px] md:text-sm"
              style={{ left: `${s.x * (100 / 11) + (hasSnakeHere ? 2 : 4)}%`, top: `${s.y * (100 / 11) + 2}%` }}
              title="Ladder start"
            >
              {theme.boost}
            </div>
          );
        })}
        {SNAKES.map((snake, i) => {
          const s = getBoardPos(snake.start);
          const tail = getBoardPos(snake.end);
          const hasLadderHere = LADDERS.some((l) => l.start === snake.start);
          return (
            <div key={`snake-icons-${i}`}>
              <div
                className="absolute z-10 text-sm drop-shadow-md md:text-base"
                style={{ left: `${s.x * (100 / 11) + (hasLadderHere ? 6 : 4)}%`, top: `${s.y * (100 / 11) + 6}%` }}
                title="Snake mouth"
              >
                {theme.obstacle}
              </div>
              <div
                className="absolute z-10 text-[10px] font-black text-cyan-200 md:text-xs"
                style={{ left: `${tail.x * (100 / 11) + 2}%`, top: `${tail.y * (100 / 11) + 2}%` }}
                title="Snake tail"
              >
                tail
              </div>
            </div>
          );
        })}
      </>
    );
  }, [activeTheme, theme]);

  return (
    <div className={`perspective-1000 mx-auto w-full max-w-[min(100%,_80vh,_650px)] ${boardEvent?.type === 'snake' ? 'animate-shake' : ''}`}>
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20" viewBox="0 0 110 110">
          <polyline
            points={CELLS.map((c) => `${getBoardPos(c).x * 10 + 5},${getBoardPos(c).y * 10 + 5}`).join(' ')}
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>

        {memoizedCells}
        {memoizedOverlays}

        {players.map((player, idx) => {
          const { x, y } = getBoardPos(player.pos);
          const sameSpot = players.filter((p) => p.pos === player.pos);
          const inStack = sameSpot.findIndex((p) => p.name === player.name && p.avatar === player.avatar);
          const centerX = (x + 0.5) * (100 / 11);
          const centerY = (y + 0.5) * (100 / 11);
          const offsetList = [
            { x: 0, y: 0 },
            { x: -1.7, y: -1.7 },
            { x: 1.7, y: -1.7 },
            { x: -1.7, y: 1.7 },
            { x: 1.7, y: 1.7 },
          ];
          const offset = offsetList[inStack] || { x: 0, y: 0 };
          return (
            <div
              key={`p-${idx}`}
              className="pointer-events-none absolute z-20 flex h-6 w-6 items-center justify-center transition-all duration-[800ms] ease-out sm:h-8 sm:w-8"
              style={{
                left: `${centerX + offset.x}%`,
                top: `${centerY + offset.y}%`,
                transform: `translate(-50%, -50%) ${animating && turn === idx ? 'scale(1.4)' : 'scale(1.1)'}`,
              }}
            >
              <div
                className={`relative flex h-full w-full items-center justify-center rounded-full border-2 shadow-[0_5px_20px_rgba(0,0,0,0.8)] backdrop-blur-md ${
                  idx === 0 ? 'border-green-400 bg-green-600' : 'border-yellow-400 bg-yellow-500'
                }`}
              >
                <span className="text-[10px] drop-shadow-md sm:text-xl">{player.avatar}</span>
              </div>
            </div>
          );
        })}

        {boardEvent && (
          <div className="animate-in fade-in absolute inset-0 z-30 flex items-center justify-center rounded-3xl bg-black/40 backdrop-blur-sm">
            <div
              className={`animate-bounce rounded-2xl border-4 px-8 py-5 text-4xl font-black shadow-[0_0_50px_rgba(0,0,0,0.5)] ${
                boardEvent.type === 'snake'
                  ? 'border-red-300 bg-red-600 text-white'
                  : boardEvent.type === 'clash'
                    ? 'border-yellow-300 bg-orange-500 text-white'
                    : 'border-white bg-yellow-400 text-yellow-900'
              }`}
            >
              {boardEvent.text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
