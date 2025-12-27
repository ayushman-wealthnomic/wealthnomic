import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div style={{ background: '#fff', minHeight: '100vh', color: '#333', overflowX: 'hidden' }}>

            {/* Hero Section */}
            <header style={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '0 5%',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                overflow: 'hidden'
            }}>
                <div className="network-lines"></div>
                <div className="floating-orb orb-1"></div>
                <div className="floating-orb orb-2"></div>

                <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px' }}>
                    <div style={{
                        textTransform: 'uppercase',
                        letterSpacing: '0.3em',
                        color: '#888',
                        fontSize: '0.75rem',
                        marginBottom: '30px',
                        fontWeight: 600
                    }}>
                        Systematic Global Macro &bull; AI-Native Capital Management
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                        fontWeight: 300,
                        lineHeight: 1.15,
                        marginBottom: '35px',
                        color: '#1a1a1a',
                        maxWidth: '850px'
                    }}>
                        Where <span style={{ fontWeight: 700, color: '#000' }}>disciplined capital</span> meets
                        <br /><span style={{ fontWeight: 700, color: '#000' }}>machine intelligence.</span>
                    </h1>
                    <p style={{
                        fontSize: '1.15rem',
                        lineHeight: 1.7,
                        maxWidth: '550px',
                        marginBottom: '45px',
                        color: '#555'
                    }}>
                        Wealthnomics is a new generation quantitative fund. We deploy AI-driven systematic
                        strategies across global equities, building alpha through organizational asymmetry
                        and risk-aware execution.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <a href="#philosophy" className="btn-tower">
                            INVESTMENT PHILOSOPHY
                        </a>
                        <a href="mailto:ir@wealthnomic.com" className="btn-tower light-outline">
                            INVESTOR RELATIONS
                        </a>
                    </div>
                </div>
            </header>

            {/* Performance Metrics Bar */}
            <section style={{ background: '#0a0a0a', color: '#fff', padding: '70px 5%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '40px',
                        textAlign: 'center'
                    }}>
                        <div>
                            <div className="stat-val">+41%</div>
                            <div className="stat-label">CAGR</div>
                        </div>
                        <div>
                            <div className="stat-val">3.19</div>
                            <div className="stat-label">Sharpe Ratio</div>
                        </div>
                        <div>
                            <div className="stat-val">&lt;11%</div>
                            <div className="stat-label">Max Drawdown</div>
                        </div>
                        <div>
                            <div className="stat-val">&gt;1.8</div>
                            <div className="stat-label">Information Ratio</div>
                        </div>
                        <div>
                            <div className="stat-val">$—M</div>
                            <div className="stat-label">AUM</div>
                        </div>
                    </div>
                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        fontSize: '0.75rem',
                        marginTop: '30px',
                        fontStyle: 'italic'
                    }}>
                        Past performance is not indicative of future results. Figures based on backtested and live track record.
                    </p>
                </div>
            </section>

            {/* The Quote / Philosophy Anchor */}
            <section id="philosophy" style={{ padding: '120px 5%', textAlign: 'center', background: '#fff' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                        fontWeight: 300,
                        lineHeight: 1.5,
                        color: '#222',
                        marginBottom: '50px'
                    }}>
                        <span style={{ color: '#00cc7a', fontSize: '3rem', lineHeight: 0, verticalAlign: 'sub' }}>"</span>
                        Markets will always change. Models will always evolve.<br />
                        But the need for <strong>disciplined capital allocation</strong> under uncertainty never goes away.
                        <span style={{ color: '#00cc7a', fontSize: '3rem', lineHeight: 0 }}>"</span>
                    </h2>
                    <div style={{ width: '80px', height: '3px', background: '#00cc7a', margin: '0 auto' }}></div>
                </div>
            </section>

            {/* The Origin Story */}
            <section style={{ padding: '100px 5%', background: '#fafafa' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 450px' }}>
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#888',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            marginBottom: '20px'
                        }}>
                            Our Genesis
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '30px', color: '#1a1a1a' }}>
                            Born from the belief that <strong>alpha is systematic.</strong>
                        </h2>
                        <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '20px', fontSize: '1.05rem' }}>
                            Wealthnomics was founded by a team of engineers, data scientists, and portfolio managers
                            who saw a fundamental inefficiency in how capital is managed: <strong>human bias</strong>.
                        </p>
                        <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '20px', fontSize: '1.05rem' }}>
                            Discretionary managers anchor to narratives. They get tired. They override their own
                            rules under pressure. We asked: what if we could build an organization that never does?
                        </p>
                        <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1.05rem' }}>
                            The result is a <strong>fully autonomous investment engine</strong> — one that executes
                            policy with perfect consistency, learns from live capital feedback, and operates under
                            an immutable risk constitution.
                        </p>
                    </div>
                    <div style={{ flex: '1 1 350px' }}>
                        <div style={{
                            background: '#111',
                            borderRadius: '8px',
                            padding: '40px',
                            color: '#00cc7a',
                            fontFamily: 'monospace',
                            fontSize: '13px',
                            lineHeight: 1.6,
                            boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
                        }}>
                            <span style={{ color: '#888' }}># DECISION LOG — ENTRY 7,432</span><br /><br />
                            &gt; market_regime: <span style={{ color: '#fff' }}>VOLATILE</span><br />
                            &gt; human_recommendation: <span style={{ color: '#ff6b6b' }}>OVERRIDE_STOP</span><br />
                            &gt; system_action: <span style={{ color: '#00cc7a' }}>HOLD_POLICY</span><br /><br />
                            <span style={{ color: '#888' }}># Outcome: +2.3% vs benchmark</span><br />
                            <span style={{ color: '#888' }}># Lesson: consistency &gt; conviction</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Investment Pillars */}
            <section style={{ padding: '120px 5%', background: '#fff' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#888',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            marginBottom: '15px'
                        }}>
                            Our Edge
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, color: '#1a1a1a' }}>
                            Four pillars of <strong>organizational asymmetry.</strong>
                        </h2>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '30px'
                    }}>
                        <div className="pillar-card">
                            <div className="pillar-number">01</div>
                            <h3>Risk Constitution</h3>
                            <p>
                                Every model operates inside an immutable framework: drawdown limits, exposure ceilings,
                                liquidity filters, correlation shock resistance. No exceptions. No overrides.
                            </p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-number">02</div>
                            <h3>Portfolio-Level Learning</h3>
                            <p>
                                We don't just optimize trades — we optimize capital flows. The system learns when
                                <em> not</em> to allocate, when diversification breaks, and how much conviction
                                deserves real dollars.
                            </p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-number">03</div>
                            <h3>Live Capital Feedback</h3>
                            <p>
                                Real money creates slippage, liquidity stress, and behavioral pressure. Our models
                                learn from decisions made under live stress — data that cannot be bought or simulated.
                            </p>
                        </div>
                        <div className="pillar-card">
                            <div className="pillar-number">04</div>
                            <h3>Execution Discipline</h3>
                            <p>
                                Humans get tired. They anchor to narratives. They override rules under pressure.
                                Wealthnomics executes policy consistently, logs every decision, and never violates constraints.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Presence */}
            <section style={{ padding: '100px 5%', background: '#0a0a0a', color: '#fff' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '60px', alignItems: 'center' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <div style={{
                            fontSize: '0.75rem',
                            color: '#666',
                            textTransform: 'uppercase',
                            letterSpacing: '0.2em',
                            marginBottom: '20px'
                        }}>
                            Global Footprint
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '30px' }}>
                            Trading across <strong style={{ color: '#00cc7a' }}>50+ global markets.</strong>
                        </h2>
                        <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '20px' }}>
                            Our systematic strategies span U.S. equities, European indices, Asian markets,
                            and emerging economies. We seek alpha where others see noise.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#888' }}>
                            <li style={{ padding: '10px 0', borderBottom: '1px solid #222' }}>
                                <strong style={{ color: '#fff' }}>Americas:</strong> NYSE, NASDAQ, TSX
                            </li>
                            <li style={{ padding: '10px 0', borderBottom: '1px solid #222' }}>
                                <strong style={{ color: '#fff' }}>Europe:</strong> LSE, Euronext, XETRA
                            </li>
                            <li style={{ padding: '10px 0', borderBottom: '1px solid #222' }}>
                                <strong style={{ color: '#fff' }}>Asia-Pacific:</strong> NSE, SGX, ASX, HKEX
                            </li>
                        </ul>
                    </div>
                    <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
                        <div style={{
                            fontSize: '8rem',
                            fontWeight: 800,
                            color: '#1a1a1a',
                            lineHeight: 1
                        }}>
                            24<span style={{ fontSize: '4rem' }}>/</span>5
                        </div>
                        <div style={{ color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem' }}>
                            Market Coverage
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Wealthnomics — For Investors */}
            <section style={{ padding: '120px 5%', background: '#fff' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{
                        fontSize: '0.75rem',
                        color: '#888',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        marginBottom: '20px'
                    }}>
                        For Investors
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 400, marginBottom: '50px', color: '#1a1a1a' }}>
                        Why allocate to <strong>Wealthnomics?</strong>
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '40px',
                        textAlign: 'left'
                    }}>
                        <div>
                            <h4 style={{ color: '#00cc7a', marginBottom: '15px' }}>Uncorrelated Alpha</h4>
                            <p style={{ color: '#555', lineHeight: 1.7 }}>
                                Our systematic approach generates returns with low correlation to traditional
                                long-only equity and fixed income portfolios.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ color: '#00cc7a', marginBottom: '15px' }}>Risk-First Design</h4>
                            <p style={{ color: '#555', lineHeight: 1.7 }}>
                                Drawdown control is not an afterthought — it's encoded into every layer of our
                                investment process, from signal generation to execution.
                            </p>
                        </div>
                        <div>
                            <h4 style={{ color: '#00cc7a', marginBottom: '15px' }}>Transparency</h4>
                            <p style={{ color: '#555', lineHeight: 1.7 }}>
                                We provide investors with detailed attribution reports, risk analytics, and
                                real-time portfolio insights through our secure investor portal.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ background: '#111', padding: '120px 5%', color: '#fff', textAlign: 'center' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.8rem', marginBottom: '25px', fontWeight: 300 }}>
                        Ready to discuss an allocation?
                    </h2>
                    <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '40px', lineHeight: 1.7 }}>
                        We work with institutional investors, family offices, and qualified individuals
                        who share our long-term, risk-aware perspective.
                    </p>
                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="mailto:ir@wealthnomic.com" className="btn-tower light">
                            CONTACT INVESTOR RELATIONS
                        </a>
                        <Link to="/products" className="btn-tower light-border">
                            VIEW TECHNOLOGY STACK
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                .btn-tower {
                    display: inline-block;
                    padding: 16px 32px;
                    border: 2px solid #1a1a1a;
                    background: #1a1a1a;
                    color: #fff;
                    text-decoration: none;
                    font-weight: 600;
                    letter-spacing: 0.1em;
                    font-size: 0.8rem;
                    transition: all 0.3s ease;
                }
                .btn-tower:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
                }
                .btn-tower.light {
                    border-color: #fff;
                    background: #fff;
                    color: #000;
                }
                .btn-tower.light:hover {
                    background: #00cc7a;
                    border-color: #00cc7a;
                    color: #fff;
                }
                .btn-tower.light-outline {
                    background: transparent;
                    color: #1a1a1a;
                }
                .btn-tower.light-outline:hover {
                    background: #1a1a1a;
                    color: #fff;
                }
                .btn-tower.light-border {
                    background: transparent;
                    border-color: #555;
                    color: #fff;
                }
                .btn-tower.light-border:hover {
                    border-color: #fff;
                }

                .stat-val {
                    font-size: 3rem;
                    font-weight: 700;
                    color: #00cc7a;
                    margin-bottom: 8px;
                }
                .stat-label {
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    font-size: 0.7rem;
                    color: #666;
                }

                .pillar-card {
                    padding: 40px;
                    background: #fafafa;
                    border: 1px solid #eee;
                    transition: all 0.3s ease;
                    position: relative;
                }
                .pillar-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
                    border-color: #00cc7a;
                }
                .pillar-card .pillar-number {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: #00cc7a;
                    margin-bottom: 15px;
                    letter-spacing: 0.1em;
                }
                .pillar-card h3 {
                    font-size: 1.3rem;
                    margin-bottom: 15px;
                    color: #1a1a1a;
                    font-weight: 600;
                }
                .pillar-card p {
                    color: #666;
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                .network-lines {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: 
                        linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
                    background-size: 50px 50px;
                    z-index: 1;
                }

                .floating-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    z-index: 0;
                }
                .orb-1 {
                    width: 400px;
                    height: 400px;
                    background: rgba(0, 204, 122, 0.15);
                    top: -100px;
                    right: 10%;
                    animation: float 15s ease-in-out infinite;
                }
                .orb-2 {
                    width: 300px;
                    height: 300px;
                    background: rgba(100, 100, 255, 0.08);
                    bottom: -50px;
                    left: 5%;
                    animation: float 20s ease-in-out infinite reverse;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-30px) translateX(20px); }
                }
            `}</style>
        </div>
    )
}

export default HomePage
