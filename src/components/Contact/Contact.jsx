import { useState, useEffect, useRef } from 'react'
import './Contact.css'

const testimonials = [
  { img: 'https://solarsaver.vercel.app/assets/joh-doe-CpqoclS1.webp', name: '@Joh Doe', role: 'Verified Customer', text: 'SOLAR SAVER EXCEEDED MY EXPECTATIONS IN EVERY WAY. FROM THE INITIAL CONSULTATION TO THE FINAL INSTALLATION, THEIR TEAM WAS PROFESSIONAL AND EFFICIENT. HIGHLY RECOMMEND!' },
  { img: 'https://solarsaver.vercel.app/assets/review-img2-1sDgRqsh.webp', name: '@Alex R.', role: 'Verified Customer', text: 'THE INSTALLATION WAS QUICK AND HASSLE-FREE. MY ELECTRICITY BILL HAS DROPPED BY 60% SINCE SWITCHING TO SOLAR. ABSOLUTELY LIFE-CHANGING!' },
  { img: 'https://solarsaver.vercel.app/assets/joh-doe-CpqoclS1.webp', name: '@Mike T.', role: 'Verified Customer', text: 'I NEVER THOUGHT SOLAR COULD BE THIS AFFORDABLE. THE TEAM WALKED ME THROUGH EVERY INCENTIVE AND I SAVED THOUSANDS.' },
  { img: 'https://solarsaver.vercel.app/assets/review-img2-1sDgRqsh.webp', name: '@Chris P.', role: 'Verified Customer', text: 'EXCELLENT CUSTOMER SERVICE FROM START TO FINISH. THEY ANSWERED ALL MY QUESTIONS AND THE INSTALLATION CREW WAS PUNCTUAL.' },
  { img: 'https://solarsaver.vercel.app/assets/joh-doe-CpqoclS1.webp', name: '@Sam W.', role: 'Verified Customer', text: 'GOING SOLAR WITH SOLAR SAVER WAS THE BEST INVESTMENT I HAVE EVER MADE. THE SYSTEM PAYS FOR ITSELF!' },
]

const faqs = [
  { q: 'WHAT IS SOLAR ENERGY?', a: 'Solar energy is energy from the sun converted into electricity using solar panels. It\'s a clean, renewable source that reduces electricity bills and environmental impact.' },
  { q: 'WHAT ARE THE BENEFITS OF USING SOLAR PANELS?', a: 'Solar panels help reduce electricity bills, are eco-friendly, and increase property value. They also provide energy independence and qualify for tax incentives.' },
  { q: 'HOW LONG DO SOLAR PANELS LAST?', a: 'Most solar panels last between 25\u201330 years with proper maintenance. They typically come with performance warranties guaranteeing 80% output after 25 years.' },
  { q: 'WHAT MAINTENANCE DO SOLAR PANELS REQUIRE?', a: 'Solar panels require simple cleaning and occasional inspection. Rain naturally washes away dust, but professional cleaning once a year is recommended for optimal performance.' },
]

function Contact() {
  const [testPage, setTestPage] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)
  const trackRef = useRef(null)
  const sliderRef = useRef(null)
  const testPageRef = useRef(0)

  testPageRef.current = testPage

  const goToPage = p => {
    const slider = sliderRef.current
    const track = trackRef.current
    if (!slider || !track || testimonials.length === 0) return
    const card = track.querySelector('.testimonial-card')
    const cw = card ? card.offsetWidth + 20 : 375
    const visible = slider.offsetWidth
    const total = cw * testimonials.length - 20
    const max = Math.ceil(Math.max(0, (total - visible)) / cw)
    const page = Math.max(0, Math.min(p, max))
    setTestPage(page)
    const offset = -(page * cw)
    track.style.transform = `translateX(${offset}px)`
  }

  useEffect(() => {
    const slider = sliderRef.current
    const track = trackRef.current
    if (!slider || !track || testimonials.length === 0) return

    const next = document.getElementById('test-next')
    const prev = document.getElementById('test-prev')
    const dots = document.querySelectorAll('.testimonial-dots .dot')

    const onNext = () => goToPage(testPageRef.current + 1)
    const onPrev = () => goToPage(testPageRef.current - 1)
    const onDot = i => () => goToPage(i)

    if (next) next.addEventListener('click', onNext)
    if (prev) prev.addEventListener('click', onPrev)
    dots.forEach((dot, i) => dot.addEventListener('click', onDot(i)))

    return () => {
      if (next) next.removeEventListener('click', onNext)
      if (prev) prev.removeEventListener('click', onPrev)
      dots.forEach((dot, i) => dot.removeEventListener('click', onDot(i)))
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const slider = sliderRef.current
      const track = trackRef.current
      if (!slider || !track) return
      const card = track.querySelector('.testimonial-card')
      const cw = card ? card.offsetWidth + 20 : 375
      const visible = slider.offsetWidth
      const total = cw * testimonials.length - 20
      const max = Math.ceil(Math.max(0, (total - visible)) / cw)
      goToPage(testPageRef.current + 1 > max ? 0 : testPageRef.current + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <section className="testimonial-section" id="five5">
        <h2 className="testimonial-heading">WHAT OUR <span>CLIENTS SAY</span></h2>
        <div className="testimonial-slider" ref={sliderRef}>
          <div className="testimonial-track" ref={trackRef}>
            {testimonials.map((t, i) => (
              <div key={i} className={`testimonial-card ${i === testPage ? 'active' : ''}`}>
                <div className="testimonial-review-img">
                  <img src={t.img} alt="" />
                </div>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <img src={t.img} alt="" />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="testimonial-nav">
          <button className="testimonial-nav-btn" id="test-prev">&larr;</button>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <span key={i} className={`dot ${i === testPage ? 'active' : ''}`}></span>
            ))}
          </div>
          <button className="testimonial-nav-btn" id="test-next">&rarr;</button>
        </div>
      </section>

      <section className="faq-section" id="six6">
        <h2 className="faq-heading">HAVE <span>QUESTIONS?</span></h2>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${openFaq === i ? 'active' : ''}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="faq-q">
                <h3>{faq.q}</h3>
                <span className="faq-icon">+</span>
              </div>
              <p className="faq-answer">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Contact