import { expect, test } from "vitest";
import { checkExperiences, type DetailRef } from "./check";

const companies = [{ id: "acme", roles: [{ id: "dev" }] }];
const experiences = [{ id: "acme-x", company: "acme", role: "dev" }];
const details: DetailRef[] = ["en", "es", "ja"].map((lang) => ({
  id: `acme-x/${lang}`,
  highlights: ["one", "two"],
}));

test("valid data has no problems", () => {
  expect(checkExperiences(companies, experiences, details)).toEqual([]);
});

test("missing language file", () => {
  const out = checkExperiences(
    companies,
    experiences,
    details.filter((d) => d.id !== "acme-x/ja"),
  );
  expect(out).toEqual(["acme-x: missing ja.md"]);
});

test("highlight counts differ", () => {
  const changed = details.map((d) =>
    d.id === "acme-x/es" ? { ...d, highlights: ["a", "b", "c"] } : d,
  );
  const out = checkExperiences(companies, experiences, changed);
  expect(out).toEqual(["acme-x: es.md has 3 highlights, en.md has 2"]);
});

test("unknown company", () => {
  const out = checkExperiences(
    companies,
    [{ id: "acme-x", company: "acmee", role: "dev" }],
    details,
  );
  expect(out).toEqual(['acme-x: unknown company "acmee"']);
});

test("unknown role", () => {
  const out = checkExperiences(
    companies,
    [{ id: "acme-x", company: "acme", role: "lead" }],
    details,
  );
  expect(out).toEqual(['acme-x: unknown role "lead" in company "acme"']);
});

test("details without meta.yaml", () => {
  const out = checkExperiences(companies, experiences, [
    ...details,
    { id: "ghost/en", highlights: ["a"] },
  ]);
  expect(out).toEqual(["ghost: has en.md but no meta.yaml"]);
});
