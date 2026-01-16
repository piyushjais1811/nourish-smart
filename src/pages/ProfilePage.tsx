import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Scale, Target, Utensils, AlertTriangle, ChevronRight, LogOut, Settings, Bell, HelpCircle, Award, TrendingUp, Camera } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import md5 from 'crypto-js/md5';

const menuItems = [
  { icon: TrendingUp, label: 'Progress & Stats', href: '/stats', color: 'text-primary' },
  { icon: Award, label: 'Achievements', href: '/achievements', color: 'text-accent' },
  { icon: Bell, label: 'Notifications', href: '/notifications', color: 'text-muted-foreground' },
  { icon: Settings, label: 'Settings', href: '/settings', color: 'text-muted-foreground' },
  { icon: HelpCircle, label: 'Help & Support', href: '/help', color: 'text-muted-foreground' },
];

// Generate Gravatar URL from email
const getGravatarUrl = (email: string, size: number = 200) => {
  const hash = md5(email.toLowerCase().trim()).toString();
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
};

const ProfilePage = () => {
  const { userProfile } = useUser();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [streak, setStreak] = useState(1);
  const [displayName, setDisplayName] = useState('Nutrition Explorer');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('profiles')
      .select('streak_count, display_name, avatar_url')
      .eq('user_id', user.id)
      .maybeSingle();
    
    if (data) {
      setStreak(data.streak_count || 1);
      setDisplayName(data.display_name || 'Nutrition Explorer');
      setAvatarUrl(data.avatar_url || null);
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create unique file path
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const newAvatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: newAvatarUrl })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(newAvatarUrl);
      toast.success('Profile picture updated!');
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  // Determine which avatar to display
  const displayAvatar = avatarUrl || (user?.email ? getGravatarUrl(user.email) : null);

  const profileStats = [
    { icon: Scale, label: 'Weight', value: userProfile.weight ? `${userProfile.weight} kg` : '70 kg' },
    { icon: Target, label: 'Goal', value: userProfile.fitnessGoal?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Build Muscle' },
    { icon: Utensils, label: 'Diet', value: userProfile.dietType?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Anything' },
  ];

  return (
    <AppLayout>
      <div className="container py-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="relative inline-block mb-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={handleAvatarClick}
              disabled={isUploading || !user}
              className="relative w-24 h-24 rounded-full overflow-hidden bg-gradient-success flex items-center justify-center group transition-opacity disabled:opacity-50"
            >
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-primary-foreground" />
              )}
              {user && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent flex items-center justify-center border-4 border-background">
              <span className="text-xs font-bold text-accent-foreground">{streak}</span>
            </div>
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground mb-1">{displayName}</h1>
          <p className="text-muted-foreground">{streak}-day streak 🔥</p>
          {user && <p className="text-xs text-muted-foreground mt-1">{user.email}</p>}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3">
          {profileStats.map((stat) => (
            <div key={stat.label} className="bg-card rounded-2xl p-4 text-center shadow-soft border border-border/50">
              <div className="flex items-center justify-center w-10 h-10 mx-auto rounded-xl bg-primary/10 mb-2">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-sm font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {userProfile.allergies.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-destructive/10 rounded-2xl p-4 border border-destructive/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium text-foreground">Allergies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {userProfile.allergies.map((allergy) => (
                <span key={allergy} className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium">
                  {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link to="/onboarding">
            <Button variant="outline" className="w-full">Edit Profile & Preferences</Button>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-card rounded-2xl shadow-soft border border-border/50 overflow-hidden">
          {menuItems.map((item, index) => (
            <Link key={item.label} to={item.href} className={cn("flex items-center justify-between p-4 transition-colors hover:bg-muted/50", index !== menuItems.length - 1 && "border-b border-border/30")}>
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-5 w-5", item.color)} />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {user ? (
            <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
              <LogOut className="h-5 w-5 mr-2" />Log Out
            </Button>
          ) : (
            <Link to="/auth"><Button variant="hero" className="w-full">Sign In / Sign Up</Button></Link>
          )}
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center text-xs text-muted-foreground">
          NutriPlan v1.0.0
        </motion.p>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;