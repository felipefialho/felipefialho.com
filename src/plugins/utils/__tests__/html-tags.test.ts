import { describe, expect, it } from 'vitest';
import { TAG_ATTRS, decodeEntities, escapeAttr, escapeHtml, parseAttrs, serializeAttrs, stringAttr } from './html-tags.ts';

describe('parseAttrs', () => {
  it('reads double-quoted, single-quoted, bare and boolean attributes', () => {
    const attrs = parseAttrs('src="a.png" alt=\'b\' width=10 hidden');
    expect(Object.fromEntries(attrs)).toEqual({ src: 'a.png', alt: 'b', width: '10', hidden: true });
  });

  it('lowercases names but keeps values as written', () => {
    expect(parseAttrs('SRC="A&amp;B"').get('src')).toBe('A&amp;B');
  });

  it('escapes a raw double quote inside a single-quoted value', () => {
    const attrs = parseAttrs('title=\'say "hi"\'');
    expect(attrs.get('title')).toBe('say &quot;hi&quot;');
    expect(serializeAttrs(attrs)).toBe('title="say &quot;hi&quot;"');
  });

  it('returns an empty map for an empty source', () => {
    expect(parseAttrs('').size).toBe(0);
  });
});

describe('serializeAttrs', () => {
  it('writes booleans as bare names and strings as double-quoted values', () => {
    expect(serializeAttrs(new Map<string, string | true>([['a', 'b'], ['hidden', true]]))).toBe('a="b" hidden');
  });

  it('takes values as already escaped unless asked to escape', () => {
    const attrs = new Map<string, string | true>([['title', 'a & "b"']]);
    expect(serializeAttrs(attrs)).toBe('title="a & "b""');
    expect(serializeAttrs(attrs, true)).toBe('title="a &amp; &quot;b&quot;"');
  });
});

describe('escaping', () => {
  it('escapeAttr covers ampersands and quotes', () => {
    expect(escapeAttr('a & "b" <c>')).toBe('a &amp; &quot;b&quot; <c>');
  });

  it('escapeHtml also covers angle brackets', () => {
    expect(escapeHtml('<a href="x">&</a>')).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
  });
});

describe('decodeEntities', () => {
  it('decodes named entities', () => {
    expect(decodeEntities('&quot;a&quot; &apos;b&apos; &lt;c&gt; &amp;')).toBe('"a" \'b\' <c> &');
  });

  it('decodes decimal and hex numeric entities', () => {
    expect(decodeEntities('&#65;&#x42;&#X43;')).toBe('ABC');
  });

  it('decodes in a single pass, so double-encoded text is not decoded twice', () => {
    expect(decodeEntities('&amp;lt;')).toBe('&lt;');
  });

  it('keeps out-of-range code points and unknown entities as they are', () => {
    expect(decodeEntities('&#x110000; &nbsp;')).toBe('&#x110000; &nbsp;');
  });
});

describe('stringAttr', () => {
  it('returns strings only', () => {
    const attrs = parseAttrs('src="a" hidden');
    expect(stringAttr(attrs, 'src')).toBe('a');
    expect(stringAttr(attrs, 'hidden')).toBeUndefined();
    expect(stringAttr(attrs, 'missing')).toBeUndefined();
  });
});

describe('TAG_ATTRS', () => {
  it('does not end the tag at a > inside a quoted value', () => {
    const match = new RegExp(`<iframe${TAG_ATTRS}>`).exec('<iframe title="a > b" src="x"></iframe>');
    expect(match?.[1]).toBe(' title="a > b" src="x"');
  });
});
