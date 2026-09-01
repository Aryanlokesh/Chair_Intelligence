import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  Armchair, 
  Frown, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { sound } from '../utils/audio';

interface FinalVerdictSectionProps {
  statusTitle: string;
  chairConfidence: number;
  chairSatisfaction: number;
  recommendation: string;
  onIgnoreAdvice: () => void;
  ignoredCount: number;
  onResetTwin: () => void;
}

export const FinalVerdictSection: React.FC<FinalVerdictSectionProps> = ({
  statusTitle,
  chairConfidence,
  chairSatisfaction,
  recommendation,
  onIgnoreAdvice,
  ignoredCount,
  onResetTwin
}) => {
  const [showDisappointedToast, setShowDisappointedToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('Chair disappointed.');

  const disappointedPhrases = [
    "Chair disappointed. Gas cylinder sighed.",
    "Chair stress increased by +5%. Foam density compromised.",
    "Chair filed a formal grievance with the furniture union.",
    "Chair will remember this during your next exam week.",
    "Chair is currently praying for your lumbar vertebrae."
  ];

  const handleIgnore = () => {
    sound.playDisappointedSound();
    onIgnoreAdvice();
    const msg = disappointedPhrases[ignoredCount % disappointedPhrases.length];
    setToastMessage(msg);
    setShowDisappointedToast(true);
    setTimeout(() => {
      setShowDisappointedToast(false);
    }, 3500);
  };

  return (
    <div className="relative rounded-3xl bg-[#121214] border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Laser Top Glow */}
      <div className="absolute inset-x-0 top-0 h-1 bg-[#FF6321]" />

      <div className="max-w-4xl mx-auto space-y-8 text-center">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-[#FF6321] font-mono text-xs font-bold uppercase tracking-widest">
          <Armchair className="w-3.5 h-3.5" />
          FINAL ARTIFACT // SUMMARY VERDICT
        </div>

        {/* Chair Status Title */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            SYNTHESIZED CHAIR STATUS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-sans">
            {statusTitle}
          </h2>
        </div>

        {/* Telemetry Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto font-mono text-xs">
          <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 shadow-md">
            <span className="text-gray-400 block mb-1">Chair Confidence</span>
            <span className="text-2xl font-bold text-emerald-400">{chairConfidence}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 shadow-md">
            <span className="text-gray-400 block mb-1">Chair Satisfaction</span>
            <span className="text-2xl font-bold text-rose-400">{Math.max(4, chairSatisfaction - (ignoredCount * 5))}%</span>
          </div>
        </div>

        {/* Chair's Recommendation Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#18181B] border border-white/10 max-w-2xl mx-auto space-y-3 shadow-xl">
          <div className="text-xs font-mono font-bold text-[#FF6321] uppercase tracking-wider">
            OFFICIAL CHAIR RECOMMENDATION:
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
            {recommendation}
          </div>
          <p className="text-xs font-mono text-gray-400 pt-1">
            Execution recommended within 60 seconds to prevent total anatomical calcification.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Ignore Chair Advice Button */}
          <button
            onClick={handleIgnore}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-mono font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Frown className="w-4 h-4 text-rose-400" />
            IGNORE CHAIR ADVICE
            {ignoredCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-rose-500 text-black text-xs font-bold">
                +{ignoredCount * 5}% Stress
              </span>
            )}
          </button>

          {/* Reset / Recalibrate */}
          <button
            onClick={() => {
              sound.playClick();
              onResetTwin();
            }}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#18181B] hover:bg-[#202024] border border-white/10 text-gray-300 hover:text-white font-mono text-sm transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Configure New Session
          </button>
        </div>

        {/* Disappointed Notification Toast */}
        <AnimatePresence>
          {showDisappointedToast && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-rose-950/90 border border-rose-500 text-rose-200 font-mono text-xs font-bold shadow-2xl mt-4"
            >
              <Flame className="w-4 h-4 text-rose-400 animate-bounce" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
