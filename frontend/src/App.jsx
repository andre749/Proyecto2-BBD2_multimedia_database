import { Routes, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar.jsx'
import PageTransition from './components/layout/PageTransition.jsx'
import Home from './pages/Home.jsx'
import DocumentSearchPage from './pages/document-search/DocumentSearchPage.jsx'
import DocumentDetailPage from './pages/document-search/DocumentDetailPage.jsx'
import MusicSearchPage from './pages/music-search/MusicSearchPage.jsx'
import SongDetailPage from './pages/music-search/SongDetailPage.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/document-search" element={<PageTransition><DocumentSearchPage /></PageTransition>} />
          <Route path="/document-search/:id" element={<PageTransition><DocumentDetailPage /></PageTransition>} />
          <Route path="/music-search" element={<PageTransition><MusicSearchPage /></PageTransition>} />
          <Route path="/music-search/:id" element={<PageTransition><SongDetailPage /></PageTransition>} />
        </Routes>
      </main>
    </div>
  )
}
