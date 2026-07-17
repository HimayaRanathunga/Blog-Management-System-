import { useState, useEffect } from 'react';
import useReveal from '../../hooks/useReveal';
import { getAdminPosts } from '../../utils/adminPosts';
import { SOCIAL_ICONS, PLATFORMS } from '../admin/AdminPanel';

const DUMMY_POSTS = [
  {
    id: 'd1',
    title: 'How AI Is Reshaping Revenue Strategy in Luxury Hotels',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&h=420&fit=crop',
    description: 'From predictive demand forecasting to hyper-personalised guest communications, AI is no longer a future concept in hospitality — it is the present competitive advantage. Here is how leading hotel brands are integrating AI into their commercial strategy right now.',
    tags: ['AI', 'Revenue Strategy', 'Hospitality'],
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'facebook', url: '#' },
      { platform: 'instagram', url: '#' },
    ],
    date: 'July 10, 2026',
  },
  {
    id: 'd2',
    title: 'The Marketing Playbook That Drove 150% Enrolment Growth',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=420&fit=crop',
    description: 'When I joined ICM as CMO, enrolments were flat and the brand was invisible in key international markets. Three years later, enrolments had grown by 150%. This is the full playbook — market expansion, digital infrastructure, CRM automation, and the mindset shift that made it possible.',
    tags: ['Education Marketing', 'Growth', 'CMO'],
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'facebook', url: '#' },
    ],
    date: 'July 3, 2026',
  },
  {
    id: 'd3',
    title: 'Building a Multicultural Media Brand from Zero to 500K Users',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=700&h=420&fit=crop',
    description: 'Serendib News Network started as a small community publication and scaled to 500,000 monthly users and 10M social media reach over 16 years. The lessons from building that platform — audience trust, content consistency, and revenue diversification — still shape everything I do in marketing today.',
    tags: ['Media', 'Entrepreneurship', 'Brand Building'],
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'facebook', url: '#' },
    ],
    date: 'June 26, 2026',
  },
  {
    id: 'd4',
    title: 'F&B Marketing in 2026: What the Data Actually Says',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=420&fit=crop',
    description: 'Food and beverage is one of the most underutilised revenue levers in hotel marketing. With the right data strategy, content approach, and influencer alignment, F&B can move from a cost centre to a genuine brand differentiator. Here are the numbers and tactics that are working right now.',
    tags: ['F&B', 'Hotel Marketing', 'Data'],
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'whatsapp', url: '#' },
    ],
    date: 'June 19, 2026',
  },
  {
    id: 'd5',
    title: 'MICE Marketing: Winning Corporate Business in a Competitive Market',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&h=420&fit=crop',
    description: 'Corporate events and MICE business require a completely different marketing approach from leisure travel. Long sales cycles, multiple decision-makers, and ROI accountability demand precision targeting and relationship-first strategy. Here is what has worked across the properties I have managed.',
    tags: ['MICE', 'Corporate', 'Events'],
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'facebook', url: '#' },
    ],
    date: 'June 12, 2026',
  },
  {
    id: 'd6',
    title: 'Why Every Hotel Marketer Needs to Understand Revenue Management',
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=700&h=420&fit=crop',
    description: 'The best hotel marketers I have worked with all share one trait — they speak the language of revenue management. ADR, RevPAR, occupancy mix, channel contribution. When marketing and revenue management align, the commercial results are transformational. Here is how to bridge that gap.',
    tags: ['Revenue Management', 'Marketing', 'Strategy'],
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'instagram', url: '#' },
      { platform: 'facebook', url: '#' },
      { platform: 'whatsapp', url: '#' },
    ],
    date: 'June 5, 2026',
  },
];

function getPlatformColor(key) {
  return PLATFORMS.find(p => p.key === key)?.color || '#b8860b';
}

function getPlatformLabel(key) {
  return PLATFORMS.find(p => p.key === key)?.label || key;
}

function BlogCard({ post, delay, vis }) {
  const [hov, setHov] = useState(false);

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'var(--glass-card)',
        border: `1px solid ${hov ? 'var(--border-gold)' : 'var(--border-glass)'}`,
        borderRadius: 16,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hov ? 'var(--shadow-lg)' : 'var(--shadow)',
        transform: hov ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all .28s cubic-bezier(0.22,1,0.36,1)',
        opacity: vis ? 1 : 0,
        transitionDelay: `${delay}s`,
      }}
    >
      {/* Image */}
      <div style={{ height: 200, overflow: 'hidden', flexShrink: 0, background: 'linear-gradient(140deg,#f0f1f5,#e8e9f0)', position: 'relative' }}>
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform .55s cubic-bezier(0.22,1,0.36,1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#0e0e24,#1a1a3a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(184,134,11,0.4)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </div>
        )}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: hov ? 'var(--accent)' : 'transparent', transition: 'background .28s' }} />
        <div style={{ position: 'absolute', bottom: 10, left: 12, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', padding: '3px 10px', borderRadius: 20 }}>{post.date}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1, gap: 12 }}>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20, background: 'var(--accent-light)', color: 'var(--accent)', border: '1px solid var(--border-gold)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.38, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.75, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {post.description}
        </p>

        {/* Social Media Links */}
        {post.socialLinks && post.socialLinks.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: 14, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginRight: 4 }}>View on</span>
            {post.socialLinks.map((sl, i) => {
              const color = getPlatformColor(sl.platform);
              const icon = SOCIAL_ICONS[sl.platform];
              const label = getPlatformLabel(sl.platform);
              return (
                <a
                  key={i}
                  href={sl.url}
                  target="_blank"
                  rel="noreferrer"
                  title={label}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 11px', borderRadius: 20, border: `1px solid ${color}30`, background: `${color}0d`, color, fontSize: 11, fontWeight: 700, textDecoration: 'none', transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${color}22`; e.currentTarget.style.borderColor = `${color}60`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${color}0d`; e.currentTarget.style.borderColor = `${color}30`; }}
                >
                  {icon}
                  {label}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}

export default function BlogPosts() {
  const [ref, vis] = useReveal();
  const [adminPosts, setAdminPosts] = useState(getAdminPosts);

  useEffect(() => {
    const reload = () => setAdminPosts(getAdminPosts());
    window.addEventListener('adminPostsUpdated', reload);
    return () => window.removeEventListener('adminPostsUpdated', reload);
  }, []);

  const allPosts = [...adminPosts, ...DUMMY_POSTS];
  const v = vis ? ' in' : '';

  return (
    <section style={{ padding: '64px 0', background: 'var(--glass-mid)', backdropFilter: 'var(--blur)', borderTop: '1px solid var(--border-glass)' }}>
      <div ref={ref} className="container">

        {/* Header */}
        <div className={`reveal${v}`} style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="eyebrow">Blog</span>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.4vw,46px)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.5px', color: 'var(--text-primary)', marginBottom: 14 }}>
            Ideas That{' '}
            <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Move the Needle</em>
          </h2>
          <p className="section-sub" style={{ maxWidth: 500, margin: '0 auto' }}>
            Insights on hospitality marketing, revenue strategy, AI, and leadership, straight from the field.
          </p>
        </div>

        {/* Grid */}
        <div className={`reveal d2${v} blogposts-grid`} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {allPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} vis={vis} delay={0.05 + i * 0.07} />
          ))}
        </div>
      </div>

      <style>{`
        .blogposts-grid { grid-template-columns: repeat(3,1fr) !important; }
        @media (max-width: 900px) { .blogposts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .blogposts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
