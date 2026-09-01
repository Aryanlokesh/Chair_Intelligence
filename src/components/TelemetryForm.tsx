import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Footprints, 
  MessageSquareQuote, 
  Cookie, 
  Smartphone, 
  Sparkles, 
  ArrowRight, 
  Armchair, 
  Compass,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { 
  SittingDuration, 
  StandUpCount, 
  StartNowCount, 
  SnacksCount, 
  PhoneChecksCount, 
  TelemetryFormData 
} from '../types';
import { sound } from '../utils/audio';

interface TelemetryFormProps {
  onSubmit: (data: TelemetryFormData) => void;
  onCancel: () => void;
}

export const TelemetryForm: React.FC<TelemetryFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [sittingDuration, setSittingDuration] = useState<SittingDuration>('2 hours');
  const [standUpCount, setStandUpCount] = useState<StandUpCount>('1');
  const [startNowCount, setStartNowCount] = useState<StartNowCount>('4–10');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [snacksCount, setSnacksCount] = useState<SnacksCount>('2');
  const [phoneChecksCount, setPhoneChecksCount] = useState<PhoneChecksCount>('11–50');
  const [chairModel, setChairModel] = useState<string>('Dormitory Unbranded Mesh-Creaker 3000');
  const [postureType, setPostureType] = useState<string>('The 45° Procrastination Slump');

  useEffect(() => {
    // Automatically set current local time
    const now = new Date();
    const formatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    setCurrentTime(formatted);

    // Update time every minute
    const timer = setInterval(() => {
      const updated = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      setCurrentTime(updated);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    onSubmit({
      sittingDuration,
      standUpCount,
      startNowCount,
      currentTime: currentTime || '12:00 PM',
      snacksCount,
      phoneChecksCount,
      chairModel,
      postureType
    });
  };

  const sittingOptions: SittingDuration[] = ['10 min', '30 min', '1 hour', '2 hours', '4+ hours'];
  const standUpOptions: StandUpCount[] = ['0', '1', '2', '3+'];
  const startNowOptions: StartNowCount[] = ['0', '1–3', '4–10', '10+'];
  const snacksOptions: SnacksCount[] = ['0', '1', '2', '3', '4+'];
  const phoneOptions: PhoneChecksCount[] = ['0', '1–10', '11–50', '50+'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-mono font-bold">
          <Cpu className="w-3.5 h-3.5" />
          CALIBRATION STAGE // STEP 02
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-sans">
          CHAIR TELEMETRY CONFIGURATION
        </h2>
        <p className="text-sm sm:text-base text-gray-400 font-mono max-w-xl mx-auto">
          Input precise behavioral vectors to synchronize your physical chair with its digital counterpart.
        </p>
      </motion.div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Question 1: How long have you been sitting? */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="p-6 rounded-2xl bg-[#121214] border border-white/5 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                How long have you been sitting?
              </h3>
              <p className="text-xs font-mono text-gray-500">Duration of unbroken gluteus-to-cushion contact</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {sittingOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSittingDuration(opt);
                  sound.playClick();
                }}
                className={`py-3 px-3 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all border ${
                  sittingDuration === opt
                    ? 'bg-[#FF6321] text-black border-[#FF6321] shadow-lg shadow-[#FF6321]/20 font-bold scale-[1.02]'
                    : 'bg-[#18181B] text-gray-300 border-white/5 hover:border-white/20 hover:bg-[#202024]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Question 2: How many times have you stood up? */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-[#121214] border border-white/5 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Footprints className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                How many times have you stood up?
              </h3>
              <p className="text-xs font-mono text-gray-500">Vertical elevation events recorded so far</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {standUpOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setStandUpCount(opt);
                  sound.playClick();
                }}
                className={`py-3 px-3 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all border ${
                  standUpCount === opt
                    ? 'bg-[#FF6321] text-black border-[#FF6321] shadow-lg shadow-[#FF6321]/20 font-bold scale-[1.02]'
                    : 'bg-[#18181B] text-gray-300 border-white/5 hover:border-white/20 hover:bg-[#202024]'
                }`}
              >
                {opt} {opt === '1' ? 'time' : 'times'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Question 3: How many times have you said "I'll start now"? */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-6 rounded-2xl bg-[#121214] border border-white/5 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                How many times have you said “I’ll start now”?
              </h3>
              <p className="text-xs font-mono text-gray-500">Verbal declaration frequency vs actual execution</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {startNowOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setStartNowCount(opt);
                  sound.playClick();
                }}
                className={`py-3 px-3 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all border ${
                  startNowCount === opt
                    ? 'bg-[#FF6321] text-black border-[#FF6321] shadow-lg shadow-[#FF6321]/20 font-bold scale-[1.02]'
                    : 'bg-[#18181B] text-gray-300 border-white/5 hover:border-white/20 hover:bg-[#202024]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Question 4: Current Local Time (Automatic) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-[#121214] border border-white/5 shadow-xl space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Current Session Timestamp
                </h3>
                <p className="text-xs font-mono text-gray-500">Auto-detected from browser chronometer</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#18181B] px-4 py-2 rounded-xl border border-white/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <input
                type="text"
                value={currentTime}
                onChange={(e) => setCurrentTime(e.target.value)}
                className="bg-transparent font-mono text-sm text-emerald-400 font-bold focus:outline-none w-28"
              />
              <span className="text-[10px] font-mono text-gray-500">LOCAL</span>
            </div>
          </div>
        </motion.div>

        {/* Question 5: Snacks consumed while sitting */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="p-6 rounded-2xl bg-[#121214] border border-white/5 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Snacks consumed while sitting
              </h3>
              <p className="text-xs font-mono text-gray-500">Total crumb fallout and caloric fuel loaded into seat</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {snacksOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSnacksCount(opt);
                  sound.playClick();
                }}
                className={`py-3 px-3 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all border ${
                  snacksCount === opt
                    ? 'bg-[#FF6321] text-black border-[#FF6321] shadow-lg shadow-[#FF6321]/20 font-bold scale-[1.02]'
                    : 'bg-[#18181B] text-gray-300 border-white/5 hover:border-white/20 hover:bg-[#202024]'
                }`}
              >
                {opt} {opt === '1' ? 'snack' : 'snacks'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Question 6 (Optional): Number of times you checked your phone */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-[#121214] border border-white/5 shadow-xl space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Number of times you checked your phone
                </h3>
                <span className="text-[10px] font-mono uppercase bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                  Biometric Distraction
                </span>
              </div>
              <p className="text-xs font-mono text-gray-500">Micro-screen unlocks during intended work block</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {phoneOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setPhoneChecksCount(opt);
                  sound.playClick();
                }}
                className={`py-3 px-3 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all border ${
                  phoneChecksCount === opt
                    ? 'bg-[#FF6321] text-black border-[#FF6321] shadow-lg shadow-[#FF6321]/20 font-bold scale-[1.02]'
                    : 'bg-[#18181B] text-gray-300 border-white/5 hover:border-white/20 hover:bg-[#202024]'
                }`}
              >
                {opt} {opt === '0' ? 'checks' : 'times'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Optional Extra Hardware Specs */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-5 rounded-2xl bg-[#121214] border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono"
        >
          <div>
            <label className="text-gray-400 block mb-1.5 flex items-center gap-1.5 font-bold">
              <Armchair className="w-3.5 h-3.5 text-[#FF6321]" />
              CHAIR CHASSIS MODEL:
            </label>
            <select
              value={chairModel}
              onChange={(e) => setChairModel(e.target.value)}
              className="w-full bg-[#18181B] border border-white/10 rounded-xl px-3 py-2 text-gray-200 focus:outline-none focus:border-[#FF6321]"
            >
              <option value="Dormitory Unbranded Mesh-Creaker 3000">Dormitory Unbranded Mesh-Creaker 3000</option>
              <option value="Hand-Me-Down Ergonomic-Ish X-200">Hand-Me-Down Ergonomic-Ish X-200</option>
              <option value="Rigid Wooden Library Spine Decimator">Rigid Wooden Library Spine Decimator</option>
              <option value="Secretlab Imposter Pro with Cat Scratches">Secretlab Imposter Pro with Cat Scratches</option>
            </select>
          </div>

          <div>
            <label className="text-gray-400 block mb-1.5 flex items-center gap-1.5 font-bold">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              BIOMECHANICAL POSTURE:
            </label>
            <select
              value={postureType}
              onChange={(e) => setPostureType(e.target.value)}
              className="w-full bg-[#18181B] border border-white/10 rounded-xl px-3 py-2 text-gray-200 focus:outline-none focus:border-[#FF6321]"
            >
              <option value="The 45° Procrastination Slump">The 45° Procrastination Slump</option>
              <option value="Pretzel Leg Cross with 1 Elbow Resting">Pretzel Leg Cross with 1 Elbow Resting</option>
              <option value="Nearly Horizontal Spine (82° Deviation)">Nearly Horizontal Spine (82° Deviation)</option>
              <option value="Forward Shrimp Crouch (Exam Panic)">Forward Shrimp Crouch (Exam Panic)</option>
            </select>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4"
        >
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#121214] hover:bg-[#18181B] text-gray-400 hover:text-gray-200 font-mono text-xs border border-white/10 transition-colors"
          >
            ← Back to Home
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF6321] hover:bg-[#ff753b] text-black font-bold text-sm tracking-tight flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF6321]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            ANALYZE CHAIR TELEMETRY
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </form>
    </div>
  );
};
