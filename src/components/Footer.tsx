import React, { useState } from 'react';
import { Armchair, Copy, Check, Sparkles, Terminal, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const [copiedTag, setCopiedTag] = useState<boolean>(false);

  const socialSnippet = `Check out CHAIR INTELLIGENCE™ — The world's most unnecessarily advanced digital twin of a chair! Built for BMSCE Databricks Hackathon 2026. @Databricks @Logitech @HackCulture`;

  const copyTags = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(socialSnippet);
      setCopiedTag(true);
      setTimeout(() => setCopiedTag(false), 2000);
    }
  };

  return (
    <footer className="w-full border-t border-white/5 bg-[#0A0A0B] text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="p-2.5 rounded-xl bg-[#121214] border border-[#FF6321]/30 text-[#FF6321]">
              <Armchair className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold text-white flex items-center gap-1.5 justify-center md:justify-start">
                CHAIR INTELLIGENCE<span className="text-[#FF6321] text-xs">™</span>
              </div>
              <p className="text-xs font-mono text-gray-400">
                The world's most unnecessarily advanced digital twin of a chair.
              </p>
            </div>
          </div>

          {/* Social Caption Helper */}
          <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
            <span className="text-gray-400">Social Tag:</span>
            <code className="bg-[#121214] px-3 py-1.5 rounded-lg border border-white/5 text-[#FF6321]">
              @Databricks @Logitech @HackCulture
            </code>
            <button
              onClick={copyTags}
              className="px-3 py-1.5 rounded-lg bg-[#18181B] hover:bg-[#202024] text-gray-200 border border-white/10 transition-colors flex items-center gap-1.5"
            >
              {copiedTag ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedTag ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Bottom Disclaimer and Hackathon Attribution */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400 text-center sm:text-left">
          <div className="space-y-1">
            <p className="font-bold text-gray-300">
              Built for the BMSCE Databricks Hackathon
            </p>
            <p className="text-[11px] text-gray-400">
              Fictional parody project. Not officially endorsed or sponsored by Databricks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#121214] border border-white/10 text-gray-300 font-semibold">
              Databricks Hackathon · BMSCE · 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
