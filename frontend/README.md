# Frontend - Motor Multimodal (demo)

Frontend Vite + React para las aplicaciones de Busqueda Multimodal en Documentos y Busqueda
Musical Inteligente del Proyecto 2 (Base de Datos 2, UTEC).

Este frontend usa una capa de datos mock (`src/api/mockData/`) y una API simulada
(`src/api/client.js`) con latencia artificial, ya que el backend real (split + codebook +
indice invertido sobre PostgreSQL) todavia esta en desarrollo. Las firmas de `searchDocuments`,
`getDocument`, `searchMusic` y `getSong` estan pensadas para conectarse 1:1 al backend real sin
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
