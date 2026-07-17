import { useState, useRef, useEffect, useCallback } from 'react';
import owner from '../../data/owner';
import useReveal from '../../hooks/useReveal';

const GAP = 24;

const ACTIVITIES = [
  {
    id: 1,
    time: 'Today',
    category: 'Industry Event',
    title: 'A memorable day at Media Fest 2026 at Taj Samudra.',
    body: 'Grateful for the opportunity to meet inspiring leaders, exchange meaningful conversations, and gain insights from their journeys in the media industry. Moments like these remind us that learning never stops.',
    images: ['/1783745386927.jpg', '/1783745386859.jpg'],
    gradient: null,
    hashtags: ['#MediaFest2026', '#TajSamudra', '#Networking'],
    reactions: 187,
    comments: 24,
  },
  {
    id: 2,
    time: '3 days ago',
    category: 'Team Win',
    title: 'Record breaking occupancy across all three Cinnamon Colombo properties this quarter.',
    body: 'Behind every great number is a strategy built on precision targeting, dynamic pricing alignment, and a team that executes flawlessly under pressure. Revenue management and marketing working as one — that\'s the difference.',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=420&fit=crop'],
    gradient: null,
    hashtags: ['#CinnamonHotels', '#RevenueManagement', '#TeamWin'],
    reactions: 312,
    comments: 41,
  },
  {
    id: 3,
    time: '1 week ago',
    category: 'Thought Leadership',
    title: 'AI won\'t replace hotel marketers — but those who use AI will replace those who don\'t.',
    body: 'At Cinnamon Hotels we\'ve integrated AI tools into campaign targeting, guest sentiment analysis, and content personalisation. The brands winning in hospitality treat AI as a team member, not a threat.',
    images: [],
    gradient: 'linear-gradient(140deg, #050d1a 0%, #0a1f3d 55%, #0d3567 100%)',
    hashtags: ['#AI', '#DigitalTransformation', '#Hotels'],
    reactions: 524,
    comments: 67,
  },
  {
    id: 4,
    time: '2 weeks ago',
    category: 'Networking',
    title: 'A great evening at the HSMAI Sri Lanka Chapter meetup.',
    body: 'Connecting with the brightest minds in hospitality sales and marketing. Conversations that matter. Insights that stick. It\'s communities like this that keep us sharp and moving forward together.',
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=420&fit=crop'],
    gradient: null,
    hashtags: ['#HSMAI', '#SriLanka', '#HospitalityMarketing'],
    reactions: 198,
    comments: 28,
  },
  {
    id: 5,
    time: '3 weeks ago',
    category: 'Career Reflection',
    title: 'From a Melbourne media platform to leading marketing for an iconic Sri Lankan hotel brand.',
    body: '24 years in marketing across three countries has taught me one thing: the fundamentals never change. Only the tools do. Relationships. Storytelling. Understanding your audience. No algorithm replaces these.',
    images: [],
    gradient: 'linear-gradient(140deg, #0d0800 0%, #1e1000 45%, #3d2200 100%)',
    hashtags: ['#CareerJourney', '#Marketing', '#Leadership'],
    reactions: 445,
    comments: 58,
  },
];

/* ── Card ── */
function ActivityCard({ act }) {
  const [hov, setHov] = useState(false);

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flex: 1,
        background: 'var(--glass-card)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${hov ? 'var(--border-gold)' : 'var(--border-glass)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow)',
        transform: hov ? 'translateY(-7px)' : 'translateY(0)',
        transition: 'transform .32s cubic-bezier(0.22,1,0.36,1), box-shadow .32s, border-color .2s',
      }}
    >
      {/* ── Visual ── */}
      <div style={{ height: 210, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {act.images.length > 0 ? (
          <img
            src={act.images[0]}
            alt={act.category}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transform: hov ? 'scale(1.07)' : 'scale(1)',
              transition: 'transform .55s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: act.gradient, position: 'relative', overflow: 'hidden' }}>
            {/* Subtle dot grid */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.12,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }} />
            {/* Quote mark decoration */}
            <div style={{
              position: 'absolute', bottom: -10, right: 12,
              fontSize: 110, lineHeight: 1, color: 'rgba(255,255,255,0.06)',
              fontFamily: "'Playfair Display',serif", userSelect: 'none',
            }}>"</div>
            {/* Pull-quote */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 26px',
            }}>
              <p style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 15, fontWeight: 700, fontStyle: 'italic',
                color: 'rgba(255,255,255,0.88)', textAlign: 'center', lineHeight: 1.55,
              }}>
                "{act.title.split(' ').slice(0, 10).join(' ')}…"
              </p>
            </div>
          </div>
        )}

        {/* Gradient overlay — bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
          background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)',
        }} />

        {/* Time pill */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(0,0,0,0.52)', backdropFilter: 'blur(12px)',
          color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
          padding: '4px 11px', borderRadius: 20, textTransform: 'uppercase',
        }}>
          {act.time}
        </div>

        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'var(--accent)', color: '#0a0a0a',
          fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20,
        }}>
          {act.category}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: 16, fontWeight: 800, lineHeight: 1.4,
          color: 'var(--text-primary)', marginBottom: 10,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {act.title}
        </h3>

        {/* Body */}
        <p style={{
          fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.72,
          flex: 1, marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {act.body}
        </p>

        {/* Hashtags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
          {act.hashtags.map(h => (
            <span key={h} style={{
              fontSize: 11, color: '#0a66c2', fontWeight: 500,
              background: 'rgba(10,102,194,0.08)', padding: '2px 8px', borderRadius: 12,
            }}>{h}</span>
          ))}
        </div>

        {/* Stats + CTA */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-muted)' }}>
            <span>👍 {act.reactions}</span>
            <span>💬 {act.comments}</span>
          </div>
          <a
            href="https://www.linkedin.com/in/virosh-perera-05a3a712/recent-activity/all/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
              color: hov ? 'var(--accent)' : 'var(--text-muted)',
              textDecoration: 'none', transition: 'color .2s',
            }}
          >
            View post
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

/* ── Arrow button ── */
function Arrow({ dir, onClick, disabled }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
        border: '1.5px solid',
        borderColor: disabled ? 'rgba(184,134,11,0.12)' : hov ? 'var(--accent)' : 'rgba(184,134,11,0.35)',
        background: hov && !disabled ? 'var(--accent)' : 'var(--glass-card)',
        backdropFilter: 'blur(12px)',
        color: disabled ? 'rgba(184,134,11,0.2)' : hov ? '#0a0a0a' : 'var(--accent)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .22s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {dir === 'left'
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
      }
    </button>
  );
}

/* ── Section ── */
export default function Blog() {
  const [revealRef, vis]      = useReveal();
  const [current, setCurrent] = useState(0);
  const trackWrapRef          = useRef(null);
  const touchX                = useRef(null);
  const [wrapW, setWrapW]     = useState(0);
  const v = vis ? ' in' : '';

  /* Measure available width with ResizeObserver */
  useEffect(() => {
    const el = trackWrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWrapW(el.offsetWidth));
    ro.observe(el);
    setWrapW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  /* Responsive columns */
  const cols   = wrapW < 600 ? 1 : wrapW < 920 ? 2 : 3;
  const cardW  = wrapW > 0 ? (wrapW - (cols - 1) * GAP) / cols : 320;
  const maxIdx = Math.max(0, ACTIVITIES.length - cols);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(maxIdx, c + 1)), [maxIdx]);

  /* Clamp if cols changes */
  useEffect(() => setCurrent(c => Math.min(c, maxIdx)), [maxIdx]);

  /* Keyboard */
  useEffect(() => {
    const h = e => { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [prev, next]);

  /* Swipe */
  const onTouchStart = e => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = e => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 44) dx < 0 ? next() : prev();
    touchX.current = null;
  };

  const offset = current * (cardW + GAP);

  return (
    <section id="blog" style={{ padding: '64px 0', background: 'var(--glass-mid)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={revealRef} className="container">

        {/* ── Header row ── */}
        <div className={`reveal${v}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <span className="eyebrow">On LinkedIn</span>
            <h2 className="section-heading" style={{ marginBottom: 0, fontSize: 'clamp(26px,3.2vw,42px)', letterSpacing: '-0.5px' }}>
              What I'm Sharing <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Right Now</span>
            </h2>
          </div>
          {/* Arrows top-right */}
          <div style={{ display: 'flex', gap: 10 }}>
            <Arrow dir="left"  onClick={prev} disabled={current === 0} />
            <Arrow dir="right" onClick={next} disabled={current === maxIdx} />
          </div>
        </div>

        {/* ── Slider ── */}
        <div
          ref={trackWrapRef}
          className={`reveal d2${v}`}
          style={{ overflow: 'hidden' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div style={{
            display: 'flex',
            gap: GAP,
            transform: `translateX(-${offset}px)`,
            transition: 'transform 0.46s cubic-bezier(0.22,1,0.36,1)',
            willChange: 'transform',
            alignItems: 'stretch',
          }}>
            {ACTIVITIES.map(act => (
              <div key={act.id} style={{ width: cardW, flexShrink: 0, display: 'flex' }}>
                <ActivityCard act={act} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Dots ── */}
        <div className={`reveal d3${v}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 20 }}>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 28 : 8, height: 8, borderRadius: 4, padding: 0,
                background: i === current ? 'var(--accent)' : 'rgba(184,134,11,0.22)',
                border: 'none', cursor: 'pointer',
                transition: 'all .32s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className={`reveal d4${v}`} style={{ textAlign: 'center', marginTop: 28 }}>
          <a
            href={owner.linkedin_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-gold"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            View All Activities on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
