import { profile, stats, experiences, education, gamerDna, tools, languages, honors } from '../data'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about__head" data-reveal>
          <span className="eyebrow">关于 / About</span>
          <h2 className="h2">
            硬核玩家 ×<br />
            <span className="muted">数据思维 × 用户共情</span>
          </h2>
        </div>

        <div className="about__grid">
          {/* Portrait + identity card */}
          <aside className="about__card" data-reveal>
            <div className="portrait">
              <div className="portrait__ring" aria-hidden="true" />
              <div className="portrait__img">
                <svg viewBox="0 0 200 200" className="portrait__svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="oklch(80% 0.13 195)" />
                      <stop offset="1" stopColor="oklch(45% 0.12 205)" />
                    </linearGradient>
                  </defs>
                  <rect width="200" height="200" fill="oklch(17.5% 0.016 230)" />
                  <circle cx="100" cy="78" r="34" fill="none" stroke="url(#pg)" strokeWidth="2" />
                  <path d="M44 176c0-31 25-54 56-54s56 23 56 54" fill="none" stroke="url(#pg)" strokeWidth="2" />
                  <text x="100" y="84" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="13" fill="oklch(70% 0.12 200)">XMY</text>
                </svg>
              </div>
              <span className="portrait__tag mono">PORTRAIT</span>
            </div>

            <div className="idcard">
              <div className="idcard__row">
                <span className="mono idcard__k">NAME</span>
                <span className="idcard__v">{profile.name} · {profile.nameEn}</span>
              </div>
              <div className="idcard__row">
                <span className="mono idcard__k">PHONE</span>
                <a className="idcard__v idcard__link" href={`tel:${profile.phone.replace(/-/g, '')}`}>{profile.phone}</a>
              </div>
              <div className="idcard__row">
                <span className="mono idcard__k">EMAIL</span>
                <a className="idcard__v idcard__link" href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="idcard__row">
                <span className="mono idcard__k">MBTI</span>
                <span className="idcard__v">ENFJ · 天生用户共情力</span>
              </div>
            </div>
          </aside>

          {/* Intro + stats */}
          <div className="about__main">
            <div className="about__intro" data-reveal>
              <p className="about__intro-lead">{profile.intro}</p>
              <p className="muted about__intro-sub">{profile.philosophy}</p>
            </div>

            <div className="stats" data-reveal>
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat__num">
                    <span className="stat__val">{s.value}</span>
                    <span className="stat__unit">{s.unit}</span>
                  </div>
                  <div className="stat__label">{s.label}</div>
                  <div className="stat__sub">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Gamer DNA */}
            <div className="dna" data-reveal>
              <h3 className="block-h">{gamerDna.title}</h3>
              <div className="dna__grid">
                {gamerDna.groups.map((g) => (
                  <div className="dna__item" key={g.tag}>
                    <span className="dna__tag mono">{g.tag}</span>
                    <span className="dna__text">{g.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools / languages / honors */}
            <div className="chips-row" data-reveal>
              <div className="chips-block">
                <span className="chips-k mono">TOOLS</span>
                <div className="chips">{tools.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              </div>
              <div className="chips-block">
                <span className="chips-k mono">LANG</span>
                <div className="chips">{languages.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              </div>
              <div className="chips-block">
                <span className="chips-k mono">HONORS</span>
                <div className="chips">{honors.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience timeline */}
        <div className="exp" data-reveal>
          <h3 className="block-h">核心实习经历 / Internship</h3>
          <div className="exp__list">
            {experiences.map((e) => (
              <article className="exp__item" key={e.role + e.company}>
                <header className="exp__head">
                  <div>
                    <h4 className="exp__role">{e.role}</h4>
                    <p className="exp__company">{e.company}</p>
                  </div>
                  <div className="exp__meta">
                    <span className="mono exp__period">{e.period}</span>
                    <span className="exp__badge">{e.metric}</span>
                  </div>
                </header>
                <ul className="exp__points">
                  {e.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="edu" data-reveal>
          <h3 className="block-h">教育背景 / Education</h3>
          <div className="edu__card">
            <div className="edu__left">
              <h4 className="edu__school">{education.school}</h4>
              <p className="edu__major">{education.major}</p>
              <p className="mono edu__meta">{education.meta}</p>
            </div>
            <div className="edu__right">
              <p className="muted edu__courses">{education.courses}</p>
              <p className="muted edu__notes">{education.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
