'use client';

import React from 'react';
import { formatNumber } from '@/utils/formatters';

interface KpiCardProps {
  label: string;
  currentValue: number | string;
  baselineValue?: number | string;
  prefix?: string;
  suffix?: string;
  changePct?: number;
  sentiment?: 'positive' | 'negative' | 'neutral';
  explanation?: string;
  factTag?: string;
}

export function KpiCard({
  label,
  currentValue,
  baselineValue,
  prefix = '',
  suffix = '',
  changePct,
  sentiment = 'neutral',
  explanation,
  factTag,
}: KpiCardProps) {
  const isNegative = sentiment === 'negative';
  const isPositive = sentiment === 'positive';

  const formattedCurrent = typeof currentValue === 'number' ? formatNumber(currentValue) : currentValue;
  const formattedBaseline = typeof baselineValue === 'number' ? formatNumber(baselineValue) : baselineValue;

  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        isNegative
          ? 'bg-rose-950/15 border-rose-800/40 hover:border-rose-700'
          : isPositive
          ? 'bg-emerald-950/15 border-emerald-800/40 hover:border-emerald-700'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
      }`}
      role="region"
      aria-label={`${label}: ${prefix}${formattedCurrent}${suffix}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-300 truncate" title={label}>
          {label}
        </span>
        {changePct !== undefined && (
          <span
            className={`inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
              isNegative
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                : isPositive
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-700/50 text-slate-300'
            }`}
          >
            {changePct >= 0 ? '+' : ''}{changePct}%
          </span>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-xl font-extrabold text-white">
          {prefix}{formattedCurrent}{suffix}
        </span>
        {baselineValue !== undefined && (
          <span className="text-xs text-slate-400 font-mono">
            was {prefix}{formattedBaseline}{suffix}
          </span>
        )}
      </div>

      {explanation && (
        <p className="mt-2 text-[11px] text-slate-300 leading-tight">
          {explanation}
        </p>
      )}

      {factTag && (
        <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[9px] font-mono text-slate-400">
          <span>SOURCE GROUNDING:</span>
          <span className="text-indigo-400 font-bold">{factTag}</span>
        </div>
      )}
    </div>
  );
}
