import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Leaf, Target, ShoppingCart, Calendar, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroFood from '@/assets/hero-food.jpg';

const features = [
  {
    icon: Target,
    title: 'Personalized Goals',
    description: 'Custom meal plans based on your unique body and fitness goals',
  },
  {
    icon: Leaf,
    title: 'Diet Flexibility',
    description: 'Vegan, keto, paleo, or anything in between - we adapt to you',
  },
  {
    icon: Calendar,
    title: 'Weekly Planning',
    description: 'Full week meal plans with easy swapping and customization',
  },
  {
    icon: ShoppingCart,
    title: 'Smart Grocery Lists',
    description: 'Auto-generated shopping lists organized by category',
  },
  {
    icon: ChefHat,
    title: 'Delicious Recipes',
    description: 'Chef-curated recipes with step-by-step instructions',
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    description: 'Get instant nutrition advice and meal suggestions',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroFood}
            alt="Healthy food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 container py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Nutrition Planning</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Eat better.{' '}
              <span className="text-gradient-hero">Feel stronger.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              One personalized meal at a time. Get custom meal plans, nutrition tracking, 
              and AI-powered guidance tailored to your unique goals.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/onboarding">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Explore Meals
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex items-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground">
                <span className="text-primary">✓</span> Personalized plans
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground">
                <span className="text-primary">✓</span> Diet-specific recipes
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground">
                <span className="text-primary">✓</span> AI-powered
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Everything you need to eat smarter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Personalized meal planning, clear nutrition guidance, and flexibility—
              without making food feel restrictive.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-card rounded-2xl p-6 shadow-soft card-hover border border-border/50"
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-success mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-center"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                Ready to transform your nutrition?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Join thousands of people who are eating smarter, feeling better, 
                and reaching their goals with NutriPlan.
              </p>
              <Link to="/onboarding">
                <Button
                  size="xl"
                  className="bg-background text-primary hover:bg-background/90"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-success">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-serif text-lg font-bold text-foreground">NutriPlan</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 NutriPlan. Eat better, live better.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;