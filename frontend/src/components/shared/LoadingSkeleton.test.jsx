import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LoadingSkeleton from './LoadingSkeleton.jsx'

describe('LoadingSkeleton', () => {
  it('renders the requested number of placeholder tiles', () => {
    const { container } = render(<LoadingSkeleton count={4} />)
    expect(container.querySelectorAll('[role="status"] > div')).toHaveLength(4)
  })

  it('has an accessible status role', () => {
    render(<LoadingSkeleton />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
