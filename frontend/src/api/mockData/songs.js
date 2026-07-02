import { seededHistogram } from '../../utils/seededRandom.js'

const GENRES = ['Indie Pop', 'Reggaeton', 'Rock Alternativo', 'Lo-fi', 'Cumbia Fusion', 'Electronica']

const SONGS_SEED = [
  { title: 'Luces de Neon', artist: 'Kilometro Cero' },
  { title: 'Marea Baja', artist: 'Sol de Barrio' },
  { title: 'Costa Perdida', artist: 'Andina Beat' },
  { title: 'Ritmo de Fabrica', artist: 'Los Circuitos' },
  { title: 'Noches en Miraflores', artist: 'Vera Luna' },
  { title: 'Bajo el Puente', artist: 'Colectivo Sur' },
  { title: 'Tiempo Prestado', artist: 'Nube Roja' },
  { title: 'Sombras Digitales', artist: 'Kilometro Cero' },
  { title: 'Vuelo Nocturno', artist: 'Andina Beat' },
  { title: 'Piel de Verano', artist: 'Sol de Barrio' },
  { title: 'Eco de Ayer', artist: 'Vera Luna' },
  { title: 'Circuito Cerrado', artist: 'Los Circuitos' },
]

const LYRIC_SNIPPETS = [
  'y las luces de neon se apagan al amanecer',
  'la marea baja deja historias en la arena',
  'busco la costa perdida entre el ruido de la ciudad',
  'el ritmo de fabrica no deja de sonar',
  'las noches en Miraflores saben distinto',
]

export const SONGS = SONGS_SEED.map((s, i) => {
  const id = `song-${i + 1}`
  return {
    id,
    title: s.title,
    artist: s.artist,
    genre: GENRES[i % GENRES.length],
    coverUrl: `https://picsum.photos/seed/${id}/480/480`,
    lyricsSnippet: LYRIC_SNIPPETS[i % LYRIC_SNIPPETS.length],
    acousticHistogram: seededHistogram(id, 14, 100),
  }
})

export function getSongById(id) {
  return SONGS.find((s) => s.id === id) ?? null
}
