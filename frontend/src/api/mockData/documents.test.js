import { describe, it, expect } from 'vitest'
import { DOCUMENTS, getDocumentById } from './documents.js'

describe('DOCUMENTS mock data', () => {
  it('has at least 10 documents', () => {
    expect(DOCUMENTS.length).toBeGreaterThanOrEqual(10)
  })

  it('every document has the required fields', () => {
    for (const d of DOCUMENTS) {
      expect(d).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        source: expect.any(String),
        category: expect.any(String),
        abstract: expect.any(String),
        imageUrl: expect.stringContaining('picsum.photos'),
      })
      expect(d.textHistogram.length).toBeGreaterThan(0)
      expect(d.imageHistogram.length).toBeGreaterThan(0)
    }
  })

  it('getDocumentById finds an existing document', () => {
    const first = DOCUMENTS[0]
    expect(getDocumentById(first.id)).toEqual(first)
  })

  it('getDocumentById returns null for unknown id', () => {
    expect(getDocumentById('nope')).toBeNull()
  })
})
