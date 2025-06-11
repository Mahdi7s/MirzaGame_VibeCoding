
import type { FC } from 'react';
import { Award, Sparkles } from 'lucide-react';

interface GameHeaderProps {
  levelName: string;
  score: number;
}

const GameHeader: FC<GameHeaderProps> = ({ levelName, score }) => {
  return (
    <header className="py-2 px-3 mb-2 bg-background/80 backdrop-blur-sm shadow-md rounded-lg w-full">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-1 sm:mb-0">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-headline font-bold text-primary">واژه بهشت</h1>
        </div>
        <div className="flex items-center gap-4 sm:gap-6 text-base sm:text-lg">
          <span className="font-semibold text-foreground/80">{levelName}</span>
          <div className="flex items-center gap-1 text-primary">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
