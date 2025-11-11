import CinematicBG from "../components/ui/CinematicBG";
import WorkforceDashboard from "../components/dashboards/WorkforceDashboard";
// import AIInsightBar from "../components/ui/AIInsightBar";
import { motion } from "framer-motion";

function WorkforceWave() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full h-48 opacity-30 -z-10"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <motion.path
        fill="url(#grad)"
        fillOpacity="0.8"
        animate={{ d: [
          "M0,160L80,176C160,192,320,224,480,229.3C640,235,800,213,960,202.7C1120,192,1280,192,1360,192L1440,192L1440,0L0,0Z",
          "M0,224L80,208C160,192,320,160,480,149.3C640,139,800,149,960,176C1120,203,1280,245,1360,256L1440,267L1440,0L0,0Z"
        ]}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#21F0FF" />
          <stop offset="100%" stopColor="#A6FF00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Workforce() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CinematicBG />
      <WorkforceWave />
      <div className="relative z-10 p-6">
        <WorkforceDashboard />
      </div>
      {/* <AIInsightBar /> */}
    </div>
  );
}
