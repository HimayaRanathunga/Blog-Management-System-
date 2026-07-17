export default function SectionHeader({ label, title, subtitle, centered = false }) {
  return (
    <div style={{ marginBottom: 48, textAlign: centered ? 'center' : 'left' }}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="divider" style={centered ? { margin: '0 auto 12px' } : {}} />
      {subtitle && (
        <p style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 480, margin: centered ? '0 auto' : 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
