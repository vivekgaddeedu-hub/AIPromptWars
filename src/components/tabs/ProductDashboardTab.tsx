'use client';

import React, { useState } from 'react';
import { SAMPLE_STORES, CITY_SUMMARY } from '@/data/storesData';
import { TabType, Store } from '@/types';
import { 
  LayoutDashboard, 
  Search, 
  RefreshCw, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Building2
} from 'lucide-react';

interface ProductDashboardTabProps {
  onNavigateTab: (tab: TabType) => void;
}

export function ProductDashboardTab({ onNavigateTab }: ProductDashboardTabProps) {
  const [stores, setStores] = useState<Store[]>(SAMPLE_STORES);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [syncedAlert, setSyncedAlert] = useState<string | null>(null);

  // Filtered stores
  const filteredStores = stores.filter((store) => {
    if (selectedCity !== 'All' && store.city !== selectedCity) return false;
    if (selectedCategory !== 'All' && store.category !== selectedCategory) return false;
    if (selectedRisk !== 'All' && store.phantomStockRisk !== selectedRisk) return false;
    if (
      searchQuery.trim() &&
      !store.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !store.locality.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Action: Trigger 1-Tap Smart Sync
  const handleTriggerSync = (storeId: string) => {
    setStores((prev) =>
      prev.map((s) => {
        if (s.id === storeId) {
          return {
            ...s,
            inventorySyncMode: 'NOVA Smart-Sync',
            syncStalenessHours: 0.1,
            healthScore: Math.min(98, s.healthScore + 35),
            phantomStockRisk: 'Low',
            orderRejectionRate: Math.max(2.0, s.orderRejectionRate - 18.0),
          };
        }
        return s;
      })
    );
    const store = stores.find((s) => s.id === storeId);
    setSyncedAlert(`Smart-Sync triggered for ${store?.name}! WhatsApp catalog poll sent; 0 ghost SKUs.`);
    setTimeout(() => setSyncedAlert(null), 4000);
  };

  // Action: Toggle Rush Mode Auto-Throttling
  const handleToggleRushMode = (storeId: string) => {
    setStores((prev) =>
      prev.map((s) => {
        if (s.id === storeId) {
          const isRush = s.orderRejectionRate < 5;
          return {
            ...s,
            orderRejectionRate: isRush ? 22.0 : 3.5,
            healthScore: isRush ? s.healthScore - 15 : Math.min(96, s.healthScore + 20),
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Alert banner for live sync feedback */}
      {syncedAlert && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{syncedAlert}</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">Live Webhook Synced</span>
        </div>
      )}

      {/* Header & Live Network Status */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>Product Dashboard: Live Network Command Center</span>
              </span>
              <span className="text-xs font-mono text-slate-400">620 Stores Active</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              NOVA NEXUS: Predictive Merchant & Catalog Orchestration
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live telemetry tracking inventory staleness, phantom stock probability, and rush-hour rejection buffers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('workflow')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 transition"
            >
              <span>Test Interactive Workflow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Macro Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-5">
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Catalog Accuracy Index</span>
              <span className="text-amber-400 font-mono text-[10px]">Stale Buffer</span>
            </div>
            <div className="mt-1 text-2xl font-extrabold text-white font-mono">
              64.2%
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              37% of stores have &gt;24h sync staleness
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Phantom Risk Stores</span>
              <span className="text-rose-400 font-mono text-[10px]">Critical</span>
            </div>
            <div className="mt-1 text-2xl font-extrabold text-rose-400 font-mono">
              230 Stores
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              35% cancellations stem from these merchants
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Rush Rejection Risk</span>
              <span className="text-amber-400 font-mono text-[10px]">Peak Surge</span>
            </div>
            <div className="mt-1 text-2xl font-extrabold text-amber-300 font-mono">
              23.0%
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              18% cancellations caused by rush rejects
            </div>
          </div>

          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Merchant Churn Threat</span>
              <span className="text-rose-400 font-mono text-[10px]">12-Month Exit</span>
            </div>
            <div className="mt-1 text-2xl font-extrabold text-white font-mono">
              18.0% (112)
            </div>
            <div className="mt-1 text-[11px] text-slate-400">
              Frustrated by manual inventory effort
            </div>
          </div>
        </div>
      </div>

      {/* City Breakdown Visual Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {CITY_SUMMARY.map((city) => (
          <div key={city.city} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>{city.city}</span>
              </div>
              <span className="text-[11px] text-slate-400 block font-mono">
                {city.totalStores} Partner Stores
              </span>
            </div>
            <div className="text-right space-y-0.5">
              <span className="text-xs font-mono font-bold text-amber-300 block">
                Avg Staleness: {city.avgStalenessHrs}h
              </span>
              <span className="text-[10px] text-rose-400 font-mono block">
                {city.criticalStoresPct}% Critical Phantom Risk
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 620 stores by name or locality..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* City filter */}
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Cities (3)</option>
            <option value="Mumbai">Mumbai (240)</option>
            <option value="Bengaluru">Bengaluru (210)</option>
            <option value="Delhi NCR">Delhi NCR (170)</option>
          </select>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Categories (4)</option>
            <option value="Gourmet Grocery">Gourmet Grocery</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Bakery & Patisserie">Bakery & Patisserie</option>
            <option value="Stationery & Lifestyle">Stationery & Lifestyle</option>
          </select>

          {/* Risk filter */}
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Risk Levels</option>
            <option value="Critical">Critical Phantom Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="Low">Low / Healthy</option>
          </select>

          {(selectedCity !== 'All' || selectedCategory !== 'All' || selectedRisk !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCity('All');
                setSelectedCategory('All');
                setSelectedRisk('All');
                setSearchQuery('');
              }}
              className="text-slate-400 hover:text-white text-xs underline ml-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Stores Grid with Interactive Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStores.map((store) => {
          const isCritical = store.phantomStockRisk === 'Critical';
          const isSynced = store.inventorySyncMode === 'NOVA Smart-Sync';

          return (
            <div
              key={store.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                isCritical
                  ? 'bg-rose-950/10 border-rose-800/40 hover:border-rose-700'
                  : isSynced
                  ? 'bg-emerald-950/10 border-emerald-800/40 hover:border-emerald-700'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card top */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wide">
                      {store.category} • {store.city}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-0.5 leading-snug">
                      {store.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {store.locality}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase shrink-0 font-bold ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : isSynced
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    {store.phantomStockRisk} Risk
                  </span>
                </div>

                {/* Key metrics grid */}
                <div className="grid grid-cols-3 gap-2 mt-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Health</span>
                    <span className={`font-mono font-bold ${store.healthScore > 80 ? 'text-emerald-400' : store.healthScore > 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                      {store.healthScore}/100
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Staleness</span>
                    <span className={`font-mono font-bold ${store.syncStalenessHours > 24 ? 'text-rose-400' : 'text-slate-300'}`}>
                      {store.syncStalenessHours}h ago
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">Rejections</span>
                    <span className={`font-mono font-bold ${store.orderRejectionRate > 15 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {store.orderRejectionRate}%
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-400">
                  <span className="text-slate-400 font-semibold">Sync Mode:</span> {store.inventorySyncMode}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleTriggerSync(store.id)}
                  className={`flex-1 py-1.5 px-2.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition ${
                    isSynced
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800 hover:bg-emerald-900/50'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                  }`}
                  title="Trigger automated WhatsApp inventory poll & sync"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{isSynced ? 'Resync Stock' : '1-Tap Smart Sync'}</span>
                </button>

                <button
                  onClick={() => handleToggleRushMode(store.id)}
                  className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold border border-slate-700 flex items-center gap-1"
                  title="Toggle peak rush auto-throttling to prevent rejections"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Rush Mode</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
