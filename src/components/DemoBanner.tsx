'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { DEMO_STEPS } from '@/data/demoStepsData';
import { TabType } from '@/types';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Play, 
  Pause, 
  Compass, 
  Target 
} from 'lucide-react';

interface DemoBannerProps {
  currentStepIndex: number;
  setCurrentStepIndex: (idx: number) => void;
  onClose: () => void;
  setActiveTab: (tab: TabType) => void;
}

export function DemoBanner({
  currentStepIndex,
  setCurrentStepIndex,
  onClose,
  setActiveTab,
}: DemoBannerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const step = DEMO_STEPS[currentStepIndex] || DEMO_STEPS[0];

  const handleNext = useCallback(() => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      setActiveTab(DEMO_STEPS[nextIdx].targetTab);
    }
  }, [currentStepIndex, setCurrentStepIndex, setActiveTab]);

  const handlePrev = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      setActiveTab(DEMO_STEPS[prevIdx].targetTab);
    }
  }, [currentStepIndex, setCurrentStepIndex, setActiveTab]);

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        if (currentStepIndex < DEMO_STEPS.length - 1) {
          handleNext();
        } else {
          setIsPlaying(false);
        }
      }, 10000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentStepIndex, handleNext]);

  const handleStepJump = (idx: number) => {
    setCurrentStepIndex(idx);
    setActiveTab(DEMO_STEPS[idx].targetTab);
  };

  return (
    <div 
      className="bg-gradient-to-r from-slate-900 via-indigo-950/90 to-slate-900 border-b border-indigo-500/30 text-white shadow-xl transition-all duration-300"
      role="region"
      aria-label="Guided Demo Controller"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top bar: Stepper & Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} aria-hidden="true" />
              <span>JUDGE DEMO MODE</span>
            </div>

            <span className="text-xs font-mono text-indigo-300">
              Step {currentStepIndex + 1} of {DEMO_STEPS.length}
            </span>

            <div className="flex items-center gap-1" role="group" aria-label="Demo steps">
              {DEMO_STEPS.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => handleStepJump(idx)}
                  className={`h-2 rounded-full transition-all focus-visible:ring-1 focus-visible:ring-indigo-400 ${
                    idx === currentStepIndex
                      ? 'w-6 bg-emerald-400'
                      : idx < currentStepIndex
                      ? 'w-2 bg-indigo-400'
                      : 'w-2 bg-slate-700'
                  }`}
                  aria-label={`Jump to Step ${idx + 1}: ${s.title}`}
                  aria-current={idx === currentStepIndex ? 'step' : undefined}
                />
              ))}
            </div>
          </div>

          {/* Controller buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition focus-visible:ring-1 focus-visible:ring-indigo-400"
              title="Auto-advance story every 10 seconds"
              aria-label={isPlaying ? 'Pause auto-play' : 'Start auto-play'}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-amber-400" aria-hidden="true" /> : <Play className="w-3 h-3 text-emerald-400" aria-hidden="true" />}
              <span>{isPlaying ? 'Pause' : 'Auto-Play'}</span>
            </button>

            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 border border-slate-700 focus-visible:ring-1 focus-visible:ring-indigo-400"
              title="Previous step"
              aria-label="Previous demo step"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === DEMO_STEPS.length - 1}
              className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-sm focus-visible:ring-1 focus-visible:ring-indigo-400"
              title="Next step"
              aria-label="Next demo step"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition ml-1 focus-visible:ring-1 focus-visible:ring-indigo-400"
              title="Exit demo mode"
              aria-label="Exit demo mode"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Narrative Banner Details */}
        <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {step.storyHeading}
              </span>
              <span className="px-2 py-0.5 text-[11px] rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {step.keyMetricHighlight.badge}: {step.keyMetricHighlight.value}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {step.narrative}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-900/40 border border-indigo-700/50 text-xs text-indigo-200 shrink-0">
            <Target className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
            <span><strong className="text-white">Action:</strong> {step.actionPrompt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
