import React from 'react';
import { VisualMemoryItem } from '../types';
import { Layers, ArrowRight, Info, Database } from 'lucide-react';

interface MemoryVisualizerProps {
  variables: VisualMemoryItem[];
  title?: string;
  description?: string;
}

export const MemoryVisualizer: React.FC<MemoryVisualizerProps> = ({
  variables,
  title = 'Visual Variable Memory State',
  description = 'Inspect how Python names in the stack frame point to objects in heap memory.',
}) => {
  const getTypeColor = (type: VisualMemoryItem['type']) => {
    switch (type) {
      case 'int':
      case 'float':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'str':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'bool':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      case 'list':
      case 'tuple':
        return 'text-sky-700 bg-sky-50 border-sky-200';
      case 'dict':
        return 'text-indigo-700 bg-indigo-50 border-indigo-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-sky-600" />
          <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        </div>
        <span className="text-xs text-slate-400 font-mono">Heap & Stack Inspector</span>
      </div>

      <p className="text-xs text-slate-600 mb-4">{description}</p>

      {variables.length === 0 ? (
        <div className="py-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
          <Database className="w-6 h-6 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-500">No active variables in memory.</p>
          <p className="text-xs text-slate-400 mt-0.5">Run code in the sandbox to inspect runtime state.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Stack Frame (Names) */}
          <div className="bg-slate-50/70 rounded-lg p-3.5 border border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Stack Frame (Identifiers)
              </span>
              <span className="text-xs text-slate-400">Scope: Global</span>
            </div>
            <div className="space-y-2">
              {variables.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between bg-white px-3 py-2 rounded-md border border-slate-200 text-xs shadow-2xs"
                >
                  <span className="font-mono font-semibold text-sky-800">{item.name}</span>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="font-mono text-2xs text-slate-400">ref</span>
                    <ArrowRight className="w-3 h-3 text-sky-500" />
                    <span className="font-mono text-2xs text-slate-500">{item.memoryAddress}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heap Memory (Objects) */}
          <div className="bg-slate-50/70 rounded-lg p-3.5 border border-slate-200">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Heap Memory (Allocated Objects)
              </span>
              <span className="text-xs text-slate-400 font-mono">0x1000 - 0xFFFF</span>
            </div>
            <div className="space-y-2">
              {variables.map((item) => (
                <div
                  key={item.name + item.memoryAddress}
                  className={`flex items-center justify-between px-3 py-2 rounded-md border text-xs shadow-2xs ${getTypeColor(
                    item.type
                  )}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-2xs uppercase px-1.5 py-0.5 bg-white/70 rounded border border-current">
                      {item.type}
                    </span>
                    <span className="font-mono font-medium max-w-[160px] truncate">{item.value}</span>
                  </div>
                  <span className="font-mono text-2xs text-slate-400">{item.memoryAddress}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
        <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <span>
          <strong>Python Mental Model:</strong> Variables are not fixed storage boxes—they are name tags pointing to heap objects. When you assign <code>b = a</code>, both names point to the same memory address.
        </span>
      </div>
    </div>
  );
};
