import React, { useState } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhyMe } from './components/WhyMe';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { Recommendations } from './components/Recommendations';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLoginModal } from './components/Admin/AdminLoginModal';
import { AdminCMSModal } from './components/Admin/AdminCMSModal';

function MainPortfolioContent() {
  const { isAdminLoggedIn } = usePortfolio();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCmsOpen, setIsCmsOpen] = useState(false);

  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsCmsOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#9933FF] selection:text-white">
      {/* Navigation Header */}
      <Header onOpenAdmin={handleOpenAdmin} />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. HOME (Hero) */}
        <Hero />

        {/* 2. ABOUT ME */}
        <About />

        {/* 3. PROCESS (5-Step Lecture Planning Flow) */}
        <Process />

        {/* 4. PROJECT (강의 프로젝트 5개) */}
        <Projects />

        {/* 5. WHY ME */}
        <WhyMe />

        {/* 6. RECOMMENDATION */}
        <Recommendations />

        {/* 7. CONTACT */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => {
          setIsLoginOpen(false);
          setIsCmsOpen(true);
        }}
      />

      {/* Admin CMS Editor Modal */}
      <AdminCMSModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <MainPortfolioContent />
    </PortfolioProvider>
  );
}
