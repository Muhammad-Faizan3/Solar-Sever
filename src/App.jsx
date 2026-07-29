
import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import PricingSection from './components/PricingSection/PricingSection'
import About from './components/About/About'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const revealInitRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const progressBar = document.getElementById('progress-bar')
      if (progressBar) {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = (scrollTop / docHeight) * 100
        progressBar.style.width = scrollPercent + '%'
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const backToTop = document.getElementById('back-to-top')
    if (!backToTop) return
    const toggle = () => {
      backToTop.classList.toggle('show', window.scrollY > 300)
    }
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
    window.addEventListener('scroll', toggle)
    backToTop.addEventListener('click', scrollToTop)
    return () => {
      window.removeEventListener('scroll', toggle)
      backToTop.removeEventListener('click', scrollToTop)
    }
  }, [])

  useEffect(() => {
    if (revealInitRef.current) return
    revealInitRef.current = true

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        document.querySelector('#tool-modal-overlay')?.classList.remove('show')
        document.body.style.overflow = ''
        const ul = document.querySelector('header nav ul')
        const hamburger = document.querySelector('.hamburger')
        ul?.classList.remove('show')
        hamburger?.classList.remove('active')
      }
      if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="container">
      <div id="progress-bar"></div>
      <button id="back-to-top" title="Back to top">&uarr;</button>
      <header>
        <Navbar scrolled={scrolled} />
        <Hero />
      </header>
      <main>
        <PricingSection />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
