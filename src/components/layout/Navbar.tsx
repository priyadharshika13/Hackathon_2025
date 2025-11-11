import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Globe, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import vision2030 from '../assets/vision2030.png';


interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ---------- Left Section: Menu + Logos ---------- */}
          <div className="flex items-center space-x-4">
            {/* Sidebar toggle button */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Menu className="w-6 h-6 text-neon-blue" />
            </button>

            {/* Brand Logos */}
            <div className="flex items-center space-x-3">
              {/* Company Logo */}
              <img
                src={logo}
                alt="StaffTract.AI Logo"
                className="h-8 w-auto object-contain drop-shadow-[0_0_6px_rgba(0,255,255,0.4)]"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent tracking-wide">
                StaffTract.AI
              </span>
            </div>
          </div>

          {/* ---------- Right Section: Vision 2030 + Actions ---------- */}
          <div className="flex items-center space-x-5">
            {/* Vision 2030 Logo */}
            <div className="hidden sm:block">
              <img
                src={vision2030}
                alt="Vision 2030"
                className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
              />
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors hover:shadow-neon-green/50"
              >
                <Globe className="w-5 h-5 text-neon-green" />
                <span className="text-sm font-medium uppercase">
                  {i18n.language}
                </span>
              </button>

              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-32 glass-effect rounded-lg border border-white/20 py-1"
                >
                  <button
                    onClick={() => toggleLanguage('en')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                  >
                    English
                  </button>
                  <button
                    onClick={() => toggleLanguage('ar')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors"
                  >
                    العربية
                  </button>
                </motion.div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors text-red-400 hover:text-red-300">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
