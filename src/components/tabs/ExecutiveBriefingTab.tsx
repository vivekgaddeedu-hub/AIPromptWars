'use client';

import React from 'react';
import { 
  CASE_METRICS, 
  CANCELLATION_REASONS, 
  SUPPORT_TICKETS_BREAKDOWN, 
  RETENTION_FUNNEL_EVIDENCE,
  PARTNER_STORE_EVIDENCE,
  CUSTOMER_SIGNALS
} from '@/data/caseData';
import { TabType } from '@/types';
import { KpiCard } from '@/components/ui/KpiCard';
import { 
  AlertTriangle, 
  Users, 
  Store,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';

interface ExecutiveBriefingTabProps {
  onNavigateTab: (tab: TabType) => void;
}

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#6366f1', '#8b5cf6', '#06b6d4'];

export function ExecutiveBriefingTab({ onNavigateTab }: ExecutiveBriefingTabProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Strategic Challenge Mission Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>AI Business Innovation Team Directive</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            &ldquo;If NOVA CART could build one digital product or major digital intervention right now, what should it build &mdash; and can you prove why?&rdquo;
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            NOVA CART connects customers with <strong>620 local stores</strong> across 3 Indian cities. While top-of-funnel registered users jumped from 82k to 120k (+46%), the business is bleeding from an acute operational collapse: <strong>repeat purchase rate plunged from 41% to 27%</strong>, order cancellations doubled to 11% (leaking ₹20.58L/mo in GMV), and <strong>61% of churned users had previously rated 4+ stars</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono">
              6-Month Budget Ceiling: <strong>₹25,00,000</strong>
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono">
              Network: <strong>620 Local Stores</strong>
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono">
              Cities: <strong>Mumbai, Bengaluru, Delhi NCR</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 10 Core Case Metrics Grid */}
      <section className="space-y-3" aria-labelledby="matrix-heading">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="matrix-heading" className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>Current vs Baseline Performance Matrix</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                Case Facts
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Audited before &amp; after metrics revealing top-line growth vs severe growth-quality deterioration
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {CASE_METRICS.map((metric) => (
            <KpiCard
              key={metric.key}
              label={metric.label}
              currentValue={metric.current}
              baselineValue={metric.baseline}
              prefix={metric.prefix}
              suffix={metric.suffix}
              changePct={metric.changePct}
              sentiment={metric.sentiment}
              explanation={metric.explanation}
              factTag={metric.factTag}
            />
          ))}
        </div>
      </section>

      {/* The Financial Paradox & Margin Squeeze Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6" aria-label="Financial Analysis">
        <div className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">
                  The Growth Illusion: The Margin &amp; Cash Paradox
                </h3>
                <p className="text-xs text-slate-400">
                  Gross merchandise value expanded, but net unit economics collapsed
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
              Leaky Bucket
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block">Monthly GMV</span>
              <span className="text-lg font-bold text-white mt-1 block font-mono">
                ₹1.87 Crore
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">
                +32.7% (was ₹1.41 Cr)
              </span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block">Promotional Burn</span>
              <span className="text-lg font-bold text-rose-400 mt-1 block font-mono">
                ₹17.0 Lakhs/mo
              </span>
              <span className="text-[10px] text-rose-400 font-mono">
                +78.9% (was ₹9.5L)
              </span>
            </div>

            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block">Net After-Promo Rev</span>
              <span className="text-lg font-bold text-amber-300 mt-1 block font-mono">
                ₹9.1 Lakhs/mo
              </span>
              <span className="text-[10px] text-rose-400 font-mono font-bold">
                -26.0% (was ₹12.3L)
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 space-y-2">
            <p>
              <strong>The Arithmetic of the Failure:</strong> Promotional spending rose by <strong>+₹7.5 Lakhs/month</strong>, yet net monthly revenue only rose by <strong>+₹4.3 Lakhs</strong>. This means every incremental rupee spent on marketing destroyed ₹0.43 in net platform cash flow!
            </p>
            <p className="text-slate-400 text-[11px]">
              Meanwhile, 11% cancellations erase <strong>4,235 orders/month</strong>, throwing away <strong>₹20,58,210 in GMV every 30 days</strong> (₹2.47 Crore annualized).
            </p>
          </div>
        </div>

        {/* The 3-Order Habit Threshold Visualizer */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>The 3-Order Habit Threshold</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Golden Metric
                </span>
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              &ldquo;Customers completing 3 orders have a 72% probability of ordering again the following month.&rdquo;
            </p>
          </div>

          {/* Retention Drop Funnel */}
          <div className="space-y-2.5">
            {RETENTION_FUNNEL_EVIDENCE.map((step, idx) => (
              <div key={step.step} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{step.step}</span>
                  <span className="font-mono font-bold text-white">{step.conversionPct}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      idx === 2 ? 'bg-rose-500' : idx === 3 ? 'bg-emerald-400' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${step.conversionPct}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">{step.detail}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Leaking between Order 1 and 2:</span>
            <span className="text-rose-400 font-bold font-mono">69% Churn Rate</span>
          </div>
        </div>
      </section>

      {/* Operational Breakdown Charts: Cancellations & Support */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Operational Breakdown">
        {/* Cancellation Breakdown */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Order Cancellation Drivers (11% of Volume)</span>
              </h3>
              <p className="text-xs text-slate-400">
                4,235 orders/month cancelled; 53% driven by inventory drift and store walk-in rush
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-rose-400">₹20.58L Lost/mo</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CANCELLATION_REASONS} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" unit="%" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="reason" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: unknown) => [
                    `${typeof value === 'number' ? value : String(value)}% (${Math.round((38500 * 0.11 * Number(value)) / 100)} orders)`,
                    'Share'
                  ]}
                />
                <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                  {CANCELLATION_REASONS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <span><strong>Primary Takeaway:</strong> Unavailable products (35%) + Store rejections (18%) = <strong>53% controllable cancellations</strong>.</span>
            <button
              onClick={() => onNavigateTab('diagnosis')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-indigo-400"
            >
              Trace in Causal Map <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Customer Support Tickets Breakdown */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Customer Support Tickets (5,900 / Month)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Avg resolution: 9.2 hours across siloed orders, refunds, and store chat
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">+90.3% Surge</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SUPPORT_TICKETS_BREAKDOWN} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" unit="%" stroke="#94a3b8" fontSize={11} />
                <YAxis dataKey="category" type="category" stroke="#94a3b8" fontSize={10} width={130} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  formatter={(value: unknown, _name: unknown, item: { payload?: { count?: number; avgWaitHours?: number } }) => [
                    `${typeof value === 'number' ? value : String(value)}% (${item.payload?.count ?? 0} tickets) | Latency: ${item.payload?.avgWaitHours ?? 0} hrs`,
                    'Volume',
                  ]}
                />
                <Bar dataKey="pct" fill="#6366f1" radius={[0, 4, 4, 0]}>
                  {SUPPORT_TICKETS_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-support-${index}`} fill={index === 0 ? '#ef4444' : index === 1 ? '#f97316' : '#6366f1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <span><strong>Primary Takeaway:</strong> 48% of tickets are directly tied to refunds (29%) and unavailable items (19%).</span>
            <button
              onClick={() => onNavigateTab('opportunity')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 focus-visible:ring-1 focus-visible:ring-indigo-400"
            >
              See Opportunity <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Voice of the Customer & Voice of the Merchant */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Customer and Merchant Signals">
        {/* Customer Signals */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              <span>Customer Voice: What Drives Churn</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
              61% Churned Rated 4+ Stars
            </span>
          </div>

          <div className="space-y-2">
            {CUSTOMER_SIGNALS.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                <span className="text-slate-300">{s.signal}</span>
                <span className="font-mono font-bold text-white shrink-0 ml-3">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Store Signals */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Partner Store Signals: Merchant Strains</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
              620 Partner Stores
            </span>
          </div>

          <div className="space-y-2">
            {PARTNER_STORE_EVIDENCE.signals.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                <span className="text-slate-300">{s.label}</span>
                <span className={`font-mono font-bold shrink-0 ml-3 ${
                  s.status === 'critical_risk' ? 'text-rose-400' : s.status === 'positive' ? 'text-emerald-400' : 'text-amber-300'
                }`}>
                  {s.pct}%
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <strong>Critical Alert:</strong> 18% of stores are actively considering exiting the platform. If 112 stores leave, network density collapses.
          </div>
        </div>
      </section>
    </div>
  );
}
