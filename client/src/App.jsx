import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Home from './pages/Home'
import Update from './components/Update'
import PrivateDashboard from './pages/PrivateDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="/axon" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="update" element={<Update />} />
          <Route path="privatedashboard" element={<PrivateDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
