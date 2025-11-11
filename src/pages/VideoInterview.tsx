import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function VideoInterview() {
  const [data, setData] = useState<any>(null);

  const startInterview = async () => {
    const res = await axios.post("/api/recruitment/interview_analysis");
    setData(res.data);
  };

  return (
    <div className="relative p-8">
      <motion.h1 className="text-4xl font-bold mb-8" initial={{opacity:0,y:-40}} animate={{opacity:1,y:0}}>
        🎥 AI Video Interview
      </motion.h1>

      <button onClick={startInterview} className="p-4 bg-gradient-to-r from-[#21F0FF] to-[#9B5CFF] rounded-xl font-semibold">
        Start AI Interview
      </button>

      {data && (
        <motion.div className="mt-8 bg-[#1a1a1f] p-6 rounded-xl border border-[#FFD400]/30 w-full max-w-md" initial={{opacity:0}} animate={{opacity:1}}>
          <p>Speech Confidence: <span className="text-[#A6FF00]">{data.speech_confidence}%</span></p>
          <p>Eye Contact: <span className="text-[#A6FF00]">{data.eye_contact}%</span></p>
          <p>Overall Score: <span className="text-[#FFD400]">{data.overall_score}%</span></p>
          <p className="mt-3 text-[#21F0FF]">{data.feedback_en}</p>
          <p className="text-gray-400">{data.feedback_ar}</p>
        </motion.div>
      )}
    </div>
  );
}
