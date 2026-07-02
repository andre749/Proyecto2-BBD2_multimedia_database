import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import DocumentSearchPage from './DocumentSearchPage.jsx'
import * as api from '../../api/client.js'

function renderPage() {
  return render(
    <MemoryRouter>
      <DocumentSearchPage />
    </MemoryRouter>,
  )
}

describe('DocumentSearchPage', () => {
  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:mock')
  })

  it('shows a validation error when searching text without a query', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /buscar/i }))
    expect(await screen.findByText(/escribe un termino de busqueda/i)).toBeInTheDocument()
  })

  it('runs a text search and renders result cards', async () => {
    vi.spyOn(api, 'searchDocuments').mockResolvedValue({
      results: [
        {
          id: 'doc-1',
          title: 'Redes neuronales para clasificacion',
          source: 'Revista de IA Aplicada',
          category: 'Inteligencia Artificial',
          imageUrl: 'https://picsum.photos/seed/doc-1/480/480',
          similarity: 0.92,
        },
      ],
    })
    renderPage()
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/busca por titulo o resumen/i), 'redes')
    await user.click(screen.getByRole('button', { name: /buscar/i }))
    await waitFor(() => expect(screen.getByText('Redes neuronales para clasificacion')).toBeInTheDocument())
  })

  it('switches to the image tab and shows the upload dropzone', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: /por imagen/i }))
    expect(screen.getByLabelText('Subir imagen')).toBeInTheDocument()
  })
})
