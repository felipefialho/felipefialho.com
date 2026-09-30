/** Profiles in priority order: X is the most active one, so it leads */
export const SOCIAL_PROFILES = [
  { id: 'x', label: 'X (Twitter)', handle: '@felipefialho_', href: 'https://x.com/felipefialho_' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'felipefialho', href: 'https://www.linkedin.com/in/felipefialho/' },
  { id: 'github', label: 'GitHub', handle: 'felipefialho', href: 'https://github.com/felipefialho' },
  { id: 'youtube', label: 'YouTube', handle: '@felipefialhodev', href: 'https://www.youtube.com/@felipefialhodev' },
] as const;

export type SocialId = (typeof SOCIAL_PROFILES)[number]['id'] | 'rss';

export const CONTACT_EMAIL = 'hi@felipefialho.com';
