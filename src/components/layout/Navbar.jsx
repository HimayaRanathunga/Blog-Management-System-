import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import owner from '../../data/owner';
import useScrollSpy from '../../hooks/useScrollSpy';

const NAV = [
  { label: 'About',      href: '#about'      },
  { label: 'Activities', href: '#blog'        },
  { label: 'Expertise',  href: '#books'       },
  { label: 'Impact',     href: '#podcast'     },
  { label: 'Reviews',    href: '#newsletter'  },
];
const IDS = ['home','about','blog','books','podcast','newsletter'];

const SOCIALS = [
  {
    name: 'Facebook',
    href: '#',
    color: '#1877F2',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: owner.instagram_url,
    color: '#E1306C',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: owner.linkedin_url,
    color: '#0A66C2',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: '#',
    color: '#25D366',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.966 0C5.366 0 0 5.373 0 11.979c0 2.105.549 4.083 1.507 5.8L.046 24l6.405-1.679a11.926 11.926 0 005.515 1.36c6.6 0 11.966-5.373 11.966-11.979S18.566 0 11.966 0zm0 21.882a9.88 9.88 0 01-5.05-1.378l-.362-.215-3.748.983 1-3.644-.235-.374a9.86 9.86 0 01-1.511-5.254c0-5.455 4.432-9.89 9.906-9.89s9.906 4.435 9.906 9.89-4.432 9.882-9.906 9.882z"/>
      </svg>
    ),
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const active = useScrollSpy(IDS);

  /* The nav points at sections of the home page. Off the home page (e.g. a post
     page) a bare "#about" would only rewrite the hash, so send them to "/#about". */
  const onHome = useLocation().pathname === '/';
  const to = hash => (onHome ? hash : `/${hash}`);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(12,12,30,0.09)' : 'transparent'}`,
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.07)' : 'none',
        transition: 'all .3s',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', height: 66 }}>
          {/* Logo */}
          <a href={to("#home")} style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 'auto', flexShrink: 0, textDecoration: 'none' }}>
            <img src="/new.jpeg" alt="VP" style={{ height: 38, width: 'auto', objectFit: 'contain', display: 'block' }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px', lineHeight: 1 }}>
              {owner.name.split(' ')[0]} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{owner.name.split(' ')[1]}</span>
            </span>
          </a>

          {/* Nav links */}
          <ul style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="nav-links">
            {NAV.map(item => (
              <li key={item.href}>
                <a href={to(item.href)} style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                  color: active === item.href.slice(1) ? 'var(--accent)' : 'var(--text-dim)',
                  transition: 'color .2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = active === item.href.slice(1) ? 'var(--accent)' : 'var(--text-dim)'}>
                  {item.label}
                </a>
              </li>
            ))}
            {/* Divider */}
            <li style={{ listStyle: 'none' }}>
              <div style={{ width: 1, height: 20, background: 'var(--border-glass)' }} />
            </li>

            {/* Social icons */}
            {SOCIALS.map(s => (
              <li key={s.name} style={{ listStyle: 'none' }}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = s.color}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {s.icon}
                </a>
              </li>
            ))}

            <li>
              <a href={to("#newsletter")} className="btn btn-gold" style={{ padding: '9px 20px', fontSize: 11 }}>Subscribe Free</a>
            </li>
          </ul>

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} className="nav-ham" style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 6, background: 'none', marginLeft: 16 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: 'block', width: 22, height: 2, background: 'var(--text-primary)', borderRadius: 1, transition: 'all .3s',
                transform: open ? (i===0?'rotate(45deg) translate(5px,5px)':i===2?'rotate(-45deg) translate(5px,-5px)':'none'):'none',
                opacity: open && i===1 ? 0 : 1 }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(24px)', borderTop: '1px solid var(--border-glass)', padding: '20px 32px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {NAV.map(item => (
              <a key={item.href} href={to(item.href)} onClick={() => setOpen(false)}
                style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-dim)' }}>{item.label}</a>
            ))}
            <a href={to("#newsletter")} className="btn btn-gold" style={{ justifyContent: 'center', marginTop: 6 }} onClick={() => setOpen(false)}>Subscribe Free</a>

            {/* Social icons row */}
            <div style={{ display: 'flex', gap: 20, paddingTop: 4 }}>
              {SOCIALS.map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  title={s.name}
                  style={{ display: 'flex', alignItems: 'center', color: 'var(--text-muted)', transition: 'color .2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = s.color}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) { .nav-links { display: none !important; } .nav-ham { display: flex !important; } }
      `}</style>
    </>
  );
}
