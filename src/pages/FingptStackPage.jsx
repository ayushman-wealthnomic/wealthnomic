import { Link } from 'react-router-dom'

function FingptStackPage() {
    return (
        <>
            <header className="blog-hero">
                <div className="container">
                    <span className="mono-text" style={{ display: 'block', marginBottom: '20px' }}>// INITIATIVE</span>
                    <h1 className="page-title">FinGPT Stack</h1>
                    <p className="page-subtitle">
                        Production-grade financial data infrastructure. Real-time market feeds, alternative data
                        processing, and unified data lake architecture.
                    </p>
                </div>
            </header>

            <main className="container" style={{ padding: '100px 40px' }}>
                <section className="feature-section" style={{ border: 'none', paddingTop: 0 }}>
                    <div className="feature-grid">
                        <div className="feature-content">
                            <h2 className="section-heading">Data Pipeline</h2>
                            <p className="feature-desc">
                                Clean, normalized data powers everything. Our ETL pipeline processes millions of events
                                per second, including market data, news, social sentiment, and alternative data sources.
                            </p>
                            <div className="tag-cloud">
                                <span className="tech-tag">Real-time</span>
                                <span className="tech-tag">Alt Data</span>
                                <span className="tech-tag">Data Lake</span>
                                <span className="tech-tag">ETL Pipeline</span>
                            </div>
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

                <section style={{ marginTop: '80px', paddingTop: '80px', borderTop: 'var(--border-width) solid var(--border-color)' }}>
                    <span className="section-label">DATA SOURCES</span>
                    <h2 className="section-heading">Connected Feeds</h2>

                    <div className="grid-3">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-chart-bar"></i></div>
                            <h3>Market Data</h3>
                            <p>Real-time quotes, OHLCV, order book depth, and tick data across global exchanges.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-newspaper"></i></div>
                            <h3>News & Filings</h3>
                            <p>SEC filings, earnings transcripts, press releases, and financial news with NLP processing.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-satellite"></i></div>
                            <h3>Alternative Data</h3>
                            <p>Satellite imagery, web scraping, social sentiment, and other non-traditional data sources.</p>
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

export default FingptStackPage
