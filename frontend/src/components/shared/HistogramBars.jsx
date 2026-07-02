import { motion } from 'framer-motion'

export default function HistogramBars({ values, label }) {
  const max = Math.max(...values, 1)
  return (
    <div>
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
      )}
      <div className="flex h-32 items-end gap-1.5" role="img" aria-label={label ?? 'histograma'}>
        {values.map((value, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-violet to-accent-cyan"
            initial={{ height: 0 }}
            animate={{ height: `${(value / max) * 100}%` }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  )
}
