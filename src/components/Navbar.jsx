import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const { user, loading, signOut } = useAuth()

    const handleLogout = async () => {
        await signOut()
        navigate('/')
    }

    return (
        <nav>
            <div className="container nav-inner">
                <Link
                    to="/"
                    className="brand"
                    style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 0,
                        background: '#2a2a2a',
                        padding: '10px 15px',
                        borderRadius: 0
                    }}
                >
                    <span style={{ fontSize: '1.8rem', color: '#fff' }}>Wealthnomics</span>
                    <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: '#999'
                    }}>
                        Intelligence for Alpha
                    </span>
                </Link>

                <ul className="nav-links">
                    <li>
                        <Link
                            to="/products"
                            style={location.pathname === '/products' ? { borderBottom: '2px solid var(--text-main)' } : {}}
                        >
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/#initiatives">Initiatives</Link>
                    </li>
                    <li>
                        <Link to="/#journey">Journey</Link>
                    </li>
                    <li>
                        <Link
                            to="/blog"
                            style={location.pathname === '/blog' ? { borderBottom: '2px solid var(--text-main)' } : {}}
                        >
                            Articles
                        </Link>
                    </li>
                    <li>
                        <Link to="/live" className="highlight">Live Demo</Link>
                    </li>
                    <li>
                        <Link to="/backtest-login" style={{ color: '#888' }}>Backtest</Link>
                    </li>

                    {!loading && (
                        user ? (
                            <>
                                <li>
                                    <span
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            fontSize: '0.9rem',
                                            color: 'var(--accent-green)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <i className="fas fa-user-circle"></i>
                                        {user.name || user.email?.split('@')[0]}
                                    </span>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="btn-nav"
                                        style={{
                                            background: 'var(--text-main)',
                                            cursor: 'pointer',
                                            fontFamily: 'var(--font-mono)'
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/signup" className="btn-nav" style={{ background: 'var(--accent-green)' }}>
                                        Sign Up
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="btn-nav" style={{ background: 'var(--text-main)' }}>
                                        Login
                                    </Link>
                                </li>
                            </>
                        )
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
