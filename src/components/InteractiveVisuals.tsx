import React from 'react';
import { CheckCircle2, AlertTriangle, Star, Lock } from 'lucide-react';
import { LevelCompletion, LevelConfig } from '../types/game';

interface RailRouteProgressProps {
  levels: LevelConfig[];
  completedLevels: Record<number, LevelCompletion>;
  isLevelUnlocked: (id: number) => boolean;
  onSelectLevel: (id: number) => void;
}

export const RailRouteProgress: React.FC<RailRouteProgressProps> = ({
  levels,
  completedLevels,
  isLevelUnlocked,
  onSelectLevel,
}) => {
  const completedCount = Object.keys(completedLevels).length;
  const progressRatio = levels.length > 1 ? completedCount / levels.length : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="font-display text-lg font-bold text-slate-900">
            8-Station Corridor Mastery Route
          </h2>
          <p className="text-sm text-slate-600">
            Day 1 Foundations (Stations 1–4) · Day 2 Strategic Budgeting & Control (Stations 5–8)
          </p>
        </div>
        <div className="font-mono-num text-sm font-semibold text-blue-700">
          {completedCount} / {levels.length} Stations Cleared
        </div>
      </div>

      {/* Mobile Compact 2-Column Station Grid (<640px) */}
      <div className="grid grid-cols-2 gap-2.5 sm:hidden">
        {levels.map((level) => {
          const completion = completedLevels[level.id];
          const unlocked = isLevelUnlocked(level.id);
          const isDay2 = level.day === 2;

          return (
            <button
              key={level.id}
              type="button"
              disabled={!unlocked}
              onClick={() => unlocked && onSelectLevel(level.id)}
              className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                completion
                  ? 'border-emerald-200 bg-emerald-50/60'
                  : unlocked
                    ? isDay2
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-blue-200 bg-blue-50/50'
                    : 'border-slate-200 bg-slate-50 opacity-75'
              } ${unlocked ? 'cursor-pointer active:scale-[0.98]' : 'cursor-not-allowed'}`}
            >
              <div className="flex w-full items-center justify-between gap-1">
                <span className="font-display text-xs font-extrabold text-slate-900">
                  Stage {level.id} · Day {level.day}
                </span>
                {completion ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : !unlocked ? (
                  <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                ) : null}
              </div>
              <span className="mt-1 text-xs font-bold text-slate-800 line-clamp-1">
                {level.title.replace('The ', '')}
              </span>
              <div className="mt-1.5 flex items-center justify-between w-full">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`h-3 w-3 ${
                        completion && s <= completion.stars
                          ? 'fill-amber-400 text-amber-500'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                {completion && (
                  <span className="font-mono-num text-[11px] font-bold text-emerald-700">
                    {completion.bestAccuracy}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Desktop Horizontal Interactive Route Map (640px+) */}
      <div className="hidden sm:block relative overflow-x-auto pb-2">
        <div className="min-w-[680px] px-3 py-4">
          {/* Base Track Rail */}
          <div className="relative flex items-center justify-between">
            <div
              aria-hidden="true"
              className="absolute left-6 right-6 top-6 h-2 rounded-full bg-slate-100 border border-slate-200"
            />
            <div
              aria-hidden="true"
              className="absolute left-6 top-6 h-2 rounded-full bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `calc(${Math.min(progressRatio, 1) * 100}% - 3rem)` }}
            />

            {levels.map((level) => {
              const completion = completedLevels[level.id];
              const unlocked = isLevelUnlocked(level.id);
              const isDay2 = level.day === 2;

              return (
                <button
                  key={level.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => unlocked && onSelectLevel(level.id)}
                  className={`group relative z-10 flex w-20 flex-col items-center text-center transition-transform ${
                    unlocked ? 'cursor-pointer hover:-translate-y-0.5' : 'cursor-not-allowed opacity-70'
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 font-display text-base font-bold shadow-sm transition-all ${
                      completion
                        ? 'border-emerald-600 bg-emerald-600 text-white'
                        : unlocked
                          ? isDay2
                            ? 'border-amber-500 bg-amber-50 text-amber-800 group-hover:bg-amber-100'
                            : 'border-blue-600 bg-blue-50 text-blue-700 group-hover:bg-blue-100'
                          : 'border-slate-300 bg-slate-100 text-slate-400'
                    }`}
                  >
                    {completion ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : unlocked ? (
                      <span>{level.id}</span>
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </div>

                  <span className="mt-2 text-xs font-bold text-slate-800 leading-tight line-clamp-2">
                    {level.title.replace('The ', '')}
                  </span>

                  <span className="mt-1 text-[11px] font-medium text-slate-500">
                    Day {level.day}
                  </span>

                  {/* Stars row */}
                  <div className="mt-1 flex items-center gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`h-3 w-3 ${
                          completion && s <= completion.stars
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SliderValues {
  [key: string]: number;
}

interface InteractiveVisualProps {
  visualType: 's-curve' | 'tco-iceberg' | 'opex-zbb' | 'rolling-forecast';
  values: SliderValues;
}

export const InteractiveVisuals: React.FC<InteractiveVisualProps> = ({
  visualType,
  values,
}) => {
  if (visualType === 's-curve') {
    const designPct = values.designPct ?? 33;
    const peakPct = values.peakPct ?? 34;
    const contingencyPct = values.contingencyPct ?? 8;
    const commissioningPct = Math.max(0, 100 - designPct - peakPct);

    const designOk = designPct >= 12 && designPct <= 22;
    const peakOk = peakPct >= 55 && peakPct <= 72;
    const contingencyOk = contingencyPct >= 16 && contingencyPct <= 24;
    const commOk = commissioningPct >= 10 && commissioningPct <= 30;

    // Cumulative points across Y0..Y4 (SVG coordinates: x from 50 to 430, y from 190 down to 30)
    const y0 = 190;
    const y1 = 190 - (designPct / 100) * 160;
    const y2 = 190 - ((designPct + peakPct * 0.45) / 100) * 160;
    const y3 = 190 - ((designPct + peakPct) / 100) * 160;
    const y4 = 190 - ((Math.min(100, designPct + peakPct + commissioningPct)) / 100) * 160;

    const sCurvePath = `M 50 ${y0} C 100 ${y0}, 115 ${y1}, 145 ${y1} C 195 ${y1}, 215 ${y2}, 240 ${y2} C 280 ${y2}, 305 ${y3}, 335 ${y3} C 380 ${y3}, 400 ${y4}, 430 ${y4}`;

    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Live Capital Phasing & Risk Model
            </span>
            <h4 className="font-display text-base font-bold text-slate-900">
              4-Year CapEx S-Curve vs. Flat Linear Trap
            </h4>
          </div>
          <div className="font-mono-num text-xs font-semibold text-slate-700">
            Commissioning Balance: {commissioningPct}%
          </div>
        </div>

        <svg viewBox="0 0 480 225" className="w-full h-auto rounded-xl bg-white border border-slate-200 p-2">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => {
            const gy = 190 - (pct / 100) * 160;
            return (
              <g key={pct}>
                <line x1="50" y1={gy} x2="435" y2={gy} stroke="#e2e8f0" strokeWidth="1" />
                <text x="42" y={gy + 4} textAnchor="end" fontSize="10" fill="#64748b" fontFamily="monospace">
                  {pct}%
                </text>
              </g>
            );
          })}

          {/* Flat Linear Budget Trap Line */}
          <line
            x1="50"
            y1="190"
            x2="430"
            y2="30"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="6 5"
          />
          <text x="200" y="95" fontSize="10" fill="#94a3b8" transform="rotate(-22 200 95)">
            Naive Flat Linear (25%/yr)
          </text>

          {/* P80 Contingency Shield Band */}
          <rect
            x="438"
            y={Math.max(12, 190 - ((100 + contingencyPct) / 135) * 160)}
            width="24"
            height={(contingencyPct / 135) * 160}
            rx="4"
            fill={contingencyOk ? '#10b981' : '#f59e0b'}
            opacity="0.85"
          />
          <text x="450" y="210" textAnchor="middle" fontSize="9" fontWeight="700" fill="#334155">
            P80
          </text>

          {/* Student S-Curve */}
          <path
            d={sCurvePath}
            fill="none"
            stroke={designOk && peakOk ? '#4f46e5' : '#e11d48'}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Phase Nodes */}
          {[
            { x: 50, y: y0, label: 'Start' },
            { x: 145, y: y1, label: 'Y1 Design' },
            { x: 240, y: y2, label: 'Y2 Build' },
            { x: 335, y: y3, label: 'Y3 Peak' },
            { x: 430, y: y4, label: 'Y4 Open' },
          ].map((pt) => (
            <g key={pt.label}>
              <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
              <text x={pt.x} y="212" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">
                {pt.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Parameter Readout Cards */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div className={`rounded-xl border p-2.5 ${designOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              {designOk ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />}
              <span>Design</span>
            </div>
            <div className="mt-1 font-mono-num font-bold text-slate-900">{designPct}% · {designOk ? 'OPTIMAL' : 'TARGET 12-22%'}</div>
          </div>

          <div className={`rounded-xl border p-2.5 ${peakOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              {peakOk ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />}
              <span>Peak Build</span>
            </div>
            <div className="mt-1 font-mono-num font-bold text-slate-900">{peakPct}% · {peakOk ? 'OPTIMAL' : 'TARGET 55-72%'}</div>
          </div>

          <div className={`rounded-xl border p-2.5 ${commOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-rose-200 bg-rose-50/70'}`}>
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              {commOk ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0" />}
              <span>Commissioning</span>
            </div>
            <div className="mt-1 font-mono-num font-bold text-slate-900">{commissioningPct}% · {commOk ? 'BALANCED' : 'NEEDS 10-30%'}</div>
          </div>

          <div className={`rounded-xl border p-2.5 ${contingencyOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
            <div className="flex items-center gap-1 font-semibold text-slate-800">
              {contingencyOk ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> : <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />}
              <span>P80 Buffer</span>
            </div>
            <div className="mt-1 font-mono-num font-bold text-slate-900">{contingencyPct}% · {contingencyOk ? 'OPTIMAL' : 'TARGET 16-24%'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'opex-zbb') {
    const cbm = values.cbmCoverage ?? 35;
    const das = values.dasAdoption ?? 20;
    const jit = values.jitBufferDays ?? 95;

    const overtimePenalty = Math.max(2, Math.round((100 - cbm) * 0.48));
    const energyCost = Math.max(24, Math.round(42 - das * 0.14));
    const inventoryCarry = jit < 18 ? 22 : jit > 50 ? Math.round((jit - 25) * 0.35) : 7;
    const totalUnitCost = 34 + overtimePenalty + energyCost + inventoryCarry;
    const baselineCost = 118;
    const savingsPct = Math.round(((baselineCost - totalUnitCost) / baselineCost) * 100);

    const cbmOk = cbm >= 75 && cbm <= 95;
    const dasOk = das >= 75 && das <= 100;
    const jitOk = jit >= 20 && jit <= 45;

    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Riyadh Depot ZBB Telemetry
            </span>
            <h4 className="font-display text-base font-bold text-slate-900">
              OpEx Cost Stack per Train-Km (SAR)
            </h4>
          </div>
          <div className="font-mono-num text-sm font-bold text-emerald-700">
            Unit Cost: {totalUnitCost} SAR/km ({savingsPct >= 0 ? `${savingsPct}% Saved` : `${Math.abs(savingsPct)}% Overrun`})
          </div>
        </div>

        <svg viewBox="0 0 480 185" className="w-full h-auto rounded-xl bg-white border border-slate-200 p-2">
          {/* Baseline Bar */}
          <text x="16" y="34" fontSize="11" fontWeight="700" fill="#64748b">Legacy Incremental Budget</text>
          <rect x="16" y="42" width="410" height="26" rx="6" fill="#e2e8f0" />
          <text x="434" y="59" fontSize="11" fontWeight="700" fill="#475569" fontFamily="monospace">118</text>

          {/* Dynamic ZBB Stack Bar */}
          <text x="16" y="96" fontSize="11" fontWeight="700" fill="#0f172a">Your Optimized ZBB Stack</text>
          {(() => {
            const scale = 3.4;
            const baseW = 34 * scale;
            const energyW = energyCost * scale;
            const overtimeW = overtimePenalty * scale;
            const invW = inventoryCarry * scale;
            return (
              <g>
                <rect x="16" y="106" width={baseW} height="30" rx="4" fill="#2563eb" />
                <rect x={16 + baseW + 2} y="106" width={energyW} height="30" rx="4" fill="#0d9488" />
                <rect x={16 + baseW + energyW + 4} y="106" width={overtimeW} height="30" rx="4" fill="#e11d48" />
                <rect x={16 + baseW + energyW + overtimeW + 6} y="106" width={invW} height="30" rx="4" fill="#f59e0b" />
                <text
                  x={Math.min(448, 24 + baseW + energyW + overtimeW + invW)}
                  y="125"
                  fontSize="12"
                  fontWeight="700"
                  fill="#0f172a"
                  fontFamily="monospace"
                >
                  {totalUnitCost}
                </text>
              </g>
            );
          })()}

          {/* Legend */}
          <g transform="translate(16, 156)">
            <rect width="10" height="10" rx="2" fill="#2563eb" />
            <text x="15" y="9" fontSize="10" fill="#334155">Base Crew (34)</text>

            <rect x="110" width="10" height="10" rx="2" fill="#0d9488" />
            <text x="125" y="9" fontSize="10" fill="#334155">Traction Energy ({energyCost})</text>

            <rect x="245" width="10" height="10" rx="2" fill="#e11d48" />
            <text x="260" y="9" fontSize="10" fill="#334155">Overtime/Failure ({overtimePenalty})</text>

            <rect x="380" width="10" height="10" rx="2" fill="#f59e0b" />
            <text x="395" y="9" fontSize="10" fill="#334155">Spares ({inventoryCarry})</text>
          </g>
        </svg>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className={`rounded-xl border p-2.5 ${cbmOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
            <div className="font-semibold text-slate-800">IoT CBM Coverage: {cbm}%</div>
            <div className="mt-0.5 text-slate-600">{cbmOk ? 'OPTIMAL (75–95%)' : 'Adjust to 75–95%'}</div>
          </div>
          <div className={`rounded-xl border p-2.5 ${dasOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
            <div className="font-semibold text-slate-800">DAS Eco-Driving: {das}%</div>
            <div className="mt-0.5 text-slate-600">{dasOk ? 'OPTIMAL (75–100%)' : 'Adjust to 75–100%'}</div>
          </div>
          <div className={`rounded-xl border p-2.5 ${jitOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-rose-200 bg-rose-50/70'}`}>
            <div className="font-semibold text-slate-800">Spares Buffer: {jit} Days</div>
            <div className="mt-0.5 text-slate-600">{jitOk ? 'OPTIMAL (20–45 Days)' : jit < 20 ? 'STOCKOUT RISK' : 'HOLDING BLOAT (20–45d)'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'tco-iceberg') {
    const railQuality = values.railQuality ?? 30;
    const overhaulYear = values.overhaulYear ?? 23;
    const desertSpec = values.desertSpec ?? 30;

    const upfrontCapexM = Math.round(900 + railQuality * 3.5 + desertSpec * 1.8);
    const overhaulPenalty = Math.abs(overhaulYear - 13.5) * 48;
    const trackOpexM = Math.round((110 - railQuality) * 26);
    const desertPenaltyM = Math.round((110 - desertSpec) * 19);
    const lifecycleOpexM = Math.round(1450 + trackOpexM + desertPenaltyM + overhaulPenalty);
    const totalTcoB = ((upfrontCapexM + lifecycleOpexM) / 1000).toFixed(2);
    const capexShare = Math.round((upfrontCapexM / (upfrontCapexM + lifecycleOpexM)) * 100);
    const opexShare = 100 - capexShare;

    const railOk = railQuality >= 80;
    const overhaulOk = overhaulYear >= 12 && overhaulYear <= 15;
    const desertOk = desertSpec >= 80;

    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              30-Year Desert TCO Iceberg Model
            </span>
            <h4 className="font-display text-base font-bold text-slate-900">
              Visible Upfront CapEx vs. Submerged Lifecycle OpEx
            </h4>
          </div>
          <div className="font-mono-num text-sm font-bold text-slate-900">
            30-Yr TCO: {totalTcoB}B SAR
          </div>
        </div>

        <svg viewBox="0 0 480 220" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          {/* Sky & Ocean Split */}
          <rect x="0" y="0" width="480" height="72" fill="#e0f2fe" />
          <rect x="0" y="72" width="480" height="148" fill="#0f172a" />
          <line x1="0" y1="72" x2="480" y2="72" stroke="#38bdf8" strokeWidth="3" strokeDasharray="8 4" />
          <text x="14" y="64" fontSize="10" fontWeight="700" fill="#0369a1">WATERLINE · INITIAL STICKER PRICE</text>
          <text x="14" y="90" fontSize="10" fontWeight="700" fill="#7dd3fc">SUBMERGED 30-YEAR OPEX & OVERHAULS</text>

          {/* Iceberg Tip (CapEx) */}
          <polygon points="240,14 292,72 188,72" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
          <text x="240" y="56" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0c4a6e" fontFamily="monospace">
            {capexShare}% CapEx
          </text>

          {/* Iceberg Submerged Body (scales with lifecycleOpexM) */}
          {(() => {
            const depth = Math.min(208, Math.round(125 + (lifecycleOpexM / 5500) * 80));
            const spread = Math.min(185, Math.round(95 + (lifecycleOpexM / 5500) * 85));
            return (
              <g>
                <polygon
                  points={`188,72 292,72 ${240 + spread},132 240,${depth} ${240 - spread},132`}
                  fill={railOk && overhaulOk && desertOk ? '#14b8a6' : '#f43f5e'}
                  opacity="0.88"
                />
                <text x="240" y="132" textAnchor="middle" fontSize="15" fontWeight="800" fill="#ffffff" fontFamily="monospace">
                  {opexShare}% Submerged OpEx
                </text>
                <text x="240" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="#f8fafc" fontFamily="monospace">
                  {(lifecycleOpexM / 1000).toFixed(2)}B SAR Operating & Desert Costs
                </text>
              </g>
            );
          })()}

          {/* Right callout metrics */}
          <text x="466" y="45" textAnchor="end" fontSize="11" fontWeight="700" fill="#0c4a6e" fontFamily="monospace">
            CapEx: {(upfrontCapexM / 1000).toFixed(2)}B SAR
          </text>
          <text x="466" y="205" textAnchor="end" fontSize="11" fontWeight="700" fill="#e2e8f0" fontFamily="monospace">
            Target TCO &lt; 3.50B SAR
          </text>
        </svg>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className={`rounded-xl border p-2.5 ${railOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
            <div className="font-semibold text-slate-800">Track Spec: {railQuality}%</div>
            <div className="mt-0.5 text-slate-600">{railOk ? 'CONCRETE + PREMIUM' : 'Target 80–100%'}</div>
          </div>
          <div className={`rounded-xl border p-2.5 ${overhaulOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-rose-200 bg-rose-50/70'}`}>
            <div className="font-semibold text-slate-800">Overhaul: Year {overhaulYear}</div>
            <div className="mt-0.5 text-slate-600">{overhaulOk ? 'OPTIMAL (Yr 12–15)' : 'Target Yr 12–15'}</div>
          </div>
          <div className={`rounded-xl border p-2.5 ${desertOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
            <div className="font-semibold text-slate-800">Desert Filtration: {desertSpec}%</div>
            <div className="mt-0.5 text-slate-600">{desertOk ? 'DESERT-RATED' : 'Target 80–100%'}</div>
          </div>
        </div>
      </div>
    );
  }

  // rolling-forecast
  const clawback = values.clawbackPct ?? 10;
  const sinking = values.sinkingFundPct ?? 20;
  const liquidity = values.liquidityDays ?? 10;

  const clawOk = clawback >= 60 && clawback <= 90;
  const sinkOk = sinking >= 80;
  const liqOk = liquidity >= 30 && liquidity <= 45;

  // Cash resilience score per quarter Q1..Q5
  const qBars = [
    { label: 'Q1 Actual', val: 78, status: 'actual' },
    { label: 'Q2 Shock', val: 58, status: 'shock' },
    { label: 'Q3 Clawback', val: Math.min(98, Math.round(45 + clawback * 0.55)), status: clawOk ? 'ok' : 'risk' },
    { label: 'Q4 Renewal', val: Math.min(98, Math.round(32 + sinking * 0.62)), status: sinkOk ? 'ok' : 'risk' },
    { label: 'Q5 Horizon', val: Math.min(98, Math.round(40 + liquidity * 1.15)), status: liqOk ? 'ok' : 'risk' },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            5-Quarter Rolling Cash Horizon
          </span>
          <h4 className="font-display text-base font-bold text-slate-900">
            Treasury Resilience & Capital Velocity (Q1–Q5)
          </h4>
        </div>
        <div className="font-mono-num text-xs font-bold text-slate-800">
          Recovered CWIP: {Math.round((clawback / 100) * 200)}M SAR
        </div>
      </div>

      <svg viewBox="0 0 480 190" className="w-full h-auto rounded-xl bg-white border border-slate-200 p-2">
        {/* Safe Threshold Line */}
        <line x1="40" y1="62" x2="460" y2="62" stroke="#10b981" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="458" y="56" textAnchor="end" fontSize="9" fontWeight="700" fill="#059669">
          HEALTHY TREASURY THRESHOLD (75+)
        </text>

        {qBars.map((bar, idx) => {
          const x = 58 + idx * 82;
          const h = Math.round((bar.val / 100) * 125);
          const y = 155 - h;
          const fill =
            bar.status === 'actual'
              ? '#64748b'
              : bar.status === 'shock'
                ? '#f59e0b'
                : bar.status === 'ok'
                  ? '#2563eb'
                  : '#e11d48';
          return (
            <g key={bar.label}>
              <rect x={x} y={y} width="46" height={h} rx="6" fill={fill} />
              <text x={x + 23} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a" fontFamily="monospace">
                {bar.val}
              </text>
              <text x={x + 23} y="174" textAnchor="middle" fontSize="10" fontWeight="600" fill="#475569">
                {bar.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
        <div className={`rounded-xl border p-2.5 ${clawOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
          <div className="font-semibold text-slate-800">Clawback: {clawback}%</div>
          <div className="mt-0.5 text-slate-600">{clawOk ? 'OPTIMAL (60–90%)' : 'Target 60–90%'}</div>
        </div>
        <div className={`rounded-xl border p-2.5 ${sinkOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-amber-200 bg-amber-50/70'}`}>
          <div className="font-semibold text-slate-800">Sinking Fund: {sinking}%</div>
          <div className="mt-0.5 text-slate-600">{sinkOk ? 'SMOOTHED (80–100%)' : 'Target 80–100%'}</div>
        </div>
        <div className={`rounded-xl border p-2.5 ${liqOk ? 'border-emerald-200 bg-emerald-50/70' : 'border-rose-200 bg-rose-50/70'}`}>
          <div className="font-semibold text-slate-800">Cash Buffer: {liquidity} Days</div>
          <div className="mt-0.5 text-slate-600">{liqOk ? 'RESILIENT (30–45d)' : 'Target 30–45 Days'}</div>
        </div>
      </div>
    </div>
  );
};
