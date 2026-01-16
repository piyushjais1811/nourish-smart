import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, Check } from 'lucide-react';
import { Meal } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SwapMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMeal: Meal | null;
  swapOptions: Meal[];
  onSwap: (newMeal: Meal) => void;
}

export const SwapMealModal = ({ isOpen, onClose, currentMeal, swapOptions, onSwap }: SwapMealModalProps) => {
  if (!currentMeal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg max-h-[80vh] bg-card rounded-2xl shadow-2xl border border-border z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-primary" />
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Swap Meal
                </h2>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Current Meal */}
            <div className="p-4 bg-muted/30 border-b border-border shrink-0">
              <p className="text-xs text-muted-foreground mb-2">Currently selected:</p>
              <div className="flex items-center gap-3">
                <img
                  src={currentMeal.image}
                  alt={currentMeal.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{currentMeal.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentMeal.calories} kcal • {currentMeal.protein}g protein
                  </p>
                </div>
              </div>
            </div>

            {/* Swap Options */}
            <ScrollArea className="flex-1 [&>div>div]:!block" type="always">
              <div className="p-4">
                <p className="text-sm font-medium text-foreground mb-3">
                  Choose an alternative ({swapOptions.length} available):
                </p>
                <div className="space-y-3">
                  {swapOptions.map((meal) => (
                    <motion.button
                      key={meal.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        onSwap(meal);
                        onClose();
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors text-left"
                    >
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{meal.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {meal.calories} kcal • {meal.protein}g protein
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {meal.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Check className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
