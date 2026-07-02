import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EmptyState from './EmptyState.jsx'

describe('EmptyState', () => {
  it('renders default title', () => {
    render(<EmptyState />)
    expect(screen.getByText('Sin resultados')).toBeInTheDocument()
  })

  it('renders custom title and description', () => {
    render(<EmptyState title="Nada por aqui" description="Prueba con otra busqueda" />)
    expect(screen.getByText('Nada por aqui')).toBeInTheDocument()
    expect(screen.getByText('Prueba con otra busqueda')).toBeInTheDocument()
  })
})
