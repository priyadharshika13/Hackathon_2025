import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import CinematicBG from "../components/ui/CinematicBG";

export default function InsightTrends() {
  const [trends, setTrends] = useState<any[]>([]);
  const api = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    axios
      .get(`${api}/api/insights/trends`)
      .then((res) => setTrends(res.data.trends || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <CinematicBG />
      <motion.div
        className="relative z-10 p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent">
          💡 AI Insight Trends / اتجاهات التحليل الذكي
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {trends.map((item, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <p className="text-base text-white/90 mb-2">{item.en}</p>
              <p className="text-sm text-gray-400">{item.ar}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
