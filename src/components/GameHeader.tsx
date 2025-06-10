import type { FC } from 'react';
import { Award, Sparkles } from 'lucide-react';

interface GameHeaderProps {
  levelName: string;
  score: number;
}

const GameHeader: FC<GameHeaderProps> = ({ levelName, score }) => {
  return (
    <header className="py-4 px-6 mb-4 bg-background/80 backdrop-blur-sm shadow-md rounded-lg">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-2 sm:mb-0">
          <Sparkles className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-headline font-bold text-primary">واژه بهشت</h1>
        </div>
        <div className="flex items-center gap-6 text-lg">
          <span className="font-semibold text-foreground/80">{levelName}</span>
          <div className="flex items-center gap-1 text-primary">
            <Award className="w-6 h-6" />
            <span className="font-bold">{score}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
