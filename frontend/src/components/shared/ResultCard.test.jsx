import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ResultCard from './ResultCard.jsx'

function renderCard(props) {
  return render(
    <MemoryRouter>
      <ResultCard
        to="/visual-search/prod-1"
        imageUrl="https://picsum.photos/seed/prod-1/480/480"
        title="Polera Oversize"
        subtitle="Poleras"
        similarity={0.87}
        {...props}
      />
    </MemoryRouter>,
  )
}

describe('ResultCard', () => {
  it('renders title, subtitle and similarity percentage', () => {
    renderCard()
    expect(screen.getByText('Polera Oversize')).toBeInTheDocument()
    expect(screen.getByText('Poleras')).toBeInTheDocument()
    expect(screen.getByText('87% similar')).toBeInTheDocument()
  })

  it('links to the detail route', () => {
    renderCard()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/visual-search/prod-1')
  })
})
