export type Selectable = {
  id: string;
  createdAt: Date;
  highlight: boolean;
  bigHighlight: boolean;
};

export function newestFirst<T extends Selectable>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

export function selectHome<T extends Selectable>(
  items: T[],
): { featured?: T; small: T[] } {
  const sorted = newestFirst(items);
  const featured =
    sorted.find((item) => item.bigHighlight) ??
    sorted.find((item) => item.highlight);
  const small = sorted
    .filter((item) => item.highlight && item !== featured)
    .slice(0, 3);
  return { featured, small };
}
