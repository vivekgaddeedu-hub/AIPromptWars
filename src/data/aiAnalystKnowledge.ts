export interface AnalystQA {
  id: string;
  question: string;
  category: string;
  shortAnswer: string;
  detailedAnalysis: string[];
  evidenceCitations: { fact: string; source: string; impact: string }[];
  targetTab: string;
  recommendedAction: string;
}

export const PRESET_QUESTIONS: AnalystQA[] = [
  {
    id: 'q-retention',
    question: 'Why is retention declining?',
    category: 'Customer Retention & Churn',
    shortAnswer:
      'Retention collapsed from 41% to 27% because loyal customers are experiencing fulfillment failures (ghost stock & delay) right at the critical 1st-to-3rd order habit formation window.',
    detailedAnalysis: [
      '61% of customers who stopped ordering had previously rated NOVA CART 4 stars or higher. This confirms churn is NOT caused by product disinterest, but by broken operational trust.',
      'Only 31% of users make a 2nd order within 30 days. The drop-off happens immediately after the first purchase.',
      '29% of customer complaints cite products shown as available becoming unavailable post-ordering, and 34% cite excessive delivery times (37 mins).',
      'The case proves: "Customers completing 3 orders have a 72% probability of ordering again the following month." Because fulfillment fails on Order 1 or 2, customers never reach this 72% habit threshold.',
    ],
    evidenceCitations: [
      { fact: 'Repeat purchase rate dropped 41% -> 27%', source: 'Case § Current Metrics', impact: '34.1% relative collapse in returning buyers' },
      { fact: '61% churned users rated 4+ stars', source: 'Case § Customer Signals', impact: 'Lost high-value advocates due to operational failures' },
      { fact: '3-order completion unlocks 72% repeat rate', source: 'Case § Customer Behavior', impact: 'Key leverage point for sustainable growth' },
    ],
    targetTab: 'diagnosis',
    recommendedAction: 'Simulate the 3-Order Habit Loop intervention and eliminate phantom inventory to protect Order 1 and 2.',
  },
  {
    id: 'q-cancellations',
    question: 'What is causing cancellations?',
    category: 'Operations & Fulfillment',
    shortAnswer:
      'Cancellations spiked from 6% to 11% (4,235 orders/month) primarily driven by phantom inventory (35%), delivery delays (27%), and store rush rejections (18%).',
    detailedAnalysis: [
      '35% of cancellations (1,482 orders/mo) happen because the ordered item was physically missing from the store shelf despite showing in-stock on the app.',
      '18% of cancellations (762 orders/mo) happen because partner stores reject orders during walk-in peak hours (23% of stores admit doing this).',
      '27% of cancellations (1,143 orders/mo) are customer-initiated due to delivery times stretching to 37 minutes.',
      'Combined, inventory and store operational friction account for 53% of all cancellations (2,244 orders/month, or ₹10.9L in lost GMV).',
    ],
    evidenceCitations: [
      { fact: 'Cancellation rate doubled from 6% to 11%', source: 'Case § Current Metrics', impact: '₹20.58 Lakh GMV destroyed every month' },
      { fact: '35% caused by unavailable stock', source: 'Case § Operations', impact: '1,482 disappointed shoppers monthly' },
      { fact: '18% caused by store rejections', source: 'Case § Operations', impact: '762 rejections during store rush' },
    ],
    targetTab: 'workflow',
    recommendedAction: 'Deploy NOVA NEXUS 1-tap "Rush Mode" and predictive inventory buffer to cut cancellations by 62%.',
  },
  {
    id: 'q-stores',
    question: 'Which stores require attention?',
    category: 'Merchant Health & Churn',
    shortAnswer:
      '37% of stores that update inventory only once every 1–3 days and the 18% of merchants actively considering leaving the platform require urgent digital intervention.',
    detailedAnalysis: [
      '39% of partner stores complain that manual inventory maintenance is too tedious. Without automated tools, their stock drift exceeds 48 hours.',
      '23% of stores occasionally reject orders during physical rush periods because they have no way to temporarily pause incoming demand without losing their rank.',
      '31% believe platform promotions compress their margins, causing resentment.',
      '18% (112 stores) are considering exiting within 12 months, which would severely degrade neighborhood catalog coverage.',
    ],
    evidenceCitations: [
      { fact: '39% say inventory effort is too high', source: 'Case § Partner Store Signals', impact: 'Results in 37% updating only every 1-3 days' },
      { fact: '18% considering leaving within next year', source: 'Case § Partner Store Signals', impact: 'Existential threat to merchant network density' },
      { fact: '31% say promos hurt margins', source: 'Case § Partner Store Signals', impact: 'Merchant dissatisfaction and high rejection rates' },
    ],
    targetTab: 'dashboard',
    recommendedAction: 'Filter the Product Dashboard by "Critical Phantom Risk" to see specific stores in Bandra, Frazer Town, and South Ext.',
  },
  {
    id: 'q-marketing',
    question: 'Where are we wasting promotional spending?',
    category: 'Marketing Efficiency & Unit Economics',
    shortAnswer:
      'NOVA CART is wasting at least ₹6.0L - ₹8.0L/month on top-of-funnel blanket discounts (58% of ₹17L budget) where 44% of coupons are never redeemed and discount-acquired users churn immediately.',
    detailedAnalysis: [
      'Promotional spend surged 78.9% from ₹9.5L to ₹17L/month, but revenue only grew 19.7% (₹21.8L to ₹26.1L).',
      'Net monthly contribution after promotions declined from ₹12.3L down to ₹9.1L — a 26% margin compression.',
      '44% of promotional coupons are never redeemed, indicating poor relevance and cluttered UX.',
      '58% of the budget is poured into acquiring new users who show low long-term retention compared to organic users.',
      'Management’s proposed 30% budget boost (+₹5.1L) would worsen unit economics without fixing repeat purchase rates.',
    ],
    evidenceCitations: [
      { fact: 'Promo spend jumped ₹9.5L -> ₹17L/mo (+79%)', source: 'Case § Current Metrics', impact: 'Revenue grew only 19.7%, compressing net margin' },
      { fact: '44% of promo coupons never redeemed', source: 'Case § Customer Behavior', impact: 'Severe budget inefficiency and user discount fatigue' },
      { fact: '58% spent on new acquisition with low retention', source: 'Case § Marketing', impact: 'Leaky bucket syndrome' },
    ],
    targetTab: 'opportunity',
    recommendedAction: 'Reallocate ₹6L/mo from acquisition vouchers to 2nd and 3rd order multi-category neighborhood habit loops.',
  },
  {
    id: 'q-investigate',
    question: 'What should NOVA CART investigate first?',
    category: 'Strategic Prioritization',
    shortAnswer:
      'Investigate the "Phantom Stock to Cancellation to Support Ticket" causal chain. It is the single largest operational leak destroying customer retention and staff capacity.',
    detailedAnalysis: [
      'The causal map reveals that stale inventory triggers phantom stock (29%), which triggers cancellations (35%), which triggers delayed refunds (29% of tickets), which triggers 5,900 monthly support tickets taking 9.2 hours each.',
      'Fixing this chain stops the churn of 61% 4+ star customers and frees up support bandwidth.',
      'It also immediately protects ₹10.9L in monthly cancellations without requiring expensive fleet or warehouse investments.',
    ],
    evidenceCitations: [
      { fact: 'Support tickets surged from 3,100 to 5,900/mo', source: 'Case § Current Metrics', impact: 'Average resolution latency is 9.2 hours' },
      { fact: '29% refund inquiries + 19% missing items = 48% tickets', source: 'Case § Customer Support', impact: 'Almost half of all support load is caused by stockouts' },
    ],
    targetTab: 'diagnosis',
    recommendedAction: 'Open the Business Diagnosis tab to inspect the interactive Causal Node Map.',
  },
  {
    id: 'q-leverage',
    question: 'How can NOVA CART leverage local stores?',
    category: 'Competitive Moat & Local Commerce',
    shortAnswer:
      'Leverage the 620 local stores as a unique, high-margin, curated specialty catalog that quick-commerce dark stores cannot replicate, linked via multi-category baskets.',
    detailedAnalysis: [
      'Commodity 10-minute dark stores only carry 2,000–3,000 generic SKUs. NOVA CART has 620 independent bakeries, pharmacies, gourmet stores, and stationeries with deep regional catalogs.',
      'Case data demonstrates: "Customers purchasing across multiple store categories show higher repeat usage."',
      'Instead of competing on raw delivery speed (which costs millions), NOVA CART should compete on curated local variety: "The Best of Your Neighborhood".',
      'By offering multi-category neighborhood passes (e.g. Sourdough from Thom’s Bakery + Organic Cheese from Namdhari’s), NOVA CART creates an uncopyable local moat.',
    ],
    evidenceCitations: [
      { fact: '620 independent local stores across 3 cities', source: 'Case § Background', impact: 'Unmatched long-tail SKU breadth' },
      { fact: 'Multi-category shoppers show higher repeat usage', source: 'Case § Customer Behavior', impact: 'Proven behavioral lever for LTV expansion' },
      { fact: '21% prefer buying in physical stores', source: 'Case § Customer Signals', impact: 'Unmet demand for digital merchant curation' },
    ],
    targetTab: 'recommendations',
    recommendedAction: 'Explore the "Neighborhood Multi-Category Habit Loop" in the Recommendations section.',
  },
  {
    id: 'q-simulate',
    question: 'Which intervention should management simulate?',
    category: 'Simulation & Impact Modeling',
    shortAnswer:
      'Simulate the combined "Smart Inventory Sync (80%) + Rush Mode Buffer (75%) + 3-Order Habit Loop (35%)" intervention in the Simulator tab.',
    detailedAnalysis: [
      'This balanced intervention models the full deployment of NOVA NEXUS within the ₹25L budget.',
      'Projected results based on case elasticities: Repeat rate climbs from 27% to 38.4%, cancellation rate drops from 11% to 4.2%, and support tickets decrease from 5,900 to 2,240/mo.',
      'Net monthly revenue after promotions expands from ₹9.1L to ₹16.4L (+80.2% increase in monthly cash generation).',
    ],
    evidenceCitations: [
      { fact: 'Current baseline: 27% repeat, 11% cancel, ₹9.1L net contribution', source: 'Case § Current Metrics', impact: 'Stagnant unit economics' },
      { fact: 'Projected state: 38.4% repeat, 4.2% cancel, ₹16.4L net contribution', source: 'Economic Impact Model', impact: 'Payback on ₹25L budget in 3.7 months' },
    ],
    targetTab: 'simulator',
    recommendedAction: 'Click to open the Intervention Simulator and adjust the sliders to test sensitivity.',
  },
];

export function answerAnalystQuery(query: string): AnalystQA {
  const clean = query.toLowerCase().trim();
  
  if (clean.includes('retention') || clean.includes('churn') || clean.includes('repeat') || clean.includes('loyal')) {
    return PRESET_QUESTIONS[0];
  }
  if (clean.includes('cancellation') || clean.includes('cancel') || clean.includes('reject') || clean.includes('delay')) {
    return PRESET_QUESTIONS[1];
  }
  if (clean.includes('store') || clean.includes('merchant') || clean.includes('partner') || clean.includes('leave')) {
    return PRESET_QUESTIONS[2];
  }
  if (clean.includes('market') || clean.includes('promo') || clean.includes('coupon') || clean.includes('spend') || clean.includes('discount')) {
    return PRESET_QUESTIONS[3];
  }
  if (clean.includes('investigate') || clean.includes('first') || clean.includes('diagnos') || clean.includes('problem')) {
    return PRESET_QUESTIONS[4];
  }
  if (clean.includes('leverage') || clean.includes('local') || clean.includes('compet') || clean.includes('advantage') || clean.includes('dark store')) {
    return PRESET_QUESTIONS[5];
  }
  if (clean.includes('simulat') || clean.includes('interven') || clean.includes('roi') || clean.includes('scenario')) {
    return PRESET_QUESTIONS[6];
  }

  // Default synthesis answer
  return {
    id: 'q-custom',
    question: query,
    category: 'Custom Analytical Synthesis',
    shortAnswer:
      `Based on the case data, NOVA CART's core challenge is the breakdown in fulfillment trust (phantom inventory causing 35% cancellations, 23% store rejections, and 61% churn among 4+ star raters).`,
    detailedAnalysis: [
      'The case provides clear evidence that top-of-funnel acquisition is active (54% first-order conversion), but customers churn before completing their 3rd order.',
      'Reaching 3 orders yields a 72% probability of sustained monthly ordering, and multi-category buyers show even higher lifetime repeat rates.',
      'Therefore, the single intervention must eliminate phantom inventory and store rejections at the merchant level while guiding users across 3 store categories.',
    ],
    evidenceCitations: [
      { fact: '35% cancellations due to unavailable stock', source: 'Case § Operations', impact: 'Direct operational breakdown' },
      { fact: 'Repeat rate 27% vs 41% baseline', source: 'Case § Current Metrics', impact: 'Primary symptom of lost trust' },
      { fact: '₹25L budget constraint', source: 'Case § Financial Constraint', impact: 'Excludes dark-store/warehouse expansion' },
    ],
    targetTab: 'diagnosis',
    recommendedAction: 'Explore the Opportunity Analysis tab to see the complete decision matrix.',
  };
}
