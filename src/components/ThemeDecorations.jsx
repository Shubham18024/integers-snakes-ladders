export default function ThemeDecorations({ activeTheme }) {
  if (activeTheme === 'ocean') {
    return (
      <>
        <div className="fish fish-delay-1">🐟</div>
        <div className="fish fish-delay-2">🐠</div>
        <div className="fish" style={{ top: '80%', animationDelay: '-2s' }}>
          🐡
        </div>
      </>
    );
  }
  if (activeTheme === 'space') {
    return (
      <>
        <div className="space-float space-item-1">🪐</div>
        <div className="space-float space-item-2">☄️</div>
        <div className="space-float" style={{ top: '40%', left: '80%', fontSize: '3rem', animationDelay: '-7s' }}>
          🛰️
        </div>
      </>
    );
  }
  if (activeTheme === 'jungle') {
    return (
      <>
        <div className="jungle-leaf leaf-1">🌿</div>
        <div className="jungle-leaf leaf-2">🍃</div>
      </>
    );
  }
  if (activeTheme === 'desert') {
    return (
      <>
        <div className="desert-dust" style={{ left: '20%', animationDelay: '0s' }}>
          ✨
        </div>
        <div className="desert-dust" style={{ left: '70%', animationDelay: '-4s' }}>
          ☀️
        </div>
      </>
    );
  }
  if (activeTheme === 'cyberpunk') {
    return (
      <>
        <div className="cyber-glitch" style={{ top: '20%', left: '10%' }}>
          01
        </div>
        <div className="cyber-glitch" style={{ top: '70%', right: '15%', animationDelay: '-1s' }}>
          10
        </div>
      </>
    );
  }
  if (activeTheme === 'arctic') {
    return (
      <>
        <div className="arctic-snow h-2 w-2" style={{ left: '10%', animationDuration: '8s' }} />
        <div className="arctic-snow h-3 w-3" style={{ left: '40%', animationDuration: '12s', animationDelay: '-5s' }} />
        <div className="arctic-snow h-1 w-1" style={{ left: '70%', animationDuration: '7s', animationDelay: '-2s' }} />
        <div className="arctic-snow h-2 w-2" style={{ left: '90%', animationDuration: '9s', animationDelay: '-4s' }} />
      </>
    );
  }
  if (activeTheme === 'volcano') {
    return (
      <>
        <div className="volcano-ember h-2 w-2" style={{ left: '20%', animationDelay: '0s' }} />
        <div className="volcano-ember h-3 w-3" style={{ left: '50%', animationDelay: '-3s' }} />
        <div className="volcano-ember h-1 w-1" style={{ left: '80%', animationDelay: '-1s' }} />
      </>
    );
  }
  if (activeTheme === 'candy') {
    return (
      <>
        <div className="candy-bit" style={{ left: '12%', animationDelay: '-2s' }}>
          🍬
        </div>
        <div className="candy-bit" style={{ left: '38%', animationDelay: '-6s' }}>
          ✨
        </div>
        <div className="candy-bit" style={{ left: '62%', animationDelay: '-4s' }}>
          🍭
        </div>
        <div className="candy-bit" style={{ left: '84%', animationDelay: '-8s' }}>
          💖
        </div>
      </>
    );
  }
  if (activeTheme === 'jurassic') {
    return (
      <>
        <div className="dino-layer" style={{ animationDelay: '-3s' }}>
          🦕
        </div>
        <div className="dino-layer" style={{ bottom: '14%', fontSize: '2rem', opacity: 0.12, animationDelay: '-10s' }}>
          🌿
        </div>
      </>
    );
  }
  if (activeTheme === 'sky') {
    return (
      <>
        <div className="sky-cloud" style={{ top: '15%', left: '8%' }}>
          ☁️
        </div>
        <div className="sky-cloud" style={{ top: '32%', left: '62%', animationDelay: '-6s' }}>
          🌤️
        </div>
        <div className="sky-bird" style={{ top: '24%', animationDelay: '-3s' }}>
          🕊️
        </div>
        <div className="sky-bird" style={{ top: '58%', animationDelay: '-9s' }}>
          🐦
        </div>
      </>
    );
  }
  if (activeTheme === 'neon') {
    return (
      <>
        <div className="neon-ray" style={{ top: '20%', left: '10%' }} />
        <div className="neon-ray" style={{ top: '65%', left: '75%', animationDelay: '-1.5s' }} />
        <div className="neon-pulse" style={{ top: '38%', left: '18%' }} />
        <div className="neon-pulse" style={{ top: '72%', left: '58%', animationDelay: '-1s' }} />
      </>
    );
  }
  return null;
}
