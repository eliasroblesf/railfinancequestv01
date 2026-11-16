import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  Compass,
  Edit3,
  FileDown,
  Flame,
  Lock,
  Play,
  RotateCcw,
  Star,
  Target,
  Unlock,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import { BADGES, COMPETENCY_META, LEVELS } from '../data/courseData';
import { CompetencyId, LevelConfig, StudentProgress } from '../types/game';
import { formatDuration } from '../utils/pdfReport';
import { RailRouteProgress } from './InteractiveVisuals';

interface DashboardViewProps {
  progress: StudentProgress;
  isLevelUnlocked: (levelId: number) => boolean;
  nextPlayableLevelId: number;
  onStartLevel: (levelId: number) => void;
  onOpenDay: (day: 1 | 2) => void;
  onUpdateName: (name: string) => void;
  onToggleSound: () => void;
  onToggleInstructorUnlock: () => void;
  onDownloadPdf: () => string;
  onResetProgress: () => void;
}

const ACCENT_SURFACE: Record<LevelConfig['accentColor'], string> = {
  blue: 'bg-blue-50/70 border-blue-200',
  emerald: 'bg-emerald-50/70 border-emerald-200',
  amber: 'bg-amber-50/70 border-amber-200',
  rose: 'bg-rose-50/70 border-rose-200',
  teal: 'bg-teal-50/70 border-teal-200',
  indigo: 'bg-indigo-50/70 border-indigo-200',
};

const ACCENT_TEXT: Record<LevelConfig['accentColor'], string> = {
  blue: 'text-blue-700',
  emerald: 'text-emerald-700',
  amber: 'text-amber-700',
  rose: 'text-rose-700',
  teal: 'text-teal-700',
  indigo: 'text-indigo-700',
};

const BADGE_SURFACE: Record<'emerald' | 'blue' | 'amber' | 'rose', string> = {
  emerald: 'border-emerald-200 bg-emerald-50/70 text-emerald-800',
  blue: 'border-blue-200 bg-blue-50/70 text-blue-800',
  amber: 'border-amber-200 bg-amber-50/70 text-amber-800',
  rose: 'border-rose-200 bg-rose-50/70 text-rose-800',
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  isLevelUnlocked,
  nextPlayableLevelId,
  onStartLevel,
  onOpenDay,
  onUpdateName,
  onToggleSound,
  onToggleInstructorUnlock,
  onDownloadPdf,
  onResetProgress,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(progress.studentName);
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [savedPdfName, setSavedPdfName] = useState<string | null>(null);

  const completedList = Object.values(progress.completedLevels);
  const completedCount = completedList.length;
  const totalLevels = LEVELS.length;
  const overallPct = Math.round((completedCount / totalLevels) * 100);
  const totalStars = completedList.reduce((sum, item) => sum + item.stars, 0);
  const maxStars = totalLevels * 3;
  const avgBestScore =
    completedCount > 0
      ? Math.round(
          completedList.reduce((sum, item) => sum + item.bestAccuracy, 0) /
            completedCount,
        )
      : 0;

  const day1Levels = LEVELS.filter((l) => l.day === 1);
  const day2Levels = LEVELS.filter((l) => l.day === 2);

  const day1Done = day1Levels.filter((l) => progress.completedLevels[l.id]).length;
  const day2Done = day2Levels.filter((l) => progress.completedLevels[l.id]).length;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftName.trim();
    const isValid =
      cleaned.length >= 2 &&
      cleaned.toLowerCase() !== 'finance cadet' &&
      /[a-zA-Z\u00C0-\u024F\u0600-\u06FF\u4E00-\u9FFF]/.test(cleaned);
    if (isValid) {
      onUpdateName(cleaned);
    } else {
      setDraftName(progress.studentName);
    }
    setEditingName(false);
  };

  const handleDownloadPdf = () => {
    const file = onDownloadPdf();
    setSavedPdfName(file);
  };

  const getCompetencyStats = (compId: CompetencyId) => {
    const matchingLevels = LEVELS.filter((l) => l.competency === compId);
    if (matchingLevels.length === 0) return { pct: 0, done: 0, total: 0 };
    const completed = matchingLevels.filter((l) => progress.completedLevels[l.id]);
    if (completed.length === 0) {
      return { pct: 0, done: 0, total: matchingLevels.length };
    }
    const avgAccuracy =
      completed.reduce(
        (sum, l) => sum + (progress.completedLevels[l.id]?.bestAccuracy ?? 0),
        0,
      ) / matchingLevels.length;
    return {
      pct: Math.round(avgAccuracy),
      done: completed.length,
      total: matchingLevels.length,
    };
  };

  const renderLevelCard = (level: LevelConfig) => {
    const completion = progress.completedLevels[level.id];
    const unlocked = isLevelUnlocked(level.id);

    return (
      <div
        key={level.id}
        className={`flex flex-col justify-between rounded-2xl border p-5 transition-all ${
          unlocked
            ? `${ACCENT_SURFACE[level.accentColor]} shadow-sm hover:shadow-md`
            : 'border-slate-200 bg-slate-50/80 opacity-85'
        }`}
      >
        <div>
          <div className="flex items-start justify-between gap-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${unlocked ? ACCENT_TEXT[level.accentColor] : 'text-slate-500'}`}>
              Stage {level.id} · {level.steps.length} Steps · {level.xpReward} XP
            </span>
            <div className="flex items-center gap-0.5 shrink-0" aria-label={`Stars: ${completion?.stars ?? 0} of 3`}>
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${
                    completion && s <= completion.stars
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="font-display mt-2 text-lg font-bold text-slate-900">
            {level.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600 leading-relaxed">
            {level.subtitle}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-medium text-slate-600 font-mono-num">
            {completion
              ? `Best: ${completion.bestAccuracy}% · ${completion.attempts} ${completion.attempts === 1 ? 'try' : 'tries'}`
              : unlocked
                ? `~${level.estimatedMinutes} min · Ready`
                : `Clear Stage ${level.id - 1} to unlock`}
          </div>

          {unlocked ? (
            <button
              type="button"
              onClick={() => onStartLevel(level.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] ${
                completion
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {completion ? (
                <>
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retry Stage</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Play Stage</span>
                </>
              )}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 whitespace-nowrap shrink-0">
              <Lock className="h-3.5 w-3.5" />
              <span>Locked</span>
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-3 sm:px-6 py-5 sm:py-8">
      {/* Hero Student Progress Banner */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              CapEx vs. OpEx Strategic Finance Course · Days 1 & 2
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {editingName ? (
                <form onSubmit={handleSaveName} className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    maxLength={50}
                    autoFocus
                    aria-label="Student name"
                    className="rounded-xl border border-blue-300 bg-white px-3 py-2 font-display text-lg sm:text-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDraftName(progress.studentName);
                      setEditingName(false);
                    }}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    {progress.studentName}
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      setDraftName(progress.studentName);
                      setEditingName(true);
                    }}
                    aria-label="Edit student name"
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
              )}
              {progress.studentIdOrGroup && (
                <span className="text-xs font-semibold text-slate-500">
                  · {progress.studentIdOrGroup}
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Complete all 8 stages (~20 minutes total). You can retry any stage as many times as you want until you achieve a score you like, then download your official <strong>PDF Score Report</strong> to send to your instructor.
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onStartLevel(nextPlayableLevelId)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>
                  {completedCount === totalLevels
                    ? 'Replay Stage 1'
                    : completedCount === 0
                      ? 'Start Stage 1: Classifier Station'
                      : `Continue Stage ${nextPlayableLevelId}`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800 cursor-pointer whitespace-nowrap"
              >
                <FileDown className="h-4 w-4" />
                <span>Download PDF Report</span>
              </button>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => onOpenDay(1)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap"
                >
                  <Compass className="h-4 w-4 text-blue-600" />
                  <span>Day 1 ({day1Done}/4)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenDay(2)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap"
                >
                  <Compass className="h-4 w-4 text-amber-600" />
                  <span>Day 2 ({day2Done}/4)</span>
                </button>
              </div>
            </div>

            {savedPdfName && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-2 text-xs font-bold text-emerald-800">
                PDF Score Report saved: {savedPdfName}
              </div>
            )}
          </div>

          {/* Right KPI Scorecard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0 lg:w-76">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800">
                <Target className="h-4 w-4" />
                <span>Completion</span>
              </div>
              <div className="mt-1.5 font-display text-2xl font-extrabold text-slate-900 font-mono-num">
                {overallPct}%
              </div>
              <div className="text-xs text-slate-600 font-mono-num">
                {completedCount} of {totalLevels} stages
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>Stars Earned</span>
              </div>
              <div className="mt-1.5 font-display text-2xl font-extrabold text-slate-900 font-mono-num">
                {totalStars} / {maxStars}
              </div>
              <div className="text-xs text-slate-600 font-mono-num">
                {progress.xp} Total XP
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <Zap className="h-4 w-4" />
                <span>Avg Best Score</span>
              </div>
              <div className="mt-1.5 font-display text-2xl font-extrabold text-slate-900 font-mono-num">
                {completedCount > 0 ? `${avgBestScore}%` : '—'}
              </div>
              <div className="text-xs text-slate-600 font-mono-num">
                Best streak: {progress.bestStreak}
              </div>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                <Clock className="h-4 w-4" />
                <span>Study Time</span>
              </div>
              <div className="mt-1.5 font-display text-xl sm:text-2xl font-extrabold text-slate-900 font-mono-num">
                {formatDuration(progress.totalTimeSeconds || 0)}
              </div>
              <div className="text-xs text-slate-600">
                {progress.unlockedBadges.length}/{BADGES.length} badges
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 8-Station Corridor Progress Track */}
      <RailRouteProgress
        levels={LEVELS}
        completedLevels={progress.completedLevels}
        isLevelUnlocked={isLevelUnlocked}
        onSelectLevel={onStartLevel}
      />

      {/* Day 1 Module Section */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Day 1 · Module 1
            </div>
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              CapEx vs. OpEx Fundamentals, Accounting & Audit Control
            </h2>
          </div>
          <div className="text-sm font-semibold text-slate-600 font-mono-num">
            {day1Done} / 4 Stages Cleared
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {day1Levels.map(renderLevelCard)}
        </div>
      </section>

      {/* Day 2 Module Section */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Day 2 · Module 2
            </div>
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              Strategic Planning, Zero-Based OpEx, TCO Iceberg & Rolling Forecasts
            </h2>
          </div>
          <div className="text-sm font-semibold text-slate-600 font-mono-num">
            {day2Done} / 4 Stages Cleared
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {day2Levels.map(renderLevelCard)}
        </div>
      </section>

      {/* Competency Mastery & Badges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Skill Mastery Breakdown
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Tracks your highest achieved score across each core course pillar.
          </p>

          <div className="space-y-4">
            {(Object.keys(COMPETENCY_META) as CompetencyId[]).map((compId) => {
              const meta = COMPETENCY_META[compId];
              const stats = getCompetencyStats(compId);
              return (
                <div key={compId}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className={`font-semibold ${meta.colorClass}`}>
                      {meta.label}
                    </span>
                    <span className="font-mono-num text-xs font-bold text-slate-700">
                      {stats.pct}% · {stats.done}/{stats.total} stage
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200/70">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${meta.barColor}`}
                      style={{ width: `${stats.pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Milestone Badges
            </h2>
            <span className="font-mono-num text-xs font-bold text-slate-600">
              {progress.unlockedBadges.length} / {BADGES.length} Earned
            </span>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Earn badges as you clear Day 1 and Day 2 stages.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BADGES.map((badge) => {
              const earned = progress.unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`rounded-xl border p-3.5 transition-all ${
                    earned
                      ? BADGE_SURFACE[badge.color]
                      : 'border-slate-200 bg-slate-50/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                        earned ? 'bg-white/90 shadow-xs' : 'bg-slate-200/70'
                      }`}
                    >
                      {earned ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Award className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold leading-snug">
                        {badge.title}
                      </div>
                      <p className="mt-0.5 text-xs opacity-90 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Classroom & Student Preferences Bar */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleSound}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {progress.soundEnabled ? (
                <>
                  <Volume2 className="h-4 w-4 text-blue-600" />
                  <span>Sound: On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-4 w-4 text-slate-400" />
                  <span>Sound: Off</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleInstructorUnlock}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold cursor-pointer ${
                progress.instructorUnlockAll
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-800'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {progress.instructorUnlockAll ? (
                <>
                  <Unlock className="h-4 w-4 text-indigo-600" />
                  <span>Instructor Mode: All Unlocked</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 text-slate-500" />
                  <span>Step-by-Step Unlock</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2.5 text-xs font-bold text-blue-800 hover:bg-blue-100 cursor-pointer"
            >
              <FileDown className="h-4 w-4" />
              <span>Export PDF Score Report</span>
            </button>
          </div>

          <div>
            {confirmingReset ? (
              <div className="flex flex-wrap items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                <span className="text-xs font-semibold text-rose-800">
                  Reset all scores and sign in again?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmingReset(false);
                  }}
                  className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-bold text-white hover:bg-rose-700 cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingReset(false)}
                  className="rounded-lg border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset / Switch Student</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
