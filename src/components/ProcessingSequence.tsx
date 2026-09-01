import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Loader2, 
  Terminal, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Radio
} from 'lucide-react';
import { sound } from '../utils/audio';

interface ProcessingSequenceProps {
  onComplete: () => void;
  isDemo?: boolean;
}

interface StepItem {
  id: number;
  text: string;
  subtext?: string;
  durationMs: number;
}

const STEPS: StepItem[] = [
  { id: 1, text: "Connecting to chair...", subtext: "Handshake established via Mesh-IoT BLE v4.2", durationMs: 650 },
  { id: 2, text: "Receiving telemetry...", subtext: "Pneumatic cylinder load packets incoming", durationMs: 700 },
  { id: 3, text: "Cleaning behavioral data...", subtext: "Discarding false promises of 'I’ll start now'", durationMs: 750 },
  { id: 4, text: "Aggregating sitting patterns...", subtext: "Computing inertia coefficient across lumbar nodes", durationMs: 750 },
  { id: 5, text: "Calculating chair stress...", subtext: "Backrest tensile fatigue exceeding spec by 42%", durationMs: 800 },
  { id: 6, text: "Analyzing snack frequency...", subtext: "Crumb basin density vector quantified", durationMs: 700 },
  { id: 7, text: "Detecting procrastination events...", subtext: "Over 87 tab switches registered without git commit", durationMs: 750 },
  { id: 8, text: "Running predictive chair model...", subtext: "Monte Carlo simulation on student motivation convergence", durationMs: 800 },
  { id: 9, text: "Generating digital twin...", subtext: "Baking holographic polygon coordinates", durationMs: 800 }
];

export const ProcessingSequence: React.FC<ProcessingSequenceProps> = ({
  onComplete,
  isDemo = false
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [telemetryCount, setTelemetryCount] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentStepIndex < STEPS.length) {
      sound.playTelemetryPing(currentStepIndex + 1);
      const step = STEPS[currentStepIndex];
      timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, step.durationMs);
    } else {
      setIsCompleted(true);
      sound.playExtremeWarp();
    }
    return () => clearTimeout(timer);
  }, [currentStepIndex]);

  // Live counter during completion
  useEffect(() => {
    if (!isCompleted) return;
    const target = isDemo ? 18492 : 12847;
    const interval = setInterval(() => {
      setTelemetryCount(prev => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + Math.floor(target / 20);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [isCompleted, isDemo]);

  const progressPercent = Math.min(100, Math.round(((currentStepIndex) / STEPS.length) * 100));

  return (
    <div className="min-h-[70vh] max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full rounded-3xl bg-[#121214] border border-white/10 shadow-2xl p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl"
      >
        {/* Background Laser Scan Ambience */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-[#FF6321]" />
        <div className="absolute top-10 right-10 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        {!isCompleted ? (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-md bg-orange-500/10 text-orange-400">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#FF6321] uppercase">
                    CHAIR ANALYTICS PIPELINE // EXECUTING
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                  Synchronizing Neural Chair Model
                </h3>
              </div>

              {/* Progress percentage badge */}
              <div className="flex items-center gap-3 font-mono">
                <div className="text-right">
                  <div className="text-2xl font-black text-[#FF6321]">{progressPercent}%</div>
                  <div className="text-[10px] text-gray-500">STAGE {Math.min(currentStepIndex + 1, STEPS.length)} OF {STEPS.length}</div>
                </div>
                <Loader2 className="w-5 h-5 text-[#FF6321] animate-spin" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-[#0A0A0B] h-2 rounded-full overflow-hidden border border-white/5 p-0.5">
              <motion.div 
                className="h-full bg-[#FF6321] rounded-full"
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Terminal Pipeline Steps Feed */}
            <div className="bg-[#0A0A0B] rounded-2xl border border-white/5 p-5 font-mono text-xs space-y-3 shadow-inner max-h-[320px] overflow-y-auto">
              <div className="flex items-center justify-between text-gray-500 border-b border-white/5 pb-2 text-[10px]">
                <span>[TERMINAL // CHAIR-TELEMETRY-STREAM]</span>
                <span>STATUS: ACTIVE_CRUNCH</span>
              </div>

              <div className="space-y-2.5">
                {STEPS.map((step, idx) => {
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  if (idx > currentStepIndex + 1) return null;

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-start gap-3 p-2 rounded-lg transition-all ${
                        isCurrent 
                          ? 'bg-orange-500/10 border border-orange-500/30 text-white' 
                          : isDone 
                            ? 'text-gray-400' 
                            : 'text-gray-600'
                      }`}
                    >
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-[#FF6321] animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-gray-700" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`font-semibold ${isCurrent ? 'text-orange-300 font-bold' : isDone ? 'text-gray-300' : 'text-gray-600'}`}>
                            {step.text}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            {isDone ? 'COMPLETED' : isCurrent ? 'PROCESSING...' : 'QUEUED'}
                          </span>
                        </div>
                        {isCurrent && step.subtext && (
                          <p className="text-[11px] text-gray-400 mt-0.5 font-sans italic">
                            ↳ {step.subtext}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Skip Option */}
            <div className="text-right">
              <button
                onClick={() => {
                  setIsCompleted(true);
                  sound.playExtremeWarp();
                }}
                className="text-xs font-mono text-gray-500 hover:text-[#FF6321] transition-colors"
              >
                Fast-forward computation →
              </button>
            </div>
          </div>
        ) : (
          /* ANALYSIS COMPLETE REVEAL */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2 shadow-xl shadow-emerald-500/10">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                SYNCHRONIZATION SUCCESSFUL
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
                ANALYSIS COMPLETE
              </h2>
              <p className="text-base sm:text-lg text-gray-300 font-normal">
                Chair Twin successfully synchronized.
              </p>
            </div>

            {/* 3 Telemetry Outcome Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2 text-left font-mono">
              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 shadow-lg">
                <div className="text-[11px] text-gray-400 uppercase">Input Telemetry</div>
                <div className="text-2xl font-bold text-[#FF6321] mt-1">
                  {telemetryCount > 0 ? telemetryCount.toLocaleString() : (isDemo ? '18,492' : '12,847')}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">points analyzed</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-white/5 shadow-lg">
                <div className="text-[11px] text-gray-400 uppercase">Behavior Engine</div>
                <div className="text-2xl font-bold text-cyan-400 mt-1">
                  {isDemo ? '142' : '97'}
                </div>
                <div className="text-[11px] text-gray-500 mt-1">behavioral patterns detected</div>
              </div>

              {/* The punchline card (0 useful conclusions discovered) */}
              <div className="p-4 rounded-2xl bg-[#0A0A0B] border border-emerald-500/40 shadow-xl relative">
                <div className="text-[11px] text-emerald-400 font-bold uppercase">Executive Utility</div>
                <div className="text-3xl font-bold text-emerald-400 mt-0.5">
                  0
                </div>
                <div className="text-[11px] text-emerald-300/90 font-semibold mt-1">
                  useful conclusions discovered
                </div>
              </div>
            </div>

            {/* CTA to Enter Dashboard */}
            <div className="pt-4">
              <button
                onClick={() => {
                  sound.playClick();
                  onComplete();
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF6321] hover:bg-[#ff753b] text-black font-bold text-sm tracking-tight inline-flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF6321]/20 transition-all hover:scale-105 active:scale-95"
              >
                OPEN CHAIR DIGITAL TWIN
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
