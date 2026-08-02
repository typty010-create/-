export interface StatItem {
  id: string;
  label: string;
  value: string;
  description?: string;
}

export interface CareerItem {
  id: string;
  period: string;
  company: string;
  role: string;
  description?: string;
}

export interface WhyMeCard {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ProjectMaterial {
  id: string;
  image: string;
  caption?: string;
  title?: string;
}

export interface CaseStudyData {
  overview: string;
  background: string;
  role: string;
  execution: string;
  results: string;
  keyLearnings: string;
  beforeImage?: string;
  beforeCaption?: string;
  afterImage?: string;
  afterCaption?: string;
  tools?: string[];
  galleryImages?: string[];
  materials?: ProjectMaterial[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  heroImage: string;
  caseStudy: CaseStudyData;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  roles: string[];
}

export interface RecommendationItem {
  id: string;
  authorName?: string;
  authorRole?: string;
  text?: string;
  image?: string;
  date?: string;
  highlightTag?: string;
}

export interface SkillItem {
  id: string;
  category: string;
  name: string;
  description?: string;
  isPopular?: boolean;
}

export interface HeroSectionData {
  bgImage: string;
  line1White: string; // "Design"
  line1Highlight: string; // "Learning"
  line2White: string; // "Deliver"
  line2Highlight: string; // "Growth"
  name: string; // "성자현"
  title: string; // "Contents PM"
  subtitle: string; // "수강생의 성공적인 완주를 위한 강의 여정을 설계합니다."
}

export interface AboutSectionData {
  profileImage: string;
  name: string;
  title: string;
  bio: string;
  stats: StatItem[];
  career?: CareerItem[];
}

export interface ContactSectionData {
  hookTitle: string;
  hookSubtitle: string;
  phone: string;
  email: string;
  resumeUrl: string;
  resumeFileName: string;
}

export interface PortfolioData {
  hero: HeroSectionData;
  about: AboutSectionData;
  whyMeSubtitle?: string;
  whyMe: WhyMeCard[];
  projectsSubtitle?: string;
  projects: ProjectItem[];
  process: ProcessStep[];
  recommendations: RecommendationItem[];
  skills: SkillItem[];
  contact: ContactSectionData;
}
