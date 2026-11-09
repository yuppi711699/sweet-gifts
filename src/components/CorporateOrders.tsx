import Image from "next/image";
import { ArrowUpRight, Sparkle } from "lucide-react";

export default function CorporateOrders() {
  return (
    <section className="corporate-section" aria-labelledby="corporate-heading">
      <div className="container">
        <div className="corporate-card">
          <div className="corporate-copy">
            <p className="eyebrow">
              <Sparkle size={15} aria-hidden="true" /> LITTLE GIFTS. BIG
              OCCASIONS.
            </p>
            <h2 id="corporate-heading">
              Planning
              <br />
              something <em>big?</em>
            </h2>
            <p>
              From team celebrations to large conferences, our candy gift cups
              bring a personal touch to every event.
            </p>
            <a className="button button-cream" href="#quote">
              Request a Corporate Quote{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
            <span className="corporate-footnote">
              A warm welcome. A thoughtful thank you. A reason to smile.
            </span>
          </div>
          <div className="corporate-image">
            <Image
              src="/images/bulk-orders.png"
              alt="A large group of matching red candy gift cups arranged for a corporate event"
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1200px) 46vw, 600px"
              quality={85}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
