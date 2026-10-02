'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';
import { EvidenceCategory } from '@/types';

interface StatusBadgeProps {
  category: EvidenceCategory | 'CRITICAL_LEAK' | 'RECOMMENDED' | 'ACTIVE';
  label?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({ category, label, size = 'sm' }: StatusBadgeProps) {
  const displayLabel = label || category.replace('_', ' ');

  let styles = 'bg-slate-800 text-slate-300 border-slate-700';
  let Icon = HelpCircle;

  switch (category) {
    case 'FACT':
      styles = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      Icon = CheckCircle2;
      break;
    case 'INFERENCE':
      styles = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      Icon = AlertCircle;
      break;
    case 'HYPOTHESIS':
      styles = 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      Icon = Sparkles;
      break;
    case 'CRITICAL_LEAK':
      styles = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      Icon = AlertTriangle;
      break;
    case 'RECOMMENDED':
      styles = 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40';
      Icon = CheckCircle2;
      break;
    case 'ACTIVE':
      styles = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      Icon = CheckCircle2;
      break;
  }

  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono font-bold uppercase rounded border ${sizeClass} ${styles}`}
      role="status"
    >
      <Icon className="w-3 h-3 shrink-0" aria-hidden="true" />
      <span>{displayLabel}</span>
    </span>
  );
}
