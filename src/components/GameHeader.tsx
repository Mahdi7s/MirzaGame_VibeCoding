
import type { FC } from 'react';
import { Award, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  levelName: string;
  score: number;
  onOpenLevelSelect: () => void;
}

const GameHeader: FC<GameHeaderProps> = ({ levelName, score, onOpenLevelSelect }) => {
  return (
    <header className="py-1 px-3 mb-1 bg-background/80 backdrop-blur-sm shadow-md rounded-lg w-full">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onOpenLevelSelect} className="text-primary hover:text-primary/80 md:hidden">
            <Menu className="w-6 h-6" />
            <span className="sr-only">انتخاب مرحله</span>
          </Button>
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-headline font-bold text-primary">واژه بهشت</h1>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base">
          <Button variant="outline" onClick={onOpenLevelSelect} className="hidden md:inline-flex text-sm px-3 py-1 h-auto">
            انتخاب مرحله
          </Button>
          <span className="font-semibold text-foreground/80">{levelName}</span>
          <div className="flex items-center gap-1 text-primary">
            <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
