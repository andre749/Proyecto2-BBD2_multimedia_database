# Frontend: Busqueda Visual E-commerce y Busqueda Musical Inteligente - Implementation Plan

> Para agentes: usar superpowers:subagent-driven-development (recomendado) o superpowers:executing-plans para ejecutar este plan tarea por tarea. Los pasos usan checkboxes (- [ ]) para seguimiento.

Goal: Construir un frontend Vite + React + Tailwind + Framer Motion, con datos mock, para las
aplicaciones de Busqueda Visual E-commerce y Busqueda Musical Inteligente del Proyecto 2 (BD2).

Architecture: SPA con React Router. Una capa de datos mock (api/mockData) y una capa de API
simulada (api/client.js) con latencia artificial, cuyas firmas mapean 1:1 a un futuro backend
real. Paginas de busqueda y detalle por aplicacion, componentes compartidos animados.

Tech Stack: Vite 5, React 18 (JavaScript), React Router 6, Framer Motion, Tailwind CSS 3,
Vitest y Testing Library para tests unitarios y de componente.

## Global Constraints

- Ubicacion: todo el codigo nuevo vive en /frontend en la raiz del repo.
- Rama: frontend (ya existe y esta activa).
- JavaScript puro (.jsx/.js), sin TypeScript.
- Idioma de toda la UI (labels, botones, mensajes): espanol.
- Tema visual oscuro (fondo slate/navy), acento en gradiente violeta-cian, tipografia Inter.
- Sin backend real: todas las llamadas van a api/client.js (mock con latencia simulada).
- Alcance: solo las 2 aplicaciones (visual y musica), sin autenticacion, sin dataset real.
- Cada tarea termina con `npm test` en verde antes de pasar a la siguiente.

---

### Task 1: Project Scaffold (Vite + React + Tailwind + Vitest)

Files:
- Create: frontend/package.json
- Create: frontend/vite.config.js
- Create: frontend/tailwind.config.js
- Create: frontend/postcss.config.js
- Create: frontend/index.html
- Create: frontend/.gitignore
- Create: frontend/src/index.css
- Create: frontend/src/main.jsx
- Create: frontend/src/test/setup.js
- Create/Test: frontend/src/App.jsx, frontend/src/App.test.jsx

Interfaces:
- Produces: `App` default export from `frontend/src/App.jsx` (placeholder here; Task 5
  replaces its content with the real router shell).

- [ ] Step 1: Create `frontend/package.json`

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.0",
    "framer-motion": "^11.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.9",
    "postcss": "^8.4.41",
    "autoprefixer": "^10.4.20",
    "vitest": "^2.0.5",
    "jsdom": "^24.1.1",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/user-event": "^14.5.2"
  }
}
```

- [ ] Step 2: Install dependencies

Run: `cd frontend; npm install`
Expected: exits 0, creates `frontend/node_modules` and `frontend/package-lock.json`.

- [ ] Step 3: Create `frontend/vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] Step 4: Create `frontend/tailwind.config.js`

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0f1a',
        panel: '#121826',
        'accent-violet': '#8b5cf6',
        'accent-cyan': '#22d3ee',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] Step 5: Create `frontend/postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] Step 6: Create `frontend/index.html`

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Motor Multimodal - Demo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] Step 7: Create `frontend/.gitignore`

```
node_modules
dist
.DS_Store
```

- [ ] Step 8: Create `frontend/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-ink text-slate-100 font-sans antialiased;
}
```

- [ ] Step 9: Create `frontend/src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

- [ ] Step 10: Create `frontend/src/test/setup.js`

```js
import '@testing-library/jest-dom'
```

- [ ] Step 11: Write the failing test `frontend/src/App.test.jsx`

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText(/frontend en construccion/i)).toBeInTheDocument()
  })
})
```

- [ ] Step 12: Run the test to verify it fails

Run: `cd frontend; npm test`
Expected: FAIL - `Failed to resolve import "./App.jsx"` (App.jsx does not exist yet).

- [ ] Step 13: Create `frontend/src/App.jsx` (placeholder)

```jsx
export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Frontend en construccion
    </div>
  )
}
```

- [ ] Step 14: Run the test to verify it passes

Run: `cd frontend; npm test`
Expected: PASS - 1 test file, 1 test passed.

- [ ] Step 15: Verify the production build works

Run: `cd frontend; npm run build`
Expected: exits 0, creates `frontend/dist/`.

- [ ] Step 16: Commit

Run:
```bash
git add frontend
git commit -m "feat(frontend): scaffold vite+react+tailwind+vitest"
```

---

### Task 2: Seeded Random Utility (deterministic histograms)

Files:
- Create: frontend/src/utils/seededRandom.js
- Test: frontend/src/utils/seededRandom.test.js

Interfaces:
- Produces: `seedFromString(str) -> number`, `mulberry32(seed) -> () => number`,
  `seededHistogram(seedStr, length = 14, max = 100) -> number[]`. Task 3 imports
  `seededHistogram` from this file.

- [ ] Step 1: Write the failing test `frontend/src/utils/seededRandom.test.js`

```js
import { describe, it, expect } from 'vitest'
import { seededHistogram, seedFromString } from './seededRandom.js'

describe('seededRandom', () => {
  it('produces the same histogram for the same seed string', () => {
    expect(seededHistogram('product-1')).toEqual(seededHistogram('product-1'))
  })

  it('produces different histograms for different seeds', () => {
    expect(seededHistogram('product-1')).not.toEqual(seededHistogram('product-2'))
  })

  it('respects the requested length', () => {
    expect(seededHistogram('song-42', 16)).toHaveLength(16)
  })

  it('hashes strings deterministically', () => {
    expect(seedFromString('abc')).toBe(seedFromString('abc'))
  })
})
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- seededRandom`
Expected: FAIL - `Failed to resolve import "./seededRandom.js"`.

- [ ] Step 3: Create `frontend/src/utils/seededRandom.js`

```js
export function seedFromString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return hash
}

export function mulberry32(seed) {
  let t = seed
  return function () {
    t |= 0
    t = (t + 0x6d2b79f5) | 0
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function seededHistogram(seedStr, length = 14, max = 100) {
  const rand = mulberry32(seedFromString(seedStr))
  const values = []
  for (let i = 0; i < length; i++) {
    values.push(Math.round(rand() * max) + 5)
  }
  return values
}
```

- [ ] Step 4: Run the test to verify it passes

Run: `cd frontend; npm test -- seededRandom`
Expected: PASS - 4 tests passed.

- [ ] Step 5: Commit

Run:
```bash
git add frontend/src/utils
git commit -m "feat(frontend): add deterministic seeded histogram utility"
```

---

### Task 3: Mock Data (products + songs)

Files:
- Create: frontend/src/api/mockData/products.js
- Create: frontend/src/api/mockData/products.test.js
- Create: frontend/src/api/mockData/songs.js
- Create: frontend/src/api/mockData/songs.test.js

Interfaces:
- Consumes: `seededHistogram` from `frontend/src/utils/seededRandom.js` (Task 2).
- Produces: `PRODUCTS: Array<{id, name, category, price, imageUrl, visualWordHistogram,
  description}>`, `getProductById(id) -> product | null`, `SONGS: Array<{id, title, artist,
  genre, coverUrl, lyricsSnippet, acousticHistogram}>`, `getSongById(id) -> song | null`.
  Task 4 imports all four.

- [ ] Step 1: Write the failing test `frontend/src/api/mockData/products.test.js`

```js
import { describe, it, expect } from 'vitest'
import { PRODUCTS, getProductById } from './products.js'

describe('PRODUCTS mock data', () => {
  it('has at least 10 products', () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(10)
  })

  it('every product has the required fields', () => {
    for (const p of PRODUCTS) {
      expect(p).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        category: expect.any(String),
        price: expect.any(Number),
        imageUrl: expect.stringContaining('picsum.photos'),
      })
      expect(p.visualWordHistogram.length).toBeGreaterThan(0)
    }
  })

  it('getProductById finds an existing product', () => {
    const first = PRODUCTS[0]
    expect(getProductById(first.id)).toEqual(first)
  })

  it('getProductById returns null for unknown id', () => {
    expect(getProductById('nope')).toBeNull()
  })
})
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- products`
Expected: FAIL - `Failed to resolve import "./products.js"`.

- [ ] Step 3: Create `frontend/src/api/mockData/products.js`

```js
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
```

- [ ] Step 4: Run the test to verify it passes

Run: `cd frontend; npm test -- products`
Expected: PASS - 4 tests passed.

- [ ] Step 5: Write the failing test `frontend/src/api/mockData/songs.test.js`

```js
import { describe, it, expect } from 'vitest'
import { SONGS, getSongById } from './songs.js'

describe('SONGS mock data', () => {
  it('has at least 10 songs', () => {
    expect(SONGS.length).toBeGreaterThanOrEqual(10)
  })

  it('every song has the required fields', () => {
    for (const s of SONGS) {
      expect(s).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        artist: expect.any(String),
        genre: expect.any(String),
        coverUrl: expect.stringContaining('picsum.photos'),
        lyricsSnippet: expect.any(String),
      })
      expect(s.acousticHistogram.length).toBeGreaterThan(0)
    }
  })

  it('getSongById finds an existing song', () => {
    const first = SONGS[0]
    expect(getSongById(first.id)).toEqual(first)
  })

  it('getSongById returns null for unknown id', () => {
    expect(getSongById('nope')).toBeNull()
  })
})
```

- [ ] Step 6: Run the test to verify it fails

Run: `cd frontend; npm test -- songs`
Expected: FAIL - `Failed to resolve import "./songs.js"`.

- [ ] Step 7: Create `frontend/src/api/mockData/songs.js`

```js
import { seededHistogram } from '../../utils/seededRandom.js'

const GENRES = ['Indie Pop', 'Reggaeton', 'Rock Alternativo', 'Lo-fi', 'Cumbia Fusion', 'Electronica']

const SONGS_SEED = [
  { title: 'Luces de Neon', artist: 'Kilometro Cero' },
  { title: 'Marea Baja', artist: 'Sol de Barrio' },
  { title: 'Costa Perdida', artist: 'Andina Beat' },
  { title: 'Ritmo de Fabrica', artist: 'Los Circuitos' },
  { title: 'Noches en Miraflores', artist: 'Vera Luna' },
  { title: 'Bajo el Puente', artist: 'Colectivo Sur' },
  { title: 'Tiempo Prestado', artist: 'Nube Roja' },
  { title: 'Sombras Digitales', artist: 'Kilometro Cero' },
  { title: 'Vuelo Nocturno', artist: 'Andina Beat' },
  { title: 'Piel de Verano', artist: 'Sol de Barrio' },
  { title: 'Eco de Ayer', artist: 'Vera Luna' },
  { title: 'Circuito Cerrado', artist: 'Los Circuitos' },
]

const LYRIC_SNIPPETS = [
  'y las luces de neon se apagan al amanecer',
  'la marea baja deja historias en la arena',
  'busco la costa perdida entre el ruido de la ciudad',
  'el ritmo de fabrica no deja de sonar',
  'las noches en Miraflores saben distinto',
]

export const SONGS = SONGS_SEED.map((s, i) => {
  const id = `song-${i + 1}`
  return {
    id,
    title: s.title,
    artist: s.artist,
    genre: GENRES[i % GENRES.length],
    coverUrl: `https://picsum.photos/seed/${id}/480/480`,
    lyricsSnippet: LYRIC_SNIPPETS[i % LYRIC_SNIPPETS.length],
    acousticHistogram: seededHistogram(id, 14, 100),
  }
})

export function getSongById(id) {
  return SONGS.find((s) => s.id === id) ?? null
}
```

- [ ] Step 8: Run the tests to verify they pass

Run: `cd frontend; npm test`
Expected: PASS - all test files including products.test.js and songs.test.js green.

- [ ] Step 9: Commit

Run:
```bash
git add frontend/src/api/mockData
git commit -m "feat(frontend): add mock product and song datasets"
```

---

### Task 4: Mock API Client

Files:
- Create: frontend/src/api/client.js
- Create: frontend/src/api/client.test.js

Interfaces:
- Consumes: `PRODUCTS`, `getProductById` from `mockData/products.js`; `SONGS`, `getSongById`
  from `mockData/songs.js` (Task 3).
- Produces: `searchByImage(file) -> Promise<{queryImageUrl, results}>`,
  `getProduct(id) -> Promise<product>`, `searchMusic({mode, query, audioFile}) ->
  Promise<{results}>`, `getSong(id) -> Promise<song>`. Tasks 8-11 import these.

- [ ] Step 1: Write the failing test `frontend/src/api/client.test.js`

```js
import { describe, it, expect } from 'vitest'
import { searchByImage, getProduct, searchMusic, getSong } from './client.js'
import { PRODUCTS } from './mockData/products.js'
import { SONGS } from './mockData/songs.js'

describe('api client (mock)', () => {
  it('searchByImage returns 10 ranked results and a query image url', async () => {
    const file = new File(['data'], 'photo.png', { type: 'image/png' })
    const { queryImageUrl, results } = await searchByImage(file)
    expect(queryImageUrl).toEqual(expect.any(String))
    expect(results).toHaveLength(10)
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].similarity).toBeGreaterThanOrEqual(results[i].similarity)
    }
  })

  it('searchByImage rejects without a file', async () => {
    await expect(searchByImage(null)).rejects.toThrow(/imagen/i)
  })

  it('getProduct resolves an existing product', async () => {
    const product = await getProduct(PRODUCTS[0].id)
    expect(product.id).toBe(PRODUCTS[0].id)
  })

  it('getProduct rejects for an unknown id', async () => {
    await expect(getProduct('nope')).rejects.toThrow(/no encontrado/i)
  })

  it('searchMusic by lyrics highlights the matched snippet', async () => {
    const term = SONGS[0].lyricsSnippet.split(' ')[2]
    const { results } = await searchMusic({ mode: 'lyrics', query: term })
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((s) => s.matchedLyricSnippet)).toBe(true)
  })

  it('searchMusic by audio requires a file', async () => {
    await expect(searchMusic({ mode: 'audio' })).rejects.toThrow(/audio/i)
  })

  it('getSong resolves an existing song', async () => {
    const song = await getSong(SONGS[0].id)
    expect(song.id).toBe(SONGS[0].id)
  })
})
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- client`
Expected: FAIL - `Failed to resolve import "./client.js"`.

- [ ] Step 3: Create `frontend/src/api/client.js`

```js
import { PRODUCTS, getProductById } from './mockData/products.js'
import { SONGS, getSongById } from './mockData/songs.js'

function simulateLatency(min = 400, max = 900) {
  const delay = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((resolve) => setTimeout(resolve, delay))
}

function rankBySimilarity(items) {
  return items
    .map((item, i) => ({
      ...item,
      similarity: Math.round((0.99 - i * (0.35 / items.length)) * 100) / 100,
    }))
    .sort((a, b) => b.similarity - a.similarity)
}

export async function searchByImage(file) {
  await simulateLatency()
  if (!file) throw new Error('Se requiere una imagen para buscar.')
  const queryImageUrl = URL.createObjectURL(file)
  const shuffled = [...PRODUCTS].sort(() => Math.random() - 0.5).slice(0, 10)
  return { queryImageUrl, results: rankBySimilarity(shuffled) }
}

export async function getProduct(id) {
  await simulateLatency(150, 350)
  const product = getProductById(id)
  if (!product) throw new Error(`Producto no encontrado: ${id}`)
  return product
}
```

Continue `frontend/src/api/client.js` (append below `getProduct`):

```js
export async function searchMusic({ mode, query, audioFile }) {
  await simulateLatency()
  if (mode !== 'audio' && !query) throw new Error('Se requiere un termino de busqueda.')
  if (mode === 'audio' && !audioFile) throw new Error('Se requiere un archivo de audio.')

  let candidates = SONGS
  if (mode === 'lyrics' && query) {
    const q = query.toLowerCase()
    candidates = SONGS.filter((s) => s.lyricsSnippet.toLowerCase().includes(q))
    if (candidates.length === 0) candidates = SONGS.slice(0, 5)
  } else if (mode === 'genre' && query) {
    candidates = SONGS.filter((s) => s.genre.toLowerCase() === query.toLowerCase())
    if (candidates.length === 0) candidates = SONGS.slice(0, 5)
  } else {
    candidates = [...SONGS].sort(() => Math.random() - 0.5).slice(0, 8)
  }

  const results = rankBySimilarity(candidates).map((s) => ({
    ...s,
    matchedLyricSnippet: query && mode === 'lyrics' ? s.lyricsSnippet : null,
  }))
  return { results }
}

export async function getSong(id) {
  await simulateLatency(150, 350)
  const song = getSongById(id)
  if (!song) throw new Error(`Cancion no encontrada: ${id}`)
  return song
}
```

- [ ] Step 4: Run the tests to verify they pass

Run: `cd frontend; npm test -- client`
Expected: PASS - 7 tests passed.

- [ ] Step 5: Commit

Run:
```bash
git add frontend/src/api/client.js frontend/src/api/client.test.js
git commit -m "feat(frontend): add mock api client with simulated latency"
```

---

### Task 5: App Shell (Router, NavBar, Page Transitions, page stubs)

Files:
- Modify: frontend/src/App.jsx (replace placeholder)
- Modify: frontend/src/App.test.jsx (replace placeholder test)
- Create: frontend/src/components/layout/NavBar.jsx
- Create: frontend/src/components/layout/PageTransition.jsx
- Create: frontend/src/pages/Home.jsx (stub)
- Create: frontend/src/pages/visual-search/VisualSearchPage.jsx (stub)
- Create: frontend/src/pages/visual-search/ProductDetailPage.jsx (stub)
- Create: frontend/src/pages/music-search/MusicSearchPage.jsx (stub)
- Create: frontend/src/pages/music-search/SongDetailPage.jsx (stub)

Interfaces:
- Produces: routes `/`, `/visual-search`, `/visual-search/:id`, `/music-search`,
  `/music-search/:id`. Stub pages export a default component rendering a single
  identifying line of text (`Home page`, `Visual search page`, `Product detail page stub`,
  `Music search page`, `Song detail page stub`) which Tasks 7-11 replace with real content.

- [ ] Step 1: Create stub page `frontend/src/pages/Home.jsx`

```jsx
export default function Home() {
  return <div>Home page</div>
}
```

- [ ] Step 2: Create stub page `frontend/src/pages/visual-search/VisualSearchPage.jsx`

```jsx
export default function VisualSearchPage() {
  return <div>Visual search page</div>
}
```

- [ ] Step 3: Create stub page `frontend/src/pages/visual-search/ProductDetailPage.jsx`

```jsx
export default function ProductDetailPage() {
  return <div>Product detail page stub</div>
}
```

- [ ] Step 4: Create stub page `frontend/src/pages/music-search/MusicSearchPage.jsx`

```jsx
export default function MusicSearchPage() {
  return <div>Music search page</div>
}
```

- [ ] Step 5: Create stub page `frontend/src/pages/music-search/SongDetailPage.jsx`

```jsx
export default function SongDetailPage() {
  return <div>Song detail page stub</div>
}
```

- [ ] Step 6: Create `frontend/src/components/layout/PageTransition.jsx`

```jsx
import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] Step 7: Create `frontend/src/components/layout/NavBar.jsx`

```jsx
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/visual-search', label: 'Busqueda Visual' },
  { to: '/music-search', label: 'Busqueda Musical' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-lg font-bold text-transparent">
          Motor Multimodal
        </span>
        <ul className="flex gap-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-violet/30 to-accent-cyan/30"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] Step 8: Replace `frontend/src/App.jsx` (remove the Task 1 placeholder)

```jsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './components/layout/NavBar.jsx'
import PageTransition from './components/layout/PageTransition.jsx'
import Home from './pages/Home.jsx'
import VisualSearchPage from './pages/visual-search/VisualSearchPage.jsx'
import ProductDetailPage from './pages/visual-search/ProductDetailPage.jsx'
import MusicSearchPage from './pages/music-search/MusicSearchPage.jsx'
import SongDetailPage from './pages/music-search/SongDetailPage.jsx'

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/visual-search" element={<PageTransition><VisualSearchPage /></PageTransition>} />
            <Route path="/visual-search/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
            <Route path="/music-search" element={<PageTransition><MusicSearchPage /></PageTransition>} />
            <Route path="/music-search/:id" element={<PageTransition><SongDetailPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}
```

- [ ] Step 9: Replace `frontend/src/App.test.jsx` (remove the Task 1 placeholder test)

```jsx
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
```

- [ ] Step 10: Run the tests to verify they pass

Run: `cd frontend; npm test`
Expected: PASS - all tests green.

- [ ] Step 11: Commit

Run:
```bash
git add frontend/src
git commit -m "feat(frontend): app shell with router, navbar and page transitions"
```

---

### Task 6: Shared UI Components

Files:
- Create: frontend/src/components/shared/HistogramBars.jsx (+ test)
- Create: frontend/src/components/shared/ResultCard.jsx (+ test)
- Create: frontend/src/components/shared/SearchBar.jsx (+ test)
- Create: frontend/src/components/shared/LoadingSkeleton.jsx (+ test)
- Create: frontend/src/components/shared/EmptyState.jsx (+ test)

Interfaces:
- Produces: `HistogramBars({values, label})`, `ResultCard({to, imageUrl, title, subtitle,
  similarity, index})`, `SearchBar({value, onChange, placeholder, onSubmit})`,
  `LoadingSkeleton({count})`, `EmptyState({title, description})`. Tasks 8-11 import these.

- [ ] Step 1: Write the failing test `frontend/src/components/shared/HistogramBars.test.jsx`

```jsx
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
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- HistogramBars`
Expected: FAIL - `Failed to resolve import "./HistogramBars.jsx"`.

- [ ] Step 3: Create `frontend/src/components/shared/HistogramBars.jsx`

```jsx
import { motion } from 'framer-motion'

export default function HistogramBars({ values, label }) {
  const max = Math.max(...values, 1)
  return (
    <div>
      {label && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
      )}
      <div className="flex h-32 items-end gap-1.5" role="img" aria-label={label ?? 'histograma'}>
        {values.map((value, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-accent-violet to-accent-cyan"
            initial={{ height: 0 }}
            animate={{ height: `${(value / max) * 100}%` }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: 'easeOut' }}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] Step 4: Run the test to verify it passes

Run: `cd frontend; npm test -- HistogramBars`
Expected: PASS - 2 tests passed.

- [ ] Step 5: Write the failing test `frontend/src/components/shared/ResultCard.test.jsx`

```jsx
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
```

- [ ] Step 6: Run the test to verify it fails

Run: `cd frontend; npm test -- ResultCard`
Expected: FAIL - `Failed to resolve import "./ResultCard.jsx"`.

- [ ] Step 7: Create `frontend/src/components/shared/ResultCard.jsx`

```jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ResultCard({ to, imageUrl, title, subtitle, similarity, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <Link
        to={to}
        className="group block overflow-hidden rounded-2xl border border-white/10 bg-panel/60 transition-colors hover:border-accent-cyan/40"
      >
        <div className="aspect-square overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <p className="truncate font-semibold text-slate-100">{title}</p>
          <p className="truncate text-sm text-slate-400">{subtitle}</p>
          {typeof similarity === 'number' && (
            <span className="mt-2 inline-block rounded-full bg-accent-violet/20 px-2 py-0.5 text-xs font-medium text-accent-cyan">
              {Math.round(similarity * 100)}% similar
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
```

- [ ] Step 8: Run the test to verify it passes

Run: `cd frontend; npm test -- ResultCard`
Expected: PASS - 2 tests passed.

- [ ] Step 9: Write the failing test `frontend/src/components/shared/SearchBar.test.jsx`

```jsx
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
```

- [ ] Step 10: Run the test to verify it fails

Run: `cd frontend; npm test -- SearchBar`
Expected: FAIL - `Failed to resolve import "./SearchBar.jsx"`.

- [ ] Step 11: Create `frontend/src/components/shared/SearchBar.jsx`

```jsx
import { motion } from 'framer-motion'

export default function SearchBar({ value, onChange, placeholder, onSubmit }) {
  return (
    <motion.form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      className="flex gap-3"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-full border border-white/10 bg-panel/60 px-5 py-3 text-slate-100 placeholder:text-slate-500 focus:border-accent-cyan/60 focus:outline-none focus:ring-2 focus:ring-accent-cyan/20"
      />
      <motion.button
        type="submit"
        whileTap={{ scale: 0.95 }}
        className="rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-6 py-3 font-semibold text-ink"
      >
        Buscar
      </motion.button>
    </motion.form>
  )
}
```

- [ ] Step 12: Run the test to verify it passes

Run: `cd frontend; npm test -- SearchBar`
Expected: PASS - 2 tests passed.

- [ ] Step 13: Write the failing test `frontend/src/components/shared/LoadingSkeleton.test.jsx`

```jsx
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
```

- [ ] Step 14: Run the test to verify it fails

Run: `cd frontend; npm test -- LoadingSkeleton`
Expected: FAIL - `Failed to resolve import "./LoadingSkeleton.jsx"`.

- [ ] Step 15: Create `frontend/src/components/shared/LoadingSkeleton.jsx`

```jsx
import { motion } from 'framer-motion'

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5"
      role="status"
      aria-label="Cargando resultados"
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="aspect-square animate-pulse rounded-2xl bg-panel/60"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}
    </div>
  )
}
```

- [ ] Step 16: Run the test to verify it passes

Run: `cd frontend; npm test -- LoadingSkeleton`
Expected: PASS - 2 tests passed.

- [ ] Step 17: Write the failing test `frontend/src/components/shared/EmptyState.test.jsx`

```jsx
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
```

- [ ] Step 18: Run the test to verify it fails

Run: `cd frontend; npm test -- EmptyState`
Expected: FAIL - `Failed to resolve import "./EmptyState.jsx"`.

- [ ] Step 19: Create `frontend/src/components/shared/EmptyState.jsx`

```jsx
import { motion } from 'framer-motion'

export default function EmptyState({ title = 'Sin resultados', description }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/10 py-16 text-center"
    >
      <p className="text-lg font-semibold text-slate-200">{title}</p>
      {description && <p className="max-w-sm text-sm text-slate-400">{description}</p>}
    </motion.div>
  )
}
```

- [ ] Step 20: Run the test to verify it passes

Run: `cd frontend; npm test -- EmptyState`
Expected: PASS - 2 tests passed.

- [ ] Step 21: Run the full test suite

Run: `cd frontend; npm test`
Expected: PASS - all test files green.

- [ ] Step 22: Commit

Run:
```bash
git add frontend/src/components/shared
git commit -m "feat(frontend): add shared UI components (histogram, card, search, skeleton, empty state)"
```

---

### Task 7: Home Page

Files:
- Modify: frontend/src/pages/Home.jsx (replace the Task 5 stub)
- Create: frontend/src/pages/Home.test.jsx

Interfaces:
- Consumes: none beyond `react-router-dom` and `framer-motion`.
- Produces: two links with accessible names containing "Busqueda Visual E-commerce" and
  "Busqueda Musical Inteligente", pointing to `/visual-search` and `/music-search`.

- [ ] Step 1: Write the failing test `frontend/src/pages/Home.test.jsx`

```jsx
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
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- Home`
Expected: FAIL - the stub Home only renders the text "Home page", no links found.

- [ ] Step 3: Replace `frontend/src/pages/Home.jsx`

```jsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const APPS = [
  {
    to: '/visual-search',
    title: 'Busqueda Visual E-commerce',
    modality: 'Modalidad primaria: Imagen',
    description:
      'Sube una foto de una prenda y encuentra los 10 productos mas similares usando un codebook de palabras visuales (SIFT + K-Means).',
    accent: 'from-accent-violet to-fuchsia-400',
  },
  {
    to: '/music-search',
    title: 'Busqueda Musical Inteligente',
    modality: 'Modalidad primaria: Audio + Texto',
    description:
      'Busca canciones por letra, por similitud acustica o por genero, combinando TF-IDF sobre letras y MFCC + K-Means sobre audio.',
    accent: 'from-accent-cyan to-blue-400',
  },
]

export default function Home() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Sistema Multimodal de Recuperacion y Busqueda
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-400">
          Arquitectura unificada de split, codebook e indice invertido aplicada a imagen y
          audio. Elige una aplicacion para probarla.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {APPS.map((app, i) => (
          <motion.div
            key={app.to}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
          >
            <Link
              to={app.to}
              className="group block h-full rounded-3xl border border-white/10 bg-panel/60 p-8 transition-colors hover:border-accent-cyan/40"
            >
              <span
                className={`mb-4 inline-block rounded-full bg-gradient-to-r ${app.accent} bg-clip-text text-sm font-semibold uppercase tracking-wide text-transparent`}
              >
                {app.modality}
              </span>
              <h2 className="mb-3 text-2xl font-bold text-slate-50">{app.title}</h2>
              <p className="text-slate-400">{app.description}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-cyan transition-transform group-hover:translate-x-1">
                Probar aplicacion &rarr;
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] Step 4: Run the test to verify it passes

Run: `cd frontend; npm test -- Home`
Expected: PASS - 1 test passed.

- [ ] Step 5: Commit

Run:
```bash
git add frontend/src/pages/Home.jsx frontend/src/pages/Home.test.jsx
git commit -m "feat(frontend): implement Home page with animated app cards"
```

---

### Task 8: Visual Search Page

Files:
- Modify: frontend/src/pages/visual-search/VisualSearchPage.jsx (replace the Task 5 stub)
- Create: frontend/src/pages/visual-search/VisualSearchPage.test.jsx

Interfaces:
- Consumes: `searchByImage` from `api/client.js` (Task 4); `LoadingSkeleton`, `EmptyState`,
  `ResultCard` from `components/shared` (Task 6).
- Produces: route `/visual-search` with an upload flow that renders `ResultCard` items whose
  `to` prop is `/visual-search/:id`, consumed by Task 9's routing.

- [ ] Step 1: Write the failing test `frontend/src/pages/visual-search/VisualSearchPage.test.jsx`

```jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import VisualSearchPage from './VisualSearchPage.jsx'
import * as api from '../../api/client.js'

function renderPage() {
  return render(
    <MemoryRouter>
      <VisualSearchPage />
    </MemoryRouter>,
  )
}

describe('VisualSearchPage', () => {
  beforeEach(() => {
    URL.createObjectURL = vi.fn(() => 'blob:mock')
  })

  it('shows a validation error when searching without an image', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /buscar productos similares/i }))
    expect(await screen.findByText(/sube o elige una imagen/i)).toBeInTheDocument()
  })

  it('runs a search and renders result cards after picking a file', async () => {
    const fakeResults = [
      {
        id: 'prod-1',
        name: 'Polera Test',
        category: 'Poleras',
        imageUrl: 'https://picsum.photos/seed/prod-1/480/480',
        similarity: 0.9,
      },
    ]
    vi.spyOn(api, 'searchByImage').mockResolvedValue({
      queryImageUrl: 'blob:mock',
      results: fakeResults,
    })

    renderPage()
    const user = userEvent.setup()
    const file = new File(['data'], 'photo.png', { type: 'image/png' })
    await user.upload(screen.getByLabelText('Subir imagen'), file)
    await user.click(screen.getByRole('button', { name: /buscar productos similares/i }))

    await waitFor(() => expect(screen.getByText('Polera Test')).toBeInTheDocument())
  })
})
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- VisualSearchPage`
Expected: FAIL - the stub page has no button named "buscar productos similares".

- [ ] Step 3: Replace `frontend/src/pages/visual-search/VisualSearchPage.jsx`

```jsx
import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { searchByImage } from '../../api/client.js'
import { PRODUCTS } from '../../api/mockData/products.js'
import LoadingSkeleton from '../../components/shared/LoadingSkeleton.jsx'
import EmptyState from '../../components/shared/EmptyState.jsx'
import ResultCard from '../../components/shared/ResultCard.jsx'

function fileFromExampleImage() {
  return fetch(PRODUCTS[0].imageUrl)
    .then((res) => res.blob())
    .then((blob) => new File([blob], 'ejemplo.jpg', { type: blob.type || 'image/jpeg' }))
}

export default function VisualSearchPage() {
  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])

  const pickFile = useCallback((f) => {
    if (!f) return
    setFile(f)
    setPreviewUrl(URL.createObjectURL(f))
    setError(null)
  }, [])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    pickFile(e.dataTransfer.files?.[0])
  }

  const handleUseExample = async () => {
    const example = await fileFromExampleImage().catch(() => null)
    if (example) pickFile(example)
  }

  const handleSearch = async () => {
    if (!file) {
      setError('Sube o elige una imagen antes de buscar.')
      return
    }
    setStatus('loading')
    setError(null)
    try {
      const { results } = await searchByImage(file)
      setResults(results)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Busqueda Visual E-commerce</h1>
      <p className="mb-8 text-slate-400">Sube una foto de una prenda y encuentra productos similares.</p>

      <div className="mb-8 grid gap-6 sm:grid-cols-[280px_1fr]">
        <motion.div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          animate={{ borderColor: isDragging ? 'rgba(34,211,238,0.6)' : 'rgba(255,255,255,0.1)' }}
          className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-panel/40 p-4 text-center"
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Imagen de consulta" className="h-full w-full rounded-xl object-cover" />
          ) : (
            <>
              <p className="text-sm text-slate-400">Arrastra una imagen aqui</p>
              <label className="cursor-pointer rounded-full bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20">
                Elegir archivo
                <input
                  type="file"
                  accept="image/*"
                  aria-label="Subir imagen"
                  className="hidden"
                  onChange={(e) => pickFile(e.target.files?.[0])}
                />
              </label>
              <button onClick={handleUseExample} className="text-sm text-accent-cyan underline underline-offset-4">
                usar imagen de ejemplo
              </button>
            </>
          )}
        </motion.div>

        <div className="flex flex-col justify-center gap-4">
          {error && <p className="text-sm text-red-400">{error}</p>}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSearch}
            disabled={status === 'loading'}
            className="w-fit rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-8 py-3 font-semibold text-ink disabled:opacity-50"
          >
            {status === 'loading' ? 'Buscando...' : 'Buscar productos similares'}
          </motion.button>
        </div>
      </div>

      {status === 'loading' && <LoadingSkeleton count={10} />}

      {status === 'done' && results.length === 0 && (
        <EmptyState description="No encontramos productos similares para esta imagen." />
      )}

      {status === 'done' && results.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {results.map((product, i) => (
            <ResultCard
              key={product.id}
              index={i}
              to={`/visual-search/${product.id}`}
              imageUrl={product.imageUrl}
              title={product.name}
              subtitle={product.category}
              similarity={product.similarity}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] Step 4: Run the test to verify it passes

Run: `cd frontend; npm test -- VisualSearchPage`
Expected: PASS - 2 tests passed.

- [ ] Step 5: Commit

Run:
```bash
git add frontend/src/pages/visual-search/VisualSearchPage.jsx frontend/src/pages/visual-search/VisualSearchPage.test.jsx
git commit -m "feat(frontend): implement visual search page (upload, search, results grid)"
```

---

### Task 9: Product Detail Page

Files:
- Modify: frontend/src/pages/visual-search/ProductDetailPage.jsx (replace the Task 5 stub)
- Create: frontend/src/pages/visual-search/ProductDetailPage.test.jsx

Interfaces:
- Consumes: `getProduct` from `api/client.js` (Task 4); `HistogramBars` from
  `components/shared/HistogramBars.jsx` (Task 6); `useParams` from `react-router-dom` reading
  the `:id` param set up by Task 5's route `/visual-search/:id`.

- [ ] Step 1: Write the failing test `frontend/src/pages/visual-search/ProductDetailPage.test.jsx`

```jsx
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
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- ProductDetailPage`
Expected: FAIL - the stub page only renders "Product detail page stub".

- [ ] Step 3: Replace `frontend/src/pages/visual-search/ProductDetailPage.jsx`

```jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProduct } from '../../api/client.js'
import HistogramBars from '../../components/shared/HistogramBars.jsx'

export default function ProductDetailPage() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setProduct(null)
    setError(null)
    getProduct(id)
      .then((p) => {
        if (!cancelled) setProduct(p)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (error) {
    return <p className="text-red-400">{error}</p>
  }

  if (!product) {
    return <p className="text-slate-400">Cargando producto...</p>
  }

  return (
    <div>
      <Link to="/visual-search" className="mb-6 inline-block text-sm text-accent-cyan underline underline-offset-4">
        &larr; Volver a resultados
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-8 sm:grid-cols-2"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img src={product.imageUrl} alt={product.name} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-1 text-slate-400">{product.category}</p>
          <p className="mt-4 text-3xl font-extrabold text-accent-cyan">S/ {product.price}</p>
          <p className="mt-4 text-slate-300">{product.description}</p>

          <div className="mt-8">
            <HistogramBars values={product.visualWordHistogram} label="Histograma de visual words (codebook)" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
```

- [ ] Step 4: Run the test to verify it passes

Run: `cd frontend; npm test -- ProductDetailPage`
Expected: PASS - 2 tests passed.

- [ ] Step 5: Commit

Run:
```bash
git add frontend/src/pages/visual-search/ProductDetailPage.jsx frontend/src/pages/visual-search/ProductDetailPage.test.jsx
git commit -m "feat(frontend): implement product detail page with visual words histogram"
```

---

### Task 10: Music Search Page

Files:
- Modify: frontend/src/pages/music-search/MusicSearchPage.jsx (replace the Task 5 stub)
- Create: frontend/src/pages/music-search/MusicSearchPage.test.jsx

Interfaces:
- Consumes: `searchMusic` from `api/client.js` (Task 4); `SearchBar`, `LoadingSkeleton`,
  `EmptyState`, `ResultCard` from `components/shared` (Task 6).
- Produces: route `/music-search` rendering `ResultCard` items whose `to` prop is
  `/music-search/:id`, consumed by Task 11's routing.

- [ ] Step 1: Write the failing test `frontend/src/pages/music-search/MusicSearchPage.test.jsx`

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MusicSearchPage from './MusicSearchPage.jsx'
import * as api from '../../api/client.js'

function renderPage() {
  return render(
    <MemoryRouter>
      <MusicSearchPage />
    </MemoryRouter>,
  )
}

describe('MusicSearchPage', () => {
  it('shows a validation error when searching lyrics without text', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /buscar/i }))
    expect(await screen.findByText(/escribe un termino de busqueda/i)).toBeInTheDocument()
  })

  it('runs a lyrics search and renders results', async () => {
    vi.spyOn(api, 'searchMusic').mockResolvedValue({
      results: [
        {
          id: 'song-1',
          title: 'Luces de Neon',
          artist: 'Kilometro Cero',
          coverUrl: 'https://picsum.photos/seed/song-1/480/480',
          similarity: 0.95,
        },
      ],
    })
    renderPage()
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/busca por una frase/i), 'luces')
    await user.click(screen.getByRole('button', { name: /buscar/i }))
    await waitFor(() => expect(screen.getByText('Luces de Neon')).toBeInTheDocument())
  })

  it('switches to the genre tab and selects a genre', async () => {
    renderPage()
    const user = userEvent.setup()
    await user.click(screen.getByRole('tab', { name: /por genero/i }))
    await user.click(screen.getByRole('button', { name: 'Lo-fi' }))
    expect(screen.getByRole('button', { name: 'Lo-fi' })).toHaveClass('border-accent-cyan')
  })
})
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- MusicSearchPage`
Expected: FAIL - the stub page has no tabs or search inputs.

- [ ] Step 3: Replace `frontend/src/pages/music-search/MusicSearchPage.jsx`

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { searchMusic } from '../../api/client.js'
import SearchBar from '../../components/shared/SearchBar.jsx'
import LoadingSkeleton from '../../components/shared/LoadingSkeleton.jsx'
import EmptyState from '../../components/shared/EmptyState.jsx'
import ResultCard from '../../components/shared/ResultCard.jsx'

const TABS = [
  { key: 'lyrics', label: 'Por letra' },
  { key: 'audio', label: 'Por audio similar' },
  { key: 'genre', label: 'Por genero' },
]

const GENRE_OPTIONS = ['Indie Pop', 'Reggaeton', 'Rock Alternativo', 'Lo-fi', 'Cumbia Fusion', 'Electronica']

export default function MusicSearchPage() {
  const [tab, setTab] = useState('lyrics')
  const [query, setQuery] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])

  const handleSearch = async () => {
    setError(null)
    if (tab === 'audio' && !audioFile) {
      setError('Sube un archivo de audio antes de buscar.')
      return
    }
    if (tab !== 'audio' && !query.trim()) {
      setError('Escribe un termino de busqueda.')
      return
    }
    setStatus('loading')
    try {
      const { results } = await searchMusic({ mode: tab, query, audioFile })
      setResults(results)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('idle')
    }
  }

  const handleTabChange = (key) => {
    setTab(key)
    setStatus('idle')
    setResults([])
    setError(null)
    setQuery('')
    setAudioFile(null)
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Busqueda Musical Inteligente</h1>
      <p className="mb-8 text-slate-400">Busca canciones por letra, similitud acustica o genero.</p>

      <div className="relative mb-6 flex gap-2 rounded-full bg-panel/40 p-1" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => handleTabChange(t.key)}
            className={`relative flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              tab === t.key ? 'text-ink' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab === t.key && (
              <motion.span
                layoutId="music-tab-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            {t.label}
          </button>
        ))}
      </div>

      <div className="mb-8">
        {tab === 'audio' ? (
          <label className="flex w-fit cursor-pointer items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-medium hover:bg-white/20">
            {audioFile ? audioFile.name : 'Elegir archivo de audio'}
            <input
              type="file"
              accept="audio/*"
              aria-label="Subir audio"
              className="hidden"
              onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
            />
          </label>
        ) : tab === 'genre' ? (
          <div className="flex flex-wrap gap-2">
            {GENRE_OPTIONS.map((g) => (
              <button
                key={g}
                onClick={() => setQuery(g)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  query === g ? 'border-accent-cyan text-accent-cyan' : 'border-white/10 text-slate-300'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        ) : (
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            placeholder="Busca por una frase de la letra..."
          />
        )}
      </div>

      {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

      {tab !== 'lyrics' && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSearch}
          disabled={status === 'loading'}
          className="mb-8 w-fit rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-8 py-3 font-semibold text-ink disabled:opacity-50"
        >
          {status === 'loading' ? 'Buscando...' : 'Buscar canciones'}
        </motion.button>
      )}

      {status === 'loading' && <LoadingSkeleton count={8} />}

      {status === 'done' && results.length === 0 && (
        <EmptyState description="No encontramos canciones para esta busqueda." />
      )}

      {status === 'done' && results.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {results.map((song, i) => (
            <ResultCard
              key={song.id}
              index={i}
              to={`/music-search/${song.id}`}
              imageUrl={song.coverUrl}
              title={song.title}
              subtitle={song.artist}
              similarity={song.similarity}
            />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] Step 4: Run the test to verify it passes

Run: `cd frontend; npm test -- MusicSearchPage`
Expected: PASS - 3 tests passed.

- [ ] Step 5: Commit

Run:
```bash
git add frontend/src/pages/music-search/MusicSearchPage.jsx frontend/src/pages/music-search/MusicSearchPage.test.jsx
git commit -m "feat(frontend): implement music search page with lyrics/audio/genre tabs"
```

---

### Task 11: Song Detail Page

Files:
- Modify: frontend/src/pages/music-search/SongDetailPage.jsx (replace the Task 5 stub)
- Create: frontend/src/pages/music-search/SongDetailPage.test.jsx

Interfaces:
- Consumes: `getSong` from `api/client.js` (Task 4); `HistogramBars` from
  `components/shared/HistogramBars.jsx` (Task 6); `useParams` reading the `:id` param set up
  by Task 5's route `/music-search/:id`.

- [ ] Step 1: Write the failing test `frontend/src/pages/music-search/SongDetailPage.test.jsx`

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import SongDetailPage from './SongDetailPage.jsx'
import { SONGS } from '../../api/mockData/songs.js'

function renderDetail(id) {
  return render(
    <MemoryRouter initialEntries={[`/music-search/${id}`]}>
      <Routes>
        <Route path="/music-search/:id" element={<SongDetailPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('SongDetailPage', () => {
  it('renders song title, artist and histogram', async () => {
    const song = SONGS[0]
    renderDetail(song.id)
    expect(await screen.findByText(song.title)).toBeInTheDocument()
    expect(screen.getByText('Histograma de acoustic words (codebook)')).toBeInTheDocument()
  })

  it('toggles the play button label', async () => {
    const song = SONGS[0]
    renderDetail(song.id)
    await screen.findByText(song.title)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /reproducir/i })
    await user.click(button)
    expect(screen.getByRole('button', { name: /pausar/i })).toBeInTheDocument()
  })

  it('shows an error message for an unknown song id', async () => {
    renderDetail('does-not-exist')
    expect(await screen.findByText(/no encontrada/i)).toBeInTheDocument()
  })
})
```

- [ ] Step 2: Run the test to verify it fails

Run: `cd frontend; npm test -- SongDetailPage`
Expected: FAIL - the stub page only renders "Song detail page stub".

- [ ] Step 3: Replace `frontend/src/pages/music-search/SongDetailPage.jsx`

```jsx
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getSong } from '../../api/client.js'
import HistogramBars from '../../components/shared/HistogramBars.jsx'

function WaveformPulse() {
  const bars = Array.from({ length: 24 })
  return (
    <div className="flex h-16 items-center gap-1">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-accent-cyan/70"
          animate={{ height: ['20%', '90%', '35%', '70%', '20%'] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function SongDetailPage() {
  const { id } = useParams()
  const [song, setSong] = useState(null)
  const [error, setError] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let cancelled = false
    setSong(null)
    setError(null)
    setPlaying(false)
    getSong(id)
      .then((s) => {
        if (!cancelled) setSong(s)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (error) {
    return <p className="text-red-400">{error}</p>
  }

  if (!song) {
    return <p className="text-slate-400">Cargando cancion...</p>
  }

  return (
    <div>
      <Link to="/music-search" className="mb-6 inline-block text-sm text-accent-cyan underline underline-offset-4">
        &larr; Volver a resultados
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-8 sm:grid-cols-2"
      >
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <img src={song.coverUrl} alt={song.title} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{song.title}</h1>
          <p className="mt-1 text-slate-400">{song.artist} - {song.genre}</p>
          <p className="mt-4 italic text-slate-300">"{song.lyricsSnippet}"</p>

          <button
            onClick={() => setPlaying((p) => !p)}
            className="mt-6 w-fit rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-6 py-2 font-semibold text-ink"
          >
            {playing ? 'Pausar' : 'Reproducir'} (demo)
          </button>
          {playing && <WaveformPulse />}

          <div className="mt-8">
            <HistogramBars values={song.acousticHistogram} label="Histograma de acoustic words (codebook)" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
```

- [ ] Step 4: Run the test to verify it passes

Run: `cd frontend; npm test -- SongDetailPage`
Expected: PASS - 3 tests passed.

- [ ] Step 5: Commit

Run:
```bash
git add frontend/src/pages/music-search/SongDetailPage.jsx frontend/src/pages/music-search/SongDetailPage.test.jsx
git commit -m "feat(frontend): implement song detail page with acoustic histogram and fake player"
```

---

### Task 12: Final Integration, README and Manual QA

Files:
- Create: frontend/README.md

Interfaces: none (integration/verification task, no new exports).

- [ ] Step 1: Create `frontend/README.md`

```md
# Frontend - Motor Multimodal (demo)

Frontend Vite + React para las aplicaciones de Busqueda Visual E-commerce y Busqueda Musical
Inteligente del Proyecto 2 (Base de Datos 2, UTEC).

Este frontend usa una capa de datos mock (`src/api/mockData/`) y una API simulada
(`src/api/client.js`) con latencia artificial, ya que el backend real (split + codebook +
indice invertido sobre PostgreSQL) todavia esta en desarrollo. Las firmas de `searchByImage`,
`getProduct`, `searchMusic` y `getSong` estan pensadas para conectarse 1:1 al backend real sin
tocar los componentes.

## Requisitos
- Node.js 18+

## Instalacion

```bash
cd frontend
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre http://localhost:5173

## Tests

```bash
npm test
```

## Build de produccion

```bash
npm run build
npm run preview
```

## Estructura

Ver `docs/superpowers/specs/2026-07-01-frontend-visual-y-musical-search-design.md` en la
raiz del repo para el diseno completo.
```

- [ ] Step 2: Run the full test suite

Run: `cd frontend; npm test`
Expected: PASS - every test file from Tasks 1-11 green (App, seededRandom, products, songs,
client, HistogramBars, ResultCard, SearchBar, LoadingSkeleton, EmptyState, Home,
VisualSearchPage, ProductDetailPage, MusicSearchPage, SongDetailPage).

- [ ] Step 3: Verify the production build

Run: `cd frontend; npm run build`
Expected: exits 0, no warnings about unresolved imports.

- [ ] Step 4: Manual QA of the Visual Search flow

Start `cd frontend; npm run dev` (or use the available preview/dev-server tool) and in a
browser: go to Home, click "Busqueda Visual E-commerce", click "usar imagen de ejemplo",
click "Buscar productos similares", wait for the animated grid of 10 results, click one
result, verify the product detail page shows the query context and an animated histogram.
Check the browser console for errors.

- [ ] Step 5: Manual QA of the Music Search flow

In the same running dev server: go to Home, click "Busqueda Musical Inteligente", type a
word into the lyrics search bar and submit, verify animated results appear, click a result,
verify the song detail page shows the histogram and the Reproducir/Pausar toggle with the
waveform animation. Switch to the "Por genero" tab, pick a genre, click "Buscar canciones",
verify results update. Check the browser console for errors.

- [ ] Step 6: Commit

Run:
```bash
git add frontend/README.md
git commit -m "docs(frontend): add setup and usage instructions"
```
