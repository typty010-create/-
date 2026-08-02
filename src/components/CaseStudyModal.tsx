import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, TrendingUp, BookOpen, Target, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col border border-gray-100"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#9933FF] uppercase tracking-wider">
                PROJECT CASE STUDY
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#111111]">
                {project.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:text-[#111111] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="overflow-y-auto p-6 sm:p-8 space-y-10 text-[#111111]">
            {/* Thumbnail Image Header */}
            {project.heroImage && (
              <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-gray-100 border border-gray-200 shadow-md">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                    {project.title}
                  </h2>
                </div>
              </div>
            )}

            {!project.heroImage && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] text-white space-y-3 border border-gray-800 shadow-md">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {project.title}
                </h2>
              </div>
            )}



            {/* 1. S - Situation */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-[#9933FF] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  S
                </span>
                <div className="flex items-center space-x-2 text-[#9933FF]">
                  <Target className="w-5 h-5" />
                  <h4 className="text-sm font-bold tracking-wider uppercase text-[#111111]">
                    Situation (상황 & 문제 배경)
                  </h4>
                </div>
              </div>
              <p className="text-base text-[#555555] leading-relaxed whitespace-pre-line break-keep bg-[#FAFAFA] p-5 rounded-2xl border border-gray-100">
                {caseStudy.background}
              </p>
            </section>

            {/* 2. T - Task */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-[#9933FF] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  T
                </span>
                <div className="flex items-center space-x-2 text-[#9933FF]">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="text-sm font-bold tracking-wider uppercase text-[#111111]">
                    Task (과제 & PM 역할)
                  </h4>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 text-[#111111] text-base font-medium leading-relaxed break-keep">
                {caseStudy.role}
              </div>
            </section>

            {/* 3. A - Action */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-[#9933FF] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  A
                </span>
                <div className="flex items-center space-x-2 text-[#9933FF]">
                  <CheckCircle className="w-5 h-5" />
                  <h4 className="text-sm font-bold tracking-wider uppercase text-[#111111]">
                    Action (주요 실행 내용)
                  </h4>
                </div>
              </div>
              <div className="text-base text-[#555555] leading-relaxed whitespace-pre-line bg-[#FAFAFA] p-5 rounded-2xl border border-gray-100">
                {caseStudy.execution}
              </div>
            </section>

            {/* 4. R - Result */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-lg bg-[#111111] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                  R
                </span>
                <div className="flex items-center space-x-2 text-[#9933FF]">
                  <TrendingUp className="w-5 h-5" />
                  <h4 className="text-sm font-bold tracking-wider uppercase text-[#111111]">
                    Result (성과 & 배운 점)
                  </h4>
                </div>
              </div>

              {/* Business Results */}
              <div className="p-6 rounded-2xl bg-[#111111] text-white border border-gray-800 space-y-2 shadow-xs">
                <div className="text-xs font-semibold text-[#9933FF] uppercase tracking-wider mb-1">
                  정량적 / 정성적 성과
                </div>
                <p className="text-lg sm:text-xl font-bold text-white break-keep whitespace-pre-line leading-snug">
                  {caseStudy.results}
                </p>
              </div>

              {/* Key Learnings */}
              {caseStudy.keyLearnings && (
                <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4" />
                    <span>Key Insights & Learnings</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-800 leading-relaxed break-keep">
                    {caseStudy.keyLearnings}
                  </p>
                </div>
              )}
            </section>

          </div>

          {/* Bottom Close Button */}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#111111] hover:bg-[#9933FF] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
