import type { APIRoute, GetStaticPaths } from 'astro';
import { getOgPaths, ogResponse } from '../../../lib/og';

export const getStaticPaths = (() => getOgPaths('en')) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => ogResponse(props.input);
