import owner from '../../data/owner';

const L = 'rgba(255,255,255,'; // white overlay base

const fadeUp = (delay) => ({
  animation: `heroFadeUp 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
});

const fadeRight = (delay) => ({
  animation: `heroFadeRight 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}s both`,
});

export default function Hero() {
  return (
    <section id="home" style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden', margin: 0, padding: 0, background: '#ffffff' }}>

      {/* ── Person image — full height, right side ── */}
      <div style={{
        position: 'absolute', top: 106, right: 0, width: '55%', height: 'calc(100% - 106px)', zIndex: 1,
        ...fadeRight(0.15),
      }}>
        <img
          src={owner.hero_image}
          alt={owner.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block',
            animation: 'heroFloat 8s ease-in-out 1.3s infinite alternate',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 74%, transparent 100%)',
            maskImage:        'linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 6%, black 74%, transparent 100%)',
            WebkitMaskComposite: 'destination-in',
            maskComposite: 'intersect',
          }}
        />
      </div>

      {/* Left gradient — keeps text readable */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2,
        background: `linear-gradient(to right, ${L}0.97) 30%, ${L}0.80) 55%, ${L}0.20) 78%, transparent 100%)` }} />

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 160, zIndex: 2,
        background: `linear-gradient(to top, ${L}0.95), transparent)` }} />

      {/* Subtle dot pattern — left text area */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '55%', zIndex: 2, opacity: 0.18,
        backgroundImage: 'radial-gradient(rgba(12,12,30,0.5) 1px, transparent 1px)',
        backgroundSize: '28px 28px' }} />

      {/* ── Text content ── */}
      <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ maxWidth: 560, paddingTop: 140 }}>

          {/* Role */}
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20, ...fadeUp(0.1) }}>
            {owner.role}
          </div>

          {/* Name */}
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(38px,5.2vw,72px)', fontWeight: 800, lineHeight: 1.06, color: 'var(--text-primary)', marginBottom: 14, ...fadeUp(0.25) }}>
            {owner.name}
          </h1>

          {/* Tagline */}
          <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(17px,2vw,24px)', fontWeight: 700, fontStyle: 'italic', color: 'var(--accent)', marginBottom: 28, ...fadeUp(0.4) }}>
            {owner.tagline}
          </p>

          {/* Bio */}
          <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.85, maxWidth: 460, marginBottom: 36, ...fadeUp(0.55) }}>
            {owner.bio}
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'nowrap', marginBottom: 36, width: '100%' }}>
            {owner.stats.map((s, i) => (
              <div key={i} style={{
                flex: 1,
                paddingRight: i < owner.stats.length - 1 ? 16 : 0,
                marginRight: i < owner.stats.length - 1 ? 16 : 0,
                borderRight: i < owner.stats.length - 1 ? '1px solid var(--border-glass)' : 'none',
                ...fadeUp(0.7 + i * 0.1)
              }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44, ...fadeUp(1.1) }}>
            <a href="#newsletter" className="btn btn-gold">Subscribe Free →</a>
            <a href="#blog"       className="btn btn-glass">Read the Blog</a>
          </div>

          {/* Press quotes */}
          <div style={{ paddingTop: 28, borderTop: '1px solid var(--border-glass)', display: 'flex', gap: 28, flexWrap: 'wrap', ...fadeUp(1.25) }}>
            {owner.press.slice(0,2).map((p,i) => (
              <div key={i}>
                <p style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 4 }}>"{p.quote}"</p>
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>— {p.source}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeRight {
          from { opacity: 0; transform: translateX(48px) scale(0.98); }
          to   { opacity: 1; transform: translateX(0)   scale(1); }
        }
@keyframes heroFloat {
          from { transform: translateY(0px); }
          to   { transform: translateY(-14px); }
        }
        @media (max-width: 900px) {
          #home > div:first-child { width: 100% !important; top: 0 !important; height: 100% !important; opacity: 0.25; }
        }
      `}</style>
    </section>
  );
}
