import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import CinematicBG from '../components/ui/CinematicBG';
import RecruitmentDashboard from '../components/dashboards/RecruitmentDashboard';
import WorkforceDashboard from '../components/dashboards/WorkforceDashboard';
import PerformanceDashboard from '../components/dashboards/PerformanceDashboard';
import CommunityPlannerDashboard from '../components/dashboards/CommunityPlannerDashboard';
import FraudMonitorDashboard from '../components/dashboards/FraudMonitorDashboard';
import AIInsightDashboard from '../components/dashboards/AIInsightDashboard';

const dashboards = [
  { component: RecruitmentDashboard, title: 'Recruitment Copilot' },
  { component: WorkforceDashboard, title: 'Workforce Overview' },
  { component: PerformanceDashboard, title: 'Performance Analytics' },
  { component: CommunityPlannerDashboard, title: 'Community Planner' },
  { component: FraudMonitorDashboard, title: 'Fraud Monitor' },
  { component: AIInsightDashboard, title: 'AI Insights' },
];

export default function PresentationMode() {
  const { t } = useTranslation();
  const [currentDashboard, setCurrentDashboard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentDashboard((prev) => (prev + 1) % dashboards.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000); // 5 seconds per dashboard

    return () => clearInterval(interval);
  }, []);

  const CurrentComponent = dashboards[currentDashboard].component;

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <CinematicBG />

      {/* Main Content */}
      <div className={`relative z-10 h-full transition-opacity duration-500 ${
        isTransitioning ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="h-full overflow-auto">
          <CurrentComponent />
        </div>
      </div>

      {/* Overlay Info */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
        {/* Dashboard Indicator */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-neon-blue/30">
          <div className="flex items-center space-x-4">
            <div className="text-white/60 text-sm">Dashboard</div>
            <div className="flex space-x-2">
              {dashboards.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentDashboard ? 'bg-neon-blue scale-125' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <div className="text-neon-blue font-medium">
              {currentDashboard + 1} / {dashboards.length}
            </div>
          </div>
          <div className="text-white font-bold mt-1">
            {dashboards[currentDashboard].title}
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 border border-neon-green/30">
          <div className="flex items-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Auto Showcase</span>
          </div>
        </div>
      </div>

      {/* Bottom Branding */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-neon-purple/30">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                StaffTract.AI Hackathon Edition
              </h2>
              <p className="text-white/70 text-sm">Powered by Vision 2030</p>
            </div>
            <div className="text-right text-white/60 text-sm">
              <div className="font-medium">Team Members:</div>
              <div>Dr. Abdullah Alshamer (Team Lead)</div>
              <div>Geetha K S (Full Stack Developer)</div>
              <div>Dr. Saravanan Pandiaraj (Business Analyst)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-30 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-20 animate-pulse" />
      )}
    </div>
  );
}
