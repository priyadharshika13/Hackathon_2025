import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ChatbotWidget from './components/ChatBotWidget';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Reports from './pages/Reports';
import Recruitment from './pages/Recruitment';

import { useState } from 'react';
import Workforce from './pages/Workforce';
import Performance from './pages/Performance';
import Community from './pages/Community';
import Fraud from './pages/Fraud';
import ResumeAnalyzer from './pages/ResumeAnalyser';
import ResumeMatcher from './pages/ResumeMatcher';
import Home from './pages/Home';
import DemoVideoModal from './components/ui/DemoVideoModal';


function App() {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-dark-900" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-pink/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <Home />
              </main>
            </div>
          } />
           <Route path="/dashboard" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <Dashboard />
              </main>
            </div>
          } />
          <Route path="/reports" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <Reports />
              </main>
            </div>
          } />
          <Route path="/recruitment" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <Recruitment />
              </main>
            </div>
          } />
                    <Route path="/workforce" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <Workforce />
              </main>
            </div>
          } />
    <Route path="/performance" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <Performance />
              </main>
            </div>
          } />
        <Route path="/community" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <Community />
              </main>
            </div>
          } />
           <Route path="/fraud" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <Fraud />
              </main>
            </div>
          } />
           <Route path="/resumeanalyser" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <ResumeAnalyzer />
              </main>
            </div>
          } />
          <Route path="/resumematcher" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <ResumeMatcher />
              </main>
            </div>
          } />
          <Route path="/demovideomodal" element={
            <div className="relative z-10">
              <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="pt-16 lg:pl-64">
                <DemoVideoModal open={false} onClose={function (): void {
                  throw new Error('Function not implemented.');
                } } />
              </main>
            </div>
          } />
                  </Routes>

      </div>
          <ChatbotWidget /> {/* 👈 Always floating */}

    </Router>

  );
}

export default App;
