import { motion } from 'framer-motion';
import { User, Scale, Target, Utensils, AlertTriangle, ChevronRight, LogOut, Settings, Bell, HelpCircle, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: TrendingUp, label: 'Progress & Stats', href: '/stats', color: 'text-primary' },
  { icon: Award, label: 'Achievements', href: '/achievements', color: 'text-accent' },
  { icon: Bell, label: 'Notifications', href: '/notifications', color: 'text-muted-foreground' },
  { icon: Settings, label: 'Settings', href: '/settings', color: 'text-muted-foreground' },
  { icon: HelpCircle, label: 'Help & Support', href: '/help', color: 'text-muted-foreground' },
];

const ProfilePage = () => {
  const { userProfile } = useUser();

  const profileStats = [
    { icon: Scale, label: 'Weight', value: userProfile.weight ? `${userProfile.weight} kg` : '70 kg' },
    { icon: Target, label: 'Goal', value: userProfile.fitnessGoal?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Build Muscle' },
    { icon: Utensils, label: 'Diet', value: userProfile.dietType?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Anything' },
  ];

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-success flex items-center justify-center">
              <User className="h-12 w-12 text-primary-foreground" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center border-4 border-background">
              <span className="text-xs font-bold text-accent-foreground">7</span>
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-1">
            Nutrition Explorer
          </h1>
          <p className="text-muted-foreground">7-day streak 🔥</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {profileStats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-4 text-center shadow-soft border border-border/50"
            >
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-primary/10 mb-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-sm font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Allergies */}
        {userProfile.allergies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-destructive/10 rounded-2xl p-4 border border-destructive/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-foreground">Allergies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile.allergies.map((allergy) => (
                <span
                  key={allergy}
                  className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium"
                >
                  {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Edit Profile Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/onboarding">
            <Button variant="outline" className="w-full">
              Edit Profile & Preferences
            </Button>
          </Link>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden"
        >
          {menuItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center justify-between p-4 transition-colors hover:bg-muted/50",
                index !== menuItems.length - 1 && "border-b border-border/30"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", item.color)} />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Log Out
          </Button>
        </motion.div>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-muted-foreground"
        >
          NutriPlan v1.0.0
        </motion.p>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;