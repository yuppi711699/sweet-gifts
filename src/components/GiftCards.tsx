import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const gifts = [
  {
    image: "hero",
    tag: "THE ORIGINAL LITTLE JOY",
    title: "Classic Candy Cup",
    description:
      "Colourful sweets, our signature red cup, and a ribbon to bring it all together.",
    cta: "Explore bulk pricing",
    href: "#pricing",
    alt: "Signature red candy cup wrapped in clear cellophane with a red bow",
  },
  {
    image: "details",
    tag: "A LITTLE MORE YOU",
    title: "Personalized Gift Cup",
    description:
      "Your occasion deserves a personal touch. Let’s talk branding, colours, and sweet details.",
    cta: "Make it personal",
    href: "#customization",
    alt: "Close-up of the red ribbon, colourful candies, and gold gift motif",
  },
  {
    image: "collection",
    tag: "FOR THE WHOLE GUEST LIST",
    title: "Corporate Event Collection",
    description:
      "A thoughtful welcome or a team-sized thank you. Little gifts that bring everyone together.",
    cta: "Plan your event gifts",
    href: "#quote",
    alt: "Four coordinated red candy gift cups with different sweet assortments",
  },
] as const;

export default function GiftCards() {
  return (
    <section
      id="our-gifts"
      className="section gifts-section"
      aria-labelledby="gifts-heading"
    >
      <div className="container">
        <div className="section-heading centered">
          <p className="eyebrow">HAPPINESS, ALL WRAPPED UP</p>
          <h2 id="gifts-heading">
            Sweet gifts for
            <br />
            <em>every occasion.</em>
          </h2>
          <p>One lovely little cup. So many ways to make someone’s day.</p>
        </div>
        <div className="gift-grid">
          {gifts.map((gift, index) => (
            <article key={gift.image} className="gift-card">
              <div className={`gift-image gift-image-${gift.image}`}>
                <Image
                  src={`/images/${gift.image}.png`}
                  alt={gift.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, (max-width: 1200px) 30vw, 384px"
                  quality={80}
                />
                <span className="image-number">0{index + 1}</span>
              </div>
              <div className="gift-card-body">
                <p className="eyebrow">{gift.tag}</p>
                <h3>{gift.title}</h3>
                <p>{gift.description}</p>
                <a href={gift.href} className="text-link">
                  {gift.cta}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="occasion-line">
          <span>A sweet fit for</span>
          <p>
            Team thank-yous <span>✳</span> Conferences <span>✳</span> Weddings{" "}
            <span>✳</span> Milestones <span>✳</span> Just because
          </p>
        </div>
      </div>
    </section>
  );
}
