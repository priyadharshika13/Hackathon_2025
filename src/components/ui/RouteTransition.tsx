import { motion } from "framer-motion";

export default function RouteTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    />
  );
}
