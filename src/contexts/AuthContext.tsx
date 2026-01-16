import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Update streak on login
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => {
            updateStreak(session.user.id);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateStreak = async (userId: string) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('last_login_date, streak_count')
        .eq('user_id', userId)
        .maybeSingle();

      if (profile) {
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = profile.last_login_date;
        
        let newStreak = profile.streak_count || 1;
        
        if (lastLogin) {
          const lastDate = new Date(lastLogin);
          const todayDate = new Date(today);
          const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            newStreak = (profile.streak_count || 0) + 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        }

        await supabase
          .from('profiles')
          .update({ 
            last_login_date: today, 
            streak_count: newStreak 
          })
          .eq('user_id', userId);

        // Check for streak achievements
        checkStreakAchievements(userId, newStreak);
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const checkStreakAchievements = async (userId: string, streak: number) => {
    const streakAchievements = [
      { days: 3, type: 'streak_3', name: '3-Day Warrior', description: 'Maintained a 3-day streak!', icon: '🔥' },
      { days: 7, type: 'streak_7', name: 'Week Champion', description: 'Maintained a 7-day streak!', icon: '⭐' },
      { days: 14, type: 'streak_14', name: 'Fortnight Fighter', description: 'Maintained a 14-day streak!', icon: '💪' },
      { days: 30, type: 'streak_30', name: 'Monthly Master', description: 'Maintained a 30-day streak!', icon: '🏆' },
    ];

    for (const achievement of streakAchievements) {
      if (streak >= achievement.days) {
        const { error } = await supabase
          .from('achievements')
          .upsert({
            user_id: userId,
            achievement_type: achievement.type,
            achievement_name: achievement.name,
            achievement_description: achievement.description,
            badge_icon: achievement.icon,
          }, { onConflict: 'user_id,achievement_type' });

        if (!error && streak === achievement.days) {
          toast.success(`🎉 Achievement Unlocked: ${achievement.name}!`);
        }
      }
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          display_name: displayName || 'Nutrition Explorer'
        }
      }
    });
    
    return { error: error as Error | null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
