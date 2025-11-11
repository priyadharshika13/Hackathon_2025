import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CinematicBG from "../components/ui/CinematicBG";

export default function CommunityTrends() {
  const [data, setData] = useState<any[]>([]);
  const api = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${api}/api/community/trends`);
        setData(res.data.trends || []);
      } catch (err) {
        console.error("Trend load error:", err);
      }
    };
    load();
  }, []);

  const chartData = data.map((r) => ({
    region: r.region,
    Q1: r.growth_trend_q?.[0] || 0,
    Q2: r.growth_trend_q?.[1] || 0,
    Q3: r.growth_trend_q?.[2] || 0,
  }));

  const colors = ["#21F0FF", "#9B5CFF", "#FF3DF5"];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CinematicBG />
      <motion.div
        className="relative z-10 p-8 text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
          🌍 Regional Growth Trends / اتجاهات النمو الإقليمي
        </h1>

        <div className="h-[500px] bg-black/40 border border-cyan-400/20 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="region" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0a0a0f",
                  border: "1px solid #21F0FF",
                }}
              />
              <Legend />
              {["Q1", "Q2", "Q3"].map((q, i) => (
                <Line
                  key={q}
                  type="monotone"
                  dataKey={q}
                  stroke={colors[i]}
                  strokeWidth={3}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
