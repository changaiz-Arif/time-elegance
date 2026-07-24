export function formatPKR(amount: number): string {
  return "Rs. " + Math.round(amount).toLocaleString("en-PK");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}