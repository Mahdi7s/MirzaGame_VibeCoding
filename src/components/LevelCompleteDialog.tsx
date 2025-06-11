import type { FC } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { PartyPopper, CheckCircle } from 'lucide-react';

interface LevelCompleteDialogProps {
  isOpen: boolean;
  onNextLevel: () => void;
  score: number;
  levelName: string;
  isLastLevel: boolean;
}

const LevelCompleteDialog: FC<LevelCompleteDialogProps> = ({ isOpen, onNextLevel, score, levelName, isLastLevel }) => {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={() => {}}>
      <AlertDialogContent className="font-body max-w-xs sm:max-w-sm">
        <AlertDialogHeader>
          <div className="flex justify-center mb-3">
            <PartyPopper className="w-14 h-14 sm:w-16 sm:h-16 text-primary" />
          </div>
          <AlertDialogTitle className="text-xl sm:text-2xl font-headline text-center text-primary">
            تبریک! {levelName} تکمیل شد!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base sm:text-lg text-foreground/80 py-3">
            امتیاز شما: <span className="font-bold text-accent">{score}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2 justify-center pt-2">
          {!isLastLevel ? (
            <AlertDialogAction asChild>
              <Button onClick={onNextLevel} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                <CheckCircle className="ml-2" />
                مرحله بعد
              </Button>
            </AlertDialogAction>
          ) : (
            <p className="text-lg text-center text-green-600 font-bold">شما تمام مراحل را به پایان رساندید!</p>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LevelCompleteDialog;
