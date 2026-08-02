import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, CheckCircle } from 'lucide-react';

export const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <section id="skills" className="py-24 sm:py-32 bg-[#FAFAFA] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 mb-3"
          >
            <span className="h-2 w-2 rounded-full bg-[#9933FF]" />
            <span className="text-xs font-bold tracking-widest text-[#9933FF] uppercase">
              PROFESSIONAL SKILLS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight"
          >
            Core PM Stack & Competencies
          </motion.h2>
          <p className="mt-3 text-base text-[#666666] max-w-xl">
            고성과 콘텐츠 제작과 데이터 중심 성장을 이끄는 실전 전문 역량 세트입니다.
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`p-6 rounded-2xl bg-white border transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
                skill.isPopular
                  ? 'border-[#9933FF]/40 shadow-2xs'
                  : 'border-gray-200/80 hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#666666] uppercase tracking-wider">
                    {skill.category || 'Competency'}
                  </span>
                  {skill.isPopular && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#9933FF]/10 text-[#9933FF]">
                      <Sparkles className="w-3 h-3" />
                      Core Focus
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-[#111111] mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#9933FF]" />
                  {skill.name}
                </h3>

                {skill.description && (
                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed break-keep mt-2">
                    {skill.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
