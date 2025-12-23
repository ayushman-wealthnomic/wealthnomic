import { Link } from 'react-router-dom'

function RLGymnasiumPage() {
    return (
        <>
            <header className="blog-hero">
                <div className="container">
                    <span className="mono-text" style={{ display: 'block', marginBottom: '20px' }}>// INITIATIVE</span>
                    <h1 className="page-title">RL Gymnasium</h1>
                    <p className="page-subtitle">
                        Reinforcement learning environments for trading agents. OpenAI Gym-compatible interfaces
                        for backtesting RL strategies.
                    </p>
                </div>
            </header>

            <main className="container" style={{ padding: '100px 40px' }}>
                <section className="feature-section" style={{ border: 'none', paddingTop: 0 }}>
                    <div className="feature-grid">
                        <div className="feature-content">
                            <h2 className="section-heading">Train Your Agents</h2>
                            <p className="feature-desc">
                                Standard Gym-compatible environments for market making, execution optimization,
                                and portfolio management. Train with PPO, SAC, or your custom algorithms.
                            </p>
                            <div className="tag-cloud">
                                <span className="tech-tag">OpenAI Gym</span>
                                <span className="tech-tag">PPO/SAC</span>
                                <span className="tech-tag">Market Sim</span>
                                <span className="tech-tag">Backtesting</span>
                            </div>
                        </div>
                        <div className="tech-visual">
                            <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                                <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🎮</div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                    AGENT TRAINING IN PROGRESS<br />
                                    Episode: 1,247 | Reward: +2.3%
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginTop: '80px', paddingTop: '80px', borderTop: 'var(--border-width) solid var(--border-color)' }}>
                    <span className="section-label">ENVIRONMENTS</span>
                    <h2 className="section-heading">Available Environments</h2>

                    <div className="grid-3">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-exchange-alt"></i></div>
                            <h3>Market Making</h3>
                            <p>Learn optimal bid-ask spreads and inventory management in simulated order books.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-bolt"></i></div>
                            <h3>Execution</h3>
                            <p>Minimize market impact while executing large orders. TWAP, VWAP, and optimal execution.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-chart-pie"></i></div>
                            <h3>Portfolio</h3>
                            <p>Dynamic asset allocation with transaction costs and risk constraints.</p>
                        </div>
                    </div>
                </section>

                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <Link to="/" className="cta-button outline">
                        Back to Home
                    </Link>
                </div>
            </main>
        </>
    )
}

export default RLGymnasiumPage
