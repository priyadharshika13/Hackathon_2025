import { useTranslation } from 'react-i18next';
import NeonCard from '../ui/NeonCard';
import AnimatedCounter from '../ui/AnimatedCounter';
import { BarChart3, Users, Target, Award } from 'lucide-react';
import useBackendData from '../../hooks/useBackendData';

// ---- REAL ESTATE MOCK PERFORMANCE DATA ----
const MOCK_PERFORMANCE_DATA = [
  {
    segment: 'Residential Towers',
    occupancy_rate: 93,
    yield_score: 88,            // rental / revenue performance
    maintenance_score: 90,      // SLA compliance
    satisfaction_score: 85,     // tenant satisfaction
    ai_feedback_en:
      'Residential towers maintain healthy occupancy with strong revenue performance. Consider targeted upgrades in common areas to further boost tenant satisfaction.',
    ai_feedback_ar:
      'تحقق الأبراج السكنية مستويات إشغال قوية وعوائد مستقرة. يُنصح بإجراء تحسينات في المرافق المشتركة لزيادة رضا السكان.',
  },
  {
    segment: 'Community Villas',
    occupancy_rate: 89,
    yield_score: 84,
    maintenance_score: 86,
    satisfaction_score: 92,
    ai_feedback_en:
      'Community villas show high satisfaction scores driven by privacy and space. Premium maintenance packages can unlock higher yields.',
    ai_feedback_ar:
      'تسجل الفلل السكنية معدلات رضا عالية بفضل الخصوصية والمساحة. يمكن لحزم الصيانة المميزة أن ترفع العائدات الإجمالية.',
  },
  {
    segment: 'Retail Malls',
    occupancy_rate: 81,
    yield_score: 90,
    maintenance_score: 83,
    satisfaction_score: 78,
    ai_feedback_en:
      'Retail malls deliver strong revenue performance despite moderate occupancy. Optimizing tenant mix and event programming can improve both traffic and satisfaction.',
    ai_feedback_ar:
      'تسجّل المراكز التجارية أداءً قوياً في العوائد رغم إشغال متوسط. تحسين مزيج المستأجرين وجدولة الفعاليات يمكن أن يرفع حركة الزوار والرضا.',
  },
  {
    segment: 'Grade A Offices',
    occupancy_rate: 88,
    yield_score: 87,
    maintenance_score: 93,
    satisfaction_score: 82,
    ai_feedback_en:
      'Grade A offices exhibit excellent maintenance compliance and stable occupancy. Flexible lease models can attract more tech and startup tenants.',
    ai_feedback_ar:
      'تتمتع المكاتب من الفئة A بصيانة ممتازة وإشغال مستقر. يمكن أن تجذب نماذج الإيجار المرنة المزيد من شركات التقنية والشركات الناشئة.',
  },
  {
    segment: 'Industrial Parks',
    occupancy_rate: 92,
    yield_score: 85,
    maintenance_score: 88,
    satisfaction_score: 80,
    ai_feedback_en:
      'Industrial parks show strong occupancy and operational stability. Investing in smart logistics infrastructure will support long-term yield growth.',
    ai_feedback_ar:
      'تسجّل المناطق الصناعية إشغالاً قوياً واستقراراً تشغيلياً. الاستثمار في بنية تحتية لوجستية ذكية يدعم نمو العائدات على المدى الطويل.',
  },
  {
    segment: 'Hospitality & Serviced Apartments',
    occupancy_rate: 76,
    yield_score: 82,
    maintenance_score: 79,
    satisfaction_score: 88,
    ai_feedback_en:
      'Hospitality assets benefit from strong guest satisfaction but exhibit occupancy volatility. Dynamic pricing and seasonal packages can smooth revenue curves.',
    ai_feedback_ar:
      'تحقق الأصول الفندقية رضا قوياً من النزلاء مع تذبذب في الإشغال. يمكن للتسعير الديناميكي والباقات الموسمية أن يخففا من تقلبات الإيرادات.',
  },
];

export default function PerformanceDashboard() {
  const { t } = useTranslation();
  const { data, loading } = useBackendData('/api/performance/summary');

  // ---- Use backend data or fallback to mock data ----
  const performanceData: any[] =
    Array.isArray(data) && data.length > 0 ? data : MOCK_PERFORMANCE_DATA;

  // We expect backend to follow same shape: segment, occupancy_rate, yield_score, maintenance_score, satisfaction_score

  // ---- Calculate overall KPIs ----
  const avgOccupancy =
    performanceData.reduce(
      (sum: number, item: any) => sum + item.occupancy_rate,
      0
    ) / performanceData.length;

  const avgYield =
    performanceData.reduce(
      (sum: number, item: any) => sum + item.yield_score,
      0
    ) / performanceData.length;

  const avgMaintenance =
    performanceData.reduce(
      (sum: number, item: any) => sum + item.maintenance_score,
      0
    ) / performanceData.length;

  const avgSatisfaction =
    performanceData.reduce(
      (sum: number, item: any) => sum + item.satisfaction_score,
      0
    ) / performanceData.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            Portfolio Performance Analytics
          </h1>
          <p className="text-white/70 mt-2">
            Real estate asset performance metrics and AI insights
          </p>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <NeonCard glowColor="blue">
          <div className="text-center">
            <div className="p-2 bg-neon-blue/20 rounded-lg w-fit mx-auto mb-2">
              <Users className="w-6 h-6 text-neon-blue" />
            </div>
            <p className="text-white/60 text-xs mb-1">Avg Occupancy</p>
            <AnimatedCounter
              from={0}
              to={avgOccupancy}
              suffix="%"
              className="text-xl font-bold text-white"
            />
          </div>
        </NeonCard>

        <NeonCard glowColor="green">
          <div className="text-center">
            <div className="p-2 bg-neon-green/20 rounded-lg w-fit mx-auto mb-2">
              <Target className="w-6 h-6 text-neon-green" />
            </div>
            <p className="text-white/60 text-xs mb-1">Revenue / Yield</p>
            <AnimatedCounter
              from={0}
              to={avgYield}
              suffix="%"
              className="text-xl font-bold text-white"
            />
          </div>
        </NeonCard>

        <NeonCard glowColor="purple">
          <div className="text-center">
            <div className="p-2 bg-neon-purple/20 rounded-lg w-fit mx-auto mb-2">
              <BarChart3 className="w-6 h-6 text-neon-purple" />
            </div>
            <p className="text-white/60 text-xs mb-1">Maintenance SLA</p>
            <AnimatedCounter
              from={0}
              to={avgMaintenance}
              suffix="%"
              className="text-xl font-bold text-white"
            />
          </div>
        </NeonCard>

        <NeonCard glowColor="pink">
          <div className="text-center">
            <div className="p-2 bg-neon-pink/20 rounded-lg w-fit mx-auto mb-2">
              <Award className="w-6 h-6 text-neon-pink" />
            </div>
            <p className="text-white/60 text-xs mb-1">Tenant Satisfaction</p>
            <AnimatedCounter
              from={0}
              to={avgSatisfaction}
              suffix="%"
              className="text-xl font-bold text-white"
            />
          </div>
        </NeonCard>
      </div>

      {/* Segment Performance */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Segment Performance</h2>
        {loading && !Array.isArray(data) ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-white/10 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          performanceData.slice(0, 6).map((item: any) => (
            <NeonCard key={item.segment} glowColor="blue">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">
                    {item.segment}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm text-white/60">Overall Score</div>
                    <div className="text-2xl font-bold text-white">
                      {(
                        (item.occupancy_rate +
                          item.yield_score +
                          item.maintenance_score +
                          item.satisfaction_score) /
                        4
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                </div>

                {/* KPI Bars */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-white/60">Occupancy</span>
                      <span className="text-xs text-white">
                        {item.occupancy_rate}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-neon-blue h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.occupancy_rate}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-white/60">Yield</span>
                      <span className="text-xs text-white">
                        {item.yield_score}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-neon-green h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.yield_score}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-white/60">
                        Maintenance SLA
                      </span>
                      <span className="text-xs text-white">
                        {item.maintenance_score}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-neon-purple h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.maintenance_score}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-white/60">
                        Tenant Satisfaction
                      </span>
                      <span className="text-xs text-white">
                        {item.satisfaction_score}%
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-neon-pink h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${item.satisfaction_score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/80 text-sm">
                    {item.ai_feedback_en}
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {item.ai_feedback_ar}
                  </p>
                </div>
              </div>
            </NeonCard>
          ))
        )}
      </div>
    </div>
  );
}
