import React from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, FileDown, ArrowUpRight, Copy, Check } from 'lucide-react';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const { contact } = data;
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const [copiedPhone, setCopiedPhone] = React.useState(false);

  const copyEmail = () => {
    if (contact.email) {
      navigator.clipboard.writeText(contact.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const copyPhone = () => {
    if (contact.phone) {
      navigator.clipboard.writeText(contact.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hooking Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#9933FF]/10 text-[#9933FF] mb-6 border border-[#9933FF]/20">
            LET'S WORK TOGETHER
          </span>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#111111] tracking-tight leading-tight break-keep">
            {contact.hookTitle || '좋은 강의는 우연히 만들어지지 않습니다.'}
          </h2>
          <p className="mt-4 text-2xl sm:text-4xl font-extrabold text-[#9933FF]">
            {contact.hookSubtitle || '좋은 기획에서 시작됩니다.'}
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-[#FAFAFA] rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xl space-y-8"
        >
          <p className="text-base sm:text-lg text-[#666666] leading-relaxed break-keep">
            성공적인 교육 프로젝트를 위해 언제든 편하게 연락해 주시기 바랍니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between space-y-3">
              <div className="flex items-center space-x-3 text-[#9933FF]">
                <div className="p-2 rounded-xl bg-purple-50">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-[#666666]">
                  EMAIL
                </span>
              </div>
              <div>
                <p className="text-base font-bold text-[#111111] truncate">
                  {contact.email}
                </p>
              </div>
              <button
                onClick={copyEmail}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#9933FF] hover:text-[#7D26D9] cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>이메일 주소 복사</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-white border border-gray-200 flex flex-col justify-between space-y-3">
              <div className="flex items-center space-x-3 text-[#9933FF]">
                <div className="p-2 rounded-xl bg-purple-50">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-[#666666]">
                  PHONE
                </span>
              </div>
              <div>
                <p className="text-base font-bold text-[#111111]">
                  {contact.phone}
                </p>
              </div>
              <button
                onClick={copyPhone}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#9933FF] hover:text-[#7D26D9] cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">복사 완료!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>연락처 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Resume Download CTA */}
          <div className="pt-4 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-sm font-bold text-[#111111]">
                {contact.resumeFileName || '성자현_Contents_PM_이력서.pdf'}
              </p>
              <p className="text-xs text-[#666666]">
                상세 경력 및 프로젝트 포트폴리오 이력서 문서
              </p>
            </div>

            <a
              href={contact.resumeUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              download={contact.resumeFileName}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#9933FF] hover:bg-[#7D26D9] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>이력서 다운로드</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
