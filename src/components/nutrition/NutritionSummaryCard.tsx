import { motion } from 'framer-motion';
import { NutritionRing } from './NutritionRing';
import { NutritionSummary } from '@/types/user';

interface NutritionSummaryCardProps {
  summary: NutritionSummary;
}

export const NutritionSummaryCard = ({ summary }: NutritionSummaryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
    >
      <h3 className="font-serif text-lg font-semibold text-foreground mb-6">
        Today's Nutrition
      </h3>

      <div className="flex items-center justify-center mb-6">
        <NutritionRing
          value={summary.calories}
          max={summary.targetCalories}
          label="Calories"
          color="hsl(var(--calories))"
          size="lg"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <NutritionRing
            value={summary.protein}
            max={summary.targetProtein}
            label="Protein"
            color="hsl(var(--protein))"
            size="sm"
          />
          <span className="mt-2 text-xs text-muted-foreground">
            {summary.protein}g / {summary.targetProtein}g
          </span>
        </div>
        <div className="flex flex-col items-center">
          <NutritionRing
            value={summary.carbs}
            max={summary.targetCarbs}
            label="Carbs"
            color="hsl(var(--carbs))"
            size="sm"
          />
          <span className="mt-2 text-xs text-muted-foreground">
            {summary.carbs}g / {summary.targetCarbs}g
          </span>
        </div>
        <div className="flex flex-col items-center">
          <NutritionRing
            value={summary.fats}
            max={summary.targetFats}
            label="Fats"
            color="hsl(var(--fats))"
            size="sm"
          />
          <span className="mt-2 text-xs text-muted-foreground">
            {summary.fats}g / {summary.targetFats}g
          </span>
        </div>
      </div>

      <p className="mt-6 text-xs text-center text-muted-foreground">
        Try to stay within your green zone to reach your goal faster.
      </p>
    </motion.div>
  );
};
