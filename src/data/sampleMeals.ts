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
import tofuScramble from '@/assets/meals/tofu-scramble.jpg';
import chiaPudding from '@/assets/meals/chia-pudding.jpg';
import ketoAvocadoEggs from '@/assets/meals/keto-avocado-eggs.jpg';
import ketoOmelette from '@/assets/meals/keto-omelette.jpg';

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
import veganLentilSoup from '@/assets/meals/vegan-lentil-soup.jpg';
import veganTacos from '@/assets/meals/vegan-tacos.jpg';
import ketoCauliflowerRice from '@/assets/meals/keto-cauliflower-rice.jpg';

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
import veganThaiCurry from '@/assets/meals/vegan-thai-curry.jpg';
import veganStuffedPeppers from '@/assets/meals/vegan-stuffed-peppers.jpg';
import ketoSteak from '@/assets/meals/keto-steak.jpg';

// Image imports - Snacks
import samosa from '@/assets/meals/samosa.jpg';
import energyBalls from '@/assets/meals/energy-balls.jpg';
import dhokla from '@/assets/meals/dhokla.jpg';
import greekYogurt from '@/assets/meals/greek-yogurt.jpg';
import hummusVeggies from '@/assets/meals/hummus-veggies.jpg';
import edamame from '@/assets/meals/edamame.jpg';
import trailMix from '@/assets/meals/trail-mix.jpg';
import proteinShake from '@/assets/meals/protein-shake.jpg';
import ketoFatBombs from '@/assets/meals/keto-fat-bombs.jpg';
import veganRoastedChickpeas from '@/assets/meals/vegan-roasted-chickpeas.jpg';

// Extended Meal interface with additional properties for filtering
interface ExtendedMeal extends Meal {
  origin: 'indian' | 'global' | 'mediterranean' | 'asian' | 'mexican';
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
    instructions: [
      'Soak rice and urad dal separately for 6 hours, then grind to smooth batter',
      'Let the batter ferment overnight until doubled in size',
      'For filling, cook potatoes and mash coarsely with sautéed onions and spices',
      'Heat a flat pan, pour batter and spread thin in circular motion',
      'Drizzle oil around edges, cook until golden and crispy',
      'Place potato filling in center and fold the dosa',
      'Serve hot with coconut chutney and sambar'
    ],
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
    instructions: [
      'Rinse poha in water and drain, let it soften for 5 minutes',
      'Heat oil and add mustard seeds, let them splutter',
      'Add peanuts and roast until golden',
      'Add chopped onions, green chilies, and curry leaves, sauté until onions are soft',
      'Add turmeric, salt, and sugar, mix well',
      'Add the softened poha and mix gently',
      'Garnish with fresh coriander and lemon juice, serve warm'
    ],
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
    instructions: [
      'For idli batter, soak rice and urad dal, grind and ferment overnight',
      'Pour batter into greased idli moulds and steam for 12-15 minutes',
      'For sambar, cook toor dal until soft',
      'Sauté vegetables with sambar powder and tamarind extract',
      'Add cooked dal and simmer for 10 minutes',
      'Prepare tempering with mustard seeds, curry leaves, and dried chilies',
      'Serve hot idlis with sambar and coconut chutney'
    ],
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
    instructions: [
      'Dry roast semolina until fragrant, set aside',
      'Heat oil, add mustard seeds and let them splutter',
      'Add cashews and fry until golden',
      'Sauté onions, green chilies, and vegetables',
      'Add water with salt and bring to boil',
      'Slowly add roasted semolina while stirring continuously',
      'Cook covered for 3-4 minutes, garnish with coriander'
    ],
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
    instructions: [
      'Knead soft dough with whole wheat flour and water, rest for 20 minutes',
      'Boil and mash potatoes, mix with spices, chilies, and coriander',
      'Make small balls of dough, roll out, place filling in center',
      'Seal edges and roll again gently into flat circle',
      'Cook on hot griddle with ghee until golden spots appear on both sides',
      'Serve hot with yogurt, pickle, and butter'
    ],
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
    instructions: [
      'Beat eggs with salt and pepper',
      'Heat oil, sauté onions until translucent',
      'Add tomatoes, green chilies, and cook until soft',
      'Add turmeric, red chili powder, and cumin',
      'Pour beaten eggs and scramble on medium heat',
      'Stir continuously until eggs are cooked but still moist',
      'Garnish with coriander, serve with hot rotis'
    ],
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
    instructions: [
      'Layer Greek yogurt in a glass or bowl',
      'Add a layer of mixed fresh berries',
      'Sprinkle granola for crunch',
      'Drizzle honey over the top',
      'Add chia seeds for extra nutrition',
      'Repeat layers if desired',
      'Serve immediately or refrigerate for later'
    ],
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
    instructions: [
      'Combine oats and chia seeds in a jar',
      'Pour almond milk over the oats',
      'Add maple syrup and mix well',
      'Slice banana and add to the mixture',
      'Cover and refrigerate overnight (minimum 6 hours)',
      'In morning, stir and add fresh fruits',
      'Enjoy cold or microwave for 2 minutes if preferred warm'
    ],
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
    tags: ['Global', 'High-Protein', 'Keto-Friendly'],
    dietTypes: ['vegetarian', 'keto', 'anything'],
    ingredients: ['Sourdough bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Feta cheese'],
    instructions: [
      'Toast sourdough bread until golden',
      'Mash ripe avocado with salt, pepper, and lime juice',
      'Spread avocado mixture on toast',
      'Poach or fry eggs to desired doneness',
      'Place eggs on top of avocado toast',
      'Add halved cherry tomatoes and crumbled feta',
      'Season with red pepper flakes and serve'
    ],
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
    instructions: [
      'Freeze mango, pineapple, and banana chunks overnight',
      'Blend frozen fruits with coconut milk until thick and smooth',
      'Pour into a bowl',
      'Top with fresh fruit slices',
      'Add granola for crunch',
      'Sprinkle coconut flakes and chia seeds',
      'Serve immediately before it melts'
    ],
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
    instructions: [
      'Cook bacon strips in a pan until crispy',
      'Remove bacon and set aside, keep the fat',
      'Fry eggs in bacon fat to your preference',
      'Slice avocado and halve cherry tomatoes',
      'Arrange bacon, eggs, and vegetables on plate',
      'Season with salt and freshly ground pepper',
      'Serve immediately while hot'
    ],
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
    instructions: [
      'Toast the bagel halves until golden',
      'Spread cream cheese generously on both halves',
      'Layer smoked salmon slices on top',
      'Add thinly sliced red onion rings',
      'Sprinkle capers over the salmon',
      'Garnish with fresh dill',
      'Squeeze lemon juice if desired and serve'
    ],
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
  // NEW VEGAN BREAKFAST
  {
    id: 'b13',
    name: 'Tofu Scramble',
    image: tofuScramble,
    calories: 320,
    protein: 24,
    carbs: 18,
    fats: 20,
    prepTime: 15,
    tags: ['Global', 'Vegan', 'High-Protein', 'Quick'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Firm tofu', 'Bell peppers', 'Spinach', 'Turmeric', 'Nutritional yeast', 'Onions'],
    instructions: [
      'Press tofu to remove excess water',
      'Crumble tofu into small pieces',
      'Sauté onions and bell peppers until soft',
      'Add crumbled tofu with turmeric for color',
      'Add nutritional yeast for cheesy flavor',
      'Fold in fresh spinach until wilted',
      'Season with black salt for eggy flavor, serve hot'
    ],
    aiTip: 'Perfect egg-free protein boost for vegans',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['soy'],
    suitableFor: {
      goals: ['build_muscle', 'lose_fat', 'maintain'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b14',
    name: 'Chia Pudding with Berries',
    image: chiaPudding,
    calories: 290,
    protein: 8,
    carbs: 32,
    fats: 14,
    prepTime: 10,
    tags: ['Global', 'Vegan', 'High-Fiber', 'Meal Prep'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Chia seeds', 'Coconut milk', 'Fresh berries', 'Maple syrup', 'Vanilla extract', 'Coconut flakes'],
    instructions: [
      'Mix chia seeds with coconut milk in a jar',
      'Add maple syrup and vanilla extract',
      'Stir well to prevent clumping',
      'Refrigerate for at least 4 hours or overnight',
      'Stir again before serving',
      'Top with fresh berries and coconut flakes',
      'Add a drizzle of maple syrup if desired'
    ],
    aiTip: 'High in omega-3s and fiber for sustained energy',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  // NEW KETO BREAKFAST
  {
    id: 'b15',
    name: 'Keto Avocado Egg Cups',
    image: ketoAvocadoEggs,
    calories: 380,
    protein: 18,
    carbs: 6,
    fats: 32,
    prepTime: 25,
    tags: ['Global', 'Keto', 'Low-Carb', 'High-Fat'],
    dietTypes: ['keto', 'paleo', 'non_vegetarian', 'anything'],
    ingredients: ['Avocados', 'Eggs', 'Bacon bits', 'Cheese', 'Chives', 'Salt and pepper'],
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Halve avocados and remove pits',
      'Scoop out some flesh to make room for eggs',
      'Place avocado halves in muffin tin to stabilize',
      'Crack an egg into each avocado half',
      'Top with bacon bits and cheese',
      'Bake for 15-20 minutes until eggs are set'
    ],
    aiTip: 'Perfect keto breakfast with healthy fats',
    origin: 'global',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['eggs', 'dairy'],
    suitableFor: {
      goals: ['lose_fat', 'build_muscle'],
      activityLevels: ['moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'breakfast',
  },
  {
    id: 'b16',
    name: 'Keto Veggie Omelette',
    image: ketoOmelette,
    calories: 350,
    protein: 22,
    carbs: 8,
    fats: 26,
    prepTime: 15,
    tags: ['Global', 'Keto', 'Vegetarian', 'High-Protein'],
    dietTypes: ['keto', 'vegetarian', 'anything'],
    ingredients: ['Eggs', 'Cheese', 'Spinach', 'Mushrooms', 'Bell peppers', 'Butter'],
    instructions: [
      'Whisk eggs with salt and pepper',
      'Sauté mushrooms and peppers in butter',
      'Add spinach until wilted, remove and set aside',
      'Melt more butter in pan on medium heat',
      'Pour eggs and swirl to coat pan evenly',
      'Add cheese and vegetables to one half',
      'Fold omelette and serve immediately'
    ],
    aiTip: 'Low-carb high-protein start to your day',
    origin: 'global',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: ['eggs', 'dairy'],
    suitableFor: {
      goals: ['lose_fat', 'build_muscle', 'maintain'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
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
    instructions: [
      'Soak rajma overnight, pressure cook until soft',
      'Prepare onion-tomato masala with ginger-garlic paste',
      'Add rajma with some cooking liquid',
      'Add spices - garam masala, cumin, coriander powder',
      'Simmer for 20 minutes until thick and creamy',
      'Cook basmati rice separately',
      'Serve rajma over rice with raw onions and lemon'
    ],
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
    instructions: [
      'Soak chickpeas overnight and pressure cook until tender',
      'Make bhatura dough with flour, yogurt, and oil, let rest',
      'Prepare spicy onion-tomato gravy',
      'Add cooked chickpeas with chole masala',
      'Simmer until gravy thickens',
      'Roll bhatura dough and deep fry until puffed',
      'Serve hot chole with bhatura and pickled onions'
    ],
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
    instructions: [
      'Wash and pressure cook yellow lentils until soft',
      'Mash lightly for creamy texture',
      'Prepare tadka with ghee, cumin, garlic, and chilies',
      'Add turmeric and tomatoes to tadka',
      'Pour tadka over dal and mix',
      'Garnish with fresh coriander',
      'Serve with steamed basmati rice'
    ],
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
    instructions: [
      'Cut paneer into cubes, marinate in spiced yogurt',
      'Grill or pan-fry paneer until charred',
      'Prepare rich tomato-based gravy with cashew paste',
      'Add grilled paneer to the gravy',
      'Finish with cream and kasuri methi',
      'Simmer for 5 minutes',
      'Serve with naan or rice'
    ],
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
    instructions: [
      'Cut chicken into chunks, marinate in yogurt and spices',
      'Let it marinate for at least 2 hours',
      'Thread onto skewers',
      'Grill or bake until charred and cooked through',
      'Cook basmati rice with whole spices',
      'Prepare fresh mint chutney',
      'Serve tikka with rice and chutney'
    ],
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
    instructions: [
      'Season chicken with herbs and grill until cooked',
      'Cook quinoa according to package instructions',
      'Roast bell peppers with olive oil',
      'Slice avocado',
      'Arrange quinoa as base in bowl',
      'Top with sliced grilled chicken',
      'Add vegetables and drizzle with dressing'
    ],
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
    instructions: [
      'Drain and rinse chickpeas',
      'Chop cucumber, tomatoes, and red onion',
      'Combine vegetables in a large bowl',
      'Add olives and crumbled feta',
      'Whisk olive oil with lemon juice and herbs',
      'Toss salad with dressing',
      'Season with salt and pepper to taste'
    ],
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
    instructions: [
      'Cook brown rice and set aside',
      'Roast chickpeas with spices until crispy',
      'Cube and roast sweet potato',
      'Massage kale with olive oil and lemon',
      'Prepare tahini dressing with lemon and garlic',
      'Arrange rice, vegetables, and chickpeas in bowl',
      'Drizzle with tahini dressing'
    ],
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
    instructions: [
      'Make or heat pre-made falafel patties',
      'Warm the pita bread',
      'Spread hummus generously on pita',
      'Add falafel and pickled vegetables',
      'Drizzle tahini sauce over filling',
      'Add fresh herbs and lettuce',
      'Roll tightly and serve'
    ],
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
    instructions: [
      'Cook sushi rice and season with rice vinegar',
      'Cube fresh sushi-grade tuna',
      'Marinate tuna in soy sauce and sesame oil',
      'Prepare toppings: cucumber, edamame, avocado',
      'Place rice in bowl as base',
      'Arrange tuna and toppings on rice',
      'Garnish with sesame seeds and seaweed'
    ],
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
  // NEW VEGAN LUNCH
  {
    id: 'l11',
    name: 'Vegan Lentil Soup',
    image: veganLentilSoup,
    calories: 350,
    protein: 18,
    carbs: 52,
    fats: 8,
    prepTime: 35,
    tags: ['Global', 'Vegan', 'High-Fiber', 'Comfort Food'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Red lentils', 'Coconut milk', 'Carrots', 'Onions', 'Ginger', 'Turmeric', 'Cilantro'],
    instructions: [
      'Sauté onions, garlic, and ginger until fragrant',
      'Add carrots and cook for 3 minutes',
      'Add red lentils, turmeric, and cumin',
      'Pour vegetable broth and coconut milk',
      'Simmer for 25 minutes until lentils are soft',
      'Blend partially for creamy texture',
      'Garnish with fresh cilantro and serve'
    ],
    aiTip: 'Warming and nourishing, perfect for cold days',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  {
    id: 'l12',
    name: 'Vegan Black Bean Tacos',
    image: veganTacos,
    calories: 420,
    protein: 16,
    carbs: 58,
    fats: 16,
    prepTime: 20,
    tags: ['Mexican', 'Vegan', 'High-Fiber', 'Spicy'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Black beans', 'Corn tortillas', 'Avocado', 'Salsa', 'Lime', 'Cilantro', 'Red onion'],
    instructions: [
      'Season and heat black beans with cumin and chili',
      'Warm corn tortillas',
      'Mash avocado with lime juice and salt',
      'Fill tortillas with seasoned beans',
      'Top with avocado crema',
      'Add fresh salsa and pickled onions',
      'Garnish with cilantro and lime wedge'
    ],
    aiTip: 'High fiber plant-based Mexican favorite',
    origin: 'mexican',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['maintain', 'lose_fat'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'lunch',
  },
  // NEW KETO LUNCH
  {
    id: 'l13',
    name: 'Keto Cauliflower Fried Rice',
    image: ketoCauliflowerRice,
    calories: 320,
    protein: 22,
    carbs: 12,
    fats: 22,
    prepTime: 20,
    tags: ['Asian', 'Keto', 'Low-Carb', 'Quick'],
    dietTypes: ['keto', 'non_vegetarian', 'anything'],
    ingredients: ['Cauliflower rice', 'Eggs', 'Vegetables', 'Soy sauce', 'Sesame oil', 'Green onions'],
    instructions: [
      'Rice cauliflower in food processor',
      'Scramble eggs and set aside',
      'Sauté vegetables in sesame oil',
      'Add cauliflower rice and stir-fry',
      'Add scrambled eggs back to pan',
      'Season with soy sauce and pepper',
      'Garnish with green onions and sesame seeds'
    ],
    aiTip: 'Low-carb alternative to traditional fried rice',
    origin: 'asian',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['eggs', 'soy'],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
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
    instructions: [
      'Blanch spinach and blend to smooth paste',
      'Sauté ginger-garlic paste in ghee',
      'Add onions and tomatoes, cook until soft',
      'Add spinach paste and spices',
      'Add cubed paneer and cream',
      'Simmer for 10 minutes',
      'Serve hot with fresh rotis'
    ],
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
    instructions: [
      'Soak basmati rice for 30 minutes',
      'Cook vegetables with biryani masala',
      'Parboil rice with whole spices',
      'Layer rice and vegetables in pot',
      'Add saffron milk and fried onions',
      'Seal with dough and cook on low heat',
      'Rest for 10 minutes before serving'
    ],
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
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Grill or tandoor chicken pieces',
      'Make tomato-based gravy with butter and cream',
      'Add kasuri methi and honey for sweetness',
      'Add grilled chicken to gravy',
      'Simmer for 10 minutes',
      'Serve with naan or rice'
    ],
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
    instructions: [
      'Marinate fish with turmeric and salt',
      'Make coconut-based gravy with curry leaves',
      'Add tamarind for tanginess',
      'Gently add fish pieces to gravy',
      'Simmer until fish is cooked through',
      'Prepare steamed basmati rice',
      'Serve curry over rice'
    ],
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
    instructions: [
      'Season salmon with lemon, garlic, and herbs',
      'Cube sweet potatoes and toss with olive oil',
      'Roast sweet potatoes at 400°F for 20 minutes',
      'Grill salmon skin-side down for 4-5 minutes',
      'Flip and cook until desired doneness',
      'Steam or roast asparagus',
      'Serve salmon with vegetables'
    ],
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
    instructions: [
      'Sauté mushrooms until golden, set aside',
      'Toast arborio rice in olive oil',
      'Add white wine and stir until absorbed',
      'Add warm broth one ladle at a time',
      'Keep stirring and adding broth for 20 minutes',
      'Fold in mushrooms and nutritional yeast',
      'Season and serve immediately'
    ],
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
    instructions: [
      'Slice beef thinly against the grain',
      'Marinate beef in soy sauce and cornstarch',
      'Stir-fry vegetables in high heat wok',
      'Remove vegetables and cook beef quickly',
      'Add sauce ingredients to wok',
      'Return vegetables and toss together',
      'Serve over rice or noodles'
    ],
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
    instructions: [
      'Cook linguine until al dente',
      'Sauté garlic in butter and olive oil',
      'Add shrimp and cook until pink',
      'Pour in white wine and lemon juice',
      'Toss in cooked pasta',
      'Add parsley and red pepper flakes',
      'Serve with extra lemon wedges'
    ],
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
    instructions: [
      'Spiralize zucchini into noodles',
      'Salt and drain for 10 minutes',
      'Make alfredo sauce with cream and parmesan',
      'Sauté garlic in butter',
      'Add zucchini noodles and toss',
      'Pour sauce and mix gently',
      'Top with pine nuts and fresh basil'
    ],
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
    instructions: [
      'Marinate chicken in herbs, lemon, and olive oil',
      'Cook quinoa and fluff with fork',
      'Grill chicken for 6-7 minutes each side',
      'Roast vegetables with olive oil',
      'Let chicken rest for 5 minutes, then slice',
      'Arrange quinoa and vegetables on plate',
      'Top with sliced chicken'
    ],
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
  // NEW VEGAN DINNER
  {
    id: 'd11',
    name: 'Vegan Thai Green Curry',
    image: veganThaiCurry,
    calories: 420,
    protein: 18,
    carbs: 48,
    fats: 20,
    prepTime: 30,
    tags: ['Asian', 'Vegan', 'Spicy', 'Aromatic'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Tofu', 'Coconut milk', 'Green curry paste', 'Thai basil', 'Bamboo shoots', 'Bell peppers'],
    instructions: [
      'Press and cube tofu, then pan-fry until golden',
      'Sauté green curry paste in coconut cream',
      'Add coconut milk and bring to simmer',
      'Add vegetables and tofu',
      'Season with palm sugar and soy sauce',
      'Add Thai basil at the end',
      'Serve over jasmine rice'
    ],
    aiTip: 'Authentic Thai flavors in a plant-based dish',
    origin: 'asian',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: ['soy'],
    suitableFor: {
      goals: ['maintain', 'build_muscle'],
      activityLevels: ['lightly_active', 'moderately_active', 'very_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  {
    id: 'd12',
    name: 'Vegan Stuffed Peppers',
    image: veganStuffedPeppers,
    calories: 380,
    protein: 14,
    carbs: 52,
    fats: 14,
    prepTime: 45,
    tags: ['Global', 'Vegan', 'High-Fiber', 'Colorful'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Bell peppers', 'Quinoa', 'Black beans', 'Corn', 'Tomatoes', 'Avocado', 'Cumin'],
    instructions: [
      'Cut tops off peppers and remove seeds',
      'Cook quinoa and mix with beans and corn',
      'Season filling with cumin and chili powder',
      'Stuff peppers with quinoa mixture',
      'Bake at 375°F for 30 minutes',
      'Top with diced avocado',
      'Garnish with fresh cilantro'
    ],
    aiTip: 'Complete plant protein with fiber-rich ingredients',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'dinner',
  },
  // NEW KETO DINNER
  {
    id: 'd13',
    name: 'Keto Ribeye Steak',
    image: ketoSteak,
    calories: 650,
    protein: 52,
    carbs: 4,
    fats: 48,
    prepTime: 25,
    tags: ['Global', 'Keto', 'High-Protein', 'Indulgent'],
    dietTypes: ['keto', 'paleo', 'non_vegetarian', 'anything'],
    ingredients: ['Ribeye steak', 'Butter', 'Rosemary', 'Garlic', 'Asparagus', 'Mushrooms'],
    instructions: [
      'Bring steak to room temperature',
      'Season generously with salt and pepper',
      'Sear in hot cast iron pan 4-5 minutes per side',
      'Add butter, garlic, and rosemary for basting',
      'Rest steak for 5 minutes',
      'Sauté mushrooms and asparagus in butter',
      'Serve steak with compound butter on top'
    ],
    aiTip: 'Perfect keto meal with high fat and zero carbs',
    origin: 'global',
    isVegetarian: false,
    isVegan: false,
    isNonVeg: true,
    containsAllergies: ['dairy'],
    suitableFor: {
      goals: ['build_muscle', 'lose_fat'],
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
    instructions: [
      'Make dough with whole wheat flour and oil',
      'Prepare spiced potato and pea filling',
      'Roll dough and cut into semi-circles',
      'Form cones and fill with mixture',
      'Seal edges with water',
      'Brush with oil and bake at 400°F',
      'Serve hot with mint chutney'
    ],
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
    instructions: [
      'Mix gram flour with yogurt and water',
      'Add turmeric, ginger paste, and eno',
      'Pour into greased pan and steam for 15 minutes',
      'Prepare tempering with mustard, chilies, curry leaves',
      'Cut dhokla into squares',
      'Pour tempering over dhokla',
      'Garnish with coriander and coconut'
    ],
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
    instructions: [
      'Blend dates until sticky',
      'Add oats, almonds, and cocoa powder',
      'Process until mixture comes together',
      'Roll into small balls',
      'Roll in shredded coconut',
      'Refrigerate for 30 minutes',
      'Store in airtight container'
    ],
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
    instructions: [
      'Spoon Greek yogurt into a bowl',
      'Drizzle honey over yogurt',
      'Add chopped almonds and walnuts',
      'Sprinkle with cinnamon',
      'Mix gently if desired',
      'Serve immediately'
    ],
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
    instructions: [
      'Spoon hummus into a bowl',
      'Cut carrots into sticks',
      'Slice cucumber and bell peppers',
      'Arrange vegetables around hummus',
      'Add pita chips if desired',
      'Drizzle olive oil on hummus',
      'Sprinkle with paprika'
    ],
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
    instructions: [
      'Boil edamame for 5 minutes or steam',
      'Drain and pat dry',
      'Toss with sea salt',
      'Add chili flakes if desired',
      'Serve warm or cold'
    ],
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
    instructions: [
      'Combine all nuts in a bowl',
      'Add dried cranberries',
      'Mix in pumpkin seeds',
      'Add dark chocolate chips',
      'Toss together',
      'Store in airtight container'
    ],
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
    instructions: [
      'Add almond milk to blender',
      'Add protein powder',
      'Slice banana and add',
      'Add a handful of almonds',
      'Drizzle honey',
      'Blend until smooth',
      'Serve immediately'
    ],
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
  // NEW VEGAN SNACK
  {
    id: 's9',
    name: 'Roasted Chickpeas',
    image: veganRoastedChickpeas,
    calories: 170,
    protein: 9,
    carbs: 27,
    fats: 4,
    prepTime: 35,
    tags: ['Global', 'Vegan', 'High-Fiber', 'Crunchy'],
    dietTypes: ['vegan', 'vegetarian', 'anything'],
    ingredients: ['Chickpeas', 'Olive oil', 'Paprika', 'Cumin', 'Garlic powder', 'Salt'],
    instructions: [
      'Drain and rinse chickpeas',
      'Pat completely dry with paper towels',
      'Toss with olive oil and spices',
      'Spread on baking sheet in single layer',
      'Roast at 400°F for 30-40 minutes',
      'Shake pan every 10 minutes',
      'Let cool for maximum crunch'
    ],
    aiTip: 'Healthy crunchy snack high in protein and fiber',
    origin: 'global',
    isVegetarian: true,
    isVegan: true,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['sedentary', 'lightly_active', 'moderately_active'],
      genders: ['male', 'female', 'other'],
    },
    mealType: 'snacks',
  },
  // NEW KETO SNACK
  {
    id: 's10',
    name: 'Keto Fat Bombs',
    image: ketoFatBombs,
    calories: 180,
    protein: 2,
    carbs: 3,
    fats: 18,
    prepTime: 20,
    tags: ['Global', 'Keto', 'High-Fat', 'Sweet'],
    dietTypes: ['keto', 'vegetarian', 'anything'],
    ingredients: ['Coconut oil', 'Dark chocolate', 'Coconut butter', 'Stevia', 'Vanilla extract', 'Sea salt'],
    instructions: [
      'Melt coconut oil and coconut butter',
      'Add stevia and vanilla extract',
      'Pour into silicone molds',
      'Freeze for 30 minutes',
      'Melt dark chocolate',
      'Dip frozen balls in chocolate',
      'Sprinkle with sea salt and refrigerate'
    ],
    aiTip: 'Satisfies sweet cravings while staying in ketosis',
    origin: 'global',
    isVegetarian: true,
    isVegan: false,
    isNonVeg: false,
    containsAllergies: [],
    suitableFor: {
      goals: ['lose_fat', 'maintain'],
      activityLevels: ['lightly_active', 'moderately_active'],
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
  
  // Strict vegetarian check - must not be non-veg AND must not contain eggs
  if (dietType === 'vegetarian') {
    const hasEggs = meal.containsAllergies.includes('eggs');
    return meal.isVegetarian && !meal.isNonVeg && !hasEggs;
  }
  
  // Strict vegan check - no animal products at all
  if (dietType === 'vegan') {
    const hasEggs = meal.containsAllergies.includes('eggs');
    const hasDairy = meal.containsAllergies.includes('dairy');
    return meal.isVegan && !meal.isNonVeg && !hasEggs && !hasDairy;
  }
  
  // Non-vegetarian can eat anything including veg
  if (dietType === 'non_vegetarian') {
    return true;
  }
  
  // For keto, check if meal is low carb
  if (dietType === 'keto') {
    return meal.dietTypes.includes('keto') || meal.carbs < 20;
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
    
    // 3. Additional check for eggs - exclude for vegan and vegetarian
    if ((dietType === 'vegan' || dietType === 'vegetarian') && meal.containsAllergies.includes('eggs')) {
      return false;
    }
    
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
  
  // Gender match
  if (userProfile.gender && meal.suitableFor.genders.includes(userProfile.gender)) {
    score += 10;
  }
  
  // Age suitability
  if (userProfile.age) {
    const { minAge, maxAge } = meal.suitableFor;
    if ((!minAge || userProfile.age >= minAge) && (!maxAge || userProfile.age <= maxAge)) {
      score += 10;
    }
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
      // Completely different meals each day - more aggressive rotation
      const rotateBy = (day * 2) % Math.max(meals.length, 1);
      const rotated = [...meals.slice(rotateBy), ...meals.slice(0, rotateBy)];
      // Ensure we return 2 different meals than previous day by double-checking
      return rotated.slice(0, Math.min(2, rotated.length));
    } else {
      // slight_variation - rotate by 1 position each day
      const rotateBy = day % Math.max(meals.length, 1);
      const rotated = [...meals.slice(rotateBy), ...meals.slice(0, rotateBy)];
      return rotated.slice(0, Math.min(2, rotated.length));
    }
  };
  
  // Check if user has selected this meal type
  const mealsPerDay = userProfile.mealsPerDay || { breakfast: true, lunch: true, snacks: true, dinner: true };
  
  return {
    breakfast: mealsPerDay.breakfast ? getRotatedMeals(sortedBreakfast, dayIndex) : [],
    lunch: mealsPerDay.lunch ? getRotatedMeals(sortedLunch, dayIndex) : [],
    dinner: mealsPerDay.dinner ? getRotatedMeals(sortedDinner, dayIndex) : [],
    snacks: mealsPerDay.snacks ? getRotatedMeals(sortedSnacks, dayIndex) : [],
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

// Get meal by ID
export const getMealById = (id: string): ExtendedMeal | undefined => {
  return allMeals.find(meal => meal.id === id);
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
