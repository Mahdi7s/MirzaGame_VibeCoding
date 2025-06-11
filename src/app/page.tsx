
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { levels, type Level, type CrosswordEntry } from '@/data/levels';
import { persianWords } from '@/data/persianWords';
import GameHeader from '@/components/GameHeader';
import LetterCircle from '@/components/LetterCircle';
import CrosswordGrid from '@/components/CrosswordGrid';
import CurrentWordDisplay from '@/components/CurrentWordDisplay';
import GameControls from '@/components/GameControls';
import LevelCompleteDialog from '@/components/LevelCompleteDialog';
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from 'framer-motion';

type GridCell = string | null;

export default function HomePage() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Level>(levels[currentLevelIndex]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(levels[currentLevelIndex].letters);
  
  const [selectedLetterIndices, setSelectedLetterIndices] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [isDraggingWord, setIsDraggingWord] = useState(false);
  
  const [gridState, setGridState] = useState<GridCell[][]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundBonusWords, setFoundBonusWords] = useState<Set<string>>(new Set());
  
  const [score, setScore] = useState(0);
  const [hintsUsedThisLevel, setHintsUsedThisLevel] = useState(0);
  const MAX_HINTS_PER_LEVEL = 3;
  const [revealedHintCells, setRevealedHintCells] = useState<Set<string>>(new Set());

  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const { toast } = useToast();

  const disabledDraggableInput = useMemo(() => currentWord.length >= 7, [currentWord]);

  const initializeGrid = useCallback((level: Level): GridCell[][] => {
    const newGrid = Array(level.gridSize.rows)
      .fill(null)
      .map(() => Array(level.gridSize.cols).fill(null));
    return newGrid;
  }, []);

  useEffect(() => {
    const newLevel = levels[currentLevelIndex];
    setCurrentLevel(newLevel);
    setAvailableLetters([...newLevel.letters].sort(() => Math.random() - 0.5));
    setGridState(initializeGrid(newLevel));
    setFoundWords(new Set());
    setFoundBonusWords(new Set());
    setSelectedLetterIndices([]);
    setCurrentWord("");
    setIsLevelComplete(false);
    setHintsUsedThisLevel(0);
    setRevealedHintCells(new Set());
    setIsDraggingWord(false);
    
    document.body.style.backgroundImage = ''; // Ensures no direct background image styling from JS
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundAttachment = '';

  }, [currentLevelIndex, initializeGrid]); // `levels` is a constant import, not needed in deps

  const clearSelection = useCallback(() => {
    setSelectedLetterIndices([]);
    setCurrentWord("");
    setIsDraggingWord(false);
  }, []);

  const updateGridWithWord = useCallback((wordEntry: CrosswordEntry) => {
    setGridState(prevGrid => {
      const newGrid = prevGrid.map(row => [...row]);
      for (let i = 0; i < wordEntry.word.length; i++) {
        const char = wordEntry.word[i];
        if (wordEntry.direction === 'horizontal') {
          newGrid[wordEntry.startY][wordEntry.startX + i] = char;
        } else {
          newGrid[wordEntry.startY + i][wordEntry.startX] = char;
        }
      }
      return newGrid;
    });
  }, []);

  const handleSubmitWord = useCallback(() => {
    if (!currentWord) return;

    const isGenerallyValid = persianWords.has(currentWord);

    if (!isGenerallyValid) {
      toast({ title: "کلمه نامعتبر", description: `"${currentWord}" در لغت‌نامه یافت نشد.`, variant: "destructive", duration: 2000 });
      clearSelection();
      return;
    }

    const targetWordEntry = currentLevel.targetWords.find(entry => entry.word === currentWord);

    if (targetWordEntry && !foundWords.has(currentWord)) {
      const newFoundWords = new Set(foundWords).add(currentWord);
      setFoundWords(newFoundWords);
      setScore(prev => prev + currentWord.length * 10);
      updateGridWithWord(targetWordEntry);
      toast({ title: "عالی!", description: `کلمه "${currentWord}" پیدا شد!`, variant: "default", duration: 2000 });
      
      if (newFoundWords.size === currentLevel.targetWords.length) {
        setIsLevelComplete(true);
        setScore(prev => prev + 50); 
      }
    } else if (currentLevel.bonusWords.includes(currentWord) && !foundBonusWords.has(currentWord)) {
      setFoundBonusWords(prev => new Set(prev).add(currentWord));
      setScore(prev => prev + currentWord.length * 5);
      toast({ title: "جایزه!", description: `کلمه اضافه "${currentWord}" پیدا شد!`, variant: "default", duration: 2000 });
    } else if (foundWords.has(currentWord) || foundBonusWords.has(currentWord)) {
      toast({ title: "تکراری", description: "این کلمه قبلا پیدا شده.", variant: "destructive", duration: 2000 });
    } else {
      // Word is in persianWords but not a target or bonus word for this level
      toast({ title: "کلمه معتبر", description: `"${currentWord}" یک کلمه معتبر است، اما جزو کلمات این مرحله نیست.`, variant: "default", duration: 2500 });
    }
    clearSelection();
  }, [currentWord, currentLevel, foundWords, foundBonusWords, updateGridWithWord, toast, clearSelection]);


  const handleLetterMouseDown = useCallback((index: number) => {
    if (disabledDraggableInput) return;
    setIsDraggingWord(true);
    setSelectedLetterIndices([index]);
    setCurrentWord(availableLetters[index]);
  }, [availableLetters, disabledDraggableInput]);

  const handleLetterMouseEnter = useCallback((index: number) => {
    if (isDraggingWord && !selectedLetterIndices.includes(index) && !disabledDraggableInput) {
      setSelectedLetterIndices(prev => [...prev, index]);
      setCurrentWord(prev => prev + availableLetters[index]);
    }
  }, [isDraggingWord, selectedLetterIndices, availableLetters, disabledDraggableInput]);
  
  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDraggingWord) {
        setIsDraggingWord(false);
        // Word submission is now triggered on drag end
        handleSubmitWord(); 
      }
    };
  
    // Add event listeners only when dragging
    if (isDraggingWord) {
      document.addEventListener('mouseup', handleMouseUpGlobal);
      document.addEventListener('touchend', handleMouseUpGlobal);
    }
  
    // Cleanup function
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
      document.removeEventListener('touchend', handleMouseUpGlobal);
    };
  }, [isDraggingWord, handleSubmitWord]); // Dependencies for adding/removing listeners


  const handleShuffleLetters = () => {
    setAvailableLetters(prev => [...prev].sort(() => Math.random() - 0.5));
    clearSelection();
  };

  const handleHint = () => {
    if (hintsUsedThisLevel >= MAX_HINTS_PER_LEVEL) {
      toast({ title: "راهنما تمام شد", description: "از تمام راهنماهای این مرحله استفاده کرده‌اید.", variant: "destructive" });
      return;
    }

    const unsolvedWords = currentLevel.targetWords.filter(tw => !foundWords.has(tw.word));
    if (unsolvedWords.length === 0) {
      toast({ title: "همه کلمات پیدا شدند!", description: "نیازی به راهنما نیست.", variant: "default" });
      return;
    }

    const wordToHint = unsolvedWords[Math.floor(Math.random() * unsolvedWords.length)];
    let revealed = false;
    for (let i = 0; i < wordToHint.word.length; i++) {
      const r = wordToHint.startY + (wordToHint.direction === 'vertical' ? i : 0);
      const c = wordToHint.startX + (wordToHint.direction === 'horizontal' ? i : 0);
      const cellKey = `${r}-${c}`;
      if (!gridState[r]?.[c] && !revealedHintCells.has(cellKey)) {
        setGridState(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          newGrid[r][c] = wordToHint.word[i];
          return newGrid;
        });
        setRevealedHintCells(prev => new Set(prev).add(cellKey));
        setScore(prev => Math.max(0, prev - 15));
        setHintsUsedThisLevel(prev => prev + 1);
        toast({ title: "راهنما استفاده شد", description: `یک حرف نشان داده شد. (-15 امتیاز)` });
        revealed = true;
        break;
      }
    }
    if (!revealed) {
         toast({ title: "خطای راهنما", description: "امکان نمایش راهنمای بیشتر برای این کلمه نیست. سعی کنید کلمه دیگری را حل کنید", variant: "destructive" });
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      toast({ title: "پایان بازی!", description: "شما تمام مراحل را با موفقیت به پایان رساندید!" });
    }
    setIsLevelComplete(false);
  };
  
  const isHintDisabled = useMemo(() => hintsUsedThisLevel >= MAX_HINTS_PER_LEVEL || foundWords.size === currentLevel.targetWords.length, [hintsUsedThisLevel, foundWords.size, currentLevel.targetWords.length]);

  return (
    <AnimatePresence>
      <motion.div
        key={currentLevelIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center p-2 sm:p-4 container mx-auto font-body"
      >
        <GameHeader levelName={currentLevel.name} score={score} />
        
        <main className="flex-grow flex flex-col items-center justify-start w-full max-w-2xl">
          <div className="my-3 w-full">
            <CrosswordGrid 
              gridState={gridState} 
              gridSize={currentLevel.gridSize}
              targetWords={currentLevel.targetWords}
              revealedHintCells={revealedHintCells}
            />
          </div>
          
          <div className="my-2 w-full">
            <CurrentWordDisplay word={currentWord} />
          </div>
          
          <div className="my-4 w-full">
            <LetterCircle 
              letters={availableLetters} 
              onLetterMouseDown={handleLetterMouseDown}
              onLetterMouseEnter={handleLetterMouseEnter}
              selectedIndices={selectedLetterIndices}
              disabled={disabledDraggableInput}
            />
          </div>
          
          <div className="my-3 w-full">
            <GameControls 
              onShuffle={handleShuffleLetters}
              onHint={handleHint}
              isHintDisabled={isHintDisabled}
            />
          </div>
        </main>

        <LevelCompleteDialog 
          isOpen={isLevelComplete}
          onNextLevel={handleNextLevel}
          score={score}
          levelName={currentLevel.name}
          isLastLevel={currentLevelIndex === levels.length - 1}
        />
      </motion.div>
    </AnimatePresence>
  );
}

