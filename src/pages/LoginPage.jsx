import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    })
    const [message, setMessage] = useState({ text: '', type: '' })

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Check against stored user data
        const storedUser = localStorage.getItem('wealthnomics_user')

        if (storedUser) {
            const user = JSON.parse(storedUser)
            if (user.email === formData.email && user.password === btoa(formData.password)) {
                setMessage({ text: '✅ Login successful! Redirecting...', type: 'success' })

                // Store login session
                localStorage.setItem('wealthnomics_session', JSON.stringify({
                    email: user.email,
                    name: user.name,
                    loggedIn: true
                }))

                setTimeout(() => navigate('/'), 1500)
                return
            }
        }

        setMessage({ text: '❌ Invalid email or password', type: 'error' })
    }

    return (
        <div className="auth-body">
            <div className="auth-container" style={{ maxWidth: '450px' }}>
                <div className="auth-header">
                    <h1>Login</h1>
                    <p>Welcome back to Wealthnomics</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-options">
                        <label>
                            <input
                                type="checkbox"
                                id="remember"
                                name="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                            />
                            Remember me
                        </label>
                        <a href="#forgot">Forgot password?</a>
                    </div>

                    <button type="submit" className="btn-submit" style={{ background: 'var(--text-main)' }}>
                        Login
                    </button>

                    {message.text && (
                        <p
                            id="formMessage"
                            style={{ color: message.type === 'error' ? '#f00' : 'var(--accent-green)' }}
                        >
                            {message.text}
                        </p>
                    )}
                </form>

                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                </div>

                <div className="back-home">
                    <Link to="/"><i className="fas fa-arrow-left"></i> Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
