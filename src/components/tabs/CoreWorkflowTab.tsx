'use client';

import React, { useState } from 'react';
import { INITIAL_ORDERS } from '@/data/ordersWorkflowData';
import { AtRiskOrder, TabType } from '@/types';
import { 
  Workflow, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  Zap,
  RotateCcw
} from 'lucide-react';

interface CoreWorkflowTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export function CoreWorkflowTab({ onNavigateTab }: CoreWorkflowTabProps) {
  const [orders, setOrders] = useState<AtRiskOrder[]>(INITIAL_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-8942-BLR');
  const [selectedIntervention, setSelectedIntervention] = useState<'SISTER_STORE' | 'CUSTOMER_UPGRADE' | 'INSTANT_CREDIT'>('SISTER_STORE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    success: boolean;
    message: string;
    protectedGMV: number;
    avoidedTicket: boolean;
    habitPreserved: boolean;
  } | null>(null);

  const activeOrder = orders.find((o) => o.orderId === selectedOrderId) || orders[0];

  const handleExecuteIntervention = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === selectedOrderId ? { ...o, status: 'RESOLVED_REPLACED' } : o
        )
      );
      setExecutionResult({
        success: true,
        message:
          selectedIntervention === 'SISTER_STORE'
            ? `Sister-Store Fulfillment Activated: The Daily Loaf (0.8km away) accepted the sourdough item. Rider dispatched for multi-point pickup. Customer notified.`
            : selectedIntervention === 'CUSTOMER_UPGRADE'
            ? `Customer Instant Upgrade: Customer accepted premium rustic sourdough replacement via 1-tap WhatsApp prompt. Zero churn.`
            : `Proactive Instant Refund & Habit Voucher: ₹240 credited to customer wallet within 4 seconds; ₹100 cross-category bakery pass sent.`,
        protectedGMV: activeOrder.orderValue,
        avoidedTicket: true,
        habitPreserved: true,
      });
    }, 1200);
  };

  const handleReset = () => {
    setOrders(INITIAL_ORDERS);
    setExecutionResult(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                <span>Phase 4 & 6: Interactive Core Workflow</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">Live Simulation Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              End-to-End Orchestration: From Problem Input to Rescued Customer
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Experience the 5-step operational pipeline that prevents cancellations, shields revenue, and preserves customer retention.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset State</span>
            </button>
          </div>
        </div>

        {/* 5-Step Pipeline Breadcrumb */}
        <div className="mt-5 grid grid-cols-5 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-lg bg-indigo-950/60 border border-indigo-500/40 text-white font-semibold">
            <span className="text-[10px] text-indigo-400 block font-mono">STEP 1</span>
            INPUT
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 font-semibold">
            <span className="text-[10px] text-slate-400 block font-mono">STEP 2</span>
            PROCESSING
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 font-semibold">
            <span className="text-[10px] text-slate-400 block font-mono">STEP 3</span>
            DECISION
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 font-semibold">
            <span className="text-[10px] text-slate-400 block font-mono">STEP 4</span>
            ACTION
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-300 font-semibold">
            <span className="text-[10px] text-slate-400 block font-mono">STEP 5</span>
            OUTPUT
          </div>
        </div>
      </div>

      {/* Select Scenario Orders */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Select At-Risk Order Scenario from Case Telemetry:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {orders.map((o) => {
            const isSelected = o.orderId === selectedOrderId;
            const isResolved = o.status === 'RESOLVED_REPLACED';

            return (
              <button
                key={o.orderId}
                onClick={() => {
                  setSelectedOrderId(o.orderId);
                  setExecutionResult(null);
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 text-white shadow-md ring-1 ring-indigo-400'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-indigo-300">{o.orderId}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-bold border ${
                      isResolved
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {isResolved ? 'Resolved' : o.riskType.replace('_', ' ')}
                  </span>
                </div>
                <div className="mt-1 text-xs font-semibold text-white truncate">{o.customerName}</div>
                <div className="text-[10px] text-slate-400">{o.storeName}</div>
                <div className="mt-2 flex items-center justify-between text-[10px] font-mono">
                  <span>₹{o.orderValue}</span>
                  <span className="text-amber-400 font-bold">Order #{o.customerOrderCount}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Journey Execution Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Steps 1 & 2 (Input & Processing) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Step 1: Input Analysis */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                Step 1: Input Signal Ingestion
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {activeOrder.placedMinutesAgo} min ago
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400">Customer Profile:</span>
                <span className="text-white font-medium">
                  {activeOrder.customerName} (Order #{activeOrder.customerOrderCount})
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400">Fulfilling Merchant:</span>
                <span className="text-white font-medium">{activeOrder.storeName}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-950/60 border border-slate-800">
                <span className="text-slate-400">Habit Formation Risk:</span>
                <span className="text-rose-400 font-bold font-mono">
                  {activeOrder.customerOrderCount === 2 ? 'High Churn Danger (Order 2)' : activeOrder.customerOrderCount === 3 ? 'Habit Threshold Lock-in' : 'New User Impression'}
                </span>
              </div>
            </div>

            {/* Cart Items with Phantom Risk */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Item-Level Basket Stock Confidence:
              </span>
              <div className="space-y-1.5">
                {activeOrder.items.map((item) => {
                  const isGhost = item.actualStockConfidence < 50;
                  return (
                    <div
                      key={item.id}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                        isGhost
                          ? 'bg-rose-950/20 border-rose-800/60 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-[10px] text-slate-400">
                          ₹{item.price} • {item.category}
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-mono text-xs font-bold block ${
                            isGhost ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
                          }`}
                        >
                          {item.actualStockConfidence}% Confidence
                        </span>
                        {isGhost && (
                          <span className="text-[9px] text-rose-300 uppercase font-mono">
                            PHANTOM STOCK
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 2: Processing Engine */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Step 2: Processing & Proximity Engine
              </span>
              <Cpu className="w-4 h-4 text-amber-400" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              NOVA NEXUS evaluates real-time stock velocity, catalog staleness (36h), in-store walk-in density, and queries the local merchant graph for nearby sister stores.
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Predicted Root-Cause:</span>
                <span className="text-white font-medium font-mono">{activeOrder.riskType}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Nearby Sister-Store Match:</span>
                <span className="text-emerald-400 font-medium">The Daily Loaf (0.8 km)</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Stock Confidence at Sister:</span>
                <span className="text-emerald-400 font-bold font-mono">96% Confirmed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Steps 3, 4, & 5 (Decision, Action, Output) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Step 3: Decision & Recommendation Options */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                Step 3: Algorithmic Recommendation Selection
              </span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeOrder.recommendedAction}
            </p>

            {/* Selectable Interventions */}
            <div className="space-y-2">
              <button
                onClick={() => setSelectedIntervention('SISTER_STORE')}
                className={`w-full p-3 rounded-xl border text-left transition ${
                  selectedIntervention === 'SISTER_STORE'
                    ? 'bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-400 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span>Option A: Dynamic Sister-Store Fulfillment Route</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase font-mono">
                      Recommended
                    </span>
                  </span>
                  <CheckCircle2 className={`w-4 h-4 ${selectedIntervention === 'SISTER_STORE' ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Auto-route sourdough from The Daily Loaf (0.8km). Rider combines order with zero cancellation. Protects full basket value of ₹{activeOrder.orderValue}.
                </p>
              </button>

              <button
                onClick={() => setSelectedIntervention('CUSTOMER_UPGRADE')}
                className={`w-full p-3 rounded-xl border text-left transition ${
                  selectedIntervention === 'CUSTOMER_UPGRADE'
                    ? 'bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-400 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Option B: 1-Tap Customer Instant Equivalent Upgrade
                  </span>
                  <CheckCircle2 className={`w-4 h-4 ${selectedIntervention === 'CUSTOMER_UPGRADE' ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Send 1-tap push notification offering Rustic Sourdough at same price (+₹10 platform subsidy). Customer approves in seconds without support call.
                </p>
              </button>

              <button
                onClick={() => setSelectedIntervention('INSTANT_CREDIT')}
                className={`w-full p-3 rounded-xl border text-left transition ${
                  selectedIntervention === 'INSTANT_CREDIT'
                    ? 'bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-400 shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    Option C: Instant Automated Wallet Credit + Habit Voucher
                  </span>
                  <CheckCircle2 className={`w-4 h-4 ${selectedIntervention === 'INSTANT_CREDIT' ? 'text-indigo-400' : 'text-slate-600'}`} />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Instant ₹240 refund into wallet (bypassing 9.2h support queue) + ₹100 next-order multi-category pass to safeguard 3rd order retention.
                </p>
              </button>
            </div>
          </div>

          {/* Step 4: Action Execution Button */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Step 4: Execute Intervention
              </span>
              <h4 className="text-sm font-bold text-white">
                Apply NOVA NEXUS Orchestration Rule
              </h4>
            </div>

            <button
              onClick={handleExecuteIntervention}
              disabled={isProcessing || activeOrder.status === 'RESOLVED_REPLACED'}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition transform active:scale-95"
            >
              {isProcessing ? (
                <>
                  <RotateCcw className="w-4 h-4 animate-spin" />
                  <span>Processing Routing...</span>
                </>
              ) : activeOrder.status === 'RESOLVED_REPLACED' ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Intervention Deployed</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-emerald-200" />
                  <span>Execute Digital Intervention</span>
                </>
              )}
            </button>
          </div>

          {/* Step 5: Output Verification & Business Impact */}
          {executionResult && (
            <div className="bg-emerald-950/20 border border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step 5: Output Verified & Business Consequence</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Order Rescued
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                {executionResult.message}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block uppercase">GMV Protected</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono">
                    ₹{executionResult.protectedGMV}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block uppercase">Support Ticket</span>
                  <span className="text-sm font-bold text-white font-mono">
                    Avoided (Saved 9.2h)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[9px] text-slate-400 block uppercase">Habit Loop Impact</span>
                  <span className="text-sm font-bold text-indigo-300 font-mono">
                    72% Repeat Preserved
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Simulate macro platform benefits across all 38,500 monthly orders:
                </span>
                <button
                  onClick={() => onNavigateTab('simulator')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
                >
                  Go to Simulator <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
