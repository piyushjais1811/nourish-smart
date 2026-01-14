import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const GoalCard = ({
  title,
  description,
  icon: Icon,
  color,
  isSelected,
  onClick,
}: GoalCardProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left",
        isSelected
          ? "border-primary bg-primary/5 shadow-medium"
          : "border-border bg-card hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl",
            color
          )}
        >
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            isSelected
              ? "border-primary bg-primary"
              : "border-muted-foreground"
          )}
        >
          {isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-primary-foreground"
            />
          )}
        </div>
      </div>
    </motion.button>
  );
};
