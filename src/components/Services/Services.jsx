import { useState, useEffect, useRef } from 'react'
import './Services.css'

const toolIcons = [
  'https://solarsaver.vercel.app/assets/png1-CHwXHQYP.svg',
  'https://solarsaver.vercel.app/assets/png2-BdZxoh61.svg',
  'https://solarsaver.vercel.app/assets/png3-DQyZYqFR.svg',
  'https://solarsaver.vercel.app/assets/png4-DtkWNZzq.svg',
  'https://solarsaver.vercel.app/assets/png5-BhXUQqOL.svg',
  'https://solarsaver.vercel.app/assets/png6-K1TI4P5r.svg',
]

const toolData = [
  { title: 'Real-Time Production Estimates', desc: 'Accurate, up-to-the-minute solar production estimates powered by real-time weather data and system specifications. Close more deals with instant, trustworthy numbers.', features: ['Real-time weather integration', 'Instant calculation engine', 'Exportable PDF reports', 'Historical production tracking'], icon: toolIcons[0] },
  { title: 'Minimal Training Time', desc: 'Get sales reps up to speed in record time with our streamlined training platform. Reduce ramp-up costs and start closing deals faster than ever before.', features: ['Interactive training modules', 'Role-play simulations', 'Progress tracking dashboard', 'Mobile-friendly learning'], icon: toolIcons[1] },
  { title: 'Homeowner-Focused Proposals', desc: 'A proposal design that communicates value clearly and drives conversions. Each layout is crafted to help homeowners understand their investment at a glance.', features: ['Visually appealing layouts', 'Simple value articulation', 'Customizable templates', 'Built-in compliance checks'], icon: toolIcons[2] },
  { title: 'Customizable Sales Tools', desc: 'Adaptable tools that match each representatives unique style and needs. Flexibility that empowers your team to sell with confidence and authenticity.', features: ['Personalized dashboards', 'Drag-and-drop customization', 'Team-wide sync', 'Real-time analytics'], icon: toolIcons[3] },
  { title: 'Quick Sales Proposals', desc: 'Generate proposals that impress customers and close deals faster. From system design to financing, get everything your client needs in minutes.', features: ['Rapid proposal generation', 'Automated system design', 'Financing integration', 'E-signature capture'], icon: toolIcons[4] },
  { title: 'Smart Team Management', desc: 'Keep your entire team in sync with powerful coordination features. Manage schedules, track performance, and collaborate seamlessly.', features: ['Team calendar sync', 'Performance analytics', 'Automated task assignments', 'In-app messaging'], icon: toolIcons[5] },
]

const aiCards = [
  { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', label: 'SYSTEM SIZE', value: '14', decimal: '13', unit: 'kWh', barWidth: '85%', range: 'Range: 9.5 \u2013 14.13 kWh' },
  { icon: 'M8 21h8M12 17v4M2 3h20v14H2z', label: 'SOLAR PANELS', value: '43', decimal: '', unit: 'panels', barWidth: '70%', range: 'Range: 34 \u2013 43 panels' },
  { icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', label: 'CO2 OFFSET', value: '9', decimal: '07', unit: 'tons', barWidth: '65%', range: 'Range: 7.65 \u2013 9.07 tons' },
]

const equipments = [
  { num: '01', icon: 'https://solarsaver.vercel.app/assets/png4-DtkWNZzq.svg', title: 'PANELS', desc: 'Solar Saver offers industry-leading solar panels. Experience unparalleled efficiency and durability with our advanced technology.', tags: ['440W', '24% Eff', '30yr'] },
  { num: '02', icon: 'https://solarsaver.vercel.app/assets/png5-BhXUQqOL.svg', title: 'INVERTERS', desc: 'Solar Saver supplies high-performance inverters. Our inverters ensure maximum energy conversion and system reliability.', tags: ['99% Eff', 'Hybrid', '12yr'] },
  { num: '03', icon: 'https://solarsaver.vercel.app/assets/png6-K1TI4P5r.svg', title: 'BATTERIES', desc: 'Solar Saver provides state-of-the-art batteries. Enjoy consistent and long lasting energy storage with our premium solutions.', tags: ['13.5kWh', 'Lithium', '10yr'] },
]

const steps = [
  { num: '01', title: 'Site Assessment', desc: 'Our team will conduct a comprehensive site assessment to evaluate your roof\'s condition, orientation, and shading. We use this data to create a customized solar panel layout that maximizes energy production.', img: 'https://solarsaver.vercel.app/assets/step-img1-BlunsBST.webp' },
  { num: '02', title: 'Permits & Design', desc: 'We handle all permits and paperwork with your local utility company. Our experts design a system that meets all regulations while optimizing your energy savings.', img: 'https://solarsaver.vercel.app/assets/step-img2-CTlT3U4s.webp' },
  { num: '03', title: 'Installation', desc: 'Our certified installers mount your solar panels with precision and care. The typical installation takes just 1-3 days with minimal disruption to your routine.', img: 'https://solarsaver.vercel.app/assets/step-img3-BuLfzWbM.webp' },
]

function Services() {
  const [toolModal, setToolModal] = useState(null)
  const [curStep, setCurStep] = useState(0)
  const stepContainerRef = useRef(null)
  const coverStatsRef = useRef(null)
  const toolsRef = useRef(null)
  const equipRef = useRef(null)
  const aiRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            const nums = entry.target.querySelectorAll('.cov-num')
            nums.forEach(num => {
              const target = parseInt(num.textContent)
              let current = 0
              const step = Math.ceil(target / 60)
              const timer = setInterval(() => {
                current += step
                if (current >= target) { current = target; clearInterval(timer) }
                num.textContent = current
              }, 25)
            })
          }
        })
      },
      { threshold: 0.3 }
    )
    const el = coverStatsRef.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  useEffect(() => {
    const el = toolsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.tool-card').forEach(card => {
              card.classList.add('visible')
            })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = equipRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.reveal-scale').forEach(card => {
              card.classList.add('visible')
            })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = aiRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(card => {
              card.classList.add('visible')
            })
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return
    const cards = document.querySelectorAll('.tool-card')
    const onMove = e => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rx = ((y - cy) / cy) * -8
      const ry = ((x - cx) / cx) * 8
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
      card.style.transition = 'transform 0.1s ease'
    }
    const onLeave = e => {
      e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'
      e.currentTarget.style.transition = 'transform 0.5s ease'
    }
    cards.forEach(c => {
      c.addEventListener('mousemove', onMove)
      c.addEventListener('mouseleave', onLeave)
    })
    return () => {
      cards.forEach(c => {
        c.removeEventListener('mousemove', onMove)
        c.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  const goToStep = i => {
    const idx = ((i % steps.length) + steps.length) % steps.length
    setCurStep(idx)
  }

  return (
    <>
      <section className="ai-section" ref={aiRef}>
        <div className="left-cards">
          {aiCards.map((card, i) => (
            <div key={i} className="ai-card info-card reveal">
              <div className="ai-card-top">
                <div className="ai-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ff7a1f" strokeWidth="2">
                    <path d={card.icon} />
                  </svg>
                </div>
                <div>
                  <h3>{card.label}</h3>
                  <p className="ai-value">
                    <span className="count-num">{card.value}</span>
                    {card.decimal && <span className="count-dec">.{card.decimal}</span>} {card.unit}
                  </p>
                </div>
              </div>
              <div className="ai-bar"><div className="ai-bar-fill" style={{ width: card.barWidth }}></div></div>
              <p className="ai-range">{card.range}</p>
            </div>
          ))}
        </div>
        <div className="right-content reveal-right">
          <div className="ai-badge"><span className="ai-dot"></span> POWERED BY AI</div>
          <h2><span>AI</span> UTILIZATION</h2>
          <p>Solar Saver utilizes an AI quoting engine to estimate the ideal solar system size for a customer&#39;s specific needs. This system calculates the number of solar panels required, the potential CO2 offset, and the new, likely reduced monthly power bill.</p>
          <p>By analyzing various factors such as roof size, local sun exposure, and current electricity usage, the AI provides a tailored solution.</p>
          <p className="highlight">This approach ensures customers get a system that maximizes energy efficiency and cost savings while contributing to environmental sustainability.</p>
        </div>
      </section>

      <section className="tools-section" ref={toolsRef}>
        <h2 id="three3" className="tools-title"><span>SOLAR</span> SAVER TOOLS</h2>
        <p className="tools-subtitle">There are many variations of Solar Saver tools available, but the majority have suffered alteration in some form.</p>
        <div className="tools-grid">
          {toolData.map((tool, i) => (
            <div key={i} className="plan-card1 tool-card" data-tool={i + 1} onClick={() => setToolModal(tool)}>
              <span className="tool-badge">0{i + 1}</span>
              <div className="icon"><img src={`https://solarsaver.vercel.app/assets/png${i + 1}-CHwXHQYP.svg`.replace(/png\d-/, `png${i + 1}-`)} alt="tool-icon" onError={e => { e.target.src = `https://solarsaver.vercel.app/assets/png${Math.min(i + 1, 6)}-${['CHwXHQYP', 'BdZxoh61', 'DQyZYqFR', 'DtkWNZzq', 'BhXUQqOL', 'K1TI4P5r'][i]}.svg` }} /></div>
              <p>{tool.title}</p>
              <p className="tool-detail">{tool.desc}</p>
            </div>
          ))}
        </div>
        <div id="tool-modal-overlay" className={toolModal ? 'show' : ''} onClick={e => { if (e.target === e.currentTarget) setToolModal(null) }}>
          <div id="tool-modal">
            <span id="tool-modal-close" onClick={() => setToolModal(null)}>&times;</span>
            <div id="tool-modal-icon"><img src={toolModal?.icon || ''} alt="" /></div>
            <h2 id="tool-modal-title">{toolModal?.title}</h2>
            <p id="tool-modal-desc">{toolModal?.desc}</p>
            {toolModal && (
              <ul id="tool-modal-features">
                {toolModal.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="coverage-section">
        <h2 className="coverage-title"><span>WE&#39;VE </span>GOT YOU COVERED</h2>
        <p className="coverage-sub">Explore solar potential in your area. See how Solar Saver can help you.</p>
        <div className="coverage-stats" ref={coverStatsRef}>
          {[{ num: '25', label: 'States' }, { num: '200', label: 'Cities' }, { num: '50', label: 'Partners' }].map((s, i) => (
            <div key={i} className="cov-stat">
              <span className="cov-num">{s.num}</span>
              <span className="cov-label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="coverage-map-box">
          <div className="map-overlay-glow"></div>
          <img src="https://solarsaver.vercel.app/assets/map-img1-DR_uFjwz.webp" alt="Coverage Map" className="coverage-map" />
          {[1, 2, 3, 4, 5].map(p => <div key={p} className={`map-pin pin${p}`}></div>)}
          <div className="coverage-cta">
            <button className="cov-btn primary">Full Install</button>
            <button className="cov-btn outline map-toggle-btn">Map View</button>
          </div>
        </div>
      </section>

      <section className="steps-section" id="four4">
        <h2 className="steps-title">HOW IT <span>WORKS</span></h2>
        <div className="steps-container" ref={stepContainerRef}>
          {steps.map((step, i) => (
            <div key={i} className={`step-card ${i === curStep ? 'active' : ''}`}>
              <div className="step-num">{step.num}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
              <div className="step-img"><img src={step.img} alt="" /></div>
            </div>
          ))}
        </div>
        <div className="step-nav">
          <button className="step-nav-btn" onClick={() => goToStep(curStep - 1)}>&larr;</button>
          <div className="step-dots">
            {steps.map((_, i) => (
              <span key={i} className={`dot ${i === curStep ? 'active' : ''}`} onClick={() => goToStep(i)}></span>
            ))}
          </div>
          <button className="step-nav-btn" onClick={() => goToStep(curStep + 1)}>&rarr;</button>
        </div>
      </section>

      <div className="before">
        <section className="tools-section">
          <h2 className="tools-title"><span>BEST </span>EQUIPMENT IN THE INDUSTRY</h2>
          <p className="tools-subtitle">Solar Saver uses the highest quality solar panels and inverters. Trust our cutting-edge technology for superior performance and durability.</p>
        </section>
      </div>
      <section className="features-section" ref={equipRef}>
        {equipments.map(eq => (
          <div key={eq.num} className="feature-box equip-card reveal-scale">
            <span className="equip-num">{eq.num}</span>
            <div className="equip-icon"><img src={eq.icon} alt={eq.title} /></div>
            <h2>{eq.title}</h2>
            <p>{eq.desc}</p>
            <div className="equip-features">
              {eq.tags.map((tag, j) => (
                <span key={j} className="equip-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}

export default Services