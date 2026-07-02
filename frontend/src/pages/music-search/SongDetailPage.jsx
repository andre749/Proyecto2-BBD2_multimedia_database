import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getSong } from '../../api/client.js'
import HistogramBars from '../../components/shared/HistogramBars.jsx'

function WaveformPulse() {
  const bars = Array.from({ length: 24 })
  return (
    <div className="flex h-16 items-center gap-1">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-accent-cyan/70"
          animate={{ height: ['20%', '90%', '35%', '70%', '20%'] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function SongDetailPage() {
  const { id } = useParams()
  const [song, setSong] = useState(null)
  const [error, setError] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let cancelled = false
    setSong(null)
    setError(null)
    setPlaying(false)
    getSong(id)
      .then((s) => {
        if (!cancelled) setSong(s)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (error) {
    return <p className="text-red-400">{error}</p>
  }

  if (!song) {
    return <p className="text-slate-400">Cargando cancion...</p>
  }

  return (
    <div>
      <Link to="/music-search" className="mb-6 inline-block text-sm text-accent-cyan underline underline-offset-4">
        &larr; Volver a resultados
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-8 sm:grid-cols-2"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img src={song.coverUrl} alt={song.title} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{song.title}</h1>
          <p className="mt-1 text-slate-400">{song.artist} - {song.genre}</p>
          <p className="mt-4 italic text-slate-300">"{song.lyricsSnippet}"</p>

          <button
            onClick={() => setPlaying((p) => !p)}
            className="mt-6 w-fit rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-6 py-2 font-semibold text-ink"
          >
            {playing ? 'Pausar' : 'Reproducir'} (demo)
          </button>
          {playing && <WaveformPulse />}

          <div className="mt-8">
            <HistogramBars values={song.acousticHistogram} label="Histograma de acoustic words (codebook)" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
