import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, ShoppingCart, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/meal-plan', label: 'Meals', icon: UtensilsCrossed },
  { path: '/chat', label: 'AI Chat', icon: MessageCircle },
  { path: '/grocery-list', label: 'Grocery', icon: ShoppingCart },
  { path: '/profile', label: 'Profile', icon: User },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border/50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200",
                  isActive && "bg-primary/10"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
