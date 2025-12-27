import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css' // Ensure we have styles

function BacktestLoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        if (username === 'user001' && password === 'love') {
            // Redirect to the static simulation dashboard
            window.location.href = '/simulation/simulation_dashboard.html'
        } else {
            setError('Invalid credentials')
        }
    }

    return (
        <div className="auth-container" style={{ margin: '100px auto', maxWidth: '400px' }}>
            <div className="auth-header">
                <h1>Backtest Login</h1>
                <p>Restricted Access: Simulation Environment</p>
            </div>

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter username"
                        style={{ width: '100%' }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                        style={{ width: '100%' }}
                    />
                </div>

                {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}

                <button type="submit" className="btn-submit">
                    Access Simulation
                </button>
            </form>

            <div className="back-home">
                <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Back to Home</button>
            </div>
        </div>
    )
}

export default BacktestLoginPage
