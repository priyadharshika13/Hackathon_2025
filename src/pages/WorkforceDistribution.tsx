import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import CinematicBG from "../components/ui/CinematicBG";

export default function WorkforceDistribution() {
  const [bands, setBands] = useState<any>({});
  const [insight, setInsight] = useState<{ en: string; ar: string } | null>(null);
  const api = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${api}/api/workforce/nitaqat_distribution`);
      setBands(res.data.nitaqat_counts || {});
      setInsight({
        en: res.data.insight_en,
        ar: res.data.insight_ar,
      });
    };
    load();
  }, []);

  const chartData = Object.entries(bands).map(([band, count]) => ({
    band,
    count,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <CinematicBG />
      <motion.div
        className="relative z-10 p-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-neon-lime to-neon-cyan bg-clip-text text-transparent">
          🏢 Nitaqat Distribution / توزيع نطاقات التوطين
        </h1>

        <div className="h-[450px] bg-black/40 border border-lime-400/20 rounded-2xl p-4 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="band" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0a0f",
                  border: "1px solid #A6FF00",
                }}
              />
              <Bar dataKey="count" fill="#A6FF00" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {insight && (
          <div className="text-center mt-4">
            <p className="text-lg text-white/90">{insight.en}</p>
            <p className="text-sm text-gray-400 mt-2">{insight.ar}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
