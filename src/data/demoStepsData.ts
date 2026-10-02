import { DemoStep } from '@/types';

export const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: 'The Growth Illusion',
    targetTab: 'briefing',
    storyHeading: 'Step 1: Top-Line Expansion Conceals Core Vulnerability',
    narrative:
      'At first glance, NOVA CART appears healthy: Registered users jumped from 82k to 120k (+46%), orders reached 38.5k/month, and monthly revenue rose to ₹26.1L. Leadership is considering a 30% marketing spend increase. But what is really happening beneath the surface?',
    keyMetricHighlight: { label: 'Registered Users', value: '120,000 (+46%)', badge: 'Top-Line Expansion' },
    actionPrompt: 'Review the headline metrics and notice the divergence between gross orders and customer retention.',
  },
  {
    step: 2,
    title: 'The Quality Collapse',
    targetTab: 'briefing',
    storyHeading: 'Step 2: Unit Economics & Retention Deterioration',
    narrative:
      'Disaster strikes in growth quality: Repeat purchase rate crashed from 41% to 27% (-34%). Order cancellations doubled from 6% to 11% (4,235 orders cancelled monthly, leaking ₹20.58L in GMV). Support tickets exploded to 5,900/mo. Most damning: 61% of churned customers had previously rated NOVA CART 4 stars or higher!',
    keyMetricHighlight: { label: 'Repeat Purchase Rate', value: '27% (Crashed from 41%)', badge: 'Quality Collapse' },
    actionPrompt: 'Observe the Financial Paradox: Promotional spend surged by ₹7.5L to generate only ₹4.3L in gross revenue.',
  },
  {
    step: 3,
    title: 'Investigating Competing Causes',
    targetTab: 'opportunity',
    storyHeading: 'Step 3: Five Competing Hypotheses Evaluated',
    narrative:
      'We did not assume the answer. We rigorously stress-tested 5 competing hypotheses against the case data: H1 (Retention CRM), H2 (Delivery Fleet & Speed), H3 (Inventory Accuracy & Store Sync), H4 (Marketing Spend Cut), and H5 (Local Store Differentiation).',
    keyMetricHighlight: { label: 'Root Cause Score', value: 'H3: 47/50 (Winner)', badge: 'Hypothesis Evaluation' },
    actionPrompt: 'Compare the decision matrix scores across all 5 hypotheses to see why fleet expansion and simple loyalty programs fail.',
  },
  {
    step: 4,
    title: 'Connecting the Evidence',
    targetTab: 'diagnosis',
    storyHeading: 'Step 4: Interactive Causal Web Analysis',
    narrative:
      'Click through the Causal Node Map to trace the operational domino effect: Stale Store Inventory (FACT) -> Extended Delivery Latency (FACT) -> Order Cancellations (35% unavailable stock, 18% store rejections) -> 9.2h Support & Refund Queues (FACT) -> 61% High-Rater Churn (FACT) -> Margin Collapse.',
    keyMetricHighlight: { label: 'Root Failure Chain', value: 'Ghost Stock -> 11% Cancel -> Churn', badge: 'Causal Tracing' },
    actionPrompt: 'Click on "Manual & Stale Inventory" and "Order Cancellations Spiking" to inspect case facts vs inferences.',
  },
  {
    step: 5,
    title: 'The Breakthrough Opportunity',
    targetTab: 'opportunity',
    storyHeading: 'Step 5: The Winning Product — NOVA NEXUS',
    narrative:
      'The evidence proves that NOVA CART must build "NOVA NEXUS: Local Merchant Orchestration & Predictive Catalog Engine". It solves the merchant burden with 1-tap WhatsApp sync, eliminates phantom inventory, prevents peak rush rejections, and unlocks the 72% repeat retention threshold via 3-Order Multi-Category Habit Loops.',
    keyMetricHighlight: { label: 'Selected Digital Product', value: 'NOVA NEXUS Engine', badge: 'Targeted Intervention' },
    actionPrompt: 'Review the rigorous "Why This Problem? Why Now? Why Digital? Why Within ₹25L?" justification.',
  },
  {
    step: 6,
    title: 'NOVA NEXUS in Action',
    targetTab: 'dashboard',
    storyHeading: 'Step 6: Live 620-Store Operational Command Center',
    narrative:
      'Enter the live product! NOVA NEXUS monitors 620 partner stores across Mumbai, Bengaluru, and Delhi NCR in real time. It flags the 37% of stores with stale inventory (>24h), tracks live phantom stock probability, and gives merchants a 1-tap "Rush Pause" to prevent walk-in order rejections.',
    keyMetricHighlight: { label: 'Network Monitored', value: '620 Stores / 3 Metros', badge: 'Live Telemetry' },
    actionPrompt: 'Inspect the store cards and filter by city or risk category to see real-time merchant health scores.',
  },
  {
    step: 7,
    title: 'Interactive Core Workflow',
    targetTab: 'workflow',
    storyHeading: 'Step 7: Input -> Processing -> Decision -> Action -> Output',
    narrative:
      'Experience the functional workflow rescuing a live customer order: Order #ORD-8942-BLR (Ananya Sharma, Order #2) contains artisanal sourdough from Thom’s Bakery with 36h stale inventory. The system detects an 82% phantom stock risk, auto-routes to a sister artisan 0.8km away, and sends a 1-tap customer approval, protecting ₹640 GMV and saving the customer from churn!',
    keyMetricHighlight: { label: 'Order Rescued', value: 'ORD-8942-BLR (Order #2)', badge: 'Live Core Workflow' },
    actionPrompt: 'Click the "Execute Digital Intervention" button to process the recommendation and observe live resolution.',
  },
  {
    step: 8,
    title: 'Simulating Interventions',
    targetTab: 'simulator',
    storyHeading: 'Step 8: Interactive Scenario Modeling & Elasticity',
    narrative:
      'Test management interventions using our dynamic simulator. Move the Smart Sync adoption dial to 80% and Rush Buffer to 75%. Watch repeat purchase rate climb from 27% to 38.4%, cancellation rate drop from 11% to 4.2%, and support tickets plunge by 62%. Inspect the transparent underlying mathematical formulas!',
    keyMetricHighlight: { label: 'Simulated Repeat Rate', value: '38.4% (vs 27% current)', badge: 'Interactive Simulation' },
    actionPrompt: 'Adjust the sliders to test conservative vs aggressive adoption scenarios and inspect model assumptions.',
  },
  {
    step: 9,
    title: 'Financial & Business Impact',
    targetTab: 'impact',
    storyHeading: 'Step 9: Rigorous ROI & Payback Proof',
    narrative:
      'Comparing Current State vs Projected State across 9 KPIs: Net monthly contribution rises from ₹9.1L to ₹16.4L (+₹7.3L/mo). Across 12 months, NOVA NEXUS creates ₹68.4 Lakhs in protected GMV and cost savings. Payback on the ₹25L implementation budget is achieved in just 3.7 months!',
    keyMetricHighlight: { label: 'Capital Payback', value: '3.7 Months (ROI: 274%)', badge: 'Proven Business Impact' },
    actionPrompt: 'Review the KPI variance table and verified disclaimer on configurable assumptions.',
  },
  {
    step: 10,
    title: '₹25L Six-Month Execution Roadmap',
    targetTab: 'roadmap',
    storyHeading: 'Step 10: Disciplined, Realistic 6-Month Plan',
    narrative:
      'Every rupee is accounted for: Total cost is exactly ₹25,00,000 across 6 months. Month 1 (Core WhatsApp Bot & Architecture: ₹4.0L), Month 2 (Bangalore 50-Store Pilot: ₹4.5L), Month 3 (Sister-Store Router: ₹4.5L), Month 4 (3-Order Habit Loop Engine: ₹4.0L), Month 5 (Multi-City Scaling: ₹4.0L), Month 6 (Unified Support Console & Network: ₹2.5L), plus ₹1.5L Contingency.',
    keyMetricHighlight: { label: 'Budget Feasibility', value: '₹25,00,000 (100% Compliant)', badge: 'Execution Blueprint' },
    actionPrompt: 'Inspect the month-by-month initiatives, designated owners, measurable milestones, and budget pie chart.',
  },
];
