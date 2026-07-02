import { seededHistogram } from '../../utils/seededRandom.js'

const DOCUMENTS_SEED = [
  { title: 'Redes neuronales convolucionales para clasificacion de imagenes', source: 'Revista de IA Aplicada', category: 'Inteligencia Artificial' },
  { title: 'Indices invertidos y su rol en motores de busqueda modernos', source: 'ArXiv Abstracts', category: 'Bases de Datos' },
  { title: 'Comparacion de HNSW e IVF para busqueda vectorial aproximada', source: 'Revista de Sistemas', category: 'Bases de Datos' },
  { title: 'Aprendizaje profundo aplicado a deteccion de anomalias en redes', source: 'Journal de Redes', category: 'Redes' },
  { title: 'Modelos de lenguaje y su uso en sistemas de recuperacion de informacion', source: 'Revista de IA Aplicada', category: 'Inteligencia Artificial' },
  { title: 'Cifrado homomorfico para consultas seguras sobre bases de datos', source: 'Journal de Seguridad', category: 'Seguridad' },
  { title: 'Descriptores SIFT y su aplicacion en busqueda visual de productos', source: 'Revista de Vision por Computadora', category: 'Vision por Computadora' },
  { title: 'Arquitecturas distribuidas para procesamiento de grandes volumenes de datos', source: 'Journal de Sistemas Distribuidos', category: 'Sistemas Distribuidos' },
  { title: 'MFCC y clustering acustico para recuperacion de audio', source: 'Revista de Procesamiento de Senales', category: 'Audio' },
  { title: 'Optimizacion de consultas en indices GIN y GiST de PostgreSQL', source: 'ArXiv Abstracts', category: 'Bases de Datos' },
  { title: 'Deteccion de intrusiones mediante aprendizaje automatico', source: 'Journal de Seguridad', category: 'Seguridad' },
  { title: 'Sistemas de recomendacion multimodales basados en fusion de features', source: 'Revista de IA Aplicada', category: 'Inteligencia Artificial' },
]

const ABSTRACTS = [
  'Este articulo explora tecnicas de particion y extraccion de features aplicadas a grandes colecciones de datos, comparando enfoques clasicos contra alternativas basadas en aprendizaje automatico.',
  'Se analiza el impacto de la dimensionalidad y el tamano del codebook sobre la precision y latencia de sistemas de recuperacion, con experimentos sobre cargas de trabajo variadas.',
  'Presentamos una arquitectura unificada que aplica el mismo paradigma de split, extraccion y cuantizacion a distintas modalidades de contenido, evaluando trade-offs de rendimiento.',
]

export const DOCUMENTS = DOCUMENTS_SEED.map((d, i) => {
  const id = `doc-${i + 1}`
  return {
    id,
    title: d.title,
    source: d.source,
    category: d.category,
    abstract: ABSTRACTS[i % ABSTRACTS.length],
    imageUrl: `https://picsum.photos/seed/${id}/480/480`,
    textHistogram: seededHistogram(`${id}-text`, 14, 100),
    imageHistogram: seededHistogram(`${id}-image`, 14, 100),
  }
})

export function getDocumentById(id) {
  return DOCUMENTS.find((d) => d.id === id) ?? null
}
