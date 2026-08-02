import React, { useState } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProjectItem } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowUpRight, FolderKanban } from 'lucide-react';

export const Projects: React.FC = () => {
  const { data } = usePortfolio();
  const { projects } = data;
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="project" className="py-24 sm:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 mb-3"
            >
              <span className="h-2 w-2 rounded-full bg-[#9933FF]" />
              <span className="text-xs font-bold tracking-widest text-[#9933FF] uppercase">
                PROJECT PORTFOLIO
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight"
            >
              Portfolio
            </motion.h2>

            <p className="mt-3 text-base text-[#666666] max-w-xl">
              {data.projectsSubtitle || '수강생 완주율과 실질적 비즈니스 성과를 이끌어낸 대표 프로젝트 사례입니다.'}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-2 text-xs font-semibold text-[#666666] bg-[#FAFAFA] border border-gray-200 px-4 py-2 rounded-full w-fit shrink-0"
          >
            <FolderKanban className="w-4 h-4 text-[#9933FF]" />
            <span>총 {projects.length}개 대표 기획 프로젝트</span>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer bg-[#FAFAFA] rounded-2xl border border-gray-200/80 overflow-hidden hover:border-[#9933FF]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image */}
                {proj.heroImage && (
                  <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
                    <img
                      src={proj.heroImage}
                      alt={proj.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#9933FF] transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-[#666666] line-clamp-2 leading-relaxed break-keep">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#111111] group-hover:text-[#9933FF] transition-colors border-t border-gray-100/80 mt-auto">
                <span>자세히 보기</span>
                <div className="p-1.5 rounded-full bg-white group-hover:bg-[#9933FF] group-hover:text-white transition-all shadow-2xs border border-gray-200 group-hover:border-[#9933FF]">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
