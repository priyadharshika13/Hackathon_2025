import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function OfferLetter() {
  const [form, setForm] = useState({ name: "", role: "" });
  const [offer, setOffer] = useState<any>(null);

  const generate = async () => {
    const res = await axios.post("/api/recruitment/hr/generate_offer", form);
    setOffer(res.data);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col items-center justify-center p-8">
      <motion.h1 className="text-4xl font-bold mb-8" initial={{opacity:0,y:-40}} animate={{opacity:1,y:0}}>
        🧾 Offer Letter Generator
      </motion.h1>

      <div className="bg-[#111] p-8 rounded-2xl w-full max-w-lg border border-[#21F0FF]/20 space-y-4">
        <input name="name" placeholder="Candidate Name" className="w-full p-3 rounded-xl bg-[#1b1b22]"
          onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input name="role" placeholder="Role" className="w-full p-3 rounded-xl bg-[#1b1b22]"
          onChange={(e)=>setForm({...form,role:e.target.value})}/>
        <button onClick={generate} className="w-full p-3 bg-gradient-to-r from-[#21F0FF] to-[#9B5CFF] rounded-xl font-semibold">
          Generate Offer
        </button>
      </div>

      {offer && (
        <motion.div className="mt-8 bg-[#1a1a1f] p-6 rounded-xl border border-[#FFD400]/30 w-full max-w-lg text-center"
          initial={{opacity:0}} animate={{opacity:1}}>
          <p className="text-[#A6FF00] font-bold">{offer.message_en}</p>
          <p className="text-gray-400 mt-1">{offer.message_ar}</p>
          <a href={offer.pdf_link} target="_blank" className="underline text-[#21F0FF] mt-3 inline-block">
            Download Offer Letter (Mock)
          </a>
        </motion.div>
      )}
    </div>
  );
}
