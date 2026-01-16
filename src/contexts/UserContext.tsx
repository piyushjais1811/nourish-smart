import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '@/types/user';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface UserContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isOnboarded: boolean;
  setIsOnboarded: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  saveProfileToDatabase: (profile: Partial<UserProfile>) => Promise<void>;
}

const defaultProfile: UserProfile = {
  mealsPerDay: {
    breakfast: true,
    lunch: true,
    snacks: true,
    dinner: true,
  },
  allergies: [],
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from database when user changes
  useEffect(() => {
    if (user) {
      loadProfileFromDatabase();
    } else {
      // Reset to defaults when logged out
      setUserProfile(defaultProfile);
      setIsOnboarded(false);
      setCurrentStep(1);
      setIsLoading(false);
    }
  }, [user]);

  const loadProfileFromDatabase = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        setIsLoading(false);
        return;
      }

      if (profile) {
        // Map database profile to UserProfile type
        const loadedProfile: UserProfile = {
          gender: profile.gender as UserProfile['gender'],
          age: profile.age ?? undefined,
          height: profile.height ?? undefined,
          weight: profile.weight ?? undefined,
          activityLevel: profile.activity_level as UserProfile['activityLevel'],
          fitnessGoal: profile.fitness_goal as UserProfile['fitnessGoal'],
          targetWeight: profile.target_weight ?? undefined,
          timeframe: profile.timeframe as UserProfile['timeframe'],
          dietType: profile.diet_type as UserProfile['dietType'],
          mealVariety: profile.meal_variety as UserProfile['mealVariety'],
          mealsPerDay: (profile.meals_per_day as UserProfile['mealsPerDay']) || defaultProfile.mealsPerDay,
          allergies: (profile.allergies as UserProfile['allergies']) || [],
          customAllergies: profile.custom_allergies ?? undefined,
        };
        
        setUserProfile(loadedProfile);
        
        // Check if user has completed onboarding (has at least basic info set)
        const hasCompletedOnboarding = !!(
          profile.gender ||
          profile.fitness_goal ||
          profile.diet_type
        );
        setIsOnboarded(hasCompletedOnboarding);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProfileToDatabase = async (profileUpdates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      // Map UserProfile to database columns
      const dbUpdate: Record<string, unknown> = {};
      
      if (profileUpdates.gender !== undefined) dbUpdate.gender = profileUpdates.gender;
      if (profileUpdates.age !== undefined) dbUpdate.age = profileUpdates.age;
      if (profileUpdates.height !== undefined) dbUpdate.height = profileUpdates.height;
      if (profileUpdates.weight !== undefined) dbUpdate.weight = profileUpdates.weight;
      if (profileUpdates.activityLevel !== undefined) dbUpdate.activity_level = profileUpdates.activityLevel;
      if (profileUpdates.fitnessGoal !== undefined) dbUpdate.fitness_goal = profileUpdates.fitnessGoal;
      if (profileUpdates.targetWeight !== undefined) dbUpdate.target_weight = profileUpdates.targetWeight;
      if (profileUpdates.timeframe !== undefined) dbUpdate.timeframe = profileUpdates.timeframe;
      if (profileUpdates.dietType !== undefined) dbUpdate.diet_type = profileUpdates.dietType;
      if (profileUpdates.mealVariety !== undefined) dbUpdate.meal_variety = profileUpdates.mealVariety;
      if (profileUpdates.mealsPerDay !== undefined) dbUpdate.meals_per_day = profileUpdates.mealsPerDay;
      if (profileUpdates.allergies !== undefined) dbUpdate.allergies = profileUpdates.allergies;
      if (profileUpdates.customAllergies !== undefined) dbUpdate.custom_allergies = profileUpdates.customAllergies;

      const { error } = await supabase
        .from('profiles')
        .update(dbUpdate)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error saving profile:', error);
        throw error;
      }

      // Update local state
      setUserProfile(prev => ({ ...prev, ...profileUpdates }));
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isOnboarded,
        setIsOnboarded,
        currentStep,
        setCurrentStep,
        isLoading,
        saveProfileToDatabase,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
