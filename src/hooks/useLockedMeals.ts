import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Meal } from '@/types/user';
import { toast } from 'sonner';

interface LockedMeal {
  id: string;
  meal_id: string;
  meal_name: string;
  meal_type: string;
  meal_date: string;
  meal_data: Meal;
}

export const useLockedMeals = () => {
  const { user } = useAuth();
  const [lockedMeals, setLockedMeals] = useState<LockedMeal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch locked meals from database
  const fetchLockedMeals = useCallback(async () => {
    if (!user) {
      setLockedMeals([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('locked_meals')
        .select('*')
        .eq('user_id', user.id)
        .order('meal_date', { ascending: true });

      if (error) throw error;

      const mapped = (data || []).map(item => ({
        id: item.id,
        meal_id: item.meal_id,
        meal_name: item.meal_name,
        meal_type: item.meal_type,
        meal_date: item.meal_date,
        meal_data: item.meal_data as unknown as Meal,
      }));

      setLockedMeals(mapped);
    } catch (error) {
      console.error('Error fetching locked meals:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLockedMeals();
  }, [fetchLockedMeals]);

  // Lock a meal
  const lockMeal = async (meal: Meal, mealType: string, date: string) => {
    if (!user) {
      toast.error('Please sign in to lock meals');
      return false;
    }

    try {
      // Check if meal is already locked for this date and type
      const existing = lockedMeals.find(
        lm => lm.meal_date === date && lm.meal_type === mealType
      );

      if (existing) {
        // Update existing locked meal
        const { error } = await supabase
          .from('locked_meals')
          .update({
            meal_id: meal.id,
            meal_name: meal.name,
            meal_data: JSON.parse(JSON.stringify(meal)),
          })
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new locked meal
        const { error } = await supabase
          .from('locked_meals')
          .insert([{
            user_id: user.id,
            meal_id: meal.id,
            meal_name: meal.name,
            meal_type: mealType,
            meal_date: date,
            meal_data: JSON.parse(JSON.stringify(meal)),
          }]);

        if (error) throw error;
      }

      await fetchLockedMeals();
      toast.success(`${meal.name} locked for ${mealType}`);
      
      // Check for meal locking achievements
      checkMealAchievements();
      
      return true;
    } catch (error) {
      console.error('Error locking meal:', error);
      toast.error('Failed to lock meal');
      return false;
    }
  };

  // Unlock a meal
  const unlockMeal = async (date: string, mealType: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('locked_meals')
        .delete()
        .eq('user_id', user.id)
        .eq('meal_date', date)
        .eq('meal_type', mealType);

      if (error) throw error;

      await fetchLockedMeals();
      toast.success(`Meal unlocked`);
      return true;
    } catch (error) {
      console.error('Error unlocking meal:', error);
      toast.error('Failed to unlock meal');
      return false;
    }
  };

  // Check if a meal is locked for a specific date and type
  const isLocked = (date: string, mealType: string): boolean => {
    return lockedMeals.some(
      lm => lm.meal_date === date && lm.meal_type === mealType
    );
  };

  // Get locked meal for a specific date and type
  const getLockedMeal = (date: string, mealType: string): Meal | null => {
    const locked = lockedMeals.find(
      lm => lm.meal_date === date && lm.meal_type === mealType
    );
    return locked?.meal_data || null;
  };

  // Check for meal-related achievements
  const checkMealAchievements = async () => {
    if (!user) return;

    const totalLocked = lockedMeals.length + 1; // +1 for the one just added

    const mealAchievements = [
      { count: 5, type: 'meals_5', name: 'Meal Planner', description: 'Locked 5 meals!', icon: '🍽️' },
      { count: 10, type: 'meals_10', name: 'Dedicated Eater', description: 'Locked 10 meals!', icon: '🥗' },
      { count: 25, type: 'meals_25', name: 'Nutrition Ninja', description: 'Locked 25 meals!', icon: '🥷' },
      { count: 50, type: 'meals_50', name: 'Meal Master', description: 'Locked 50 meals!', icon: '👨‍🍳' },
    ];

    for (const achievement of mealAchievements) {
      if (totalLocked >= achievement.count) {
        const { error } = await supabase
          .from('achievements')
          .upsert({
            user_id: user.id,
            achievement_type: achievement.type,
            achievement_name: achievement.name,
            achievement_description: achievement.description,
            badge_icon: achievement.icon,
          }, { onConflict: 'user_id,achievement_type' });

        if (!error && totalLocked === achievement.count) {
          toast.success(`🎉 Achievement Unlocked: ${achievement.name}!`);
        }
      }
    }
  };

  // Get all locked meals for a date range (for grocery list)
  const getLockedMealsForDateRange = (startDate: string, endDate: string): LockedMeal[] => {
    return lockedMeals.filter(lm => {
      return lm.meal_date >= startDate && lm.meal_date <= endDate;
    });
  };

  return {
    lockedMeals,
    isLoading,
    lockMeal,
    unlockMeal,
    isLocked,
    getLockedMeal,
    getLockedMealsForDateRange,
    refetch: fetchLockedMeals,
  };
};
