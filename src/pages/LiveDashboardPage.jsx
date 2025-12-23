import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Sample dashboard data
const dashboardData = {
    portfolioValue: 1250000,
    dailyPnL: 12500,
    dailyReturn: 1.01,
    monthlyReturn: 4.23,
    yearlyReturn: 18.7,
    sharpeRatio: 2.1,
    maxDrawdown: -8.3,
    winRate: 62.5,
    positions: [
        { symbol: 'AAPL', qty: 500, avgPrice: 175.50, currentPrice: 182.30, pnl: 3400, pnlPct: 3.87 },
        { symbol: 'NVDA', qty: 200, avgPrice: 485.00, currentPrice: 510.25, pnl: 5050, pnlPct: 5.21 },
        { symbol: 'MSFT', qty: 300, avgPrice: 378.00, currentPrice: 385.60, pnl: 2280, pnlPct: 2.01 },
        { symbol: 'GOOGL', qty: 150, avgPrice: 142.50, currentPrice: 145.80, pnl: 495, pnlPct: 2.32 },
        { symbol: 'SPY', qty: 400, avgPrice: 495.00, currentPrice: 503.40, pnl: 3360, pnlPct: 1.70 }
    ],
    equityCurve: [
        100, 102, 101, 105, 108, 106, 110, 112, 115, 113, 118, 120,
        119, 123, 125, 128, 126, 130, 133, 135, 138, 140, 142, 145
    ]
}

function LiveDashboardPage() {
    const [data] = useState(dashboardData)
    const [showDisclaimer, setShowDisclaimer] = useState(true)
    const [currentTime, setCurrentTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div style={{
            fontFamily: "'Space Mono', monospace",
            background: '#0a0a0a',
            color: '#fff',
            minHeight: '100vh',
            border: '3px solid #39ff14'
        }}>
            {/* Disclaimer Popup */}
            {showDisclaimer && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#111',
                        border: '3px solid #ff6600',
                        padding: '40px',
                        maxWidth: '500px',
                        boxShadow: '8px 8px 0 #ff6600'
                    }}>
                        <h2 style={{ color: '#ff6600', marginTop: 0 }}>⚠️ DISCLAIMER</h2>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                            This dashboard is for <strong>track record demonstration purposes only</strong>.
                        </p>
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Past performance is not indicative of future results. The information provided
                            is not financial advice and should not be used for making investment decisions.
                        </p>
                        <button
                            onClick={() => setShowDisclaimer(false)}
                            style={{
                                marginTop: '20px',
                                padding: '15px 30px',
                                background: '#ff6600',
                                color: '#000',
                                border: '2px solid #000',
                                fontFamily: 'inherit',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '4px 4px 0 #000'
                            }}
                        >
                            I UNDERSTAND
                        </button>
                    </div>
                </div>
            )}

            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 40px',
                borderBottom: '2px solid #333'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link to="/" style={{ color: '#888', fontSize: '0.9rem' }}>
                        ← BACK TO HOME
                    </Link>
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
                        WEALTH<span style={{ color: '#39ff14' }}>NOMICS</span> LIVE
                    </h1>
                    <span style={{
                        background: '#39ff14',
                        color: '#000',
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        animation: 'pulse 2s infinite'
                    }}>
                        LIVE
                    </span>
                </div>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>
                    {currentTime.toLocaleString()}
                </div>
            </header>

            {/* Main Grid */}
            <main style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: 'calc(100vh - 80px)' }}>
                {/* Sidebar */}
                <aside style={{ borderRight: '2px solid #333', padding: '30px 20px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>PORTFOLIO VALUE</div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                            ${data.portfolioValue.toLocaleString()}
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>TODAY'S P&L</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: data.dailyPnL >= 0 ? '#39ff14' : '#ff3939' }}>
                            {data.dailyPnL >= 0 ? '+' : ''}{data.dailyPnL.toLocaleString()} ({data.dailyReturn.toFixed(2)}%)
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #333', paddingTop: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: '#888' }}>MTD</span>
                            <span style={{ color: data.monthlyReturn >= 0 ? '#39ff14' : '#ff3939' }}>
                                {data.monthlyReturn >= 0 ? '+' : ''}{data.monthlyReturn}%
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: '#888' }}>YTD</span>
                            <span style={{ color: data.yearlyReturn >= 0 ? '#39ff14' : '#ff3939' }}>
                                {data.yearlyReturn >= 0 ? '+' : ''}{data.yearlyReturn}%
                            </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: '#888' }}>Sharpe</span>
                            <span>{data.sharpeRatio}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span style={{ color: '#888' }}>Max DD</span>
                            <span style={{ color: '#ff3939' }}>{data.maxDrawdown}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Win Rate</span>
                            <span>{data.winRate}%</span>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div style={{ padding: '30px' }}>
                    {/* Equity Curve */}
                    <section style={{ marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '1rem', color: '#888', marginBottom: '20px' }}>EQUITY CURVE</h2>
                        <div style={{
                            background: '#111',
                            border: '2px solid #333',
                            padding: '30px',
                            height: '200px',
                            display: 'flex',
                            alignItems: 'flex-end',
                            gap: '3px'
                        }}>
                            {data.equityCurve.map((val, i) => (
                                <div
                                    key={i}
                                    style={{
                                        flex: 1,
                                        height: `${(val - 95) * 5}%`,
                                        background: val > data.equityCurve[0] ? '#39ff14' : '#ff3939',
                                        transition: 'height 0.3s'
                                    }}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Positions */}
                    <section>
                        <h2 style={{ fontSize: '1rem', color: '#888', marginBottom: '20px' }}>OPEN POSITIONS</h2>
                        <div style={{
                            background: '#111',
                            border: '2px solid #333',
                            overflow: 'hidden'
                        }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #333' }}>
                                        <th style={{ padding: '15px', textAlign: 'left', color: '#888' }}>SYMBOL</th>
                                        <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>QTY</th>
                                        <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>AVG PRICE</th>
                                        <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>CURRENT</th>
                                        <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>P&L</th>
                                        <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.positions.map((pos, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                                            <td style={{ padding: '15px', fontWeight: 700 }}>{pos.symbol}</td>
                                            <td style={{ padding: '15px', textAlign: 'right' }}>{pos.qty}</td>
                                            <td style={{ padding: '15px', textAlign: 'right' }}>${pos.avgPrice.toFixed(2)}</td>
                                            <td style={{ padding: '15px', textAlign: 'right' }}>${pos.currentPrice.toFixed(2)}</td>
                                            <td style={{
                                                padding: '15px',
                                                textAlign: 'right',
                                                color: pos.pnl >= 0 ? '#39ff14' : '#ff3939'
                                            }}>
                                                {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toLocaleString()}
                                            </td>
                                            <td style={{
                                                padding: '15px',
                                                textAlign: 'right',
                                                color: pos.pnlPct >= 0 ? '#39ff14' : '#ff3939'
                                            }}>
                                                {pos.pnlPct >= 0 ? '+' : ''}{pos.pnlPct}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
        </div>
    )
}

export default LiveDashboardPage
