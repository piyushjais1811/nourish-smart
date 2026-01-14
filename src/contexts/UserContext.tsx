import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '@/types/user';

interface UserContextType {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isOnboarded: boolean;
  setIsOnboarded: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
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
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        isOnboarded,
        setIsOnboarded,
        currentStep,
        setCurrentStep,
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
