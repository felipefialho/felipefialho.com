/** Capturing pattern for the attribute source of a start tag: a `>` inside a quoted value does not end it. */
export const TAG_ATTRS = '((?:[^>"\']|"[^"]*"|\'[^\']*\')*?)';

export type Attrs = Map<string, string | true>;

const ATTR = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

/** Parses the attribute source of a start tag. Names are lowercased, values stay as written (entities intact). */
export function parseAttrs(source: string): Attrs {
  const attrs: Attrs = new Map();
  for (const [, name, double, single, bare] of source.matchAll(ATTR)) {
    // Values are re-serialized inside double quotes, so a raw quote from a single-quoted value is escaped
    attrs.set(name.toLowerCase(), double ?? single?.replaceAll('"', '&quot;') ?? bare ?? true);
  }
  return attrs;
}

export const escapeAttr = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

export const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const NAMED_ENTITIES: Record<string, string> = { quot: '"', apos: '\'', lt: '<', gt: '>', amp: '&' };

/** Decodes named (quot, apos, lt, gt, amp) and numeric entities in a single pass, so `&amp;lt;` becomes `&lt;`. */
export const decodeEntities = (value: string) =>
  value.replace(/&(?:#(\d+)|#x([\da-f]+)|(quot|apos|lt|gt|amp));/gi, (match, decimal?: string, hex?: string, name?: string) => {
    if (name) return NAMED_ENTITIES[name.toLowerCase()];
    const codePoint = decimal ? Number(decimal) : Number.parseInt(hex ?? '', 16);
    return codePoint <= 0x10ffff ? String.fromCodePoint(codePoint) : match;
  });

/** Serializes attributes; string values are taken as already escaped unless `escape` is set. */
export function serializeAttrs(attrs: Attrs, escape = false): string {
  return [...attrs]
    .map(([name, value]) => (value === true ? name : `${name}="${escape ? escapeAttr(value) : value}"`))
    .join(' ');
}

export const stringAttr = (attrs: Attrs, name: string) => {
  const value = attrs.get(name);
  return typeof value === 'string' ? value : undefined;
};
