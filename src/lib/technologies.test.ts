import { describe, expect, test } from "vitest";
import {
  groupByKind,
  mergeTechnologies,
  sortTechnologies,
  type Technology,
} from "./technologies";

const kinds = new Map<string, Technology>([
  ["Python", { kind: "language" }],
  ["REST", { kind: "protocol" }],
  ["Django", { kind: "library" }],
  ["AWS", { kind: "platform", group: "AWS" }],
  ["AWS S3", { kind: "platform", group: "AWS" }],
  ["AWS EC2", { kind: "platform", group: "AWS" }],
  ["Docker", { kind: "platform" }],
  ["Go", { kind: "language" }],
  ["React", { kind: "library" }],
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

  test("keeps a group together where its first name appears", () => {
    expect(names(["AWS S3", "Docker", "AWS EC2"])).toEqual([
      "AWS S3",
      "AWS EC2",
      "Docker",
    ]);
  });

  test("puts the group's own name first in the group", () => {
    expect(names(["AWS S3", "AWS EC2", "AWS"])).toEqual([
      "AWS",
      "AWS S3",
      "AWS EC2",
    ]);
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

describe("groupByKind", () => {
  test("returns one row per kind present, in kind order, unknown last", () => {
    const rows = groupByKind(["AWS", "Zig", "Python", "REST", "Go"], kinds);
    expect(rows.map((row) => row.map((chip) => chip.name))).toEqual([
      ["REST"],
      ["Python", "Go"],
      ["AWS"],
      ["Zig"],
    ]);
  });

  test("leaves out kinds with no names", () => {
    expect(groupByKind(["Django"], kinds)).toEqual([
      [{ name: "Django", kind: "library" }],
    ]);
  });

  test("returns no rows for no names", () => {
    expect(groupByKind([], kinds)).toEqual([]);
  });
});
