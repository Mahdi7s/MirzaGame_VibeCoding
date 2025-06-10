"use client";

import type { FC } from 'react';
import { motion } from 'framer-motion'; // Using framer-motion for easier animations

interface LetterCircleProps {
  letters: string[];
  onLetterClick: (letter: string, index: number) => void;
  selectedIndices: number[];
  disabled?: boolean;
}

const LetterCircle: FC<LetterCircleProps> = ({ letters, onLetterClick, selectedIndices, disabled }) => {
  const radius = 100; // Radius of the circle in pixels
  const circleSize = radius * 2 + 60; // Container size to fit letters

  return (
    <div className="flex justify-center items-center my-8">
      <div
        className="relative rounded-full animate-glow border-2 border-primary/50"
        style={{ width: `${circleSize}px`, height: `${circleSize}px` }}
      >
        {letters.map((letter, index) => {
          const angle = (index / letters.length) * 2 * Math.PI - Math.PI / 2; // Start from top
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          const isSelected = selectedIndices.includes(index);

          return (
            <motion.button
              key={index}
              onClick={() => !disabled && onLetterClick(letter, index)}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg
                          ${isSelected ? 'bg-primary text-primary-foreground scale-110' : 'bg-secondary text-secondary-foreground hover:bg-primary/80'}
                          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
              style={{
                top: `calc(50% + ${y}px - 24px)`, // 24px is half of button height
                left: `calc(50% + ${x}px - 24px)`, // 24px is half of button width
              }}
              whileHover={{ scale: disabled ? 1 : 1.1 }}
              whileTap={{ scale: disabled ? 1 : 0.95 }}
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
