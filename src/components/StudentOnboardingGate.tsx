import React, { useState } from 'react';
import { ArrowRight, Award, Clock, FileCheck2, UserCheck } from 'lucide-react';

interface StudentOnboardingGateProps {
  onSubmitProfile: (studentName: string, studentIdOrGroup: string) => void;
}

export const StudentOnboardingGate: React.FC<StudentOnboardingGateProps> = ({
  onSubmitProfile,
}) => {
  const [fullName, setFullName] = useState('');
  const [cohortOrId, setCohortOrId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const trimmedName = fullName.trim();
  const isNameValid =
    trimmedName.length >= 2 &&
    trimmedName.toLowerCase() !== 'finance cadet' &&
    /[a-zA-Z\u00C0-\u024F\u0600-\u06FF\u4E00-\u9FFF]/.test(trimmedName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNameValid) {
      setErrorMsg('Please enter your full name (at least 2 letters) before starting.');
      return;
    }
    setErrorMsg('');
    onSubmitProfile(trimmedName, cohortOrId.trim());
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 shadow-sm space-y-6">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
            CapEx vs. OpEx Course · Days 1 & 2 Assessment Game
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome to RailFinance Quest
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Before starting Level 1, you must enter your name below. Your scores, study time, and retries across all 8 stages will be recorded under your name for your final downloadable <strong>PDF Score Report</strong>.
          </p>
        </div>

        {/* Quick Overview Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-3.5">
            <div className="flex items-center gap-1.5 font-bold text-blue-900">
              <Clock className="h-4 w-4 text-blue-600 shrink-0" />
              <span>~20 Min Quest</span>
            </div>
            <p className="mt-1 text-slate-600">
              8 interactive stages across Days 1 & 2 (58 scenarios & simulators).
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
              <Award className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Retry Anytime</span>
            </div>
            <p className="mt-1 text-slate-600">
              Go back and retry any stage until you achieve a score you are proud of.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <FileCheck2 className="h-4 w-4 text-amber-600 shrink-0" />
              <span>PDF Score Report</span>
            </div>
            <p className="mt-1 text-slate-600">
              Download your official PDF report at the end to send to your instructor.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="student-full-name"
              className="block text-sm font-bold text-slate-900 mb-1.5"
            >
              Student Full Name <span className="text-rose-600">* (Required to Start)</span>
            </label>
            <div className="relative">
              <UserCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="student-full-name"
                type="text"
                required
                autoFocus
                maxLength={50}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter your first and last name"
                className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              />
            </div>
            {errorMsg ? (
              <p className="mt-1.5 text-xs font-semibold text-rose-600">
                {errorMsg}
              </p>
            ) : !isNameValid ? (
              <p className="mt-1.5 text-xs text-slate-500">
                Type your full name to unlock the game stages.
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="student-cohort-id"
              className="block text-sm font-bold text-slate-800 mb-1.5"
            >
              Student ID or Group <span className="font-normal text-slate-500">(Optional)</span>
            </label>
            <input
              id="student-cohort-id"
              type="text"
              maxLength={32}
              value={cohortOrId}
              onChange={(e) => setCohortOrId(e.target.value)}
              placeholder="e.g., Cohort A · ID #204"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            />
          </div>

          <button
            type="submit"
            disabled={!isNameValid}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-base font-bold shadow-sm transition-all ${
              isNameValid
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] cursor-pointer'
                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>{isNameValid ? 'Enter Course & Start' : 'Enter Your Name to Start'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
