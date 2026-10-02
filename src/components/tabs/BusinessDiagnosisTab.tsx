'use client';

import React, { useState } from 'react';
import { CAUSAL_NODES } from '@/data/causalGraphData';
import { EvidenceCategory, TabType } from '@/types';
import { 
  Network, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Layers
} from 'lucide-react';

interface BusinessDiagnosisTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export function BusinessDiagnosisTab({ onNavigateTab }: BusinessDiagnosisTabProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('inventory');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | EvidenceCategory>('ALL');

  const selectedNode = CAUSAL_NODES.find((n) => n.id === selectedNodeId) || CAUSAL_NODES[0];

  // Helper to determine node colors and dimming
  const getNodeColor = (category: EvidenceCategory, isSelected: boolean, isDimmed: boolean) => {
    if (isDimmed) {
      return 'opacity-30 border-slate-800 bg-slate-950/40 text-slate-400';
    }
    if (isSelected) {
      return 'border-indigo-400 bg-indigo-950/80 shadow-lg shadow-indigo-500/30 text-white ring-2 ring-indigo-400';
    }
    switch (category) {
      case 'FACT':
        return 'border-emerald-600/60 bg-slate-900/90 text-emerald-200 hover:border-emerald-400';
      case 'INFERENCE':
        return 'border-amber-600/60 bg-slate-900/90 text-amber-200 hover:border-amber-400';
      case 'HYPOTHESIS':
        return 'border-purple-600/60 bg-slate-900/90 text-purple-200 hover:border-purple-400';
    }
  };

  const getBadgeStyle = (category: EvidenceCategory) => {
    switch (category) {
      case 'FACT':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'INFERENCE':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'HYPOTHESIS':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Tab Header & Scientific Epistemology Legend */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              <span>Phase 2: Visual Causal Map</span>
            </span>
            <span className="text-xs text-slate-400">10 Strategic Interconnected Nodes</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Systemic Causal Web: From Root Breakdown to Revenue Collapse
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any node to trace verifiable case evidence, operational causes, and business consequences.
          </p>
        </div>

        {/* Epistemological Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs" role="toolbar" aria-label="Evidence category filter">
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition focus-visible:ring-1 focus-visible:ring-indigo-400 ${
              categoryFilter === 'ALL'
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-slate-800/80 text-slate-400 border-slate-700'
            }`}
            aria-pressed={categoryFilter === 'ALL'}
          >
            All (10)
          </button>

          <button
            onClick={() => setCategoryFilter('FACT')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-indigo-400 ${
              categoryFilter === 'FACT'
                ? 'bg-emerald-800 text-white border-emerald-600'
                : 'bg-emerald-950/20 text-emerald-400 border-emerald-800/50'
            }`}
            aria-pressed={categoryFilter === 'FACT'}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
            <span>FACT (Verified in Case)</span>
          </button>

          <button
            onClick={() => setCategoryFilter('INFERENCE')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition flex items-center gap-1.5 focus-visible:ring-1 focus-visible:ring-indigo-400 ${
              categoryFilter === 'INFERENCE'
                ? 'bg-amber-600 text-white border-amber-500'
                : 'bg-amber-950/20 text-amber-400 border-amber-800/50'
            }`}
            aria-pressed={categoryFilter === 'INFERENCE'}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
            <span>INFERENCE (Logical Deduction)</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Causal Map + Node Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Map / Interactive Node Canvas */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Click a Node to Inspect Causal Linkages</span>
            <span className="text-[11px] font-mono text-indigo-400">
              Active: {selectedNode.title}
            </span>
          </div>

          {/* Interactive Node Flow Grid */}
          <div className="py-6 space-y-4">
            {/* Layer 1: Operational Root Cause */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                Layer 1: Store &amp; Catalog Level (Operational Core)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAUSAL_NODES.filter((n) => ['inventory', 'store_health'].includes(n.id)).map((node) => {
                  const isDimmed = categoryFilter !== 'ALL' && node.category !== categoryFilter;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${getNodeColor(
                        node.category,
                        selectedNodeId === node.id,
                        isDimmed
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{node.title}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase ${getBadgeStyle(node.category)}`}>
                          {node.category}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-400 line-clamp-1">
                        {node.businessConsequence}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-indigo-400 font-mono">
                        <span>Links to:</span>
                        {node.connectedTo.map((target) => (
                          <span key={target} className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                            {target}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connecting Flow Indicator */}
            <div className="flex justify-center my-1" aria-hidden="true">
              <div className="px-3 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 border border-slate-700 font-mono">
                &darr; Downstream Fulfillment Execution Friction &darr;
              </div>
            </div>

            {/* Layer 2: Delivery & Cancellations */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                Layer 2: Order Fulfillment &amp; Support Cascades
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CAUSAL_NODES.filter((n) => ['delivery', 'cancellations', 'refunds'].includes(n.id)).map((node) => {
                  const isDimmed = categoryFilter !== 'ALL' && node.category !== categoryFilter;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${getNodeColor(
                        node.category,
                        selectedNodeId === node.id,
                        isDimmed
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs truncate" title={node.title}>{node.title}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 ${getBadgeStyle(node.category)}`}>
                          {node.category}
                        </span>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 font-mono">
                        {node.relatedMetrics[0]?.label}: <strong className="text-white">{node.relatedMetrics[0]?.value}</strong>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connecting Flow Indicator */}
            <div className="flex justify-center my-1" aria-hidden="true">
              <div className="px-3 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 border border-slate-700 font-mono">
                &darr; Customer Experience &amp; Trust Degradation &darr;
              </div>
            </div>

            {/* Layer 3: Customer Experience, Support & Retention */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                Layer 3: Customer Trust &amp; Churn Window
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CAUSAL_NODES.filter((n) => ['support', 'customer_experience', 'retention'].includes(n.id)).map((node) => {
                  const isDimmed = categoryFilter !== 'ALL' && node.category !== categoryFilter;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${getNodeColor(
                        node.category,
                        selectedNodeId === node.id,
                        isDimmed
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs truncate" title={node.title}>{node.title}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase shrink-0 ${getBadgeStyle(node.category)}`}>
                          {node.category}
                        </span>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 font-mono">
                        {node.relatedMetrics[0]?.label}: <strong className="text-white">{node.relatedMetrics[0]?.value}</strong>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Connecting Flow Indicator */}
            <div className="flex justify-center my-1" aria-hidden="true">
              <div className="px-3 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400 border border-slate-700 font-mono">
                &darr; Financial Feedback Loop &amp; Cash Bleed &darr;
              </div>
            </div>

            {/* Layer 4: Financial & Commercial Drain */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-medium">
                Layer 4: Financial Burn &amp; Platform Sustainability
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CAUSAL_NODES.filter((n) => ['marketing_spend', 'revenue'].includes(n.id)).map((node) => {
                  const isDimmed = categoryFilter !== 'ALL' && node.category !== categoryFilter;
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${getNodeColor(
                        node.category,
                        selectedNodeId === node.id,
                        isDimmed
                      )}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{node.title}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase ${getBadgeStyle(node.category)}`}>
                          {node.category}
                        </span>
                      </div>
                      <div className="mt-2 text-[10px] text-slate-400 font-mono">
                        {node.relatedMetrics[0]?.label}: <strong className="text-white">{node.relatedMetrics[0]?.value}</strong>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>
              <strong>Scientific Protocol:</strong> Every inference is substantiated by verified case facts. No subjective conjectures.
            </span>
            <button
              onClick={() => onNavigateTab('opportunity')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-indigo-400"
            >
              Examine Hypotheses <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right Column: Node Detailed Telemetry Drawer */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
          {/* Header of selected node */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase ${getBadgeStyle(selectedNode.category)}`}>
                Classification: {selectedNode.category}
              </span>
              <span className="text-[11px] font-mono uppercase text-slate-400">
                Group: {selectedNode.group}
              </span>
            </div>

            <h3 className="text-xl font-extrabold text-white mt-2">
              {selectedNode.title}
            </h3>

            {/* Epistemological Explanation */}
            <div className="mt-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              {selectedNode.category === 'FACT' ? (
                <span>
                  <strong className="text-emerald-400">Audited Fact:</strong> Directly quoted from measured NOVA CART platform metrics or survey datasets.
                </span>
              ) : selectedNode.category === 'INFERENCE' ? (
                <span>
                  <strong className="text-amber-400">Analytical Inference:</strong> Directly derived via logical causality from underlying operational data.
                </span>
              ) : (
                <span>
                  <strong className="text-purple-400">Working Hypothesis:</strong> Subject to rigorous experimental validation in Phase 3.
                </span>
              )}
            </div>
          </div>

          {/* Case Evidence */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
              <span>Documented Case Evidence</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedNode.caseEvidence.map((ev, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-indigo-400 font-bold" aria-hidden="true">&bull;</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Metrics */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              <span>Related Case Metrics</span>
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {selectedNode.relatedMetrics.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{m.label}</span>
                  <span className={`text-sm font-bold font-mono mt-0.5 block ${m.bad ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Possible Causes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <span>Underlying Engineering / Operational Causes</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedNode.possibleCauses.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                  <span className="text-amber-400 font-mono text-[10px]" aria-hidden="true">&rarr;</span>
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Consequence */}
          <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs">
            <span className="font-bold text-rose-300 uppercase tracking-wider text-[10px] block mb-1">
              Business Consequence &amp; Financial Impact:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {selectedNode.businessConsequence}
            </p>
          </div>

          {/* Downstream Links */}
          <div className="pt-2 border-t border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
              Connected Downstream Effects:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedNode.connectedTo.map((targetId) => {
                const targetNode = CAUSAL_NODES.find((n) => n.id === targetId);
                if (!targetNode) return null;
                return (
                  <button
                    key={targetId}
                    onClick={() => setSelectedNodeId(targetId)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 border border-slate-700 transition focus-visible:ring-1 focus-visible:ring-indigo-400"
                  >
                    <span>{targetNode.title}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
