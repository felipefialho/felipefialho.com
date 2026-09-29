import type { APIContext } from 'astro';
import { feedResponse } from '../lib/feed';

export const GET = (context: APIContext) => feedResponse('pt', context);
