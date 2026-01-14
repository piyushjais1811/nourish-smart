import { Meal } from '@/types/user';
import mealBreakfast from '@/assets/meal-breakfast.jpg';
import mealLunch from '@/assets/meal-lunch.jpg';
import mealDinner from '@/assets/meal-dinner.jpg';
import mealSnacks from '@/assets/meal-snacks.jpg';

export const sampleMeals: Meal[] = [
  {
    id: '1',
    name: 'Berry Yogurt Parfait',
    image: mealBreakfast,
    calories: 320,
    protein: 18,
    carbs: 42,
    fats: 8,
    prepTime: 10,
    tags: ['Vegetarian', 'High-Protein', 'Quick'],
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey', 'Chia seeds'],
    aiTip: 'Great post-workout breakfast for muscle recovery',
  },
  {
    id: '2',
    name: 'Grilled Chicken Quinoa Bowl',
    image: mealLunch,
    calories: 520,
    protein: 42,
    carbs: 48,
    fats: 16,
    prepTime: 25,
    tags: ['High-Protein', 'Gluten-Free', 'Meal Prep'],
    ingredients: ['Chicken breast', 'Quinoa', 'Avocado', 'Bell peppers', 'Mixed greens', 'Olive oil'],
    aiTip: 'Complete protein with all essential amino acids',
  },
  {
    id: '3',
    name: 'Grilled Salmon with Sweet Potato',
    image: mealDinner,
    calories: 580,
    protein: 45,
    carbs: 38,
    fats: 24,
    prepTime: 30,
    tags: ['High-Protein', 'Omega-3', 'Gluten-Free'],
    ingredients: ['Atlantic salmon', 'Sweet potato', 'Asparagus', 'Lemon', 'Garlic', 'Olive oil'],
    aiTip: 'Rich in omega-3 fatty acids for heart health',
  },
  {
    id: '4',
    name: 'Energy Snack Platter',
    image: mealSnacks,
    calories: 280,
    protein: 12,
    carbs: 28,
    fats: 14,
    prepTime: 5,
    tags: ['Vegetarian', 'Energy Boost', 'No Cook'],
    ingredients: ['Mixed nuts', 'Hummus', 'Carrot sticks', 'Apple slices', 'Energy balls'],
    aiTip: 'Perfect mid-afternoon snack to maintain energy levels',
  },
  {
    id: '5',
    name: 'Overnight Oats',
    image: mealBreakfast,
    calories: 380,
    protein: 14,
    carbs: 58,
    fats: 10,
    prepTime: 5,
    tags: ['Vegetarian', 'Meal Prep', 'High-Fiber'],
    ingredients: ['Rolled oats', 'Almond milk', 'Chia seeds', 'Banana', 'Peanut butter', 'Maple syrup'],
    aiTip: 'Prepare the night before for a grab-and-go breakfast',
  },
  {
    id: '6',
    name: 'Mediterranean Salad',
    image: mealLunch,
    calories: 420,
    protein: 22,
    carbs: 32,
    fats: 24,
    prepTime: 15,
    tags: ['Vegetarian', 'Low-Carb', 'Fresh'],
    ingredients: ['Chickpeas', 'Cucumber', 'Tomatoes', 'Feta cheese', 'Olives', 'Olive oil', 'Lemon'],
    aiTip: 'High in fiber and healthy fats for sustained energy',
  },
];

export const getMealsByType = (type: 'breakfast' | 'lunch' | 'dinner' | 'snacks'): Meal[] => {
  switch (type) {
    case 'breakfast':
      return sampleMeals.filter(m => m.id === '1' || m.id === '5');
    case 'lunch':
      return sampleMeals.filter(m => m.id === '2' || m.id === '6');
    case 'dinner':
      return sampleMeals.filter(m => m.id === '3');
    case 'snacks':
      return sampleMeals.filter(m => m.id === '4');
    default:
      return [];
  }
};
