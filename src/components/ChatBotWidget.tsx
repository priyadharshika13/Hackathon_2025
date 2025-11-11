import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, X } from "lucide-react";
import ChatBot from "../pages/ChatBot"; 

export default function ChatbotWidget() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  // 🌍 Switch position based on language (English → right, Arabic/Saudi → left)
  const isArabic = i18n.language?.startsWith("ar") || i18n.language === "sa";

  return (
    <div
      className={`fixed z-50 bottom-5 ${
        isArabic ? "left-5" : "right-5"
      } flex flex-col items-end`}
    >
      {/* Chat window */}
      {open && (
        <div
          className={`mb-3 ${
            isArabic ? "origin-bottom-left" : "origin-bottom-right"
          } animate-scale-in`}
        >
          <ChatBot />
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`rounded-full p-3 shadow-lg transition-all duration-300
          ${
            open
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-neon-blue to-neon-purple hover:scale-105"
          }`}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
