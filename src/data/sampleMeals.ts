import { Meal, DietType } from '@/types/user';
import mealBreakfast from '@/assets/meal-breakfast.jpg';
import mealLunch from '@/assets/meal-lunch.jpg';
import mealDinner from '@/assets/meal-dinner.jpg';
import mealSnacks from '@/assets/meal-snacks.jpg';

// All meals with diet type tags
export const allMeals: Meal[] = [
  // BREAKFAST OPTIONS
  {
    id: 'b1',
    name: 'Berry Yogurt Parfait',
    image: mealBreakfast,
    calories: 320,
    protein: 18,
    carbs: 42,
    fats: 8,
    prepTime: 10,
    tags: ['Vegetarian', 'High-Protein', 'Quick'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey', 'Chia seeds'],
    aiTip: 'Great post-workout breakfast for muscle recovery',
  },
  {
    id: 'b2',
    name: 'Overnight Oats',
    image: mealBreakfast,
    calories: 380,
    protein: 14,
    carbs: 58,
    fats: 10,
    prepTime: 5,
    tags: ['Vegan', 'Meal Prep', 'High-Fiber'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Rolled oats', 'Almond milk', 'Chia seeds', 'Banana', 'Maple syrup'],
    aiTip: 'Prepare the night before for a grab-and-go breakfast',
  },
  {
    id: 'b3',
    name: 'Avocado Toast with Eggs',
    image: mealBreakfast,
    calories: 420,
    protein: 22,
    carbs: 35,
    fats: 24,
    prepTime: 15,
    tags: ['Vegetarian', 'High-Protein', 'Keto-Friendly'],
    dietTypes: ['vegetarian', 'keto', 'anything'],
    ingredients: ['Sourdough bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Feta cheese'],
    aiTip: 'Perfect balance of healthy fats and protein',
  },
  {
    id: 'b4',
    name: 'Keto Bacon & Egg Cups',
    image: mealBreakfast,
    calories: 350,
    protein: 24,
    carbs: 3,
    fats: 28,
    prepTime: 25,
    tags: ['Keto', 'High-Protein', 'Low-Carb'],
    dietTypes: ['keto', 'paleo', 'non_vegetarian', 'anything'],
    ingredients: ['Bacon', 'Eggs', 'Cheese', 'Green onions', 'Black pepper'],
    aiTip: 'High fat, low carb to keep you in ketosis',
  },
  {
    id: 'b5',
    name: 'Tropical Smoothie Bowl',
    image: mealBreakfast,
    calories: 340,
    protein: 12,
    carbs: 52,
    fats: 8,
    prepTime: 10,
    tags: ['Vegan', 'Fresh', 'Antioxidants'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Mango', 'Pineapple', 'Coconut milk', 'Banana', 'Granola', 'Coconut flakes'],
    aiTip: 'Rich in vitamins C and B for energy',
  },
  {
    id: 'b6',
    name: 'Smoked Salmon Bagel',
    image: mealBreakfast,
    calories: 450,
    protein: 28,
    carbs: 40,
    fats: 18,
    prepTime: 10,
    tags: ['Pescatarian', 'Omega-3', 'Quick'],
    dietTypes: ['pescatarian', 'anything'],
    ingredients: ['Whole wheat bagel', 'Smoked salmon', 'Cream cheese', 'Capers', 'Red onion', 'Dill'],
    aiTip: 'Great source of omega-3 fatty acids',
  },
  {
    id: 'b7',
    name: 'Paleo Breakfast Hash',
    image: mealBreakfast,
    calories: 390,
    protein: 26,
    carbs: 22,
    fats: 22,
    prepTime: 25,
    tags: ['Paleo', 'High-Protein', 'Gluten-Free'],
    dietTypes: ['paleo', 'non_vegetarian', 'anything'],
    ingredients: ['Sweet potato', 'Ground turkey', 'Bell peppers', 'Onions', 'Avocado oil', 'Eggs'],
    aiTip: 'Fuels your morning with clean protein',
  },

  // LUNCH OPTIONS
  {
    id: 'l1',
    name: 'Grilled Chicken Quinoa Bowl',
    image: mealLunch,
    calories: 520,
    protein: 42,
    carbs: 48,
    fats: 16,
    prepTime: 25,
    tags: ['High-Protein', 'Gluten-Free', 'Meal Prep'],
    dietTypes: ['non_vegetarian', 'anything'],
    ingredients: ['Chicken breast', 'Quinoa', 'Avocado', 'Bell peppers', 'Mixed greens', 'Olive oil'],
    aiTip: 'Complete protein with all essential amino acids',
  },
  {
    id: 'l2',
    name: 'Mediterranean Salad',
    image: mealLunch,
    calories: 420,
    protein: 22,
    carbs: 32,
    fats: 24,
    prepTime: 15,
    tags: ['Vegetarian', 'Low-Carb', 'Fresh'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Chickpeas', 'Cucumber', 'Tomatoes', 'Feta cheese', 'Olives', 'Olive oil', 'Lemon'],
    aiTip: 'High in fiber and healthy fats for sustained energy',
  },
  {
    id: 'l3',
    name: 'Vegan Buddha Bowl',
    image: mealLunch,
    calories: 480,
    protein: 18,
    carbs: 62,
    fats: 20,
    prepTime: 20,
    tags: ['Vegan', 'High-Fiber', 'Colorful'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Brown rice', 'Roasted chickpeas', 'Kale', 'Sweet potato', 'Tahini', 'Lemon'],
    aiTip: 'Plant-powered nutrition for lasting energy',
  },
  {
    id: 'l4',
    name: 'Keto Cobb Salad',
    image: mealLunch,
    calories: 580,
    protein: 38,
    carbs: 8,
    fats: 44,
    prepTime: 20,
    tags: ['Keto', 'High-Protein', 'Low-Carb'],
    dietTypes: ['keto', 'non_vegetarian', 'anything'],
    ingredients: ['Grilled chicken', 'Bacon', 'Hard-boiled eggs', 'Avocado', 'Blue cheese', 'Ranch dressing'],
    aiTip: 'Perfect macro ratio for ketogenic diet',
  },
  {
    id: 'l5',
    name: 'Tuna Poke Bowl',
    image: mealLunch,
    calories: 490,
    protein: 36,
    carbs: 45,
    fats: 18,
    prepTime: 15,
    tags: ['Pescatarian', 'Omega-3', 'Fresh'],
    dietTypes: ['pescatarian', 'anything'],
    ingredients: ['Fresh tuna', 'Sushi rice', 'Edamame', 'Cucumber', 'Sesame seeds', 'Soy sauce', 'Seaweed'],
    aiTip: 'Raw fish provides maximum omega-3 benefits',
  },
  {
    id: 'l6',
    name: 'Paleo Chicken Lettuce Wraps',
    image: mealLunch,
    calories: 420,
    protein: 35,
    carbs: 18,
    fats: 24,
    prepTime: 20,
    tags: ['Paleo', 'Low-Carb', 'Gluten-Free'],
    dietTypes: ['paleo', 'non_vegetarian', 'anything'],
    ingredients: ['Ground chicken', 'Butter lettuce', 'Water chestnuts', 'Coconut aminos', 'Ginger', 'Garlic'],
    aiTip: 'Light yet satisfying without the carb load',
  },
  {
    id: 'l7',
    name: 'Falafel Wrap',
    image: mealLunch,
    calories: 520,
    protein: 20,
    carbs: 58,
    fats: 22,
    prepTime: 25,
    tags: ['Vegan', 'Mediterranean', 'High-Fiber'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Falafel', 'Whole wheat pita', 'Hummus', 'Pickled vegetables', 'Tahini', 'Fresh herbs'],
    aiTip: 'Plant-based protein packed in every bite',
  },

  // DINNER OPTIONS
  {
    id: 'd1',
    name: 'Grilled Salmon with Sweet Potato',
    image: mealDinner,
    calories: 580,
    protein: 45,
    carbs: 38,
    fats: 24,
    prepTime: 30,
    tags: ['High-Protein', 'Omega-3', 'Gluten-Free'],
    dietTypes: ['pescatarian', 'anything'],
    ingredients: ['Atlantic salmon', 'Sweet potato', 'Asparagus', 'Lemon', 'Garlic', 'Olive oil'],
    aiTip: 'Rich in omega-3 fatty acids for heart health',
  },
  {
    id: 'd2',
    name: 'Beef Stir Fry',
    image: mealDinner,
    calories: 520,
    protein: 40,
    carbs: 35,
    fats: 22,
    prepTime: 25,
    tags: ['High-Protein', 'Quick', 'Asian-Inspired'],
    dietTypes: ['non_vegetarian', 'paleo', 'anything'],
    ingredients: ['Beef sirloin', 'Broccoli', 'Bell peppers', 'Snap peas', 'Ginger', 'Garlic', 'Coconut aminos'],
    aiTip: 'High iron content for energy and strength',
  },
  {
    id: 'd3',
    name: 'Vegan Mushroom Risotto',
    image: mealDinner,
    calories: 480,
    protein: 14,
    carbs: 68,
    fats: 16,
    prepTime: 35,
    tags: ['Vegan', 'Comfort Food', 'Italian'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Arborio rice', 'Mixed mushrooms', 'Vegetable broth', 'White wine', 'Nutritional yeast', 'Thyme'],
    aiTip: 'Creamy comfort food without the dairy',
  },
  {
    id: 'd4',
    name: 'Keto Zucchini Lasagna',
    image: mealDinner,
    calories: 450,
    protein: 32,
    carbs: 12,
    fats: 32,
    prepTime: 45,
    tags: ['Keto', 'Low-Carb', 'Italian'],
    dietTypes: ['keto', 'vegetarian', 'anything'],
    ingredients: ['Zucchini', 'Ricotta cheese', 'Mozzarella', 'Marinara sauce', 'Italian herbs', 'Parmesan'],
    aiTip: 'All the lasagna flavor with minimal carbs',
  },
  {
    id: 'd5',
    name: 'Shrimp Scampi',
    image: mealDinner,
    calories: 540,
    protein: 38,
    carbs: 42,
    fats: 22,
    prepTime: 20,
    tags: ['Pescatarian', 'Quick', 'Italian'],
    dietTypes: ['pescatarian', 'anything'],
    ingredients: ['Shrimp', 'Linguine', 'Garlic', 'White wine', 'Butter', 'Parsley', 'Lemon'],
    aiTip: 'Lean protein with healthy fats',
  },
  {
    id: 'd6',
    name: 'Paleo Herb Roasted Chicken',
    image: mealDinner,
    calories: 490,
    protein: 48,
    carbs: 18,
    fats: 26,
    prepTime: 50,
    tags: ['Paleo', 'Gluten-Free', 'Classic'],
    dietTypes: ['paleo', 'non_vegetarian', 'anything'],
    ingredients: ['Whole chicken', 'Rosemary', 'Thyme', 'Garlic', 'Lemon', 'Root vegetables', 'Olive oil'],
    aiTip: 'Classic comfort food, naturally paleo',
  },
  {
    id: 'd7',
    name: 'Vegetarian Curry',
    image: mealDinner,
    calories: 420,
    protein: 16,
    carbs: 52,
    fats: 18,
    prepTime: 35,
    tags: ['Vegetarian', 'Spicy', 'Indian'],
    dietTypes: ['vegetarian', 'vegan', 'anything'],
    ingredients: ['Chickpeas', 'Coconut milk', 'Spinach', 'Tomatoes', 'Curry spices', 'Basmati rice'],
    aiTip: 'Warming spices boost metabolism',
  },

  // SNACK OPTIONS
  {
    id: 's1',
    name: 'Energy Snack Platter',
    image: mealSnacks,
    calories: 280,
    protein: 12,
    carbs: 28,
    fats: 14,
    prepTime: 5,
    tags: ['Vegetarian', 'Energy Boost', 'No Cook'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Mixed nuts', 'Hummus', 'Carrot sticks', 'Apple slices', 'Energy balls'],
    aiTip: 'Perfect mid-afternoon snack to maintain energy levels',
  },
  {
    id: 's2',
    name: 'Greek Yogurt with Nuts',
    image: mealSnacks,
    calories: 220,
    protein: 18,
    carbs: 15,
    fats: 10,
    prepTime: 3,
    tags: ['Vegetarian', 'High-Protein', 'Quick'],
    dietTypes: ['vegetarian', 'anything'],
    ingredients: ['Greek yogurt', 'Almonds', 'Walnuts', 'Honey', 'Cinnamon'],
    aiTip: 'Quick protein boost between meals',
  },
  {
    id: 's3',
    name: 'Vegan Trail Mix',
    image: mealSnacks,
    calories: 320,
    protein: 10,
    carbs: 32,
    fats: 18,
    prepTime: 2,
    tags: ['Vegan', 'Energy Boost', 'Portable'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Almonds', 'Cashews', 'Dried cranberries', 'Pumpkin seeds', 'Dark chocolate chips'],
    aiTip: 'Perfect portable snack for busy days',
  },
  {
    id: 's4',
    name: 'Keto Fat Bombs',
    image: mealSnacks,
    calories: 180,
    protein: 4,
    carbs: 3,
    fats: 18,
    prepTime: 15,
    tags: ['Keto', 'Low-Carb', 'Sweet'],
    dietTypes: ['keto', 'anything'],
    ingredients: ['Coconut oil', 'Cocoa powder', 'Peanut butter', 'Stevia', 'Sea salt'],
    aiTip: 'Satisfies sweet cravings while staying in ketosis',
  },
  {
    id: 's5',
    name: 'Smoked Salmon Cucumber Bites',
    image: mealSnacks,
    calories: 150,
    protein: 14,
    carbs: 6,
    fats: 8,
    prepTime: 10,
    tags: ['Pescatarian', 'Low-Carb', 'Elegant'],
    dietTypes: ['pescatarian', 'keto', 'anything'],
    ingredients: ['Cucumber', 'Smoked salmon', 'Cream cheese', 'Dill', 'Capers'],
    aiTip: 'Refreshing and protein-packed',
  },
  {
    id: 's6',
    name: 'Paleo Beef Jerky & Veggies',
    image: mealSnacks,
    calories: 200,
    protein: 22,
    carbs: 10,
    fats: 8,
    prepTime: 5,
    tags: ['Paleo', 'High-Protein', 'Portable'],
    dietTypes: ['paleo', 'non_vegetarian', 'anything'],
    ingredients: ['Grass-fed beef jerky', 'Cherry tomatoes', 'Baby carrots', 'Celery'],
    aiTip: 'High protein, zero prep required',
  },
  {
    id: 's7',
    name: 'Edamame & Sea Salt',
    image: mealSnacks,
    calories: 190,
    protein: 17,
    carbs: 14,
    fats: 8,
    prepTime: 5,
    tags: ['Vegan', 'High-Protein', 'Asian'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Edamame', 'Sea salt', 'Chili flakes'],
    aiTip: 'Complete plant protein with all amino acids',
  },
];

// Weekly meal plans for each day
export const weeklyMealPlan: Record<number, { breakfast: string; lunch: string; dinner: string; snacks: string }> = {
  0: { breakfast: 'b1', lunch: 'l1', dinner: 'd1', snacks: 's1' }, // Monday
  1: { breakfast: 'b2', lunch: 'l3', dinner: 'd3', snacks: 's3' }, // Tuesday
  2: { breakfast: 'b3', lunch: 'l2', dinner: 'd7', snacks: 's2' }, // Wednesday
  3: { breakfast: 'b5', lunch: 'l7', dinner: 'd2', snacks: 's7' }, // Thursday
  4: { breakfast: 'b6', lunch: 'l5', dinner: 'd5', snacks: 's5' }, // Friday
  5: { breakfast: 'b4', lunch: 'l4', dinner: 'd4', snacks: 's4' }, // Saturday
  6: { breakfast: 'b7', lunch: 'l6', dinner: 'd6', snacks: 's6' }, // Sunday
};

// Get meals filtered by diet type
export const getMealsByDietType = (dietType: DietType): Meal[] => {
  if (dietType === 'anything') {
    return allMeals;
  }
  return allMeals.filter(meal => 
    meal.dietTypes.includes(dietType) || meal.dietTypes.includes('anything')
  );
};

// Get a meal by ID
export const getMealById = (id: string): Meal | undefined => {
  return allMeals.find(meal => meal.id === id);
};

// Get meals for a specific day and diet type
export const getMealsForDay = (dayIndex: number, dietType: DietType): {
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
  snacks: Meal[];
} => {
  const allFilteredMeals = getMealsByDietType(dietType);
  
  const breakfastMeals = allFilteredMeals.filter(m => m.id.startsWith('b'));
  const lunchMeals = allFilteredMeals.filter(m => m.id.startsWith('l'));
  const dinnerMeals = allFilteredMeals.filter(m => m.id.startsWith('d'));
  const snackMeals = allFilteredMeals.filter(m => m.id.startsWith('s'));
  
  // Rotate meals based on day index to show different meals each day
  const rotateArray = <T,>(arr: T[], index: number): T[] => {
    if (arr.length === 0) return arr;
    const rotateBy = index % arr.length;
    return [...arr.slice(rotateBy), ...arr.slice(0, rotateBy)];
  };
  
  return {
    breakfast: rotateArray(breakfastMeals, dayIndex),
    lunch: rotateArray(lunchMeals, dayIndex),
    dinner: rotateArray(dinnerMeals, dayIndex),
    snacks: rotateArray(snackMeals, dayIndex),
  };
};

// Get the primary meal for a day and meal type
export const getPrimaryMealForDay = (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks', dietType: DietType): Meal | undefined => {
  const mealsForDay = getMealsForDay(dayIndex, dietType);
  return mealsForDay[mealType][0];
};

// Legacy exports for backward compatibility
export const sampleMeals = allMeals;

export const getMealsByType = (type: 'breakfast' | 'lunch' | 'dinner' | 'snacks', dietType: DietType = 'anything'): Meal[] => {
  const filteredMeals = getMealsByDietType(dietType);
  const prefix = type === 'breakfast' ? 'b' : type === 'lunch' ? 'l' : type === 'dinner' ? 'd' : 's';
  return filteredMeals.filter(m => m.id.startsWith(prefix));
};
