import React, { useState, useEffect } from 'react';
import { Challenge, TestCase } from '../types';
import { pythonInterpreter } from '../utils/pythonInterpreter';
import { Play, CheckCircle2, XCircle, Lightbulb, Eye, RotateCcw, Award } from 'lucide-react';
import { HighlightedEditor, renderHighlightedSpans } from '../utils/pythonHighlighter';

interface ChallengeRunnerProps {
  challenge: Challenge;
  onChallengePassed: (challengeId: string) => void;
  isCompleted: boolean;
  savedCode?: string;
  onCodeSave?: (code: string) => void;
}

interface TestRunResult {
  testIndex: number;
  passed: boolean;
  expected: string;
  actual: string;
  errorMessage?: string;
}

export const ChallengeRunner: React.FC<ChallengeRunnerProps> = ({
  challenge,
  onChallengePassed,
  isCompleted,
  savedCode,
  onCodeSave,
}) => {
  const [code, setCode] = useState(savedCode || challenge.starterCode);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestRunResult[] | null>(null);
  const [overallPassed, setOverallPassed] = useState(isCompleted);

  useEffect(() => {
    setCode(savedCode || challenge.starterCode);
    setTestResults(null);
    setShowHint(false);
    setShowSolution(false);
    setOverallPassed(isCompleted);
  }, [challenge.id, challenge.starterCode, isCompleted, savedCode]);

  const handleRunTests = async () => {
    setIsRunning(true);
    const results: TestRunResult[] = [];
    let allPassed = true;

    try {
      for (let i = 0; i < challenge.testCases.length; i++) {
        const tc: TestCase = challenge.testCases[i];
        
        // Execute the student's code combined with test case execution or test against output
        const runRes = await pythonInterpreter.execute(code);
        
        // Check stdout output or evaluated expression
        const actualOutput = runRes.output.join('\n').trim();
        const expectedOutput = tc.expectedOutput.trim();

        const passed = runRes.success && actualOutput === expectedOutput;
        if (!passed) allPassed = false;

        results.push({
          testIndex: i,
          passed,
          expected: expectedOutput,
          actual: actualOutput || (runRes.errors.length > 0 ? runRes.errors[0] : '(no output)'),
          errorMessage: runRes.errors.length > 0 ? runRes.errors.join('\n') : undefined,
        });
      }

      setTestResults(results);
      if (allPassed) {
        setOverallPassed(true);
        onChallengePassed(challenge.id);
        if (onCodeSave) onCodeSave(code);
      }
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setTestResults(null);
    setShowSolution(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-sky-700 tracking-wider uppercase">
              Hands-On Coding Challenge
            </span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-xs text-slate-500 font-medium">{challenge.difficulty}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">{challenge.title}</h3>
        </div>

        {overallPassed && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Challenge Solved!</span>
          </div>
        )}
      </div>

      {/* Challenge Prompt */}
      <div className="p-5 bg-slate-50/60 border-b border-slate-100 text-sm text-slate-700 whitespace-pre-line leading-relaxed">
        {challenge.prompt}
      </div>

      {/* Code Editor */}
      <div className="bg-[#0b0f19] text-slate-100 font-mono text-xs">
        <div className="px-4 py-2 bg-slate-900 text-slate-400 flex items-center justify-between border-b border-slate-800 text-2xs">
          <span>solution.py</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showSolution ? 'Hide Solution' : 'Peek Solution'}</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {showHint && (
          <div className="px-4 py-3 bg-amber-950/40 border-b border-amber-900/60 text-amber-200 text-xs flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{challenge.hint}</span>
          </div>
        )}

        {showSolution && (
          <div className="p-4 bg-sky-950/40 border-b border-sky-900/60 text-xs">
            <div className="text-sky-300 font-semibold mb-1">Reference Solution:</div>
            <pre className="text-sky-200 overflow-x-auto p-2 bg-slate-950 rounded border border-sky-900/50">
              {renderHighlightedSpans(challenge.solution)}
            </pre>
          </div>
        )}

        <HighlightedEditor
          value={code}
          onChange={(newVal) => {
            setCode(newVal);
            if (onCodeSave) onCodeSave(newVal);
          }}
          minHeight="200px"
          placeholder="# Write your Python solution here..."
        />
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-slate-500">
          Run your solution to verify it satisfies all automated test cases.
        </span>

        <button
          onClick={handleRunTests}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-xs transition-colors disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunning ? 'Verifying Tests...' : 'Run & Verify Tests'}</span>
        </button>
      </div>

      {/* Test Case Results Pane */}
      {testResults && (
        <div className="p-5 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Automated Test Results ({testResults.filter((r) => r.passed).length}/{testResults.length} Passed)
            </h4>
            {overallPassed && (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <Award className="w-4 h-4 text-emerald-600" />
                All Tests Satisfied!
              </span>
            )}
          </div>

          {overallPassed && (
            <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-teal-50 border border-emerald-300 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-900">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Automated Tests Passed!</strong> Solution verified — Digital badge credited for <em>{challenge.title}</em>!
                </span>
              </div>
              <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold text-2xs uppercase tracking-wider">
                Badge Credited
              </span>
            </div>
          )}

          <div className="space-y-3">
            {testResults.map((tr, index) => {
              const tc = challenge.testCases[index];
              return (
                <div
                  key={index}
                  className={`p-3.5 rounded-lg border text-xs ${
                    tr.passed
                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      : 'bg-red-50/70 border-red-200 text-red-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {tr.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span>Test Case {index + 1}: {tc.inputDescription}</span>
                    </div>
                    <span className="text-2xs uppercase tracking-wider font-bold">
                      {tr.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 font-mono text-2xs bg-white/80 p-2.5 rounded border border-current/10">
                    <div>
                      <span className="text-slate-500 block mb-0.5 font-sans font-medium">Expected Output:</span>
                      <pre className="text-slate-800 whitespace-pre-wrap">{tr.expected}</pre>
                    </div>
                    <div>
                      <span className="text-slate-500 block mb-0.5 font-sans font-medium">Actual Output:</span>
                      <pre className={tr.passed ? 'text-emerald-700' : 'text-red-700'}>
                        {tr.actual}
                      </pre>
                    </div>
                  </div>

                  {tr.errorMessage && (
                    <div className="mt-2 text-2xs text-red-700 font-mono bg-red-100/60 p-2 rounded">
                      {tr.errorMessage}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
