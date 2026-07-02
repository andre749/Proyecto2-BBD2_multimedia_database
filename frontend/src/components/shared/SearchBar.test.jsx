import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar.jsx'

describe('SearchBar', () => {
  it('calls onChange when typing', async () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} placeholder="Buscar por letra" />)
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText('Buscar por letra'), 'luces')
    expect(onChange).toHaveBeenCalled()
  })

  it('calls onSubmit when the form is submitted', async () => {
    const onSubmit = vi.fn()
    render(<SearchBar value="luces" onChange={() => {}} onSubmit={onSubmit} placeholder="x" />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /buscar/i }))
    expect(onSubmit).toHaveBeenCalled()
  })
})
