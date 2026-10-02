'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Store, TabType } from '@/types';
import { SAMPLE_STORES, CITY_SUMMARY } from '@/data/storesData';
import { calculateStoreDistance } from '@/utils/calculations';
import { 
  MapPin, 
  Navigation, 
  ArrowRight,
  Info,
  Building2
} from 'lucide-react';

interface NovaLocalMapProps {
  onNavigateTab?: (tab: TabType) => void;
}

export function NovaLocalMap({ onNavigateTab }: NovaLocalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<'Mumbai' | 'Bengaluru' | 'Delhi NCR'>('Bengaluru');
  const [selectedStore, setSelectedStore] = useState<Store>(SAMPLE_STORES[4]); // Thom's Bakery
  const [healthFilter, setHealthFilter] = useState<'All' | 'Healthy' | 'At Risk'>('All');
  const [mapError, setMapError] = useState<string | null>(null);

  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const apiKeyAvailable = Boolean(googleApiKey);

  const cityStores = useMemo(
    () => SAMPLE_STORES.filter((s) => s.city === selectedCity),
    [selectedCity]
  );

  const filteredStores = useMemo(() => {
    return cityStores.filter((store) => {
      if (healthFilter === 'Healthy') return store.healthScore >= 75;
      if (healthFilter === 'At Risk') return store.healthScore < 75;
      return true;
    });
  }, [cityStores, healthFilter]);

  const cityCenter = useMemo(
    () => CITY_SUMMARY.find((c) => c.city === selectedCity) || CITY_SUMMARY[1],
    [selectedCity]
  );

  useEffect(() => {
    if (!googleApiKey) {
      return;
    }

    let isMounted = true;

    // Dynamically load Google Maps script
    const loadGoogleMaps = async () => {
      try {
        const { Loader } = await import('@googlemaps/js-api-loader');
        const loader = new Loader({
          apiKey: googleApiKey,
          version: 'weekly',
          libraries: ['places'],
        });

        await loader.load();
        if (!isMounted || !mapRef.current) return;

        const google = window.google;
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: cityCenter.lat, lng: cityCenter.lng },
          zoom: 13,
          mapId: 'DEMO_MAP_ID',
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#1e293b' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
            { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#334155' }] },
            { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
          ],
        });

        // Add markers for stores
        cityStores.forEach((store) => {
          const markerColor =
            store.phantomStockRisk === 'Critical'
              ? '#ef4444'
              : store.phantomStockRisk === 'Medium'
              ? '#f59e0b'
              : '#10b981';

          const marker = new google.maps.Marker({
            position: { lat: store.lat, lng: store.lng },
            map,
            title: store.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: markerColor,
              fillOpacity: 0.9,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="color: #0f172a; padding: 6px; font-family: sans-serif; font-size: 12px;">
                <strong>${store.name}</strong><br/>
                <span>${store.category} • ${store.locality}</span><br/>
                <span style="color: ${markerColor}; font-weight: bold;">Risk: ${store.phantomStockRisk}</span>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
            setSelectedStore(store);
          });
        });
      } catch (err: unknown) {
        if (isMounted) {
          setMapError(err instanceof Error ? err.message : 'Google Maps failed to initialize.');
        }
      }
    };

    loadGoogleMaps();

    return () => {
      isMounted = false;
    };
  }, [googleApiKey, cityCenter.lat, cityCenter.lng, cityStores]);

  // Compute nearby alternative sister stores using Haversine formula
  const nearbyAlternatives = cityStores
    .filter((s) => s.id !== selectedStore.id)
    .map((s) => ({
      ...s,
      distanceKm: calculateStoreDistance(selectedStore.lat, selectedStore.lng, s.lat, s.lng),
    }))
    .sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                <span>Phase 7: Google Maps Platform Integration</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">Store & Fulfillment Map</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              NOVA LOCAL MAP: Intelligent Proximity Routing & Sister-Store Fulfillment
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              When a store faces phantom stock or rush-hour surge, NOVA NEXUS searches nearby network stores within 1.5 km to prevent basket cancellations.
            </p>
          </div>

          {/* City selector pills & Health Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              {(['Bengaluru', 'Mumbai', 'Delhi NCR'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    const first = SAMPLE_STORES.find((s) => s.city === city);
                    if (first) setSelectedStore(first);
                  }}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition border ${
                    selectedCity === city
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'bg-transparent text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
              {(['All', 'Healthy', 'At Risk'] as const).map((h) => (
                <button
                  key={h}
                  onClick={() => setHealthFilter(h)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition border ${
                    healthFilter === h
                      ? 'bg-emerald-800 text-white border-emerald-600 shadow-sm'
                      : 'bg-transparent text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6-Step Hyperlocal Fulfillment Strategy Pipeline */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
            Hyperlocal Alternative Routing Logic:
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Real-Time Proximity Match</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">1. PRODUCT UNAVAILABLE</span>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">2. FIND NEARBY NOVA STORE</span>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">3. CHECK AVAILABILITY</span>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">4. CALCULATE DISTANCE</span>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">5. RECOMMEND ALTERNATIVE</span>
          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">6. REDUCE CANCELLATION RISK</span>
        </div>
      </div>

      {/* Main Grid: Map / Proximity Radar + Store Fulfillment Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Map or Fallback Proximity Radar */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {selectedCity} Merchant Network Coordinates ({filteredStores.length} stores)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Center: {cityCenter.lat.toFixed(4)}, {cityCenter.lng.toFixed(4)}
            </span>
          </div>

          {/* Real Google Map Container or Graceful Fallback Radar */}
          {apiKeyAvailable && !mapError ? (
            <div
              ref={mapRef}
              className="h-80 w-full rounded-xl overflow-hidden border border-slate-800 shadow-inner"
              aria-label={`Interactive Google Map showing partner stores in ${selectedCity}`}
            />
          ) : (
            <div className="space-y-4">
              {/* Graceful Fallback Notice */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-semibold">
                  <Info className="w-4 h-4 text-amber-400" />
                  <span>Google Maps unavailable — Demo Mode</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Interactive map ready. When <code className="text-emerald-400 font-mono">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> is supplied, live satellite and vector layers render dynamically. Currently operating in high-performance <strong>Proximity Matrix Radar</strong> mode with full store inventory, health, and distance calculations.
                </p>
              </div>

              {/* Geographic Store Nodes Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredStores.map((store) => {
                  const isSelected = store.id === selectedStore.id;
                  const isCritical = store.phantomStockRisk === 'Critical';

                  return (
                    <button
                      key={store.id}
                      onClick={() => setSelectedStore(store)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-indigo-950/70 border-indigo-500 text-white ring-1 ring-indigo-400'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold truncate">{store.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold border ${
                            isCritical
                              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          }`}
                        >
                          {store.phantomStockRisk}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{store.locality}</div>
                      <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span>GPS: {store.lat}, {store.lng}</span>
                        <span className="text-indigo-400">{store.syncStalenessHours}h stale</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Proximity Dispatch Insight */}
          <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>
              <strong>Local Moat Advantage:</strong> 620 distributed stores allow sub-1.5 km sister routing, keeping delivery SLAs under 30 minutes without dark stores.
            </span>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('workflow')}
                className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 shrink-0 ml-2"
              >
                Test Order Routing <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Active Store Deep-Dive & Sister-Store Alternatives */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
          {/* Selected Store Profile */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                Active Focal Store
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {selectedStore.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mt-1">
              {selectedStore.name}
            </h3>
            <p className="text-xs text-slate-400">
              {selectedStore.locality}, {selectedStore.city}
            </p>

            <div className="grid grid-cols-3 gap-2 mt-3 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px]">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Health</span>
                <span className={`font-mono font-bold ${selectedStore.healthScore > 75 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {selectedStore.healthScore}/100
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Staleness</span>
                <span className="font-mono font-bold text-white">
                  {selectedStore.syncStalenessHours}h ago
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Rejection</span>
                <span className="font-mono font-bold text-amber-300">
                  {selectedStore.orderRejectionRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Sister Store Alternative Recommendations */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nearby Sister-Store Alternatives (Haversine Distance)</span>
              </h4>
              <span className="text-[10px] font-mono text-emerald-400">Within Radius</span>
            </div>

            <div className="space-y-2">
              {nearbyAlternatives.slice(0, 3).map((alt) => (
                <div
                  key={alt.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block">{alt.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {alt.locality} • {alt.category}
                    </span>
                  </div>

                  <div className="text-right space-y-0.5 shrink-0 ml-3">
                    <span className="font-mono font-bold text-emerald-400 block text-xs">
                      {alt.distanceKm} km away
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      ETA: ~{Math.round(alt.avgFulfillmentMin + alt.distanceKm * 4)} min
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Intervention Action */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-700/50 text-xs space-y-1.5">
            <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] block">
              Automated Dynamic Sister Dispatch Rule:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              If {selectedStore.name} experiences a stockout, items are automatically routed to the closest partner ({nearbyAlternatives[0]?.name}, {nearbyAlternatives[0]?.distanceKm} km away). Customer receives 1-tap WhatsApp confirmation, preventing order cancellation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
