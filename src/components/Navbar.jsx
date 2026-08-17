import React from 'react'
import { Menu, Download, Mail, Gamepad2 } from 'lucide-react'

/* Navbar 入场动画: 左右 stagger slide-down */
const enterLeft = {
  animation: 'navFadeDown 0.8s var(--ease-luxe) 0.15s both',
}
const enterRight = {
  animation: 'navFadeDown 0.8s var(--ease-luxe) 0.3s both',
}

export default function Navbar() {
  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '66px',
        padding: '12px',
        zIndex: 50,
      }}
      className="flex items-center justify-between"
    >
      <style>{`
        @keyframes navFadeDown {
          0% { opacity: 0; transform: translateY(-14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="flex items-center gap-3" style={enterLeft}>
        <div
          style={{
            background: '#0e0e0e',
            borderRadius: 'var(--r-pill)',
            padding: '10px 18px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Gamepad2 size={18} style={{ color: '#fff' }} />
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>谢茂宇</span>
        </div>
        <button
          className="flex items-center justify-center"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--r-pill)',
            background: '#141414',
            border: '1px solid var(--border-dark)',
          }}
          aria-label="菜单"
        >
          <Menu size={18} style={{ color: '#fff' }} />
        </button>
      </div>

      <div className="flex items-center gap-3" style={enterRight}>
        <a
          href="/谢茂宇_简历_xiemaoyu0618@163.com.pdf"
          download="谢茂宇_简历.pdf"
          className="btn btn-pill btn-orange"
          style={{ padding: '12px 22px' }}
        >
          <Download size={16} />
          <span>下载简历</span>
        </a>
        <a href="#contact" className="btn btn-pill btn-orange" style={{ padding: '12px 22px' }}>
          <Mail size={16} />
          <span>联系我</span>
        </a>
      </div>
    </header>
  )
}
