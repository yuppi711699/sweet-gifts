"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  FileHeart,
  Heart,
  Mail,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import {
  estimateOrder,
  formatCAD,
  minimumQuantity,
  parseQuantity,
} from "@/lib/pricing";
import {
  createMailto,
  createQuoteDraft,
  validateQuote,
  type QuoteErrors,
  type QuoteFields,
} from "@/lib/quote";

interface QuoteFormProps {
  quantity: string;
  onQuantityChange: (quantity: string) => void;
  prefillNotice: string;
}

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {optional && <span> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

const textFields = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    placeholder: "Your name",
    autoComplete: "name",
    required: true,
    maxLength: 120,
  },
  {
    name: "company",
    label: "Company / event name",
    type: "text",
    placeholder: "Who are we celebrating?",
    autoComplete: "organization",
    required: true,
    maxLength: 180,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@company.ca",
    autoComplete: "email",
    required: true,
    maxLength: 254,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "Your phone number",
    autoComplete: "tel",
    required: false,
    maxLength: 30,
  },
] as const;

export default function QuoteForm({
  quantity,
  onQuantityChange,
  prefillNotice,
}: QuoteFormProps) {
  const [fields, setFields] = useState<Omit<QuoteFields, "quantity">>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    eventDate: "",
    city: "",
    branding: "no",
    comments: "",
  });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [draft, setDraft] = useState<
    (ReturnType<typeof createQuoteDraft> & { signature: string }) | null
  >(null);
  const [copyStatus, setCopyStatus] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const preview = useRef<HTMLTextAreaElement>(null);
  const data: QuoteFields = { ...fields, quantity };
  const signature = JSON.stringify(data);
  const activeDraft = draft?.signature === signature ? draft : null;
  const parsed = parseQuantity(quantity);
  const estimate = parsed === null ? null : estimateOrder(parsed);
  const demoMode = !siteConfig.email;

  function updateField<Key extends keyof typeof fields>(
    name: Key,
    value: (typeof fields)[Key],
  ) {
    setFields((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setCopyStatus("");
  }

  function prepareQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateQuote(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setDraft(null);
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    setDraft({ ...createQuoteDraft(data, siteConfig.name), signature });
    setCopyStatus("");
    requestAnimationFrame(() =>
      document.getElementById("quote-draft-heading")?.focus(),
    );
  }

  async function copyQuote() {
    if (!activeDraft) return;
    try {
      await navigator.clipboard.writeText(activeDraft.text);
      setCopyStatus(
        "Quote copied. Paste it into your email when you’re ready. Nothing has been sent.",
      );
    } catch {
      preview.current?.focus();
      preview.current?.select();
      setCopyStatus(
        "Select the quote text below and copy it manually. Nothing has been sent.",
      );
    }
  }

  function errorAttributes(name: keyof QuoteFields) {
    return {
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `quote-${name}-error` : undefined,
    };
  }

  return (
    <section
      id="quote"
      className="section quote-section"
      aria-labelledby="quote-heading"
    >
      <div className="container quote-grid">
        <div className="quote-intro">
          <p className="eyebrow">LET’S START SOMETHING SWEET</p>
          <h2 id="quote-heading">
            Let’s make
            <br />
            <em>someone’s day.</em>
          </h2>
          <p>
            A team thank-you? A room full of guests? Tell us a little about your
            plans, and prepare your personalized quote request.
          </p>
          <div className="quote-promise">
            <Heart size={20} strokeWidth={1.5} aria-hidden="true" />
            <p>
              A thoughtful gift starts with
              <br />
              <strong>a little conversation.</strong>
            </p>
          </div>
          <div className="quote-product">
            <Image
              src="/images/hero.png"
              alt="Red candy cup with a ribbon"
              width={76}
              height={95}
              sizes="76px"
            />
            <div>
              <span>A little cup of happy</span>
              <p>For the moments that matter.</p>
            </div>
          </div>
          <div className="demo-notice">
            <FileHeart size={20} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>
                {demoMode
                  ? "A little preview of what’s possible."
                  : "Your request, ready to email."}
              </strong>
              <p>
                {demoMode
                  ? "This is a partner demo. No business email is configured, so you can prepare and copy your quote. Nothing is sent or ordered here."
                  : "Prepare your request, then open an email draft to review and send it from your email app. This form does not send emails."}
              </p>
            </div>
          </div>
        </div>
        <form
          ref={form}
          className="quote-form"
          noValidate
          onSubmit={prepareQuote}
        >
          <div className="form-heading">
            <h3>A few sweet details</h3>
            <span>Required unless marked optional</span>
          </div>
          {prefillNotice && (
            <p className="prefill-notice" role="status">
              <Check size={16} aria-hidden="true" />
              {prefillNotice}
            </p>
          )}
          <div className="form-grid">
            {textFields.map((field) => (
              <Field
                key={field.name}
                id={`quote-${field.name}`}
                label={field.label}
                optional={!field.required}
                error={errors[field.name]}
              >
                <input
                  id={`quote-${field.name}`}
                  name={field.name}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  required={field.required}
                  maxLength={field.maxLength}
                  value={fields[field.name]}
                  onChange={(event) =>
                    updateField(field.name, event.target.value)
                  }
                  {...errorAttributes(field.name)}
                />
              </Field>
            ))}
            <Field
              id="quote-quantity"
              label="Number of gift cups"
              error={errors.quantity}
            >
              <input
                id="quote-quantity"
                name="quantity"
                type="number"
                min={minimumQuantity}
                step="1"
                inputMode="numeric"
                required
                value={quantity}
                onChange={(event) => {
                  onQuantityChange(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    quantity: undefined,
                  }));
                }}
                {...errorAttributes("quantity")}
              />
            </Field>
            <Field
              id="quote-eventDate"
              label="Event date"
              optional
              error={errors.eventDate}
            >
              <input
                id="quote-eventDate"
                name="eventDate"
                type="date"
                value={fields.eventDate}
                onInput={(event) =>
                  updateField("eventDate", event.currentTarget.value)
                }
                onChange={(event) =>
                  updateField("eventDate", event.target.value)
                }
                {...errorAttributes("eventDate")}
              />
            </Field>
            <div className="form-full">
              <Field id="quote-city" label="Delivery city" error={errors.city}>
                <input
                  id="quote-city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="e.g. Vancouver, BC"
                  required
                  maxLength={150}
                  value={fields.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  {...errorAttributes("city")}
                />
              </Field>
            </div>
            <fieldset className="branding-field form-full">
              <legend>Would you like custom branding?</legend>
              <div className="branding-choices">
                <label>
                  <input
                    type="radio"
                    name="branding"
                    value="yes"
                    checked={fields.branding === "yes"}
                    onChange={() => updateField("branding", "yes")}
                  />
                  Yes, let’s discuss it
                </label>
                <label>
                  <input
                    type="radio"
                    name="branding"
                    value="no"
                    checked={fields.branding === "no"}
                    onChange={() => updateField("branding", "no")}
                  />
                  No, keep it classic
                </label>
              </div>
            </fieldset>
            <div className="form-full">
              <Field
                id="quote-comments"
                label="Anything else on your wish list?"
                optional
                error={errors.comments}
              >
                <textarea
                  id="quote-comments"
                  name="comments"
                  rows={3}
                  maxLength={2000}
                  placeholder="Tell us about your event, ideas, or dietary requirements…"
                  value={fields.comments}
                  onChange={(event) =>
                    updateField("comments", event.target.value)
                  }
                  {...errorAttributes("comments")}
                />
              </Field>
            </div>
          </div>
          <div className="quote-subtotal">
            <span>Illustrative gift cup subtotal</span>
            <strong>{estimate ? formatCAD(estimate.totalCents) : "—"}</strong>
          </div>
          <p className="input-hint quote-estimate-note">
            Taxes, delivery, and any customization are extra. Final details and
            pricing are subject to confirmation.
          </p>
          <button type="submit" className="button button-red prepare-button">
            Prepare My Quote <ArrowUpRight size={18} aria-hidden="true" />
          </button>
          <p className="form-privacy">
            Your details stay in this page until you copy them or open an email
            draft.
          </p>
          {Object.values(errors).some(Boolean) && (
            <p className="field-error error-summary" role="alert">
              Please check the highlighted details so we can prepare your quote.
            </p>
          )}
          {activeDraft && (
            <div className="quote-draft">
              <h4 id="quote-draft-heading" tabIndex={-1}>
                <Check size={18} aria-hidden="true" />
                Your quote is ready to review
              </h4>
              <p>
                {demoMode
                  ? "Demo mode: copy the details below. No request has been sent."
                  : "Review your details, then open your email app or copy your request. You’ll need to send the email yourself."}
              </p>
              <label htmlFor="quote-preview" className="sr-only">
                Prepared quote details
              </label>
              <textarea
                ref={preview}
                id="quote-preview"
                readOnly
                value={activeDraft.text}
                rows={9}
              />
              <div className="draft-actions">
                {!demoMode && (
                  <a
                    className="button button-red"
                    href={createMailto(siteConfig.email, activeDraft)}
                  >
                    <Mail size={16} aria-hidden="true" />
                    Open Email Draft
                  </a>
                )}
                <button
                  type="button"
                  className="button button-outline"
                  onClick={copyQuote}
                >
                  <Copy size={16} aria-hidden="true" />
                  Copy Quote Details
                </button>
              </div>
              <p className="copy-status" role="status">
                {copyStatus}
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
