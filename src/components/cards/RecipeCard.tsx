import { motion } from 'framer-motion';
import { Clock, Flame, Dumbbell, RefreshCw, Lock, Sparkles } from 'lucide-react';
import { Meal } from '@/types/user';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  meal: Meal;
  onSwap?: () => void;
  onLock?: () => void;
  onClick?: () => void;
  isLocked?: boolean;
  className?: string;
}

export const RecipeCard = ({ meal, onSwap, onLock, onClick, isLocked, className }: RecipeCardProps) => {
  const handleSwapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSwap?.();
  };

  const handleLockClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLock?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={cn(
        "group bg-card rounded-2xl overflow-hidden shadow-soft card-hover border border-border/50",
        onClick && "cursor-pointer",
        isLocked && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Locked Indicator */}
        {isLocked && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        )}
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {meal.tags.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-background/90 text-foreground text-xs backdrop-blur-sm"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {onLock && (
            <Button
              variant="glass"
              size="icon"
              className="h-8 w-8"
              onClick={handleLockClick}
            >
              <Lock className={cn("h-4 w-4", isLocked && "text-primary")} />
            </Button>
          )}
          {onSwap && !isLocked && (
            <Button
              variant="glass"
              size="icon"
              className="h-8 w-8"
              onClick={handleSwapClick}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Prep Time */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">{meal.prepTime} min</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
          {meal.name}
        </h3>

        {/* Nutrition Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-calories/10">
              <Flame className="h-4 w-4 text-calories" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{meal.calories}</p>
              <p className="text-[10px] text-muted-foreground">kcal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-protein/10">
              <Dumbbell className="h-4 w-4 text-protein" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{meal.protein}g</p>
              <p className="text-[10px] text-muted-foreground">protein</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-carbs/10">
              <span className="text-xs font-bold text-carbs">C</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{meal.carbs}g</p>
              <p className="text-[10px] text-muted-foreground">carbs</p>
            </div>
          </div>
        </div>

        {/* AI Tip */}
        {meal.aiTip && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
            <Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              {meal.aiTip}
            </p>
          </div>
        )}

        {/* Tap hint */}
        {onClick && (
          <p className="text-[10px] text-center text-muted-foreground mt-3">
            Tap for recipe details
          </p>
        )}
      </div>
    </motion.div>
  );
};
