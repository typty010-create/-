import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, KeyRound, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { loginAdmin } = usePortfolio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center space-y-3 mb-6">
            <div className="p-3.5 rounded-2xl bg-purple-50 text-[#9933FF]">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#111111]">
              관리자 CMS 로그인
            </h3>
            <p className="text-xs text-[#666666]">
              사이트 콘텐츠를 실시간으로 수정할 수 있는 관리자 모드입니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#111111] mb-1">
                비밀번호 입력
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="비밀번호 4자리"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#9933FF] focus:ring-2 focus:ring-[#9933FF]/20 focus:outline-hidden text-sm font-semibold transition-all"
                />
                <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-xs font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>비밀번호가 올바르지 않습니다.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#9933FF] hover:bg-[#7D26D9] text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              로그인하기
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
