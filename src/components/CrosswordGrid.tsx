
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

  return (
    <div className="flex justify-center items-center p-4 bg-secondary/30 rounded-lg shadow-inner mb-6" dir="rtl">
      <div
        className="grid border border-border"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, minmax(0, 1fr))`,
          width: `${gridSize.cols * 3}rem`, 
          height: `${gridSize.rows * 3}rem`,
          direction: 'rtl', // Make the grid layout RTL
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
                className={`w-full h-full flex items-center justify-center border border-border text-2xl font-bold
                  ${isActive ? 'bg-background' : 'bg-muted/50'}
                  ${letter ? 'text-accent animate-celebrate' : 'text-transparent'}
                  ${isHint && !letter ? 'bg-primary/20' : ''}
                `}
              >
                {/* Ensure letter content itself respects RTL if needed by font/browser */}
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

    