import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { searchDocuments } from '../../api/client.js'
import { DOCUMENTS } from '../../api/mockData/documents.js'
import SearchBar from '../../components/shared/SearchBar.jsx'
import LoadingSkeleton from '../../components/shared/LoadingSkeleton.jsx'
import EmptyState from '../../components/shared/EmptyState.jsx'
import ResultCard from '../../components/shared/ResultCard.jsx'

const TABS = [
  { key: 'text', label: 'Por texto' },
  { key: 'image', label: 'Por imagen' },
]

function fileFromExampleImage() {
  return fetch(DOCUMENTS[0].imageUrl)
    .then((res) => res.blob())
    .then((blob) => new File([blob], 'ejemplo.jpg', { type: blob.type || 'image/jpeg' }))
}

export default function DocumentSearchPage() {
  const [tab, setTab] = useState('text')
  const [query, setQuery] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])

  const pickFile = useCallback((f) => {
    if (!f) return
    setImageFile(f)
    setPreviewUrl(URL.createObjectURL(f))
    setError(null)
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    pickFile(e.dataTransfer.files?.[0])
  }

  const handleUseExample = async () => {
    const example = await fileFromExampleImage().catch(() => null)
    if (example) pickFile(example)
  }

  const handleSearch = async () => {
    if (tab === 'text' && !query.trim()) {
      setError('Escribe un termino de busqueda.')
      return
    }
    if (tab === 'image' && !imageFile) {
      setError('Sube o elige una imagen antes de buscar.')
      return
    }
    setStatus('loading')
    setError(null)
    try {
      const { results } = await searchDocuments({ mode: tab, query, imageFile })
      setResults(results)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  const handleTabChange = (key) => {
    setTab(key)
    setStatus('idle')
    setResults([])
    setError(null)
    setQuery('')
    setImageFile(null)
    setPreviewUrl(null)
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Busqueda Multimodal en Documentos</h1>
      <p className="mb-8 text-slate-400">Busca articulos por texto o por similitud visual de sus figuras.</p>

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
                layoutId="document-tab-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'text' ? (
        <div className="mb-8">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            placeholder="Busca por titulo o resumen..."
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        </div>
      ) : (
        <div className="mb-8 grid gap-6 sm:grid-cols-[280px_1fr]">
          <motion.div
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            animate={{ borderColor: isDragging ? 'rgba(34,211,238,0.6)' : 'rgba(255,255,255,0.1)' }}
            className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-panel/40 p-4 text-center"
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Imagen de consulta" className="h-full w-full rounded-xl object-cover" />
            ) : (
              <>
                <p className="text-sm text-slate-400">Arrastra una imagen aqui</p>
                <label className="cursor-pointer rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20">
                  Elegir archivo
                  <input
                    type="file"
                    accept="image/*"
                    aria-label="Subir imagen"
                    className="hidden"
                    onChange={(e) => pickFile(e.target.files?.[0])}
                  />
                </label>
                <button onClick={handleUseExample} className="text-sm text-accent-cyan underline underline-offset-4">
                  usar imagen de ejemplo
                </button>
              </>
            )}
          </motion.div>

          <div className="flex flex-col justify-center gap-4">
            {error && <p className="text-sm text-red-400">{error}</p>}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSearch}
              disabled={status === 'loading'}
              className="w-fit rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-8 py-3 font-semibold text-ink disabled:opacity-50"
            >
              {status === 'loading' ? 'Buscando...' : 'Buscar articulos similares'}
            </motion.button>
          </div>
        </div>
      )}

      {status === 'loading' && <LoadingSkeleton count={10} />}

      {status === 'done' && results.length === 0 && (
        <EmptyState description="No encontramos articulos para esta busqueda." />
      )}

      {status === 'done' && results.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {results.map((doc, i) => (
            <ResultCard
              key={doc.id}
              index={i}
              to={`/document-search/${doc.id}`}
              imageUrl={doc.imageUrl}
              title={doc.title}
              subtitle={`${doc.source} - ${doc.category}`}
              similarity={doc.similarity}
            />
          ))}
        </div>
      )}
    </div>
  )
}
