import { motion } from 'framer-motion';
import { ChevronLeft, Bell, Check, Calendar, Award, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';

const notifications = [
  {
    id: 1,
    type: 'meal',
    icon: Utensils,
    title: 'Time for Breakfast!',
    message: 'Your personalized breakfast is ready. Check out today\'s recommendation.',
    time: '8:00 AM',
    read: false,
  },
  {
    id: 2,
    type: 'achievement',
    icon: Award,
    title: 'Achievement Unlocked!',
    message: 'You\'ve maintained your streak for 7 days. Keep it up!',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 3,
    type: 'reminder',
    icon: Calendar,
    title: 'Weekly Meal Plan Ready',
    message: 'Your new weekly meal plan has been generated based on your preferences.',
    time: '2 days ago',
    read: true,
  },
  {
    id: 4,
    type: 'meal',
    icon: Utensils,
    title: 'Lunch Time!',
    message: 'Check out your personalized lunch recommendation.',
    time: '3 days ago',
    read: true,
  },
];

const NotificationsPage = () => {
  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-serif text-2xl font-bold text-foreground">Notifications</h1>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            <Check className="h-4 w-4 mr-1" />
            Mark all read
          </Button>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`bg-card rounded-2xl p-4 shadow-soft border transition-all ${
                notification.read ? 'border-border/50' : 'border-primary/30 bg-primary/5'
              }`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notification.type === 'achievement' 
                    ? 'bg-accent/10' 
                    : notification.type === 'meal'
                    ? 'bg-primary/10'
                    : 'bg-muted'
                }`}>
                  <notification.icon className={`h-6 w-6 ${
                    notification.type === 'achievement' 
                      ? 'text-accent' 
                      : notification.type === 'meal'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-foreground">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty state if no notifications */}
        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-foreground mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;
