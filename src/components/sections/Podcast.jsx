import useReveal from '../../hooks/useReveal';

const BIG_STATS = [
  {
    value: '150%',
    label: 'Student Enrolment Growth',
    sub: 'Delivered as CMO at International College of Melbourne in 3 years through global market expansion and CRM driven recruitment.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    gradient: 'linear-gradient(135deg, #0d1f0a 0%, #1a3a10 60%, #2a5a18 100%)',
    accent: '#4caf50',
  },
  {
    value: '500K+',
    label: 'Monthly Platform Reach',
    sub: 'Built and scaled Serendib News Network to 500,000+ monthly website users and 10M+ social media reach over 16 years.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    gradient: 'linear-gradient(135deg, #050d1a 0%, #0a1f3d 60%, #0d3567 100%)',
    accent: '#4a9eff',
  },
  {
    value: '$1M+',
    label: 'Annual Marketing Budget',
    sub: 'Managing USD 1M+ annual marketing and commercial budgets at Cinnamon Hotels & Resorts, delivering USD 200K+ daily revenue.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
    gradient: 'linear-gradient(135deg, #1a0f00 0%, #3d2200 60%, #6b3d00 100%)',
    accent: '#e8b84b',
  },
];

const MILESTONES = [
  {
    period: '2024 — Present',
    company: 'Cinnamon Hotels & Resorts',
    win: 'Record occupancy across 3 Colombo properties in first quarter, with AI powered campaign architecture delivering measurable RevPAR growth.',
    tag: 'Current Role',
    tagColor: 'var(--accent)',
  },
  {
    period: '2021 — 2024',
    company: 'International College of Melbourne',
    win: '150% enrolment growth, 100%+ digital engagement uplift, and full institutional rebranding across Australia and international markets.',
    tag: 'CMO',
    tagColor: '#4a9eff',
  },
  {
    period: '2016 — 2020',
    company: 'Cultural Pulse',
    win: '120% YoY revenue growth. Led national ambassador campaigns for Cricket Australia 50 Over World Cup, Commonwealth Games & Melbourne Stars.',
    tag: 'Engagement Director',
    tagColor: '#4caf50',
  },
];

export default function Podcast() {
  const [ref, vis] = useReveal();
  const v = vis ? ' in' : '';

  return (
    <section id="podcast" style={{ padding: '100px 0', background: 'var(--glass-mid)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={ref} className="container">

        {/* Header */}
        <div className={`reveal${v}`} style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="eyebrow">Track Record</span>
          <h2 className="section-heading">Career Impact</h2>
          <div className="rule rule-center" />
          <p className="section-sub" style={{ maxWidth: 500, margin: '0 auto' }}>
            Three decades of measurable commercial results across media, education, and hospitality.
          </p>
        </div>

        {/* Big stat cards */}
        <div className={`reveal d2${v} impact-grid`} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginBottom: 48 }}>
          {BIG_STATS.map((s, i) => (
            <div key={s.label} style={{
              background: s.gradient,
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
              padding: '36px 28px',
              display: 'flex', flexDirection: 'column', gap: 14,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Dot grid */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.07,
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '20px 20px', pointerEvents: 'none' }} />

              <div style={{ color: s.accent, position: 'relative' }}>{s.icon}</div>

              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 48, fontWeight: 800, color: '#fff', lineHeight: 1, position: 'relative' }}>
                {s.value}
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.accent, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8 }}>
                  {s.label}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7 }}>
                  {s.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Milestone cards */}
        <div className={`reveal d3${v}`} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MILESTONES.map((m, i) => (
            <div key={m.company} style={{
              background: 'var(--glass-card)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-glass)',
              borderRadius: 14,
              padding: '24px 28px',
              display: 'flex', gap: 24, alignItems: 'flex-start',
            }}
            className="milestone-row">
              {/* Left: period + line */}
              <div style={{ flexShrink: 0, width: 120, textAlign: 'right' }} className="milestone-period">
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.07em', lineHeight: 1.5 }}>{m.period}</div>
              </div>

              {/* Dot + vertical line */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3 }} className="milestone-dot-col">
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 0 4px rgba(184,134,11,0.15)', flexShrink: 0 }} />
                {i < MILESTONES.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom, var(--accent), transparent)', marginTop: 6, minHeight: 24 }} />
                )}
              </div>

              {/* Right: content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 800, color: 'var(--text-primary)' }}>{m.company}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20, background: `${m.tagColor}18`, color: m.tagColor, border: `1px solid ${m.tagColor}30` }}>
                    {m.tag}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.72 }}>{m.win}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .impact-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) {
          .impact-grid { grid-template-columns: 1fr !important; }
          .milestone-period { display: none !important; }
          .milestone-dot-col { display: none !important; }
          .milestone-row { padding: 20px 20px !important; }
        }
      `}</style>
    </section>
  );
}
