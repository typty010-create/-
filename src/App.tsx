import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { WhyMe } from './components/WhyMe';
import { Projects } from './components/Projects';
import { Process } from './components/Process';
import { Recommendations } from './components/Recommendations';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function MainPortfolioContent() {
  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#9933FF] selection:text-white">
      {/* Navigation Header */}
      <Header />

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
      <Footer />
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
