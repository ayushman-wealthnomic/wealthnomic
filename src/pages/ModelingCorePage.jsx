import { Link } from 'react-router-dom'

function ModelingCorePage() {
    return (
        <>
            <header className="blog-hero">
                <div className="container">
                    <span className="mono-text" style={{ display: 'block', marginBottom: '20px' }}>// INITIATIVE</span>
                    <h1 className="page-title">Modeling Core</h1>
                    <p className="page-subtitle">
                        Advanced quantitative modeling library. Stochastic processes, Monte Carlo simulations,
                        portfolio optimization, and risk analytics.
                    </p>
                </div>
            </header>

            <main className="container" style={{ padding: '100px 40px' }}>
                <section className="feature-section" style={{ border: 'none', paddingTop: 0 }}>
                    <div className="feature-grid">
                        <div className="feature-content">
                            <h2 className="section-heading">Quantitative Toolkit</h2>
                            <p className="feature-desc">
                                From Geometric Brownian Motion to jump-diffusion models, our library provides
                                production-ready implementations of essential quantitative finance methods.
                            </p>
                            <div className="tag-cloud">
                                <span className="tech-tag">Stochastic</span>
                                <span className="tech-tag">Monte Carlo</span>
                                <span className="tech-tag">Optimization</span>
                                <span className="tech-tag">Risk Models</span>
                            </div>
                        </div>
                        <div className="tech-visual">
                            <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                                <div style={{ marginBottom: '20px', fontWeight: 700 }}>MONTE CARLO SIMULATION</div>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', height: '200px', alignItems: 'flex-end' }}>
                                    {[60, 75, 90, 95, 100, 95, 90, 80, 70, 55, 45, 35].map((h, i) => (
                                        <div
                                            key={i}
                                            style={{
                                                width: '20px',
                                                height: `${h}%`,
                                                background: h > 90 ? 'var(--accent-green)' : '#ddd',
                                                border: '1px solid #000'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginTop: '80px', paddingTop: '80px', borderTop: 'var(--border-width) solid var(--border-color)' }}>
                    <span className="section-label">MODULES</span>
                    <h2 className="section-heading">Core Components</h2>

                    <div className="grid-3">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-random"></i></div>
                            <h3>Stochastic Models</h3>
                            <p>GBM, Heston, Jump-Diffusion, and SABR models for asset price simulation.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-dice"></i></div>
                            <h3>Monte Carlo</h3>
                            <p>Variance reduction, path generation, and option pricing via simulation.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-balance-scale"></i></div>
                            <h3>Portfolio Optimization</h3>
                            <p>Mean-variance, risk parity, Black-Litterman, and factor-based allocation.</p>
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

export default ModelingCorePage
