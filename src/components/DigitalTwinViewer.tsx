import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCw, 
  Activity, 
  Flame, 
  Layers, 
  Eye, 
  Info,
  Maximize2,
  Cpu,
  Radio,
  Zap
} from 'lucide-react';
import { sound } from '../utils/audio';

interface SensorPoint {
  id: string;
  name: string;
  x: number; // percentage in view
  y: number;
  stress: number;
  metric: string;
  quote: string;
  status: 'normal' | 'stressed' | 'critical';
}

interface DigitalTwinViewerProps {
  chairStress: number;
  sittingDuration: string;
  isDemo?: boolean;
}

export const DigitalTwinViewer: React.FC<DigitalTwinViewerProps> = ({
  chairStress,
  sittingDuration,
  isDemo
}) => {
  const [rotation, setRotation] = useState<number>(24);
  const [activeLayer, setActiveLayer] = useState<'sensors' | 'heatmap' | 'wireframe' | 'all'>('all');
  const [selectedSensor, setSelectedSensor] = useState<SensorPoint | null>(null);
  const [isRotatingAuto, setIsRotatingAuto] = useState<boolean>(true);

  const sensors: SensorPoint[] = [
    {
      id: 'headrest',
      name: 'High-Density Mesh Backrest',
      x: 50,
      y: 22,
      stress: Math.min(98, Math.round(chairStress * 0.88)),
      metric: '81% Structural Creep',
      quote: 'Bearing the psychological weight of unfinished assignments.',
      status: chairStress > 75 ? 'critical' : 'stressed'
    },
    {
      id: 'lumbar',
      name: 'Lumbar Spine Decimator™ Sensor',
      x: 50,
      y: 42,
      stress: Math.min(99, Math.round(chairStress * 0.96)),
      metric: '92% Lordosis Deviation',
      quote: 'Vertebrae L4-L5 currently pleading for a 10-second stretch.',
      status: 'critical'
    },
    {
      id: 'armrest-left',
      name: 'Left Elbow Fulcrum Point',
      x: 28,
      y: 48,
      stress: 78,
      metric: '18.4 kg Asymmetric Lean',
      quote: 'Student chin resting entirely on this forearm.',
      status: 'stressed'
    },
    {
      id: 'seat-pan',
      name: 'Memory Foam (Loss of Memory) Pan',
      x: 50,
      y: 60,
      stress: Math.min(99, Math.round(chairStress * 1.04)),
      metric: '94% Compression Depth',
      quote: 'Zero elastic rebound remaining until tomorrow morning.',
      status: 'critical'
    },
    {
      id: 'gas-cylinder',
      name: 'Pneumatic Gas Lift Unit Class 4',
      x: 50,
      y: 74,
      stress: 68,
      metric: '3.4 MPa Hydrostatic Load',
      quote: 'Silently wondering why it was purchased at university auction.',
      status: 'normal'
    },
    {
      id: 'casters',
      name: '5-Star Nylon Caster Base',
      x: 50,
      y: 88,
      stress: 45,
      metric: '0.00 km/h Rolling Velocity',
      quote: 'Casters trapped in 2 years of dormitory carpet debris.',
      status: 'normal'
    }
  ];

  // Auto-rotate effect toggle
  React.useEffect(() => {
    if (!isRotatingAuto) return;
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isRotatingAuto]);

  const handleSelectSensor = (sensor: SensorPoint) => {
    sound.playClick();
    setSelectedSensor(prev => (prev?.id === sensor.id ? null : sensor));
  };

  // Color according to stress level
  const getStressColor = (s: number) => {
    if (s > 85) return '#FF6321'; // Sophisticated Dark accent orange
    if (s > 60) return '#f59e0b'; // amber-500
    return '#38bdf8'; // sky-400
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#121214] border border-white/5 overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-white/5 bg-[#18181B]">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                CHAIR TWIN // SENSOR MATRIX 01
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-ping" />
                LIVE SYNC
              </span>
            </div>
            <p className="text-[11px] font-mono text-gray-400">
              TELEMETRY: {sittingDuration} ACTIVE | 6 NODES ONLINE
            </p>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="flex items-center gap-1.5 bg-[#0A0A0B] p-1 rounded-xl border border-white/5">
          <button
            onClick={() => { setActiveLayer('all'); sound.playClick(); }}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
              activeLayer === 'all'
                ? 'bg-[#FF6321] text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-3 h-3" /> All Telemetry
          </button>
          <button
            onClick={() => { setActiveLayer('heatmap'); sound.playClick(); }}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
              activeLayer === 'heatmap'
                ? 'bg-[#FF6321] text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Flame className="w-3 h-3" /> Stress Heatmap
          </button>
          <button
            onClick={() => { setActiveLayer('wireframe'); sound.playClick(); }}
            className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all flex items-center gap-1.5 ${
              activeLayer === 'wireframe'
                ? 'bg-[#FF6321] text-black font-bold shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3" /> Wireframe
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative w-full h-[440px] sm:h-[490px] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(255,99,33,0.06),#0A0A0B_70%)]">
        {/* Background Coordinate Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />
        
        {/* Futuristic Laser Radar Circles */}
        <div className="absolute w-72 h-72 rounded-full border border-orange-500/10 pointer-events-none animate-pulse-slow" />
        <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute w-[560px] h-[560px] rounded-full border border-dashed border-white/5 pointer-events-none" />
        
        {/* Scanning horizontal line */}
        <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[#FF6321]/10 to-transparent pointer-events-none animate-scanline" />

        {/* 3D Holographic Chair Render Container */}
        <div 
          className="relative w-[340px] h-[380px] sm:w-[380px] sm:h-[420px] flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${(rotation % 360) - 180}deg) rotateX(10deg)`
          }}
        >
          {/* Animated SVG Chair Digital Twin */}
          <svg
            viewBox="0 0 320 380"
            className="w-full h-full drop-shadow-[0_15px_30px_rgba(255,99,33,0.15)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Holographic Ring Base Ground Projection */}
            <ellipse
              cx="160"
              cy="340"
              rx="110"
              ry="24"
              className="fill-orange-500/5 stroke-orange-500/30 stroke-[1.5] stroke-dasharray-[4_4]"
            />
            <ellipse
              cx="160"
              cy="340"
              rx="60"
              ry="12"
              className="stroke-white/10 stroke-[1]"
            />

            {/* 5-Star Caster Base Legs */}
            <g className="stroke-gray-500 stroke-[4] stroke-linecap-round opacity-90">
              <line x1="160" y1="310" x2="70" y2="340" />
              <line x1="160" y1="310" x2="250" y2="340" />
              <line x1="160" y1="310" x2="110" y2="352" />
              <line x1="160" y1="310" x2="210" y2="352" />
              <line x1="160" y1="310" x2="160" y2="358" />
            </g>

            {/* Caster Wheel Nodes */}
            <circle cx="70" cy="340" r="6" className="fill-[#121214] stroke-[#FF6321] stroke-2" />
            <circle cx="250" cy="340" r="6" className="fill-[#121214] stroke-[#FF6321] stroke-2" />
            <circle cx="110" cy="352" r="5" className="fill-[#121214] stroke-gray-500 stroke-2" />
            <circle cx="210" cy="352" r="5" className="fill-[#121214] stroke-gray-500 stroke-2" />
            <circle cx="160" cy="358" r="5" className="fill-[#121214] stroke-cyan-400 stroke-2" />

            {/* Center Gas Cylinder */}
            <rect
              x="154"
              y="245"
              width="12"
              height="65"
              rx="4"
              className="fill-gray-800 stroke-gray-600 stroke-2"
            />
            <line x1="160" y1="245" x2="160" y2="310" className="stroke-gray-400 stroke-1 stroke-dasharray-[2_2]" />

            {/* Seat Pan Bracket & Mechanism */}
            <polygon
              points="125,245 195,245 180,230 140,230"
              className="fill-gray-800 stroke-gray-600 stroke-2"
            />

            {/* SEAT CUSHION with Stress Heatmap Gradient */}
            <defs>
              <linearGradient id="seatStressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={activeLayer === 'wireframe' ? 'transparent' : '#FF6321'} stopOpacity="0.85" />
                <stop offset="50%" stopColor={activeLayer === 'wireframe' ? 'transparent' : '#ea580c'} stopOpacity="0.95" />
                <stop offset="100%" stopColor={activeLayer === 'wireframe' ? 'transparent' : '#c2410c'} stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="backrestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={activeLayer === 'wireframe' ? 'transparent' : '#18181B'} stopOpacity="0.8" />
                <stop offset="60%" stopColor={activeLayer === 'wireframe' ? 'transparent' : '#27272A'} stopOpacity="0.9" />
                <stop offset="100%" stopColor={activeLayer === 'wireframe' ? 'transparent' : '#FF6321'} stopOpacity="0.4" />
              </linearGradient>

              <pattern id="meshPattern" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M 0 3 L 6 3 M 3 0 L 3 6" className="stroke-white/10 stroke-[0.7]" />
              </pattern>
            </defs>

            {/* Seat Pan 3D Isometric Base */}
            <path
              d="M 65 210 Q 160 235 255 210 Q 260 225 240 235 Q 160 252 80 235 Q 60 225 65 210 Z"
              fill="url(#seatStressGradient)"
              className="stroke-[#FF6321] stroke-2 shadow-lg"
            />
            {/* Top Seat Surface */}
            <path
              d="M 75 195 Q 160 180 245 195 Q 260 215 245 225 Q 160 240 75 225 Q 60 215 75 195 Z"
              className={
                activeLayer === 'heatmap'
                  ? "fill-orange-500/90 stroke-orange-300 stroke-2 animate-pulse"
                  : "fill-[#121214] stroke-[#FF6321]/80 stroke-2"
              }
            />

            {/* Seat Pressure Sensor Grid */}
            <path
              d="M 100 205 Q 160 195 220 205 M 95 215 Q 160 205 225 215 M 130 198 Q 130 225 130 225 M 160 192 Q 160 228 160 228 M 190 198 Q 190 225 190 225"
              className="stroke-[#FF6321]/60 stroke-1 stroke-dasharray-[2_2]"
            />

            {/* Left & Right Armrests */}
            {/* Left Armrest */}
            <path
              d="M 60 150 L 85 150 L 80 210 L 70 210 Z"
              className="fill-gray-800/80 stroke-gray-600 stroke-2"
            />
            <rect
              x="50"
              y="142"
              width="42"
              height="12"
              rx="4"
              className="fill-[#18181B] stroke-[#FF6321]/70 stroke-2"
            />

            {/* Right Armrest */}
            <path
              d="M 260 150 L 235 150 L 240 210 L 250 210 Z"
              className="fill-gray-800/80 stroke-gray-600 stroke-2"
            />
            <rect
              x="228"
              y="142"
              width="42"
              height="12"
              rx="4"
              className="fill-[#18181B] stroke-[#FF6321]/70 stroke-2"
            />

            {/* BACKREST Spine Connection Rod */}
            <rect
              x="154"
              y="90"
              width="12"
              height="115"
              rx="6"
              className="fill-gray-800 stroke-gray-600 stroke-2"
            />

            {/* Lumbar Support Bar */}
            <path
              d="M 95 145 Q 160 155 225 145"
              className="stroke-[#FF6321] stroke-[5] stroke-linecap-round fill-none"
            />
            <path
              d="M 105 145 Q 160 158 215 145"
              className="stroke-cyan-400 stroke-1 stroke-dasharray-[3_2] fill-none"
            />

            {/* BACKREST MAIN FRAME */}
            <path
              d="M 90 70 Q 160 55 230 70 Q 240 135 225 180 Q 160 190 95 180 Q 80 135 90 70 Z"
              fill="url(#backrestGradient)"
              className="stroke-[#FF6321]/80 stroke-2"
            />
            {/* Mesh Texture Overlay */}
            <path
              d="M 95 75 Q 160 62 225 75 Q 235 132 220 175 Q 160 184 100 175 Q 86 132 95 75 Z"
              fill="url(#meshPattern)"
              className="opacity-75"
            />

            {/* Headrest Node (Top) */}
            <rect
              x="120"
              y="32"
              width="80"
              height="26"
              rx="8"
              className="fill-[#18181B] stroke-[#FF6321] stroke-2"
            />
            <line x1="160" y1="58" x2="160" y2="70" className="stroke-gray-600 stroke-2" />
          </svg>

          {/* Interactive Sensor Target Overlay Nodes */}
          {(activeLayer === 'all' || activeLayer === 'sensors' || activeLayer === 'heatmap') &&
            sensors.map((sensor) => {
              const isSelected = selectedSensor?.id === sensor.id;
              const color = getStressColor(sensor.stress);

              return (
                <div
                  key={sensor.id}
                  onClick={() => handleSelectSensor(sensor)}
                  style={{
                    left: `${sensor.x}%`,
                    top: `${sensor.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className="absolute cursor-pointer group z-20"
                >
                  {/* Ping ring */}
                  <div
                    className="absolute -inset-2 rounded-full opacity-60 animate-ping"
                    style={{ backgroundColor: color }}
                  />

                  {/* Sensor button node */}
                  <div
                    className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                      isSelected
                        ? 'scale-125 ring-4 ring-orange-500/40 bg-[#0A0A0B] border-[#FF6321]'
                        : 'bg-[#121214] hover:scale-110'
                    }`}
                    style={{ borderColor: color }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  {/* Mini Hover Label */}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 hidden group-hover:flex items-center px-2 py-0.5 rounded bg-[#0A0A0B] border border-white/10 text-[10px] font-mono text-gray-200 whitespace-nowrap pointer-events-none z-30 shadow-xl">
                    {sensor.name} • {sensor.stress}%
                  </div>
                </div>
              );
            })}
        </div>

        {/* Interactive Selected Sensor Detail Drawer / Card */}
        <AnimatePresence>
          {selectedSensor && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 p-4 rounded-2xl bg-[#18181B] border border-[#FF6321]/40 shadow-2xl backdrop-blur-xl z-40"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF6321] animate-ping" />
                  <h4 className="text-xs font-mono font-bold text-[#FF6321] uppercase tracking-wider">
                    {selectedSensor.name}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedSensor(null)}
                  className="text-gray-400 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">Stress Load</span>
                  <span className="text-[#FF6321] font-bold">{selectedSensor.stress}% FATIGUE</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-gray-400">Diagnostic</span>
                  <span className="text-cyan-300">{selectedSensor.metric}</span>
                </div>
                <p className="text-[11px] text-gray-300 italic pt-1 border-t border-white/5 leading-relaxed font-sans">
                  {selectedSensor.quote}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Vector Telemetry Corner HUD Elements */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-gray-400 space-y-1 bg-[#0A0A0B]/80 p-2.5 rounded-xl border border-white/5 backdrop-blur-sm pointer-events-none">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Cpu className="w-3 h-3" /> TWIN COORDINATES
          </div>
          <div>YAW: {Math.round(rotation)}° | PITCH: 14.1°</div>
          <div>LOAD CAPACITY: 120.0 kg</div>
          <div>CUSHION TEMP: 36.8°C (HUMAN EQUILIBRIUM)</div>
        </div>

        <div className="absolute top-4 right-4 font-mono text-[10px] text-right text-gray-400 space-y-1 bg-[#0A0A0B]/80 p-2.5 rounded-xl border border-white/5 backdrop-blur-sm pointer-events-none">
          <div className="flex items-center justify-end gap-1.5 text-[#FF6321] font-semibold">
            <Zap className="w-3 h-3" /> STRESS PROTOCOL
          </div>
          <div className="text-orange-300 font-bold">STATUS: {chairStress > 80 ? 'CRITICAL ABUSE' : 'ACCEPTABLE'}</div>
          <div>CRUMB SEDIMENT: ACTIVE</div>
          <div>REBOUND FACTOR: 0.04</div>
        </div>
      </div>

      {/* Interactive Bottom Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 border-t border-white/5 bg-[#18181B] text-xs font-mono text-gray-400">
        <div className="flex items-center gap-3 flex-1 min-w-[200px]">
          <span className="text-[11px] text-gray-400">ROTATE TWIN:</span>
          <input
            type="range"
            min="0"
            max="360"
            value={Math.round(rotation)}
            onChange={(e) => {
              setIsRotatingAuto(false);
              setRotation(Number(e.target.value));
            }}
            className="w-full h-1.5 bg-[#0A0A0B] rounded-lg appearance-none cursor-pointer accent-[#FF6321]"
          />
          <span className="text-[#FF6321] font-bold w-10 text-right">{Math.round(rotation)}°</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsRotatingAuto(!isRotatingAuto);
              sound.playClick();
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              isRotatingAuto
                ? 'bg-[#121214] border-white/5 text-gray-200'
                : 'bg-orange-500/10 border-orange-500/30 text-orange-400'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotatingAuto ? 'animate-spin' : ''}`} />
            {isRotatingAuto ? 'Pause Orbit' : 'Auto Orbit'}
          </button>

          <button
            onClick={() => {
              setRotation(24);
              setSelectedSensor(sensors[1]);
              sound.playClick();
            }}
            className="px-3 py-1.5 rounded-lg bg-[#121214] hover:bg-[#202024] border border-white/5 text-gray-300 transition-all"
          >
            Inspect Lumbar
          </button>
        </div>
      </div>
    </div>
  );
};
