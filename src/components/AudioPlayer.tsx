import React, { useState } from 'react'

interface Props {
  src: string
}

const AudioPlayer: React.FC<Props> = ({ src }) => {
  const [playing, setPlaying] = useState(false)
  const audio = new Audio(src)

  const handlePlay = async () => {
    try {
      setPlaying(true)
      await audio.play()
      audio.onended = () => setPlaying(false)
    } catch (e) {
      console.error('Audio play failed', e)
      setPlaying(false)
    }
  }

  return (
    <div className="audio-player">
      <button 
        onClick={handlePlay} 
        aria-pressed={playing}
        className="audio-btn"
      >
        {playing ? '🔊 Playing...' : '▶️ Play Pronunciation'}
      </button>
    </div>
  )
}

export default AudioPlayer
