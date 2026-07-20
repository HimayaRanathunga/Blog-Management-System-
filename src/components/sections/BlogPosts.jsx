import { useState, useEffect, useCallback } from 'react';
import useReveal from '../../hooks/useReveal';
import { blogApi } from '../../services/blogApi';

/* ── Card ── */
function BlogCard({ post, delay, vis, onOpen }) {
  const [hov, setHov] = useState(false);

  return (
    <article
      onClick={() => onOpen(post)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--glass-card)',
        border: `1px solid ${hov ? 'var(--border-gold)' : 'var(--border-glass)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all .28s cubic-bezier(0.22,1,0.36,1)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Image */}
      <div style={{ height: 200, overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(140deg,#f0f1f5,#e8e9f0)', position: 'relative' }}>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform .55s cubic-bezier(0.22,1,0.36,1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0e0e24,#1a1a3a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(184,134,11,0.4)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
        )}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: hov ? 'var(--accent)' : 'transparent', transition: 'background .28s' }} />
        {post.date && (
          <div style={{ position: 'absolute', bottom: 10, left: 12, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', padding: '3px 10px', borderRadius: 20 }}>{post.date}</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>

        {/* Category */}
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20, background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border-gold)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.38, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.75, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.description}
        </p>

        {/* Meta + CTA */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {post.author}{post.author && post.readMins ? ' · ' : ''}{post.readMins ? `${post.readMins} min read` : ''}
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: hov ? 'var(--accent)' : 'var(--text-muted)', transition: 'color .2s', flexShrink: 0 }}>
            Read post
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </div>
    </article>
  );
}

/* ── Reader modal ── */
function PostModal({ post, onClose }) {
  const [full, setFull]   = useState(post.content ? post : null);
  const [err, setErr]     = useState('');

  /* Pull the full rich-text body — the list endpoint only carries the excerpt. */
  useEffect(() => {
    if (full) return;
    let alive = true;
    blogApi.bySlug(post.slug)
      .then(p => alive && setFull(p))
      .catch(() => alive && setErr('Could not load this post.'));
    return () => { alive = false; };
  }, [post.slug, full]);

  /* Escape to close + lock background scroll */
  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(5,5,15,0.88)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div style={{ position: 'relative', background: 'var(--glass-card, #fff)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-gold)', borderRadius: 20, width: '100%', maxWidth: 760, maxHeight: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.55)' }}>

        {/* Cover */}
        {post.image && (
          <div style={{ height: 240, flexShrink: 0, position: 'relative' }}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 55%)' }} />
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: 'absolute', top: 14, right: 14, zIndex: 1, width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '28px 34px 34px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20, background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border-gold)' }}>{tag}</span>
            ))}
            <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
              {[post.author, post.date, post.readMins && `${post.readMins} min read`].filter(Boolean).join(' · ')}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,2.6vw,32px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.4px', color: 'var(--text-primary)', marginBottom: 12 }}>
            {post.title}
          </h2>

          {post.description && (
            <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 22, fontStyle: 'italic' }}>{post.description}</p>
          )}

          {err ? (
            <p style={{ fontSize: 13, color: '#ff6b6b' }}>{err}</p>
          ) : !full ? (
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
          ) : (
            <div
              className="post-body"
              /* Authored by the site owner in the Syncy dashboard rich-text editor. */
              dangerouslySetInnerHTML={{ __html: full.content }}
            />
          )}
        </div>
      </div>

      <style>{`
        .post-body { font-size: 15px; line-height: 1.85; color: var(--text-dim); }
        .post-body > * + * { margin-top: 14px; }
        .post-body h1, .post-body h2, .post-body h3 {
          font-family: 'Playfair Display', serif; font-weight: 800;
          color: var(--text-primary); line-height: 1.35; margin-top: 26px;
        }
        .post-body h1 { font-size: 24px; } .post-body h2 { font-size: 20px; } .post-body h3 { font-size: 17px; }
        .post-body a { color: var(--accent); text-decoration: underline; }
        .post-body img { max-width: 100%; height: auto; border-radius: 10px; display: block; }
        .post-body ul, .post-body ol { padding-left: 22px; }
        .post-body li + li { margin-top: 6px; }
        .post-body blockquote {
          border-left: 3px solid var(--accent); padding-left: 16px;
          font-style: italic; color: var(--text-muted);
        }
        .post-body pre {
          background: rgba(0,0,0,0.35); padding: 14px 16px; border-radius: 10px;
          overflow-x: auto; font-size: 13px;
        }
      `}</style>
    </div>
  );
}

/* ── Section ── */
export default function BlogPosts() {
  const [ref, vis]         = useReveal();
  const [posts, setPosts]  = useState([]);
  const [state, setState]  = useState('loading'); // loading | ready | error
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    blogApi.list()
      .then(p => { if (alive) { setPosts(p); setState('ready'); } })
      .catch(() => alive && setState('error'));
    return () => { alive = false; };
  }, []);

  const close = useCallback(() => setActive(null), []);
  const v = vis ? ' in' : '';

  return (
    <section style={{ padding: '64px 0', background: 'var(--glass-mid)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={ref} className="container">

        {/* Header */}
        <div className={`reveal${v}`} style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="eyebrow">Blog</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.4vw,46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginBottom: 14 }}>
            Ideas That{' '}
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Move the Needle</em>
          </h2>
          <p className="section-sub" style={{ maxWidth: 500, margin: '0 auto' }}>
            Insights on hospitality marketing, revenue strategy, AI, and leadership, straight from the field.
          </p>
        </div>

        {state !== 'ready' || posts.length === 0 ? (
          <div className={`reveal d2${v}`} style={{ textAlign: 'center', padding: '56px 0', color: 'var(--text-muted)', fontSize: 14 }}>
            {state === 'loading' ? 'Loading posts…'
              : state === 'error' ? 'Posts are unavailable right now. Please try again later.'
              : 'No posts published yet.'}
          </div>
        ) : (
          <div className={`reveal d2${v} blogposts-grid`} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {posts.map((post, i) => (
              <BlogCard key={post.id} post={post} vis={vis} delay={0.05 + i * 0.07} onOpen={setActive} />
            ))}
          </div>
        )}
      </div>

      {active && <PostModal post={active} onClose={close} />}

      <style>{`
        .blogposts-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) { .blogposts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .blogposts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}