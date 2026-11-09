import Image from "next/image";
import {
  ArrowUpRight,
  Candy,
  MessageSquareHeart,
  Package,
  Palette,
  Ribbon,
  Sparkles,
} from "lucide-react";

const options = [
  {
    icon: Palette,
    title: "Your brand, front & centre",
    text: "Ask about your company logo or branded cups.",
  },
  {
    icon: Ribbon,
    title: "Tie it to your occasion",
    text: "Discuss ribbon colours to complement your event.",
  },
  {
    icon: Candy,
    title: "A mix to make them smile",
    text: "Let’s explore candy assortment preferences.",
  },
  {
    icon: MessageSquareHeart,
    title: "A few thoughtful words",
    text: "Explore a personalized message for your guests.",
  },
  {
    icon: Package,
    title: "Made for the guest list",
    text: "Discuss packaging for your bulk event order.",
  },
] as const;

export default function Customization() {
  return (
    <section
      id="customization"
      className="section customization-section"
      aria-labelledby="customization-heading"
    >
      <div className="container customization-grid">
        <div className="customization-visual">
          <Image
            src="/images/details.png"
            alt="Detail of a shiny red bow and colourful sweets in a gift cup"
            fill
            sizes="(max-width: 767px) 92vw, (max-width: 1200px) 44vw, 512px"
            quality={85}
          />
          <span className="detail-caption">
            <Sparkles size={17} aria-hidden="true" />
            It’s the little details.
          </span>
        </div>
        <div className="customization-copy">
          <p className="eyebrow">YOUR OCCASION. YOUR LITTLE TOUCHES.</p>
          <h2 id="customization-heading">
            Make it <em>yours.</em>
          </h2>
          <p className="section-intro">
            A little more personal. A little more memorable. Tell us what you
            have in mind, and we’ll explore the possibilities together.
          </p>
          <div className="customization-options">
            {options.map(({ icon: Icon, title, text }) => (
              <div className="customization-option" key={title}>
                <span>
                  <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="fine-print">
            Customization options are subject to availability and confirmation.
          </p>
          <a href="#quote" className="text-link">
            Let’s talk about your ideas{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
