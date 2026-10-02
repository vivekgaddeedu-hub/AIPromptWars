'use client';

import React from 'react';
import { ROADMAP_INITIATIVES, BUDGET_BREAKDOWN } from '@/data/roadmapData';
import { TabType } from '@/types';
import { formatINR } from '@/utils/formatters';
import { 
  CalendarRange, 
  Clock, 
  Layers, 
  PieChart as PieIcon, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';

interface ImplementationPlanTabProps {
  onNavigateTab: (tab: TabType) => void;
}

const RISKS = [
  {
    risk: 'Store merchant adoption inertia (shopkeepers resistant to changing daily routines)',
    severity: 'High',
    mitigation: 'Sub-10 second WhatsApp audio/tap bot instead of heavy separate app; zero hardware cost; pilot cash incentive (₹250/wk for 95% stock accuracy).',
  },
  {
    risk: 'WhatsApp Cloud API rate limits or conversation messaging latency',
    severity: 'Medium',
    mitigation: 'Enterprise WhatsApp Business BSP tier with pre-approved transactional templates and Redis cache queuing.',
  },
  {
    risk: 'Customer substitution reluctance during live order fulfillment',
    severity: 'Medium',
    mitigation: '1-tap WhatsApp prompt with complimentary ₹25 upgrade voucher or automated sister-store split with zero price difference.',
  },
  {
    risk: 'Merchant walk-in counter chaos during festival rush periods',
    severity: 'High',
    mitigation: 'Physical 1-tap "Rush Pause" desk counter button linked to merchant Bluetooth beacon to auto-throttle platform orders.',
  },
];

export function ImplementationPlanTab({ onNavigateTab }: ImplementationPlanTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Budget Cap Proof */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <CalendarRange className="w-3.5 h-3.5 text-emerald-400" />
                <span>Phase 8: Six-Month ₹25 Lakh Implementation Blueprint</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">100% Budget Compliant</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Phased Execution Roadmap & Financial Budget Allocation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Disciplined month-by-month rollout strictly within the ₹25,00,000 ceiling, covering product development, store onboarding, and support integration.
            </p>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Budget Cap</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">
              ₹25,00,000
            </span>
            <span className="text-[10px] text-slate-400 font-mono block font-semibold">Zero Overrun Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Budget Allocation Breakdown Cards & Donut Chart */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-indigo-400" />
              <span>Capital Allocation by Operational Stream</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Sum: ₹25.0 Lakhs</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={BUDGET_BREAKDOWN.categories}
                  dataKey="amount"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {BUDGET_BREAKDOWN.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(val: unknown) => [formatINR(Number(val) || 0), 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            {BUDGET_BREAKDOWN.categories.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs p-1.5 rounded bg-slate-950/60">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-slate-300 truncate text-[11px]">{c.name.split('(')[0]}</span>
                </div>
                <span className="font-mono font-bold text-white text-[11px] shrink-0 ml-1">
                  ₹{(c.amount / 100000).toFixed(1)}L
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Phasing Highlights */}
        <div className="lg:col-span-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Phased Milestone Objectives (Months 1–6)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Structured sequence ensuring cash-positive validation before scaling
            </p>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold">
                M1-M2
              </span>
              <div>
                <strong className="text-white block">Phase 1: Proof-of-Fulfillment (Bangalore 50 Stores)</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Deploy WhatsApp bot and rush-mode in Frazer Town & Indiranagar. Validate drop in cancellation rate below 6%.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold">
                M3-M4
              </span>
              <div>
                <strong className="text-white block">Phase 2: Habit Loops & Sister-Store Routing</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Launch 3-order neighborhood passes and proximity routing. Shift ₹6L/mo ad budget from CAC discounts to habit loops.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold">
                M5-M6
              </span>
              <div>
                <strong className="text-white block">Phase 3: Multi-City Network Scale (620 Stores)</strong>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Roll out across Mumbai & Delhi NCR. Unify support-refund pipeline to slash ticket latency from 9.2h to 18 min.
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-xs text-emerald-200 flex items-center justify-between">
            <span>Payback on the ₹25L outlay reached by Month 3.7.</span>
            <button
              onClick={() => onNavigateTab('impact')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
            >
              Verify Cash Flows <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Initiatives Table */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Master Initiative Execution Register (Exact INR Costs)</span>
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Total: ₹25,00,000
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono">
                <th className="p-3">Timeline</th>
                <th className="p-3">Initiative & Category</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Target KPI</th>
                <th className="p-3">Expected Deliverable</th>
                <th className="p-3 text-right">Cost (INR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {ROADMAP_INITIATIVES.map((init) => (
                <tr key={init.id} className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-bold text-indigo-300 whitespace-nowrap">
                    {init.monthLabel}
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-white block">{init.initiative}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{init.category}</span>
                  </td>
                  <td className="p-3 text-slate-300 whitespace-nowrap">{init.owner}</td>
                  <td className="p-3 font-mono text-emerald-400 text-[11px]">{init.kpi}</td>
                  <td className="p-3 text-slate-400 text-[11px] max-w-xs">{init.expectedOutcome}</td>
                  <td className="p-3 text-right font-mono font-bold text-white whitespace-nowrap">
                    {formatINR(init.costINR)}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-950 font-bold border-t-2 border-indigo-500/50">
                <td colSpan={5} className="p-3 text-right text-slate-300 font-mono uppercase tracking-wider">
                  Total 6-Month Expenditure Ceiling:
                </td>
                <td className="p-3 text-right font-mono text-emerald-400 text-sm font-extrabold whitespace-nowrap">
                  ₹25,00,000
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Risk and Mitigation Matrix */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Operational Risk Management & Mitigation Matrix</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {RISKS.map((r, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-300">Risk #{idx + 1}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                  r.severity === 'High' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}>
                  {r.severity} Severity
                </span>
              </div>
              <p className="text-slate-300">{r.risk}</p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <strong className="text-emerald-400 block mb-0.5">Engineered Mitigation:</strong>
                {r.mitigation}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
