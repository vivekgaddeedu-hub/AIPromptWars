import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { KpiCard } from '../ui/KpiCard';
import { StatusBadge } from '../ui/StatusBadge';
import { EmptyState } from '../ui/EmptyState';
import { LoadingSkeleton } from '../ui/LoadingSkeleton';
import { NovaLocalMap } from '../map/NovaLocalMap';
import { AIAssistantModal } from '../AIAssistantModal';

describe('UI & Component System Tests', () => {
  describe('KpiCard Component', () => {
    it('renders metric label, value, baseline, and change percentage properly', () => {
      render(
        <KpiCard
          label="Repeat Purchase Rate"
          currentValue={27}
          baselineValue={41}
          suffix="%"
          changePct={-34.1}
          sentiment="negative"
          explanation="Severe collapse in customer repeat rate"
          factTag="VERIFIED_FACT"
        />
      );

      expect(screen.getByText('Repeat Purchase Rate')).toBeInTheDocument();
      expect(screen.getByText('27%')).toBeInTheDocument();
      expect(screen.getByText('was 41%')).toBeInTheDocument();
      expect(screen.getByText('-34.1%')).toBeInTheDocument();
      expect(screen.getByText('Severe collapse in customer repeat rate')).toBeInTheDocument();
      expect(screen.getByText('VERIFIED_FACT')).toBeInTheDocument();
    });

    it('has proper accessibility region and aria-label', () => {
      const { container } = render(
        <KpiCard
          label="Monthly Orders"
          currentValue={38500}
          prefix=""
          sentiment="positive"
        />
      );

      const region = container.querySelector('[role="region"]');
      expect(region).toHaveAttribute('aria-label', 'Monthly Orders: 38,500');
    });
  });

  describe('StatusBadge Component', () => {
    it('renders FACT badge with icon and text', () => {
      render(<StatusBadge category="FACT" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveTextContent('FACT');
    });

    it('renders CRITICAL_LEAK badge with icon and text', () => {
      render(<StatusBadge category="CRITICAL_LEAK" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveTextContent('CRITICAL LEAK');
    });

    it('renders custom label when provided', () => {
      render(<StatusBadge category="INFERENCE" label="Analytical Deduction" />);
      const badge = screen.getByRole('status');
      expect(badge).toHaveTextContent('Analytical Deduction');
    });
  });

  describe('EmptyState Component', () => {
    it('renders empty message and handles reset click', () => {
      const handleReset = vi.fn();
      render(
        <EmptyState
          title="No Stores Found"
          message="No stores match selected filter"
          onReset={handleReset}
          actionText="Clear Filter"
        />
      );

      expect(screen.getByText('No Stores Found')).toBeInTheDocument();
      expect(screen.getByText('No stores match selected filter')).toBeInTheDocument();

      const button = screen.getByRole('button', { name: /Clear Filter/i });
      fireEvent.click(button);
      expect(handleReset).toHaveBeenCalledTimes(1);
    });
  });

  describe('LoadingSkeleton Component', () => {
    it('renders with accessibility role status and pulse animation', () => {
      render(<LoadingSkeleton rows={4} />);
      const skeleton = screen.getByRole('status');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveAttribute('aria-label', 'Loading content...');
      expect(screen.getByText('Loading content, please wait...')).toBeInTheDocument();
    });
  });

  describe('NovaLocalMap Component (Google Maps Fallback & Proximity Routing)', () => {
    it('gracefully renders proximity matrix without crashing when Google Maps API key is absent', () => {
      render(<NovaLocalMap />);

      // Verifies exact fallback notice appears
      expect(screen.getByText(/Google Maps unavailable — Demo Mode/i)).toBeInTheDocument();
      expect(screen.getByText(/Proximity Matrix Radar/i)).toBeInTheDocument();
      expect(screen.getByText(/Nearby Sister-Store Alternatives/i)).toBeInTheDocument();
      expect(screen.getByText(/Hyperlocal Alternative Routing Logic/i)).toBeInTheDocument();
    });

    it('allows switching cities and updates store nodes', () => {
      render(<NovaLocalMap />);

      const mumbaiBtn = screen.getByRole('button', { name: 'Mumbai' });
      fireEvent.click(mumbaiBtn);

      expect(screen.getByText(/Mumbai Merchant Network Coordinates/i)).toBeInTheDocument();
    });

    it('allows filtering stores by health score', () => {
      render(<NovaLocalMap />);

      const atRiskBtn = screen.getByRole('button', { name: 'At Risk' });
      fireEvent.click(atRiskBtn);

      expect(screen.getByText(/Merchant Network Coordinates/i)).toBeInTheDocument();
    });
  });

  describe('AIAssistantModal Component', () => {
    it('renders with dialog role, title, and handles close action', () => {
      const handleClose = vi.fn();
      const handleTab = vi.fn();

      render(<AIAssistantModal isOpen={true} onClose={handleClose} setActiveTab={handleTab} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(screen.getByText('AI Business Analyst & Strategic Reasoner')).toBeInTheDocument();

      const closeButton = screen.getByRole('button', { name: /Close AI Analyst dialog/i });
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('returns null when isOpen is false', () => {
      const { container } = render(
        <AIAssistantModal isOpen={false} onClose={vi.fn()} setActiveTab={vi.fn()} />
      );
      expect(container.firstChild).toBeNull();
    });
  });
});
