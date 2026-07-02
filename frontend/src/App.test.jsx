import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from './App.jsx'

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('renders the home page by default', () => {
    renderApp('/')
    expect(screen.getByText(/home page/i)).toBeInTheDocument()
  })

  it('renders the nav links', () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /busqueda visual/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /busqueda musical/i })).toBeInTheDocument()
  })

  it('navigates to the visual search page on click', async () => {
    renderApp('/')
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: /busqueda visual/i }))
    expect(await screen.findByText(/visual search page/i)).toBeInTheDocument()
  })
})
