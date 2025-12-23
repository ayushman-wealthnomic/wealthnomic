import { Link } from 'react-router-dom'

function AlphaLLMPage() {
    return (
        <>
            <header className="blog-hero">
                <div className="container">
                    <span className="mono-text" style={{ display: 'block', marginBottom: '20px' }}>// INITIATIVE</span>
                    <h1 className="page-title">AlphaLLM Core</h1>
                    <p className="page-subtitle">
                        Our proprietary LLM stack for financial intelligence. Fine-tuned models optimized for
                        earnings call parsing, FOMC analysis, and sentiment benchmarks.
                    </p>
                </div>
            </header>

            <main className="container" style={{ padding: '100px 40px' }}>
                <section className="feature-section" style={{ border: 'none', paddingTop: 0 }}>
                    <div className="feature-grid">
                        <div className="feature-content">
                            <h2 className="section-heading">Purpose-Built for Finance</h2>
                            <p className="feature-desc">
                                General-purpose LLMs fail on financial text. AlphaLLM models are trained on 500B+ tokens
                                of financial documents, earnings calls, SEC filings, and macroeconomic reports.
                            </p>
                            <div className="tag-cloud">
                                <span className="tech-tag">Llama-3 Fine-tuned</span>
                                <span className="tech-tag">Mistral-7B</span>
                                <span className="tech-tag">128K Context</span>
                                <span className="tech-tag">RAG-Native</span>
                            </div>
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

                <section style={{ marginTop: '80px', paddingTop: '80px', borderTop: 'var(--border-width) solid var(--border-color)' }}>
                    <span className="section-label">CAPABILITIES</span>
                    <h2 className="section-heading">Model Specifications</h2>

                    <div className="grid-3">
                        <div className="card">
                            <h3>Sentiment Analysis</h3>
                            <table className="specs-table">
                                <tbody>
                                    <tr><td>Accuracy</td><td>94.2%</td></tr>
                                    <tr><td>Dataset</td><td>FinSent-500K</td></tr>
                                    <tr><td>Classes</td><td>Bullish/Bearish/Neutral</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card">
                            <h3>Entity Extraction</h3>
                            <table className="specs-table">
                                <tbody>
                                    <tr><td>F1 Score</td><td>91.8%</td></tr>
                                    <tr><td>Entities</td><td>Tickers, Metrics, Dates</td></tr>
                                    <tr><td>Speed</td><td>1000 docs/min</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="card">
                            <h3>Summarization</h3>
                            <table className="specs-table">
                                <tbody>
                                    <tr><td>ROUGE-L</td><td>0.42</td></tr>
                                    <tr><td>Context</td><td>128K tokens</td></tr>
                                    <tr><td>Output</td><td>Structured JSON</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section style={{ marginTop: '80px', paddingTop: '80px', borderTop: 'var(--border-width) solid var(--border-color)' }}>
                    <span className="section-label">INTEGRATION</span>
                    <h2 className="section-heading">Get Started</h2>

                    <div className="tech-visual" style={{ maxWidth: '800px', height: 'auto', minHeight: 'auto' }}>
                        <div className="terminal-window" style={{ width: '100%' }}>
                            <div className="terminal-line">pip install alphallm</div>
                            <div className="terminal-line">from alphallm import FinancialLLM</div>
                            <div className="terminal-line"></div>
                            <div className="terminal-line">model = FinancialLLM.load("alphallm-7b")</div>
                            <div className="terminal-line">sentiment = model.analyze(earnings_transcript)</div>
                            <div className="terminal-line blink-cursor"></div>
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                        <a href="https://github.com/wealthnomic" className="cta-button" target="_blank" rel="noopener noreferrer">
                            View on GitHub
                        </a>
                        <Link to="/" className="cta-button outline" style={{ marginLeft: '20px' }}>
                            Back to Home
                        </Link>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AlphaLLMPage
