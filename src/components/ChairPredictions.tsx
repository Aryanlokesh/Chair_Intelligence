import React from 'react';
import { motion } from 'motion/react';
import { 
  BrainCircuit, 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { ChairPrediction } from '../types';

interface ChairPredictionsProps {
  predictions: ChairPrediction[];
}

export const ChairPredictions: React.FC<ChairPredictionsProps> = ({ predictions }) => {
  const getBadgeStyle = (risk: ChairPrediction['riskLevel']) => {
    switch (risk) {
      case 'certain':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'high':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'moderate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="rounded-2xl bg-[#121214] border border-white/5 p-6 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30">
            <BrainCircuit className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-mono text-white tracking-wide">
                CHAIR PREDICTIONS
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                PROBABILISTIC INFERENCE
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400">
              Machine learning forecasts calibrated on college human behavioral inertia
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-[11px] text-gray-400">
          CONFIDENCE INTERVAL: <span className="text-[#FF6321] font-bold">99.8% CERTAINTY</span>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="space-y-4">
        {predictions.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="p-4 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Left: Label & Description */}
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white font-sans">
                  {item.label}
                </h4>
                <span className={`text-[10px] font-mono px-2 py-0.2 rounded border uppercase ${getBadgeStyle(item.riskLevel)}`}>
                  {item.probability > 90 ? 'INEVITABLE' : item.probability < 15 ? 'UNLIKELY' : 'HIGH PROBABILITY'}
                </span>
              </div>
              <p className="text-xs text-gray-400 font-mono italic">
                {item.description}
              </p>
            </div>

            {/* Right: Percentage Bar & Number */}
            <div className="flex items-center gap-4 min-w-[200px] justify-end font-mono">
              <div className="w-28 bg-[#121214] h-2 rounded-full overflow-hidden border border-white/5 hidden sm:block">
                <div
                  style={{ width: `${Math.min(100, item.probability)}%` }}
                  className={`h-full rounded-full ${
                    item.probability > 75 
                      ? 'bg-[#FF6321]' 
                      : item.probability < 20 
                        ? 'bg-rose-500' 
                        : 'bg-amber-500'
                  }`}
                />
              </div>

              <div className="text-right">
                <span className={`text-2xl font-bold ${
                  item.probability > 75 
                    ? 'text-[#FF6321]' 
                    : item.probability < 20 
                      ? 'text-rose-400' 
                      : 'text-amber-400'
                }`}>
                  {item.probability}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
