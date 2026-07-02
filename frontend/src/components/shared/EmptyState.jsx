import { motion } from 'framer-motion'

export default function EmptyState({ title = 'Sin resultados', description }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/10 py-16 text-center"
    >
      <p className="text-lg font-semibold text-slate-200">{title}</p>
      {description && <p className="max-w-sm text-sm text-slate-400">{description}</p>}
    </motion.div>
  )
}
