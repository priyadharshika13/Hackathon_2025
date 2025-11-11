import CinematicBG from "../components/ui/CinematicBG";
import FraudMonitorDashboard from "../components/dashboards/FraudMonitorDashboard";
// import AIInsightBar from "../components/ui/AIInsightBar";
import { motion } from "framer-motion";

function FraudRipples() {
  return (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute border border-red-500/30 rounded-full"
          style={{ width: 200 + i * 100, height: 200 + i * 100 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export default function Fraud() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CinematicBG />
      <FraudRipples />
      <div className="relative z-10 p-6">
        <FraudMonitorDashboard />
      </div>
      {/* <AIInsightBar /> */}
    </div>
  );
}
