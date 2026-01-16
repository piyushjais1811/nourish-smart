import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Flame, Dumbbell, ExternalLink, ChefHat, ShoppingBasket, Play } from 'lucide-react';
import { Meal } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface RecipeDetailModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeDetailModal = ({ meal, isOpen, onClose }: RecipeDetailModalProps) => {
  if (!meal) return null;

  const handleWatchVideo = () => {
    const searchQuery = encodeURIComponent(meal.name + ' recipe');
    window.open(`https://www.youtube.com/results?search_query=${searchQuery}`, '_blank');
  };

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
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:max-h-[85vh] bg-card rounded-2xl shadow-2xl border border-border z-50 overflow-hidden flex flex-col"
          >
            {/* Header Image */}
            <div className="relative h-48 shrink-0">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              
              {/* Close button */}
              <Button
                variant="glass"
                size="icon"
                onClick={onClose}
                className="absolute top-3 right-3 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Title overlay */}
              <div className="absolute bottom-3 left-4 right-4">
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {meal.name}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {meal.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-background/90 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {/* Nutrition Stats */}
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-calories/10 rounded-xl p-3 text-center">
                    <Flame className="h-4 w-4 text-calories mx-auto mb-1" />
                    <p className="text-sm font-bold text-foreground">{meal.calories}</p>
                    <p className="text-[10px] text-muted-foreground">kcal</p>
                  </div>
                  <div className="bg-protein/10 rounded-xl p-3 text-center">
                    <Dumbbell className="h-4 w-4 text-protein mx-auto mb-1" />
                    <p className="text-sm font-bold text-foreground">{meal.protein}g</p>
                    <p className="text-[10px] text-muted-foreground">protein</p>
                  </div>
                  <div className="bg-carbs/10 rounded-xl p-3 text-center">
                    <span className="text-xs font-bold text-carbs block mb-1">C</span>
                    <p className="text-sm font-bold text-foreground">{meal.carbs}g</p>
                    <p className="text-[10px] text-muted-foreground">carbs</p>
                  </div>
                  <div className="bg-fats/10 rounded-xl p-3 text-center">
                    <span className="text-xs font-bold text-fats block mb-1">F</span>
                    <p className="text-sm font-bold text-foreground">{meal.fats}g</p>
                    <p className="text-[10px] text-muted-foreground">fats</p>
                  </div>
                </div>

                {/* Prep Time */}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Prep time: {meal.prepTime} minutes</span>
                </div>

                <Separator />

                {/* Ingredients */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBasket className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">Ingredients</h3>
                  </div>
                  <ul className="space-y-2">
                    {meal.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Instructions */}
                {meal.instructions && meal.instructions.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ChefHat className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Instructions</h3>
                    </div>
                    <ol className="space-y-3">
                      {meal.instructions.map((step, index) => (
                        <li key={index} className="flex gap-3 text-sm">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground leading-relaxed pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* AI Tip */}
                {meal.aiTip && (
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-xs text-muted-foreground">
                      💡 <span className="font-medium text-primary">Tip:</span> {meal.aiTip}
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer with Video Button */}
            <div className="p-4 border-t border-border shrink-0">
              <Button 
                variant="hero" 
                className="w-full" 
                onClick={handleWatchVideo}
              >
                <Play className="h-4 w-4 mr-2" />
                Watch Recipe Video
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
