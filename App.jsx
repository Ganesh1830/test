import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/Login.jsx'
import DashboardLayout from './pages/DashboardLayout.jsx'
import OverviewPage from './pages/Overview.jsx'
import ProfilePage from './pages/Profile.jsx'
import CropsPage from './pages/Crops.jsx'
import RecommendationsPage from './pages/Recommendations.jsx'
import DiseaseDetectionPage from './pages/DiseaseDetectionPage.jsx'
import WeatherPage from './pages/Weather.jsx'
import MarketPricesPage from './pages/MarketPricesPage.jsx'
import SettingsPage from './pages/Settings.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { getStoredUser, clearStoredUser } from './services/api.js'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = getStoredUser()
    if (stored) {
      setUser(stored)
    }
  }, [])

  function handleLogin(userData) {
    setUser(userData)
  }

  function handleLogout() {
    clearStoredUser()
    setUser(null)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <DashboardLayout user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage user={user} />} />
          <Route path="profile" element={<ProfilePage user={user} />} />
          <Route path="crops" element={<CropsPage />} />
          <Route path="recommendations" element={<RecommendationsPage />} />
          <Route path="disease-detection" element={<DiseaseDetectionPage />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="market-prices" element={<MarketPricesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
