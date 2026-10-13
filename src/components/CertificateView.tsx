import React, { useState } from 'react';
import { Award, Printer, CheckCircle, ShieldCheck, Sparkles, User, Calendar, BookOpen, FileText, Download, Trophy } from 'lucide-react';
import { Badge } from '../types';
import { BadgeIcon } from './BadgeIcon';

interface CertificateViewProps {
  studentName: string;
  onUpdateName: (name: string) => void;
  completedChaptersCount: number;
  totalChapters: number;
  completedChallengesCount: number;
  averageQuizScore: number;
  onOpenProgressReport?: () => void;
  unlockedBadges?: Badge[];
  onOpenBadges?: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  studentName,
  onUpdateName,
  completedChaptersCount,
  totalChapters,
  completedChallengesCount,
  averageQuizScore,
  onOpenProgressReport,
  unlockedBadges = [],
  onOpenBadges,
}) => {
  const [nameInput, setNameInput] = useState(studentName || 'Python Student');
  const certificateId = `PY-${(completedChaptersCount * 97 + 1024).toString(16).toUpperCase()}-VERIFIED`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isComplete = completedChaptersCount === totalChapters;

  const handlePrint = () => {
    window.print();
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* Top Banner & Control Deck */}
      <div className="mb-8 p-6 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Official Graduation Credential</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Python Mastery Certificate
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Personalize your name and export your high-resolution verified credential.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <form onSubmit={handleSaveName} className="flex items-center gap-2">
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  onUpdateName(e.target.value);
                }}
                placeholder="Enter your full name"
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-sky-500"
              />
            </div>
          </form>

          {onOpenProgressReport && (
            <button
              onClick={onOpenProgressReport}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              <span>Full Progress Transcript (PDF)</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save Certificate</span>
          </button>
        </div>
      </div>

      {!isComplete && (
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Learning in progress:</strong> You have completed {completedChaptersCount} of {totalChapters} chapters. Finish all lessons to graduate with full distinction!
            </span>
          </div>
          <span className="font-semibold tabular-nums text-amber-700">
            {Math.round((completedChaptersCount / totalChapters) * 100)}% Complete
          </span>
        </div>
      )}

      {/* The Printable Certificate Canvas */}
      <div className="bg-white rounded-2xl border-8 border-double border-slate-800 p-8 sm:p-14 text-center shadow-lg relative overflow-hidden print:border-4 print:p-8">
        {/* Decorative corner flourishes */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-sky-600" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-sky-600" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-sky-600" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-sky-600" />

        {/* Certificate Header */}
        <div className="flex items-center justify-center gap-2 text-sky-700 mb-3">
          <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center font-bold text-sm tracking-wider">
            Py
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-slate-600">
            Python Mastery Curriculum
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Certificate of Completion
        </h1>
        <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-8">
          This credential officially certifies that
        </p>

        {/* Recipient Name */}
        <div className="py-2 mb-6 border-b-2 border-slate-300 max-w-md mx-auto">
          <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 italic">
            {studentName || 'Python Student'}
          </span>
        </div>

        <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
          has successfully studied and completed the rigorous interactive curriculum in <strong>Python Programming & Software Engineering Foundations</strong>, demonstrating practical competence across variables, algorithms, data structures, modular functions, error diagnostics, and object-oriented architecture.
        </p>

        {/* Achievement Statistics Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto py-4 px-6 bg-slate-50/80 rounded-xl border border-slate-200 mb-10 text-xs">
          <div>
            <span className="block font-bold text-slate-900 text-base tabular-nums">
              {completedChaptersCount}/{totalChapters}
            </span>
            <span className="text-2xs text-slate-500 uppercase tracking-wider">Chapters Read</span>
          </div>
          <div className="border-x border-slate-200">
            <span className="block font-bold text-emerald-700 text-base tabular-nums">
              {completedChallengesCount}
            </span>
            <span className="text-2xs text-slate-500 uppercase tracking-wider">Challenges Solved</span>
          </div>
          <div>
            <span className="block font-bold text-sky-700 text-base tabular-nums">
              {averageQuizScore}%
            </span>
            <span className="text-2xs text-slate-500 uppercase tracking-wider">Avg Quiz Score</span>
          </div>
        </div>

        {/* Earned Badges Showcase */}
        {unlockedBadges.length > 0 && (
          <div className="max-w-xl mx-auto mb-8 p-3.5 bg-amber-50/60 rounded-xl border border-amber-200 text-left">
            <div className="flex items-center justify-between text-2xs mb-2">
              <span className="font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                Verified Digital Badges Earned ({unlockedBadges.length})
              </span>
              {onOpenBadges && (
                <button
                  onClick={onOpenBadges}
                  className="text-amber-800 hover:text-amber-900 underline font-semibold print:hidden"
                >
                  View Badges
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {unlockedBadges.map((b) => (
                <span
                  key={b.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-slate-800 text-2xs font-semibold shadow-2xs"
                >
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-tr ${b.gradient}`} />
                  <span>{b.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Signatures & Seal */}
        <div className="grid grid-cols-2 gap-8 max-w-md mx-auto pt-4 border-t border-slate-200 text-xs text-slate-500">
          <div>
            <div className="font-serif italic text-base text-slate-800 mb-1">Guido v. R. Standards</div>
            <div className="border-t border-slate-300 pt-1 text-2xs uppercase tracking-wider">
              Curriculum Director
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-slate-800 mb-1 flex items-center justify-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentDate}</span>
            </div>
            <div className="border-t border-slate-300 pt-1 text-2xs uppercase tracking-wider">
              Issue Date
            </div>
          </div>
        </div>

        {/* Bottom Verification Hash */}
        <div className="mt-8 text-2xs font-mono text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Credential ID: {certificateId}</span>
          <span aria-hidden="true">·</span>
          <span>Verified Interactive Courseware</span>
        </div>
      </div>
    </div>
  );
};
