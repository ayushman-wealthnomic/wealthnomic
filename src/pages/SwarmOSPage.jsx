import { Link } from 'react-router-dom'

function SwarmOSPage() {
    return (
        <>
            <header className="blog-hero">
                <div className="container">
                    <span className="mono-text" style={{ display: 'block', marginBottom: '20px' }}>// INITIATIVE</span>
                    <h1 className="page-title">SwarmOS</h1>
                    <p className="page-subtitle">
                        The operating system for financial agents. Autonomous multi-agent swarms powered by
                        debate-driven consensus and Chain-of-Thought reasoning.
                    </p>
                </div>
            </header>

            <main className="container" style={{ padding: '100px 40px' }}>
                <section className="feature-section" style={{ border: 'none', paddingTop: 0 }}>
                    <div className="feature-grid">
                        <div className="feature-content">
                            <h2 className="section-heading">Multi-Agent Architecture</h2>
                            <p className="feature-desc">
                                Single agents have blind spots. SwarmOS deploys multiple specialized agents - Bull, Bear,
                                and Analyst - that debate and reach consensus before making decisions.
                            </p>
                            <div className="tag-cloud">
                                <span className="tech-tag">Multi-Agent</span>
                                <span className="tech-tag">Autonomous</span>
                                <span className="tech-tag">Debate Protocol</span>
                                <span className="tech-tag">Chain-of-Thought</span>
                            </div>
                            <table className="specs-table">
                                <tbody>
                                    <tr><td>Agent Types</td><td>Bull / Bear / Analyst</td></tr>
                                    <tr><td>Protocol</td><td>Debate-Driven Consensus</td></tr>
                                    <tr><td>Memory</td><td>Long-term with RAG</td></tr>
                                    <tr><td>Tools</td><td>API / Browser / Code</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="tech-visual">
                            <div className="agent-loop-container">
                                <div className="loop-ring"></div>
                                <div className="agent-node">AI</div>
                                <div className="loop-item" style={{ top: '20%', left: '10%' }}>ANALYZE</div>
                                <div className="loop-item" style={{ top: '70%', left: '15%' }}>DEBATE</div>
                                <div className="loop-item" style={{ top: '20%', right: '10%' }}>DECIDE</div>
                                <div className="loop-item" style={{ top: '70%', right: '15%' }}>EXECUTE</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginTop: '80px', paddingTop: '80px', borderTop: 'var(--border-width) solid var(--border-color)' }}>
                    <span className="section-label">AGENT TYPES</span>
                    <h2 className="section-heading">Specialized Roles</h2>

                    <div className="grid-3">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-chart-line"></i></div>
                            <h3>Bull Agent</h3>
                            <p>Identifies growth opportunities, positive catalysts, and upside potential. Builds the bullish case with evidence.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-shield-alt"></i></div>
                            <h3>Bear Agent</h3>
                            <p>Stress tests assumptions, identifies risks, and builds the bearish case. Essential for avoiding blind spots.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-balance-scale"></i></div>
                            <h3>Analyst Agent</h3>
                            <p>Moderates the debate, weighs evidence, and synthesizes the final recommendation with confidence scores.</p>
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

export default SwarmOSPage
