import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import NeonCard from '../components/ui/NeonCard';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import CinematicBG from '../components/ui/CinematicBG';
import {
  useRecruitmentData,
  useWorkforceSummary,
  usePerformanceSummary,
  useCommunityOverview,
  useFraudAlerts,
  useAiInsights
} from '../hooks/useApi';
import {
  Users,
  TrendingUp,
  Award,
  Map,
  Shield,
  Brain,
  RefreshCw
} from 'lucide-react';

export default function Dashboard() {
  const { t } = useTranslation();

  // API hooks
  const { data: recruitmentData, loading: recruitmentLoading, refetch: refetchRecruitment } = useRecruitmentData();
  const { data: workforceData, loading: workforceLoading, refetch: refetchWorkforce } = useWorkforceSummary();
  const { data: performanceData, loading: performanceLoading, refetch: refetchPerformance } = usePerformanceSummary();
  const { data: communityData, loading: communityLoading, refetch: refetchCommunity } = useCommunityOverview();
  const { data: fraudData, loading: fraudLoading, refetch: refetchFraud } = useFraudAlerts();
  const { data: insightsData, loading: insightsLoading, refetch: refetchInsights } = useAiInsights();

  const handleRefresh = () => {
    refetchRecruitment();
    refetchWorkforce();
    refetchPerformance();
    refetchCommunity();
    refetchFraud();
    refetchInsights();
  };

  return (
    <div className="min-h-screen p-6">
      <CinematicBG />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent mb-2">
              {t('welcome')}
            </h1>
            <TypeAnimation
              sequence={[
                t('aiPowered'),
                2000,
                'Intelligent Workforce Analytics',
                2000,
                'Saudi Arabia\'s Future of Work',
                2000,
              ]}
              wrapper="p"
              className="text-xl text-white/70"
              repeat={Infinity}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="p-3 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg border border-neon-blue/30 transition-colors"
          >
            <RefreshCw className="w-6 h-6 text-neon-blue" />
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {/* Recruitment Stats */}
        <NeonCard glowColor="blue">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Users className="w-8 h-8 text-neon-blue" />
            </div>
            <div>
              <p className="text-white/60 text-sm">{t('totalCandidates')}</p>
              <AnimatedCounter
                from={0}
                to={recruitmentData?.total || 0}
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        {/* Workforce Stats */}
        <NeonCard glowColor="green">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-neon-green" />
            </div>
            <div>
              <p className="text-white/60 text-sm">{t('saudizationRate')}</p>
              <AnimatedCounter
                from={0}
                to={workforceData?.organization_avg_saudization || 0}
                suffix="%"
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        {/* Performance Stats */}
        <NeonCard glowColor="purple">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <Award className="w-8 h-8 text-neon-purple" />
            </div>
            <div>
              <p className="text-white/60 text-sm">{t('performanceEvaluation')}</p>
              <AnimatedCounter
                from={0}
                to={performanceData?.organization_average || 0}
                suffix="%"
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        {/* Community Stats */}
        <NeonCard glowColor="pink">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-pink/20 rounded-lg">
              <Map className="w-8 h-8 text-neon-pink" />
            </div>
            <div>
              <p className="text-white/60 text-sm">{t('communityPlanning')}</p>
              <AnimatedCounter
                from={0}
                to={communityData?.national_summary?.total_workers || 0}
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>
      </motion.div>

      {/* Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <NeonCard glowColor="cyan">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-6 h-6 text-neon-cyan" />
              <h3 className="text-xl font-bold text-white">{t('aiInsights')}</h3>
            </div>
            <div className="space-y-3">
              {insightsLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-1/2"></div>
                </div>
              ) : (
                <p className="text-white/80">
                  {insightsData?.text || 'AI insights will appear here...'}
                </p>
              )}
            </div>
          </NeonCard>
        </motion.div>

        {/* Fraud Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <NeonCard glowColor="orange">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-bold text-white">{t('fraudMonitoring')}</h3>
            </div>
            <div className="space-y-3">
              {fraudLoading ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-white/20 rounded"></div>
                  <div className="h-3 bg-white/20 rounded w-5/6"></div>
                  <div className="h-3 bg-white/20 rounded w-4/6"></div>
                </div>
              ) : (
                fraudData?.alerts?.slice(0, 3).map((alert: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm">{alert.description || 'Security alert detected'}</p>
                      <p className="text-white/60 text-xs">{alert.timestamp || 'Just now'}</p>
                    </div>
                  </div>
                )) || (
                  <p className="text-white/60">No active alerts</p>
                )
              )}
            </div>
          </NeonCard>
        </motion.div>
      </div>

      {/* Loading States */}
      {(recruitmentLoading || workforceLoading || performanceLoading || communityLoading) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div className="glass-effect rounded-lg p-6 flex items-center space-x-4">
            <div className="w-6 h-6 border-2 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white">{t('loading')}</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
