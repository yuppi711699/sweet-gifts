import { test } from "node:test";
import assert from "node:assert/strict";
import {
  estimateOrder,
  formatCAD,
  parseQuantity,
  maximumQuantity,
} from "../src/lib/pricing.ts";
import {
  createMailto,
  createQuoteDraft,
  validateQuote,
} from "../src/lib/quote.ts";

const validQuote = {
  fullName: "Alex Example",
  company: "Example Events",
  email: "alex@example.test",
  phone: "",
  quantity: "100",
  eventDate: "",
  city: "Vancouver, BC",
  branding: "no",
  comments: "",
};

test("every bulk pricing boundary uses the correct unit price and subtotal", () => {
  for (const [quantity, unitPriceCents] of [
    [25, 1200],
    [49, 1200],
    [50, 1000],
    [75, 1000],
    [99, 1000],
    [100, 900],
    [135, 900],
    [199, 900],
    [200, 800],
    [275, 800],
    [10000, 800],
  ]) {
    assert.deepEqual(estimateOrder(quantity), {
      quantity,
      unitPriceCents,
      totalCents: quantity * unitPriceCents,
    });
  }
});

test("illustrative packages match the brief exactly", () => {
  assert.deepEqual(
    [25, 50, 100, 200].map((quantity) => estimateOrder(quantity).totalCents),
    [30000, 50000, 90000, 160000],
  );
});

test("arbitrary whole quantities work, while invalid input cannot create a misleading estimate", () => {
  for (const invalid of [
    "",
    " ",
    "24",
    "-25",
    "25.5",
    "Infinity",
    "1e2",
    "abc",
    String(maximumQuantity + 1),
  ])
    assert.equal(parseQuantity(invalid), null, invalid);
  for (const valid of ["25", "76", "137", "10001"])
    assert.equal(parseQuantity(valid), Number(valid));
  assert.equal(parseQuantity(" 75 "), 75);
  for (const invalid of [24, 25.5, NaN, Infinity, -25, maximumQuantity + 1])
    assert.throws(() => estimateOrder(invalid), RangeError);
});

test("CAD prices have the correct currency, grouping, and cents", () => {
  assert.equal(formatCAD(1200), "CA$12.00");
  assert.equal(formatCAD(160000), "CA$1,600.00");
  assert.equal(formatCAD(121500), "CA$1,215.00");
});

test("valid quote allows optional phone, event date, and comments to be blank", () => {
  assert.deepEqual(validateQuote(validQuote), {});
  assert.deepEqual(
    validateQuote({
      ...validQuote,
      phone: "+1 (604) 555-0100",
      eventDate: "2028-02-29",
      branding: "yes",
    }),
    {},
  );
});

test("required fields and malformed optional values have actionable errors", () => {
  const errors = validateQuote({
    ...validQuote,
    fullName: " ",
    company: "",
    email: "no-email",
    quantity: "24",
    city: "",
    phone: "letters",
    eventDate: "2026-02-30",
    comments: "x".repeat(2001),
  });
  assert.deepEqual(
    Object.keys(errors).sort(),
    [
      "fullName",
      "company",
      "email",
      "quantity",
      "city",
      "phone",
      "eventDate",
      "comments",
    ].sort(),
  );
  assert.throws(() =>
    createQuoteDraft({ ...validQuote, quantity: "24" }, "Sweet Gifts"),
  );
});

test("quote draft recalculates the chosen quantity and includes all order details", () => {
  const draft = createQuoteDraft(
    {
      ...validQuote,
      quantity: "137",
      branding: "yes",
      comments: "Red ribbon please.",
    },
    "Sweet Gifts",
  );
  assert.equal(
    draft.subject,
    "Sweet Gifts quote — 137 cups for Example Events",
  );
  for (const expected of [
    "Full name: Alex Example",
    "Email: alex@example.test",
    "Quantity: 137 cups",
    "CA$9.00",
    "CA$1,233.00",
    "Delivery city: Vancouver, BC",
    "Custom branding requested: Yes",
    "Red ribbon please.",
    "Taxes and delivery are extra.",
    "not a confirmed order",
  ])
    assert.ok(draft.body.includes(expected), expected);
  assert.ok(draft.text.startsWith("Subject: Sweet Gifts"));
});

test("email draft safely encodes punctuation, Unicode, and line breaks", () => {
  const draft = createQuoteDraft(
    {
      ...validQuote,
      company: "R&D #1 — Événements",
      comments: "A&B? 50% + custom\nSecond line",
    },
    "Sweet Gifts",
  );
  const mailto = createMailto("quotes@example.test", draft);
  assert.ok(mailto.startsWith("mailto:quotes%40example.test?subject="));
  const parameters = new URLSearchParams(mailto.split("?")[1]);
  assert.equal(parameters.get("subject"), draft.subject);
  assert.equal(parameters.get("body"), draft.body);
  assert.throws(() => createMailto("", draft));
  assert.throws(() => createMailto("address?subject=bad", draft));
});

test("company line breaks cannot inject email subject headers", () => {
  const draft = createQuoteDraft(
    { ...validQuote, company: "Example\r\nBcc: someone@example.test" },
    "Sweet Gifts",
  );
  assert.ok(!/[\r\n]/.test(draft.subject));
});
