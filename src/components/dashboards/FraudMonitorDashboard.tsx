import React from "react";
import { motion } from "framer-motion";
import { useFraudMonitor } from "../../hooks/useFraudMonitor";
import AnimatedCounter from "../ui/AnimatedCounter";
import NeonCard from "../ui/NeonCard";
import { Loader2, ShieldAlert, ShieldCheck, Shield } from "lucide-react";

const AC: any = AnimatedCounter;

// ---- REAL ESTATE FRAUD MOCK (fallback) ----
const MOCK_FRAUD_DATA = {
  total_events: 128,
  high_risk: 9,
  medium_risk: 23,
  low_risk: 96,
  recent_alerts: [
    {
      id: 1,
      type: "Suspicious Payment Pattern",
      entity: "Tenant / Lease #A-1209",
      severity: "High",
      detected_at: "2025-10-28T11:24:00Z",
    },
    {
      id: 2,
      type: "Duplicate Ownership Document",
      entity: "Property ID RE-5543",
      severity: "Medium",
      detected_at: "2025-10-28T09:12:00Z",
    },
    {
      id: 3,
      type: "Unusual Short-Term Subletting",
      entity: "Unit #B-903",
      severity: "Low",
      detected_at: "2025-10-27T19:45:00Z",
    },
  ],
  insight_en:
    "High-risk events are concentrated around short-term leases and rapid ownership transfers. Tightening KYC checks on new tenants and enforcing stricter document verification on resale transactions can reduce fraud exposure by up to 30%.",
  insight_ar:
    "تتركز الحوادث عالية الخطورة حول عقود الإيجار قصيرة الأجل وعمليات نقل الملكية السريعة. يمكن أن يساعد تشديد إجراءات اعرف عميلك على المستأجرين الجدد وتطبيق تدقيق أكثر صرامة لوثائق إعادة البيع في خفض مخاطر الاحتيال بنسبة تصل إلى 30٪.",
};

export default function FraudMonitorDashboard() {
  const {
    data,
    loading,
    error,
    candidateData,
    candidateLoading,
    fetchCandidateEvents,
    setCandidateData,
    alertPulse,
  } = useFraudMonitor();

  // Use backend if healthy, otherwise mock
  const hasBackendData = data && !error;
  const fraudData = hasBackendData ? data : MOCK_FRAUD_DATA;

  if (loading && !hasBackendData)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin text-neon-cyan w-8 h-8" />
        <span className="ml-2 text-white text-lg">
          Analyzing portfolio risk patterns...
        </span>
      </div>
    );

  if (!fraudData)
    return (
      <div className="text-center text-red-400 mt-20">
        Failed to load fraud data: {error || "Unknown error"}
      </div>
    );

  const {
    total_events,
    high_risk,
    medium_risk,
    low_risk,
    recent_alerts,
    insight_en,
    insight_ar,
  } = fraudData as any;

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-60 bg-gradient-to-br from-[#0a0a1a] via-[#12091f] to-[#050505]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.h1
          className="text-4xl font-bold text-center neon-text mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Real Estate Fraud & Risk Monitor
        </motion.h1>

        {error && (
          <p className="text-center text-sm text-red-300 mb-4">
            {error} — displaying fallback monitoring data.
          </p>
        )}

        {/* Neon Pulse when new alert */}
        <motion.div
          animate={
            alertPulse
              ? { boxShadow: "0 0 30px #ff003c, 0 0 60px #ff003c" }
              : {}
          }
          transition={{
            duration: 0.4,
            repeat: alertPulse ? 4 : 0,
            repeatType: "mirror",
          }}
          className="rounded-3xl p-2 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <NeonCard>
              <div className="p-6 text-center">
                <AC value={total_events} className="text-3xl font-semibold text-neon-cyan" />
                <span className="text-xs text-gray-400 mt-1 block">Transactions, leases & listings</span>
              </div>
            </NeonCard>

            <NeonCard glowColor="red">
              <div className="p-6 text-center">
                <AC value={high_risk} className="text-3xl font-semibold text-red-400" />
                <span className="text-xs text-gray-400 mt-1 block">Immediate manual review</span>
              </div>
            </NeonCard>

            <NeonCard glowColor="orange">
              <div className="p-6 text-center">
                <AC value={medium_risk} className="text-3xl font-semibold text-yellow-300" />
                <span className="text-xs text-gray-400 mt-1 block">Monitor over next 7 days</span>
              </div>
            </NeonCard>

            <NeonCard glowColor="lime">
              <div className="p-6 text-center">
                <AC value={low_risk} className="text-3xl font-semibold text-lime-300" />
                <span className="text-xs text-gray-400 mt-1 block">Auto-approved events</span>
              </div>
            </NeonCard>
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          className="text-center text-lg text-gray-200 mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-neon-cyan">{insight_en}</p>
          <p className="text-neon-purple font-cairo">{insight_ar}</p>
        </motion.div>

        {/* Table + Candidate Modal */}
        {/* Your existing table/modal code can sit here unchanged,
            now treating candidateData as tenant / owner / broker, etc. */}
      </div>
    </div>
  );
}
