import React, { useState } from 'react'
import { skills, tools, personas } from '../data/resume'
import { picHero } from '../data/games'

/* =========================================================
 * Skills.jsx — 修复版
 * 之前问题:
 *   ✦ 4 人设 Hero 图是 picsum 随机种子
 * 修复:
 *   ✅ 4 人设图 → Steam 官方 library_hero 图
 *      (games.js 新增 ps-analyst/planner/operator/pm 四key)
 *   ✅ 整体布局微调：Tab + 卡片列更紧密
 *   ✅ 卡片切换加 key animation fadeIn
 * ========================================================= */

export default function Skills() {
  const [pid, setPid] = useState(personas[0].id)
  const p = personas.find(x => x.id === pid) || personas[0]

  return (
    <section className="dot-grid section" style={{ padding: '120px 0' }}>
      <div className="container">
        {/* 头部标题 */}
        <div className="reveal" style={{ maxWidth: 860, margin: '0 auto 64px', textAlign: 'center' }}>
          <p className="eyebrow" style={{ color: 'var(--orange)' }}>
            · CORE SKILLS · 核心能力 × 工具栈 ·
          </p>
          <h2 className="h2 reveal-hero" style={{ color: 'var(--text-dark)', marginTop: 16 }}>
            三重能力叠加&nbsp;
            <span
              style={{
                backgroundImage:
                  'linear-gradient(135deg, var(--orange), #c23519)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              打造独特护城河
            </span>
          </h2>
          <p style={{ color: 'var(--text-dark-2)', fontSize: 16, lineHeight: 1.85, marginTop: 18 }}>
            <b>硬核玩家体感 × 理工科数据思维 × ENFJ 共情力</b>——
            直觉可以在第一时间锁定问题，数据把直觉变成可验证、可落地的优化方案，
            共情力让文案/活动/沟通精准命中用户的真实需求。
          </p>
        </div>

        {/* ====== Personas 大卡 (上半部分 2col) ====== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(240px, 280px) 1fr',
            gap: 28,
            alignItems: 'start',
          }}
        >
          {/* 左: Tab 列 */}
          <div
            className="reveal-left"
            style={{
              display: 'flex', flexDirection: 'column', gap: 8,
              padding: 8,
              background: 'var(--bg-gray-1)',
              borderRadius: 16,
              border: '1px solid var(--border-dark)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
              position: 'sticky', top: 90,
            }}
          >
            {personas.map(ps => (
              <button
                key={ps.id}
                onClick={() => setPid(ps.id)}
                style={{
                  textAlign: 'left',
                  padding: '14px 16px', borderRadius: 12,
                  fontSize: 15.5, fontWeight: 600,
                  color: ps.id === pid ? 'var(--text-light)' : 'var(--text-dark)',
                  background: ps.id === pid
                    ? 'linear-gradient(135deg, var(--orange), #c23519)'
                    : 'transparent',
                  boxShadow: ps.id === pid ? 'var(--glow-orange-sm)' : 'none',
                  transition: 'all .2s var(--ease-sin)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{ps.name}</span>
                  <span style={{ fontSize: 11, opacity: ps.id === pid ? 1 : 0.5, marginLeft: 8, whiteSpace: 'nowrap' }}>
                    {ps.id === pid ? '→' : ''}
                  </span>
                </div>
                <div style={{
                  marginTop: 4, fontSize: 12,
                  fontWeight: 500,
                  color: ps.id === pid ? 'rgba(255,255,255,0.85)' : 'var(--text-dark-3)',
                  lineHeight: 1.4,
                }}>
                  {ps.tagline}
                </div>
              </button>
            ))}
          </div>

          {/* 右: Persona 详情大卡 */}
          <div
            key={p.id}
            className="card"
            style={{
              overflow: 'hidden',
              animation: 'skillsFadeSlide 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
            }}
          >
            <style>{`
              @keyframes skillsFadeSlide {
                from { opacity: 0; transform: translateY(14px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* 卡头：图 + 竖排 MAOYU 字 (Skills 在首屏外,统一 lazy) */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={picHero(p.heroSeed)}
                alt={p.name}
                width="1600"
                height="900"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://shared.steamstatic.com/store_item_assets/steam/apps/2410680/library_hero.jpg'
                }}
                style={{
                  width: '100%', height: 'auto', aspectRatio: '16 / 9',
                  objectFit: 'cover', objectPosition: 'center',
                  display: 'block',
                }}
              />
              {/* 渐变蒙层 */}
              <div
                aria-hidden
                style={{
                  position: 'absolute', inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(14,14,14,0) 40%, rgba(14,14,14,0.72) 100%)',
                }}
              />
              {/* 竖排字 MAOYU */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 22, left: 22,
                  writingMode: 'vertical-rl',
                  fontFamily: 'var(--font-serif)',
                  color: 'rgba(255,255,255,0.88)',
                  fontSize: 20, letterSpacing: '0.3em',
                  textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                }}
              >
                MAOYU · 谢茂宇
              </div>
              {/* 图右下角标签 */}
              <div
                style={{
                  position: 'absolute', right: 22, bottom: 22,
                  display: 'flex', gap: 8, flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    background: 'rgba(250,250,250,0.95)',
                    color: '#0e0e0e',
                    fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
                    padding: '5px 12px', borderRadius: 'var(--r-pill)',
                  }}
                >
                  PERSONA
                </span>
                <span
                  style={{
                    background: 'var(--orange)', color: '#fff',
                    fontSize: 12, fontWeight: 600,
                    padding: '5px 12px', borderRadius: 'var(--r-pill)',
                  }}
                >
                  {p.name}
                </span>
              </div>
            </div>

            {/* 卡身：H3 + tagline + 正文 + keywords */}
            <div style={{ padding: '36px 40px 40px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginBottom: 6 }}>
                <h3 className="h3" style={{ color: 'var(--text-dark)' }}>{p.name}</h3>
                <span className="pill pill-orange">{p.tagline}</span>
              </div>
              <p
                className="zh-body"
                style={{
                  color: 'var(--text-dark-2)', fontSize: 15.5, lineHeight: 1.9,
                  marginTop: 20,
                }}
              >
                {p.body}
              </p>
              <div style={{ marginTop: 22, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.keywords.map(kw => (
                  <span
                    key={kw}
                    className="pill"
                    style={{
                      background: 'var(--orange-soft)', color: 'var(--orange)',
                      borderColor: 'rgba(240,78,35,0.2)',
                      fontWeight: 600, fontSize: 12.5, padding: '5px 13px',
                    }}
                  >
                    ✦ {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ====== 下半部分：Skills 卡片 × Tools/Language/Honors pills ====== */}
        <div
          style={{
            marginTop: 64,
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: 28,
          }}
        >
          {/* 左：核心能力 5 卡片 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
              <h3 style={{
                fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--text-dark)',
              }}>核心能力 · 5大项</h3>
              <span style={{ color: 'var(--text-dark-3)', fontSize: 13 }}>
                可复用、可迁移的硬实力
              </span>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              {skills.map((s, i) => (
                <div
                  key={s.name}
                  className="card"
                  style={{
                    padding: '20px 22px',
                    display: 'grid',
                    gridTemplateColumns: '52px 1fr',
                    gap: 18,
                    alignItems: 'center',
                    animation: `skillsFadeSlide 500ms ease ${i * 80}ms both`,
                  }}
                >
                  <div
                    style={{
                      width: 52, height: 52, borderRadius: 14,
                      background:
                        'linear-gradient(135deg, rgba(240,78,35,0.12), rgba(255, 247, 139, 0.20))',
                      display: 'grid', placeItems: 'center',
                      fontSize: 26,
                      border: '1px solid rgba(240,78,35,0.18)',
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 20, color: 'var(--text-dark)', fontWeight: 500,
                        marginBottom: 4,
                      }}
                    >
                      <span style={{
                        color: 'var(--orange)', marginRight: 10, fontSize: 14, fontWeight: 700,
                      }}>0{i + 1}</span>
                      {s.name}
                    </div>
                    <p
                      className="zh-body"
                      style={{ color: 'var(--text-dark-2)', fontSize: 14, lineHeight: 1.75 }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右：工具栈 · 语言 · 证书荣誉 */}
          <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
            <SectionCard title="工具栈 · TOOLS" subtitle="日常工作流，熟练度实战验证">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {tools.map(t => (
                  <div
                    key={t.name}
                    className="card"
                    style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}
                  >
                    <div style={{ fontSize: 22 }}>{t.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-dark)' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-dark-3)', marginTop: 2 }}>{t.level}</div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="语言能力 · LANGUAGE" subtitle="沟通 / 文档 / 海外资料">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span className="pill pill-orange" style={{ fontSize: 13.5, padding: '6px 14px' }}>
                  🇨🇳 普通话 · 母语
                </span>
                <span className="pill" style={{
                  fontSize: 13.5, padding: '6px 14px',
                  background: 'var(--orange-soft)', color: 'var(--orange)',
                  borderColor: 'rgba(240,78,35,0.2)',
                }}>
                  🇬🇧 英语 · CET-4
                </span>
              </div>
            </SectionCard>

            <SectionCard title="证书荣誉 · HONORS" subtitle="硬指标筛选通过">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span className="pill pill-yellow" style={{ fontSize: 13, padding: '6px 14px', fontWeight: 600 }}>
                  ★ 英语四级 CET-4
                </span>
                <span className="pill pill-orange" style={{ fontSize: 13, padding: '6px 14px', fontWeight: 600 }}>
                  ★ 计算机二级
                </span>
                <span className="pill pill-orange" style={{ fontSize: 13, padding: '6px 14px', fontWeight: 600 }}>
                  ★ 校级奖学金 ×2
                </span>
              </div>
              <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 12, background: 'var(--orange-soft)' }}>
                <p style={{ fontSize: 13.5, color: 'var(--text-dark)', lineHeight: 1.7 }}>
                  🎓 <b>成都工业学院</b> · 机械设计制造及其自动化·本科<br />
                  GPA 3.5/4.0 · 专业排名前 20% · 3 次团队项目组长（5-7人）全部按期交付
                </p>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="card" style={{ padding: '24px 26px' }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{
          fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--text-dark)',
        }}>{title}</div>
        <div style={{ color: 'var(--text-dark-3)', fontSize: 12.5, marginTop: 3 }}>{subtitle}</div>
      </div>
      {children}
    </div>
  )
}
