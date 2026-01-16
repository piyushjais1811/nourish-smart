import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Trash2, Download, Bell, BellOff, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const SettingsPage = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notifications, setNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(savedTheme);
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_settings')
      .select('theme, notifications_enabled')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setTheme(data.theme as 'light' | 'dark');
      setNotifications(data.notifications_enabled);
      document.documentElement.classList.toggle('dark', data.theme === 'dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    if (user) {
      await supabase
        .from('user_settings')
        .update({ theme: newTheme })
        .eq('user_id', user.id);
    }
    
    toast.success(`Theme changed to ${newTheme} mode`);
  };

  const toggleNotifications = async () => {
    const newValue = !notifications;
    setNotifications(newValue);
    
    if (user) {
      await supabase
        .from('user_settings')
        .update({ notifications_enabled: newValue })
        .eq('user_id', user.id);
    }
    
    toast.success(`Notifications ${newValue ? 'enabled' : 'disabled'}`);
  };

  const clearData = async () => {
    if (!user) return;
    setIsLoading(true);
    
    try {
      // Delete locked meals
      await supabase.from('locked_meals').delete().eq('user_id', user.id);
      
      // Reset profile to defaults
      await supabase
        .from('profiles')
        .update({
          gender: null,
          age: null,
          height: null,
          weight: null,
          activity_level: null,
          fitness_goal: null,
          target_weight: null,
          timeframe: null,
          diet_type: null,
          meal_variety: null,
          meals_per_day: { breakfast: true, lunch: true, snacks: true, dinner: true },
          allergies: [],
          custom_allergies: null,
          streak_count: 1,
        })
        .eq('user_id', user.id);

      toast.success('All data has been cleared');
    } catch (error) {
      toast.error('Failed to clear data');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadMealHistory = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      // Get locked meals for the past week
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const { data: lockedMeals } = await supabase
        .from('locked_meals')
        .select('*')
        .eq('user_id', user.id)
        .gte('meal_date', weekAgo.toISOString().split('T')[0])
        .order('meal_date', { ascending: true });

      if (!lockedMeals || lockedMeals.length === 0) {
        toast.info('No meal history found for the past week');
        setIsLoading(false);
        return;
      }

      // Group by date
      const mealsByDate: Record<string, any[]> = {};
      lockedMeals.forEach(meal => {
        if (!mealsByDate[meal.meal_date]) {
          mealsByDate[meal.meal_date] = [];
        }
        mealsByDate[meal.meal_date].push(meal);
      });

      // Calculate totals
      let html = `
<!DOCTYPE html>
<html>
<head>
  <title>Meal History - NutriPlan</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
    h1 { color: #2d5a3d; border-bottom: 2px solid #2d5a3d; padding-bottom: 10px; }
    h2 { color: #4a7c59; margin-top: 30px; }
    .date-section { margin-bottom: 30px; border: 1px solid #ddd; border-radius: 8px; padding: 20px; }
    .meal { margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 4px; }
    .meal-type { font-weight: bold; color: #2d5a3d; }
    .nutrition { display: flex; gap: 20px; margin-top: 5px; font-size: 14px; color: #666; }
    .daily-total { background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 15px; }
    .footer { margin-top: 40px; text-align: center; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <h1>🥗 Weekly Meal History</h1>
  <p>Generated on ${new Date().toLocaleDateString()}</p>
`;

      Object.entries(mealsByDate).forEach(([date, meals]) => {
        const dayTotals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
        
        html += `<div class="date-section">
          <h2>📅 ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>`;
        
        meals.forEach(meal => {
          const mealData = meal.meal_data as any;
          dayTotals.calories += mealData.calories || 0;
          dayTotals.protein += mealData.protein || 0;
          dayTotals.carbs += mealData.carbs || 0;
          dayTotals.fats += mealData.fats || 0;
          
          html += `
          <div class="meal">
            <div class="meal-type">${meal.meal_type.charAt(0).toUpperCase() + meal.meal_type.slice(1)}: ${meal.meal_name}</div>
            <div class="nutrition">
              <span>🔥 ${mealData.calories || 0} cal</span>
              <span>💪 ${mealData.protein || 0}g protein</span>
              <span>🌾 ${mealData.carbs || 0}g carbs</span>
              <span>🥑 ${mealData.fats || 0}g fats</span>
            </div>
          </div>`;
        });

        html += `
          <div class="daily-total">
            <strong>Daily Totals:</strong> 
            ${dayTotals.calories} calories | 
            ${dayTotals.protein}g protein | 
            ${dayTotals.carbs}g carbs | 
            ${dayTotals.fats}g fats
          </div>
        </div>`;
      });

      html += `
  <div class="footer">
    <p>Generated by NutriPlan - Your Personal Nutrition Companion</p>
  </div>
</body>
</html>`;

      // Create and download
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `meal-history-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Meal history downloaded!');
    } catch (error) {
      toast.error('Failed to download meal history');
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="font-serif text-2xl font-bold text-foreground">Settings</h1>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-4 shadow-soft border border-border/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-accent" />
              ) : (
                <Moon className="h-5 w-5 text-primary" />
              )}
              <div>
                <p className="font-medium text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">
                  {theme === 'light' ? 'Light mode' : 'Dark mode'}
                </p>
              </div>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-2xl p-4 shadow-soft border border-border/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {notifications ? (
                <Bell className="h-5 w-5 text-primary" />
              ) : (
                <BellOff className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium text-foreground">Notifications</p>
                <p className="text-sm text-muted-foreground">
                  {notifications ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={toggleNotifications} />
          </div>
        </motion.div>

        {/* Download Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="outline"
            className="w-full justify-start gap-3"
            onClick={downloadMealHistory}
            disabled={isLoading}
          >
            <Download className="h-5 w-5 text-primary" />
            Download Meal History
          </Button>
        </motion.div>

        {/* Clear Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/50"
              >
                <Trash2 className="h-5 w-5" />
                Clear All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your meal history, preferences, and reset your profile.
                  Your account and streak will be preserved.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={clearData}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Clear Data
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
