import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Layout,
  User,
  HelpCircle,
  FolderKanban,
  Workflow,
  MessageSquare,
  Sparkles,
  PhoneCall,
  CheckCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PortfolioData, ProjectItem, RecommendationItem, SkillItem, CareerItem } from '../../types';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({ isOpen, onClose }) => {
  const {
    data,
    updateData,
    resetToDefault,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    addRecommendation,
    deleteRecommendation,
    addSkill,
    deleteSkill,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<
    'hero' | 'about' | 'whyme' | 'projects' | 'process' | 'recommendations' | 'skills' | 'contact'
  >('hero');

  const [localData, setLocalData] = useState(data);
  const [saveToast, setSaveToast] = useState(false);

  // Sync state only when the modal opens
  React.useEffect(() => {
    if (isOpen) {
      setLocalData(data);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const saveAndSync = (newData: PortfolioData) => {
    setLocalData(newData);
    updateData(newData);
  };

  const handleSaveAll = () => {
    saveAndSync(localData);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('정말 기본 데이터로 초기화하시겠습니까?')) {
      resetToDefault();
      setLocalData(data);
      alert('초기화되었습니다.');
    }
  };

  // Local helper for image file upload to compressed Base64
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (base64: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.75);
            onSuccess(compressedBase64);
          } else {
            onSuccess(event.target?.result as string);
          }
        };
        img.onerror = () => {
          onSuccess(event.target?.result as string);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-6xl h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
        >
          {/* Top CMS Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#111111] text-white">
            <div className="flex items-center space-x-3">
              <span className="p-2 rounded-xl bg-[#9933FF] text-white">
                <Layout className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold">Contents PM Admin CMS</h3>
                <p className="text-xs text-gray-400">
                  모든 문구, 이미지, 프로젝트, 추천사 및 이력서 관리
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleReset}
                className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-red-900/50 text-gray-300 hover:text-red-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                title="기본값으로 복원"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                초기화
              </button>
              <button
                onClick={handleSaveAll}
                className="px-5 py-2 rounded-xl bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                전체 변경 저장
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Alert */}
          {saveToast && (
            <div className="absolute top-16 right-6 z-30 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-lg flex items-center gap-2 animate-bounce">
              <CheckCircle className="w-4 h-4" />
              <span>성공적으로 저장되었습니다!</span>
            </div>
          )}

          {/* Main Layout: Left Tabs / Right Editor */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-56 bg-[#FAFAFA] border-r border-gray-200 p-3 flex flex-col space-y-1 overflow-y-auto">
              {[
                { id: 'hero', label: '1. HERO (메인)', icon: Layout },
                { id: 'about', label: '2. ABOUT (소개/지표)', icon: User },
                { id: 'skills', label: '3. SKILLS (핵심역량)', icon: Sparkles },
                { id: 'process', label: '4. PROCESS (프로세스)', icon: Workflow },
                { id: 'projects', label: '5. PROJECT (프로젝트)', icon: FolderKanban },
                { id: 'whyme', label: '6. WHY ME', icon: HelpCircle },
                { id: 'recommendations', label: '7. RECOMMENDATION', icon: MessageSquare },
                { id: 'contact', label: '8. CONTACT (연락처/이력서)', icon: PhoneCall },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'text-[#666666] hover:bg-gray-200/60 hover:text-[#111111]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#9933FF]" />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Editor Panel */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-white text-[#111111]">
              {/* TAB 1: HERO */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-[#111111] border-b pb-2">
                    Hero 영역 설정
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Hero 배경 이미지 URL 또는 파일 업로드
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={localData.hero.bgImage}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              hero: { ...localData.hero, bgImage: e.target.value },
                            })
                          }
                          className="flex-1 px-3 py-2 rounded-xl border text-xs focus:border-[#9933FF]"
                        />
                        <label className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>업로드</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (base64) =>
                                setLocalData({
                                  ...localData,
                                  hero: { ...localData.hero, bgImage: base64 },
                                })
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Line 1 White Text
                        </label>
                        <input
                          type="text"
                          value={localData.hero.line1White}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              hero: { ...localData.hero, line1White: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#9933FF] mb-1">
                          Line 1 Highlight Text (#9933FF)
                        </label>
                        <input
                          type="text"
                          value={localData.hero.line1Highlight}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              hero: { ...localData.hero, line1Highlight: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs font-bold text-[#9933FF]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Line 2 White Text
                        </label>
                        <input
                          type="text"
                          value={localData.hero.line2White}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              hero: { ...localData.hero, line2White: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#9933FF] mb-1">
                          Line 2 Highlight Text (#9933FF)
                        </label>
                        <input
                          type="text"
                          value={localData.hero.line2Highlight}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              hero: { ...localData.hero, line2Highlight: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs font-bold text-[#9933FF]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          이름
                        </label>
                        <input
                          type="text"
                          value={localData.hero.name}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              hero: { ...localData.hero, name: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          직함 / 타이틀
                        </label>
                        <input
                          type="text"
                          value={localData.hero.title}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              hero: { ...localData.hero, title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        서브타이틀 소개문구
                      </label>
                      <textarea
                        rows={2}
                        value={localData.hero.subtitle}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            hero: { ...localData.hero, subtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ABOUT */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-[#111111] border-b pb-2">
                    About 영역 & 주요 지표 설정
                  </h4>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          이름
                        </label>
                        <input
                          type="text"
                          value={localData.about.name}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              about: { ...localData.about, name: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          직함
                        </label>
                        <input
                          type="text"
                          value={localData.about.title}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              about: { ...localData.about, title: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        소개 본문
                      </label>
                      <textarea
                        rows={4}
                        value={localData.about.bio}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            about: { ...localData.about, bio: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border text-xs"
                      />
                    </div>

                    {/* Image between Skill & Stats */}
                    <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2">
                      <label className="block text-xs font-bold text-gray-700">
                        소개 & 협업 사진 (Skill 설명과 협업 성과 사이에 표시)
                      </label>
                      <p className="text-[11px] text-gray-500">
                        사진 이미지 파일 또는 URL을 등록하시면 메인 화면의 역량 카드와 성과 지표 사이에 배치됩니다.
                      </p>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="이미지 URL을 입력하거나 파일 업로드하세요"
                          value={localData.about.profileImage || ''}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              about: { ...localData.about, profileImage: e.target.value },
                            })
                          }
                          className="flex-1 px-3 py-2 rounded-xl border text-xs bg-white"
                        />
                        <label className="px-3.5 py-2 bg-[#9933FF]/10 text-[#9933FF] hover:bg-[#9933FF]/20 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1 shrink-0 transition-colors">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>사진 파일 업로드</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageFileUpload(e, (base64) =>
                                setLocalData({
                                  ...localData,
                                  about: { ...localData.about, profileImage: base64 },
                                })
                              )
                            }
                          />
                        </label>
                        {localData.about.profileImage && (
                          <button
                            type="button"
                            onClick={() =>
                              setLocalData({
                                ...localData,
                                about: { ...localData.about, profileImage: '' },
                              })
                            }
                            className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer shrink-0"
                          >
                            사진 삭제
                          </button>
                        )}
                      </div>
                      {localData.about.profileImage && (
                        <div className="mt-2 w-40 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-2xs">
                          <img
                            src={localData.about.profileImage}
                            alt="미리보기"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Career History List */}
                    <div className="pt-6 border-t space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-sm font-bold text-[#9933FF]">
                            주요 이력 관리
                          </h5>
                          <p className="text-[11px] text-gray-500">
                            소개(About Me) 영역에 표시될 이력(재직기간, 회사명, 역할, 주요 담당 업무)을 자유롭게 추가, 수정, 삭제, 순서 변경할 수 있습니다.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newCareer: CareerItem = {
                              id: `car-${Date.now()}`,
                              period: '2024.01 - 현재',
                              company: '신규 회사/기관명',
                              role: 'Contents PM',
                              description: '담당 주요 주요 업무 및 성과 항목',
                            };
                            const newCareers = [...(localData.about.career || []), newCareer];
                            saveAndSync({
                              ...localData,
                              about: { ...localData.about, career: newCareers },
                            });
                          }}
                          className="px-3.5 py-1.5 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer shrink-0 shadow-xs"
                        >
                          <Plus className="w-4 h-4" />
                          <span>이력 추가</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        {(localData.about.career || []).map((item, idx) => (
                          <div
                            key={item.id || idx}
                            className="p-4 rounded-xl border bg-gray-50 space-y-3 relative shadow-2xs"
                          >
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                              <span className="text-[11px] font-bold text-[#9933FF]">
                                이력 #{idx + 1}
                              </span>
                              <div className="flex items-center space-x-1.5">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => {
                                    const newCareers = [...(localData.about.career || [])];
                                    const [moved] = newCareers.splice(idx, 1);
                                    newCareers.splice(idx - 1, 0, moved);
                                    saveAndSync({
                                      ...localData,
                                      about: { ...localData.about, career: newCareers },
                                    });
                                  }}
                                  className="p-1 rounded-md border bg-white disabled:opacity-30 cursor-pointer"
                                  title="위로 이동"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === (localData.about.career || []).length - 1}
                                  onClick={() => {
                                    const newCareers = [...(localData.about.career || [])];
                                    const [moved] = newCareers.splice(idx, 1);
                                    newCareers.splice(idx + 1, 0, moved);
                                    saveAndSync({
                                      ...localData,
                                      about: { ...localData.about, career: newCareers },
                                    });
                                  }}
                                  className="p-1 rounded-md border bg-white disabled:opacity-30 cursor-pointer"
                                  title="아래로 이동"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm('이 이력 항목을 삭제하시겠습니까?')) {
                                      const newCareers = (localData.about.career || []).filter((_, i) => i !== idx);
                                      saveAndSync({
                                        ...localData,
                                        about: { ...localData.about, career: newCareers },
                                      });
                                    }
                                  }}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">
                                  기간 (예: 2023.01 - 현재)
                                </label>
                                <input
                                  type="text"
                                  value={item.period}
                                  onChange={(e) => {
                                    const newCareers = [...(localData.about.career || [])];
                                    newCareers[idx].period = e.target.value;
                                    setLocalData({
                                      ...localData,
                                      about: { ...localData.about, career: newCareers },
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-lg border text-xs font-bold text-[#9933FF] bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">
                                  회사 / 조직명
                                </label>
                                <input
                                  type="text"
                                  value={item.company}
                                  onChange={(e) => {
                                    const newCareers = [...(localData.about.career || [])];
                                    newCareers[idx].company = e.target.value;
                                    setLocalData({
                                      ...localData,
                                      about: { ...localData.about, career: newCareers },
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-lg border text-xs font-bold bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-500 mb-0.5">
                                  직책 / 역할 (예: Contents Lead PM)
                                </label>
                                <input
                                  type="text"
                                  value={item.role}
                                  onChange={(e) => {
                                    const newCareers = [...(localData.about.career || [])];
                                    newCareers[idx].role = e.target.value;
                                    setLocalData({
                                      ...localData,
                                      about: { ...localData.about, career: newCareers },
                                    });
                                  }}
                                  className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">
                                주요 담당 업무 및 설명
                              </label>
                              <textarea
                                rows={2}
                                value={item.description || ''}
                                onChange={(e) => {
                                  const newCareers = [...(localData.about.career || [])];
                                  newCareers[idx].description = e.target.value;
                                  setLocalData({
                                    ...localData,
                                    about: { ...localData.about, career: newCareers },
                                  });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border text-xs bg-white"
                                placeholder="세부 담당 업무 및 성과 항목"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stats List */}
                    <div className="pt-4 border-t space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-sm font-bold text-[#9933FF]">
                            성과 지표 숫자 관리 (강사 수, 수강생 수 등)
                          </h5>
                          <p className="text-[11px] text-gray-500">
                            메인 화면에 강조되는 숫자 지표를 자유롭게 추가, 수정, 삭제, 순서 변경할 수 있습니다.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newStat = {
                              id: `st-${Date.now()}`,
                              value: '100+',
                              label: '새 성과 지표',
                              description: '지표에 대한 세부 설명입니다.',
                            };
                            const newStats = [...localData.about.stats, newStat];
                            saveAndSync({
                              ...localData,
                              about: { ...localData.about, stats: newStats },
                            });
                          }}
                          className="px-3.5 py-1.5 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                          <span>지표 추가</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {localData.about.stats.map((stat, idx) => (
                          <div
                            key={stat.id || idx}
                            className="p-4 rounded-xl border bg-gray-50 space-y-2.5 relative shadow-2xs"
                          >
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                              <span className="text-[11px] font-bold text-[#9933FF]">
                                지표 #{idx + 1}
                              </span>
                              <div className="flex items-center space-x-1.5">
                                <button
                                  type="button"
                                  disabled={idx === 0}
                                  onClick={() => {
                                    const newStats = [...localData.about.stats];
                                    const [moved] = newStats.splice(idx, 1);
                                    newStats.splice(idx - 1, 0, moved);
                                    saveAndSync({
                                      ...localData,
                                      about: { ...localData.about, stats: newStats },
                                    });
                                  }}
                                  className="p-1 rounded-md border bg-white disabled:opacity-30 cursor-pointer"
                                  title="위로 이동"
                                >
                                  <ArrowUp className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  disabled={idx === localData.about.stats.length - 1}
                                  onClick={() => {
                                    const newStats = [...localData.about.stats];
                                    const [moved] = newStats.splice(idx, 1);
                                    newStats.splice(idx + 1, 0, moved);
                                    saveAndSync({
                                      ...localData,
                                      about: { ...localData.about, stats: newStats },
                                    });
                                  }}
                                  className="p-1 rounded-md border bg-white disabled:opacity-30 cursor-pointer"
                                  title="아래로 이동"
                                >
                                  <ArrowDown className="w-3 h-3" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (window.confirm('이 지표 항목을 삭제하시겠습니까?')) {
                                      const newStats = localData.about.stats.filter((_, i) => i !== idx);
                                      saveAndSync({
                                        ...localData,
                                        about: { ...localData.about, stats: newStats },
                                      });
                                    }
                                  }}
                                  className="p-1 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                                  title="삭제"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">
                                숫자 / 성과 수치 (예: 100+명, 218% 등)
                              </label>
                              <input
                                type="text"
                                value={stat.value}
                                placeholder="지표 값 (예: 100+명)"
                                onChange={(e) => {
                                  const newStats = [...localData.about.stats];
                                  newStats[idx].value = e.target.value;
                                  setLocalData({
                                    ...localData,
                                    about: { ...localData.about, stats: newStats },
                                  });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border text-sm font-extrabold text-[#9933FF] bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">
                                라벨 (예: 지금까지 만난 강사)
                              </label>
                              <input
                                type="text"
                                value={stat.label}
                                placeholder="지표 라벨"
                                onChange={(e) => {
                                  const newStats = [...localData.about.stats];
                                  newStats[idx].label = e.target.value;
                                  setLocalData({
                                    ...localData,
                                    about: { ...localData.about, stats: newStats },
                                  });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border text-xs font-bold bg-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-gray-500 mb-0.5">
                                상세 설명 (선택사항)
                              </label>
                              <input
                                type="text"
                                value={stat.description || ''}
                                placeholder="예: IT, 마케팅, 비즈니스 분야 등"
                                onChange={(e) => {
                                  const newStats = [...localData.about.stats];
                                  newStats[idx].description = e.target.value;
                                  setLocalData({
                                    ...localData,
                                    about: { ...localData.about, stats: newStats },
                                  });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border text-xs text-gray-600 bg-white"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: WHY ME */}
              {activeTab === 'whyme' && (
                <div className="space-y-6">
                  {/* Why Me 섹션 부연설명 문구 */}
                  <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-200/80 space-y-2">
                    <label className="block text-xs font-bold text-[#9933FF]">
                      Why Me 섹션 상단 부연설명 문구
                    </label>
                    <input
                      type="text"
                      value={localData.whyMeSubtitle || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalData({ ...localData, whyMeSubtitle: val });
                        saveAndSync({ ...localData, whyMeSubtitle: val });
                      }}
                      placeholder="예: 실제 사례는 PROJECT 페이지에서 확인하실 수 있습니다."
                      className="w-full px-3 py-2 bg-white rounded-xl border border-purple-300 text-xs font-medium text-gray-900 focus:outline-hidden focus:border-[#9933FF] shadow-2xs"
                    />
                  </div>

                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-lg font-bold text-[#111111]">
                      Why Me 카드 설정 (추가 / 삭제 / 순서 변경)
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newCard = {
                          id: `wm-${Date.now()}`,
                          number: `0${localData.whyMe.length + 1}`,
                          title: '새로운 핵심 강점 및 원칙',
                          description: '새로운 강점에 대한 세부 설명입니다.',
                        };
                        const newCards = [...localData.whyMe, newCard];
                        saveAndSync({ ...localData, whyMe: newCards });
                      }}
                      className="px-4 py-2 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Why Me 카드 추가</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {localData.whyMe.map((card, idx) => (
                      <div
                        key={card.id}
                        className="p-4 rounded-2xl border bg-[#FAFAFA] space-y-3"
                      >
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="text-xs font-bold text-[#9933FF]">
                            Why Me 카드 #{idx + 1}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                const newCards = [...localData.whyMe];
                                const [moved] = newCards.splice(idx, 1);
                                newCards.splice(idx - 1, 0, moved);
                                saveAndSync({ ...localData, whyMe: newCards });
                              }}
                              className="p-1 rounded-lg border bg-white disabled:opacity-30 cursor-pointer"
                              title="위로 이동"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === localData.whyMe.length - 1}
                              onClick={() => {
                                const newCards = [...localData.whyMe];
                                const [moved] = newCards.splice(idx, 1);
                                newCards.splice(idx + 1, 0, moved);
                                saveAndSync({ ...localData, whyMe: newCards });
                              }}
                              className="p-1 rounded-lg border bg-white disabled:opacity-30 cursor-pointer"
                              title="아래로 이동"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('이 카드를 삭제하시겠습니까?')) {
                                  const newCards = localData.whyMe.filter((_, i) => i !== idx);
                                  saveAndSync({ ...localData, whyMe: newCards });
                                }
                              }}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              번호 (예: 01)
                            </label>
                            <input
                              type="text"
                              value={card.number || `0${idx + 1}`}
                              onChange={(e) => {
                                const newCards = [...localData.whyMe];
                                newCards[idx].number = e.target.value;
                                setLocalData({ ...localData, whyMe: newCards });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-[#9933FF]"
                            />
                          </div>
                          <div className="col-span-3">
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              제목
                            </label>
                            <input
                              type="text"
                              value={card.title}
                              onChange={(e) => {
                                const newCards = [...localData.whyMe];
                                newCards[idx].title = e.target.value;
                                setLocalData({ ...localData, whyMe: newCards });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            세부 설명
                          </label>
                          <textarea
                            rows={2}
                            value={card.description}
                            onChange={(e) => {
                              const newCards = [...localData.whyMe];
                              newCards[idx].description = e.target.value;
                              setLocalData({ ...localData, whyMe: newCards });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Portfolio Subtitle Control */}
                  <div className="bg-purple-50/60 p-4 rounded-xl border border-purple-200/80 space-y-2">
                    <label className="block text-xs font-extrabold text-[#9933FF]">
                      Portfolio 헤더 아래 부연 설명글
                    </label>
                    <input
                      type="text"
                      placeholder="예: 수강생 완주율과 실질적 비즈니스 성과를 이끌어낸 대표 프로젝트 사례입니다."
                      value={localData.projectsSubtitle || ''}
                      onChange={(e) => {
                        const updatedVal = e.target.value;
                        setLocalData({ ...localData, projectsSubtitle: updatedVal });
                        saveAndSync({
                          ...localData,
                          projectsSubtitle: updatedVal,
                        });
                      }}
                      className="w-full px-3 py-2 bg-white rounded-lg border border-purple-200 text-xs font-medium focus:outline-hidden focus:border-[#9933FF] shadow-2xs"
                    />
                    <p className="text-[10px] text-gray-500">
                      메인페이지의 Portfolio 제목 바로 아래 표시되는 부연 설명글입니다.
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-lg font-bold text-[#111111]">
                      프로젝트 관리 (무한 추가 / 삭제 / 순서 변경)
                    </h4>
                    <button
                      onClick={() => {
                        const newProj: ProjectItem = {
                          id: `proj-${Date.now()}`,
                          title: '새로운 강의 기획 프로젝트',
                          category: '신규 카테고리',
                          description: '프로젝트에 대한 간단한 개요 설명입니다.',
                          heroImage: localData.hero.bgImage,
                          caseStudy: {
                            overview: '신규 프로젝트 상세 개요입니다.',
                            background: '프로젝트 배경 정보입니다.',
                            role: 'Contents PM - 기획 및 운영 총괄',
                            execution: '주요 실행 내용 목록입니다.',
                            results: '매출 및 완주율 성과 결과입니다.',
                            keyLearnings: '인사이트 및 배운 점입니다.',
                            beforeImage: '',
                            beforeCaption: '개선 전 문제점 및 포맷 설명',
                            afterImage: '',
                            afterCaption: '개선 후 성과 및 변경사항 설명',
                          },
                        };
                        saveAndSync({
                          ...localData,
                          projects: [newProj, ...localData.projects],
                        });
                      }}
                      className="px-4 py-2 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>신규 프로젝트 추가</span>
                    </button>
                  </div>

                  <div className="space-y-6">
                    {localData.projects.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className="p-5 rounded-2xl border border-gray-200 bg-[#FAFAFA] space-y-4"
                      >
                        <div className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center space-x-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#9933FF] text-white">
                              #{idx + 1}
                            </span>
                            <span className="text-sm font-bold text-[#111111]">
                              {proj.title}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {/* Move Up */}
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                const newP = [...localData.projects];
                                const [removed] = newP.splice(idx, 1);
                                newP.splice(idx - 1, 0, removed);
                                saveAndSync({ ...localData, projects: newP });
                              }}
                              className="p-1.5 rounded-lg border bg-white disabled:opacity-30 cursor-pointer"
                              title="위로 이동"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            {/* Move Down */}
                            <button
                              type="button"
                              disabled={idx === localData.projects.length - 1}
                              onClick={() => {
                                const newP = [...localData.projects];
                                const [removed] = newP.splice(idx, 1);
                                newP.splice(idx + 1, 0, removed);
                                saveAndSync({ ...localData, projects: newP });
                              }}
                              className="p-1.5 rounded-lg border bg-white disabled:opacity-30 cursor-pointer"
                              title="아래로 이동"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('이 프로젝트를 삭제하시겠습니까?')) {
                                  const filtered = localData.projects.filter(
                                    (p) => p.id !== proj.id
                                  );
                                  saveAndSync({
                                    ...localData,
                                    projects: filtered,
                                  });
                                }
                              }}
                              className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              프로젝트 제목
                            </label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => {
                                const updated = { ...proj, title: e.target.value };
                                updateProject(updated);
                                const newP = [...localData.projects];
                                newP[idx] = updated;
                                setLocalData({ ...localData, projects: newP });
                              }}
                              className="w-full px-3 py-2 rounded-xl border text-xs font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                              카테고리
                            </label>
                            <input
                              type="text"
                              value={proj.category}
                              onChange={(e) => {
                                const updated = { ...proj, category: e.target.value };
                                updateProject(updated);
                                const newP = [...localData.projects];
                                newP[idx] = updated;
                                setLocalData({ ...localData, projects: newP });
                              }}
                              className="w-full px-3 py-2 rounded-xl border text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            메인페이지 카드 요약 설명
                          </label>
                          <textarea
                            rows={2}
                            value={proj.description || ''}
                            onChange={(e) => {
                              const updated = { ...proj, description: e.target.value };
                              updateProject(updated);
                              const newP = [...localData.projects];
                              newP[idx] = updated;
                              setLocalData({ ...localData, projects: newP });
                            }}
                            placeholder="예: 생성형 AI 툴을 활용하여 음원 및 미디어 콘텐츠 수익화를 이루어내는 실전 가이드 코스"
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-normal focus:outline-hidden focus:border-[#9933FF]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            대표 커버 이미지 URL / 업로드
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={proj.heroImage}
                              onChange={(e) => {
                                const updated = { ...proj, heroImage: e.target.value };
                                updateProject(updated);
                                const newP = [...localData.projects];
                                newP[idx] = updated;
                                setLocalData({ ...localData, projects: newP });
                              }}
                              className="flex-1 px-3 py-1.5 rounded-xl border text-xs"
                            />
                            <label className="px-3 py-1.5 bg-gray-200 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1">
                              <ImageIcon className="w-3.5 h-3.5" />
                              <span>업로드</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageFileUpload(e, (base64) => {
                                    const updated = { ...proj, heroImage: base64 };
                                    updateProject(updated);
                                    const newP = [...localData.projects];
                                    newP[idx] = updated;
                                    setLocalData({ ...localData, projects: newP });
                                  })
                                }
                              />
                            </label>
                          </div>
                        </div>

                        {/* Case Study Details Accordion/Fields */}
                        <div className="p-4 rounded-xl bg-white border border-gray-200 space-y-3.5">
                          <h5 className="text-xs font-extrabold text-[#9933FF] uppercase flex items-center justify-between">
                            <span>STAR 기획 분석 포맷 (Case Study)</span>
                            <span className="text-[10px] text-gray-400 font-normal">S.T.A.R. 기획서 구조</span>
                          </h5>

                          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200/80">
                            <label className="block text-xs font-bold text-[#9933FF] mb-1 flex items-center justify-between">
                              <span>상세 모달 부연설명 개요 (Overview)</span>
                              <span className="text-[10px] text-purple-600 font-semibold">프로젝트 상세페이지 상단 부연설명 문구</span>
                            </label>
                            <textarea
                              rows={3}
                              value={proj.caseStudy?.overview || ''}
                              onChange={(e) => {
                                const updated = {
                                  ...proj,
                                  caseStudy: {
                                    ...proj.caseStudy,
                                    overview: e.target.value,
                                  },
                                };
                                updateProject(updated);
                                const newP = [...localData.projects];
                                newP[idx] = updated;
                                setLocalData({ ...localData, projects: newP });
                              }}
                              placeholder="예: AI 기술 확산에 발맞춰, 음악 제작 지식이 없는 초보자도 AI로 생성한 음원 및 영상 콘텐츠를 유통하여 매출을 내도록 기획된 실전형 프로그램입니다."
                              className="w-full px-3 py-2 bg-white rounded-lg border border-purple-300 text-xs font-medium text-gray-900 focus:outline-hidden focus:border-[#9933FF] shadow-2xs"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                [S] Situation (상황 & 문제 배경)
                              </label>
                              <textarea
                                rows={3}
                                value={proj.caseStudy.background}
                                onChange={(e) => {
                                  const updated = {
                                    ...proj,
                                    caseStudy: {
                                      ...proj.caseStudy,
                                      background: e.target.value,
                                    },
                                  };
                                  updateProject(updated);
                                  const newP = [...localData.projects];
                                  newP[idx] = updated;
                                  setLocalData({ ...localData, projects: newP });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                [T] Task (과제 & PM 역할)
                              </label>
                              <textarea
                                rows={3}
                                value={proj.caseStudy.role}
                                onChange={(e) => {
                                  const updated = {
                                    ...proj,
                                    caseStudy: { ...proj.caseStudy, role: e.target.value },
                                  };
                                  updateProject(updated);
                                  const newP = [...localData.projects];
                                  newP[idx] = updated;
                                  setLocalData({ ...localData, projects: newP });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">
                              [A] Action (주요 실행 내용 & 핵심 전략)
                            </label>
                            <textarea
                              rows={3}
                              value={proj.caseStudy.execution}
                              onChange={(e) => {
                                const updated = {
                                  ...proj,
                                  caseStudy: { ...proj.caseStudy, execution: e.target.value },
                                };
                                updateProject(updated);
                                const newP = [...localData.projects];
                                newP[idx] = updated;
                                setLocalData({ ...localData, projects: newP });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                              placeholder="예: 1) 강사 밀착 인터뷰, 2) 커리큘럼 재구조화, 3) 완주율 리텐션 시스템 설계"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold text-[#9933FF] mb-1">
                                [R] Results (정량적/정성적 성과)
                              </label>
                              <textarea
                                rows={3}
                                value={proj.caseStudy.results}
                                onChange={(e) => {
                                  const updated = {
                                    ...proj,
                                    caseStudy: { ...proj.caseStudy, results: e.target.value },
                                  };
                                  updateProject(updated);
                                  const newP = [...localData.projects];
                                  newP[idx] = updated;
                                  setLocalData({ ...localData, projects: newP });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-[#9933FF]"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-gray-700 mb-1">
                                [R] Key Learnings & Insights (배운 점 & 인사이트)
                              </label>
                              <textarea
                                rows={3}
                                value={proj.caseStudy.keyLearnings || ''}
                                onChange={(e) => {
                                  const updated = {
                                    ...proj,
                                    caseStudy: { ...proj.caseStudy, keyLearnings: e.target.value },
                                  };
                                  updateProject(updated);
                                  const newP = [...localData.projects];
                                  newP[idx] = updated;
                                  setLocalData({ ...localData, projects: newP });
                                }}
                                className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                                placeholder="프로젝트를 수행하며 얻은 레슨런 및 인사이트를 작성하세요."
                              />
                            </div>
                          </div>

                          {/* 프로젝트 자료 (사진/자료 슬라이드) 관리 */}
                          <div className="pt-4 border-t border-gray-200 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <label className="block text-xs font-bold text-[#111111]">
                                  프로젝트 자료 (사진 / 자료 슬라이드)
                                </label>
                                <p className="text-[10px] text-gray-500">
                                  슬라이드로 보여줄 여러 이미지와 설명을 추가, 수정, 삭제할 수 있습니다.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const curMaterials = proj.caseStudy.materials || (
                                    [
                                      ...(proj.caseStudy.beforeImage
                                        ? [{ id: `mat-b-${Date.now()}`, image: proj.caseStudy.beforeImage, caption: proj.caseStudy.beforeCaption || '[BEFORE]' }]
                                        : []),
                                      ...(proj.caseStudy.afterImage
                                        ? [{ id: `mat-a-${Date.now()}`, image: proj.caseStudy.afterImage, caption: proj.caseStudy.afterCaption || '[AFTER]' }]
                                        : []),
                                    ]
                                  );
                                  const newMat = {
                                    id: `mat-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                                    image: '',
                                    caption: '',
                                  };
                                  const updatedMaterials = [...curMaterials, newMat];
                                  const updated = {
                                    ...proj,
                                    caseStudy: {
                                      ...proj.caseStudy,
                                      materials: updatedMaterials,
                                    },
                                  };
                                  updateProject(updated);
                                  const newP = [...localData.projects];
                                  newP[idx] = updated;
                                  saveAndSync({ ...localData, projects: newP });
                                }}
                                className="px-3 py-1.5 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>자료 이미지 추가</span>
                              </button>
                            </div>

                            {/* Materials List */}
                            {((proj.caseStudy.materials && proj.caseStudy.materials.length > 0)
                              ? proj.caseStudy.materials
                              : [
                                  ...(proj.caseStudy.beforeImage
                                    ? [{ id: 'before', image: proj.caseStudy.beforeImage, caption: proj.caseStudy.beforeCaption || '[BEFORE]' }]
                                    : []),
                                  ...(proj.caseStudy.afterImage
                                    ? [{ id: 'after', image: proj.caseStudy.afterImage, caption: proj.caseStudy.afterCaption || '[AFTER]' }]
                                    : []),
                                ]
                            ).map((mat, mIdx, arr) => (
                              <div
                                key={mat.id || mIdx}
                                className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-[11px] font-bold text-gray-700">
                                    자료 #{mIdx + 1}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={mIdx === 0}
                                      onClick={() => {
                                        const mats = [...(proj.caseStudy.materials || arr)];
                                        const [moved] = mats.splice(mIdx, 1);
                                        mats.splice(mIdx - 1, 0, moved);
                                        const updated = {
                                          ...proj,
                                          caseStudy: { ...proj.caseStudy, materials: mats },
                                        };
                                        updateProject(updated);
                                        const newP = [...localData.projects];
                                        newP[idx] = updated;
                                        saveAndSync({ ...localData, projects: newP });
                                      }}
                                      className="p-1 rounded-md border bg-white disabled:opacity-30 cursor-pointer"
                                      title="위로 이동"
                                    >
                                      <ArrowUp className="w-3 h-3 text-gray-600" />
                                    </button>
                                    <button
                                      type="button"
                                      disabled={mIdx === arr.length - 1}
                                      onClick={() => {
                                        const mats = [...(proj.caseStudy.materials || arr)];
                                        const [moved] = mats.splice(mIdx, 1);
                                        mats.splice(mIdx + 1, 0, moved);
                                        const updated = {
                                          ...proj,
                                          caseStudy: { ...proj.caseStudy, materials: mats },
                                        };
                                        updateProject(updated);
                                        const newP = [...localData.projects];
                                        newP[idx] = updated;
                                        saveAndSync({ ...localData, projects: newP });
                                      }}
                                      className="p-1 rounded-md border bg-white disabled:opacity-30 cursor-pointer"
                                      title="아래로 이동"
                                    >
                                      <ArrowDown className="w-3 h-3 text-gray-600" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (window.confirm('이 자료 항목을 삭제하시겠습니까?')) {
                                          const mats = (proj.caseStudy.materials || arr).filter((_, i) => i !== mIdx);
                                          const updated = {
                                            ...proj,
                                            caseStudy: { ...proj.caseStudy, materials: mats },
                                          };
                                          updateProject(updated);
                                          const newP = [...localData.projects];
                                          newP[idx] = updated;
                                          saveAndSync({ ...localData, projects: newP });
                                        }
                                      }}
                                      className="p-1 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                                      title="삭제"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>

                                <div className="flex gap-2 items-center">
                                  <input
                                    type="text"
                                    placeholder="자료 이미지 URL 또는 업로드"
                                    value={mat.image || ''}
                                    onChange={(e) => {
                                      const mats = [...(proj.caseStudy.materials || arr)];
                                      mats[mIdx] = { ...mats[mIdx], image: e.target.value };
                                      const updated = {
                                        ...proj,
                                        caseStudy: { ...proj.caseStudy, materials: mats },
                                      };
                                      updateProject(updated);
                                      const newP = [...localData.projects];
                                      newP[idx] = updated;
                                      saveAndSync({ ...localData, projects: newP });
                                    }}
                                    className="flex-1 px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                                  />
                                  <label className="px-2.5 py-1.5 bg-gray-200 hover:bg-gray-300 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1 shrink-0">
                                    <ImageIcon className="w-3.5 h-3.5" />
                                    <span>업로드</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) =>
                                        handleImageFileUpload(e, (base64) => {
                                          const mats = [...(proj.caseStudy.materials || arr)];
                                          mats[mIdx] = { ...mats[mIdx], image: base64 };
                                          const updated = {
                                            ...proj,
                                            caseStudy: { ...proj.caseStudy, materials: mats },
                                          };
                                          updateProject(updated);
                                          const newP = [...localData.projects];
                                          newP[idx] = updated;
                                          saveAndSync({ ...localData, projects: newP });
                                        })
                                      }
                                    />
                                  </label>
                                </div>

                                <input
                                  type="text"
                                  placeholder="자료 설명/캡션 (예: 커리큘럼 로드맵 가이드북)"
                                  value={mat.caption || ''}
                                  onChange={(e) => {
                                    const mats = [...(proj.caseStudy.materials || arr)];
                                    mats[mIdx] = { ...mats[mIdx], caption: e.target.value };
                                    const updated = {
                                      ...proj,
                                      caseStudy: { ...proj.caseStudy, materials: mats },
                                    };
                                    updateProject(updated);
                                    const newP = [...localData.projects];
                                    newP[idx] = updated;
                                    saveAndSync({ ...localData, projects: newP });
                                  }}
                                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                                />

                                {mat.image && (
                                  <div className="w-28 h-16 rounded-lg overflow-hidden border border-gray-200">
                                    <img
                                      src={mat.image}
                                      alt="Material preview"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: PROCESS */}
              {activeTab === 'process' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-lg font-bold text-[#111111]">
                      기획/운영 프로세스 단계 설정 (추가 / 삭제 / 순서 변경)
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newStep = {
                          id: `pr-${Date.now()}`,
                          stepNumber: `0${localData.process.length + 1}`,
                          subtitle: '신규 프로세스 단계',
                          title: '새로운 프로세스 단계 제목',
                          roles: ['세부 수행 역할 1', '세부 수행 역할 2'],
                        };
                        const newP = [...localData.process, newStep];
                        setLocalData({ ...localData, process: newP });
                      }}
                      className="px-4 py-2 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>프로세스 단계 추가</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {localData.process.map((step, idx) => (
                      <div
                        key={step.id}
                        className="p-4 rounded-2xl border bg-[#FAFAFA] space-y-3"
                      >
                        <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                          <span className="text-xs font-bold text-[#9933FF]">
                            STEP {step.stepNumber || idx + 1}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                const newP = [...localData.process];
                                const [moved] = newP.splice(idx, 1);
                                newP.splice(idx - 1, 0, moved);
                                saveAndSync({ ...localData, process: newP });
                              }}
                              className="p-1 rounded-lg border bg-white disabled:opacity-30 cursor-pointer"
                              title="위로 이동"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === localData.process.length - 1}
                              onClick={() => {
                                const newP = [...localData.process];
                                const [moved] = newP.splice(idx, 1);
                                newP.splice(idx + 1, 0, moved);
                                saveAndSync({ ...localData, process: newP });
                              }}
                              className="p-1 rounded-lg border bg-white disabled:opacity-30 cursor-pointer"
                              title="아래로 이동"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('이 프로세스 단계를 삭제하시겠습니까?')) {
                                  const newP = localData.process.filter((_, i) => i !== idx);
                                  saveAndSync({ ...localData, process: newP });
                                }
                              }}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              단계 번호 (예: 01)
                            </label>
                            <input
                              type="text"
                              value={step.stepNumber}
                              onChange={(e) => {
                                const newP = [...localData.process];
                                newP[idx].stepNumber = e.target.value;
                                setLocalData({ ...localData, process: newP });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-[#9933FF]"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              서브타이틀 (예: MARKET RESEARCH)
                            </label>
                            <input
                              type="text"
                              value={step.subtitle}
                              onChange={(e) => {
                                const newP = [...localData.process];
                                newP[idx].subtitle = e.target.value;
                                setLocalData({ ...localData, process: newP });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-semibold"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            단계 제목
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) => {
                              const newP = [...localData.process];
                              newP[idx].title = e.target.value;
                              setLocalData({ ...localData, process: newP });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-1">
                            수행 역할 목록 (줄바꿈으로 구분)
                          </label>
                          <textarea
                            rows={3}
                            value={step.roles.join('\n')}
                            onChange={(e) => {
                              const newP = [...localData.process];
                              newP[idx].roles = e.target.value.split('\n');
                              setLocalData({ ...localData, process: newP });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: RECOMMENDATIONS */}
              {activeTab === 'recommendations' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                    <div>
                      <h4 className="text-lg font-bold text-[#111111]">
                        추천사 및 후기 이미지 관리
                      </h4>
                      <p className="text-xs text-gray-500">
                        카톡 캡처 및 전달 후기 <strong>사진 이미지만 등록 및 순서 변경/관리</strong>하실 수 있습니다. 화살표 버튼으로 메인 화면 노출 순서를 변경할 수 있습니다.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {localData.recommendations.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('등록된 모든 추천사/후기 이미지를 삭제하시겠습니까?')) {
                              saveAndSync({
                                ...localData,
                                recommendations: [],
                              });
                            }
                          }}
                          className="px-3.5 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>전체 삭제</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          const newRec: RecommendationItem = {
                            id: `rec-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                            image: '',
                          };
                          saveAndSync({
                            ...localData,
                            recommendations: [newRec, ...localData.recommendations],
                          });
                        }}
                        className="px-4 py-2 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                      >
                        <Plus className="w-4 h-4" />
                        <span>📸 새 후기 사진 추가</span>
                      </button>
                    </div>
                  </div>

                  {localData.recommendations.length === 0 ? (
                    <div className="p-8 text-center border border-dashed border-gray-300 rounded-2xl text-gray-400 text-xs">
                      등록된 후기 이미지가 없습니다. 상단의 '새 후기 사진 추가' 버튼을 눌러 추가해주세요.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {localData.recommendations.map((rec, idx) => {
                        const handleDeleteThisRec = () => {
                          if (window.confirm(`'#${idx + 1} 후기 이미지' 항목을 삭제하시겠습니까?`)) {
                            const filtered = localData.recommendations.filter(
                              (r) => r.id !== rec.id
                            );
                            saveAndSync({
                              ...localData,
                              recommendations: filtered,
                            });
                          }
                        };

                        const handleImageChange = (newImgUrl: string) => {
                          const newR = [...localData.recommendations];
                          newR[idx] = { ...newR[idx], image: newImgUrl };
                          saveAndSync({ ...localData, recommendations: newR });
                        };

                        const handleMoveRec = (fromIndex: number, toIndex: number) => {
                          if (toIndex < 0 || toIndex >= localData.recommendations.length) return;
                          const newRecs = [...localData.recommendations];
                          const [moved] = newRecs.splice(fromIndex, 1);
                          newRecs.splice(toIndex, 0, moved);
                          saveAndSync({ ...localData, recommendations: newRecs });
                        };

                        return (
                          <div
                            key={rec.id || `rec-${idx}`}
                            className="p-4 rounded-2xl border border-gray-200 bg-[#FAFAFA] space-y-3 relative shadow-xs"
                          >
                            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#9933FF]/10 text-[#9933FF] flex items-center gap-1">
                                  <ImageIcon className="w-3.5 h-3.5" />
                                  <span>후기 이미지 #{idx + 1}</span>
                                </span>

                                {/* Order control buttons */}
                                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5 shadow-2xs">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => handleMoveRec(idx, idx - 1)}
                                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-20 cursor-pointer text-gray-700 transition-colors flex items-center justify-center"
                                    title="위(앞)로 순서 이동"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === localData.recommendations.length - 1}
                                    onClick={() => handleMoveRec(idx, idx + 1)}
                                    className="p-1 rounded hover:bg-gray-100 disabled:opacity-20 cursor-pointer text-gray-700 transition-colors flex items-center justify-center"
                                    title="아래(뒤)로 순서 이동"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={handleDeleteThisRec}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold border border-red-200"
                                title="삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>삭제</span>
                              </button>
                            </div>

                            {/* Image File Upload & Preview */}
                            <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-2">
                              <label className="block text-xs font-bold text-gray-700">
                                사진 파일 업로드 또는 이미지 URL 입력
                              </label>
                              <div className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={rec.image || ''}
                                  placeholder="이미지 URL을 입력하거나 우측 파일업로드 선택"
                                  onChange={(e) => handleImageChange(e.target.value)}
                                  className="flex-1 px-3 py-1.5 rounded-lg border text-xs focus:border-[#9933FF] focus:outline-none"
                                />
                                <label className="px-3.5 py-1.5 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1 shrink-0 shadow-2xs">
                                  <ImageIcon className="w-3.5 h-3.5" />
                                  <span>파일 선택</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) =>
                                      handleImageFileUpload(e, (base64) => {
                                        handleImageChange(base64);
                                      })
                                    }
                                  />
                                </label>
                              </div>

                              {/* Image Thumbnail Preview */}
                              {rec.image ? (
                                <div className="mt-3 rounded-xl border overflow-hidden max-h-48 bg-gray-50 flex items-center justify-center relative p-1">
                                  <img
                                    src={rec.image}
                                    alt={`#${idx + 1} 미리보기`}
                                    referrerPolicy="no-referrer"
                                    className="max-h-44 w-auto object-contain rounded-lg"
                                  />
                                </div>
                              ) : (
                                <div className="mt-2 p-4 text-center border border-dashed border-gray-200 rounded-lg text-gray-400 text-xs">
                                  등록된 사진이 없습니다. 파일 선택 버튼을 눌러 캡처 이미지를 올려주세요.
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SKILLS */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <h4 className="text-lg font-bold text-[#111111]">
                        핵심 역량 (Core Skills) 관리
                      </h4>
                      <p className="text-xs text-gray-500">
                        핵심 역량 카드 추가, 삭제, 순서 변경 및 세부 문구와 강조 태그를 설정합니다.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newSkill: SkillItem = {
                          id: `sk-${Date.now()}`,
                          category: '핵심 역량',
                          name: '신규 역량 제목',
                          description: '역량에 대한 주요 실행력 및 경험 설명입니다.',
                          isPopular: true,
                        };
                        const updatedSkills = [...localData.skills, newSkill];
                        saveAndSync({ ...localData, skills: updatedSkills });
                      }}
                      className="px-4 py-2 bg-[#9933FF] hover:bg-[#7D26D9] text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>핵심 역량 추가</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {localData.skills.map((skill, idx) => (
                      <div
                        key={skill.id || idx}
                        className="p-4 rounded-2xl border bg-[#FAFAFA] space-y-3 relative shadow-2xs"
                      >
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <span className="text-xs font-bold text-[#9933FF]">
                            역량 #{idx + 1}
                          </span>
                          <div className="flex items-center space-x-1.5">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => {
                                const newS = [...localData.skills];
                                const [moved] = newS.splice(idx, 1);
                                newS.splice(idx - 1, 0, moved);
                                saveAndSync({ ...localData, skills: newS });
                              }}
                              className="p-1 rounded-md border bg-white disabled:opacity-30 cursor-pointer"
                              title="위로 이동"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === localData.skills.length - 1}
                              onClick={() => {
                                const newS = [...localData.skills];
                                const [moved] = newS.splice(idx, 1);
                                newS.splice(idx + 1, 0, moved);
                                saveAndSync({ ...localData, skills: newS });
                              }}
                              className="p-1 rounded-md border bg-white disabled:opacity-30 cursor-pointer"
                              title="아래로 이동"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('이 역량 항목을 삭제하시겠습니까?')) {
                                  const newS = localData.skills.filter((_, i) => i !== idx);
                                  saveAndSync({ ...localData, skills: newS });
                                }
                              }}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                              title="삭제"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              역량 이름
                            </label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => {
                                const newS = [...localData.skills];
                                newS[idx].name = e.target.value;
                                setLocalData({ ...localData, skills: newS });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-gray-600 mb-1">
                              카테고리 / 분야
                            </label>
                            <input
                              type="text"
                              value={skill.category}
                              placeholder="예: 핵심 역량, 성장 & 세일즈"
                              onChange={(e) => {
                                const newS = [...localData.skills];
                                newS[idx].category = e.target.value;
                                setLocalData({ ...localData, skills: newS });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-600 mb-1">
                            세부 실행력 설명
                          </label>
                          <textarea
                            rows={2}
                            value={skill.description || ''}
                            onChange={(e) => {
                              const newS = [...localData.skills];
                              newS[idx].description = e.target.value;
                              setLocalData({ ...localData, skills: newS });
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="checkbox"
                            id={`skill-popular-${idx}`}
                            checked={skill.isPopular || false}
                            onChange={(e) => {
                              const newS = [...localData.skills];
                              newS[idx].isPopular = e.target.checked;
                              setLocalData({ ...localData, skills: newS });
                            }}
                            className="w-4 h-4 text-[#9933FF] rounded cursor-pointer"
                          />
                          <label
                            htmlFor={`skill-popular-${idx}`}
                            className="text-xs font-bold text-gray-700 cursor-pointer"
                          >
                            인기 / 대표 역량 뱃지 표시 (#9933FF 보라색 강조)
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: CONTACT */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-[#111111] border-b pb-2">
                    연락처 & 이력서 관리
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        클로징 후킹 메인 문구
                      </label>
                      <input
                        type="text"
                        value={localData.contact.hookTitle}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            contact: { ...localData.contact, hookTitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#9933FF] mb-1">
                        클로징 후킹 서브 문구 (#9933FF)
                      </label>
                      <input
                        type="text"
                        value={localData.contact.hookSubtitle}
                        onChange={(e) =>
                          setLocalData({
                            ...localData,
                            contact: { ...localData.contact, hookSubtitle: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border text-xs font-bold text-[#9933FF]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          이메일
                        </label>
                        <input
                          type="text"
                          value={localData.contact.email}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              contact: { ...localData.contact, email: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          전화번호
                        </label>
                        <input
                          type="text"
                          value={localData.contact.phone}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              contact: { ...localData.contact, phone: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border space-y-3">
                      <h5 className="text-xs font-bold text-[#9933FF]">
                        이력서 파일 링크 / 파일 업로드
                      </h5>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          이력서 다운로드 파일명
                        </label>
                        <input
                          type="text"
                          value={localData.contact.resumeFileName}
                          onChange={(e) =>
                            setLocalData({
                              ...localData,
                              contact: { ...localData.contact, resumeFileName: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 rounded-lg border text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          이력서 다운로드 URL (또는 이력서 PDF 파일 업로드)
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={localData.contact.resumeUrl}
                            onChange={(e) =>
                              setLocalData({
                                ...localData,
                                contact: { ...localData.contact, resumeUrl: e.target.value },
                              })
                            }
                            className="flex-1 px-3 py-1.5 rounded-lg border text-xs"
                          />
                          <label className="px-3 py-1.5 bg-gray-200 text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1">
                            <span>파일 업로드</span>
                            <input
                              type="file"
                              accept=".pdf,.docx,.doc"
                              className="hidden"
                              onChange={(e) =>
                                handleImageFileUpload(e, (base64) =>
                                  setLocalData({
                                    ...localData,
                                    contact: { ...localData.contact, resumeUrl: base64 },
                                  })
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
