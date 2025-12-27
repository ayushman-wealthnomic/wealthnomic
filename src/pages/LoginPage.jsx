import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function LoginPage() {
    const navigate = useNavigate()
    const { signIn } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    })
    const [message, setMessage] = useState({ text: '', type: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setFormData({ ...formData, [e.target.name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ text: '', type: '' })

        const result = await signIn({
            email: formData.email,
            password: formData.password
        })

        setLoading(false)

        if (result.success) {
            setMessage({ text: '✅ Login successful! Redirecting...', type: 'success' })
            setTimeout(() => navigate('/'), 1500)
        } else {
            // Handle specific errors
            let errorMessage = result.error
            if (result.error.includes('Incorrect username or password')) {
                errorMessage = 'Invalid email or password'
            } else if (result.error.includes('User does not exist')) {
                errorMessage = 'No account found with this email'
            } else if (result.error.includes('User is not confirmed')) {
                errorMessage = 'Please verify your email first'
                // Could redirect to verification page here
            }
            setMessage({ text: `❌ ${errorMessage}`, type: 'error' })
        }
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
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="btn-submit"
                        style={{ background: 'var(--text-main)' }}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
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
