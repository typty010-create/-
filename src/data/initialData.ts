import { PortfolioData } from '../types';

import heroBgImg from '../assets/images/hero_bg_1784986510465.jpg';
import profileImg from '../assets/images/profile_sung_1784986521202.jpg';
import aiPlaylistThumb from '../assets/images/clean_music_studio_1785679102550.jpg';
import japanShortsThumb from '../assets/images/clean_city_shorts_1785679118941.jpg';
import affiliateThumb from '../assets/images/clean_office_desk_1785679132618.jpg';
import partyPlannerThumb from '../assets/images/clean_party_room_1785679146449.jpg';
import programSajuThumb from '../assets/images/clean_saju_desk_1785679162844.jpg';
import rec1Img from '../assets/images/rec_kakaotalk_1_1784986600421.jpg';

export const initialData: PortfolioData = {
  hero: {
    bgImage: heroBgImg,
    line1White: 'Design',
    line1Highlight: 'Learning',
    line2White: 'Deliver',
    line2Highlight: 'Growth',
    name: '성자현',
    title: 'Contents PM',
    subtitle: '수강생의 성공적인 완주를 위한 강의 여정을 설계합니다.',
  },
  about: {
    profileImage: profileImg,
    name: '성자현',
    title: 'Contents PM',
    bio: '강의를 단순한 교육 영상이 아닌 하나의 비즈니스 "Product"로 정의합니다. 수강생이 막힘없이 목표를 달성할 수 있는 학습 경험(LX)과, 강의를 기획하는 브랜드/강사의 매출 및 정량적 성과를 동시에 만족시키는 엔드투엔드 콘텐츠 기획 전문가입니다.',
    stats: [
      {
        id: 'stat-1',
        label: '지금까지 만난 강사',
        value: '19',
        description: '다양한 카테고리의 톱티어 전문 강사진 코칭 및 협업',
      },
      {
        id: 'stat-2',
        label: '진행한 프로젝트',
        value: '29',
        description: '기획부터 정식 론칭 및 리뉴얼 운영 프로젝트',
      },
      {
        id: 'stat-3',
        label: '누적 매출',
        value: '42.8억',
        description: '데이터 기반 커리큘럼 및 세일즈 전략 달성 성과',
      },
      {
        id: 'stat-4',
        label: '최고 목표 달성률',
        value: '218%',
        description: '목표 대비 자율 수강 완주율 및 매출 성장 달성',
      },
    ],
    career: [],
  },
  whyMeSubtitle: '실제 사례는 PROJECT 페이지에서 확인하실 수 있습니다.',
  whyMe: [
    {
      id: 'why-1',
      number: '01',
      title: 'End-to-End Lecture Planning',
      description: '시장 조사, 타겟 설정, 강사 섭외, 커리큘럼 설계부터 상세페이지 기획 및 론칭 후 리뉴얼 운영까지 프로젝트 전 과정을 책임집니다.',
    },
    {
      id: 'why-2',
      number: '02',
      title: 'Data Driven',
      description: '수강생 완주율, 주차별 탈락률, CRM 오픈율 등 정량 데이터에 기반해 강의 내용과 학습 자료를 즉각적으로 개선합니다.',
    },
    {
      id: 'why-3',
      number: '03',
      title: 'Business & Learner Experience',
      description: '강의를 명확한 ROI를 지닌 "Product"로 상품화하고, 완주율을 높이는 실습과 피드백 체계를 설계하여 매출과 만족도를 함께 창출합니다.',
    },
  ],
  projectsSubtitle: '수강생 완주율과 실질적 비즈니스 성과를 이끌어낸 대표 프로젝트 사례입니다.',
  projects: [
    {
      id: 'proj-1',
      title: 'AI 플레이리스트 수익화 강의',
      category: 'AI / 콘텐츠 창작',
      description: '생성형 AI 툴을 활용하여 음원 및 미디어 콘텐츠 수익화를 이루어내는 실전 가이드 코스',
      heroImage: aiPlaylistThumb,
      caseStudy: {
        overview: 'AI 기술 확산에 발맞춰, 음악 제작 지식이 없는 초보자도 AI로 생성한 음원 및 영상 콘텐츠를 유통하여 매출을 내도록 기획된 실전형 프로그램입니다.',
        background: 'AI 관련 콘텐츠 수요는 대폭 증가했으나 실제 수익화 단계까지 연결해 주는 체계적 교육이 부재했습니다. 초보자가 직관적으로 따라 할 수 있는 프롬프트 템플릿과 프로세스 표준화가 시급했습니다.',
        role: 'Contents Lead PM - 시장 타겟팅, AI 음원 생성 유통 가이드라인 표준화, 8주 커리큘럼 기획, 마케팅 상세페이지 세일즈 메시지 설계.',
        execution: '• Suno, Udio 등 최신 AI 음악 툴 사용법을 5단계 마이크로 레슨으로 분개\n• 저작권 및 플랫폼 유통 이슈를 다룬 가이드북 자체 제작\n• 실습 중심 VOD + 매주 미션 제출형 보상 케어 시스템 구축',
        results: '론칭 2주 만에 누적 매출 3.2억 달성 / 목표 대비 매출 달성률 180% 기록 / 수강생 평균 과제 제출률 92%',
        keyLearnings: '기술적 난이도가 높은 신기술 분야는 단순 개념 전달보다 "즉시 실행 가능한 템플릿"과 "저작권 이슈 해소"가 전환율을 결정짓는 핵심 가치임을 검증했습니다.',
        tools: ['Suno AI', 'Udio', 'Notion', 'Figma', 'Amplitude', 'Google Spreadsheet'],
        galleryImages: [aiPlaylistThumb, heroBgImg],
        materials: [
          { id: 'mat-1-1', image: aiPlaylistThumb, caption: 'AI 플레이리스트 수익화 강의 대표 썸네일' },
          { id: 'mat-1-2', image: heroBgImg, caption: '상세페이지 메인 가시성 및 세일즈 포인트' },
        ],
      },
    },
    {
      id: 'proj-2',
      title: '일본 해외예능 쇼츠 수익화 강의',
      category: '숏폼 / 해외 미디어',
      description: '해외 크리에이터 미디어 알고리즘과 번역 시스템을 활용한 해외 쇼츠 채널 육성 코스',
      heroImage: japanShortsThumb,
      caseStudy: {
        overview: '국내 시장을 넘어 일본 및 해외 쇼츠 시장에서 빠른 조회수 확보와 광고 수익 창출을 도모할 수 있도록 기획한 글로벌 콘텐츠 커리큘럼입니다.',
        background: '유튜브 쇼츠 수익 모델 중 해외 시청자 타겟 채널이 높은 CPM을 기록하고 있었으나, 언어 장벽 및 문화적 맥락 차이로 접근하기 힘들어하는 예비 크리에이터가 많았습니다.',
        role: 'Contents PM - 글로벌 트렌드 데이터 리서치, 현지화 자막 자동화 워크플로우 개발, 챌린지 템플릿 기획 및 멘토링 프로그램 세팅.',
        execution: '• AI 번역 및 STT 툴을 조합한 "10분 영상 번역 패스트트랙" 개발\n• 일본 틱톡/유튜브 최신 밈 분석 리포트 매월 업데이트 제공\n• 30일 1일 1쇼츠 달성 챌린지 커뮤니티 운영',
        results: '수강생 중 10만 구독자 달성 채널 4개 배출 / 총 누적 조회수 4,500만회 돌파 / 만족도 4.9/5.0 기록',
        keyLearnings: '해외 콘텐츠 기획 시 "자동화 프로세스 구축"이 수강생의 주저함을 극복시키는 가장 강력한 USP가 됨을 파악했습니다.',
        tools: ['CapCut', 'ChatGPT', 'Whisper AI', 'Notion', 'Google Analytics'],
        galleryImages: [japanShortsThumb, heroBgImg],
        materials: [
          { id: 'mat-2-1', image: japanShortsThumb, caption: '일본 예능 쇼츠 수익화 대표 썸네일' },
          { id: 'mat-2-2', image: heroBgImg, caption: '번역 프로세스 자동화 템플릿' },
        ],
      },
    },
    {
      id: 'proj-3',
      title: '제휴마케팅 수익화 강의',
      category: '마케팅 / 무자본 창업',
      description: '트래픽 유입 구조와 고효율 랜딩페이지 구축을 통한 지속 가능한 패시브 인컴 마스터 코스',
      heroImage: affiliateThumb,
      caseStudy: {
        overview: '블로그, SNS, 메신저 채널을 연계하여 제휴 마케팅 매출을 극대화하는 성과 기반 수익화 클래스입니다.',
        background: '단발성 링크 도배형 마케팅으로 한계에 부딪힌 수강생들에게 "자발적 클릭을 유도하는 콘텐츠 기획"과 "SEO 알고리즘 대응책"이 절실했습니다.',
        role: 'PM - 키워드 추출 도구 협업, 전환율 상승 커리큘럼 구조화, CRM 자동화 기획.',
        execution: '• 구매 전환 지수 스코어링 카드 도입\n• 네이버/쿠팡/아마존 트렌드 실시간 트래킹 시트 제공\n• 1:1 랜딩페이지 피드백 세션 운영',
        results: '누적 수강생 1,800명 돌파 / 개강 후 첫 달 수익 발생 수강생 비율 74% / 총 매출 5.1억 기록',
        keyLearnings: '마케팅 교육에서는 "데이터 리딩 능력"을 키워주는 실습 시트와 피드백 체계가 핵심 만족도 동인임을 밝혀냈습니다.',
        tools: ['Google Analytics', 'Ahrefs', 'Google Spreadsheet', 'Stibee CRM'],
        galleryImages: [affiliateThumb, heroBgImg],
        materials: [
          { id: 'mat-3-1', image: affiliateThumb, caption: '제휴마케팅 수익화 강의 대표 썸네일' },
          { id: 'mat-3-2', image: heroBgImg, caption: '트래픽 유입 채널 기획 리소스' },
        ],
      },
    },
    {
      id: 'proj-4',
      title: '파티플래너 수익화 강의',
      category: '공간 대여 / 공간 비즈니스',
      description: '공간 예약 플랫폼 노출 및 고객 맞춤형 파티 연출 컨설팅을 통한 공간 수익 창출 마스터 프로그램',
      heroImage: partyPlannerThumb,
      caseStudy: {
        overview: '소자본 공간 대여 및 연출 플래닝을 통해 오프라인 공간 가치를 극대화하는 액셀러레이팅 코스입니다.',
        background: '공간 대여업 경쟁이 점차 가열됨에 따라 단순 대여가 아닌 "컨셉추얼 파티 기획 및 연출 서비스"를 결합한 프리미엄 모델 구축이 필요했습니다.',
        role: 'Contents PM - 오프라인 연출 전문가 섭외, 매뉴얼 표준화, 예약 플랫폼 알고리즘 맞춤형 프로필 기획.',
        execution: '• 인스타그램 감성 사진 촬영 가이드 및 조명 세팅 킷 제작\n• 시즌별 이벤트 가이드북 패키징\n• 카카오톡 예약 자동 응답 세팅 세션 제공',
        results: '초기 목표 200% 달성 / 수강생 평균 가동률 35% 상승 / 추천 고객 비율 88%',
        keyLearnings: '오프라인 공간 상품은 시각적 브랜딩과 리뷰 축적 메커니즘을 초기에 세팅하는 것이 시급함을 입증했습니다.',
        tools: ['SpaceCloud', 'Instagram Business', 'Canva', 'Notion'],
        galleryImages: [partyPlannerThumb, heroBgImg],
        materials: [
          { id: 'mat-4-1', image: partyPlannerThumb, caption: '파티플래너 수익화 강의 대표 썸네일' },
        ],
      },
    },
    {
      id: 'proj-5',
      title: '프로그램사주 수익화 강의',
      category: '무자본 창업 / 데이터 서비스',
      description: '사주·점술 분석 프로그램을 활용하여 1인 지식창업 및 자동화 수익 구조를 구축하는 실전형 코스',
      heroImage: programSajuThumb,
      caseStudy: {
        overview: '사주 및 운세 프로그램 솔루션을 활용하여 상담 자동화 및 디지털 콘텐츠 판매를 통해 1인 지식 창업 수익을 올릴 수 있도록 설계된 커리큘럼입니다.',
        background: '사주 시장의 높은 대중적 수요에도 불구하고 복잡한 명리학 지식 진입장벽이 컸으나, 프로그램을 통한 자동화 분석 툴과 상담 가이드가 결합된 신규 카테고리가 필요했습니다.',
        role: 'Contents Lead PM - 사주 분석 솔루션 파트너십, 마케팅 상세페이지 및 1인 창업 가이드라인 기획, 스킬업 커리큘럼 세팅.',
        execution: '• 프로그램 활용 사주 데이터 해석 마이크로 레슨 분개\n• 자동화 상담 템플릿 및 고객 관리 CRM 패키지 제공\n• 크몽/숨고/자사몰 연동 세일즈 가이드북 배포',
        results: '론칭 첫 달 누적 매출 2.9억 달성 / 수강생 첫 달 수익 창출 비율 68%',
        keyLearnings: '전통 카테고리에 IT 솔루션과 자동화 템플릿을 접목했을 때 압도적인 결제 전환율과 수강생 만족도를 도출할 수 있음을 확인했습니다.',
        tools: ['Notion', 'Canva', 'Figma', 'Kakao Talk Channel', 'Stibee CRM'],
        galleryImages: [programSajuThumb, heroBgImg],
        materials: [
          { id: 'mat-5-1', image: programSajuThumb, caption: '프로그램사주 수익화 강의 대표 썸네일' },
        ],
      },
    },
  ],
  process: [
    {
      id: 'proc-1',
      stepNumber: '01',
      title: '리서치 & 컨셉 기획',
      subtitle: 'Research & Concept Planning',
      roles: [
        '키워드 데이터 분석 (DataLab, Google Trends) 및 타겟 페르소나 Pain Point 도출',
        '상업적 강의 컨셉 프레이밍 및 차별화 USP(Unique Selling Proposition) 설정',
        '전문 강사 섭외, 커리큘럼 뼈대 작성 및 완주 보상 구조 설계',
      ],
    },
    {
      id: 'proc-2',
      stepNumber: '02',
      title: '제작 & 상세페이지 구축',
      subtitle: 'Production & Copywriting',
      roles: [
        'VOD 촬영 가이드라인 제작, 현장 디렉팅 및 학습자 실습 워크북/템플릿 제작',
        '구매 전환율을 극대화하는 카피라이팅 및 상세페이지 브랜딩',
        '오픈채팅/커뮤니티 연동 및 주차별 미션 제출/피드백 시스템 구축',
      ],
    },
    {
      id: 'proc-3',
      stepNumber: '03',
      title: '운영 & 성과 분석',
      subtitle: 'Operations & Analytics',
      roles: [
        '주차별 완주 케어, 중도 이탈 방지 리마인드 CRM 및 라이브 운영',
        '완주율, 수강 만족도, 후기 키워드 데이터 리포팅',
        '피드백 기반 강의 재촬영/리뉴얼 및 심화 코스 업셀링 구조 설계',
      ],
    },
  ],
  recommendations: [
    {
      id: 'rec-1',
      image: rec1Img,
    },
  ],
  skills: [
    {
      id: 'sk-1',
      category: '핵심 역량',
      name: '강의 기획 및 운영',
      description: '타겟 니즈 발굴, 커리큘럼 모듈화, 완주 케어 및 과제 피드백 시스템 구축',
      isPopular: true,
    },
    {
      id: 'sk-2',
      category: '성장 & 세일즈',
      name: '마케팅',
      description: 'CRM 알림톡/메일 세그먼트 발송, ROAS 기반 퍼널 분석 및 상세페이지 전환율(CR) 개선',
      isPopular: true,
    },
    {
      id: 'sk-3',
      category: '협업 & 생산성',
      name: 'AI 활용',
      description: 'ChatGPT, Midjourney, Suno, Claude를 활용한 기획 생산성 300% 향상',
      isPopular: true,
    },
    {
      id: 'sk-4',
      category: '소통 역량',
      name: 'Communication',
      description: '강사 섭외/코칭, 팀 간 정교한 조율, 공감 능력 바탕의 LX 디렉팅',
      isPopular: true,
    },
  ],
  contact: {
    hookTitle: '좋은 강의는 우연히 만들어지지 않습니다.',
    hookSubtitle: '좋은 기획에서 시작됩니다.',
    phone: '010-0000-0000',
    email: 'jahyeon.sung@gmail.com',
    resumeUrl: '#',
    resumeFileName: '성자현_Contents_PM_이력서.pdf',
  },
};
