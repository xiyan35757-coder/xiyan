import React, { useState } from 'react'
import { ChevronDown, Phone, Mail, MapPin, ExternalLink } from 'lucide-react'

const projects = [
  {
    date: '2025.10-2025.12',
    role: '游戏系统分析',
    title: '《无畏契约》核心战斗系统拆解报告',
    s: '从设计师视角系统拆解《无畏契约》核心战斗循环，理解FPS竞技游戏的平衡性设计逻辑。',
    t: '构建FPS竞技游戏的系统性分析框架，输出可复用的平衡性设计方法论。',
    a: '枪械平衡分析：梳理17把武器的伤害、射速、弹匣容量与有效射程参数，计算理论TTK（击杀耗时），建立枪械强度梯队模型；地图设计拆解：分析6张竞技地图的攻防动线结构，标注关键交火区域、视野控制点与包点防守站位；经济系统建模：拆解经济循环，建立「全买/半买/Eco/强起」四象限经济决策树，分析经济系统对游戏的促进作用。',
    r: '产出17页系统拆解报告，5条FPS竞技游戏平衡性设计的可复用原则，建立了可迁移至其他射击品类的系统分析方法论。'
  },
  {
    date: '2026.01-2026.03',
    role: '游戏商业化拆解',
    title: '《CS2》系统设计反推与商业化拆解',
    s: '从CS2的定位出发，反推Valve三条设计铁律，对比Valorant/CS2/Apex的范式差异。',
    t: '系统性拆解CS2的核心玩法、赛制、经济系统与商业化模型，输出可迁移的设计参考。',
    a: '核心玩法与赛制拆解：拆解MR12赛制的时间压缩设计意图与单回合决策权重提升逻辑；分析Premier模式7图池Veto系统的ban/pick流程与补偿杠杆设计；绘制单回合状态机（Buy Phase→Freeze Time→Active Round→经济结算），论证经济系统是品类内唯一具有「战略纵深」的隐形玩法层；饰品交易市场分析：梳理市场规模时间线，拆解稀有度层级、Float值、Pattern ID、贴纸组合、供应稀缺性五大价值决定因素及其权重；对比CS2（可交易/市场定价）与Valorant（绑定账号/官方定价）的皮肤经济模型；商业化模型拆解：拆解「开箱钥匙+市场抽成」双轮驱动模型，分析2025年11.6亿美元收入结构（钥匙~86%+市场费~14%）。',
    r: '产出完整拆解报告（含5章正文+5张配置表+术语表+数据来源置信度标注），总结3个不可替代设计（Sub-tick架构/饰品资产化/信任隔离反作弊）与3个可攻击弱点，输出8项系统设计决策借鉴矩阵与新品PRD决策树。'
  },
  {
    date: '2026.05-2026.08',
    role: '游戏设计实践',
    title: '原创休闲竞技手游《星核争锋》策划案(GDD)',
    s: '设计一款3V3休闲竞技手游，定位「3分钟一局、低操作门槛、高策略深度」，目标用户为18-25岁轻度竞技玩家。',
    t: '完成从设计目标到核心玩法、系统架构、数值框架的完整GDD输出，并验证方案可行性。',
    a: '核心玩法设计：设计「占点+推车」复合胜利条件的核心循环，平衡进攻方与防守方的策略选择空间；系统设计：完成匹配系统、角色养成的系统架构设计；建立基础数值框架，包括角色血量/伤害/技能CD的平衡公式；商业化模型：设计「通行证+外观+战令」三层付费结构，规划免费玩家与付费玩家的内容获取节奏，确保F2P玩家留存率。',
    r: '输出完整GDD（32页），包含设计目标、核心玩法文档、系统架构图、数值表与开发优先级排期；方案获游戏策划社群评审，收到3位在职策划的修改建议。'
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
            opacity: 1,
            visibility: 'visible',
            animation: 'sectionFadeIn 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        >
          <span className="eyebrow eyebrow-light">KEY PROJECTS · STAR METHOD</span>
          <h2
            className="h2"
            style={{
              color: 'var(--text-light)', marginTop: '12px',
              opacity: 1,
              visibility: 'visible',
              animation: 'heroTitleIn 700ms cubic-bezier(0.16, 1, 0.3, 1) 80ms forwards',
            }}
          >
            代表性项目 · 结果驱动
          </h2>
          <p className="zh-body" style={{ color: 'var(--text-light-2)', marginTop: '16px', fontSize: '15px', maxWidth: '640px', margin: '16px auto 0' }}>
            以STAR法则呈现三个深度项目实践——从系统拆解到商业化分析，再到完整GDD输出，覆盖「分析→设计→落地」的完整策划能力链路。
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
                opacity: 1,
                visibility: 'visible',
                animation: `sectionScaleIn 600ms cubic-bezier(0.22, 1, 0.36, 1) ${idx * 120}ms forwards`,
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
