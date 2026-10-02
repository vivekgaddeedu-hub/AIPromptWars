'use client';

import React from 'react';

interface LoadingSkeletonProps {
  rows?: number;
  className?: string;
}

export function LoadingSkeleton({ rows = 3, className = '' }: LoadingSkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Loading content..."
      className={`space-y-4 animate-pulse p-6 bg-slate-900/50 border border-slate-800 rounded-2xl ${className}`}
    >
      <div className="h-6 bg-slate-800 rounded-md w-1/3" />
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-slate-800/60 rounded"
            style={{ width: `${Math.max(40, 100 - i * 15)}%` }}
          />
        ))}
      </div>
      <div className="h-24 bg-slate-800/40 rounded-xl mt-4" />
      <span className="sr-only">Loading content, please wait...</span>
    </div>
  );
}
