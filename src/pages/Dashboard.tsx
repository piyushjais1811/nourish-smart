import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, TrendingUp, Calendar, Sunrise, Sun, Cookie, Moon, ChevronRight, Sparkles } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { NutritionSummaryCard } from '@/components/nutrition/NutritionSummaryCard';
import { MealTypeCard } from '@/components/cards/MealTypeCard';
import { Button } from '@/components/ui/button';
import { NutritionSummary } from '@/types/user';
import { getMealsByType } from '@/data/sampleMeals';
import mealBreakfast from '@/assets/meal-breakfast.jpg';
import mealLunch from '@/assets/meal-lunch.jpg';
import mealDinner from '@/assets/meal-dinner.jpg';
import mealSnacks from '@/assets/meal-snacks.jpg';

const nutritionSummary: NutritionSummary = {
  calories: 1420,
  protein: 98,
  carbs: 145,
  fats: 52,
  targetCalories: 2000,
  targetProtein: 150,
  targetCarbs: 200,
  targetFats: 70,
};

const meals = [
  {
    type: 'breakfast' as const,
    title: 'Breakfast',
    icon: Sunrise,
    description: 'Berry Yogurt Parfait',
    image: mealBreakfast,
    calories: 320,
    protein: 18,
  },
  {
    type: 'lunch' as const,
    title: 'Lunch',
    icon: Sun,
    description: 'Grilled Chicken Quinoa Bowl',
    image: mealLunch,
    calories: 520,
    protein: 42,
  },
  {
    type: 'snacks' as const,
    title: 'Snacks',
    icon: Cookie,
    description: 'Energy Snack Platter',
    image: mealSnacks,
    calories: 280,
    protein: 12,
  },
  {
    type: 'dinner' as const,
    title: 'Dinner',
    icon: Moon,
    description: 'Grilled Salmon with Sweet Potato',
    image: mealDinner,
    calories: 580,
    protein: 45,
  },
];

const Dashboard = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

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
            <p className="text-3xl font-bold">71%</p>
            <p className="text-sm opacity-75">1,420 / 2,000 kcal</p>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Streak</span>
            </div>
            <p className="text-3xl font-bold text-foreground">7 days</p>
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