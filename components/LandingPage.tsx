
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
        
        {/* Hexagonal Glow Background Effect */}
        <div className="hex-grid-container">
          <svg className="hex-svg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hex-pattern" width="100" height="173.2" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 28.8 L100 86.6 L50 115.4 L0 86.6 L0 28.8 Z" fill="none" className="hex-path" />
              </pattern>
            </defs>
            <rect width="1000" height="1000" fill="url(#hex-pattern)" />
            
            <path d="M500 400 L550 428 L550 486 L500 514 L450 486 L450 428 Z" fill="none" className="hex-path" style={{ animationDelay: '-2s', scale: '2', transformOrigin: 'center' }} />
            <path d="M200 600 L250 628 L250 686 L200 714 L150 686 L150 628 Z" fill="none" className="hex-path" style={{ animationDelay: '-5s', scale: '1.5', transformOrigin: 'center' }} />
            <path d="M800 200 L850 228 L850 286 L800 314 L750 286 L750 228 Z" fill="none" className="hex-path" style={{ animationDelay: '-1s', scale: '3', transformOrigin: 'center' }} />
          </svg>
        </div>

        {/* Traditional Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-100 dark:border-blue-900/30 px-3 py-1 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-700 dark:text-blue-300 text-xs font-bold tracking-widest uppercase">Now Powered by Gemini</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-8 leading-[1.1]">
            Any Format. Any Size. <br />
            <span className="gradient-text">Any Task.</span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed font-light">
            Our AI understands your files deeply and does exactly what you ask — summarize, analyze, translate, explain, extract insights, or answer questions in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={onStart}
              className="group relative px-10 py-5 bg-blue-600 dark:bg-blue-500 text-white dark:text-black dark:font-black rounded-2xl font-bold text-xl hover:bg-blue-700 dark:hover:bg-blue-400 transition-all shadow-[0_20px_50px_rgba(59,130,246,0.3)] dark:shadow-blue-500/10 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">Start with any file</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="px-10 py-5 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-800 rounded-2xl font-bold text-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center group"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-white dark:bg-[#050505] relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-20">
            <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm mb-4">The Process</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">How ReadAble Works</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              We've simplified the bridge between complex data and human understanding into four intuitive steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                step: '01',
                title: 'Upload any file',
                desc: 'PDFs, Word docs, slides, spreadsheets, datasets, images, medical reports, scanned notes, code files — even massive research papers.',
                footer: 'If it’s a file, we can read it.'
              },
              {
                step: '02',
                title: 'Ask for anything',
                desc: 'Summarize, simplify, translate, extract key points, explain formulas, generate questions, analyze data, compare documents, or explore insights — just ask in natural language.',
                footer: 'Speak to your data directly.'
              },
              {
                step: '03',
                title: 'Insight, not extraction',
                desc: 'Our AI doesn’t just scan your file — it understands context, structure, and meaning to give accurate, human-level responses tailored to your request.',
                footer: 'True contextual understanding.'
              },
              {
                step: '04',
                title: 'Interact & refine',
                desc: 'Ask follow-up questions, dive deeper into sections, switch languages, shorten outputs, or explore new angles — all from the same file, endlessly.',
                footer: 'Infinite conversational exploration.'
              }
            ].map((item, idx) => (
              <div key={idx} className="group relative p-10 rounded-[3rem] bg-gray-50 dark:bg-zinc-900 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 hover:bg-white dark:hover:bg-[#111] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500">
                <span className="text-7xl font-black text-blue-600/5 dark:text-white/5 absolute top-8 right-10 group-hover:text-blue-600/10 dark:group-hover:text-white/10 transition-colors pointer-events-none">
                  {item.step}
                </span>
                <div className="w-14 h-14 bg-white dark:bg-black rounded-2xl flex items-center justify-center shadow-sm mb-8 border border-gray-100 dark:border-zinc-800 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-black transition-all duration-500">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">{item.desc}</p>
                <div className="pt-6 border-t border-gray-100 dark:border-zinc-800">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{item.footer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-us" className="py-32 bg-gray-50 dark:bg-black scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block p-4 bg-blue-600 dark:bg-blue-500 text-white dark:text-black rounded-3xl mb-8 shadow-lg shadow-blue-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-8 leading-tight">About ReadAble</h2>
              <p className="text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                ReadAble is an AI-powered platform built to help you understand any file in seconds. From research papers and spreadsheets to code and images, we turn complex content into clear, actionable insight you can use right away.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/5 dark:bg-blue-900/10 blur-[80px] rounded-full"></div>
              <div className="relative bg-white dark:bg-zinc-900 p-12 rounded-[3.5rem] shadow-2xl border border-white dark:border-zinc-800">
                 <div className="flex items-center mb-10">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-2xl mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black text-gray-900 dark:text-white">Our Mission</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest uppercase">The core of ReadAble</p>
                    </div>
                 </div>
                 <p className="text-2xl text-gray-700 dark:text-gray-300 italic leading-snug font-medium mb-0">
                   "Empower everyone to read, reason, and act on information instantly — no matter the format, size, or complexity."
                 </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white dark:bg-[#050505] mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-blue-600 dark:bg-blue-500 rounded-[4rem] py-20 shadow-[0_40px_100px_-20px_rgba(59,130,246,0.5)] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white dark:text-black mb-8 relative z-10">Ready to unlock your files?</h2>
          <button 
            onClick={onStart}
            className="relative z-10 px-12 py-6 bg-white dark:bg-black text-blue-600 dark:text-blue-400 rounded-2xl font-black text-2xl hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all shadow-xl active:scale-95"
          >
            Get Started Now
          </button>
        </div>
      </section>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
