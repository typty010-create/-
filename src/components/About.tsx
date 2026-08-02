import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase } from 'lucide-react';

export const About: React.FC = () => {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-[#9933FF]" />
          <span className="text-xs font-bold tracking-widest text-[#9933FF] uppercase">
            ABOUT ME
          </span>
        </motion.div>

        {/* Intro & Description (with small profile photo on the left) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl flex flex-col sm:flex-row items-start gap-6 sm:gap-8"
        >
          {about.profileImage && (
            <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-purple-100/80 shadow-md bg-gray-50">
              <img
                src={about.profileImage}
                alt={about.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-4">
              {about.name}{' '}
              <span className="text-[#9933FF] font-medium text-2xl sm:text-3xl md:text-4xl block sm:inline mt-1 sm:mt-0">
                {about.title}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#666666] font-normal leading-relaxed whitespace-pre-line break-keep">
              {about.bio}
            </p>
          </div>
        </motion.div>

        {/* Career / Experience History Section */}
        {about.career && about.career.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10 max-w-4xl"
          >
            <div className="flex items-center space-x-2 mb-8">
              <Briefcase className="w-5 h-5 text-[#9933FF]" />
              <h3 className="text-xl font-extrabold text-[#111111] tracking-tight">
                주요 이력
              </h3>
            </div>

            <div className="space-y-4">
              {about.career.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-6 rounded-2xl bg-[#FAFAFA] border border-gray-100/90 hover:border-[#9933FF]/30 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 shadow-2xs"
                >
                  <div className="md:w-1/3 shrink-0">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-[#9933FF]/10 text-[#9933FF] mb-2">
                      {item.period}
                    </span>
                    <h4 className="text-lg font-black text-[#111111]">
                      {item.company}
                    </h4>
                    <p className="text-xs font-bold text-[#666666] mt-0.5">
                      {item.role}
                    </p>
                  </div>

                  <div className="md:w-2/3">
                    {item.description && (
                      <p className="text-sm text-[#444444] leading-relaxed whitespace-pre-line break-keep">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}


      </div>
    </section>
  );
};
