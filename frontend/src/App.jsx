import { Routes, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar.jsx'
import PageTransition from './components/layout/PageTransition.jsx'
import Home from './pages/Home.jsx'
import VisualSearchPage from './pages/visual-search/VisualSearchPage.jsx'
import ProductDetailPage from './pages/visual-search/ProductDetailPage.jsx'
import MusicSearchPage from './pages/music-search/MusicSearchPage.jsx'
import SongDetailPage from './pages/music-search/SongDetailPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/visual-search" element={<PageTransition><VisualSearchPage /></PageTransition>} />
          <Route path="/visual-search/:id" element={<PageTransition><ProductDetailPage /></PageTransition>} />
          <Route path="/music-search" element={<PageTransition><MusicSearchPage /></PageTransition>} />
          <Route path="/music-search/:id" element={<PageTransition><SongDetailPage /></PageTransition>} />
        </Routes>
      </main>
    </div>
  )
}
