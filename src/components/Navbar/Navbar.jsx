import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { href: '#one1', label: 'Pricing' },
  { href: '#two2', label: 'About' },
  { href: '#three3', label: 'Tools' },
  { href: '#four4', label: 'How It Works' },
  { href: '#five5', label: 'Testimonials' },
  { href: '#six6', label: 'FAQ' },
]

function Navbar({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(l => l.href.slice(1))
      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveLink('#' + id)
          return
        }
      }
      setActiveLink('')
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      const offset = 70
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <nav className={`${scrolled ? 'sticky' : ''}`}>
      <img
        src="https://solarsaver.vercel.app/assets/logo-CeUqb7XY.png"
        alt="Solar Saver"
      />
      <ul className={menuOpen ? 'show' : ''}>
        {navLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className={activeLink === link.href ? 'active-link' : ''}
              onClick={e => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <button>Calculate Solar</button>
      <div
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        role="button"
        tabIndex="0"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}

export default Navbar
