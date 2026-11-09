import { Plus } from "lucide-react";
import { minimumQuantity } from "@/lib/pricing";

const questions = [
  {
    question: "What is the minimum order quantity?",
    answer: `Our illustrative bulk pricing starts at ${minimumQuantity} cups. You can choose any whole-number quantity from ${minimumQuantity} upwards in the calculator. Tell us about your event to discuss the final order.`,
  },
  {
    question: "Can we add our company logo?",
    answer:
      "We’d love to discuss your branding ideas, including your company logo or branded cups. Available options, artwork requirements, and any additional costs will be confirmed in your quote.",
  },
  {
    question: "Can we customize the candy assortment?",
    answer:
      "Tell us about your favourite sweets or the style of your event. Contact us to discuss available assortments; candy selection is subject to availability and confirmation.",
  },
  {
    question: "How far in advance should we order?",
    answer:
      "Reach out as soon as you have an event in mind, especially for larger or personalized orders. We’ll discuss availability and agree on timing before confirming your order.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Include your delivery city and event date in your quote request. Contact us to discuss delivery availability, arrangements, and costs for your location. Delivery and taxes are extra.",
  },
  {
    question: "Can you accommodate dietary restrictions?",
    answer:
      "Please share any allergies or dietary requirements before ordering. Contact us to discuss available options and ingredient information. We cannot guarantee allergen-free products or suitability for specific diets.",
  },
] as const;

export default function FAQ() {
  return (
    <section
      id="faq"
      className="section faq-section"
      aria-labelledby="faq-heading"
    >
      <div className="container faq-grid">
        <div className="faq-intro">
          <p className="eyebrow">A FEW SWEET DETAILS</p>
          <h2 id="faq-heading">
            Good <br />
            <em>questions.</em>
          </h2>
          <p>A little clarity before you get gifting.</p>
          <a className="text-link" href="#quote">
            Have something else in mind? Let’s talk.
          </a>
        </div>
        <div className="faq-list">
          {questions.map(({ question, answer }) => (
            <details key={question} className="faq-item">
              <summary>
                {question}
                <Plus size={18} strokeWidth={1.6} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
