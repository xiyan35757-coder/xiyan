import { profile } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__bg" aria-hidden="true" />
      <div className="container contact__inner">
        <span className="eyebrow contact__eyebrow" data-reveal>联系我 / Get in touch</span>

        <h2 className="contact__title" data-reveal>
          想和爱游戏的人<br />
          一起做有意思的事。
        </h2>

        <p className="contact__sub muted" data-reveal>
          游戏策划 / 游戏发行运营方向机会，实习或全职均可聊。从玩家需求出发，让每个人玩得开心，让业务可持续增长。
        </p>

        <div className="contact__actions" data-reveal>
          <a className="btn btn--solid btn--lg" href={`mailto:${profile.email}`}>
            <span>发邮件给我</span>
            <i className="arr" aria-hidden="true">→</i>
          </a>
          <a className="btn btn--ghost btn--lg" href={`tel:${profile.phone.replace(/-/g, '')}`}>
            <span>{profile.phone}</span>
          </a>
        </div>

        <div className="contact__grid" data-reveal>
          <div className="contact__cell">
            <span className="mono contact__k">EMAIL</span>
            <a className="contact__v" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="contact__cell">
            <span className="mono contact__k">PHONE</span>
            <a className="contact__v" href={`tel:${profile.phone.replace(/-/g, '')}`}>{profile.phone}</a>
          </div>
          <div className="contact__cell">
            <span className="mono contact__k">FOCUS</span>
            <span className="contact__v">游戏策划 · 发行运营</span>
          </div>
          <div className="contact__cell">
            <span className="mono contact__k">STATUS</span>
            <span className="contact__v">
              <i className="dot dot--good" aria-hidden="true" />
              开放机会沟通
            </span>
          </div>
        </div>
      </div>

      <footer className="contact__foot">
        <div className="container contact__foot-inner">
          <span className="mono">© {new Date().getFullYear()} {profile.name} · {profile.nameEn}</span>
          <span className="mono">爱游戏 · 懂玩家 · 会整活</span>
        </div>
      </footer>
    </section>
  )
}
