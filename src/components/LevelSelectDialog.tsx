
import type { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Level } from '@/data/levels';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check } from 'lucide-react';

interface LevelSelectDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  levels: Level[];
  onSelectLevel: (levelIndex: number) => void;
  currentLevelIndex: number;
}

const LevelSelectDialog: FC<LevelSelectDialogProps> = ({
  isOpen,
  onOpenChange,
  levels,
  onSelectLevel,
  currentLevelIndex,
}) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="font-body sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-headline text-center text-primary">
            انتخاب مرحله
          </DialogTitle>
          <DialogDescription className="text-center text-foreground/80 py-2">
            مرحله مورد نظر خود را انتخاب کنید.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-2">
          <div className="flex flex-col gap-2">
            {levels.map((level, index) => (
              <Button
                key={level.id}
                variant={index === currentLevelIndex ? "default" : "outline"}
                onClick={() => {
                  onSelectLevel(index);
                  // onOpenChange(false); // Dialog will be closed by parent calling handleSelectLevel
                }}
                className="w-full justify-between text-lg px-4 py-3 h-auto"
              >
                <span>{level.name}</span>
                {index === currentLevelIndex && <Check className="w-5 h-5 text-primary-foreground" />}
              </Button>
            ))}
          </div>
        </ScrollArea>
        {/* <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="mt-2">بستن</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default LevelSelectDialog;
