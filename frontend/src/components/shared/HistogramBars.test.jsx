import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HistogramBars from './HistogramBars.jsx'

describe('HistogramBars', () => {
  it('renders one bar per value', () => {
    const { container } = render(<HistogramBars values={[10, 20, 30, 5]} label="Visual words" />)
    expect(container.querySelectorAll('[role="img"] > div')).toHaveLength(4)
  })

  it('renders the label', () => {
    render(<HistogramBars values={[1, 2, 3]} label="Acoustic words" />)
    expect(screen.getByText('Acoustic words')).toBeInTheDocument()
  })
})
