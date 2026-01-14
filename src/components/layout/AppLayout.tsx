import { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export const AppLayout = ({ children, showNav = true }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {showNav && <Header />}
      <main className={showNav ? "pb-24 md:pb-0" : ""}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};
