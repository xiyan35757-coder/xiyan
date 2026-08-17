import React, { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import GamerDNA from './components/GamerDNA'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Footer from './components/Footer'

/* ===========================================================
   App.jsx — 谢茂宇个人作品集 (Melius Design System)
   顺序: Announcement → Navbar(滚动变sticky) → Hero → GamerDNA
        → Skills → Projects → Experience → Footer
   =========================================================== */

// Scroll Reveal hook (inline, no extra file) — 支持所有 reveal* 变体
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      '.reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right, .reveal-hero'
    )
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useScrollReveal()
  const [navSticky, setNavSticky] = useState(false)
  const heroRef = useRef(null)

  // Hero 滚出视口后 Navbar 变为暗色 sticky (rAF 节流, 避免每次 scroll 多次 layout)
  useEffect(() => {
    let raf = 0
    let pending = false
    const compute = () => {
      pending = false
      const r = heroRef.current?.getBoundingClientRect()
      if (r) setNavSticky(r.bottom <= 24)
    }
    const onScroll = () => {
      if (pending) return
      pending = true
      raf = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    compute()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div style={{ position: 'relative', paddingTop: 40 }}>
      {/* ========= 1. 顶部公告条 (固定悬浮 + 透明磨砂质感 + 入场) ========= */}
      <div
        className="announcement"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          background: 'rgba(10,10,10,0.55)',
          backdropFilter: 'blur(16px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.6)',
          borderBottom: '1px solid var(--border-dark)',
          zIndex: 100,
          animation: 'navDown 0.9s var(--ease-luxe) both',
        }}
      >
        <style>{`
          @keyframes navDown {
            0% { opacity: 0; transform: translateY(-100%); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeDown {
            0% { opacity: 0; transform: translateY(-12px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        🎮 &nbsp;<strong>欢迎来到我的作品集</strong>&nbsp;· 应届求职中 · 游戏策划 / 发行运营 / 数据分析 / 社区运营 &nbsp;·&nbsp;
        <a href="#contact">查看联系方式 →</a>
      </div>

      {/* ========= 2. Navbar ========= */}
      <div
        style={{
          position: navSticky ? 'sticky' : 'relative',
          top: navSticky ? 40 : 'auto',
          zIndex: 80,
          background: navSticky ? 'rgba(10,10,10,0.82)' : 'transparent',
          backdropFilter: navSticky ? 'blur(14px) saturate(1.4)' : 'none',
          borderBottom: navSticky ? '1px solid var(--border-dark)' : 'none',
          transition: 'all .3s var(--ease-sin)',
        }}
      >
        <Navbar />
      </div>

      {/* ========= 3. Hero (Melius风格: 衬线大标题 + 3D弧形游戏图片带) ========= */}
      <div ref={heroRef}>
        <Hero />
      </div>

      {/* ========= 3.5 标签条带 (独立于视频之外，不挡字幕) ========= */}
      <div
        style={{
          background: '#000000',
          padding: '24px 16px',
          borderTop: '1px solid var(--border-dark)',
          display: 'flex', flexWrap: 'wrap',
          gap: 8, justifyContent: 'center',
          animation: 'sectionFadeIn 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        }}
      >
        {['游戏策划', '用户洞察', '数据分析', '活动策划', '项目管理', 'AI工具应用', 'CF校园代理人', 'ENFJ', 'CET-4'].map((t, i) => (
          <span
            key={t}
            className="pill"
            style={{
              fontSize: 12.5, padding: '5px 13px',
              animation: `heroTitleIn 500ms cubic-bezier(0.22, 1, 0.36, 1) ${120 + i * 60}ms both`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* ========= 4. Gamer DNA (Melius Showcase: 5Tab 游戏品类画布展示) ========= */}
      <section
        id="gamer-dna"
        style={{ animation: 'sectionFadeIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
      >
        <GamerDNA />
      </section>

      {/* ========= 5. Skills (Melius Personas: 核心能力x工具栈 + 4个身份Tab) ========= */}
      <section
        id="skills"
        style={{ animation: 'sectionFadeIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
      >
        <Skills />
      </section>

      {/* ========= 6. Key Projects (STAR 方法四象限卡片) ========= */}
      <section
        id="projects"
        style={{ animation: 'sectionFadeIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
      >
        <Projects />
      </section>

      {/* ========= 7. Experience + Education (实习 × 教育背景) ========= */}
      <section
        id="experience"
        style={{ animation: 'sectionFadeIn 800ms cubic-bezier(0.22, 1, 0.36, 1) both' }}
      >
        <Experience />
      </section>

      {/* ========= 8. Footer: FAQ手风琴 + Contact CTA + 页脚 ========= */}
      <section id="contact">
        <Footer />
      </section>
    </div>
  )
}
