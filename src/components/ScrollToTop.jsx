import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        // If there is no hash, scroll to top
        // If there is a hash, do nothing (let browser handle it or handle separately)
        if (!hash) {
            window.scrollTo(0, 0)
        }
    }, [pathname, hash])

    return null
}
