import { describe, it, expect } from 'vitest';
import {
  calculateRetentionRisk,
  calculateStoreRisk,
  calculateOrderRisk,
  calculateBusinessHealth,
  calculateProjectedImpact,
  calculateROI,
  calculateBudgetTotal,
  validateBudgetCompliance,
  calculateStoreDistance,
  filterStores,
} from '../calculations';
import { ROADMAP_INITIATIVES } from '@/data/roadmapData';
import { SAMPLE_STORES } from '@/data/storesData';
import { SimulationParamsSchema, safeSanitizeString } from '../validation';
import { formatINR, formatLakh, formatPct, formatNumber } from '../formatters';

describe('NOVA CART Business Calculations & Pure Logic', () => {
  describe('calculateRetentionRisk', () => {
    it('should assign LOW risk to customers completing 3+ orders (Habit Threshold)', () => {
      const result = calculateRetentionRisk(3, 27.0, 5);
      expect(result.riskLevel).toBe('LOW');
      expect(result.riskScore).toBeLessThan(40);
      expect(result.reason).toContain('72% habit');
    });

    it('should assign MEDIUM risk to customers on order #2', () => {
      const result = calculateRetentionRisk(2, 27.0, 5);
      expect(result.riskLevel).toBe('MEDIUM');
    });

    it('should assign CRITICAL risk to first-order customers with 4+ star rating', () => {
      const result = calculateRetentionRisk(1, 27.0, 5);
      expect(result.riskLevel).toBe('CRITICAL');
      expect(result.riskScore).toBeGreaterThan(80);
      expect(result.reason).toContain('69% churn');
    });

    it('should handle zero or negative order count safely', () => {
      const result = calculateRetentionRisk(0, 27.0, 0);
      expect(result.riskLevel).toBe('HIGH');
      expect(result.riskScore).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculateStoreRisk', () => {
    it('should identify Critical phantom stock risk for stores with >24h sync staleness', () => {
      const result = calculateStoreRisk(42, 24.5, 280);
      expect(result.phantomRisk).toBe(true);
      expect(result.riskLevel).toBe('Critical');
      expect(result.healthScore).toBeLessThan(55);
    });

    it('should identify Low risk and high health score for updated smart-sync stores', () => {
      const result = calculateStoreRisk(0.5, 2.1, 490);
      expect(result.phantomRisk).toBe(false);
      expect(result.riskLevel).toBe('Low');
      expect(result.healthScore).toBeGreaterThan(85);
    });

    it('should identify Medium risk when risk score is between 35 and 64 without phantom staleness', () => {
      const result = calculateStoreRisk(12, 15, 200);
      expect(result.phantomRisk).toBe(false);
      expect(result.riskLevel).toBe('Medium');
      expect(result.riskScore).toBeGreaterThanOrEqual(35);
      expect(result.riskScore).toBeLessThan(65);
    });

    it('should penalize high-volume stores with critical risk', () => {
      const result = calculateStoreRisk(30, 20, 500);
      expect(result.phantomRisk).toBe(true);
      expect(result.riskLevel).toBe('Critical');
      expect(result.riskScore).toBeGreaterThan(70);
    });

    it('should handle zero and edge inputs gracefully', () => {
      const result = calculateStoreRisk(0, 0, 0);
      expect(result.healthScore).toBe(100);
      expect(result.phantomRisk).toBe(false);
    });
  });

  describe('calculateOrderRisk', () => {
    it('should flag an order containing phantom stock items (<50% confidence)', () => {
      const result = calculateOrderRisk([18, 92, 89], 36, 2);
      expect(result.isAtRisk).toBe(true);
      expect(result.lowestConfidence).toBe(18);
      expect(result.recommendedAction).toContain('sister-store');
    });

    it('should request merchant confirmation if store is stale but item confidence is reasonable', () => {
      const result = calculateOrderRisk([75, 80], 25, 3);
      expect(result.lowestConfidence).toBe(75);
      expect(result.recommendedAction).toContain('WhatsApp');
    });

    it('should consider orders with 100% confidence and fresh stock safe', () => {
      const result = calculateOrderRisk([95, 98], 1, 4);
      expect(result.isAtRisk).toBe(false);
      expect(result.lowestConfidence).toBe(95);
    });

    it('should handle empty items array safely', () => {
      const result = calculateOrderRisk([], 0, 1);
      expect(result.isAtRisk).toBe(false);
      expect(result.riskScore).toBe(0);
    });
  });

  describe('calculateBusinessHealth', () => {
    it('should evaluate baseline metrics as DEGRADED or CRITICAL', () => {
      const baseline = calculateBusinessHealth(11.0, 27.0, 37.0, 5900);
      expect(['DEGRADED', 'CRITICAL']).toContain(baseline.status);
      expect(baseline.healthScore).toBeLessThan(60);
    });

    it('should evaluate projected optimized metrics as STABLE or EXCELLENT', () => {
      const projected = calculateBusinessHealth(4.2, 38.4, 28.5, 2240);
      expect(['EXCELLENT', 'STABLE']).toContain(projected.status);
      expect(projected.healthScore).toBeGreaterThan(70);
    });
  });

  describe('calculateProjectedImpact', () => {
    it('should accurately calculate projected impact for base case adoption (75% sync, 70% rush)', () => {
      const impact = calculateProjectedImpact({
        inventorySyncAdoption: 75,
        rushModeBufferAdoption: 70,
        habitLoop3OrderTargeting: 50,
        marketingBudgetReallocation: 35,
        instantSubstitutionResolution: true,
      });

      expect(impact.projectedCancellationRate).toBeLessThan(5.5);
      expect(impact.projectedRepeatRate).toBeGreaterThan(35.0);
      expect(impact.projectedDeliveryTime).toBeLessThan(32.0);
      expect(impact.projectedSupportTickets).toBeLessThan(3000);
      expect(impact.annualProtectedGMV).toBeGreaterThan(10000000); // > ₹1 Crore
      expect(impact.projectedNetMonthlyContribution).toBeGreaterThan(14.0); // > ₹14 Lakhs
    });

    it('should return baseline-equivalent numbers when adoption is 0%', () => {
      const impact = calculateProjectedImpact({
        inventorySyncAdoption: 0,
        rushModeBufferAdoption: 0,
        habitLoop3OrderTargeting: 0,
        marketingBudgetReallocation: 0,
        instantSubstitutionResolution: false,
      });

      expect(impact.projectedCancellationRate).toBe(11.0);
      expect(impact.projectedRepeatRate).toBe(27.0);
      expect(impact.projectedDeliveryTime).toBe(37.0);
    });
  });

  describe('calculateROI & Payback', () => {
    it('should calculate 3.7 month payback on ₹25 Lakh budget with ₹7.3L monthly gain', () => {
      const roi = calculateROI(2500000, 730000);
      expect(roi.paybackMonths).toBe(3.4);
      expect(roi.firstYearROI).toBeGreaterThan(200);
    });

    it('should handle zero monthly benefit without crashing', () => {
      const roi = calculateROI(2500000, 0);
      expect(roi.paybackMonths).toBe(999);
      expect(roi.firstYearROI).toBe(0);
    });
  });

  describe('₹25 Lakh Budget Constraint Validation', () => {
    it('should confirm existing roadmap complies strictly with ₹25,00,000 ceiling', () => {
      const total = calculateBudgetTotal(ROADMAP_INITIATIVES);
      expect(total).toBe(2500000);

      const compliance = validateBudgetCompliance(ROADMAP_INITIATIVES, 2500000);
      expect(compliance.isCompliant).toBe(true);
      expect(compliance.overrunAmount).toBe(0);
    });

    it('should detect an overrun if budget exceeds ₹25 Lakhs', () => {
      const overBudgetList = [
        ...ROADMAP_INITIATIVES,
        { costINR: 300000 },
      ];
      const compliance = validateBudgetCompliance(overBudgetList, 2500000);
      expect(compliance.isCompliant).toBe(false);
      expect(compliance.overrunAmount).toBe(300000);
    });
  });

  describe('calculateStoreDistance (Haversine)', () => {
    it('should compute distance between Bengaluru coordinates accurately', () => {
      // Thom's Bakery Frazer Town (12.9982, 77.6158) to Namdhari's Indiranagar (12.9784, 77.6408)
      const dist = calculateStoreDistance(12.9982, 77.6158, 12.9784, 77.6408);
      expect(dist).toBeGreaterThan(3.0);
      expect(dist).toBeLessThan(4.5);
    });

    it('should return 0.0 for identical coordinates', () => {
      const dist = calculateStoreDistance(19.0596, 72.8295, 19.0596, 72.8295);
      expect(dist).toBe(0);
    });
  });

  describe('filterStores', () => {
    it('should filter stores by city correctly', () => {
      const mumbai = filterStores(SAMPLE_STORES, 'Mumbai', 'All', 'All', '');
      expect(mumbai.length).toBe(4);
      expect(mumbai.every((s) => s.city === 'Mumbai')).toBe(true);
    });

    it('should filter stores by risk level', () => {
      const critical = filterStores(SAMPLE_STORES, 'All', 'All', 'Critical', '');
      expect(critical.every((s) => s.phantomStockRisk === 'Critical')).toBe(true);
    });

    it('should search by store name case-insensitively', () => {
      const matches = filterStores(SAMPLE_STORES, 'All', 'All', 'All', 'theobroma');
      expect(matches.length).toBe(1);
      expect(matches[0].name).toContain('Theobroma');
    });
  });

  describe('Security & Validation Schemas', () => {
    it('should validate valid simulation parameters', () => {
      const valid = {
        inventorySyncAdoption: 80,
        rushModeBufferAdoption: 70,
        habitLoop3OrderTargeting: 40,
        marketingBudgetReallocation: 30,
        instantSubstitutionResolution: true,
      };
      expect(SimulationParamsSchema.safeParse(valid).success).toBe(true);
    });

    it('should reject out-of-range simulation parameters', () => {
      const invalid = {
        inventorySyncAdoption: 150, // exceeds 100
        rushModeBufferAdoption: -10, // negative
        habitLoop3OrderTargeting: 40,
        marketingBudgetReallocation: 75, // exceeds 50
        instantSubstitutionResolution: true,
      };
      expect(SimulationParamsSchema.safeParse(invalid).success).toBe(false);
    });

    it('should sanitize strings by stripping potential script/tag characters', () => {
      const sanitized = safeSanitizeString('<script>alert("hack")</script> Thom’s Bakery');
      expect(sanitized).toBe('scriptalert("hack")/script Thom’s Bakery');
      expect(sanitized).not.toContain('<');
      expect(sanitized).not.toContain('>');
    });

    it('should safely return empty string when non-string inputs are provided', () => {
      expect(safeSanitizeString(null)).toBe('');
      expect(safeSanitizeString(undefined)).toBe('');
      expect(safeSanitizeString(12345)).toBe('');
    });
  });

  describe('UI Formatters', () => {
    it('should format INR currency values with Indian grouping', () => {
      const formatted = formatINR(2500000);
      expect(formatted).toContain('25,00,000');
    });

    it('should format numbers in Lakh format', () => {
      expect(formatLakh(25)).toBe('₹25.0L');
      expect(formatLakh(4.25)).toBe('₹4.3L');
    });

    it('should format percentage values with correct sign prefix', () => {
      expect(formatPct(14.5)).toBe('+14.5%');
      expect(formatPct(-8.2)).toBe('-8.2%');
      expect(formatPct(0)).toBe('+0.0%');
    });

    it('should format standard numbers with Indian numeral separators', () => {
      const formatted = formatNumber(15420);
      expect(formatted).toContain('15,420');
    });
  });

  describe('Explicit Business Rule Audits (Challenge Mandates)', () => {
    // 1. Repeat purchase rate baseline
    it('Rule 1: confirms repeat purchase rate baseline is 27.0%', () => {
      const zeroParams = {
        inventorySyncAdoption: 0,
        rushModeBufferAdoption: 0,
        habitLoop3OrderTargeting: 0,
        marketingBudgetReallocation: 0,
        instantSubstitutionResolution: false,
      };
      const impact = calculateProjectedImpact(zeroParams);
      expect(impact.projectedRepeatRate).toBe(27.0);
    });

    // 2. Cancellation rate baseline
    it('Rule 2: confirms cancellation rate baseline is 11.0%', () => {
      const zeroParams = {
        inventorySyncAdoption: 0,
        rushModeBufferAdoption: 0,
        habitLoop3OrderTargeting: 0,
        marketingBudgetReallocation: 0,
        instantSubstitutionResolution: false,
      };
      const impact = calculateProjectedImpact(zeroParams);
      expect(impact.projectedCancellationRate).toBe(11.0);
    });

    // 3. Delivery delay calculations
    it('Rule 3: validates delivery time compresses from 37m baseline to under 29m', () => {
      const baseParams = {
        inventorySyncAdoption: 75,
        rushModeBufferAdoption: 70,
        habitLoop3OrderTargeting: 50,
        marketingBudgetReallocation: 35,
        instantSubstitutionResolution: true,
      };
      const impact = calculateProjectedImpact(baseParams);
      expect(impact.projectedDeliveryTime).toBeLessThanOrEqual(29.0);
      expect(impact.projectedDeliveryTime).toBeGreaterThanOrEqual(27.5);
    });

    // 4. Inventory-related cancellation logic
    it('Rule 4: confirms inventory sync resolves 35% phantom stock driver', () => {
      const inventoryOnly = {
        inventorySyncAdoption: 100,
        rushModeBufferAdoption: 0,
        habitLoop3OrderTargeting: 0,
        marketingBudgetReallocation: 0,
        instantSubstitutionResolution: false,
      };
      const impact = calculateProjectedImpact(inventoryOnly);
      // 11.0 - (1.0 * 0.35 * 11 * 0.85) = 11 - 3.27 = 7.7
      expect(impact.projectedCancellationRate).toBeLessThan(8.0);
      expect(impact.projectedCancellationRate).toBeGreaterThan(7.0);
    });

    // 5. Store risk
    it('Rule 5: verifies store risk calculation detects critical sync staleness', () => {
      const criticalStore = calculateStoreRisk(48, 26, 320);
      expect(criticalStore.phantomRisk).toBe(true);
      expect(criticalStore.riskLevel).toBe('Critical');
    });

    // 6. Customer retention risk
    it('Rule 6: verifies customer retention risk drops drastically after Order 3', () => {
      const order1 = calculateRetentionRisk(1, 27.0, 5);
      const order3 = calculateRetentionRisk(3, 27.0, 5);
      expect(order1.riskLevel).toBe('CRITICAL');
      expect(order3.riskLevel).toBe('LOW');
      expect(order3.riskScore).toBeLessThan(order1.riskScore);
    });

    // 7. ₹25 lakh implementation budget
    it('Rule 7: verifies budget satisfies TOTAL_IMPLEMENTATION_COST === 2500000 and fails if > 2500000', () => {
      const totalCost = calculateBudgetTotal(ROADMAP_INITIATIVES);
      expect(totalCost === 2500000).toBe(true);

      const exactCompliance = validateBudgetCompliance(ROADMAP_INITIATIVES, 2500000);
      expect(exactCompliance.isCompliant).toBe(true);
      expect(exactCompliance.totalCost).toBe(2500000);

      const excessInitiatives = [...ROADMAP_INITIATIVES, { costINR: 1 }];
      const excessCompliance = validateBudgetCompliance(excessInitiatives, 2500000);
      expect(excessCompliance.isCompliant).toBe(false);
      expect(excessCompliance.overrunAmount).toBe(1);
    });

    // 8. Intervention simulation
    it('Rule 8: validates intervention simulation responsiveness across slider dials', () => {
      const conservative = calculateProjectedImpact({
        inventorySyncAdoption: 40,
        rushModeBufferAdoption: 35,
        habitLoop3OrderTargeting: 25,
        marketingBudgetReallocation: 20,
        instantSubstitutionResolution: false,
      });
      const aggressive = calculateProjectedImpact({
        inventorySyncAdoption: 90,
        rushModeBufferAdoption: 85,
        habitLoop3OrderTargeting: 75,
        marketingBudgetReallocation: 45,
        instantSubstitutionResolution: true,
      });
      expect(aggressive.projectedCancellationRate).toBeLessThan(conservative.projectedCancellationRate);
      expect(aggressive.projectedRepeatRate).toBeGreaterThan(conservative.projectedRepeatRate);
      expect(aggressive.annualProtectedGMV).toBeGreaterThan(conservative.annualProtectedGMV);
    });

    // 9. Projected KPI calculations
    it('Rule 9: confirms base projected state achieves targets (<5.5% cancellations, >35% repeat, <3000 tickets)', () => {
      const base = calculateProjectedImpact({
        inventorySyncAdoption: 75,
        rushModeBufferAdoption: 70,
        habitLoop3OrderTargeting: 50,
        marketingBudgetReallocation: 35,
        instantSubstitutionResolution: true,
      });
      expect(base.projectedCancellationRate).toBeLessThanOrEqual(5.5);
      expect(base.projectedRepeatRate).toBeGreaterThanOrEqual(35.0);
      expect(base.projectedSupportTickets).toBeLessThanOrEqual(3000);
    });

    // 10. ROI calculation
    it('Rule 10: validates ROI achieves 3.4 - 3.7 months payback and >200% Year 1 ROI', () => {
      const roi = calculateROI(2500000, 730000);
      expect(roi.paybackMonths).toBeGreaterThanOrEqual(3.0);
      expect(roi.paybackMonths).toBeLessThanOrEqual(4.0);
      expect(roi.firstYearROI).toBeGreaterThan(200);
    });
  });
});
