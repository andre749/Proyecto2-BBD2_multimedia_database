import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import DocumentDetailPage from './DocumentDetailPage.jsx'
import { DOCUMENTS } from '../../api/mockData/documents.js'

function renderDetail(id) {
  return render(
    <MemoryRouter initialEntries={[`/document-search/${id}`]}>
      <Routes>
        <Route path="/document-search/:id" element={<DocumentDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('DocumentDetailPage', () => {
  it('renders the document title and both histograms after loading', async () => {
    const doc = DOCUMENTS[0]
    renderDetail(doc.id)
    expect(await screen.findByText(doc.title)).toBeInTheDocument()
    expect(screen.getByText('Histograma de palabras clave (codebook linguistico)')).toBeInTheDocument()
    expect(screen.getByText('Histograma de patches visuales (codebook)')).toBeInTheDocument()
  })

  it('shows an error message for an unknown document id', async () => {
    renderDetail('does-not-exist')
    expect(await screen.findByText(/no encontrado/i)).toBeInTheDocument()
  })
})
