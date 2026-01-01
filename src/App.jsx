import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import CareersPage from './pages/CareersPage'
import AlphaLLMPage from './pages/AlphaLLMPage'
import SwarmOSPage from './pages/SwarmOSPage'
import FingptStackPage from './pages/FingptStackPage'
import LiveDashboardPage from './pages/LiveDashboardPage'
import ModelingCorePage from './pages/ModelingCorePage'
import RLGymnasiumPage from './pages/RLGymnasiumPage'
import BacktestLoginPage from './pages/BacktestLoginPage'
import NewsletterPage from './pages/NewsletterPage'
import NewsletterModal from './components/NewsletterModal'
import ScrollToTop from './components/ScrollToTop'

function App() {
    const [showAutoPopup, setShowAutoPopup] = useState(false)
    const location = useLocation()

    useEffect(() => {
        // Check if user has already seen the popup
        const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup')

        // Only show strictly on the home page or blog page, and if not seen yet
        if (!hasSeenPopup && (location.pathname === '/' || location.pathname === '/blog')) {
            const timer = setTimeout(() => {
                setShowAutoPopup(true)
                localStorage.setItem('hasSeenNewsletterPopup', 'true')
            }, 5000) // Show after 5 seconds

            return () => clearTimeout(timer)
        }
    }, [location])

    return (
        <div className="app">
            <ScrollToTop />
            <Routes>
                {/* Pages with standard layout */}
                <Route path="/" element={<><Navbar /><HomePage /><Footer /></>} />
                <Route path="/products" element={<><Navbar /><ProductsPage /><Footer /></>} />
                <Route path="/blog" element={<><Navbar /><BlogPage /><Footer /></>} />
                <Route path="/blog/:slug" element={<><Navbar /><BlogPostPage /><Footer /></>} />
                <Route path="/careers" element={<><Navbar /><CareersPage /><Footer /></>} />
                <Route path="/newsletter" element={<><Navbar /><NewsletterPage /><Footer /></>} />
                <Route path="/alphallm-core" element={<><Navbar /><AlphaLLMPage /><Footer /></>} />
                <Route path="/swarmos" element={<><Navbar /><SwarmOSPage /><Footer /></>} />
                <Route path="/fingpt-stack" element={<><Navbar /><FingptStackPage /><Footer /></>} />
                <Route path="/modeling-core" element={<><Navbar /><ModelingCorePage /><Footer /></>} />
                <Route path="/rl-gymnasium" element={<><Navbar /><RLGymnasiumPage /><Footer /></>} />

                {/* Auth pages - no standard layout */}
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Live dashboard - different layout */}
                <Route path="/live" element={<LiveDashboardPage />} />

                {/* Backtest Login */}
                <Route path="/backtest-login" element={<BacktestLoginPage />} />
            </Routes>

            <NewsletterModal isOpen={showAutoPopup} onClose={() => setShowAutoPopup(false)} />
        </div>
    )
}

export default App
