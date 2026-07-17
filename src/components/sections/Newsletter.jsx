import { useState } from 'react';
import owner from '../../data/owner';
import useReveal from '../../hooks/useReveal';

const TESTIMONIALS = [
  {
    quote: "Virosh brings an extraordinary blend of strategic vision and hands on execution. Under his leadership, our Colombo Cluster marketing transformed from reactive to truly data driven — with measurable results across revenue, brand awareness, and digital engagement.",
    name: "Ranil Fernando",
    role: "VP Commercial",
    company: "Cinnamon Hotels & Resorts",
    avatar: "RF",
    color: "#b8860b",
  },
  {
    quote: "The 150% enrolment growth we achieved was a direct result of Virosh's fearless approach to reimagining how we marketed ICM globally. He didn't just run campaigns — he rebuilt the entire commercial model from the ground up.",
    name: "Prof. Sarah Mitchell",
    role: "Chief Executive Officer",
    company: "International College of Melbourne",
    avatar: "SM",
    color: "#4a9eff",
  },
  {
    quote: "In an industry still warming up to AI and data, Virosh was already three steps ahead. His ability to translate digital insights into revenue outcomes is rare. His passion for developing his team is equally impressive.",
    name: "Priya Mendis",
    role: "Chapter Chair",
    company: "HSMAI Asia Pacific",
    avatar: "PM",
    color: "#4caf50",
  },
];

/* ── Quote icon ── */
const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--accent)" opacity="0.15">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
  </svg>
);

/* ── Single testimonial ── */
function TestimonialCard({ t, vis, delay }) {
  const [hov, setHov] = useState(false);
  const d = ` d${Math.min(delay + 2, 6)}`;
  const v = vis ? ' in' : '';

  return (
    <div
      className={`reveal${d}${v}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--glass-card)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${hov ? 'var(--border-gold)' : 'var(--border-glass)'}`,
        borderRadius: 16,
        padding: '32px 28px',
        display: 'flex', flexDirection: 'column', gap: 24,
        transition: 'all .28s cubic-bezier(0.22,1,0.36,1)',
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Decorative quote */}
      <div style={{ position: 'absolute', top: 16, right: 20 }}><QuoteIcon /></div>

      {/* Gold top accent */}
      <div style={{
        position: 'absolute', top: 0, left: 28, right: 28, height: 2,
        background: hov ? 'var(--accent)' : 'transparent',
        transition: 'background .28s', borderRadius: '0 0 2px 2px',
      }} />

      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.8, fontStyle: 'italic', flex: 1 }}>
        "{t.quote}"
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid var(--border-glass)', paddingTop: 20 }}>
        <div style={{
          width: 46, height: 46, borderRadius: '50%', flexShrink: 0,
          background: `${t.color}22`,
          border: `2px solid ${t.color}40`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 800, color: t.color, letterSpacing: '0.04em',
        }}>
          {t.avatar}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{t.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role} · {t.company}</div>
        </div>
        {/* LinkedIn icon */}
        <a href={owner.linkedin_url} target="_blank" rel="noreferrer"
          style={{ marginLeft: 'auto', color: '#0a66c2', opacity: 0.6, flexShrink: 0, transition: 'opacity .2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '1'}
          onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ── Section ── */
export default function Newsletter() {
  const [ref, vis] = useReveal();
  const v = vis ? ' in' : '';

  return (
    <section id="newsletter" style={{ padding: '100px 0', background: 'var(--glass-dark)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={ref} className="container">

        {/* Header */}
        <div className={`reveal${v}`} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="eyebrow">Endorsements</span>
          <h2 className="section-heading">What Colleagues Say</h2>
          <div className="rule rule-center" />
          <p className="section-sub" style={{ maxWidth: 480, margin: '0 auto' }}>
            Feedback from leaders and peers who have worked alongside Virosh across hospitality, education, and media.
          </p>
        </div>

        {/* Cards */}
        <div className="testimonial-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 52 }}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.name} t={t} vis={vis} delay={i} />
          ))}
        </div>

        {/* Connect CTA */}
        <div className={`reveal d4${v}`} style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 24,
            background: 'var(--glass-card)', backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-glass)', borderRadius: 16,
            padding: '28px 40px', flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Playfair Display',serif" }}>
              Want to collaborate or connect?
            </p>
            <a href={owner.linkedin_url} target="_blank" rel="noreferrer"
              className="btn btn-gold"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Connect on LinkedIn
            </a>
            <a href={`mailto:${owner.email}`} className="btn btn-glass">
              Send an Email
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) { .testimonial-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .testimonial-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
