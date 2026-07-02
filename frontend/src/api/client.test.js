import { describe, it, expect } from 'vitest'
import { searchDocuments, getDocument, searchMusic, getSong } from './client.js'
import { DOCUMENTS } from './mockData/documents.js'
import { SONGS } from './mockData/songs.js'

describe('api client (mock)', () => {
  it('searchDocuments by text returns ranked results matching the title or abstract', async () => {
    const term = DOCUMENTS[0].title.split(' ')[0].toLowerCase()
    const { results } = await searchDocuments({ mode: 'text', query: term })
    expect(results.length).toBeGreaterThan(0)
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].similarity).toBeGreaterThanOrEqual(results[i].similarity)
    }
  })

  it('searchDocuments by text rejects without a query', async () => {
    await expect(searchDocuments({ mode: 'text', query: '' })).rejects.toThrow(/termino de busqueda/i)
  })

  it('searchDocuments by image returns 10 ranked results and a query image url', async () => {
    const file = new File(['data'], 'photo.png', { type: 'image/png' })
    const { queryImageUrl, results } = await searchDocuments({ mode: 'image', imageFile: file })
    expect(queryImageUrl).toEqual(expect.any(String))
    expect(results).toHaveLength(10)
  })

  it('searchDocuments by image rejects without a file', async () => {
    await expect(searchDocuments({ mode: 'image' })).rejects.toThrow(/imagen/i)
  })

  it('getDocument resolves an existing document', async () => {
    const doc = await getDocument(DOCUMENTS[0].id)
    expect(doc.id).toBe(DOCUMENTS[0].id)
  })

  it('getDocument rejects for an unknown id', async () => {
    await expect(getDocument('nope')).rejects.toThrow(/no encontrado/i)
  })

  it('searchMusic by lyrics highlights the matched snippet', async () => {
    const term = SONGS[0].lyricsSnippet.split(' ')[2]
    const { results } = await searchMusic({ mode: 'lyrics', query: term })
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((s) => s.matchedLyricSnippet)).toBe(true)
  })

  it('searchMusic by audio requires a file', async () => {
    await expect(searchMusic({ mode: 'audio' })).rejects.toThrow(/audio/i)
  })

  it('getSong resolves an existing song', async () => {
    const song = await getSong(SONGS[0].id)
    expect(song.id).toBe(SONGS[0].id)
  })
})
