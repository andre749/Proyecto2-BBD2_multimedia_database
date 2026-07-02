import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { searchByImage } from '../../api/client.js'
import { PRODUCTS } from '../../api/mockData/products.js'
import LoadingSkeleton from '../../components/shared/LoadingSkeleton.jsx'
import EmptyState from '../../components/shared/EmptyState.jsx'
import ResultCard from '../../components/shared/ResultCard.jsx'

function fileFromExampleImage() {
  return fetch(PRODUCTS[0].imageUrl)
    .then((res) => res.blob())
    .then((blob) => new File([blob], 'ejemplo.jpg', { type: blob.type || 'image/jpeg' }))
}

export default function VisualSearchPage() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])

  const pickFile = useCallback((f) => {
    if (!f) return
    setFile(f)
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
    if (!file) {
      setError('Sube o elige una imagen antes de buscar.')
      return
    }
    setStatus('loading')
    setError(null)
    try {
      const { results } = await searchByImage(file)
      setResults(results)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Busqueda Visual E-commerce</h1>
      <p className="mb-8 text-slate-400">Sube una foto de una prenda y encuentra productos similares.</p>

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
            {status === 'loading' ? 'Buscando...' : 'Buscar productos similares'}
          </motion.button>
        </div>
      </div>

      {status === 'loading' && <LoadingSkeleton count={10} />}

      {status === 'done' && results.length === 0 && (
        <EmptyState description="No encontramos productos similares para esta imagen." />
      )}

      {status === 'done' && results.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {results.map((product, i) => (
            <ResultCard
              key={product.id}
              index={i}
              to={`/visual-search/${product.id}`}
              imageUrl={product.imageUrl}
              title={product.name}
              subtitle={product.category}
              similarity={product.similarity}
            />
          ))}
        </div>
      )}
    </div>
  )
}
