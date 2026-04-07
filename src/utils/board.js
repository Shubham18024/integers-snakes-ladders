export function getBoardPos(num) {
  if (num === 0) return { x: 0, y: 5 };
  const absNum = Math.abs(num);
  const rowOffset = Math.floor((absNum - 1) / 10);
  const direction = rowOffset % 2 === 0 ? 1 : -1;
  const x = direction === 1 ? ((absNum - 1) % 10) + 1 : 10 - ((absNum - 1) % 10);
  const y = num > 0 ? 4 - rowOffset : 6 + rowOffset;
  return { x, y };
}
