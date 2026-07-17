import { useState } from 'react';
import owner from '../../data/owner';
import useReveal from '../../hooks/useReveal';

const socialLinks = [
  { label: 'LinkedIn',   href: owner.linkedin_url,  color: '#0a66c2', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { label: 'Twitter / X', href: owner.twitter_url,  color: '#000000', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: 'Instagram',  href: owner.instagram_url, color: '#e1306c', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { label: 'YouTube',    href: owner.youtube_url,   color: '#ff0000', icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const [ref, vis] = useReveal();
  const v = vis ? ' in' : '';

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    border: '1.5px solid var(--border-glass)', borderRadius: 8,
    fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
    outline: 'none', background: 'var(--input-bg)', transition: 'border-color .2s',
  };

  return (
    <section id="contact" style={{ padding: '100px 0', background: 'var(--glass-mid)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={ref} className="container">
        <div className={`reveal${v}`} style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Contact</span>
          <h2 className="section-heading">Let's Talk</h2>
          <div className="rule rule-center" />
          <p style={{ fontSize: 16, color: 'var(--text-dim)', maxWidth: 480, margin: '0 auto' }}>
            Have a project in mind, want to collaborate, or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }} className="contact-grid">

          {/* Left info */}
          <div className={`reveal-left d2${v}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
              {[
                { icon: '✉️', label: 'Email',   value: owner.email,       href: `mailto:${owner.email}` },
                { icon: '🌐', label: 'Website', value: owner.website_url, href: owner.website_url },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--accent-light)', border: '1px solid var(--border-gold)', display: 'grid', placeItems: 'center', fontSize: 22, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                    <a href={item.href} target="_blank" rel="noreferrer" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>{item.value}</a>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Follow Me</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {socialLinks.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 8, border: '1px solid var(--border-glass)', fontSize: 13, fontWeight: 500, color: 'var(--text-dim)', transition: 'all .2s', background: 'var(--glass-card)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.color = s.color; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-glass)'; e.currentTarget.style.color = 'var(--text-dim)'; }}>
                  {s.icon}{s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <form className={`reveal-right d3${v}`} onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['name','Name','Your name'],['email','Email','your@email.com']].map(([n,l,p]) => (
                <div key={n}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{l}</label>
                  <input name={n} type={n==='email'?'email':'text'} value={form[n]} onChange={handle} required placeholder={p} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border-glass)'} />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Subject</label>
              <input name="subject" value={form.subject} onChange={handle} required placeholder="What's this about?" style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-glass)'} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Message</label>
              <textarea name="message" value={form.message} onChange={handle} required placeholder="Tell me more..." rows={5} style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                onBlur={e => e.target.style.borderColor = 'var(--border-glass)'} />
            </div>
            <button type="submit" className="btn btn-gold" style={{ alignSelf: 'flex-start' }}>
              {sent ? '✓ Message Sent!' : 'Send Message →'}
            </button>
          </form>

        </div>
      </div>
      <style>{`@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}
