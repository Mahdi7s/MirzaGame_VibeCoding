
import type { FC } from 'react';

interface CurrentWordDisplayProps {
  word: string;
}

const CurrentWordDisplay: FC<CurrentWordDisplayProps> = ({ word }) => {
  return (
    <div className="p-2 h-12 bg-background rounded-lg shadow text-center flex items-center justify-center">
      <span className="text-2xl sm:text-3xl font-headline font-semibold text-primary tracking-wider">
        {word || <span className="text-muted-foreground">انتخاب حروف</span>}
      </span>
    </div>
  );
};

export default CurrentWordDisplay;
