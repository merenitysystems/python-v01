import React, { useState } from 'react';
import { Chapter, DifficultyLevel } from '../types';
import {
  Bookmark,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Play,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  BookOpen,
  SlidersHorizontal,
} from 'lucide-react';
import { MemoryVisualizer } from './MemoryVisualizer';
import { ChallengeRunner } from './ChallengeRunner';
import { ChapterQuiz } from './ChapterQuiz';
import { PythonCodeBlock, renderHighlightedSpans } from '../utils/pythonHighlighter';
import { getChallengeForDifficulty } from '../utils/difficultyChallenges';

interface ChapterReaderProps {
  chapter: Chapter;
  totalChapters: number;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (chapterId: number) => void;
  onToggleComplete: (chapterId: number) => void;
  onSelectChapter: (chapterId: number) => void;
  onRunInSandbox: (codeSnippet: string) => void;
  isChallengeSolved: boolean;
  onChallengePassed: (challengeId: string) => void;
  quizScore?: number;
  onQuizComplete: (score: number) => void;
  challengeDifficulty?: DifficultyLevel;
  onChangeChallengeDifficulty?: (difficulty: DifficultyLevel) => void;
  completedChallengeIds?: string[];
}

export const ChapterReader: React.FC<ChapterReaderProps> = ({
  chapter,
  totalChapters,
  isCompleted,
  isBookmarked,
  onToggleBookmark,
  onToggleComplete,
  onSelectChapter,
  onRunInSandbox,
  isChallengeSolved,
  onChallengePassed,
  quizScore,
  onQuizComplete,
  challengeDifficulty = 'Easy',
  onChangeChallengeDifficulty,
  completedChallengeIds = [],
}) => {
  const [internalDiff, setInternalDiff] = useState<DifficultyLevel>(challengeDifficulty);
  const currentDiff = challengeDifficulty || internalDiff;
  const activeChallenge = getChallengeForDifficulty(chapter.id, currentDiff, chapter.challenge);
  const isSolved = completedChallengeIds.includes(activeChallenge.id) || isChallengeSolved;
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(id);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const hasPrev = chapter.id > 1;
  const hasNext = chapter.id < totalChapters;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Chapter Top Metadata & Title */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-3">
          {/* Zero-Pill Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="text-sky-700 font-semibold tracking-wider uppercase">
              Act {chapter.act === 'act1' ? 'I: Foundations' : chapter.act === 'act2' ? 'II: Logic & Data' : 'III: Mastery & Projects'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Chapter {chapter.number} of {totalChapters}</span>
            <span aria-hidden="true">·</span>
            <span>{chapter.readTimeMinutes} min read</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(chapter.id)}
              className={`p-2 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
                isBookmarked
                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-600'
              }`}
              title="Bookmark this chapter"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              onClick={() => onToggleComplete(chapter.id)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isCompleted
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`} />
              <span>{isCompleted ? 'Chapter Completed' : 'Mark as Read'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
          {chapter.title}
        </h1>
        <p className="text-lg text-slate-600 mt-2 font-normal text-balance">
          {chapter.subtitle}
        </p>

        <div className="mt-4 p-4 rounded-xl bg-sky-50/60 border border-sky-100 text-sm text-sky-950 leading-relaxed">
          <strong>Chapter Objective:</strong> {chapter.summary}
        </div>
      </div>

      {/* Chapter Sections */}
      <div className="space-y-12">
        {chapter.sections.map((section, sIdx) => (
          <article key={section.id} className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-700 uppercase tracking-wider">
                Section {chapter.number}.{sIdx + 1}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {section.title}
            </h2>

            {/* Paragraph Text */}
            <div className="text-slate-700 text-base leading-relaxed space-y-4 whitespace-pre-line">
              {section.content}
            </div>

            {/* Code Sample */}
            {section.codeSample && (
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0b0f19] shadow-sm my-4">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span className="font-mono text-2xs text-slate-400">example.py</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCode(section.id, section.codeSample!)}
                      className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                      title="Copy code"
                    >
                      {copiedSnippetIndex === section.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-2xs text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-2xs">Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onRunInSandbox(section.codeSample!)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium text-2xs transition-colors"
                      title="Run code in interactive sandbox"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Run in Sandbox</span>
                    </button>
                  </div>
                </div>

                <PythonCodeBlock code={section.codeSample} />
              </div>
            )}

            {/* Beginner Gotcha! Callout */}
            {section.gotcha && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-2xs my-4">
                <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Beginner Gotcha: {section.gotcha.title}</span>
                </div>
                <p className="text-xs text-amber-900/80 mb-3 leading-relaxed">
                  {section.gotcha.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-2xs">
                  <div className="bg-red-950/90 text-red-200 p-3 rounded-lg border border-red-800/80">
                    <span className="text-red-400 block mb-1 font-sans font-semibold">❌ What to Avoid:</span>
                    <pre className="whitespace-pre-wrap">{renderHighlightedSpans(section.gotcha.badCode)}</pre>
                  </div>
                  <div className="bg-emerald-950/90 text-emerald-200 p-3 rounded-lg border border-emerald-800/80">
                    <span className="text-emerald-400 block mb-1 font-sans font-semibold">✅ Recommended Pythonic Way:</span>
                    <pre className="whitespace-pre-wrap">{renderHighlightedSpans(section.gotcha.goodCode)}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Deep Dive Callout */}
            {section.deepDive && (
              <div className="rounded-xl border border-sky-200 bg-sky-50/40 p-5 my-4">
                <div className="flex items-center gap-2 text-sky-900 font-semibold text-sm mb-1">
                  <Lightbulb className="w-4 h-4 text-sky-600" />
                  <span>Senior Insight: {section.deepDive.title}</span>
                </div>
                <p className="text-xs text-sky-950/80 leading-relaxed">
                  {section.deepDive.explanation}
                </p>
              </div>
            )}

            {/* Visual Memory Sample */}
            {section.memorySample && (
              <div className="my-6">
                <MemoryVisualizer
                  variables={section.memorySample.variables}
                  title="Mental Model: What Happens in Memory"
                  description={section.memorySample.description}
                />
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Key Takeaways */}
      <div className="my-12 p-6 rounded-xl border border-slate-200 bg-slate-50/80">
        <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-sky-600" />
          <span>Chapter Key Takeaways</span>
        </h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {chapter.keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hands-On Challenge */}
      <div className="my-12">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Challenge Complexity Level:
            </span>
            <span className="text-2xs text-slate-500 hidden sm:inline">
              (Adjusts problem requirements and automated test suite)
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {(['Easy', 'Medium', 'Hard'] as DifficultyLevel[]).map((level) => {
              const isActive = currentDiff === level;
              return (
                <button
                  key={level}
                  onClick={() => {
                    setInternalDiff(level);
                    if (onChangeChallengeDifficulty) onChangeChallengeDifficulty(level);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    isActive
                      ? level === 'Easy'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : level === 'Medium'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-white' : level === 'Easy' ? 'bg-emerald-500' : level === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                  />
                  <span>{level}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ChallengeRunner
          challenge={activeChallenge}
          onChallengePassed={onChallengePassed}
          isCompleted={isSolved}
        />
      </div>

      {/* End-of-Chapter Quiz */}
      <div className="my-12">
        <ChapterQuiz
          questions={chapter.quiz}
          chapterNumber={chapter.number}
          chapterTitle={chapter.title}
          savedScore={quizScore}
          onQuizComplete={onQuizComplete}
        />
      </div>

      {/* Chapter Footer Navigation */}
      <div className="pt-8 mt-12 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        {hasPrev ? (
          <button
            onClick={() => onSelectChapter(chapter.id - 1)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: Chapter {chapter.id - 1}</span>
          </button>
        ) : (
          <div />
        )}

        {hasNext ? (
          <button
            onClick={() => {
              onToggleComplete(chapter.id);
              onSelectChapter(chapter.id + 1);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs ml-auto"
          >
            <span>Next: Chapter {chapter.id + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onToggleComplete(chapter.id)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-xs ml-auto"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Course Complete! View Certificate</span>
          </button>
        )}
      </div>
    </div>
  );
};
