import { describe, it, expect } from 'vitest'
import { seededHistogram, seedFromString } from './seededRandom.js'

describe('seededRandom', () => {
  it('produces the same histogram for the same seed string', () => {
    expect(seededHistogram('product-1')).toEqual(seededHistogram('product-1'))
  })

  it('produces different histograms for different seeds', () => {
    expect(seededHistogram('product-1')).not.toEqual(seededHistogram('product-2'))
  })

  it('respects the requested length', () => {
    expect(seededHistogram('song-42', 16)).toHaveLength(16)
  })

  it('hashes strings deterministically', () => {
    expect(seedFromString('abc')).toBe(seedFromString('abc'))
  })
})
