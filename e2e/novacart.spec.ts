import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('NOVA CART Enterprise E2E & Accessibility Suite', () => {
  // E2E Journey 1: Application Launch & Executive Overview
  test('E2E 1: Application loads, KPI cards render, and navigation works', async ({ page }) => {
    await page.goto('/');

    // Check title and executive headline
    await expect(page).toHaveTitle(/NOVA CART/i);
    await expect(page.locator('h1')).toContainText('If NOVA CART could build one digital product');

    // Verify key KPI metric cards are rendered with verified facts
    await expect(page.getByText('Registered Users', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Repeat Purchase Rate', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Order Cancellation Rate', { exact: true }).first()).toBeVisible();

    // Verify tab navigation to Causal Diagnosis
    const diagTab = page.locator('#tab-nav-diagnosis');
    await diagTab.click();
    await expect(page.getByText('Systemic Causal Web')).toBeVisible();

    // Verify navigation to Opportunity Matrix
    const oppTab = page.locator('#tab-nav-opportunity');
    await oppTab.click();
    await expect(page.getByText('Evaluating 5 Competing Hypotheses')).toBeVisible();
  });

  // E2E Journey 2: Complete 10-Step Guided Demo Mode Journey
  test('E2E 2: Complete 10-Step Guided Demo Mode walkthrough', async ({ page }) => {
    await page.goto('/');

    // Start 5-Min Judge Demo
    const startDemoBtn = page.locator('#btn-start-demo-mode');
    await startDemoBtn.click();

    // Verify DemoBanner appears at Step 1
    await expect(page.getByText('JUDGE DEMO MODE')).toBeVisible();
    await expect(page.getByText(/Step 1 of 10/i)).toBeVisible();

    const nextBtn = page.getByRole('button', { name: 'Next demo step' });

    // Step 2: Business Diagnosis
    await nextBtn.click();
    await expect(page.getByText(/Step 2 of 10/i)).toBeVisible();

    // Step 3: Evidence Vault
    await nextBtn.click();
    await expect(page.getByText(/Step 3 of 10/i)).toBeVisible();

    // Step 4: Opportunity Analysis
    await nextBtn.click();
    await expect(page.getByText(/Step 4 of 10/i)).toBeVisible();

    // Step 5: Product Dashboard (NOVA NEXUS)
    await nextBtn.click();
    await expect(page.getByText(/Step 5 of 10/i)).toBeVisible();

    // Step 6: Core Workflow
    await nextBtn.click();
    await expect(page.getByText(/Step 6 of 10/i)).toBeVisible();

    // Step 7: Recommendations
    await nextBtn.click();
    await expect(page.getByText(/Step 7 of 10/i)).toBeVisible();

    // Step 8: Interventions
    await nextBtn.click();
    await expect(page.getByText(/Step 8 of 10/i)).toBeVisible();

    // Step 9: Simulator
    await nextBtn.click();
    await expect(page.getByText(/Step 9 of 10/i)).toBeVisible();

    // Step 10: Business Impact & Implementation Plan
    await nextBtn.click();
    await expect(page.getByText(/Step 10 of 10/i)).toBeVisible();

    // Verify Next button is disabled on Step 10
    await expect(nextBtn).toBeDisabled();

    // Exit demo mode
    const closeBtn = page.locator('button[title="Exit demo mode"]');
    await closeBtn.click();
    await expect(page.getByText('JUDGE DEMO MODE')).not.toBeVisible();
  });

  // E2E Journey 3: Intervention Simulator Live Reactivity
  test('E2E 3: Intervention Simulator dials dynamically update projected metrics', async ({ page }) => {
    await page.goto('/');

    // Navigate to Simulator
    const simTab = page.locator('#tab-nav-simulator');
    await simTab.click();

    // Verify controls
    await expect(page.getByText('Configurable Operational Levers')).toBeVisible();
    await expect(page.getByText('Simulated Macro Outcome vs Current Baseline')).toBeVisible();

    // Open Assumption Inspector
    const inspectBtn = page.getByRole('button', { name: /Inspect Assumptions/i });
    await inspectBtn.click();
    await expect(page.getByText(/Transparent Model Assumptions & Formulas/i)).toBeVisible();

    // Switch to Aggressive preset
    const aggressiveBtn = page.getByRole('button', { name: /Aggressive/i });
    await aggressiveBtn.click();

    // Verify projected metrics updated
    await expect(page.getByText('95%').first()).toBeVisible();
  });

  // E2E Journey 4: Google Maps Proximity Routing & Fallback
  test('E2E 4: Google Maps fallback radar operates reliably with store telemetry', async ({ page }) => {
    await page.goto('/');

    // Navigate to Map
    const mapTab = page.locator('#tab-nav-map');
    await mapTab.click();

    // Verify headline and 6-step local commerce strategy pipeline
    await expect(page.getByText('NOVA LOCAL MAP')).toBeVisible();
    await expect(page.getByText(/Hyperlocal Alternative Routing Logic/i)).toBeVisible();
    await expect(page.getByText(/1. PRODUCT UNAVAILABLE/i)).toBeVisible();
    await expect(page.getByText(/6. REDUCE CANCELLATION RISK/i)).toBeVisible();

    // Verify graceful fallback when API key is unconfigured
    await expect(page.getByText(/Google Maps unavailable — Demo Mode/i)).toBeVisible();

    // Verify city selection switch
    const mumbaiBtn = page.getByRole('button', { name: 'Mumbai' });
    await mumbaiBtn.click();
    await expect(page.getByText(/Mumbai Merchant Network Coordinates/i)).toBeVisible();

    // Verify health filtering
    const atRiskBtn = page.getByRole('button', { name: 'At Risk' });
    await atRiskBtn.click();

    // Verify active focal store and sister alternatives
    await expect(page.getByText(/Nearby Sister-Store Alternatives/i)).toBeVisible();
    await expect(page.getByText(/Haversine Distance/i)).toBeVisible();
  });

  // E2E Journey 5: AI Analyst Dialog, Reasoning & Focus Restoration
  test('E2E 5: AI Business Analyst dialog semantics, query execution, and focus restoration', async ({ page }) => {
    await page.goto('/');

    const aiBtn = page.locator('#btn-ask-ai-analyst');
    await aiBtn.focus();
    await aiBtn.click();

    // Verify dialog semantics
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(page.getByText('AI Business Analyst & Strategic Reasoner')).toBeVisible();

    // Select a question and verify response
    const questionBtn = page.getByRole('button', { name: /What is the single highest-leverage opportunity/i });
    if (await questionBtn.isVisible()) {
      await questionBtn.click();
      await expect(page.getByText(/Recommendation & Action Plan/i)).toBeVisible();
    }

    // Press Escape to close modal
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();

    // Verify focus restored to the trigger button
    await expect(aiBtn).toBeFocused();
  });

  // E2E Journey 6: Automated Accessibility Audits (Zero Critical / Serious Axe Violations)
  test('E2E 6: Automated WCAG Accessibility Audits across core views', async ({ page }) => {
    await page.goto('/');

    // 1. Audit Executive Dashboard
    const dashboardScan = await new AxeBuilder({ page }).analyze();
    const dashboardViolations = dashboardScan.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(dashboardViolations).toEqual([]);

    // 2. Audit Simulator Tab
    await page.locator('#tab-nav-simulator').click();
    const simScan = await new AxeBuilder({ page }).analyze();
    const simViolations = simScan.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(simViolations).toEqual([]);

    // 3. Audit Local Map Tab (Google Maps fallback)
    await page.locator('#tab-nav-map').click();
    const mapScan = await new AxeBuilder({ page }).analyze();
    const mapViolations = mapScan.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(mapViolations).toEqual([]);

    // 4. Audit AI Assistant Modal
    const aiBtn = page.locator('#btn-ask-ai-analyst');
    await aiBtn.click();
    const modalScan = await new AxeBuilder({ page }).analyze();
    const modalViolations = modalScan.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );
    expect(modalViolations).toEqual([]);
  });
});
