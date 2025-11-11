import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  Users,
  TrendingUp,
  Map,
  Shield,
  Brain,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'dashboard', path: '/dashboard', color: 'text-neon-blue' },
  { icon: Users, label: 'recruitmentCopilot', path: '/recruitment', color: 'text-neon-green' },
  { icon: TrendingUp, label: 'workforceOptimization', path: '/workforce', color: 'text-neon-pink' },
  { icon: FileText, label: 'performanceEvaluation', path: '/performance', color: 'text-neon-purple' },
  { icon: Map, label: 'communityPlanning', path: '/community', color: 'text-neon-cyan' },
  { icon: Shield, label: 'fraudMonitoring', path: '/fraud', color: 'text-red-400' },
  { icon: Brain, label: 'aiInsights', path: '/insights', color: 'text-yellow-400' },
  { icon: FileText, label: 'reports', path: '/reports', color: 'text-neon-orange' },
  { icon: FileText, label: 'ResumeAnalyser', path: '/resumeanalyser', color: 'text-neon-pink' },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-16 h-full w-64 glass-effect border-r border-white/10 z-50"
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && onClose()}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-neon-blue/20 border border-neon-blue/30 shadow-neon-blue/50'
                          : 'hover:bg-white/10 hover:shadow-neon-blue/20'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                      <span className="font-medium">{t(item.label)}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="w-1 h-6 bg-neon-blue rounded-full ml-auto"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <div className="text-xs text-white/60 text-center">
              StaffTract.AI v1.0.0
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
