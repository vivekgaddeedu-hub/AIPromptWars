import { z } from 'zod';

export const SimulationParamsSchema = z.object({
  inventorySyncAdoption: z.number().min(0).max(100),
  rushModeBufferAdoption: z.number().min(0).max(100),
  habitLoop3OrderTargeting: z.number().min(0).max(100),
  marketingBudgetReallocation: z.number().min(0).max(50),
  instantSubstitutionResolution: z.boolean(),
});

export const StoreFilterSchema = z.object({
  city: z.enum(['All', 'Mumbai', 'Bengaluru', 'Delhi NCR']).default('All'),
  category: z.enum(['All', 'Gourmet Grocery', 'Pharmacy', 'Bakery & Patisserie', 'Stationery & Lifestyle']).default('All'),
  risk: z.enum(['All', 'Critical', 'Medium', 'Low']).default('All'),
  searchQuery: z.string().max(100).default(''),
});

export const BudgetInitiativeSchema = z.object({
  id: z.string().min(1),
  month: z.number().int().min(1).max(6),
  initiative: z.string().min(1),
  costINR: z.number().positive(),
  owner: z.string().min(1),
  kpi: z.string().min(1),
});

export function safeSanitizeString(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
}
