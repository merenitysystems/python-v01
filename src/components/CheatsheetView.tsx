import React, { useState } from 'react';
import { Search, Copy, Check, Play, Sparkles } from 'lucide-react';
import { renderHighlightedSpans } from '../utils/pythonHighlighter';

interface CheatsheetCategory {
  title: string;
  description: string;
  snippets: {
    name: string;
    description: string;
    code: string;
  }[];
}

const CHEATSHEET_DATA: CheatsheetCategory[] = [
  {
    title: '1. Syntax & Output',
    description: 'Comments, standard output formatting, and script structure.',
    snippets: [
      {
        name: 'Basic Print Statement',
        description: 'Outputting strings and numbers to standard output.',
        code: `print("Hello, Python!")\nprint("Score:", 42, "Active:", True)`,
      },
      {
        name: 'Custom Separator & Ending',
        description: 'Overriding default space separator and newline terminator.',
        code: `print("2026", "10", "13", sep="-")\nprint("Loading", end="...")\nprint("Done!")`,
      },
      {
        name: 'Comments',
        description: 'Documenting code logic for fellow engineers.',
        code: `# Single-line comment\nx = 10  # Inline comment`,
      },
    ],
  },
  {
    title: '2. Variables & Core Types',
    description: 'Dynamic typing, type conversion, and formatted string interpolation.',
    snippets: [
      {
        name: 'Variable Declarations',
        description: 'No explicit type keywords required.',
        code: `name = "Ada"       # str\nage = 28           # int\nratio = 3.14159    # float\nis_ready = True    # bool\ndata = None        # NoneType`,
      },
      {
        name: 'Type Casting',
        description: 'Converting between string and numeric representations.',
        code: `num = int("42")\npi = float("3.14")\ntext = str(100)`,
      },
      {
        name: 'Modern f-strings',
        description: 'String interpolation with embedded expressions.',
        code: `hero = "Kira"\nlevel = 10\nprint(f"Hero {hero} is Level {level} (Next: {level + 1})")`,
      },
    ],
  },
  {
    title: '3. Math & Arithmetic',
    description: 'Full arithmetic operations and integer floor division.',
    snippets: [
      {
        name: 'Division & Modulo',
        description: 'Understanding true division / vs floor division // and modulo %.',
        code: `print(10 / 3)   # 3.3333333333333335 (float)\nprint(10 // 3)  # 3 (int floor)\nprint(10 % 3)   # 1 (remainder)\nprint(2 ** 8)   # 256 (power)`,
      },
      {
        name: 'Augmented Assignment',
        description: 'Updating counters and totals in place.',
        code: `count = 1\ncount += 1   # count = 2\ncount *= 10  # count = 20`,
      },
    ],
  },
  {
    title: '4. Conditionals & Logic',
    description: 'Branching decisions with readable English logical operators.',
    snippets: [
      {
        name: 'if - elif - else Branching',
        description: 'Executing conditional blocks based on first True predicate.',
        code: `score = 88\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Grade: C")`,
      },
      {
        name: 'Logical Operators (and, or, not)',
        description: 'Combining multiple conditions cleanly.',
        code: `if has_key and not door_locked:\n    print("Enter room")`,
      },
    ],
  },
  {
    title: '5. Loops & Iteration',
    description: 'for loops with range(), while loops, break and continue.',
    snippets: [
      {
        name: 'for Loop with range()',
        description: 'Looping a fixed number of iterations.',
        code: `for i in range(5):          # 0, 1, 2, 3, 4\n    print(i)\n\nfor n in range(2, 9, 2):    # 2, 4, 6, 8\n    print(n)`,
      },
      {
        name: 'while Loop with Safety',
        description: 'Repeating logic while condition holds true.',
        code: `energy = 3\nwhile energy > 0:\n    print(f"Energy: {energy}")\n    energy -= 1`,
      },
      {
        name: 'break & continue',
        description: 'Controlling loop execution flow.',
        code: `for x in range(10):\n    if x == 3:\n        continue  # skip 3\n    if x == 7:\n        break     # stop at 7\n    print(x)`,
      },
    ],
  },
  {
    title: '6. Lists & Tuples',
    description: 'Ordered sequence indexing, slicing [start:stop:step], and methods.',
    snippets: [
      {
        name: 'List Indexing & Slicing',
        description: 'Zero-based indexes and negative indices.',
        code: `items = ["a", "b", "c", "d", "e"]\nprint(items[0])    # 'a'\nprint(items[-1])   # 'e'\nprint(items[1:4])  # ['b', 'c', 'd']\nprint(items[::-1]) # reversed`,
      },
      {
        name: 'Essential List Methods',
        description: 'Adding, removing, and measuring elements.',
        code: `names = ["Alice"]\nnames.append("Bob")\nnames.append("Charlie")\nlast = names.pop()\nprint(len(names))  # 2`,
      },
      {
        name: 'Immutable Tuples',
        description: 'Fixed collections that cannot be altered.',
        code: `point = (10, 20)\n# point[0] = 15  # TypeError! Tuples are immutable`,
      },
    ],
  },
  {
    title: '7. Dictionaries & Sets',
    description: 'Hash map lookups and unique mathematical sets.',
    snippets: [
      {
        name: 'Dictionary Operations',
        description: 'Key-value mapping and safe .get() access.',
        code: `user = {"name": "Alex", "role": "Engineer"}\nuser["level"] = 4\nprint(user.get("status", "Offline"))\n\nfor k, v in user.items():\n    print(f"{k} = {v}")`,
      },
      {
        name: 'Sets for Uniqueness',
        description: 'Automatic deduplication of elements.',
        code: `tags = {"py", "ai", "py"}\nprint(tags)  # {'py', 'ai'}\nunique = list(set([1, 1, 2, 3, 3]))`,
      },
    ],
  },
  {
    title: '8. Functions & OOP Classes',
    description: 'Reusable def routines, parameters, return values, and class models.',
    snippets: [
      {
        name: 'Function Definition with Defaults',
        description: 'Encapsulating behavior with arguments and return values.',
        code: `def multiply(a, b=2):\n    """Multiplies two numbers."""\n    return a * b\n\nresult = multiply(5, 3)\nprint(result)  # 15`,
      },
      {
        name: 'Class & Constructor',
        description: 'Object-oriented programming with __init__ and self.',
        code: `class Player:\n    def __init__(self, name, hp=100):\n        self.name = name\n        self.hp = hp\n\n    def damage(self, amt):\n        self.hp -= amt\n\np1 = Player("Neo")\np1.damage(20)\nprint(p1.hp)  # 80`,
      },
    ],
  },
];

interface CheatsheetViewProps {
  onOpenInSandbox: (code: string) => void;
}

export const CheatsheetView: React.FC<CheatsheetViewProps> = ({ onOpenInSandbox }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const handleCopy = (name: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  const filteredData = CHEATSHEET_DATA.map((cat) => ({
    ...cat,
    snippets: cat.snippets.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.code.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.snippets.length > 0);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-sky-700 font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Python 3.12+ Rapid Syntax Reference</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Comprehensive Python Cheatsheet
        </h1>
        <p className="text-slate-600 mt-2 text-sm max-w-2xl">
          Quickly search and reference essential Python syntax, idioms, methods, and mental models. Every snippet is copyable or runnable in the sandbox.
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syntax (e.g. slicing, f-string, dict, class)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:border-sky-500 focus:ring-1 focus:ring-sky-500 shadow-2xs"
          />
        </div>
      </div>

      {/* Cheatsheet Grid */}
      <div className="space-y-10">
        {filteredData.map((category) => (
          <section key={category.title} className="space-y-4">
            <div className="border-b border-slate-200/80 pb-2">
              <h2 className="text-lg font-bold text-slate-900">{category.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.snippets.map((snippet) => (
                <div
                  key={snippet.name}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xs font-bold text-slate-900">{snippet.name}</h3>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopy(snippet.name, snippet.code)}
                          className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                          title="Copy snippet"
                        >
                          {copiedName === snippet.name ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => onOpenInSandbox(snippet.code)}
                          className="p-1 text-sky-600 hover:text-sky-800 transition-colors"
                          title="Try in Sandbox"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                    <p className="text-2xs text-slate-500 mb-2.5 leading-relaxed">
                      {snippet.description}
                    </p>
                  </div>

                  <pre className="p-3 bg-[#0b0f19] text-slate-100 rounded-lg font-mono text-2xs overflow-x-auto border border-slate-800 leading-relaxed custom-scrollbar whitespace-pre">
                    {renderHighlightedSpans(snippet.code)}
                  </pre>
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredData.length === 0 && (
          <div className="py-12 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
            <p className="text-sm">No syntax snippets match "{searchQuery}".</p>
            <p className="text-xs text-slate-400 mt-1">Try searching for keywords like "print", "loop", "dict", or "class".</p>
          </div>
        )}
      </div>
    </div>
  );
};
