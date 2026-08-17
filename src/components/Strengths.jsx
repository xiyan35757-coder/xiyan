import { strengths } from '../data'

export default function Strengths() {
  return (
    <section id="strengths" className="section strengths">
      <div className="container">
        <div className="strengths__head" data-reveal>
          <span className="eyebrow">个人优势 / Strengths</span>
          <h2 className="h2">
            四条核心能力，<br />
            <span className="muted">围绕玩家与增长。</span>
          </h2>
        </div>

        <div className="strengths__grid">
          {strengths.map((s) => (
            <article className="scard" key={s.no} data-reveal>
              <div className="scard__top">
                <span className="scard__no mono">{s.no}</span>
                <span className="scard__en mono">{s.en}</span>
              </div>
              <h3 className="scard__title">{s.title}</h3>
              <p className="scard__desc">{s.desc}</p>
              <p className="scard__detail muted">{s.detail}</p>
              <div className="scard__bar" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
