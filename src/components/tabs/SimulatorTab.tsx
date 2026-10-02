'use client';

import React, { useState } from 'react';
import { SimulationParams, TabType } from '@/types';
import { formatINR, formatPct } from '@/utils/formatters';
import { calculateProjectedImpact } from '@/utils/calculations';
import { 
  Sliders, 
  TrendingUp, 
  ArrowRight, 
  AlertCircle,
  Calculator,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';

interface SimulatorTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export function SimulatorTab({ onNavigateTab }: SimulatorTabProps) {
  // Configurable sliders
  const [params, setParams] = useState<SimulationParams>({
    inventorySyncAdoption: 75, // 75% of stores
    rushModeBufferAdoption: 70, // 70% of stores
    habitLoop3OrderTargeting: 50, // 50% of 1st/2nd time users
    marketingBudgetReallocation: 35, // 35% shifted from acquisition to habit vouchers
    instantSubstitutionResolution: true,
  });

  const [showAssumptionInspector, setShowAssumptionInspector] = useState(false);

  // Pure function calculation grounded in case numbers
  const {
    projectedCancellationRate,
    projectedRepeatRate,
    projectedDeliveryTime,
    annualProtectedGMV,
    projectedNetMonthlyContribution,
  } = calculateProjectedImpact(params);

  // Comparison dataset for Recharts
  const comparisonData = [
    { metric: 'Cancellation Rate (%)', Current: 11.0, Projected: parseFloat(projectedCancellationRate.toFixed(1)) },
    { metric: 'Repeat Purchase (%)', Current: 27.0, Projected: parseFloat(projectedRepeatRate.toFixed(1)) },
    { metric: 'Avg Delivery Time (min)', Current: 37.0, Projected: parseFloat(projectedDeliveryTime.toFixed(1)) },
    { metric: 'Net Revenue (₹ Lakh/mo)', Current: 9.1, Projected: parseFloat(projectedNetMonthlyContribution.toFixed(1)) },
  ];

  const handleApplyPreset = (preset: 'CONSERVATIVE' | 'BASE' | 'AGGRESSIVE') => {
    if (preset === 'CONSERVATIVE') {
      setParams({
        inventorySyncAdoption: 40,
        rushModeBufferAdoption: 35,
        habitLoop3OrderTargeting: 25,
        marketingBudgetReallocation: 20,
        instantSubstitutionResolution: true,
      });
    } else if (preset === 'BASE') {
      setParams({
        inventorySyncAdoption: 75,
        rushModeBufferAdoption: 70,
        habitLoop3OrderTargeting: 50,
        marketingBudgetReallocation: 35,
        instantSubstitutionResolution: true,
      });
    } else {
      setParams({
        inventorySyncAdoption: 95,
        rushModeBufferAdoption: 90,
        habitLoop3OrderTargeting: 85,
        marketingBudgetReallocation: 45,
        instantSubstitutionResolution: true,
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Disclaimer */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Phase 6 & 7: Dynamic Intervention Simulator</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">Deterministic Economic Model</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Simulate Intervention Scenarios & Model Business Impact
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Tune operational adoption parameters to see projected improvements in repeat purchase, cancellation, delivery speed, and net margin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAssumptionInspector(!showAssumptionInspector)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>{showAssumptionInspector ? 'Hide Formulas' : 'Inspect Assumptions'}</span>
            </button>
          </div>
        </div>

        {/* Required Mandatory Statutory Disclaimer */}
        <div className="mt-4 p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Mandatory Assessment Notice:</strong> Illustrative scenario based on configurable assumptions derived from case baseline elasticities.
            </span>
          </div>
          <span className="text-[10px] font-mono text-amber-400/80 uppercase">Case § Financial Feasibility</span>
        </div>
      </div>

      {/* Preset Scenario Buttons */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-300">
          Load Pre-calibrated Scenario:
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleApplyPreset('CONSERVATIVE')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
          >
            Conservative (Pilot 40%)
          </button>
          <button
            onClick={() => handleApplyPreset('BASE')}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm"
          >
            Base Case (Target 75%)
          </button>
          <button
            onClick={() => handleApplyPreset('AGGRESSIVE')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700"
          >
            Aggressive (Full Scale 95%)
          </button>
        </div>
      </div>

      {/* Main Grid: Controls + Live Dynamic Outcomes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-3">
            Configurable Operational Levers
          </h3>

          {/* Slider 1: Inventory Smart Sync */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">1. Store Smart-Sync Adoption</span>
              <span className="font-mono font-bold text-indigo-400">{params.inventorySyncAdoption}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={params.inventorySyncAdoption}
              onChange={(e) => setParams({ ...params, inventorySyncAdoption: Number(e.target.value) })}
              className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              % of 620 stores utilizing WhatsApp 1-tap stock confirmation. Direct impact on 35% unavailable item cancellations.
            </p>
          </div>

          {/* Slider 2: Rush Mode Buffer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">2. Rush-Mode Auto-Throttling</span>
              <span className="font-mono font-bold text-amber-400">{params.rushModeBufferAdoption}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={params.rushModeBufferAdoption}
              onChange={(e) => setParams({ ...params, rushModeBufferAdoption: Number(e.target.value) })}
              className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              % of stores protected during walk-in rush hours. Direct impact on 18% store rejection cancellations.
            </p>
          </div>

          {/* Slider 3: 3-Order Habit Loop */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">3. 3-Order Habit Loop Targeting</span>
              <span className="font-mono font-bold text-emerald-400">{params.habitLoop3OrderTargeting}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={params.habitLoop3OrderTargeting}
              onChange={(e) => setParams({ ...params, habitLoop3OrderTargeting: Number(e.target.value) })}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              % of 1st & 2nd order customers receiving cross-category neighborhood passes. Unlocks 72% repeat threshold.
            </p>
          </div>

          {/* Slider 4: Marketing Reallocation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">4. Marketing Budget Shift (CAC to Habit)</span>
              <span className="font-mono font-bold text-cyan-400">{params.marketingBudgetReallocation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="5"
              value={params.marketingBudgetReallocation}
              onChange={(e) => setParams({ ...params, marketingBudgetReallocation: Number(e.target.value) })}
              className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              Replaces unredeemed 50% discount coupons with retention-focused multi-store habit subsidies.
            </p>
          </div>

          {/* Toggle: Instant Substitution */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-white block">Sister-Store Router</span>
              <span className="text-[10px] text-slate-400">Auto-routes out-of-stock items within 1.5km</span>
            </div>
            <button
              onClick={() => setParams({ ...params, instantSubstitutionResolution: !params.instantSubstitutionResolution })}
              className={`px-3 py-1 rounded-full text-xs font-mono font-bold border transition ${
                params.instantSubstitutionResolution
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {params.instantSubstitutionResolution ? 'ACTIVE' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Right Column: Live Projected Impact Dashboard */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Simulated Macro Outcome vs Current Baseline</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time response to parameter adjustments across all 38,500 monthly orders
                </p>
              </div>
            </div>

            {/* 4 Outcome Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Repeat Rate</span>
                <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                  {projectedRepeatRate.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  was 27.0% ({formatPct(projectedRepeatRate - 27.0)} pts)
                </span>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Cancellation</span>
                <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                  {projectedCancellationRate.toFixed(1)}%
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  was 11.0% (-{(11.0 - projectedCancellationRate).toFixed(1)} pts)
                </span>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Avg Delivery</span>
                <span className="text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                  {projectedDeliveryTime.toFixed(1)} min
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  was 37.0 min (-{(37.0 - projectedDeliveryTime).toFixed(1)}m)
                </span>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Monthly Net Rev</span>
                <span className="text-lg font-bold text-indigo-300 font-mono mt-0.5 block">
                  ₹{projectedNetMonthlyContribution.toFixed(1)}L
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  +{formatPct(((projectedNetMonthlyContribution - 9.1) / 9.1) * 100)}
                </span>
              </div>
            </div>

            {/* Recharts Bar Chart: Baseline vs Projected */}
            <div className="h-60 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="metric" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Current" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Projected" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Annual GMV Shielding Highlight */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[10px] font-mono uppercase block">Annual GMV Protected:</span>
                <span className="text-base font-extrabold text-white">
                  {formatINR(annualProtectedGMV)} / year
                </span>
              </div>
              <button
                onClick={() => onNavigateTab('impact')}
                className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition border border-emerald-600"
              >
                <span>View Full ROI Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assumption Inspector Modal / Expandable Drawer */}
      {showAssumptionInspector && (
        <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-400" />
              <span>Transparent Model Assumptions & Formulas</span>
            </h4>
            <span className="text-xs font-mono text-slate-400">Auditable Grounding</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-semibold text-emerald-400">1. Cancellation Elasticity:</span>
              <p className="text-slate-300 font-mono text-[11px]">
                cancellation_rate = 11.0% - (smart_sync% × 35% × 0.85) - (rush_mode% × 18% × 0.80) - (sub_router ? 1.2% : 0%)
              </p>
              <p className="text-slate-400 text-[10px]">
                Grounding: 35% of cancellations in case are unavailable products; 18% are store rush rejections.
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-semibold text-indigo-400">2. Repeat Purchase Rate Elasticity:</span>
              <p className="text-slate-300 font-mono text-[11px]">
                repeat_rate = 27.0% + (habit_loop_targeting% × 8.5 pts) + (fulfillment_trust_recovery × 4.5 pts)
              </p>
              <p className="text-slate-400 text-[10px]">
                Grounding: Case demonstrates 3-order customers reach 72% retention. Transitioning 1st-to-2nd order buyers unlocks exponential cohort survival.
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-semibold text-amber-400">3. Support Ticket Deceleration:</span>
              <p className="text-slate-300 font-mono text-[11px]">
                support_tickets = 5,900 × (1 - (cancellation_drop / 11%) × 0.55 - 0.15_sub_auto)
              </p>
              <p className="text-slate-400 text-[10px]">
                Grounding: 48% of all tickets are refunds (29%) and missing items (19%). Instant resolution eliminates agent ticket loops.
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="font-semibold text-cyan-400">4. Net Monthly Contribution:</span>
              <p className="text-slate-300 font-mono text-[11px]">
                net_rev = ₹9.1L + (protected_gmv × 14.5% commission) + promo_savings + support_cost_savings
              </p>
              <p className="text-slate-400 text-[10px]">
                Grounding: Current net contribution after ₹17L promo spend is ₹9.1L/mo (₹26.1L rev - ₹17L promo).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
