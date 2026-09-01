import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Cpu, 
  ShieldAlert, 
  Zap, 
  Brain, 
  Cookie, 
  Moon, 
  Flame,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { runExtremeAnalysis } from '../utils/analyticsEngine';
import { ExtremeAnalysisResult } from '../types';
import { sound } from '../utils/audio';

interface ExtremeAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtremeAnalysisModal: React.FC<ExtremeAnalysisModalProps> = ({
  isOpen,
  onClose
}) => {
  const [data, setData] = useState<ExtremeAnalysisResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      setIsCalculating(true);
      sound.playExtremeWarp();

      const timer = setTimeout(() => {
        setData(runExtremeAnalysis());
        setIsCalculating(false);
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-3xl rounded-3xl bg-[#121214] border border-white/10 p-6 sm:p-8 shadow-2xl my-8 overflow-hidden"
      >
        {/* Background Lights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF6321]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#18181B] border border-white/10 text-gray-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center sm:text-left mb-6 border-b border-white/5 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" />
            EXTREME COMPUTATIONAL ANALYSIS // SUBROUTINE 99
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-sans">
            Extremely Unnecessary Telemetry Suite
          </h2>
          <p className="text-xs font-mono text-gray-400">
            Applying theoretical quantum mechanics and psychology to inanimate upholstery.
          </p>
        </div>

        {isCalculating ? (
          <div className="py-16 text-center space-y-4">
            <div className="relative flex items-center justify-center w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-[#FF6321] animate-spin" />
              <Cpu className="w-7 h-7 text-[#FF6321]" />
            </div>
            <div className="space-y-1 font-mono">
              <div className="text-sm font-bold text-gray-200">
                Solving Chair-Human Eigenvector Equations...
              </div>
              <div className="text-xs text-gray-500">
                Cross-referencing 2026 sleep deprivation index
              </div>
            </div>
          </div>
        ) : data ? (
          <div className="space-y-6">
            {/* 6 Grid items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {/* Item 1: Compatibility */}
              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <HeartPulseIcon className="w-4 h-4" />
                  <span>Chair-to-Human Compatibility</span>
                </div>
                <div className="text-lg font-bold text-white font-sans">
                  {data.compatibility}
                </div>
              </div>

              {/* Item 2: Personality */}
              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Brain className="w-4 h-4" />
                  <span>Sitting Personality Archetype</span>
                </div>
                <div className="text-base font-bold text-white font-sans">
                  {data.personalityType}
                </div>
                <p className="text-[11px] text-gray-400 font-sans leading-relaxed pt-1 font-normal">
                  {data.personalityDescription}
                </p>
              </div>

              {/* Item 3: Snack Correlation */}
              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-orange-400 font-bold">
                  <Cookie className="w-4 h-4" />
                  <span>Snack-to-Sitting Correlation</span>
                </div>
                <div className="text-base font-bold text-gray-100">
                  {data.snackCorrelation}
                </div>
              </div>

              {/* Item 4: Procrastination Coefficient */}
              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Zap className="w-4 h-4" />
                  <span>Procrastination Coefficient</span>
                </div>
                <div className="text-base font-bold text-gray-100">
                  {data.procrastinationCoefficient}
                </div>
              </div>

              {/* Item 5: Abandonment Prob & 5 Min Events */}
              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-400 font-bold">
                  <Flame className="w-4 h-4" />
                  <span>Chair Abandonment Probability</span>
                </div>
                <div className="text-base font-bold text-gray-100">
                  {data.abandonmentProbability}
                </div>
                <p className="text-[11px] text-gray-400 font-sans pt-1">
                  Estimated future “5 mins bro” events tonight: <span className="text-[#FF6321] font-bold">{data.futureFiveMinEvents}</span>
                </p>
              </div>

              {/* Item 6: Sleep Probability */}
              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Moon className="w-4 h-4" />
                  <span>Probability of Student Falling Asleep</span>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {data.sleepProbability}%
                </div>
              </div>
            </div>

            {/* The Climax: USEFULNESS OF THIS ANALYSIS 0.0001% */}
            <div className="p-6 rounded-2xl bg-[#18181B] border border-white/10 text-center space-y-2 shadow-xl">
              <div className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                USEFULNESS OF THIS ANALYSIS
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-[#FF6321] font-mono">
                0.0001%
              </div>
              <p className="text-sm font-sans italic text-gray-300 font-medium">
                “And yet, you ran it.”
              </p>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-8 py-3 rounded-full bg-[#18181B] hover:bg-[#202024] border border-white/10 text-gray-200 hover:text-white font-mono text-xs font-bold transition-all"
          >
            Close Extreme Analysis
          </button>
        </div>
      </motion.div>
    </div>
  );
};

function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
