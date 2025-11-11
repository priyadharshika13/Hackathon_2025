import CinematicBG from "../components/ui/CinematicBG";
import PerformanceDashboard from "../components/dashboards/PerformanceDashboard";
// import AIInsightBar from "../components/ui/AIInsightBar";
import { motion } from "framer-motion";

function PerformanceRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      {[1, 1.5, 2].map((scale, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-neon-purple/30 rounded-full"
          style={{ width: 200 * scale, height: 200 * scale }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6 + i, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

export default function Performance() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CinematicBG />
      <PerformanceRings />
      <div className="relative z-10 p-6">
        <PerformanceDashboard />
      </div>
      {/* <AIInsightBar /> */}
    </div>
  );
}
