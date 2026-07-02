import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getDocument } from '../../api/client.js'
import HistogramBars from '../../components/shared/HistogramBars.jsx'

export default function DocumentDetailPage() {
  const { id } = useParams()
  const [doc, setDoc] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setDoc(null)
    setError(null)
    getDocument(id)
      .then((d) => {
        if (!cancelled) setDoc(d)
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

  if (!doc) {
    return <p className="text-slate-400">Cargando documento...</p>
  }

  return (
    <div>
      <Link to="/document-search" className="mb-6 inline-block text-sm text-accent-cyan underline underline-offset-4">
        &larr; Volver a resultados
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-8 sm:grid-cols-2"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img src={doc.imageUrl} alt={doc.title} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{doc.title}</h1>
          <p className="mt-1 text-slate-400">{doc.source} - {doc.category}</p>
          <p className="mt-4 text-slate-300">{doc.abstract}</p>

          <div className="mt-8 space-y-6">
            <HistogramBars values={doc.textHistogram} label="Histograma de palabras clave (codebook linguistico)" />
            <HistogramBars values={doc.imageHistogram} label="Histograma de patches visuales (codebook)" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
