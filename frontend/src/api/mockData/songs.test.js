import { describe, it, expect } from 'vitest'
import { SONGS, getSongById } from './songs.js'

describe('SONGS mock data', () => {
  it('has at least 10 songs', () => {
    expect(SONGS.length).toBeGreaterThanOrEqual(10)
  })

  it('every song has the required fields', () => {
    for (const s of SONGS) {
      expect(s).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        artist: expect.any(String),
        genre: expect.any(String),
        coverUrl: expect.stringContaining('picsum.photos'),
        lyricsSnippet: expect.any(String),
      })
      expect(s.acousticHistogram.length).toBeGreaterThan(0)
    }
  })

  it('getSongById finds an existing song', () => {
    const first = SONGS[0]
    expect(getSongById(first.id)).toEqual(first)
  })

  it('getSongById returns null for unknown id', () => {
    expect(getSongById('nope')).toBeNull()
  })
})
