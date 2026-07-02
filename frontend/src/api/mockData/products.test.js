import { describe, it, expect } from 'vitest'
import { PRODUCTS, getProductById } from './products.js'

describe('PRODUCTS mock data', () => {
  it('has at least 10 products', () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(10)
  })

  it('every product has the required fields', () => {
    for (const p of PRODUCTS) {
      expect(p).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        category: expect.any(String),
        price: expect.any(Number),
        imageUrl: expect.stringContaining('picsum.photos'),
      })
      expect(p.visualWordHistogram.length).toBeGreaterThan(0)
    }
  })

  it('getProductById finds an existing product', () => {
    const first = PRODUCTS[0]
    expect(getProductById(first.id)).toEqual(first)
  })

  it('getProductById returns null for unknown id', () => {
    expect(getProductById('nope')).toBeNull()
  })
})
