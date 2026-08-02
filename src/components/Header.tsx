import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

export const Header: React.FC = () => {
  const { data } = usePortfolio();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'process',
        'project',
        'whyme',
        'recommendation',
        'contact',
      ];

      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT ME' },
    { id: 'process', label: 'PROCESS' },
    { id: 'project', label: 'PROJECT' },
    { id: 'whyme', label: 'WHY ME' },
    { id: 'recommendation', label: 'RECOMMENDATION' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white py-1.5 px-3 sm:px-6 lg:px-8 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col gap-1">
        {/* Row 1: Logo */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollTo('home')}
            className="text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="text-xs sm:text-sm font-bold tracking-tight text-[#111111] group-hover:text-[#9933FF] transition-colors whitespace-nowrap">
              {data.hero.name || '성자현'}
              <span className="ml-1.5 text-[11px] sm:text-xs font-medium text-[#666666] tracking-normal">
                {data.hero.title || 'Contents PM'}
              </span>
            </div>
          </button>
        </div>

        {/* Row 2: Menu Items */}
        <nav className="flex items-center justify-center flex-wrap gap-1 sm:gap-2 pt-0.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`whitespace-nowrap px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-2xs'
                    : 'text-[#666666] hover:text-[#111111] hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
