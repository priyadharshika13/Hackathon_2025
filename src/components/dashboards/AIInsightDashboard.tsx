import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NeonCard from '../ui/NeonCard';
import { Brain, Sparkles } from 'lucide-react';
import useBackendData from '../../hooks/useBackendData';

// ---- REAL ESTATE MOCK INSIGHTS (fallback) ----
const MOCK_INSIGHTS = [
  {
    category: 'Occupancy Optimization',
    insight_en:
      'Occupancy in mid-range residential towers is 12% below market benchmark. Offering limited-time rent discounts and flexible lease terms in Q1 can reduce vacancy by up to 8%.',
    insight_ar:
      'مستوى الإشغال في الأبراج السكنية متوسطة السعر أقل بنسبة 12٪ من متوسط السوق. يمكن أن تساعد خصومات الإيجار لفترة محدودة والعقود المرنة في الربع الأول على خفض الشواغر بنسبة تصل إلى 8٪.',
    confidence: 87,
    impact_level: 'High',
  },
  {
    category: 'Pricing & Yield Trends',
    insight_en:
      'Prime commercial offices near transit hubs show a 6–9% rent growth potential over the next 12 months, especially for Grade A buildings with strong ESG certifications.',
    insight_ar:
      'تُظهر المكاتب التجارية المميزة القريبة من محطات النقل إمكانات نمو في الإيجار بنسبة 6–9٪ خلال 12 شهراً، خاصة للمباني من الفئة A ذات شهادات الاستدامة القوية.',
    confidence: 82,
    impact_level: 'Medium',
  },
  {
    category: 'Risk & Compliance',
    insight_en:
      'Older mixed-use buildings in the city core present rising compliance risk due to outdated safety standards. Prioritized retrofitting can reduce long-term liability exposure.',
    insight_ar:
      'تطرح المباني متعددة الاستخدامات القديمة في مركز المدينة مخاطر متزايدة من ناحية الالتزام بالمعايير بسبب أنظمة السلامة القديمة. يمكن أن يساعد تحديثها وفق الأولوية في خفض المخاطر القانونية على المدى البعيد.',
    confidence: 79,
    impact_level: 'High',
  },
];

export default function AIInsightDashboard() {
  const { t } = useTranslation();
  const { data, loading } = useBackendData('/api/insights/generate');
  const [currentInsight, setCurrentInsight] = useState(0);

  // Normalize backend response (single object OR array) + fallback to mock
  const normalizedFromBackend = data
    ? Array.isArray(data)
      ? data
      : [data]
    : [];

  const insights = normalizedFromBackend.length > 0 ? normalizedFromBackend : MOCK_INSIGHTS;

  // Auto-rotate insights every 8 seconds
  useEffect(() => {
    if (insights.length > 0) {
      const interval = setInterval(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [insights.length]);

  const currentInsightData = insights[currentInsight];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            AI Real Estate Insights
          </h1>
          <p className="text-white/70 mt-2">
            Predictive analytics for occupancy, pricing, and portfolio risk
          </p>
        </div>
      </div>

      {/* Main Insight Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Insight */}
        <NeonCard glowColor="purple" className="min-h-[400px]">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-neon-purple/20 rounded-lg">
                  <Brain className="w-6 h-6 text-neon-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Live Insights</h3>
                  <p className="text-white/60 text-sm">
                    Auto-updating every 8 seconds
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {insights.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentInsight
                        ? 'bg-neon-purple scale-125'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {loading && normalizedFromBackend.length === 0 ? (
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="h-6 bg-white/20 rounded mb-4"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded mb-2"></div>
                  <div className="h-4 bg-white/10 rounded"></div>
                </div>
              </div>
            ) : currentInsightData ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-neon-purple animate-pulse" />
                  <span className="text-neon-purple font-medium">
                    {currentInsightData.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="typing-effect">
                    <p className="text-white/90 text-lg leading-relaxed">
                      {currentInsightData.insight_en}
                    </p>
                  </div>
                  <div className="typing-effect" style={{ animationDelay: '2s' }}>
                    <p className="text-white/70 text-base leading-relaxed mt-4">
                      {currentInsightData.insight_ar}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-white/60 text-sm">
                    Confidence: {currentInsightData.confidence}%
                  </span>
                  <span className="text-white/60 text-sm">
                    Impact: {currentInsightData.impact_level}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60">No insights available yet.</p>
              </div>
            )}
          </div>
        </NeonCard>

        {/* Holographic Orb */}
        <NeonCard
          glowColor="pink"
          className="min-h-[400px] flex items-center justify-center"
        >
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-neon-purple via-neon-pink to-neon-cyan opacity-20 animate-pulse"></div>
              <div
                className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-neon-purple animate-spin"
                style={{ animationDuration: '3s' }}
              ></div>
              <div
                className="absolute inset-2 w-28 h-28 mx-auto rounded-full border border-neon-pink animate-spin"
                style={{ animationDuration: '2s', animationDirection: 'reverse' }}
              ></div>
              <div
                className="absolute inset-4 w-24 h-24 mx-auto rounded-full border border-neon-cyan animate-spin"
                style={{ animationDuration: '1.5s' }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-12 h-12 text-white animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                AI Processing Core
              </h3>
              <p className="text-white/60">
                Analyzing real estate portfolio patterns and generating insights
              </p>
            </div>
          </div>
        </NeonCard>
      </div>

      {/* Insight Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Insight Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loading && normalizedFromBackend.length === 0 ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-white/10 rounded-lg"></div>
              </div>
            ))
          ) : (
            [
              'Occupancy Optimization',
              'Pricing & Yield Trends',
              'Risk & Compliance',
            ].map((category, index) => (
              <NeonCard key={category} glowColor="blue">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      index === 0
                        ? 'bg-neon-blue/20'
                        : index === 1
                        ? 'bg-neon-green/20'
                        : 'bg-neon-purple/20'
                    }`}
                  >
                    <Sparkles
                      className={`w-5 h-5 ${
                        index === 0
                          ? 'text-neon-blue'
                          : index === 1
                          ? 'text-neon-green'
                          : 'text-neon-purple'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{category}</h4>
                    <p className="text-white/60 text-sm">
                      {
                        insights.filter(
                          (i: any) => i.category === category
                        ).length
                      }{' '}
                      insights available
                    </p>
                  </div>
                </div>
              </NeonCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
