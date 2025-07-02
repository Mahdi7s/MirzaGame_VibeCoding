
"use client";

import React, { type FC, useMemo, useRef } from 'react';
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
  const buttonSize = 48; 
  const buttonRadius = buttonSize / 2;
  const circleContainerSize = radius * 2 + buttonSize + 20; 
  const svgCenter = circleContainerSize / 2;
  const lastHoveredIndexRef = useRef<number | null>(null);

  const selectedPositions = useMemo(() => {
    if (letters.length === 0) return [];
    return selectedIndices.map(selectedIndex => {
      const angle = (selectedIndex / letters.length) * 2 * Math.PI - Math.PI / 2;
      const letterXOffset = radius * Math.cos(angle);
      const letterYOffset = radius * Math.sin(angle);
      return {
        x: svgCenter + letterXOffset,
        y: svgCenter + letterYOffset,
      };
    });
  }, [selectedIndices, letters, radius, svgCenter]);


  return (
    <div className="flex justify-center items-center my-4">
      <div
        className="relative rounded-full animate-glow border-2 border-primary/50"
        style={{ width: `${circleContainerSize}px`, height: `${circleContainerSize}px` }}
      >
        <svg 
          width={circleContainerSize} 
          height={circleContainerSize} 
          className="absolute top-0 left-0 pointer-events-none z-0"
        >
          {selectedPositions.length > 1 &&
            selectedPositions.slice(0, -1).map((pos, i) => {
              const nextPos = selectedPositions[i + 1];
              return (
                <line
                  key={`line-${i}-${pos.x}-${pos.y}-${nextPos.x}-${nextPos.y}`}
                  x1={pos.x}
                  y1={pos.y}
                  x2={nextPos.x}
                  y2={nextPos.y}
                  stroke="hsl(var(--primary))"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              );
            })}
        </svg>

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
                  // e.preventDefault(); // Prevent default only if necessary, could interfere with other touch actions
                  onLetterMouseDown(index);
                  lastHoveredIndexRef.current = index; // Initialize on touch start
                }
              }}
              onTouchMove={(e) => {
                if (!disabled) {
                  e.preventDefault(); // Essential to prevent scrolling
                  const touch = e.touches[0];
                  if (touch) {
                    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (elementUnderTouch) {
                      const letterButton = elementUnderTouch.closest('[data-letter-index]');
                      if (letterButton) {
                        const newIndexStr = letterButton.getAttribute('data-letter-index');
                        if (newIndexStr) {
                          const newIndex = parseInt(newIndexStr, 10);
                          if (lastHoveredIndexRef.current !== newIndex) {
                            onLetterMouseEnter(newIndex);
                            lastHoveredIndexRef.current = newIndex;
                          }
                        }
                      }
                    }
                  }
                }
              }}
              onTouchEnd={() => {
                if (!disabled) {
                  lastHoveredIndexRef.current = null; // Reset on touch end
                }
              }}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10
                          ${isSelected ? 'bg-primary text-primary-foreground scale-110' : 'bg-secondary text-secondary-foreground hover:bg-primary/80'}
                          ${disabled && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
              style={{
                top: `calc(50% + ${y}px - ${buttonRadius}px)`,
                left: `calc(50% + ${x}px - ${buttonRadius}px)`,
              }}
              whileHover={{ scale: disabled && !isSelected ? 1 : 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              aria-label={`حرف ${letter}`}
              data-letter-index={index} // Add data attribute for easy identification
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
