import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, Flame, Calendar, Target, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { NutritionRing } from '@/components/nutrition/NutritionRing';

interface Stats {
  streakCount: number;
  totalMealsLocked: number;
  totalAchievements: number;
  avgCalories: number;
  avgProtein: number;
  avgCarbs: number;
  avgFats: number;
  daysActive: number;
}

const StatsPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
    streakCount: 1,
    totalMealsLocked: 0,
    totalAchievements: 0,
    avgCalories: 0,
    avgProtein: 0,
    avgCarbs: 0,
    avgFats: 0,
    daysActive: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    if (!user) return;

    try {
      // Get profile for streak
      const { data: profile } = await supabase
        .from('profiles')
        .select('streak_count, created_at')
        .eq('user_id', user.id)
        .maybeSingle();

      // Get locked meals
      const { data: lockedMeals } = await supabase
        .from('locked_meals')
        .select('meal_data')
        .eq('user_id', user.id);

      // Get achievements
      const { data: achievements } = await supabase
        .from('achievements')
        .select('id')
        .eq('user_id', user.id);

      // Calculate averages
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;

      lockedMeals?.forEach(meal => {
        const mealData = meal.meal_data as any;
        totalCalories += mealData.calories || 0;
        totalProtein += mealData.protein || 0;
        totalCarbs += mealData.carbs || 0;
        totalFats += mealData.fats || 0;
      });

      const mealCount = lockedMeals?.length || 1;

      // Calculate days active
      const createdAt = profile?.created_at ? new Date(profile.created_at) : new Date();
      const daysActive = Math.max(1, Math.floor((new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)) + 1);

      setStats({
        streakCount: profile?.streak_count || 1,
        totalMealsLocked: lockedMeals?.length || 0,
        totalAchievements: achievements?.length || 0,
        avgCalories: Math.round(totalCalories / mealCount),
        avgProtein: Math.round(totalProtein / mealCount),
        avgCarbs: Math.round(totalCarbs / mealCount),
        avgFats: Math.round(totalFats / mealCount),
        daysActive,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    { icon: Flame, label: 'Current Streak', value: `${stats.streakCount} days`, color: 'text-accent' },
    { icon: Calendar, label: 'Days Active', value: `${stats.daysActive} days`, color: 'text-primary' },
    { icon: Target, label: 'Meals Locked', value: stats.totalMealsLocked.toString(), color: 'text-primary' },
    { icon: TrendingUp, label: 'Achievements', value: stats.totalAchievements.toString(), color: 'text-accent' },
  ];

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-foreground">Progress & Stats</h1>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {statCards.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-4 shadow-soft border border-border/50"
            >
              <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Average Nutrition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
        >
          <h2 className="font-serif text-lg font-bold text-foreground mb-4">
            Average Nutrition Per Meal
          </h2>
          
          {stats.totalMealsLocked > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <NutritionRing value={stats.avgCalories} max={2000} color="hsl(var(--calories))" size="sm" label="cal" showPercentage={false} />
                <p className="text-xs text-muted-foreground mt-2">Calories</p>
              </div>
              <div className="text-center">
                <NutritionRing value={stats.avgProtein} max={50} color="hsl(var(--protein))" size="sm" label="g" showPercentage={false} />
                <p className="text-xs text-muted-foreground mt-2">Protein</p>
              </div>
              <div className="text-center">
                <NutritionRing value={stats.avgCarbs} max={75} color="hsl(var(--carbs))" size="sm" label="g" showPercentage={false} />
                <p className="text-xs text-muted-foreground mt-2">Carbs</p>
              </div>
              <div className="text-center">
                <NutritionRing value={stats.avgFats} max={30} color="hsl(var(--fats))" size="sm" label="g" showPercentage={false} />
                <p className="text-xs text-muted-foreground mt-2">Fats</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Lock some meals to see your average nutrition stats!
            </p>
          )}
        </motion.div>

        {/* Streak History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-success rounded-2xl p-6 text-primary-foreground"
        >
          <div className="flex items-center gap-3 mb-4">
            <Flame className="h-8 w-8" />
            <div>
              <p className="text-sm opacity-90">Current Streak</p>
              <p className="text-3xl font-bold">{stats.streakCount} days 🔥</p>
            </div>
          </div>
          <p className="text-sm opacity-90">
            Keep logging in daily to maintain your streak and unlock special achievements!
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default StatsPage;
