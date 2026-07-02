import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

describe('Home', () => {
  it('renders both application cards with links to their routes', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
    const visualLink = screen.getByRole('link', { name: /busqueda visual e-commerce/i })
    const musicLink = screen.getByRole('link', { name: /busqueda musical inteligente/i })
    expect(visualLink).toHaveAttribute('href', '/visual-search')
    expect(musicLink).toHaveAttribute('href', '/music-search')
  })
})
