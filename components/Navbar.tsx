
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, isDark, toggleDarkMode }) => {
  const scrollToSection = (id: string) => {
    if (currentView !== View.LANDING) {
      setView(View.LANDING);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => setView(View.LANDING)}
          >
            <span className="text-5xl font-bold brand-cursive text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-300 select-none">
              Read<span className="text-blue-600 dark:text-blue-400">Able</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-sm tracking-wide uppercase"
            >
              HOW IT WORKS
            </button>
            <button 
              onClick={() => scrollToSection('about-us')}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-sm tracking-wide uppercase"
            >
              ABOUT US
            </button>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-3 rounded-2xl bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all shadow-sm active:scale-90"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button 
              onClick={() => setView(currentView === View.LANDING ? View.WORKSPACE : View.LANDING)}
              className="bg-gray-900 dark:bg-white text-white dark:text-black px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 dark:hover:bg-blue-400 transition-all shadow-xl shadow-black/5 active:scale-95"
            >
              {currentView === View.LANDING ? 'Analyze Files' : 'Back to Home'}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
             <button onClick={toggleDarkMode} className="text-gray-900 dark:text-white">
                {isDark ? '☀️' : '🌙'}
             </button>
             <button 
              onClick={() => setView(currentView === View.LANDING ? View.WORKSPACE : View.LANDING)}
              className="text-blue-600 dark:text-blue-400 font-black tracking-tighter"
            >
              {currentView === View.LANDING ? 'ANALYZE' : 'HOME'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
