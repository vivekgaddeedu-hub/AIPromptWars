import { SimulationParams, Store } from '@/types';

/**
 * Calculates customer churn/retention risk based on order position, current platform repeat rate, and prior rating.
 * Grounding: 61% of churned users rated 4+ stars; 69% drop-off between Order 1 and Order 2; 72% repeat after Order 3.
 */
export function calculateRetentionRisk(
  customerOrderCount: number,
  repeatPurchaseRate: number = 27.0,
  priorRating: number = 5
): {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  riskScore: number;
  reason: string;
} {
  const safeCount = Math.max(0, Math.floor(customerOrderCount || 0));
  const safeRate = Math.max(0, Math.min(100, repeatPurchaseRate || 27.0));

  if (safeCount >= 3) {
    return {
      riskLevel: 'LOW',
      riskScore: 28,
      reason: 'Customer has completed 3+ orders and crossed the 72% habit formation threshold.',
    };
  }

  if (safeCount === 2) {
    return {
      riskLevel: 'MEDIUM',
      riskScore: 52,
      reason: 'Customer has placed 2 orders; targeted multi-category pass needed to cross the 3-order threshold.',
    };
  }

  if (safeCount === 1 && priorRating >= 4) {
    return {
      riskLevel: 'CRITICAL',
      riskScore: 89,
      reason: 'First-order buyer with high rating (4-5 stars); highest risk cohort where 69% churn occurs after fulfillment failure.',
    };
  }

  return {
    riskLevel: 'HIGH',
    riskScore: 75,
    reason: `New signup cohort vulnerable to platform baseline repeat rate of ${safeRate.toFixed(1)}%.`,
  };
}

/**
 * Calculates store health and phantom stock risk score based on inventory sync staleness and rejection rate.
 * Grounding: 39% say inventory effort is too high; 37% update only every 1-3 days; 23% reject orders in peak walk-in.
 */
export function calculateStoreRisk(
  syncStalenessHours: number,
  orderRejectionRate: number,
  monthlyOrders: number = 100
): {
  riskScore: number; // 0-100 (100 = highest risk)
  healthScore: number; // 0-100 (100 = best health)
  riskLevel: 'Low' | 'Medium' | 'Critical';
  phantomRisk: boolean;
} {
  const safeStaleness = Math.max(0, syncStalenessHours || 0);
  const safeRejection = Math.max(0, Math.min(100, orderRejectionRate || 0));
  const safeOrders = Math.max(1, monthlyOrders || 1);

  // Score components
  const stalenessPenalty = Math.min(60, (safeStaleness / 48) * 60);
  const rejectionPenalty = Math.min(40, (safeRejection / 25) * 40);
  const totalRiskScore = Math.min(100, Math.round(stalenessPenalty + rejectionPenalty));
  const healthScore = Math.max(0, 100 - totalRiskScore);

  const phantomRisk = safeStaleness >= 24;
  let riskLevel: 'Low' | 'Medium' | 'Critical' = 'Low';

  if (totalRiskScore >= 65 || phantomRisk) {
    riskLevel = 'Critical';
  } else if (totalRiskScore >= 35) {
    riskLevel = 'Medium';
  }

  // Volume weighting
  if (safeOrders > 400 && riskLevel === 'Critical') {
    // High-volume stores with critical risk pose maximum GMV danger
    return { riskScore: Math.min(100, totalRiskScore + 5), healthScore: Math.max(0, healthScore - 5), riskLevel, phantomRisk };
  }

  return { riskScore: totalRiskScore, healthScore, riskLevel, phantomRisk };
}

/**
 * Calculates item-level basket fulfillment risk for an active customer order.
 */
export function calculateOrderRisk(
  itemsConfidence: number[],
  storeStalenessHours: number,
  orderCount: number
): {
  riskScore: number;
  isAtRisk: boolean;
  lowestConfidence: number;
  recommendedAction: string;
} {
  if (!itemsConfidence || itemsConfidence.length === 0) {
    return {
      riskScore: 0,
      isAtRisk: false,
      lowestConfidence: 100,
      recommendedAction: 'No items in order payload.',
    };
  }

  const lowestConfidence = Math.min(...itemsConfidence);
  const isGhostStock = lowestConfidence < 50;
  const isStaleStore = storeStalenessHours >= 24;

  let riskScore = 100 - lowestConfidence;
  if (isStaleStore) riskScore = Math.min(100, riskScore + 20);
  if (orderCount <= 2) riskScore = Math.min(100, riskScore + 15); // habit risk penalty

  const isAtRisk = riskScore >= 50 || isGhostStock;

  let recommendedAction = 'Fulfillment confidence nominal. Standard dispatch queue.';
  if (isGhostStock) {
    recommendedAction = 'Trigger dynamic sister-store routing or 1-tap equivalent confirmation before dispatch.';
  } else if (isStaleStore) {
    recommendedAction = 'Request 1-tap WhatsApp voice/text stock confirmation from merchant.';
  }

  return {
    riskScore: Math.round(riskScore),
    isAtRisk,
    lowestConfidence,
    recommendedAction,
  };
}

/**
 * Evaluates macro platform health score across key operational metrics.
 */
export function calculateBusinessHealth(
  cancellationRate: number = 11.0,
  repeatRate: number = 27.0,
  avgDeliveryMin: number = 37.0,
  supportTickets: number = 5900
): {
  healthScore: number; // 0 to 100
  status: 'EXCELLENT' | 'STABLE' | 'DEGRADED' | 'CRITICAL';
} {
  // Baselines: Cancel 6% (good) vs 11% (bad), Repeat 41% (good) vs 27% (bad), Delivery 29m vs 37m, Tickets 3100 vs 5900
  const cancelScore = Math.max(0, 100 - (cancellationRate / 15) * 100);
  const repeatScore = Math.min(100, (repeatRate / 45) * 100);
  const deliveryScore = Math.max(0, 100 - ((avgDeliveryMin - 20) / 30) * 100);
  const supportScore = Math.max(0, 100 - (supportTickets / 7000) * 100);

  const weighted = cancelScore * 0.35 + repeatScore * 0.35 + deliveryScore * 0.15 + supportScore * 0.15;
  const healthScore = Math.round(Math.max(0, Math.min(100, weighted)));

  let status: 'EXCELLENT' | 'STABLE' | 'DEGRADED' | 'CRITICAL' = 'DEGRADED';
  if (healthScore >= 80) status = 'EXCELLENT';
  else if (healthScore >= 60) status = 'STABLE';
  else if (healthScore >= 40) status = 'DEGRADED';
  else status = 'CRITICAL';

  return { healthScore, status };
}

/**
 * Pure simulation function calculating projected impact based on user dials.
 */
export function calculateProjectedImpact(params: SimulationParams) {
  const sync = Math.max(0, Math.min(100, params.inventorySyncAdoption || 0));
  const rush = Math.max(0, Math.min(100, params.rushModeBufferAdoption || 0));
  const habit = Math.max(0, Math.min(100, params.habitLoop3OrderTargeting || 0));
  const marketingShift = Math.max(0, Math.min(50, params.marketingBudgetReallocation || 0));
  const subRouter = Boolean(params.instantSubstitutionResolution);

  // Cancellation reduction
  // 35% of cancellations (3.85 pts of 11%) are unavailable products; 18% (1.98 pts) are store rejections
  const invRed = (sync / 100) * 3.85; // up to 3.85 pts
  const rushRed = (rush / 100) * 1.98; // up to 1.98 pts
  const subRed = subRouter ? 1.5 : 0; // sister routing resolves out-of-stock items
  const projectedCancellationRate = Math.max(3.2, 11.0 - (invRed + rushRed + subRed));

  // Repeat rate gain (unlocking 72% habit threshold on 3rd orders & recovering 61% churned loyalists)
  const habitGain = (habit / 100) * 14.5;
  const fulfillmentTrustGain = ((11.0 - projectedCancellationRate) / 11.0) * 8.0;
  const projectedRepeatRate = Math.min(48.0, 27.0 + habitGain + fulfillmentTrustGain);

  // Delivery time reduction (recovering 8-minute delay caused by store chaos & search loops)
  const timeRed = (sync / 100) * 5.5 + (rush / 100) * 3.8 + (subRouter ? 1.5 : 0);
  const projectedDeliveryTime = Math.max(27.5, 37.0 - timeRed);

  // Support tickets: 48% stockouts/refunds + 24% delivery delays reduce as fulfillment improves
  const ticketRedPct = Math.min(0.68, ((11.0 - projectedCancellationRate) / 11.0) * 0.85 + (subRouter ? 0.20 : 0));
  const projectedSupportTickets = Math.round(Math.max(1800, 5900 * (1 - ticketRedPct)));

  // Financials
  const monthlyCancelledOrdersSaved = Math.round(38500 * ((11.0 - projectedCancellationRate) / 100));
  const monthlyProtectedGMV = monthlyCancelledOrdersSaved * 486;
  const annualProtectedGMV = monthlyProtectedGMV * 12;

  const monthlyTakeRateGain = monthlyProtectedGMV * 0.145;
  const promoSavings = (marketingShift / 100) * 350000;
  const supportCostSavings = (5900 - projectedSupportTickets) * 85;
  const projectedNetMonthlyContribution = 9.1 + (monthlyTakeRateGain + promoSavings + supportCostSavings) / 100000;

  return {
    projectedCancellationRate: parseFloat(projectedCancellationRate.toFixed(1)),
    projectedRepeatRate: parseFloat(projectedRepeatRate.toFixed(1)),
    projectedDeliveryTime: parseFloat(projectedDeliveryTime.toFixed(1)),
    projectedSupportTickets,
    monthlyCancelledOrdersSaved,
    monthlyProtectedGMV,
    annualProtectedGMV,
    projectedNetMonthlyContribution: parseFloat(projectedNetMonthlyContribution.toFixed(1)),
  };
}

/**
 * Calculates Return on Investment (ROI) and Payback Period.
 */
export function calculateROI(
  initialBudget: number = 2500000,
  monthlyBenefitGain: number = 730000
): {
  initialBudget: number;
  monthlyBenefit: number;
  annualBenefit: number;
  paybackMonths: number;
  firstYearROI: number;
} {
  const safeBudget = Math.max(1, initialBudget);
  const safeMonthlyBenefit = Math.max(0, monthlyBenefitGain);
  const annualBenefit = safeMonthlyBenefit * 12;
  const paybackMonths = safeMonthlyBenefit > 0 ? parseFloat((safeBudget / safeMonthlyBenefit).toFixed(1)) : 999;
  const firstYearROI = safeMonthlyBenefit > 0 ? Math.round(((annualBenefit - safeBudget) / safeBudget) * 100) : 0;

  return {
    initialBudget: safeBudget,
    monthlyBenefit: safeMonthlyBenefit,
    annualBenefit,
    paybackMonths,
    firstYearROI,
  };
}

/**
 * Calculates total implementation budget across roadmap initiatives.
 */
export function calculateBudgetTotal(initiatives: { costINR: number }[]): number {
  if (!initiatives || initiatives.length === 0) return 0;
  return initiatives.reduce((sum, item) => sum + (item.costINR || 0), 0);
}

/**
 * Validates whether the roadmap complies strictly with the ₹25 Lakh budget cap constraint.
 */
export function validateBudgetCompliance(
  initiatives: { costINR: number }[],
  budgetCeiling: number = 2500000
): {
  totalCost: number;
  ceiling: number;
  isCompliant: boolean;
  overrunAmount: number;
} {
  const totalCost = calculateBudgetTotal(initiatives);
  const isCompliant = totalCost <= budgetCeiling;
  const overrunAmount = Math.max(0, totalCost - budgetCeiling);

  return {
    totalCost,
    ceiling: budgetCeiling,
    isCompliant,
    overrunAmount,
  };
}

/**
 * Computes geographic distance in kilometers between two points using the Haversine formula.
 */
export function calculateStoreDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}

/**
 * Filters and searches stores safely.
 */
export function filterStores(
  stores: Store[],
  city: string = 'All',
  category: string = 'All',
  risk: string = 'All',
  searchQuery: string = ''
): Store[] {
  if (!stores || stores.length === 0) return [];
  const cleanQuery = searchQuery.trim().toLowerCase();

  return stores.filter((store) => {
    if (city !== 'All' && store.city !== city) return false;
    if (category !== 'All' && store.category !== category) return false;
    if (risk !== 'All' && store.phantomStockRisk !== risk) return false;
    if (cleanQuery) {
      const matchName = store.name.toLowerCase().includes(cleanQuery);
      const matchLoc = store.locality.toLowerCase().includes(cleanQuery);
      if (!matchName && !matchLoc) return false;
    }
    return true;
  });
}
