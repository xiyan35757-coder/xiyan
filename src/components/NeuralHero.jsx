import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

const EASE_OUT = [0.16, 1, 0.3, 1]

// === Brand logo: two rotated (-35deg) rounded-rectangles, black fill ===
function LogoMark() {
  return (
    <svg
      className="neural-hero__logo-mark"
      viewBox="0 0 28 28"
      width="22"
      height="22"
      fill="none"
      aria-hidden="true"
    >
      <g transform="translate(14 14)">
        <rect
          x="-10"
          y="-5.5"
          width="13"
          height="11"
          rx="3.2"
          fill="#000"
          transform="rotate(-35)"
        />
        <rect
          x="-3"
          y="-5.5"
          width="13"
          height="11"
          rx="3.2"
          fill="#000"
          transform="rotate(-35)"
          style={{ mixBlendMode: 'multiply' }}
        />
      </g>
    </svg>
  )
}

// === 4-dot grid icon for "Adaptive Systems" pill ===
function Grid4Dots() {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" fill="none" aria-hidden="true">
      <circle cx="3" cy="3" r="1.7" fill="#fff" />
      <circle cx="11" cy="3" r="1.7" fill="#fff" />
      <circle cx="3" cy="11" r="1.7" fill="#fff" />
      <circle cx="11" cy="11" r="1.7" fill="#fff" />
    </svg>
  )
}

export default function NeuralHero() {
  const sectionRef = useRef(null)
  const navRef = useRef(null)
  const [navHidden, setNavHidden] = useState(false)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const section = sectionRef.current
        if (!section) return
        const y = window.scrollY || window.pageYOffset
        // Fade nav out as user scrolls past ~85% of the hero
        const startHideAt = section.offsetHeight * 0.75
        const fullyHiddenAt = section.offsetHeight * 1.05
        if (y > fullyHiddenAt) {
          setNavHidden(true)
        } else if (y < startHideAt) {
          setNavHidden(false)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="neural-hero"
      aria-label="NeuralKinetics Hero"
    >
      {/* === Fixed top navbar (auto-hidden when scrolling past hero) === */}
      <motion.nav
        ref={navRef}
        className={`neural-hero__nav${navHidden ? ' neural-hero__nav--hidden' : ''}`}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: navHidden ? 0 : 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      >
        <div className="neural-hero__nav-inner">
          {/* Left group */}
          <div className="neural-hero__nav-left">
            {/* Logo + brand */}
            <div className="neural-hero__brand-wrap">
              <LogoMark />
              <span className="neural-hero__brand-text">NeuralKinetics</span>
            </div>

            {/* Menu pill (black) */}
            <button
              type="button"
              className="neural-hero__pill neural-hero__pill--menu"
              aria-label="Open menu"
            >
              <span className="neural-hero__circle neural-hero__circle--white">
                <Plus size={12} strokeWidth={3} />
              </span>
              <span className="neural-hero__pill-label neural-hero__pill-label--white">
                Menu
              </span>
            </button>

            {/* Tags pill (light gray, desktop only) */}
            <div className="neural-hero__pill neural-hero__pill--tags">
              <span className="neural-hero__pill-tag">Advanced Bionics</span>
              <span className="neural-hero__pill-sep" />
              <span className="neural-hero__pill-tag">Cognitive AI</span>
            </div>
          </div>

          {/* Right group */}
          <div className="neural-hero__nav-right">
            <div className="neural-hero__pill neural-hero__pill--adapt">
              <span className="neural-hero__circle neural-hero__circle--black">
                <Grid4Dots />
              </span>
              <span className="neural-hero__pill-label neural-hero__pill-label--gray">
                Adaptive Systems
              </span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* === Background video === */}
      <motion.div
        className="neural-hero__video-wrap"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE_OUT }}
      >
        <video
          className="neural-hero__video"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          disablePictureInPicture
          controls={false}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </motion.div>

      {/* === Footer content (pinned to bottom, over gradient fade-up) === */}
      <motion.footer
        className="neural-hero__footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE_OUT }}
      >
        <div className="neural-hero__footer-inner">
          {/* Left block */}
          <div className="neural-hero__foot-left">
            <motion.div
              className="neural-hero__subtitle"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT }}
            >
              <span className="neural-hero__dot" aria-hidden="true" />
              <span>Best digital banking card 2026</span>
            </motion.div>

            <motion.h1
              className="neural-hero__heading"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
            >
              One Card, Zero /
              <br />
              Limits. Worldwide.
            </motion.h1>

            <motion.div
              className="neural-hero__btns"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT }}
            >
              <button
                type="button"
                className="neural-hero__btn neural-hero__btn--primary"
              >
                See Features
              </button>
              <button
                type="button"
                className="neural-hero__btn neural-hero__btn--ghost"
              >
                How It Works
              </button>
            </motion.div>
          </div>

          {/* Right block: tag pills */}
          <div className="neural-hero__foot-right" aria-label="Tag list">
            <span className="neural-hero__tag">Neuromorphic</span>
            <span className="neural-hero__tag">AGI</span>
            <span className="neural-hero__tag">Cybernetics</span>
          </div>
        </div>
      </motion.footer>
    </section>
  )
}
