
import type { FC } from 'react';
import { Award, Sparkles } from 'lucide-react';

interface GameHeaderProps {
  levelName: string;
  score: number;
}

const GameHeader: FC<GameHeaderProps> = ({ levelName, score }) => {
  return (
    <header className="py-1 px-3 mb-1 bg-background/80 backdrop-blur-sm shadow-md rounded-lg w-full">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-1 sm:mb-0">
          <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
          <h1 className="text-xl sm:text-2xl font-headline font-bold text-primary">واژه بهشت</h1>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base">
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
