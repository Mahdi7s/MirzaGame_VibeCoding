
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

const LOCAL_STORAGE_LEVEL_KEY = 'aghaMirzaCurrentLevelIndex';

const playSound = (soundFile: string) => {
  try {
    const audio = new Audio(soundFile);
    audio.play().catch(error => console.error("Error playing sound:", soundFile, error));
  } catch (error) {
    console.error("Error creating audio element for:", soundFile, error);
  }
};

const normalizeAlef = (word: string): string => {
  return word.replace(/آ/g, 'ا');
};

export default function HomePage() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const [isInitialLoadComplete, setIsInitialLoadComplete] = useState<boolean>(false);
  
  const [currentLevel, setCurrentLevel] = useState<Level>(levels[currentLevelIndex]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(levels[currentLevelIndex].letters);
  
  const [selectedLetterIndices, setSelectedLetterIndices] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [isDraggingWord, setIsDraggingWord] = useState(false);
  
  const [filledLetters, setFilledLetters] = useState<Map<string, (string | null)[]>>(new Map());
  const [hintedIndices, setHintedIndices] = useState<Map<string, Set<number>>>(new Map());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [foundBonusWords, setFoundBonusWords] = useState<Set<string>>(new Set());
  
  const [score, setScore] = useState(0);
  const [hintsUsedThisLevel, setHintsUsedThisLevel] = useState(0);
  const MAX_HINTS_PER_LEVEL = 3;

  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const { toast } = useToast();

  const disabledDraggableInput = useMemo(() => currentWord.length >= 7, [currentWord]);

  useEffect(() => {
    const savedLevelIndexStr = localStorage.getItem(LOCAL_STORAGE_LEVEL_KEY);
    if (savedLevelIndexStr) {
      const savedLevelIndex = parseInt(savedLevelIndexStr, 10);
      if (!isNaN(savedLevelIndex) && savedLevelIndex >= 0 && savedLevelIndex < levels.length) {
        setCurrentLevelIndex(savedLevelIndex);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_LEVEL_KEY); 
        setCurrentLevelIndex(0); 
      }
    } else {
        setCurrentLevelIndex(0);
    }
    setIsInitialLoadComplete(true);
  }, []);

  useEffect(() => {
    if (isInitialLoadComplete) {
      localStorage.setItem(LOCAL_STORAGE_LEVEL_KEY, currentLevelIndex.toString());
    }
  }, [currentLevelIndex, isInitialLoadComplete]);

  const initializeWordStates = useCallback((level: Level) => {
    const newFilledLetters = new Map<string, (string | null)[]>();
    const newHintedIndices = new Map<string, Set<number>>();
    level.targetWords.forEach(tw => {
      newFilledLetters.set(tw.word, Array(tw.word.length).fill(null));
      newHintedIndices.set(tw.word, new Set());
    });
    setFilledLetters(newFilledLetters);
    setHintedIndices(newHintedIndices);
  }, []);

  useEffect(() => {
    if(levels[currentLevelIndex]) {
      const newLevel = levels[currentLevelIndex];
      setCurrentLevel(newLevel);
      setAvailableLetters([...newLevel.letters].sort(() => Math.random() - 0.5));
      initializeWordStates(newLevel);
      setFoundWords(new Set());
      setFoundBonusWords(new Set());
      setSelectedLetterIndices([]);
      setCurrentWord("");
      setIsLevelComplete(false);
      setHintsUsedThisLevel(0);
      setIsDraggingWord(false);
    }
  }, [currentLevelIndex, initializeWordStates]); 

  const clearSelection = useCallback(() => {
    setSelectedLetterIndices([]);
    setCurrentWord("");
    setIsDraggingWord(false);
  }, []);

  const updateFilledLettersForWord = useCallback((wordEntry: CrosswordEntry) => {
    setFilledLetters(prevFilledLetters => {
      const newFilledLetters = new Map(prevFilledLetters);
      const lettersArray = Array(wordEntry.word.length).fill(null);
      for (let i = 0; i < wordEntry.word.length; i++) {
        lettersArray[i] = wordEntry.word[i];
      }
      newFilledLetters.set(wordEntry.word, lettersArray);
      return newFilledLetters;
    });
  }, []);

  const handleSubmitWord = useCallback(() => {
    if (!currentWord) return;

    const normalizedCurrentWord = normalizeAlef(currentWord);

    const targetWordEntry = currentLevel.targetWords.find(
      (entry) => normalizeAlef(entry.word) === normalizedCurrentWord
    );

    if (targetWordEntry) {
      if (!foundWords.has(targetWordEntry.word)) {
        const newFoundWords = new Set(foundWords).add(targetWordEntry.word);
        setFoundWords(newFoundWords);
        setScore((prev) => prev + targetWordEntry.word.length * 10);
        updateFilledLettersForWord(targetWordEntry);
        toast({ title: "عالی!", description: `کلمه "${targetWordEntry.word}" پیدا شد!`, variant: "default", duration: 2000 });
        playSound('sounds/correct-word.mp3');
        
        if (newFoundWords.size === currentLevel.targetWords.length) {
          setIsLevelComplete(true);
          playSound('sounds/level-complete.mp3');
          setScore((prev) => prev + 50); 
        }
      } else {
        toast({ title: "تکراری", description: "این کلمه قبلا پیدا شده.", variant: "destructive", duration: 2000 });
      }
      clearSelection();
      return;
    }

    const bonusWordDef = currentLevel.bonusWords.find(
      (bw) => normalizeAlef(bw) === normalizedCurrentWord
    );

    if (bonusWordDef) {
      if (!foundBonusWords.has(bonusWordDef)) {
        setFoundBonusWords((prev) => new Set(prev).add(bonusWordDef));
        setScore((prev) => prev + bonusWordDef.length * 5);
        toast({ title: "جایزه!", description: `کلمه اضافه "${bonusWordDef}" پیدا شد!`, variant: "default", duration: 2000 });
        playSound('sounds/correct-word.mp3');
      } else {
        toast({ title: "تکراری", description: "این کلمه قبلا پیدا شده.", variant: "destructive", duration: 2000 });
      }
      clearSelection();
      return;
    }
    
    const isGenerallyValid = persianWords.has(currentWord) || persianWords.has(currentWord.replace(/ا/g, 'آ'));

    if (!isGenerallyValid) {
        toast({ title: "کلمه نامعتبر", description: `"${currentWord}" در لغت‌نامه یافت نشد.`, variant: "destructive", duration: 2000 });
    } else {
        toast({ title: "یافت نشد", description: `"${currentWord}" جزو کلمات این مرحله نیست.`, variant: "destructive", duration: 2000 });
    }

    clearSelection();
  }, [currentWord, currentLevel, foundWords, foundBonusWords, updateFilledLettersForWord, toast, clearSelection]);


  const handleLetterMouseDown = useCallback((index: number) => {
    if (disabledDraggableInput) return;
    playSound('sounds/letter-drag.mp3');
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
        handleSubmitWord(); 
      }
    };
  
    if (isDraggingWord) {
      document.addEventListener('mouseup', handleMouseUpGlobal);
      document.addEventListener('touchend', handleMouseUpGlobal);
    }
  
    return () => {
      document.removeEventListener('mouseup', handleMouseUpGlobal);
      document.removeEventListener('touchend', handleMouseUpGlobal);
    };
  }, [isDraggingWord, handleSubmitWord]); 


  const handleShuffleLetters = () => {
    setAvailableLetters(prev => [...prev].sort(() => Math.random() - 0.5));
    clearSelection();
  };

  const handleHint = () => {
    if (hintsUsedThisLevel >= MAX_HINTS_PER_LEVEL) {
      toast({ title: "راهنما تمام شد", description: "از تمام راهنماهای این مرحله استفاده کرده‌اید.", variant: "destructive" });
      return;
    }

    const unsolvedWordsEntries = currentLevel.targetWords.filter(tw => !foundWords.has(tw.word));
    if (unsolvedWordsEntries.length === 0) {
      toast({ title: "همه کلمات پیدا شدند!", description: "نیازی به راهنما نیست.", variant: "default" });
      return;
    }

    const wordToHintEntry = unsolvedWordsEntries[Math.floor(Math.random() * unsolvedWordsEntries.length)];
    const wordKey = wordToHintEntry.word;
    const currentLettersForWord = filledLetters.get(wordKey) || [];
    const currentHintsForWord = hintedIndices.get(wordKey) || new Set();

    let revealedInThisAction = false;
    for (let i = 0; i < wordToHintEntry.word.length; i++) {
      if (currentLettersForWord[i] === null && !currentHintsForWord.has(i)) {
        setFilledLetters(prevFilled => {
          const newFilled = new Map(prevFilled);
          const letters = [...(newFilled.get(wordKey) || Array(wordToHintEntry.word.length).fill(null))];
          letters[i] = wordToHintEntry.word[i];
          newFilled.set(wordKey, letters);
          return newFilled;
        });
        setHintedIndices(prevHinted => {
          const newHinted = new Map(prevHinted);
          const indices = new Set(newHinted.get(wordKey) || []);
          indices.add(i);
          newHinted.set(wordKey, indices);
          return newHinted;
        });
        setScore(prev => Math.max(0, prev - 15));
        setHintsUsedThisLevel(prev => prev + 1);
        toast({ title: "راهنما استفاده شد", description: `یک حرف نشان داده شد. (-15 امتیاز)` });
        revealedInThisAction = true;
        break;
      }
    }
    if (!revealedInThisAction) {
         toast({ title: "خطای راهنما", description: "امکان نمایش راهنمای بیشتر برای این کلمه نیست یا تمام حروف آن قبلا پر شده است.", variant: "destructive" });
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      toast({ title: "پایان بازی!", description: "شما تمام مراحل را با موفقیت به پایان رساندید!" });
      setCurrentLevelIndex(0); 
    }
    setIsLevelComplete(false);
  };
  
  const isHintDisabled = useMemo(() => hintsUsedThisLevel >= MAX_HINTS_PER_LEVEL || (currentLevel && foundWords.size === currentLevel.targetWords.length), [hintsUsedThisLevel, foundWords.size, currentLevel]);

  if (!currentLevel || !isInitialLoadComplete || filledLetters.size === 0) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-3 container mx-auto font-body">
            در حال بارگذاری مرحله...
        </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={currentLevelIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex flex-col items-center p-2 sm:p-3 container mx-auto font-body"
      >
        <GameHeader levelName={currentLevel.name} score={score} />
        
        <main className="flex-grow flex flex-col items-center justify-start w-full max-w-2xl mt-1">
          <div className="mt-2 mb-1 w-full">
            <CrosswordGrid 
              targetWords={currentLevel.targetWords}
              filledLetters={filledLetters}
              hintedIndices={hintedIndices}
            />
          </div>
          
          <div className="my-0 w-full">
            <CurrentWordDisplay word={currentWord} />
          </div>
          
          <div className="mt-2 mb-1 w-full">
            <LetterCircle 
              letters={availableLetters} 
              onLetterMouseDown={handleLetterMouseDown}
              onLetterMouseEnter={handleLetterMouseEnter}
              selectedIndices={selectedLetterIndices}
              disabled={disabledDraggableInput}
            />
          </div>
          
          <div className="mt-1 w-full">
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

    