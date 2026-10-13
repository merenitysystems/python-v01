import React from 'react';
import {
  FileText,
  Download,
  Printer,
  X,
  CheckCircle2,
  Clock,
  Award,
  Terminal,
  BookOpen,
} from 'lucide-react';
import { Chapter, UserProgress } from '../types';
import { generateProgressPDF } from '../utils/pdfGenerator';

interface ProgressReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  progress: UserProgress;
  studentName: string;
}

export const ProgressReportModal: React.FC<ProgressReportModalProps> = ({
  isOpen,
  onClose,
  chapters,
  progress,
  studentName,
}) => {
  if (!isOpen) return null;

  const completedCount = progress.completedChapters.length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);
  const quizScores = Object.values(progress.quizScores);
  const avgQuizScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
      : 0;
  const challengesSolved = progress.completedChallenges.length;

  const handleDownloadPDF = () => {
    generateProgressPDF(chapters, progress, studentName);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">Student Academic Progress & Quiz Transcript</h3>
              </div>
              <p className="text-2xs text-slate-500 mt-0.5">
                Official learning record for {studentName || 'Python Student'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body / Report Preview */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar text-xs space-y-6">
          {/* Key Summary Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-2xs text-slate-500 font-medium block mb-1">Curriculum Progress</span>
              <span className="text-xl font-bold text-slate-900 tabular-nums">{progressPercent}%</span>
              <span className="text-2xs text-slate-400 block mt-0.5">{completedCount} of {chapters.length} Chapters</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-2xs text-slate-500 font-medium block mb-1">Average Quiz Score</span>
              <span className="text-xl font-bold text-sky-700 tabular-nums">{avgQuizScore}%</span>
              <span className="text-2xs text-slate-400 block mt-0.5">{Object.keys(progress.quizScores).length} Quizzes Taken</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-2xs text-slate-500 font-medium block mb-1">Code Challenges</span>
              <span className="text-xl font-bold text-emerald-700 tabular-nums">{challengesSolved}</span>
              <span className="text-2xs text-slate-400 block mt-0.5">{challengesSolved} of {chapters.length} Solved</span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-2xs text-slate-500 font-medium block mb-1">Estimated Study</span>
              <span className="text-xl font-bold text-amber-700 tabular-nums">~2.5 hrs</span>
              <span className="text-2xs text-slate-400 block mt-0.5">Interactive Practice</span>
            </div>
          </div>

          {/* Detailed Chapter Progress Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Chapter Breakdown & Assessment Results</span>
              <span className="text-2xs text-slate-500 font-mono">10 Modules</span>
            </div>

            <div className="divide-y divide-slate-100">
              {chapters.map((ch) => {
                const isCompleted = progress.completedChapters.includes(ch.id);
                const score = progress.quizScores[ch.id];
                const isChallengeSolved = progress.completedChallenges.includes(ch.challenge.id);

                return (
                  <div
                    key={ch.id}
                    className="p-3.5 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-[200px]">
                      <span className="font-mono text-2xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        Ch {ch.number}
                      </span>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-xs">{ch.title}</h4>
                        <span className="text-2xs text-slate-500">{ch.readTimeMinutes} min read</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-2xs font-medium">
                      {/* Reading Status */}
                      <div>
                        {isCompleted ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Completed
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            In Progress
                          </span>
                        )}
                      </div>

                      {/* Quiz Score */}
                      <div className="min-w-[80px] text-right">
                        {score !== undefined ? (
                          <span className="text-sky-800 font-semibold flex items-center justify-end gap-1">
                            <Award className="w-3.5 h-3.5 text-sky-600" />
                            Quiz: {score}%
                          </span>
                        ) : (
                          <span className="text-slate-400">Quiz: --</span>
                        )}
                      </div>

                      {/* Challenge */}
                      <div className="min-w-[90px] text-right">
                        {isChallengeSolved ? (
                          <span className="text-emerald-700 font-semibold flex items-center justify-end gap-1">
                            <Terminal className="w-3.5 h-3.5 text-emerald-600" />
                            Challenge Solved
                          </span>
                        ) : (
                          <span className="text-slate-400">Challenge: Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500">
          <span>Click "Download PDF" to save an offline copy for your portfolio or resume.</span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors font-medium"
            >
              Close
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors font-semibold shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
