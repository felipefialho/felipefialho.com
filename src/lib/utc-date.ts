import { z } from 'astro/zod';

// Quoted dates without an offset ('2019-09-05 06:46:38') are read as UTC, like unquoted YAML timestamps,
// so the rendered day never depends on the build machine's timezone
export const utcDate = z.preprocess((value) => {
  if (typeof value !== 'string' || /(Z|[+-]\d{2}:?\d{2})$/.test(value.trim())) return value;
  const [day, time = '00:00:00'] = value.trim().split(/[ T]/);
  return `${day}T${time}Z`;
}, z.coerce.date());
