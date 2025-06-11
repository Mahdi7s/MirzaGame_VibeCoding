
import React, { type FC } from 'react';
import type { Level, CrosswordEntry } from '@/data/levels';
import { cn } from '@/lib/utils';

interface CrosswordGridProps {
  targetWords: Level['targetWords'];
  filledLetters: Map<string, (string | null)[]>;
  hintedIndices: Map<string, Set<number>>;
}

const CrosswordGrid: FC<CrosswordGridProps> = ({ targetWords, filledLetters, hintedIndices }) => {
  return (
    <div className="flex flex-wrap justify-center items-start gap-4 p-2 my-4">
      {targetWords.map((wordEntry, wordIdx) => {
        const lettersForThisWord = filledLetters.get(wordEntry.word) || Array(wordEntry.word.length).fill(null);
        const hintsForThisWord = hintedIndices.get(wordEntry.word) || new Set();

        return (
          <div
            key={`${wordEntry.word}-${wordIdx}`}
            className={cn(
              "flex rounded", // Add rounded to the word block itself
              wordEntry.direction === 'horizontal' ? 'flex-row' : 'flex-col',
              'gap-0.5' // Small gap between cells of the same word
            )}
            aria-label={`کلمه ${wordEntry.word}`}
          >
            {wordEntry.word.split('').map((char, letterIdx) => {
              const letterToShow = lettersForThisWord[letterIdx];
              const isHintedAndEmpty = hintsForThisWord.has(letterIdx) && !letterToShow;
              
              return (
                <div
                  key={`${wordEntry.word}-${wordIdx}-${letterIdx}`}
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-xl sm:text-2xl font-bold",
                    "bg-input border border-primary/60 rounded-sm", // Apply to all cells in a word block
                    letterToShow ? "text-primary animate-celebrate" : "text-transparent",
                    isHintedAndEmpty ? "text-primary bg-primary/20" : ""
                  )}
                  style={{ fontSize: `1.5rem`}} // Fixed font size for cells
                >
                  {letterToShow || (isHintedAndEmpty ? '؟' : '')}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default CrosswordGrid;

    