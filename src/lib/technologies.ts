/** Technology kinds, in the order chips are shown. */
export const KINDS = ["protocol", "library", "language", "platform"] as const;

export type Kind = (typeof KINDS)[number];

export interface Chip {
  name: string;
  /** Undefined when the name is not in the technologies list. */
  kind: Kind | undefined;
}

/**
 * Sorts technology names by kind, keeping the author's order inside a kind.
 * Names with no kind go last.
 */
export function sortTechnologies(
  names: string[],
  kinds: ReadonlyMap<string, Kind>,
): Chip[] {
  const rank = (chip: Chip) =>
    chip.kind === undefined ? KINDS.length : KINDS.indexOf(chip.kind);
  return names
    .map((name) => ({ name, kind: kinds.get(name) }))
    .sort((a, b) => rank(a) - rank(b));
}

/** Joins several lists of names, keeping the first time each name appears. */
export function mergeTechnologies(lists: string[][]): string[] {
  return [...new Set(lists.flat())];
}
