'use client';

import React, { useState } from 'react';
import { TabType } from '@/types';
import { 
  FileText, 
  Search, 
  ArrowRight
} from 'lucide-react';

interface EvidenceItem {
  id: string;
  category: 'Customer Signals' | 'Customer Behavior' | 'Operations & Inventory' | 'Partner Stores' | 'Marketing & Support' | 'Competitive Moat';
  tag: 'FACT' | 'INFERENCE' | 'HYPOTHESIS' | 'CRITICAL_LEAK';
  metric: string;
  sourceSection: string;
  statement: string;
  implication: string;
}

const EVIDENCE_VAULT: EvidenceItem[] = [
  {
    id: 'ev-01',
    category: 'Customer Signals',
    tag: 'CRITICAL_LEAK',
    metric: '61%',
    sourceSection: 'Case § Customer Signals',
    statement: '61% of customers who stopped ordering had previously rated NOVA CART 4 stars or higher.',
    implication: 'Proof that churn is driven by fulfillment failure and broken trust, not low product appeal.',
  },
  {
    id: 'ev-02',
    category: 'Customer Signals',
    tag: 'FACT',
    metric: '29%',
    sourceSection: 'Case § Customer Signals',
    statement: '29% of customer complaints cite products shown as available becoming unavailable after ordering.',
    implication: 'Direct manifestation of phantom inventory caused by manual merchant stock tracking.',
  },
  {
    id: 'ev-03',
    category: 'Customer Signals',
    tag: 'FACT',
    metric: '34%',
    sourceSection: 'Case § Customer Signals',
    statement: '34% report delivery takes too long (average delivery time rose from 29 to 37 minutes).',
    implication: 'Extended wait times trigger customer cancellation impatience (27% of cancellations).',
  },
  {
    id: 'ev-04',
    category: 'Customer Signals',
    tag: 'FACT',
    metric: '38%',
    sourceSection: 'Case § Customer Signals',
    statement: '38% report prices/fees feel higher than expected.',
    implication: 'Customers resent paying convenience and delivery surcharges on unfulfilled orders.',
  },
  {
    id: 'ev-05',
    category: 'Customer Behavior',
    tag: 'FACT',
    metric: '72%',
    sourceSection: 'Case § Customer Behavior',
    statement: 'Customers completing 3 orders have a 72% probability of ordering again the following month.',
    implication: 'The critical habit threshold! Once a customer reaches Order 3, retention stabilizes.',
  },
  {
    id: 'ev-06',
    category: 'Customer Behavior',
    tag: 'CRITICAL_LEAK',
    metric: '31%',
    sourceSection: 'Case § Customer Behavior',
    statement: '54% of new users complete first order, but only 31% place a second order within 30 days.',
    implication: 'A 69% customer drop-off between Order 1 and Order 2 indicates immediate post-purchase disillusionment.',
  },
  {
    id: 'ev-07',
    category: 'Customer Behavior',
    tag: 'FACT',
    metric: '44%',
    sourceSection: 'Case § Customer Behavior',
    statement: '44% of promotional coupons are never redeemed.',
    implication: 'Promotional budget is misdirected; blanket voucher discounting suffers from severe fatigue.',
  },
  {
    id: 'ev-08',
    category: 'Customer Behavior',
    tag: 'FACT',
    metric: 'Multi-Cat',
    sourceSection: 'Case § Customer Behavior',
    statement: 'Customers purchasing across multiple store categories show higher repeat usage.',
    implication: 'Cross-category local bundles (e.g. Bakery + Pharmacy + Grocery) unlock high customer LTV.',
  },
  {
    id: 'ev-09',
    category: 'Operations & Inventory',
    tag: 'CRITICAL_LEAK',
    metric: '35%',
    sourceSection: 'Case § Operations',
    statement: '35% of all cancellations are due to "Product unavailable after order" (1,482 orders/month).',
    implication: 'The #1 driver of cancellations. Direct result of stale catalog drift.',
  },
  {
    id: 'ev-10',
    category: 'Operations & Inventory',
    tag: 'FACT',
    metric: '18%',
    sourceSection: 'Case § Operations',
    statement: '18% of cancellations are stores rejecting orders during busy physical walk-in hours.',
    implication: 'Stores lack a 1-tap "Rush Pause" buffer to handle in-store counter spikes.',
  },
  {
    id: 'ev-11',
    category: 'Partner Stores',
    tag: 'CRITICAL_LEAK',
    metric: '18%',
    sourceSection: 'Case § Partner Store Signals',
    statement: '18% of partner stores (112 stores) are actively considering leaving within the next year.',
    implication: 'Network collapse threat. If 112 stores exit, local density breaks down.',
  },
  {
    id: 'ev-12',
    category: 'Partner Stores',
    tag: 'FACT',
    metric: '39%',
    sourceSection: 'Case § Partner Store Signals',
    statement: '39% of partner stores say maintaining online inventory requires too much manual effort.',
    implication: 'Stores need effortless sub-10 second digital sync (WhatsApp bot / voice note).',
  },
  {
    id: 'ev-13',
    category: 'Marketing & Support',
    tag: 'CRITICAL_LEAK',
    metric: '5,900',
    sourceSection: 'Case § Customer Support',
    statement: 'Support tickets surged from 3,100 to 5,900/month; average resolution takes 9.2 hours across siloed tools.',
    implication: '48% of tickets are refunds (29%) and missing items (19%). Disconnected systems paralyze agents.',
  },
  {
    id: 'ev-14',
    category: 'Marketing & Support',
    tag: 'FACT',
    metric: '₹17.0L',
    sourceSection: 'Case § Marketing',
    statement: 'Monthly promo spend jumped from ₹9.5L to ₹17L/mo (+79%), with 58% spent acquiring low-retention users.',
    implication: 'Net contribution after promo spend shrank by 26% from ₹12.3L down to ₹9.1L.',
  },
  {
    id: 'ev-15',
    category: 'Competitive Moat',
    tag: 'FACT',
    metric: '620 Stores',
    sourceSection: 'Case § Competitive Environment',
    statement: 'NOVA CART connects 620 local stores with unique products unavailable on commodity dark-store apps.',
    implication: 'The core commercial moat! Compete on curated neighborhood breadth rather than commodity speed.',
  },
  {
    id: 'ev-16',
    category: 'Competitive Moat',
    tag: 'FACT',
    metric: '₹25 Lakh',
    sourceSection: 'Case § Financial Constraint',
    statement: 'Maximum additional implementation budget for the next six months: ₹25 LAKH. No dark stores or warehouses.',
    implication: 'Strict constraint: Prohibits heavy physical fleets; mandates high-leverage software & PWA orchestration.',
  },
];

interface EvidenceRepositoryTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export function EvidenceRepositoryTab({ onNavigateTab }: EvidenceRepositoryTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const filteredEvidence = EVIDENCE_VAULT.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedTag !== 'All' && item.tag !== selectedTag) return false;
    if (
      searchQuery.trim() &&
      !item.statement.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.implication.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.sourceSection.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Phase 8: Evidence Vault & Grounding Repository</span>
              </span>
              <span className="text-xs font-mono text-slate-400">16 Audited Facts & Signals</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Traceable Business Case Telemetry & Empirical Signals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Every strategic recommendation, hypothesis score, and simulated parameter is 100% grounded in these verified case data points.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('diagnosis')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 shrink-0 transition"
          >
            <span>Inspect in Causal Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search evidence by keyword, metric, or source..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Categories (6)</option>
            <option value="Customer Signals">Customer Signals</option>
            <option value="Customer Behavior">Customer Behavior</option>
            <option value="Operations & Inventory">Operations & Inventory</option>
            <option value="Partner Stores">Partner Stores</option>
            <option value="Marketing & Support">Marketing & Support</option>
            <option value="Competitive Moat">Competitive Moat</option>
          </select>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Evidence Tags</option>
            <option value="CRITICAL_LEAK">CRITICAL LEAK</option>
            <option value="FACT">FACT</option>
            <option value="INFERENCE">INFERENCE</option>
          </select>

          {(selectedCategory !== 'All' || selectedTag !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedTag('All');
                setSearchQuery('');
              }}
              className="text-slate-400 hover:text-white text-xs underline ml-1"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEvidence.map((item) => {
          const isCritical = item.tag === 'CRITICAL_LEAK';
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                isCritical
                  ? 'bg-rose-950/15 border-rose-800/40 hover:border-rose-700'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-indigo-400 uppercase tracking-wide">
                    {item.category}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded uppercase font-bold border ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    }`}
                  >
                    {item.tag.replace('_', ' ')}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-white font-mono">
                    {item.metric}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 font-semibold">
                    {item.sourceSection}
                  </span>
                </div>

                <p className="mt-2 text-xs font-semibold text-slate-200 leading-snug">
                  &ldquo;{item.statement}&rdquo;
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-indigo-300 block mb-0.5">Strategic Implication:</strong>
                {item.implication}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
