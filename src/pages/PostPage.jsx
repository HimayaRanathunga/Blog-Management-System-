import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { blogApi } from '../services/blogApi';

/* ── Back link ── */
function BackLink() {
  const [hov, setHov] = useState(false);
  return (
    <Link
      to="/#posts"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        fontSize: 11, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase',
        color: hov ? 'var(--accent)' : 'var(--text-muted)',
        textDecoration: 'none', transition: 'color .2s',
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
      </svg>
      All posts
    </Link>
  );
}

/* ── Page ── */
export default function PostPage() {
  const { slug }          = useParams();
  const [post, setPost]   = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | missing | error

  useEffect(() => {
    window.scrollTo(0, 0);
    let alive = true;
    setState('loading');
    blogApi.bySlug(slug)
      .then(p => { if (alive) { setPost(p); setState('ready'); } })
      .catch(e => alive && setState(/\(404\)/.test(e.message) ? 'missing' : 'error'));
    return () => { alive = false; };
  }, [slug]);

  /* Reflect the post in the tab title while it is open. */
  useEffect(() => {
    if (!post) return;
    const prev = document.title;
    document.title = post.title;
    return () => { document.title = prev; };
  }, [post]);

  return (
    <>
      <Navbar />

      <main style={{ paddingTop: 66, minHeight: '70vh' }}>
        {state !== 'ready' ? (
          <div className="container-sm" style={{ padding: '120px 32px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 20 }}>
              {state === 'loading' ? 'Loading…'
                : state === 'missing' ? 'This post doesn’t exist or is no longer published.'
                : 'Could not load this post. Please try again later.'}
            </p>
            {state !== 'loading' && <BackLink />}
          </div>
        ) : (
          <article>
            {/* Cover */}
            {post.image && (
              <div style={{ height: 'clamp(240px,42vw,440px)', position: 'relative', overflow: 'hidden', background: 'linear-gradient(140deg,#f0f1f5,#e8e9f0)' }}>
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 60%)' }} />
              </div>
            )}

            {/* Header */}
            <div className="container-sm" style={{ paddingTop: post.image ? 40 : 72, paddingBottom: 8 }}>
              <div style={{ marginBottom: 22 }}><BackLink /></div>

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '4px 11px', borderRadius: 20, background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border-gold)' }}>
                    {tag}
                  </span>
                ))}
                <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                  {[post.author, post.date, post.readMins && `${post.readMins} min read`].filter(Boolean).join(' · ')}
                </span>
              </div>

              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, lineHeight: 1.18, letterSpacing: '-0.6px', color: 'var(--text-primary)' }}>
                {post.title}
              </h1>

              <div className="rule" />

              {post.description && (
                <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.75, fontStyle: 'italic' }}>
                  {post.description}
                </p>
              )}
            </div>

            {/* Body */}
            <div className="container-sm" style={{ paddingTop: 26, paddingBottom: 72 }}>
              <div
                className="post-body"
                /* Authored by the site owner in the Syncy dashboard rich-text editor. */
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div style={{ marginTop: 44, paddingTop: 24, borderTop: '1px solid var(--border-glass)' }}>
                <BackLink />
              </div>
            </div>
          </article>
        )}
      </main>

      <Footer />

      <style>{`
        .post-body { font-size: 16px; line-height: 1.9; color: var(--text-dim); }
        .post-body > * + * { margin-top: 18px; }
        .post-body h1, .post-body h2, .post-body h3 {
          font-family: 'Playfair Display', serif; font-weight: 800;
          color: var(--text-primary); line-height: 1.3; margin-top: 34px;
        }
        .post-body h1 { font-size: 28px; } .post-body h2 { font-size: 23px; } .post-body h3 { font-size: 19px; }
        .post-body a { color: var(--accent); text-decoration: underline; }
        .post-body img { max-width: 100%; height: auto; border-radius: 12px; display: block; }
        .post-body ul, .post-body ol { padding-left: 24px; }
        .post-body li + li { margin-top: 8px; }
        .post-body blockquote {
          border-left: 3px solid var(--accent); padding-left: 18px;
          font-style: italic; color: var(--text-muted);
        }
        .post-body pre {
          background: rgba(12,12,30,0.05); padding: 16px 18px; border-radius: 12px;
          overflow-x: auto; font-size: 14px;
        }
        .post-body code { font-size: 14px; }
      `}</style>
    </>
  );
}