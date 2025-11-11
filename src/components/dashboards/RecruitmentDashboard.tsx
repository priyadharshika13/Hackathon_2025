import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NeonCard from '../ui/NeonCard';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Users, Award, TrendingUp, RefreshCw } from 'lucide-react';
import useBackendData from '../../hooks/useBackendData';

export default function RecruitmentDashboard() {
  const { t } = useTranslation();
  const { data, loading } = useBackendData('/api/recruitment/candidates');

  const candidates = data || [];
  const shortlistedCount = candidates.filter((c: any) => c.decision === 'Shortlisted').length;
  const avgScore = candidates.length > 0
    ? candidates.reduce((sum: number, c: any) => sum + c.ai_overall_score, 0) / candidates.length
    : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-blue to-neon-green bg-clip-text text-transparent">
            {t('recruitmentCopilot')}
          </h1>
          <p className="text-white/70 mt-2">AI-powered candidate evaluation and insights</p>
        </div>
        <button className="p-3 bg-neon-blue/20 hover:bg-neon-blue/30 rounded-lg border border-neon-blue/30 transition-colors">
          <RefreshCw className="w-6 h-6 text-neon-blue" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NeonCard glowColor="blue">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-blue/20 rounded-lg">
              <Users className="w-8 h-8 text-neon-blue" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Total Candidates</p>
              <AnimatedCounter
                from={0}
                to={candidates.length}
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="green">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-green/20 rounded-lg">
              <Award className="w-8 h-8 text-neon-green" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Shortlisted</p>
              <AnimatedCounter
                from={0}
                to={shortlistedCount}
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>

        <NeonCard glowColor="purple">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-neon-purple/20 rounded-lg">
              <TrendingUp className="w-8 h-8 text-neon-purple" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Avg Score</p>
              <AnimatedCounter
                from={0}
                to={avgScore}
                suffix="%"
                className="text-2xl font-bold text-white"
              />
            </div>
          </div>
        </NeonCard>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Candidate Evaluations</h2>
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-32 bg-white/10 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          candidates.slice(0, 10).map((candidate: any) => (
            <NeonCard key={candidate.id} glowColor={candidate.decision === 'Shortlisted' ? 'green' : 'blue'}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                    <p className="text-white/60">{candidate.position}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {candidate.ai_overall_score.toFixed(1)}
                    </div>
                    <div className={`text-sm font-medium ${
                      candidate.decision === 'Shortlisted' ? 'text-green-400' : 'text-blue-400'
                    }`}>
                      {candidate.decision}
                    </div>
                  </div>
                </div>

                {/* Score Bars */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-white/60 mb-1">Technical</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-neon-blue h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${candidate.technical_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-white mt-1">{candidate.technical_score}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">Communication</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-neon-green h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${candidate.communication_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-white mt-1">{candidate.communication_score}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">Attitude</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-neon-purple h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${candidate.attitude_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-white mt-1">{candidate.attitude_score}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1">Teamwork</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-neon-pink h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${candidate.teamwork_score}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-white mt-1">{candidate.teamwork_score}</div>
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-white/80 text-sm">{candidate.ai_feedback_en}</p>
                  <p className="text-white/60 text-sm mt-1">{candidate.ai_feedback_ar}</p>
                </div>
              </div>
            </NeonCard>
          ))
        )}
      </div>
    </div>
  );
}
