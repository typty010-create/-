import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const WhyMe: React.FC = () => {
  const { data } = usePortfolio();
  const { whyMe } = data;

  return (
    <section id="whyme" className="py-24 sm:py-32 bg-[#FAFAFA] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="h-2 w-2 rounded-full bg-[#9933FF]" />
            <span className="text-xs font-bold tracking-widest text-[#9933FF] uppercase">
              WHY ME
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight"
          >
            Why hire me?
          </motion.h2>
          <p className="mt-3 text-base sm:text-lg text-[#666666] max-w-2xl">
            {data.whyMeSubtitle || '실제 사례는 PROJECT 페이지에서 확인하실 수 있습니다.'}
          </p>
        </div>

        {/* Cards Grid */}
        <div className={`grid grid-cols-1 ${whyMe.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'} gap-6 sm:gap-8`}>
          {whyMe.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-200/80 hover:border-[#9933FF]/50 transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black text-[#9933FF]/80 group-hover:text-[#9933FF] group-hover:scale-105 transition-all">
                    {card.number || `0${idx + 1}`}
                  </span>
                  <div className="h-1.5 w-8 rounded-full bg-gray-100 group-hover:bg-[#9933FF] transition-colors" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-3 group-hover:text-[#9933FF] transition-colors">
                  {card.title}
                </h3>

                <p className="text-base text-[#666666] leading-relaxed break-keep">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
