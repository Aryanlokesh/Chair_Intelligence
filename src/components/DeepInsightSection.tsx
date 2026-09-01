import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Quote, 
  RotateCw, 
  Share2, 
  Copy, 
  Check, 
  Cpu,
  Brain
} from 'lucide-react';
import { sound } from '../utils/audio';
import { DEEP_INSIGHTS } from '../utils/analyticsEngine';

interface DeepInsightSectionProps {
  initialInsight: string;
}

export const DeepInsightSection: React.FC<DeepInsightSectionProps> = ({ initialInsight }) => {
  const [currentInsight, setCurrentInsight] = useState<string>(initialInsight);
  const [insightIndex, setInsightIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);

  const handleNextInsight = () => {
    sound.playClick();
    setIsRegenerating(true);
    setTimeout(() => {
      const nextIdx = (insightIndex + 1) % DEEP_INSIGHTS.length;
      setInsightIndex(nextIdx);
      setCurrentInsight(DEEP_INSIGHTS[nextIdx]);
      setIsRegenerating(false);
      sound.playTelemetryPing(3);
    }, 350);
  };

  const handleCopy = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Chair Intelligence Deep Insight: "${currentInsight}"`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-[#121214] border border-white/10 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
      {/* Background Hologram Rings & Laser Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6321]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-[#FF6321]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Header Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FF6321]/10 border border-[#FF6321]/30 text-[#FF6321] text-xs font-mono font-bold uppercase tracking-widest shadow-lg">
          <Sparkles className="w-4 h-4 text-[#FF6321] animate-spin" />
          DEEP CHAIR INSIGHT<span className="text-xs align-super">™</span>
        </div>

        {/* The Giant Dramatic Insight Statement */}
        <div className="relative py-4 sm:py-6">
          <Quote className="w-12 h-12 text-[#FF6321]/20 mx-auto mb-4" />
          
          <motion.div
            key={currentInsight}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <blockquote className="text-2xl sm:text-4xl lg:text-4xl font-bold text-white tracking-tight leading-relaxed sm:leading-snug max-w-3xl mx-auto font-sans">
              “{currentInsight}”
            </blockquote>
          </motion.div>

          <p className="text-xs font-mono text-gray-400 mt-6 max-w-md mx-auto">
            Calculated via Bayesian telemetry clustering over 14,827 gluteal pressure readings.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleNextInsight}
            disabled={isRegenerating}
            className="px-5 py-2.5 rounded-full bg-[#18181B] hover:bg-[#202024] border border-white/10 hover:border-[#FF6321]/50 text-white font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-lg"
          >
            <RotateCw className={`w-3.5 h-3.5 text-[#FF6321] ${isRegenerating ? 'animate-spin' : ''}`} />
            Compute Another Useless Insight
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-full bg-[#18181B] hover:bg-[#202024] border border-white/10 text-gray-300 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Insight!' : 'Copy Insight'}
          </button>
        </div>
      </div>
    </div>
  );
};
