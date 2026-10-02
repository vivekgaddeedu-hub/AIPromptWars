import { CausalNode } from '@/types';

export const CAUSAL_NODES: CausalNode[] = [
  {
    id: 'inventory',
    title: 'Manual & Stale Inventory',
    category: 'FACT',
    group: 'operations',
    x: 100,
    y: 120,
    caseEvidence: [
      'Partner stores manually maintain inventory (Case § Operations).',
      'Some update stock multiple times per day; others update stock only once every 1–3 days.',
      '39% of partner stores say maintaining online inventory requires too much effort (Case § Partner Store Signals).',
      '19% of customers repeatedly search for unavailable products (Case § Customer Behavior).',
      '29% of customer complaints cite products shown as available becoming unavailable after ordering (Case § Customer Signals).',
    ],
    relatedMetrics: [
      { label: 'Ghost Stock Complaints', value: '29%', bad: true },
      { label: 'Stores Updating 1-3 Days', value: '37%', bad: true },
      { label: 'Unfulfilled Searches', value: '19%', bad: true },
    ],
    possibleCauses: [
      'No automated POS integration; merchants rely on manual item toggling on mobile screens.',
      'Physical store walk-ins deplete physical shelves without synchronizing the digital catalog.',
      'Merchants lack real-time stock velocity alerts or low-stock buffer thresholds.',
    ],
    businessConsequence:
      'Creates "Phantom Inventory" across the consumer app, inviting orders that cannot physically be fulfilled and poisoning the customer first impression.',
    connectedTo: ['cancellations', 'delivery', 'store_health'],
  },
  {
    id: 'delivery',
    title: 'Extended Delivery Latency',
    category: 'FACT',
    group: 'logistics',
    x: 320,
    y: 80,
    caseEvidence: [
      'Average delivery time stretched from 29 to 37 minutes (+27.6%) (Case § Current Metrics).',
      '13% of orders arrive more than 15 minutes after estimated time (Case § Operations).',
      '34% of customers report that delivery takes too long (Case § Customer Signals).',
      '11% report delivery tracking is inaccurate (Case § Customer Signals).',
    ],
    relatedMetrics: [
      { label: 'Avg Delivery Time', value: '37 min (was 29 min)', trend: 'up', bad: true },
      { label: 'Late Delivery (>15m)', value: '13%', bad: true },
      { label: 'Delivery Delay Feedback', value: '34%', bad: true },
    ],
    possibleCauses: [
      'Delivery partners wait at merchant counters while merchants scramble to locate or substitute missing items.',
      'Store rush periods cause in-store queues, delaying order handover to riders.',
      'Rider dispatch occurs before order packaging is confirmed by the merchant.',
    ],
    businessConsequence:
      'Triggers customer impatience, leading directly to 27% of order cancellations and generating 1,416 support tickets monthly.',
    connectedTo: ['cancellations', 'customer_experience'],
  },
  {
    id: 'cancellations',
    title: 'Order Cancellations Spiking',
    category: 'FACT',
    group: 'operations',
    x: 350,
    y: 220,
    caseEvidence: [
      'Order cancellation rate surged from 6% to 11% (Case § Current Metrics).',
      '35% of cancellations are due to "Product unavailable" (Case § Operations).',
      '27% due to "Customer cancelled because of delay" (Case § Operations).',
      '18% due to "Store rejected order during busy periods" (Case § Operations).',
      '12% due to "Delivery partner unavailable" (Case § Operations).',
    ],
    relatedMetrics: [
      { label: 'Cancellation Rate', value: '11% (was 6%)', trend: 'up', bad: true },
      { label: 'Monthly Cancelled Orders', value: '4,235 orders/mo', bad: true },
      { label: 'Monthly Lost GMV', value: '₹20.58 Lakhs/mo', bad: true },
    ],
    possibleCauses: [
      'Combined effect of phantom inventory (35%), delivery drag (27%), and store counter over-capacity (18%).',
      'Lack of automated substitute suggestion or sister-store routing when an item is out of stock.',
    ],
    businessConsequence:
      'Directly destroys ₹20.58L in potential GMV every month, frustrates customers right at the point of gratification, and triggers immediate refund demands.',
    connectedTo: ['refunds', 'support', 'customer_experience'],
  },
  {
    id: 'refunds',
    title: 'Refund Friction & Blockages',
    category: 'INFERENCE',
    group: 'financial',
    x: 580,
    y: 180,
    caseEvidence: [
      '16% of customer signals cite experiencing painful refund problems (Case § Customer Signals).',
      '29% of all support tickets (1,711/mo) are customers asking about "Refund status" (Case § Customer Support).',
      'Orders, refunds, and store communication are currently handled through separate systems (Case § Customer Support).',
      'Average ticket resolution time is 9.2 hours (Case § Customer Support).',
    ],
    relatedMetrics: [
      { label: 'Refund Inquiries Share', value: '29% of tickets', bad: true },
      { label: 'Avg Resolution Time', value: '9.2 hours', bad: true },
      { label: 'Refund Complaint Rate', value: '16%', bad: true },
    ],
    possibleCauses: [
      'Disconnected payment gateway reconciliation; refund triggers must be manually verified across isolated tools.',
      'Stores cancel items in one system while customer payment sits locked in another.',
    ],
    businessConsequence:
      'Transforms a bad fulfillment experience into an acute trust breach. Customers feel the platform is holding their money hostage.',
    connectedTo: ['support', 'customer_experience'],
  },
  {
    id: 'support',
    title: 'Customer Support Congestion',
    category: 'FACT',
    group: 'operations',
    x: 600,
    y: 320,
    caseEvidence: [
      'Customer support tickets surged from 3,100 to 5,900 tickets/month (+90.3%) (Case § Current Metrics).',
      'Breakdown: 29% Refund status, 24% Delayed delivery, 19% Missing/unavailable products, 13% Coupon problems (Case § Customer Support).',
      'Average resolution time sits at 9.2 hours (Case § Customer Support).',
      'Orders, refunds and store communication run on separate siloed systems (Case § Customer Support).',
    ],
    relatedMetrics: [
      { label: 'Monthly Tickets', value: '5,900 (was 3,100)', trend: 'up', bad: true },
      { label: 'Avg Resolution Latency', value: '9.2 hours', bad: true },
      { label: 'Support Load Ratio', value: '15.3% of all orders', bad: true },
    ],
    possibleCauses: [
      'Agents lack a single-pane-of-glass interface to see store inventory, rider tracking, and razorpay/stripe refund state simultaneously.',
      'Manual phone calls between support agents and local shopkeepers to confirm missing items.',
    ],
    businessConsequence:
      'Agent burnout, massive operational overhead, and delayed resolutions that guarantee disgruntled customers will never reorder.',
    connectedTo: ['customer_experience'],
  },
  {
    id: 'customer_experience',
    title: 'Degraded Customer Experience',
    category: 'INFERENCE',
    group: 'customer',
    x: 480,
    y: 440,
    caseEvidence: [
      '61% of customers who stopped ordering had previously rated NOVA CART 4 stars or higher! (Case § Customer Signals).',
      'Only 31% place a second order within 30 days (Case § Customer Behavior).',
      '38% feel prices/fees are higher than expected; 24% find discounts confusing; 14% say app feels cluttered (Case § Customer Signals).',
      'Customers acquired via large first-order discounts show lower long-term retention (Case § Customer Behavior).',
    ],
    relatedMetrics: [
      { label: 'Churned High-Raters', value: '61% (rated 4+ stars)', bad: true },
      { label: 'Day-30 Reorder Rate', value: '31%', bad: true },
      { label: 'Coupon Wastage', value: '44% unredeemed', bad: true },
    ],
    possibleCauses: [
      'Bait-and-switch feeling: Customer sees an appealing item, places order, waits 37 minutes, item is cancelled, refund takes 9.2 hours.',
      'Platform feels like a generic discount bazaar rather than a delightful neighborhood shopping guide.',
    ],
    businessConsequence:
      'Destroys word-of-mouth advocacy and breaks customer habit formation right after the first purchase.',
    connectedTo: ['retention'],
  },
  {
    id: 'retention',
    title: 'Customer Retention Collapse',
    category: 'FACT',
    group: 'customer',
    x: 320,
    y: 560,
    caseEvidence: [
      'Repeat purchase rate collapsed from 41% to 27% (-34.1% relative drop) (Case § Current Metrics).',
      'Customers completing 3 orders have a 72% probability of ordering again the following month (Case § Customer Behavior).',
      'Customers purchasing across multiple store categories show higher repeat usage (Case § Customer Behavior).',
      '44% of promotional coupons are never redeemed (Case § Customer Behavior).',
    ],
    relatedMetrics: [
      { label: 'Repeat Purchase Rate', value: '27% (was 41%)', trend: 'down', bad: true },
      { label: '3-Order Habit Threshold', value: '72% retention', bad: false },
      { label: '1st to 2nd Order Drop', value: '69% drop-off', bad: true },
    ],
    possibleCauses: [
      'Users drop out before reaching the magic 3-order threshold due to an early fulfillment failure.',
      'Discount hunter cohorts have zero platform stickiness and leave the moment coupons stop.',
      'Lack of multi-category basket incentives to cross-pollinate grocery, pharmacy, and bakery shoppers.',
    ],
    businessConsequence:
      'Creates a "Leaky Bucket" where millions of rupees in ad spend pour in, only for customers to evaporate after their subsidized first order.',
    connectedTo: ['marketing_spend', 'revenue'],
  },
  {
    id: 'marketing_spend',
    title: 'Aggressive Leaky-Bucket Ad Spend',
    category: 'FACT',
    group: 'financial',
    x: 100,
    y: 540,
    caseEvidence: [
      'Promotional spend escalated from ₹9.5L to ₹17L/month (+78.9%) (Case § Current Metrics).',
      '58% of marketing budget focuses on acquiring new customers (Case § Marketing).',
      'Management is considering increasing marketing spend by another 30% (+₹5.1L/mo) (Case § Marketing).',
      'Finance questions the quality and cost of growth (Case § Marketing).',
    ],
    relatedMetrics: [
      { label: 'Monthly Promo Spend', value: '₹17.0L (was ₹9.5L)', trend: 'up', bad: true },
      { label: 'New User Ad Share', value: '58% of budget', bad: true },
      { label: 'Spend-to-Rev Growth Ratio', value: '4.0x mismatch', bad: true },
    ],
    possibleCauses: [
      'Management attempting to hit top-line order targets by artificially subsidizing first-order acquisitions.',
      'Marketing department evaluated on gross user registrations (120k) rather than 30-day cohort retention.',
    ],
    businessConsequence:
      'Severe margin compression: Spend rose by ₹7.5L to yield just ₹4.3L in gross revenue growth, creating an unsustainable cash burn rate.',
    connectedTo: ['revenue'],
  },
  {
    id: 'revenue',
    title: 'Net Margin Deterioration',
    category: 'FACT',
    group: 'financial',
    x: 220,
    y: 380,
    caseEvidence: [
      'Revenue grew from ₹21.8L to ₹26.1L/month (+19.7%) (Case § Current Metrics).',
      'Net contribution after promo spend shrank from ₹12.3L (₹21.8L - ₹9.5L) down to ₹9.1L (₹26.1L - ₹17L) — a 26% decline in cash generation!',
      'Take rate compressed from 15.46% down to 13.95% as coupon write-offs eroded commission fees.',
      '₹20.58L in GMV lost every single month to cancellations.',
    ],
    relatedMetrics: [
      { label: 'Net After-Promo Rev', value: '₹9.1L (was ₹12.3L)', trend: 'down', bad: true },
      { label: 'Effective Take Rate', value: '13.95% (was 15.46%)', trend: 'down', bad: true },
      { label: 'Monthly Lost GMV', value: '₹20.58 Lakhs', bad: true },
    ],
    possibleCauses: [
      'Promotion expansion outpaced order growth; high cancellation rate prevented earned commission from closing.',
      'Customer support ticket resolution costs and refund reconciliation fees consume platform margin.',
    ],
    businessConsequence:
      'Threatens the company runway and viability. Without addressing the underlying operational leak, scaling marketing will accelerate insolvency.',
    connectedTo: ['store_health'],
  },
  {
    id: 'store_health',
    title: 'Partner Store Fatigue & Churn Risk',
    category: 'FACT',
    group: 'merchant',
    x: 80,
    y: 280,
    caseEvidence: [
      '620 partner stores across 3 cities (Case § Background).',
      '46% believe NOVA CART brings valuable additional customers (Case § Partner Store Signals).',
      '39% say maintaining online inventory requires too much manual effort (Case § Partner Store Signals).',
      '31% believe promotions reduce their margins (Case § Partner Store Signals).',
      '28% struggle to predict which products will sell online (Case § Partner Store Signals).',
      '23% occasionally reject orders during busy periods (Case § Partner Store Signals).',
      '18% are actively considering leaving the platform within the next year! (Case § Partner Store Signals).',
    ],
    relatedMetrics: [
      { label: 'Stores Considering Exit', value: '18% (112 stores)', bad: true },
      { label: 'Inventory Burden Complaint', value: '39%', bad: true },
      { label: 'Rush Hour Rejection', value: '23%', bad: true },
      { label: 'Margin Complaint', value: '31%', bad: true },
    ],
    possibleCauses: [
      'Platform asks stores to do manual clerical inventory work without providing automated tools.',
      'Deep promotional discounts are perceived as squeezing local retail profit margins.',
      'Store owners get penalised or stressed during peak in-store walk-in hours with unexpected online orders.',
    ],
    businessConsequence:
      'Losing 18% of merchant partners will destroy local catalog density, reducing variety and worsening delivery distance for remaining customers.',
    connectedTo: ['inventory'],
  },
];
