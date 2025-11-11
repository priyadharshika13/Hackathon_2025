import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      reports: 'Reports',
      settings: 'Settings',
      logout: 'Logout',

      // Dashboard
      welcome: 'Welcome to StaffTract.AI',
      aiPowered: 'AI-Powered Workforce Management',
      totalCandidates: 'Total Candidates',
      shortlisted: 'Shortlisted',
      rejected: 'Rejected',
      pending: 'Pending Review',

      // Recruitment
      recruitmentCopilot: 'AI Recruitment Copilot',
      candidateEvaluation: 'Candidate Evaluation',
      aiScoring: 'AI Scoring & Feedback',

      // Workforce
      workforceOptimization: 'Workforce Optimization',
      saudizationRate: 'Saudization Rate',
      nitaqatCompliance: 'Nitaqat Compliance',

      // Performance
      performanceEvaluation: 'Performance Evaluation',
      employeeMetrics: 'Employee Metrics',
      departmentOverview: 'Department Overview',

      // Community
      communityPlanning: 'Community Workforce Planning',
      regionalAnalysis: 'Regional Analysis',
      growthTrends: 'Growth Trends',

      // Fraud
      fraudMonitoring: 'Fraud Monitoring',
      securityAlerts: 'Security Alerts',
      riskAssessment: 'Risk Assessment',

      // Insights
      aiInsights: 'AI Insights',
      predictiveAnalytics: 'Predictive Analytics',
      recommendations: 'AI Recommendations',

      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      viewDetails: 'View Details',
      refresh: 'Refresh',
      export: 'Export',
      filter: 'Filter',
      search: 'Search',
      apply: 'Apply',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',

      // ====== HERO / LANDING PAGE ======
      "Transform your workforce management with AI-powered insights, automation, and seamless integrations":
        'Transform your workforce management with AI-powered insights, automation, and seamless integrations',
      'Powerful Features': 'Powerful Features',
      'Everything you need to manage your workforce efficiently':
        'Everything you need to manage your workforce efficiently',
      'Seamless Integrations': 'Seamless Integrations',
      'Connect with your favorite tools': 'Connect with your favorite tools',
      'Ready to transform your workforce?': 'Ready to transform your workforce?',
      'Join thousands of companies using StaffTract.AI to streamline their HR operations':
        'Join thousands of companies using StaffTract.AI to streamline their HR operations',
      'Get Started': 'Get Started',
      'Watch Demo': 'Watch Demo',
      'Start Free Trial': 'Start Free Trial',
      'Active Users': 'Active Users',
      Uptime: 'Uptime',
      Support: 'Support',

      // ====== WORKFORCE / REGIONAL ======
      'Workforce Overview': 'Workforce Overview',
      'Saudization metrics and regional insights': 'Saudization metrics and regional insights',
      'Total Employees': 'Total Employees',
      'Saudi Employees': 'Saudi Employees',
      'Avg Saudization': 'Avg Saudization',
      'Top Performing Region': 'Top Performing Region',
      'Area for Improvement': 'Area for Improvement',
      'Regional Saudization': 'Regional Saudization',

      // ====== COMMUNITY PLANNER ======
      'Community Planner': 'Community Planner',
      'National Saudization strategy and insights':
        'National Saudization strategy and insights',
      'Total Workers': 'Total Workers',
      'Expat Ratio': 'Expat Ratio',
      'AI Strategic Insights': 'AI Strategic Insights',
      'Sector Performance': 'Sector Performance',
      'Strategic Recommendation': 'Strategic Recommendation',

      // ====== PERFORMANCE / ANALYTICS ======
      'Performance Analytics': 'Performance Analytics',
      'Department performance metrics and insights':
        'Department performance metrics and insights',
      'Department Performance': 'Department Performance',
      'Overall Score': 'Overall Score',
      Attendance: 'Attendance',
      Teamwork: 'Teamwork',
      Productivity: 'Productivity',
      Learning: 'Learning',

      // ====== CTA / BUTTON LABELS (generic) ======
      'Start Now': 'Start Now',
      'View Dashboard': 'View Dashboard',
    },
  },
  ar: {
    translation: {
      // Navigation
      dashboard: 'لوحة التحكم',
      reports: 'التقارير',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',

      // Dashboard
      welcome: 'مرحباً بك في StaffTract.AI',
      aiPowered: 'إدارة القوى العاملة بالذكاء الاصطناعي',
      totalCandidates: 'إجمالي المرشحين',
      shortlisted: 'المختارين',
      rejected: 'المرفوضين',
      pending: 'في انتظار المراجعة',

      // Recruitment
      recruitmentCopilot: 'مساعد التوظيف الذكي',
      candidateEvaluation: 'تقييم المرشحين',
      aiScoring: 'التقييم والتغذية الراجعة بالذكاء الاصطناعي',

      // Workforce
      workforceOptimization: 'تحسين القوى العاملة',
      saudizationRate: 'معدل التوطين',
      nitaqatCompliance: 'الامتثال لنطاقات',

      // Performance
      performanceEvaluation: 'تقييم الأداء',
      employeeMetrics: 'مقاييس الموظفين',
      departmentOverview: 'نظرة عامة على الإدارات',

      // Community
      communityPlanning: 'تخطيط القوى العاملة المجتمعية',
      regionalAnalysis: 'التحليل الإقليمي',
      growthTrends: 'اتجاهات النمو',

      // Fraud
      fraudMonitoring: 'مراقبة الاحتيال',
      securityAlerts: 'تنبيهات الأمان',
      riskAssessment: 'تقييم المخاطر',

      // Insights
      aiInsights: 'رؤى الذكاء الاصطناعي',
      predictiveAnalytics: 'التحليلات التنبؤية',
      recommendations: 'توصيات الذكاء الاصطناعي',

      // Common
      loading: 'جارٍ التحميل...',
      error: 'خطأ',
      success: 'نجاح',
      viewDetails: 'عرض التفاصيل',
      refresh: 'تحديث',
      export: 'تصدير',
      filter: 'تصفية',
      search: 'بحث',
      apply: 'تطبيق',
      cancel: 'إلغاء',
      save: 'حفظ',
      edit: 'تعديل',
      delete: 'حذف',

      // ====== HERO / LANDING PAGE ======
      "Transform your workforce management with AI-powered insights, automation, and seamless integrations":
        'حوِّل إدارة القوى العاملة لديك باستخدام رؤى مدعومة بالذكاء الاصطناعي، وأتمتة، وتكاملات سلسة',
      'Powerful Features': 'مميزات قوية',
      'Everything you need to manage your workforce efficiently':
        'كل ما تحتاجه لإدارة القوى العاملة بكفاءة',
      'Seamless Integrations': 'تكاملات سلسة',
      'Connect with your favorite tools': 'اتصل بأدواتك المفضلة',
      'Ready to transform your workforce?': 'هل أنت مستعد لتحويل إدارة القوى العاملة لديك؟',
      'Join thousands of companies using StaffTract.AI to streamline their HR operations':
        'انضم إلى آلاف الشركات التي تستخدم StaffTract.AI لتبسيط عمليات الموارد البشرية لديها',
      'Get Started': 'ابدأ الآن',
      'Watch Demo': 'شاهد العرض التوضيحي',
      'Start Free Trial': 'ابدأ النسخة التجريبية المجانية',
      'Active Users': 'مستخدمون نشطون',
      Uptime: 'زمن التشغيل',
      Support: 'الدعم',

      // ====== WORKFORCE / REGIONAL ======
      'Workforce Overview': 'نظرة عامة على القوى العاملة',
      'Saudization metrics and regional insights':
        'مقاييس التوطين والرؤى الإقليمية',
      'Total Employees': 'إجمالي الموظفين',
      'Saudi Employees': 'الموظفون السعوديون',
      'Avg Saudization': 'متوسط معدل التوطين',
      'Top Performing Region': 'المنطقة الأعلى أداءً',
      'Area for Improvement': 'منطقة تحتاج إلى تحسين',
      'Regional Saudization': 'التوطين حسب المنطقة',

      // ====== COMMUNITY PLANNER ======
      'Community Planner': 'مخطِّط القوى العاملة الوطنية',
      'National Saudization strategy and insights':
        'استراتيجية وطنية للتوطين مع رؤى تحليلية',
      'Total Workers': 'إجمالي العاملين',
      'Expat Ratio': 'نسبة الوافدين',
      'AI Strategic Insights': 'رؤى استراتيجية بالذكاء الاصطناعي',
      'Sector Performance': 'أداء القطاعات',
      'Strategic Recommendation': 'توصية استراتيجية',

      // ====== PERFORMANCE / ANALYTICS ======
      'Performance Analytics': 'تحليلات الأداء',
      'Department performance metrics and insights':
        'مؤشرات أداء الأقسام والرؤى التحليلية',
      'Department Performance': 'أداء الأقسام',
      'Overall Score': 'التقييم الإجمالي',
      Attendance: 'الحضور',
      Teamwork: 'العمل الجماعي',
      Productivity: 'الإنتاجية',
      Learning: 'التعلم',

      // ====== CTA / BUTTON LABELS (generic) ======
      'Start Now': 'ابدأ الآن',
      'View Dashboard': 'عرض لوحة التحكم',
    },
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;
