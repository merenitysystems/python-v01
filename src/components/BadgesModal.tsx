import React, { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Filter,
  Trophy,
  Zap,
  Terminal,
} from 'lucide-react';
import { Badge, UserProgress } from '../types';
import { getBadgesWithStatus } from '../utils/badgeSystem';
import { BadgeIcon } from './BadgeIcon';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  studentName?: string;
  onGoToChapter?: (chapterId: number) => void;
}

type BadgeCategoryFilter = 'all' | 'challenge' | 'quiz' | 'mastery';

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  progress,
  studentName = 'Python Student',
}) => {
  const [filter, setFilter] = useState<BadgeCategoryFilter>('all');

  if (!isOpen) return null;

  const badges: Badge[] = getBadgesWithStatus(progress);
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const progressPercent = Math.round((unlockedCount / badges.length) * 100);

  const filteredBadges =
    filter === 'all' ? badges : badges.filter((b) => b.category === filter);

  const challengeCount = badges.filter((b) => b.category === 'challenge').length;
  const quizCount = badges.filter((b) => b.category === 'quiz').length;
  const masteryCount = badges.filter((b) => b.category === 'mastery').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md">
              <Award className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-lg">Digital Achievement Badges</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-2xs border border-amber-400/30">
                  {unlockedCount} / {badges.length} Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Earn digital trophies by solving coding challenges and acing chapter comprehension quizzes.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Metric Deck */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-[240px]">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Badge Completion</span>
                <span className="font-bold text-amber-600 tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All ({badges.length})
            </button>
            <button
              onClick={() => setFilter('challenge')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === 'challenge'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Challenges ({challengeCount})
            </button>
            <button
              onClick={() => setFilter('quiz')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === 'quiz'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Quizzes ({quizCount})
            </button>
            <button
              onClick={() => setFilter('mastery')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                filter === 'mastery'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Mastery ({masteryCount})
            </button>
          </div>
        </div>

        {/* Badges Grid View */}
        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => {
              return (
                <div
                  key={badge.id}
                  className={`relative rounded-xl border p-4.5 flex flex-col justify-between transition-all ${
                    badge.unlocked
                      ? 'bg-white border-amber-300 shadow-xs ring-1 ring-amber-100'
                      : 'bg-slate-50/70 border-slate-200 opacity-80'
                  }`}
                >
                  <div>
                    {/* Badge Top: Medallion and Status Tag */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-xs transition-transform ${
                          badge.unlocked
                            ? `bg-gradient-to-tr ${badge.gradient} text-white shadow-md`
                            : 'bg-slate-200 text-slate-400'
                        }`}
                      >
                        <BadgeIcon
                          iconName={badge.icon}
                          size="md"
                          unlocked={badge.unlocked}
                        />
                      </div>

                      <div>
                        {badge.unlocked ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-2xs font-bold border border-emerald-200 shadow-2xs">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Unlocked</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-2xs font-semibold">
                            <Lock className="w-2.5 h-2.5 text-slate-500" />
                            <span>Locked</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Badge Title & Category */}
                    <div className="mb-1">
                      <h4 className="text-base font-bold text-slate-900 leading-snug">
                        {badge.name}
                      </h4>
                      <span className="text-2xs font-semibold uppercase tracking-wider text-slate-400">
                        {badge.category === 'challenge'
                          ? 'Coding Challenge'
                          : badge.category === 'quiz'
                          ? 'Quiz Mastery'
                          : 'Grand Milestone'}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>

                  {/* Criteria & Current Progress */}
                  <div className="mt-4 pt-3 border-t border-slate-100 text-2xs">
                    <div className="text-slate-500">
                      <span className="font-semibold text-slate-700">Criteria: </span>
                      {badge.criteria}
                    </div>

                    {badge.progressText && (
                      <div className="mt-1.5 flex items-center justify-between font-mono text-2xs">
                        <span className="text-slate-400">Status:</span>
                        <span
                          className={`font-semibold ${
                            badge.unlocked ? 'text-emerald-700' : 'text-slate-600'
                          }`}
                        >
                          {badge.progressText}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Awarded to <strong>{studentName}</strong> for verified course achievements.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors shadow-2xs"
          >
            Close Badges
          </button>
        </div>
      </div>
    </div>
  );
};
