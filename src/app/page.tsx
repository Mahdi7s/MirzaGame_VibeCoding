"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { levels, type Level, type CrosswordEntry } from '@/data/levels';
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
  const [currentLevel, setCurrentLevel] = useState<Level>(levels[0]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(levels[0].letters);
  
  const [selectedLetterIndices, setSelectedLetterIndices] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  
  const [gridState, setGridState] = useState<GridCell[][]>([]);
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundBonusWords, setFoundBonusWords] = useState<Set<string>>(new Set());
  
  const [score, setScore] = useState(0);
  const [hintsUsedThisLevel, setHintsUsedThisLevel] = useState(0);
  const MAX_HINTS_PER_LEVEL = 3;
  const [revealedHintCells, setRevealedHintCells] = useState<Set<string>>(new Set());

  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const { toast } = useToast();

  const initializeGrid = useCallback((level: Level): GridCell[][] => {
    const newGrid = Array(level.gridSize.rows)
      .fill(null)
      .map(() => Array(level.gridSize.cols).fill(null));
    
    // If we want to pre-fill parts of the grid or show already found words on load:
    // This example starts fresh.
    return newGrid;
  }, []);

  useEffect(() => {
    const newLevel = levels[currentLevelIndex];
    setCurrentLevel(newLevel);
    setAvailableLetters([...newLevel.letters].sort(() => Math.random() - 0.5)); // Shuffle initial letters
    setGridState(initializeGrid(newLevel));
    setFoundWords(new Set());
    setFoundBonusWords(new Set());
    setSelectedLetterIndices([]);
    setCurrentWord("");
    setIsLevelComplete(false);
    setHintsUsedThisLevel(0);
    setRevealedHintCells(new Set());
    
    // Change background
    document.body.style.backgroundImage = `url(${newLevel.backgroundUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed'; // Optional
    const bgImage = new Image(); // For data-ai-hint
    bgImage.src = newLevel.backgroundUrl;
    bgImage.setAttribute('data-ai-hint', 'persian landscape nature');


  }, [currentLevelIndex, initializeGrid]);

  const handleLetterClick = (letter: string, index: number) => {
    if (selectedLetterIndices.includes(index)) { // Allow deselecting the last letter
      if (selectedLetterIndices.length > 0 && selectedLetterIndices[selectedLetterIndices.length -1] === index) {
        setSelectedLetterIndices(prev => prev.slice(0, -1));
        setCurrentWord(prev => prev.slice(0, -1));
      }
      return;
    }
    setSelectedLetterIndices(prev => [...prev, index]);
    setCurrentWord(prev => prev + letter);
  };

  const clearSelection = useCallback(() => {
    setSelectedLetterIndices([]);
    setCurrentWord("");
  }, []);

  const updateGridWithWord = (wordEntry: CrosswordEntry) => {
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
  };

  const handleSubmitWord = () => {
    if (!currentWord) return;

    const targetWordEntry = currentLevel.targetWords.find(entry => entry.word === currentWord);

    if (targetWordEntry && !foundWords.has(currentWord)) {
      setFoundWords(prev => new Set(prev).add(currentWord));
      setScore(prev => prev + currentWord.length * 10);
      updateGridWithWord(targetWordEntry);
      toast({ title: "عالی!", description: `کلمه "${currentWord}" پیدا شد!`, variant: "default", duration: 2000 });
      
      if (foundWords.size + 1 === currentLevel.targetWords.length) {
        setIsLevelComplete(true);
        setScore(prev => prev + 50); // Level complete bonus
      }
    } else if (currentLevel.bonusWords.includes(currentWord) && !foundBonusWords.has(currentWord)) {
      setFoundBonusWords(prev => new Set(prev).add(currentWord));
      setScore(prev => prev + currentWord.length * 5); // Bonus word points
      toast({ title: "جایزه!", description: `کلمه اضافه "${currentWord}" پیدا شد!`, variant: "default", duration: 2000 });
    } else if (foundWords.has(currentWord) || foundBonusWords.has(currentWord)) {
      toast({ title: "تکراری", description: "این کلمه قبلا پیدا شده.", variant: "destructive", duration: 2000 });
    }
     else {
      toast({ title: "اشتباه", description: "کلمه معتبر نیست. دوباره تلاش کنید!", variant: "destructive", duration: 2000 });
    }
    clearSelection();
  };

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
      if (!gridState[r][c] && !revealedHintCells.has(cellKey)) { // Check if cell is empty AND not already a hint
        setGridState(prevGrid => {
          const newGrid = prevGrid.map(row => [...row]);
          newGrid[r][c] = wordToHint.word[i];
          return newGrid;
        });
        setRevealedHintCells(prev => new Set(prev).add(cellKey));
        setScore(prev => Math.max(0, prev - 15)); // Hint penalty
        setHintsUsedThisLevel(prev => prev + 1);
        toast({ title: "راهنما استفاده شد", description: `یک حرف نشان داده شد. (-15 امتیاز)` });
        revealed = true;
        break;
      }
    }
    if (!revealed) { // All letters of selected word are already revealed or hinted
         toast({ title: "خطای راهنما", description: "امکان نمایش راهنمای بیشتر برای این کلمه نیست. سعی کنید کلمه دیگری را حل کنید", variant: "destructive" });
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      toast({ title: "پایان بازی!", description: "شما تمام مراحل را با موفقیت به پایان رساندید!" });
      // Potentially show a game over screen or reset option
    }
    setIsLevelComplete(false);
  };
  
  const isHintDisabled = useMemo(() => hintsUsedThisLevel >= MAX_HINTS_PER_LEVEL || foundWords.size === currentLevel.targetWords.length, [hintsUsedThisLevel, foundWords.size, currentLevel.targetWords.length]);


  return (
    <AnimatePresence>
      <motion.div
        key={currentLevelIndex} // Ensures re-render on level change for animation
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center p-4 container mx-auto font-body"
      >
        <GameHeader levelName={currentLevel.name} score={score} />
        
        <main className="flex-grow flex flex-col items-center justify-start w-full max-w-2xl">
          <CrosswordGrid 
            gridState={gridState} 
            gridSize={currentLevel.gridSize}
            targetWords={currentLevel.targetWords}
            revealedHintCells={revealedHintCells}
          />
          
          <CurrentWordDisplay word={currentWord} />
          
          <LetterCircle 
            letters={availableLetters} 
            onLetterClick={handleLetterClick}
            selectedIndices={selectedLetterIndices}
          />
          
          <GameControls 
            onSubmit={handleSubmitWord}
            onClear={clearSelection}
            onShuffle={handleShuffleLetters}
            onHint={handleHint}
            canSubmit={currentWord.length > 0}
            isHintDisabled={isHintDisabled}
          />
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
