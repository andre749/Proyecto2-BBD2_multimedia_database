import { DOCUMENTS, getDocumentById } from './mockData/documents.js'
import { SONGS, getSongById } from './mockData/songs.js'

function simulateLatency(min = 400, max = 900) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((resolve) => setTimeout(resolve, delay))
}

function rankBySimilarity(items) {
  return items
    .map((item, i) => ({
      ...item,
      similarity: Math.round((0.99 - i * (0.35 / items.length)) * 100) / 100,
    }))
    .sort((a, b) => b.similarity - a.similarity)
}

export async function searchDocuments({ mode, query, imageFile }) {
  await simulateLatency()
  if (mode === 'text' && !query) throw new Error('Se requiere un termino de busqueda.')
  if (mode === 'image' && !imageFile) throw new Error('Se requiere una imagen para buscar.')

  if (mode === 'image') {
    const queryImageUrl = URL.createObjectURL(imageFile)
    const shuffled = [...DOCUMENTS].sort(() => Math.random() - 0.5).slice(0, 10)
    return { queryImageUrl, results: rankBySimilarity(shuffled) }
  }

  const q = query.toLowerCase()
  let candidates = DOCUMENTS.filter(
    (d) => d.title.toLowerCase().includes(q) || d.abstract.toLowerCase().includes(q),
  )
  if (candidates.length === 0) candidates = DOCUMENTS.slice(0, 5)
  return { results: rankBySimilarity(candidates) }
}

export async function getDocument(id) {
  await simulateLatency(150, 350)
  const doc = getDocumentById(id)
  if (!doc) throw new Error(`Documento no encontrado: ${id}`)
  return doc
}

export async function searchMusic({ mode, query, audioFile }) {
  await simulateLatency()
  if (mode !== 'audio' && !query) throw new Error('Se requiere un termino de busqueda.')
  if (mode === 'audio' && !audioFile) throw new Error('Se requiere un archivo de audio.')

  let candidates = SONGS
  if (mode === 'lyrics' && query) {
    const q = query.toLowerCase()
    candidates = SONGS.filter((s) => s.lyricsSnippet.toLowerCase().includes(q))
    if (candidates.length === 0) candidates = SONGS.slice(0, 5)
  } else if (mode === 'genre' && query) {
    candidates = SONGS.filter((s) => s.genre.toLowerCase() === query.toLowerCase())
    if (candidates.length === 0) candidates = SONGS.slice(0, 5)
  } else {
    candidates = [...SONGS].sort(() => Math.random() - 0.5).slice(0, 8)
  }

  const results = rankBySimilarity(candidates).map((s) => ({
    ...s,
    matchedLyricSnippet: query && mode === 'lyrics' ? s.lyricsSnippet : null,
  }))
  return { results }
}

export async function getSong(id) {
  await simulateLatency(150, 350)
  const song = getSongById(id)
  if (!song) throw new Error(`Cancion no encontrada: ${id}`)
  return song
}
