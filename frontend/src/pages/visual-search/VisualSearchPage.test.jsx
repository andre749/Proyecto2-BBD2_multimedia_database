import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import VisualSearchPage from './VisualSearchPage.jsx'
import * as api from '../../api/client.js'

function renderPage() {
  return render(
    <MemoryRouter>
      <VisualSearchPage />
    </MemoryRouter>,
  )
}

describe('VisualSearchPage', () => {
  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:mock')
  })

  it('shows a validation error when searching without an image', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /buscar productos similares/i }))
    expect(await screen.findByText(/sube o elige una imagen/i)).toBeInTheDocument()
  })

  it('runs a search and renders result cards after picking a file', async () => {
    const fakeResults = [
      {
        id: 'prod-1',
        name: 'Polera Test',
        category: 'Poleras',
        imageUrl: 'https://picsum.photos/seed/prod-1/480/480',
        similarity: 0.9,
      },
    ]
    vi.spyOn(api, 'searchByImage').mockResolvedValue({
      queryImageUrl: 'blob:mock',
      results: fakeResults,
    })

    renderPage()
    const user = userEvent.setup()
    const file = new File(['data'], 'photo.png', { type: 'image/png' })
    await user.upload(screen.getByLabelText('Subir imagen'), file)
    await user.click(screen.getByRole('button', { name: /buscar productos similares/i }))

    await waitFor(() => expect(screen.getByText('Polera Test')).toBeInTheDocument())
  })
})
