import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Volume2, VolumeX, Play } from 'lucide-react'
import { heroGameStrip, picStrip, picHero } from '../data/games'

/* =========================================================
 * Hero.jsx — 性能优化版
 *
 * 性能审计 + 优化点:
 *  1) 🔴 60MB 背景视频默认 preload="auto":改为 metadata, 等 window.load 后再触发 load+play,
 *     避免首屏带宽被视频饿死,文字/图片/字体优先进场
 *  2) rAF 自动旋转循环:加 visibilitychange 后台暂停,省 CPU+电量;
 *     加 prefers-reduced-motion 自动降级跳过
 *  3) scroll 监听器:加 rAF 节流,避免每帧多次 getBoundingClientRect
 *  4) 弧形图:前 4 张 fetchpriority="high",其余 lazy+low,对齐真实可见顺序
 *  5) 合成层:舞台 will-change transform;光晕 blur(30px) 独立合成层
 * ========================================================= */

export default function Hero() {
  /* ====== 动效核心状态 ====== */
  const sectionRef = useRef(null)
  const stageRef   = useRef(null)
  const videoRef   = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [hoverIdx, setHoverIdx] = useState(-1)
  const [audioState, setAudioState] = useState('muted')
  const [showCtrl, setShowCtrl] = useState(true)
  const extraRot   = useRef(0)
  const autoRot    = useRef(0)
  const lastTs     = useRef(performance.now())
  const rafId      = useRef(0)
  const scrollRaf  = useRef(0)            // scroll 节流 rAF id
  const scrollPending = useRef(false)     // scroll 节流挂起标志
  const rafRunning = useRef(false)        // 自动旋转循环是否正在跑
  const userInteracted = useRef(false)

  /* ---------- 1) 入场 stagger ---------- */
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* ---------- 2) Scroll-driven 旋转 + 声音按钮显隐 (加 rAF 节流) ---------- */
  useEffect(() => {
    const compute = () => {
      scrollPending.current = false
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh   = window.innerHeight || 1
      const prog = 1 - Math.max(0, Math.min(1, (rect.bottom - vh * 0.25) / (rect.height + vh * 0.5)))
      extraRot.current = -22 + prog * 44
      const visible = rect.bottom > vh * 0.15 && rect.top < vh * 0.85
      setShowCtrl(visible)
    }
    const onScroll = () => {
      if (scrollPending.current) return      // 一帧只排一次 compute
      scrollPending.current = true
      scrollRaf.current = requestAnimationFrame(compute)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    compute()   // 首帧同步定位,避免按钮闪一下才隐
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollRaf.current) cancelAnimationFrame(scrollRaf.current)
    }
  }, [])

  /* ---------- 3) 视频初始化: 等 window.load 再加载 60MB 视频 ---------- */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.volume = 0.32
    v.muted = true

    const startVideo = () => {
      // 先 load 元数据 (preload="metadata" 已经设置,这里显式触发以确保)
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }

    // 兼容:window 是否已完成 load
    if (document.readyState === 'complete') {
      startVideo()
    } else {
      window.addEventListener('load', startVideo, { once: true })
    }

    return () => {
      window.removeEventListener('load', startVideo)
      v.pause()
    }
  }, [])

  /* ---------- 4) 首次用户交互后自动取消静音 ---------- */
  useEffect(() => {
    const unmute = () => {
      if (userInteracted.current) return
      userInteracted.current = true
      const v = videoRef.current
      if (v) {
        v.muted = false
        v.play().catch(() => {})
      }
      setAudioState('on')
    }
    window.addEventListener('click', unmute, { once: true })
    window.addEventListener('scroll', unmute, { once: true, passive: true })
    window.addEventListener('keydown', unmute, { once: true })
    return () => {
      window.removeEventListener('click', unmute)
      window.removeEventListener('scroll', unmute)
      window.removeEventListener('keydown', unmute)
    }
  }, [])

  /* ---------- 5) 三态切换 ---------- */
  const toggleAudio = () => {
    const v = videoRef.current
    if (!v) return
    setAudioState(prev => {
      const next = prev === 'on' ? 'muted' : prev === 'muted' ? 'paused' : 'on'
      if (next === 'on') {
        v.muted = false
        v.play().catch(() => {})
      } else if (next === 'muted') {
        v.muted = true
        if (v.paused) v.play().catch(() => {})
      } else {
        v.pause()
      }
      return next
    })
  }

  /* ---------- 6) rAF 自动旋转 + visibilitychange 后台暂停 + reduced-motion 降级 ---------- */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const tick = (ts) => {
      const dt = (ts - lastTs.current) / 1000
      lastTs.current = ts
      autoRot.current = Math.sin(ts / 9000) * 3

      const stage = stageRef.current
      if (stage) {
        const total = extraRot.current + autoRot.current
        stage.style.transform = `translateZ(0) rotateY(${total.toFixed(2)}deg)`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    const start = () => {
      if (rafRunning.current) return
      rafRunning.current = true
      lastTs.current = performance.now()
      rafId.current = requestAnimationFrame(tick)
    }
    const stop = () => {
      if (!rafRunning.current) return
      rafRunning.current = false
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = 0
      }
    }

    // 页面隐藏时暂停循环,回到可见时恢复 (标签页切走/最小化时不再空转 60fps)
    const onVis = () => {
      if (document.hidden) stop()
      else start()
    }
    document.addEventListener('visibilitychange', onVis)

    start()
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  /* ====== 渲染 ====== */
  return (
    <section
      ref={sectionRef}
      className="section"
      style={{ minHeight: '100vh', paddingTop: 0, paddingBottom: 0, position: 'relative', overflow: 'hidden', backgroundColor: '#000000' }}
    >
      {/* ====== 背景视频: preload=metadata 先不缓冲 60MB, 等 window.load 再触发
                 视频 58MB > GitHub/CF Pages 限制, 部署后会 404, 因此:
                 1) poster 提供静态 16:9 官方游戏图做即时背景(不会黑屏)
                 2) onerror 自动降级, 隐藏 video 让 poster 层保留, 不卡顿 ====== */}
      <video
        ref={videoRef}
        loop
        playsInline
        muted
        preload="metadata"
        poster={picHero('bg-moba')}
        aria-hidden
        onError={(e) => {
          // 视频 404 / 跨域 / 加载失败: 降级为 poster 静态背景, 避免卡顿/黑屏
          const v = e.currentTarget
          v.style.visibility = 'hidden'
          v.style.display = 'none'
          // 把 poster 作为静态图渲染到父容器背景上
          const parent = v.parentElement
          if (parent) {
            const bgLayer = document.createElement('div')
            bgLayer.setAttribute('aria-hidden', 'true')
            Object.assign(bgLayer.style, {
              position: 'absolute', inset: 0,
              zIndex: 0,
              backgroundImage: `url(${v.poster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'translateZ(0)',
              pointerEvents: 'none',
            })
            parent.insertBefore(bgLayer, v.nextSibling)
          }
        }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          zIndex: 0,
          pointerEvents: 'none',
          transform: 'translateZ(0)',    // 独立合成层, 避免每次遮罩变化重绘视频
        }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ====== 暗色遮罩层 ====== */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.86) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 点阵纹理叠加 */}
      <div
        aria-hidden
        className="dot-grid"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          backgroundColor: 'transparent',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* 渐变光晕:blur(30px) 放独立合成层, 避免滚动期间连带重绘 */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: 140, left: '50%', transform: 'translateX(-50%) translateZ(0)',
          width: 680, height: 520, pointerEvents: 'none', zIndex: 2,
          background:
            'radial-gradient(ellipse at center, rgba(240,78,35,0.18) 0%, rgba(240,78,35,0.00) 65%)',
          filter: 'blur(30px)',
          willChange: 'auto',
        }}
      />

      <div style={{ height: '120px', position: 'relative', zIndex: 3 }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 3 }}>
        <style>{`
          @keyframes heroBlurUp {
            0% { opacity: 0; transform: translateY(28px); filter: blur(10px); }
            100% { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
          @keyframes heroScaleIn {
            0% { opacity: 0; transform: scale(0.92); filter: blur(8px); }
            100% { opacity: 1; transform: scale(1); filter: blur(0); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="animation: heroBlurUp"], [style*="animation: heroScaleIn"] {
              animation: none !important;
              opacity: 1 !important;
              filter: none !important;
              transform: none !important;
            }
          }
        `}</style>

        <p
          className="eyebrow"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 14px', borderRadius: 'var(--r-pill)',
            background: 'var(--orange-soft)', color: 'var(--orange)',
            border: '1px solid rgba(240,78,35,0.2)',
            marginBottom: 20,
            animation: 'heroBlurUp 1s var(--ease-luxe) 0.5s both',
          }}
        >
          <Sparkles size={14} /> 2000+ HOURS GAMER DNA · 求职中 OPEN TO OFFERS
        </p>

        <h1
          className="h1"
          style={{
            textAlign: 'center', letterSpacing: '-0.015em',
            animation: 'heroBlurUp 1.3s var(--ease-drama) 0.7s both',
          }}
        >
          <span style={{ color: 'var(--text-dark)' }}>爱游戏 · 懂玩家</span>
          <br />
          <span
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--orange) 0%, #c23519 55%, #8a1e0a 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              padding: '0 8px',
            }}
          >
            · 会整活 ·
          </span>
          <br />
          <span style={{ color: 'var(--text-dark)' }}>用数据思维撬动快乐</span>
        </h1>

        <p
          className="zh-body"
          style={{
            maxWidth: 760, margin: '28px auto 0',
            color: 'var(--text-dark-2)', fontSize: 16, lineHeight: 1.85,
            animation: 'heroBlurUp 1.1s var(--ease-luxe) 0.95s both',
          }}
        >
          谢茂宇 · 21岁应届 · 机械工程背景硬核玩家 · 2000+ 小时游戏阅历覆盖 MOBA/FPS/RPG/策略/生存多品类。用理工科数据分析思维 + ENFJ 天生共情力，从玩家视角拆解体验痛点，用数据验证假设，用创意驱动增长。想和爱游戏的人一起做有意思的事。
        </p>

        {/* ======== 3D 弧形图片带 ======== */}
        <div
          style={{
            marginTop: 56, position: 'relative',
            animation: 'heroScaleIn 1.4s var(--ease-drama) 1.1s both',
          }}
        >
          <div
            style={{
              perspective: 1600,
              perspectiveOrigin: '50% 50%',
              position: 'relative',
              width: '100%',
              height: 520,
              overflow: 'hidden',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
            }}
          >
            <div
              ref={stageRef}
              style={{
                position: 'absolute', top: '50%', left: '50%',
                transformStyle: 'preserve-3d',
                width: 0, height: 0,
                willChange: 'transform',
              }}
            >
              {heroGameStrip.map((game, i) => {
                const baseRotY = -70 + i * 12.72
                const baseTX   = -1100 + i * 200
                const baseTZ   = Math.cos(((baseRotY + 70) * Math.PI) / 180) * 220 - 40

                const enterDelay = i * 65
                const enterRot = mounted ? baseRotY : 0
                const enterTX  = mounted ? baseTX   : 0
                const enterTZ  = mounted ? baseTZ   : -200
                const enterOp  = mounted ? 1 : 0

                const isHover = hoverIdx === i
                const hoverScale = isHover ? 1.10 : 1
                const hoverTZ    = isHover ? 120   : 0
                const hoverBoxShadow = isHover
                  ? '0 22px 60px rgba(0,0,0,0.30), 0 0 36px rgba(240,78,35,0.42)'
                  : '0 18px 50px rgba(0,0,0,0.18)'

                return (
                  <GameStripCard
                    key={game.id}
                    img={picStrip(game.id)}
                    label={game.label}
                    cat={game.cat}
                    index={i}
                    isActive={hoverIdx === i}
                    onEnter={() => setHoverIdx(i)}
                    onLeave={() => setHoverIdx(-1)}
                    style={{
                      position: 'absolute', top: -240, left: -100,
                      width: 200,
                      transformStyle: 'preserve-3d',
                      transform:
                        `rotateY(${enterRot}deg) ` +
                        `translateX(${enterTX}px) ` +
                        `translateZ(${enterTZ + hoverTZ}px) ` +
                        `scale(${hoverScale})`,
                      opacity: enterOp,
                      transition:
                        `transform 900ms cubic-bezier(0.16, 1.12, 0.3, 1) ${enterDelay}ms, ` +
                        `opacity 500ms ease ${enterDelay}ms, ` +
                        `box-shadow 260ms ease`,
                      boxShadow: hoverBoxShadow,
                      zIndex: isHover ? 50 : (12 - Math.abs(i - 5.5)),
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ====== 声音控制按钮 ====== */}
      <button
        onClick={toggleAudio}
        aria-label={
          audioState === 'on' ? '当前有声,点击静音'
          : audioState === 'muted' ? '当前静音,点击暂停'
          : '已暂停,点击恢复有声播放'
        }
        title={
          audioState === 'on' ? '🔊 有声 (点击静音)'
          : audioState === 'muted' ? '🔇 静音 (点击暂停)'
          : '⏸ 已暂停 (点击恢复)'
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--orange)'
          e.currentTarget.style.boxShadow = '0 0 18px rgba(240,78,35,0.45), 0 4px 20px rgba(0,0,0,0.4)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = ''
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)'
        }}
        style={{
          position: 'fixed',
          top: 112, right: 24,
          width: 44, height: 44,
          borderRadius: '50%',
          background: 'rgba(20,20,20,0.82)',
          border: '1px solid var(--border-dark)',
          backdropFilter: 'blur(10px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(10px) saturate(1.4)',
          transform: 'translateZ(0)',          // 合成层隔离 backdrop-filter, 滚动不重绘
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 90,
          opacity: showCtrl ? 1 : 0,
          pointerEvents: showCtrl ? 'auto' : 'none',
          transformStyle: 'preserve-3d',
          ...(showCtrl
            ? { transform: 'translateZ(0) translateY(0)' }
            : { transform: 'translateZ(0) translateY(-8px)' }
          ),
          transition: 'opacity .3s var(--ease-sin), transform .3s var(--ease-sin), box-shadow .2s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          cursor: 'pointer',
        }}
      >
        {audioState === 'on' && <Volume2 size={18} color="var(--orange)" />}
        {audioState === 'muted' && <VolumeX size={18} color="#fafafa" />}
        {audioState === 'paused' && <Play size={18} color="#fafafa" />}
      </button>
    </section>
  )
}

/* ====== 单张弧形卡:前 4 张 fetchpriority=high,其余 lazy+low ====== */
function GameStripCard({ img, label, cat, isActive, onEnter, onLeave, style, index }) {
  const [loaded, setLoaded] = useState(false)
  // 前 4 张卡正面扇形可见,给 high 优先级;余下 8 张 lazy+low 让路首屏
  const fp = index < 4 ? 'high' : 'low'
  const loading = index < 4 ? 'eager' : 'lazy'
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        ...style,
        aspectRatio: '4 / 5',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        border: isActive
          ? '2px solid var(--orange)'
          : '1px solid rgba(14,14,14,0.10)',
        background: '#1a1a1a',
      }}
    >
      <img
        src={img}
        alt={label}
        loading={loading}
        fetchpriority={fp}
        decoding="async"
        referrerPolicy="no-referrer"
        width="200"
        height="250"
        className={`fade-img ${loaded ? 'is-loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.currentTarget.src =
            'https://shared.steamstatic.com/store_item_assets/steam/apps/1172470/library_hero.jpg'
        }}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', left: 10, bottom: 10, right: 10,
          display: 'flex', flexDirection: 'column', gap: 5,
        }}
      >
        <span
          style={{
            alignSelf: 'flex-start',
            background: 'rgba(255,255,255,0.94)',
            color: '#0e0e0e',
            fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em',
            padding: '3px 8px', borderRadius: 'var(--r-pill)',
            backdropFilter: 'blur(4px)',
          }}
        >
          {cat}
        </span>
        <span
          style={{
            alignSelf: 'flex-start',
            background: isActive
              ? 'linear-gradient(135deg, var(--orange), #c23519)'
              : 'rgba(14,14,14,0.78)',
            color: '#fff', fontSize: 12.5, fontWeight: 600,
            padding: '5px 11px', borderRadius: 'var(--r-pill)',
            backdropFilter: 'blur(8px)',
            boxShadow: isActive
              ? '0 4px 16px rgba(240,78,35,0.45)'
              : 'none',
            transition: 'all .2s var(--ease-sin)',
          }}
        >
          {label}
        </span>
      </div>
      <div
        aria-hidden
        style={{
          position: 'absolute', top: 8, left: 8,
          width: 26, height: 26, borderRadius: '50%',
          background: isActive ? 'var(--orange)' : 'rgba(14,14,14,0.62)',
          color: '#fff', fontSize: 11, fontWeight: 700,
          display: 'grid', placeItems: 'center',
          backdropFilter: 'blur(4px)',
          transition: 'all .2s var(--ease-sin)',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
    </div>
  )
}
