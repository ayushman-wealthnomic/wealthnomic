import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function LiveDashboardPage() {
    const [data, setData] = useState(null)
    const [showDisclaimer, setShowDisclaimer] = useState(true)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        // Fetch the live dashboard data
        fetch('/live_dashboard_data.json')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error('Error loading data:', err))

        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    if (!data) {
        return (
            <div style={{
                fontFamily: "'Space Mono', monospace",
                background: '#0a0a0a',
                color: '#fff',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div>Loading...</div>
            </div>
        )
    }

    // Calculate additional metrics
    const calculateMetrics = (trades) => {
        const wins = trades.filter(t => t.profit > 0)
        const losses = trades.filter(t => t.profit < 0)

        const winRate = trades.length > 0 ? ((wins.length / trades.length) * 100).toFixed(1) : 0
        const avgWin = wins.length > 0 ? wins.reduce((sum, t) => sum + t.profit, 0) / wins.length : 0
        const avgLoss = losses.length > 0 ? losses.reduce((sum, t) => sum + t.profit, 0) / losses.length : 0

        const totalWins = wins.reduce((sum, t) => sum + t.profit, 0)
        const totalLosses = Math.abs(losses.reduce((sum, t) => sum + t.profit, 0))
        const profitFactor = totalLosses > 0 ? (totalWins / totalLosses).toFixed(2) : '--'

        return { winRate, avgWin, avgLoss, profitFactor, totalTrades: trades.length }
    }

    const metrics = calculateMetrics(data.recent_trades)

    return (
        <div style={{
            fontFamily: "'Space Mono', monospace",
            background: '#0a0a0a',
            color: '#fff',
            minHeight: '100vh',
            border: '3px solid #3B82F6'
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
                            I UNDERSTAND - ENTER TERMINAL
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
                    <Link to="/" style={{ color: '#888', fontSize: '0.9rem', textDecoration: 'none' }}>
                        ← BACK TO HOME
                    </Link>
                    <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
                        WEALTH<span style={{ color: '#3B82F6' }}>NOMICS</span> LIVE
                    </h1>
                    <span style={{
                        background: '#3B82F6',
                        color: '#fff',
                        padding: '3px 8px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        animation: 'pulse 2s infinite'
                    }}>
                        {data.strategy_version}
                    </span>
                </div>
                <div style={{ color: '#888', fontSize: '0.9rem' }}>
                    {currentTime.toLocaleString()}
                </div>
            </header>

            {/* Tab Navigation */}
            <div style={{
                display: 'flex',
                borderBottom: '2px solid #333',
                padding: '0 40px',
                background: '#111'
            }}>
                {['overview', 'positions', 'trades', 'performance'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '15px 30px',
                            background: activeTab === tab ? '#3B82F6' : 'transparent',
                            color: activeTab === tab ? '#fff' : '#888',
                            border: 'none',
                            borderRight: '1px solid #333',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            fontWeight: activeTab === tab ? 700 : 400,
                            textTransform: 'uppercase',
                            fontSize: '0.8rem'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <main style={{ padding: '40px' }}>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div>
                        {/* KPI Cards */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '30px',
                            marginBottom: '40px'
                        }}>
                            <div style={{
                                background: '#111',
                                border: '2px solid #00ccff',
                                padding: '30px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>TOTAL EQUITY</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>
                                    ${data.current_equity.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                            </div>
                            <div style={{
                                background: '#111',
                                border: '2px solid #333',
                                padding: '30px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>TOTAL RETURN</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: data.total_return_pct >= 0 ? '#3B82F6' : '#ff3939' }}>
                                    {data.total_return_pct >= 0 ? '+' : ''}{data.total_return_pct.toFixed(2)}%
                                </div>
                            </div>
                            <div style={{
                                background: '#111',
                                border: '2px solid #3B82F6',
                                padding: '30px',
                                textAlign: 'center'
                            }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>PROFIT/LOSS</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: data.total_pnl >= 0 ? '#3B82F6' : '#ff3939' }}>
                                    ${data.total_pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '20px',
                            marginBottom: '40px'
                        }}>
                            <div style={{ background: '#111', border: '1px solid #333', padding: '20px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.7rem', marginBottom: '8px' }}>STRATEGY</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{data.strategy_version}</div>
                            </div>
                            <div style={{ background: '#111', border: '1px solid #333', padding: '20px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.7rem', marginBottom: '8px' }}>ACTIVE POSITIONS</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{data.active_positions.length}</div>
                            </div>
                            <div style={{ background: '#111', border: '1px solid #333', padding: '20px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.7rem', marginBottom: '8px' }}>TODAY'S P&L</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: data.today_pnl >= 0 ? '#3B82F6' : '#ff3939' }}>
                                    ${data.today_pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </div>
                            </div>
                            <div style={{ background: '#111', border: '1px solid #333', padding: '20px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.7rem', marginBottom: '8px' }}>LIVE SINCE</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{data.live_start_date}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Positions Tab */}
                {activeTab === 'positions' && (
                    <div style={{ background: '#111', border: '2px solid #333', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #333' }}>
                                    <th style={{ padding: '15px', textAlign: 'left', color: '#888' }}>SYMBOL</th>
                                    <th style={{ padding: '15px', textAlign: 'left', color: '#888' }}>ENTRY DATE</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>SIZE</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>ENTRY</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>CURRENT</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>P&L ($)</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>P&L (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.active_positions.map((pos, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                                        <td style={{ padding: '15px', fontWeight: 700 }}>{pos.symbol}</td>
                                        <td style={{ padding: '15px' }}>{pos.entry_date}</td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>${pos.size.toLocaleString()}</td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>${pos.entry_price.toFixed(2)}</td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>${pos.current_price.toFixed(2)}</td>
                                        <td style={{
                                            padding: '15px',
                                            textAlign: 'right',
                                            color: pos.pnl >= 0 ? '#3B82F6' : '#ff3939'
                                        }}>
                                            {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                                        </td>
                                        <td style={{
                                            padding: '15px',
                                            textAlign: 'right',
                                            color: pos.pnl_pct >= 0 ? '#3B82F6' : '#ff3939'
                                        }}>
                                            {pos.pnl_pct >= 0 ? '+' : ''}{pos.pnl_pct.toFixed(2)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Trades Tab */}
                {activeTab === 'trades' && (
                    <div style={{ background: '#111', border: '2px solid #333', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #333' }}>
                                    <th style={{ padding: '15px', textAlign: 'left', color: '#888' }}>DATE</th>
                                    <th style={{ padding: '15px', textAlign: 'left', color: '#888' }}>SYMBOL</th>
                                    <th style={{ padding: '15px', textAlign: 'left', color: '#888' }}>EXIT TYPE</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>PROFIT ($)</th>
                                    <th style={{ padding: '15px', textAlign: 'right', color: '#888' }}>RETURN (%)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.recent_trades.map((trade, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                                        <td style={{ padding: '15px' }}>{trade.date}</td>
                                        <td style={{ padding: '15px', fontWeight: 700 }}>{trade.symbol}</td>
                                        <td style={{ padding: '15px', fontSize: '0.75rem' }}>{trade.type}</td>
                                        <td style={{
                                            padding: '15px',
                                            textAlign: 'right',
                                            color: trade.profit >= 0 ? '#3B82F6' : '#ff3939'
                                        }}>
                                            {trade.profit >= 0 ? '+' : ''}${trade.profit.toFixed(2)}
                                        </td>
                                        <td style={{
                                            padding: '15px',
                                            textAlign: 'right',
                                            color: trade.profit >= 0 ? '#3B82F6' : '#ff3939'
                                        }}>
                                            {trade.return_pct}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Performance Tab */}
                {activeTab === 'performance' && (
                    <div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '30px'
                        }}>
                            <div style={{ background: '#111', border: '2px solid #333', padding: '30px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>WIN RATE</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3B82F6' }}>{metrics.winRate}%</div>
                            </div>
                            <div style={{ background: '#111', border: '2px solid #333', padding: '30px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>AVG WIN</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3B82F6' }}>
                                    ${metrics.avgWin.toFixed(2)}
                                </div>
                            </div>
                            <div style={{ background: '#111', border: '2px solid #333', padding: '30px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>AVG LOSS</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ff3939' }}>
                                    ${metrics.avgLoss.toFixed(2)}
                                </div>
                            </div>
                            <div style={{ background: '#111', border: '2px solid #333', padding: '30px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>TOTAL TRADES</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{metrics.totalTrades}</div>
                            </div>
                            <div style={{ background: '#111', border: '2px solid #333', padding: '30px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>PROFIT FACTOR</div>
                                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#3B82F6' }}>{metrics.profitFactor}</div>
                            </div>
                            <div style={{ background: '#111', border: '2px solid #333', padding: '30px', textAlign: 'center' }}>
                                <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>START CAPITAL</div>
                                <div style={{
                                    fontSize: '2rem', fontWeight: 700' }}>
                                    ${data.start_capital.toLocaleString()}
                                </div>
                        </div>
                    </div>
                    </div>
    )
}
            </main >

    <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
        </div >
    )
}

export default LiveDashboardPage
