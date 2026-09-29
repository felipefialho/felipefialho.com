export type Attrs = Map<string, string | true>;

const ATTR = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

/** Parses the attribute source of a start tag. Names are lowercased, values stay as written (entities intact). */
export function parseAttrs(source: string): Attrs {
  const attrs: Attrs = new Map();
  for (const [, name, double, single, bare] of source.matchAll(ATTR)) {
    attrs.set(name.toLowerCase(), double ?? single ?? bare ?? true);
  }
  return attrs;
}

export const escapeAttr = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

export const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export const decodeEntities = (value: string) =>
  value
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', '\'')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&');

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
