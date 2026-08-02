import React, { useState, useEffect } from 'react';
import { Settings, LogOut, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeaderProps {
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin }) => {
  const { data, isAdminLoggedIn, logoutAdmin } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

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
        {/* Row 1: Logo & Admin Controls */}
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

          {/* Action Controls */}
          <div className="flex items-center space-x-1.5">
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-1.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="w-3 h-3" />
                  관리자
                </span>
                <button
                  onClick={onOpenAdmin}
                  className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#9933FF] hover:bg-[#7D26D9] text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Settings className="w-3 h-3" />
                  <span>CMS</span>
                </button>
                <button
                  onClick={logoutAdmin}
                  title="로그아웃"
                  className="p-1 rounded-md text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdmin}
                className="px-2 py-0.5 text-xs font-semibold text-gray-600 hover:text-[#9933FF] hover:bg-gray-100 rounded-md transition-all cursor-pointer flex items-center gap-1"
                title="관리자 CMS 로그인 (비밀번호: 0628)"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>관리자 로그인</span>
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Menu Items (All visible in 1 thin row or wrap) */}
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
