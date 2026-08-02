import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, ProjectItem, RecommendationItem, SkillItem, ProcessStep } from '../types';
import { initialData } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'sung_jahyeon_portfolio_cms_v18';

interface PortfolioContextType {
  data: PortfolioData;
  isAdminLoggedIn: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  updateData: (newData: PortfolioData) => void;
  resetToDefault: () => void;
  // Project specific helpers
  addProject: (project: ProjectItem) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  // Recommendation helpers
  addRecommendation: (rec: RecommendationItem) => void;
  deleteRecommendation: (id: string) => void;
  // Skill helpers
  addSkill: (skill: SkillItem) => void;
  deleteSkill: (id: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse portfolio data from localStorage', e);
    }
    return initialData;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_logged_in') === 'true';
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  const loginAdmin = (password: string): boolean => {
    if (password === '0628') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
  };

  const updateData = (newData: PortfolioData) => {
    setData(newData);
  };

  const resetToDefault = () => {
    setData(initialData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const addProject = (project: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: [project, ...prev.projects],
    }));
  };

  const updateProject = (project: ProjectItem) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === project.id ? project : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    setData((prev) => {
      const result = Array.from(prev.projects);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return {
        ...prev,
        projects: result,
      };
    });
  };

  const addRecommendation = (rec: RecommendationItem) => {
    setData((prev) => ({
      ...prev,
      recommendations: [rec, ...prev.recommendations],
    }));
  };

  const deleteRecommendation = (id: string) => {
    setData((prev) => ({
      ...prev,
      recommendations: prev.recommendations.filter((r) => r.id !== id),
    }));
  };

  const addSkill = (skill: SkillItem) => {
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const deleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
