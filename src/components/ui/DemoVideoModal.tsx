import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import demoVideo from "../assets/demo1.mp4"; // ✅ adjust path if needed

interface DemoVideoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DemoVideoModal({ open, onClose }: DemoVideoModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Inner card */}
          <motion.div
            className="relative w-full max-w-4xl mx-4 rounded-2xl bg-neutral-900 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video */}
            <div className="aspect-video w-full bg-black">
              <video
                src={demoVideo}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Optional footer text */}
            <div className="px-5 py-3 border-t border-white/10 text-xs text-white/60">
              StaffTract.AI • Product Demo
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
