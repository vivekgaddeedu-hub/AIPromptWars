export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}

export function formatLakh(val: number): string {
  return `₹${val.toFixed(1)}L`;
}

export function formatPct(val: number, decimals: number = 1): string {
  return `${val >= 0 ? '+' : ''}${val.toFixed(decimals)}%`;
}

export function formatNumber(val: number): string {
  return new Intl.NumberFormat('en-IN').format(val);
}
