"use client";

import { useState, type ReactNode } from "react";
import {
  defaultQuantity,
  estimateOrder,
  formatCAD,
  parseQuantity,
} from "@/lib/pricing";
import Pricing from "./Pricing";
import PriceCalculator from "./PriceCalculator";
import QuoteForm from "./QuoteForm";

export default function OrderExperience({ children }: { children: ReactNode }) {
  const [calculatorQuantity, setCalculatorQuantity] = useState(
    String(defaultQuantity),
  );
  const [quoteQuantity, setQuoteQuantity] = useState(String(defaultQuantity));
  const [prefillNotice, setPrefillNotice] = useState("");

  function chooseQuantity(quantity: number) {
    setCalculatorQuantity(String(quantity));
    document
      .getElementById("calculator")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
    document
      .getElementById("calculator-quantity")
      ?.focus({ preventScroll: true });
  }

  function requestOrder(quantity: number) {
    setQuoteQuantity(String(quantity));
    setPrefillNotice(
      `${quantity.toLocaleString("en-CA")} cups added · ${formatCAD(estimateOrder(quantity).totalCents)} estimated subtotal`,
    );
    document
      .getElementById("quote")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    document.getElementById("quote-fullName")?.focus({ preventScroll: true });
  }

  return (
    <>
      <section
        id="pricing"
        className="section pricing-section"
        aria-labelledby="pricing-heading"
      >
        <div className="container">
          <Pricing
            selectedQuantity={parseQuantity(calculatorQuantity)}
            onChoose={chooseQuantity}
          />
          <PriceCalculator
            quantity={calculatorQuantity}
            onChange={setCalculatorQuantity}
            onRequest={requestOrder}
          />
        </div>
      </section>
      {children}
      <QuoteForm
        quantity={quoteQuantity}
        prefillNotice={prefillNotice}
        onQuantityChange={(quantity) => {
          setQuoteQuantity(quantity);
          setPrefillNotice("");
        }}
      />
    </>
  );
}
