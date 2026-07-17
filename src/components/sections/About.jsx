import owner from '../../data/owner';
import useReveal from '../../hooks/useReveal';

export default function About() {
  const [ref, vis] = useReveal();
  const v = vis ? ' in' : '';

  return (
    <section id="about" style={{ padding: '64px 0', background: 'var(--glass-dark)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={ref} className="container">

        {/* Title — full width, centered */}
        <div className={`reveal${v}`} style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="eyebrow">About</span>
          <h2 className="section-heading">The Story Behind the Work</h2>
        </div>

        {/* Two-column grid — equal height */}
        <div id="about-grid" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: 52, alignItems: 'stretch' }}>

          {/* Photo column */}
          <div className={`reveal-left d2${v}`} style={{ display: 'flex', flexDirection: 'column' }}>

            {/* Image — fills column height */}
            <div style={{ position: 'relative', overflow: 'hidden', flex: 1, minHeight: 0 }}>
              <img
                src={owner.avatar}
                alt={owner.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
              {/* Badge */}
              <div style={{ position: 'absolute', bottom: 16, right: 16, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', border: '1px solid var(--border-gold)', padding: '14px 20px', borderRadius: 12 }}>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Playfair Display', serif", color: 'var(--accent)' }}>15+</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, letterSpacing: '0.1em', fontWeight: 700 }}>YEARS BUILDING</div>
              </div>
            </div>

            {/* Join button below image */}
            <a href="#newsletter" className="btn btn-gold" style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
              Join 1.5M+ Readers
            </a>
          </div>

          {/* Text column */}
          <div className={`reveal-right d3${v}`} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {owner.story.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.82, marginBottom: 14 }}>{para}</p>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          #about-grid > div:first-child { min-height: 380px !important; }
        }
      `}</style>
    </section>
  );
}
