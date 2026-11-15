import { expect, test } from "vitest";
import {
  companyDates,
  experienceDates,
  groupByCompany,
  homeLines,
} from "./group";

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
  home: [],
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

test("company dates span all roles and stay open while one is current", () => {
  expect(
    companyDates({
      ...company,
      roles: [
        { id: "ai", start: "2025-06" },
        { id: "swe", start: "2023-08", end: "2025-05" },
      ],
    }),
  ).toEqual({ start: "2023-08", end: undefined });
});

test("company dates end with the last role", () => {
  expect(
    companyDates({
      ...company,
      roles: [
        { id: "a", start: "2020-01", end: "2021-03" },
        { id: "b", start: "2021-04", end: "2022-08" },
      ],
    }),
  ).toEqual({ start: "2020-01", end: "2022-08" });
});

test("experience with a start but no end uses its role's end", () => {
  const past = {
    ...company,
    roles: [{ id: "ai", start: "2023-08", end: "2025-05" }],
  };
  expect(experienceDates({ ...exp, start: "2024-01" }, past)).toEqual({
    start: "2024-01",
    end: "2025-05",
  });
});

test("home lines pick highlights by position and the summary by name", () => {
  expect(
    homeLines([2, "summary"], "The summary.", ["First.", "Second."]),
  ).toEqual(["Second.", "The summary."]);
});

test("no home picks gives no lines", () => {
  expect(homeLines([], "The summary.", ["First."])).toEqual([]);
});
