'use client';

import React from 'react';
import { TabType } from '@/types';
import { 
  BarChart3, 
  Network, 
  Lightbulb, 
  LayoutDashboard, 
  MapPin,
  Workflow, 
  CheckCircle2, 
  Sliders, 
  TrendingUp, 
  FileText, 
  CalendarRange,
  Sparkles,
  PlayCircle
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onStartDemo: () => void;
  onOpenAI: () => void;
}

const TABS: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'briefing', label: '1. Executive Brief', icon: BarChart3 },
  { id: 'diagnosis', label: '2. Causal Diagnosis', icon: Network },
  { id: 'opportunity', label: '3. Opportunity Matrix', icon: Lightbulb },
  { id: 'dashboard', label: '4. NOVA NEXUS', icon: LayoutDashboard },
  { id: 'map', label: '5. Local Map', icon: MapPin },
  { id: 'workflow', label: '6. Core Workflow', icon: Workflow },
  { id: 'recommendations', label: '7. Interventions', icon: CheckCircle2 },
  { id: 'simulator', label: '8. Simulator', icon: Sliders },
  { id: 'impact', label: '9. Business Impact', icon: TrendingUp },
  { id: 'evidence', label: '10. Evidence Vault', icon: FileText },
  { id: 'roadmap', label: '11. ₹25L Roadmap', icon: CalendarRange },
];

export function Header({ activeTab, setActiveTab, onStartDemo, onOpenAI }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div 
              className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20"
              aria-hidden="true"
            >
              <span className="text-white font-black text-lg tracking-wider">N</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-tight text-lg">NOVA CART</span>
                <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Business Innovation Lab
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Evidence-Based Strategic Product Decision Engine
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="btn-ask-ai-analyst"
              onClick={onOpenAI}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition shadow-sm focus-visible:ring-2 focus-visible:ring-indigo-400"
              title="Ask AI Business Analyst (Deterministic Case Grounding)"
              aria-label="Open AI Business Analyst"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" aria-hidden="true" />
              <span className="hidden sm:inline">AI Analyst</span>
              <span className="sm:hidden">AI</span>
            </button>

            <button
              id="btn-start-demo-mode"
              onClick={onStartDemo}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-900/30 transition transform active:scale-95 focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Start guided 5-minute judge demo"
            >
              <PlayCircle className="w-4 h-4 text-emerald-100" aria-hidden="true" />
              <span>Start 5-Min Judge Demo</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <nav 
          className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-900"
          aria-label="Application sections"
        >
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-nav-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  isActive
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
