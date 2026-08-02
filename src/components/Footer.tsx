import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#111111] text-gray-400 text-xs border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-white text-sm">성자현</span>
          <span className="text-gray-500">•</span>
          <span>Contents PM Portfolio</span>
        </div>

        <p className="text-gray-500">
          © {new Date().getFullYear()} Sung Jahyeon. All rights reserved. Designed for Educational Value & Business Performance.
        </p>
      </div>
    </footer>
  );
};
