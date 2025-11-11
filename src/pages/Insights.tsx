import CinematicBG from "../components/ui/CinematicBG";
import AIInsightDashboard from "../components/dashboards/AIInsightDashboard";
import AIInsightBar from "../components/ui/AIInsightBar";
import { motion } from "framer-motion";

function InsightOrbit() {
  return (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      <motion.div
        className="absolute w-[300px] h-[300px] border border-neon-cyan/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-3 h-3 bg-neon-pink rounded-full"
        animate={{ rotate: 360 }}
        style={{ transformOrigin: "150px 0" }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function Insights() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CinematicBG />
      <InsightOrbit />
      <div className="relative z-10 p-6">
        <AIInsightDashboard />
      </div>
      <AIInsightBar />
    </div>
  );
}
