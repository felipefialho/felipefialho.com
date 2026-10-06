// Regenerates the raster brand icons from the vector mark. Usage: node scripts/build-icons.mjs
// public/favicon.svg is the source of truth for the mark: the `ff` glyphs are outlines of Geist Mono 700 (240px, letter-spacing -0.1em), so no font is needed at render time.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const BG = '#0f0f0f';
const ACCENT = '#a1ecf7';
const SIZE = 512;

const GLYPHS =
  'M80.2 205L47.8 205L47.8 102.3L15.4 102.3L15.4 76.4L47.8 76.4L47.8 72.8Q47.8 53.3 57 44.0Q66.2 34.6 86.2 34.6L86.2 34.6L128.6 34.6L128.6 60.5L93.6 60.5Q86.6 60.5 83.4 63.8Q80.2 67 80.2 73L80.2 73L80.2 76.4L127.7 76.4L127.7 102.3L80.2 102.3L80.2 205ZM200.2 205L167.8 205L167.8 102.3L135.4 102.3L135.4 76.4L167.8 76.4L167.8 72.8Q167.8 53.3 177 44.0Q186.2 34.6 206.2 34.6L206.2 34.6L248.6 34.6L248.6 60.5L213.6 60.5Q206.6 60.5 203.4 63.8Q200.2 67 200.2 73L200.2 73L200.2 76.4L247.7 76.4L247.7 102.3L200.2 102.3L200.2 205Z';

// `radius` 0 gives a full-bleed square (apple-touch-icon); scanlines only on the large icon
const mark = ({ radius, scanlines }) => {
  const lines = scanlines
    ? `<defs><pattern id="s" width="8" height="8" patternUnits="userSpaceOnUse"><rect y="6" width="8" height="2" fill="${ACCENT}" fill-opacity=".05"/></pattern></defs><rect width="${SIZE}" height="${SIZE}" fill="url(#s)"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}"><clipPath id="c"><rect width="${SIZE}" height="${SIZE}" rx="${radius}"/></clipPath><g clip-path="url(#c)"><rect width="${SIZE}" height="${SIZE}" fill="${BG}"/>${lines}<path transform="translate(85 124)" fill="#f1f1f1" d="${GLYPHS}"/><rect x="331" y="300" width="96" height="30" rx="6" fill="${ACCENT}"/></g></svg>`;
};

const png = (svg, size) =>
  sharp(Buffer.from(svg), { density: (72 * size) / SIZE })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

// PNG-in-ICO container (supported by every browser that still asks for /favicon.ico)
const ico = (images) => {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const entry = 6 + i * 16;
    header.writeUInt8(size, entry);
    header.writeUInt8(size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(data.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map(({ data }) => data)]);
};

const rounded = mark({ radius: 112, scanlines: false });
await writeFile('public/favicon.svg', `${rounded}\n`);
await writeFile('public/icon-512.png', await png(mark({ radius: 112, scanlines: true }), 512));
await writeFile('public/apple-touch-icon.png', await png(mark({ radius: 0, scanlines: false }), 180));
await writeFile(
  'public/favicon.ico',
  ico(await Promise.all([32, 16].map(async (size) => ({ size, data: await png(rounded, size) })))),
);
