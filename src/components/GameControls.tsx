
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Check, RotateCcw, Shuffle as ShuffleIcon, Lightbulb, Eye } from 'lucide-react';

interface GameControlsProps {
  onSubmit: () => void;
  onClear: () => void;
  onShuffle: () => void;
  onHint: () => void;
  onRevealWords: () => void;
  canSubmit: boolean;
  isHintDisabled: boolean;
}

const GameControls: FC<GameControlsProps> = ({ 
  onSubmit, 
  onClear, 
  onShuffle, 
  onHint, 
  onRevealWords,
  canSubmit, 
  isHintDisabled 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-6">
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
      <Button onClick={onRevealWords} variant="outline" size="lg" className="font-bold text-lg text-blue-600 border-blue-600 hover:bg-blue-100 hover:text-blue-700">
        <Eye className="ml-2 h-5 w-5" />
        نمایش کلمات
      </Button>
    </div>
  );
};

export default GameControls;
