import React, { useState } from 'react'
import { ChevronDown, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

const projects = [
  {
    date: '2025.03-2025.06',
    role: '内容策划+数据分析',
    title: '游戏版本体验数据分析与玩家留存优化',
    s: '长期观察MOBA/FPS游戏版本更新后，常出现短期玩家流失、活动参与度下滑，但缺少量化归因分析。',
    t: '搭建玩家反馈分析体系，通过社区舆情+对局行为数据定位版本痛点，输出留存提升优化建议。',
    a: '持续收集NGA/贴吧/小红书千条玩家UGC评论，用Excel做标签化分类统计，拆分付费/对局匹配/活动玩法三大类负面反馈；整理王者荣耀/无畏契约多版本对局时长/上线频次/活动完成率数据，对比更新前后指标波动，定位流失关键节点；撰写3份完整版本分析报告，针对抽卡机制/限时活动/匹配机制给出可落地优化创意。',
    r: '建立一套「社区舆情+行为数据」双维度玩家需求分析框架；精准定位4类易导致玩家弃坑的设计痛点，产出10+条轻量化活动优化创意；报告发布游戏社区累计千次浏览，收到多名玩家运营爱好者交流认可。'
  },
  {
    date: '2025.09-2026.02',
    role: '内容策划+用户互动',
    title: '游戏社区UGC运营实践',
    s: '观察到CF攻略类内容在社交平台传播力强但同质化严重，缺乏"有梗有趣有深度"的内容。',
    t: '创建游戏内容账号，聚焦CF攻略与整活内容，验证"数据驱动的创意内容"能否获得高于平均的互动表现。',
    a: '每周产出2-3条CF攻略/整活内容，用A/B测试不同标题和形式(图文vs短视频)；建立内容数据看板追踪播放量/完播率/互动率；根据数据反馈迭代内容策略。',
    r: '3个月累计产出40+条内容，单条CF攻略视频播放量破50万，平均互动率8.5%(高于同类账号均值3-5%)，验证了"用数据指导创意"的方法论。'
  }
]

export default function Projects() {
  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: 'var(--pad-x)', paddingRight: 'var(--pad-x)' }}>
        <div
          className="text-center"
          style={{
            marginBottom: '56px',
            animation: 'sectionFadeIn 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
          }}
        >
          <span className="eyebrow eyebrow-light">KEY PROJECTS · STAR METHOD</span>
          <h2
            className="h2"
            style={{
              color: 'var(--text-light)', marginTop: '12px',
              animation: 'heroTitleIn 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms both',
            }}
          >
            代表性项目 · 结果驱动
          </h2>
          <p className="zh-body" style={{ color: 'var(--text-light-2)', marginTop: '16px', fontSize: '15px', maxWidth: '640px', margin: '16px auto 0' }}>
            以STAR法则呈现两个深度项目实践——从背景洞察到行动落地，再到可量化结果，完整呈现「数据驱动创意」的工作方法论。
          </p>
        </div>

        <div
          className="grid"
          style={{
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))'
          }}
        >
          {projects.map((p, idx) => (
            <article
              key={idx}
              className="card-dark relative"
              style={{
                borderRadius: 'var(--r-xl)',
                padding: '28px',
                animation: `sectionScaleIn 600ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 120}ms both`,
              }}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="pill pill-dark">{p.date}</span>
                <span className="pill pill-orange">{p.role}</span>
              </div>

              <h3
                className="mt-6"
                style={{
                  fontFamily: 'var(--font-serif), var(--font-zh-serif)',
                  fontSize: '24px',
                  fontWeight: '500',
                  color: 'var(--text-light)',
                  lineHeight: '1.25'
                }}
              >
                {p.title}
              </h3>

              <div
                className="grid mt-6"
                style={{
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px'
                }}
              >
                <div style={{ background: 'var(--bg-gray-1)', borderRadius: 'var(--r-md)', padding: '20px' }}>
                  <span className="pill pill-dark">S · SITUATION 背景</span>
                  <p className="zh-body mt-4" style={{ color: 'var(--text-light-2)', fontSize: '13.5px', lineHeight: '1.75' }}>
                    {p.s}
                  </p>
                </div>

                <div style={{ background: 'var(--bg-gray-1)', borderRadius: 'var(--r-md)', padding: '20px' }}>
                  <span className="pill pill-orange">T · TASK 任务</span>
                  <p className="zh-body mt-4" style={{ color: 'var(--text-light-2)', fontSize: '13.5px', lineHeight: '1.75' }}>
                    {p.t}
                  </p>
                </div>

                <div style={{ background: 'var(--bg-gray-1)', borderRadius: 'var(--r-md)', padding: '20px' }}>
                  <span className="pill pill-yellow">A · ACTION 行动</span>
                  <p className="zh-body mt-4" style={{ color: 'var(--text-light-2)', fontSize: '13.5px', lineHeight: '1.75' }}>
                    {p.a}
                  </p>
                </div>

                <div
                  style={{
                    background: 'var(--bg-gray-1)',
                    borderRadius: 'var(--r-md)',
                    padding: '20px',
                    border: '1px solid var(--orange)',
                    boxShadow: 'var(--glow-orange-sm)'
                  }}
                >
                  <span className="pill pill-orange">R · RESULT 结果</span>
                  <p className="zh-body mt-4" style={{ color: 'var(--text-light-2)', fontSize: '13.5px', lineHeight: '1.75' }}>
                    {p.r}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
