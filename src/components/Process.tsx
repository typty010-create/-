import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ChevronDown, CheckCircle2, Workflow } from 'lucide-react';

export const Process: React.FC = () => {
  const { data } = usePortfolio();
  const { process } = data;
  const [expandedStep, setExpandedStep] = useState<string | null>(process[0]?.id || null);

  const toggleStep = (id: string) => {
    setExpandedStep((prev) => (prev === id ? null : id));
  };

  return (
    <section id="process" className="py-24 sm:py-32 bg-[#FAFAFA] border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
              My Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight"
          >
            How I Design Learning Experiences
          </motion.h2>
          <p className="mt-3 text-base text-[#666666] max-w-xl">
            배움이 실제 변화로 이어질 수 있도록, 3단계 프로세스를 기반으로 콘텐츠를 기획합니다.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-gray-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
          {process.map((step, idx) => {
            const isExpanded = expandedStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot Badge */}
                <div
                  onClick={() => toggleStep(step.id)}
                  className={`absolute -left-[35px] sm:-left-[51px] top-4 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all cursor-pointer shadow-xs ${
                    isExpanded
                      ? 'bg-[#9933FF] border-[#9933FF] text-white scale-110'
                      : 'bg-white border-gray-300 text-[#111111] group-hover:border-[#9933FF] group-hover:text-[#9933FF]'
                  }`}
                >
                  {step.stepNumber || `0${idx + 1}`}
                </div>

                {/* Step Card */}
                <div
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'bg-white border-[#9933FF]/40 shadow-xl'
                      : 'bg-white/80 border-gray-200 hover:border-gray-300 hover:bg-white shadow-2xs'
                  }`}
                >
                  {/* Step Title Header Bar */}
                  <button
                    onClick={() => toggleStep(step.id)}
                    className="w-full text-left p-6 flex items-center justify-between cursor-pointer focus:outline-hidden"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-2.5 rounded-xl bg-purple-50 text-[#9933FF]">
                        <Workflow className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#9933FF] uppercase tracking-wider block">
                          STEP {step.stepNumber} • {step.subtitle}
                        </span>
                        <h3 className="text-xl font-bold text-[#111111] mt-0.5">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="hidden sm:inline text-xs font-semibold text-gray-400 group-hover:text-[#9933FF] transition-colors">
                        {isExpanded ? '접기' : '수행 역할 보기'}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-1.5 rounded-full bg-gray-100 text-gray-500"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Accordion Role List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100 bg-gray-50/50 p-6"
                      >
                        <h4 className="text-xs font-bold text-[#666666] uppercase tracking-wider mb-4">
                          이 단계에서 수행한 PM의 주요 역할:
                        </h4>
                        <ul className="space-y-3">
                          {step.roles.map((role, rIdx) => (
                            <li
                              key={rIdx}
                              className="flex items-start space-x-3 text-sm sm:text-base text-[#111111] leading-relaxed break-keep"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#9933FF] mt-1 shrink-0" />
                              <span>{role}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
