import { Link } from 'react-router-dom'

const blogPosts = [
    {
        slug: 'monte-carlo-simulation',
        title: 'Monte Carlo Methods in Risk Adjusted Portfolios',
        category: 'QUANTITATIVE METHODS',
        excerpt: 'Why deterministic models fail in chaotic markets, and how probabilistic simulation provides a truer edge.',
        image: 'FEATURED_IMG_01',
        featured: true
    },
    {
        slug: 'art-of-exit',
        title: 'The Art of the Exit',
        category: 'TRADING PSYCHOLOGY',
        excerpt: 'Most systems fail not on entry, but on position sizing and exit protocols.',
        image: 'PSYCHOLOGY'
    },
    {
        slug: '300k-trap',
        title: 'The $300k Trap',
        category: 'CAREER INSIGHTS',
        excerpt: 'Why mid-level quantitative finance salaries can become a golden cage.',
        image: 'CAREER'
    },
    {
        slug: 'advanced-risk-management',
        title: 'Advanced Risk Models',
        category: 'RISK MANAGEMENT',
        excerpt: 'Moving beyond VaR to Expected Shortfall and Tail Risk hedging.',
        image: 'RISK'
    },
    {
        slug: 'machine-learning-trading',
        title: 'ML in Live Markets',
        category: 'AI & ML',
        excerpt: 'Practical applications of supervised learning for alpha generation.',
        image: 'ML / AI'
    },
    {
        slug: 'memento-financial-ai',
        title: 'Memento Financial AI',
        category: 'AI ARCHITECTURE',
        excerpt: 'Designing memory systems for autonomous trading agents.',
        image: 'ARCHITECTURE'
    },
    {
        slug: 'portfolios-age-of-algorithms',
        title: 'Algorithmic Portfolios',
        category: 'SYSTEMATIC INVESTING',
        excerpt: 'Modern portfolio theory in the age of high-frequency execution.',
        image: 'PORTFOLIO'
    },
    {
        slug: 'position-sizing',
        title: 'Optimal Position Sizing',
        category: 'QUANTITATIVE MATH',
        excerpt: 'Kelly Criterion and fractional sizing for long-term survival.',
        image: 'MATH'
    },
    {
        slug: 'trading-strategy-lifecycle',
        title: 'Strategy Lifecycle',
        category: 'SYSTEM DESIGN',
        excerpt: 'From backtest to production: managing alpha decay.',
        image: 'LIFECYCLE'
    }
]

function BlogPage() {
    const featured = blogPosts.find(p => p.featured)
    const articles = blogPosts.filter(p => !p.featured)

    return (
        <>
            <header className="blog-hero">
                <div className="container">
                    <span className="mono-text" style={{ display: 'block', marginBottom: '20px' }}>// ARTICLES</span>
                    <h1 className="page-title">Calculated Perspectives</h1>
                    <p className="page-subtitle">
                        Quantitative research, trading insights, and systematic investing perspectives from
                        the Wealthnomic team.
                    </p>
                </div>
            </header>

            <main className="container" style={{ padding: '100px 40px' }}>
                {/* Featured Article */}
                {featured && (
                    <Link to={`/blog/${featured.slug}`} className="featured-article">
                        <div className="featured-image">
                            <span className="mono-text" style={{ color: '#000' }}>{featured.image}</span>
                        </div>
                        <div className="featured-content">
                            <span className="article-meta">{featured.category}</span>
                            <h2>{featured.title}</h2>
                            <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-mono)', marginBottom: '30px' }}>
                                {featured.excerpt}
                            </p>
                            <span className="mono-text" style={{ color: 'var(--text-main)', borderBottom: '2px solid #000' }}>
                                READ ANALYSIS →
                            </span>
                        </div>
                    </Link>
                )}

                <div style={{ borderTop: 'var(--border-width) solid var(--border-color)', paddingTop: '80px' }}>
                    <span
                        className="section-label"
                        style={{
                            background: 'var(--accent-green)',
                            color: '#000',
                            padding: '5px 10px',
                            fontWeight: 700,
                            border: '2px solid #000',
                            display: 'inline-block',
                            marginBottom: '40px',
                            boxShadow: '4px 4px 0 #000'
                        }}
                    >
                        ALL ARTICLES
                    </span>

                    <div className="article-grid">
                        {articles.map(post => (
                            <Link key={post.slug} to={`/blog/${post.slug}`} className="article-card">
                                <div className="card-image">{post.image}</div>
                                <div className="card-body">
                                    <span className="article-meta">{post.category}</span>
                                    <h3>{post.title}</h3>
                                    <p className="card-excerpt">{post.excerpt}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}

export default BlogPage
