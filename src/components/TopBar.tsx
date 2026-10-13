import React from 'react';
import { BookOpen, Terminal, Sparkles, Award, ListFilter, Bookmark, FileText } from 'lucide-react';

interface TopBarProps {
  activeTab: 'syllabus' | 'reader' | 'sandbox' | 'cheatsheet' | 'certificate';
  onSelectTab: (tab: 'syllabus' | 'reader' | 'sandbox' | 'cheatsheet' | 'certificate') => void;
  progressPercent: number;
  completedCount: number;
  totalChapters: number;
  onResume: () => void;
  bookmarksCount: number;
  onOpenProgressReport?: () => void;
  unlockedBadgesCount?: number;
  totalBadgesCount?: number;
  onOpenBadges?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  progressPercent,
  completedCount,
  totalChapters,
  onResume,
  bookmarksCount,
  onOpenProgressReport,
  unlockedBadgesCount = 0,
  totalBadgesCount = 13,
  onOpenBadges,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Title - Single text element wordmark */}
        <button
          onClick={() => onSelectTab('syllabus')}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs group-hover:bg-sky-700 transition-colors">
            Py
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group-hover:text-sky-700 transition-colors">
            Python Mastery
          </span>
        </button>

        {/* Zone 2: Navigation Links (single line, no wrapping) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('syllabus')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'syllabus'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <ListFilter className="w-4 h-4" />
            <span>Syllabus</span>
          </button>

          <button
            onClick={() => onSelectTab('reader')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'reader'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Tutorial Book</span>
          </button>

          <button
            onClick={() => onSelectTab('sandbox')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'sandbox'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Code Sandbox</span>
          </button>

          <button
            onClick={() => onSelectTab('cheatsheet')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'cheatsheet'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Cheatsheet</span>
          </button>

          <button
            onClick={() => onSelectTab('certificate')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
              activeTab === 'certificate'
                ? 'border-sky-600 text-sky-700 font-semibold'
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificate</span>
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {onOpenBadges && (
            <button
              onClick={onOpenBadges}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-colors shadow-2xs"
              title="View Digital Achievement Badges"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Badges</span>
              <span className="text-2xs bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded font-mono font-bold">
                {unlockedBadgesCount}/{totalBadgesCount}
              </span>
            </button>
          )}

          {onOpenProgressReport ? (
            <button
              onClick={onOpenProgressReport}
              className="hidden lg:flex items-center gap-2 text-xs text-slate-500 font-medium hover:text-slate-900 transition-colors p-1.5 rounded-md hover:bg-slate-100"
              title="Click to view & download full Academic Progress Transcript (PDF)"
            >
              <FileText className="w-3.5 h-3.5 text-sky-600" />
              <span className="tabular-nums font-semibold text-slate-700">
                {completedCount}/{totalChapters} Chapters
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="tabular-nums font-semibold text-sky-700">{progressPercent}%</span>
              {bookmarksCount > 0 && (
                <>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                    {bookmarksCount}
                  </span>
                </>
              )}
            </button>
          ) : (
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="tabular-nums font-semibold text-slate-700">
                {completedCount}/{totalChapters} Chapters
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="tabular-nums font-semibold text-sky-700">{progressPercent}%</span>
            </div>
          )}

          <button
            onClick={onResume}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Resume</span>
          </button>
        </div>
      </div>
    </header>
  );
};
