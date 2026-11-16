export type CourseDay = 1 | 2;

export type CompetencyId =
  | 'classification'
  | 'accounting'
  | 'audit'
  | 'capex-planning'
  | 'opex-planning'
  | 'tco-forecasting';

export type LevelMechanic =
  | 'classifier'
  | 'trinity-lab'
  | 'audit-detector'
  | 'stage-gate-sim'
  | 'opex-optimizer'
  | 'tco-iceberg'
  | 'rolling-cockpit';

export interface ClassifierStep {
  id: string;
  kind: 'classifier';
  title: string;
  department: string;
  amountSar: string;
  usefulLife: string;
  scenario: string;
  correctAnswer: 'CAPEX' | 'OPEX';
  subLabel: string;
  hint: string;
  explanation: string;
  takeaway: string;
}

export interface QuizOption {
  id: string;
  label: string;
  detail?: string;
}

export interface MultiChoiceStep {
  id: string;
  kind: 'choice';
  badgeText: string;
  prompt: string;
  contextBox?: {
    title: string;
    metrics: { label: string; value: string }[];
  };
  options: QuizOption[];
  correctOptionId: string;
  hint: string;
  explanation: string;
  takeaway: string;
}

export interface AuditStep {
  id: string;
  kind: 'audit';
  ledgerId: string;
  department: string;
  proposedEntry: string;
  bookedAs: 'CAPEX' | 'OPEX';
  amountSar: string;
  evidenceNote: string;
  isViolation: boolean;
  options: QuizOption[];
  correctOptionId: string;
  hint: string;
  explanation: string;
  takeaway: string;
}

export interface SliderLabStep {
  id: string;
  kind: 'slider-lab';
  title: string;
  prompt: string;
  visualType: 's-curve' | 'tco-iceberg' | 'opex-zbb' | 'rolling-forecast';
  sliders: {
    id: string;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    targetMin: number;
    targetMax: number;
  }[];
  hint: string;
  explanation: string;
  takeaway: string;
}

export type LevelStep = ClassifierStep | MultiChoiceStep | AuditStep | SliderLabStep;

export interface LevelConfig {
  id: number;
  day: CourseDay;
  moduleName: string;
  topicTag: string;
  title: string;
  subtitle: string;
  mechanic: LevelMechanic;
  competency: CompetencyId;
  accentColor: 'blue' | 'emerald' | 'amber' | 'rose' | 'teal' | 'indigo';
  estimatedMinutes: number;
  xpReward: number;
  briefing: {
    objective: string;
    howToPlay: string[];
    keyRules: { title: string; summary: string }[];
  };
  steps: LevelStep[];
}

export interface LevelCompletion {
  levelId: number;
  stars: 1 | 2 | 3;
  bestAccuracy: number;
  latestAccuracy?: number;
  xpEarned: number;
  completedAt: string;
  attempts: number;
  timeSpentSeconds?: number;
}

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  day: CourseDay | 'both';
  color: 'emerald' | 'blue' | 'amber' | 'rose';
}

export interface StudentProgress {
  studentName: string;
  studentIdOrGroup?: string;
  profileConfirmed?: boolean;
  xp: number;
  streak: number;
  bestStreak: number;
  totalAnswered: number;
  totalCorrect: number;
  totalTimeSeconds: number;
  completedLevels: Record<number, LevelCompletion>;
  unlockedBadges: string[];
  instructorUnlockAll: boolean;
  soundEnabled: boolean;
}

export interface FieldGuideEntry {
  id: string;
  day: CourseDay;
  category: string;
  title: string;
  formulaOrRule: string;
  summary: string;
  railExample: string;
}

export type AppView = 'dashboard' | 'day1' | 'day2' | 'guide' | 'play';
