import {
  TelemetryFormData,
  ChairMetrics,
  ChairHealthData,
  ChairEvent,
  ChairPrediction,
  ExtremeAnalysisResult
} from '../types';

export const DEMO_PRESET: TelemetryFormData = {
  sittingDuration: '4+ hours',
  standUpCount: '1',
  startNowCount: '10+', // "23" in spirit
  currentTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  snacksCount: '4+', // "6" in spirit
  phoneChecksCount: '50+', // "87" in spirit
  chairModel: 'DormMesh Pro X-Treme (Pre-Damaged)',
  postureType: 'Acute Slump (45° Lumbar Deviation)'
};

export const DEEP_INSIGHTS = [
  "Your chair is statistically more committed to your education than you are.",
  "Based on 14,827 data points, we have determined that you spend a lot of time sitting.",
  "Your sitting pattern indicates that you are not currently sitting on the chair.",
  "The chair fabric has absorbed 3.4x more existential dread than the manufacturer's warranty covered.",
  "Cross-referencing snack intake and academic output yielded a correlation coefficient of NaN.",
  "The gas cylinder has developed an emotional dependency on your absence."
];

export function computeChairMetrics(input: TelemetryFormData, isDemo = false): ChairMetrics {
  let occupancy = 87.4;
  let stress = 92;
  let efficiency = 98.7;
  let productivity = 4.2;
  let snackDensity = 6.8;
  let standUpProb = 2.1;

  if (isDemo) {
    occupancy = 94.6;
    stress = 96;
    efficiency = 99.1;
    productivity = 2.4;
    snackDensity = 7.4;
    standUpProb = 0.8;
  } else {
    // Calculate based on inputs
    if (input.sittingDuration === '10 min') {
      occupancy = 45.2;
      stress = 28;
      efficiency = 65.4;
      productivity = 48.0;
    } else if (input.sittingDuration === '30 min') {
      occupancy = 62.1;
      stress = 54;
      efficiency = 82.0;
      productivity = 24.5;
    } else if (input.sittingDuration === '1 hour') {
      occupancy = 76.5;
      stress = 72;
      efficiency = 91.2;
      productivity = 14.8;
    } else if (input.sittingDuration === '2 hours') {
      occupancy = 84.8;
      stress = 85;
      efficiency = 96.3;
      productivity = 8.1;
    } else {
      occupancy = 92.4;
      stress = 94;
      efficiency = 98.9;
      productivity = 3.6;
    }

    // Stand ups modifier
    if (input.standUpCount === '0') {
      standUpProb = 1.4;
      stress += 4;
    } else if (input.standUpCount === '1') {
      standUpProb = 3.8;
    } else if (input.standUpCount === '2') {
      standUpProb = 8.2;
      stress -= 3;
    } else {
      standUpProb = 14.5;
      stress -= 6;
    }

    // Snacks modifier
    const snackCountMap: Record<string, number> = { '0': 0.2, '1': 1.8, '2': 3.4, '3': 5.1, '4+': 7.6 };
    snackDensity = snackCountMap[input.snacksCount] || 4.2;

    // Start now count modifier
    if (input.startNowCount === '10+') {
      productivity = Math.max(1.1, productivity - 6);
      stress += 5;
    } else if (input.startNowCount === '4–10') {
      productivity = Math.max(2.4, productivity - 3);
    }
  }

  // Cap bounds
  stress = Math.min(99, Math.max(12, stress));
  productivity = Math.min(95, Math.max(0.5, productivity));

  return {
    occupancy,
    occupancyQuote: occupancy > 80 ? "“You basically live here.”" : "“Moderate colonization of chair territory.”",
    chairStress: stress,
    chairStressQuote: stress > 75 ? "“The chair has seen things.”" : "“Cushion integrity still within tolerable agony.”",
    sittingEfficiency: efficiency,
    sittingEfficiencyQuote: "“Excellent sitting performance.”",
    productivity,
    productivityQuote: productivity < 10 ? "“Concerning.”" : "“Statistically negligible output detected.”",
    snackDensity,
    snackDensityQuote: snackDensity > 4 ? "“Your chair is becoming a dining facility.”" : "“Low crumb sedimentation recorded.”",
    standUpProbability: standUpProb,
    standUpProbabilityQuote: standUpProb < 5 ? "“Highly unlikely.”" : "“Gravitational escape velocity theoretical.”",
    telemetryPointsCount: isDemo ? 18492 : 12847,
    behavioralPatternsCount: isDemo ? 142 : 97,
    usefulConclusionsCount: 0,
    statusTitle: isDemo ? "“I HAVE CONCERNS.”" : "OVERWORKED BUT LOYAL",
    chairConfidence: 99.8,
    chairSatisfaction: isDemo ? 28 : 42,
    recommendation: isDemo ? "“PLEASE STAND UP. I AM BEGGING YOU.”" : "“STAND UP, BRO.”",
    deepInsight: DEEP_INSIGHTS[isDemo ? 0 : 2]
  };
}

export function computeChairHealth(stress: number): ChairHealthData {
  return {
    backrestFatigue: Math.min(98, Math.round(stress * 0.88)),
    seatPressure: Math.min(99, Math.round(stress * 1.02)),
    legStability: 99,
    emotionalStability: Math.max(4, Math.round(100 - stress * 0.9)),
    statusText: "CRITICALLY COMFORTABLE"
  };
}

export function generateInitialEvents(): ChairEvent[] {
  const baseTime = new Date();
  const formatT = (minusMinutes: number) => {
    const d = new Date(baseTime.getTime() - minusMinutes * 60000);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  return [
    {
      id: 'e1',
      timestamp: formatT(81),
      message: 'Student sat down.',
      category: 'sat',
      severity: 'normal'
    },
    {
      id: 'e2',
      timestamp: formatT(79),
      message: 'Phone detected (infinite scroll initialized).',
      category: 'phone',
      severity: 'warning'
    },
    {
      id: 'e3',
      timestamp: formatT(73),
      message: '“I’ll start now” detected (Confidence: 3.2%).',
      category: 'delay',
      severity: 'funny'
    },
    {
      id: 'e4',
      timestamp: formatT(59),
      message: 'Snack consumed (Crumb payload deposited in seat mesh).',
      category: 'snack',
      severity: 'normal'
    },
    {
      id: 'e5',
      timestamp: formatT(44),
      message: 'Student considered standing up.',
      category: 'movement',
      severity: 'warning'
    },
    {
      id: 'e6',
      timestamp: formatT(43.9),
      message: 'Standing cancelled (Gluteus lock sustained).',
      category: 'movement',
      severity: 'critical'
    },
    {
      id: 'e7',
      timestamp: formatT(18),
      message: 'Another browser tab opened (Tab #47: “How to lock in”).',
      category: 'tab',
      severity: 'funny'
    },
    {
      id: 'e8',
      timestamp: formatT(4),
      message: 'Productivity declined by 42% following notification buzz.',
      category: 'productivity',
      severity: 'critical'
    }
  ];
}

export function generateLiveEvent(): ChairEvent {
  const possibleMessages = [
    { msg: "Sigh frequency spiked +18% following IDE syntax error.", cat: 'chair', sev: 'warning' },
    { msg: "Chair squeak registered at 46.2 dB (Lumbar distress protocol active).", cat: 'chair', sev: 'critical' },
    { msg: "YouTube mini-player docked in bottom-right viewport corner.", cat: 'tab', sev: 'funny' },
    { msg: "Micro-shift detected: Left elbow now bearing 68% of body weight.", cat: 'movement', sev: 'normal' },
    { msg: "Subconscious desk stare duration exceeded 4 minutes.", cat: 'productivity', sev: 'warning' },
    { msg: "Second bag of crisps opened without ergonomic authorization.", cat: 'snack', sev: 'funny' },
    { msg: "“5 more minutes and I’m definitely locking in” whispered.", cat: 'delay', sev: 'funny' },
    { msg: "Thermal map indicates chair cushion has reached body temperature equilibrium.", cat: 'chair', sev: 'normal' }
  ];

  const chosen = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];
  const now = new Date();
  
  return {
    id: `live-${Date.now()}`,
    timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
    message: chosen.msg,
    category: chosen.cat as ChairEvent['category'],
    severity: chosen.sev as ChairEvent['severity']
  };
}

export function getPredictions(input: TelemetryFormData): ChairPrediction[] {
  const isHeavy = input.sittingDuration === '4+ hours' || input.sittingDuration === '2 hours';
  
  return [
    {
      label: "Probability you'll stand up in the next 10 minutes",
      probability: isHeavy ? 3.7 : 12.4,
      description: "Atmospheric and motivational drag near maximum threshold.",
      riskLevel: 'low'
    },
    {
      label: "Probability you'll say “5 more minutes”",
      probability: 98.4,
      description: "Linguistic reflex heavily reinforced across all preceding intervals.",
      riskLevel: 'certain'
    },
    {
      label: "Probability another snack will appear",
      probability: input.snacksCount === '0' ? 42.0 : 76.2,
      description: "Dormitory supply chain telemetry indicates imminent caloric delivery.",
      riskLevel: 'high'
    },
    {
      label: "Probability you'll actually start studying",
      probability: input.startNowCount === '10+' ? 4.1 : 11.3,
      description: "Sub-model trained on 2 million student intentions unable to converge.",
      riskLevel: 'low'
    },
    {
      label: "Probability your chair will outlive this semester",
      probability: 99.99,
      description: "Inanimate steel and plastic structural integrity exceeds human resolve.",
      riskLevel: 'certain'
    }
  ];
}

export function runExtremeAnalysis(): ExtremeAnalysisResult {
  return {
    compatibility: "14.2% (Trauma-Bonded Co-Dependence)",
    compatibilityScore: 14.2,
    personalityType: "Static Slouch Overthinker (Type 4B)",
    personalityDescription: "Demonstrates 89% spine curvature optimization for passive video consumption while maintaining active panic about impending deadlines.",
    snackCorrelation: "r = 0.994 (Direct Causal Crumb Sedimentation)",
    procrastinationCoefficient: "λ = 842.1 (Critical Inertia Limit Exceeded)",
    abandonmentProbability: "0.02% (You belong to the chair mesh now)",
    futureFiveMinEvents: 17,
    sleepProbability: 89.3,
    usefulnessScore: 0.0001
  };
}
