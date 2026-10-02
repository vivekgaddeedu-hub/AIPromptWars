'use client';

import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  actionText?: string;
}

export function EmptyState({
  title = 'No Records Found',
  message = 'Try clearing your filters or changing your search criteria.',
  onReset,
  actionText = 'Reset Filters',
}: EmptyStateProps) {
  return (
    <div
      className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 text-center flex flex-col items-center justify-center space-y-3"
      role="alert"
      aria-live="polite"
    >
      <div className="p-3 rounded-full bg-slate-800 text-slate-400">
        <SearchX className="w-6 h-6" aria-hidden="true" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-slate-400 mt-1 max-w-sm">{message}</p>
      </div>
      {onReset && (
        <button
          onClick={onReset}
          className="mt-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 border border-slate-700 font-semibold inline-flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
}

export function LoadingSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" aria-busy="true" aria-label="Loading data">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 animate-pulse space-y-3"
        >
          <div className="h-4 bg-slate-800 rounded w-1/3" />
          <div className="h-8 bg-slate-800 rounded w-2/3" />
          <div className="h-3 bg-slate-800 rounded w-full" />
        </div>
      ))}
    </div>
  );
}
