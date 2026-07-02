import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MusicSearchPage from './MusicSearchPage.jsx'
import * as api from '../../api/client.js'

function renderPage() {
  return render(
    <MemoryRouter>
      <MusicSearchPage />
    </MemoryRouter>,
  )
}

describe('MusicSearchPage', () => {
  it('shows a validation error when searching lyrics without text', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /buscar/i }))
    expect(await screen.findByText(/escribe un termino de busqueda/i)).toBeInTheDocument()
  })

  it('runs a lyrics search and renders results', async () => {
    vi.spyOn(api, 'searchMusic').mockResolvedValue({
      results: [
        {
          id: 'song-1',
          title: 'Luces de Neon',
          artist: 'Kilometro Cero',
          coverUrl: 'https://picsum.photos/seed/song-1/480/480',
          similarity: 0.95,
        },
      ],
    })
    renderPage()
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/busca por una frase/i), 'luces')
    await user.click(screen.getByRole('button', { name: /buscar/i }))
    await waitFor(() => expect(screen.getByText('Luces de Neon')).toBeInTheDocument())
  })

  it('switches to the genre tab and selects a genre', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: /por genero/i }))
    await user.click(screen.getByRole('button', { name: 'Lo-fi' }))
    expect(screen.getByRole('button', { name: 'Lo-fi' })).toHaveClass('border-accent-cyan')
  })
})
