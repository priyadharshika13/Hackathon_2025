import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import NeonCard from '../components/ui/NeonCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';
import {
  useRecruitmentData,
  useWorkforceSummary,
  usePerformanceSummary,
  useCommunityOverview,
} from '../hooks/useApi';
import { Download, FileText, TrendingUp } from 'lucide-react';

// ---- Local types for the bits of data we actually use ----

type RecruitmentSummary = {
  total?: number;
};

type WorkforceSummary = {
  organization_avg_saudization?: number;
};

type PerformanceSummary = {
  organization_average?: number;
};

type CommunityRegion = {
  region: string;
  saudization_: number;
};

type CommunityOverview = {
  regions?: CommunityRegion[];
};

// ---- Mock chart data (replace with processed API data later) ----

const recruitmentChartData = [
  { name: 'Shortlisted', value: 45, color: '#00ffff' },
  { name: 'Waitlisted', value: 30, color: '#39ff14' },
  { name: 'Rejected', value: 25, color: '#ff1493' },
];

const performanceChartData = [
  { department: 'IT', score: 85 },
  { department: 'HR', score: 78 },
  { department: 'Finance', score: 82 },
  { department: 'Operations', score: 75 },
  { department: 'Marketing', score: 88 },
];

const saudizationTrendData = [
  { month: 'Jan', rate: 42 },
  { month: 'Feb', rate: 44 },
  { month: 'Mar', rate: 46 },
  { month: 'Apr', rate: 48 },
  { month: 'May', rate: 50 },
  { month: 'Jun', rate: 52 },
];

export default function Reports(): JSX.Element {
  const { t } = useTranslation();

  const { data: recruitmentData } = useRecruitmentData();
  const { data: workforceData } = useWorkforceSummary();
  const { data: performanceData } = usePerformanceSummary();
  const { data: communityData } = useCommunityOverview();

  // Safely derived values with basic typing
  const recruitmentSummary = (recruitmentData as RecruitmentSummary | undefined) || {};
  const workforceSummary = (workforceData as WorkforceSummary | undefined) || {};
  const performanceSummary = (performanceData as PerformanceSummary | undefined) || {};
  const communityOverview = (communityData as CommunityOverview | undefined) || {};
  const communityRegions: CommunityRegion[] = communityOverview.regions || [];

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    // Mock export functionality – wire up to real export later
    console.log(`Exporting report as ${format}`);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent mb-2">
              {t('reports')}
            </h1>
            <p className="text-xl text-white/70">Comprehensive Analytics &amp; Insights</p>
          </div>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('pdf')}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg border border-neon-blue/30 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>PDF</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExport('excel')}
              className="flex items-center space-x-2 px-4 py-2 bg-neon-green/20 hover:bg-neon-green/30 rounded-lg border border-neon-green/30 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Excel</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recruitment Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <NeonCard glowColor="blue">
            <h3 className="text-xl font-bold text-white mb-4">
              Recruitment Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={recruitmentChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {recruitmentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(0,255,255,0.3)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </NeonCard>
        </motion.div>

        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <NeonCard glowColor="purple">
            <h3 className="text-xl font-bold text-white mb-4">
              Department Performance Scores
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="department"
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(138,43,226,0.3)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Bar dataKey="score" fill="#8a2be2" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </NeonCard>
        </motion.div>

        {/* Saudization Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <NeonCard glowColor="green">
            <h3 className="text-xl font-bold text-white mb-4">Saudization Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={saudizationTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="month"
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(57,255,20,0.3)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#39ff14"
                  fill="rgba(57,255,20,0.2)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </NeonCard>
        </motion.div>

        {/* Regional Workforce Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <NeonCard glowColor="pink">
            <h3 className="text-xl font-bold text-white mb-4">
              Regional Workforce Distribution
            </h3>
            <div className="space-y-4">
              {communityRegions.slice(0, 5).map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white/80">{region.region}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-neon-pink to-neon-purple h-2 rounded-full"
                        style={{ width: `${region.saudization_}%` }}
                      />
                    </div>
                    <span className="text-sm text-white/60 w-12 text-right">
                      {region.saudization_}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </NeonCard>
        </motion.div>
      </div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <NeonCard glowColor="cyan">
          <div className="flex items-center space-x-4">
            <TrendingUp className="w-8 h-8 text-neon-cyan" />
            <div>
              <p className="text-white/60 text-sm">Avg Performance Score</p>
              <p className="text-2xl font-bold text-white">
                {performanceSummary.organization_average ?? 0}%
              </p>
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="orange">
          <div className="flex items-center space-x-4">
            <FileText className="w-8 h-8 text-neon-orange" />
            <div>
              <p className="text-white/60 text-sm">Total Candidates</p>
              <p className="text-2xl font-bold text-white">
                {recruitmentSummary.total ?? 0}
              </p>
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="purple">
          <div className="flex items-center space-x-4">
            <TrendingUp className="w-8 h-8 text-neon-purple" />
            <div>
              <p className="text-white/60 text-sm">Saudization Rate</p>
              <p className="text-2xl font-bold text-white">
                {workforceSummary.organization_avg_saudization ?? 0}%
              </p>
            </div>
          </div>
        </NeonCard>
      </motion.div>
    </div>
  );
}
