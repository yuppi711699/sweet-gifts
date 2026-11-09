import { ClipboardList, Gift, MessageCircle, PartyPopper } from "lucide-react";

const steps = [
  {
    icon: Gift,
    title: "Choose your quantity",
    text: "A small gathering or the whole team? Start with your guest list.",
  },
  {
    icon: MessageCircle,
    title: "Tell us about your event",
    text: "Share the occasion, your ideas, and the details that matter.",
  },
  {
    icon: ClipboardList,
    title: "Confirm your custom order",
    text: "Review the final details, availability, and a personalized quote.",
  },
  {
    icon: PartyPopper,
    title: "Receive your sweet gifts",
    text: "Once arrangements are confirmed, get ready to share the smiles.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section how-section"
      aria-labelledby="how-heading"
    >
      <div className="container">
        <div className="section-heading centered">
          <p className="eyebrow">FROM A LITTLE IDEA TO A LOVELY MOMENT</p>
          <h2 id="how-heading">
            Gifting, <em>made simple.</em>
          </h2>
          <p>Four thoughtful steps. A whole lot of happy.</p>
        </div>
        <ol className="steps-grid">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <li key={title}>
              <div className="step-top">
                <span className="step-icon">
                  <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="step-number">0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
