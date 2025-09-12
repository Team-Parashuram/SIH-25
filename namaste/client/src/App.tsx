import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainApplication from './pages/MainApplication'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApplication />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
