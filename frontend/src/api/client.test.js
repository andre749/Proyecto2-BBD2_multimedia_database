import { describe, it, expect } from 'vitest'
import { searchByImage, getProduct, searchMusic, getSong } from './client.js'
import { PRODUCTS } from './mockData/products.js'
import { SONGS } from './mockData/songs.js'

describe('api client (mock)', () => {
  it('searchByImage returns 10 ranked results and a query image url', async () => {
    const file = new File(['data'], 'photo.png', { type: 'image/png' })
    const { queryImageUrl, results } = await searchByImage(file)
    expect(queryImageUrl).toEqual(expect.any(String))
    expect(results).toHaveLength(10)
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].similarity).toBeGreaterThanOrEqual(results[i].similarity)
    }
  })

  it('searchByImage rejects without a file', async () => {
    await expect(searchByImage(null)).rejects.toThrow(/imagen/i)
  })

  it('getProduct resolves an existing product', async () => {
    const product = await getProduct(PRODUCTS[0].id)
    expect(product.id).toBe(PRODUCTS[0].id)
  })

  it('getProduct rejects for an unknown id', async () => {
    await expect(getProduct('nope')).rejects.toThrow(/no encontrado/i)
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
