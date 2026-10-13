/**
 * Python syntax highlighter utility.
 * Tokenizes Python code into rich, accessible syntax-highlighted elements
 * covering keywords, built-ins, strings, f-strings, comments, numbers,
 * booleans, operators, and function/class definitions.
 */

import React, { useRef, useEffect } from 'react';

const PYTHON_KEYWORDS = new Set([
  'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del',
  'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if',
  'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass',
  'raise', 'return', 'try', 'while', 'with', 'yield',
]);

const PYTHON_BUILTINS = new Set([
  'print', 'len', 'range', 'input', 'str', 'int', 'float', 'bool',
  'list', 'dict', 'set', 'tuple', 'sum', 'min', 'max', 'abs', 'round',
  'type', 'sorted', 'reversed', 'enumerate', 'zip', 'open', 'id',
  'isinstance', 'issubclass', 'help', 'dir', 'any', 'all', 'map', 'filter',
]);

const PYTHON_SPECIAL = new Set(['True', 'False', 'None', 'self', 'cls']);

export interface Token {
  type: 'keyword' | 'builtin' | 'special' | 'string' | 'comment' | 'number' | 'def-name' | 'class-name' | 'operator' | 'punctuation' | 'text';
  value: string;
}

export function tokenizePython(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = code.length;

  while (i < len) {
    const char = code[i];

    // Single-line comment # ...
    if (char === '#') {
      let start = i;
      while (i < len && code[i] !== '\n') {
        i++;
      }
      tokens.push({ type: 'comment', value: code.slice(start, i) });
      continue;
    }

    // Strings: triple quotes """ or '''
    if (
      (char === '"' || char === "'") &&
      i + 2 < len &&
      code[i + 1] === char &&
      code[i + 2] === char
    ) {
      const quote = char + char + char;
      const start = i;
      i += 3;
      while (i + 2 < len && !(code[i] === char && code[i + 1] === char && code[i + 2] === char)) {
        if (code[i] === '\\') i++; // skip escaped char
        i++;
      }
      i = Math.min(i + 3, len);
      tokens.push({ type: 'string', value: code.slice(start, i) });
      continue;
    }

    // f-strings or raw strings or regular strings
    if (
      (char === 'f' || char === 'r' || char === 'b' || char === 'F' || char === 'R' || char === 'B') &&
      i + 1 < len &&
      (code[i + 1] === '"' || code[i + 1] === "'")
    ) {
      const prefix = char;
      const quote = code[i + 1];
      const start = i;
      i += 2;
      while (i < len && code[i] !== quote && code[i] !== '\n') {
        if (code[i] === '\\') i++;
        i++;
      }
      if (i < len && code[i] === quote) i++;
      tokens.push({ type: 'string', value: code.slice(start, i) });
      continue;
    }

    // Regular single or double quote strings
    if (char === '"' || char === "'") {
      const quote = char;
      const start = i;
      i++;
      while (i < len && code[i] !== quote && code[i] !== '\n') {
        if (code[i] === '\\') i++;
        i++;
      }
      if (i < len && code[i] === quote) i++;
      tokens.push({ type: 'string', value: code.slice(start, i) });
      continue;
    }

    // Numbers (decimal, float)
    if (/[0-9]/.test(char) || (char === '.' && i + 1 < len && /[0-9]/.test(code[i + 1]))) {
      const start = i;
      while (i < len && /[0-9a-fA-FxXoObB._]/.test(code[i])) {
        i++;
      }
      tokens.push({ type: 'number', value: code.slice(start, i) });
      continue;
    }

    // Identifiers & Keywords
    if (/[a-zA-Z_]/.test(char)) {
      const start = i;
      while (i < len && /[a-zA-Z0-9_]/.test(code[i])) {
        i++;
      }
      const word = code.slice(start, i);

      // Check if previous non-whitespace token was 'def' or 'class'
      const prevToken = tokens.filter((t) => t.type !== 'text' || t.value.trim().length > 0).slice(-1)[0];
      if (prevToken && prevToken.value === 'def') {
        tokens.push({ type: 'def-name', value: word });
      } else if (prevToken && prevToken.value === 'class') {
        tokens.push({ type: 'class-name', value: word });
      } else if (PYTHON_KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else if (PYTHON_SPECIAL.has(word)) {
        tokens.push({ type: 'special', value: word });
      } else if (PYTHON_BUILTINS.has(word)) {
        tokens.push({ type: 'builtin', value: word });
      } else {
        tokens.push({ type: 'text', value: word });
      }
      continue;
    }

    // Operators and Punctuation
    if (/[+\-*/%=<>!&|^~]/.test(char)) {
      const start = i;
      while (i < len && /[+\-*/%=<>!&|^~]/.test(code[i])) {
        i++;
      }
      tokens.push({ type: 'operator', value: code.slice(start, i) });
      continue;
    }

    if (/[()[\]{},:;.]/.test(char)) {
      tokens.push({ type: 'punctuation', value: char });
      i++;
      continue;
    }

    // Whitespace and other characters
    tokens.push({ type: 'text', value: char });
    i++;
  }

  return tokens;
}

export function renderHighlightedSpans(code: string): React.ReactNode[] {
  const tokens = tokenizePython(code);
  return tokens.map((token, idx) => {
    switch (token.type) {
      case 'keyword':
        return <span key={idx} className="text-purple-400 font-semibold">{token.value}</span>;
      case 'builtin':
        return <span key={idx} className="text-sky-400">{token.value}</span>;
      case 'special':
        return <span key={idx} className="text-amber-400 font-medium">{token.value}</span>;
      case 'string':
        return <span key={idx} className="text-emerald-300">{token.value}</span>;
      case 'comment':
        return <span key={idx} className="text-slate-400 italic">{token.value}</span>;
      case 'number':
        return <span key={idx} className="text-orange-300 font-medium">{token.value}</span>;
      case 'def-name':
        return <span key={idx} className="text-blue-300 font-semibold">{token.value}</span>;
      case 'class-name':
        return <span key={idx} className="text-yellow-300 font-bold">{token.value}</span>;
      case 'operator':
        return <span key={idx} className="text-rose-400">{token.value}</span>;
      case 'punctuation':
        return <span key={idx} className="text-slate-400">{token.value}</span>;
      default:
        return <span key={idx} className="text-slate-100">{token.value}</span>;
    }
  });
}

/**
 * Static Python Code Block with line numbers, syntax highlighting, and copy affordance.
 */
interface PythonCodeBlockProps {
  code: string;
  showLineNumbers?: boolean;
}

export const PythonCodeBlock: React.FC<PythonCodeBlockProps> = ({
  code,
  showLineNumbers = true,
}) => {
  const lines = code.split('\n');

  return (
    <div className="font-mono text-xs leading-6 overflow-x-auto custom-scrollbar flex">
      {showLineNumbers && (
        <div className="py-3 pl-3 pr-4 text-slate-500 text-right select-none text-2xs border-r border-slate-800/80 bg-slate-950/40 w-9 shrink-0">
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
      )}
      <div className="py-3 px-4 flex-1 whitespace-pre">
        {renderHighlightedSpans(code)}
      </div>
    </div>
  );
};

/**
 * Interactive Dual-Layer Syntax Highlighted Code Editor.
 * Features:
 * - Real-time syntax highlighting as you type
 * - Tab key indentation support (inserts 4 spaces instead of losing focus)
 * - Synchronized scroll between background highlighted view and transparent textarea
 * - Accurate cursor and line numbering
 */
interface HighlightedEditorProps {
  value: string;
  onChange: (val: string) => void;
  minHeight?: string;
  placeholder?: string;
}

export const HighlightedEditor: React.FC<HighlightedEditorProps> = ({
  value,
  onChange,
  minHeight = '300px',
  placeholder = '# Write Python code here...',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const indent = '    '; // 4 spaces Python standard

      const updated = value.substring(0, start) + indent + value.substring(end);
      onChange(updated);

      // Move cursor after the inserted 4 spaces on next frame
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + indent.length;
        }
      }, 0);
    }
  };

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 8) }, (_, i) => i + 1);

  return (
    <div className="relative flex font-mono text-xs leading-6 bg-[#0b0f19] text-slate-100 overflow-hidden w-full" style={{ minHeight }}>
      {/* Line Numbers column */}
      <div className="py-4 px-2.5 text-slate-600 text-right select-none font-mono text-2xs border-r border-slate-800/80 bg-slate-950/40 w-10 shrink-0 z-10 pointer-events-none">
        {lineNumbers.map((num) => (
          <div key={num} className="leading-6">
            {num}
          </div>
        ))}
      </div>

      {/* Editor Container with Overlaid Highlight Layer & Transparent Textarea */}
      <div className="relative flex-1 h-full min-h-[inherit]">
        {/* Background Highlighted Layer */}
        <div
          ref={highlightRef}
          aria-hidden="true"
          className="absolute inset-0 p-4 font-mono text-xs leading-6 whitespace-pre overflow-hidden pointer-events-none select-none z-0 custom-scrollbar"
        >
          {renderHighlightedSpans(value)}
          {value.endsWith('\n') && <br />}
        </div>

        {/* Foreground Transparent Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          placeholder={placeholder}
          className="absolute inset-0 w-full h-full p-4 font-mono text-xs leading-6 bg-transparent text-transparent caret-sky-400 resize-none focus:outline-hidden custom-scrollbar z-10 overflow-auto whitespace-pre selection:bg-sky-500/30 selection:text-white"
        />
      </div>
    </div>
  );
};
