import React, { useState } from 'react'
import NewsletterModal from '../components/NewsletterModal'

function NewsletterPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <header style={{
                padding: '100px 5%',
                background: '#fafafa',
                borderBottom: '3px solid #000',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-block',
                        background: '#000',
                        color: '#fff',
                        padding: '5px 15px',
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                    }}>
                        Wealthnomics Intelligence
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        marginBottom: '25px',
                        lineHeight: 1.1,
                        textTransform: 'uppercase'
                    }}>
                        Numbers, People, & <br /><span style={{ color: '#00cc7a' }}>Machine Intelligence</span>
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#555',
                        maxWidth: '650px',
                        margin: '0 auto 40px',
                        lineHeight: 1.6
                    }}>
                        Irregular insights about systematic alpha, AI-native leadership, and the future of global capital. Directly from the architect.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            padding: '18px 40px',
                            background: '#00cc7a',
                            color: '#fff',
                            border: '3px solid #000',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            boxShadow: '6px 6px 0 #000',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseOver={e => {
                            e.target.style.transform = 'translate(-2px, -2px)'
                            e.target.style.boxShadow = '8px 8px 0 #000'
                        }}
                        onMouseOut={e => {
                            e.target.style.transform = 'translate(0, 0)'
                            e.target.style.boxShadow = '6px 6px 0 #000'
                        }}
                    >
                        Subscribe for Free
                    </button>
                </div>
            </header>

            {/* Archive / Preview Section (Placeholder) */}
            <section style={{ padding: '80px 5%', flex: 1, background: '#fff' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '50px', borderLeft: '5px solid #00cc7a', paddingLeft: '20px' }}>
                        Recent Issues
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {[
                            {
                                date: 'OCT 24, 2025',
                                title: 'The Volatility Smile: Why Options Are Mispricing Tail Risk',
                                tag: 'Market Mechanics'
                            },
                            {
                                date: 'OCT 17, 2025',
                                title: 'Deconstructing the Momentum Crash of Q3',
                                tag: 'Post-Mortem'
                            },
                            {
                                date: 'OCT 10, 2025',
                                title: 'Transformer Models in High Frequency Trading',
                                tag: 'AI Research'
                            }
                        ].map((item, index) => (
                            <div key={index} style={{
                                border: '2px solid #eee',
                                padding: '30px',
                                transition: 'all 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseOver={e => {
                                    e.currentTarget.style.borderColor = '#000'
                                    e.currentTarget.style.transform = 'translateY(-5px)'
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.borderColor = '#eee'
                                    e.currentTarget.style.transform = 'translateY(0)'
                                }}
                            >
                                <div style={{
                                    fontSize: '0.8rem',
                                    color: '#888',
                                    fontWeight: 'bold',
                                    marginBottom: '15px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <span>{item.date}</span>
                                    <span style={{ color: '#00cc7a' }}>{item.tag}</span>
                                </div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', lineHeight: 1.3 }}>
                                    {item.title}
                                </h3>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#000',
                                    textDecoration: 'underline',
                                    fontWeight: 'bold'
                                }}>
                                    Read Issue &rarr;
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    )
}

export default NewsletterPage
