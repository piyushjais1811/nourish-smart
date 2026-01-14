export type Gender = 'male' | 'female' | 'other';

export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';

export type FitnessGoal = 'lose_fat' | 'gain_weight' | 'build_muscle' | 'maintain';

export type DietType = 'vegan' | 'vegetarian' | 'non_vegetarian' | 'keto' | 'paleo' | 'pescatarian' | 'anything';

export type MealVariety = 'same_daily' | 'slight_variation' | 'new_daily';

export type Allergy = 'nuts' | 'dairy' | 'eggs' | 'soy' | 'gluten' | 'seafood' | 'other';

export interface UserProfile {
  // Step 1: Basic Info
  gender?: Gender;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  activityLevel?: ActivityLevel;
  
  // Step 2: Goals
  fitnessGoal?: FitnessGoal;
  targetWeight?: number;
  timeframe?: '4_weeks' | '8_weeks' | 'flexible';
  
  // Step 3: Diet Preferences
  dietType?: DietType;
  mealVariety?: MealVariety;
  mealsPerDay: {
    breakfast: boolean;
    lunch: boolean;
    snacks: boolean;
    dinner: boolean;
  };
  
  // Step 4: Allergies
  allergies: Allergy[];
  customAllergies?: string;
}

export interface Meal {
  id: string;
  name: string;
  image: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  prepTime: number;
  tags: string[];
  ingredients: string[];
  instructions?: string[];
  aiTip?: string;
}

export interface DailyMealPlan {
  date: string;
  breakfast?: Meal;
  lunch?: Meal;
  snacks?: Meal;
  dinner?: Meal;
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
}
