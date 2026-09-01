import React from 'react';
import { motion } from 'motion/react';
import { 
  HeartPulse, 
  ShieldCheck, 
  AlertCircle, 
  Activity,
  Zap,
  Smile,
  Frown
} from 'lucide-react';
import { ChairHealthData } from '../types';

interface ChairHealthMonitorProps {
  health: ChairHealthData;
}

export const ChairHealthMonitor: React.FC<ChairHealthMonitorProps> = ({ health }) => {
  const bars = [
    {
      label: 'Backrest fatigue',
      percent: health.backrestFatigue,
      ascii: '████████░░',
      color: 'from-orange-600 to-orange-400',
      textColor: 'text-orange-400',
      description: 'Mesh tensile creep approaching non-reversible sag'
    },
    {
      label: 'Seat pressure',
      percent: health.seatPressure,
      ascii: '█████████░',
      color: 'from-rose-600 to-rose-400',
      textColor: 'text-rose-400',
      description: 'High-density foam experiencing complete cellular collapse'
    },
    {
      label: 'Leg stability',
      percent: health.legStability,
      ascii: '██████████',
      color: 'from-emerald-600 to-emerald-400',
      textColor: 'text-emerald-400',
      description: 'Caster base grounded in dormitory carpet ecosystem'
    },
    {
      label: 'Emotional stability',
      percent: health.emotionalStability,
      ascii: '██░░░░░░░░',
      color: 'from-red-600 to-red-400',
      textColor: 'text-red-400',
      description: 'Chair is experiencing secondary trauma from student workload'
    }
  ];

  return (
    <div className="rounded-2xl bg-[#121214] border border-white/5 p-6 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-mono text-white tracking-wide">
                CHAIR HEALTH MONITOR
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/10 text-[#FF6321] border border-orange-500/20">
                REAL-TIME DIAGNOSTIC
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400">
              Biomechanical wear index & psychological stress vectors
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#18181B] border border-[#FF6321]/40 text-[#FF6321] font-mono text-xs font-bold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#FF6321] animate-ping" />
          STATUS: {health.statusText}
        </div>
      </div>

      {/* Health Meter Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bars.map((bar, idx) => (
          <div key={bar.label} className="space-y-2 p-4 rounded-xl bg-[#0A0A0B] border border-white/5">
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-gray-200 font-semibold flex items-center gap-2">
                {bar.label === 'Emotional stability' && <Frown className="w-3.5 h-3.5 text-red-400" />}
                {bar.label}
              </span>
              <span className={`font-bold ${bar.textColor}`}>
                {bar.percent}%
              </span>
            </div>

            {/* Ascii Visual + Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-[#121214] h-2 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.percent}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className={`h-full bg-gradient-to-r ${bar.color} rounded-full`}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span className="tracking-widest text-gray-400">{bar.ascii}</span>
                <span>{bar.percent > 70 ? 'HIGH' : bar.percent < 30 ? 'CRITICAL LOW' : 'OPTIMAL'}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-400 font-sans italic pt-1 border-t border-white/5">
              {bar.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
