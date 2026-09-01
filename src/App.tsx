/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HackathonStatsBar } from './components/HackathonStatsBar';
import { LandingHero } from './components/LandingHero';
import { TelemetryForm } from './components/TelemetryForm';
import { ProcessingSequence } from './components/ProcessingSequence';
import { DigitalTwinViewer } from './components/DigitalTwinViewer';
import { DashboardMetrics } from './components/DashboardMetrics';
import { ChairHealthMonitor } from './components/ChairHealthMonitor';
import { RealTimeActivityFeed } from './components/RealTimeActivityFeed';
import { ChairPredictions } from './components/ChairPredictions';
import { DeepInsightSection } from './components/DeepInsightSection';
import { FinalVerdictSection } from './components/FinalVerdictSection';
import { ExtremeAnalysisModal } from './components/ExtremeAnalysisModal';
import { Footer } from './components/Footer';

import { 
  TelemetryFormData, 
  ChairMetrics, 
  ChairHealthData,
  ChairPrediction
} from './types';
import { 
  computeChairMetrics, 
  computeChairHealth, 
  getPredictions, 
  DEMO_PRESET 
} from './utils/analyticsEngine';
import { sound } from './utils/audio';
import { Sparkles, Armchair, ChevronUp, Share2, Play } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<'landing' | 'form' | 'processing' | 'dashboard'>('landing');
  const [isDemo, setIsDemo] = useState<boolean>(false);
  const [hackathonMode, setHackathonMode] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isExtremeModalOpen, setIsExtremeModalOpen] = useState<boolean>(false);
  const [ignoredCount, setIgnoredCount] = useState<number>(0);

  // Form input data
  const [formData, setFormData] = useState<TelemetryFormData>(DEMO_PRESET);
  
  // Computed analytics
  const [metrics, setMetrics] = useState<ChairMetrics>(() => computeChairMetrics(DEMO_PRESET, false));
  const [health, setHealth] = useState<ChairHealthData>(() => computeChairHealth(metrics.chairStress));
  const [predictions, setPredictions] = useState<ChairPrediction[]>(() => getPredictions(DEMO_PRESET));

  // Handler: Run Custom Config
  const handleStartConfig = () => {
    setIsDemo(false);
    setCurrentStep('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Run Demo Mode
  const handleRunDemo = () => {
    setIsDemo(true);
    setFormData(DEMO_PRESET);
    setIgnoredCount(0);
    const computedMetrics = computeChairMetrics(DEMO_PRESET, true);
    setMetrics(computedMetrics);
    setHealth(computeChairHealth(computedMetrics.chairStress));
    setPredictions(getPredictions(DEMO_PRESET));
    setCurrentStep('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Form Submission
  const handleFormSubmit = (data: TelemetryFormData) => {
    setFormData(data);
    setIsDemo(false);
    setIgnoredCount(0);
    const computedMetrics = computeChairMetrics(data, false);
    setMetrics(computedMetrics);
    setHealth(computeChairHealth(computedMetrics.chairStress));
    setPredictions(getPredictions(data));
    setCurrentStep('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Ignore Advice (+5% stress)
  const handleIgnoreAdvice = () => {
    setIgnoredCount(prev => prev + 1);
    setMetrics(prev => {
      const newStress = Math.min(99, prev.chairStress + 5);
      return {
        ...prev,
        chairStress: newStress
      };
    });
    setHealth(prev => ({
      ...prev,
      seatPressure: Math.min(99, prev.seatPressure + 4),
      backrestFatigue: Math.min(99, prev.backrestFatigue + 3),
      emotionalStability: Math.max(2, prev.emotionalStability - 4)
    }));
  };

  // Reset / New Twin
  const handleResetTwin = () => {
    setCurrentStep('landing');
    setIgnoredCount(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col font-sans selection:bg-[#FF6321]/30 selection:text-orange-200 antialiased">
      {/* Header */}
      <Header
        hackathonMode={hackathonMode}
        setHackathonMode={setHackathonMode}
        onRunDemo={handleRunDemo}
        onCreateNewTwin={handleResetTwin}
        onOpenExtremeAnalysis={() => setIsExtremeModalOpen(true)}
        isAudioMuted={isAudioMuted}
        setIsAudioMuted={setIsAudioMuted}
        currentStep={currentStep}
      />

      {/* Live Hackathon Telemetry Stream Bar */}
      {hackathonMode && (
        <HackathonStatsBar complaintsCount={17 + ignoredCount} />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentStep === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LandingHero
                onStartConfig={handleStartConfig}
                onRunDemo={handleRunDemo}
              />
            </motion.div>
          )}

          {currentStep === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <TelemetryForm
                onSubmit={handleFormSubmit}
                onCancel={handleResetTwin}
              />
            </motion.div>
          )}

          {currentStep === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProcessingSequence
                isDemo={isDemo}
                onComplete={() => {
                  setCurrentStep('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </motion.div>
          )}

          {currentStep === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10"
            >
              {/* Dashboard Top Title Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded border border-orange-500/30 bg-orange-500/10 text-orange-400 font-mono text-[11px] font-semibold mb-2">
                    <Armchair className="w-3.5 h-3.5" />
                    LIVE DIGITAL TWIN INSTANCE
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
                    CHAIR DIGITAL TWIN
                  </h1>
                  <p className="text-xs sm:text-sm font-mono text-gray-400 mt-1">
                    CHASSIS: <span className="text-gray-200">{formData.chairModel || 'Dormitory Unbranded Mesh-Creaker 3000'}</span> | ACTIVE POSTURE: <span className="text-orange-400">{formData.postureType || 'Slump 45°'}</span>
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Secret Extreme Button */}
                  <button
                    onClick={() => {
                      setIsExtremeModalOpen(true);
                      sound.playExtremeWarp();
                    }}
                    className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                    RUN EXTREME ANALYSIS
                  </button>

                  <button
                    onClick={handleResetTwin}
                    className="rounded-full border border-[#FF6321] px-4 py-1.5 text-xs font-bold text-[#FF6321] transition hover:bg-[#FF6321] hover:text-black font-sans"
                  >
                    NEW SESSION →
                  </button>
                </div>
              </div>

              {/* SECTION 4: 3D Holographic Chair Digital Twin */}
              <section className="space-y-4">
                <DigitalTwinViewer
                  chairStress={metrics.chairStress}
                  sittingDuration={formData.sittingDuration}
                  isDemo={isDemo}
                />
              </section>

              {/* SECTION 4 Cont.: Live Analytics Metrics Grid */}
              <section className="space-y-4">
                <DashboardMetrics metrics={metrics} />
              </section>

              {/* SECTION 5 & 6: Chair Health Monitor + Real-Time Activity Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-6">
                  <ChairHealthMonitor health={health} />
                </div>
                <div className="lg:col-span-6">
                  <RealTimeActivityFeed />
                </div>
              </div>

              {/* SECTION 7: Chair Predictions */}
              <section className="space-y-4">
                <ChairPredictions predictions={predictions} />
              </section>

              {/* SECTION 8: Deep Chair Insight */}
              <section className="space-y-4">
                <DeepInsightSection initialInsight={metrics.deepInsight} />
              </section>

              {/* SECTION 9: Chair's Final Verdict & Ignore Advice */}
              <section className="space-y-4">
                <FinalVerdictSection
                  statusTitle={metrics.statusTitle}
                  chairConfidence={metrics.chairConfidence}
                  chairSatisfaction={metrics.chairSatisfaction}
                  recommendation={metrics.recommendation}
                  onIgnoreAdvice={handleIgnoreAdvice}
                  ignoredCount={ignoredCount}
                  onResetTwin={handleResetTwin}
                />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Secret Extreme Analysis Modal (Step 10) */}
      <ExtremeAnalysisModal
        isOpen={isExtremeModalOpen}
        onClose={() => setIsExtremeModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
