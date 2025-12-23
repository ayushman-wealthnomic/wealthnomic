import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <>
            <header className="hero">
                <div className="container">
                    <div className="mono highlight" style={{ marginBottom: '20px' }}>
                        [ THE AI MODELING STACK FOR GLOBAL FINANCE ]
                    </div>
                    <h1 className="hero-title">
                        THE DEFINITIVE FOUNDATION<br />FOR FINANCIAL INTELLIGENCE.
                    </h1>
                    <p className="hero-subtitle">
                        Wealthnomics AI Foundation is the open source home for LLMs, Agentic AI, Reinforcement Learning, and
                        Quantitative Methods. We are building the essential AI and modeling infrastructure that powers the next
                        generation of global finance.
                    </p>
                    <div className="cta-group">
                        <a href="#initiatives" className="cta-button">Explore Our Stack</a>
                    </div>
                </div>
            </header>

            <div id="initiatives" style={{ borderBottom: 'var(--border-width) solid var(--border-color)' }}>
                <div className="container" style={{ padding: '100px 40px 60px' }}>
                    <span className="section-label">THE OPEN SOURCE AI STACK</span>
                    <h2 className="section-heading">
                        From Data to Decision:<br />The Complete AI Pipeline.
                    </h2>
                </div>
            </div>

            {/* AlphaLLM Core Section */}
            <section className="feature-section">
                <div className="container feature-grid">
                    <div className="feature-content">
                        <div className="card-icon" style={{ marginBottom: '30px' }}>
                            <i className="fas fa-brain"></i>
                        </div>
                        <h3>AlphaLLM Core</h3>
                        <p className="feature-desc">
                            Our proprietary LLM stack for financial intelligence. Fine-tuned Llama-3 and Mistral
                            models optimized for earnings call parsing, FOMC analysis, and sentiment benchmarks. Includes a
                            128K+ context window and RAG-native architecture.
                        </p>
                        <div className="tag-cloud">
                            <span className="tech-tag">AlphaLLM</span>
                            <span className="tech-tag">Llama-3</span>
                            <span className="tech-tag">RAG Pipeline</span>
                            <span className="tech-tag">128K Context</span>
                        </div>
                        <table className="specs-table">
                            <tbody>
                                <tr><td>Base Models</td><td>Llama-3 / Mistral</td></tr>
                                <tr><td>Training Data</td><td>500B+ Tokens</td></tr>
                                <tr><td>Benchmark</td><td>94.2% Sentiment Accuracy</td></tr>
                                <tr><td>Integration</td><td>HuggingFace / Custom</td></tr>
                            </tbody>
                        </table>
                        <Link to="/alphallm-core" className="card-link">EXPLORE LLM MODELS →</Link>
                    </div>
                    <div className="tech-visual">
                        <div className="genai-matrix">
                            {['THE', 'FED', 'IS', 'LIKELY', 'TO', 'PAUSE', 'RATES', 'IN',
                                'Q3', 'DUE', 'TO', 'CPI', 'DATA', 'AND', 'JOB', 'GROWTH',
                                '...', '0.98', '0.02', 'INF', 'LAYER', 'ATTN', 'HEAD', '7',
                                'MASK', 'EMBED', 'VEC', 'DIM', '512', 'LOGIT', 'SOFT', 'MAX'
                            ].map((text, i) => (
                                <div
                                    key={i}
                                    className={`matrix-cell ${['FED', 'PAUSE', 'CPI', 'ATTN'].includes(text) ? 'active' : ''}`}
                                >
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SwarmOS Section */}
            <section className="feature-section">
                <div className="container feature-grid">
                    <div className="feature-content">
                        <div className="card-icon" style={{ marginBottom: '30px' }}>
                            <i className="fas fa-robot"></i>
                        </div>
                        <h3>SwarmOS</h3>
                        <p className="feature-desc">
                            The operating system for financial agents. Autonomous multi-agent swarms powered by WealthAgents
                            framework. Features debate-driven consensus (Bull vs. Bear) and Chain-of-Thought reasoning
                            to conduct industrial-grade due diligence.
                        </p>
                        <div className="tag-cloud">
                            <span className="tech-tag">Multi-Agent</span>
                            <span className="tech-tag">Autonomous</span>
                            <span className="tech-tag">Chain-of-Thought</span>
                            <span className="tech-tag">Debate Protocol</span>
                        </div>
                        <table className="specs-table">
                            <tbody>
                                <tr><td>Agent Types</td><td>Bull / Bear / Analyst</td></tr>
                                <tr><td>Protocol</td><td>Debate-Driven Consensus</td></tr>
                                <tr><td>Memory</td><td>Long-term with RAG</td></tr>
                                <tr><td>Tools</td><td>API / Browser / Code</td></tr>
                            </tbody>
                        </table>
                        <Link to="/swarmos" className="card-link">EXPLORE AGENTS →</Link>
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

            {/* FinGPT Stack Section */}
            <section className="feature-section">
                <div className="container feature-grid">
                    <div className="feature-content">
                        <div className="card-icon" style={{ marginBottom: '30px' }}>
                            <i className="fas fa-database"></i>
                        </div>
                        <h3>FinGPT Stack</h3>
                        <p className="feature-desc">
                            Production-grade financial data infrastructure. Real-time market feeds, alternative data processing,
                            and unified data lake architecture. Powers the entire Wealthnomics AI stack with clean, normalized data.
                        </p>
                        <div className="tag-cloud">
                            <span className="tech-tag">Real-time</span>
                            <span className="tech-tag">Alt Data</span>
                            <span className="tech-tag">Data Lake</span>
                            <span className="tech-tag">ETL Pipeline</span>
                        </div>
                        <Link to="/fingpt-stack" className="card-link">EXPLORE DATA STACK →</Link>
                    </div>
                    <div className="tech-visual">
                        <div className="terminal-window">
                            <div className="terminal-line">Loading market data...</div>
                            <div className="terminal-line">SPY: $503.42 (+1.2%)</div>
                            <div className="terminal-line">VIX: 14.23 (-0.8%)</div>
                            <div className="terminal-line">Processing 1.2M events/sec</div>
                            <div className="terminal-line blink-cursor">Ready for inference</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modeling Core Section */}
            <section className="feature-section">
                <div className="container feature-grid">
                    <div className="feature-content">
                        <div className="card-icon" style={{ marginBottom: '30px' }}>
                            <i className="fas fa-chart-line"></i>
                        </div>
                        <h3>Modeling Core</h3>
                        <p className="feature-desc">
                            Advanced quantitative modeling library. Stochastic processes, Monte Carlo simulations,
                            portfolio optimization, and risk analytics. Built for both research and production.
                        </p>
                        <div className="tag-cloud">
                            <span className="tech-tag">Stochastic</span>
                            <span className="tech-tag">Monte Carlo</span>
                            <span className="tech-tag">Optimization</span>
                            <span className="tech-tag">Risk Models</span>
                        </div>
                        <Link to="/modeling-core" className="card-link">EXPLORE MODELS →</Link>
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

            {/* RL Gymnasium Section */}
            <section className="feature-section">
                <div className="container feature-grid">
                    <div className="feature-content">
                        <div className="card-icon" style={{ marginBottom: '30px' }}>
                            <i className="fas fa-gamepad"></i>
                        </div>
                        <h3>RL Gymnasium</h3>
                        <p className="feature-desc">
                            Reinforcement learning environments for trading agents. OpenAI Gym-compatible interfaces
                            for backtesting RL strategies. Supports market making, execution, and portfolio management tasks.
                        </p>
                        <div className="tag-cloud">
                            <span className="tech-tag">OpenAI Gym</span>
                            <span className="tech-tag">PPO/SAC</span>
                            <span className="tech-tag">Market Sim</span>
                            <span className="tech-tag">Backtesting</span>
                        </div>
                        <Link to="/rl-gymnasium" className="card-link">EXPLORE RL ENV →</Link>
                    </div>
                    <div className="tech-visual">
                        <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '10px' }}>🎮</div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                                AGENT TRAINING IN PROGRESS<br />
                                Episode: 1,247 | Reward: +2.3%
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Section */}
            <section id="journey">
                <div className="container">
                    <span className="section-label">OUR JOURNEY</span>
                    <h2 className="section-heading">Building the Future of Finance</h2>

                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-year">2024 Q1</div>
                            <h3>Foundation Launch</h3>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                                Established the Wealthnomics AI Foundation. Released initial AlphaLLM models
                                and core infrastructure.
                            </p>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2024 Q2</div>
                            <h3>SwarmOS Alpha</h3>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                                Launched multi-agent framework with debate-driven consensus protocols.
                                First successful autonomous analysis runs.
                            </p>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2024 Q3</div>
                            <h3>Production Ready</h3>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                                Deployed production infrastructure. Live trading signals and real-time
                                market analysis capabilities enabled.
                            </p>
                        </div>

                        <div className="timeline-item">
                            <div className="timeline-year">2025</div>
                            <h3>Scale & Expand</h3>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                                Expanding to global markets. Enhanced LLM capabilities and new RL environments.
                                Growing the open source community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage
