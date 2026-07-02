import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import ProductDetailPage from './ProductDetailPage.jsx'
import { PRODUCTS } from '../../api/mockData/products.js'

function renderDetail(id) {
  return render(
    <MemoryRouter initialEntries={[`/visual-search/${id}`]}>
      <Routes>
        <Route path="/visual-search/:id" element={<ProductDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProductDetailPage', () => {
  it('renders the product name and histogram after loading', async () => {
    const product = PRODUCTS[0]
    renderDetail(product.id)
    expect(await screen.findByText(product.name)).toBeInTheDocument()
    expect(screen.getByText('Histograma de visual words (codebook)')).toBeInTheDocument()
  })

  it('shows an error message for an unknown product id', async () => {
    renderDetail('does-not-exist')
    expect(await screen.findByText(/no encontrado/i)).toBeInTheDocument()
  })
})
