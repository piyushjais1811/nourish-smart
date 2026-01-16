import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import OnboardingPage from "./pages/OnboardingPage";
import Dashboard from "./pages/Dashboard";
import MealPlanPage from "./pages/MealPlanPage";
import GroceryListPage from "./pages/GroceryListPage";
import ChatPage from "./pages/ChatPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import AchievementsPage from "./pages/AchievementsPage";
import StatsPage from "./pages/StatsPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
              <Route path="/grocery-list" element={<GroceryListPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;