export type TabType = 
  | 'briefing'
  | 'diagnosis'
  | 'opportunity'
  | 'dashboard'
  | 'map'
  | 'workflow'
  | 'recommendations'
  | 'simulator'
  | 'impact'
  | 'evidence'
  | 'roadmap';

export type EvidenceCategory = 'FACT' | 'INFERENCE' | 'HYPOTHESIS';

export interface CausalNode {
  id: string;
  title: string;
  category: EvidenceCategory;
  group: 'operations' | 'customer' | 'financial' | 'merchant' | 'logistics';
  x: number; // for visual mapping
  y: number;
  caseEvidence: string[];
  relatedMetrics: { label: string; value: string; trend?: 'up' | 'down' | 'neutral'; bad?: boolean }[];
  possibleCauses: string[];
  businessConsequence: string;
  connectedTo: string[]; // target node IDs
}

export interface Hypothesis {
  id: string;
  name: string;
  tagline: string;
  status: 'REJECTED_ROOT' | 'CONTRIBUTING_SYMPTOM' | 'PRIMARY_OPPORTUNITY';
  evidenceSupporting: string[];
  evidenceWeakening: string[];
  affectedMetrics: string[];
  downstreamEffects: string[];
  potentialIntervention: string;
  implementationComplexity: 'Low' | 'Medium' | 'High' | 'Very High';
  budgetFeasibility: string;
  expectedBusinessRelevance: string;
  score: {
    evidenceWeight: number; // /10
    addressableRootCause: number; // /10
    budgetFit25L: number; // /10
    timeToValue6Mo: number; // /10
    localMoatLeverage: number; // /10
    totalScore: number; // /50
  };
}

export interface Store {
  id: string;
  name: string;
  category: 'Gourmet Grocery' | 'Pharmacy' | 'Bakery & Patisserie' | 'Stationery & Lifestyle';
  city: 'Mumbai' | 'Bengaluru' | 'Delhi NCR';
  locality: string;
  inventorySyncMode: 'Manual (1-3 days)' | 'Manual (Daily)' | 'NOVA Smart-Sync';
  syncStalenessHours: number;
  healthScore: number; // 0-100
  riskOfLeaving: boolean;
  orderRejectionRate: number; // %
  monthlyOrders: number;
  phantomStockRisk: 'Low' | 'Medium' | 'Critical';
  avgFulfillmentMin: number;
  activePromotionsMarginImpact: string;
  lat: number;
  lng: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  category: string;
  inStockReported: boolean;
  actualStockConfidence: number; // %
  alternativeSuggestion?: {
    name: string;
    store: string;
    distanceKm: number;
    price: number;
    inStockConfidence: number;
    lat?: number;
    lng?: number;
  };
}

export interface AtRiskOrder {
  orderId: string;
  customerName: string;
  customerOrderCount: number; // e.g. 1st, 2nd, 3rd
  isAt3OrderHabitThreshold: boolean;
  storeName: string;
  storeCategory: string;
  orderValue: number;
  placedMinutesAgo: number;
  estimatedDeliveryMin: number;
  riskType: 'PHANTOM_STOCK' | 'STORE_RUSH_REJECTION' | 'DELIVERY_DELAY' | 'UNCHECKED_DISCOUNT';
  status: 'PENDING_RESOLUTION' | 'RESOLVED_REPLACED' | 'CANCELLED';
  items: OrderItem[];
  recommendedAction: string;
  potentialRevenueProtected: number;
}

export interface SimulationParams {
  inventorySyncAdoption: number; // % of stores on smart sync (0-100)
  rushModeBufferAdoption: number; // % of stores with peak auto-throttling (0-100)
  habitLoop3OrderTargeting: number; // % of 1st/2nd time users targeted with multi-category bundles (0-100)
  marketingBudgetReallocation: number; // % shifted from discount acquisition to habit loops (0-50%)
  instantSubstitutionResolution: boolean; // Auto-resolution for out-of-stock items
}

export interface RoadmapInitiative {
  id: string;
  month: number;
  monthLabel: string;
  initiative: string;
  category: 'Product & Tech' | 'Store Operations' | 'Catalog & AI' | 'Growth & Retention' | 'Governance';
  costINR: number;
  owner: string;
  kpi: string;
  expectedOutcome: string;
  dependency: string;
  status: 'Planned' | 'In Progress' | 'Complete';
}

export interface DemoStep {
  step: number;
  title: string;
  targetTab: TabType;
  storyHeading: string;
  narrative: string;
  keyMetricHighlight: { label: string; value: string; badge: string };
  actionPrompt: string;
}
