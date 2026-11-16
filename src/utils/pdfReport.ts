import { jsPDF } from 'jspdf';
import { BADGES, COMPETENCY_META, LEVELS } from '../data/courseData';
import { CompetencyId, StudentProgress } from '../types/game';

export function formatDuration(totalSeconds: number): string {
  const safe = Math.max(0, Math.round(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

function buildVerificationCode(progress: StudentProgress, avgBestAccuracy: number): string {
  const nameSeed = progress.studentName
    .trim()
    .toUpperCase()
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const completedCount = Object.keys(progress.completedLevels).length;
  const check = (nameSeed * 17 + progress.xp * 3 + completedCount * 97 + avgBestAccuracy * 13) % 100000;
  return `RFQ-${completedCount}${avgBestAccuracy.toString().padStart(3, '0')}-${check.toString().padStart(5, '0')}`;
}

export function generateScoreReportPdf(progress: StudentProgress): string {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  const completedList = Object.values(progress.completedLevels);
  const completedCount = completedList.length;
  const totalLevels = LEVELS.length;
  const totalStars = completedList.reduce((sum, item) => sum + item.stars, 0);
  const maxStars = totalLevels * 3;
  const avgBestAccuracy =
    completedCount > 0
      ? Math.round(
          completedList.reduce((sum, item) => sum + item.bestAccuracy, 0) /
            completedCount,
        )
      : 0;
  const totalAttempts = completedList.reduce((sum, item) => sum + item.attempts, 0);
  const verificationCode = buildVerificationCode(progress, avgBestAccuracy);
  const generatedAt = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Top Header Banner
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 38, 'F');

  doc.setFillColor(37, 99, 235); // Cobalt 600 accent strip
  doc.rect(0, 35, pageWidth, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('RailFinance Quest — Official Score Report', margin, 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  doc.text(
    'CapEx vs. OpEx: Planning, Budgeting & Strategic Management (Days 1 & 2)',
    margin,
    24,
  );
  doc.text(`Generated: ${generatedAt}  |  Verification: ${verificationCode}`, margin, 30.5);

  let y = 47;

  // Student Identification Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, contentWidth, 24, 3, 3, 'FD');

  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('STUDENT NAME', margin + 5, y + 7);
  doc.text('COHORT / ID', margin + 88, y + 7);
  doc.text('ACTIVE STUDY TIME', margin + 138, y + 7);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(progress.studentName.trim() || 'Unnamed Student', margin + 5, y + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.text(progress.studentIdOrGroup?.trim() || 'Standard Cohort', margin + 88, y + 15);
  doc.text(formatDuration(progress.totalTimeSeconds || 0), margin + 138, y + 15);

  y += 31;

  // 4 Summary KPI Cards
  const cardGap = 4;
  const cardW = (contentWidth - cardGap * 3) / 4;
  const kpis = [
    {
      label: 'STAGES CLEARED',
      value: `${completedCount} / ${totalLevels}`,
      sub: `${Math.round((completedCount / totalLevels) * 100)}% Complete`,
    },
    {
      label: 'AVG STAGE SCORE',
      value: completedCount > 0 ? `${avgBestAccuracy}%` : '0%',
      sub: `${totalAttempts} Total Tries`,
    },
    {
      label: 'STARS EARNED',
      value: `${totalStars} / ${maxStars}`,
      sub: `${progress.xp} Total XP`,
    },
    {
      label: 'BEST STREAK',
      value: `${progress.bestStreak}`,
      sub: `${progress.unlockedBadges.length}/${BADGES.length} Badges`,
    },
  ];

  kpis.forEach((kpi, idx) => {
    const x = margin + idx * (cardW + cardGap);
    doc.setFillColor(239, 246, 255);
    doc.setDrawColor(191, 219, 254);
    doc.roundedRect(x, y, cardW, 21, 2.5, 2.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 64, 175);
    doc.text(kpi.label, x + 3.5, y + 6);

    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(kpi.value, x + 3.5, y + 13.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(kpi.sub, x + 3.5, y + 18.5);
  });

  y += 29;

  // Stage-by-Stage Performance Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Stage-by-Stage Performance Breakdown', margin, y);
  y += 4;

  // Table Header
  doc.setFillColor(30, 41, 59);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('STAGE', margin + 3, y + 5.5);
  doc.text('DAY', margin + 74, y + 5.5);
  doc.text('STATUS', margin + 88, y + 5.5);
  doc.text('BEST SCORE', margin + 112, y + 5.5);
  doc.text('STARS', margin + 136, y + 5.5);
  doc.text('TRIES', margin + 153, y + 5.5);
  doc.text('TIME', margin + 167, y + 5.5);
  y += 8;

  LEVELS.forEach((level, idx) => {
    const comp = progress.completedLevels[level.id];
    const rowH = 8.5;
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
    } else {
      doc.setFillColor(255, 255, 255);
    }
    doc.setDrawColor(226, 232, 240);
    doc.rect(margin, y, contentWidth, rowH, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.2);
    doc.setTextColor(15, 23, 42);
    const shortTitle = `${level.id}. ${level.title}`.slice(0, 36);
    doc.text(shortTitle, margin + 3, y + 5.7);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Day ${level.day}`, margin + 74, y + 5.7);

    if (comp) {
      doc.setTextColor(5, 150, 105);
      doc.setFont('helvetica', 'bold');
      doc.text('Cleared', margin + 88, y + 5.7);
      doc.setTextColor(15, 23, 42);
      doc.text(`${comp.bestAccuracy}%`, margin + 112, y + 5.7);
      doc.text(`${comp.stars} / 3`, margin + 136, y + 5.7);
      doc.setFont('helvetica', 'normal');
      doc.text(`${comp.attempts}`, margin + 155, y + 5.7);
      doc.text(formatDuration(comp.timeSpentSeconds ?? 0), margin + 167, y + 5.7);
    } else {
      doc.setTextColor(148, 163, 184);
      doc.text('Pending', margin + 88, y + 5.7);
      doc.text('—', margin + 116, y + 5.7);
      doc.text('0 / 3', margin + 136, y + 5.7);
      doc.text('0', margin + 155, y + 5.7);
      doc.text('—', margin + 169, y + 5.7);
    }

    y += rowH;
  });

  y += 10;

  // Competency Mastery Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Core Course Competency Mastery', margin, y);
  y += 5;

  const compKeys = Object.keys(COMPETENCY_META) as CompetencyId[];
  compKeys.forEach((compId, idx) => {
    const meta = COMPETENCY_META[compId];
    const matchingLevels = LEVELS.filter((l) => l.competency === compId);
    const completedMatching = matchingLevels.filter(
      (l) => progress.completedLevels[l.id],
    );
    const pct =
      matchingLevels.length > 0 && completedMatching.length > 0
        ? Math.round(
            completedMatching.reduce(
              (sum, l) =>
                sum + (progress.completedLevels[l.id]?.bestAccuracy ?? 0),
              0,
            ) / matchingLevels.length,
          )
        : 0;

    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const boxW = (contentWidth - 6) / 2;
    const x = margin + col * (boxW + 6);
    const boxY = y + row * 12;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    doc.text(meta.label, x, boxY + 4);

    doc.setFont('helvetica', 'bold');
    doc.text(`${pct}%`, x + boxW - 10, boxY + 4);

    // Progress bar background
    doc.setFillColor(226, 232, 240);
    doc.roundedRect(x, boxY + 6, boxW, 3, 1, 1, 'F');

    if (pct > 0) {
      doc.setFillColor(37, 99, 235);
      doc.roundedRect(x, boxY + 6, Math.max(3, (boxW * pct) / 100), 3, 1, 1, 'F');
    }
  });

  y += Math.ceil(compKeys.length / 2) * 12 + 8;

  // Badges Earned Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Milestone Badges Earned (${progress.unlockedBadges.length} of ${BADGES.length})`,
    margin,
    y,
  );
  y += 5;

  const earnedTitles = BADGES.filter((b) =>
    progress.unlockedBadges.includes(b.id),
  ).map((b) => b.title);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(51, 65, 85);
  const badgeLine =
    earnedTitles.length > 0
      ? earnedTitles.join('  •  ')
      : 'No milestone badges unlocked yet.';
  const wrappedBadges = doc.splitTextToSize(badgeLine, contentWidth);
  doc.text(wrappedBadges, margin, y + 2);

  // Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, 278, pageWidth - margin, 278);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'Submit this official PDF report to your course instructor upon completing all Days 1 & 2 stages.',
    margin,
    284,
  );

  const safeName = (progress.studentName.trim() || 'Student')
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '');
  const fileName = `RailFinance_Quest_Score_Report_${safeName}.pdf`;
  doc.save(fileName);
  return fileName;
}
