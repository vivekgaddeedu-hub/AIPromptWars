'use client';

import React, { useState } from 'react';
import { TabType } from '@/types';
import { 
  CheckCircle2, 
  Store, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Smartphone,
  Gift
} from 'lucide-react';

interface RecommendationsTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export function RecommendationsTab({ onNavigateTab }: RecommendationsTabProps) {
  const [selectedBundleCategory, setSelectedBundleCategory] = useState<'MORNING' | 'WELLNESS' | 'CREATIVE'>('MORNING');

  const bundleData = {
    MORNING: {
      title: 'Morning Neighborhood Artisan Pass',
      stores: ['Thom’s Bakery (Artisan Sourdough)', 'Namdhari’s Fresh (Organic Farm Milk & Butter)'],
      discountType: 'Complimentary ₹60 Delivery Credit on 2nd & 3rd Order',
      merchantMarginProtected: '100% (Subsidized from reallocated CAC budget, zero store squeeze)',
      repeatLiftExpected: '+38% 30-day reorder conversion',
      aovImpact: 'AOV increases from ₹486 to ₹610 via multi-basket ordering',
    },
    WELLNESS: {
      title: 'Family Wellness & Daily Care Bundle',
      stores: ['Trust Chemists (Vitamins & First Aid)', 'Nature’s Basket (Imported Greek Yogurt & Cold-Pressed Juices)'],
      discountType: 'Tiered 10% Habit Rebate unlocked upon 3rd Order completion',
      merchantMarginProtected: '100% Protected (No store commission cuts)',
      repeatLiftExpected: '+44% cross-category retention',
      aovImpact: 'AOV increases to ₹680',
    },
    CREATIVE: {
      title: 'Work-from-Home & Stationery Artisan Kit',
      stores: ['Gangarams Book Bureau (Fineliner Pens & Journals)', 'Theobroma Patisserie (Specialty Cold Brew & Brownies)'],
      discountType: 'Afternoon Delight Voucher (Valid 2 PM - 5 PM slow hours)',
      merchantMarginProtected: '100% Protected; fills slow retail hours for merchants',
      repeatLiftExpected: '+29% repeat orders in non-peak hours',
      aovImpact: 'AOV increases to ₹540',
    },
  };

  const currentBundle = bundleData[selectedBundleCategory];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Phase 5: Strategic Actionable Interventions</span>
              </span>
              <span className="text-xs font-mono text-slate-400">3 High-Impact Pillars</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              The 3 Integrated Strategic Pillars of NOVA NEXUS
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-4xl">
              Engineered to resolve the root causes: eliminating the merchant inventory burden, ending rush-hour rejections, and activating the proven 3-order multi-category habit threshold.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('simulator')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 shrink-0 transition"
          >
            <span>Simulate Economic Impact</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3 Pillar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pillar 1: Store Inventory Sentinel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Smartphone className="w-5 h-5 text-indigo-400" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                Pillar 1 • Merchant
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                1-Tap WhatsApp Inventory Sentinel
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Replaces tedious manual app updates with automated sub-10 second WhatsApp micro-interactions.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <strong className="text-indigo-300 block mb-0.5">Automated Stock Depletion:</strong>
                Algorithms predict velocity and prompt merchant: <em>&ldquo;Thom’s: Sourdough stock projected at 2 loaves. Still available? Reply 1 for Yes, 2 for Out.&rdquo;</em>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <strong className="text-indigo-300 block mb-0.5">Voice Note Sync:</strong>
                Shopkeeper speaks into WhatsApp: <em>&ldquo;Avocados sold out&rdquo;</em>. AI NLP parses and sets SKU to unlisted in 2 seconds.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Direct Case Target:</span>
            <span className="text-emerald-400 font-mono font-bold">Eliminates 35% Cancellations</span>
          </div>
        </div>

        {/* Pillar 2: Peak Rush-Hour Orchestration */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                Pillar 2 • Operations
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Rush-Mode Auto-Throttling & Sister Routing
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Protects the 23% of stores overwhelmed during physical walk-in rush hours without penalizing search visibility.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">1-Tap Rush Pause:</strong>
                Store hits &ldquo;Rush Mode&rdquo; on physical tablet or WhatsApp. Platform automatically adds a +10m prep window or shifts non-exclusive items to sister stores.
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <strong className="text-amber-300 block mb-0.5">Proximity Sister Split:</strong>
                Fulfills multi-store items from adjacent merchants within 1.2km radius, preventing order rejection.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Direct Case Target:</span>
            <span className="text-emerald-400 font-mono font-bold">Eliminates 18% Store Rejections</span>
          </div>
        </div>

        {/* Pillar 3: Multi-Category 3-Order Habit Loops */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Gift className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase">
                Pillar 3 • Growth
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Neighborhood 3-Order Habit Loops
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Shifts ₹6L/mo from wasteful blanket acquisition coupons into cross-category neighborhood passes.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <strong className="text-emerald-300 block mb-0.5">Crossing the 3-Order Threshold:</strong>
                Customers completing 3 orders achieve a <strong>72% repeat probability</strong>. The system guides users across 2nd & 3rd orders with zero store margin erosion.
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <strong className="text-emerald-300 block mb-0.5">Multi-Category Moat:</strong>
                Combines local bakeries + organic groceries + pharmacy to beat commodity 10-minute dark stores.
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Direct Case Target:</span>
            <span className="text-emerald-400 font-mono font-bold">Unlocks 72% Habit Retention</span>
          </div>
        </div>
      </div>

      {/* Interactive Neighborhood Bundle Designer */}
      <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Interactive Cross-Category Neighborhood Bundle Preview</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Leveraging NOVA CART&apos;s local merchant moat to cross-pollinate customer categories
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedBundleCategory('MORNING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                selectedBundleCategory === 'MORNING'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              Morning Artisan
            </button>
            <button
              onClick={() => setSelectedBundleCategory('WELLNESS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                selectedBundleCategory === 'WELLNESS'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              Family Wellness
            </button>
            <button
              onClick={() => setSelectedBundleCategory('CREATIVE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                selectedBundleCategory === 'CREATIVE'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              WFH & Lifestyle
            </button>
          </div>
        </div>

        {/* Selected Bundle Detail */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wide">
                Targeting Order #2 and Order #3 Customers
              </span>
              <h4 className="text-lg font-bold text-white mt-0.5">
                {currentBundle.title}
              </h4>
            </div>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-800 px-2.5 py-1 rounded-lg">
              {currentBundle.repeatLiftExpected}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                Included Local Merchant Partners:
              </span>
              {currentBundle.stores.map((st, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 flex items-center gap-2">
                  <Store className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{st}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">
                Strategic Economics & Merchant Protection:
              </span>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-300">
                  <strong>Incentive Structure:</strong> {currentBundle.discountType}
                </div>
                <div className="text-emerald-400 font-medium">
                  <strong>Merchant Margin:</strong> {currentBundle.merchantMarginProtected}
                </div>
                <div className="text-indigo-300 font-medium">
                  <strong>Basket Expansion:</strong> {currentBundle.aovImpact}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
