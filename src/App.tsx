/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CHAPTERS } from './data/chapters';
import { UserProgress, DifficultyLevel } from './types';
import { TopBar } from './components/TopBar';
import { ChapterReader } from './components/ChapterReader';
import { PythonSandbox } from './components/PythonSandbox';
import { SyllabusView } from './components/SyllabusView';
import { CheatsheetView } from './components/CheatsheetView';
import { CertificateView } from './components/CertificateView';
import { ProgressReportModal } from './components/ProgressReportModal';
import { BookOpen, Terminal, Sparkles, Award, RotateCcw } from 'lucide-react';

const STORAGE_KEY = 'python_mastery_progress_v1';

const defaultProgress: UserProgress = {
  studentName: 'Python Student',
  completedChapters: [],
  completedChallenges: [],
  quizScores: {},
  bookmarks: [],
  customCodes: {},
  preferredDifficulty: 'Easy',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'reader' | 'sandbox' | 'cheatsheet' | 'certificate'>('reader');
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [sandboxCode, setSandboxCode] = useState<string>('');
  const [isProgressModalOpen, setIsProgressModalOpen] = useState<boolean>(false);
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyLevel | 'All'>('All');
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyLevel>('Easy');

  // Load user progress from localStorage
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProgress, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return defaultProgress;
  });

  // Save to localStorage on progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore
    }
  }, [progress]);

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  const completedCount = progress.completedChapters.length;
  const progressPercent = Math.round((completedCount / CHAPTERS.length) * 100);

  // Compute average quiz score
  const quizScoreValues = Object.values(progress.quizScores);
  const averageQuizScore =
    quizScoreValues.length > 0
      ? Math.round(quizScoreValues.reduce((a, b) => a + b, 0) / quizScoreValues.length)
      : 0;

  const handleToggleBookmark = (chapterId: number) => {
    setProgress((prev) => {
      const exists = prev.bookmarks.includes(chapterId);
      const nextBookmarks = exists
        ? prev.bookmarks.filter((id) => id !== chapterId)
        : [...prev.bookmarks, chapterId];
      return { ...prev, bookmarks: nextBookmarks };
    });
  };

  const handleToggleComplete = (chapterId: number) => {
    setProgress((prev) => {
      const exists = prev.completedChapters.includes(chapterId);
      const nextCompleted = exists
        ? prev.completedChapters.filter((id) => id !== chapterId)
        : [...prev.completedChapters, chapterId];
      return { ...prev, completedChapters: nextCompleted };
    });
  };

  const handleSelectChapter = (id: number) => {
    setActiveChapterId(id);
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunInSandbox = (codeSnippet: string) => {
    setSandboxCode(codeSnippet);
    setActiveTab('sandbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChallengePassed = (challengeId: string) => {
    setProgress((prev) => {
      if (prev.completedChallenges.includes(challengeId)) return prev;
      return {
        ...prev,
        completedChallenges: [...prev.completedChallenges, challengeId],
      };
    });
  };

  const handleQuizComplete = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [activeChapterId]: score,
      },
    }));
  };

  const handleUpdateName = (name: string) => {
    setProgress((prev) => ({ ...prev, studentName: name }));
  };

  const handleResume = () => {
    // Find first uncompleted chapter or default to current active
    const nextUncompleted = CHAPTERS.find((c) => !progress.completedChapters.includes(c.id));
    if (nextUncompleted) {
      setActiveChapterId(nextUncompleted.id);
    }
    setActiveTab('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDifficulty = (diff: DifficultyLevel | 'All') => {
    setDifficultyFilter(diff);
    if (diff !== 'All') {
      setActiveDifficulty(diff);
      setProgress((prev) => ({ ...prev, preferredDifficulty: diff }));
    }
  };

  const handleChangeChallengeDifficulty = (diff: DifficultyLevel) => {
    setActiveDifficulty(diff);
    setProgress((prev) => ({ ...prev, preferredDifficulty: diff }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all reading progress, quiz scores, and saved bookmarks?')) {
      setProgress(defaultProgress);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-slate-900 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        progressPercent={progressPercent}
        completedCount={completedCount}
        totalChapters={CHAPTERS.length}
        onResume={handleResume}
        bookmarksCount={progress.bookmarks.length}
        onOpenProgressReport={() => setIsProgressModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 pb-16">
        {activeTab === 'syllabus' && (
          <SyllabusView
            chapters={CHAPTERS}
            completedChapterIds={progress.completedChapters}
            completedChallengeIds={progress.completedChallenges}
            quizScores={progress.quizScores}
            bookmarkedIds={progress.bookmarks}
            onSelectChapter={handleSelectChapter}
            onToggleBookmark={handleToggleBookmark}
            progressPercent={progressPercent}
            onOpenProgressReport={() => setIsProgressModalOpen(true)}
            selectedDifficulty={difficultyFilter}
            onSelectDifficulty={handleSelectDifficulty}
          />
        )}

        {activeTab === 'reader' && (
          <ChapterReader
            chapter={activeChapter}
            totalChapters={CHAPTERS.length}
            isCompleted={progress.completedChapters.includes(activeChapter.id)}
            isBookmarked={progress.bookmarks.includes(activeChapter.id)}
            onToggleBookmark={handleToggleBookmark}
            onToggleComplete={handleToggleComplete}
            onSelectChapter={handleSelectChapter}
            onRunInSandbox={handleRunInSandbox}
            isChallengeSolved={progress.completedChallenges.includes(activeChapter.challenge.id)}
            onChallengePassed={handleChallengePassed}
            quizScore={progress.quizScores[activeChapter.id]}
            onQuizComplete={handleQuizComplete}
            challengeDifficulty={activeDifficulty}
            onChangeChallengeDifficulty={handleChangeChallengeDifficulty}
            completedChallengeIds={progress.completedChallenges}
          />
        )}

        {activeTab === 'sandbox' && (
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Interactive Python Code Sandbox
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Run Python in your browser with real-time terminal output and variable stack/heap memory tracing.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('reader')}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>Return to Chapter {activeChapter.number}</span>
                </button>
              </div>
            </div>

            <PythonSandbox
              initialCode={sandboxCode || undefined}
              chapterTitle={`Chapter ${activeChapter.number}: ${activeChapter.title}`}
            />
          </div>
        )}

        {activeTab === 'cheatsheet' && (
          <CheatsheetView onOpenInSandbox={handleRunInSandbox} />
        )}

        {activeTab === 'certificate' && (
          <CertificateView
            studentName={progress.studentName}
            onUpdateName={handleUpdateName}
            completedChaptersCount={completedCount}
            totalChapters={CHAPTERS.length}
            completedChallengesCount={progress.completedChallenges.length}
            averageQuizScore={averageQuizScore}
            onOpenProgressReport={() => setIsProgressModalOpen(true)}
          />
        )}
      </main>

      {/* Student Progress and Quiz Summary Report Modal */}
      <ProgressReportModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        chapters={CHAPTERS}
        progress={progress}
        studentName={progress.studentName}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-8 px-4 sm:px-6 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-sky-600 text-white font-bold text-2xs flex items-center justify-center">
              Py
            </div>
            <span className="font-semibold text-slate-700">Python Mastery</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>A Complete Zero-to-Hero Interactive Tutorial Book</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleResetProgress}
              className="flex items-center gap-1 text-slate-400 hover:text-red-600 transition-colors"
              title="Reset progress"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Progress</span>
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Client-side Python Runtime</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
