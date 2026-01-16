import { motion } from 'framer-motion';
import { ChevronLeft, Phone, Mail, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does NutriPlan create my meal plan?',
    answer: 'NutriPlan uses your personal details like age, gender, activity level, fitness goals, and dietary preferences to generate personalized meal recommendations. Our algorithm considers your nutritional needs and food preferences to create balanced meals.'
  },
  {
    question: 'Can I swap meals I don\'t like?',
    answer: 'Yes! On the Meal Plan page, each meal has a swap button. Click it to see alternative options that match your dietary preferences. You can also lock meals you love to keep them in your plan.'
  },
  {
    question: 'How is my grocery list generated?',
    answer: 'Your grocery list is automatically created based on the meals you\'ve locked in your meal plan. It combines ingredients from all your locked recipes and organizes them by category for easy shopping.'
  },
  {
    question: 'What do the streaks mean?',
    answer: 'Streaks track how many consecutive days you\'ve logged into the app. Maintaining streaks helps you stay consistent with your nutrition goals and unlocks special achievement badges!'
  },
  {
    question: 'Can I change my dietary preferences?',
    answer: 'Absolutely! Go to Profile > Edit Profile & Preferences to update your dietary type, allergies, meal preferences, and fitness goals anytime. Your meal plan will automatically adjust to your new preferences.'
  },
  {
    question: 'How do I earn achievement badges?',
    answer: 'Badges are earned by reaching milestones like maintaining streaks (3, 7, 14, 30 days), locking your first meal, completing a full week of meal planning, and more. Check the Achievements page to see all available badges.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take your privacy seriously. All your data is encrypted and securely stored. You can download your data anytime from Settings, and you can also clear all your data if needed.'
  },
  {
    question: 'How do I view recipes and cooking instructions?',
    answer: 'Tap on any meal card to see the full recipe details including ingredients, step-by-step instructions, and nutritional information. You can also watch recipe videos by clicking the "Watch on YouTube" button.'
  }
];

const HelpPage = () => {
  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-foreground">Help & Support</h1>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-3"
        >
          <a 
            href="tel:6396978853"
            className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 flex items-center gap-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Contact Support</p>
              <p className="text-sm text-muted-foreground">6396978853</p>
            </div>
          </a>

          <a 
            href="mailto:shubhjauhari1234@gmail.com?subject=NutriPlan Feedback"
            className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 flex items-center gap-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">Feedback & Suggestions</p>
              <p className="text-sm text-muted-foreground">shubhjauhari1234@gmail.com</p>
            </div>
          </a>

          <a 
            href="mailto:shubhjauhari1234@gmail.com?subject=NutriPlan Bug Report"
            className="bg-card rounded-2xl p-4 shadow-soft border border-border/50 flex items-center gap-4 hover:bg-muted/50 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-foreground">Report a Problem</p>
              <p className="text-sm text-muted-foreground">shubhjauhari1234@gmail.com</p>
            </div>
          </a>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-4"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default HelpPage;
