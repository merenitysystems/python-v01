import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import { renderHighlightedSpans } from '../utils/pythonHighlighter';

interface ChapterQuizProps {
  questions: QuizQuestion[];
  chapterNumber: string;
  chapterTitle: string;
  savedScore?: number;
  onQuizComplete: (scorePercentage: number) => void;
}

export const ChapterQuiz: React.FC<ChapterQuizProps> = ({
  questions,
  chapterNumber,
  chapterTitle,
  savedScore,
  onQuizComplete,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(savedScore !== undefined);
  const [score, setScore] = useState<number>(savedScore || 0);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    setScore(percentage);
    setIsSubmitted(true);
    onQuizComplete(percentage);
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const allAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
        <div>
          <span className="text-xs font-semibold text-sky-700 tracking-wider uppercase">
            Chapter {chapterNumber} Knowledge Check
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">Quick Comprehension Quiz</h3>
        </div>

        {isSubmitted && (
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
              score === 100
                ? 'bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-200'
                : 'bg-sky-50 text-sky-800 border-sky-200'
            }`}>
              <Award className={`w-4 h-4 ${score === 100 ? 'text-amber-600' : 'text-sky-600'}`} />
              <span>Score: {score}% {score === 100 ? '★ Perfect!' : ''}</span>
            </div>
            <button
              onClick={handleRetake}
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake</span>
            </button>
          </div>
        )}
      </div>

      {isSubmitted && score === 100 && (
        <div className="mx-5 mt-4 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-yellow-50 border border-amber-300 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-900">
            <Award className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>100% Comprehension Mastery!</strong> You earned digital badge credit towards <em>Quiz Perfectionist</em> and Chapter {chapterNumber} badge milestones!
            </span>
          </div>
          <span className="shrink-0 px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold text-2xs uppercase tracking-wider">
            Badge Credited
          </span>
        </div>
      )}

      <div className="p-5 space-y-6">
        {questions.map((q, qIndex) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = isSubmitted && selected === q.correctAnswer;
          const isIncorrect = isSubmitted && selected !== undefined && selected !== q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-colors ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-red-200 bg-red-50/30'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start gap-2.5 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">{q.question}</h4>
                  {q.codeSnippet && (
                    <pre className="mt-2 p-2.5 rounded bg-[#0b0f19] text-slate-100 font-mono text-2xs overflow-x-auto border border-slate-800 whitespace-pre">
                      {renderHighlightedSpans(q.codeSnippet)}
                    </pre>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 mt-3 pl-8">
                {q.options.map((opt, optIndex) => {
                  const isThisSelected = selected === optIndex;
                  const isThisCorrect = isSubmitted && optIndex === q.correctAnswer;
                  const isThisWrongSelected = isSubmitted && isThisSelected && !isThisCorrect;

                  let optionStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';
                  if (isThisSelected && !isSubmitted) {
                    optionStyle = 'border-sky-500 bg-sky-50 text-sky-900 font-medium';
                  } else if (isThisCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                  } else if (isThisWrongSelected) {
                    optionStyle = 'border-red-400 bg-red-50 text-red-900';
                  }

                  return (
                    <button
                      key={optIndex}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelect(q.id, optIndex)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border text-xs text-left transition-colors ${optionStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-current/40 flex items-center justify-center text-2xs font-semibold shrink-0">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSubmitted && (
                        <div>
                          {isThisCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {isThisWrongSelected && <XCircle className="w-4 h-4 text-red-500 shrink-0" />}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {isSubmitted && (
                <div className="mt-3.5 pl-8 pt-3 border-t border-slate-200/60 text-xs text-slate-600 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800">Explanation: </span>
                    {q.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Submit */}
      {!isSubmitted && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Select an answer for each question to submit your quiz.
          </span>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          >
            Submit Answers
          </button>
        </div>
      )}
    </div>
  );
};
