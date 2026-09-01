import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Play, 
  Armchair, 
  Activity, 
  Cpu, 
  ShieldAlert, 
  Zap,
  Sparkles,
  Layers
} from 'lucide-react';
import { sound } from '../utils/audio';

interface LandingHeroProps {
  onStartConfig: () => void;
  onRunDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartConfig,
  onRunDemo
}) => {
  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Ambience & Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,99,33,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Enterprise Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121214] border border-white/10 text-xs font-mono text-gray-300 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6321] animate-ping" />
              <span className="text-[#FF6321] font-bold">NEXT-GEN IOT TWIN</span>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400">Dormitory Infrastructure v4.2</span>
            </motion.div>

            {/* Main Headlines */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                CHAIR <span className="text-[#FF6321]">INTELLIGENCE</span>
                <span className="text-[#FF6321] text-2xl align-super">™</span>
              </h1>
              <p className="text-xl sm:text-2xl font-light text-gray-200 tracking-tight">
                Your chair knows how long you've been sitting.
              </p>
              <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A real-time digital twin for the most overworked piece of furniture in your room.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => {
                  sound.playClick();
                  onStartConfig();
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FF6321] hover:bg-[#ff753b] text-black font-bold text-sm tracking-tight flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF6321]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                CREATE CHAIR TWIN
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onRunDemo();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-white/10 bg-[#121214] hover:bg-[#18181B] text-gray-200 font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-3.5 h-3.5 text-[#FF6321] fill-[#FF6321]" />
                RUN DEMO
              </button>
            </motion.div>

            {/* Sub-text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-0.5"
            >
              <p className="text-xs font-mono text-gray-500">
                Powered by unnecessarily sophisticated analytics.
              </p>
            </motion.div>

            {/* Enterprise Specs Micro-badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-left font-mono"
            >
              <div className="p-3 rounded-xl bg-[#121214] border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase">Latency</div>
                <div className="text-sm font-bold text-[#FF6321]">0.04ms Slouch Ingestion</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121214] border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase">Telemetry</div>
                <div className="text-sm font-bold text-cyan-400">6-Axis Cushion Strain</div>
              </div>
              <div className="p-3 rounded-xl bg-[#121214] border border-white/5">
                <div className="text-[10px] text-gray-500 uppercase">Utility</div>
                <div className="text-sm font-bold text-gray-400">0.0001% Useful</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Stylized Animated Chair Visualization */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative w-full max-w-[420px] aspect-square rounded-3xl bg-gradient-to-b from-[#18181B] to-[#0A0A0B] border border-white/10 p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden group"
            >
              {/* Radar Rings & Scanline */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,99,33,0.08),transparent_70%)] pointer-events-none" />
              <div className="absolute w-64 h-64 rounded-full border border-[#FF6321]/20 animate-pulse-slow pointer-events-none" />
              <div className="absolute w-80 h-80 rounded-full border border-dashed border-white/10 pointer-events-none animate-radar" />
              <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#FF6321]/15 to-transparent animate-scanline pointer-events-none" />

              {/* Status Header */}
              <div className="w-full flex items-center justify-between z-10 text-[11px] font-mono border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-gray-300 font-bold">DIGITAL TWIN: READY</span>
                </div>
                <span className="text-[#FF6321] bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                  REAL-TIME IDLE
                </span>
              </div>

              {/* Stylized Floating Chair Centerpiece */}
              <div className="relative my-auto flex items-center justify-center animate-float-chair">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Holographic Glowing Base Ring */}
                  <div className="absolute bottom-2 w-36 h-10 rounded-full border border-dashed border-[#FF6321]/40 animate-pulse bg-orange-500/5" />

                  {/* Minimal Stylized Chair SVG */}
                  <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-[0_0_40px_rgba(255,99,33,0.25)]">
                    {/* Headrest */}
                    <rect x="75" y="25" width="50" height="16" rx="4" className="fill-[#121214] stroke-[#FF6321] stroke-2" />
                    {/* Backrest Spine */}
                    <path d="M 100 41 L 100 100" className="stroke-gray-600 stroke-2" />
                    {/* Backrest Mesh */}
                    <path d="M 60 48 Q 100 40 140 48 Q 148 85 138 115 Q 100 120 62 115 Q 52 85 60 48 Z" className="fill-orange-500/5 stroke-[#FF6321] stroke-2" />
                    {/* Armrests */}
                    <path d="M 45 92 L 62 92 M 45 92 L 48 128" className="stroke-gray-400 stroke-2 stroke-linecap-round" />
                    <path d="M 155 92 L 138 92 M 155 92 L 152 128" className="stroke-gray-400 stroke-2 stroke-linecap-round" />
                    {/* Seat Cushion */}
                    <path d="M 50 125 Q 100 138 150 125 Q 158 138 148 145 Q 100 155 52 145 Q 42 138 50 125 Z" className="fill-[#FF6321]/15 stroke-[#FF6321] stroke-2" />
                    {/* Gas Cylinder */}
                    <rect x="96" y="145" width="8" height="30" className="fill-gray-700 stroke-gray-500 stroke-1" />
                    {/* Base Legs */}
                    <path d="M 100 175 L 50 188 M 100 175 L 150 188 M 100 175 L 100 192" className="stroke-gray-400 stroke-2 stroke-linecap-round" />
                    <circle cx="50" cy="188" r="4" className="fill-[#121214] stroke-[#FF6321] stroke-2" />
                    <circle cx="150" cy="188" r="4" className="fill-[#121214] stroke-[#FF6321] stroke-2" />
                    <circle cx="100" cy="192" r="3.5" className="fill-[#121214] stroke-[#FF6321] stroke-2" />
                    {/* Pulsing Sensors on Chair */}
                    <circle cx="100" cy="80" r="4" className="fill-[#FF6321] animate-ping" />
                    <circle cx="100" cy="135" r="4" className="fill-orange-400 animate-ping" />
                  </svg>
                </div>
              </div>

              {/* Bottom Telemetry Ticker */}
              <div className="w-full grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400 border-t border-white/10 pt-3 z-10">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#FF6321]" />
                  <span>STRESS: 92%</span>
                </div>
                <div className="text-right text-gray-300 font-semibold">
                  <span>SNACKS LOGGED: 6</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
