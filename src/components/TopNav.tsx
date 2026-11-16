import React from 'react';
import { Play } from 'lucide-react';
import { AppView } from '../types/game';

interface TopNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  nextPlayableLevelId: number;
  allCompleted: boolean;
  onLaunchNextLevel: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onNavigate,
  nextPlayableLevelId,
  allCompleted,
  onLaunchNextLevel,
}) => {
  const navItems: { id: AppView; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'day1', label: 'Day 1' },
    { id: 'day2', label: 'Day 2' },
    { id: 'guide', label: 'Field Guide' },
  ];

  const ctaLabel = allCompleted
    ? 'Replay Lvl 1'
    : nextPlayableLevelId === 1
      ? 'Start Lvl 1'
      : `Continue Lvl ${nextPlayableLevelId}`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 sm:gap-8 px-3 sm:px-6 py-3">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="font-display text-left text-base sm:text-lg font-extrabold tracking-tight text-slate-900 transition-colors hover:text-blue-600 whitespace-nowrap shrink-0 cursor-pointer"
        >
          RailFinance Quest
        </button>

        {/* Zone 2: Primary Navigation Links (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7"
        >
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1.5 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-blue-600"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onLaunchNextLevel}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.98] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-current" />
            <span>{ctaLabel}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sub-row (<768px) */}
      <nav
        aria-label="Mobile Navigation"
        className="flex md:hidden items-center justify-around border-t border-slate-100 bg-slate-50/70 px-2 py-1.5"
      >
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
