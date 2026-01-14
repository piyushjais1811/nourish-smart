import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NutritionRingProps {
  value: number;
  max: number;
  label: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
}

export const NutritionRing = ({
  value,
  max,
  label,
  color,
  size = 'md',
  showPercentage = true,
}: NutritionRingProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const radius = size === 'sm' ? 24 : size === 'md' ? 36 : 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
      <svg className="w-full h-full -rotate-90">
        {/* Background circle */}
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/50"
        />
        {/* Progress circle */}
        <motion.circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage ? (
          <>
            <span className={cn(
              "font-bold text-foreground",
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-lg' : 'text-2xl'
            )}>
              {Math.round(percentage)}%
            </span>
            <span className={cn(
              "text-muted-foreground",
              size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs'
            )}>
              {label}
            </span>
          </>
        ) : (
          <>
            <span className={cn(
              "font-bold text-foreground",
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-lg'
            )}>
              {value}
            </span>
            <span className={cn(
              "text-muted-foreground",
              size === 'sm' ? 'text-[8px]' : size === 'md' ? 'text-[10px]' : 'text-xs'
            )}>
              {label}
            </span>
          </>
        )}
      </div>
    </div>
  );
};
