
import type { FC } from 'react';

interface CurrentWordDisplayProps {
  word: string;
}

const CurrentWordDisplay: FC<CurrentWordDisplayProps> = ({ word }) => {
  return (
    <div className="p-1 h-10 rounded-lg shadow text-center flex items-center justify-center"> {/* Removed bg-background */}
      <span className="text-xl sm:text-2xl font-headline font-semibold text-primary tracking-wider">
        {word || ''}
      </span>
    </div>
  );
};

export default CurrentWordDisplay;
