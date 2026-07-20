/**
 * Read-only client for the Syncy public blog feed.
 * Posts are written by the owner in the Syncy dashboard (/blog) and served
 * here through GET /api/v1/public/blog — published posts only, no auth.
 */

const API_URL = import.meta.env.VITE_SYNCY_API_URL || 'http://localhost:8000/api/v1';

// Backend origin (strip the /api/v1 suffix) — used to resolve /storage/* image URLs.
const ORIGIN = API_URL.replace(/\/api\/v1\/?$/, '');

/** Turn a stored "/storage/..." path into an absolute URL the browser can load. */
export const assetUrl = (path) =>
  !path ? '' : /^https?:\/\//.test(path) ? path : `${ORIGIN}${path}`;

const fmtDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

/** Map a Syncy post onto the shape BlogCard already renders. */
const toCard = (p) => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  image: assetUrl(p.cover_image),
  description: p.excerpt || '',
  content: p.content || '',
  tags: p.category ? [p.category] : [],
  readMins: p.read_mins,
  author: p.author?.name || '',
  date: fmtDate(p.published_at),
});

async function get(path) {
  const res = await fetch(`${API_URL}${path}`, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Blog request failed (${res.status})`);
  const json = await res.json();
  return json.data;
}

export const blogApi = {
  /** Published posts, newest first. No `content` — fetch a single post for that. */
  list: async () => (await get('/public/blog')).map(toCard),

  /** One post including its rich-text `content`. */
  bySlug: async (slug) => toCard(await get(`/public/blog/${encodeURIComponent(slug)}`)),
};