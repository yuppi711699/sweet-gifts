/** All amounts are integer Canadian cents. Prices are illustrative. */
export const pricingTiers = [
  {
    minimum: 25,
    maximum: 49,
    unitPriceCents: 1200,
    label: "A little celebration",
  },
  { minimum: 50, maximum: 99, unitPriceCents: 1000, label: "More happy faces" },
  {
    minimum: 100,
    maximum: 199,
    unitPriceCents: 900,
    label: "A team-sized thank you",
  },
  {
    minimum: 200,
    maximum: null,
    unitPriceCents: 800,
    label: "Big occasion energy",
  },
] as const;

export const minimumQuantity = pricingTiers[0].minimum;
export const defaultQuantity = 100;
export const maximumQuantity = Math.floor(
  Number.MAX_SAFE_INTEGER / pricingTiers[0].unitPriceCents,
);
export const pricingDisclaimer =
  "Illustrative pricing. Final pricing depends on customization, delivery, and order requirements. Taxes and delivery are extra.";

const cadFormatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  currencyDisplay: "code",
});

export function formatCAD(cents: number): string {
  return cadFormatter
    .format(cents / 100)
    .replace("CAD", "CA$")
    .replace(/\s/g, "");
}

export function parseQuantity(raw: string): number | null {
  if (!/^\d+$/.test(raw.trim())) return null;
  const quantity = Number(raw);
  return Number.isSafeInteger(quantity) &&
    quantity >= minimumQuantity &&
    quantity <= maximumQuantity
    ? quantity
    : null;
}

export function estimateOrder(quantity: number) {
  if (
    !Number.isSafeInteger(quantity) ||
    quantity < minimumQuantity ||
    quantity > maximumQuantity
  ) {
    throw new RangeError(
      `Choose a whole number of at least ${minimumQuantity} cups.`,
    );
  }
  const tier = pricingTiers.find(
    (candidate) =>
      quantity >= candidate.minimum &&
      (candidate.maximum === null || quantity <= candidate.maximum),
  );
  if (!tier) throw new RangeError("No pricing tier matches this quantity.");
  return {
    quantity,
    unitPriceCents: tier.unitPriceCents,
    totalCents: quantity * tier.unitPriceCents,
  };
}
