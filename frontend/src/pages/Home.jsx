import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const APPS = [
  {
    to: '/document-search',
    title: 'Busqueda Multimodal en Documentos',
    modality: 'Modalidad primaria: Texto + Imagen',
    description:
      'Busca articulos por texto o por similitud visual de sus figuras, combinando TF-IDF sobre parrafos y SIFT + K-Means sobre imagenes incrustadas.',
    accent: 'from-accent-violet to-fuchsia-400',
  },
  {
    to: '/music-search',
    title: 'Busqueda Musical Inteligente',
    modality: 'Modalidad primaria: Audio + Texto',
    description:
      'Busca canciones por letra, por similitud acustica o por genero, combinando TF-IDF sobre letras y MFCC + K-Means sobre audio.',
    accent: 'from-accent-cyan to-blue-400',
  },
]

export default function Home() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Sistema Multimodal de Recuperacion y Busqueda
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          Arquitectura unificada de split, codebook e indice invertido aplicada a imagen y
          audio. Elige una aplicacion para probarla.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {APPS.map((app, i) => (
          <motion.div
            key={app.to}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
          >
            <Link
              to={app.to}
              className="group block h-full rounded-3xl border border-white/10 bg-panel/60 p-8 transition-colors hover:border-accent-cyan/40"
            >
              <span
                className={`mb-4 inline-block rounded-full bg-gradient-to-r ${app.accent} bg-clip-text text-sm font-semibold uppercase tracking-wide text-transparent`}
              >
                {app.modality}
              </span>
              <h2 className="mb-3 text-2xl font-bold text-slate-50">{app.title}</h2>
              <p className="text-slate-400">{app.description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-cyan transition-transform group-hover:translate-x-1">
                Probar aplicacion &rarr;
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
