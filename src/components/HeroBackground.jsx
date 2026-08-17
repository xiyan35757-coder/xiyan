import { useEffect, useRef } from 'react'

// Animated "video-like" tech background: drifting particle network over a
// perspective grid + scanning light. Self-contained canvas, no external video.
// Replace the <HeroBackground/> node with a <video> tag later if a real clip is supplied.
export default function HeroBackground() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let particles = []
    let t = 0

    const ACCENT = '190, 235, 255' // matches --accent cyan

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    function seed() {
      const count = Math.round(Math.min(120, (w * h) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.5,
      }))
    }

    function grid() {
      // perspective floor grid fading toward horizon
      const horizon = h * 0.52
      const lines = 22
      ctx.lineWidth = 1
      for (let i = 0; i < lines; i++) {
        const p = i / (lines - 1)
        const y = horizon + (h - horizon) * Math.pow(p, 2.2)
        const a = 0.02 + p * 0.07
        ctx.strokeStyle = `rgba(${ACCENT}, ${a})`
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      const verts = 28
      for (let i = 0; i <= verts; i++) {
        const x = (i / verts) * w
        const drift = Math.sin(t * 0.0006 + i * 0.4) * 14
        ctx.strokeStyle = `rgba(${ACCENT}, 0.04)`
        ctx.beginPath()
        ctx.moveTo(x, horizon)
        ctx.lineTo(w / 2 + (x - w / 2) * 6 + drift, h)
        ctx.stroke()
      }
    }

    function net() {
      const max = 130
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.fillStyle = `rgba(${ACCENT}, 0.55)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const d = Math.hypot(dx, dy)
          if (d < max) {
            const a = (1 - d / max) * 0.16
            ctx.strokeStyle = `rgba(${ACCENT}, ${a})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.stroke()
          }
        }
      }
    }

    function scan() {
      const y = (Math.sin(t * 0.0008) * 0.5 + 0.5) * h
      const g = ctx.createLinearGradient(0, y - 120, 0, y + 120)
      g.addColorStop(0, `rgba(${ACCENT}, 0)`)
      g.addColorStop(0.5, `rgba(${ACCENT}, 0.05)`)
      g.addColorStop(1, `rgba(${ACCENT}, 0)`)
      ctx.fillStyle = g
      ctx.fillRect(0, y - 120, w, 240)
    }

    function frame() {
      t += 16
      ctx.clearRect(0, 0, w, h)
      // base vignette
      const vg = ctx.createRadialGradient(w / 2, h * 0.45, 0, w / 2, h * 0.45, Math.max(w, h) * 0.7)
      vg.addColorStop(0, 'rgba(20, 32, 40, 0.0)')
      vg.addColorStop(1, 'rgba(0, 0, 0, 0.55)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)
      grid()
      scan()
      net()
      rafRef.current = requestAnimationFrame(frame)
    }

    function drawStatic() {
      ctx.clearRect(0, 0, w, h)
      grid()
      net()
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    if (reduce) {
      drawStatic()
    } else {
      rafRef.current = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-bg" aria-hidden="true" />
}
