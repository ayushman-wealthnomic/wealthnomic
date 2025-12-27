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

    const isActive = (path) => location.pathname === path

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderBottom: '1px solid #eee',
            zIndex: 1000,
            height: '70px',
            display: 'flex',
            alignItems: 'center'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 40px'
            }}>
                {/* Logo */}
                <Link
                    to="/"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none',
                        gap: 0
                    }}
                >
                    <span style={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#000',
                        letterSpacing: '-0.03em'
                    }}>
                        Wealthnomics
                    </span>
                    <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#888'
                    }}>
                        Capital Management
                    </span>
                </Link>

                {/* Navigation Links */}
                <ul style={{
                    display: 'flex',
                    gap: '35px',
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    alignItems: 'center'
                }}>
                    <li>
                        <Link
                            to="/#philosophy"
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: '#555',
                                textDecoration: 'none',
                                letterSpacing: '0.02em',
                                transition: 'color 0.2s'
                            }}
                        >
                            Philosophy
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/products"
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: isActive('/products') ? '#000' : '#555',
                                textDecoration: 'none',
                                letterSpacing: '0.02em',
                                borderBottom: isActive('/products') ? '2px solid #00cc7a' : 'none',
                                paddingBottom: '3px'
                            }}
                        >
                            Technology
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/blog"
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: isActive('/blog') ? '#000' : '#555',
                                textDecoration: 'none',
                                letterSpacing: '0.02em',
                                borderBottom: isActive('/blog') ? '2px solid #00cc7a' : 'none',
                                paddingBottom: '3px'
                            }}
                        >
                            Insights
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/careers"
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                color: isActive('/careers') ? '#000' : '#555',
                                textDecoration: 'none',
                                letterSpacing: '0.02em',
                                borderBottom: isActive('/careers') ? '2px solid #00cc7a' : 'none',
                                paddingBottom: '3px'
                            }}
                        >
                            Careers
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/live"
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#00cc7a',
                                textDecoration: 'none',
                                letterSpacing: '0.02em'
                            }}
                        >
                            Live Demo
                        </Link>
                    </li>

                    {/* Divider */}
                    <li style={{ width: '1px', height: '20px', background: '#ddd' }}></li>

                    {!loading && (
                        user ? (
                            <>
                                <li>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        color: '#555',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <i className="fas fa-user-circle" style={{ color: '#00cc7a' }}></i>
                                        {user.name || user.email?.split('@')[0]}
                                    </span>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid #ddd',
                                            padding: '8px 20px',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            color: '#555',
                                            borderRadius: '2px',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a
                                        href="mailto:ir@wealthnomic.com"
                                        style={{
                                            fontSize: '0.8rem',
                                            fontWeight: 600,
                                            color: '#fff',
                                            background: '#000',
                                            padding: '10px 22px',
                                            textDecoration: 'none',
                                            letterSpacing: '0.05em',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        INVESTOR LOGIN
                                    </a>
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
