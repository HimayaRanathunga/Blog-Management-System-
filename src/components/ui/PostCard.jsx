import { useState } from 'react';

export default function PostCard({ post }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'transform .2s, box-shadow .2s, border-color .2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow)',
        borderColor: hovered ? 'rgba(37,99,235,0.2)' : 'var(--border)',
      }}
    >
      <div style={{ overflow: 'hidden', height: 200 }}>
        <img
          src={post.image}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
      </div>
      <div style={{ padding: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--accent)', background: 'var(--accent-light)', padding: '3px 8px', borderRadius: 20 }}>
          {post.category}
        </span>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', margin: '10px 0 8px' }}>
          {post.date} · {post.readTime}
        </div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--primary)', lineHeight: 1.3, marginBottom: 10 }}>
          {post.title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 16 }}>
          {post.excerpt}
        </p>
        <a href="#" style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
          Read article →
        </a>
      </div>
    </article>
  );
}
