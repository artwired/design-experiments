import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import DesignA from './pages/DesignA'
import DesignB from './pages/DesignB'
import './App.css'

function LandingPage() {
  return (
    <div className="app-shell">
      <main className="landing-page">
        <section className="landing-panel" aria-labelledby="landing-title">
          <Header />
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/a" element={<DesignA />} />
      <Route path="/b" element={<DesignB />} />
    </Routes>
  )
}
