import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MealTypeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  calories: number;
  protein: number;
  onClick?: () => void;
  className?: string;
}

export const MealTypeCard = ({
  title,
  description,
  icon: Icon,
  image,
  calories,
  protein,
  onClick,
  className,
}: MealTypeCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl bg-card shadow-soft card-hover border border-border/50 text-left",
        className
      )}
    >
      <div className="flex items-center gap-4 p-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/10" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Icon className="h-4 w-4 text-primary" />
            <h3 className="font-serif font-semibold text-foreground">{title}</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{description}</p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-calories">{calories} kcal</span>
            <span className="text-xs font-medium text-protein">{protein}g protein</span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};
