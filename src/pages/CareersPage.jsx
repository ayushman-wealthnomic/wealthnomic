import { Link } from 'react-router-dom'

function CareersPage() {
    const openings = [
        {
            title: 'Senior ML Engineer',
            location: 'Remote / SF',
            type: 'Full-time',
            description: 'Build and deploy production ML models for financial prediction and analysis.'
        },
        {
            title: 'Quantitative Researcher',
            location: 'Remote',
            type: 'Full-time',
            description: 'Develop novel alpha strategies and conduct research on market microstructure.'
        },
        {
            title: 'Full Stack Developer',
            location: 'Remote',
            type: 'Full-time',
            description: 'Build the next generation of AI-powered financial tools and dashboards.'
        },
        {
            title: 'DevOps Engineer',
            location: 'Remote',
            type: 'Contract',
            description: 'Scale our infrastructure to handle millions of predictions per day.'
        }
    ]

    return (
        <>
            <header className="blog-hero">
                <div className="container">
                    <span className="mono-text" style={{ display: 'block', marginBottom: '20px' }}>// CAREERS</span>
                    <h1 className="page-title">Join the Foundation</h1>
                    <p className="page-subtitle">
                        We're building the future of financial AI. Join a team of researchers, engineers, and
                        quants pushing the boundaries of what's possible.
                    </p>
                </div>
            </header>

            <main className="container" style={{ padding: '100px 40px' }}>
                <div style={{ marginBottom: '60px' }}>
                    <h2 className="section-heading">Why Wealthnomics?</h2>
                    <div className="grid-3">
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-rocket"></i></div>
                            <h3>Cutting Edge</h3>
                            <p>Work on the latest in LLMs, multi-agent systems, and RL for finance.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-globe"></i></div>
                            <h3>Remote First</h3>
                            <p>Work from anywhere. We believe talent is global.</p>
                        </div>
                        <div className="card">
                            <div className="card-icon"><i className="fas fa-chart-line"></i></div>
                            <h3>Real Impact</h3>
                            <p>Your work directly affects trading decisions and market outcomes.</p>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: 'var(--border-width) solid var(--border-color)', paddingTop: '80px' }}>
                    <span className="section-label">OPEN POSITIONS</span>
                    <h2 className="section-heading">Current Openings</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {openings.map((job, i) => (
                            <div key={i} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ marginBottom: '10px' }}>{job.title}</h3>
                                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '10px' }}>
                                        {job.location} • {job.type}
                                    </p>
                                    <p style={{ fontSize: '1rem', marginBottom: 0 }}>{job.description}</p>
                                </div>
                                <Link to="/signup" className="card-link" style={{ flexShrink: 0, marginLeft: '30px' }}>
                                    APPLY →
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ marginTop: '100px', textAlign: 'center', padding: '60px', background: '#f8f8f8', border: 'var(--border-width) solid #000', boxShadow: 'var(--box-shadow)' }}>
                    <h2>Don't see your role?</h2>
                    <p style={{ maxWidth: '600px', margin: '0 auto 30px', fontFamily: 'var(--font-mono)' }}>
                        We're always looking for exceptional people. Send us your resume and tell us how you'd contribute.
                    </p>
                    <a href="mailto:careers@wealthnomic.com" className="cta-button">
                        Get in Touch
                    </a>
                </div>
            </main>
        </>
    )
}

export default CareersPage
