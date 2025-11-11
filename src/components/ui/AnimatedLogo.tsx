import { motion } from "framer-motion";
import logo from "../../assets/StaffTract_AI_logo.png";

interface AnimatedLogoProps {
  size?: number;
  text?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function AnimatedLogo({
  size = 80,
  text = "StaffTract.AI",
  subtitle = "AI Powered HRM & Workforce Management",
  centered = false
}: AnimatedLogoProps) {
  return (
    <div
      className={`relative flex flex-col items-center ${
        centered ? "justify-center text-center" : "justify-start"
      }`}
    >
      {/* Glowing Orb Behind Logo */}
      <div className="absolute w-[120px] h-[120px] rounded-full bg-gradient-to-r from-neon-pink to-neon-cyan blur-3xl opacity-30 animate-orb-pulse" />

      {/* Logo Image */}
      <motion.img
        src={logo}
        alt="StaffTract.AI Logo"
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        animate={{
          scale: 1,
          rotate: 0,
          opacity: 1,
          transition: { duration: 1.2, ease: "easeOut" }
        }}
        whileHover={{ scale: 1.05, rotate: 5 }}
        className="relative z-10 rounded-full shadow-lg border border-neon-cyan/40"
        style={{ width: size, height: size }}
        loading="lazy"
      />

      {/* Logo Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 1.2, duration: 0.8, ease: "easeOut" }
        }}
        className="mt-4 text-2xl font-extrabold bg-gradient-to-r from-neon-cyan to-neon-pink bg-clip-text text-transparent tracking-wide drop-shadow-[0_0_10px_#21F0FF]"
      >
        {text}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 1.8, duration: 0.6 }
        }}
        className="text-sm text-white/70"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
