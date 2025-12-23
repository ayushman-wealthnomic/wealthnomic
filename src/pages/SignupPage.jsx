import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignupPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        linkedin: '',
        password: '',
        confirmPassword: ''
    })
    const [message, setMessage] = useState({ text: '', type: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setMessage({ text: '❌ Passwords do not match!', type: 'error' })
            return
        }

        if (formData.password.length < 8) {
            setMessage({ text: '❌ Password must be at least 8 characters!', type: 'error' })
            return
        }

        setLoading(true)
        setMessage({ text: '', type: '' })

        try {
            // Save to localStorage for demo login
            const userData = {
                name: formData.name,
                email: formData.email,
                linkedin: formData.linkedin,
                password: btoa(formData.password)
            }
            localStorage.setItem('wealthnomics_user', JSON.stringify(userData))

            // Submit to Formspree
            const formBody = new FormData()
            formBody.append('name', formData.name)
            formBody.append('email', formData.email)
            formBody.append('linkedin', formData.linkedin)
            formBody.append('_subject', 'New Wealthnomics Signup!')

            const response = await fetch('https://formspree.io/f/mrezgeez', {
                method: 'POST',
                body: formBody,
                headers: { 'Accept': 'application/json' }
            })

            if (response.ok) {
                setMessage({ text: '✅ Account created! Redirecting to login...', type: 'success' })
                setTimeout(() => navigate('/login'), 2000)
            } else {
                throw new Error('Submission failed')
            }
        } catch (error) {
            setMessage({ text: '❌ Submission error. Please try again.', type: 'error' })
            setLoading(false)
        }
    }

    return (
        <div className="auth-body">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>Sign Up</h1>
                    <p>Join the Wealthnomics AI Foundation</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name *</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="linkedin">LinkedIn Profile</label>
                        <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={formData.linkedin}
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
                            placeholder="Min. 8 characters"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password *</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            placeholder="Re-enter password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
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
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>

                <div className="back-home">
                    <Link to="/"><i className="fas fa-arrow-left"></i> Back to Home</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
