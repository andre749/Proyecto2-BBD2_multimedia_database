import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import SongDetailPage from './SongDetailPage.jsx'
import { SONGS } from '../../api/mockData/songs.js'

function renderDetail(id) {
  return render(
    <MemoryRouter initialEntries={[`/music-search/${id}`]}>
      <Routes>
        <Route path="/music-search/:id" element={<SongDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SongDetailPage', () => {
  it('renders song title, artist and histogram', async () => {
    const song = SONGS[0]
    renderDetail(song.id)
    expect(await screen.findByText(song.title)).toBeInTheDocument()
    expect(screen.getByText('Histograma de acoustic words (codebook)')).toBeInTheDocument()
  })

  it('toggles the play button label', async () => {
    const song = SONGS[0]
    renderDetail(song.id)
    await screen.findByText(song.title)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /reproducir/i })
    await user.click(button)
    expect(screen.getByRole('button', { name: /pausar/i })).toBeInTheDocument()
  })

  it('shows an error message for an unknown song id', async () => {
    renderDetail('does-not-exist')
    expect(await screen.findByText(/no encontrada/i)).toBeInTheDocument()
  })
})
