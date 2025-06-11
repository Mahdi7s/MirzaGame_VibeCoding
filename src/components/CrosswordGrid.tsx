
import React, { type FC } from 'react';
import type { Level } from '@/data/levels';
import { cn } from '@/lib/utils';

interface CrosswordGridProps {
  gridState: (string | null)[][];
  gridSize: Level['gridSize'];
  targetWords: Level['targetWords'];
  revealedHintCells: Set<string>; // "row-col"
}

const CrosswordGrid: FC<CrosswordGridProps> = ({ gridState, gridSize, targetWords, revealedHintCells }) => {
  const activeCells = React.useMemo(() => {
    const cells = new Set<string>();
    targetWords.forEach(entry => {
      for (let i = 0; i < entry.word.length; i++) {
        const r = entry.startY + (entry.direction === 'vertical' ? i : 0);
        const c = entry.startX + (entry.direction === 'horizontal' ? i : 0);
        cells.add(`${r}-${c}`);
      }
    });
    return cells;
  }, [targetWords]);

  const cellSizeRem = Math.min(3, 25 / Math.max(gridSize.cols, gridSize.rows));

  return (
    <div className="flex justify-center items-center p-1 rounded-lg shadow-inner" dir="rtl">
      <div
        className="grid border border-border"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
          width: `${gridSize.cols * cellSizeRem}rem`,
          height: `${gridSize.rows * cellSizeRem}rem`,
          direction: 'rtl',
        }}
      >
        {Array.from({ length: gridSize.rows }).map((_, r) =>
          Array.from({ length: gridSize.cols }).map((_, c) => {
            const cellKey = `${r}-${c}`;
            const isActive = activeCells.has(cellKey);
            const letter = gridState[r]?.[c];
            const isHint = revealedHintCells.has(cellKey);

            const cellContent = isActive ? (letter || (isHint && !letter ? '؟' : '')) : '';
            
            const cellClassName = cn(
              "w-full h-full flex items-center justify-center text-xl sm:text-2xl font-bold",
              isActive
                ? "bg-input border border-primary/60" // Active cells: dark input bg with glowing primary border
                : "", // Non-active cells have no specific background or border
              letter && isActive ? "text-accent animate-celebrate" : "text-transparent", // Filled letters are deep red
              isHint && !letter && isActive ? "bg-primary/20 text-primary" : "" // Hint placeholder '؟' styling: light primary bg, primary text
            );

            return (
              <div
                key={cellKey}
                className={cellClassName}
                style={{ fontSize: `${cellSizeRem * 0.6}rem`}}
              >
                {cellContent}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CrosswordGrid;
