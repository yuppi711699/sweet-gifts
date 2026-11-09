import { ArrowUpRight, Check } from "lucide-react";
import {
  defaultQuantity,
  estimateOrder,
  formatCAD,
  pricingDisclaimer,
  pricingTiers,
} from "@/lib/pricing";

interface PricingProps {
  selectedQuantity: number | null;
  onChoose: (quantity: number) => void;
}

export default function Pricing({ selectedQuantity, onChoose }: PricingProps) {
  return (
    <>
      <div className="section-heading pricing-heading">
        <div>
          <p className="eyebrow">GOOD THINGS COME IN BULK</p>
          <h2 id="pricing-heading">
            The more you share,
            <br />
            <em>the sweeter the price.</em>
          </h2>
        </div>
        <p>
          Good company deserves a little sweetness.
          <br />
          Find a starting point for your next occasion.
        </p>
      </div>
      <div className="pricing-grid">
        {pricingTiers.map((tier) => {
          const popular = tier.minimum === defaultQuantity;
          const active =
            selectedQuantity !== null &&
            selectedQuantity >= tier.minimum &&
            (tier.maximum === null || selectedQuantity <= tier.maximum);
          const estimate = estimateOrder(tier.minimum);
          return (
            <article
              key={tier.minimum}
              className={`price-card${popular ? " price-card-popular" : ""}`}
            >
              {popular && (
                <span className="popular-label">
                  <Check size={13} aria-hidden="true" />
                  MOST POPULAR
                </span>
              )}
              <p className="price-quantity">
                {tier.minimum} <span>cups</span>
              </p>
              <p className="price-occasion">{tier.label}</p>
              <p className="price-amount">
                {formatCAD(tier.unitPriceCents).replace(".00", "")}
                <span> / cup</span>
              </p>
              <p className="price-subtotal">
                {formatCAD(estimate.totalCents)} estimated subtotal
              </p>
              <button
                type="button"
                className={`button ${popular ? "button-red" : "button-outline"}`}
                onClick={() => onChoose(tier.minimum)}
                aria-pressed={active}
              >
                Choose {tier.minimum} cups{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </article>
          );
        })}
      </div>
      <p className="fine-print pricing-disclaimer">{pricingDisclaimer}</p>
    </>
  );
}
