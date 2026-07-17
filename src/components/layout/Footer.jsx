import owner from '../../data/owner';

const LINKS = {
  Site:    [{l:'Activities',h:'#blog'},{l:'About',h:'#about'},{l:'Expertise',h:'#books'},{l:'Impact',h:'#podcast'}],
  Connect: [{l:'Newsletter',h:'#newsletter'},{l:'Resume',h:'#cv'},{l:'Contact',h:`mailto:${owner.email}`}],
  Social:  [{l:'Twitter/X',h:owner.twitter_url},{l:'Instagram',h:owner.instagram_url},{l:'YouTube',h:owner.youtube_url},{l:'LinkedIn',h:owner.linkedin_url},{l:'TikTok',h:owner.tiktok_url}],
};

export default function Footer() {
  return (
    <footer style={{ background: '#f8f9fc', borderTop: '1px solid var(--border-glass)', paddingTop: 64 }}>
      <div className="container">
        <div style={{ display: 'grid', gap: 48, paddingBottom: 52, borderBottom: '1px solid var(--border-glass)' }} className="footer-cols">

          {/* Brand col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/new.jpeg" alt="VP" style={{ height: 42, width: 'auto', objectFit: 'contain', display: 'block' }} />
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15 }}>
                {owner.name.split(' ')[0]}<br />
                <span style={{ fontWeight: 400, fontSize: 18, color: 'var(--text-muted)' }}>{owner.name.split(' ')[1]}</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Marketing Director at Cinnamon Hotels & Resorts. Driving revenue growth through AI powered marketing, digital transformation, and data led hospitality strategy.
            </p>
            <a href={`mailto:${owner.email}`} style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{owner.email}</a>
          </div>

          {/* Link cols */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>{group}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map(item => (
                  <a key={item.l} href={item.h}
                    style={{ fontSize: 14, color: 'var(--text-muted)', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                    {item.l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', fontSize: 12, color: 'var(--text-muted)', flexWrap: 'wrap', gap: 10 }}>
          <span>© 2026 {owner.name}. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy','Terms of Use'].map(t => (
              <a key={t} href="#"
                style={{ color: 'var(--text-muted)', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-cols { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
        @media (max-width:900px) { .footer-cols { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
        @media (max-width:480px) { .footer-cols { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
