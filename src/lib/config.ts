/** Rename the business and configure public contact details here. */
const configuredEmail = process.env.NEXT_PUBLIC_QUOTE_EMAIL?.trim() || "";

export const siteConfig = {
  name: "Sweet Gifts",
  tagline: "Little gifts. Big smiles.",
  description:
    "Custom candy gift cups for corporate events, celebrations, and unforgettable moments. Explore bulk gifting and prepare a personalized quote in Canadian dollars.",
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredEmail)
    ? configuredEmail
    : "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "") || "",
  copyrightYear: 2026,
} as const;

export const navigation = [
  { label: "Our Gifts", href: "#our-gifts" },
  { label: "Bulk Pricing", href: "#pricing" },
  { label: "Customization", href: "#customization" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#quote" },
] as const;
