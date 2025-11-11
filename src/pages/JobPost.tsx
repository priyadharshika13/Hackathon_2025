import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function JobPost() {
  const [form, setForm] = useState({ title: "", skills: "", salary: "", region: "" });
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post("/api/recruitment/jobs/create", form);
    setResult(res.data);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-8">
      <motion.h1
        className="text-3xl md:text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }}
      >
        🚀 Create Job Post
      </motion.h1>

      <form onSubmit={handleSubmit} className="bg-[#111] p-6 rounded-2xl w-full max-w-lg shadow-lg space-y-4 border border-[#21F0FF]/20">
        {["title","skills","salary","region"].map((f) => (
          <input key={f} required name={f} placeholder={f.toUpperCase()}
            className="w-full p-3 rounded-xl bg-[#1b1b22] text-white outline-none"
            onChange={(e)=>setForm({...form,[f]:e.target.value})}/>
        ))}
        <button className="w-full p-3 bg-gradient-to-r from-[#21F0FF] to-[#9B5CFF] rounded-xl font-semibold">
          Post Job
        </button>
      </form>

      {result && (
        <motion.div
          className="mt-8 text-center bg-[#1a1a1f] p-4 rounded-xl border border-[#FFD400]/30"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        >
          <p className="text-neon-lime font-bold">{result.message_en}</p>
          <p className="text-gray-400 mt-1">{result.message_ar}</p>
        </motion.div>
      )}
    </div>
  );
}
