import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sunrise, Sun, Cookie, Moon } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { RecipeCard } from '@/components/cards/RecipeCard';
import { RecipeDetailModal } from '@/components/modals/RecipeDetailModal';
import { SwapMealModal } from '@/components/modals/SwapMealModal';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMealsForDay, getSwapOptions } from '@/data/sampleMeals';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import { Meal } from '@/types/user';
import { toast } from 'sonner';

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
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [swapMeal, setSwapMeal] = useState<{ meal: Meal; type: 'breakfast' | 'lunch' | 'dinner' | 'snacks' } | null>(null);
  const [lockedMeals, setLockedMeals] = useState<Record<string, boolean>>({});
  const [swappedMeals, setSwappedMeals] = useState<Record<string, Meal>>({});
  const { userProfile } = useUser();
  
  const dietType = userProfile.dietType || 'anything';
  const mealsPerDay = userProfile.mealsPerDay || { breakfast: true, lunch: true, snacks: true, dinner: true };

  // Get meals for the selected day filtered by user profile
  const mealsForDay = useMemo(() => {
    return getMealsForDay(selectedDay, userProfile);
  }, [selectedDay, userProfile]);

  // Apply swapped meals
  const getDisplayedMeal = (mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', index: number) => {
    const key = `${selectedDay}-${mealType}-${index}`;
    return swappedMeals[key] || mealsForDay[mealType][index];
  };

  const getDisplayedMeals = () => {
    if (activeTab === 'all') {
      const meals: Meal[] = [];
      if (mealsPerDay.breakfast && mealsForDay.breakfast[0]) meals.push(getDisplayedMeal('breakfast', 0));
      if (mealsPerDay.lunch && mealsForDay.lunch[0]) meals.push(getDisplayedMeal('lunch', 0));
      if (mealsPerDay.snacks && mealsForDay.snacks[0]) meals.push(getDisplayedMeal('snacks', 0));
      if (mealsPerDay.dinner && mealsForDay.dinner[0]) meals.push(getDisplayedMeal('dinner', 0));
      return meals.filter(Boolean);
    }
    const mealType = activeTab as 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    if (!mealsPerDay[mealType]) return [];
    return [getDisplayedMeal(mealType, 0), getDisplayedMeal(mealType, 1)].filter(Boolean);
  };

  // Calculate nutrition for the day
  const dailyNutrition = useMemo(() => {
    const meals: Meal[] = [];
    if (mealsPerDay.breakfast) meals.push(getDisplayedMeal('breakfast', 0));
    if (mealsPerDay.lunch) meals.push(getDisplayedMeal('lunch', 0));
    if (mealsPerDay.snacks) meals.push(getDisplayedMeal('snacks', 0));
    if (mealsPerDay.dinner) meals.push(getDisplayedMeal('dinner', 0));
    
    return meals.filter(Boolean).reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  }, [mealsForDay, swappedMeals, mealsPerDay]);

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
  const displayedMeals = getDisplayedMeals();

  const getDietTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      vegan: 'Vegan',
      vegetarian: 'Vegetarian',
      non_vegetarian: 'Non-Vegetarian',
      keto: 'Keto',
      paleo: 'Paleo',
      pescatarian: 'Pescatarian',
      anything: 'All Foods',
    };
    return labels[type] || 'All Foods';
  };

  const getMealType = (meal: Meal): 'breakfast' | 'lunch' | 'dinner' | 'snacks' => {
    if (mealsForDay.breakfast.some(m => m?.id === meal.id)) return 'breakfast';
    if (mealsForDay.lunch.some(m => m?.id === meal.id)) return 'lunch';
    if (mealsForDay.dinner.some(m => m?.id === meal.id)) return 'dinner';
    return 'snacks';
  };

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsDetailModalOpen(true);
  };

  const handleSwapClick = (meal: Meal) => {
    const mealType = getMealType(meal);
    setSwapMeal({ meal, type: mealType });
    setIsSwapModalOpen(true);
  };

  const handleSwap = (newMeal: Meal) => {
    if (swapMeal) {
      const key = `${selectedDay}-${swapMeal.type}-0`;
      setSwappedMeals(prev => ({ ...prev, [key]: newMeal }));
      toast.success(`Swapped to ${newMeal.name}!`);
    }
  };

  const handleLockClick = (meal: Meal) => {
    const isCurrentlyLocked = lockedMeals[meal.id];
    setLockedMeals(prev => ({ ...prev, [meal.id]: !isCurrentlyLocked }));
    toast.success(isCurrentlyLocked ? `${meal.name} unlocked` : `${meal.name} locked for all days`);
  };

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Meal Plan</h1>
          <p className="text-muted-foreground">Your personalized weekly meal schedule</p>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            🍽️ {getDietTypeLabel(dietType)} Plan
          </div>
        </motion.div>

        {/* Week Selector */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-4 shadow-soft border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
            <span className="font-semibold text-foreground">This Week</span>
            <Button variant="ghost" size="icon"><ChevronRight className="h-5 w-5" /></Button>
          </div>
          <div className="flex gap-2">
            {weekDates.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={cn(
                  "flex-1 flex flex-col items-center py-3 rounded-xl transition-all duration-200",
                  selectedDay === index ? "bg-primary text-primary-foreground" : item.isToday ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )}
              >
                <span className="text-xs font-medium mb-1">{item.day}</span>
                <span className="text-lg font-bold">{item.date}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Nutrition Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-4 gap-3">
          {[
            { label: 'Calories', value: dailyNutrition.calories.toLocaleString(), unit: 'kcal', color: 'bg-calories' },
            { label: 'Protein', value: dailyNutrition.protein.toString(), unit: 'g', color: 'bg-protein' },
            { label: 'Carbs', value: dailyNutrition.carbs.toString(), unit: 'g', color: 'bg-carbs' },
            { label: 'Fats', value: dailyNutrition.fats.toString(), unit: 'g', color: 'bg-fats' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl p-3 text-center shadow-soft border border-border/50">
              <div className={cn("w-2 h-2 rounded-full mx-auto mb-2", stat.color)} />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.unit}</p>
            </div>
          ))}
        </motion.div>

        {/* Meal Type Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full h-auto p-1 bg-muted/50 rounded-xl grid grid-cols-5">
              {mealTabs.filter(tab => tab.value === 'all' || mealsPerDay[tab.value as keyof typeof mealsPerDay]).map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="rounded-lg py-2.5 text-xs font-medium data-[state=active]:bg-background data-[state=active]:shadow-soft">
                  {tab.icon && <tab.icon className="h-4 w-4 mr-1.5" />}
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {displayedMeals.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {displayedMeals.map((meal, index) => (
                    <motion.div key={meal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
                      <RecipeCard
                        meal={meal}
                        onClick={() => handleMealClick(meal)}
                        onSwap={() => handleSwapClick(meal)}
                        onLock={() => handleLockClick(meal)}
                        isLocked={lockedMeals[meal.id]}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No meals available for this category.</p>
                  <p className="text-sm mt-2">This meal type may not be selected in your preferences.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center text-xs text-muted-foreground">
          💡 Tap a recipe for details • Use swap to change meals • Lock to keep favorites
        </motion.p>
      </div>

      {/* Modals */}
      <RecipeDetailModal meal={selectedMeal} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} />
      <SwapMealModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        currentMeal={swapMeal?.meal || null}
        swapOptions={swapMeal ? getSwapOptions(swapMeal.meal.id, swapMeal.type, userProfile) : []}
        onSwap={handleSwap}
      />
    </AppLayout>
  );
};

export default MealPlanPage;
