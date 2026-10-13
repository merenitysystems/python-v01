import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Terminal,
  Layers,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Columns,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { pythonInterpreter } from '../utils/pythonInterpreter';
import { ExecutionResult } from '../types';
import { MemoryVisualizer } from './MemoryVisualizer';
import { MemoryWatcherPanel } from './MemoryWatcherPanel';
import { HighlightedEditor } from '../utils/pythonHighlighter';
import { CodeExplanationModal } from './CodeExplanationModal';

interface PythonSandboxProps {
  initialCode?: string;
  onCodeChange?: (code: string) => void;
  chapterTitle?: string;
}

const TEMPLATES: { label: string; code: string }[] = [
  {
    label: 'Hello World',
    code: `# Chapter 1: First steps\nprint("Hello, Python Explorer!")\nname = "Python 3.12"\nprint(f"Running on {name}")`,
  },
  {
    label: 'Loops & Math',
    code: `# Chapter 5: Range and iteration\ntotal = 0\nfor i in range(1, 6):\n    square = i ** 2\n    total += square\n    print(f"Step {i}: {i}^2 = {square}")\n\nprint(f"Total sum of squares: {total}")`,
  },
  {
    label: 'List Slicing',
    code: `# Chapter 6: Sequences and slicing\nfruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"]\nprint("Full list:", fruits)\nprint("First three:", fruits[:3])\nprint("Reversed:", fruits[::-1])\nfruits.append("Fig")\nprint("Updated:", fruits)`,
  },
  {
    label: 'Dictionary Mapping',
    code: `# Chapter 7: Hash tables\nprofile = {\n    "username": "coder_neo",\n    "rank": "Explorer",\n    "solved_challenges": 14\n}\n\nfor key, val in profile.items():\n    print(f"{key} -> {val}")`,
  },
  {
    label: 'Object-Oriented RPG',
    code: `# Chapter 10: Classes and methods\nclass Character:\n    def __init__(self, name, health=100):\n        self.name = name\n        self.health = health\n\n    def heal(self, amount):\n        self.health += amount\n        print(f"{self.name} healed for {amount}! HP: {self.health}")\n\nhero = Character("Aria", 80)\nhero.heal(25)`,
  },
];

type PanelMode = 'split' | 'terminal' | 'watcher' | 'diagram';

export const PythonSandbox: React.FC<PythonSandboxProps> = ({
  initialCode = TEMPLATES[0].code,
  onCodeChange,
  chapterTitle,
}) => {
  const [code, setCode] = useState(initialCode);
  const [panelMode, setPanelMode] = useState<PanelMode>('split');
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);

  // Sync when initialCode changes from outside (e.g. clicking "Run in Sandbox" in Reader)
  React.useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode]);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await pythonInterpreter.execute(code);
      setResult(res);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(initialCode);
    setResult(null);
  };

  const handleClearTerminal = () => {
    if (result) {
      setResult({
        ...result,
        output: [],
        errors: [],
      });
    }
  };

  const handleSelectTemplate = (templateCode: string) => {
    setCode(templateCode);
    if (onCodeChange) onCodeChange(templateCode);
    setResult(null);
  };

  const activeVariables = result ? result.variables : [];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      {/* Sandbox Header / Controls */}
      <div className="px-5 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-300 font-semibold tracking-wide">
            python_sandbox.py
          </span>
          {chapterTitle && (
            <span className="hidden sm:inline-block text-xs text-slate-400 font-sans border-l border-slate-700 pl-3">
              {chapterTitle}
            </span>
          )}
        </div>

        {/* Presets and Actions */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 text-xs text-slate-300 mr-2">
            <span className="text-slate-400">Presets:</span>
            {TEMPLATES.map((t) => (
              <button
                key={t.label}
                onClick={() => handleSelectTemplate(t.code)}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-2xs font-mono"
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Copy Python Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            title="Reset to default code"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsExplainModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-800/80 rounded-lg transition-colors shadow-2xs"
            title="Explain this code with Gemini AI"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Explain Code</span>
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-xs disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* View Mode Toolbar */}
      <div className="px-5 py-2 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setPanelMode('split')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-2xs font-semibold transition-colors ${
              panelMode === 'split'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split (Terminal & Watcher)</span>
          </button>

          <button
            onClick={() => setPanelMode('terminal')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-2xs font-semibold transition-colors ${
              panelMode === 'terminal'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal Focus</span>
          </button>

          <button
            onClick={() => setPanelMode('watcher')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-2xs font-semibold transition-colors ${
              panelMode === 'watcher'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Memory Watcher</span>
            {activeVariables.length > 0 && (
              <span className="text-2xs px-1 rounded bg-slate-800 text-sky-300">
                {activeVariables.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setPanelMode('diagram')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-2xs font-semibold transition-colors ${
              panelMode === 'diagram'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Stack/Heap Graph</span>
          </button>
        </div>

        {/* Execution Metrics & Terminal Clear */}
        <div className="flex items-center gap-3">
          {result && (
            <div className="flex items-center gap-2 text-2xs text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>{result.executionTimeMs}ms</span>
              {result.success ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-3 h-3 text-amber-400" />
              )}
            </div>
          )}

          {result && (result.output.length > 0 || result.errors.length > 0) && (
            <button
              onClick={handleClearTerminal}
              className="flex items-center gap-1 text-2xs text-slate-400 hover:text-slate-200 transition-colors"
              title="Clear terminal output"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Terminal</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Code Editor on Left, Side Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] bg-slate-950 font-mono text-xs">
        {/* Code Editor Pane (7 cols on desktop) */}
        <div className="lg:col-span-7 flex border-b lg:border-b-0 lg:border-r border-slate-800 relative bg-[#0b0f19]">
          <HighlightedEditor
            value={code}
            onChange={(val) => {
              setCode(val);
              if (onCodeChange) onCodeChange(val);
            }}
            minHeight="460px"
            placeholder="# Write or paste Python code here..."
          />
        </div>

        {/* Side Panel (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col bg-slate-900/90 text-slate-100 min-h-[460px]">
          {/* Split Mode: Stacked Terminal and Memory Watcher */}
          {panelMode === 'split' && (
            <div className="flex flex-col h-full">
              {/* Terminal Section (Top) */}
              <div className="flex flex-col h-1/2 border-b border-slate-800">
                <div className="px-3.5 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-2xs text-slate-400">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-sky-400" />
                    <span>Terminal Output</span>
                  </div>
                  {result && (
                    <span className="font-mono text-slate-500">
                      {result.output.length} line(s)
                    </span>
                  )}
                </div>

                <div className="p-3.5 flex-1 overflow-y-auto custom-scrollbar font-mono text-xs">
                  {!result ? (
                    <div className="py-8 text-center text-slate-500">
                      <p className="text-slate-400 mb-0.5 text-xs">Terminal idle.</p>
                      <p className="text-slate-600 text-2xs">Click "Run Code" above to execute.</p>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {result.output.length > 0 && (
                        <div className="space-y-1">
                          {result.output.map((line, idx) => (
                            <div key={idx} className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                              {line}
                            </div>
                          ))}
                        </div>
                      )}

                      {result.errors.length > 0 && (
                        <div className="mt-2 p-2.5 rounded bg-red-950/60 border border-red-800 text-red-300 text-2xs whitespace-pre-wrap leading-relaxed">
                          {result.errors.join('\n')}
                        </div>
                      )}

                      {result.output.length === 0 && result.errors.length === 0 && (
                        <div className="text-slate-400 text-2xs italic">
                          Code executed successfully with no printed output.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Memory Watcher Section (Bottom) */}
              <div className="flex-1 h-1/2">
                <MemoryWatcherPanel
                  variables={activeVariables}
                  executionTimeMs={result?.executionTimeMs}
                />
              </div>
            </div>
          )}

          {/* Terminal Focus Mode */}
          {panelMode === 'terminal' && (
            <div className="flex flex-col h-full">
              <div className="px-3.5 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span>Standard Output Terminal</span>
                </div>
              </div>

              <div className="p-4 flex-1 overflow-y-auto custom-scrollbar font-mono text-xs">
                {!result ? (
                  <div className="py-16 text-center text-slate-500">
                    <p className="text-slate-400 mb-1">Terminal idle.</p>
                    <p className="text-slate-600 text-2xs">Click "Run Code" above to execute.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {result.output.length > 0 && (
                      <div className="space-y-1">
                        {result.output.map((line, idx) => (
                          <div key={idx} className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                            {line}
                          </div>
                        ))}
                      </div>
                    )}

                    {result.errors.length > 0 && (
                      <div className="mt-3 p-3 rounded bg-red-950/60 border border-red-800 text-red-300 text-xs whitespace-pre-wrap leading-relaxed">
                        {result.errors.join('\n')}
                      </div>
                    )}

                    {result.output.length === 0 && result.errors.length === 0 && (
                      <div className="text-slate-400 text-2xs italic">
                        Code executed successfully with no printed output.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Memory Watcher Focus Mode */}
          {panelMode === 'watcher' && (
            <div className="flex flex-col h-full">
              <MemoryWatcherPanel
                variables={activeVariables}
                executionTimeMs={result?.executionTimeMs}
              />
            </div>
          )}

          {/* Full Visual Graph Mode */}
          {panelMode === 'diagram' && (
            <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
              <MemoryVisualizer
                variables={activeVariables}
                title="Full Stack & Heap Memory Graph"
                description="Live architecture diagram of stack frame references pointing to heap memory blocks."
              />
            </div>
          )}
        </div>
      </div>

      {/* AI Code Explanation Modal */}
      <CodeExplanationModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        codeSnippet={code}
        chapterTitle={chapterTitle}
      />
    </div>
  );
};
