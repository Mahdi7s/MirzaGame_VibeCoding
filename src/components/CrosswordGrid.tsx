
import React, { type FC } from 'react';
import type { Level } from '@/data/levels';

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

  // Adjust cell size for better fit on mobile, especially for larger grids
  const cellSizeRem = Math.min(2.5, 20 / Math.max(gridSize.cols, gridSize.rows)); // e.g. 2.5rem for small grids, smaller for large


  return (
    <div className="flex justify-center items-center p-2 bg-secondary/30 rounded-lg shadow-inner" dir="rtl">
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

            return (
              <div
                key={cellKey}
                className={`w-full h-full flex items-center justify-center border border-border text-xl sm:text-2xl font-bold
                  ${isActive ? 'bg-background' : 'bg-muted/50'}
                  ${letter ? 'text-accent animate-celebrate' : 'text-transparent'}
                  ${isHint && !letter ? 'bg-primary/20' : ''}
                `}
                style={{ fontSize: `${cellSizeRem * 0.6}rem`}} // Dynamically adjust font size based on cell size
              >
                {letter || (isHint ? '؟' : '')} 
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CrosswordGrid;
