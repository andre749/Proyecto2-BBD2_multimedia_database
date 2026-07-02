import { motion } from 'framer-motion'

export default function SearchBar({ value, onChange, placeholder, onSubmit }) {
  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      className="flex gap-3"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-full border border-white/10 bg-panel/60 px-5 py-3 text-slate-100 placeholder:text-slate-500 focus:border-accent-cyan/60 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
      />
      <motion.button
        type="submit"
        whileTap={{ scale: 0.95 }}
        className="rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-6 py-3 font-semibold text-ink"
      >
        Buscar
      </motion.button>
    </motion.form>
  )
}
