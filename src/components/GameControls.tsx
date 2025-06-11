
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Shuffle as ShuffleIcon, Lightbulb } from 'lucide-react';

interface GameControlsProps {
  onShuffle: () => void;
  onHint: () => void;
  isHintDisabled: boolean;
}

const GameControls: FC<GameControlsProps> = ({ 
  onShuffle, 
  onHint, 
  isHintDisabled 
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button onClick={onShuffle} variant="secondary" size="lg" className="font-bold text-lg">
        <ShuffleIcon className="ml-2 h-5 w-5" />
        بر زدن
      </Button>
      <Button onClick={onHint} variant="outline" size="lg" className="font-bold text-lg" disabled={isHintDisabled}>
        <Lightbulb className="ml-2 h-5 w-5" />
        راهنما
      </Button>
    </div>
  );
};

export default GameControls;
