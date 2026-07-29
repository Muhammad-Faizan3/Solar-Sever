import { useEffect, useRef } from 'react'
import './About.css'

function About() {
  const statsRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            const numbers = entry.target.querySelectorAll('.stat-number')
            numbers.forEach(num => {
              const target = parseInt(num.dataset.target)
              animateCounter(num, target)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const el = statsRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function animateCounter(el, target) {
    let current = 0
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      current += step
      if (current >= target) {
        current = target
        clearInterval(timer)
      }
      el.textContent = current
    }, 25)
  }

  return (
    <div className="container1" ref={statsRef}>
      <div className="content reveal-left" ref={contentRef}>
        <h4 id="two2">
          About us <span className="about-line"></span>
        </h4>
        <h3>SOLAR SAVER</h3>
        <p className="para-1">
          Solar Saver is revolutionizing the solar industry by offering the most
          cost-effective solar solutions in America. We specialize in providing
          transparent, instant pricing for solar installations. With an innovative
          AI quoting engine, they ensure personalized and accurate estimates for
          each customer.
        </p>
        <p className="para-2">
          Solar Saver also offers innovative battery solutions and flexible
          financing options, making solar energy more accessible and affordable.
        </p>
        <div className="about-stats">
          <div className="stat-item">
            <span className="stat-number" data-target="500">0</span>
            <span className="stat-label">Projects Done</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-target="50">0</span>
            <span className="stat-label">Experts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-target="98">0</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </div>
      </div>
      <div className="image-box" id="about-image-3d">
        <div className="about-img-glow"></div>
        <img
          src="https://solarsaver.vercel.app/assets/about-img-CpwndtbG.webp"
          alt="solar panels"
        />
      </div>
    </div>
  )
}

export default About
