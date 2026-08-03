import { PortfolioData } from '../types';

import heroBgImg from '../assets/images/hero_bg_1784986510465.jpg';
import aiPlaylistThumb from '../assets/images/thumb_ai_playlist_1785678893120.jpg';
import japanShortsThumb from '../assets/images/thumb_japan_shorts_1785678909650.jpg';
import affiliateThumb from '../assets/images/thumb_affiliate_1785678923297.jpg';
import partyPlannerThumb from '../assets/images/thumb_party_planner_1785678935380.jpg';
import programSajuThumb from '../assets/images/thumb_program_saju_1785678947334.jpg';
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
    subtitle: '배움을 설계하고, 변화를 만듭니다',
  },
  about: {
    profileImage: '/assets/profile.jpg',
    name: '성자현',
    title: 'Contents PM',
    bio: '좋은 강의는 정보를 전달하는 것을 넘어 수강생의 행동과 변화를 만들어야 한다고 생각합니다.\n그래서 저는 수강생이 어디에서 어려움을 느끼는지 발견하고, 이를 콘텐츠와 학습 경험으로 해결하는 강의를 기획합니다.',
    stats: [
      {
        id: 'stat-1',
        label: '함께한 강사진',
        value: '19명',
        description: '다양한 카테고리의 톱티어 전문 강사진 코칭 및 협업',
      },
      {
        id: 'stat-2',
        label: '총 프로젝트 수',
        value: '37개',
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
  whyMeSubtitle: '단순 강의 제작자를 넘어, 교육 품질과 매출 성과를 검증하는 3가지 원칙입니다.',
  whyMe: [
    {
      id: 'why-1',
      number: '01',
      title: 'Data-Driven',
      description: '광고 성과, 무료 강의 시청자 이탈 구간, 결제 전환율, 수강생 VOC를 분석하며 콘텐츠를 지속적으로 개선했습니다. 데이터를 단순히 확인하는 데 그치지 않고 다음 기수의 콘텐츠기획에 반영하여 더 나은 학습 경험을 만들었습니다.',
    },
    {
      id: 'why-2',
      number: '02',
      title: 'AtoZ Content Planning',
      description: '운영 PM으로 시작해 콘텐츠 운영의 실무를 직접 경험했습니다. 운영업무 경험을 바탕으로 현실적인 실행 가능성을 함께 고려하며 콘텐츠를 기획할 수 있습니다.',
    },
    {
      id: 'why-3',
      number: '03',
      title: 'Learner-Centered Design',
      description: '단순히 높은 매출을 만드는 강의보다 수강생이 무엇을 어려워할지 먼저 고민하고 콘텐츠를 설계했습니다. 복잡한 과정을 단순화하거나 예상되는 불안을 콘텐츠에서 선제적으로 해소하는 방식으로 학습 경험을 개선했습니다.',
    },
  ],
  projectsSubtitle: '진행한 37개의 프로젝트 중 주요 성과와 역량을 보여주는 대표 사례 5가지를 선정했습니다.',
  projects: [
    {
      id: 'proj-1',
      title: 'AI 플레이리스트 수익화 강의',
      category: 'AI / 콘텐츠 창작',
      description: '강사의 전문성을 차별화해 전환율을 높인 프로젝트',
      heroImage: aiPlaylistThumb,
      caseStudy: {
        overview: 'AI 기술 확산에 발맞춰, 음악 제작 지식이 없는 초보자도 AI로 생성한 음원 및 영상 콘텐츠를 유통하여 매출을 내도록 기획된 실전형 프로그램입니다.',
        background: '구글의 AI 콘텐츠 규제가 강화되면서, 안전하게 운영할 수 있는 AI 콘텐츠에 대한 관심이 높아지고 있었습니다.\n동시에 AI 음악 플레이리스트 채널의 인기가 급상승 하는만큼 동일주제의 경쟁 강의가 늘어나며 차별화된 콘텐츠 전략이 필요한 상황이었습니다.',
        role: '• 동일 주제 경쟁 강의와 차별화된 콘텐츠 기획\n• 이전 기수와는 달라진 새로운 포인트 필요',
        execution: '• 11년 차 유튜브 전문가라는 강사의 강점을 소구점으로 잡아, AI 음악제작 보다 중요한 점은 유튜브 수익구조를 파악하고 알고리즘을 파악한 수익화 전문성을 강조했습니다.\n• AI 음악 제작 프로그램 체험권을 제공하여, 수강생이 콘텐츠를 직접 경험한 뒤 정규강의 결제를 결정할 수 있도록 학습 경험을 설계했습니다.',
        results: '직전 기수 대비 결제 전환율 4.1% 상승',
        keyLearnings: '\'왜 이 강사에게 배워야 하는가’에 초점을 두었습니다.\n강사의 전문성과 직접 체험할 수 있는 혜택을 함께 제시했을 때 콘텐츠에 대한 신뢰와 전환율이 높아진다는 것을 확인했습니다.',
        tools: ['Suno AI', 'Udio', 'YouTube Analytics', 'Notion', 'Figma', 'Google Spreadsheet'],
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
      description: '어렵다고 느껴지는 과정을 누구나 쉽게 가능할수 있도록 학습 경험을 설계한 프로젝트',
      heroImage: japanShortsThumb,
      caseStudy: {
        overview: '국내 시장을 넘어 일본 해외 예능 쇼츠 시장에서 빠른 조회수 확보와 광고 수익 창출을 도모할 수 있도록 기획한 글로벌 콘텐츠 커리큘럼입니다.',
        background: '해외 예능을 쇼츠로 편집해 일본 시장에 업로드하는 콘텐츠였지만,\n영상 편집, 외국어 번역, 저작권 이슈 등으로 인해 수강생들이 높은 진입장벽을 느끼고 있었습니다.',
        role: '• 재생산 콘텐츠에 대한 불안감 해소\n• 영상 편집 및 번역에 대한 심리적 허들 완화\n• 기존 강의 대비 차별화된 콘텐츠 가치 전달',
        execution: '• 해외 쇼츠 시장 규모와 수익 가능성을 먼저 제시하여 강의의 필요성을 설득했습니다.\n• 쇼츠 제작 과정을 4단계로 단순화하고, 각 단계마다 프로그램 시연을 추가하여 어렵게 느껴지는 과정을 쉽게 이해하도록 직관적으로 전달했습니다.',
        results: '결제 전환율 11.8% 달성 (내부 평균 결제 전환율 대비 + 3.8%p)',
        keyLearnings: '새로운 분야의 콘텐츠일 경우 \'생각보다 어렵지 않다\'는 인식을 먼저 전달하는 것이 학습 의사결정에 영향을 준다는 점을 확인했습니다.',
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
      description: '생소한 주제로 인한 진입장벽을 낮추고, \'나도 할 수 있다\'는 확신을 만든 프로젝트',
      heroImage: affiliateThumb,
      caseStudy: {
        overview: '트래픽 유입 구조와 고효율 랜딩페이지 구축을 통한 지속 가능한 패시브 인컴 마스터 코스입니다.',
        background: '제휴마케팅은 생소한 분야였고, \'마케팅은 어렵다\', ‘내 돈으로 광고를 돌려야 한다’는 인식 때문에 기존 마케팅 강의의 전환율이 낮았습니다.',
        role: '• \'제휴마케팅\' 진입장벽 해소\n• 누구나 쉽게 시작할 수 있다는 인식 형성\n• 초기 비용 없이 수익 가능한 구조임을 전달',
        execution: '• 강의에서 \'제휴마케팅\'이라는 용어를 모두 제거하여 심리적 진입장벽을 낮췄습니다.\n• "문구 한 줄, 사진 한 장만으로도 수익이 가능하다”는 메시지를 전면에 배치해 진입장벽을 낮췄습니다.\n• 유료 광고가 아닌 무료 광고만으로 수익을 만들 수 있음을 적극 어필했습니다.',
        results: '결제 전환율 9.4% 달성 (내부 평균 결제 전환율 대비 + 1.4%p)\n강의 시작 이후 환불 0건',
        keyLearnings: '강의 시작 이후 환불이 발생하지 않았다는 것은 무료 강의에서 느낀 가치와 본강의에서 제공한 경험 사이에 기대의 차이가 없었다는 의미였습니다. 콘텐츠의 첫인상과 실제 학습 경험의 일관성이 얼마나 중요한지 확인할 수 있었습니다.',
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
      description: '비전공자의 불안을 선제적으로 해소해 전환율을 높인 프로젝트',
      heroImage: partyPlannerThumb,
      caseStudy: {
        overview: '공간 예약 플랫폼 노출 및 고객 맞춤형 파티 연출 컨설팅을 통한 공간 수익 창출 마스터 프로그램입니다.',
        background: '파티 수요에 대한 의문과 함께 파티 기획부터 현장 세팅, 철수까지 해야 한다는 인식 때문에 비전공자의 진입장벽이 높았습니다.',
        role: '• 시장 수요에 대한 인식 확대\n• 비전공자도 가능하다는 신뢰 형성\n• 현장 운영에 대한 불안 요소 해소',
        execution: '• 시즌별 행사와 개인 파티 시장의 시장성을 콘텐츠에 반영하여 시장 수요를 직관적으로 전달했습니다.\n• AI 기획봇 시연을 통해 비전공자도 쉽게 기획할 수 있다는 점을 보여주었습니다.\n• 수강생이 실제로 가질 수 있는 질문과 불안 요소를 FAQ 형태로 선제적으로 해소했습니다.',
        results: '결제 전환율 17.2% 달성 (내부 평균 결제 전환율 대비 + 9.2%p)',
        keyLearnings: '수강생은 새로운 기회를 찾는 것만큼 실패에 대한 불안도 크게 느낀다고 생각합니다.\n예상되는 고민을 먼저 해결해 줄수록 콘텐츠에 대한 신뢰가 높아진다는 점을 확인했습니다.',
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
      description: '수강생 피드백을 반영해 콘텐츠를 리뉴얼하고 성과를 개선한 프로젝트',
      heroImage: programSajuThumb,
      caseStudy: {
        overview: '사주 및 운세 프로그램 솔루션을 활용하여 상담 자동화 및 디지털 콘텐츠 판매를 통해 1인 지식 창업 수익을 올릴 수 있도록 설계된 커리큘럼입니다.',
        background: '이전 기수가 높은 매출을 기록하며 성공적으로 운영되었지만, 동일한 콘텐츠로는 다음 기수의 성과를 장담하기 어려운 상황이었습니다.',
        role: '• 이전 기수와 차별화된 콘텐츠 기획\n• 수강생 CS를 반영한 콘텐츠 개선\n• 프로그램의 신뢰도 강화',
        execution: '• 연초 시즌에 맞춰 신년 운세 수요를 적극 반영했습니다.\n• 프로그램 개발자의 전문성과 기존 AI 사주와의 차별점을 강조하여 콘텐츠의 신뢰도를 높였습니다.\n• 기존 수강생의 VOC를 분석해 프로그램 사용, 홍보, 운영 과정에서 자주 발생한 고민을 해소했습니다.',
        results: '결제 전환율 15% 달성 (내부 평균 결제 전환율 대비 + 7%p)\n직전 기수 대비 결제 전환율 2% 상승',
        keyLearnings: '기존 성과가 좋았던 콘텐츠일수록 수강생의 VOC을 반영해 학습 경험을 개선하는 것이 더 큰 성과로 이어진다는 점을 확인했습니다.',
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
      title: 'Learner Research',
      subtitle: '시장 조사 및 콘텐츠 전략 수립',
      roles: [
        '시장 및 경쟁 콘텐츠 리서치',
        '강사 섭외 및 기획 미팅 진행',
        '수강생 타겟 설정 및 니즈 분석',
        '콘텐츠 차별화 및 USP 설정',
      ],
    },
    {
      id: 'proc-2',
      stepNumber: '02',
      title: 'Contents Design',
      subtitle: '콘텐츠 기획 및 강의 준비',
      roles: [
        '상세페이지, CRM 메시지 기획',
        '강사 리허설을 통한 콘텐츠 완성도 개선',
        '라이브 강의 운영 총괄',
      ],
    },
    {
      id: 'proc-3',
      stepNumber: '03',
      title: 'Continuous Improvement',
      subtitle: '성과 분석 및 콘텐츠 개선',
      roles: [
        '광고·강의 성과 데이터 분석',
        '수강생 성과 및 VOC 분석',
        '콘텐츠 리뉴얼',
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
    hookTitle: '수강생의 고민을 콘텐츠로 해결하고',
    hookSubtitle: '배움을 실제 변화로 설계하겠습니다',
    phone: '010-4010-2408',
    email: 'typty0@naver.com',
    resumeUrl: '#',
    resumeFileName: '[콘텐츠PM] 성자현 이력서',
  },
};
