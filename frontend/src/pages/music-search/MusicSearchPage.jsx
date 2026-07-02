import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { searchMusic } from '../../api/client.js'
import SearchBar from '../../components/shared/SearchBar.jsx'
import LoadingSkeleton from '../../components/shared/LoadingSkeleton.jsx'
import EmptyState from '../../components/shared/EmptyState.jsx'
import ResultCard from '../../components/shared/ResultCard.jsx'

const TABS = [
  { key: 'lyrics', label: 'Por letra' },
  { key: 'audio', label: 'Por audio similar' },
  { key: 'genre', label: 'Por genero' },
]

const GENRE_OPTIONS = ['Indie Pop', 'Reggaeton', 'Rock Alternativo', 'Lo-fi', 'Cumbia Fusion', 'Electronica']
const RECORD_DURATION_S = 8

export default function MusicSearchPage() {
  const [tab, setTab] = useState('lyrics')
  const [query, setQuery] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])
  const [recordingState, setRecordingState] = useState('idle')
  const [recordingSeconds, setRecordingSeconds] = useState(0)

  const recorderRef = useRef(null)
  const streamRef = useRef(null)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const clearRecordingTimers = () => {
    clearInterval(intervalRef.current)
    clearTimeout(timeoutRef.current)
    intervalRef.current = null
    timeoutRef.current = null
  }

  useEffect(() => {
    return () => {
      clearRecordingTimers()
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const runSearch = async (fileOverride) => {
    const fileToUse = tab === 'audio' ? (fileOverride ?? audioFile) : null
    setError(null)
    if (tab === 'audio' && !fileToUse) {
      setError('Sube o graba un audio antes de buscar.')
      return
    }
    if (tab !== 'audio' && !query.trim()) {
      setError('Escribe un termino de busqueda.')
      return
    }
    setStatus('loading')
    try {
      const { results } = await searchMusic({ mode: tab, query, audioFile: fileToUse })
      setResults(results)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  const handleSearch = () => runSearch()

  const startRecording = async () => {
    setError(null)
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Tu navegador no soporta grabacion de audio.')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      const chunks = []
      recorder.ondataavailable = (e) => chunks.push(e.data)
      recorder.onstop = () => {
        streamRef.current?.getTracks().forEach((t) => t.stop())
        streamRef.current = null
        clearRecordingTimers()
        setRecordingState('idle')
        setRecordingSeconds(0)
        const file = new File([new Blob(chunks, { type: 'audio/webm' })], 'grabacion.webm', {
          type: 'audio/webm',
        })
        setAudioFile(file)
        runSearch(file)
      }
      recorderRef.current = recorder
      recorder.start()
      setRecordingState('recording')
      setRecordingSeconds(0)
      intervalRef.current = setInterval(() => {
        setRecordingSeconds((s) => s + 1)
      }, 1000)
      timeoutRef.current = setTimeout(() => {
        recorder.stop()
      }, RECORD_DURATION_S * 1000)
    } catch {
      setError('No se pudo acceder al microfono.')
    }
  }

  const handleTabChange = (key) => {
    setTab(key)
    setStatus('idle')
    setResults([])
    setError(null)
    setQuery('')
    setAudioFile(null)
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Busqueda Musical Inteligente</h1>
      <p className="mb-8 text-slate-400">Busca canciones por letra, similitud acustica o genero.</p>

      <div className="relative mb-6 flex gap-2 rounded-full bg-panel/40 p-1" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => handleTabChange(t.key)}
            className={`relative flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key ? 'text-ink' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === t.key && (
              <motion.span
                layoutId="music-tab-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-8">
        {tab === 'audio' ? (
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex w-fit cursor-pointer items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/20">
              {audioFile ? audioFile.name : 'Elegir archivo de audio'}
              <input
                type="file"
                accept="audio/*"
                aria-label="Subir audio"
                className="hidden"
                onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
              />
            </label>

            <motion.button
              type="button"
              onClick={startRecording}
              disabled={recordingState === 'recording'}
              whileTap={{ scale: 0.95 }}
              className="flex w-fit items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/20 disabled:opacity-70"
            >
              <motion.span
                animate={recordingState === 'recording' ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                transition={{ duration: 0.9, repeat: recordingState === 'recording' ? Infinity : 0 }}
                className={`h-3 w-3 rounded-full ${recordingState === 'recording' ? 'bg-red-500' : 'bg-accent-cyan'}`}
              />
              {recordingState === 'recording'
                ? `Escuchando... ${RECORD_DURATION_S - recordingSeconds}s`
                : 'Grabar audio'}
            </motion.button>
          </div>
        ) : tab === 'genre' ? (
          <div className="flex flex-wrap gap-2">
            {GENRE_OPTIONS.map((g) => (
              <button
                key={g}
                onClick={() => setQuery(g)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  query === g ? 'border-accent-cyan text-accent-cyan' : 'border-white/10 text-slate-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        ) : (
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            placeholder="Busca por una frase de la letra..."
          />
        )}
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      {tab !== 'lyrics' && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSearch}
          disabled={status === 'loading'}
          className="mb-8 w-fit rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-8 py-3 font-semibold text-ink disabled:opacity-50"
        >
          {status === 'loading' ? 'Buscando...' : 'Buscar canciones'}
        </motion.button>
      )}

      {status === 'loading' && <LoadingSkeleton count={8} />}

      {status === 'done' && results.length === 0 && (
        <EmptyState description="No encontramos canciones para esta busqueda." />
      )}

      {status === 'done' && results.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {results.map((song, i) => (
            <ResultCard
              key={song.id}
              index={i}
              to={`/music-search/${song.id}`}
              imageUrl={song.coverUrl}
              title={song.title}
              subtitle={song.artist}
              similarity={song.similarity}
            />
          ))}
        </div>
      )}
    </div>
  )
}
