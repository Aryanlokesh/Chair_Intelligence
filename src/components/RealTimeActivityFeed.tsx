import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  Clock, 
  Smartphone, 
  Cookie, 
  RotateCcw, 
  Play, 
  Pause, 
  Layers, 
  UserCheck, 
  AlertOctagon,
  Flame,
  Globe
} from 'lucide-react';
import { ChairEvent } from '../types';
import { generateInitialEvents, generateLiveEvent } from '../utils/analyticsEngine';

export const RealTimeActivityFeed: React.FC = () => {
  const [events, setEvents] = useState<ChairEvent[]>(generateInitialEvents);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Auto-incoming events periodically
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      const newEv = generateLiveEvent();
      setEvents(prev => [newEv, ...prev.slice(0, 35)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const filteredEvents = events.filter(e => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'snack') return e.category === 'snack';
    if (selectedFilter === 'movement') return e.category === 'movement' || e.category === 'sat';
    if (selectedFilter === 'distraction') return e.category === 'phone' || e.category === 'tab' || e.category === 'delay';
    return true;
  });

  const getEventIcon = (cat: ChairEvent['category']) => {
    switch (cat) {
      case 'sat': return <UserCheck className="w-3.5 h-3.5 text-emerald-400" />;
      case 'phone': return <Smartphone className="w-3.5 h-3.5 text-purple-400" />;
      case 'delay': return <RotateCcw className="w-3.5 h-3.5 text-amber-400" />;
      case 'snack': return <Cookie className="w-3.5 h-3.5 text-orange-400" />;
      case 'movement': return <Radio className="w-3.5 h-3.5 text-cyan-400" />;
      case 'tab': return <Globe className="w-3.5 h-3.5 text-blue-400" />;
      case 'productivity': return <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />;
      default: return <Flame className="w-3.5 h-3.5 text-orange-400" />;
    }
  };

  return (
    <div className="rounded-2xl bg-[#121214] border border-white/5 p-6 shadow-xl backdrop-blur-sm flex flex-col h-[480px]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/30">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold font-mono text-white tracking-wide">
                REAL-TIME CHAIR EVENTS
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE STREAM
              </span>
            </div>
            <p className="text-xs font-mono text-gray-400">
              Low-latency telemetry feed of micro-movements and distractions
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiveActive(!isLiveActive)}
            className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
              isLiveActive
                ? 'bg-[#0A0A0B] border-white/5 text-gray-300 hover:text-white'
                : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
            }`}
          >
            {isLiveActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isLiveActive ? 'Pause Stream' : 'Resume Stream'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 pb-3 font-mono text-[11px] overflow-x-auto">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-2.5 py-1 rounded-md transition-colors ${
            selectedFilter === 'all' ? 'bg-[#FF6321] text-black font-bold' : 'bg-[#0A0A0B] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          All ({events.length})
        </button>
        <button
          onClick={() => setSelectedFilter('distraction')}
          className={`px-2.5 py-1 rounded-md transition-colors ${
            selectedFilter === 'distraction' ? 'bg-[#FF6321] text-black font-bold' : 'bg-[#0A0A0B] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          Distractions
        </button>
        <button
          onClick={() => setSelectedFilter('snack')}
          className={`px-2.5 py-1 rounded-md transition-colors ${
            selectedFilter === 'snack' ? 'bg-[#FF6321] text-black font-bold' : 'bg-[#0A0A0B] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          Snacks
        </button>
        <button
          onClick={() => setSelectedFilter('movement')}
          className={`px-2.5 py-1 rounded-md transition-colors ${
            selectedFilter === 'movement' ? 'bg-[#FF6321] text-black font-bold' : 'bg-[#0A0A0B] text-gray-400 hover:text-white border border-white/5'
          }`}
        >
          Biomechanical
        </button>
      </div>

      {/* Scrollable Events List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-xs">
        <AnimatePresence initial={false}>
          {filteredEvents.map((ev) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-3 rounded-xl bg-[#0A0A0B] border border-white/5 hover:border-white/10 flex items-start gap-3 transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-[#121214] border border-white/5 mt-0.5">
                {getEventIcon(ev.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#FF6321] font-bold tracking-wider">
                    {ev.timestamp}
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-[#121214] text-gray-400">
                    {ev.category}
                  </span>
                </div>
                <p className="text-gray-200 font-sans text-xs mt-0.5 leading-relaxed font-normal">
                  {ev.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={feedEndRef} />
      </div>
    </div>
  );
};
