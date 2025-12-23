import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <div className="container footer-grid">
                <div className="footer-col">
                    <div
                        className="brand"
                        style={{
                            marginBottom: '20px',
                            fontWeight: 700,
                            fontSize: '1.5rem',
                            letterSpacing: '-0.03em'
                        }}
                    >
                        Wealth<span style={{ color: '#39e75f' }}>nomics</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', maxWidth: '300px' }}>
                        Building the open source standard for financial intelligence and AI-native market infrastructure.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                        <a href="https://github.com/wealthnomic" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://twitter.com/wealthnomic" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://linkedin.com/company/wealthnomic" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Initiatives</h4>
                    <ul className="footer-links">
                        <li><Link to="/alphallm-core">AlphaLLM Core</Link></li>
                        <li><Link to="/swarmos">SwarmOS</Link></li>
                        <li><Link to="/fingpt-stack">FinGPT Stack</Link></li>
                        <li><Link to="/modeling-core">Modeling Core</Link></li>
                        <li><Link to="/rl-gymnasium">RL Gymnasium</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Resources</h4>
                    <ul className="footer-links">
                        <li><Link to="/blog">Articles</Link></li>
                        <li><Link to="/live">Live Demo</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><a href="https://github.com/wealthnomic" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Contact</h4>
                    <ul className="footer-links">
                        <li style={{ color: 'var(--text-light)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                            Wyoming, USA
                        </li>
                        <li>
                            <a href="mailto:investors@wealthnomic.com">investors@wealthnomic.com</a>
                        </li>
                    </ul>
                    <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '30px', maxWidth: '250px' }}>
                        © 2025 Wealthnomics AI Foundation.<br />All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
