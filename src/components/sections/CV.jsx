import { useState, useEffect } from 'react';
import cvData from '../../data/cvData';
import owner from '../../data/owner';
import useReveal from '../../hooks/useReveal';

/* ── University metadata (matches by keyword) ── */
const UNI_META = [
  {
    match: 'Portsmouth',
    logo: 'https://logo.clearbit.com/port.ac.uk',
    color: '#003087',
    abbr: 'UoP',
  },
  {
    match: 'Lincoln',
    logo: 'https://logo.clearbit.com/lincoln.ac.uk',
    color: '#8B1C1C',
    abbr: 'UoL',
  },
];

function getUniMeta(institution) {
  return UNI_META.find(m => institution.includes(m.match))
    || { logo: null, color: '#b8860b', abbr: institution.slice(0, 3).toUpperCase() };
}

/* ── Education card — compact vertical for single-row layout ── */
function EduCard({ edu, vis, delay }) {
  const [imgOk, setImgOk] = useState(true);
  const meta = getUniMeta(edu.institution);
  const statusColor = edu.status === 'Completed' ? '#4caf50' : '#e8b84b';

  return (
    <div style={{
      background: 'var(--glass-card)', border: '1px solid var(--border-glass)',
      borderRadius: 14, padding: '16px 14px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      justifyContent: 'space-between',
      gap: 8, height: '100%', boxSizing: 'border-box',
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(16px)',
      transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      borderTop: `3px solid ${meta.color}`,
    }}>

      {/* Logo */}
      <div style={{
        width: 56, height: 56, borderRadius: 12, flexShrink: 0,
        background: '#fff',
        border: `1.5px solid ${meta.color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 2px 10px ${meta.color}20`,
        padding: 5,
      }}>
        {(imgOk && meta.logo)
          ? <img src={meta.logo} alt={edu.institution}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={() => setImgOk(false)} />
          : <span style={{ fontWeight: 900, fontSize: 16, color: meta.color, letterSpacing: '0.02em' }}>{meta.abbr}</span>
        }
      </div>

      {/* Institution */}
      <div style={{ fontSize: 12, fontWeight: 700, color: meta.color, letterSpacing: '0.04em', lineHeight: 1.3 }}>
        {edu.institution}
      </div>

      {/* Degree */}
      <div style={{
        fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.45,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        flex: 1,
      }}>
        {edu.degree}
      </div>

      {/* Year + status */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>{edu.year}</span>
        {edu.status && (
          <span style={{
            fontSize: 9, fontWeight: 800, letterSpacing: '0.09em', textTransform: 'uppercase',
            padding: '2px 10px', borderRadius: 20,
            background: `${statusColor}18`, color: statusColor,
            border: `1px solid ${statusColor}35`,
          }}>{edu.status}</span>
        )}
      </div>

      {/* Grade */}
      {edu.grade && (
        <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>
          <span style={{ fontWeight: 700 }}>Grade: </span>{edu.grade}
        </div>
      )}

      {/* Skills */}
      {edu.skills && edu.skills.length > 0 && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          {edu.skills.map(skill => (
            <span key={skill} style={{
              fontSize: 9, padding: '2px 8px', borderRadius: 20,
              background: `${meta.color}14`, color: meta.color,
              border: `1px solid ${meta.color}25`, fontWeight: 700, letterSpacing: '0.04em',
            }}>{skill}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Animated counter ── */
function StatCounter({ value, suffix, label, start, delay = 0 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    let t0 = null;
    const dur = 1700;
    const tick = ts => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const timer = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay * 1000);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [start, value, delay]);

  return (
    <div style={{ textAlign: 'center', padding: '28px 20px' }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 44, fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 10 }}>
        {label}
      </div>
    </div>
  );
}

/* ── Skill progress bar ── */
function SkillBar({ name, pct, start, delay = 0 }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dim)' }}>{name}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: 'rgba(10,10,30,0.07)', borderRadius: 5, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          borderRadius: 5,
          background: 'linear-gradient(90deg, var(--accent) 0%, #e8b84b 100%)',
          width: start ? `${pct}%` : '0%',
          transition: `width 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

const STATS = [
  { value: 24,  suffix: '+',  label: 'Years in Marketing'    },
  { value: 500, suffix: 'K+', label: 'Monthly Platform Reach' },
  { value: 150, suffix: '%',  label: 'Enrolment Growth'       },
  { value: 3,   suffix: '',   label: 'Countries'              },
];

const SKILL_BARS = [
  { name: 'Hospitality Marketing',      pct: 97 },
  { name: 'AI & Digital Transformation', pct: 94 },
  { name: 'Revenue & F&B Strategy',     pct: 93 },
  { name: 'Performance Media (PPC/SEO)', pct: 91 },
  { name: 'CRM & Loyalty Programs',     pct: 89 },
];

export default function CV() {
  const [ref, vis] = useReveal();
  const v = vis ? ' in' : '';

  const expLen = cvData.experience.length;

  return (
    <section id="cv" style={{ padding: '100px 0', background: 'var(--glass-dark)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={ref} className="container">

        {/* ── Header ── */}
        <div className={`reveal${v}`} style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="eyebrow">Resume / CV</span>
          <h2 className="section-heading">Professional Background</h2>
          <div className="rule rule-center" />
          <a href={owner.cv_download_url} download className="btn btn-gold" style={{ marginTop: 8 }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download PDF
          </a>
        </div>

        {/* ── Achievement stats ── */}
        <div className={`reveal d2${v} cv-stats`} style={{
          display: 'grid',
          background: 'var(--glass-card)',
          border: '1px solid var(--border-glass)',
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 64,
          boxShadow: 'var(--shadow)',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ borderRight: i < 3 ? '1px solid var(--border-glass)' : 'none' }}>
              <StatCounter {...s} start={vis} delay={0.2 + i * 0.12} />
            </div>
          ))}
        </div>

        {/* ── Main grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 56, alignItems: 'start' }} className="cv-grid">

          {/* Left — Timeline */}
          <div>
            <h3 style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: 36,
              opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0.3s',
            }}>
              Work Experience
            </h3>

            <div style={{ position: 'relative', paddingLeft: 30 }}>

              {/* Animated line */}
              <div style={{
                position: 'absolute', left: 5, top: 4, bottom: 0, width: 2,
                background: 'linear-gradient(to bottom, var(--accent), rgba(184,134,11,0.12))',
                transformOrigin: 'top center',
                transform: vis ? 'scaleY(1)' : 'scaleY(0)',
                transition: `transform ${1.0 + expLen * 0.18}s cubic-bezier(0.22,1,0.36,1) 0.35s`,
              }} />

              {cvData.experience.map((exp, i) => (
                <div key={i} style={{
                  position: 'relative',
                  paddingBottom: 40,
                  opacity: vis ? 1 : 0,
                  transform: vis ? 'none' : 'translateY(22px)',
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${0.45 + i * 0.18}s,
                               transform 0.6s cubic-bezier(0.22,1,0.36,1) ${0.45 + i * 0.18}s`,
                }}>
                  {/* Spring-pop dot */}
                  <div style={{
                    position: 'absolute', left: -30, top: 3,
                    width: 13, height: 13, borderRadius: '50%',
                    background: 'var(--accent)',
                    border: '2.5px solid var(--glass-dark)',
                    boxShadow: '0 0 0 4px rgba(184,134,11,0.15)',
                    transform: vis ? 'scale(1)' : 'scale(0)',
                    transition: `transform 0.45s cubic-bezier(0.34,1.56,0.64,1) ${0.55 + i * 0.18}s`,
                    zIndex: 2,
                  }} />

                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: 4 }}>{exp.period}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{exp.title}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)', marginBottom: 8 }}>{exp.company}</div>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.72 }}>{exp.description}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <h3 style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--text-muted)', margin: '4px 0 24px',
              opacity: vis ? 1 : 0,
              transition: `opacity 0.5s ${0.4 + expLen * 0.18}s`,
            }}>
              Education
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="edu-grid">
              {cvData.education.map((edu, i) => (
                <EduCard key={i} edu={edu} vis={vis} delay={0.5 + expLen * 0.18 + i * 0.14} />
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className={`reveal-right d4${v}`} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Skill bars */}
            <div style={{ background: 'var(--glass-card)', border: '1px solid var(--border-glass)', borderRadius: 12, padding: '22px 24px' }}>
              <h3 style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 20 }}>Core Skills</h3>
              {SKILL_BARS.map((s, i) => (
                <SkillBar key={s.name} {...s} start={vis} delay={0.5 + i * 0.1} />
              ))}
            </div>

            {/* Certifications */}
            <div style={{ background: 'var(--glass-card)', border: '1px solid var(--border-glass)', borderRadius: 12, padding: '22px 24px' }}>
              <h3 style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Certifications</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cvData.certifications.map(cert => (
                  <div key={cert} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13, color: 'var(--text-dim)' }}>
                    <span style={{ color: 'var(--accent)', fontSize: 15, flexShrink: 0, marginTop: 1 }}>✓</span>{cert}
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div style={{ background: 'var(--glass-card)', border: '1px solid var(--border-glass)', borderRadius: 12, padding: '22px 24px' }}>
              <h3 style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Languages</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cvData.languages.map(l => (
                  <div key={l.language} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>{l.language}</span>
                    <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 20, background: 'var(--accent-light)', color: 'var(--accent)', fontWeight: 700 }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div style={{ background: 'var(--glass-card)', border: '1px solid var(--border-glass)', borderRadius: 12, padding: '22px 24px' }}>
              <h3 style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Awards</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cvData.awards.map(a => (
                  <div key={a.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, fontSize: 13 }}>
                    <span style={{ color: 'var(--text-dim)' }}>🏆 {a.title}</span>
                    <span style={{ color: 'var(--text-muted)', flexShrink: 0, fontWeight: 600 }}>{a.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: 'var(--accent)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0a0a0a', marginBottom: 8 }}>Interested in working together?</div>
              <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.72)', marginBottom: 16 }}>Available for consulting, advisory roles, and speaking engagements.</p>
              <a href={`mailto:${owner.email}`} className="btn" style={{ background: '#fff', color: '#0a0a0a', fontWeight: 700, padding: '10px 20px' }}>Get in Touch</a>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .cv-stats { grid-template-columns: repeat(4,1fr) !important; }
        .edu-grid { grid-template-columns: repeat(4,1fr) !important; }
        @media (max-width: 900px) {
          .cv-grid   { grid-template-columns: 1fr !important; }
          .cv-stats  { grid-template-columns: 1fr 1fr !important; }
          .edu-grid  { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .edu-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
