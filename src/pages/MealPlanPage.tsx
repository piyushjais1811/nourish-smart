import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sunrise, Sun, Cookie, Moon } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { RecipeCard } from '@/components/cards/RecipeCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { sampleMeals, getMealsByType } from '@/data/sampleMeals';
import { cn } from '@/lib/utils';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const mealTabs = [
  { value: 'all', label: 'All', icon: null },
  { value: 'breakfast', label: 'Breakfast', icon: Sunrise },
  { value: 'lunch', label: 'Lunch', icon: Sun },
  { value: 'snacks', label: 'Snacks', icon: Cookie },
  { value: 'dinner', label: 'Dinner', icon: Moon },
];

const MealPlanPage = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [activeTab, setActiveTab] = useState('all');

  const getDisplayedMeals = () => {
    if (activeTab === 'all') {
      return sampleMeals;
    }
    return getMealsByType(activeTab as 'breakfast' | 'lunch' | 'dinner' | 'snacks');
  };

  // Get current week dates
  const getWeekDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    return weekDays.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return {
        day,
        date: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
      };
    });
  };

  const weekDates = getWeekDates();

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Meal Plan
          </h1>
          <p className="text-muted-foreground">
            Your personalized weekly meal schedule
          </p>
        </motion.div>

        {/* Week Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-4 shadow-soft border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="font-semibold text-foreground">This Week</span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex gap-2">
            {weekDates.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={cn(
                  "flex-1 flex flex-col items-center py-3 rounded-xl transition-all duration-200",
                  selectedDay === index
                    ? "bg-primary text-primary-foreground"
                    : item.isToday
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                <span className="text-xs font-medium mb-1">{item.day}</span>
                <span className="text-lg font-bold">{item.date}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Nutrition Overview for Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-4 gap-3"
        >
          {[
            { label: 'Calories', value: '1,700', unit: 'kcal', color: 'bg-calories' },
            { label: 'Protein', value: '117', unit: 'g', color: 'bg-protein' },
            { label: 'Carbs', value: '166', unit: 'g', color: 'bg-carbs' },
            { label: 'Fats', value: '62', unit: 'g', color: 'bg-fats' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-3 text-center shadow-soft border border-border/50"
            >
              <div className={cn("w-2 h-2 rounded-full mx-auto mb-2", stat.color)} />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.unit}</p>
            </div>
          ))}
        </motion.div>

        {/* Meal Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full h-auto p-1 bg-muted/50 rounded-xl grid grid-cols-5">
              {mealTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-lg py-2.5 text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-soft"
                >
                  {tab.icon && <tab.icon className="h-4 w-4 mr-1.5" />}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {getDisplayedMeals().map((meal, index) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                  >
                    <RecipeCard
                      meal={meal}
                      onSwap={() => console.log('Swap meal:', meal.id)}
                      onLock={() => console.log('Lock meal:', meal.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Swap hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground"
        >
          💡 Not feeling a meal? Tap the swap icon to change it!
        </motion.p>
      </div>
    </AppLayout>
  );
};

export default MealPlanPage;