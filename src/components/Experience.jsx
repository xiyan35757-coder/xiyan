import React, { useState } from 'react'
import { ChevronDown, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

const internships = [
  {
    role: '游戏策划助理',
    company: '成都游戏工场科技有限公司',
    period: '2025.07-2025.09',
    points: [
      '关卡设计：协助主策划完成移动端射击游戏的关卡规划，设计场景动线结构与物资刷新规则；使用三维建模工具完成障碍物道具的空间布局原型，推动关卡动线迭代3版，内部Playtest流畅度评分提升23%。',
      '文档规范：负责策划需求文档(PRD/GDD)的整理与撰写，累计输出4份完整策划文档，其中1份被主策划采纳并落地至版本；建立版本迭代台账，对接程序与美术团队同步需求细节。',
      '版本管理：标准化策划文档规范与需求评审流程，提升跨部门沟通效率，保障2次小型版本按时迭代上线。'
    ]
  },
  {
    role: '网点运营助理',
    company: '中国建设银行股份有限公司',
    period: '2026.07-2026.08',
    points: [
      '协助大堂运营，使用Excel完成业务数据分类汇总，培养协作跨部门沟通的基础，锻炼了数据处理能力与多任务统筹能力。'
    ]
  }
]

export default function Experience() {
  return (
    <section id="experience" className="section dot-grid">
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: 'var(--pad-x)', paddingRight: 'var(--pad-x)' }}>
        <div
          className="text-center"
          style={{
            marginBottom: '56px',
            opacity: 1,
            visibility: 'visible',
            animation: 'sectionFadeIn 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          <span className="eyebrow">EXPERIENCE · EDUCATION</span>
          <h2
            className="h2"
            style={{
              color: 'var(--text-dark)',
              marginTop: '12px',
              opacity: 1,
              visibility: 'visible',
              animation: 'heroTitleIn 700ms cubic-bezier(0.16, 1, 0.3, 1) 100ms forwards',
            }}
          >
            实习 × 教育背景
          </h2>
        </div>

        <div
          className="grid"
          style={{
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))'
          }}
        >
          <div className="flex" style={{ flexDirection: 'column', gap: '24px', opacity: 1, visibility: 'visible' }}>
            {internships.map((exp, idx) => (
              <article
                key={idx}
                className="card"
                style={{
                  padding: '28px',
                  opacity: 1,
                  visibility: 'visible',
                  animation: `expSlideIn 600ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 120}ms forwards`,
                }}
              >
                <div className="flex items-start justify-between gap-4" style={{ flexWrap: 'wrap' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif), var(--font-zh-serif)',
                        fontSize: '22px',
                        fontWeight: '500',
                        color: 'var(--text-dark)',
                        lineHeight: '1.2'
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div style={{ marginTop: '8px' }}>
                      <span className="pill pill-orange">{exp.company}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-dark-2)', fontWeight: '500', whiteSpace: 'nowrap' }}>
                    {exp.period}
                  </span>
                </div>

                <div
                  style={{
                    marginTop: '16px',
                    marginBottom: '20px',
                    height: '1px',
                    background: 'var(--border-light)'
                  }}
                />

                <ul className="zh-body" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {exp.points.map((point, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: '15px',
                        color: 'var(--text-dark-2)',
                        lineHeight: '1.75',
                        paddingLeft: '18px',
                        position: 'relative'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          top: '10px',
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--orange)'
                        }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="flex" style={{ flexDirection: 'column', gap: '24px', opacity: 1, visibility: 'visible' }}>
            <article
              className="card"
              style={{
                padding: '28px',
                opacity: 1,
                visibility: 'visible',
                animation: 'expSlideInRight 600ms cubic-bezier(0.22, 1, 0.36, 1) 0ms forwards',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif), var(--font-zh-serif)',
                  fontSize: '24px',
                  fontWeight: '500',
                  color: 'var(--text-dark)',
                  lineHeight: '1.2'
                }}
              >
                成都工业学院
              </h3>
              <div style={{ marginTop: '10px' }}>
                <span className="pill pill-orange">机械设计制造及其自动化·本科</span>
              </div>
              <p className="zh-body mt-4" style={{ fontSize: '14px', color: 'var(--text-dark-2)', fontWeight: '500' }}>
                GPA 3.5/4.0 &nbsp;|&nbsp; 专业排名前20%
              </p>

              <div style={{ marginTop: '20px' }}>
                <p className="zh-body" style={{ fontSize: '14px', color: 'var(--text-dark-2)', lineHeight: '1.75' }}>
                  <strong style={{ color: 'var(--text-dark)' }}>主修：</strong>机械原理、机械设计、理论力学、材料力学、控制工程基础、MATLAB
                </p>
                <p className="zh-body mt-2" style={{ fontSize: '14px', color: 'var(--text-dark-2)', lineHeight: '1.75' }}>
                  <strong style={{ color: 'var(--text-dark)' }}>选修：</strong>数控技术、专业英语、企业管理
                </p>
              </div>

              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid var(--border-light)'
                }}
              >
                <p className="zh-body" style={{ fontSize: '14px', color: 'var(--text-dark-2)', lineHeight: '1.75' }}>
                  <span style={{ color: 'var(--orange)', fontWeight: '600' }}>•</span>&nbsp;
                  <strong style={{ color: 'var(--text-dark)' }}>数据能力基础：</strong>
                  MATLAB/统计学课程掌握数据分析方法，可迁移至游戏数据分析
                </p>
                <p className="zh-body mt-2" style={{ fontSize: '14px', color: 'var(--text-dark-2)', lineHeight: '1.75' }}>
                  <span style={{ color: 'var(--orange)', fontWeight: '600' }}>•</span>&nbsp;
                  <strong style={{ color: 'var(--text-dark)' }}>项目管理实践：</strong>
                  3个团队项目均担任组长，管理5-7人小组，全部按期交付
                </p>
              </div>
            </article>

            <article
              className="card"
              style={{
                padding: '28px',
                opacity: 1,
                visibility: 'visible',
                animation: 'expSlideInRight 600ms cubic-bezier(0.22, 1, 0.36, 1) 120ms forwards',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-serif), var(--font-zh-serif)',
                  fontSize: '20px',
                  fontWeight: '500',
                  color: 'var(--text-dark)',
                  lineHeight: '1.2'
                }}
              >
                证书荣誉
              </h3>
              <div className="flex mt-4" style={{ flexWrap: 'wrap', gap: '8px' }}>
                <span className="pill pill-orange">★ CET-4英语四级</span>
                <span className="pill pill-orange">★ 计算机二级</span>
                <span className="pill pill-orange">★ 校级奖学金×2</span>
              </div>

              <h3
                className="mt-8"
                style={{
                  fontFamily: 'var(--font-serif), var(--font-zh-serif)',
                  fontSize: '20px',
                  fontWeight: '500',
                  color: 'var(--text-dark)',
                  lineHeight: '1.2'
                }}
              >
                语言能力
              </h3>
              <div className="flex mt-4" style={{ flexWrap: 'wrap', gap: '8px' }}>
                <span className="pill">普通话</span>
                <span className="pill">英语·CET-4</span>
              </div>

              <h3
                className="mt-8"
                style={{
                  fontFamily: 'var(--font-serif), var(--font-zh-serif)',
                  fontSize: '20px',
                  fontWeight: '500',
                  color: 'var(--text-dark)',
                  lineHeight: '1.2'
                }}
              >
                加分项
              </h3>
              <ul className="zh-body mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li
                  style={{
                    fontSize: '14.5px',
                    color: 'var(--text-dark-2)',
                    lineHeight: '1.75',
                    paddingLeft: '18px',
                    position: 'relative'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '10px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--orange)'
                    }}
                  />
                  KPL/LPL观赛3年+ / 日均浏览游戏内容1h+
                </li>
                <li
                  style={{
                    fontSize: '14.5px',
                    color: 'var(--text-dark-2)',
                    lineHeight: '1.75',
                    paddingLeft: '18px',
                    position: 'relative'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '10px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--orange)'
                    }}
                  />
                  B站/小红书/NGA/贴吧 活跃用户，熟悉Z世代语境
                </li>
                <li
                  style={{
                    fontSize: '14.5px',
                    color: 'var(--text-dark-2)',
                    lineHeight: '1.75',
                    paddingLeft: '18px',
                    position: 'relative'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      top: '10px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--orange)'
                    }}
                  />
                  ENFJ人格 · 强共情力 · 擅长团队沟通
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
