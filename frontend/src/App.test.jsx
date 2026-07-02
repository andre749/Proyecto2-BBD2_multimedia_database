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
    expect(screen.getByText(/sistema multimodal de recuperacion y busqueda/i)).toBeInTheDocument()
  })

  it('renders the nav links', () => {
    renderApp('/')
    expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^busqueda documentos$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^busqueda musical$/i })).toBeInTheDocument()
  })

  it('navigates to the document search page on click', async () => {
    renderApp('/')
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: /^busqueda documentos$/i }))
    expect(await screen.findByRole('heading', { name: /busqueda multimodal en documentos/i })).toBeInTheDocument()
  })
})
