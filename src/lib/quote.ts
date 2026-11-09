import {
  estimateOrder,
  formatCAD,
  minimumQuantity,
  parseQuantity,
  pricingDisclaimer,
} from "./pricing.ts";

export interface QuoteFields {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  quantity: string;
  eventDate: string;
  city: string;
  branding: "yes" | "no";
  comments: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteFields, string>>;

export function validateQuote(fields: QuoteFields): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!fields.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!fields.company.trim())
    errors.company = "Please enter your company or event name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (fields.phone.trim() && !/^[+\d\s().x-]{7,30}$/i.test(fields.phone.trim()))
    errors.phone = "Please enter a valid phone number, or leave this blank.";
  if (parseQuantity(fields.quantity) === null)
    errors.quantity = `Please enter a whole number of ${minimumQuantity} or more cups.`;
  if (!fields.city.trim()) errors.city = "Please enter your delivery city.";
  if (fields.eventDate) {
    const date = new Date(`${fields.eventDate}T12:00:00Z`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(fields.eventDate) ||
      Number.isNaN(date.getTime()) ||
      date.toISOString().slice(0, 10) !== fields.eventDate
    ) {
      errors.eventDate = "Please choose a valid event date.";
    }
  }
  if (fields.comments.length > 2000)
    errors.comments = "Please keep your comments under 2,000 characters.";
  return errors;
}

/** Pure formatting boundary: reuse with a future server-side email provider. */
export function createQuoteDraft(fields: QuoteFields, brandName: string) {
  const errors = validateQuote(fields);
  if (Object.keys(errors).length)
    throw new Error("Please complete the required quote details.");
  const quantity = parseQuantity(fields.quantity);
  if (quantity === null) throw new Error("A valid order quantity is required.");
  const estimate = estimateOrder(quantity);
  const company = fields.company.trim().replace(/[\r\n]+/g, " ");
  const subject = `${brandName} quote — ${quantity} cups for ${company}`;
  const body = [
    `Hello ${brandName},`,
    "",
    "I'd like to discuss a candy gift cup order.",
    "",
    `Full name: ${fields.fullName.trim()}`,
    `Company / event: ${fields.company.trim()}`,
    `Email: ${fields.email.trim()}`,
    `Phone: ${fields.phone.trim() || "Not provided"}`,
    `Quantity: ${quantity} cups`,
    `Illustrative unit price: ${formatCAD(estimate.unitPriceCents)}`,
    `Illustrative subtotal: ${formatCAD(estimate.totalCents)}`,
    `Event date: ${fields.eventDate || "To be discussed"}`,
    `Delivery city: ${fields.city.trim()}`,
    `Custom branding requested: ${fields.branding === "yes" ? "Yes" : "No"}`,
    "",
    "Additional comments:",
    fields.comments.trim() || "None provided.",
    "",
    pricingDisclaimer,
    "This is a quote inquiry, not a confirmed order.",
  ].join("\r\n");
  return { subject, body, text: `Subject: ${subject}\r\n\r\n${body}` };
}

export function createMailto(
  email: string,
  draft: ReturnType<typeof createQuoteDraft>,
): string {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Configure a valid quote email address first.");
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
}
