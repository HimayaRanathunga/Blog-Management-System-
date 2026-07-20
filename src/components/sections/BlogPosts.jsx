import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useReveal from '../../hooks/useReveal';
import { blogApi } from '../../services/blogApi';

/* ── Card ── */
function BlogCard({ post, delay, vis }) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      to={`/blog/${post.slug}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--glass-card)',
        border: `1px solid ${hov ? 'var(--border-gold)' : 'var(--border-glass)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
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
    </Link>
  );
}

/* ── Section ── */
export default function BlogPosts() {
  const [ref, vis]        = useReveal();
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState('loading'); // loading | ready | error

  useEffect(() => {
    let alive = true;
    blogApi.list()
      .then(p => { if (alive) { setPosts(p); setState('ready'); } })
      .catch(() => alive && setState('error'));
    return () => { alive = false; };
  }, []);

  const v = vis ? ' in' : '';

  return (
    <section id="posts" style={{ padding: '64px 0', background: 'var(--glass-mid)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
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
              <BlogCard key={post.id} post={post} vis={vis} delay={0.05 + i * 0.07} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .blogposts-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) { .blogposts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .blogposts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}