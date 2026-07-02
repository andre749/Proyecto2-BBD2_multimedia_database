import { describe, it, expect, vi, afterEach } from 'vitest'
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

  it('shows an error when the browser does not support audio recording', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: /por audio similar/i }))
    await user.click(screen.getByRole('button', { name: /grabar audio/i }))
    expect(await screen.findByText(/no soporta grabacion de audio/i)).toBeInTheDocument()
  })

  it('shows the listening state while recording', async () => {
    Object.defineProperty(window.navigator, 'mediaDevices', {
      value: { getUserMedia: vi.fn().mockResolvedValue({ getTracks: () => [] }) },
      configurable: true,
    })
    window.MediaRecorder = class {
      start() {}
      stop() {}
    }

    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: /por audio similar/i }))
    await user.click(screen.getByRole('button', { name: /grabar audio/i }))
    expect(await screen.findByText(/escuchando/i)).toBeInTheDocument()
  })

  it('triggers a search automatically when the recording stops', async () => {
    const instances = []
    Object.defineProperty(window.navigator, 'mediaDevices', {
      value: { getUserMedia: vi.fn().mockResolvedValue({ getTracks: () => [{ stop: vi.fn() }] }) },
      configurable: true,
    })
    window.MediaRecorder = class {
      constructor() {
        instances.push(this)
      }
      start() {}
      stop() {
        this.ondataavailable?.({ data: new Blob(['x']) })
        this.onstop?.()
      }
    }

    vi.spyOn(api, 'searchMusic').mockResolvedValue({
      results: [
        {
          id: 'song-1',
          title: 'Luces de Neon',
          artist: 'Kilometro Cero',
          coverUrl: 'https://picsum.photos/seed/song-1/480/480',
          similarity: 0.9,
        },
      ],
    })

    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: /por audio similar/i }))
    await user.click(screen.getByRole('button', { name: /grabar audio/i }))
    await waitFor(() => expect(instances).toHaveLength(1))
    instances[0].stop()

    await waitFor(() => expect(screen.getByText('Luces de Neon')).toBeInTheDocument())
  })

  afterEach(() => {
    delete window.navigator.mediaDevices
    delete window.MediaRecorder
  })
})
