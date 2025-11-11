import { useTranslation } from 'react-i18next';
import NeonCard from '../ui/NeonCard';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Users, MapPin, TrendingUp } from 'lucide-react';
import useBackendData from '../../hooks/useBackendData';

// ---- Mock fallback data (Real Estate Portfolio, Saudi/Expat split) ----
const MOCK_PORTFOLIO_DATA = [
  {
    asset: 'Medina Business Center',
    total_units: 150,
    saudi: 112,
    expat: 75,
    tier: 'Core',
  },
  {
    asset: 'Abha Corporate Plaza',
    total_units: 200,
    saudi: 154,
    expat: 77,
    tier: 'Core',
  },
  {
    asset: 'Tabuk Innovation Hub',
    total_units: 130,
    saudi: 98,
    expat: 75,
    tier: 'Growth',
  },
  {
    asset: 'Khobar Tech Park',
    total_units: 210,
    saudi: 188,
    expat: 89,
    tier: 'Prime',
  },
  {
    asset: 'Makkah Retail Plaza',
    total_units: 175,
    saudi: 122,
    expat: 70,
    tier: 'Value-Add',
  },
];

// Normalize any input (backend or mock) into a unified shape
function normalizePortfolioData(items: any[]) {
  return items.map((item) => {
    const saudi =
      item.saudi ??
      item.saudi_workers ??
      item.saudi_units ??
      0;

    const expat =
      item.expat ??
      item.expat_workers ??
      item.expat_units ??
      0;

    const occupiedUnits =
      item.occupied_units ?? saudi + expat;

    const totalUnits =
      item.total_units ??
      item.total_workers ??
      item.total_spaces ??
      item.total ??
      occupiedUnits;

    const occupancyRate =
      item.occupancy_rate ??
      item['saudization_%'] ??
      item.saudization_rate ??
      item.saudization ??
      (totalUnits ? Math.round((occupiedUnits / totalUnits) * 100) : 0);

    return {
      asset: item.asset || item.site || item.company || item.name,
      total_units: totalUnits,
      occupied_units: occupiedUnits,
      occupancy_rate: occupancyRate,
      tier: item.tier || item.nitaqat_band || 'Core',
      saudi,
      expat,
    };
  });
}

export default function WorkforceDashboard() {
  const { t } = useTranslation();
  const { data, loading } = useBackendData('/api/workforce/summary');

  // Try to read list-like structures from backend
  const rawBackendItems: any[] =
    (data?.assets as any[]) ||
    (data?.sites_ranked as any[]) ||
    (data?.companies_ranked as any[]) ||
    [];

  const portfolioData = rawBackendItems.length
    ? normalizePortfolioData(rawBackendItems)
    : normalizePortfolioData(MOCK_PORTFOLIO_DATA);

  // Calculate overall stats
  const totalUnits = portfolioData.reduce(
    (sum: number, asset: any) => sum + (asset.total_units || 0),
    0
  );
  const totalOccupied = portfolioData.reduce(
    (sum: number, asset: any) => sum + (asset.occupied_units || 0),
    0
  );
  const avgOccupancy =
    portfolioData.length > 0
      ? portfolioData.reduce(
          (sum: number, asset: any) => sum + (asset.occupancy_rate || 0),
          0
        ) / portfolioData.length
      : 0;

  // Get top and bottom performers
  const sortedByOccupancy = [...portfolioData].sort(
    (a: any, b: any) => (b.occupancy_rate || 0) - (a.occupancy_rate || 0)
  );
  const topAsset = sortedByOccupancy[0];
  const bottomAsset = sortedByOccupancy[sortedByOccupancy.length - 1];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            {t('Portfolio Overview')}
          </h1>
          <p className="text-white/70 mt-2">
            {t('Occupancy metrics and asset-level insights')}
          </p>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NeonCard glowColor="blue">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Users className="w-8 h-8 text-neon-blue" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Units</p>
              <AnimatedCounter
                from={0}
                to={totalUnits}
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="green">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-neon-green" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Occupied Units</p>
              <AnimatedCounter
                from={0}
                to={totalOccupied}
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="purple">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <MapPin className="w-8 h-8 text-neon-purple" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Avg Occupancy</p>
              <AnimatedCounter
                from={0}
                to={avgOccupancy}
                suffix="%"
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>
      </div>

      {/* Asset Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Asset */}
        {topAsset && (
          <NeonCard glowColor="green">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse" />
                Top Performing Asset
              </h3>
              <div className="space-y-2">
                <p className="text-white/80 font-medium">{topAsset.asset}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Occupancy Rate</span>
                  <span className="text-green-400 font-bold">
                    {topAsset.occupancy_rate}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-green-400 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${topAsset.occupancy_rate}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-white/60">
                  <span>{topAsset.occupied_units} Occupied</span>
                  <span>{topAsset.total_units} Total</span>
                </div>
                <div className="mt-1 text-xs text-white/50">
                  {topAsset.saudi ?? 0} Saudi • {topAsset.expat ?? 0} Expat
                </div>
              </div>
            </div>
          </NeonCard>
        )}

        {/* Bottom Asset */}
        {bottomAsset && (
          <NeonCard glowColor="blue">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-2 animate-pulse" />
                Area for Improvement
              </h3>
              <div className="space-y-2">
                <p className="text-white/80 font-medium">{bottomAsset.asset}</p>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Occupancy Rate</span>
                  <span className="text-blue-400 font-bold">
                    {bottomAsset.occupancy_rate}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <div
                    className="bg-blue-400 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${bottomAsset.occupancy_rate}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-white/60">
                  <span>{bottomAsset.occupied_units} Occupied</span>
                  <span>{bottomAsset.total_units} Total</span>
                </div>
                <div className="mt-1 text-xs text-white/50">
                  {bottomAsset.saudi ?? 0} Saudi • {bottomAsset.expat ?? 0} Expat
                </div>
              </div>
            </div>
          </NeonCard>
        )}
      </div>

      {/* Asset Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Asset Occupancy</h2>

        {loading && !data ? (
          // Show shimmer only when we *still* haven’t received any data
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-white/10 rounded-lg" />
              </div>
            ))}
          </div>
        ) : (
          portfolioData.slice(0, 8).map((asset: any) => (
            <NeonCard key={asset.asset} glowColor="blue">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-2">
                    {asset.asset}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span>
                      {asset.occupied_units}/{asset.total_units} units
                    </span>
                    <span
                      className={`font-medium ${
                        asset.tier === 'Prime'
                          ? 'text-green-400'
                          : asset.tier === 'Core'
                          ? 'text-blue-400'
                          : 'text-yellow-400'
                      }`}
                    >
                      {asset.tier}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-white/50">
                    {asset.saudi ?? 0} Saudi • {asset.expat ?? 0} Expat
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-1">
                    {asset.occupancy_rate}%
                  </div>
                  <div className="w-24 bg-white/20 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        asset.tier === 'Prime'
                          ? 'bg-green-400'
                          : asset.tier === 'Core'
                          ? 'bg-blue-400'
                          : 'bg-yellow-400'
                      }`}
                      style={{ width: `${asset.occupancy_rate}%` }}
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
