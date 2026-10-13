import React, { useState } from 'react';
import { VisualMemoryItem } from '../types';
import {
  Eye,
  Search,
  Copy,
  Check,
  Pin,
  ChevronDown,
  ChevronRight,
  Database,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface MemoryWatcherPanelProps {
  variables: VisualMemoryItem[];
  executionTimeMs?: number;
  className?: string;
  onClearVariables?: () => void;
}

export const MemoryWatcherPanel: React.FC<MemoryWatcherPanelProps> = ({
  variables,
  executionTimeMs,
  className = '',
}) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'primitive' | 'collection'>('all');
  const [pinnedNames, setPinnedNames] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [copiedVar, setCopiedVar] = useState<string | null>(null);

  const togglePin = (name: string) => {
    setPinnedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleExpand = (name: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const copyValue = (name: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedVar(name);
    setTimeout(() => setCopiedVar(null), 2000);
  };

  const isPrimitive = (type: VisualMemoryItem['type']) =>
    ['int', 'float', 'str', 'bool', 'None'].includes(type);

  const isCollection = (type: VisualMemoryItem['type']) =>
    ['list', 'dict', 'tuple', 'object'].includes(type);

  const filtered = variables
    .filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.value.toLowerCase().includes(search.toLowerCase()) ||
        v.type.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (typeFilter === 'primitive') return isPrimitive(v.type);
      if (typeFilter === 'collection') return isCollection(v.type);
      return true;
    })
    .sort((a, b) => {
      // Pinned items first
      const aPinned = pinnedNames.includes(a.name);
      const bPinned = pinnedNames.includes(b.name);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return a.name.localeCompare(b.name);
    });

  const getTypeBadgeStyle = (type: VisualMemoryItem['type']) => {
    switch (type) {
      case 'int':
      case 'float':
        return 'text-amber-400 bg-amber-950/50 border-amber-800/80';
      case 'str':
        return 'text-emerald-400 bg-emerald-950/50 border-emerald-800/80';
      case 'bool':
        return 'text-purple-400 bg-purple-950/50 border-purple-800/80';
      case 'list':
      case 'tuple':
        return 'text-sky-400 bg-sky-950/50 border-sky-800/80';
      case 'dict':
        return 'text-indigo-400 bg-indigo-950/50 border-indigo-800/80';
      case 'object':
        return 'text-yellow-400 bg-yellow-950/50 border-yellow-800/80';
      case 'function':
        return 'text-blue-400 bg-blue-950/50 border-blue-800/80';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <div className={`flex flex-col h-full bg-slate-900 text-slate-100 font-mono text-xs ${className}`}>
      {/* Panel Header */}
      <div className="p-3.5 border-b border-slate-800 bg-slate-950 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-slate-200 tracking-wide text-xs">
            Memory Watcher
          </span>
          <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-sky-300 border border-slate-700">
            {variables.length} active
          </span>
        </div>

        {executionTimeMs !== undefined && (
          <span className="text-2xs text-slate-500 font-mono">
            State Traced ({executionTimeMs}ms)
          </span>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-3 border-b border-slate-800 bg-slate-950/60 flex flex-col gap-2 shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter variables..."
            className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-800 rounded text-2xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1 text-2xs">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-2 py-0.5 rounded transition-colors ${
              typeFilter === 'all'
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setTypeFilter('primitive')}
            className={`px-2 py-0.5 rounded transition-colors ${
              typeFilter === 'primitive'
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Primitives
          </button>
          <button
            onClick={() => setTypeFilter('collection')}
            className={`px-2 py-0.5 rounded transition-colors ${
              typeFilter === 'collection'
                ? 'bg-sky-600 text-white font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            Collections
          </button>
        </div>
      </div>

      {/* Variable Watch List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-slate-500">
            <Database className="w-6 h-6 text-slate-600 mx-auto mb-2" />
            <p className="text-2xs text-slate-400 font-medium">No tracked variables.</p>
            <p className="text-2xs text-slate-600 mt-1 max-w-[200px] mx-auto">
              Execute Python code with assignments like <code>x = 42</code> to inspect memory state.
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const isPinned = pinnedNames.includes(item.name);
            const isExpanded = !!expandedItems[item.name];
            const isColl = isCollection(item.type);

            return (
              <div
                key={item.name}
                className={`rounded-lg border transition-all text-xs overflow-hidden ${
                  isPinned
                    ? 'bg-slate-900 border-sky-600/60 shadow-xs'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Variable Header Card */}
                <div className="p-2.5 flex items-center justify-between gap-2 border-b border-slate-800/60">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {isColl && (
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}

                    <span className="font-bold text-sky-300 truncate" title={item.name}>
                      {item.name}
                    </span>

                    <span
                      className={`text-2xs uppercase px-1.5 py-0.2 rounded border font-semibold ${getTypeBadgeStyle(
                        item.type
                      )}`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => togglePin(item.name)}
                      className={`p-1 rounded transition-colors ${
                        isPinned ? 'text-amber-400 hover:text-amber-300' : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isPinned ? 'Unpin variable' : 'Pin to top of watcher'}
                    >
                      <Pin className={`w-3 h-3 ${isPinned ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => copyValue(item.name, item.value)}
                      className="p-1 rounded text-slate-500 hover:text-slate-300 transition-colors"
                      title="Copy value"
                    >
                      {copiedVar === item.name ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Variable Value Body */}
                <div className="p-2.5 bg-slate-950/40">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-2xs font-mono text-slate-200 break-all leading-relaxed">
                      {item.value}
                    </div>
                  </div>

                  {/* Metadata: Memory Address & Mutability semantics */}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-2xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <span className="text-slate-600">addr:</span>
                      <span className="text-slate-400 font-mono">{item.memoryAddress}</span>
                    </div>

                    <div>
                      {item.isReference ? (
                        <span className="text-sky-400 font-semibold" title="Allocated in heap memory">
                          Heap Ref
                        </span>
                      ) : (
                        <span className="text-slate-400" title="Immutable value in Python">
                          Immutable
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Memory Watcher Tip Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 text-2xs text-slate-400 shrink-0 flex items-start gap-1.5 leading-relaxed">
        <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
        <span>
          <strong>State-Tracing Active:</strong> Variables update automatically on every execution.
        </span>
      </div>
    </div>
  );
};
