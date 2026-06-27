import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ScanPage from './pages/ScanPage'
import ResultPage from './pages/ResultPage'
import HistoryPage from './pages/HistoryPage'
import ChatPage from './pages/ChatPage'
import Navbar from './components/Navbar'
import PageLoader from './components/PageLoader'
import WeatherPage from './pages/WeatherPage'

function App() {
  return (
    <div className="min-h-screen bg-earth-50">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <PageLoader>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/result/:scanId" element={<ResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/weather" element={<WeatherPage />} />
          </Routes>
        </PageLoader>
      </main>
    </div>
  )
}

export default App