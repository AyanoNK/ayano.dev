import { expect, test } from "vitest";
import { experienceDates, groupByCompany } from "./group";

const company = {
  id: "a",
  order: 1,
  roles: [{ id: "ai", start: "2025-06" }],
};
const exp = {
  id: "a1",
  company: "a",
  role: "ai",
  order: 1,
  home: false,
};

test("companies and experiences come out in order", () => {
  const companies = [
    { id: "b", order: 2, roles: [] },
    { id: "a", order: 1, roles: [] },
  ];
  const experiences = [
    { ...exp, id: "a2", order: 2 },
    { ...exp, id: "a1", order: 1 },
    { ...exp, id: "b1", company: "b" },
  ];
  expect(
    groupByCompany(companies, experiences).map((g) => [
      g.company.id,
      g.experiences.map((e) => e.id),
    ]),
  ).toEqual([
    ["a", ["a1", "a2"]],
    ["b", ["b1"]],
  ]);
});

test("a company with no experiences is left out", () => {
  const companies = [company, { id: "c", order: 3, roles: [] }];
  expect(groupByCompany(companies, [exp]).map((g) => g.company.id)).toEqual([
    "a",
  ]);
});

test("experience without dates uses its role", () => {
  expect(experienceDates(exp, company)).toEqual({
    start: "2025-06",
    end: undefined,
  });
});

test("experience dates win over role dates", () => {
  expect(
    experienceDates({ ...exp, start: "2024-01", end: "2024-06" }, company),
  ).toEqual({ start: "2024-01", end: "2024-06" });
});
