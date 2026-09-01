export type SittingDuration = '10 min' | '30 min' | '1 hour' | '2 hours' | '4+ hours';
export type StandUpCount = '0' | '1' | '2' | '3+';
export type StartNowCount = '0' | '1–3' | '4–10' | '10+';
export type SnacksCount = '0' | '1' | '2' | '3' | '4+';
export type PhoneChecksCount = '0' | '1–10' | '11–50' | '50+';

export interface TelemetryFormData {
  sittingDuration: SittingDuration;
  standUpCount: StandUpCount;
  startNowCount: StartNowCount;
  currentTime: string;
  snacksCount: SnacksCount;
  phoneChecksCount: PhoneChecksCount;
  chairModel?: string;
  postureType?: string;
}

export interface ChairHealthData {
  backrestFatigue: number; // e.g. 81
  seatPressure: number; // e.g. 94
  legStability: number; // e.g. 99
  emotionalStability: number; // e.g. 18
  statusText: string; // "CRITICALLY COMFORTABLE"
}

export interface ChairMetrics {
  occupancy: number; // 87.4%
  occupancyQuote: string;
  chairStress: number; // 92%
  chairStressQuote: string;
  sittingEfficiency: number; // 98.7%
  sittingEfficiencyQuote: string;
  productivity: number; // 4.2%
  productivityQuote: string;
  snackDensity: number; // 6.8 snacks/hour
  snackDensityQuote: string;
  standUpProbability: number; // 2.1%
  standUpProbabilityQuote: string;
  
  telemetryPointsCount: number; // 12,847
  behavioralPatternsCount: number; // 97
  usefulConclusionsCount: number; // 0
  
  statusTitle: string; // "OVERWORKED BUT LOYAL" or "I HAVE CONCERNS"
  chairConfidence: number; // 99.8%
  chairSatisfaction: number; // 42%
  recommendation: string; // "STAND UP, BRO." or "Please stand up. I am begging you."
  
  deepInsight: string;
}

export interface ChairEvent {
  id: string;
  timestamp: string;
  message: string;
  category: 'sat' | 'phone' | 'delay' | 'snack' | 'movement' | 'tab' | 'productivity' | 'chair';
  severity?: 'normal' | 'warning' | 'critical' | 'funny';
}

export interface ChairPrediction {
  label: string;
  probability: number;
  description: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'certain';
}

export interface ExtremeAnalysisResult {
  compatibility: string;
  compatibilityScore: number;
  personalityType: string;
  personalityDescription: string;
  snackCorrelation: string;
  procrastinationCoefficient: string;
  abandonmentProbability: string;
  futureFiveMinEvents: number;
  sleepProbability: number;
  usefulnessScore: number; // 0.0001%
}
