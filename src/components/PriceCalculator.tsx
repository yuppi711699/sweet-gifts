import { ArrowUpRight, Calculator, Minus, Plus } from "lucide-react";
import {
  estimateOrder,
  formatCAD,
  minimumQuantity,
  maximumQuantity,
  parseQuantity,
  pricingTiers,
} from "@/lib/pricing";

interface CalculatorProps {
  quantity: string;
  onChange: (quantity: string) => void;
  onRequest: (quantity: number) => void;
}

export default function PriceCalculator({
  quantity,
  onChange,
  onRequest,
}: CalculatorProps) {
  const parsed = parseQuantity(quantity);
  const estimate = parsed === null ? null : estimateOrder(parsed);
  const nextTier =
    parsed === null ? null : pricingTiers.find((tier) => tier.minimum > parsed);

  function step(change: number) {
    onChange(
      String(
        Math.min(
          maximumQuantity,
          Math.max(minimumQuantity, (parsed ?? minimumQuantity) + change),
        ),
      ),
    );
  }

  return (
    <div
      className="calculator"
      id="calculator"
      aria-labelledby="calculator-heading"
    >
      <div className="calculator-controls">
        <p className="eyebrow">
          <Calculator size={15} aria-hidden="true" /> A LITTLE SWEET MATH
        </p>
        <h3 id="calculator-heading">
          Your guest list.
          <br />
          <em>Your sweet estimate.</em>
        </h3>
        <p>Pick a quantity, and we’ll do the rest.</p>
        <label htmlFor="calculator-quantity">
          How many smiles are we making?
        </label>
        <div className="quantity-stepper">
          <button
            type="button"
            aria-label="Decrease quantity by 25"
            onClick={() => step(-25)}
            disabled={parsed !== null && parsed <= minimumQuantity}
          >
            <Minus size={18} aria-hidden="true" />
          </button>
          <input
            id="calculator-quantity"
            name="calculatorQuantity"
            type="number"
            inputMode="numeric"
            min={minimumQuantity}
            max={maximumQuantity}
            step="1"
            value={quantity}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={parsed === null}
            aria-describedby={
              parsed === null ? "calculator-error" : "calculator-hint"
            }
          />
          <span>cups</span>
          <button
            type="button"
            aria-label="Increase quantity by 25"
            onClick={() => step(25)}
            disabled={parsed === maximumQuantity}
          >
            <Plus size={18} aria-hidden="true" />
          </button>
        </div>
        <p id="calculator-hint" className="input-hint">
          Minimum {minimumQuantity} cups. Any whole-number quantity welcome.
        </p>
        {parsed === null && (
          <p id="calculator-error" className="field-error" role="status">
            Enter a whole number of {minimumQuantity} or more cups.
          </p>
        )}
        <div className="quantity-presets" aria-label="Quantity presets">
          {pricingTiers.map((tier) => (
            <button
              type="button"
              key={tier.minimum}
              aria-pressed={parsed === tier.minimum}
              onClick={() => onChange(String(tier.minimum))}
            >
              {tier.minimum} cups
            </button>
          ))}
        </div>
      </div>
      <div className="calculator-summary">
        <div className="estimate-topline">
          <span>Your little bundle of joy</span>
          <span className="estimate-currency">CAD</span>
        </div>
        <div className="estimate-values" aria-live="polite" aria-atomic="true">
          <div className="estimate-row">
            <span>Gift cups</span>
            <span>
              {estimate
                ? `${estimate.quantity.toLocaleString("en-CA")} cups`
                : "—"}
            </span>
          </div>
          <div className="estimate-row">
            <span>Price per cup</span>
            <span>{estimate ? formatCAD(estimate.unitPriceCents) : "—"}</span>
          </div>
          <div className="estimate-total">
            <span>Estimated subtotal</span>
            <output id="calculator-total" htmlFor="calculator-quantity">
              {estimate ? formatCAD(estimate.totalCents) : "—"}
            </output>
          </div>
        </div>
        <p className="estimate-note">
          Before taxes, delivery, and any customization.
        </p>
        <button
          type="button"
          className="button button-red"
          disabled={parsed === null}
          onClick={() => {
            if (parsed !== null) onRequest(parsed);
          }}
        >
          Request This Order <ArrowUpRight size={18} aria-hidden="true" />
        </button>
        <p className="calculator-next-tier">
          {nextTier && parsed !== null
            ? `Add ${(nextTier.minimum - parsed).toLocaleString("en-CA")} more cups for ${formatCAD(nextTier.unitPriceCents)} per cup.`
            : "A little idea for a big event? Let’s talk details."}
        </p>
      </div>
    </div>
  );
}
