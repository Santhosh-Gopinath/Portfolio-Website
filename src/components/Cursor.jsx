import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const outerRef = useRef(null)
  const innerRef = useRef(null)
  const trailsRef = useRef([])
  const mouse = useRef({ x: -100, y: -100 })
  const pos = useRef({ x: -100, y: -100 })
  const innerPos = useRef({ x: -100, y: -100 })
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    // Check for touch device
    if (window.matchMedia('(pointer: coarse)').matches) return

    const TRAIL_COUNT = 6
    const trails = []

    // Create trail elements
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const el = document.createElement('div')
      el.className = 'custom-cursor'
      el.style.cssText = `
        position: fixed; top: 0; left: 0; pointer-events: none; z-index: 99998;
        width: ${4 - i * 0.4}px; height: ${4 - i * 0.4}px;
        border-radius: 50%;
        background: var(--accent);
        opacity: ${0.4 - i * 0.06};
        transition: none;
        will-change: transform;
      `
      document.body.appendChild(el)
      trails.push({ el, x: -100, y: -100 })
    }
    trailsRef.current = trails

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onMouseEnter = () => setIsHidden(false)
    const onMouseLeave = () => setIsHidden(true)

    // Detect hoverable elements
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-hover]')
      setIsHovering(!!target)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', onMouseOver)

    // Animation loop
    let raf
    const animate = () => {
      raf = requestAnimationFrame(animate)

      // Outer ring — slow follow
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12

      // Inner dot — fast follow
      innerPos.current.x += (mouse.current.x - innerPos.current.x) * 0.25
      innerPos.current.y += (mouse.current.y - innerPos.current.y) * 0.25

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px) scale(${isHovering ? 1.8 : 1})`
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${innerPos.current.x - 4}px, ${innerPos.current.y - 4}px) scale(${isHovering ? 0 : 1})`
      }

      // Trail
      let prevX = mouse.current.x
      let prevY = mouse.current.y
      trails.forEach((t, i) => {
        t.x += (prevX - t.x) * (0.3 - i * 0.035)
        t.y += (prevY - t.y) * (0.3 - i * 0.035)
        t.el.style.transform = `translate(${t.x - 2}px, ${t.y - 2}px)`
        prevX = t.x
        prevY = t.y
      })
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', onMouseOver)
      trails.forEach(t => t.el.remove())
    }
  }, [isHovering])

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isHidden ? 0 : 0.6,
          transition: 'opacity 0.3s, width 0.3s, height 0.3s, border-color 0.3s',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
