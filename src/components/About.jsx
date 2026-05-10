import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import sxndy from '../assets/images/sxndy.jpg'

const SKILLS = [
  'Python', 'C', 'Java', 'HTML', 'React', 'MongoDB',
  'NLP', 'Machine Learning', 'Data Science', 'IoT',
  'SQL', 'CSS', 'Git', 'REST API', 'ESP32',
]

const TIMELINE = [
  {
    school: 'Mepco Schlenk Engineering College, Sivakasi',
    degree: 'B.Tech — Artificial Intelligence & Data Science',
    year: '2023 — 2026',
    active: true,
  },
  {
    school: 'GMS Mavmm Polytechnic College, Madurai',
    degree: 'Diploma in Electronic Communication Engineering',
    year: '2020 — 2023',
    active: false,
  },
  {
    school: 'Sairam Matric Hr Sec School, Madurai',
    degree: 'SSLC',
    year: '2020',
    active: false,
  },
]

const CERTIFICATIONS = [
  'OneCredit Course — NLP',
  'NPTEL — Responsible & Safe AI Systems',
  'NPTEL — Certification on Java',
  'ACIC Mepco Innovation Foundation',
  'COA Certification',
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] },
  }),
}

export default function About() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  return (
    <section id="about" ref={sectionRef} style={{ padding: '10rem 0 6rem', background: '#000' }}>
      <div className="container">

        <motion.div className="section-label" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp}>
          01 / About
        </motion.div>

        {/* Photo + Name/Bio grid — photo LEFT on desktop, stacked on mobile */}
        <div className="about-intro-grid">

          {/* Photo — glass effect, centered within its column */}
          <motion.div
            className="about-photo-wrap"
            initial={{ opacity: 0, scale: 0.9, clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ y: photoY }}
          >
            <img src={sxndy} alt="Santhosh G" className="about-photo-img" />
            {/* Glass shimmer */}
            <div className="about-glass-shine" />
            {/* Amber border glow */}
            <div className="about-photo-border" />
          </motion.div>

          {/* Text side */}
          <motion.div style={{ y: textY }}>
            {/* Santhosh G — Valentin Gil style: big, Syne 800, white */}
            <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0.2}
              style={{ marginBottom: '1.5rem', overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  marginBottom: '1.5rem',
                  display: 'block',
                }}
              >
                Santhosh G
              </motion.h2>
            </motion.div>

            {/* Pills */}
            <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0.3}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span className="glass-pill">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="var(--accent)">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Sellur, Madurai
              </span>
              <span className="glass-pill" style={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px rgba(34,197,94,0.6)', flexShrink: 0 }} />
                Open to opportunities
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-body"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={0.4}
              style={{ textAlign: 'justify', lineHeight: 1.8 }}
            >
              A passionate and dedicated student pursuing B.Tech in Artificial Intelligence &amp; Data Science
              at Mepco Schlenk Engineering College, Sivakasi. My academic background is complemented by
              hands-on projects spanning AI recommendation systems, retail analytics, IoT smart systems,
              and embedded hardware — applying real-world solutions from software to silicon.
            </motion.p>
          </motion.div>
        </div>

        {/* Skills Marquee */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.8 }}
          style={{ overflow: 'hidden', padding: '3rem 0 1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', animation: 'marquee 25s linear infinite', width: 'max-content' }}>
            {[...SKILLS, ...SKILLS].map((skill, i) => (
              <span key={i} className="glass-pill" style={{ flexShrink: 0, fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{skill}</span>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <div style={{ marginTop: '4rem' }}>
          <motion.h3 initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0.6}
            style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: '2rem', letterSpacing: '-0.02em' }}>
            Education
          </motion.h3>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            <motion.div initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
              style={{ position: 'absolute', left: 3, top: 8, bottom: 8, width: 1, background: 'rgba(255,255,255,0.15)', transformOrigin: 'top' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {TIMELINE.map((item, i) => (
                <motion.div key={i} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={0.8 + i * 0.15} style={{ position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: '-2rem', top: 6, width: 8, height: 8, borderRadius: '50%',
                    background: item.active ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                    boxShadow: item.active ? '0 0 12px var(--accent-glow)' : 'none', transform: 'translateX(-3px)',
                  }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{item.school}</h4>
                      <p style={{ fontSize: '0.9rem', color: 'var(--fg-dim)', textAlign: 'justify' }}>{item.degree}</p>
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--fg-muted)', flexShrink: 0 }}>{item.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div style={{ marginTop: '4rem' }}>
          <motion.h3 initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1.0}
            style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Certifications
          </motion.h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {CERTIFICATIONS.map((cert, i) => (
              <motion.span key={i} className="glass-pill" initial="hidden" animate={isInView ? 'visible' : 'hidden'}
                variants={fadeUp} custom={1.1 + i * 0.08} style={{ fontSize: '0.8rem' }}>
                🏅 {cert}
              </motion.span>
            ))}
          </div>

          {/* View my CV button */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUp} custom={1.6}
            style={{ marginTop: '2.5rem' }}>
            <a
              href="https://drive.google.com/file/d/1r3bvNS4LgSjYttGkQq0qsdimisV-tRYm/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                border: '1.5px solid var(--accent)',
                borderRadius: '9999px',
                color: 'var(--fg)',
                fontFamily: 'var(--font)',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'background 0.3s, color 0.3s',
                background: 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg)'; }}
            >
              View my CV
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </motion.div>
        </div>

      </div>

      <style>{`
        /* ── About intro grid ── */
        .about-intro-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
          margin-top: 3rem;
        }
        @media (min-width: 768px) {
          .about-intro-grid {
            grid-template-columns: 300px 1fr;
          }
        }

        /* ── Photo wrapper ── */
        .about-photo-wrap {
          position: relative;
          width: 100%;
          max-width: 320px;
          aspect-ratio: 3 / 4;
          border-radius: 16px;
          overflow: hidden;
          margin: 0 auto;
          /* subtle amber shadow */
          box-shadow: 0 0 60px rgba(245,158,11,0.07), inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .about-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        /* diagonal light sweep */
        .about-glass-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.10) 0%,
            transparent 35%,
            rgba(255,255,255,0.03) 65%,
            transparent 100%
          );
          pointer-events: none;
        }
        /* frosted name strip at bottom */
        .about-photo-frost {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 0.55rem 1rem;
          background: rgba(0,0,0,0.48);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        /* amber border overlay */
        .about-photo-border {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          border: 1px solid rgba(245,158,11,0.2);
          pointer-events: none;
          transition: border-color 0.4s, box-shadow 0.4s;
        }
        .about-photo-wrap:hover .about-photo-border {
          border-color: rgba(245,158,11,0.45);
          box-shadow: 0 0 30px rgba(245,158,11,0.12);
        }
      `}</style>
    </section>
  )
}