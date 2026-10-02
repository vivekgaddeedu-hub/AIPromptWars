'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { TabType } from '@/types';
import { DEMO_STEPS } from '@/data/demoStepsData';
import { Header } from '@/components/Header';
import { DemoBanner } from '@/components/DemoBanner';
import { AIAssistantModal } from '@/components/AIAssistantModal';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

// Instant Tabs
import { ExecutiveBriefingTab } from '@/components/tabs/ExecutiveBriefingTab';
import { BusinessDiagnosisTab } from '@/components/tabs/BusinessDiagnosisTab';
import { OpportunityAnalysisTab } from '@/components/tabs/OpportunityAnalysisTab';
import { ProductDashboardTab } from '@/components/tabs/ProductDashboardTab';
import { CoreWorkflowTab } from '@/components/tabs/CoreWorkflowTab';
import { RecommendationsTab } from '@/components/tabs/RecommendationsTab';
import { EvidenceRepositoryTab } from '@/components/tabs/EvidenceRepositoryTab';

// Dynamic / Heavy Tabs (Code-Split for performance & low initial bundle size)
const NovaLocalMap = dynamic(
  () => import('@/components/map/NovaLocalMap').then((mod) => mod.NovaLocalMap),
  { loading: () => <LoadingSkeleton rows={4} /> }
);
const SimulatorTab = dynamic(
  () => import('@/components/tabs/SimulatorTab').then((mod) => mod.SimulatorTab),
  { loading: () => <LoadingSkeleton rows={4} /> }
);
const BusinessImpactTab = dynamic(
  () => import('@/components/tabs/BusinessImpactTab').then((mod) => mod.BusinessImpactTab),
  { loading: () => <LoadingSkeleton rows={4} /> }
);
const ImplementationPlanTab = dynamic(
  () => import('@/components/tabs/ImplementationPlanTab').then((mod) => mod.ImplementationPlanTab),
  { loading: () => <LoadingSkeleton rows={4} /> }
);

import { Sparkles } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabType>('briefing');
  const [isDemoActive, setIsDemoActive] = useState<boolean>(false);
  const [currentDemoStepIndex, setCurrentDemoStepIndex] = useState<number>(0);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);

  // Trigger Demo Mode
  const handleStartDemo = () => {
    setIsDemoActive(true);
    setCurrentDemoStepIndex(0);
    setActiveTab(DEMO_STEPS[0].targetTab);
  };

  const handleCloseDemo = () => {
    setIsDemoActive(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onStartDemo={handleStartDemo}
        onOpenAI={() => setIsAIModalOpen(true)}
      />

      {/* Guided 5-Minute Judge Demo Controller */}
      {isDemoActive && (
        <DemoBanner
          currentStepIndex={currentDemoStepIndex}
          setCurrentStepIndex={setCurrentDemoStepIndex}
          onClose={handleCloseDemo}
          setActiveTab={setActiveTab}
        />
      )}

      {/* Main Tab View Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'briefing' && (
          <ExecutiveBriefingTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'diagnosis' && (
          <BusinessDiagnosisTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'opportunity' && (
          <OpportunityAnalysisTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'dashboard' && (
          <ProductDashboardTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'map' && (
          <NovaLocalMap onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'workflow' && (
          <CoreWorkflowTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'recommendations' && (
          <RecommendationsTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'simulator' && (
          <SimulatorTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'impact' && (
          <BusinessImpactTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'evidence' && (
          <EvidenceRepositoryTab onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'roadmap' && (
          <ImplementationPlanTab onNavigateTab={setActiveTab} />
        )}
      </main>

      {/* AI Business Analyst Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Executive Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-xs text-slate-400 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center text-white font-bold text-xs">
              N
            </div>
            <div>
              <span className="font-semibold text-white">NOVA CART Business Innovation Lab</span>
              <p className="text-[11px] text-slate-400">
                Product Strategist • Business Analyst • Data Analyst • UX Designer • AI Product Architect • Full-Stack Engineer
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <span className="font-mono">Budget: ₹25,00,000 Cap Compliant</span>
            <span>•</span>
            <span className="font-mono">Network: 620 Stores Across 3 Metros</span>
            <span>•</span>
            <button
              onClick={() => setIsAIModalOpen(true)}
              className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Ask AI Analyst</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
