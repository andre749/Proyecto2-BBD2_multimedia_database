import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProduct } from '../../api/client.js'
import HistogramBars from '../../components/shared/HistogramBars.jsx'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setProduct(null)
    setError(null)
    getProduct(id)
      .then((p) => {
        if (!cancelled) setProduct(p)
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

  if (!product) {
    return <p className="text-slate-400">Cargando producto...</p>
  }

  return (
    <div>
      <Link to="/visual-search" className="mb-6 inline-block text-sm text-accent-cyan underline underline-offset-4">
        &larr; Volver a resultados
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-8 sm:grid-cols-2"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img src={product.imageUrl} alt={product.name} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-1 text-slate-400">{product.category}</p>
          <p className="mt-4 text-3xl font-extrabold text-accent-cyan">S/ {product.price}</p>
          <p className="mt-4 text-slate-300">{product.description}</p>

          <div className="mt-8">
            <HistogramBars values={product.visualWordHistogram} label="Histograma de visual words (codebook)" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
