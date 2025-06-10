import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Check, RotateCcw, Shuffle as ShuffleIcon, Lightbulb } from 'lucide-react';

interface GameControlsProps {
  onSubmit: () => void;
  onClear: () => void;
  onShuffle: () => void;
  onHint: () => void;
  canSubmit: boolean;
  isHintDisabled: boolean;
}

const GameControls: FC<GameControlsProps> = ({ onSubmit, onClear, onShuffle, onHint, canSubmit, isHintDisabled }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
      <Button onClick={onSubmit} disabled={!canSubmit} size="lg" className="font-bold text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
        <Check className="ml-2 h-6 w-6" />
        ثبت
      </Button>
      <Button onClick={onClear} variant="outline" size="lg" className="font-bold text-lg">
        <RotateCcw className="ml-2 h-5 w-5" />
        پاک کردن
      </Button>
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
