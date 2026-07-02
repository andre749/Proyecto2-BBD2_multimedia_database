import { seededHistogram } from '../../utils/seededRandom.js'

const CATEGORIES = ['Poleras', 'Zapatillas', 'Casacas', 'Pantalones', 'Vestidos', 'Accesorios']

const NAMES = [
  'Polera Oversize Urbana', 'Zapatillas Runner Flex', 'Casaca Impermeable Andina',
  'Pantalon Cargo Tecnico', 'Vestido Midi Lino', 'Gorra Snapback Bordada',
  'Polo Slim Fit Algodon', 'Zapatillas Skate Grip', 'Casaca Denim Oversize',
  'Jean Recto Stretch', 'Vestido Camisero Floral', 'Mochila Urbana Impermeable',
  'Polera Estampada Retro', 'Zapatillas Running Ultraligeras', 'Chaleco Acolchado',
]

export const PRODUCTS = NAMES.map((name, i) => {
  const id = `prod-${i + 1}`
  return {
    id,
    name,
    category: CATEGORIES[i % CATEGORIES.length],
    price: 39 + ((i * 17) % 180),
    imageUrl: `https://picsum.photos/seed/${id}/480/480`,
    visualWordHistogram: seededHistogram(id, 14, 100),
    description: `${name}, pensada para uso diario, materiales resistentes y corte moderno.`,
  }
})

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) ?? null
}
