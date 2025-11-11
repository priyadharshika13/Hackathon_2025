import CinematicBG from "../components/ui/CinematicBG";
import CommunityPlannerDashboard from "../components/dashboards/CommunityPlannerDashboard";
// import AIInsightBar from "../components/ui/AIInsightBar";
import { motion } from "framer-motion";

function CommunityPulse() {
  return (
    <motion.div
      className="absolute w-[500px] h-[500px] bg-neon-green/20 rounded-full blur-3xl -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Community() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CinematicBG />
      <CommunityPulse />
      <div className="relative z-10 p-6">
        <CommunityPlannerDashboard />
      </div>
      {/* <AIInsightBar /> */}
    </div>
  );
}
