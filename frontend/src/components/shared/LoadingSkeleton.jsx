import { motion } from 'framer-motion'

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5"
      role="status"
      aria-label="Cargando resultados"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="aspect-square animate-pulse rounded-2xl bg-panel/60"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}
