import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react'

const tracks = [
  { name: '游戏人生 · BGM Mix', artist: 'Portfolio Soundtrack', src: '/music/bgm-01.mp3' },
]

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const [trackIdx, setTrackIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const [audioError, setAudioError] = useState(false)

  const track = tracks[trackIdx]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume

    const onTime = () => setProgress(audio.currentTime)
    const onMeta = () => setDuration(audio.duration || 0)
    const onEnded = () => setIsPlaying(false)
    const onError = () => {
      setAudioError(true)
      setIsPlaying(false)
    }
    const onCanPlay = () => {
      setCanPlay(true)
      setAudioError(false)
    }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    audio.addEventListener('canplay', onCanPlay)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('canplay', onCanPlay)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || audioError) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  const changeVolume = (v) => {
    setVolume(v)
    if (audioRef.current) {
      audioRef.current.volume = v
      audioRef.current.muted = v === 0
      setIsMuted(v === 0)
    }
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * duration
    setProgress(pct * duration)
  }

  const prevTrack = () => {
    if (progress > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0
    } else {
      setTrackIdx((trackIdx - 1 + tracks.length) % tracks.length)
    }
  }

  const nextTrack = () => {
    setTrackIdx((trackIdx + 1) % tracks.length)
  }

  const formatTime = (s) => {
    if (!isFinite(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  const progressPct = duration ? (progress / duration) * 100 : 0

  return (
    <>
      {/* 隐藏的 audio 元素 */}
      <audio
        ref={audioRef}
        src={track.src}
        loop
        preload="metadata"
        onError={() => setAudioError(true)}
      />

      {/* 展开的播放器面板 */}
      {isExpanded && (
        <div
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 24,
            width: 280,
            background: 'rgba(16,16,16,0.92)',
            backdropFilter: 'blur(20px) saturate(1.5)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
            borderRadius: 20,
            border: '1px solid rgba(240,78,35,0.25)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 24px rgba(240,78,35,0.12)',
            padding: '16px 18px',
            zIndex: 200,
            transform: 'translateZ(0)',
            animation: 'mpSlideUp 300ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <style>{`
            @keyframes mpSlideUp {
              from { opacity: 0; transform: translateY(20px) translateZ(0); }
              to { opacity: 1; transform: translateY(0) translateZ(0); }
            }
            @keyframes mpPulse {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.15); opacity: 1; }
            }
            @keyframes mpRotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes mpBar {
              0%, 100% { transform: scaleY(0.3); }
              50% { transform: scaleY(1); }
            }
          `}</style>

          {/* 封面 + 标题 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: audioError
                  ? 'linear-gradient(135deg, #333, #222)'
                  : 'linear-gradient(135deg, #F04E23, #8a1e0a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                animation: isPlaying && !audioError ? 'mpRotate 8s linear infinite' : 'none',
                boxShadow: '0 4px 16px rgba(240,78,35,0.3)',
              }}
            >
              <Music size={22} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#fafafa',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {track.name}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                {audioError ? '点击添加音乐文件' : track.artist}
              </div>
            </div>
            {/* 关闭按钮 */}
            <button
              onClick={() => setIsExpanded(false)}
              style={{
                width: 28, height: 28,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }}
            >
              ✕
            </button>
          </div>

          {/* 进度条 */}
          <div style={{ marginBottom: 12 }}>
            <div
              onClick={seek}
              style={{
                height: 4,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progressPct}%`,
                  background: 'linear-gradient(90deg, #F04E23, #ffa985)',
                  borderRadius: 2,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* 控制按钮 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <button
              onClick={prevTrack}
              style={{
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                color: '#fafafa',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            >
              <SkipBack size={16} />
            </button>

            <button
              onClick={togglePlay}
              disabled={audioError}
              style={{
                width: 48, height: 48,
                borderRadius: '50%',
                background: audioError
                  ? 'rgba(255,255,255,0.1)'
                  : 'linear-gradient(135deg, #F04E23, #c23519)',
                border: 'none',
                color: '#fff',
                cursor: audioError ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: audioError ? 'none' : '0 4px 20px rgba(240,78,35,0.5)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { if (!audioError) e.currentTarget.style.transform = 'scale(1.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
              onClick={nextTrack}
              style={{
                width: 36, height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: 'none',
                color: '#fafafa',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            >
              <SkipForward size={16} />
            </button>
          </div>

          {/* 音量 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
            <button
              onClick={toggleMute}
              style={{
                background: 'none',
                border: 'none',
                color: isMuted ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.8)',
                cursor: 'pointer',
                padding: 4,
                display: 'flex',
              }}
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => changeVolume(parseFloat(e.target.value))}
              style={{
                flex: 1,
                height: 3,
                accentColor: '#F04E23',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>
      )}

      {/* 悬浮按钮 (收起状态) */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          onMouseEnter={() => setIsExpanded(true)}
          style={{
            position: 'fixed',
            bottom: 32,
            right: 24,
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'rgba(20,20,20,0.85)',
            border: '1px solid rgba(240,78,35,0.3)',
            backdropFilter: 'blur(14px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(14px) saturate(1.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            cursor: 'pointer',
            boxShadow: isPlaying
              ? '0 4px 24px rgba(0,0,0,0.5), 0 0 20px rgba(240,78,35,0.35)'
              : '0 4px 20px rgba(0,0,0,0.4)',
            transition: 'all 0.3s ease',
            transform: 'translateZ(0)',
            color: '#fafafa',
          }}
          title="音乐播放器"
        >
          {/* 播放中的音波动画 */}
          {isPlaying && !audioError ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: 16,
                    background: '#F04E23',
                    borderRadius: 2,
                    animation: `mpBar 0.6s ease-in-out ${i * 0.15}s infinite`,
                    transformOrigin: 'bottom',
                  }}
                />
              ))}
            </div>
          ) : (
            <Music size={22} color={audioError ? 'rgba(255,255,255,0.4)' : '#F04E23'} />
          )}
        </button>
      )}
    </>
  )
}
