export interface MetricComparison {
  key: string;
  label: string;
  unit: string;
  prefix?: string;
  suffix?: string;
  baseline: number;
  current: number;
  changePct: number;
  direction: 'up' | 'down';
  sentiment: 'positive' | 'negative' | 'neutral';
  explanation: string;
  factTag: 'VERIFIED_FACT';
}

export const CASE_METRICS: MetricComparison[] = [
  {
    key: 'registered_users',
    label: 'Registered Users',
    unit: 'users',
    baseline: 82000,
    current: 120000,
    changePct: 46.3,
    direction: 'up',
    sentiment: 'neutral',
    explanation: 'Rapid top-of-funnel acquisition driven by heavy promotional subsidies.',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'mau',
    label: 'Monthly Active Users (MAU)',
    unit: 'users',
    baseline: 39000,
    current: 46000,
    changePct: 17.9,
    direction: 'up',
    sentiment: 'neutral',
    explanation: 'MAU lag behind user growth: only 38.3% of registered users are active.',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'monthly_orders',
    label: 'Monthly Orders',
    unit: 'orders',
    baseline: 31200,
    current: 38500,
    changePct: 23.4,
    direction: 'up',
    sentiment: 'positive',
    explanation: 'Volume grew from 31,200 to 38,500 orders/month.',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'aov',
    label: 'Average Order Value (AOV)',
    unit: '₹',
    prefix: '₹',
    baseline: 452,
    current: 486,
    changePct: 7.5,
    direction: 'up',
    sentiment: 'positive',
    explanation: 'Mild basket inflation and multi-item ordering across local stores.',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'repeat_rate',
    label: 'Repeat Purchase Rate',
    unit: '%',
    suffix: '%',
    baseline: 41.0,
    current: 27.0,
    changePct: -34.1,
    direction: 'down',
    sentiment: 'negative',
    explanation: 'CRITICAL FAILURE: Collapsed by 14 percentage points despite 79% higher promo spend.',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'avg_delivery_time',
    label: 'Average Delivery Time',
    unit: 'mins',
    suffix: ' min',
    baseline: 29.0,
    current: 37.0,
    changePct: 27.6,
    direction: 'up',
    sentiment: 'negative',
    explanation: 'Stretched dispatch time due to store delays and search for missing items.',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'cancellation_rate',
    label: 'Order Cancellation Rate',
    unit: '%',
    suffix: '%',
    baseline: 6.0,
    current: 11.0,
    changePct: 83.3,
    direction: 'up',
    sentiment: 'negative',
    explanation: 'Nearly doubled! 4,235 orders cancelled monthly (₹20.58 Lakh GMV lost).',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'support_tickets',
    label: 'Customer Support Tickets',
    unit: 'tickets/mo',
    baseline: 3100,
    current: 5900,
    changePct: 90.3,
    direction: 'up',
    sentiment: 'negative',
    explanation: 'Support load almost doubled; 9.2 hour resolution across siloed tools.',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'promotional_spend',
    label: 'Promotional Spend',
    unit: '₹ Lakh/mo',
    prefix: '₹',
    suffix: 'L',
    baseline: 9.5,
    current: 17.0,
    changePct: 78.9,
    direction: 'up',
    sentiment: 'negative',
    explanation: 'Increased by ₹7.5L/month; 58% allocated to low-retention discount acquirers.',
    factTag: 'VERIFIED_FACT',
  },
  {
    key: 'revenue',
    label: 'Monthly Net Revenue',
    unit: '₹ Lakh/mo',
    prefix: '₹',
    suffix: 'L',
    baseline: 21.8,
    current: 26.1,
    changePct: 19.7,
    direction: 'up',
    sentiment: 'neutral',
    explanation: 'Gross revenue grew ₹4.3L, but promo spend grew ₹7.5L -> Net contribution shrank!',
    factTag: 'VERIFIED_FACT',
  },
];

export const FINANCIAL_PARADOX = {
  baselineGMV: 31200 * 452, // ₹1,41,02,400
  currentGMV: 38500 * 486, // ₹1,87,11,000
  baselineTakeRate: (21.8 / 141.024) * 100, // 15.46%
  currentTakeRate: (26.1 / 187.11) * 100, // 13.95%
  baselineNetContribution: 21.8 - 9.5, // ₹12.30 L
  currentNetContribution: 26.1 - 17.0, // ₹9.10 L (Decline of ₹3.20 Lakhs/month!)
  monthlyCancellationsCount: Math.round(38500 * 0.11), // 4,235 orders
  monthlyLostGMV: 4235 * 486, // ₹20,58,210
  annualLostGMV: 4235 * 486 * 12, // ₹2.47 Crore
  budgetCeiling: 2500000, // ₹25 Lakhs max for 6 months
};

export const CANCELLATION_REASONS = [
  { reason: 'Product unavailable after order', pct: 35, count: 1482, primaryDriver: 'Inventory Drift & Stale Stock', actionable: true },
  { reason: 'Customer cancelled due to delivery delay', pct: 27, count: 1143, primaryDriver: 'Store delay & search for items', actionable: true },
  { reason: 'Store rejected order during rush', pct: 18, count: 762, primaryDriver: 'Peak in-store rush & manual POS burden', actionable: true },
  { reason: 'Delivery partner unavailable', pct: 12, count: 508, primaryDriver: 'Dispatch timing & rider waiting time', actionable: false },
  { reason: 'Other unclassified', pct: 8, count: 339, primaryDriver: 'Payment/app crash/user misclick', actionable: false },
];

export const SUPPORT_TICKETS_BREAKDOWN = [
  { category: 'Refund status inquiry', pct: 29, count: 1711, avgWaitHours: 9.2, rootCause: 'Separate refund system & delayed cancellation status' },
  { category: 'Delayed delivery status', pct: 24, count: 1416, avgWaitHours: 8.5, rootCause: '13% orders >15m late, no live store preparation tracking' },
  { category: 'Missing / Unavailable items', pct: 19, count: 1121, avgWaitHours: 9.8, rootCause: 'Phantom inventory & silent substitutions without consent' },
  { category: 'Coupon & discount confusion', pct: 13, count: 767, avgWaitHours: 7.1, rootCause: '44% unredeemed coupons, convoluted promo terms' },
  { category: 'Incorrect items fulfilled', pct: 9, count: 531, avgWaitHours: 11.2, rootCause: '8% substituted items done manually in store' },
  { category: 'Other technical / app issues', pct: 6, count: 354, avgWaitHours: 6.4, rootCause: 'General feedback & location errors' },
];

export const CUSTOMER_SIGNALS = [
  { signal: 'Prices/fees feel higher than expected', pct: 38, category: 'pricing' },
  { signal: 'Delivery takes too long (avg 37 min)', pct: 34, category: 'delivery' },
  { signal: 'Products shown available become unavailable after ordering', pct: 29, category: 'inventory' },
  { signal: 'Discounts and promo codes are confusing', pct: 24, category: 'marketing' },
  { signal: 'Prefer purchasing directly from nearby walk-in stores', pct: 21, category: 'retention' },
  { signal: 'Difficult to discover relevant local specialty products', pct: 18, category: 'catalog' },
  { signal: 'Experienced painful refund problems', pct: 16, category: 'support' },
  { signal: 'App experience feels cluttered with generic banners', pct: 14, category: 'ux' },
  { signal: 'Delivery tracking is inaccurate / unresponsive', pct: 11, category: 'delivery' },
];

export const RETENTION_FUNNEL_EVIDENCE = [
  { step: 'New User Registered', users: 1000, conversionPct: 100, detail: 'Initial signup' },
  { step: 'Order 1 Completed', users: 540, conversionPct: 54.0, detail: '54% of new users complete first order (often with 50% discount)' },
  { step: 'Order 2 within 30 days', users: 167, conversionPct: 31.0, detail: 'Severe drop-off: only 31% reorder. 69% churn after discount!' },
  { step: 'Order 3 Completed (Habit Threshold)', users: 120, conversionPct: 72.0, detail: 'Customers reaching 3 orders have 72% probability of ordering monthly!' },
];

export const PARTNER_STORE_EVIDENCE = {
  totalStores: 620,
  cities: ['Mumbai', 'Bengaluru', 'Delhi NCR'],
  categories: ['Gourmet Grocery', 'Local Pharmacy', 'Artisan Bakery', 'Stationery & Books'],
  signals: [
    { label: 'Believe NOVA CART brings valuable incremental business', pct: 46, status: 'positive' },
    { label: 'Say maintaining online inventory requires too much manual effort', pct: 39, status: 'pain_point' },
    { label: 'Believe platform promotions compress their core retail margins', pct: 31, status: 'pain_point' },
    { label: 'Struggle to predict which products will sell online vs in-store', pct: 28, status: 'pain_point' },
    { label: 'Occasionally reject orders during busy walk-in store periods', pct: 23, status: 'pain_point' },
    { label: 'Are actively considering leaving the platform within 12 months', pct: 18, status: 'critical_risk' },
  ],
  syncCadence: [
    { type: 'Multiple times per day (Proactive stores)', pct: 22, avgAccuracy: 88 },
    { type: 'Once daily (End of day / Morning)', pct: 41, avgAccuracy: 64 },
    { type: 'Once every 2-3 days (Severe staleness)', pct: 37, avgAccuracy: 42 },
  ],
};
