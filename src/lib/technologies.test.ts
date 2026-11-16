import { describe, expect, test } from "vitest";
import { mergeTechnologies, sortTechnologies, type Kind } from "./technologies";

const kinds = new Map<string, Kind>([
  ["Python", "language"],
  ["REST", "protocol"],
  ["Django", "library"],
  ["AWS", "platform"],
  ["Go", "language"],
  ["React", "library"],
]);

const names = (list: string[]) =>
  sortTechnologies(list, kinds).map((chip) => chip.name);

describe("sortTechnologies", () => {
  test("sorts by kind in protocol, library, language, platform order", () => {
    expect(names(["AWS", "Python", "Django", "REST"])).toEqual([
      "REST",
      "Django",
      "Python",
      "AWS",
    ]);
  });

  test("keeps the author's order inside a kind", () => {
    expect(names(["Go", "Python"])).toEqual(["Go", "Python"]);
  });

  test("puts unknown names last with no kind, in author order", () => {
    expect(sortTechnologies(["Zig", "Python", "Elm"], kinds)).toEqual([
      { name: "Python", kind: "language" },
      { name: "Zig", kind: undefined },
      { name: "Elm", kind: undefined },
    ]);
  });

  test("matches names exactly, case included", () => {
    expect(sortTechnologies(["react"], kinds)).toEqual([
      { name: "react", kind: undefined },
    ]);
  });

  test("keeps duplicates", () => {
    expect(names(["Go", "REST", "Go"])).toEqual(["REST", "Go", "Go"]);
  });

  test("returns an empty list for no names", () => {
    expect(sortTechnologies([], kinds)).toEqual([]);
  });
});

describe("mergeTechnologies", () => {
  test("joins lists, keeping the first time each name appears", () => {
    expect(
      mergeTechnologies([
        ["Python", "AWS"],
        ["Go", "Python"],
        ["AWS", "REST"],
      ]),
    ).toEqual(["Python", "AWS", "Go", "REST"]);
  });

  test("returns an empty list for no lists", () => {
    expect(mergeTechnologies([])).toEqual([]);
  });
});
