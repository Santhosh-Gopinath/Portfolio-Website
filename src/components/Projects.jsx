import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

// ─────────────────────────────────────────────────────────────
//  HOW TO ADD YOUR PROJECT IMAGES
//  1. Drop your image file into: src/assets/Project_images/
//  2. Replace  image: null  with  image: new URL('../assets/Project_images/YOUR_FILE.png', import.meta.url).href
// ─────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'Movie Recommender System',
    description: 'AI-powered content recommendation engine built for MepExpo24. Suggests movies based on user preferences using collaborative filtering and NLP techniques to deliver personalised results in real time.',
    github: 'https://github.com/santhoshg1003',
    url: null,
    date: '2024',
    tags: ['Python', 'NLP', 'Machine Learning', 'React'],
    image: null,            // replace with: new URL('../assets/Project_images/movie-recommender.png', import.meta.url).href
    placeholder: '#f59e0b', // amber glow when no image
    icon: '🎬',
  },
  {
    title: 'Recipe Blog with MongoDB',
    description: 'Full-stack recipe blogging platform backed by MongoDB. Supports complete CRUD operations, rich-text recipe creation, ingredient search, and a responsive UI for both desktop and mobile users.',
    github: 'https://github.com/santhoshg1003',
    url: null,
    date: '2024',
    tags: ['MongoDB', 'Node.js', 'HTML', 'CSS'],
    image: null,
    placeholder: '#10b981',
    icon: '🍳',
  },
  {
    title: 'Social Media App — React',
    description: 'Feature-rich social media web application built with React. Includes user profiles, post feeds, real-time interaction components, and a clean modern interface optimised for engagement.',
    github: 'https://github.com/santhoshg1003',
    url: null,
    date: '2024',
    tags: ['React', 'JavaScript', 'CSS', 'REST API'],
    image: null,
    placeholder: '#3b82f6',
    icon: '💬',
  },
  {
    title: 'Retail Sales Analytics & Forecasting',
    description: 'Data analytics dashboard that processes retail sales data to uncover trends and forecast future demand using Python and ML models, helping businesses make informed inventory decisions.',
    github: 'https://github.com/santhoshg1003',
    url: null,
    date: '2025',
    tags: ['Python', 'Data Science', 'ML', 'SQL'],
    image: null,
    placeholder: '#8b5cf6',
    icon: '📊',
  },
  {
    title: 'ESP32 — Retro Pac-Man Console',
    description: 'Handheld retro gaming console powered by ESP32. Runs a custom Pac-Man implementation on an OLED display with hardware button controls, showcasing embedded systems and real-time game logic.',
    github: 'https://github.com/santhoshg1003',
    url: null,
    date: '2025',
    tags: ['ESP32', 'C', 'IoT', 'Embedded'],
    image: null,
    placeholder: '#ef4444',
    icon: '🕹️',
  },
  {
    title: 'Bluetooth Smart Irrigation System',
    description: 'IoT-based automated irrigation system controlled over Bluetooth. Monitors soil moisture in real time and triggers water pumps intelligently, reducing water waste and enabling hands-free farming.',
    github: 'https://github.com/santhoshg1003',
    url: null,
    date: '2024',
    tags: ['ESP32', 'Bluetooth', 'IoT', 'C'],
    image: null,
    placeholder: '#06b6d4',
    icon: '🌱',
  },
]

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
)

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const cardY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const isEven = index % 2 === 0

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }) }}
      style={{
        y: cardY,
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2rem',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: isHovered ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.08)',
        background: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(16px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
        boxShadow: isHovered
          ? '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 60px rgba(245,158,11,0.06)'
          : '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        transition: 'border-color 0.5s, background 0.5s, box-shadow 0.5s, transform 0.4s cubic-bezier(0.25,1,0.5,1)',
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${mousePos.y * -8}deg) translateY(-6px)`
          : 'perspective(1000px) rotateY(0) rotateX(0) translateY(0)',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      className="project-card"
    >
      {/* Glass reflection sweep */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.03) 45%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0.03) 55%,transparent 60%)',
        transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
        transition: 'transform 0.8s cubic-bezier(0.25,1,0.5,1)',
        pointerEvents: 'none', zIndex: 1, borderRadius: '16px',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
        background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)',
        borderRadius: '100%', pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ── Image / Placeholder panel ── */}
      <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9' }}>

        {project.image ? (
          /* Real screenshot */
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.25,1,0.5,1)',
              transform: isHovered
                ? `scale(1.05) translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`
                : 'scale(1)',
            }}
          />
        ) : (
          /* Gradient placeholder — shows until real image is added */
          <div style={{
            width: '100%', height: '100%',
            background: `radial-gradient(ellipse at 40% 50%, ${project.placeholder}33 0%, #050505 75%)`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
          }}>
            {/* Top shimmer line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg,transparent,${project.placeholder}66,transparent)`,
              opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.4s',
            }} />
            <span style={{
              fontSize: 'clamp(3rem,6vw,5rem)',
              filter: `drop-shadow(0 0 ${isHovered ? '40px' : '16px'} ${project.placeholder}99)`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.4s cubic-bezier(0.25,1,0.5,1)',
              userSelect: 'none',
            }}>
              {project.icon}
            </span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '0.6rem',
              color: project.placeholder, letterSpacing: '0.12em',
              textTransform: 'uppercase', opacity: 0.7,
            }}>
              add screenshot
            </span>
          </div>
        )}

        {/* Hover overlay — GitHub + optional Live Site */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '0.75rem', flexWrap: 'wrap',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s',
          backdropFilter: 'blur(4px)',
        }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
              fontWeight: 600, fontSize: '0.85rem', color: 'var(--fg)',
              padding: '0.5rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(8px)',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <GithubIcon /> GitHub
          </a>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                fontWeight: 600, fontSize: '0.85rem', color: '#000',
                padding: '0.5rem 1.1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--accent)',
                background: 'var(--accent)',
                textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Visit Site <LinkIcon />
            </a>
          )}
        </div>
      </div>

      {/* ── Info ── */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
          <h3 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
            {project.title}
          </h3>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--fg-muted)', flexShrink: 0 }}>
            {project.date}
          </span>
        </div>

        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--fg-dim)', maxWidth: '52ch' }}>
          {project.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="glass-pill" style={{ fontSize: '0.7rem', padding: '0.3rem 0.75rem' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={sectionRef} style={{ padding: '8rem 0', background: '#000' }}>
      <div className="container">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          02 / Projects
        </motion.div>

        <motion.h2
          className="heading-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          Selected Work
        </motion.h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .project-card {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
