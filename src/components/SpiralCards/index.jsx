import { useEffect, useRef } from 'react'
import { gameCards } from './games'

// ==============
// SpiralCards V2: 旋转楼梯逐卡登场
// ==============
// - 页面自然下滑（不是卡着不动），每滑一段距离就有一张卡从右下方"旋出来"到正面
// - 继续下滑，当前正面卡会往左上方向"旋走淡出"，下一张卡接力登场
// - 向上回滑：完全逆向，卡片会按倒序从左上旋回到正面再回右下
// - 实现机制：
//   1. 15 张卡按顺序固定在 3D 空间的楼梯台阶上（固定角度 + 固定 Y 高差 + 固定 Z 半径）
//   2. globalP 从 0→1 推进时：整个楼梯整体上移 + 自身缓慢旋转，让每张卡依次经过"正面激活窗口"
//   3. 每张卡根据自己在激活窗口中的位置 localP，额外叠加：入场旋转/出场旋转、缩放、位移、淡入淡出
// ==============
export default function SpiralCards() {
  const sectionRef = useRef(null)
  const worldRef = useRef(null)
  const barRef = useRef(null)
  const pTextRef = useRef(null)
  const rafRef = useRef(0)
  const lastRef = useRef(-1)
  const cardRefs = useRef([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const section = sectionRef.current
    const world = worldRef.current
    const bar = barRef.current
    const pText = pTextRef.current
    if (reduce || !section || !world) return

    const N = gameCards.length

    // 楼梯几何参数
    const STEP_ANGLE = 21.6            // 每级楼梯旋转角度（°），15 级总共 324°
    const STEP_Y = 150                 // 每级楼梯高差（px）
    const RADIUS = 780                 // 楼梯半径（px）
    const MID_I = (N - 1) / 2          // 中轴索引
    const ACTIVE_WIN = 1.7 / N         // 每张卡在 globalP 轴上的激活窗口宽度
    const HALF_WIN = ACTIVE_WIN / 2

    // smoothstep 工具
    const sstep = (e0, e1, x) => {
      const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
      return t * t * (3 - 2 * t)
    }

    const apply = (P) => {
      if (Math.abs(P - lastRef.current) < 0.0005) return
      lastRef.current = P

      // ---- 1. 世界层（整个楼梯）位移：旋转 + 上移 ----
      // 滚完 0→1，楼梯正好转 -320°，配合 15 级 × 21.6° 让每级都经过正面
      const worldRotY = 18 - 320 * P
      const worldRotX = -9 + Math.sin(P * Math.PI) * 2
      // 整体楼梯 Y：从 +900（下方）线性位移到 -900（上方）
      const worldTY = 900 - 1800 * P
      world.style.transform =
        `translate3d(0, ${worldTY.toFixed(1)}px, 0) ` +
        `rotateX(${worldRotX.toFixed(2)}deg) ` +
        `rotateY(${worldRotY.toFixed(2)}deg)`

      if (bar) bar.style.transform = `scaleX(${P})`
      if (pText) pText.textContent = `${Math.round(P * 100).toString().padStart(3, '0')}%`

      // ---- 2. 每张卡的激活窗口动画 ----
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i]
        if (!el) continue

        // 基础楼梯位置
        const baseAngle = i * STEP_ANGLE
        const baseY = (i - MID_I) * STEP_Y

        // 本卡激活中心位置：0 号在 P≈2%，14 号在 P≈98%，首尾留边
        const t_i = (i + 0.2) / (N - 0.4)

        // localP ∈ [-1, 1]：-1 入场开始，0 正面就位，1 出场结束
        const raw = (P - t_i) / HALF_WIN
        const localP = Math.min(1, Math.max(-1, raw))
        const absL = Math.abs(localP)

        // 平滑淡出窗口：靠近 0 清晰，|localP| 接近 1 快速 fade
        const activeAmount = 1 - sstep(0.55, 1.0, absL)

        const opacity = 0.04 + 0.96 * activeAmount
        const scale = 0.82 + 0.18 * sstep(1.0, 0.0, absL)

        // 自身 Y 旋转：入场朝右 90° → 正面 0° → 出场朝左 -90°
        const selfRotY = -90 * localP
        // 自身 Y 位移：入场从下方 200px → 就位 0 → 出场到上方 180px
        const selfTY = -190 * localP
        // 自身 Z 位移：非激活状态往后退 140px，避免和正面卡撞
        const selfTZ = -150 * (1 - sstep(1.0, 0.12, absL))

        el.style.transform =
          `rotateY(${baseAngle}deg) ` +
          `translate3d(0px, ${baseY}px, ${RADIUS}px) ` +
          `rotateY(${selfRotY.toFixed(1)}deg) ` +
          `translate3d(0px, ${selfTY.toFixed(1)}px, ${selfTZ.toFixed(1)}px) ` +
          `scale(${scale.toFixed(3)})`
        el.style.opacity = opacity.toFixed(3)
      }
    }

    const compute = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const total = section.offsetHeight - vh
      const P = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)))
      apply(P)
    }

    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        compute()
      })
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const reduce =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const N = gameCards.length

  return (
    <section
      ref={sectionRef}
      className="spiral-section"
      aria-label="玩过的游戏"
      style={{ height: `${reduce ? '100vh' : '840vh'}` }}
    >
      <div className="container spiral-section__head" data-reveal>
        <span className="eyebrow">游戏阅历 / Gamer DNA</span>
        <h2 className="h2">
          从 FPS 到 RPG，从 MOBA 到开放世界。
        </h2>
      </div>

      <div className={`spiral-stage ${reduce ? 'is-static' : ''}`}>
        <div className="spiral-stage__world" ref={worldRef}>
          {gameCards.map((g, i) => {
            return (
              <article
                key={g.name}
                className="spcard"
                ref={(el) => { cardRefs.current[i] = el }}
                style={reduce ? undefined : { '--i': i, '--n': N }}
              >
                <div className="spcard__glass" />
                <div className="spcard__img">
                  <img
                    src={g.image}
                    alt={`${g.nameZh} ${g.name}`}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    width="400"
                    height="500"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://shared.steamstatic.com/store_item_assets/steam/apps/1172470/library_hero.jpg'
                    }}
                  />
                  <div className="spcard__img-veil" />
                </div>
                <div className="spcard__body">
                  <span className="spcard__cat mono">{g.category}</span>
                  <h3 className="spcard__name-zh">{g.nameZh}</h3>
                  <p className="spcard__name-en">{g.name}</p>
                  <span className="spcard__idx mono">
                    {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                  </span>
                </div>
                <div className="spcard__edge" aria-hidden="true" />
              </article>
            )
          })}
        </div>

        <div className="spiral-progress" aria-hidden="true">
          <span className="mono spiral-progress__k">SCROLL PROGRESS</span>
          <div className="spiral-progress__track">
            <div className="spiral-progress__bar" ref={barRef} />
          </div>
          <span className="mono spiral-progress__v" ref={pTextRef}>000%</span>
        </div>
      </div>
    </section>
  )
}
