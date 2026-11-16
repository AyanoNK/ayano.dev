/** Technology kinds, in the order chips are shown. */
export const KINDS = ["protocol", "library", "language", "platform"] as const;

export type Kind = (typeof KINDS)[number];

/** What the technologies list says about one name. */
export interface Technology {
  kind: Kind;
  /** Related names share a group, such as "AWS" for "AWS S3". */
  group?: string;
}

export interface Chip {
  name: string;
  /** Undefined when the name is not in the technologies list. */
  kind: Kind | undefined;
}

/**
 * Sorts technology names by kind, keeping the author's order inside a kind.
 * Names in the same group stay together where the group first appears, with
 * the group's own name first. Names with no kind go last.
 */
export function sortTechnologies(
  names: string[],
  technologies: ReadonlyMap<string, Technology>,
): Chip[] {
  const groupOf = (name: string) => technologies.get(name)?.group ?? name;
  const firstSeen = new Map<string, number>();
  names.forEach((name, index) => {
    if (!firstSeen.has(groupOf(name))) firstSeen.set(groupOf(name), index);
  });
  const kindRank = (kind: Kind | undefined) =>
    kind === undefined ? KINDS.length : KINDS.indexOf(kind);
  return names
    .map((name) => ({ name, kind: technologies.get(name)?.kind }))
    .sort(
      (a, b) =>
        kindRank(a.kind) - kindRank(b.kind) ||
        firstSeen.get(groupOf(a.name))! - firstSeen.get(groupOf(b.name))! ||
        Number(b.name === groupOf(b.name)) - Number(a.name === groupOf(a.name)),
    );
}

/** Joins several lists of names, keeping the first time each name appears. */
export function mergeTechnologies(lists: string[][]): string[] {
  return [...new Set(lists.flat())];
}

/**
 * Sorts names by kind and splits them into one row per kind, leaving out
 * kinds with no names. Names with no kind form the last row.
 */
export function groupByKind(
  names: string[],
  technologies: ReadonlyMap<string, Technology>,
): Chip[][] {
  const rows: Chip[][] = [];
  for (const chip of sortTechnologies(names, technologies)) {
    const last = rows.at(-1);
    if (last && last[0].kind === chip.kind) last.push(chip);
    else rows.push([chip]);
  }
  return rows;
}
