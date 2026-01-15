import { Meal, DietType, UserProfile, Allergy, FitnessGoal, ActivityLevel, Gender } from '@/types/user';

// Image imports - Breakfast
import masalaDosa from '@/assets/meals/masala-dosa.jpg';
import poha from '@/assets/meals/poha.jpg';
import idliSambar from '@/assets/meals/idli-sambar.jpg';
import yogurtParfait from '@/assets/meals/yogurt-parfait.jpg';
import overnightOats from '@/assets/meals/overnight-oats.jpg';
import avocadoToast from '@/assets/meals/avocado-toast.jpg';
import smoothieBowl from '@/assets/meals/smoothie-bowl.jpg';
import upma from '@/assets/meals/upma.jpg';
import alooParatha from '@/assets/meals/aloo-paratha.jpg';
import ketoBaconEggs from '@/assets/meals/keto-bacon-eggs.jpg';
import salmonBagel from '@/assets/meals/salmon-bagel.jpg';
import eggBhurji from '@/assets/meals/egg-bhurji.jpg';

// Image imports - Lunch
import chickenQuinoa from '@/assets/meals/chicken-quinoa.jpg';
import rajmaChawal from '@/assets/meals/rajma-chawal.jpg';
import choleBhature from '@/assets/meals/chole-bhature.jpg';
import mediterraneanSalad from '@/assets/meals/mediterranean-salad.jpg';
import buddhaBowl from '@/assets/meals/buddha-bowl.jpg';
import dalTadka from '@/assets/meals/dal-tadka.jpg';
import falafelWrap from '@/assets/meals/falafel-wrap.jpg';
import tunaPoke from '@/assets/meals/tuna-poke.jpg';
import paneerTikka from '@/assets/meals/paneer-tikka.jpg';

// Image imports - Dinner
import grilledSalmon from '@/assets/meals/grilled-salmon.jpg';
import palakPaneer from '@/assets/meals/palak-paneer.jpg';
import mushroomRisotto from '@/assets/meals/mushroom-risotto.jpg';
import butterChicken from '@/assets/meals/butter-chicken.jpg';
import beefStirFry from '@/assets/meals/beef-stir-fry.jpg';
import vegBiryani from '@/assets/meals/veg-biryani.jpg';
import shrimpScampi from '@/assets/meals/shrimp-scampi.jpg';
import ketoZoodles from '@/assets/meals/keto-zoodles.jpg';
import chickenTikka from '@/assets/meals/chicken-tikka.jpg';
import fishCurry from '@/assets/meals/fish-curry.jpg';
import grilledChicken from '@/assets/meals/grilled-chicken.jpg';

// Image imports - Snacks
import samosa from '@/assets/meals/samosa.jpg';
import energyBalls from '@/assets/meals/energy-balls.jpg';
import dhokla from '@/assets/meals/dhokla.jpg';
import greekYogurt from '@/assets/meals/greek-yogurt.jpg';
import hummusVeggies from '@/assets/meals/hummus-veggies.jpg';
import edamame from '@/assets/meals/edamame.jpg';
import trailMix from '@/assets/meals/trail-mix.jpg';
import proteinShake from '@/assets/meals/protein-shake.jpg';

// Extended Meal interface with additional properties for filtering
interface ExtendedMeal extends Meal {
  origin: 'indian' | 'global' | 'mediterranean' | 'asian';
  isVegetarian: boolean;
  isVegan: boolean;
  isNonVeg: boolean;
  containsAllergies: Allergy[];
  suitableFor: {
    goals: FitnessGoal[];
    activityLevels: ActivityLevel[];
    genders: Gender[];
    minAge?: number;
    maxAge?: number;
  };
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

// Complete meal database with Indian and Global recipes
export const allMeals: ExtendedMeal[] = [
  // ==================== BREAKFAST OPTIONS ====================
  
  // Indian Breakfast
  {
    id: 'b1',
    name: 'Masala Dosa',
    image: masalaDosa,
    calories: 350,
    protein: 8,
    carbs: 55,
    fats: 12,
    prepTime: 25,
    tags: ['Indian', 'Vegetarian', 'South Indian'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Rice batter', 'Urad dal', 'Potato masala', 'Onions', 'Mustard seeds', 'Curry leaves'],
    aiTip: 'A traditional South Indian breakfast, perfect for sustained energy',
    origin: 'indian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['maintain', 'gain_weight'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b2',
    name: 'Poha',
    image: poha,
    calories: 280,
    protein: 6,
    carbs: 45,
    fats: 8,
    prepTime: 15,
    tags: ['Indian', 'Vegetarian', 'Quick', 'Light'],
    dietTypes: ['vegetarian', 'vegan', 'anything'],
    ingredients: ['Flattened rice', 'Peanuts', 'Onions', 'Curry leaves', 'Turmeric', 'Lemon'],
    aiTip: 'Light and easy to digest, great for a quick morning meal',
    origin: 'indian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['nuts'],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b3',
    name: 'Idli Sambar',
    image: idliSambar,
    calories: 250,
    protein: 10,
    carbs: 42,
    fats: 4,
    prepTime: 20,
    tags: ['Indian', 'Vegetarian', 'South Indian', 'Low-Fat'],
    dietTypes: ['vegetarian', 'vegan', 'anything'],
    ingredients: ['Rice', 'Urad dal', 'Mixed vegetables', 'Sambar powder', 'Tamarind', 'Coconut chutney'],
    aiTip: 'Light, fermented food that aids digestion and provides probiotics',
    origin: 'indian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b4',
    name: 'Upma',
    image: upma,
    calories: 300,
    protein: 8,
    carbs: 48,
    fats: 9,
    prepTime: 15,
    tags: ['Indian', 'Vegetarian', 'South Indian', 'Quick'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Semolina', 'Vegetables', 'Curry leaves', 'Cashews', 'Mustard seeds', 'Green chilies'],
    aiTip: 'Wholesome and filling, great for busy mornings',
    origin: 'indian',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['nuts', 'gluten'],
    suitableFor: {
      goals: ['maintain', 'gain_weight'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b5',
    name: 'Aloo Paratha',
    image: alooParatha,
    calories: 400,
    protein: 10,
    carbs: 52,
    fats: 18,
    prepTime: 30,
    tags: ['Indian', 'Vegetarian', 'North Indian', 'Hearty'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Whole wheat flour', 'Potatoes', 'Butter', 'Green chilies', 'Coriander', 'Cumin'],
    aiTip: 'High-energy breakfast perfect for active individuals',
    origin: 'indian',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy', 'gluten'],
    suitableFor: {
      goals: ['gain_weight', 'build_muscle'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b6',
    name: 'Egg Bhurji with Roti',
    image: eggBhurji,
    calories: 380,
    protein: 22,
    carbs: 35,
    fats: 18,
    prepTime: 20,
    tags: ['Indian', 'High-Protein', 'North Indian'],
    dietTypes: ['non_vegetarian', 'anything'],
    ingredients: ['Eggs', 'Onions', 'Tomatoes', 'Green chilies', 'Whole wheat roti', 'Spices'],
    aiTip: 'Excellent protein source for muscle building and recovery',
    origin: 'indian',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['eggs', 'gluten'],
    suitableFor: {
      goals: ['build_muscle', 'lose_fat', 'maintain'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  
  // Global Breakfast
  {
    id: 'b7',
    name: 'Berry Yogurt Parfait',
    image: yogurtParfait,
    calories: 320,
    protein: 18,
    carbs: 42,
    fats: 8,
    prepTime: 10,
    tags: ['Global', 'Vegetarian', 'High-Protein', 'Quick'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey', 'Chia seeds'],
    aiTip: 'Great post-workout breakfast for muscle recovery',
    origin: 'global',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy', 'gluten'],
    suitableFor: {
      goals: ['lose_fat', 'build_muscle', 'maintain'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b8',
    name: 'Overnight Oats',
    image: overnightOats,
    calories: 380,
    protein: 14,
    carbs: 58,
    fats: 10,
    prepTime: 5,
    tags: ['Global', 'Vegan', 'Meal Prep', 'High-Fiber'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Rolled oats', 'Almond milk', 'Chia seeds', 'Banana', 'Maple syrup'],
    aiTip: 'Prepare the night before for a grab-and-go breakfast',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['gluten', 'nuts'],
    suitableFor: {
      goals: ['maintain', 'lose_fat'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b9',
    name: 'Avocado Toast with Eggs',
    image: avocadoToast,
    calories: 420,
    protein: 22,
    carbs: 35,
    fats: 24,
    prepTime: 15,
    tags: ['Global', 'Vegetarian', 'High-Protein', 'Keto-Friendly'],
    dietTypes: ['vegetarian', 'keto', 'anything'],
    ingredients: ['Sourdough bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Feta cheese'],
    aiTip: 'Perfect balance of healthy fats and protein',
    origin: 'global',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['eggs', 'dairy', 'gluten'],
    suitableFor: {
      goals: ['build_muscle', 'maintain'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b10',
    name: 'Tropical Smoothie Bowl',
    image: smoothieBowl,
    calories: 340,
    protein: 12,
    carbs: 52,
    fats: 8,
    prepTime: 10,
    tags: ['Global', 'Vegan', 'Fresh', 'Antioxidants'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Mango', 'Pineapple', 'Coconut milk', 'Banana', 'Granola', 'Coconut flakes'],
    aiTip: 'Rich in vitamins C and B for energy',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['maintain', 'lose_fat'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b11',
    name: 'Keto Bacon & Eggs',
    image: ketoBaconEggs,
    calories: 450,
    protein: 28,
    carbs: 3,
    fats: 36,
    prepTime: 20,
    tags: ['Global', 'Keto', 'High-Protein', 'Low-Carb'],
    dietTypes: ['keto', 'paleo', 'non_vegetarian', 'anything'],
    ingredients: ['Bacon', 'Eggs', 'Avocado', 'Cherry tomatoes', 'Black pepper'],
    aiTip: 'High fat, low carb to keep you in ketosis',
    origin: 'global',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['eggs'],
    suitableFor: {
      goals: ['lose_fat', 'build_muscle'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b12',
    name: 'Smoked Salmon Bagel',
    image: salmonBagel,
    calories: 450,
    protein: 28,
    carbs: 40,
    fats: 18,
    prepTime: 10,
    tags: ['Global', 'Pescatarian', 'Omega-3', 'Quick'],
    dietTypes: ['pescatarian', 'anything'],
    ingredients: ['Whole wheat bagel', 'Smoked salmon', 'Cream cheese', 'Capers', 'Red onion', 'Dill'],
    aiTip: 'Great source of omega-3 fatty acids for brain health',
    origin: 'global',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['seafood', 'dairy', 'gluten'],
    suitableFor: {
      goals: ['maintain', 'build_muscle'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },

  // ==================== LUNCH OPTIONS ====================
  
  // Indian Lunch
  {
    id: 'l1',
    name: 'Rajma Chawal',
    image: rajmaChawal,
    calories: 450,
    protein: 18,
    carbs: 68,
    fats: 10,
    prepTime: 40,
    tags: ['Indian', 'Vegetarian', 'North Indian', 'High-Fiber'],
    dietTypes: ['vegetarian', 'vegan', 'anything'],
    ingredients: ['Red kidney beans', 'Basmati rice', 'Onions', 'Tomatoes', 'Ginger', 'Garam masala'],
    aiTip: 'Complete protein when combined with rice, excellent for vegetarians',
    origin: 'indian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['maintain', 'gain_weight', 'build_muscle'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l2',
    name: 'Chole Bhature',
    image: choleBhature,
    calories: 550,
    protein: 16,
    carbs: 72,
    fats: 22,
    prepTime: 45,
    tags: ['Indian', 'Vegetarian', 'North Indian', 'Indulgent'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Chickpeas', 'Bhatura flour', 'Onions', 'Tomatoes', 'Chole masala', 'Pickle'],
    aiTip: 'A hearty meal best enjoyed occasionally, perfect for cheat days',
    origin: 'indian',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['gluten'],
    suitableFor: {
      goals: ['gain_weight'],
      activityLevels: ['very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l3',
    name: 'Dal Tadka with Rice',
    image: dalTadka,
    calories: 380,
    protein: 16,
    carbs: 58,
    fats: 8,
    prepTime: 30,
    tags: ['Indian', 'Vegetarian', 'High-Protein', 'Comfort Food'],
    dietTypes: ['vegetarian', 'vegan', 'anything'],
    ingredients: ['Yellow lentils', 'Basmati rice', 'Ghee', 'Cumin', 'Garlic', 'Dried red chilies'],
    aiTip: 'Rich in plant protein and easy to digest',
    origin: 'indian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['lose_fat', 'maintain', 'build_muscle'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l4',
    name: 'Paneer Tikka Masala',
    image: paneerTikka,
    calories: 480,
    protein: 24,
    carbs: 42,
    fats: 24,
    prepTime: 35,
    tags: ['Indian', 'Vegetarian', 'High-Protein', 'Rich'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Paneer', 'Yogurt marinade', 'Tomato gravy', 'Cream', 'Naan bread', 'Basmati rice'],
    aiTip: 'Excellent source of protein for vegetarians, pair with rice or naan',
    origin: 'indian',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy', 'gluten'],
    suitableFor: {
      goals: ['build_muscle', 'gain_weight'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l5',
    name: 'Chicken Tikka with Rice',
    image: chickenTikka,
    calories: 520,
    protein: 42,
    carbs: 45,
    fats: 18,
    prepTime: 40,
    tags: ['Indian', 'High-Protein', 'Grilled', 'Low-Fat'],
    dietTypes: ['non_vegetarian', 'anything'],
    ingredients: ['Chicken breast', 'Yogurt marinade', 'Spices', 'Basmati rice', 'Mint chutney'],
    aiTip: 'Lean protein source, perfect for muscle building',
    origin: 'indian',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['dairy'],
    suitableFor: {
      goals: ['build_muscle', 'lose_fat'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  
  // Global Lunch
  {
    id: 'l6',
    name: 'Grilled Chicken Quinoa Bowl',
    image: chickenQuinoa,
    calories: 520,
    protein: 42,
    carbs: 48,
    fats: 16,
    prepTime: 25,
    tags: ['Global', 'High-Protein', 'Gluten-Free', 'Meal Prep'],
    dietTypes: ['non_vegetarian', 'anything'],
    ingredients: ['Chicken breast', 'Quinoa', 'Avocado', 'Bell peppers', 'Mixed greens', 'Olive oil'],
    aiTip: 'Complete protein with all essential amino acids',
    origin: 'global',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: [],
    suitableFor: {
      goals: ['build_muscle', 'lose_fat', 'maintain'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l7',
    name: 'Mediterranean Salad',
    image: mediterraneanSalad,
    calories: 420,
    protein: 22,
    carbs: 32,
    fats: 24,
    prepTime: 15,
    tags: ['Mediterranean', 'Vegetarian', 'Low-Carb', 'Fresh'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Chickpeas', 'Cucumber', 'Tomatoes', 'Feta cheese', 'Olives', 'Olive oil', 'Lemon'],
    aiTip: 'High in fiber and healthy fats for sustained energy',
    origin: 'mediterranean',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy'],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l8',
    name: 'Vegan Buddha Bowl',
    image: buddhaBowl,
    calories: 480,
    protein: 18,
    carbs: 62,
    fats: 20,
    prepTime: 20,
    tags: ['Global', 'Vegan', 'High-Fiber', 'Colorful'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Brown rice', 'Roasted chickpeas', 'Kale', 'Sweet potato', 'Tahini', 'Lemon'],
    aiTip: 'Plant-powered nutrition for lasting energy',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['soy'],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l9',
    name: 'Falafel Wrap',
    image: falafelWrap,
    calories: 520,
    protein: 20,
    carbs: 58,
    fats: 22,
    prepTime: 25,
    tags: ['Mediterranean', 'Vegan', 'High-Fiber'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Falafel', 'Whole wheat pita', 'Hummus', 'Pickled vegetables', 'Tahini', 'Fresh herbs'],
    aiTip: 'Plant-based protein packed in every bite',
    origin: 'mediterranean',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['gluten', 'soy'],
    suitableFor: {
      goals: ['maintain', 'gain_weight'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l10',
    name: 'Tuna Poke Bowl',
    image: tunaPoke,
    calories: 490,
    protein: 36,
    carbs: 45,
    fats: 18,
    prepTime: 15,
    tags: ['Asian', 'Pescatarian', 'Omega-3', 'Fresh'],
    dietTypes: ['pescatarian', 'anything'],
    ingredients: ['Fresh tuna', 'Sushi rice', 'Edamame', 'Cucumber', 'Sesame seeds', 'Soy sauce', 'Seaweed'],
    aiTip: 'Raw fish provides maximum omega-3 benefits',
    origin: 'asian',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['seafood', 'soy'],
    suitableFor: {
      goals: ['build_muscle', 'maintain'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },

  // ==================== DINNER OPTIONS ====================
  
  // Indian Dinner
  {
    id: 'd1',
    name: 'Palak Paneer with Roti',
    image: palakPaneer,
    calories: 420,
    protein: 22,
    carbs: 38,
    fats: 22,
    prepTime: 35,
    tags: ['Indian', 'Vegetarian', 'High-Protein', 'Iron-Rich'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Spinach', 'Paneer', 'Cream', 'Whole wheat roti', 'Ginger', 'Garlic'],
    aiTip: 'Rich in iron from spinach and protein from paneer',
    origin: 'indian',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy', 'gluten'],
    suitableFor: {
      goals: ['maintain', 'build_muscle'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd2',
    name: 'Vegetable Biryani',
    image: vegBiryani,
    calories: 480,
    protein: 14,
    carbs: 72,
    fats: 16,
    prepTime: 50,
    tags: ['Indian', 'Vegetarian', 'Aromatic', 'Festive'],
    dietTypes: ['vegetarian', 'vegan', 'anything'],
    ingredients: ['Basmati rice', 'Mixed vegetables', 'Saffron', 'Mint', 'Fried onions', 'Biryani masala'],
    aiTip: 'Aromatic and satisfying, perfect for special occasions',
    origin: 'indian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['gluten'],
    suitableFor: {
      goals: ['gain_weight', 'maintain'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd3',
    name: 'Butter Chicken',
    image: butterChicken,
    calories: 580,
    protein: 45,
    carbs: 38,
    fats: 28,
    prepTime: 45,
    tags: ['Indian', 'High-Protein', 'Rich', 'Creamy'],
    dietTypes: ['non_vegetarian', 'anything'],
    ingredients: ['Chicken', 'Butter', 'Cream', 'Tomatoes', 'Garam masala', 'Naan bread'],
    aiTip: 'Rich in protein, perfect for muscle recovery after intense workouts',
    origin: 'indian',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['dairy', 'gluten'],
    suitableFor: {
      goals: ['build_muscle', 'gain_weight'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd4',
    name: 'Fish Curry with Rice',
    image: fishCurry,
    calories: 480,
    protein: 38,
    carbs: 48,
    fats: 16,
    prepTime: 40,
    tags: ['Indian', 'Pescatarian', 'Omega-3', 'Kerala Style'],
    dietTypes: ['pescatarian', 'anything'],
    ingredients: ['Fish', 'Coconut milk', 'Curry leaves', 'Tamarind', 'Basmati rice', 'Spices'],
    aiTip: 'Rich in omega-3 fatty acids, great for heart and brain health',
    origin: 'indian',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['seafood'],
    suitableFor: {
      goals: ['maintain', 'build_muscle'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  
  // Global Dinner
  {
    id: 'd5',
    name: 'Grilled Salmon with Sweet Potato',
    image: grilledSalmon,
    calories: 580,
    protein: 45,
    carbs: 38,
    fats: 24,
    prepTime: 30,
    tags: ['Global', 'Pescatarian', 'Omega-3', 'Gluten-Free'],
    dietTypes: ['pescatarian', 'paleo', 'anything'],
    ingredients: ['Atlantic salmon', 'Sweet potato', 'Asparagus', 'Lemon', 'Garlic', 'Olive oil'],
    aiTip: 'Rich in omega-3 fatty acids for heart health',
    origin: 'global',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['seafood'],
    suitableFor: {
      goals: ['lose_fat', 'build_muscle', 'maintain'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd6',
    name: 'Vegan Mushroom Risotto',
    image: mushroomRisotto,
    calories: 480,
    protein: 14,
    carbs: 68,
    fats: 16,
    prepTime: 35,
    tags: ['Global', 'Vegan', 'Comfort Food', 'Italian'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Arborio rice', 'Mixed mushrooms', 'Vegetable broth', 'White wine', 'Nutritional yeast', 'Thyme'],
    aiTip: 'Creamy comfort food without the dairy',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['maintain', 'gain_weight'],
      activityLevels: ['lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd7',
    name: 'Beef Stir Fry',
    image: beefStirFry,
    calories: 520,
    protein: 40,
    carbs: 35,
    fats: 22,
    prepTime: 25,
    tags: ['Asian', 'High-Protein', 'Quick', 'Iron-Rich'],
    dietTypes: ['non_vegetarian', 'paleo', 'anything'],
    ingredients: ['Beef sirloin', 'Broccoli', 'Bell peppers', 'Snap peas', 'Ginger', 'Garlic', 'Soy sauce'],
    aiTip: 'High iron content for energy and strength',
    origin: 'asian',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['soy'],
    suitableFor: {
      goals: ['build_muscle', 'maintain'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd8',
    name: 'Shrimp Scampi',
    image: shrimpScampi,
    calories: 540,
    protein: 38,
    carbs: 42,
    fats: 22,
    prepTime: 20,
    tags: ['Global', 'Pescatarian', 'Quick', 'Italian'],
    dietTypes: ['pescatarian', 'anything'],
    ingredients: ['Shrimp', 'Linguine', 'Garlic', 'White wine', 'Butter', 'Parsley', 'Lemon'],
    aiTip: 'Lean protein with healthy fats',
    origin: 'global',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['seafood', 'dairy', 'gluten'],
    suitableFor: {
      goals: ['maintain', 'build_muscle'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd9',
    name: 'Keto Zucchini Noodles',
    image: ketoZoodles,
    calories: 350,
    protein: 18,
    carbs: 12,
    fats: 28,
    prepTime: 20,
    tags: ['Global', 'Keto', 'Low-Carb', 'Vegetarian'],
    dietTypes: ['keto', 'vegetarian', 'anything'],
    ingredients: ['Zucchini', 'Parmesan', 'Alfredo sauce', 'Garlic', 'Pine nuts', 'Basil'],
    aiTip: 'Low carb pasta alternative for keto diet',
    origin: 'global',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy', 'nuts'],
    suitableFor: {
      goals: ['lose_fat'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd10',
    name: 'Grilled Chicken Breast',
    image: grilledChicken,
    calories: 420,
    protein: 48,
    carbs: 28,
    fats: 14,
    prepTime: 25,
    tags: ['Global', 'High-Protein', 'Low-Fat', 'Meal Prep'],
    dietTypes: ['non_vegetarian', 'paleo', 'anything'],
    ingredients: ['Chicken breast', 'Quinoa', 'Roasted vegetables', 'Olive oil', 'Herbs', 'Lemon'],
    aiTip: 'Lean protein powerhouse for muscle building',
    origin: 'global',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: [],
    suitableFor: {
      goals: ['lose_fat', 'build_muscle'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },

  // ==================== SNACK OPTIONS ====================
  
  // Indian Snacks
  {
    id: 's1',
    name: 'Baked Samosa',
    image: samosa,
    calories: 180,
    protein: 6,
    carbs: 28,
    fats: 6,
    prepTime: 30,
    tags: ['Indian', 'Vegetarian', 'Baked', 'Savory'],
    dietTypes: ['vegetarian', 'vegan', 'anything'],
    ingredients: ['Whole wheat flour', 'Potatoes', 'Peas', 'Cumin', 'Coriander', 'Green chutney'],
    aiTip: 'Baked version is healthier than fried, great with mint chutney',
    origin: 'indian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['gluten'],
    suitableFor: {
      goals: ['maintain'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
  {
    id: 's2',
    name: 'Dhokla',
    image: dhokla,
    calories: 150,
    protein: 8,
    carbs: 22,
    fats: 4,
    prepTime: 25,
    tags: ['Indian', 'Vegetarian', 'Steamed', 'Light'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Gram flour', 'Yogurt', 'Mustard seeds', 'Green chilies', 'Curry leaves', 'Sugar'],
    aiTip: 'Fermented snack that aids digestion and is light on stomach',
    origin: 'indian',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy'],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
  
  // Global Snacks
  {
    id: 's3',
    name: 'Energy Balls',
    image: energyBalls,
    calories: 200,
    protein: 8,
    carbs: 24,
    fats: 10,
    prepTime: 15,
    tags: ['Global', 'Vegan', 'No-Bake', 'Energy'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Dates', 'Oats', 'Almonds', 'Cocoa powder', 'Coconut', 'Chia seeds'],
    aiTip: 'Perfect pre-workout snack for sustained energy',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['nuts', 'gluten'],
    suitableFor: {
      goals: ['build_muscle', 'maintain', 'gain_weight'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
  {
    id: 's4',
    name: 'Greek Yogurt with Honey',
    image: greekYogurt,
    calories: 220,
    protein: 18,
    carbs: 20,
    fats: 8,
    prepTime: 3,
    tags: ['Global', 'Vegetarian', 'High-Protein', 'Quick'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Greek yogurt', 'Almonds', 'Walnuts', 'Honey', 'Cinnamon'],
    aiTip: 'Quick protein boost between meals, great for muscle recovery',
    origin: 'global',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy', 'nuts'],
    suitableFor: {
      goals: ['build_muscle', 'lose_fat', 'maintain'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
  {
    id: 's5',
    name: 'Hummus with Veggies',
    image: hummusVeggies,
    calories: 180,
    protein: 8,
    carbs: 20,
    fats: 8,
    prepTime: 5,
    tags: ['Mediterranean', 'Vegan', 'High-Fiber', 'Healthy'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Hummus', 'Carrots', 'Cucumber', 'Bell peppers', 'Pita chips'],
    aiTip: 'Fiber-rich snack that keeps you full longer',
    origin: 'mediterranean',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['gluten', 'soy'],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
  {
    id: 's6',
    name: 'Edamame with Sea Salt',
    image: edamame,
    calories: 190,
    protein: 17,
    carbs: 14,
    fats: 8,
    prepTime: 5,
    tags: ['Asian', 'Vegan', 'High-Protein', 'Quick'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Edamame', 'Sea salt', 'Chili flakes'],
    aiTip: 'Complete plant protein with all amino acids',
    origin: 'asian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['soy'],
    suitableFor: {
      goals: ['build_muscle', 'lose_fat', 'maintain'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
  {
    id: 's7',
    name: 'Trail Mix',
    image: trailMix,
    calories: 320,
    protein: 10,
    carbs: 32,
    fats: 18,
    prepTime: 2,
    tags: ['Global', 'Vegan', 'Energy', 'Portable'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Almonds', 'Cashews', 'Dried cranberries', 'Pumpkin seeds', 'Dark chocolate chips'],
    aiTip: 'Perfect portable snack for busy days',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['nuts'],
    suitableFor: {
      goals: ['gain_weight', 'build_muscle', 'maintain'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
  {
    id: 's8',
    name: 'Protein Shake',
    image: proteinShake,
    calories: 280,
    protein: 30,
    carbs: 22,
    fats: 8,
    prepTime: 5,
    tags: ['Global', 'High-Protein', 'Post-Workout', 'Quick'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Protein powder', 'Banana', 'Almond milk', 'Almonds', 'Honey'],
    aiTip: 'Best consumed within 30 minutes after workout for optimal recovery',
    origin: 'global',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['dairy', 'nuts'],
    suitableFor: {
      goals: ['build_muscle', 'lose_fat'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
];

// ==================== FILTERING FUNCTIONS ====================

// Check if a meal contains any of the user's allergies
const mealContainsAllergy = (meal: ExtendedMeal, allergies: Allergy[]): boolean => {
  return meal.containsAllergies.some(allergy => allergies.includes(allergy));
};

// Check if meal is suitable for user's diet type
const mealSuitsDietType = (meal: ExtendedMeal, dietType: DietType): boolean => {
  if (dietType === 'anything') return true;
  
  // Strict vegetarian check - must not be non-veg
  if (dietType === 'vegetarian') {
    return meal.isVegetarian && !meal.isNonVeg;
  }
  
  // Strict vegan check
  if (dietType === 'vegan') {
    return meal.isVegan && !meal.isNonVeg;
  }
  
  // Non-vegetarian can eat anything including veg
  if (dietType === 'non_vegetarian') {
    return true;
  }
  
  // For other diet types, check if it's in the meal's dietTypes
  return meal.dietTypes.includes(dietType);
};

// Check if meal is suitable for user's goals
const mealSuitsGoal = (meal: ExtendedMeal, goal?: FitnessGoal): boolean => {
  if (!goal) return true;
  return meal.suitableFor.goals.includes(goal);
};

// Check if meal is suitable for user's activity level
const mealSuitsActivityLevel = (meal: ExtendedMeal, activityLevel?: ActivityLevel): boolean => {
  if (!activityLevel) return true;
  return meal.suitableFor.activityLevels.includes(activityLevel);
};

// Main filtering function
export const getFilteredMeals = (userProfile: UserProfile): ExtendedMeal[] => {
  const { dietType, allergies, fitnessGoal, activityLevel, gender, age } = userProfile;
  
  return allMeals.filter(meal => {
    // 1. Check diet type compatibility (STRICT)
    if (!mealSuitsDietType(meal, dietType || 'anything')) {
      return false;
    }
    
    // 2. Check for allergies
    if (allergies && allergies.length > 0 && mealContainsAllergy(meal, allergies)) {
      return false;
    }
    
    // 3. Check fitness goal suitability (soft filter - prioritize but don't exclude)
    // We'll handle this in sorting instead of filtering
    
    // 4. Check activity level suitability (soft filter)
    // We'll handle this in sorting instead of filtering
    
    return true;
  });
};

// Get meals by type (breakfast, lunch, dinner, snacks)
export const getMealsByType = (
  meals: ExtendedMeal[],
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks'
): ExtendedMeal[] => {
  return meals.filter(meal => meal.mealType === mealType);
};

// Sort meals by suitability score
const getMealSuitabilityScore = (meal: ExtendedMeal, userProfile: UserProfile): number => {
  let score = 0;
  
  // Goal match
  if (userProfile.fitnessGoal && meal.suitableFor.goals.includes(userProfile.fitnessGoal)) {
    score += 30;
  }
  
  // Activity level match
  if (userProfile.activityLevel && meal.suitableFor.activityLevels.includes(userProfile.activityLevel)) {
    score += 20;
  }
  
  // Protein content for muscle building
  if (userProfile.fitnessGoal === 'build_muscle' && meal.protein > 25) {
    score += 15;
  }
  
  // Low calorie for fat loss
  if (userProfile.fitnessGoal === 'lose_fat' && meal.calories < 400) {
    score += 15;
  }
  
  // High calorie for weight gain
  if (userProfile.fitnessGoal === 'gain_weight' && meal.calories > 450) {
    score += 15;
  }
  
  return score;
};

// Get meals for a specific day with rotation based on user's meal variety preference
export const getMealsForDay = (
  dayIndex: number,
  userProfile: UserProfile
): {
  breakfast: ExtendedMeal[];
  lunch: ExtendedMeal[];
  dinner: ExtendedMeal[];
  snacks: ExtendedMeal[];
} => {
  // Get all filtered meals
  const filteredMeals = getFilteredMeals(userProfile);
  
  // Separate by meal type
  const breakfastMeals = getMealsByType(filteredMeals, 'breakfast');
  const lunchMeals = getMealsByType(filteredMeals, 'lunch');
  const dinnerMeals = getMealsByType(filteredMeals, 'dinner');
  const snackMeals = getMealsByType(filteredMeals, 'snacks');
  
  // Sort each by suitability score
  const sortBySuitability = (meals: ExtendedMeal[]) => {
    return [...meals].sort((a, b) => 
      getMealSuitabilityScore(b, userProfile) - getMealSuitabilityScore(a, userProfile)
    );
  };
  
  const sortedBreakfast = sortBySuitability(breakfastMeals);
  const sortedLunch = sortBySuitability(lunchMeals);
  const sortedDinner = sortBySuitability(dinnerMeals);
  const sortedSnacks = sortBySuitability(snackMeals);
  
  // Rotate based on day and variety preference
  const getRotatedMeals = (meals: ExtendedMeal[], day: number): ExtendedMeal[] => {
    if (meals.length === 0) return [];
    
    const variety = userProfile.mealVariety || 'slight_variation';
    
    if (variety === 'same_daily') {
      // Return same meals every day (top 2)
      return meals.slice(0, 2);
    } else if (variety === 'new_daily') {
      // Rotate completely based on day
      const rotateBy = (day * 2) % meals.length;
      const rotated = [...meals.slice(rotateBy), ...meals.slice(0, rotateBy)];
      return rotated.slice(0, 2);
    } else {
      // slight_variation - rotate by 1 position each day
      const rotateBy = day % meals.length;
      const rotated = [...meals.slice(rotateBy), ...meals.slice(0, rotateBy)];
      return rotated.slice(0, 2);
    }
  };
  
  return {
    breakfast: getRotatedMeals(sortedBreakfast, dayIndex),
    lunch: getRotatedMeals(sortedLunch, dayIndex),
    dinner: getRotatedMeals(sortedDinner, dayIndex),
    snacks: getRotatedMeals(sortedSnacks, dayIndex),
  };
};

// Get primary meal for day (first choice)
export const getPrimaryMealForDay = (
  dayIndex: number,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks',
  userProfile: UserProfile
): ExtendedMeal | undefined => {
  const mealsForDay = getMealsForDay(dayIndex, userProfile);
  return mealsForDay[mealType][0];
};

// Get swap options for a meal
export const getSwapOptions = (
  currentMealId: string,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks',
  userProfile: UserProfile
): ExtendedMeal[] => {
  const filteredMeals = getFilteredMeals(userProfile);
  const mealsOfType = getMealsByType(filteredMeals, mealType);
  
  // Return all meals except the current one
  return mealsOfType.filter(meal => meal.id !== currentMealId);
};

// Legacy exports for backward compatibility
export const sampleMeals = allMeals as Meal[];

export const getMealsByDietType = (dietType: DietType): Meal[] => {
  const defaultProfile: UserProfile = {
    dietType,
    mealsPerDay: { breakfast: true, lunch: true, snacks: true, dinner: true },
    allergies: [],
  };
  return getFilteredMeals(defaultProfile) as Meal[];
};

export const getMealById = (id: string): Meal | undefined => {
  return allMeals.find(meal => meal.id === id) as Meal | undefined;
};
