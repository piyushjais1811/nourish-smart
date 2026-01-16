import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, TrendingUp, Calendar, Sunrise, Sun, Cookie, Moon, ChevronRight, Sparkles } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { NutritionSummaryCard } from '@/components/nutrition/NutritionSummaryCard';
import { MealTypeCard } from '@/components/cards/MealTypeCard';
import { Button } from '@/components/ui/button';
import { NutritionSummary } from '@/types/user';
import { getMealsForDay } from '@/data/sampleMeals';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { userProfile } = useUser();
  const { user } = useAuth();
  const [streak, setStreak] = useState(1);
  const dietType = userProfile.dietType || 'anything';

  // Load streak from database
  useEffect(() => {
    const loadStreak = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('streak_count')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (data?.streak_count) {
        setStreak(data.streak_count);
      }
    };
    loadStreak();
  }, [user]);
  
  // Get today's day index (0 = Monday, 6 = Sunday)
  const todayIndex = useMemo(() => {
    const day = new Date().getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday=0 to 6, Monday=1 to 0
  }, []);
  
  // Get meals for today based on user profile
  const todayMeals = useMemo(() => {
    return getMealsForDay(todayIndex, userProfile);
  }, [todayIndex, userProfile]);
  
  const breakfastMeal = todayMeals.breakfast[0];
  const lunchMeal = todayMeals.lunch[0];
  const snackMeal = todayMeals.snacks[0];
  const dinnerMeal = todayMeals.dinner[0];
  
  const meals = [
    breakfastMeal && {
      type: 'breakfast' as const,
      title: 'Breakfast',
      icon: Sunrise,
      description: breakfastMeal.name,
      image: breakfastMeal.image,
      calories: breakfastMeal.calories,
      protein: breakfastMeal.protein,
    },
    lunchMeal && {
      type: 'lunch' as const,
      title: 'Lunch',
      icon: Sun,
      description: lunchMeal.name,
      image: lunchMeal.image,
      calories: lunchMeal.calories,
      protein: lunchMeal.protein,
    },
    snackMeal && {
      type: 'snacks' as const,
      title: 'Snacks',
      icon: Cookie,
      description: snackMeal.name,
      image: snackMeal.image,
      calories: snackMeal.calories,
      protein: snackMeal.protein,
    },
    dinnerMeal && {
      type: 'dinner' as const,
      title: 'Dinner',
      icon: Moon,
      description: dinnerMeal.name,
      image: dinnerMeal.image,
      calories: dinnerMeal.calories,
      protein: dinnerMeal.protein,
    },
  ].filter(Boolean);
  
  // Calculate nutrition summary from actual meals
  const nutritionSummary: NutritionSummary = useMemo(() => {
    const allMeals = [breakfastMeal, lunchMeal, snackMeal, dinnerMeal].filter(Boolean);
    const totals = allMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
    
    return {
      ...totals,
      targetCalories: 2000,
      targetProtein: 150,
      targetCarbs: 200,
      targetFats: 70,
    };
  }, [breakfastMeal, lunchMeal, snackMeal, dinnerMeal]);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  
  const goalPercentage = Math.round((nutritionSummary.calories / nutritionSummary.targetCalories) * 100);

  // Get diet type display name
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

  return (
    <AppLayout>
      <div className="container py-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <p className="text-muted-foreground">{today}</p>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Good morning! 👋
          </h1>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            🍽️ {getDietTypeLabel(dietType)} Plan
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-gradient-success rounded-2xl p-5 text-primary-foreground">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-5 w-5" />
              <span className="text-sm font-medium opacity-90">Daily Goal</span>
            </div>
            <p className="text-3xl font-bold">{goalPercentage}%</p>
            <p className="text-sm opacity-75">{nutritionSummary.calories.toLocaleString()} / {nutritionSummary.targetCalories.toLocaleString()} kcal</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Streak</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{streak} days</p>
            <p className="text-sm text-muted-foreground">Keep it going! 🔥</p>
          </div>
        </motion.div>

        {/* Motivation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
        >
          <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Daily tip</p>
            <p className="text-sm text-muted-foreground">
              Stay hydrated! Aim for 8 glasses of water today to support your metabolism.
            </p>
          </div>
        </motion.div>

        {/* Today's Meals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Today's Meals
            </h2>
            <Link to="/meal-plan">
              <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {meals.map((meal, index) => (
              <motion.div
                key={meal.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
              >
                <Link to={`/meal-plan?meal=${meal.type}`}>
                  <MealTypeCard
                    title={meal.title}
                    description={meal.description}
                    icon={meal.icon}
                    image={meal.image}
                    calories={meal.calories}
                    protein={meal.protein}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Nutrition Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <NutritionSummaryCard summary={nutritionSummary} />
        </motion.div>

        {/* Weekly Overview Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/meal-plan">
            <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-soft card-hover flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Weekly Meal Plan</h3>
                  <p className="text-sm text-muted-foreground">View and customize your week</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
