import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Pause,
  Play,
  ImageIcon,
} from 'lucide-react';

export const Recommendations: React.FC = () => {
  const { data } = usePortfolio();
  const displayRecommendations = data.recommendations;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (key: string) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  // Responsive cards count calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = displayRecommendations.length;
  const maxIndex = Math.max(0, totalItems - cardsToShow);

  // Reset index if items list changes or cardsToShow changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(Math.max(0, maxIndex));
    }
  }, [cardsToShow, totalItems, maxIndex]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoplay || totalItems <= cardsToShow) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoplay, maxIndex, totalItems, cardsToShow]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="recommendation" className="py-24 sm:py-32 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
                RECOMMENDATIONS
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight"
            >
              강사 & 파트너 후기
            </motion.h2>
            <p className="mt-3 text-base text-[#666666] max-w-xl">
              프로젝트를 함께한 강사님들과 파트너분들이 직접 보내주신 후기입니다.
            </p>
          </div>

          {/* Slider Controls */}
          {totalItems > 0 && (
            <div className="flex items-center space-x-3 self-start md:self-auto">
              {/* Slide Counter */}
              <div className="text-xs font-extrabold text-[#666666] bg-white px-3.5 py-2 rounded-full border border-gray-200 shadow-2xs flex items-center space-x-1">
                <span className="text-[#9933FF]">
                  {String(Math.min(currentIndex + 1, totalItems)).padStart(2, '0')}
                </span>
                <span>/</span>
                <span>{String(totalItems).padStart(2, '0')}</span>
              </div>

              {/* Autoplay Toggle */}
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isAutoplay
                    ? 'bg-[#9933FF]/10 border-[#9933FF]/30 text-[#9933FF]'
                    : 'bg-white border-gray-200 text-gray-400 hover:text-gray-700'
                }`}
                title={isAutoplay ? '자동 재생 일시정지' : '자동 재생 시작'}
              >
                {isAutoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Previous Arrow */}
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white border border-gray-200 text-[#111111] hover:bg-[#9933FF] hover:text-white hover:border-[#9933FF] shadow-xs transition-all cursor-pointer disabled:opacity-40"
                aria-label="이전 슬라이드"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white border border-gray-200 text-[#111111] hover:bg-[#9933FF] hover:text-white hover:border-[#9933FF] shadow-xs transition-all cursor-pointer disabled:opacity-40"
                aria-label="다음 슬라이드"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Floating Photo Carousel Slider */}
        {totalItems === 0 ? (
          <div className="p-16 text-center bg-white rounded-3xl border border-dashed border-gray-300 text-gray-400 flex flex-col items-center justify-center space-y-3">
            <ImageIcon className="w-10 h-10 text-gray-300" />
            <p className="text-sm font-semibold">등록된 후기 이미지가 없습니다.</p>
            <p className="text-xs text-gray-400">관리자 페이지에서 후기 캡처 사진을 추가해주세요.</p>
          </div>
        ) : (
          <div className="relative overflow-hidden py-4 px-1">
            <motion.div
              className="flex gap-6 transition-transform duration-500 ease-out"
              animate={{
                x: `calc(-${currentIndex * (100 / cardsToShow)}% - ${
                  currentIndex * (24 / cardsToShow)
                }px)`,
              }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            >
              {displayRecommendations.map((rec, idx) => {
                const itemKey = rec.id || `rec-${idx}`;
                const hasError = imageErrors[itemKey];

                return (
                  <div
                    key={itemKey}
                    className="shrink-0"
                    style={{
                      width:
                        cardsToShow === 1
                          ? '100%'
                          : cardsToShow === 2
                          ? 'calc(50% - 12px)'
                          : 'calc(33.333% - 16px)',
                    }}
                  >
                    {rec.image && !hasError ? (
                      <motion.div
                        whileHover={{ y: -8, scale: 1.015 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => setActiveImage(rec.image!)}
                        className="relative rounded-3xl overflow-hidden bg-white border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group flex items-center justify-center min-h-[320px] max-h-[460px] p-2"
                      >
                        <img
                          src={rec.image}
                          alt={`후기 이미지 ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(itemKey)}
                          className="w-full h-auto max-h-[440px] object-contain rounded-2xl bg-gray-50/50"
                        />
                        {/* Floating hover overlay */}
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] rounded-3xl">
                          <div className="px-4 py-2.5 rounded-full bg-black/80 text-white text-xs font-bold flex items-center gap-2 shadow-xl border border-white/20">
                            <Maximize2 className="w-4 h-4 text-[#9933FF]" />
                            <span>원본 크기로 크게 보기</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center min-h-[320px] flex flex-col items-center justify-center text-gray-400 space-y-2">
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                        <span className="text-xs font-medium">
                          {hasError ? '이미지를 불러올 수 없습니다' : '이미지 미등록'}
                        </span>
                        {hasError && (
                          <span className="text-[11px] text-red-400">
                            관리자에서 이미지 파일로 다시 업로드해주세요
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </motion.div>
          </div>
        )}

        {/* Pagination Dots */}
        {totalItems > cardsToShow && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {[...Array(maxIndex + 1)].map((_, pageIdx) => (
              <button
                key={pageIdx}
                onClick={() => setCurrentIndex(pageIdx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === pageIdx
                    ? 'w-8 bg-[#9933FF]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`페이지 ${pageIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-4xl max-h-[92vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col"
            >
              <div className="p-4 bg-gray-900 border-b border-gray-800 flex justify-between items-center text-white">
                <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[#9933FF]" />
                  후기 원본 이미지
                </span>
                <button
                  onClick={() => setActiveImage(null)}
                  className="p-1.5 rounded-full bg-gray-800 text-gray-300 hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-2 sm:p-4 flex items-center justify-center overflow-auto max-h-[85vh]">
                <img
                  src={activeImage}
                  alt="Enlarged review"
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
