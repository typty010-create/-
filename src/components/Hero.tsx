import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[680px] flex flex-col justify-between items-center overflow-hidden bg-[#111111]"
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.bgImage}
          alt="Hero Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.70]"
        />
        {/* Gradients and Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#111111]" />
      </div>

      {/* Top Spacer for Header */}
      <div className="pt-24 sm:pt-28" />

      {/* Main Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center my-auto">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] select-none">
            <span className="block text-white">
              {hero.line1White || 'Design'}{' '}
              <span className="text-[#9933FF] drop-shadow-[0_0_25px_rgba(153,51,255,0.4)]">
                {hero.line1Highlight || 'Learning'}
              </span>
            </span>
            <span className="block text-white mt-1 sm:mt-2">
              {hero.line2White || 'Deliver'}{' '}
              <span className="text-[#9933FF] drop-shadow-[0_0_25px_rgba(153,51,255,0.4)]">
                {hero.line2Highlight || 'Growth'}
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 text-center shadow-2xl"
        >
          <div className="flex items-center justify-center space-x-2 text-sm font-bold tracking-widest text-white/90 uppercase mb-2">
            <span>{hero.name || '성자현'}</span>
            <span className="text-[#9933FF]">•</span>
            <span className="text-[#9933FF]">{hero.title || 'Contents PM'}</span>
          </div>
          <p className="text-base sm:text-lg text-gray-200 font-normal leading-relaxed break-keep">
            "{hero.subtitle || '수강생의 성공적인 완주를 위한 강의 여정을 설계합니다.'}"
          </p>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="relative z-10 pb-10 flex flex-col items-center"
      >
        <button
          onClick={scrollToAbout}
          className="group flex flex-col items-center cursor-pointer text-white/60 hover:text-white transition-colors focus:outline-hidden"
          aria-label="Scroll to About"
        >
          <span className="text-xs font-semibold tracking-widest uppercase mb-2 text-gray-400 group-hover:text-white transition-colors">
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="p-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xs group-hover:border-[#9933FF] group-hover:bg-[#9933FF]/20 transition-all"
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
