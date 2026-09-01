import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Cpu, 
  BrainCircuit, 
  AlertOctagon, 
  Frown, 
  HeartCrack,
  Flame
} from 'lucide-react';

interface HackathonStatsBarProps {
  complaintsCount?: number;
}

export const HackathonStatsBar: React.FC<HackathonStatsBarProps> = ({ complaintsCount = 17 }) => {
  const [dataProcessed, setDataProcessed] = useState(18.74);
  const [eventsAnalyzed, setEventsAnalyzed] = useState(42871);
  const [predictionsCount, setPredictionsCount] = useState(8291);

  // Live ticking upward to simulate continuous hyper-scale data crunching
  useEffect(() => {
    const interval = setInterval(() => {
      setDataProcessed(prev => Number((prev + 0.02).toFixed(2)));
      setEventsAnalyzed(prev => prev + Math.floor(Math.random() * 4) + 1);
      if (Math.random() > 0.6) {
        setPredictionsCount(prev => prev + 1);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#0E0E10] border-y border-white/5 py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#FF6321] font-bold">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6321] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6321]"></span>
          </span>
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Flame className="w-3.5 h-3.5 text-[#FF6321]" />
            HACKATHON TELEMETRY:
          </span>
        </div>

        {/* Dynamic Metric Tickers */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-300 text-[11px]">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-500">Data:</span>
            <span className="text-gray-200 font-bold">{dataProcessed} GB</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-gray-500">Events:</span>
            <span className="text-gray-200 font-bold">{eventsAnalyzed.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-gray-500">Predictions:</span>
            <span className="text-purple-300 font-bold">{predictionsCount.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <AlertOctagon className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-gray-500">Useful Insights:</span>
            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">0</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Frown className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-gray-500">Complaints:</span>
            <span className="text-rose-400 font-bold">{complaintsCount}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <HeartCrack className="w-3.5 h-3.5 text-red-400" />
            <span className="text-gray-500">Sanity:</span>
            <span className="text-red-400 font-bold animate-pulse">3%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
