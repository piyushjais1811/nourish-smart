import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export const ProgressSteps = ({ currentStep, totalSteps, labels }: ProgressStepsProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step circle */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "bg-gradient-success text-primary-foreground shadow-glow",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  stepNumber
                )}
              </motion.div>

              {/* Connecting line */}
              {index < totalSteps - 1 && (
                <div className="flex-1 h-1 mx-2">
                  <motion.div
                    className="h-full rounded-full bg-muted overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: '0%' }}
                      animate={{
                        width: isCompleted ? '100%' : isCurrent ? '50%' : '0%',
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Labels */}
      {labels && (
        <div className="flex justify-between">
          {labels.map((label, index) => (
            <span
              key={index}
              className={cn(
                "text-xs text-center flex-1",
                index + 1 === currentStep ? "text-primary font-medium" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
