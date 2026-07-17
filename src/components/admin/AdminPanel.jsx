import { useState, useEffect } from 'react';
import { getAdminPosts, saveAdminPost, deleteAdminPost } from '../../utils/adminPosts';

const PASSWORD = 'virosh2026';

const PLATFORMS = [
  { key: 'facebook',  label: 'Facebook',  color: '#1877F2' },
  { key: 'instagram', label: 'Instagram', color: '#E1306C' },
  { key: 'linkedin',  label: 'LinkedIn',  color: '#0A66C2' },
  { key: 'whatsapp',  label: 'WhatsApp',  color: '#25D366' },
  { key: 'twitter',   label: 'Twitter/X', color: '#000000' },
  { key: 'youtube',   label: 'YouTube',   color: '#FF0000' },
  { key: 'tiktok',    label: 'TikTok',    color: '#010101' },
];

const SOCIAL_ICONS = {
  facebook:  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
  instagram: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  linkedin:  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  whatsapp:  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM11.966 0C5.366 0 0 5.373 0 11.979c0 2.105.549 4.083 1.507 5.8L.046 24l6.405-1.679a11.926 11.926 0 005.515 1.36c6.6 0 11.966-5.373 11.966-11.979S18.566 0 11.966 0zm0 21.882a9.88 9.88 0 01-5.05-1.378l-.362-.215-3.748.983 1-3.644-.235-.374a9.86 9.86 0 01-1.511-5.254c0-5.455 4.432-9.89 9.906-9.89s9.906 4.435 9.906 9.89-4.432 9.882-9.906 9.882z"/></svg>,
  twitter:   <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.836L2.25 2.25h6.844l4.262 5.638 5.888-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  youtube:   <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 001.95-1.97A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg>,
  tiktok:    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>,
};

const INPUT = {
  width: '100%', padding: '10px 13px', borderRadius: 7, fontSize: 13,
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
  color: '#fff', outline: 'none', boxSizing: 'border-box', lineHeight: 1.5,
};

export { SOCIAL_ICONS, PLATFORMS };

export default function AdminPanel({ open, onClose }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw]         = useState('');
  const [pwErr, setPwErr]   = useState('');
  const [posts, setPosts]   = useState([]);
  const [tab, setTab]       = useState('add');
  const [saved, setSaved]   = useState(false);
  const [err, setErr]       = useState('');

  const emptyForm = () => ({
    title: '', image: '', description: '', tags: '',
    socialLinks: [{ platform: 'facebook', url: '' }],
  });
  const [form, setForm] = useState(emptyForm);

  const reload = () => setPosts(getAdminPosts());
  useEffect(() => {
    reload();
    window.addEventListener('adminPostsUpdated', reload);
    return () => window.removeEventListener('adminPostsUpdated', reload);
  }, []);

  const handleClose = () => { setAuthed(false); setPw(''); setPwErr(''); onClose(); };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === PASSWORD) { setAuthed(true); setPwErr(''); }
    else setPwErr('Incorrect password.');
  };

  const setField = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const setSocial = (i, key) => (e) => setForm(f => {
    const sl = [...f.socialLinks];
    sl[i] = { ...sl[i], [key]: e.target.value };
    return { ...f, socialLinks: sl };
  });

  const addSocial = () => setForm(f => ({
    ...f, socialLinks: [...f.socialLinks, { platform: 'instagram', url: '' }],
  }));

  const removeSocial = (i) => setForm(f => ({
    ...f, socialLinks: f.socialLinks.filter((_, idx) => idx !== i),
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setErr('Title and description are required.'); return;
    }
    setErr('');
    saveAdminPost(form);
    setForm(emptyForm());
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    setTab('manage');
  };

  if (!open) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(5,5,15,0.90)', backdropFilter: 'blur(18px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <div style={{ background: 'linear-gradient(160deg,#0e0e1a,#13131f)', border: '1px solid rgba(184,134,11,0.22)', borderRadius: 20, width: '100%', maxWidth: 580, maxHeight: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.65)' }}>

        {/* Header */}
        <div style={{ padding: '20px 26px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(184,134,11,0.14)', border: '1px solid rgba(184,134,11,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b8860b' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', fontFamily: "'Playfair Display',serif" }}>Admin Panel</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 1 }}>Blog Post Manager</div>
          </div>
          <button onClick={handleClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.38)', cursor: 'pointer', padding: 4, display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.38)'}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>

          {/* Password gate */}
          {!authed ? (
            <form onSubmit={handleLogin} style={{ padding: '44px 28px' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 28, textAlign: 'center' }}>Enter the admin password to manage blog posts.</p>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 7 }}>Password</label>
                <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Enter password" style={INPUT} autoFocus />
              </div>
              {pwErr && <p style={{ fontSize: 12, color: '#ff6b6b', marginBottom: 14 }}>{pwErr}</p>}
              <button type="submit" style={{ width: '100%', padding: 13, background: '#b8860b', color: '#0a0a0a', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer' }}>Unlock</button>
            </form>
          ) : (
            <>
              {/* Tabs */}
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '0 26px' }}>
                {[['add', 'Add Post'], ['manage', `Manage (${posts.length})`]].map(([t, l]) => (
                  <button key={t} onClick={() => setTab(t)} style={{ background: 'none', border: 'none', padding: '13px 0', marginRight: 26, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: tab === t ? '#b8860b' : 'rgba(255,255,255,0.38)', borderBottom: `2px solid ${tab === t ? '#b8860b' : 'transparent'}`, cursor: 'pointer', transition: 'all .2s' }}>{l}</button>
                ))}
              </div>

              {/* ── ADD POST FORM ── */}
              {tab === 'add' && (
                <form onSubmit={handleSubmit} style={{ padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {saved && <div style={{ padding: '11px 14px', borderRadius: 8, background: 'rgba(76,175,80,0.14)', border: '1px solid rgba(76,175,80,0.28)', color: '#4caf50', fontSize: 13, fontWeight: 600 }}>Post published successfully!</div>}

                  {/* Title */}
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 7 }}>Title *</label>
                    <input style={INPUT} value={form.title} onChange={setField('title')} placeholder="Blog post title..." required />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 7 }}>Image URL</label>
                    <input style={INPUT} value={form.image} onChange={setField('image')} placeholder="https://..." />
                    {form.image && (
                      <div style={{ marginTop: 8, borderRadius: 6, overflow: 'hidden', height: 90, background: 'rgba(255,255,255,0.04)' }}>
                        <img src={form.image} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 7 }}>Description *</label>
                    <textarea style={{ ...INPUT, resize: 'vertical', minHeight: 100, lineHeight: 1.7 }} value={form.description} onChange={setField('description')} placeholder="Write a description for this post..." required />
                  </div>

                  {/* Tags */}
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 7 }}>Tags <span style={{ opacity: 0.5, textTransform: 'none', letterSpacing: 0 }}>(comma separated)</span></label>
                    <input style={INPUT} value={form.tags} onChange={setField('tags')} placeholder="Marketing, Hotels, AI, Strategy" />
                    {form.tags && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                        {form.tags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
                          <span key={t} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 20, background: 'rgba(184,134,11,0.18)', color: '#b8860b', fontWeight: 600 }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Social Media Links */}
                  <div>
                    <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 10 }}>Social Media Links</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {form.socialLinks.map((sl, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <select
                            value={sl.platform}
                            onChange={setSocial(i, 'platform')}
                            style={{ ...INPUT, width: 130, flexShrink: 0, appearance: 'none', cursor: 'pointer' }}
                          >
                            {PLATFORMS.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                          </select>
                          <input
                            style={{ ...INPUT, flex: 1 }}
                            value={sl.url}
                            onChange={setSocial(i, 'url')}
                            placeholder="https://..."
                          />
                          {form.socialLinks.length > 1 && (
                            <button type="button" onClick={() => removeSocial(i)} style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: 6, color: '#ff6b6b', cursor: 'pointer', padding: '7px 9px', display: 'flex', flexShrink: 0 }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={addSocial} style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 6, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '6px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add another platform
                      </button>
                    </div>
                  </div>

                  {err && <p style={{ fontSize: 12, color: '#ff6b6b', marginTop: -6 }}>{err}</p>}

                  <button type="submit" style={{ width: '100%', padding: 13, background: '#b8860b', color: '#0a0a0a', border: 'none', borderRadius: 8, fontWeight: 800, fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer', marginTop: 4 }}>
                    Publish Post
                  </button>
                </form>
              )}

              {/* ── MANAGE POSTS ── */}
              {tab === 'manage' && (
                <div style={{ padding: '22px 26px' }}>
                  {posts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px 0', color: 'rgba(255,255,255,0.28)', fontSize: 14 }}>No posts yet. Switch to Add Post to create one.</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {posts.map(p => (
                        <div key={p.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          {p.image && <img src={p.image} alt="" style={{ width: 52, height: 52, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 4 }}>
                              {(p.tags || []).slice(0,3).map(t => <span key={t} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: 'rgba(184,134,11,0.15)', color: '#b8860b', fontWeight: 600 }}>{t}</span>)}
                            </div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{p.date} · {(p.socialLinks||[]).length} social link{(p.socialLinks||[]).length !== 1 ? 's' : ''}</div>
                          </div>
                          <button onClick={() => deleteAdminPost(p.id)} title="Delete" style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.2)', borderRadius: 6, color: '#ff6b6b', cursor: 'pointer', padding: '7px 8px', flexShrink: 0, display: 'flex' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,80,80,0.22)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,80,80,0.1)'}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
