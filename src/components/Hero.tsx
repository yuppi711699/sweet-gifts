import Image from "next/image";
import { ArrowDown, ArrowUpRight, Gift, Heart, Sparkle } from "lucide-react";
import { formatCAD, pricingTiers, minimumQuantity } from "@/lib/pricing";

export default function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-star" aria-hidden="true">
                ✳
              </span>{" "}
              A LITTLE THOUGHT. A LOT OF JOY.
            </p>
            <h1 id="hero-heading">
              Little Gifts.
              <br />
              <em>Big Smiles.</em>
            </h1>
            <p className="hero-description">
              Custom candy gift cups for corporate events, celebrations, and
              unforgettable moments.
            </p>
            <div className="hero-actions">
              <a className="button button-red" href="#our-gifts">
                Explore Gift Cups <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a className="button button-outline" href="#quote">
                Get a Quote <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <p className="hero-support">
              <span className="support-icon">
                <Gift size={17} strokeWidth={1.6} aria-hidden="true" />
              </span>
              Perfect for corporate events, conferences,
              <br className="desktop-break" /> parties &amp; celebrations.
            </p>
            <a href="#pricing" className="hero-pricing">
              A sweet idea for every team.{" "}
              <span>
                From {formatCAD(pricingTiers.at(-1)!.unitPriceCents)} / cup
              </span>
              <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <Image
                src="/images/hero.png"
                alt="A red candy gift cup with a white rim, colourful sweets, clear cellophane, and a shiny red ribbon"
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1200px) 46vw, 536px"
                preload
                loading="eager"
                quality={85}
              />
            </div>
            <div className="moment-seal">
              <Sparkle size={19} strokeWidth={1.4} aria-hidden="true" />
              <span>
                Made for
                <br />
                <em>sweet moments</em>
              </span>
            </div>
            <div className="hero-note">
              <span className="note-icon">
                <Heart size={21} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                A little thank you.
                <br />
                <strong>Beautifully wrapped.</strong>
              </div>
            </div>
            <span className="photo-index">01 / A CUP FULL OF HAPPY</span>
          </div>
        </div>
      </section>
      <div className="promise-strip">
        <div className="container promise-inner">
          <p>
            Small cup.
            <br />
            <em>Thoughtful details.</em>
          </p>
          <span>
            <Gift size={23} strokeWidth={1.3} aria-hidden="true" />
            Beautifully presented
          </span>
          <span>
            <Sparkle size={23} strokeWidth={1.3} aria-hidden="true" />A personal
            touch
          </span>
          <span>
            <Heart size={23} strokeWidth={1.3} aria-hidden="true" />
            Better together, in bulk
            <small>Orders from {minimumQuantity} cups</small>
          </span>
        </div>
      </div>
    </>
  );
}
