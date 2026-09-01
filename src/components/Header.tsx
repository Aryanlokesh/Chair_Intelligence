import React from 'react';
import { 
  Armchair, 
  Volume2, 
  VolumeX, 
  Flame, 
  Sparkles, 
  Share2, 
  Terminal,
  Play
} from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  hackathonMode: boolean;
  setHackathonMode: (val: boolean) => void;
  onRunDemo: () => void;
  onCreateNewTwin: () => void;
  onOpenExtremeAnalysis: () => void;
  isAudioMuted: boolean;
  setIsAudioMuted: (muted: boolean) => void;
  currentStep: 'landing' | 'form' | 'processing' | 'dashboard';
}

export const Header: React.FC<HeaderProps> = ({
  hackathonMode,
  setHackathonMode,
  onRunDemo,
  onCreateNewTwin,
  onOpenExtremeAnalysis,
  isAudioMuted,
  setIsAudioMuted,
  currentStep
}) => {
  const toggleAudio = () => {
    const next = !isAudioMuted;
    setIsAudioMuted(next);
    sound.setMuted(next);
    if (!next) sound.playClick();
  };

  const copyShareLink = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Chair Intelligence digital twin link copied to clipboard!');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0A0B]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Title */}
        <div 
          onClick={onCreateNewTwin}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF6321] font-bold text-black text-sm tracking-tight shadow-md group-hover:scale-105 transition-transform">
            CI
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center">
                CHAIR INTELLIGENCE<span className="text-[#FF6321] text-xs align-top ml-0.5">™</span>
              </h1>
              <span className="hidden md:inline-flex rounded border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-orange-400">
                {hackathonMode ? 'HACKATHON MODE ACTIVE' : 'V4.2.0-STABLE'}
              </span>
            </div>
            <p className="text-[10px] font-mono text-gray-500 hidden sm:block">
              Fictional Ergonomic Telemetry & Behavioral Analytics
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4 text-sm text-gray-400">
          <span className="hidden xl:inline text-xs font-mono text-gray-500">V4.2.0-STABLE</span>

          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            title={isAudioMuted ? "Unmute sound effects" : "Mute sound effects"}
            className="p-1.5 rounded-lg border border-white/5 bg-[#121214] text-gray-400 hover:text-white hover:border-white/20 transition-colors"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FF6321]" />}
          </button>

          {/* Hackathon Mode Toggle Badge */}
          <button
            onClick={() => {
              setHackathonMode(!hackathonMode);
              sound.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1.5 border ${
              hackathonMode
                ? 'bg-orange-500/10 border-orange-500/40 text-orange-400 shadow-sm'
                : 'bg-[#121214] border-white/5 text-gray-400 hover:text-gray-200'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${hackathonMode ? 'text-orange-400 animate-bounce' : 'text-gray-500'}`} />
            <span className="hidden sm:inline">HACKATHON</span>
            <span className={`text-[10px] px-1 rounded ${hackathonMode ? 'bg-[#FF6321] text-black font-bold' : 'bg-white/10 text-gray-400'}`}>
              {hackathonMode ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Run Demo CTA */}
          <button
            onClick={() => {
              onRunDemo();
              sound.playClick();
            }}
            className="px-3 py-1.5 rounded-full bg-[#FF6321] hover:bg-[#ff753b] text-black font-bold text-xs font-sans transition-all flex items-center gap-1.5 shadow-md shadow-[#FF6321]/20 hover:scale-105 active:scale-95"
          >
            <Play className="w-3 h-3 fill-black text-black" />
            <span className="hidden md:inline">RUN DEMO</span>
            <span className="md:hidden">DEMO</span>
          </button>

          {/* Create / Reset Twin Button */}
          <button
            onClick={() => {
              onCreateNewTwin();
              sound.playClick();
            }}
            className="hidden sm:inline-flex rounded-full border border-[#FF6321] px-4 py-1.5 text-xs font-bold text-[#FF6321] transition hover:bg-[#FF6321] hover:text-black font-sans"
          >
            CREATE CHAIR TWIN →
          </button>

          {/* Share */}
          <button
            onClick={copyShareLink}
            title="Share Chair Twin"
            className="p-1.5 rounded-lg border border-white/5 bg-[#121214] text-gray-400 hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
