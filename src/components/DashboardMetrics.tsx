import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Flame, 
  TrendingUp, 
  AlertTriangle, 
  Cookie, 
  Footprints,
  Sparkles,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { ChairMetrics } from '../types';

interface DashboardMetricsProps {
  metrics: ChairMetrics;
  onMetricClick?: (metricName: string) => void;
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
  metrics,
  onMetricClick
}) => {
  // Count-up animations for values
  const [displayOccupancy, setDisplayOccupancy] = useState<number>(0);
  const [displayStress, setDisplayStress] = useState<number>(0);
  const [displayEfficiency, setDisplayEfficiency] = useState<number>(0);
  const [displayProductivity, setDisplayProductivity] = useState<number>(0);
  const [displaySnacks, setDisplaySnacks] = useState<number>(0);
  const [displayStandUp, setDisplayStandUp] = useState<number>(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);

      setDisplayOccupancy(Number((metrics.occupancy * ease).toFixed(1)));
      setDisplayStress(Math.round(metrics.chairStress * ease));
      setDisplayEfficiency(Number((metrics.sittingEfficiency * ease).toFixed(1)));
      setDisplayProductivity(Number((metrics.productivity * ease).toFixed(1)));
      setDisplaySnacks(Number((metrics.snackDensity * ease).toFixed(1)));
      setDisplayStandUp(Number((metrics.standUpProbability * ease).toFixed(1)));

      if (step >= steps) {
        clearInterval(timer);
        setDisplayOccupancy(metrics.occupancy);
        setDisplayStress(metrics.chairStress);
        setDisplayEfficiency(metrics.sittingEfficiency);
        setDisplayProductivity(metrics.productivity);
        setDisplaySnacks(metrics.snackDensity);
        setDisplayStandUp(metrics.standUpProbability);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [metrics]);

  const cards = [
    {
      id: 'occupancy',
      title: 'CHAIR OCCUPANCY',
      value: `${displayOccupancy}%`,
      quote: metrics.occupancyQuote,
      icon: Users,
      color: 'text-[#FF6321]',
      bgGlow: 'bg-[#FF6321]/10',
      borderColor: 'border-white/5',
      badge: 'TERRITORIAL CLAIM'
    },
    {
      id: 'stress',
      title: 'CHAIR STRESS',
      value: `${displayStress}%`,
      quote: metrics.chairStressQuote,
      icon: Flame,
      color: 'text-rose-400',
      bgGlow: 'bg-rose-500/10',
      borderColor: 'border-white/5',
      badge: 'TRAUMA RATING'
    },
    {
      id: 'efficiency',
      title: 'SITTING EFFICIENCY',
      value: `${displayEfficiency}%`,
      quote: metrics.sittingEfficiencyQuote,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      borderColor: 'border-white/5',
      badge: 'FLAWLESS IMMOBILITY'
    },
    {
      id: 'productivity',
      title: 'PRODUCTIVITY',
      value: `${displayProductivity}%`,
      quote: metrics.productivityQuote,
      icon: AlertTriangle,
      color: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      borderColor: 'border-white/5',
      badge: 'STATISTICALLY NEGLIGIBLE'
    },
    {
      id: 'snacks',
      title: 'SNACK DENSITY',
      value: `${displaySnacks} snacks/hr`,
      quote: metrics.snackDensityQuote,
      icon: Cookie,
      color: 'text-purple-400',
      bgGlow: 'bg-purple-500/10',
      borderColor: 'border-white/5',
      badge: 'CRUMB CRUST RATING'
    },
    {
      id: 'standup',
      title: 'STAND-UP PROBABILITY',
      value: `${displayStandUp}%`,
      quote: metrics.standUpProbabilityQuote,
      icon: Footprints,
      color: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/10',
      borderColor: 'border-white/5',
      badge: 'PHYSICS ANOMALY'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
            className={`group relative p-5 rounded-2xl bg-[#121214] border ${card.borderColor} shadow-xl hover:border-white/10 transition-all flex flex-col justify-between overflow-hidden backdrop-blur-sm`}
          >
            {/* Top Row */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${card.bgGlow} ${card.color} border border-current/20`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-mono font-bold tracking-wider text-gray-300 uppercase">
                  {card.title}
                </h4>
              </div>

              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#0A0A0B] border border-white/5 text-gray-400">
                {card.badge}
              </span>
            </div>

            {/* Giant Metric Value */}
            <div className="my-2">
              <div className={`text-3xl sm:text-4xl font-bold font-mono tracking-tight ${card.color}`}>
                {card.value}
              </div>
            </div>

            {/* Hilarious Quote Quote */}
            <div className="pt-2 border-t border-white/5 mt-2">
              <p className="text-xs text-gray-300 font-sans italic font-normal leading-relaxed">
                {card.quote}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
