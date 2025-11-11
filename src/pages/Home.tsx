import { motion } from 'framer-motion';
import { Sparkles, Users, TrendingUp, Brain, Zap, Shield } from 'lucide-react';
import MagneticCTA from '../components/neon/MagneticCTA';
import GlowCard from '../components/neon/GlowCard';
import Particles from '../components/neon/Particles';
import Marquee from '../components/neon/Marquee';
import SectionHeader from '../components/neon/SectionHeader';
import { prefersReducedMotion } from '../lib/theme';
import React, { useState } from "react";
import DemoVideoModal from "../components/ui/DemoVideoModal";
import { useTranslation } from 'react-i18next';
import logo from '../components/assets/logo.png';
const features = [
  {
    icon: Users,
    title: 'Smart HRM',
    description: 'AI-powered employee management with predictive analytics',
    variant: 'cyan' as const,
  },
  {
    icon: TrendingUp,
    title: 'Performance Tracking',
    description: 'Real-time OKR monitoring and performance insights',
    variant: 'purple' as const,
  },
  {
    icon: Brain,
    title: 'AI Insights',
    description: 'Intelligent recommendations for workforce optimization',
    variant: 'pink' as const,
  },
  {
    icon: Zap,
    title: 'Automation',
    description: 'Streamline HR workflows with intelligent automation',
    variant: 'lime' as const,
  },
  {
    icon: Shield,
    title: 'Compliance',
    description: 'ZATCA-compliant with built-in security features',
    variant: 'amber' as const,
  },
];

const integrations = [
  { name: 'ZATCA', icon: '🇸🇦' },
  { name: 'WhatsApp', icon: '💬' },
  { name: 'Email', icon: '📧' },
  { name: 'Cloud Storage', icon: '☁️' },
  { name: 'Analytics', icon: '📊' },
  { name: 'Calendar', icon: '📅' },
];
//   const [showDemo, setShowDemo] = useState(false);

export default function Home() {
  const reducedMotion = prefersReducedMotion();
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative max-h-screen flex items-center justify-center px-4 overflow-hidden">
        <Particles count={40} />

        <div className="container mx-auto text-center relative z-10">
          {/* Animated Logo Mark */}
          <motion.div
            className="inline-flex mb-8"
            initial={reducedMotion ? {} : { scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            <div className="relative">
<motion.h1
  className="text-5xl md:text-7xl font-display font-bold mb-6"
  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  <div className="flex items-center justify-center gap-4">
    {/* 👇 Logo made larger */}
    <img
      src={logo}
      alt="StaffTract.AI Logo"
      className="w-16 h-16 md:w-20 md:h-20 rounded-xl shadow-glow-cyan"
    />
  </div>
</motion.h1>
              {/* Orbiting dots */}
              {!reducedMotion && (
                <>
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-3 h-3 bg-neon-cyan rounded-full shadow-glow-cyan"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '-60px 0px' }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon-purple rounded-full shadow-glow-purple"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '60px 0px' }}
                  />
                </>
              )}
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.h1
            className="text-5xl md:text-7xl font-display font-bold mb-6"
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gradient">StaffTract.AI</span>
          </motion.h1>

          <motion.p
  className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
  initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
>
  {t("Transform your workforce management with AI-powered insights, automation, and seamless integrations")}
</motion.p>


          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <MagneticCTA variant="primary">Get Started</MagneticCTA>
            <MagneticCTA variant="outline">Watch Demo</MagneticCTA>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { value: '10K+', label: 'Active Users' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                animate={
                  reducedMotion
                    ? {}
                    : {
                        y: [0, -10, 0],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <div className="text-3xl font-display font-bold neon-text-cyan">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionHeader
            title="Powerful Features"
            subtitle="Everything you need to manage your workforce efficiently"
            accent="purple"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowCard variant={feature.variant}>
                  <feature.icon className="w-12 h-12 mb-4 text-neon-cyan" />
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Marquee */}
      <section className="py-20 px-4 border-y border-white/10">
        <div className="container mx-auto">
          <SectionHeader
            title="Seamless Integrations"
            subtitle="Connect with your favorite tools"
            accent="pink"
          />

          <Marquee speed={30} className="mt-12">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center gap-3 px-6 py-4 glass rounded-xl hover:shadow-glow-cyan transition-all"
              >
                <span className="text-3xl">{integration.icon}</span>
                <span className="text-slate-300 font-medium whitespace-nowrap">
                  {integration.name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to transform your{' '}
              <span className="text-gradient">workforce?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of companies using StaffTract.AI to streamline their
              HR operations
            </p>
            <MagneticCTA variant="primary" className="text-xl px-12 py-5">
              Start Free Trial
            </MagneticCTA>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
