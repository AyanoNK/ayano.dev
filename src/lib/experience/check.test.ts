import { expect, test } from "vitest";
import { checkExperiences, type DetailRef } from "./check";

const companies = [{ id: "acme", roles: [{ id: "dev" }] }];
const experiences = [
  {
    id: "acme/x",
    company: "acme",
    role: "dev",
    home: [1, 2, "summary" as const],
  },
];
const details: DetailRef[] = ["en", "es", "ja"].map((lang) => ({
  id: `acme/x/${lang}`,
  highlights: ["one", "two"],
  body: "Text.",
}));

test("valid data has no problems", () => {
  expect(checkExperiences(companies, experiences, details)).toEqual([]);
});

test("missing language file", () => {
  const out = checkExperiences(
    companies,
    experiences,
    details.filter((d) => d.id !== "acme/x/ja"),
  );
  expect(out).toEqual(["acme/x: missing ja.md"]);
});

test("highlight counts differ", () => {
  const changed = details.map((d) =>
    d.id === "acme/x/es" ? { ...d, highlights: ["a", "b", "c"] } : d,
  );
  const out = checkExperiences(companies, experiences, changed);
  expect(out).toEqual(["acme/x: es.md has 3 highlights, en.md has 2"]);
});

test("unknown company", () => {
  const out = checkExperiences(
    companies,
    [{ ...experiences[0], company: "acmee" }],
    details,
  );
  expect(out).toEqual([
    'acme/x: unknown company "acmee"',
    "acme: has no sections",
  ]);
});

test("unknown role", () => {
  const out = checkExperiences(
    companies,
    [{ ...experiences[0], role: "lead" }],
    details,
  );
  expect(out).toEqual(['acme/x: unknown role "lead" in company "acme"']);
});

test("details without meta.yaml", () => {
  const out = checkExperiences(companies, experiences, [
    ...details,
    { id: "acme/ghost/en", highlights: ["a"], body: "Text." },
  ]);
  expect(out).toEqual(["acme/ghost: has en.md but no meta.yaml"]);
});

test("empty body", () => {
  const changed = details.map((d) =>
    d.id === "acme/x/ja" ? { ...d, body: "  \n" } : d,
  );
  expect(checkExperiences(companies, experiences, changed)).toEqual([
    "acme/x: ja.md has no body",
  ]);
});

test("company with no sections", () => {
  const out = checkExperiences(
    [...companies, { id: "empty", roles: [{ id: "dev" }] }],
    experiences,
    details,
  );
  expect(out).toEqual(["empty: has no sections"]);
});

test("zero highlights in every language is fine", () => {
  const none = details.map((d) => ({ ...d, highlights: [] }));
  const summaryOnly = [
    {
      ...experiences[0],
      home: ["summary" as const, "summary" as const, "summary" as const],
    },
  ];
  expect(checkExperiences(companies, summaryOnly, none)).toEqual([]);
});

test("local image in a body", () => {
  const changed = details.map((d) =>
    d.id === "acme/x/en"
      ? { ...d, body: "Text.\n\n![Diagram](./diagram.png)" }
      : d,
  );
  expect(checkExperiences(companies, experiences, changed)).toEqual([
    "acme/x: en.md uses a local image, which company pages cannot show; use a full https:// URL",
  ]);
});

test("remote image in a body is fine", () => {
  const changed = details.map((d) => ({
    ...d,
    body: "![Diagram](https://example.com/d.png)",
  }));
  expect(checkExperiences(companies, experiences, changed)).toEqual([]);
});

test("home card with fewer than 3 lines", () => {
  const out = checkExperiences(
    companies,
    [{ ...experiences[0], home: [1] }],
    details,
  );
  expect(out).toEqual(["acme: home card has 1 line, needs at least 3"]);
});

test("home pick past the last highlight", () => {
  const out = checkExperiences(
    companies,
    [{ ...experiences[0], home: [1, 2, 3] }],
    details,
  );
  expect(out).toEqual(["acme/x: home picks highlight 3, but there are 2"]);
});
