
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Workspace from './components/Workspace';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        isDark={isDark} 
        toggleDarkMode={toggleDarkMode} 
      />
      <main>
        {currentView === View.LANDING ? (
          <LandingPage onStart={() => setCurrentView(View.WORKSPACE)} />
        ) : (
          <Workspace />
        )}
      </main>
    </div>
  );
};

export default App;
