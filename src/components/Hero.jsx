import { useRef, Suspense, lazy, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode"
const nameLetters = 'Santhosh G'.split('')

// CSS filter: converts purple Spline robot → amber/yellow (your website color)
const AMBER_FILTER = 'sepia(0.6) saturate(2.5) hue-rotate(5deg) brightness(1.1)'

function SpinnerFallback() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ position: 'relative', width: 56, height: 56 }}>
        <div style={{
          position: 'absolute', inset: 0,
          border: '2px solid rgba(245,158,11,0.15)',
          borderTopColor: '#f59e0b', borderRadius: '50%',
          animation: 'hs 0.9s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 10,
          border: '1.5px solid rgba(245,158,11,0.08)',
          borderBottomColor: '#f59e0b88', borderRadius: '50%',
          animation: 'hs 1.4s linear infinite reverse',
        }} />
      </div>
      <style>{`@keyframes hs { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

const SOCIALS = [
  {
    href: 'https://www.linkedin.com/in/santhosh-gopinath-14817335b', label: 'LinkedIn',
    icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    href: 'https://github.com/Santhosh-Gopinath', label: 'GitHub',
    icon: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
  {
    href: 'mailto:santhoshgopinath10@gmail.com', label: 'Email',
    icon: 'M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z',
  },
]

export default function Hero() {
  const containerRef = useRef(null)
  const [breakpoint, setBreakpoint] = useState('desktop')

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      if (w < 640) setBreakpoint('mobile')
      else if (w < 1024) setBreakpoint('tablet')
      else setBreakpoint('desktop')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const isMobile  = breakpoint === 'mobile'
  const isTablet  = breakpoint === 'tablet'
  const isStacked = isMobile || isTablet

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const nameY     = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const robotY    = useTransform(scrollYProgress, [0, 1], ['0%', isStacked ? '8%' : '16%'])
  const opacity   = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  /* ═══════════════════════════════════════════════════════
     MOBILE / TABLET  —  Text on top, Robot on bottom
  ═══════════════════════════════════════════════════════ */
  if (isStacked) {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          background: '#000',
          overflow: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Amber glow top-left */}
        <div style={{
          position: 'absolute', top: '-15%', left: '-20%',
          width: '75%', height: '55%',
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* ── TOP: Text ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          padding: isTablet
            ? '6.5rem 3.5rem 1.5rem'
            : '5.5rem 1.5rem 1rem',
          flex: '0 0 auto',
        }}>
          {/* Tag line */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: isTablet ? '0.7rem' : '0.62rem',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'var(--accent)', marginBottom: isTablet ? '1.25rem' : '0.9rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}
          >
            <span style={{ display: 'inline-block', width: 20, height: 1.5, background: 'var(--accent)' }} />
            Portfolio · 2025
          </motion.p>

          {/* Name — letter by letter */}
          <motion.h1
            style={{
              display: 'flex', flexWrap: 'wrap', gap: 0,
              fontSize: isTablet
                ? 'clamp(3.5rem, 8vw, 5.5rem)'
                : 'clamp(2.8rem, 12.5vw, 4rem)',
              fontWeight: 900, lineHeight: 0.92,
              letterSpacing: '-0.03em', color: 'var(--fg)',
              marginBottom: '0.65rem',
              y: nameY, opacity,
            }}
          >
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: 55, opacity: 0, rotateX: -28 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.82, delay: 0.28 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: 'inline-block',
                  whiteSpace: letter === ' ' ? 'pre' : 'normal',
                  transformOrigin: 'bottom center',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Role */}
          <motion.div style={{ y: subtitleY, opacity }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: isTablet ? '0.78rem' : '0.68rem',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--fg-dim)', marginBottom: '1.5rem',
              }}
            >
              AI &amp; Data Science Engineer
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap' }}
            >
              <a href="#projects" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: isTablet ? '0.72rem 1.5rem' : '0.62rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                background: 'var(--accent)', color: '#000',
                fontWeight: 700, fontSize: '0.78rem',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                View Work
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center',
                padding: isTablet ? '0.72rem 1.5rem' : '0.62rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                color: 'var(--fg)', fontWeight: 500, fontSize: '0.78rem',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}>
                Contact
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── BOTTOM: Robot ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 1.0 }}
          style={{
            position: 'relative', zIndex: 5,
            flex: '0 0 auto',
            width: '100%',
            height: isTablet ? '520px' : '370px',
            overflow: 'hidden',
            filter: AMBER_FILTER,
          }}
        >
          {/* Blend edges */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '18%',
            background: 'linear-gradient(to bottom, #000 0%, transparent 100%)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '18%',
            background: 'linear-gradient(to top, #000 0%, transparent 100%)',
            zIndex: 2, pointerEvents: 'none',
          }} />
          {/* Spline needs explicit pixel dimensions to init canvas correctly */}
          <Suspense fallback={<SpinnerFallback />}>
            <Spline
              scene={ROBOT_SCENE_URL}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          </Suspense>
        </motion.div>

        {/* Socials row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex', gap: '1.5rem',
            justifyContent: 'center',
            padding: '0.75rem 0 1.75rem',
          }}
        >
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href}
              target={s.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={s.label}
              style={{ opacity: 0.35, transition: 'opacity 0.3s', display: 'flex' }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.35}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--fg)">
                <path d={s.icon} />
              </svg>
            </a>
          ))}
        </motion.div>
      </div>
    )
  }

  /* ═══════════════════════════════════════════════════════
     DESKTOP  —  Text left, Robot far right + amber tint
  ═══════════════════════════════════════════════════════ */
  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}
    >
      {/* Robot — pushed further right: right: -14% */}
      <motion.div style={{
        position: 'absolute',
        top: '-5%', right: '-14%',
        width: '70%', height: '120%',
        zIndex: 1,
        y: robotY,
        filter: AMBER_FILTER,
      }}>
        <Suspense fallback={<SpinnerFallback />}>
          <Spline scene={ROBOT_SCENE_URL} style={{ width: '100%', height: '100%' }} />
        </Suspense>
      </motion.div>

      {/* Gradient mask — text side */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: `linear-gradient(to right,
          #000000 0%,
          #000000 32%,
          rgba(0,0,0,0.88) 46%,
          rgba(0,0,0,0.3) 60%,
          transparent 76%
        )`,
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%',
        background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        zIndex: 3, pointerEvents: 'none',
      }} />

      {/* Amber ambient glow */}
      <div style={{
        position: 'absolute', left: '-8%', top: '15%',
        width: '48%', height: '65%',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(245,158,11,0.07) 0%, transparent 60%)',
        zIndex: 2, pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 10,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '0 0 0 clamp(2rem, 5vw, 5.5rem)',
        pointerEvents: 'none',
      }}>
        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--accent)', marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            opacity,
          }}
        >
          <span style={{ display: 'inline-block', width: 28, height: 1.5, background: 'var(--accent)' }} />
          Portfolio · 2026
        </motion.p>

        {/* Name */}
        <motion.h1
          style={{
            display: 'flex', flexWrap: 'wrap', gap: 0,
            fontSize: 'clamp(4rem, 9.5vw, 9.5rem)',
            fontWeight: 900, lineHeight: 0.92,
            letterSpacing: '-0.03em', color: 'var(--fg)',
            marginBottom: '1rem',
            y: nameY, opacity,
          }}
        >
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0, rotateX: -40 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.9, delay: 0.35 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'inline-block',
                whiteSpace: letter === ' ' ? 'pre' : 'normal',
                transformOrigin: 'bottom center',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Role + CTAs */}
        <motion.div style={{ y: subtitleY, opacity }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8 }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.95rem)',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--fg-dim)', marginBottom: '2.5rem', maxWidth: '38ch',
            }}
          >
            Fullstacker &amp; IOT Engineer &amp; AI/Data Science Engineer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.8 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', pointerEvents: 'auto' }}
          >
            <a href="#projects" data-cursor-hover
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.8rem 1.75rem', borderRadius: 'var(--radius-full)',
                background: 'var(--accent)', color: '#000',
                fontWeight: 700, fontSize: '0.85rem',
                letterSpacing: '0.05em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(245,158,11,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              View Work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
            <a href="#contact" data-cursor-hover
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.8rem 1.75rem', borderRadius: 'var(--radius-full)',
                border: '1.5px solid rgba(255,255,255,0.15)',
                color: 'var(--fg)', fontWeight: 500, fontSize: '0.85rem',
                letterSpacing: '0.05em', textTransform: 'uppercase',
                textDecoration: 'none', backdropFilter: 'blur(8px)',
                transition: 'border-color 0.3s, background 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)'
                e.currentTarget.style.background = 'rgba(245,158,11,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Contact
            </a>
          </motion.div>
        </motion.div>

        {/* Socials vertical */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '3rem', left: 'clamp(2rem, 5vw, 5.5rem)',
            display: 'flex', flexDirection: 'column', gap: '1.1rem',
            pointerEvents: 'auto',
          }}
        >
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href}
              target={s.label !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer" aria-label={s.label}
              data-cursor-hover
              style={{ opacity: 0.35, transition: 'opacity 0.3s, transform 0.3s', display: 'flex' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'translateX(4px)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = 0.35; e.currentTarget.style.transform = 'none' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="var(--fg)">
                <path d={s.icon} />
              </svg>
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.a href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'auto',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}
          data-cursor-hover
        >
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '0.6rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-muted)',
          }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.a>
      </div>
    </div>
  )
}