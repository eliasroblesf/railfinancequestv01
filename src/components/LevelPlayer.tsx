import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  FileDown,
  FileSearch,
  Flame,
  HelpCircle,
  Layers,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Star,
  TrendingUp,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BADGES } from '../data/courseData';
import {
  AuditStep,
  ClassifierStep,
  LevelCompletion,
  LevelConfig,
  LevelStep,
  MultiChoiceStep,
  SliderLabStep,
} from '../types/game';
import { formatDuration } from '../utils/pdfReport';
import { soundEngine } from '../utils/sound';
import { InteractiveVisuals } from './InteractiveVisuals';

export interface LevelCompletionResult {
  levelId: number;
  correctCount: number;
  totalSteps: number;
  accuracy: number;
  stars: 1 | 2 | 3;
  xpEarned: number;
  maxSessionStreak: number;
  timeSpentSeconds: number;
  newlyUnlockedBadgeIds: string[];
}

interface StepRecord {
  selectedAnswer: string | null;
  sliderValues: Record<string, number>;
  isCorrect: boolean;
}

interface LevelPlayerProps {
  level: LevelConfig;
  existingCompletion?: LevelCompletion;
  hasNextLevel: boolean;
  onCompleteLevel: (
    levelId: number,
    correctCount: number,
    totalSteps: number,
    maxSessionStreak: number,
    timeSpentSeconds: number,
  ) => LevelCompletionResult;
  onDownloadPdf: () => string;
  onExit: () => void;
  onGoToNextLevel: () => void;
}

type Phase = 'briefing' | 'playing' | 'summary';

function initSliderState(step: LevelStep): Record<string, number> {
  if (step.kind !== 'slider-lab') return {};
  const map: Record<string, number> = {};
  for (const s of step.sliders) {
    map[s.id] = s.defaultValue;
  }
  return map;
}

export const LevelPlayer: React.FC<LevelPlayerProps> = ({
  level,
  existingCompletion,
  hasNextLevel,
  onCompleteLevel,
  onDownloadPdf,
  onExit,
  onGoToNextLevel,
}) => {
  const [phase, setPhase] = useState<Phase>('briefing');
  const [stepIndex, setStepIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Per-step interaction & history records (lets students review previous steps)
  const [stepRecords, setStepRecords] = useState<Record<number, StepRecord>>({});
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(() =>
    initSliderState(level.steps[0]),
  );

  // Session score & timer tracking
  const [sessionStreak, setSessionStreak] = useState(0);
  const [maxSessionStreak, setMaxSessionStreak] = useState(0);
  const [secondsSpent, setSecondsSpent] = useState(0);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [completionResult, setCompletionResult] =
    useState<LevelCompletionResult | null>(null);
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);

  const currentStep = level.steps[stepIndex];
  const currentRecord = stepRecords[stepIndex];
  const hasSubmittedStep = Boolean(currentRecord);
  const selectedAnswer = currentRecord?.selectedAnswer ?? null;
  const stepCorrect = currentRecord?.isCorrect ?? false;

  const activeSliderValues = currentRecord
    ? currentRecord.sliderValues
    : sliderValues;

  // Reset entire player cleanly when level changes
  useEffect(() => {
    setPhase('briefing');
    setStepIndex(0);
    setShowHint(false);
    setStepRecords({});
    setSliderValues(initSliderState(level.steps[0]));
    setSessionStreak(0);
    setMaxSessionStreak(0);
    setSecondsSpent(0);
    setConfirmRestart(false);
    setCompletionResult(null);
    setDownloadedFile(null);
  }, [level.id]);

  // Active stage study timer
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = window.setInterval(() => {
      setSecondsSpent((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase]);

  const recordOutcome = (
    answer: string | null,
    slidersSnapshot: Record<string, number>,
    isCorrect: boolean,
  ) => {
    setStepRecords((prev) => ({
      ...prev,
      [stepIndex]: {
        selectedAnswer: answer,
        sliderValues: slidersSnapshot,
        isCorrect,
      },
    }));

    if (isCorrect) {
      soundEngine.playCorrect();
      setSessionStreak((s) => {
        const next = s + 1;
        setMaxSessionStreak((m) => Math.max(m, next));
        return next;
      });
    } else {
      soundEngine.playIncorrect();
      setSessionStreak(0);
    }
  };

  const handleClassifierPick = (pick: 'CAPEX' | 'OPEX', step: ClassifierStep) => {
    if (hasSubmittedStep) return;
    recordOutcome(pick, {}, pick === step.correctAnswer);
  };

  const handleOptionPick = (
    optionId: string,
    step: MultiChoiceStep | AuditStep,
  ) => {
    if (hasSubmittedStep) return;
    recordOutcome(optionId, {}, optionId === step.correctOptionId);
  };

  const handleSliderSubmit = (step: SliderLabStep) => {
    if (hasSubmittedStep) return;
    const allWithinTarget = step.sliders.every((slider) => {
      const val = sliderValues[slider.id] ?? slider.defaultValue;
      return val >= slider.targetMin && val <= slider.targetMax;
    });
    recordOutcome('slider-checked', { ...sliderValues }, allWithinTarget);
  };

  const jumpToStep = (targetIdx: number) => {
    soundEngine.playClick();
    setStepIndex(targetIdx);
    setShowHint(false);
    if (!stepRecords[targetIdx]) {
      setSliderValues(initSliderState(level.steps[targetIdx]));
    }
  };

  const handleNextStep = () => {
    soundEngine.playClick();
    if (stepIndex + 1 < level.steps.length) {
      jumpToStep(stepIndex + 1);
    } else {
      const totalCorrectInRun = Object.values(stepRecords).filter(
        (r) => r.isCorrect,
      ).length;
      const result = onCompleteLevel(
        level.id,
        totalCorrectInRun,
        level.steps.length,
        maxSessionStreak,
        secondsSpent,
      );
      setCompletionResult(result);
      soundEngine.playLevelComplete();
      setPhase('summary');
    }
  };

  const handleRetryLevel = () => {
    soundEngine.playClick();
    setPhase('playing');
    setStepIndex(0);
    setShowHint(false);
    setStepRecords({});
    setSliderValues(initSliderState(level.steps[0]));
    setSessionStreak(0);
    setMaxSessionStreak(0);
    setSecondsSpent(0);
    setConfirmRestart(false);
    setCompletionResult(null);
    setDownloadedFile(null);
  };

  const handlePdfClick = () => {
    soundEngine.playClick();
    const savedName = onDownloadPdf();
    setDownloadedFile(savedName);
  };

  // Tallies across answered steps so far
  const answeredCount = Object.keys(stepRecords).length;
  const correctSoFar = Object.values(stepRecords).filter((r) => r.isCorrect).length;
  const capexRoutedCount = Object.values(stepRecords).filter(
    (r) => r.selectedAnswer === 'CAPEX',
  ).length;
  const opexRoutedCount = Object.values(stepRecords).filter(
    (r) => r.selectedAnswer === 'OPEX',
  ).length;

  // =========================================================================
  // PHASE 1: BRIEFING
  // =========================================================================
  if (phase === 'briefing') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-10">
        <button
          type="button"
          onClick={onExit}
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Day {level.day} · {level.moduleName} · {level.steps.length} Steps · {level.xpReward} XP
            </div>
            <h1 className="font-display mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
              Stage {level.id}: {level.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              {level.subtitle}
            </p>
            {existingCompletion && (
              <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3.5 py-2 text-xs font-bold text-emerald-900 font-mono-num">
                <span>
                  Current Best Score: {existingCompletion.bestAccuracy}% ({existingCompletion.stars}/3 Stars) · {existingCompletion.attempts} {existingCompletion.attempts === 1 ? 'Try' : 'Tries'}
                </span>
              </div>
            )}
          </div>

          {/* Clear Objective */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 sm:p-5">
            <h2 className="font-display text-sm font-extrabold uppercase tracking-wider text-blue-900">
              Your Objective
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-slate-800 leading-relaxed">
              {level.briefing.objective}
            </p>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h2 className="font-display text-base font-bold text-slate-900 mb-3">
              How to Play
            </h2>
            <ol className="space-y-2.5">
              {level.briefing.howToPlay.map((instruction, idx) => (
                <li
                  key={instruction}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-sm text-slate-700"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-600 font-display text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Key Rules Reference */}
          <div>
            <h2 className="font-display text-base font-bold text-slate-900 mb-3">
              Key Rules Before You Start
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {level.briefing.keyRules.map((rule) => (
                <div
                  key={rule.title}
                  className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4"
                >
                  <div className="text-sm font-bold text-emerald-950">
                    {rule.title}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {rule.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-200">
            <div className="text-xs font-medium text-slate-500 font-mono-num">
              Estimated: ~{level.estimatedMinutes} min · You can retry this stage anytime
            </div>
            <button
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setPhase('playing');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98] cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{existingCompletion ? `Retry Stage ${level.id}` : `Start Stage ${level.id}`}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // PHASE 3: SUMMARY
  // =========================================================================
  if (phase === 'summary' && completionResult) {
    const unlockedBadgeObjects = BADGES.filter((b) =>
      completionResult.newlyUnlockedBadgeIds.includes(b.id),
    );
    const isFinalStage = !hasNextLevel;

    return (
      <div className="mx-auto max-w-3xl px-4 py-5 sm:px-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm space-y-6"
        >
          <div className="text-center space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Stage {level.id} Complete · {level.title}
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              {completionResult.stars === 3
                ? 'Outstanding Mastery!'
                : completionResult.stars === 2
                  ? 'Great Progress!'
                  : 'Stage Cleared!'}
            </h1>
            <p className="text-sm text-slate-600">
              {completionResult.accuracy < 100
                ? 'Want an even higher score? Click Retry Stage below anytime to improve your percentage and stars.'
                : 'Perfect 100% score achieved on this stage!'}
            </p>

            {/* Stars Display */}
            <div className="flex items-center justify-center gap-2 pt-1">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`h-10 w-10 transition-transform ${
                    s <= completionResult.stars
                      ? 'fill-amber-400 text-amber-500 scale-105'
                      : 'text-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Result Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-center">
              <div className="text-xs font-bold text-blue-800">Accuracy</div>
              <div className="mt-1 font-display text-2xl font-extrabold text-slate-900 font-mono-num">
                {completionResult.accuracy}%
              </div>
              <div className="text-xs text-slate-600 font-mono-num">
                {completionResult.correctCount}/{completionResult.totalSteps} steps
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-center">
              <div className="text-xs font-bold text-amber-800">XP Earned</div>
              <div className="mt-1 font-display text-2xl font-extrabold text-slate-900 font-mono-num">
                +{completionResult.xpEarned}
              </div>
              <div className="text-xs text-slate-600">Experience</div>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 text-center">
              <div className="text-xs font-bold text-rose-800">Top Streak</div>
              <div className="mt-1 font-display text-2xl font-extrabold text-slate-900 font-mono-num">
                {completionResult.maxSessionStreak}
              </div>
              <div className="text-xs text-slate-600">In a row</div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-center">
              <div className="text-xs font-bold text-emerald-800">Stage Time</div>
              <div className="mt-1 font-display text-xl sm:text-2xl font-extrabold text-slate-900 font-mono-num">
                {formatDuration(completionResult.timeSpentSeconds)}
              </div>
              <div className="text-xs text-slate-600">Active time</div>
            </div>
          </div>

          {/* Newly Unlocked Badges */}
          {unlockedBadgeObjects.length > 0 && (
            <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                <Award className="h-4 w-4 text-amber-600" />
                <span>New Badge Unlocked!</span>
              </div>
              {unlockedBadgeObjects.map((badge) => (
                <div key={badge.id} className="text-sm text-slate-800">
                  <strong className="font-bold">{badge.title}:</strong> {badge.description}
                </div>
              ))}
            </div>
          )}

          {/* Final PDF Score Report CTA Banner */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-800">
                {isFinalStage ? 'Course Complete — Ready to Submit' : 'Progress Score Report'}
              </div>
              <p className="mt-1 text-sm text-slate-700">
                {isFinalStage
                  ? 'Download your official Final Score Report PDF now to send to your instructor, or retry any stage first to raise your score.'
                  : 'You can download your current PDF Score Report anytime or continue to the next stage.'}
              </p>
              {downloadedFile && (
                <p className="mt-1.5 text-xs font-bold text-emerald-700">
                  Downloaded: {downloadedFile}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handlePdfClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 cursor-pointer shrink-0 whitespace-nowrap"
            >
              <FileDown className="h-4 w-4" />
              <span>Download PDF Report</span>
            </button>
          </div>

          {/* Key Takeaways Recap */}
          <div>
            <h2 className="font-display text-base font-bold text-slate-900 mb-3">
              Key Takeaways Mastered in This Stage
            </h2>
            <ul className="space-y-2">
              {level.steps.map((s) => (
                <li
                  key={s.id}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-sm text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{s.takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onExit}
                className="flex-1 sm:flex-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={handleRetryLevel}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-sm font-bold text-blue-800 hover:bg-blue-100 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retry Stage</span>
              </button>
            </div>

            {hasNextLevel && (
              <button
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onGoToNextLevel();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
              >
                <span>Continue to Stage {level.id + 1}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // PHASE 2: PLAYING
  // =========================================================================
  const progressPct = Math.round(
    (answeredCount / level.steps.length) * 100,
  );

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-4 sm:py-8">
      {/* Top Level Control Strip (Mobile Friendly) */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer min-h-[40px]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </button>

          {confirmRestart ? (
            <div className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-2.5 py-1.5">
              <span className="text-[11px] font-bold text-amber-900">Restart?</span>
              <button
                type="button"
                onClick={handleRetryLevel}
                className="rounded-lg bg-amber-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-amber-700 cursor-pointer"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setConfirmRestart(false)}
                className="rounded-lg bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 border border-amber-200 cursor-pointer"
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (answeredCount === 0) handleRetryLevel();
                else setConfirmRestart(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer min-h-[40px]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry Stage</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 font-mono-num">
          <span className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700">
            <Clock className="h-3.5 w-3.5 text-blue-600" />
            <span>{formatDuration(secondsSpent)}</span>
          </span>

          <span className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50/70 px-2.5 py-1.5 text-xs font-bold text-rose-800">
            <Flame className="h-3.5 w-3.5 text-rose-600" />
            <span>{sessionStreak}</span>
          </span>
        </div>
      </div>

      {/* Stage Title + Interactive Step Dots */}
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-slate-900">
            Stage {level.id}: {level.title}
          </span>
          <span className="font-mono-num font-bold text-slate-600">
            Step {stepIndex + 1} of {level.steps.length} · Score: {correctSoFar}/{answeredCount || 0}
          </span>
        </div>

        {/* Clickable step dots for reviewing answered steps */}
        <div className="flex items-center gap-1.5">
          {level.steps.map((s, idx) => {
            const rec = stepRecords[idx];
            const isCurrent = idx === stepIndex;
            const canJump = Boolean(rec) || idx <= answeredCount;
            return (
              <button
                key={s.id}
                type="button"
                disabled={!canJump}
                onClick={() => canJump && jumpToStep(idx)}
                aria-label={`Step ${idx + 1}`}
                className={`h-2.5 flex-1 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-blue-600 ring-2 ring-blue-600/25'
                    : rec
                      ? rec.isCorrect
                        ? 'bg-emerald-500 hover:bg-emerald-600 cursor-pointer'
                        : 'bg-amber-400 hover:bg-amber-500 cursor-pointer'
                      : 'bg-slate-200 cursor-not-allowed'
                }`}
              />
            );
          })}
        </div>
        <div className="text-[11px] text-slate-500">
          Progress: {progressPct}% · Tap any colored bar segment or Previous Step to review earlier answers.
        </div>
      </div>

      {/* Active Step Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm space-y-5"
        >
          {/* Hint Toggle & Review Back Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              {currentStep.kind === 'classifier' && 'Expenditure Ticket Classification'}
              {currentStep.kind === 'choice' && currentStep.badgeText}
              {currentStep.kind === 'audit' && `General Ledger Audit · ${currentStep.ledgerId}`}
              {currentStep.kind === 'slider-lab' && 'Interactive Simulation Lab'}
            </span>

            <div className="flex items-center gap-2">
              {stepIndex > 0 && (
                <button
                  type="button"
                  onClick={() => jumpToStep(stepIndex - 1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Prev Step</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setShowHint((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
                <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
              </button>
            </div>
          </div>

          {showHint && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-sm text-amber-950">
              <strong className="font-bold">Coach Hint: </strong>
              {currentStep.hint}
            </div>
          )}

          {/* ================= RENDERER 1: CLASSIFIER ================= */}
          {currentStep.kind === 'classifier' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600">
                  <span>Department: {currentStep.department}</span>
                  <span className="font-mono-num">
                    {currentStep.amountSar} · {currentStep.usefulLife}
                  </span>
                </div>
                <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-900">
                  {currentStep.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {currentStep.scenario}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {(
                  [
                    {
                      id: 'CAPEX' as const,
                      title: 'Capital Expenditure (CapEx)',
                      desc: 'Capitalize onto Balance Sheet (PP&E / Intangible)',
                      icon: Layers,
                      base: 'border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 hover:border-blue-400',
                    },
                    {
                      id: 'OPEX' as const,
                      title: 'Operational Expenditure (OpEx)',
                      desc: 'Expense immediately on Income Statement (P&L)',
                      icon: TrendingUp,
                      base: 'border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 hover:border-emerald-400',
                    },
                  ] as const
                ).map((choice) => {
                  const Icon = choice.icon;
                  const isPicked = selectedAnswer === choice.id;
                  const isRight = currentStep.correctAnswer === choice.id;

                  let stateClasses: string = choice.base;
                  if (hasSubmittedStep) {
                    if (isRight) {
                      stateClasses = 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20';
                    } else if (isPicked) {
                      stateClasses = 'border-rose-500 bg-rose-50 ring-2 ring-rose-500/20';
                    } else {
                      stateClasses = 'border-slate-200 bg-slate-50 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={choice.id}
                      type="button"
                      disabled={hasSubmittedStep}
                      onClick={() => handleClassifierPick(choice.id, currentStep)}
                      className={`flex flex-col items-start rounded-2xl border-2 p-4 sm:p-5 text-left transition-all min-h-[84px] ${
                        hasSubmittedStep ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                      } ${stateClasses}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-5 w-5 text-slate-800 shrink-0" />
                        <span className="font-display text-base sm:text-lg font-extrabold text-slate-900">
                          {choice.title}
                        </span>
                      </div>
                      <span className="mt-1 text-xs sm:text-sm text-slate-600">
                        {choice.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600 font-mono-num">
                <span>Balance Sheet (CapEx): {capexRoutedCount}</span>
                <span>Income Statement (OpEx): {opexRoutedCount}</span>
              </div>
            </div>
          )}

          {/* ================= RENDERER 2: MULTI-CHOICE ================= */}
          {currentStep.kind === 'choice' && (
            <div className="space-y-5">
              <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentStep.prompt}
              </h2>

              {currentStep.contextBox && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 sm:p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {currentStep.contextBox.title}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {currentStep.contextBox.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2"
                      >
                        <div className="text-[11px] font-semibold text-slate-500">
                          {m.label}
                        </div>
                        <div className="mt-0.5 font-mono-num text-sm font-bold text-slate-900">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {currentStep.options.map((opt, idx) => {
                  const isPicked = selectedAnswer === opt.id;
                  const isRight = currentStep.correctOptionId === opt.id;

                  let style =
                    'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40';
                  if (hasSubmittedStep) {
                    if (isRight) {
                      style = 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20';
                    } else if (isPicked) {
                      style = 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-500/20';
                    } else {
                      style = 'border-slate-200 bg-slate-50 opacity-65';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={hasSubmittedStep}
                      onClick={() => handleOptionPick(opt.id, currentStep)}
                      className={`w-full rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-all min-h-[56px] ${
                        hasSubmittedStep ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                      } ${style}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 font-display text-xs font-extrabold text-slate-800">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <div>
                          <div className="text-sm sm:text-base font-bold text-slate-900">
                            {opt.label}
                          </div>
                          {opt.detail && (
                            <div className="mt-1 text-xs sm:text-sm text-slate-600">
                              {opt.detail}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= RENDERER 3: AUDIT DETECTOR ================= */}
          {currentStep.kind === 'audit' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-800">
                    <FileSearch className="h-4 w-4 shrink-0" />
                    <span>{currentStep.department}</span>
                  </div>
                  <div className="font-mono-num text-xs font-bold text-slate-800">
                    {currentStep.amountSar} · Booked: {currentStep.bookedAs}
                  </div>
                </div>

                <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-900">
                  {currentStep.proposedEntry}
                </h2>

                <div className="rounded-xl border border-slate-200 bg-white p-3.5 text-sm text-slate-700 leading-relaxed">
                  <strong className="font-bold text-slate-900">Field Audit Evidence: </strong>
                  {currentStep.evidenceNote}
                </div>
              </div>

              <div className="space-y-3">
                {currentStep.options.map((opt, idx) => {
                  const isPicked = selectedAnswer === opt.id;
                  const isRight = currentStep.correctOptionId === opt.id;

                  let style =
                    'border-slate-200 bg-white hover:border-rose-400 hover:bg-rose-50/30';
                  if (hasSubmittedStep) {
                    if (isRight) {
                      style = 'border-emerald-500 bg-emerald-50/80 ring-2 ring-emerald-500/20';
                    } else if (isPicked) {
                      style = 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-500/20';
                    } else {
                      style = 'border-slate-200 bg-slate-50 opacity-65';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={hasSubmittedStep}
                      onClick={() => handleOptionPick(opt.id, currentStep)}
                      className={`w-full rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-all min-h-[56px] ${
                        hasSubmittedStep ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                      } ${style}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-50 font-display text-xs font-extrabold text-slate-800">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-sm sm:text-base font-bold text-slate-900">
                            {opt.label}
                          </div>
                          {opt.detail && (
                            <div className="mt-1 text-xs sm:text-sm text-slate-600">
                              {opt.detail}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= RENDERER 4: SLIDER LAB ================= */}
          {currentStep.kind === 'slider-lab' && (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-5 w-5 text-indigo-600 shrink-0" />
                  <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-900">
                    {currentStep.title}
                  </h2>
                </div>
                <p className="mt-1.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {currentStep.prompt}
                </p>
              </div>

              <InteractiveVisuals
                visualType={currentStep.visualType}
                values={activeSliderValues}
              />

              <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                {currentStep.sliders.map((slider) => {
                  const val = activeSliderValues[slider.id] ?? slider.defaultValue;
                  const inTarget =
                    val >= slider.targetMin && val <= slider.targetMax;

                  return (
                    <div key={slider.id} className="space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                        <label
                          htmlFor={`slider-${slider.id}`}
                          className="font-bold text-slate-800"
                        >
                          {slider.label}
                        </label>
                        <div className="font-mono-num text-sm font-extrabold text-blue-700">
                          {val} {slider.unit}
                          {hasSubmittedStep && (
                            <span
                              className={`ml-2 text-xs ${
                                inTarget ? 'text-emerald-700' : 'text-rose-700'
                              }`}
                            >
                              (Target: {slider.targetMin}–{slider.targetMax})
                            </span>
                          )}
                        </div>
                      </div>

                      <input
                        id={`slider-${slider.id}`}
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        disabled={hasSubmittedStep}
                        value={val}
                        onChange={(e) =>
                          setSliderValues((prev) => ({
                            ...prev,
                            [slider.id]: Number(e.target.value),
                          }))
                        }
                        className="w-full accent-blue-600 cursor-pointer disabled:cursor-not-allowed"
                      />

                      <div className="flex justify-between text-[11px] text-slate-500 font-mono-num">
                        <span>
                          Min: {slider.min} {slider.unit}
                        </span>
                        <span>
                          Max: {slider.max} {slider.unit}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {!hasSubmittedStep && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSliderSubmit(currentStep)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Check Configuration</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= INSTANT FEEDBACK PANEL ================= */}
          {hasSubmittedStep && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${
                stepCorrect
                  ? 'border-emerald-300 bg-emerald-50/80'
                  : 'border-amber-300 bg-amber-50/80'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {stepCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-700 shrink-0" />
                  )}
                  <span className="font-display text-base font-extrabold text-slate-900">
                    {stepCorrect
                      ? 'Correct! Great Financial Judgment'
                      : 'Review Concept — Good Learning Moment'}
                  </span>
                </div>

                {currentStep.kind === 'classifier' && (
                  <span className="text-xs font-bold text-slate-700">
                    {currentStep.subLabel}
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-800 leading-relaxed">
                {currentStep.explanation}
              </p>

              <div className="rounded-xl border border-white/80 bg-white/80 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900">
                <strong className="font-bold">Key Takeaway: </strong>
                {currentStep.takeaway}
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                {!stepCorrect && (
                  <button
                    type="button"
                    onClick={() => setConfirmRestart(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3.5 py-2.5 text-xs font-bold text-amber-900 hover:bg-amber-50 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Restart Stage</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="ml-auto w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800 cursor-pointer"
                >
                  <span>
                    {stepIndex + 1 < level.steps.length
                      ? 'Next Step'
                      : 'Finish Stage'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
