import { useState } from 'react';
import useReveal from '../../hooks/useReveal';

const EXPERTISE = [
  {
    title: 'Hospitality Marketing',
    desc: 'Full funnel revenue strategies for Rooms, F&B, MICE, and luxury hotel brands across the Colombo Cluster.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  },
  {
    title: 'AI Powered Campaigns',
    desc: 'Integrating AI into personalised guest communications, predictive demand forecasting, and media buying optimisation.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="9" height="9" rx="1.5"/><rect x="13" y="2" width="9" height="9" rx="1.5"/><rect x="2" y="13" width="9" height="9" rx="1.5"/><path d="M17 13v2m0 4v2m-4-4h2m4 0h2"/></svg>,
  },
  {
    title: 'Revenue Marketing',
    desc: 'Aligning marketing strategy with ADR, RevPAR, and commercial targets — bridging the gap between brand and bottom line.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="4"/><line x1="12" y1="20" x2="12" y2="10"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
  },
  {
    title: 'Brand & Repositioning',
    desc: 'Market repositioning, rebranding strategy, and narrative building for hospitality and education brands.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
  {
    title: 'Digital & Performance',
    desc: 'SEO, PPC, CRM, social media, and omnichannel marketing architecture with measurable ROI across all channels.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  },
  {
    title: 'MICE & Large Events',
    desc: 'End to end marketing for meetings, incentives, conferences, and large scale events with 10,000+ attendee capacity.',
    icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>,
  },
];

/* ── Single expertise card ── */
function ExpertiseCard({ item, vis, delay }) {
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
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'all .28s cubic-bezier(0.22,1,0.36,1)',
        transform: hov ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow)',
        cursor: 'default',
      }}
    >
      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 13,
        background: hov ? 'var(--accent)' : 'var(--accent-light)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? '#0a0a0a' : 'var(--accent)',
        transition: 'all .28s', flexShrink: 0,
      }}>
        {item.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.78 }}>
          {item.desc}
        </p>
      </div>

      {/* Bottom rule + arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={hov ? 'var(--accent)' : 'var(--text-muted)'} strokeWidth="2.4" strokeLinecap="round"
          style={{ transition: 'stroke .2s, transform .2s', transform: hov ? 'translateX(4px)' : 'none' }}>
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </div>
    </div>
  );
}

/* ── Section ── */
export default function Books() {
  const [ref, vis] = useReveal();
  const v = vis ? ' in' : '';

  return (
    <section id="books" style={{ padding: '100px 0', background: 'var(--glass-dark)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={ref} className="container">

        {/* Header */}
        <div className={`reveal${v}`} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="eyebrow">What I Do</span>
          <h2 className="section-heading">Expertise & Services</h2>
          <div className="rule rule-center" />
          <p className="section-sub" style={{ maxWidth: 520, margin: '0 auto' }}>
            Two decades of cross industry experience distilled into six core marketing disciplines — each anchored in commercial outcomes.
          </p>
        </div>

        {/* Grid */}
        <div className="expertise-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {EXPERTISE.map((item, i) => (
            <ExpertiseCard key={item.title} item={item} vis={vis} delay={i} />
          ))}
        </div>
      </div>

      <style>{`
        .expertise-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) { .expertise-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .expertise-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
