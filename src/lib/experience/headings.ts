/**
 * Prefixes the id of every heading with the section name. A company page shows many
 * sections, and each one has headings such as "Results", so their ids would repeat.
 */
export function prefixHeadingIds(html: string, prefix: string): string {
  return html.replace(/(<h[1-6][^>]*\sid=")([^"]*")/g, `$1${prefix}-$2`);
}
