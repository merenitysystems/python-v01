import React, { useState } from 'react';
import { Chapter, DifficultyLevel, UserProgress } from '../types';
import {
  CheckCircle2,
  Bookmark,
  Award,
  ArrowRight,
  Sparkles,
  Terminal,
  Download,
  Filter,
  SlidersHorizontal,
  Flame,
  Check,
  Trophy,
  Lock,
} from 'lucide-react';
import { getBadgesWithStatus } from '../utils/badgeSystem';
import { BadgeIcon } from './BadgeIcon';

interface SyllabusViewProps {
  chapters: Chapter[];
  completedChapterIds: number[];
  completedChallengeIds: string[];
  quizScores: Record<number, number>;
  bookmarkedIds: number[];
  onSelectChapter: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  progressPercent: number;
  onOpenProgressReport: () => void;
  selectedDifficulty?: DifficultyLevel | 'All';
  onSelectDifficulty?: (difficulty: DifficultyLevel | 'All') => void;
  onOpenBadges?: () => void;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  chapters,
  completedChapterIds,
  completedChallengeIds,
  quizScores,
  bookmarkedIds,
  onSelectChapter,
  onToggleBookmark,
  progressPercent,
  onOpenProgressReport,
  selectedDifficulty = 'All',
  onSelectDifficulty,
  onOpenBadges,
}) => {
  const [localDifficulty, setLocalDifficulty] = useState<DifficultyLevel | 'All'>(selectedDifficulty);
  const activeDifficulty = onSelectDifficulty ? selectedDifficulty : localDifficulty;

  const handleDifficultySelect = (diff: DifficultyLevel | 'All') => {
    setLocalDifficulty(diff);
    if (onSelectDifficulty) {
      onSelectDifficulty(diff);
    }
  };

  const filteredChapters =
    activeDifficulty === 'All'
      ? chapters
      : chapters.filter((c) => c.difficulty === activeDifficulty);

  const easyCount = chapters.filter((c) => c.difficulty === 'Easy').length;
  const mediumCount = chapters.filter((c) => c.difficulty === 'Medium').length;
  const hardCount = chapters.filter((c) => c.difficulty === 'Hard').length;

  const acts = [
    {
      id: 'act1',
      title: 'Act I: Foundations of Python',
      subtitle: 'Syntax anatomy, mental models of variables, and basic arithmetic.',
      chapters: filteredChapters.filter((c) => c.act === 'act1'),
    },
    {
      id: 'act2',
      title: 'Act II: Logic, Control Flow & Data Structures',
      subtitle: 'Branching decisions, loops, lists, slicing, and dictionary hash tables.',
      chapters: filteredChapters.filter((c) => c.act === 'act2'),
    },
    {
      id: 'act3',
      title: 'Act III: Modern Mastery & Practical Projects',
      subtitle: 'Modular functions, defensive exception handling, OOP, and capstone programs.',
      chapters: filteredChapters.filter((c) => c.act === 'act3'),
    },
  ];

  const totalReadTime = filteredChapters.reduce((acc, c) => acc + c.readTimeMinutes, 0);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* Hero Header */}
      <div className="mb-8 text-center sm:text-left sm:flex sm:items-end sm:justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-sky-700 font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Zero-to-Hero Textbook</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Python Mastery Curriculum
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl text-base leading-relaxed">
            Ten comprehensive chapters taking you from absolute beginner to building object-oriented scripts, text adventure games, and data filters.
          </p>
        </div>

        {/* Overall Curriculum Metrics Card */}
        <div className="mt-6 sm:mt-0 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs shrink-0 text-left min-w-[240px]">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">Overall Progress</span>
            <span className="font-bold text-sky-700 tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-sky-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-2xs text-slate-500 font-medium pt-2 border-t border-slate-100">
            <span>{completedChapterIds.length}/{chapters.length} Chapters</span>
            <span aria-hidden="true">·</span>
            <span>{completedChallengeIds.length}/{chapters.length} Challenges</span>
            <span aria-hidden="true">·</span>
            <span>~{totalReadTime}m Reading</span>
          </div>
          <button
            onClick={onOpenProgressReport}
            className="w-full mt-3 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-2xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3 h-3 text-sky-400" />
            <span>Download Progress & Quiz PDF</span>
          </button>
        </div>
      </div>

      {/* Difficulty Filter Bar */}
      <div className="mb-8 p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Curriculum Difficulty Tier:
            </span>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleDifficultySelect('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeDifficulty === 'All'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>All Levels</span>
              <span className={`text-2xs px-1.5 py-0.2 rounded font-mono ${
                activeDifficulty === 'All' ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'
              }`}>
                {chapters.length}
              </span>
            </button>

            <button
              onClick={() => handleDifficultySelect('Easy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                activeDifficulty === 'Easy'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-emerald-50/70 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                activeDifficulty === 'Easy' ? 'bg-white' : 'bg-emerald-500'
              }`} />
              <span>Easy (Beginner)</span>
              <span className={`text-2xs px-1.5 py-0.2 rounded font-mono ${
                activeDifficulty === 'Easy' ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {easyCount}
              </span>
            </button>

            <button
              onClick={() => handleDifficultySelect('Medium')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                activeDifficulty === 'Medium'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-amber-50/70 text-amber-800 border-amber-200 hover:bg-amber-100/70'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${
                activeDifficulty === 'Medium' ? 'bg-white' : 'bg-amber-500'
              }`} />
              <span>Medium (Core)</span>
              <span className={`text-2xs px-1.5 py-0.2 rounded font-mono ${
                activeDifficulty === 'Medium' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {mediumCount}
              </span>
            </button>

            <button
              onClick={() => handleDifficultySelect('Hard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                activeDifficulty === 'Hard'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-rose-50/70 text-rose-800 border-rose-200 hover:bg-rose-100/70'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${
                activeDifficulty === 'Hard' ? 'text-white' : 'text-rose-600'
              }`} />
              <span>Hard (Advanced)</span>
              <span className={`text-2xs px-1.5 py-0.2 rounded font-mono ${
                activeDifficulty === 'Hard' ? 'bg-rose-700 text-white' : 'bg-rose-100 text-rose-800'
              }`}>
                {hardCount}
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Context Banner */}
        {activeDifficulty !== 'All' && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-600">
              Filtered to <strong className="text-slate-900">{activeDifficulty}</strong> chapters ({filteredChapters.length} available).
              Coding challenge complexity across the course is dynamically tuned to <strong>{activeDifficulty}</strong> mode.
            </span>
            <button
              onClick={() => handleDifficultySelect('All')}
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 underline underline-offset-2"
            >
              Show all 10 chapters
            </button>
          </div>
        )}
      </div>

      {/* Digital Badges & Achievements Section */}
      {(() => {
        const dummyProgress: UserProgress = {
          studentName: '',
          completedChapters: completedChapterIds,
          completedChallenges: completedChallengeIds,
          quizScores,
          bookmarks: bookmarkedIds,
          customCodes: {},
        };
        const allBadges = getBadgesWithStatus(dummyProgress);
        const unlockedBadges = allBadges.filter((b) => b.unlocked);

        return (
          <div className="mb-10 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-50 border border-amber-200/80 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-xs">
                  <Trophy className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">Digital Achievement Badges</h3>
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-2xs font-bold border border-amber-200">
                      {unlockedBadges.length}/{allBadges.length} Earned
                    </span>
                  </div>
                  <p className="text-2xs text-slate-500 mt-0.5">
                    Unlock digital credentials like <em>'Loop Master'</em> and <em>'Syntax Sage'</em> by completing coding challenges or scoring 100% on quizzes.
                  </p>
                </div>
              </div>

              {onOpenBadges && (
                <button
                  onClick={onOpenBadges}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View All Badges ({allBadges.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Badges Quick Shelf */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-1">
              {allBadges.slice(0, 6).map((badge) => {
                return (
                  <button
                    key={badge.id}
                    onClick={onOpenBadges}
                    className={`p-3 rounded-xl border text-left flex flex-col items-center text-center transition-all group ${
                      badge.unlocked
                        ? 'bg-white border-amber-300 shadow-2xs hover:shadow-xs hover:border-amber-400'
                        : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-2xs transition-transform group-hover:scale-105 ${
                        badge.unlocked
                          ? `bg-gradient-to-tr ${badge.gradient} text-white`
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <BadgeIcon iconName={badge.icon} size="sm" unlocked={badge.unlocked} />
                    </div>

                    <span className="text-xs font-bold text-slate-900 leading-tight truncate w-full">
                      {badge.name}
                    </span>

                    <span className="mt-1 text-3xs font-semibold uppercase tracking-wider block">
                      {badge.unlocked ? (
                        <span className="text-emerald-700 flex items-center justify-center gap-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Unlocked
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center justify-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> Locked
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {allBadges.length > 6 && (
              <div className="mt-3 pt-2.5 border-t border-amber-200/50 flex items-center justify-between text-2xs text-slate-500">
                <span>
                  {unlockedBadges.length === 0
                    ? 'Start by passing the Chapter 1 challenge or quiz to earn your first badge!'
                    : `Great progress! You have earned ${unlockedBadges.length} badge${unlockedBadges.length === 1 ? '' : 's'}.`}
                </span>
                {onOpenBadges && (
                  <button
                    onClick={onOpenBadges}
                    className="font-semibold text-amber-800 hover:text-amber-900 hover:underline"
                  >
                    See all {allBadges.length} badges & unlock criteria &rarr;
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })()}

      {/* Acts & Chapters List */}
      <div className="space-y-12">
        {acts.map((act, actIndex) => {
          if (act.chapters.length === 0) return null;

          return (
            <section key={act.id} className="space-y-4">
              <div className="border-b border-slate-200/80 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center">
                      {actIndex + 1}
                    </span>
                    <span>{act.title}</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 pl-8">{act.subtitle}</p>
                </div>
                <span className="text-2xs text-slate-400 font-medium">
                  {act.chapters.length} {act.chapters.length === 1 ? 'chapter' : 'chapters'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {act.chapters.map((ch) => {
                  const isCompleted = completedChapterIds.includes(ch.id);
                  const isChallengePassed = completedChallengeIds.includes(ch.challenge.id) ||
                    (ch.challengesByDifficulty &&
                      Object.values(ch.challengesByDifficulty).some((c) =>
                        completedChallengeIds.includes(c.id)
                      ));
                  const isBookmarked = bookmarkedIds.includes(ch.id);
                  const score = quizScores[ch.id];

                  return (
                    <div
                      key={ch.id}
                      className={`bg-white rounded-xl border transition-all p-5 shadow-2xs hover:shadow-xs flex flex-col justify-between ${
                        isCompleted
                          ? 'border-emerald-200 hover:border-emerald-300'
                          : 'border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      <div>
                        {/* Card Top Unboxed Metadata */}
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <span className="font-mono font-semibold text-sky-700">Ch. {ch.number}</span>
                            <span aria-hidden="true">·</span>
                            <span>{ch.readTimeMinutes} min</span>
                            <span aria-hidden="true">·</span>
                            {/* Difficulty Tag Badge */}
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-2xs font-semibold ${
                                ch.difficulty === 'Easy'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : ch.difficulty === 'Medium'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  ch.difficulty === 'Easy'
                                    ? 'bg-emerald-500'
                                    : ch.difficulty === 'Medium'
                                    ? 'bg-amber-500'
                                    : 'bg-rose-500'
                                }`}
                              />
                              {ch.difficulty}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onToggleBookmark(ch.id)}
                              className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
                              title="Bookmark"
                            >
                              <Bookmark
                                className={`w-4 h-4 ${
                                  isBookmarked ? 'fill-amber-500 text-amber-500' : ''
                                }`}
                              />
                            </button>
                            {isCompleted && (
                              <span title="Completed">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {ch.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {ch.subtitle}
                        </p>
                      </div>

                      {/* Bottom Status & CTA */}
                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-2xs text-slate-500 font-medium">
                          {isChallengePassed ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <Terminal className="w-3 h-3 text-emerald-600" />
                              Challenge Solved
                            </span>
                          ) : (
                            <span className="text-slate-400 flex items-center gap-1">
                              <Terminal className="w-3 h-3 text-slate-400" />
                              Challenge Pending
                            </span>
                          )}

                          <span aria-hidden="true">·</span>

                          {score !== undefined ? (
                            <span className="text-sky-700 font-semibold flex items-center gap-1">
                              <Award className="w-3 h-3 text-sky-600" />
                              Quiz: {score}%
                            </span>
                          ) : (
                            <span className="text-slate-400">Quiz: -</span>
                          )}
                        </div>

                        <button
                          onClick={() => onSelectChapter(ch.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-sky-700 transition-colors"
                        >
                          <span>{isCompleted ? 'Review' : 'Read'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
