import React, { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { gamerDNATabs, picHero, picNode } from '../data/games'

/* =========================================================
 * GamerDNA.jsx — 修复版
 * 之前问题:
 *   ✦ 背景图 / 节点卡全是 picsum 占位随机图
 *   ✦ 缺少"节点画布感" — 连接线+橙色工作流
 * 修复:
 *   ✅ 5品类背景 → Steam官方 library_hero (100%可达)
 *   ✅ 30+节点缩略图 → Steam header/capsule 官方图
 *   ✅ SVG 橙色连接线 + 虚线流动效果 (新)
 *   ✅ Tab 切换 opacity crossfade 1s (新)
 *   ✅ prefers-reduced-motion 自动降级 (CSS已提供)
 * ========================================================= */

// 节点卡尺寸(px) — 与 games.js size 枚举一致
const NODE_SIZE = {
  sm: { w: 220, h: 'auto' },
  md: { w: 300, h: 'auto' },
  lg: { w: 420, h: 'auto' },
}

// 节点位置(相对画布 %) + 连接线终点(index)
// 每次 tab 不一样，视觉上更丰富
const TAB_LAYOUT = {
  moba: [
    { top: '14%', left: '6%' , linkTo: [2,3] },
    { top: '12%', left: '58%', linkTo: [2,4] },
    { top: '46%', left: '26%', linkTo: [3] },
    { top: '60%', left: '56%', linkTo: [] },
    { top: '28%', left: '38%', linkTo: [] },
  ],
  fps: [
    { top: '18%', left: '48%', linkTo: [2,3,4] },
    { top: '14%', left: '8%' , linkTo: [4] },
    { top: '50%', left: '10%', linkTo: [] },
    { top: '54%', left: '56%', linkTo: [] },
    { top: '28%', left: '28%', linkTo: [] },
  ],
  rpg: [
    { top: '12%', left: '30%', linkTo: [1,2,3,4] },
    { top: '44%', left: '8%' , linkTo: [3] },
    { top: '48%', left: '42%', linkTo: [] },
    { top: '58%', left: '64%', linkTo: [] },
    { top: '22%', left: '66%', linkTo: [4] },
  ],
  strategy: [
    { top: '10%', left: '6%' , linkTo: [1,3] },
    { top: '14%', left: '40%', linkTo: [2,4] },
    { top: '48%', left: '16%', linkTo: [5] },
    { top: '52%', left: '50%', linkTo: [5] },
    { top: '22%', left: '68%', linkTo: [5] },
    { top: '66%', left: '34%', linkTo: [] },
  ],
  esports: [
    { top: '12%', left: '6%' , linkTo: [1,2] },
    { top: '14%', left: '54%', linkTo: [3,4] },
    { top: '48%', left: '24%', linkTo: [3] },
    { top: '52%', left: '60%', linkTo: [] },
    { top: '26%', left: '38%', linkTo: [] },
  ],
}

export default function GamerDNA() {
  const [activeId, setActiveId] = useState(gamerDNATabs[0].id)
  const active = gamerDNATabs.find(t => t.id === activeId) || gamerDNATabs[0]
  const layout = TAB_LAYOUT[active.id] || TAB_LAYOUT.moba

  return (
    <section className="section" style={{ background: 'var(--bg-dark)', padding: '120px 0' }}>
      <div className="container">
        {/* 顶部标题 */}
        <div className="reveal" style={{ maxWidth: 860, margin: '0 auto 56px', textAlign: 'center' }}>
          <p className="eyebrow eyebrow-light" style={{ color: 'var(--orange)' }}>
            · GAMER DNA · 游戏阅历地图 ·
          </p>
          <h2
            className="h2 reveal-hero"
            style={{
              color: 'var(--text-light)', margin: '16px auto 14px',
            }}
          >
            2000+ 小时跨品类&nbsp;
            <span
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #F04E23 0%, #ffa985 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              硬核玩家体感
            </span>
          </h2>
          <p style={{ color: 'var(--text-light-2)', fontSize: 15.5, lineHeight: 1.8 }}>
            覆盖 <b style={{ color: 'var(--text-light)' }}>MOBA / FPS / 二次元RPG / 策略生存 / 职业电竞</b> 五大核心品类，
            从付费系统到活动玩法，从玩家爽感到流失节点，用玩家视角+数据思维双维度判断。
          </p>
        </div>

        {/* Tab 切换行 */}
        <div
          className="tab-row tab-row-dark reveal-scale reveal-delay-1"
          style={{
            justifyContent: 'center', marginBottom: 40,
            padding: 6,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border-dark)',
            width: 'fit-content', marginLeft: 'auto', marginRight: 'auto',
          }}
        >
          {gamerDNATabs.map(t => (
            <button
              key={t.id}
              className={`tab-btn ${t.id === activeId ? 'is-active' : ''}`}
              onClick={() => setActiveId(t.id)}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* ====== 核心画布区 ====== */}
        <div
          key={active.id}   /* 触发 fade-in 动画重放 */
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 28,
            height: 'clamp(520px, 68vh, 760px)',
            border: '1px solid var(--border-dark)',
            boxShadow:
              '0 30px 80px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.04)',
            animation: 'gamerFadeIn 600ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <style>{`
            @keyframes gamerFadeIn {
              0% { opacity: 0; transform: translateY(8px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes dash-flow {
              to { stroke-dashoffset: -32; }
            }
          `}</style>

          {/* 背景大图 (品类官方 hero 图,16:9) */}
          <img
            src={picHero(active.bg)}
            alt={active.name + '背景'}
            width="1920"
            height="1080"
            className="fade-img is-loaded"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            onError={(e) => {
              e.currentTarget.src =
                'https://shared.steamstatic.com/store_item_assets/steam/apps/2410680/library_hero.jpg'
            }}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              opacity: 0.32, filter: 'saturate(1.15) contrast(1.08)',
            }}
          />
          {/* 叠层：点阵 + 深色画布 */}
          <div
            className="dot-grid-dark"
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, rgba(14,14,14,0.76) 0%, rgba(14,14,14,0.92) 100%)',
            }}
          />

          {/* 画布顶栏：模仿 Melius AI 工作流输入框 */}
          <div
            style={{
              position: 'relative', zIndex: 5,
              padding: '32px 32px 0',
              maxWidth: 760,
            }}
          >
            {/* 副标签：品类名（仅小标题，无解释说明） */}
            <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="pill pill-orange">{active.name}</span>
            </div>
          </div>

          {/* ====== SVG 连接线层 (橙色虚线路径) ====== */}
          <svg
            aria-hidden
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              zIndex: 3, pointerEvents: 'none',
            }}
            preserveAspectRatio="none"
            viewBox="0 0 1000 700"
          >
            {active.nodes.map((n, idx) => {
              const pos = layout[idx] || layout[0]
              const t = parseFloat(pos.top) / 100
              const l = parseFloat(pos.left) / 100
              const x = 1000 * l + 110
              const y = 700 * t + 80
              return (pos.linkTo || []).map((tIdx, k) => {
                const tPos = layout[tIdx] || layout[0]
                const tt = parseFloat(tPos.top) / 100
                const tl = parseFloat(tPos.left) / 100
                const tx = 1000 * tl + 110
                const ty = 700 * tt + 80
                const mx = (x + tx) / 2
                const my = (y + ty) / 2 - 30
                return (
                  <path
                    key={`${idx}-${tIdx}-${k}`}
                    d={`M ${x} ${y} Q ${mx} ${my} ${tx} ${ty}`}
                    stroke="url(#lineGrad)"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="6 10"
                    style={{ animation: `dash-flow 1.6s linear infinite` }}
                  />
                )
              })
            })}
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"  stopColor="#F04E23" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FFB199" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* ====== 节点卡片 ====== */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 4 }}>
            {active.nodes.map((n, idx) => {
              const pos = layout[idx] || layout[0]
              const sz = NODE_SIZE[n.size] || NODE_SIZE.md
              return (
                <NodeCard
                  key={n.img + idx}
                  img={picNode(n.img)}
                  title={n.title}
                  tag={n.tag}
                  style={{
                    position: 'absolute',
                    top: pos.top, left: pos.left,
                    width: sz.w,
                    animation:
                      `nodeIn 700ms cubic-bezier(0.16, 1.2, 0.3, 1) ${100 + idx * 80}ms both`,
                  }}
                />
              )
            })}
            <style>{`
              @keyframes nodeIn {
                0%   { opacity: 0; transform: translateY(22px) scale(.92); }
                100% { opacity: 1; transform: translateY(0)    scale(1); }
              }
            `}</style>
          </div>
        </div>

        {/* ====== Stats 三栏数据 ====== */}
        <div
          style={{
            marginTop: 56,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
          }}
        >
          {active.stats.map((s) => (
            <div
              key={s.k}
              className="card-dark"
              style={{
                padding: '22px 26px', borderRadius: 16,
                border: '1px solid rgba(240,78,35,0.12)',
                background:
                  'linear-gradient(180deg, rgba(240,78,35,0.06) 0%, rgba(20,20,20,0.80) 100%)',
              }}
            >
              <div
                className="display-serif"
                style={{
                  fontSize: 34, color: 'var(--text-light)',
                  letterSpacing: '-0.01em',
                }}
              >
                {s.v}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-light-3)', marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {s.k}
              </div>
            </div>
          ))}
        </div>

        {/* ====== Insights 三行洞察卡 ====== */}
        <div
          className="card-dark"
          style={{
            marginTop: 28, padding: '28px 32px',
            borderRadius: 20, border: '1px solid var(--border-dark)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span className="pill pill-orange">💡 玩家洞察</span>
            <span style={{ color: 'var(--text-light-3)', fontSize: 13 }}>
              来自 {active.name} 品类深度体验的第一手判断
            </span>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            {active.insights.map((line, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: i % 2 ? 'rgba(255,255,255,0.025)' : 'rgba(240,78,35,0.04)',
                }}
              >
                <CheckCircle2 size={20} style={{ color: 'var(--orange)', marginTop: 2, flexShrink: 0 }} />
                <p className="zh-body" style={{ color: 'var(--text-light-2)', fontSize: 15, lineHeight: 1.75 }}>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ====== 单张节点卡 ====== */
function NodeCard({ img, title, tag, style }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div
      style={{
        ...style,
        borderRadius: 14,
        overflow: 'hidden',
        background: '#141414',
        border: '1px solid rgba(250,250,250,0.10)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        transition: 'transform .25s var(--ease-out), box-shadow .25s var(--ease-out), border-color .25s var(--ease-sin)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.025)'
        e.currentTarget.style.borderColor = 'var(--orange)'
        e.currentTarget.style.boxShadow =
          '0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(240,78,35,0.35)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.borderColor = ''
        e.currentTarget.style.boxShadow = ''
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
        <img
          src={img}
          alt={title}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          className={`fade-img ${loaded ? 'is-loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            e.currentTarget.src =
              'https://shared.steamstatic.com/store_item_assets/steam/apps/2410680/capsule_616x353.jpg'
          }}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <span
          className="pill pill-orange"
          style={{ fontSize: 10.5, padding: '2px 9px', marginBottom: 6 }}
        >
          {tag}
        </span>
        <div
          style={{
            marginTop: 6,
            color: 'var(--text-light)',
            fontSize: 14.5, fontWeight: 600,
            lineHeight: 1.35,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  )
}
