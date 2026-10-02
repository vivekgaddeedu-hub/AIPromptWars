'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PRESET_QUESTIONS, answerAnalystQuery, AnalystQA } from '@/data/aiAnalystKnowledge';
import { TabType } from '@/types';
import { 
  Sparkles, 
  X, 
  Send, 
  ArrowRight, 
  FileCheck2, 
  HelpCircle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: TabType) => void;
}

export function AIAssistantModal({ isOpen, onClose, setActiveTab }: AIAssistantModalProps) {
  const [selectedQA, setSelectedQA] = useState<AnalystQA>(PRESET_QUESTIONS[0]);
  const [customInput, setCustomInput] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Focus management: Trap focus inside modal & restore on close
  useEffect(() => {
    if (!isOpen) return;
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

    // Focus initial element inside dialog
    const timer = setTimeout(() => {
      const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const elements = modalRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!elements || elements.length === 0) return;

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectQuestion = (qa: AnalystQA) => {
    setSelectedQA(qa);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const ans = answerAnalystQuery(customInput);
    setSelectedQA(ans);
    setCustomInput('');
  };

  const handleNavigateToTab = (tab: string) => {
    setActiveTab(tab as TabType);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-analyst-title"
      aria-describedby="ai-analyst-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 id="ai-analyst-title" className="text-base font-bold text-white flex items-center gap-2">
                AI Business Analyst & Strategic Reasoner
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Deterministic Case Grounding
                </span>
              </h3>
              <p id="ai-analyst-desc" className="text-xs text-slate-400">
                Instant verifiable business reasoning citing the NOVA CART case facts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close AI Analyst dialog"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body: Two Columns */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden">
          {/* Left Column: Preset Questions */}
          <div className="md:col-span-5 border-r border-slate-800/80 bg-slate-950/40 p-4 overflow-y-auto space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              <span>Core Case Questions</span>
            </div>

            <div className="space-y-1.5">
              {PRESET_QUESTIONS.map((qa) => (
                <button
                  key={qa.id}
                  onClick={() => handleSelectQuestion(qa)}
                  className={`w-full text-left p-3 rounded-xl transition text-xs border ${
                    selectedQA.id === qa.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-white font-medium shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                  aria-pressed={selectedQA.id === qa.id}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-300 text-[11px] uppercase tracking-wide">
                      {qa.category}
                    </span>
                    {selectedQA.id === qa.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2">{qa.question}</p>
                </button>
              ))}
            </div>

            {/* Custom Question Input Form */}
            <form onSubmit={handleCustomSubmit} className="pt-2">
              <label htmlFor="custom-qa-input" className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                Ask a custom question:
              </label>
              <div className="relative">
                <input
                  id="custom-qa-input"
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="e.g. Why did 4-star users leave?"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-3 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus-visible:ring-1 focus-visible:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
                  aria-label="Submit question"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Reasoning & Evidence Display */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-5 bg-slate-900/50" aria-live="polite" aria-atomic="true">
            {/* Question title & short answer */}
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {selectedQA.category}
              </span>
              <h2 className="text-lg font-bold text-white mt-2 leading-snug">
                {selectedQA.question}
              </h2>
              <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-200 leading-relaxed">
                <strong className="text-emerald-400 font-semibold block mb-1">
                  Executive Answer:
                </strong>
                {selectedQA.shortAnswer}
              </div>
            </div>

            {/* Detailed analytical breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                <span>Analytical Breakdown & Root-Cause Logic</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                {selectedQA.detailedAnalysis.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="h-5 w-5 rounded-full bg-indigo-900/60 text-indigo-300 flex items-center justify-center shrink-0 font-mono text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Supporting Evidence Citations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                <span>Case Evidence Citations</span>
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {selectedQA.evidenceCitations.map((cite, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-xs">
                    <div className="flex items-center justify-between text-emerald-300 font-semibold">
                      <span>{cite.fact}</span>
                      <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-900/40 px-1.5 py-0.5 rounded">
                        {cite.source}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-400 text-[11px]">
                      <strong>Impact:</strong> {cite.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Action & Deep Link CTA */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/60 to-purple-950/40 border border-indigo-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">
                  Recommended Next Step
                </span>
                <p className="text-xs text-slate-200 mt-0.5">
                  {selectedQA.recommendedAction}
                </p>
              </div>
              <button
                onClick={() => handleNavigateToTab(selectedQA.targetTab)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 shadow-md transition focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Open View</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
