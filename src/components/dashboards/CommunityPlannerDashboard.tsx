import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NeonCard from '../ui/NeonCard';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Users, RefreshCw, TrendingUp, Globe } from 'lucide-react';
import useBackendData from '../../hooks/useBackendData';

// ---- MOCK REAL ESTATE DATA (fallback – Saudi flavored) ----
const MOCK_REAL_ESTATE_DATA = {
  total_properties: 48200,
  occupancy_rate: 78, // % occupied
  vacancy_ratio: 22,  // % vacant
  ai_insights: [
    {
      english:
        'Focus on mid-income residential communities in Riyadh, Jeddah, and Dammam to capture stable rental demand.',
      arabic:
        'يُنصح بالتركيز على مشاريع السكن متوسطة الدخل في الرياض وجدة والدمام للاستفادة من الطلب الإيجاري المستقر.',
    },
    {
      english:
        'Introduce centralized digital property management across Saudi portfolios to improve maintenance SLAs and tenant satisfaction.',
      arabic:
        'يُنصح بتطبيق أنظمة إدارة عقارية رقمية موحدة في المحافظ العقارية بالمملكة لتحسين مستوى الصيانة ورضا المستأجرين.',
    },
    {
      english:
        'Reposition underperforming retail assets into community hubs with F&B, entertainment, and essential services.',
      arabic:
        'يجب إعادة تموضع الأصول التجارية منخفضة الأداء كمراكز مجتمعية تضم المطاعم والترفيه والخدمات الأساسية.',
    },
    {
      english:
        'Encourage green building standards and smart building technologies to align with Vision 2030 sustainability goals.',
      arabic:
        'يُنصح بتطبيق معايير المباني الخضراء وتقنيات المباني الذكية بما يتوافق مع مستهدفات الاستدامة لرؤية 2030.',
    },
    {
      english:
        'Prioritize redevelopment of aging urban zones over the next 18–24 months to optimize land use and occupancy.',
      arabic:
        'يُنصح بالتركيز على إعادة تطوير المناطق الحضرية القديمة خلال الـ 18–24 شهراً القادمة لتحسين استخدام الأراضي ورفع الإشغال.',
    },
  ],
  sectors: [
    {
      name: 'Residential',
      occupied_units: 28500,
      total_units: 37000,
      occupancy_rate: 77,
      performance: 'Good',
    },
    {
      name: 'Commercial Offices',
      occupied_units: 7200,
      total_units: 9500,
      occupancy_rate: 76,
      performance: 'Good',
    },
    {
      name: 'Industrial & Warehousing',
      occupied_units: 4100,
      total_units: 5300,
      occupancy_rate: 77,
      performance: 'Stable',
    },
    {
      name: 'Retail Spaces',
      occupied_units: 2200,
      total_units: 3500,
      occupancy_rate: 63,
      performance: 'Needs Improvement',
    },
    {
      name: 'Hospitality (Hotels & Serviced Apts)',
      occupied_units: 1800,
      total_units: 2800,
      occupancy_rate: 64,
      performance: 'Needs Improvement',
    },
    {
      name: 'Mixed-use Developments',
      occupied_units: 2400,
      total_units: 3100,
      occupancy_rate: 77,
      performance: 'Excellent',
    },
  ],
};

export default function RealEstatePortfolioDashboard() {
  const { t } = useTranslation();
  // 🔁 Now hitting the real-estate endpoint
  const backend: any = useBackendData('/api/community/overview');
  const { data, loading } = backend;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const hasBackendData = data && Object.keys(data).length > 0;
  console.log('Real Estate Portfolio Data:', data);
  // use backend if available, otherwise mock Saudi data
  const portfolioData = hasBackendData ? data : MOCK_REAL_ESTATE_DATA;
  console.log('Using Portfolio Data:', portfolioData.national_summary);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (typeof backend.refetch === 'function') {
      try {
        await backend.refetch();
      } catch (e) {
        // ignore refetch errors for now
      }
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-green to-neon-cyan bg-clip-text text-transparent">
            Saudi Real Estate Portfolio
          </h1>
          <p className="text-white/70 mt-2">
            Nationwide occupancy, vacancy, and AI-powered investment insights across KSA
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className={`p-3 bg-neon-green/20 hover:bg-neon-green/30 rounded-lg border border-neon-green/30 transition-all duration-300 ${
            isRefreshing ? 'animate-spin scale-110' : ''
          }`}
        >
          <RefreshCw
            className={`w-6 h-6 text-neon-green ${
              isRefreshing ? 'animate-pulse' : ''
            }`}
          />
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NeonCard glowColor="green">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Users className="w-8 h-8 text-neon-green" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Properties / Units (KSA)</p>
              <AnimatedCounter
                from={0}
                to={portfolioData.total_properties || 0}
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="cyan">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-cyan/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-neon-cyan" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Average Occupancy Rate</p>
              <AnimatedCounter
                from={0}
                to={portfolioData.national_summary || 0}
                suffix="%"
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="purple">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <Globe className="w-8 h-8 text-neon-purple" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Vacancy Ratio</p>
              <AnimatedCounter
                from={0}
                to={portfolioData.vacancy_ratio || 0}
                suffix="%"
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">AI Market Insights – Saudi Arabia</h2>
        {loading && !hasBackendData ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-white/10 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          (portfolioData.ai_insights || [])
            .slice(0, 5)
            .map((insight: any, index: number) => (
              <NeonCard key={index} glowColor="blue">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                    <span className="text-white/60 text-sm">
                      Strategic Recommendation
                    </span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {insight.english}
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed mt-2">
                    {insight.arabic}
                  </p>
                </div>
              </NeonCard>
            ))
        )}
      </div>

      {/* Sector / Segment Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Segment Performance (KSA)</h2>
        {loading && !hasBackendData ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-white/10 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          (portfolioData.sectors || [])
            .slice(0, 6)
            .map((sector: any) => (
              <NeonCard key={sector.name} glowColor="purple">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-2">
                      {sector.name}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-white/60">
                      <span>{sector.occupied_units} units occupied</span>
                      <span>{sector.total_units} total units</span>
                      <span
                        className={`font-medium ${
                          sector.performance === 'Excellent'
                            ? 'text-green-400'
                            : sector.performance === 'Good'
                            ? 'text-blue-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {sector.performance}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white mb-1">
                      {sector.occupancy_rate}%
                    </div>
                    <div className="w-24 bg-white/20 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          sector.performance === 'Excellent'
                            ? 'bg-green-400'
                            : sector.performance === 'Good'
                            ? 'bg-blue-400'
                            : 'bg-yellow-400'
                        }`}
                        style={{ width: `${sector.occupancy_rate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </NeonCard>
            ))
        )}
      </div>
    </div>
  );
}
