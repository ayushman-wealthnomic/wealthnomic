import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

function NewsletterModal({ isOpen, onClose }) {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle, submitting, success, error

    if (!isOpen) return null

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('submitting')

        // AWS SES Configuration from environment variables
        const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID
        const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
        const region = import.meta.env.VITE_AWS_REGION || 'us-east-1'
        const verifiedSourceEmail = 'ayushman@wealthnomic.com' // Verified in AWS SES

        // Check if we should use SES or fallback to Web3Forms (if keys are missing)
        const useSES = accessKeyId && secretAccessKey

        try {
            if (useSES) {
                const sesClient = new SESClient({
                    region,
                    credentials: { accessKeyId, secretAccessKey }
                })

                const command = new SendEmailCommand({
                    Destination: { ToAddresses: [verifiedSourceEmail] },
                    Message: {
                        Body: {
                            Text: { Data: `New Newsletter Subscription Request from: ${email}` }
                        },
                        Subject: { Data: "New Newsletter Subscriber" }
                    },
                    Source: verifiedSourceEmail, // SES requires the 'From' to be verified
                    ReplyToAddresses: [email]
                })

                await sesClient.send(command)
                setStatus('success')
            } else {
                // Fallback to Web3Forms for demo/local testing if SES keys aren't provided
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        access_key: 'YOUR_ACCESS_KEY_HERE',
                        email: email,
                        subject: 'New Newsletter Subscriber (Fallback)',
                        from_name: 'Wealthnomics Newsletter'
                    })
                })

                if (response.status === 200) {
                    setStatus('success')
                } else {
                    setStatus('error')
                }
            }

            if (status !== 'error') {
                setTimeout(() => {
                    onClose()
                    setStatus('idle')
                    setEmail('')
                }, 3000)
            }
        } catch (error) {
            console.error('Newsletter Error:', error)
            setStatus('error')
        }
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            backdropFilter: 'blur(5px)'
        }} onClick={onClose}>
            <div style={{
                background: '#fff',
                border: '3px solid #000',
                boxShadow: '10px 10px 0 #000',
                padding: '40px',
                maxWidth: '500px',
                width: '90%',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: '#999',
                        zIndex: 10
                    }}
                >&times;</button>

                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <img
                            src="/ayushman.png"
                            alt="Ayushman Gupta"
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid #000',
                                boxShadow: '4px 4px 0 #00cc7a'
                            }}
                        />
                    </div>

                    <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 800 }}>
                        Wealthnomics Intelligence
                    </h2>

                    <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.5, margin: '15px 0' }}>
                        <span style={{ color: '#00cc7a' }}>❤</span> numbers & machine intelligence — irregular insights about systematic alpha and the future of capital.
                    </p>

                    <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '20px' }}>
                        By Ayushman Gupta · Weekly Alpha
                    </div>
                </div>

                {status === 'success' ? (
                    <div style={{
                        padding: '20px',
                        background: '#f0fff4',
                        border: '3px solid #000',
                        boxShadow: '6px 6px 0 #00cc7a',
                        color: '#000',
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                        Welcome to the Signal. Check your inbox.
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="email"
                                    placeholder="Type your email..."
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '15px',
                                        border: '3px solid #000',
                                        fontFamily: 'Space Mono, monospace',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        background: '#fff'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    background: '#000',
                                    color: '#fff',
                                    border: '3px solid #000',
                                    fontWeight: '900',
                                    fontSize: '1.1rem',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'all 0.1s',
                                    boxShadow: '6px 6px 0 #00cc7a',
                                    opacity: status === 'submitting' ? 0.7 : 1
                                }}
                                onMouseDown={e => {
                                    e.target.style.transform = 'translate(2px, 2px)'
                                    e.target.style.boxShadow = '4px 4px 0 #00cc7a'
                                }}
                                onMouseUp={e => {
                                    e.target.style.transform = 'translate(0, 0)'
                                    e.target.style.boxShadow = '6px 6px 0 #00cc7a'
                                }}
                            >
                                {status === 'submitting' ? 'Processing...' : 'Subscribe'}
                            </button>
                        </form>

                        <div style={{ marginTop: '25px', textAlign: 'center' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#666',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '5px',
                                    margin: '0 auto',
                                    transition: 'color 0.2s'
                                }}
                                onMouseOver={e => e.target.style.color = '#000'}
                                onMouseOut={e => e.target.style.color = '#666'}
                            >
                                Meh, maybe later <span style={{ fontSize: '1.2rem' }}>&rsaquo;</span>
                            </button>
                        </div>
                    </>
                )}

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.7rem', color: '#999' }}>
                    We respect your inbox. Unsubscribe at any time.
                </div>
            </div>
        </div>
    )
}

export default NewsletterModal
