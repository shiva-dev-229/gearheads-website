import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = hash.slice(1)
    // Retry until the element is in the DOM (handles async page renders)
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 96
        window.scrollTo({ top, behavior: 'smooth' })
      } else if (attempts < 8) {
        setTimeout(() => tryScroll(attempts + 1), 80)
      }
    }
    tryScroll()
  }, [pathname, hash])

  return null
}
