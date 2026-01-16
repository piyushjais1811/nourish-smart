import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Award, Lock, Trophy, Flame, Target, Utensils, Calendar, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Achievement {
  type: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'streak' | 'meals' | 'goals';
}

const allAchievements: Achievement[] = [
  // Streak achievements
  { type: 'streak_3', name: '3-Day Warrior', description: 'Maintain a 3-day streak', icon: '🔥', unlocked: false, category: 'streak' },
  { type: 'streak_7', name: 'Week Champion', description: 'Maintain a 7-day streak', icon: '⭐', unlocked: false, category: 'streak' },
  { type: 'streak_14', name: 'Fortnight Fighter', description: 'Maintain a 14-day streak', icon: '💪', unlocked: false, category: 'streak' },
  { type: 'streak_30', name: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '🏆', unlocked: false, category: 'streak' },
  
  // Meal achievements
  { type: 'first_lock', name: 'First Choice', description: 'Lock your first meal', icon: '🔒', unlocked: false, category: 'meals' },
  { type: 'lock_10', name: 'Meal Planner', description: 'Lock 10 meals', icon: '📋', unlocked: false, category: 'meals' },
  { type: 'lock_50', name: 'Nutrition Ninja', description: 'Lock 50 meals', icon: '🥷', unlocked: false, category: 'meals' },
  { type: 'week_complete', name: 'Week Warrior', description: 'Complete a full week of meal planning', icon: '📅', unlocked: false, category: 'meals' },
  
  // Goals achievements
  { type: 'profile_complete', name: 'All Set Up', description: 'Complete your profile', icon: '✅', unlocked: false, category: 'goals' },
  { type: 'first_week', name: 'Getting Started', description: 'Complete your first week', icon: '🌱', unlocked: false, category: 'goals' },
  { type: 'goal_setter', name: 'Goal Setter', description: 'Set your fitness goals', icon: '🎯', unlocked: false, category: 'goals' },
  { type: 'healthy_eater', name: 'Healthy Eater', description: 'Follow your meal plan for 7 days', icon: '🥗', unlocked: false, category: 'goals' },
];

const AchievementsPage = () => {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>(allAchievements);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAchievements();
    }
  }, [user]);

  const loadAchievements = async () => {
    if (!user) return;

    const { data: unlockedAchievements } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', user.id);

    const updatedAchievements = allAchievements.map(achievement => {
      const unlocked = unlockedAchievements?.find(a => a.achievement_type === achievement.type);
      return {
        ...achievement,
        unlocked: !!unlocked,
        unlockedAt: unlocked?.unlocked_at,
      };
    });

    setAchievements(updatedAchievements);
    setIsLoading(false);
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  const categoryIcons = {
    streak: Flame,
    meals: Utensils,
    goals: Target,
  };

  const categoryNames = {
    streak: 'Streak Achievements',
    meals: 'Meal Achievements',
    goals: 'Goal Achievements',
  };

  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

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
          <h1 className="font-serif text-2xl font-bold text-foreground">Achievements</h1>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-success rounded-2xl p-6 text-center text-primary-foreground"
        >
          <Trophy className="h-12 w-12 mx-auto mb-3" />
          <h2 className="font-serif text-3xl font-bold mb-1">
            {unlockedCount} / {totalCount}
          </h2>
          <p className="opacity-90">Achievements Unlocked</p>
        </motion.div>

        {/* Achievement Categories */}
        {Object.entries(groupedAchievements).map(([category, categoryAchievements], categoryIndex) => {
          const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + categoryIndex * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CategoryIcon className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {categoryNames[category as keyof typeof categoryNames]}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {categoryAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.type}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className={`relative bg-card rounded-2xl p-4 shadow-soft border transition-all ${
                      achievement.unlocked 
                        ? 'border-primary/30 bg-primary/5' 
                        : 'border-border/50 opacity-60'
                    }`}
                  >
                    {!achievement.unlocked && (
                      <div className="absolute top-2 right-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {achievement.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-primary mt-2">
                        Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default AchievementsPage;
