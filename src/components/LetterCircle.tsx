
"use client";

import React, { type FC } from 'react'; // Ensure React is imported if not already
import { motion } from 'framer-motion';

interface LetterCircleProps {
  letters: string[];
  onLetterMouseDown: (index: number) => void;
  onLetterMouseEnter: (index: number) => void;
  selectedIndices: number[];
  disabled?: boolean;
}

const LetterCircle: FC<LetterCircleProps> = ({ letters, onLetterMouseDown, onLetterMouseEnter, selectedIndices, disabled }) => {
  const radius = 100; 
  const circleSize = radius * 2 + 60;

  return (
    <div className="flex justify-center items-center my-8">
      <div
        className="relative rounded-full animate-glow border-2 border-primary/50"
        style={{ width: `${circleSize}px`, height: `${circleSize}px` }}
        onMouseLeave={() => {
          // Optional: if mouse leaves the entire circle area during a drag,
          // you might want to trigger word submission or clear selection.
          // For now, relies on global mouseup.
        }}
      >
        {letters.map((letter, index) => {
          const angle = (index / letters.length) * 2 * Math.PI - Math.PI / 2;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const isSelected = selectedIndices.includes(index);

          return (
            <motion.button
              key={index}
              onMouseDown={(e) => {
                if (!disabled) {
                  e.preventDefault(); 
                  onLetterMouseDown(index);
                }
              }}
              onMouseEnter={() => {
                if (!disabled) {
                  onLetterMouseEnter(index);
                }
              }}
              onTouchStart={(e) => {
                if (!disabled) {
                  // e.preventDefault(); // Might interfere with page scroll, test carefully
                  onLetterMouseDown(index);
                }
              }}
              // onTouchMove and onTouchEnter for individual buttons is less reliable.
              // The main logic relies on onLetterMouseEnter for mouse
              // and global touchend for finalizing.
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg
                          ${isSelected ? 'bg-primary text-primary-foreground scale-110' : 'bg-secondary text-secondary-foreground hover:bg-primary/80'}
                          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
              style={{
                top: `calc(50% + ${y}px - 24px)`,
                left: `calc(50% + ${x}px - 24px)`,
              }}
              whileHover={{ scale: disabled ? 1 : 1.1 }}
              // whileTap is less relevant now as mousedown initiates drag
              transition={{ type: "spring", stiffness: 300 }}
              aria-label={`حرف ${letter}`}
            >
              {letter}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default LetterCircle;

    