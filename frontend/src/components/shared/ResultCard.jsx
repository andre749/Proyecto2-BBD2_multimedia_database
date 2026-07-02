import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ResultCard({ to, imageUrl, title, subtitle, similarity, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={to}
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-panel/60 transition-colors hover:border-accent-cyan/40"
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <p className="truncate font-semibold text-slate-100">{title}</p>
          <p className="truncate text-sm text-slate-400">{subtitle}</p>
          {typeof similarity === 'number' && (
            <span className="mt-2 inline-block rounded-full bg-accent-violet/20 px-2 py-0.5 text-xs font-medium text-accent-cyan">
              {Math.round(similarity * 100)}% similar
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
