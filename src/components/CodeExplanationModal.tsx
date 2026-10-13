import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Copy,
  Check,
  RefreshCw,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';

interface CodeExplanationModalProps {
  isOpen: boolean;
  onClose: () => void;
  codeSnippet: string;
  chapterTitle?: string;
}

export const CodeExplanationModal: React.FC<CodeExplanationModalProps> = ({
  isOpen,
  onClose,
  codeSnippet,
  chapterTitle,
}) => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Fetch explanation when modal opens or when code changes
  const fetchExplanation = async () => {
    if (!codeSnippet.trim()) {
      setError('Please provide code in the editor before requesting an explanation.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setExplanation(null);

    try {
      const response = await fetch('/api/explain-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeSnippet,
          chapterContext: chapterTitle,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to explain code.');
      }

      setExplanation(data.explanation);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong while generating the explanation.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && !explanation && !isLoading) {
      fetchExplanation();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (explanation) {
      navigator.clipboard.writeText(explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper to format basic markdown-style text into pleasant HTML elements
  const renderFormattedMarkdown = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm font-bold text-slate-900 mt-4 mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-sky-600" />
            <span>{trimmed.replace('### ', '')}</span>
          </h4>
        );
      }

      if (trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
        return (
          <h3 key={idx} className="text-base font-bold text-slate-900 mt-4 mb-2 pb-1 border-b border-slate-100">
            {trimmed.replace(/^#+\s*/, '')}
          </h3>
        );
      }

      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        return (
          <div key={idx} className="font-bold text-slate-900 text-xs mt-3 mb-1">
            {trimmed.replace(/\*\*/g, '')}
          </div>
        );
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const itemContent = trimmed.slice(2);
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-slate-700 leading-relaxed my-1">
            <span
              dangerouslySetInnerHTML={{
                __html: itemContent
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-2xs text-sky-800 border border-slate-200">$1</code>'),
              }}
            />
          </li>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const itemContent = trimmed.replace(/^\d+\.\s*/, '');
        return (
          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed my-1.5">
            <span className="font-bold text-sky-700 shrink-0 mt-0.5">{trimmed.match(/^\d+/)?.[0]}.</span>
            <span
              dangerouslySetInnerHTML={{
                __html: itemContent
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-2xs text-sky-800 border border-slate-200">$1</code>'),
              }}
            />
          </div>
        );
      }

      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p
          key={idx}
          className="text-xs text-slate-700 leading-relaxed my-1.5"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-2xs text-sky-800 border border-slate-200">$1</code>'),
          }}
        />
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">AI Code Explanation</h3>
                <span className="text-2xs text-sky-700 font-semibold px-2 py-0.5 bg-sky-50 rounded-full border border-sky-200">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-2xs text-slate-500 mt-0.5">
                {chapterTitle ? `Context: ${chapterTitle}` : 'Natural language breakdown of your Python snippet'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {explanation && (
              <>
                <button
                  onClick={handleCopy}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Copy explanation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={fetchExplanation}
                  disabled={isLoading}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Regenerate explanation"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar text-xs">
          {isLoading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-2 border-sky-600 border-t-transparent animate-spin" />
              <div>
                <p className="font-semibold text-slate-800 text-xs">Analyzing Python syntax and execution logic...</p>
                <p className="text-2xs text-slate-400 mt-0.5">Gemini is synthesizing a step-by-step beginner explanation</p>
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-xs">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Unable to generate explanation</span>
              </div>
              <p className="text-2xs text-red-700 leading-relaxed">{error}</p>
              <button
                onClick={fetchExplanation}
                className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-2xs font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {explanation && !isLoading && (
            <div className="space-y-2 leading-relaxed">
              {renderFormattedMarkdown(explanation)}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Interactive Tutor Model</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
