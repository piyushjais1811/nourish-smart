import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, TrendingDown, TrendingUp, Dumbbell, Scale, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProgressSteps } from '@/components/onboarding/ProgressSteps';
import { GoalCard } from '@/components/onboarding/GoalCard';
import { useUser } from '@/contexts/UserContext';
import { ActivityLevel, FitnessGoal, DietType, MealVariety, Allergy } from '@/types/user';
import { cn } from '@/lib/utils';

const stepLabels = ['Basic Info', 'Goals', 'Diet', 'Allergies'];

const activityLevels: { value: ActivityLevel; label: string; description: string }[] = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little to no exercise' },
  { value: 'lightly_active', label: 'Lightly Active', description: '1-3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active', description: '3-5 days/week' },
  { value: 'very_active', label: 'Very Active', description: '6-7 days/week' },
];

const goals: { value: FitnessGoal; label: string; description: string; icon: typeof TrendingDown; color: string }[] = [
  { value: 'lose_fat', label: 'Lose Fat', description: 'Reduce body fat while maintaining muscle', icon: TrendingDown, color: 'bg-goal-fat-loss' },
  { value: 'build_muscle', label: 'Build Muscle', description: 'Gain lean muscle mass', icon: Dumbbell, color: 'bg-goal-muscle' },
  { value: 'gain_weight', label: 'Gain Weight', description: 'Healthy weight gain', icon: TrendingUp, color: 'bg-goal-gain' },
  { value: 'maintain', label: 'Maintain Weight', description: 'Keep your current physique', icon: Scale, color: 'bg-goal-maintain' },
];

const dietTypes: { value: DietType; label: string }[] = [
  { value: 'anything', label: 'Anything' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'non_vegetarian', label: 'Non-Vegetarian' },
  { value: 'keto', label: 'Keto' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'pescatarian', label: 'Pescatarian' },
];

const mealVarieties: { value: MealVariety; label: string; description: string }[] = [
  { value: 'same_daily', label: 'Same Meals Daily', description: 'Consistent routine' },
  { value: 'slight_variation', label: 'Slight Variation', description: 'Some variety each day' },
  { value: 'new_daily', label: 'New Meals Every Day', description: 'Maximum variety' },
];

const allergies: { value: Allergy; label: string }[] = [
  { value: 'nuts', label: 'Nuts' },
  { value: 'dairy', label: 'Dairy' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'soy', label: 'Soy' },
  { value: 'gluten', label: 'Gluten' },
  { value: 'seafood', label: 'Seafood' },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, setIsOnboarded, currentStep, setCurrentStep } = useUser();
  const [customAllergy, setCustomAllergy] = useState('');

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOnboarded(true);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const updateProfile = (updates: Partial<typeof userProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const toggleAllergy = (allergy: Allergy) => {
    const current = userProfile.allergies || [];
    if (current.includes(allergy)) {
      updateProfile({ allergies: current.filter((a) => a !== allergy) });
    } else {
      updateProfile({ allergies: [...current, allergy] });
    }
  };

  const toggleMeal = (meal: 'breakfast' | 'lunch' | 'snacks' | 'dinner') => {
    updateProfile({
      mealsPerDay: {
        ...userProfile.mealsPerDay,
        [meal]: !userProfile.mealsPerDay[meal],
      },
    });
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card">
        <div className="container flex items-center justify-between h-16">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-success">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-bold text-foreground">NutriPlan</span>
          </div>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Progress */}
      <div className="container py-6">
        <ProgressSteps currentStep={currentStep} totalSteps={4} labels={stepLabels} />
      </div>

      {/* Content */}
      <div className="flex-1 container pb-32">
        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-md mx-auto"
            >
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                Let's get to know you
              </h1>
              <p className="text-muted-foreground mb-8">
                This helps us personalize your nutrition plan.
              </p>

              <div className="space-y-6">
                {/* Gender */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Gender</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['male', 'female', 'other'] as const).map((gender) => (
                      <button
                        key={gender}
                        onClick={() => updateProfile({ gender })}
                        className={cn(
                          "py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                          userProfile.gender === gender
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div>
                  <Label htmlFor="age" className="text-sm font-medium mb-3 block">
                    Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={userProfile.age || ''}
                    onChange={(e) => updateProfile({ age: parseInt(e.target.value) || undefined })}
                    className="h-12"
                  />
                </div>

                {/* Height & Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-sm font-medium mb-3 block">
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={userProfile.height || ''}
                      onChange={(e) => updateProfile({ height: parseInt(e.target.value) || undefined })}
                      className="h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-sm font-medium mb-3 block">
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={userProfile.weight || ''}
                      onChange={(e) => updateProfile({ weight: parseInt(e.target.value) || undefined })}
                      className="h-12"
                    />
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Activity Level</Label>
                  <div className="space-y-2">
                    {activityLevels.map((level) => (
                      <button
                        key={level.value}
                        onClick={() => updateProfile({ activityLevel: level.value })}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                          userProfile.activityLevel === level.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <p className="font-medium text-foreground">{level.label}</p>
                        <p className="text-sm text-muted-foreground">{level.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Goals */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-md mx-auto"
            >
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                What's your goal?
              </h1>
              <p className="text-muted-foreground mb-8">
                We'll create a plan that matches your fitness objectives.
              </p>

              <div className="space-y-4 mb-8">
                {goals.map((goal) => (
                  <GoalCard
                    key={goal.value}
                    title={goal.label}
                    description={goal.description}
                    icon={goal.icon}
                    color={goal.color}
                    isSelected={userProfile.fitnessGoal === goal.value}
                    onClick={() => updateProfile({ fitnessGoal: goal.value })}
                  />
                ))}
              </div>

              {/* AI Tip */}
              {userProfile.activityLevel && userProfile.fitnessGoal === 'lose_fat' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
                >
                  <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    Based on your activity level, a moderate calorie deficit is recommended for sustainable fat loss.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 3: Diet Preferences */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-md mx-auto"
            >
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                Dietary preferences
              </h1>
              <p className="text-muted-foreground mb-8">
                Tell us about your eating style and meal preferences.
              </p>

              <div className="space-y-8">
                {/* Diet Type */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Diet Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {dietTypes.map((diet) => (
                      <button
                        key={diet.value}
                        onClick={() => updateProfile({ dietType: diet.value })}
                        className={cn(
                          "px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200",
                          userProfile.dietType === diet.value
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        {diet.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meal Variety */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Meal Variety Preference</Label>
                  <div className="space-y-2">
                    {mealVarieties.map((variety) => (
                      <button
                        key={variety.value}
                        onClick={() => updateProfile({ mealVariety: variety.value })}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 text-left transition-all duration-200",
                          userProfile.mealVariety === variety.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <p className="font-medium text-foreground">{variety.label}</p>
                        <p className="text-sm text-muted-foreground">{variety.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meals Per Day */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Meals Per Day</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['breakfast', 'lunch', 'snacks', 'dinner'] as const).map((meal) => (
                      <button
                        key={meal}
                        onClick={() => toggleMeal(meal)}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all duration-200",
                          userProfile.mealsPerDay[meal]
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                              userProfile.mealsPerDay[meal]
                                ? "border-primary bg-primary"
                                : "border-muted-foreground"
                            )}
                          >
                            {userProfile.mealsPerDay[meal] && (
                              <span className="text-primary-foreground text-xs">✓</span>
                            )}
                          </div>
                          <span className="font-medium text-foreground capitalize">{meal}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Allergies */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="max-w-md mx-auto"
            >
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                Allergies & restrictions
              </h1>
              <p className="text-muted-foreground mb-4">
                Your safety is our priority. Select any food allergies you have.
              </p>

              {/* Safety Warning */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 mb-8">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground">
                  We'll make sure your meal plan avoids anything unsafe for you.
                </p>
              </div>

              <div className="space-y-6">
                {/* Allergy Selection */}
                <div className="flex flex-wrap gap-3">
                  {allergies.map((allergy) => (
                    <button
                      key={allergy.value}
                      onClick={() => toggleAllergy(allergy.value)}
                      className={cn(
                        "px-5 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200",
                        userProfile.allergies.includes(allergy.value)
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : "border-border hover:border-destructive/50"
                      )}
                    >
                      {allergy.label}
                    </button>
                  ))}
                </div>

                {/* Custom Allergy */}
                <div>
                  <Label htmlFor="customAllergy" className="text-sm font-medium mb-3 block">
                    Other allergies
                  </Label>
                  <Input
                    id="customAllergy"
                    placeholder="Enter any other allergies..."
                    value={customAllergy}
                    onChange={(e) => setCustomAllergy(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="container max-w-md mx-auto">
          <Button variant="hero" size="xl" className="w-full" onClick={handleNext}>
            {currentStep === 4 ? 'Create My Plan' : 'Continue'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;