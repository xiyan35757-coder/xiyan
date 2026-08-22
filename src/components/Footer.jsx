import React, { useState } from 'react'
import { ChevronDown, Phone, Mail, MapPin, ExternalLink, MessageCircle } from 'lucide-react'

const faqs = [
  {
    q: '作为机械工程专业，为什么想做游戏行业？',
    a: '因为热爱驱动+能力可迁移。机械工程训练了我结构化思维、数据建模能力、对"系统如何运转"的直觉——这些恰好是游戏策划/数据分析/运营的核心能力。而5000+小时的游戏阅历和对Z世代文化的敏感度，是我区别于纯理工科背景的差异化竞争力。'
  },
  {
    q: '你觉得自己最独特的优势是什么？',
    a: '三重叠加：1) 硬核玩家体感：多品类深度体验带来的对"玩家爽/痛"的直觉判断；2) 理工科数据思维：可以把直觉量化成可验证的假设、可落地的优化；3) ENFJ共情力：可以站在玩家的视角写好文案、做好活动、服务好用户。三重能力彼此强化，是我的"护城河"。'
  },
  {
    q: '你如何理解"数据驱动创意"？',
    a: '不是数据替代创意，而是数据给创意装上雷达。先用A/B测试验证形式/标题，再用数据看板追踪播放/完播/互动三大指标，根据反馈迭代策略。CF账号40条内容、单条50万播放、平均互动率8.5%的成绩，就是这个方法论的实战验证。'
  },
  {
    q: '想找什么样的机会？',
    a: '优先考虑游戏策划（关卡/活动/数值）、游戏发行运营、玩家社区运营、游戏数据分析等方向。团队氛围真诚、愿意给新人成长空间、真心热爱游戏做精品的公司最吸引我。我想和对的人一起做对的事。'
  },
  {
    q: '除了游戏，你还有什么爱好？',
    a: '看电影（最爱诺兰+科幻片）、健身运动、看游戏二创、整活剪视频、逛各种亚文化社区找灵感。'
  }
]

export default function Footer() {
  const [openId, setOpenId] = useState(0)

  const toggle = (idx) => {
    setOpenId(openId === idx ? -1 : idx)
  }

  return (
    <section id="footer" className="section" style={{ background: 'var(--bg-dark)' }}>
      {/* 锚点: 保证顶部"查看联系方式"和Navbar"联系我"能平滑滚动到页面底部 */}
      <a
        id="contact"
        aria-hidden="true"
        style={{
          position: 'relative',
          display: 'block',
          height: '1px',
          width: '1px',
          overflow: 'hidden',
          top: '0',
          left: '0',
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: 'var(--pad-x)', paddingRight: 'var(--pad-x)' }}>
        <div
          className="text-center"
          style={{
            marginBottom: '48px',
            opacity: 1,
            visibility: 'visible',
            animation: 'sectionFadeIn 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          <span className="eyebrow eyebrow-light">FAQ · ABOUT ME</span>
          <h2
            className="h2"
            style={{
              color: 'var(--text-light)', marginTop: '12px',
              opacity: 1,
              visibility: 'visible',
              animation: 'heroTitleIn 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms forwards',
            }}
          >
            也许你想知道...
          </h2>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`acc-item ${openId === idx ? 'is-open' : ''}`}
              style={{
                animation: `faqIn 600ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 80}ms both`,
              }}
            >
              <button
                className="acc-trigger"
                onClick={() => toggle(idx)}
                aria-expanded={openId === idx}
              >
                <span>{faq.q}</span>
                <span className="acc-icon">
                  <ChevronDown size={16} strokeWidth={2} />
                </span>
              </button>
              <div className="acc-panel">
                <p className="zh-body" style={{ fontSize: '14.5px', lineHeight: '1.85' }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '64px' }}>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 'var(--r-2xl)',
              background: 'linear-gradient(135deg, #F04E23 0%, #c23519 100%)'
            }}
          >
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                top: '-80px',
                right: '-80px',
                width: '260px',
                height: '260px',
                borderRadius: '50%',
                background: 'rgba(255, 247, 139, 0.18)',
                filter: 'blur(60px)'
              }}
            />
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                bottom: '-60px',
                left: '-60px',
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.12)',
                filter: 'blur(50px)'
              }}
            />

            <div
              className="relative z-10 text-center"
              style={{
                padding: 'clamp(40px, 8vw, 56px)',
                animation: 'heroTitleIn 700ms cubic-bezier(0.16, 1, 0.3, 1) 120ms both',
              }}
            >
              <h2
                className="h2"
                style={{
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-serif), var(--font-zh-serif)'
                }}
              >
                想一起做有意思的事？
              </h2>
              <p
                className="zh-body mt-4"
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '15.5px',
                  maxWidth: '560px',
                  margin: '16px auto 0',
                  lineHeight: '1.75'
                }}
              >
                有合适的机会、想聊游戏、想合作整活？随时欢迎联系我
              </p>

              <div
                className="mt-8 flex gap-4 justify-center"
                style={{ flexWrap: 'wrap' }}
              >
                <a
                  href="tel:18381735669"
                  className="btn btn-pill"
                  style={{
                    padding: '14px 28px', fontSize: '14.5px', fontWeight: 600,
                    background: '#ffffff', color: '#0e0e0e',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
                  }}
                >
                  <Phone size={18} />
                  <span>183-8173-5669</span>
                </a>
                <a
                  href="mailto:xiemaoyu0618@163.com"
                  className="btn btn-pill"
                  style={{
                    padding: '14px 28px', fontSize: '14.5px', fontWeight: 600,
                    background: '#ffffff', color: '#0e0e0e',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
                  }}
                >
                  <Mail size={18} />
                  <span>xiemaoyu0618@163.com</span>
                </a>
                <a
                  href="#contact"
                  className="btn btn-pill"
                  style={{
                    padding: '14px 28px', fontSize: '14.5px', fontWeight: 600,
                    background: '#ffffff', color: '#0e0e0e',
                    boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
                  }}
                >
                  <MessageCircle size={18} />
                  <span>QQ: 3575701394</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex items-center justify-between gap-6"
          style={{
            marginTop: '64px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border-dark)',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <p
              className="zh-body"
              style={{
                color: 'var(--text-light-2)',
                fontSize: '13.5px',
                fontWeight: '500'
              }}
            >
              🎮 谢茂宇 XIE MAOYU · 2026 Portfolio · 爱游戏·懂玩家·会整活
            </p>
          </div>

          <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
            <span className="pill pill-orange">Open to Opportunities</span>
          </div>
        </div>
      </div>
    </section>
  )
}
