# Diseno: Frontend para Busqueda Visual E-commerce y Busqueda Musical Inteligente

## Contexto

El proyecto (curso Base de Datos 2, UTEC) requiere implementar al menos dos de las cuatro
aplicaciones sugeridas sobre el motor de busqueda multimodal (split + codebook + indice
invertido). Este spec cubre el frontend para las dos primeras aplicaciones del enunciado:

1. Busqueda Visual E-commerce (modalidad primaria: imagen) - usuario sube una foto, el
   sistema retorna productos similares (dataset objetivo: Fashion Product Images, Kaggle).
2. Busqueda Musical Inteligente (modalidad primaria: audio + texto) - buscar canciones por
   letra, similitud acustica o genero (dataset objetivo: Spotify features/lyrics o FMA).

El backend real (split/codebook/indice invertido, persistencia en PostgreSQL) todavia no existe;
solo hay scripts exploratorios de SIFT/K-Means en CodeBook/imagenes/. Este frontend debe quedar
visualmente completo y demostrable ya, contra una capa de mocks con un contrato de API explicito
que el equipo pueda reemplazar por llamadas reales sin tocar componentes.

## Objetivo

Un frontend Vite + React, animado con Framer Motion, que permita hacer una demo en vivo de las
dos aplicaciones frente al profesor.

## Arquitectura

- Ubicacion: carpeta nueva /frontend en la raiz del repo (monorepo backend + frontend).
- Rama: frontend (ya creada, este spec se commitea ahi).
- Stack: Vite + React 18, JavaScript (sin TypeScript), Tailwind CSS, React Router, Framer Motion.
- Idioma UI: espanol.
- Tema visual: oscuro (slate/navy) con acento en gradiente violeta-cian, tipografia sans
  moderna (Inter), tarjetas con borde sutil / glass blur.

### Estructura de carpetas

frontend/
  index.html
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    main.jsx
    App.jsx
    index.css
    api/
      client.js
      mockData/
        products.js
        songs.js
    components/
      layout/
        NavBar.jsx
        PageTransition.jsx
      shared/
        SearchBar.jsx
        ResultCard.jsx
        LoadingSkeleton.jsx
        EmptyState.jsx
        HistogramBars.jsx
    pages/
      Home.jsx
      visual-search/
        VisualSearchPage.jsx
        ProductDetailPage.jsx
      music-search/
        MusicSearchPage.jsx
        SongDetailPage.jsx

## Contrato de API mock (src/api/client.js)

Funciones async que simulan latencia de red (400-900ms aleatorio via setTimeout) y devuelven
datos de mockData/. Firmas pensadas para mapear 1:1 a futuros endpoints del backend real:

- searchByImage(file): devuelve queryImageUrl y results, lista de items con id, name, category,
  price, imageUrl, similarity, visualWordHistogram.
- getProduct(id): devuelve el detalle del producto incluyendo visualWordHistogram.
- searchMusic({ mode, query, audioFile }): devuelve results, lista de canciones con id, title,
  artist, coverUrl, similarity, acousticHistogram, matchedLyricSnippet.
- getSong(id): devuelve el detalle de la cancion incluyendo acousticHistogram.

visualWordHistogram y acousticHistogram son arrays de numeros (frecuencias de codewords)
generados con datos mock plausibles, usados para renderizar HistogramBars, conectando la UI
visualmente con el concepto de codebook/indice invertido del curso.

## Paginas y flujo

### Home (/)
Dos cards grandes animadas (fade+scale al montar, lift al hover) que llevan a cada aplicacion,
con un texto breve explicando la modalidad primaria de cada una.

### Busqueda Visual E-commerce (/visual-search)
1. Dropzone animado (drag and drop + click-to-upload) o boton "usar imagen de ejemplo".
2. Boton "Buscar" dispara searchByImage; mientras resuelve se muestra LoadingSkeleton (shimmer).
3. Resultados: grid de 10 tarjetas con stagger de entrada, cada una con imagen, nombre,
   categoria, precio y porcentaje de similitud.
4. Click en tarjeta lleva a ProductDetailPage: imagen de consulta vs. producto lado a lado
   mas HistogramBars de visual words animado al montar.

### Busqueda Musical Inteligente (/music-search)
1. Tabs animados (indicador deslizante): Por letra, Por audio similar, Por genero.
2. Segun tab: input de texto, dropzone de audio, o selector de genero.
3. Resultados: lista de canciones con cover placeholder, artista, snippet de letra con el
   termino buscado resaltado, porcentaje de similitud.
4. Click en cancion lleva a SongDetailPage: HistogramBars de acoustic words mas reproductor
   visual simulado (barras tipo waveform con animacion de pulso, sin audio real).

## Datos mock
- Imagenes: picsum.photos con seed fija por item (reproducible) mas nombres/categorias/precios
  inventados realistas de moda.
- Canciones: metadata inventada realista (titulo, artista, genero, snippet de letra en espanol).
- Histogramas: arrays de 12-16 valores aleatorios pero deterministas (seed por id).

## Manejo de errores
- Si no se sube imagen/audio y se intenta buscar: mensaje inline de validacion, sin llamar a
  la API mock.
- Estado vacio (EmptyState) si una busqueda mock devuelve 0 resultados.

## Testing / verificacion
No aplica suite automatizada formal dado que no hay backend/dataset real todavia. Verificacion:
levantar npm run dev, recorrer manualmente ambos flujos completos en el navegador de preview,
revisar consola sin errores, y confirmar que las animaciones no generan layout shift ni jank.

## Fuera de alcance (explicitamente)
- Conexion a backend/PostgreSQL real.
- Las otras 2 aplicaciones sugeridas (documentos multimodales, recomendacion).
- Descarga/uso del dataset real de Kaggle.
- Autenticacion de usuarios.

## Actualizacion 2026-07-01: reemplazo de Busqueda Visual E-commerce por Busqueda Multimodal en Documentos

Se reemplaza la aplicacion 1 (Busqueda Visual E-commerce) por la aplicacion 3 del enunciado
(Busqueda Multimodal en Documentos, modalidad primaria: Texto + Imagen). La aplicacion 2
(Busqueda Musical Inteligente) no cambia.

### Justificacion
El equipo decidio priorizar una aplicacion que combine dos modalidades fusionadas por
documento (texto + imagen), en vez de solo imagen, para mostrar mejor el concepto de
histogramas combinados del curso.

### Cambios
- Se elimina: VisualSearchPage.jsx, ProductDetailPage.jsx (+tests), mockData/products.js
  (+test), searchByImage/getProduct de client.js (+tests), rutas /visual-search*.
- Se agrega: mockData/documents.js (+test) con ~12 articulos mock (id, title, source,
  category, abstract, imageUrl, textHistogram, imageHistogram); searchDocuments({mode,
  query, imageFile}) y getDocument(id) en client.js; DocumentSearchPage.jsx (/document-search,
  tabs Por texto / Por imagen) y DocumentDetailPage.jsx (/document-search/:id, con dos
  HistogramBars: texto e imagen).
- Se actualiza: Home.jsx (card 1), App.jsx (rutas), NavBar.jsx (link "Busqueda Documentos").

## Actualizacion 2026-07-02: grabacion de audio en vivo (estilo Shazam) en Busqueda Musical

Se agrega una opcion de grabar audio directo desde el microfono en el tab "Por audio similar"
de MusicSearchPage, ademas de la opcion existente de subir archivo.

### Comportamiento
- Boton "Grabar audio" pide permiso via `navigator.mediaDevices.getUserMedia({audio:true})`.
- Graba con `MediaRecorder` durante 8 segundos (auto-stop), mostrando "Escuchando... Ns" con
  punto pulsante animado.
- Al detenerse la grabacion, arma un `File` con el audio capturado y dispara `searchMusic`
  automaticamente (mismo contrato mock que la busqueda por archivo subido).

### Errores
- Sin soporte del navegador (`!navigator.mediaDevices`): mensaje inline, no intenta grabar.
- Permiso denegado o sin microfono: mensaje inline "No se pudo acceder al microfono."
- Cleanup: si el componente se desmonta mientras graba, se detienen el stream de audio y los
  timers (interval del contador + timeout del auto-stop) para evitar fugas.

### Alcance
Solo modifica MusicSearchPage.jsx (+test). No afecta VisualSearch/DocumentSearch ni otras
paginas.
