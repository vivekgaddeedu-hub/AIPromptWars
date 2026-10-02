'use client';

import React, { useState } from 'react';
import { HYPOTHESES, SYNTHESIS_DECISION } from '@/data/hypothesesData';
import { TabType } from '@/types';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  Scale, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';

interface OpportunityAnalysisTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export function OpportunityAnalysisTab({ onNavigateTab }: OpportunityAnalysisTabProps) {
  const [selectedHypoId, setSelectedHypoId] = useState<string>('H3');
  const selectedHypo = HYPOTHESES.find((h) => h.id === selectedHypoId) || HYPOTHESES[2];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Framework Intro */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                <span>Phase 1 &amp; Phase 3: Evidence-Based Decision Framework</span>
              </span>
              <span className="text-xs text-slate-400">Strict ₹25L Budget Constraint</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1.5">
              Evaluating 5 Competing Hypotheses &amp; Opportunity Selection
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-4xl">
              Rather than assuming the solution, we stress-tested 5 competing explanations against case data. The evidence proves that fixing inventory drift (H3) and activating the 3-order habit loop via multi-category discovery (H5) creates the highest ROI turnaround.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 transition focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <span>Explore Selected Product</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Decision Matrix Table */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4" aria-labelledby="matrix-title">
        <div className="flex items-center justify-between">
          <div>
            <h3 id="matrix-title" className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Evidence-Based Decision Matrix (Weighted Scoring /50)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated across 5 objective dimensions grounded in case constraints and data
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-2.5 py-1 rounded-lg">
            H3 + H5 Synthesis Wins
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono">
                <th className="p-3">Hypothesis</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Evidence Weight (25%)</th>
                <th className="p-3 text-center">Root-Cause Fit (25%)</th>
                <th className="p-3 text-center">₹25L Budget Fit (20%)</th>
                <th className="p-3 text-center">Time to Value (15%)</th>
                <th className="p-3 text-center">Local Moat (15%)</th>
                <th className="p-3 text-right">Total Score (/50)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {HYPOTHESES.map((h) => {
                const isSelected = selectedHypoId === h.id;
                const isPrimary = h.status === 'PRIMARY_OPPORTUNITY';

                return (
                  <tr
                    key={h.id}
                    onClick={() => setSelectedHypoId(h.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-indigo-950/40 text-white font-medium'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="p-3 font-semibold">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isPrimary ? 'bg-emerald-400' : 'bg-slate-600'}`} aria-hidden="true" />
                        <span>{h.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                          h.status === 'PRIMARY_OPPORTUNITY'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : h.status === 'CONTRIBUTING_SYMPTOM'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        }`}
                      >
                        {h.status === 'PRIMARY_OPPORTUNITY' ? 'Selected Core' : h.status === 'CONTRIBUTING_SYMPTOM' ? 'Symptom / Secondary' : 'Rejected'}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono">{h.score.evidenceWeight}/10</td>
                    <td className="p-3 text-center font-mono">{h.score.addressableRootCause}/10</td>
                    <td className="p-3 text-center font-mono">{h.score.budgetFit25L}/10</td>
                    <td className="p-3 text-center font-mono">{h.score.timeToValue6Mo}/10</td>
                    <td className="p-3 text-center font-mono">{h.score.localMoatLeverage}/10</td>
                    <td className="p-3 text-right font-mono font-extrabold text-sm">
                      <span className={h.score.totalScore >= 40 ? 'text-emerald-400' : h.score.totalScore >= 30 ? 'text-amber-300' : 'text-rose-400'}>
                        {h.score.totalScore}
                      </span>
                      <span className="text-slate-400 text-xs">/50</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Selected Hypothesis Deep Dive Panel */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6" aria-labelledby="hypo-detail-heading">
        {/* Selector pills */}
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Hypothesis selector">
          {HYPOTHESES.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelectedHypoId(h.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border focus-visible:ring-1 focus-visible:ring-indigo-400 ${
                selectedHypoId === h.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
              role="tab"
              aria-selected={selectedHypoId === h.id}
            >
              {h.id}: {h.name.split(':')[1]?.trim() || h.name}
            </button>
          ))}
        </div>

        {/* Hypothesis Details Header */}
        <div className="border-b border-slate-800 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                Hypothesis Assessment Dossier
              </span>
              <h3 id="hypo-detail-heading" className="text-xl font-bold text-white mt-1">
                {selectedHypo.name}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedHypo.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-right">
                <span className="text-[10px] text-slate-400 block font-mono uppercase">Complexity</span>
                <span className="text-xs font-bold text-white font-mono">{selectedHypo.implementationComplexity}</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-right">
                <span className="text-[10px] text-slate-400 block font-mono uppercase">Total Score</span>
                <span className="text-base font-extrabold text-emerald-400 font-mono">{selectedHypo.score.totalScore}/50</span>
              </div>
            </div>
          </div>
        </div>

        {/* Evidence For vs Against */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Evidence Supporting */}
          <div className="bg-slate-950/60 border border-emerald-900/30 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Evidence Supporting This Hypothesis</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedHypo.evidenceSupporting.map((ev, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-emerald-950/10 p-2 rounded border border-emerald-800/20">
                  <span className="text-emerald-400 font-bold" aria-hidden="true">&check;</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Evidence Weakening */}
          <div className="bg-slate-950/60 border border-rose-900/30 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <XCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Evidence Weakening This Hypothesis</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedHypo.evidenceWeakening.map((ev, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-rose-950/10 p-2 rounded border border-rose-800/20">
                  <span className="text-rose-400 font-bold" aria-hidden="true">&times;</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Metrics & Downstream Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Affected Metrics
            </span>
            <div className="space-y-1">
              {selectedHypo.affectedMetrics.map((m, idx) => (
                <div key={idx} className="text-slate-200 font-mono text-[11px]">
                  &bull; {m}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              ₹25L Budget Feasibility
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {selectedHypo.budgetFeasibility}
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Strategic Relevance
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {selectedHypo.expectedBusinessRelevance}
            </p>
          </div>
        </div>
      </section>

      {/* The Strategic Synthesis: WHY THIS PRODUCT? (Phase 3 Core Mandate) */}
      <section className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl" aria-labelledby="selected-product-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-500/30 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>The Unanimous Selected Product</span>
              </span>
            </div>
            <h3 id="selected-product-heading" className="text-2xl font-black text-white mt-1 tracking-tight">
              {SYNTHESIS_DECISION.winningStrategy}
            </h3>
            <p className="text-xs text-indigo-200 mt-1">
              Sub-systems: Predictive Inventory Sentinel + Merchant Rush-Mode PWA + 3-Order Multi-Category Habit Activator
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('dashboard')}
            className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold border border-emerald-600 shadow-lg shadow-emerald-900/30 transition flex items-center gap-2 shrink-0 self-start sm:self-auto focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Launch Live Product</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* 5 Crucial Strategic Proof Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Why this problem */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-900/40 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
              1. Why This Problem?
            </span>
            <h4 className="text-sm font-bold text-white">The Root-Cause Churn Engine</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SYNTHESIS_DECISION.whyThisProblem}
            </p>
          </div>

          {/* Why now */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-900/40 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400">
              2. Why Now?
            </span>
            <h4 className="text-sm font-bold text-white">Preventing Network Death Spiral</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SYNTHESIS_DECISION.whyNow}
            </p>
          </div>

          {/* Why digital */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-900/40 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              3. Why Digital?
            </span>
            <h4 className="text-sm font-bold text-white">Lightweight PWA / WhatsApp Bot</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SYNTHESIS_DECISION.whyDigital}
            </p>
          </div>

          {/* Why this product */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-900/40 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              4. Why This Product?
            </span>
            <h4 className="text-sm font-bold text-white">Uniting Merchant &amp; Customer Moat</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SYNTHESIS_DECISION.whyThisProduct}
            </p>
          </div>

          {/* Why not others */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-900/40 space-y-1.5 md:col-span-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
              5. Why Not The Other Options?
            </span>
            <h4 className="text-sm font-bold text-white">Eliminating Unviable Alternatives</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {SYNTHESIS_DECISION.whyNotOthers}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
