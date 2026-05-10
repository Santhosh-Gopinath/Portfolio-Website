import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] },
  }),
}

// ─── Brand Icons (full SVG, real brand colors) ───────────────────────────────

function LinkedInIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M7.5 9.5H5V19H7.5V9.5ZM6.25 8.5C7.08 8.5 7.75 7.83 7.75 7C7.75 6.17 7.08 5.5 6.25 5.5C5.42 5.5 4.75 6.17 4.75 7C4.75 7.83 5.42 8.5 6.25 8.5Z"
        fill="white"
      />
      <path
        d="M19 19H16.5V14.25C16.5 13.01 16.48 11.42 14.79 11.42C13.08 11.42 12.82 12.78 12.82 14.16V19H10.32V9.5H12.72V10.94H12.75C13.08 10.3 13.9 9.62 15.13 9.62C17.66 9.62 19 11.25 19 13.59V19Z"
        fill="white"
      />
    </svg>
  )
}

function GitHubIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#24292F" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C7.58 4 4 7.58 4 12C4 15.54 6.29 18.53 9.47 19.59C9.87 19.66 10.02 19.42 10.02 19.21C10.02 19.02 10.01 18.39 10.01 17.72C8 18.09 7.48 17.23 7.32 16.78C7.23 16.55 6.84 15.84 6.5 15.65C6.22 15.5 5.82 15.13 6.49 15.12C7.12 15.11 7.57 15.7 7.72 15.94C8.44 17.15 9.59 16.81 10.05 16.6C10.12 16.08 10.33 15.73 10.56 15.53C8.78 15.33 6.92 14.64 6.92 11.58C6.92 10.71 7.23 9.99 7.74 9.43C7.66 9.23 7.38 8.41 7.82 7.31C7.82 7.31 8.49 7.1 10.02 8.13C10.66 7.95 11.34 7.86 12.02 7.86C12.7 7.86 13.38 7.95 14.02 8.13C15.55 7.09 16.22 7.31 16.22 7.31C16.66 8.41 16.38 9.23 16.3 9.43C16.81 9.99 17.12 10.7 17.12 11.58C17.12 14.65 15.25 15.33 13.47 15.53C13.76 15.78 14.01 16.26 14.01 17.01C14.01 18.08 14 18.94 14 19.21C14 19.42 14.15 19.67 14.55 19.59C17.71 18.53 20 15.53 20 12C20 7.58 16.42 4 12 4Z"
        fill="white"
      />
    </svg>
  )
}

function GmailIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="white" />
      {/* Gmail envelope */}
      <path d="M4 7.5L12 13L20 7.5" stroke="#EA4335" strokeWidth="1.5" />
      <path
        d="M4 6H20C20.55 6 21 6.45 21 7V17C21 17.55 20.55 18 20 18H4C3.45 18 3 17.55 3 17V7C3 6.45 3.45 6 4 6Z"
        stroke="#DADCE0"
        strokeWidth="1"
        fill="none"
      />
      {/* M shape */}
      <path d="M3 7L12 13.5L21 7" fill="none" stroke="#EA4335" strokeWidth="1.5" />
      <rect x="3" y="6" width="18" height="12" rx="1" fill="none" stroke="#DADCE0" strokeWidth="0.5" />
      {/* colored corners */}
      <path d="M3 18L9 12" stroke="#34A853" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 18L15 12" stroke="#FBBC04" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 6L12 13L21 6" fill="none" stroke="#EA4335" strokeWidth="1.5" />
    </svg>
  )
}

function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#25D366" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C7.58 4 4 7.58 4 12C4 13.42 4.38 14.76 5.04 15.92L4 20L8.2 18.97C9.33 19.6 10.62 19.96 12 19.96C16.42 19.96 20 16.38 20 11.96C20 7.54 16.42 4 12 4ZM16.14 14.6C15.95 15.12 15.06 15.57 14.63 15.61C14.19 15.65 13.78 15.8 11.74 15C9.31 14.05 7.78 11.55 7.66 11.39C7.54 11.23 6.66 10.07 6.66 8.87C6.66 7.67 7.3 7.08 7.53 6.84C7.76 6.6 8.03 6.54 8.19 6.54C8.35 6.54 8.51 6.54 8.65 6.55C8.81 6.56 9.02 6.49 9.22 6.99C9.43 7.5 9.92 8.7 9.98 8.82C10.04 8.94 10.08 9.08 10 9.22C9.92 9.36 9.88 9.44 9.76 9.58C9.64 9.72 9.51 9.89 9.4 10C9.28 10.12 9.16 10.25 9.3 10.49C9.44 10.73 9.92 11.51 10.64 12.15C11.56 12.97 12.34 13.22 12.58 13.34C12.82 13.46 12.96 13.44 13.1 13.28C13.24 13.12 13.7 12.58 13.86 12.34C14.02 12.1 14.18 12.14 14.4 12.22C14.62 12.3 15.82 12.89 16.06 13.01C16.3 13.13 16.46 13.19 16.52 13.29C16.58 13.4 16.58 13.92 16.14 14.6Z"
        fill="white"
      />
    </svg>
  )
}

// ─── Contact links data ───────────────────────────────────────────────────────

const CONTACT_LINKS = [
  {
    label: 'LinkedIn',
    handle: 'Santhosh-Gopinath',
    href: 'https://www.linkedin.com/in/santhosh-gopinath-14817335b',
    external: true,
    BrandIcon: LinkedInIcon,
    brandColor: '#0A66C2',
    bgHover: 'rgba(10,102,194,0.08)',
    borderHover: 'rgba(10,102,194,0.35)',
  },
  {
    label: 'GitHub',
    handle: 'Santhosh-Gopinath',
    href: 'https://github.com/Santhosh-Gopinath',
    external: true,
    BrandIcon: GitHubIcon,
    brandColor: '#e6edf3',
    bgHover: 'rgba(230,237,243,0.07)',
    borderHover: 'rgba(230,237,243,0.25)',
  },
  {
    label: 'Gmail',
    handle: 'santhoshgopinath10@gmail.com',
    href: 'mailto:santhoshgopinath10@gmail.com',
    external: false,
    BrandIcon: GmailIcon,
    brandColor: '#EA4335',
    bgHover: 'rgba(234,67,53,0.07)',
    borderHover: 'rgba(234,67,53,0.3)',
  },
  {
    label: 'WhatsApp',
    handle: '+91 95669 00696',
    href: 'https://wa.me/919566900696',
    external: true,
    BrandIcon: WhatsAppIcon,
    brandColor: '#25D366',
    bgHover: 'rgba(37,211,102,0.07)',
    borderHover: 'rgba(37,211,102,0.3)',
  },
]

// ─── ContactCard ─────────────────────────────────────────────────────────────

function ContactCard({ link, index, isInView }) {
  const { BrandIcon, brandColor, bgHover, borderHover } = link

  return (
    <motion.a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={0.3 + index * 0.1}
      data-cursor-hover
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.2rem 1.5rem',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.025)',
        textDecoration: 'none',
        transition: 'all 0.32s cubic-bezier(0.25,1,0.5,1)',
        cursor: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = borderHover
        e.currentTarget.style.background = bgHover
        e.currentTarget.style.transform = 'translateX(8px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
        e.currentTarget.style.transform = 'translateX(0)'
      }}
    >
      {/* Brand icon box */}
      <div style={{
        width: 46,
        height: 46,
        borderRadius: 10,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'background 0.32s, border-color 0.32s',
        overflow: 'hidden',
      }}>
        <BrandIcon size={24} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.68rem',
          fontFamily: 'var(--mono)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--fg-muted)',
          marginBottom: '0.2rem',
        }}>
          {link.label}
        </div>
        <div style={{
          fontSize: '0.92rem',
          fontWeight: 500,
          color: 'var(--fg)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          transition: 'color 0.32s',
        }}
          className="cc-handle"
        >
          {link.handle}
        </div>
      </div>

      {/* Arrow */}
      <svg
        width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        style={{
          color: 'var(--fg-muted)',
          opacity: 0.4,
          flexShrink: 0,
          transition: 'all 0.32s',
        }}
        className="cc-arrow"
      >
        <path d="M7 17L17 7M17 7H7M17 7v10" />
      </svg>

      <style>{`
        a:hover .cc-handle { color: ${brandColor} !important; }
        a:hover .cc-arrow  { color: ${brandColor} !important; opacity: 1 !important; transform: translate(2px,-2px); }
      `}</style>
    </motion.a>
  )
}

// ─── Main Contact Section ─────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1])
  const headingY     = useTransform(scrollYProgress, [0, 0.5], ['30px', '0px'])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '8rem 0 6rem', position: 'relative', overflow: 'hidden', background: '#000' }}
    >
      {/* Ambient bg */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(255,100,0,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 80%, rgba(245,158,11,0.04) 0%, transparent 50%)
        `,
        animation: 'float 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div className="section-label" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          03 / Contact
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0.1}
          style={{
            fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            fontWeight: 800, lineHeight: 1.05,
            letterSpacing: '-0.03em', marginBottom: '3rem',
            background: 'linear-gradient(135deg, var(--fg) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            scale: headingScale, y: headingY,
          }}
        >
          Let's work<br />together.
        </motion.h2>

        <div className="contact-main-grid">

          {/* Left — profile */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0.2}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                border: '2px solid rgba(255,255,255,0.1)',
              }}>
                <img
                  src="https://drive.google.com/thumbnail?id=1grq8Tu4ZwFtgm5GRKgRknoAbvCi_KjrU&sz=w400"
                  alt="Santhosh G"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.25rem' }}>Santhosh G</h3>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#22c55e' }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%', background: '#22c55e',
                    boxShadow: '0 0 8px rgba(34,197,94,0.6)', animation: 'glow-pulse 2s infinite',
                  }} />
                  Open to Opportunities
                </span>
              </div>
            </div>

            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--fg-dim)', maxWidth: '40ch', marginBottom: '2rem' }}>
              Currently open to internship opportunities and interesting collaborations.
              Whether you have a project in mind or just want to connect — feel free to reach out.
            </p>

            <motion.div
              initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0.35}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.35rem 1rem 0.35rem 0.6rem',
                borderRadius: '9999px',
                border: '1px solid rgba(34,197,94,0.3)',
                background: 'rgba(34,197,94,0.06)',
                fontSize: '0.8rem', color: '#86efac',
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: '#22c55e',
                boxShadow: '0 0 10px rgba(34,197,94,0.7)', animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              Available for internships &amp; projects
            </motion.div>
          </motion.div>

          {/* Right — brand icon cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {CONTACT_LINKS.map((link, i) => (
              <ContactCard key={link.label} link={link} index={i} isInView={isInView} />
            ))}
          </div>

        </div>
      </div>

      <style>{`
        .contact-main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (min-width: 768px) {
          .contact-main-grid { grid-template-columns: 1fr 1.2fr; }
        }

        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 10px rgba(34,197,94,0.7); }
          50% { box-shadow: 0 0 20px rgba(34,197,94,1); }
        }
      `}</style>
    </section>
  )
}