import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function SignupPage() {
    const navigate = useNavigate()
    const { signUp, confirmSignUp } = useAuth()

    const [step, setStep] = useState('signup') // 'signup' | 'confirm'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        verificationCode: ''
    })
    const [message, setMessage] = useState({ text: '', type: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSignUp = async (e) => {
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

        const result = await signUp({
            email: formData.email,
            password: formData.password,
            name: formData.name
        })

        setLoading(false)

        if (result.success) {
            if (result.nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
                setMessage({
                    text: '✅ Check your email for verification code!',
                    type: 'success'
                })
                setStep('confirm')
            } else if (result.isSignUpComplete) {
                setMessage({ text: '✅ Account created! Redirecting...', type: 'success' })
                setTimeout(() => navigate('/login'), 1500)
            }
        } else {
            setMessage({ text: `❌ ${result.error}`, type: 'error' })
        }
    }

    const handleConfirm = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ text: '', type: '' })

        const result = await confirmSignUp({
            email: formData.email,
            code: formData.verificationCode
        })

        setLoading(false)

        if (result.success) {
            setMessage({ text: '✅ Email verified! Redirecting to login...', type: 'success' })
            setTimeout(() => navigate('/login'), 1500)
        } else {
            setMessage({ text: `❌ ${result.error}`, type: 'error' })
        }
    }

    return (
        <div className="auth-body">
            <div className="auth-container">
                <div className="auth-header">
                    <h1>{step === 'signup' ? 'Sign Up' : 'Verify Email'}</h1>
                    <p>
                        {step === 'signup'
                            ? 'Join the Wealthnomics AI Foundation'
                            : 'Enter the code sent to your email'}
                    </p>
                </div>

                {step === 'signup' ? (
                    <form onSubmit={handleSignUp}>
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
                            <label htmlFor="password">Password *</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                placeholder="Min. 8 characters, upper, lower, number"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <small style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.75rem',
                                color: '#888',
                                marginTop: '5px',
                                display: 'block'
                            }}>
                                Must include uppercase, lowercase, and numbers
                            </small>
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
                    </form>
                ) : (
                    <form onSubmit={handleConfirm}>
                        <div className="form-group">
                            <label htmlFor="verificationCode">Verification Code *</label>
                            <input
                                type="text"
                                id="verificationCode"
                                name="verificationCode"
                                required
                                placeholder="Enter 6-digit code"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                style={{ letterSpacing: '0.5em', textAlign: 'center', fontSize: '1.5rem' }}
                            />
                        </div>

                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify Email'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep('signup')}
                            style={{
                                marginTop: '15px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--accent-green)',
                                fontFamily: 'var(--font-mono)',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'center'
                            }}
                        >
                            ← Back to Sign Up
                        </button>
                    </form>
                )}

                {message.text && (
                    <p
                        id="formMessage"
                        style={{ color: message.type === 'error' ? '#f00' : 'var(--accent-green)' }}
                    >
                        {message.text}
                    </p>
                )}

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
